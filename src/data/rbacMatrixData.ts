export type PermissionAction = 'READ' | 'CREATE' | 'UPDATE' | 'DELETE' | 'MANAGE' | 'MANAGE_DEVICES' | 'SUPER';

export interface ModuleSubject {
  id: string;
  nameKa: string;
  nameEn: string;
  category: 'pos_sales' | 'customers' | 'staff' | 'infrastructure' | 'analytics' | 'marketing' | 'security';
  supportedActions: PermissionAction[];
  isSensitive?: boolean;
}

export interface RolePreset {
  id: string;
  code: string;
  nameKa: string;
  nameEn: string;
  badgeColor: string;
  icon: string;
  descriptionKa: string;
  descriptionEn: string;
  permissions: Record<string, PermissionAction[]>;
  blockedActionsNoteKa?: string;
  excludedFieldsKa?: string[];
}

export interface FieldSecurityItem {
  fieldNameKa: string;
  fieldNameEn: string;
  module: string;
  directorView: string;
  cashierView: string;
  isMaskedForCashier: boolean;
  securityReasonKa: string;
}

export interface BranchAccessRule {
  branchId: string;
  branchNameKa: string;
  branchNameEn: string;
  cashierAccess: boolean;
  accountantAccess: boolean;
  directorAccess: boolean;
  activeStatus: 'ALLOWED' | 'FORBIDDEN' | 'FULL_ACCESS';
}

export interface RbacAuditLog {
  id: string;
  timestamp: string;
  user: string;
  role: string;
  action: string;
  target: string;
  status: 'SUCCESS' | 'BLOCKED' | 'WARNING';
  detailsKa: string;
}

