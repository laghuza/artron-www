import {
  VoiceScenario,
  OcrIdPreset,
  ChatScenario,
  ComparisonMetric
} from '@/types/multimodalAi';

export const VOICE_SCENARIOS: VoiceScenario[] = [
  {
    id: 'voice-trainer-1',
    titleKa: 'ახალი მწვრთნელის რეგისტრაცია',
    roleBadgeKa: 'მწვრთნელი',
    spokenAudioTextKa: '„დაარეგისტრირე ახალი თანამშრომელი გიორგი ბაკურაძე, ტელეფონი 599 12 34 56, პირადი ნომერი 01019012345, პოზიცია უფროსი მწვრთნელი, ფილიალი ვაკე.“',
    durationSec: 3.8,
    extractedData: {
      fullNameKa: 'გიორგი ბაკურაძე',
      fullNameEn: 'GIORGI BAKURADZE',
      personalId: '01019012345',
      phone: '+995 599 12 34 56',
      roleOrPlanKa: 'უფროსი მწვრთნელი (Senior Coach)',
      branchKa: 'ვაკის ფილიალი (Vake Branch)',
      confidenceScore: 99.8,
      extractedVia: 'VOICE',
      functionCalled: 'staffService.createTrainerRecord()'
    }
  },
  {
    id: 'voice-member-2',
    titleKa: 'პრემიუმ აბონემენტის გააქტიურება',
    roleBadgeKa: 'კლიენტი',
    spokenAudioTextKa: '„გააფორმე 3-თვიანი ულიმიტო პაკეტი ანა ჩხეიძეზე, ტელეფონი 577 40 50 60, პირადი ნომერი 62001045678, საბურთალოს ფილიალში.“',
    durationSec: 4.2,
    extractedData: {
      fullNameKa: 'ანა ჩხეიძე',
      fullNameEn: 'ANA CHKHEIDZE',
      personalId: '62001045678',
      phone: '+995 577 40 50 60',
      roleOrPlanKa: '3-თვიანი All-Inclusive + აუზი',
      branchKa: 'საბურთალოს ფილიალი (Saburtalo)',
      confidenceScore: 99.6,
      extractedVia: 'VOICE',
      functionCalled: 'membershipService.issueSubscription()'
    }
  }
];

export const OCR_PRESETS: OcrIdPreset[] = [
  {
    id: 'ocr-georgian-id',
    titleKa: 'საქართველოს მოქალაქის პირადობის მოწმობა',
    cardTypeKa: 'GEO ELECTRONIC ID CARD',
    documentNumber: '14IA89012',
    extractedData: {
      fullNameKa: 'ლუკა კვარაცხელია',
      fullNameEn: 'LUKA KVARATSKHELIA',
      personalId: '01024089123',
      phone: '+995 598 77 88 99',
      roleOrPlanKa: 'წლიური VIP წევრი (VIP Member)',
      branchKa: 'ცენტრალური ფილიალი (Main Hub)',
      birthDate: '12.02.1996',
      genderKa: 'მამრობითი / M',
      expiryDate: '15.08.2032',
      confidenceScore: 99.9,
      extractedVia: 'VISION_OCR',
      functionCalled: 'ocrVisionService.extractNationalId()'
    }
  },
  {
    id: 'ocr-foreign-passport',
    titleKa: 'საერთაშორისო პასპორტი (Expat / Tourist)',
    cardTypeKa: 'INTERNATIONAL PASSPORT',
    documentNumber: 'N58912044',
    extractedData: {
      fullNameKa: 'ალექსანდრ სმირნოვი',
      fullNameEn: 'ALEXANDER SMIRNOV',
      personalId: 'PASSPORT-N58912044',
      phone: '+995 555 11 22 33',
      roleOrPlanKa: '1-თვიანი ფიტნეს პაკეტი',
      branchKa: 'ბათუმის ფილიალი (Batumi Branch)',
      birthDate: '24.07.1991',
      genderKa: 'მამრობითი / M',
      expiryDate: '10.11.2029',
      confidenceScore: 99.7,
      extractedVia: 'VISION_OCR',
      functionCalled: 'ocrVisionService.extractPassportData()'
    }
  }
];

