import { prisma } from './prisma';

export interface DailyWorkRecord {
  date: string;
  checkIn: string | null;
  checkOut: string | null;
  workHours: number;
  breakHours: number;
  nightHours: number;
  overtimeHours: number;
  status: 'PRESENT' | 'ABSENT' | 'ANOMALY' | 'SICK_LEAVE' | 'VACATION';
}

export interface EmployeeTimesheet {
  userId: string;
  userName: string;
  role: string;
  month: string; // YYYY-MM
  records: DailyWorkRecord[];
  totalWorkHours: number;
  totalOvertime: number;
  totalNightHours: number;
}

/**
 * Computes the labor timesheet for a user under Order №01-15/ნ based on turnstile logs.
 */
export async function calculateTimesheet(
  userId: string,
  tenantId: string,
  year: number,
  month: number // 1-indexed (1 = Jan, 12 = Dec)
): Promise<EmployeeTimesheet> {
  const user = await prisma.user.findFirst({
    where: { id: userId, tenantId },
  });

  if (!user) {
    throw new Error('User not found');
  }

  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0, 23, 59, 59, 999);

  const logs = await prisma.turnstileLog.findMany({
    where: {
      userId,
      tenantId,
      timestamp: {
        gte: startDate,
        lte: endDate,
      },
    },
    orderBy: {
      timestamp: 'asc',
    },
  });

  const daysInMonth = endDate.getDate();
  const records: DailyWorkRecord[] = [];

  let totalWorkHours = 0;
  let totalOvertime = 0;
  let totalNightHours = 0;

  for (let day = 1; day <= daysInMonth; day++) {
    const dayStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const dayStart = new Date(year, month - 1, day, 0, 0, 0);
    const dayEnd = new Date(year, month - 1, day, 23, 59, 59, 999);

    const dayLogs = logs.filter(
      (l) => l.timestamp >= dayStart && l.timestamp <= dayEnd
    );

    if (dayLogs.length === 0) {
      records.push({
        date: dayStr,
        checkIn: null,
        checkOut: null,
        workHours: 0,
        breakHours: 0,
        nightHours: 0,
        overtimeHours: 0,
        status: 'ABSENT',
      });
      continue;
    }

    const checkInLog = dayLogs.find((l) => l.direction === 'IN');
    const checkOutLog = [...dayLogs].reverse().find((l) => l.direction === 'OUT');

    const checkIn = checkInLog ? checkInLog.timestamp : null;
    const checkOut = checkOutLog ? checkOutLog.timestamp : null;

    let workHours = 0;
    let breakHours = 0;
    let nightHours = 0;
    let overtimeHours = 0;
    let status: 'PRESENT' | 'ANOMALY' = 'PRESENT';

    if (checkIn && checkOut) {
      const inTime = new Date(checkIn);
      const outTime = new Date(checkOut);

      if (outTime < inTime) {
        status = 'ANOMALY';
      } else {
        let activeIn: Date | null = null;
        let totalDurationMs = 0;
        let totalBreakMs = 0;

        for (let i = 0; i < dayLogs.length; i++) {
          const log = dayLogs[i];
          const logTime = new Date(log.timestamp);

          if (log.direction === 'IN') {
            if (!activeIn) {
              activeIn = logTime;
              if (i > 0 && dayLogs[i - 1].direction === 'OUT') {
                totalBreakMs += logTime.getTime() - new Date(dayLogs[i - 1].timestamp).getTime();
              }
            }
          } else if (log.direction === 'OUT') {
            if (activeIn) {
              totalDurationMs += logTime.getTime() - activeIn.getTime();
              activeIn = null;
            }
          }
        }

        if (activeIn && checkOut) {
          totalDurationMs += new Date(checkOut).getTime() - activeIn.getTime();
        }

        workHours = totalDurationMs / (1000 * 60 * 60);
        breakHours = totalBreakMs / (1000 * 60 * 60);

        // Night shift overlap (22:00 - 06:00)
        let nightMs = 0;
        let activeInForNight: Date | null = null;

        for (let i = 0; i < dayLogs.length; i++) {
          const log = dayLogs[i];
          const logTime = new Date(log.timestamp);

          if (log.direction === 'IN') {
            if (!activeInForNight) activeInForNight = logTime;
          } else if (log.direction === 'OUT') {
            if (activeInForNight) {
              nightMs += calculateNightShiftOverlapMs(activeInForNight, logTime);
              activeInForNight = null;
            }
          }
        }
        if (activeInForNight && checkOut) {
          nightMs += calculateNightShiftOverlapMs(activeInForNight, new Date(checkOut));
        }

        nightHours = nightMs / (1000 * 60 * 60);
        
        if (workHours > 8) {
          overtimeHours = workHours - 8;
        }
      }
    } else {
      status = 'ANOMALY';
    }

    records.push({
      date: dayStr,
      checkIn: checkIn ? checkIn.toISOString() : null,
      checkOut: checkOut ? checkOut.toISOString() : null,
      workHours: parseFloat(workHours.toFixed(2)),
      breakHours: parseFloat(breakHours.toFixed(2)),
      nightHours: parseFloat(nightHours.toFixed(2)),
      overtimeHours: parseFloat(overtimeHours.toFixed(2)),
      status,
    });

    totalWorkHours += workHours;
    totalOvertime += overtimeHours;
    totalNightHours += nightHours;
  }

  return {
    userId,
    userName: user.name,
    role: user.role,
    month: `${year}-${String(month).padStart(2, '0')}`,
    records,
    totalWorkHours: parseFloat(totalWorkHours.toFixed(2)),
    totalOvertime: parseFloat(totalOvertime.toFixed(2)),
    totalNightHours: parseFloat(totalNightHours.toFixed(2)),
  };
}

function calculateNightShiftOverlapMs(start: Date, end: Date): number {
  let overlapMs = 0;
  const hourMs = 60 * 60 * 1000;
  let current = start.getTime();
  const limit = end.getTime();

  while (current < limit) {
    const nextHour = Math.min(current + hourMs, limit);
    const currentDate = new Date(current);
    const hourVal = currentDate.getHours();

    if (hourVal >= 22 || hourVal < 6) {
      overlapMs += nextHour - current;
    }
    current = nextHour;
  }

  return overlapMs;
}
