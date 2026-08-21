import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : 2,
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: true,
    timeout: 60000,
    env: {
      DATABASE_URL: "postgresql://artron_admin:artron_pass_2026@localhost:5432/artron_sports_os?schema=public",
      JWT_SECRET: "artron-dev-jwt-secret-key-32-chars-long-secure-token",
      PII_AES256_KEY: "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef",
      MQTT_BROKER_URL: "mqtt://localhost:1883",
    },
  },
});
