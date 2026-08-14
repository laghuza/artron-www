// Simple SSE clients registry for real-time telemetry distribution

export interface TelemetryEvent {
  type: 'scan' | 'init' | 'heartbeat' | 'override';
  userId?: string;
  tenantId?: string;
  direction?: 'IN' | 'OUT';
  status?: string;
  timestamp: string;
  message?: string;
}

const clients = new Set<(event: TelemetryEvent) => void>();

export function registerSseClient(onEvent: (event: TelemetryEvent) => void): () => void {
  clients.add(onEvent);
  return () => {
    clients.delete(onEvent);
  };
}

export function broadcastTelemetry(event: TelemetryEvent) {
  for (const client of clients) {
    try {
      client(event);
    } catch (e) {
      clients.delete(client);
    }
  }
}
