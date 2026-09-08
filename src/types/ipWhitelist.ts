export interface BranchIp {
  id: string;
  name: string;
  branchName: string;
  ipAddress: string;
  type: 'LAN' | 'WIFI' | 'HQ' | 'VPN';
  isActive: boolean;
  createdAt: string;
}

export interface UserIpRule {
  id: string;
  userId: string;
  userName: string;
  roleTitle: string;
  avatar?: string;
  allowedBranchIds: string[];
  accessAllIps: boolean;
  isActive: boolean;
  lastLoginIp?: string;
  lastLoginStatus?: 'SUCCESS' | 'BLOCKED';
  lastLoginTime?: string;
}

export interface IpAuditLog {
  id: string;
  timestamp: string;
  userName: string;
  userRole: string;
  attemptedIp: string;
  locationName: string;
  authMethod: 'PASSWORD' | 'WEBAUTHN_PASSKEY' | 'API_GUARD';
  status: 'ALLOWED' | 'BLOCKED';
  reason: string;
}

export interface IpComparisonRow {
  featureKey: string;
  featureTitle: string;
  standardSystem: string;
  standardIcon: 'CROSS' | 'WARN';
  artronSaas: string;
  artronIcon: 'CHECK' | 'SHIELD';
}
