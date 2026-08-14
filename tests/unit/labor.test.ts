import { calculateTimesheet } from '../../src/lib/labor';
import { prisma } from '../../src/lib/prisma';

jest.mock('../../src/lib/prisma', () => ({
  prisma: {
    user: {
      findFirst: jest.fn(),
    },
    turnstileLog: {
      findMany: jest.fn(),
    },
  },
}));

describe('labor timesheet compliance utility', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should throw an error if the employee user is not found', async () => {
    (prisma.user.findFirst as jest.Mock).mockResolvedValue(null);

    await expect(
      calculateTimesheet('user_none', 'tenant_1', 2026, 8)
    ).rejects.toThrow('User not found');
  });

  it('should correctly calculate normal hours, breaks, night hours, and overtime', async () => {
    const mockUser = { id: 'user_1', name: 'Alice Smith', role: 'STAFF_COACH' };
    (prisma.user.findFirst as jest.Mock).mockResolvedValue(mockUser);

    // Mock logs for Aug 11, 2026:
    // Event 1: IN at 09:00
    // Event 2: OUT at 13:00 (Starts 1-hour lunch break)
    // Event 3: IN at 14:00 (Lunch ends)
    // Event 4: OUT at 23:00 (Night shift starts at 22:00)
    // Total hours: 09:00 to 23:00 is 14 hours gross.
    // Lunch break is 1 hour.
    // Net work hours = 13 hours.
    // Overtime = 13 - 8 = 5 hours.
    // Night hours: 22:00 to 23:00 is 1 hour.
    
    const dayStart = new Date(2026, 7, 11); // August (7-indexed in JS)
    const logs = [
      { id: 'l1', timestamp: new Date(2026, 7, 11, 9, 0, 0), direction: 'IN', userId: 'user_1', tenantId: 'tenant_1' },
      { id: 'l2', timestamp: new Date(2026, 7, 11, 13, 0, 0), direction: 'OUT', userId: 'user_1', tenantId: 'tenant_1' },
      { id: 'l3', timestamp: new Date(2026, 7, 11, 14, 0, 0), direction: 'IN', userId: 'user_1', tenantId: 'tenant_1' },
      { id: 'l4', timestamp: new Date(2026, 7, 11, 23, 0, 0), direction: 'OUT', userId: 'user_1', tenantId: 'tenant_1' },
    ];

    (prisma.turnstileLog.findMany as jest.Mock).mockResolvedValue(logs);

    const timesheet = await calculateTimesheet('user_1', 'tenant_1', 2026, 8);

    expect(timesheet.userId).toBe('user_1');
    expect(timesheet.userName).toBe('Alice Smith');
    expect(timesheet.month).toBe('2026-08');

    // August 2026 has 31 days
    expect(timesheet.records).toHaveLength(31);

    // Check August 11 record (index 10)
    const aug11 = timesheet.records[10];
    expect(aug11.date).toBe('2026-08-11');
    expect(aug11.status).toBe('PRESENT');
    expect(aug11.workHours).toBe(13.0);
    expect(aug11.breakHours).toBe(1.0);
    expect(aug11.nightHours).toBe(1.0);
    expect(aug11.overtimeHours).toBe(5.0);

    // Other days should be ABSENT
    const aug12 = timesheet.records[11];
    expect(aug12.status).toBe('ABSENT');
    expect(aug12.workHours).toBe(0);
    expect(aug12.breakHours).toBe(0);
  });
});