export const RBAC_MODULES: ModuleSubject[] = [
  // სალარო და გაყიდვები
  { id: 'SALE', nameKa: 'სალარო / გაყიდვები', nameEn: 'POS / Sales', category: 'pos_sales', supportedActions: ['READ', 'CREATE', 'UPDATE', 'DELETE', 'MANAGE'] },
  { id: 'LEGAL_SALE', nameKa: 'იურიდიული გაყიდვები', nameEn: 'B2B Legal Sales', category: 'pos_sales', supportedActions: ['READ', 'CREATE', 'UPDATE', 'DELETE'], isSensitive: true },
  { id: 'ACCESSORY_SALE', nameKa: 'აქსესუარები / ბარი', nameEn: 'Accessory & Bar Sales', category: 'pos_sales', supportedActions: ['READ', 'CREATE', 'UPDATE', 'DELETE'] },
  { id: 'BALANCE', nameKa: 'სალაროს ბალანსი', nameEn: 'Cashier Balance & Drawer', category: 'pos_sales', supportedActions: ['READ', 'UPDATE', 'MANAGE'], isSensitive: true },
  { id: 'PRODUCT', nameKa: 'პროდუქტების კატალოგი', nameEn: 'Products Catalog', category: 'pos_sales', supportedActions: ['READ', 'CREATE', 'UPDATE', 'DELETE'] },

  // კლიენტები და აბონემენტები
  { id: 'CUSTOMER', nameKa: 'კლიენტთა ბაზა', nameEn: 'Customer Registry', category: 'customers', supportedActions: ['READ', 'CREATE', 'UPDATE', 'DELETE', 'MANAGE'] },
  { id: 'ABONIMENT', nameKa: 'აბონემენტების მართვა', nameEn: 'Memberships Management', category: 'customers', supportedActions: ['READ', 'CREATE', 'UPDATE', 'DELETE', 'MANAGE'] },
  { id: 'TICKET', nameKa: 'ერთჯერადი ვიზიტები', nameEn: 'Single Tickets / Day-Pass', category: 'customers', supportedActions: ['READ', 'CREATE', 'UPDATE', 'DELETE'] },
  { id: 'BENEFIT', nameKa: 'ლოიალობა / ქეშბექი', nameEn: 'Loyalty & Cashback Points', category: 'customers', supportedActions: ['READ', 'UPDATE', 'MANAGE'] },
  { id: 'MEDICAL_CARD', nameKa: 'სამედიცინო ბარათები', nameEn: 'Medical / Fitness Cards', category: 'customers', supportedActions: ['READ', 'CREATE', 'UPDATE'], isSensitive: true },

  // პერსონალი და ტრენერები
  { id: 'USER', nameKa: 'თანამშრომელთა მართვა', nameEn: 'System Users & Staff', category: 'staff', supportedActions: ['READ', 'CREATE', 'UPDATE', 'DELETE', 'MANAGE'], isSensitive: true },
  { id: 'TRAINER', nameKa: 'ტრენერების რეესტრი', nameEn: 'Trainers Roster', category: 'staff', supportedActions: ['READ', 'CREATE', 'UPDATE', 'DELETE'] },
  { id: 'TRAINER_PACKAGE', nameKa: 'პერსონალური პაკეტები', nameEn: 'Personal Training Packages', category: 'staff', supportedActions: ['READ', 'CREATE', 'UPDATE', 'DELETE'] },
  { id: 'SHIFT', nameKa: 'ცვლები და №01-15/ნ', nameEn: 'Shifts & Time Tracking', category: 'staff', supportedActions: ['READ', 'CREATE', 'UPDATE', 'MANAGE'] },
  { id: 'ROLE', nameKa: 'როლები და უფლებები', nameEn: 'Roles & CASL Permissions', category: 'staff', supportedActions: ['READ', 'CREATE', 'UPDATE', 'DELETE', 'MANAGE'], isSensitive: true },

  // ინფრასტრუქტურა და ტურნიკეტები
  { id: 'BRANCH', nameKa: 'ფილიალების მართვა', nameEn: 'Multi-Branch Engine', category: 'infrastructure', supportedActions: ['READ', 'CREATE', 'UPDATE', 'MANAGE'], isSensitive: true },
  { id: 'TURNIKET_DEVICE', nameKa: 'ტურნიკეტები & IoT', nameEn: 'Turnstiles & IoT Relays', category: 'infrastructure', supportedActions: ['READ', 'UPDATE', 'MANAGE_DEVICES', 'MANAGE'] },
  { id: 'LOCKER', nameKa: 'ჭკვიანი ლოქერები', nameEn: 'Smart Lockers & RFID', category: 'infrastructure', supportedActions: ['READ', 'UPDATE', 'MANAGE_DEVICES'] },

  // ანალიტიკა და ფინანსები
  { id: 'KPI_DASHBOARD', nameKa: 'KPI & ფინანსური დაფა', nameEn: 'Executive KPI Dashboard', category: 'analytics', supportedActions: ['READ', 'MANAGE'], isSensitive: true },
  { id: 'STATISTIC_SALES', nameKa: 'შემოსავლების ანალიტიკა', nameEn: 'Revenue Dynamics & MRR', category: 'analytics', supportedActions: ['READ'], isSensitive: true },
  { id: 'WIN_BACK_ANALYTICS', nameKa: 'Win-Back & Churn AI', nameEn: 'Win-Back & Churn Engine', category: 'analytics', supportedActions: ['READ', 'MANAGE'] },
  { id: 'REPORT', nameKa: 'საგადასახადო რეესტრი', nameEn: 'Statutory Tax Reports', category: 'analytics', supportedActions: ['READ', 'MANAGE'], isSensitive: true },

  // მარკეტინგი და კომუნიკაცია
  { id: 'PROMOTION', nameKa: 'აქციები და ფასდაკლებები', nameEn: 'Promotions & Discounts', category: 'marketing', supportedActions: ['READ', 'CREATE', 'UPDATE', 'DELETE'] },
  { id: 'SMS_ANALYTICS', nameKa: 'GoSMS / Push კამპანიები', nameEn: 'GoSMS & Push Notifications', category: 'marketing', supportedActions: ['READ', 'CREATE', 'MANAGE'] },
  { id: 'FACEBOOK', nameKa: 'სარეკლამო ინტეგრაციები', nameEn: 'Ad Platform Connectors', category: 'marketing', supportedActions: ['READ', 'MANAGE'] },

  // უსაფრთხოება და ქსელი
  { id: 'IP', nameKa: 'IP Whitelist რეესტრი', nameEn: 'IP Whitelist & Geo Rules', category: 'security', supportedActions: ['READ', 'CREATE', 'UPDATE', 'DELETE', 'MANAGE'], isSensitive: true },
  { id: 'AUDIT_LOGS', nameKa: 'უსაფრთხოების აუდიტი', nameEn: 'Security Audit Trails', category: 'security', supportedActions: ['READ', 'MANAGE'], isSensitive: true }
];

