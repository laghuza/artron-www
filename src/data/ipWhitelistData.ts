import { BranchIp, UserIpRule, IpAuditLog, IpComparisonRow } from '@/types/ipWhitelist';

export const INITIAL_BRANCH_IPS: BranchIp[] = [
  {
    id: 'branch-vake-lan',
    name: 'ვაკის ფილიალი - მთავარი LAN',
    branchName: 'ვაკის ფილიალი',
    ipAddress: '192.168.1.100',
    type: 'LAN',
    isActive: true,
    createdAt: '2026-01-15'
  },
  {
    id: 'branch-saburtalo-wifi',
    name: 'საბურთალო - ადმინისტრაციის Wi-Fi',
    branchName: 'საბურთალოს დარბაზი',
    ipAddress: '192.168.2.50',
    type: 'WIFI',
    isActive: true,
    createdAt: '2026-02-01'
  },
  {
    id: 'branch-batumi-pool',
    name: 'ბათუმის აუზი - ოფიციალური ქსელი',
    branchName: 'ბათუმის ოლიმპიური აუზი',
    ipAddress: '192.168.3.25',
    type: 'LAN',
    isActive: true,
    createdAt: '2026-03-10'
  },
  {
    id: 'branch-hq-central',
    name: 'ცენტრალური ოფისი - Corporate Gateway',
    branchName: 'ცენტრალური HQ',
    ipAddress: '212.58.120.45',
    type: 'HQ',
    isActive: true,
    createdAt: '2026-01-01'
  }
];

export const INITIAL_USER_IP_RULES: UserIpRule[] = [
  {
    id: 'rule-giorgi-beridze',
    userId: 'user-01',
    userName: 'გიორგი ბერიძე',
    roleTitle: 'მოლარე - ადმინისტრატორი',
    allowedBranchIds: ['branch-vake-lan'],
    accessAllIps: false,
    isActive: true,
    lastLoginIp: '192.168.1.100',
    lastLoginStatus: 'SUCCESS',
    lastLoginTime: '1 წთ წინ'
  },
  {
    id: 'rule-nino-kapanadze',
    userId: 'user-02',
    userName: 'ნინო კაპანაძე',
    roleTitle: 'მენეჯერი / გენერალური დირექტორი',
    allowedBranchIds: ['branch-vake-lan', 'branch-saburtalo-wifi', 'branch-hq-central'],
    accessAllIps: true,
    isActive: true,
    lastLoginIp: '178.134.45.12',
    lastLoginStatus: 'SUCCESS',
    lastLoginTime: '10 წთ წინ'
  },
  {
    id: 'rule-irakli-totadze',
    userId: 'user-03',
    userName: 'ირაკლი თოთაძე',
    roleTitle: 'უფროსი მწვრთნელი (საბურთალო)',
    allowedBranchIds: ['branch-saburtalo-wifi'],
    accessAllIps: false,
    isActive: true,
    lastLoginIp: '192.168.2.50',
    lastLoginStatus: 'SUCCESS',
    lastLoginTime: '45 წთ წინ'
  },
  {
    id: 'rule-elene-maisuradze',
    userId: 'user-04',
    userName: 'ელენე მაისურაძე',
    roleTitle: 'რეცეფციონისტი (ბათუმი)',
    allowedBranchIds: ['branch-batumi-pool'],
    accessAllIps: false,
    isActive: false,
    lastLoginIp: '85.117.34.88',
    lastLoginStatus: 'BLOCKED',
    lastLoginTime: '2 სთ წინ'
  }
];

