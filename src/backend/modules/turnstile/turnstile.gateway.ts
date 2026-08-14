import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Injectable, Logger } from '@nestjs/common';
import { CryptoService } from '../../services/crypto.service';
import { prisma } from '../../../lib/prisma';
import { checkAntiPassback } from '../../../lib/anti-passback';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  namespace: 'turnstile',
})
@Injectable()
export class TurnstileGateway {
  @WebSocketServer()
  server!: Server;

  private readonly logger = new Logger(TurnstileGateway.name);

  constructor(private readonly cryptoService: CryptoService) {}

  @SubscribeMessage('scanQR')
  async handleScanQR(
    @MessageBody() data: { qrToken: string; direction: 'IN' | 'OUT'; tenantId: string },
    @ConnectedSocket() client: Socket
  ) {
    this.logger.log(`Received scanQR event from client ${client.id}`);
    
    try {
      let decryptedUserId: string;
      
      if (data.qrToken.startsWith('{')) {
        const payload = JSON.parse(data.qrToken);
        if (payload.encryptedText && payload.iv && payload.authTag) {
          decryptedUserId = this.cryptoService.decrypt(
            payload.encryptedText,
            payload.iv,
            payload.authTag
          );
        } else {
          decryptedUserId = data.qrToken;
        }
      } else {
        decryptedUserId = data.qrToken;
      }

      // 1. Verify user exists
      const user = await prisma.user.findFirst({
        where: { id: decryptedUserId, tenantId: data.tenantId },
      });

      if (!user) {
        throw new Error('Invalid user credentials or tenant mismatch');
      }

      // 2. Validate Anti-passback constraints
      const apCheck = await checkAntiPassback(decryptedUserId, data.tenantId, data.direction);
      if (!apCheck.allowed) {
        throw new Error(apCheck.reason);
      }

      // 3. Save access log to DB for Order №01-15/ნ compliance
      const log = await prisma.turnstileLog.create({
        data: {
          userId: decryptedUserId,
          tenantId: data.tenantId,
          direction: data.direction,
        },
      });

      this.logger.log(`Successfully validated token for user: ${decryptedUserId}`);

      const relaySignal = {
        userId: decryptedUserId,
        tenantId: data.tenantId,
        direction: data.direction,
        status: 'UNLOCKED',
        timestamp: log.timestamp.toISOString(),
      };

      // Broadcast signal to physical IoT relays listening to the turnstile socket
      this.server.emit('triggerRelay', relaySignal);

      // Complying with Labor Inspection Order №01-15/ნ (Work-time audit logs)
      this.logger.log(
        `[TURNSTILE EVENT] Compliance Order №01-15/ნ Audit Log: User ${decryptedUserId} registered entry/exit [${data.direction}] at ${relaySignal.timestamp}`
      );

      return {
        status: 'success',
        message: 'Access granted, turnstile relay triggered',
        data: relaySignal,
      };
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : String(error);
      this.logger.error(`Turnstile validation failure: ${errMsg}`);
      return {
        status: 'error',
        message: errMsg || 'Invalid or corrupted QR security scan token',
      };
    }
  }

  triggerManualOverride(tenantId: string, direction: 'IN' | 'OUT', operatorId: string) {
    const relaySignal = {
      tenantId,
      direction,
      status: 'UNLOCKED_OVERRIDE',
      operatorId,
      timestamp: new Date().toISOString(),
    };
    
    this.server.emit('triggerRelay', relaySignal);
    this.logger.warn(`[MANUAL OVERRIDE] Operator ${operatorId} unlocked turnstile for Tenant ${tenantId}`);
    return relaySignal;
  }
}