export const CHAT_SCENARIOS: ChatScenario[] = [
  {
    id: 'chat-cashier-add',
    promptKa: 'დაამატე ახალი მოლარე ნინო კაპანაძე, 577 00 11 22, პირადი ნომერი 01017055443, ვაკის ფილიალში',
    labelKa: 'ახალი მოლარის დამატება',
    category: 'REGISTRATION',
    functionName: 'staffService.registerCashier()',
    aiReplyKa: 'გასაგებია! მოლარე ნინო კაპანაძის მონაცემები ამოცნობილია. გთხოვთ დაადასტუროთ ბარათი:',
    extractedData: {
      fullNameKa: 'ნინო კაპანაძე',
      fullNameEn: 'NINO KAPANADZE',
      personalId: '01017055443',
      phone: '+995 577 00 11 22',
      roleOrPlanKa: 'მოლარე-ადმინისტრატორი (Cashier)',
      branchKa: 'ვაკის ფილიალი (Vake Branch)',
      confidenceScore: 99.8,
      extractedVia: 'NATURAL_CHAT',
      functionCalled: 'staffService.registerCashier()'
    }
  },
  {
    id: 'chat-phone-update',
    promptKa: 'შეუცვალე ტელეფონის ნომერი ირაკლი მესხს (01019088776) — ახალი ნომერია 598 44 55 66',
    labelKa: 'ტელეფონის ნომრის შეცვლა',
    category: 'UPDATE',
    functionName: 'customerService.updatePhone()',
    aiReplyKa: 'მომხმარებელი ირაკლი მესხი ნაპოვნია ბაზაში. მზადდება საკონტაქტო ნომრის განახლება:',
    extractedData: {
      fullNameKa: 'ირაკლი მესხი',
      fullNameEn: 'IRAKLI MESKHI',
      personalId: '01019088776',
      phone: '+995 598 44 55 66',
      roleOrPlanKa: 'აქტიური წევრი (Active Member)',
      branchKa: 'საბურთალოს ფილიალი',
      confidenceScore: 99.9,
      extractedVia: 'NATURAL_CHAT',
      functionCalled: 'customerService.updatePhone()'
    }
  },
  {
    id: 'chat-revoke-access',
    promptKa: 'გაუთიშე ტურნიკეტის წვდომა თანამშრომელ დავით ცინცაძეს (01029011223) ხელშეკრულების შეწყვეტის გამო',
    labelKa: 'წვდომის დაუყოვნებლივ გათიშვა',
    category: 'REVOKE',
    functionName: 'turnstileService.revokeAccessCode()',
    aiReplyKa: 'ყურადღება: თანამშრომელ დავით ცინცაძეს გაეთიშება ყველა ტურნიკეტის კოდი. გთხოვთ დაადასტუროთ ბრძანება:',
    extractedData: {
      fullNameKa: 'დავით ცინცაძე',
      fullNameEn: 'DAVIT TSINTSADZE',
      personalId: '01029011223',
      phone: '+995 599 33 44 55',
      roleOrPlanKa: 'ყოფილი მწვრთნელი (Access Revoked)',
      branchKa: 'ყველა ფილიალი (All Branches)',
      confidenceScore: 100,
      extractedVia: 'NATURAL_CHAT',
      functionCalled: 'turnstileService.revokeAccessCode()'
    }
  }
];

export const COMPARISON_METRICS: ComparisonMetric[] = [
  {
    titleKa: 'რეგისტრაციის დრო',
    traditionalWayKa: '3 - 5 წუთი (ხელით შეყვანა)',
    artronAiWayKa: '5 - 10 წამი (მყისიერი)',
    icon: 'zap',
    badgeKa: '90%-ით სწრაფი'
  },
  {
    titleKa: 'ხმოვანი ბრძანებებით მართვა',
    traditionalWayKa: 'არ გააჩნიათ (მხოლოდ კლავიატურა)',
    artronAiWayKa: 'სრული მხარდაჭერა ქართულ ენაზე',
    icon: 'mic',
    badgeKa: 'Google STT'
  },
  {
    titleKa: 'პირადობის მოწმობის OCR',
    traditionalWayKa: '11 ციფრის ხელით გადაწერა',
    artronAiWayKa: '1-წამიანი ამოკითხვა კამერით',
    icon: 'scan',
    badgeKa: 'Gemini Vision'
  },
  {
    titleKa: 'შეცდომების რისკი ბაზაში',
    traditionalWayKa: 'მაღალი (არასწორი ციფრები/ასოები)',
    artronAiWayKa: '0% შეცდომა (Zero Hallucination)',
    icon: 'shield',
    badgeKa: '100% სიზუსტე'
  },
  {
    titleKa: 'მომხმარებელთა რიგები',
    traditionalWayKa: 'რიგები პიკურ საათებში (18:00-21:00)',
    artronAiWayKa: '0 რიგი, ექსპრეს-მომსახურება',
    icon: 'users',
    badgeKa: 'VIP Experience'
  }
];
