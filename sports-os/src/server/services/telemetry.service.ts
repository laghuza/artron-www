import type { BiometricTelemetryStream } from '@/types/dashboard.types';

export interface BiometricTelemetryInput {
  athleteId: string;
  tenantId: string;
  heartRate: number;
  speedKmh: number;
  accelerationG: number;
  vo2Max?: number;
}

export type InjuryRiskLevel = 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';

export interface InjuryRiskAssessment {
  score: number; // 0 - 100%
  riskLevel: InjuryRiskLevel;
  warnings: string[];
  recommendations: string[];
}

export interface EnneaCore9NodeMetrics {
  cardioEfficiency: number;
  velocityOutput: number;
  neuromuscularLoad: number;
  recoveryCapacity: number;
  enduranceIndex: number;
  agilityMatrix: number;
  powerPeak: number;
  hydrationBalance: number;
  compositeScore: number;
}

export interface TelemetryStreamPacket {
  athleteId: string;
  tenantId: string;
  heartRate: number;
  speedKmh: number;
  accelerationG: number;
  injuryRisk: InjuryRiskAssessment;
  enneaCore: EnneaCore9NodeMetrics;
  timestamp: string;
}

/**
 * Calculates real-time injury risk score based on heart rate, speed, and g-force load.
 */
export function calculateInjuryRisk(
  heartRate: number,
  speedKmh: number,
  maxHeartRate: number = 200,
  accelerationG: number = 1.0
): InjuryRiskAssessment {
  let score = 10;
  const warnings: string[] = [];
  const recommendations: string[] = [];

  const hrPercentage = (heartRate / maxHeartRate) * 100;

  if (hrPercentage > 92) {
    score += 45;
    warnings.push('Cardiac Zone 5 Max Threshold Exceeded');
    recommendations.push('Reduce training intensity immediately');
  } else if (hrPercentage > 85) {
    score += 25;
    warnings.push('High Anaerobic Strain');
    recommendations.push('Monitor recovery interval');
  }

  if (speedKmh > 30.0) {
    score += 20;
    warnings.push('High-Velocity Sprint Load');
  }

  if (accelerationG > 2.5) {
    score += 25;
    warnings.push('Acute Mechanical Impact / G-Force Spike');
    recommendations.push('Check joint neuromuscular fatigue');
  }

  const finalScore = Math.min(Math.max(score, 5), 98);

  let riskLevel: InjuryRiskLevel = 'LOW';
  if (finalScore >= 75) {
    riskLevel = 'CRITICAL';
  } else if (finalScore >= 50) {
    riskLevel = 'HIGH';
  } else if (finalScore >= 30) {
    riskLevel = 'MODERATE';
  }

  return {
    score: finalScore,
    riskLevel,
    warnings,
    recommendations: recommendations.length > 0 ? recommendations : ['Normal bio-mechanics maintained'],
  };
}

/**
 * Computes EnneaCore 9-Node biometric index scores.
 */
export function processEnneaCoreBiometrics(input: BiometricTelemetryInput): EnneaCore9NodeMetrics {
  const cardioEfficiency = Math.min(Math.round(100 - (input.heartRate / 220) * 40), 99);
  const velocityOutput = Math.min(Math.round((input.speedKmh / 35.0) * 100), 99);
  const neuromuscularLoad = Math.min(Math.round(input.accelerationG * 35), 99);
  const recoveryCapacity = Math.max(95 - Math.round(input.heartRate * 0.25), 45);
  const enduranceIndex = Math.min(Math.round((input.vo2Max || 55) * 1.5), 98);
  const agilityMatrix = Math.min(Math.round(85 + (35 - input.speedKmh) * 0.3), 98);
  const powerPeak = Math.min(Math.round(velocityOutput * 0.6 + neuromuscularLoad * 0.4), 99);
  const hydrationBalance = 92;

  const compositeScore = Math.round(
    (cardioEfficiency + velocityOutput + recoveryCapacity + enduranceIndex + powerPeak) / 5
  );

  return {
    cardioEfficiency,
    velocityOutput,
    neuromuscularLoad,
    recoveryCapacity,
    enduranceIndex,
    agilityMatrix,
    powerPeak,
    hydrationBalance,
    compositeScore,
  };
}

/**
 * Generates dynamic live telemetry stream packet.
 */
export function generateTelemetryPacket(
  athleteId: string = 'ath-8801-fcd',
  tenantId: string = 't-fc-dynamo-01'
): TelemetryStreamPacket {
  const baseHeartRate = 145 + Math.floor(Math.random() * 35);
  const speedKmh = Number((18.0 + Math.random() * 14.0).toFixed(1));
  const accelerationG = Number((1.1 + Math.random() * 1.5).toFixed(2));

  const input: BiometricTelemetryInput = {
    athleteId,
    tenantId,
    heartRate: baseHeartRate,
    speedKmh,
    accelerationG,
    vo2Max: 58.5,
  };

  const injuryRisk = calculateInjuryRisk(baseHeartRate, speedKmh, 195, accelerationG);
  const enneaCore = processEnneaCoreBiometrics(input);

  return {
    athleteId,
    tenantId,
    heartRate: baseHeartRate,
    speedKmh,
    accelerationG,
    injuryRisk,
    enneaCore,
    timestamp: new Date().toISOString(),
  };
}
