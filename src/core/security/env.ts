interface EnvConfig {
  DATABASE_URL: string;
  JWT_SECRET: string;
  PII_AES256_KEY: string;
  MQTT_BROKER_URL: string;
  NODE_ENV: string;
}

const REQUIRED_ENV_KEYS: (keyof EnvConfig)[] = [
  "DATABASE_URL",
  "JWT_SECRET",
  "PII_AES256_KEY",
  "MQTT_BROKER_URL",
];

const DEFAULT_ENV: EnvConfig = {
  DATABASE_URL: "postgresql://artron_admin:artron_pass_2026@localhost:5432/artron_sports_os?schema=public",
  JWT_SECRET: "artron-dev-jwt-secret-key-32-chars-long-secure-token",
  PII_AES256_KEY: "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef",
  MQTT_BROKER_URL: "mqtt://localhost:1883",
  NODE_ENV: "development",
};

export function validateEnv(): EnvConfig {
  const missingKeys: string[] = [];
  const envConfig: Partial<EnvConfig> = {};

  for (const key of REQUIRED_ENV_KEYS) {
    const val = process.env[key];
    if (!val) {
      missingKeys.push(key);
      envConfig[key] = DEFAULT_ENV[key];
    } else {
      envConfig[key] = val;
    }
  }

  envConfig.NODE_ENV = process.env.NODE_ENV || DEFAULT_ENV.NODE_ENV;

  if (missingKeys.length > 0) {
    const isBuildPhase = process.env.NEXT_PHASE === 'phase-production-build' || process.env.IS_BUILD === 'true';
    const isStrictProd = process.env.STRICT_PROD_ENV === 'true';
    if (process.env.NODE_ENV === "production" && isStrictProd && !isBuildPhase) {
      console.error(
        `\x1b[31m[ARTRON ENV SEC_FAULT]\x1b[0m Missing critical production env keys: ${missingKeys.join(", ")}`
      );
      throw new Error(`CRITICAL SEC_FAULT: Missing production environment variables [${missingKeys.join(", ")}]`);
    } else {
      console.warn(
        `\x1b[33m[ARTRON ENV DEV_WARNING]\x1b[0m Using default fallback values for missing keys: [${missingKeys.join(
          ", "
        )}]`
      );
    }
  } else {
    console.log(`\x1b[32m[ARTRON ENV VALIDATED]\x1b[0m All required environment variables successfully loaded.`);
  }

  return envConfig as EnvConfig;
}

export const env = validateEnv();
