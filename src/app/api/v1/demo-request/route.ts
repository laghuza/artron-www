import { NextResponse, type NextRequest } from 'next/server';
import { z } from 'zod';

// Zod schema for B2B demo request validation
const demoRequestSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().min(7).max(25),
  facilityType: z.string().min(2).max(50).optional(),
});

// Basic in-memory rate limiting tracker (resets on application reload/serverless cold start)
const ipRequestHistory = new Map<string, number[]>();
const WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = ipRequestHistory.get(ip) || [];
  
  // Filter timestamps within the current window
  const activeTimestamps = timestamps.filter(t => now - t < WINDOW_MS);
  
  if (activeTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }
  
  activeTimestamps.push(now);
  ipRequestHistory.set(ip, activeTimestamps);
  return false;
}

// XSS sanitization helper
function sanitize(input: string): string {
  return input
    .trim()
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

export async function POST(request: NextRequest) {
  try {
    // 1. Enforce Rate Limiting
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || '127.0.0.1';
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please wait a minute before trying again.' },
        { status: 429 }
      );
    }

    // 2. Parse request body
    const body = await request.json();

    // 3. Validate input schema
    const parsed = demoRequestSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid input fields.', details: parsed.error.format() },
        { status: 400 }
      );
    }

    const { name, email, phone, facilityType } = parsed.data;

    // 4. Sanitize strings against XSS injection
    const sanitizedName = sanitize(name);
    const sanitizedEmail = sanitize(email);
    const sanitizedPhone = sanitize(phone);
    const sanitizedFacility = facilityType ? sanitize(facilityType) : 'unknown';

    // 5. Simulated storage or downstream webhook delivery (Telegram/Slack)
    console.log(`[LEAD INTAKE] Secure lead captured for ${sanitizedName} (${sanitizedEmail}), Phone: ${sanitizedPhone}, Facility: ${sanitizedFacility}`);

    // In a real production system, you would insert into DB:
    // await prisma.lead.create({ data: { name: sanitizedName, ... } });
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Lead captured successfully and secured.',
        timestamp: new Date().toISOString()
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[API ERROR] Failed to process demo request:', error);
    return NextResponse.json(
      { error: 'Internal server error occurred.' },
      { status: 500 }
    );
  }
}