export const PRESET_ROLES: RolePreset[] = [
  {
    id: 'cashier',
    code: 'CASHIER_ADMIN',
    nameKa: 'მოლარე-ადმინისტრატორი',
    nameEn: 'Cashier & Front Desk Admin',
    badgeColor: '#00A3FF',
    icon: '🎟️',
    descriptionKa: 'აბონემენტების გაყიდვა, კლიენტის რეგისტრაცია და Check-in. მკაცრად დაბლოკილია გაყიდვების წაშლა (DELETE), ფინანსური ანგარიშები და ხელფასები.',
    descriptionEn: 'Pass sales, customer onboarding and access check-ins. Strictly barred from deleting sales records, viewing global finances or salaries.',
    blockedActionsNoteKa: '⚠️ SALE: DELETE დაბლოკილია შიდა თაღლითობის პრევენციისთვის. KPI & ფინანსები დაფარულია.',
    excludedFieldsKa: ['personal_id (პირადი ნომერი)', 'trainer_salary (ხელფასები)', 'cost_price (თვითღირებულება)'],
    permissions: {
      SALE: ['READ', 'CREATE'],
      ACCESSORY_SALE: ['READ', 'CREATE'],
      CUSTOMER: ['READ', 'CREATE', 'UPDATE'],
      ABONIMENT: ['READ', 'CREATE', 'UPDATE'],
      TICKET: ['READ', 'CREATE'],
      TURNIKET_DEVICE: ['READ', 'MANAGE_DEVICES'],
      LOCKER: ['READ'],
      BENEFIT: ['READ', 'UPDATE']
    }
  },
  {
    id: 'accountant',
    code: 'CHIEF_ACCOUNTANT',
    nameKa: 'მთავარი ბუღალტერი',
    nameEn: 'Chief Accountant & Finance Lead',
    badgeColor: '#10B981',
    icon: '💼',
    descriptionKa: 'სრული წვდომა ფინანსურ ნაკადებზე, საგადასახადო ანგარიშგებებზე, სალაროს ბალანსსა და ხელფასების უწყისზე.',
    descriptionEn: 'Full access to fiscal ledgers, cash drawer balances, tax reports and payroll sheets. Read-only for gym floor operations.',
    blockedActionsNoteKa: '⚠️ წვდომა აქვს ყველა ფინანსურ მოდულზე; შეზღუდულია ტურნიკეტების დისტანციური გაღება.',
    excludedFieldsKa: [],
    permissions: {
      SALE: ['READ', 'UPDATE'],
      LEGAL_SALE: ['READ', 'CREATE', 'UPDATE', 'DELETE'],
      BALANCE: ['READ', 'UPDATE', 'MANAGE'],
      PRODUCT: ['READ', 'CREATE', 'UPDATE'],
      KPI_DASHBOARD: ['READ'],
      STATISTIC_SALES: ['READ'],
      REPORT: ['READ', 'MANAGE'],
      SHIFT: ['READ']
    }
  },
  {
    id: 'head_trainer',
    code: 'HEAD_TRAINER',
    nameKa: 'უფროსი ტრენერი',
    nameEn: 'Head Fitness Trainer & Coach Lead',
    badgeColor: '#F59E0B',
    icon: '🏋️',
    descriptionKa: 'ტრენერების გრაფიკები, პერსონალური ვარჯიშების პაკეტები, დასწრების აღრიცხვა და ჯგუფური გაკვეთილები.',
    descriptionEn: 'Trainer rosters, group workouts, personal coaching packages, and workout tracking.',
    blockedActionsNoteKa: '⚠️ სალარო და გლობალური ფინანსური რეესტრი დაბლოკილია.',
    excludedFieldsKa: ['profit_margins', 'club_revenue'],
    permissions: {
      TRAINER: ['READ', 'UPDATE'],
      TRAINER_PACKAGE: ['READ', 'CREATE', 'UPDATE'],
      CUSTOMER: ['READ'],
      SHIFT: ['READ', 'CREATE', 'UPDATE'],
      TURNIKET_DEVICE: ['READ']
    }
  },
  {
    id: 'doctor',
    code: 'FITNESS_DOCTOR',
    nameKa: 'ფიტნეს ექიმი / დიეტოლოგი',
    nameEn: 'Club Physician & Nutritionist',
    badgeColor: '#EC4899',
    icon: '🩺',
    descriptionKa: 'კლიენტების სამედიცინო ისტორია, ჯანმრთელობის რისკ-ფაქტორები, კვების რაციონები და ფიტნეს-ტესტირების ანალიზები.',
    descriptionEn: 'Athlete medical clearances, dietary programs and health screening records.',
    blockedActionsNoteKa: '⚠️ წვდომა მხოლოდ სამედიცინო მოდულზე; ფინანსური და სალარო მოდულები სრულად დაბლოკილია.',
    excludedFieldsKa: ['financial_transactions', 'membership_prices'],
    permissions: {
      MEDICAL_CARD: ['READ', 'CREATE', 'UPDATE'],
      CUSTOMER: ['READ']
    }
  },
  {
    id: 'marketing',
    code: 'MARKETING_MANAGER',
    nameKa: 'მარკეტინგის მენეჯერი',
    nameEn: 'Growth & Marketing Specialist',
    badgeColor: '#8B5CF6',
    icon: '📈',
    descriptionKa: 'SMS აქციები, პრომო-კოდები, ფასდაკლებები, Win-Back დაკარგული კლიენტების დაბრუნება და სარეკლამო კამპანიები.',
    descriptionEn: 'SMS blasts, loyalty promos, discount vouchers, Win-Back analytics and campaign ROI.',
    blockedActionsNoteKa: '⚠️ სალაროს ფულად ბალანსზე წვდომა დაბლოკილია.',
    excludedFieldsKa: ['employee_salaries', 'tax_ledgers'],
    permissions: {
      PROMOTION: ['READ', 'CREATE', 'UPDATE', 'DELETE'],
      SMS_ANALYTICS: ['READ', 'CREATE', 'MANAGE'],
      FACEBOOK: ['READ', 'MANAGE'],
      WIN_BACK_ANALYTICS: ['READ', 'MANAGE'],
      CUSTOMER: ['READ']
    }
  },
  {
    id: 'super_admin',
    code: 'SUPER_ADMIN',
    nameKa: 'გენერალური დირექტორი (SuperAdmin)',
    nameEn: 'Managing Director & SuperAdmin',
    badgeColor: '#00D2FF',
    icon: '👑',
    descriptionKa: 'შეუზღუდავი წვდომა ყველა ფილიალზე, ყველა მოდულზე, ფინანსებსა და უსაფრთხოების კონფიგურაციაზე (CASL Super God Mode).',
    descriptionEn: 'Unrestricted enterprise access across all multi-tenant branches, fiscal ledgers, turnstile hardware and security configs.',
    blockedActionsNoteKa: '⚡ შეუზღუდავი გლობალური წვდომა (Full SuperAdmin Mode).',
    excludedFieldsKa: [],
    permissions: {
      SALE: ['READ', 'CREATE', 'UPDATE', 'DELETE', 'MANAGE'],
      LEGAL_SALE: ['READ', 'CREATE', 'UPDATE', 'DELETE'],
      ACCESSORY_SALE: ['READ', 'CREATE', 'UPDATE', 'DELETE'],
      BALANCE: ['READ', 'UPDATE', 'MANAGE'],
      PRODUCT: ['READ', 'CREATE', 'UPDATE', 'DELETE'],
      CUSTOMER: ['READ', 'CREATE', 'UPDATE', 'DELETE', 'MANAGE'],
      ABONIMENT: ['READ', 'CREATE', 'UPDATE', 'DELETE', 'MANAGE'],
      TICKET: ['READ', 'CREATE', 'UPDATE', 'DELETE'],
      BENEFIT: ['READ', 'UPDATE', 'MANAGE'],
      MEDICAL_CARD: ['READ', 'CREATE', 'UPDATE'],
      USER: ['READ', 'CREATE', 'UPDATE', 'DELETE', 'MANAGE'],
      TRAINER: ['READ', 'CREATE', 'UPDATE', 'DELETE'],
      TRAINER_PACKAGE: ['READ', 'CREATE', 'UPDATE', 'DELETE'],
      SHIFT: ['READ', 'CREATE', 'UPDATE', 'MANAGE'],
      ROLE: ['READ', 'CREATE', 'UPDATE', 'DELETE', 'MANAGE'],
      BRANCH: ['READ', 'CREATE', 'UPDATE', 'MANAGE'],
      TURNIKET_DEVICE: ['READ', 'UPDATE', 'MANAGE_DEVICES', 'MANAGE'],
      LOCKER: ['READ', 'UPDATE', 'MANAGE_DEVICES'],
      KPI_DASHBOARD: ['READ', 'MANAGE'],
      STATISTIC_SALES: ['READ'],
      WIN_BACK_ANALYTICS: ['READ', 'MANAGE'],
      REPORT: ['READ', 'MANAGE'],
      PROMOTION: ['READ', 'CREATE', 'UPDATE', 'DELETE'],
      SMS_ANALYTICS: ['READ', 'CREATE', 'MANAGE'],
      FACEBOOK: ['READ', 'MANAGE'],
      IP: ['READ', 'CREATE', 'UPDATE', 'DELETE', 'MANAGE'],
      AUDIT_LOGS: ['READ', 'MANAGE']
    }
  }
];