export const INITIAL_IP_AUDIT_LOGS: IpAuditLog[] = [
  {
    id: 'log-01',
    timestamp: '17:24:10',
    userName: 'გიორგი ბერიძე',
    userRole: 'მოლარე',
    attemptedIp: '178.134.89.204 (Magti Home/Mobile)',
    locationName: 'სახლიდან / გარედან',
    authMethod: 'PASSWORD',
    status: 'BLOCKED',
    reason: 'IP არ არის ვაკის ფილიალის ნებადართულ სიაში'
  },
  {
    id: 'log-02',
    timestamp: '17:21:05',
    userName: 'გიორგი ბერიძე',
    userRole: 'მოლარე',
    attemptedIp: '192.168.1.100 (Vake LAN Gateway)',
    locationName: 'ვაკის ფილიალი',
    authMethod: 'WEBAUTHN_PASSKEY',
    status: 'ALLOWED',
    reason: 'IP დადასტურებულია + Face ID დადასტურებულია'
  },
  {
    id: 'log-03',
    timestamp: '17:15:40',
    userName: 'ნინო კაპანაძე',
    userRole: 'გენერალური დირექტორი',
    attemptedIp: '94.43.12.8 (Silknet Mobile LTE)',
    locationName: 'დისტანციური',
    authMethod: 'WEBAUTHN_PASSKEY',
    status: 'ALLOWED',
    reason: 'Access All IPs (Director Bypass Policy)'
  },
  {
    id: 'log-04',
    timestamp: '16:58:12',
    userName: 'ელენე მაისურაძე',
    userRole: 'რეცეფციონისტი',
    attemptedIp: '85.117.34.88 (Public Wi-Fi)',
    locationName: 'ქუჩის კაფე',
    authMethod: 'API_GUARD',
    status: 'BLOCKED',
    reason: 'მცდელობა სამუშაო საათების შემდეგ გარედან'
  }
];

export const IP_COMPARISON_MATRIX: IpComparisonRow[] = [
  {
    featureKey: 'home_login_block',
    featureTitle: 'სახლიდან შესვლის კონტროლი',
    standardSystem: '❌ შეუძლებელია (შედიან ნებისმიერი ადგილიდან)',
    standardIcon: 'CROSS',
    artronSaas: '✅ სრულად ბლოკირებულია (Zero-Trust IpAddressGuard)',
    artronIcon: 'SHIELD'
  },
  {
    featureKey: 'branch_isolation',
    featureTitle: 'ფილიალების მიხედვით გამიჯვნა',
    standardSystem: '❌ გლობალური საერთო წვდომა',
    standardIcon: 'CROSS',
    artronSaas: '✅ მკაცრად კონკრეტული ფილიალის IP მისამართით',
    artronIcon: 'CHECK'
  },
  {
    featureKey: 'webauthn_integration',
    featureTitle: 'ბიომეტრიასთან (WebAuthn) ინტეგრაცია',
    standardSystem: '❌ არ გააჩნიათ',
    standardIcon: 'CROSS',
    artronSaas: '✅ ორმაგი დაცვა (Face ID / Passkey + Allowed IP)',
    artronIcon: 'SHIELD'
  },
  {
    featureKey: 'user_specific_rules',
    featureTitle: 'თანამშრომელზე ინდივიდუალური წესი',
    standardSystem: '❌ ერთი საერთო წესი ყველასთვის',
    standardIcon: 'CROSS',
    artronSaas: '✅ პერსონალური მორგება & Access All IPs ტოგლი',
    artronIcon: 'CHECK'
  },
  {
    featureKey: 'fraud_prevention',
    featureTitle: 'თაღლითური გაყიდვების რისკი',
    standardSystem: '⚠️ მაღალი (სახლიდან ჩეკის გაუქმება/თანხის გატარება)',
    standardIcon: 'WARN',
    artronSaas: '🛡️ 100%-ით აღკვეთილი (მხოლოდ ობიექტზე)',
    artronIcon: 'SHIELD'
  },
  {
    featureKey: 'audit_trail_depth',
    featureTitle: 'უსაფრთხოების აუდიტ ლოგები',
    standardSystem: '❌ მხოლოდ ავტორიზაციის ზოგადი ფაქტი',
    standardIcon: 'CROSS',
    artronSaas: '✅ IP-ის, მოწყობილობის, ლოკაციისა და მიზეზის დეტალური ლოგი',
    artronIcon: 'CHECK'
  }
];
