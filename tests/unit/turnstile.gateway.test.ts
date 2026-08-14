import { TurnstileGateway } from '../../src/backend/modules/turnstile/turnstile.gateway';
import { prisma } from '../../src/lib/prisma';
import { Socket } from 'socket.io';

jest.mock('../../src/lib/prisma', () => ({
  prisma: {
    user: {
      findFirst: jest.fn(),
    },
    turnstileLog: {
      findFirst: jest.fn(),
      create: jest.fn(),
    },
  },
}));

describe('TurnstileGateway', () => {
  let gateway: TurnstileGateway;
  let mockSocket: Socket;
  let mockCryptoService: any;

  beforeEach(() => {
    jest.clearAllMocks();
    mockCryptoService = {
      encrypt: jest.fn(),
      decrypt: jest.fn(),
    };
    gateway = new TurnstileGateway(mockCryptoService);

    // Mock Socket.io Server instance
    gateway.server = {
      emit: jest.fn(),
    } as any;

    mockSocket = {
      id: 'test-socket-id',
    } as unknown as Socket;
  });

  it('should fail validation if user does not exist in the tenant database', async () => {
    (prisma.user.findFirst as jest.Mock).mockResolvedValue(null);

    const result = await gateway.handleScanQR(
      { qrToken: 'unknown_user', direction: 'IN', tenantId: 'tenant_1' },
      mockSocket
    );

    expect(prisma.user.findFirst).toHaveBeenCalledWith({
      where: { id: 'unknown_user', tenantId: 'tenant_1' },
    });
    expect(result.status).toBe('error');
    expect(result.message).toContain('Invalid user credentials');
  });

  it('should block consecutive IN scans within 10 minutes (anti-passback violation)', async () => {
    const mockUser = { id: 'user_1', name: 'John Doe', role: 'CUSTOMER' };
    (prisma.user.findFirst as jest.Mock).mockResolvedValue(mockUser);

    // Last log was IN, 2 minutes ago
    const twoMinutesAgo = new Date(Date.now() - 2 * 60 * 1000);
    (prisma.turnstileLog.findFirst as jest.Mock).mockResolvedValue({
      id: 'log_prev',
      timestamp: twoMinutesAgo,
      direction: 'IN',
      userId: 'user_1',
      tenantId: 'tenant_1',
    });

    const result = await gateway.handleScanQR(
      { qrToken: 'user_1', direction: 'IN', tenantId: 'tenant_1' },
      mockSocket
    );

    expect(result.status).toBe('error');
    expect(result.message).toContain('Anti-passback restriction active');
    expect(prisma.turnstileLog.create).not.toHaveBeenCalled();
  });

  it('should allow re-entry if more than 10 minutes have elapsed', async () => {
    const mockUser = { id: 'user_1', name: 'John Doe', role: 'CUSTOMER' };
    (prisma.user.findFirst as jest.Mock).mockResolvedValue(mockUser);

    // Last log was IN, 12 minutes ago
    const twelveMinutesAgo = new Date(Date.now() - 12 * 60 * 1000);
    (prisma.turnstileLog.findFirst as jest.Mock).mockResolvedValue({
      id: 'log_prev',
      timestamp: twelveMinutesAgo,
      direction: 'IN',
      userId: 'user_1',
      tenantId: 'tenant_1',
    });

    (prisma.turnstileLog.create as jest.Mock).mockResolvedValue({
      id: 'log_new',
      timestamp: new Date(),
      direction: 'IN',
      userId: 'user_1',
      tenantId: 'tenant_1',
    });

    const result = await gateway.handleScanQR(
      { qrToken: 'user_1', direction: 'IN', tenantId: 'tenant_1' },
      mockSocket
    );

    expect(result.status).toBe('success');
    expect(prisma.turnstileLog.create).toHaveBeenCalled();
    expect(gateway.server.emit).toHaveBeenCalledWith('triggerRelay', expect.objectContaining({
      userId: 'user_1',
      direction: 'IN',
      status: 'UNLOCKED',
    }));
  });

  it('should allow check-out (OUT) without triggering anti-passback', async () => {
    const mockUser = { id: 'user_1', name: 'John Doe', role: 'CUSTOMER' };
    (prisma.user.findFirst as jest.Mock).mockResolvedValue(mockUser);

    // Last log was IN, 2 minutes ago (doesn't block checking OUT)
    const twoMinutesAgo = new Date(Date.now() - 2 * 60 * 1000);
    (prisma.turnstileLog.findFirst as jest.Mock).mockResolvedValue({
      id: 'log_prev',
      timestamp: twoMinutesAgo,
      direction: 'IN',
      userId: 'user_1',
      tenantId: 'tenant_1',
    });

    (prisma.turnstileLog.create as jest.Mock).mockResolvedValue({
      id: 'log_new',
      timestamp: new Date(),
      direction: 'OUT',
      userId: 'user_1',
      tenantId: 'tenant_1',
    });

    const result = await gateway.handleScanQR(
      { qrToken: 'user_1', direction: 'OUT', tenantId: 'tenant_1' },
      mockSocket
    );

    expect(result.status).toBe('success');
    expect(prisma.turnstileLog.create).toHaveBeenCalled();
  });
});