export const FIELD_SECURITY_SAMPLES: FieldSecurityItem[] = [
  {
    fieldNameKa: 'პირადი ნომერი (National ID)',
    fieldNameEn: 'National ID / Personal Code',
    module: 'CUSTOMER',
    directorView: '01024089943 (გაშიფრული AES-256)',
    cashierView: '••••••••••• (სერვერიდანვე დაბლოკილი)',
    isMaskedForCashier: true,
    securityReasonKa: 'პერსონალურ მონაცემთა დაცვის კანონი და ბაზის მოპარვის პრევენცია.'
  },
  {
    fieldNameKa: 'მობილურის ნომერი (Phone Number)',
    fieldNameEn: 'Client Mobile Number',
    module: 'CUSTOMER',
    directorView: '+995 599 12 34 56',
    cashierView: '+995 599 •• •• 56 (ნიღბირებული)',
    isMaskedForCashier: true,
    securityReasonKa: 'თანამშრომლის მიერ კლიენტების ბაზის გადატვირთვის აღკვეთა.'
  },
  {
    fieldNameKa: 'პროდუქტის თვითღირებულება (Cost Price)',
    fieldNameEn: 'Inventory Cost Price',
    module: 'PRODUCT',
    directorView: '₾14.50 (მარჟა: 65%)',
    cashierView: '[დამალული ველი - ExcludedField]',
    isMaskedForCashier: true,
    securityReasonKa: 'კომერციული საიდუმლოება და მომწოდებლის ფასების დაცვა.'
  },
  {
    fieldNameKa: 'ტრენერის ხელფასი & ბონუსი',
    fieldNameEn: 'Trainer Payroll & Bonus',
    module: 'USER / SHIFT',
    directorView: '₾2,850.00 / თვეში',
    cashierView: '[წვდომა აკრძალულია 403]',
    isMaskedForCashier: true,
    securityReasonKa: 'თანამშრომელთა სახელფასო კონფიდენციალურობა.'
  }
];

