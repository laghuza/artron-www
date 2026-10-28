import { test, expect } from '@playwright/test';

test.describe('Phase 5: API Endpoints & Red-Team Security Validation E2E', () => {
  test('GET /api/v1/health returns healthy gateway status', async ({ request }) => {
    const response = await request.get('/api/v1/health');
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.status).toBe('healthy');
    expect(body.service).toBe('artron-gateway');
    expect(body.version).toBe('1.0.0');
  });

  test('POST /api/v1/demo-request validates schema and sanitizes XSS payloads', async ({ request }) => {
    const uniqueIp = `10.0.1.${Math.floor(Math.random() * 200) + 1}`;

    // 1. Reject invalid payload (short name & invalid email)
    const badRes = await request.post('/api/v1/demo-request', {
      headers: { 'x-forwarded-for': uniqueIp },
      data: {
        name: 'A',
        email: 'not-an-email',
      },
    });
    expect(badRes.status()).toBe(400);
    const badBody = await badRes.json();
    expect(badBody.error).toContain('Invalid input fields');

    // 2. Accept valid payload with XSS attempt (sanitized safely on server)
    const xssRes = await request.post('/api/v1/demo-request', {
      headers: { 'x-forwarded-for': uniqueIp },
      data: {
        name: '<script>alert("xss")</script>Giorgi',
        email: 'giorgi@artron.ge',
        phone: '+995555123456',
        facilityType: 'gym',
        platform: 'telegram',
      },
    });
    expect(xssRes.status()).toBe(200);
    const xssBody = await xssRes.json();
    expect(xssBody.success).toBe(true);
  });

  test('POST /api/v1/demo-request enforces rate limiting after 5 requests per window', async ({ request }) => {
    const floodIp = `192.168.99.${Math.floor(Math.random() * 200) + 1}`;

    for (let i = 0; i < 5; i++) {
      const res = await request.post('/api/v1/demo-request', {
        headers: { 'x-forwarded-for': floodIp },
        data: {
          name: `Tester ${i}`,
          email: 'rate@artron.ge',
          phone: '+995555000111',
        },
      });
      expect(res.status()).toBe(200);
    }

    // 6th request from same IP within 1 minute window must be blocked with 429
    const blockedRes = await request.post('/api/v1/demo-request', {
      headers: { 'x-forwarded-for': floodIp },
      data: {
        name: 'Tester Blocked',
        email: 'rate@artron.ge',
      },
    });
    expect(blockedRes.status()).toBe(429);
  });

  test('GET & POST /api/v1/telemetry validates IoT turnstile events', async ({ request }) => {
    const iotIp = `172.16.0.${Math.floor(Math.random() * 200) + 1}`;

    // 1. GET status
    const getRes = await request.get('/api/v1/telemetry');
    expect(getRes.status()).toBe(200);
    const getBody = await getRes.json();
    expect(getBody.status).toBe('success');

    // 2. POST valid SCAN_IN event
    const validPost = await request.post('/api/v1/telemetry', {
      headers: { 'x-forwarded-for': iotIp },
      data: {
        deviceId: 'TURNSTILE-GATE-01',
        event: 'SCAN_IN',
      },
    });
    expect(validPost.status()).toBe(201);
    const postBody = await validPost.json();
    expect(postBody.status).toBe('received');
    expect(postBody.deviceId).toBe('TURNSTILE-GATE-01');

    // 3. POST invalid event enum -> must return 400
    const invalidPost = await request.post('/api/v1/telemetry', {
      headers: { 'x-forwarded-for': iotIp },
      data: {
        deviceId: 'TURNSTILE-GATE-01',
        event: 'UNAUTHORIZED_OPEN_DOOR',
      },
    });
    expect(invalidPost.status()).toBe(400);
  });
});

