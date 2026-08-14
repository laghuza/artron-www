import mqtt from 'mqtt';
import { decryptPersonalId } from './crypto';
import { prisma } from './prisma';
import { checkAntiPassback } from './anti-passback';
import { broadcastTelemetry } from './telemetry-sse';
import { env } from './env';

let mqttClient: mqtt.MqttClient | null = null;

/**
 * Initializes the global MQTT client instance if it doesn't already exist.
 * Subscribes to the wildcard topic for scans and handles incoming messages.
 */
export function getMqttClient(): mqtt.MqttClient {
  if (mqttClient) return mqttClient;

  console.log(`[MQTT] Connecting to broker at ${env.MQTT_BROKER_URL}`);
  mqttClient = mqtt.connect(env.MQTT_BROKER_URL);

  mqttClient.on('connect', () => {
    console.log('[MQTT] Connected to broker successfully');
    
    // Subscribe to access control scans for all tenants
    mqttClient?.subscribe('artron/+/scan', (err) => {
      if (err) {
        console.error('[MQTT] Failed to subscribe to scan topic:', err);
      } else {
        console.log('[MQTT] Subscribed to topic: artron/+/scan');
      }
    });
  });

  mqttClient.on('message', async (topic, message) => {
    try {
      // Topic structure: artron/<tenantId>/scan
      const parts = topic.split('/');
      const tenantId = parts[1];
      if (!tenantId) return;

      const payload = JSON.parse(message.toString());
      const { qrToken, direction } = payload;

      if (!qrToken || !direction) {
        console.error('[MQTT] Invalid message payload:', payload);
        return;
      }

      let decryptedUserId = qrToken;
      if (qrToken.startsWith('{')) {
        try {
          const parsed = JSON.parse(qrToken);
          if (parsed.encrypted && parsed.iv && parsed.authTag) {
            decryptedUserId = decryptPersonalId(parsed.encrypted, parsed.iv, parsed.authTag);
          }
        } catch (err) {
          // Fallback to raw token
        }
      }

      // 1. Verify user exists in this tenant
      const user = await prisma.user.findFirst({
        where: { id: decryptedUserId, tenantId },
      });

      if (!user) {
        console.error(`[MQTT] Access denied: Unknown user ${decryptedUserId} in tenant ${tenantId}`);
        broadcastTelemetry({
          type: 'scan',
          userId: decryptedUserId,
          tenantId,
          direction,
          status: 'BLOCKED_UNKNOWN_USER',
          timestamp: new Date().toISOString(),
          message: 'Unknown user credentials',
        });
        return;
      }

      // 2. Validate Anti-passback constraint
      const apCheck = await checkAntiPassback(decryptedUserId, tenantId, direction);
      if (!apCheck.allowed) {
        console.warn(`[MQTT] Access blocked (anti-passback) for user ${decryptedUserId}: ${apCheck.reason}`);
        broadcastTelemetry({
          type: 'scan',
          userId: decryptedUserId,
          tenantId,
          direction,
          status: 'BLOCKED_ANTI_PASSBACK',
          timestamp: new Date().toISOString(),
          message: apCheck.reason,
        });
        return;
      }

      // 3. Save access log to database (Order №01-15/ნ compliance)
      const log = await prisma.turnstileLog.create({
        data: {
          userId: decryptedUserId,
          tenantId,
          direction,
        },
      });

      console.log(`[MQTT] Access granted to user ${user.name} (${decryptedUserId}) - checked ${direction}`);

      // 4. Broadcast live telemetry event to connected web clients (SSE)
      broadcastTelemetry({
        type: 'scan',
        userId: decryptedUserId,
        tenantId,
        direction,
        status: 'UNLOCKED',
        timestamp: log.timestamp.toISOString(),
        message: `Access granted: User ${user.name} checked ${direction.toLowerCase()}`,
      });

      // 5. Send command back to the physical turnstile relay
      mqttClient?.publish(
        `artron/${tenantId}/relay`,
        JSON.stringify({
          userId: decryptedUserId,
          direction,
          status: 'UNLOCKED',
          timestamp: log.timestamp.toISOString(),
        })
      );

    } catch (error) {
      console.error('[MQTT] Message processing error:', error);
    }
  });

  mqttClient.on('error', (err) => {
    console.error('[MQTT] Connection error:', err);
  });

  return mqttClient;
}