export const BRANCH_ACCESS_SAMPLES: BranchAccessRule[] = [
  {
    branchId: 'saburtalo',
    branchNameKa: 'საბურთალოს ფილიალი (ცენტრალური)',
    branchNameEn: 'Saburtalo Central Branch',
    cashierAccess: true,
    accountantAccess: true,
    directorAccess: true,
    activeStatus: 'ALLOWED'
  },
  {
    branchId: 'vake',
    branchNameKa: 'ვაკის პრემიუმ დარბაზი',
    branchNameEn: 'Vake Premium Gym',
    cashierAccess: false,
    accountantAccess: true,
    directorAccess: true,
    activeStatus: 'FORBIDDEN'
  },
  {
    branchId: 'batumi',
    branchNameKa: 'ბათუმის ოლიმპიური აუზი',
    branchNameEn: 'Batumi Olympic Pool',
    cashierAccess: false,
    accountantAccess: true,
    directorAccess: true,
    activeStatus: 'FORBIDDEN'
  }
];

export const RBAC_AUDIT_FEED_SAMPLES: RbacAuditLog[] = [
  {
    id: 'log-1',
    timestamp: '17:48:22',
    user: 'ნინო ბ. (მოლარე)',
    role: 'CASHIER_ADMIN',
    action: 'SALE:DELETE',
    target: 'ჩეკი #4982 (₾180.00)',
    status: 'BLOCKED',
    detailsKa: 'დაბლოკილია CASL Policy-ით: მოლარეს არ აქვს ჩეკის წაშლის უფლება.'
  },
  {
    id: 'log-2',
    timestamp: '17:45:10',
    user: 'გიორგი მ. (დირექტორი)',
    role: 'SUPER_ADMIN',
    action: 'ROLE:UPDATE',
    target: 'როლი „უფროსი ტრენერი“',
    status: 'SUCCESS',
    detailsKa: 'დაემატა SHIFT:UPDATE ნებართვა საბურთალოს ფილიალზე.'
  },
  {
    id: 'log-3',
    timestamp: '17:41:04',
    user: 'ნინო ბ. (მოლარე)',
    role: 'CASHIER_ADMIN',
    action: 'CUSTOMER:READ_PII',
    target: 'კლიენტი #10842',
    status: 'WARNING',
    detailsKa: 'პირადი ნომერი დაფარულია ExcludedFieldsInterceptor-ით.'
  },
  {
    id: 'log-4',
    timestamp: '17:35:19',
    user: 'თამარ კ. (ბუღალტერი)',
    role: 'CHIEF_ACCOUNTANT',
    action: 'REPORT:EXPORT',
    target: 'თვის ფინანსური რეესტრი',
    status: 'SUCCESS',
    detailsKa: 'ექსპორტირებული იქნა დაშიფრული საგადასახადო უწყისი.'
  }
];
