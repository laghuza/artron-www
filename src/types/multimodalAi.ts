export type AiInputMode = 'VOICE' | 'VISION_OCR' | 'NATURAL_CHAT';

export type AiProcessState = 
  | 'IDLE' 
  | 'LISTENING' 
  | 'SCANNING' 
  | 'PROCESSING' 
  | 'CONFIRMATION_PENDING' 
  | 'COMMITTED' 
  | 'REJECTED';

export interface ExtractedEntityData {
  fullNameKa: string;
  fullNameEn?: string;
  personalId: string;
  phone: string;
  roleOrPlanKa: string;
  branchKa: string;
  birthDate?: string;
  genderKa?: string;
  expiryDate?: string;
  confidenceScore: number;
  extractedVia: AiInputMode;
  functionCalled?: string;
  photoUrl?: string;
}

export interface VoiceScenario {
  id: string;
  titleKa: string;
  roleBadgeKa: string;
  spokenAudioTextKa: string;
  durationSec: number;
  extractedData: ExtractedEntityData;
}

export interface OcrIdPreset {
  id: string;
  titleKa: string;
  cardTypeKa: string;
  documentNumber: string;
  extractedData: ExtractedEntityData;
}

export interface ChatScenario {
  id: string;
  promptKa: string;
  labelKa: string;
  category: 'REGISTRATION' | 'UPDATE' | 'SEARCH' | 'REVOKE';
  functionName: string;
  aiReplyKa: string;
  extractedData?: ExtractedEntityData;
}

export interface ComparisonMetric {
  titleKa: string;
  traditionalWayKa: string;
  artronAiWayKa: string;
  icon: string;
  badgeKa: string;
}
