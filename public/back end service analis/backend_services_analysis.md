# ⚙️ NestJS ბექენდის სერვისებისა და ფუნქციების სრული ანალიზი

**პროექტი:** Fitness SaaS Ecosystem (Backend Engine)  
**გენერირების თარიღი:** 2026-07-22  
**სერვისების საერთო რაოდენობა:** 117  
**მოდულების რაოდენობა:** 85  

---

## 📌 სარჩევი (Modules Overview)

1. [AI & VOICE SPEECH (1 სერვისი)](#ai-voice-speech)
2. [AUTHENTICATION (3 სერვისი)](#authentication)
3. [CORE / INFRASTRUCTURE (7 სერვისი)](#core-infrastructure)
4. [GEMINI AI (1 სერვისი)](#gemini-ai)
5. [QR (1 სერვისი)](#qr)
6. [ABONIMENT (1 სერვისი)](#aboniment)
7. [ACCESS (1 სერვისი)](#access)
8. [ACCESSORY-SALE (1 სერვისი)](#accessory-sale)
9. [ALLOWED-IP (1 სერვისი)](#allowed-ip)
10. [AUDIT (1 სერვისი)](#audit)
11. [BENEFIT (1 სერვისი)](#benefit)
12. [BOT (3 სერვისი)](#bot)
13. [CARD (1 სერვისი)](#card)
14. [CASHBACK (1 სერვისი)](#cashback)
15. [CHURN-PREDICTION (1 სერვისი)](#churn-prediction)
16. [COMPANY (6 სერვისი)](#company)
17. [CREDENTIAL (1 სერვისი)](#credential)
18. [CUSTOMER (2 სერვისი)](#customer)
19. [CUSTOMER-VISITS (1 სერვისი)](#customer-visits)
20. [DOCTOR (1 სერვისი)](#doctor)
21. [DYNAMIC-BOT (1 სერვისი)](#dynamic-bot)
22. [EMAIL (2 სერვისი)](#email)
23. [ENROLLMENT (1 სერვისი)](#enrollment)
24. [EQUIPMENT (2 სერვისი)](#equipment)
25. [EXTERNAL-API (1 სერვისი)](#external-api)
26. [FACEBOOK (3 სერვისი)](#facebook)
27. [GIVEAWAY (1 სერვისი)](#giveaway)
28. [GO-SMS-API (1 სერვისი)](#go-sms-api)
29. [GUEST (1 სერვისი)](#guest)
30. [HANDOVER (1 სერვისი)](#handover)
31. [IP (1 სერვისი)](#ip)
32. [KEEPZ-PAYMENT (1 სერვისი)](#keepz-payment)
33. [KPI-DASHBOARD (1 სერვისი)](#kpi-dashboard)
34. [LEGAL-CLIENT (1 სერვისი)](#legal-client)
35. [LEGAL-COMPANY (1 სერვისი)](#legal-company)
36. [LEGAL-SALE (1 სერვისი)](#legal-sale)
37. [LOCKER (1 სერვისი)](#locker)
38. [MAINTENANCE (1 სერვისი)](#maintenance)
39. [MARKET-ANALYTICS (1 სერვისი)](#market-analytics)
40. [MEET (3 სერვისი)](#meet)
41. [MESSAGE-BUILDER (1 სერვისი)](#message-builder)
42. [MONEY-EXCHANGE (1 სერვისი)](#money-exchange)
43. [MONITORING (1 სერვისი)](#monitoring)
44. [MUSIC (2 სერვისი)](#music)
45. [NAVIGATION (1 სერვისი)](#navigation)
46. [NEWS (1 სერვისი)](#news)
47. [ORDER (1 სერვისი)](#order)
48. [PDF (1 სერვისი)](#pdf)
49. [PERMISSION (1 სერვისი)](#permission)
50. [PIN (1 სერვისი)](#pin)
51. [PLAN (2 სერვისი)](#plan)
52. [PRODUCT (1 სერვისი)](#product)
53. [PRODUCT-CATEGORY (1 სერვისი)](#product-category)
54. [PROMOTION (1 სერვისი)](#promotion)
55. [PURCHASE (1 სერვისი)](#purchase)
56. [PUSH-ANALYTICS (1 სერვისი)](#push-analytics)
57. [PUSH-NOTIFICATION (1 სერვისი)](#push-notification)
58. [RECIPE (1 სერვისი)](#recipe)
59. [REFERRAL (1 სერვისი)](#referral)
60. [ROLE (1 სერვისი)](#role)
61. [RS (5 სერვისი)](#rs)
62. [SALES (1 სერვისი)](#sales)
63. [SCHEDULE (1 სერვისი)](#schedule)
64. [SECURITY (1 სერვისი)](#security)
65. [SERVICE (1 სერვისი)](#service)
66. [SETTINGS (1 სერვისი)](#settings)
67. [SINGLE-SALE (1 სერვისი)](#single-sale)
68. [SMS-ANALYTICS (1 სერვისი)](#sms-analytics)
69. [SUBSCRIPTION-LIMIT (1 სერვისი)](#subscription-limit)
70. [SUPPLIER (1 სერვისი)](#supplier)
71. [SUPPORT (2 სერვისი)](#support)
72. [TABLE-SETTINGS (1 სერვისი)](#table-settings)
73. [TEMPLATE (1 სერვისი)](#template)
74. [TICKET (1 სერვისი)](#ticket)
75. [TODO (1 სერვისი)](#todo)
76. [TRAINER (2 სერვისი)](#trainer)
77. [TRAINER-PACKAGE (1 სერვისი)](#trainer-package)
78. [TURNIKET (1 სერვისი)](#turniket)
79. [USER (2 სერვისი)](#user)
80. [VIDEO (1 სერვისი)](#video)
81. [WEATHER-NOTIFICATION (1 სერვისი)](#weather-notification)
82. [WEBAUTHN (1 სერვისი)](#webauthn)
83. [WIN-BACK (2 სერვისი)](#win-back)
84. [WORKOUT (1 სერვისი)](#workout)
85. [WORKOUT-SALES (1 სერვისი)](#workout-sales)

---

## 📦 მოდული: AI & VOICE SPEECH

### 🔹 `SpeechService`
- **ფაილის გზა:** [`back/src/speech/speech.service.ts`](file:///C:/Users/Gio/Desktop/fitness-saas/back/src/speech/speech.service.ts)
- **ფუნქციების რაოდენობა:** 3

| ფუნქციის დასახელება | ტიპი | პარამეტრები (Input) | დაბრუნებული ტიპი | აღწერა და ლოგიკა |
| :--- | :--- | :--- | :--- | :--- |
| `transcribeOgg()` | 🌐 public / ⚡ async | `buffer: Buffer` | `Promise<string>` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `convertOggToLinear16()` | 🔒 private / 🔄 sync | `buffer: Buffer` | `Promise<Buffer>` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `ffmpeg()` | 🌐 public / 🔄 sync | `input` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |

---

## 📦 მოდული: AUTHENTICATION

### 🔹 `CustomerAuthService`
- **ფაილის გზა:** [`back/src/authentication/customer-auth/customer.auth.service.ts`](file:///C:/Users/Gio/Desktop/fitness-saas/back/src/authentication/customer-auth/customer.auth.service.ts)
- **ფუნქციების რაოდენობა:** 2

| ფუნქციის დასახელება | ტიპი | პარამეტრები (Input) | დაბრუნებული ტიპი | აღწერა და ლოგიკა |
| :--- | :--- | :--- | :--- | :--- |
| `validateCustomer()` | 🌐 public / ⚡ async | `customerName: string, password: string` | `Promise<any>` | მონაცემთა ვალიდაცია და წესებთან თავსებადობის შემოწმება |
| `login()` | 🌐 public / ⚡ async | `profile_data: Customer` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |

### 🔹 `TrainerAuthService`
- **ფაილის გზა:** [`back/src/authentication/trainer-auth/trainer.auth.service.ts`](file:///C:/Users/Gio/Desktop/fitness-saas/back/src/authentication/trainer-auth/trainer.auth.service.ts)
- **ფუნქციების რაოდენობა:** 2

| ფუნქციის დასახელება | ტიპი | პარამეტრები (Input) | დაბრუნებული ტიპი | აღწერა და ლოგიკა |
| :--- | :--- | :--- | :--- | :--- |
| `validateTrainer()` | 🌐 public / ⚡ async | `email: string, password: string` | `Promise<any>` | მონაცემთა ვალიდაცია და წესებთან თავსებადობის შემოწმება |
| `login()` | 🔒 private / ⚡ async | `profile_data: Trainer` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |

### 🔹 `UserAuthService`
- **ფაილის გზა:** [`back/src/authentication/user-auth/user.auth.service.ts`](file:///C:/Users/Gio/Desktop/fitness-saas/back/src/authentication/user-auth/user.auth.service.ts)
- **ფუნქციების რაოდენობა:** 1

| ფუნქციის დასახელება | ტიპი | პარამეტრები (Input) | დაბრუნებული ტიპი | აღწერა და ლოგიკა |
| :--- | :--- | :--- | :--- | :--- |
| `login()` | 🌐 public / ⚡ async | `data: Profile` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |

---

## 📦 მოდული: CORE / INFRASTRUCTURE

### 🔹 `AiAgentService`
- **ფაილის გზა:** [`back/src/AI/ai-agent.service.ts`](file:///C:/Users/Gio/Desktop/fitness-saas/back/src/AI/ai-agent.service.ts)
- **ფუნქციების რაოდენობა:** 3

| ფუნქციის დასახელება | ტიპი | პარამეტრები (Input) | დაბრუნებული ტიპი | აღწერა და ლოგიკა |
| :--- | :--- | :--- | :--- | :--- |
| `getFunctionCalls()` | 🔒 private / 🔄 sync | `response: any` | `any[] \| undefined` | უსაფრთხოდ ამოიღებს Gemini-ს პასუხიდან Function Call-ებს (ხელსაწყოების გამოძახებებს) / |
| `getTools()` | 🔒 private / 🔄 sync | `არაფერი` | `any` | აბრუნებს ხელსაწყოების სიას (Tools) / |
| `userModelUpdateDirect()` | 🔒 private / ⚡ async | `userID: string, payload: any` | `Promise<any>` | Helper to perform user update directly / |

### 🔹 `AIService`
- **ფაილის გზა:** [`back/src/AI/ai.service.ts`](file:///C:/Users/Gio/Desktop/fitness-saas/back/src/AI/ai.service.ts)
- **ფუნქციების რაოდენობა:** 1

| ფუნქციის დასახელება | ტიპი | პარამეტრები (Input) | დაბრუნებული ტიპი | აღწერა და ლოგიკა |
| :--- | :--- | :--- | :--- | :--- |
| `handleNaturalLanguageQuery()` | 🌐 public / ⚡ async | `question: string` | `any` | იღებს ბუნებრივ ენაზე დასმულ კითხვას გაყიდვების შესახებ და გარდაქმნის MongoDB aggregate pipeline-ად. / |

### 🔹 `AvatarProcessorService`
- **ფაილის გზა:** [`back/src/AI/avatar-processor.service.ts`](file:///C:/Users/Gio/Desktop/fitness-saas/back/src/AI/avatar-processor.service.ts)
- **ფუნქციების რაოდენობა:** 0

*სერვისში ფუნქციები არ მოიძებნა ან მხოლოდ დამხმარე კონსტრუქტორია.*

### 🔹 `DuplicateDetectorService`
- **ფაილის გზა:** [`back/src/AI/duplicate-detector.service.ts`](file:///C:/Users/Gio/Desktop/fitness-saas/back/src/AI/duplicate-detector.service.ts)
- **ფუნქციების რაოდენობა:** 1

| ფუნქციის დასახელება | ტიპი | პარამეტრები (Input) | დაბრუნებული ტიპი | აღწერა და ლოგიკა |
| :--- | :--- | :--- | :--- | :--- |
| `findPotentialDuplicates()` | 🌐 public / ⚡ async | `companyID: string, data: any` | `Promise<any[]>` | ეძებს პოტენციურ დუბლიკატებს სახელით, გვარით, პირადი ნომრით, ტელეფონით ან იმეილით. @param companyID კომპანიის ID (ფილიალების იზოლაციისთვის) @param data შესადარებელი მონაცემები (დრაფტი) @returns პოტენციური დუბლიკატი მომხმარებლების სია დამთხვევის მიზეზით / |

### 🔹 `CameraService`
- **ფაილის გზა:** [`back/src/camera/camera.service.ts`](file:///C:/Users/Gio/Desktop/fitness-saas/back/src/camera/camera.service.ts)
- **ფუნქციების რაოდენობა:** 2

| ფუნქციის დასახელება | ტიპი | პარამეტრები (Input) | დაბრუნებული ტიპი | აღწერა და ლოგიკა |
| :--- | :--- | :--- | :--- | :--- |
| `savePhoto()` | 🌐 public / ⚡ async | `photoUrl: string, customerID: string` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `saveGuestPhoto()` | 🌐 public / ⚡ async | `photoUrl: string, guestID: string` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |

### 🔹 `TenantContext`
- **ფაილის გზა:** [`back/src/common/tenant/tenant-context.service.ts`](file:///C:/Users/Gio/Desktop/fitness-saas/back/src/common/tenant/tenant-context.service.ts)
- **ფუნქციების რაოდენობა:** 3

| ფუნქციის დასახელება | ტიპი | პარამეტრები (Input) | დაბრუნებული ტიპი | აღწერა და ლოგიკა |
| :--- | :--- | :--- | :--- | :--- |
| `setActiveBranchID()` | 🌐 public / 🔄 sync | `branchID: string` | `void` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `setUser()` | 🌐 public / 🔄 sync | `user: any` | `void` | CLS-ში user-ის ინფორმაციის ჩაწერა (Guard-ში გამოიძახება) / |
| `setQueryBranchID()` | 🌐 public / 🔄 sync | `branchID: string` | `void` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |

### 🔹 `FirebaseService`
- **ფაილის გზა:** [`back/src/firebase/firebase.service.ts`](file:///C:/Users/Gio/Desktop/fitness-saas/back/src/firebase/firebase.service.ts)
- **ფუნქციების რაოდენობა:** 4

| ფუნქციის დასახელება | ტიპი | პარამეტრები (Input) | დაბრუნებული ტიპი | აღწერა და ლოგიკა |
| :--- | :--- | :--- | :--- | :--- |
| `getAuth()` | 🌐 public / 🔄 sync | `არაფერი` | `any` | ! Firebase Authentication — მომხმარებლების მართვა |
| `getFirestore()` | 🌐 public / 🔄 sync | `არაფერი` | `any` | ! Firestore Database — მონაცემთა ბაზა |
| `getMessaging()` | 🌐 public / 🔄 sync | `არაფერი` | `admin.messaging.Messaging` | 🔔 Firebase Cloud Messaging (FCM)  გამოიყენება push notification-ების გასაგზავნად. მხარდაჭერილია: - send() — ერთ მოწყობილობაზე გაგზავნა - sendEachForMulticast() — ერთდროულად ბევრ მოწყობილობაზე (batch) - sendToTopic() — ტოპიკზე გამოწერილებზე გაგზავნა  FCM უფასოა ლიმიტის გარეშე, მუშაობს Android + iOS + Web-ზე / |
| `getStorage()` | 🌐 public / 🔄 sync | `არაფერი` | `any` | 📁 Firebase Storage  გამოიყენება ფაილების (მაგ. MP3/WAV მუსიკების, სურათების) ასატვირთად და შესანახად. / |

---

## 📦 მოდული: GEMINI AI

### 🔹 `GeminiService`
- **ფაილის გზა:** [`back/src/gemini/gemini.service.ts`](file:///C:/Users/Gio/Desktop/fitness-saas/back/src/gemini/gemini.service.ts)
- **ფუნქციების რაოდენობა:** 1

| ფუნქციის დასახელება | ტიპი | პარამეტრები (Input) | დაბრუნებული ტიპი | აღწერა და ლოგიკა |
| :--- | :--- | :--- | :--- | :--- |
| `generateText()` | 🌐 public / ⚡ async | `prompt: string` | `Promise<string>` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |

---

## 📦 მოდული: QR

### 🔹 `QrService`
- **ფაილის გზა:** [`back/src/modules/QR/qr.service.ts`](file:///C:/Users/Gio/Desktop/fitness-saas/back/src/modules/QR/qr.service.ts)
- **ფუნქციების რაოდენობა:** 4

| ფუნქციის დასახელება | ტიპი | პარამეტრები (Input) | დაბრუნებული ტიპი | აღწერა და ლოგიკა |
| :--- | :--- | :--- | :--- | :--- |
| `generateModernQR()` | 🌐 public / ⚡ async | `url: string, text: string` | `Promise<Buffer>` | ============================================================ |
| `getDoorLabel()` | 🌐 public / 🔄 sync | `doorIndex: string` | `string` | ============================================================ |
| `getByCompany()` | 🌐 public / ⚡ async | `branchID?: string` | `any` | ============================================================ |
| `deleteQrCode()` | 🌐 public / ⚡ async | `qrCodeID: string` | `any` | ============================================================ |

---

## 📦 მოდული: ABONIMENT

### 🔹 `AbonimentService`
- **ფაილის გზა:** [`back/src/modules/aboniment/aboniment.service.ts`](file:///C:/Users/Gio/Desktop/fitness-saas/back/src/modules/aboniment/aboniment.service.ts)
- **ფუნქციების რაოდენობა:** 12

| ფუნქციის დასახელება | ტიპი | პარამეტრები (Input) | დაბრუნებული ტიპი | აღწერა და ლოგიკა |
| :--- | :--- | :--- | :--- | :--- |
| `getAboniment()` | 🌐 public / ⚡ async | `abonimentID: string` | `Promise<Aboniment>` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `getCompanyAbonimentsList()` | 🌐 public / ⚡ async | `companyID: string` | `any` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `restoreAboniment()` | 🌐 public / ⚡ async | `abonimentID: string, adminUserID: string` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `AbonimentsFullInfo()` | 🌐 public / ⚡ async | `companyID: string` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `abonimentActiveOrPendingSalesList()` | 🌐 public / ⚡ async | `abonimentID: string` | `any` | !კონკრეტული აბონიმენტის ყველა აქტიური ან მომლოდინე სეილი |
| `checkCompany()` | 🌐 public / ⚡ async | `companyID: string` | `any` | მონაცემთა ვალიდაცია და წესებთან თავსებადობის შემოწმება |
| `checkAboniment()` | 🌐 public / ⚡ async | `abonimentID: string` | `any` | მონაცემთა ვალიდაცია და წესებთან თავსებადობის შემოწმება |
| `checkTrainer()` | 🌐 public / ⚡ async | `trainerID: string` | `any` | მონაცემთა ვალიდაცია და წესებთან თავსებადობის შემოწმება |
| `customerDetales()` | 🌐 public / ⚡ async | `customer: Customer` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `deleteOldAndDeletedSalesInActiveCustomers()` | 🌐 public / ⚡ async | `abonimentID: string` | `any` | ჩანაწერის წაშლა ან დეაქტივაცია (Soft Delete) |
| `deleteAllData()` | 🌐 public / ⚡ async | `companyID: string` | `any` | !გადავატაროთ ყველა აბონიმენტებს და წავშალოთ აქტიური კლიენტებიდან ვადაგასული კლიენტის სეილები |
| `fixeveryAbonimentFullSpace()` | 🌐 public / ⚡ async | `companyID: string` | `any` | ! მჭირდება ბექში fullSpace გავასწოროდ |

---

## 📦 მოდული: ACCESS

### 🔹 `AccessService`
- **ფაილის გზა:** [`back/src/modules/access/access.service.ts`](file:///C:/Users/Gio/Desktop/fitness-saas/back/src/modules/access/access.service.ts)
- **ფუნქციების რაოდენობა:** 15

| ფუნქციის დასახელება | ტიპი | პარამეტრები (Input) | დაბრუნებული ტიპი | აღწერა და ლოგიკა |
| :--- | :--- | :--- | :--- | :--- |
| `dailyEntries()` | 🌐 public / ⚡ async | `არაფერი` | `any` | მიმდინარე დღის კლიენტების სია |
| `getCustomerLastLogin()` | 🌐 public / ⚡ async | `customerID: string` | `any` | კონკრეტული კლიენტის ბოლო ვიზიტი |
| `getTrainerLastLogin()` | 🌐 public / ⚡ async | `trainerID: string` | `any` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `getGuestLastLogin()` | 🌐 public / ⚡ async | `guestID: string` | `any` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `getUserLastLogin()` | 🌐 public / ⚡ async | `userID: string` | `any` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `customersInFitness()` | 🌐 public / ⚡ async | `არაფერი` | `any` | მოგვაქ ფიტნესში მყოფი კლიენტები და ამ კლიენტების რაოდენობა |
| `trainersInFitness()` | 🌐 public / ⚡ async | `არაფერი` | `any` | მოგვაქ ყველა ტრენერი ვინც დარბაზში არის და მათი რაოდენობა |
| `usersInFitness()` | 🌐 public / ⚡ async | `არაფერი` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `guestsInFitness()` | 🌐 public / ⚡ async | `არაფერი` | `any` | მოგვაქ ყველა სტუმარი ვინც დარბაზში არის და მათი რაოდენობა |
| `search()` | 🌐 public / ⚡ async | `filterAccess: IAccessFilterDataDto` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `exportAccessInExcel()` | 🌐 public / ⚡ async | `data: any[]` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `customerAllAccess()` | 🌐 public / ⚡ async | `customerID: string` | `any` | ! კლიენტის ყველა ტურნიკეტზე დადების ნახვა (ჩემთვის მჭირდება) |
| `clientAllAccess()` | 🌐 public / ⚡ async | `არაფერი` | `any` | ! ეს ფუნქცია არის შეცდომების გასასწორებლად ჩემთვის ყველა ჩანაჭერს ჩამოუარე |
| `currentDateAllAccess()` | 🌐 public / ⚡ async | `არაფერი` | `any` | ! თუ ვადააქ აბონიმენტს გასული და მაინც მოახერხა შესვლა ამ შემთხვევაში ვშლი ბარათს |
| `sameTurniketButDifferentCustomerID()` | 🌐 public / ⚡ async | `არაფერი` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |

---

## 📦 მოდული: ACCESSORY-SALE

### 🔹 `AccessorySaleService`
- **ფაილის გზა:** [`back/src/modules/accessory-sale/accessory.sale.service.ts`](file:///C:/Users/Gio/Desktop/fitness-saas/back/src/modules/accessory-sale/accessory.sale.service.ts)
- **ფუნქციების რაოდენობა:** 2

| ფუნქციის დასახელება | ტიპი | პარამეტრები (Input) | დაბრუნებული ტიპი | აღწერა და ლოგიკა |
| :--- | :--- | :--- | :--- | :--- |
| `getAccessorySale()` | 🌐 public / ⚡ async | `accessorySaleID: string` | `Promise<Accessory_Sale>` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `checkCompany()` | 🌐 public / ⚡ async | `companyID: string` | `any` | მონაცემთა ვალიდაცია და წესებთან თავსებადობის შემოწმება |

---

## 📦 მოდული: ALLOWED-IP

### 🔹 `AllowedIpService`
- **ფაილის გზა:** [`back/src/modules/allowed-ip/allowed-ip.service.ts`](file:///C:/Users/Gio/Desktop/fitness-saas/back/src/modules/allowed-ip/allowed-ip.service.ts)
- **ფუნქციების რაოდენობა:** 2

| ფუნქციის დასახელება | ტიპი | პარამეტრები (Input) | დაბრუნებული ტიპი | აღწერა და ლოგიკა |
| :--- | :--- | :--- | :--- | :--- |
| `getCompanyAllowedIps()` | 🌐 public / ⚡ async | `companyID: string` | `any` | ! კომპანიის ყველა IP წესის სია |
| `deleteAllowedIp()` | 🌐 public / ⚡ async | `companyID: string, allowedIpID: string` | `any` | ! IP წესის წაშლა |

---

## 📦 მოდული: AUDIT

### 🔹 `AuditService`
- **ფაილის გზა:** [`back/src/modules/audit/audit.service.ts`](file:///C:/Users/Gio/Desktop/fitness-saas/back/src/modules/audit/audit.service.ts)
- **ფუნქციების რაოდენობა:** 7

| ფუნქციის დასახელება | ტიპი | პარამეტრები (Input) | დაბრუნებული ტიპი | აღწერა და ლოგიკა |
| :--- | :--- | :--- | :--- | :--- |
| `hasAuditPermission()` | 🌐 public / ⚡ async | `branchID: string` | `Promise<boolean>` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `createAudit()` | 🌐 public / ⚡ async | `auditData: Partial<Audit>` | `Promise<void>` | ახალი ჩანაწერის/ენტიტის შექმნა და ვალიდაცია |
| `findLatestAuditByResourceID()` | 🌐 public / ⚡ async | `resourceID: string` | `any` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `findAllAuditsByResourceID()` | 🌐 public / ⚡ async | `resourceID: string` | `any` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `findSaleAudits()` | 🌐 public / ⚡ async | `salesID: string, customerID: string` | `any` | ! კონკრეტული სეილის აუდიტების ძებნა (სეილის + დაპაუზების + შექმნის ლოგები) |
| `joinAudit()` | 🌐 public / 🔄 sync | `audit: Audit \| null` | `Record<string, any>` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `fetchDbDocument()` | 🌐 public / ⚡ async | `url: string, resourceID: string` | `Promise<any>` | ჩანაწერების სიის მიღება ან ფილტრაცია |

---

## 📦 მოდული: BENEFIT

### 🔹 `BenefitService`
- **ფაილის გზა:** [`back/src/modules/benefit/benefit.service.ts`](file:///C:/Users/Gio/Desktop/fitness-saas/back/src/modules/benefit/benefit.service.ts)
- **ფუნქციების რაოდენობა:** 6

| ფუნქციის დასახელება | ტიპი | პარამეტრები (Input) | დაბრუნებული ტიპი | აღწერა და ლოგიკა |
| :--- | :--- | :--- | :--- | :--- |
| `deleteBenefit()` | 🌐 public / ⚡ async | `benefitID: string` | `Promise<` | წაშლა შეუძლებელია თუ რომელიმე აქტიურ აბონიმენტს მიმაგრებული აქვს |
| `getBenefit()` | 🌐 public / ⚡ async | `benefitID: string` | `Promise<Benefit>` | ✅ ერთი ბენეფიტის მიღება |
| `getCompanyBenefitsList()` | 🌐 public / ⚡ async | `companyID: string` | `Promise<Benefit[]>` | ✅ კომპანიის ყველა ბენეფიტი |
| `getBenefitsSnapshot()` | 🌐 public / ⚡ async | `benefitIDs: string[]` | `Promise<` | ✅ ბენეფიტების snapshot გენერაცია (სეილისთვის) |
| `checkCompany()` | 🔒 private / ⚡ async | `companyID: string` | `any` | 🔒 private: კომპანიის შემოწმება |
| `checkBenefit()` | 🔒 private / ⚡ async | `benefitID: string` | `Promise<Benefit>` | 🔒 private: ბენეფიტის შემოწმება |

---

## 📦 მოდული: BOT

### 🔹 `TelegramClientsBot`
- **ფაილის გზა:** [`back/src/modules/bot/telegram.client.bot.service.ts`](file:///C:/Users/Gio/Desktop/fitness-saas/back/src/modules/bot/telegram.client.bot.service.ts)
- **ფუნქციების რაოდენობა:** 3

| ფუნქციის დასახელება | ტიპი | პარამეტრები (Input) | დაბრუნებული ტიპი | აღწერა და ლოგიკა |
| :--- | :--- | :--- | :--- | :--- |
| `start()` | 🌐 public / ⚡ async | `ctx: Context` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `handleRegister()` | 🌐 public / ⚡ async | `ctx: Context` | `any` | პერიოდული ავტომატური ამოცანის (Cron Job) შესრულება |
| `handleTextMessage()` | 🌐 public / ⚡ async | `ctx: Context` | `any` | პერიოდული ავტომატური ამოცანის (Cron Job) შესრულება |

### 🔹 `TelegramLogsBot`
- **ფაილის გზა:** [`back/src/modules/bot/telegram.logs.bot.service.ts`](file:///C:/Users/Gio/Desktop/fitness-saas/back/src/modules/bot/telegram.logs.bot.service.ts)
- **ფუნქციების რაოდენობა:** 0

*სერვისში ფუნქციები არ მოიძებნა ან მხოლოდ დამხმარე კონსტრუქტორია.*

### 🔹 `TelegramVisitBot`
- **ფაილის გზა:** [`back/src/modules/bot/visit.bot.service.ts`](file:///C:/Users/Gio/Desktop/fitness-saas/back/src/modules/bot/visit.bot.service.ts)
- **ფუნქციების რაოდენობა:** 5

| ფუნქციის დასახელება | ტიპი | პარამეტრები (Input) | დაბრუნებული ტიპი | აღწერა და ლოგიკა |
| :--- | :--- | :--- | :--- | :--- |
| `sendBiometricLink()` | 🌐 public / ⚡ async | `@Ctx(` | `any` | შეტყობინების/ნოტიფიკაციის გაგზავნა |
| `start()` | 🌐 public / ⚡ async | `ctx: Context` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `handleVoice()` | 🌐 public / ⚡ async | `@Ctx(` | `any` | პერიოდული ავტომატური ამოცანის (Cron Job) შესრულება |
| `onEvent()` | 🌐 public / ⚡ async | `ctx: Context` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `offEvent()` | 🌐 public / ⚡ async | `ctx: Context` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |

---

## 📦 მოდული: CARD

### 🔹 `CardService`
- **ფაილის გზა:** [`back/src/modules/card/card.service.ts`](file:///C:/Users/Gio/Desktop/fitness-saas/back/src/modules/card/card.service.ts)
- **ფუნქციების რაოდენობა:** 3

| ფუნქციის დასახელება | ტიპი | პარამეტრები (Input) | დაბრუნებული ტიპი | აღწერა და ლოგიკა |
| :--- | :--- | :--- | :--- | :--- |
| `getCard()` | 🌐 public / ⚡ async | `cardID: string` | `Promise<Card>` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `getCompanyCardsList()` | 🌐 public / ⚡ async | `companyID: string` | `any` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `restoreCard()` | 🌐 public / ⚡ async | `cardID: string` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |

---

## 📦 მოდული: CASHBACK

### 🔹 `CashbackService`
- **ფაილის გზა:** [`back/src/modules/cashback/cashback.service.ts`](file:///C:/Users/Gio/Desktop/fitness-saas/back/src/modules/cashback/cashback.service.ts)
- **ფუნქციების რაოდენობა:** 7

| ფუნქციის დასახელება | ტიპი | პარამეტრები (Input) | დაბრუნებული ტიპი | აღწერა და ლოგიკა |
| :--- | :--- | :--- | :--- | :--- |
| `getCustomerCashbackTotal()` | 🌐 public / ⚡ async | `customerID: string` | `any` | კლიენტის დაგროვილი ქულების ნახვა |
| `castomerCashbakDepositHistory()` | 🌐 public / ⚡ async | `customerID: string` | `any` | კონკრეტული კლიენტის ქეშბექის სტატისტიკა(რომელი სეილიდან რამდენი დაუბრუნდა უკან) |
| `getCashbackBank()` | 🌐 public / ⚡ async | `companyID: string` | `any` | კომპანიის ქულათა ბანკი — summary + კლიენტების ბალანსები / |
| `getMonthlyStats()` | 🌐 public / ⚡ async | `companyID: string` | `any` | თვიური სტატისტიკა — ბოლო 12 თვე (გრაფიკებისთვის) / |
| `getTopCustomers()` | 🌐 public / ⚡ async | `companyID: string, limit = 10` | `any` | Top კლიენტები ბალანსით — ლიდერბორდი / |
| `getInactiveCustomers()` | 🌐 public / ⚡ async | `companyID: string, inactiveDays = 30` | `any` | გაფრთხილების ზონა — inactive კლიენტები ქულით / |
| `getAllTransactionsForExport()` | 🌐 public / ⚡ async | `companyID: string` | `any` | Excel ექსპორტისთვის — ყველა ტრანზაქცია / |

---

## 📦 მოდული: CHURN-PREDICTION

### 🔹 `ChurnPredictionService`
- **ფაილის გზა:** [`back/src/modules/churn-prediction/churn.prediction.service.ts`](file:///C:/Users/Gio/Desktop/fitness-saas/back/src/modules/churn-prediction/churn.prediction.service.ts)
- **ფუნქციების რაოდენობა:** 18

| ფუნქციის დასახელება | ტიპი | პარამეტრები (Input) | დაბრუნებული ტიპი | აღწერა და ლოგიკა |
| :--- | :--- | :--- | :--- | :--- |
| `getConfig()` | 🔒 private / ⚡ async | `companyID: string` | `any` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `getChurnConfig()` | 🌐 public / ⚡ async | `companyID: string` | `any` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `updateChurnConfig()` | 🌐 public / ⚡ async | `companyID: string, data: any` | `any` | არსებული ჩანაწერის მონაცემების განახლება |
| `getDashboardData()` | 🌐 public / ⚡ async | `companyID: string` | `any` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `getClientChurnPanel()` | 🌐 public / ⚡ async | `companyID: string, customerID: string` | `any` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `getAlerts()` | 🌐 public / ⚡ async | `companyID: string` | `any` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `calculateAttendanceDrop()` | 🔒 private / 🔄 sync | `sortedVisits: any[]` | `number` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `calculateAvgWeeklyVisits()` | 🔒 private / 🔄 sync | `sortedVisits: any[], weeks: number` | `number` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `getWeeklyVisitsTrend()` | 🔒 private / 🔄 sync | `sortedVisits: any[], weeks: number` | `any` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `calculateWeeklyAttendanceTrend()` | 🔒 private / 🔄 sync | `clientsData: any[]` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `getSuggestedAction()` | 🔒 private / 🔄 sync | `riskLevel: string, riskFactors: string[]` | `string` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `buildAllClientsData()` | 🔒 private / ⚡ async | `companyID: string` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `getRevenueImpact()` | 🌐 public / ⚡ async | `companyID: string` | `any` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `getClientSegmentation()` | 🌐 public / ⚡ async | `companyID: string` | `any` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `getExecutiveSummary()` | 🌐 public / ⚡ async | `companyID: string` | `any` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `getSmartAlerts()` | 🌐 public / ⚡ async | `companyID: string` | `any` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `getTrainerImpact()` | 🌐 public / ⚡ async | `companyID: string` | `any` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `getAbonimentPerformance()` | 🌐 public / ⚡ async | `companyID: string` | `any` | ჩანაწერების სიის მიღება ან ფილტრაცია |

---

## 📦 მოდული: COMPANY

### 🔹 `BranchService`
- **ფაილის გზა:** [`back/src/modules/company/branch.service.ts`](file:///C:/Users/Gio/Desktop/fitness-saas/back/src/modules/company/branch.service.ts)
- **ფუნქციების რაოდენობა:** 3

| ფუნქციის დასახელება | ტიპი | პარამეტრები (Input) | დაბრუნებული ტიპი | აღწერა და ლოგიკა |
| :--- | :--- | :--- | :--- | :--- |
| `getCompanyBranches()` | 🌐 public / ⚡ async | `companyID: string` | `Promise<Branch[]>` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `getAllBranches()` | 🌐 public / ⚡ async | `არაფერი` | `Promise<Branch[]>` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `getBranchByID()` | 🌐 public / ⚡ async | `branchID: string, companyID: string` | `Promise<Branch>` | ჩანაწერების სიის მიღება ან ფილტრაცია |

### 🔹 `ClosedDayService`
- **ფაილის გზა:** [`back/src/modules/company/closed-day.service.ts`](file:///C:/Users/Gio/Desktop/fitness-saas/back/src/modules/company/closed-day.service.ts)
- **ფუნქციების რაოდენობა:** 6

| ფუნქციის დასახელება | ტიპი | პარამეტრები (Input) | დაბრუნებული ტიპი | აღწერა და ლოგიკა |
| :--- | :--- | :--- | :--- | :--- |
| `getClosedDays()` | 🌐 public / ⚡ async | `companyID: string, year: number` | `any` | კომპანიის წლიური დღეების მოძებნა |
| `setClosedDay()` | 🌐 public / ⚡ async | `companyID: string, data: Partial<ClosedDay>` | `any` | კონკრეტული დღის კონფიგურაცია |
| `removeClosedDay()` | 🌐 public / ⚡ async | `companyID: string, date: string` | `any` | დღის წაშლა |
| `bulkSetClosedDays()` | 🌐 public / ⚡ async | `companyID: string, days: Partial<ClosedDay>[]` | `any` | ბევრი დღის ერთიანად შენახვა |
| `validateClosedDay()` | 🔒 private / 🔄 sync | `data: Partial<ClosedDay>` | `any` | ვალიდაცია |
| `validateDate()` | 🔒 private / 🔄 sync | `date: string` | `any` | მონაცემთა ვალიდაცია და წესებთან თავსებადობის შემოწმება |

### 🔹 `CompanyService`
- **ფაილის გზა:** [`back/src/modules/company/company.service.ts`](file:///C:/Users/Gio/Desktop/fitness-saas/back/src/modules/company/company.service.ts)
- **ფუნქციების რაოდენობა:** 7

| ფუნქციის დასახელება | ტიპი | პარამეტრები (Input) | დაბრუნებული ტიპი | აღწერა და ლოგიკა |
| :--- | :--- | :--- | :--- | :--- |
| `uploadLogo()` | 🌐 public / ⚡ async | `companyID: string, logoUrl: string` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `getCompany()` | 🌐 public / ⚡ async | `companyID: string` | `Promise<Company>` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `getCompanyUsersList()` | 🌐 public / ⚡ async | `companyID: string` | `any` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `getCompanyDeletedUsersList()` | 🌐 public / ⚡ async | `companyID: string` | `any` | ჩანაწერის წაშლა ან დეაქტივაცია (Soft Delete) |
| `getAllCompaniesWithPlans()` | 🌐 public / ⚡ async | `არაფერი` | `any` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `listApiKeys()` | 🌐 public / ⚡ async | `companyID: string` | `any` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `revokeApiKey()` | 🌐 public / ⚡ async | `companyID: string, apiKeyID: string` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |

### 🔹 `GymCapacityService`
- **ფაილის გზა:** [`back/src/modules/company/gym-capacity.service.ts`](file:///C:/Users/Gio/Desktop/fitness-saas/back/src/modules/company/gym-capacity.service.ts)
- **ფუნქციების რაოდენობა:** 4

| ფუნქციის დასახელება | ტიპი | პარამეტრები (Input) | დაბრუნებული ტიპი | აღწერა და ლოგიკა |
| :--- | :--- | :--- | :--- | :--- |
| `getGymCapacityConfig()` | 🌐 public / ⚡ async | `companyID: string` | `any` | ! სრული კონფიგურაციის მიღება |
| `addZone()` | 🌐 public / ⚡ async | `companyID: string, name: string, area: number` | `any` | ! ზონის დამატება |
| `removeZone()` | 🌐 public / ⚡ async | `companyID: string, zoneID: string` | `any` | ! ზონის წაშლა |
| `syncGymArea()` | 🔒 private / ⚡ async | `companyID: string` | `any` | ! gymArea + totalArea ავტომატური სინქრონიზაცია (zones + facilities area ჯამი) |

### 🔹 `GymRulesService`
- **ფაილის გზა:** [`back/src/modules/company/gym-rules.service.ts`](file:///C:/Users/Gio/Desktop/fitness-saas/back/src/modules/company/gym-rules.service.ts)
- **ფუნქციების რაოდენობა:** 2

| ფუნქციის დასახელება | ტიპი | პარამეტრები (Input) | დაბრუნებული ტიპი | აღწერა და ლოგიკა |
| :--- | :--- | :--- | :--- | :--- |
| `getGymRules()` | 🌐 public / ⚡ async | `companyID: string` | `any` | ! წესების მიღება |
| `setGymRules()` | 🌐 public / ⚡ async | `companyID: string, data: GymRulesDto` | `any` | ! წესების შენახვა |

### 🔹 `WorkingHoursService`
- **ფაილის გზა:** [`back/src/modules/company/working-hours.service.ts`](file:///C:/Users/Gio/Desktop/fitness-saas/back/src/modules/company/working-hours.service.ts)
- **ფუნქციების რაოდენობა:** 4

| ფუნქციის დასახელება | ტიპი | პარამეტრები (Input) | დაბრუნებული ტიპი | აღწერა და ლოგიკა |
| :--- | :--- | :--- | :--- | :--- |
| `getWorkingHours()` | 🌐 public / ⚡ async | `companyID: string, branchID?: string` | `any` | კომპანიის სამუშაო საათების მიღება |
| `getTodayWorkingHours()` | 🌐 public / ⚡ async | `companyID: string, branchID?: string` | `any` | დღის სამუშაო საათების მიღება |
| `validateSchedule()` | 🔒 private / 🔄 sync | `schedule: DaySchedule[]` | `any` | ვალიდაცია |
| `getDefaultSchedule()` | 🔒 private / 🔄 sync | `არაფერი` | `any` | Default განრიგი (ყველა დღე დაკეტილი) |

---

## 📦 მოდული: CREDENTIAL

### 🔹 `CredentialService`
- **ფაილის გზა:** [`back/src/modules/credential/credential.service.ts`](file:///C:/Users/Gio/Desktop/fitness-saas/back/src/modules/credential/credential.service.ts)
- **ფუნქციების რაოდენობა:** 31

| ფუნქციის დასახელება | ტიპი | პარამეტრები (Input) | დაბრუნებული ტიპი | აღწერა და ლოგიკა |
| :--- | :--- | :--- | :--- | :--- |
| `onModuleInit()` | 🌐 public / ⚡ async | `არაფერი` | `any` | INITIAL LOAD (SAFE) -------------------------------------------------- |
| `setImmediate()` | 🌐 public / 🔄 sync | `(` | `any` | Use setImmediate to emit after all modules finish initializing |
| `refresh()` | 🌐 public / ⚡ async | `არაფერი` | `Promise<Credential \| null>` | CACHE REFRESH -------------------------------------------------- |
| `createCredential()` | 🌐 public / ⚡ async | `credentialData: CredentialDataDto` | `any` | CREATE / UPDATE -------------------------------------------------- |
| `getCompanyCredential()` | 🌐 public / ⚡ async | `companyID: string` | `Promise<Credential \| null>` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `allCredentials()` | 🌐 public / ⚡ async | `არაფერი` | `Promise<Credential[] \| null>` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `deleteCredential()` | 🌐 public / ⚡ async | `credentialID: string` | `any` | ჩანაწერის წაშლა ან დეაქტივაცია (Soft Delete) |
| `getSmsApiKey()` | 🌐 public / 🔄 sync | `არაფერი` | `string \| null` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `getSuperUserToken()` | 🌐 public / 🔄 sync | `არაფერი` | `string \| null` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `getSuperUserChatID()` | 🌐 public / 🔄 sync | `არაფერი` | `string \| null` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `getReportsBotToken()` | 🌐 public / 🔄 sync | `არაფერი` | `string \| null` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `getMarketingBotToken()` | 🌐 public / 🔄 sync | `არაფერი` | `string \| null` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `getCompanyName()` | 🌐 public / 🔄 sync | `არაფერი` | `string \| null` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `getCompanyID()` | 🌐 public / 🔄 sync | `არაფერი` | `string \| null` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `getManagerChatIds()` | 🌐 public / 🔄 sync | `არაფერი` | `string[]` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `getBaseUrl()` | 🌐 public / 🔄 sync | `არაფერი` | `string \| null` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `getBirthdaySmsText()` | 🌐 public / 🔄 sync | `არაფერი` | `string \| null` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `getTodaySmsText()` | 🌐 public / 🔄 sync | `არაფერი` | `string \| null` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `getThreeDaysBeforeSmsText()` | 🌐 public / 🔄 sync | `არაფერი` | `string \| null` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `getPrefix()` | 🌐 public / 🔄 sync | `არაფერი` | `string \| null` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `getRsServiceUser()` | 🌐 public / 🔄 sync | `არაფერი` | `string \| null` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `getRsServicePassword()` | 🌐 public / 🔄 sync | `არაფერი` | `string \| null` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `getRsApiUrl()` | 🌐 public / 🔄 sync | `არაფერი` | `string` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `getRsUsername()` | 🌐 public / 🔄 sync | `არაფერი` | `string \| null` | RS.ge TaxPayer API (Z Report, Income) |
| `getRsPassword()` | 🌐 public / 🔄 sync | `არაფერი` | `string \| null` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `getRsTaxPayerApiUrl()` | 🌐 public / 🔄 sync | `არაფერი` | `string` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `getCredentials()` | 🌐 public / 🔄 sync | `არაფერი` | `Credential \| null` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `requireCredentials()` | 🌐 public / 🔄 sync | `არაფერი` | `Credential` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `requireSmsApiKey()` | 🌐 public / 🔄 sync | `არაფერი` | `string` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `requireSuperUserToken()` | 🌐 public / 🔄 sync | `არაფერი` | `string` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `isLoaded()` | 🌐 public / 🔄 sync | `არაფერი` | `boolean` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |

---

## 📦 მოდული: CUSTOMER

### 🔹 `CustomerMobileService`
- **ფაილის გზა:** [`back/src/modules/customer/customer.mobile.service.ts`](file:///C:/Users/Gio/Desktop/fitness-saas/back/src/modules/customer/customer.mobile.service.ts)
- **ფუნქციების რაოდენობა:** 32

| ფუნქციის დასახელება | ტიპი | პარამეტრები (Input) | დაბრუნებული ტიპი | აღწერა და ლოგიკა |
| :--- | :--- | :--- | :--- | :--- |
| `getMobileCustomerProfile()` | 🌐 public / ⚡ async | `customerID: string` | `any` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `sanitizeMobileCustomer()` | 🔒 private / 🔄 sync | `doc: { toObject?: (o?: object` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `collectMissingProfileFields()` | 🔒 private / 🔄 sync | `customer: Record<string, unknown>` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `pushIfBlank()` | 🌐 public / 🔄 sync | `'email', customer.email` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `pushIfBlank()` | 🌐 public / 🔄 sync | `'mobile', customer.mobile` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `pushIfBlank()` | 🌐 public / 🔄 sync | `'photo', customer.photo` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `pushIfBlank()` | 🌐 public / 🔄 sync | `'idCard', customer.idCard` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `pushIfBlank()` | 🌐 public / 🔄 sync | `'gender', customer.gender` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `pushIfBlank()` | 🌐 public / 🔄 sync | `'address', customer.address` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `pushIfBlank()` | 🌐 public / 🔄 sync | `'parent.firstname', parent.firstname` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `pushIfBlank()` | 🌐 public / 🔄 sync | `'parent.lastname', parent.lastname` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `pushIfBlank()` | 🌐 public / 🔄 sync | `'parent.mobile', parent.mobile` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `pushIfBlank()` | 🌐 public / 🔄 sync | `'parent.idCard', parent.idCard` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `isBlank()` | 🔒 private / 🔄 sync | `value: unknown` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `isBirthdayMissing()` | 🔒 private / 🔄 sync | `birthday: unknown` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `mapTrainerForMobile()` | 🔒 private / 🔄 sync | `doc: Trainer` | `MobileTrainer` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `mapTrainerAchievements()` | 🔒 private / 🔄 sync | `items: unknown` | `MobileTrainerAchievement[]` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `mapTrainerSocialLinks()` | 🔒 private / 🔄 sync | `raw: unknown` | `MobileTrainerSocialLinks` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `mapTrainerAvailability()` | 🔒 private / 🔄 sync | `items: unknown` | `MobileTrainerAvailability[]` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `trainerDateToIsoOrNull()` | 🔒 private / 🔄 sync | `value: unknown` | `string \| null` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `getCustomerActiveSales()` | 🌐 public / ⚡ async | `customerID: string` | `any` | კლიენტის ყველა აქტიური სეილის წამოღება სრული დეტალებით: - სეილის ძირითადი ინფორმაცია (თარიღები, აბონიმენტის სახელი) - ბენეფიტები (benefitsInfo snapshot) - ვიზიტების სტატისტიკა (რამდენჯერ ნამყოფი, დარჩენილი, ჯამური დრო) - კალენდარის მონაცემები (აქტიური პერიოდის დღეები + ნამყოფი დღეები) / |
| `getSaleVisitsData()` | 🔒 private / ⚡ async | `salesID: string` | `any` | კონკრეტული სეილის ვიზიტების სტატისტიკის წამოღება აბრუნებს: totalVisits, remainingVisits, bonusVisits, totalTimeSpent, visits[] თუ ვიზიტები ჯერ არ არსებობს — default მნიშვნელობებს აბრუნებს / |
| `generateDateRange()` | 🔒 private / 🔄 sync | `from: Date, to: Date` | `string[]` | ორ თარიღს შორის ყველა დღის გენერაცია YYYY-MM-DD ფორმატში cursor-ს ვსეტავთ შუადღეზე (12:00) DST-ის პრობლემების თავიდან ასაცილებლად / |
| `extractVisitedDates()` | 🔒 private / 🔄 sync | `visits: any[]` | `string[]` | ვიზიტების მასივიდან უნიკალური ნამყოფი დღეების ამოღება ლოკალურ დროში ფორმატირებული (UTC-ის ნაცვლად) / |
| `formatLocalDate()` | 🔒 private / 🔄 sync | `date: Date` | `string` | Date ობიექტს ფორმატირებს YYYY-MM-DD სტრინგად ლოკალური დროის მიხედვით (toISOString() UTC-ს იყენებს, რაც საქართველოს დროისთვის არასწორია) / |
| `formatSaleResponse()` | 🔒 private / 🔄 sync | `sale: any, visitsData: any, calendar: any` | `any` | სეილის ობიექტიდან მობილურისთვის საჭირო ველების ამოღება და ფორმატირება აბრუნებს: salesID, თარიღები, აბონიმენტის ინფო, ბენეფიტები, ვიზიტები, კალენდარი / |
| `getGymCapacityInfo()` | 🌐 public / ⚡ async | `companyID: string` | `any` | დარბაზის მიმდინარე დატვირთულობის გამოთვლა: - ამოწმებს კომპანიის კონფიგურაციას (maxCapacity) - ითვლის მიმდინარე კლიენტების რაოდენობას - აბრუნებს პროცენტულ დატვირთულობას / |
| `getActivePromotionsWithAboniments()` | 🌐 public / ⚡ async | `companyID: string` | `any` | ყველა ამჟამად აქტიური აქციის წამოღება კომპანიის აიდით. თითოეული აქციისთვის abonimentIDs მასივიდან იპოვის აბონიმენტების სრულ ინფორმაციას (სახელი, ფასი, კატეგორია, პერიოდი, შესვლები).  Response ფორმატი: { promotions: [ { promotionID, name, description, type, value, promoCode, startDate, endDate, aboniments: [{ abonimentID, name, price, category, maxEntries, period }] } ] } / |
| `getAbonimentDetailsForPromotion()` | 🔒 private / ⚡ async | `abonimentIDs: string[]` | `any` | abonimentIDs მასივიდან აბონიმენტების სრული ინფორმაციის წამოღება აბრუნებს მხოლოდ მობილურისთვის საჭირო ველებს: - abonimentID, name, category, price, maxEntries, period / |
| `formatPromotionResponse()` | 🔒 private / 🔄 sync | `promo: any, aboniments: any[]` | `any` | აქციის ობიექტიდან მობილურისთვის საჭირო ველების ფორმატირება - აქციის ძირითადი ინფორმაცია (სახელი, ტიპი, მნიშვნელობა) - პრომო კოდი (თუ არსებობს) - აქციაში მყოფი აბონიმენტების სია / |
| `getAbonimentsByEntryType()` | 🌐 public / ⚡ async | `companyID: string` | `any` | კომპანიის აქტიური აბონიმენტების წამოღება entryType-ით დაჯგუფებული. აბრუნებს ორ ჯგუფს: - UNLIMITED: ულიმიტო შესვლების აბონიმენტები - LIMITED: შეზღუდული შესვლების აბონიმენტები  თითოეული აბონიმენტისთვის აბრუნებს მხოლოდ მობილურისთვის საჭირო ველებს: name, category, price, maxEntries, period, entryType / |
| `getAbonimentDetail()` | 🌐 public / ⚡ async | `companyID: string, abonimentID: string` | `any` | კონკრეტული აბონიმენტის სრული დეტალების წამოღება მობილურისთვის: - ძირითადი ინფო (სახელი, ფასი, კატეგორია, პერიოდი, შესვლები) - ბენეფიტები (პირსახოცი, წყალი და ა.შ.) - ტრენერები (სახელი, გვარი, ფასი) - აღწერა (desc) - განრიგი (weekDays, startTime, endTime) - აკრძალული საათები (forbiddenStartTime, forbiddenEndTime) - ფასდაკლება (discount, checkDiscount) - ამ აბონიმენტზე მოქმედი აქტიური აქციები / |

### 🔹 `CustomerService`
- **ფაილის გზა:** [`back/src/modules/customer/customer.service.ts`](file:///C:/Users/Gio/Desktop/fitness-saas/back/src/modules/customer/customer.service.ts)
- **ფუნქციების რაოდენობა:** 56

| ფუნქციის დასახელება | ტიპი | პარამეტრები (Input) | დაბრუნებული ტიპი | აღწერა და ლოგიკა |
| :--- | :--- | :--- | :--- | :--- |
| `changeCustomerPassword()` | 🌐 public / ⚡ async | `customerID: string, newPassword: string` | `any` | ! კლიენტი მობილურიდან ცვლის პაროლს (ერთჯერადი OTP → პირადი პაროლი) |
| `getTodayBirthdays()` | 🌐 public / ⚡ async | `companyID: string` | `any` | დღეს დაბადებული კლიენტების პოვნა (თვე + დღე შედარება) / |
| `readTurniketExcelFile()` | 🌐 public / ⚡ async | `არაფერი` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `generateTableImage()` | 🌐 public / ⚡ async | `customers: any[]` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `readExcelDataAndCreateCustomersAthletic()` | 🌐 public / ⚡ async | `არაფერი` | `any` | athletic |
| `exportCustomerDataToExcel()` | 🌐 public / ⚡ async | `data: any[]` | `any` | ატლეტიკისთვის-კლიენტების ბაზის ექსელში გადატანა |
| `readExcelDataAndCreateCustomers()` | 🌐 public / ⚡ async | `არაფერი` | `any` | xarea |
| `formatDate()` | 🔒 private / ⚡ async | `inputDate` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `calculateAdult()` | 🔒 private / 🔄 sync | `birthday: string \| Date` | `boolean` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `reservationCustomer()` | 🌐 public / ⚡ async | `customerID: string` | `any` | მომხმარებლის რეზერვში გადაყვანა |
| `priorityCustomer()` | 🌐 public / ⚡ async | `customerID: string` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `expireDoctorConfirmationDate()` | 🌐 public / ⚡ async | `არაფერი` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `searchCustomerAudit()` | 🌐 public / ⚡ async | `customerID: string` | `any` | ! კონკრეტული კლიენტის აუდიტის ლოგების ნახვა |
| `getCustomer()` | 🌐 public / ⚡ async | `customerID: string` | `Promise<Customer>` | კონკრეტული კლიენტის დაბრუნება აიდით |
| `getCustomerByTelegramID()` | 🌐 public / ⚡ async | `telegramID: string` | `Promise<Customer>` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `getCustomerByMobile()` | 🌐 public / ⚡ async | `mobile: string` | `Promise<Customer>` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `getCompanyCustomersList()` | 🌐 public / ⚡ async | `companyID: string` | `any` | ყველა კლიენტის დაბრუნება |
| `restoreCustomer()` | 🌐 public / ⚡ async | `customerID: string, adminUserID: string` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `listCustomerPagination()` | 🌐 public / ⚡ async | `companyID: string, page: number, size: number` | `any` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `allSalesByCustomerID()` | 🔒 private / ⚡ async | `customerID: string` | `any` | კლიენტის ყველა სეილი |
| `mySales()` | 🌐 public / ⚡ async | `customerID: string` | `any` | ! მჭირდება x-area სთვის კლიენტის აიდით სეილების ნახვა სატესტოთ ჩემტვის |
| `changeCustomerCard()` | 🌐 public / ⚡ async | `customerID: string, newTurniketCode: string` | `any` | TODO new version |
| `stopSale()` | 🌐 public / ⚡ async | `customerID: string, countStopDays: number` | `any` | TODO  new version |
| `calculateTotalTime()` | 🔒 private / 🔄 sync | `arr` | `any` | დარბაზში გატარებული წუტების რაოდენობა |
| `customerTotalTimeHistory()` | 🌐 public / ⚡ async | `customerID: string` | `any` | კონკრეტული მომხმარებლის დარბაზში გატარებული დრო წუთებში(შეგვიძლია სტატუსის შეცვლაც) |
| `customerAllVisits()` | 🌐 public / ⚡ async | `customerID: string` | `any` | კონკრეტული მომხმარებლის დარბაზში გატარებული დრო წუთებში(შეგვიძლია სტატუსის შეცვლაც) |
| `perCustomerSalesHistory()` | 🌐 public / ⚡ async | `salesID: string` | `any` | ! todo გადასაკეტებელია ეს კოდი |
| `perCustomerAllSalesStatistic()` | 🌐 public / ⚡ async | `customerID: string` | `any` | კონკრეტული კლიენტის ყველა ნაყიდი სეილის ისტორია |
| `wholeCustomerSalesFullHistory()` | 🌐 public / ⚡ async | `companyID: string` | `any` | !ყველა კლიენტის ყველა სეილის სრული ინფორმაცია(შეიძლება დაგვჭირდეს) |
| `customerMoneySpentOnFitness()` | 🌐 public / ⚡ async | `customerID: string` | `any` | კონკრეტული მომხმარებლის დარბაძი დახარჯული ფული |
| `assigningStatusToCustomer()` | 🌐 public / ⚡ async | `customerID: string` | `any` | დახარჯული თანხის მიხედვით კლიენტს ვანიჭებ სტატუს |
| `customerInfo()` | 🌐 public / ⚡ async | `customerInfo: CustomerInfoInterface` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `addStatusAllCustomers()` | 🌐 public / ⚡ async | `არაფერი` | `any` | ვეძებ ყველა კლიენტს და ვანიჭებ ავტომატურად სტატუსებს ვისაც ეკუთვნის ვიყენებ კრონში |
| `groupCustomersStatistic()` | 🌐 public / ⚡ async | `companyID: string` | `any` | მომხმარებლების პილტრი, კაცი,ქალის ამოღება , სტატუსების მიხედვით დაჯგუფება (რამდენია გოლდი ან სხვა სტატუსი) |
| `activeAndPasiveCustomers()` | 🌐 public / ⚡ async | `companyID: string` | `any` | რამდენი კლიენტი არის აქტიური და რამდენი პასიური |
| `findCustomerByTurniketCode()` | 🌐 public / ⚡ async | `turniketCode: string` | `any` | კლიენტის მოძებნა ტურნიკეტის კოდით |
| `onlyActiveSalesByCustomer()` | 🌐 public / ⚡ async | `customerID: string` | `any` | კონკრეტული კლიენტის აქტიური სეილები(იგულისხმება მიმდინარე და მომლოდინე სეილები) |
| `onlyOneActiveSale()` | 🔒 private / ⚡ async | `customerID: string` | `any` | კონკრეტული კლიენტის მიმდინარე სეილი |
| `countingCustomerVisitsCurrentSale()` | 🌐 public / ⚡ async | `salesID: string` | `any` | რამდენჯერ იყო დარბაზში და რამდენი შესვლა დარჩა კიდე |
| `sendMarketingMessagesOnTelegram()` | 🌐 public / ⚡ async | `message: string` | `any` | ! კლიენტებს ვისაც აქვთ telegramID უგზავნი სარეკლამო შეტყობინებებს |
| `assignCustomerNameAllClients()` | 🌐 public / ⚡ async | `არაფერი` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `sendCustomerNameAndPassword()` | 🌐 public / ⚡ async | `customerID: string` | `any` | ! კლიენტს უგზავნი მობილურის გასააქტიურებელ customername და ერთჯერად პაროლს |
| `checkCompany()` | 🌐 public / ⚡ async | `companyID: string` | `any` | მონაცემთა ვალიდაცია და წესებთან თავსებადობის შემოწმება |
| `checkCustomer()` | 🌐 public / ⚡ async | `customerID: string` | `any` | მონაცემთა ვალიდაცია და წესებთან თავსებადობის შემოწმება |
| `customer()` | 🌐 public / ⚡ async | `customerID: string` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `addCustomersBracelet()` | 🌐 public / ⚡ async | `არაფერი` | `any` | x-area კლიენტებზე დეფაულტად აქსესორის მიბმა გასასწორებლად |
| `deleteCustomerCards()` | 🌐 public / ⚡ async | `არაფერი` | `any` | ჩანაწერის წაშლა ან დეაქტივაცია (Soft Delete) |
| `activateCustomerCards()` | 🌐 public / ⚡ async | `არაფერი` | `any` | ყველა კლიენტის ბარათის გააქტიურება |
| `customersReactivationList()` | 🌐 public / ⚡ async | `არაფერი` | `any` | როცა კლიენტის აქტივაციას ცდილობენ ვინახავ მონაცემებს და ვაჩვენებ ლისტს |
| `customerReactivationsHistory()` | 🌐 public / ⚡ async | `customerID: string` | `any` | ! konkretul klientis reaqtivaciebis istoria, vanaxeb klientis pirad profilze |
| `sendSmsToCustomer()` | 🌐 public / ⚡ async | `customerID: string, text: string` | `any` | კონკრეტულ კლიენტზე სმს ის გაგზავნა xarea |
| `birthdayToday()` | 🌐 public / ⚡ async | `არაფერი` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `ifClientsHaveOneCode()` | 🌐 public / ⚡ async | `არაფერი` | `any` | ვარკვევ ერთი ტურნიკეტის კოდი ხოარააქ რამოდენიმე კლიენტს |
| `ifSalesCodeDifferent()` | 🌐 public / ⚡ async | `არაფერი` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `fetchCustomersByIds()` | 🔒 private / ⚡ async | `customerIDs: string[]` | `any` | Helper method to fetch customers by an array of IDs |
| `allDeletedCustomers()` | 🌐 public / ⚡ async | `არაფერი` | `any` | !ყველა წაშლილი კლიენტი |

---

## 📦 მოდული: CUSTOMER-VISITS

### 🔹 `CustomerVisitsService`
- **ფაილის გზა:** [`back/src/modules/customer-visits/customer.visits.service.ts`](file:///C:/Users/Gio/Desktop/fitness-saas/back/src/modules/customer-visits/customer.visits.service.ts)
- **ფუნქციების რაოდენობა:** 13

| ფუნქციის დასახელება | ტიპი | პარამეტრები (Input) | დაბრუნებული ტიპი | აღწერა და ლოგიკა |
| :--- | :--- | :--- | :--- | :--- |
| `getCustomerVisits()` | 🌐 public / ⚡ async | `customerID: string` | `any` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `fixCustomerVisit()` | 🌐 public / ⚡ async | `salesID: string` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `now()` | 🌐 public / 🔄 sync | `არაფერი` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `now()` | 🌐 public / 🔄 sync | `არაფერი` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `sortVisitsByMonth()` | 🌐 public / ⚡ async | `customerID: string` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `calculateTotalTimeSpentAtWork()` | 🔒 private / ⚡ async | `data` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `converMinutsToTime()` | 🔒 private / ⚡ async | `minutes: number` | `Promise<string>` | წუთების გადაყვანა საატებში და ფორმატირება მაგ 5 წუთი არის 00:05 |
| `todayVisitsByStartDateAndForbiddenTime()` | 🌐 public / ⚡ async | `არაფერი` | `any` | და ვინც უკვე დროს გადააშორა აუზზე ყოფნის |
| `findCustomerVisitsStatisticBySalesID()` | 🌐 public / ⚡ async | `salesID: string` | `any` | ვაჩვენებ რამდენჯერ არის ნამყოფი და რა დროებში |
| `allVisitStatusFalse()` | 🌐 public / ⚡ async | `არაფერი` | `any` | ყველა ვიზიტის status - false მინიჭება სატესტოდ |
| `addSalesEndDatesAllVisits()` | 🌐 public / ⚡ async | `არაფერი` | `any` | ! ჩამოუვლი ყველა ვიზიტს და მივანიჭებ სეილის endDate - ებს(ერთჯერადად მჭირდება) |
| `dev()` | 🌐 public / ⚡ async | `არაფერი` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `deleteVisit()` | 🌐 public / ⚡ async | `customerVisitsID: string` | `any` | ჩანაწერის წაშლა ან დეაქტივაცია (Soft Delete) |

---

## 📦 მოდული: DOCTOR

### 🔹 `DoctorService`
- **ფაილის გზა:** [`back/src/modules/doctor/doctor.service.ts`](file:///C:/Users/Gio/Desktop/fitness-saas/back/src/modules/doctor/doctor.service.ts)
- **ფუნქციების რაოდენობა:** 2

| ფუნქციის დასახელება | ტიპი | პარამეტრები (Input) | დაბრუნებული ტიპი | აღწერა და ლოგიკა |
| :--- | :--- | :--- | :--- | :--- |
| `checkCompany()` | 🌐 public / ⚡ async | `companyID: string` | `any` | checker |
| `checkDoctor()` | 🌐 public / ⚡ async | `doctorID: string` | `any` | მონაცემთა ვალიდაცია და წესებთან თავსებადობის შემოწმება |

---

## 📦 მოდული: DYNAMIC-BOT

### 🔹 `DynamicBotService`
- **ფაილის გზა:** [`back/src/modules/dynamic-bot/dynamic-bot.service.ts`](file:///C:/Users/Gio/Desktop/fitness-saas/back/src/modules/dynamic-bot/dynamic-bot.service.ts)
- **ფუნქციების რაოდენობა:** 11

| ფუნქციის დასახელება | ტიპი | პარამეტრები (Input) | დაბრუნებული ტიპი | აღწერა და ლოგიკა |
| :--- | :--- | :--- | :--- | :--- |
| `mkdirSync()` | 🌐 public / 🔄 sync | `this.storageDir, { recursive: true }` | `any` | მონაცემთა სინქრონიზაცია საგარეო სერვისთან ან ბაზასთან |
| `onModuleInit()` | 🌐 public / ⚡ async | `არაფერი` | `any` | MODULE INITIALIZATION - with fallback check -------------------------------------------------- |
| `setTimeout()` | 🌐 public / 🔄 sync | `(` | `any` | 🔥 FALLBACK: Check credentials after a delay in case event was missed |
| `onCredentialLoaded()` | 🌐 public / ⚡ async | `credential: Credential` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `onCredentialCreated()` | 🌐 public / ⚡ async | `credential: Credential` | `any` | ახალი ჩანაწერის/ენტიტის შექმნა და ვალიდაცია |
| `initializeBotsWithCredential()` | 🔒 private / ⚡ async | `credential: Credential` | `any` | BOT INITIALIZATION WITH CREDENTIAL OBJECT -------------------------------------------------- |
| `setupBotHandlers()` | 🔒 private / 🔄 sync | `bot: Telegraf, botName: string, botKey: string` | `any` | BOT HANDLERS SETUP -------------------------------------------------- |
| `getBot()` | 🌐 public / ⚡ async | `companyID: string` | `Promise<` | BOT GETTER -------------------------------------------------- |
| `sendReportsMessage()` | 🌐 public / ⚡ async | `message: string, options?: any` | `any` | MESSAGE SENDING METHODS -------------------------------------------------- |
| `sendSupportMessage()` | 🌐 public / ⚡ async | `message: string, options?: any` | `any` | შეტყობინების/ნოტიფიკაციის გაგზავნა |
| `onModuleDestroy()` | 🌐 public / ⚡ async | `არაფერი` | `any` | MODULE CLEANUP -------------------------------------------------- |

---

## 📦 მოდული: EMAIL

### 🔹 `EmailService`
- **ფაილის გზა:** [`back/src/modules/email/email.service.ts`](file:///C:/Users/Gio/Desktop/fitness-saas/back/src/modules/email/email.service.ts)
- **ფუნქციების რაოდენობა:** 2

| ფუნქციის დასახელება | ტიპი | პარამეტრები (Input) | დაბრუნებული ტიპი | აღწერა და ლოგიკა |
| :--- | :--- | :--- | :--- | :--- |
| `mailTransport()` | 🌐 public / 🔄 sync | `არაფერი` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `sendEmail()` | 🌐 public / ⚡ async | `dto: SendEmailDto` | `any` | შეტყობინების/ნოტიფიკაციის გაგზავნა |

### 🔹 `GmailService`
- **ფაილის გზა:** [`back/src/modules/email/gmail.service.ts`](file:///C:/Users/Gio/Desktop/fitness-saas/back/src/modules/email/gmail.service.ts)
- **ფუნქციების რაოდენობა:** 16

| ფუნქციის დასახელება | ტიპი | პარამეტრები (Input) | დაბრუნებული ტიპი | აღწერა და ლოგიკა |
| :--- | :--- | :--- | :--- | :--- |
| `onModuleInit()` | 🌐 public / ⚡ async | `არაფერი` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `initializeOAuth()` | 🔒 private / 🔄 sync | `არაფერი` | `any` | OAuth2 Client-ის ინიციალიზაცია / |
| `isConnected()` | 🌐 public / 🔄 sync | `არაფერი` | `boolean` | კავშირის შემოწმება / |
| `getConnectedEmail()` | 🌐 public / 🔄 sync | `არაფერი` | `string` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `getMessage()` | 🌐 public / ⚡ async | `messageId: string` | `Promise<gmail_v1.Schema$Message>` | ერთი მეილის სრული დეტალები Gmail-იდან / |
| `getThread()` | 🌐 public / ⚡ async | `threadId: string` | `Promise<gmail_v1.Schema$Message[]>` | Thread-ის (საუბრის) ყველა მეილი / |
| `markAsRead()` | 🌐 public / ⚡ async | `messageId: string` | `Promise<void>` | წაკითხულად მონიშვნა / |
| `markAsUnread()` | 🌐 public / ⚡ async | `messageId: string` | `Promise<void>` | წაუკითხავად მონიშვნა / |
| `toggleStar()` | 🌐 public / ⚡ async | `messageId: string, starred: boolean` | `Promise<void>` | ვარსკვლავით მონიშვნა/მოხსნა / |
| `moveToTrash()` | 🌐 public / ⚡ async | `messageId: string` | `Promise<void>` | Trash-ში გადატანა / |
| `parseEmailAddress()` | 🔒 private / 🔄 sync | `raw: string` | `` | Email მისამართის პარსინგი: "John Doe <john@example.com>" → {name, email} / |
| `extractBody()` | 🔒 private / 🔄 sync | `payload: gmail_v1.Schema$MessagePart \| undefined` | `` | Body-ის ამოღება (text + html) / |
| `processPayload()` | 🌐 public / 🔄 sync | `subPart` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `processPayload()` | 🌐 public / 🔄 sync | `payload` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `processPart()` | 🌐 public / 🔄 sync | `subPart` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `processPart()` | 🌐 public / 🔄 sync | `payload` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |

---

## 📦 მოდული: ENROLLMENT

### 🔹 `EnrollmentService`
- **ფაილის გზა:** [`back/src/modules/enrollment/enrollment.service.ts`](file:///C:/Users/Gio/Desktop/fitness-saas/back/src/modules/enrollment/enrollment.service.ts)
- **ფუნქციების რაოდენობა:** 5

| ფუნქციის დასახელება | ტიპი | პარამეტრები (Input) | დაბრუნებული ტიპი | აღწერა და ლოგიკა |
| :--- | :--- | :--- | :--- | :--- |
| `getEnrollmentsByAboniment()` | 🌐 public / ⚡ async | `linkedAbonimentID: string` | `any` | ✅ კონკრეტული ჯგუფური აბონიმენტის enrollment-ები / |
| `getEnrollmentsByCustomer()` | 🌐 public / ⚡ async | `customerID: string` | `any` | ✅ კლიენტის enrollment-ები / |
| `getEnrollmentsByCompany()` | 🌐 public / ⚡ async | `companyID: string` | `any` | ✅ კომპანიის ყველა enrollment / |
| `expireEnrollmentsBySale()` | 🌐 public / ⚡ async | `salesID: string` | `any` | ✅ სეილის ვადის გასვლისას enrollment-ების ექსპაირი / |
| `getAvailableSlots()` | 🌐 public / ⚡ async | `linkedAbonimentID: string` | `any` | ✅ ჯგუფური აბონიმენტის ხელმისაწვდომი სლოტები capacity-ით  მობილურისთვის — კლიენტი ხედავს რა დღეებზე/საათებზე შეუძლია ჩაწერა და რამდენი ადგილია თავისუფალი. / |

---

## 📦 მოდული: EQUIPMENT

### 🔹 `EquipmentQrService`
- **ფაილის გზა:** [`back/src/modules/equipment/equipment-qr.service.ts`](file:///C:/Users/Gio/Desktop/fitness-saas/back/src/modules/equipment/equipment-qr.service.ts)
- **ფუნქციების რაოდენობა:** 1

| ფუნქციის დასახელება | ტიპი | პარამეტრები (Input) | დაბრუნებული ტიპი | აღწერა და ლოგიკა |
| :--- | :--- | :--- | :--- | :--- |
| `generateForEquipment()` | 🌐 public / ⚡ async | `equipmentID: string` | `Promise<` | ============================================================ |

### 🔹 `EquipmentService`
- **ფაილის გზა:** [`back/src/modules/equipment/equipment.service.ts`](file:///C:/Users/Gio/Desktop/fitness-saas/back/src/modules/equipment/equipment.service.ts)
- **ფუნქციების რაოდენობა:** 12

| ფუნქციის დასახელება | ტიპი | პარამეტრები (Input) | დაბრუნებული ტიპი | აღწერა და ლოგიკა |
| :--- | :--- | :--- | :--- | :--- |
| `create()` | 🌐 public / ⚡ async | `dto: CreateEquipmentDto` | `Promise<Equipment>` | ============================================================ |
| `findAll()` | 🌐 public / ⚡ async | `filterDto: EquipmentFilterDto` | `any` | ============================================================ |
| `findAllActive()` | 🌐 public / ⚡ async | `არაფერი` | `Promise<Equipment[]>` | ============================================================ |
| `findByID()` | 🌐 public / ⚡ async | `equipmentID: string` | `Promise<Equipment>` | ============================================================ |
| `delete()` | 🌐 public / ⚡ async | `equipmentID: string` | `Promise<` | ============================================================ |
| `updateStatus()` | 🌐 public / ⚡ async | `equipmentID: string, status: string` | `Promise<Equipment>` | ============================================================ |
| `findBySlugPublic()` | 🌐 public / ⚡ async | `slug: string, companyID: string` | `any` | ============================================================ |
| `markAsLearned()` | 🌐 public / ⚡ async | `customerId: string, equipmentID: string` | `any` | ============================================================ |
| `getCustomerProgress()` | 🌐 public / ⚡ async | `customerId: string` | `any` | ============================================================ |
| `getAnalytics()` | 🌐 public / ⚡ async | `არაფერი` | `any` | ============================================================ |
| `getTopScanned()` | 🌐 public / ⚡ async | `limit = 10` | `any` | ============================================================ |
| `findAllActiveForQR()` | 🌐 public / ⚡ async | `filter?: { location?: string; category?: string }` | `any` | ============================================================ |

---

## 📦 მოდული: EXTERNAL-API

### 🔹 `ExternalApiService`
- **ფაილის გზა:** [`back/src/modules/external-api/external-api.service.ts`](file:///C:/Users/Gio/Desktop/fitness-saas/back/src/modules/external-api/external-api.service.ts)
- **ფუნქციების რაოდენობა:** 2

| ფუნქციის დასახელება | ტიპი | პარამეტრები (Input) | დაბრუნებული ტიპი | აღწერა და ლოგიკა |
| :--- | :--- | :--- | :--- | :--- |
| `getActiveAboniments()` | 🌐 public / ⚡ async | `არაფერი` | `any` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `checkCustomerStatus()` | 🌐 public / ⚡ async | `query: { mobile?: string; idCard?: string }` | `any` | მონაცემთა ვალიდაცია და წესებთან თავსებადობის შემოწმება |

---

## 📦 მოდული: FACEBOOK

### 🔹 `FacebookTokenService`
- **ფაილის გზა:** [`back/src/modules/facebook/facebook-token.service.ts`](file:///C:/Users/Gio/Desktop/fitness-saas/back/src/modules/facebook/facebook-token.service.ts)
- **ფუნქციების რაოდენობა:** 9

| ფუნქციის დასახელება | ტიპი | პარამეტრები (Input) | დაბრუნებული ტიპი | აღწერა და ლოგიკა |
| :--- | :--- | :--- | :--- | :--- |
| `encrypt()` | 🌐 public / 🔄 sync | `plainText: string` | `string` | plainText → AES-256-GCM encrypted Base64 string.  Format: IV(12 bytes) + AuthTag(16 bytes) + CipherText → Base64  რატომ GCM? - Authenticated encryption: ერთდროულად შიფრავს და ხელს აწერს - Tamper detection: თუ ვინმე DB-ში token-ს შეცვლის → decrypt ვერ მოხერხდება  @param plainText — Facebook Token (plaintext) @returns Base64 encoded encrypted string / |
| `decrypt()` | 🌐 public / 🔄 sync | `encryptedText: string` | `string` | AES-256-GCM encrypted Base64 → plaintext.  @param encryptedText — Base64 encoded encrypted string @returns Facebook Token (plaintext) @throws FacebookTokenDecryptError — key-ი შეცვლილია ან data corrupted / |
| `generateState()` | 🌐 public / 🔄 sync | `companyID: string` | `string` | OAuth State-ის გენერაცია — CSRF Protection.  State = signed JWT (10 წუთი ვადით). Callback-ში ეს state ვერიფიცირდება — CSRF-ის პრევენცია.  JWT payload-ში companyID ინახება → callback-ში ვიცით ვისთვის მოვიდა OAuth response.  @param companyID — multi-tenant identifier @returns signed JWT string / |
| `verifyState()` | 🌐 public / 🔄 sync | `state: string` | `string` | OAuth State-ის ვერიფიკაცია — Callback endpoint-ში.  @param state — JWT string (query parameter-ით მოდის) @returns companyID — ვერიფიცირებული company identifier @throws FacebookOAuthStateError — ინვალიდური/ვადაგასული state / |
| `exchangeCodeForToken()` | 🌐 public / ⚡ async | `code: string` | `Promise<string>` | ① Authorization Code → Short-lived User Token.  Facebook callback-ით მოსული `code` პარამეტრი → short-lived access token (ვადა: ~2 საათი).  @param code — Authorization code (query param) @returns access_token string / |
| `getLongLivedToken()` | 🌐 public / ⚡ async | `shortToken: string` | `Promise<string>` | ② Short-lived → Long-lived User Token.  Short-lived (~2 საათი) → Long-lived (60 დღე). ეს token backup-ისთვის ინახება DB-ში.  @param shortToken — short-lived access token @returns access_token string (long-lived) / |
| `getPageTokens()` | 🌐 public / ⚡ async | `userToken: string` | `Promise<FacebookPageInfo[]>` | ③ Long-lived User Token → Page Access Token(ები).  /me/accounts endpoint აბრუნებს ყველა Page-ს, რომლებზეც მომხმარებელს ადმინ-წვდომა აქვს.  ✅ Page Access Token ვადაუვალია! ერთხელ მიღებული → სამუდამოდ მუშაობს.  @param userToken — long-lived user access token @returns FacebookPageInfo[] — Page ID, Name, Token, Picture / |
| `validateToken()` | 🌐 public / ⚡ async | `pageToken: string` | `Promise<` | Token-ის ვალიდურობის შემოწმება — Graph API /me endpoint.  თუ Token ჯერ კიდევ მოქმედებს → { valid: true, pageName, pageId } თუ Token expired/invalid → { valid: false, error: ... }  @param pageToken — Page Access Token (plaintext) @returns { valid, pageName?, pageId?, error? } / |
| `checkRateLimit()` | 🌐 public / 🔄 sync | `headers: Record<string, string>` | `` | Facebook API Response-ის headers-დან rate limit-ის ანალიზი.  Facebook აბრუნებს x-app-usage და x-page-usage headers: { call_count, total_time, total_cputime } — 0-100%  თუ usage > 80% → warning log თუ usage > 95% → critical, request-ების შეჩერება  @param headers — HTTP response headers @returns { isNearLimit, usage } / |

### 🔹 `FacebookVideoService`
- **ფაილის გზა:** [`back/src/modules/facebook/facebook-video.service.ts`](file:///C:/Users/Gio/Desktop/fitness-saas/back/src/modules/facebook/facebook-video.service.ts)
- **ფუნქციების რაოდენობა:** 0

*სერვისში ფუნქციები არ მოიძებნა ან მხოლოდ დამხმარე კონსტრუქტორია.*

### 🔹 `FacebookService`
- **ფაილის გზა:** [`back/src/modules/facebook/facebook.service.ts`](file:///C:/Users/Gio/Desktop/fitness-saas/back/src/modules/facebook/facebook.service.ts)
- **ფუნქციების რაოდენობა:** 21

| ფუნქციის დასახელება | ტიპი | პარამეტრები (Input) | დაბრუნებული ტიპი | აღწერა და ლოგიკა |
| :--- | :--- | :--- | :--- | :--- |
| `getAuthUrl()` | 🌐 public / 🔄 sync | `არაფერი` | `` | OAuth Authorization URL-ის გენერაცია.  მენეჯერი ამ URL-ზე გადამისამართდება Facebook-ის login page-ზე. State = signed JWT → callback-ში CSRF ვერიფიკაცია.  @returns { url } — Facebook OAuth dialog URL / |
| `getConnectionStatus()` | 🌐 public / ⚡ async | `არაფერი` | `Promise<` | Facebook კავშირის სტატუსი.  @returns { connected, pageName?, pageId?, pageProfilePicUrl? } / |
| `checkTokenHealth()` | 🌐 public / ⚡ async | `არაფერი` | `Promise<` | Token-ის ჯანმრთელობის შემოწმება (Auto-Reconnect).  Graph API /me endpoint-ით ამოწმებს Token ჯერ კიდევ მუშაობს. Frontend-ს აცნობებს reconnect-ის საჭიროებას.  @returns { valid, pageName?, error? } / |
| `disconnect()` | 🌐 public / ⚡ async | `არაფერი` | `Promise<` | Facebook-ის გამოკავშირება.  Connection isActive = false, Token-ები DB-ში რჩება. ხელახლა დაკავშირება ნებისმიერ დროს შესაძლებელია.  @returns { disconnected: true } / |
| `publishTextPost()` | 🌐 public / ⚡ async | `dto: CreatePostDto` | `any` | ტექსტური პოსტის გამოქვეყნება.  @param dto — { message } @returns Facebook_Post (PUBLISHED status) / |
| `publishPhotoPost()` | 🌐 public / ⚡ async | `dto: CreatePostDto, file: Express.Multer.File` | `any` | ფოტო პოსტის გამოქვეყნება.  @param dto — { message } @param file — Multer file @returns Facebook_Post / |
| `publishAlbumPost()` | 🌐 public / ⚡ async | `dto: CreatePostDto, files: Express.Multer.File[]` | `any` | მრავალ-ფოტო (Album) პოსტის გამოქვეყნება.  ── ალგორითმი ────────────────────────────────────────────── 1. ყოველ ფოტოს unpublished ვტვირთავთ (published=false) 2. Facebook გვიბრუნებს photo_id-ებს 3. ერთ feed POST-ში ყველა photo_id-ს ვაერთიანებთ 4. Facebook ერთ "album-style" პოსტად აქვეყნებს  @param dto — { message } @param files — Multer files (მრავალი ფოტო) @returns Facebook_Post / |
| `uploadAndPublishVideo()` | 🌐 public / ⚡ async | `dto: UploadVideoDto, file: Express.Multer.File` | `any` | ვიდეო ატვირთვა + გამოქვეყნება (Resumable Upload).  @param dto — { title, description } @param file — Multer video file @returns Facebook_Post / |
| `getPostHistory()` | 🌐 public / ⚡ async | `limit = 50, skip = 0` | `any` | გამოქვეყნებული პოსტების ისტორია (pagination). / |
| `deletePost()` | 🌐 public / ⚡ async | `postId: string` | `any` | პოსტის წაშლა.  ── ლოგიკა ─────────────────────────────────────────────── PUBLISHED → Facebook Graph API DELETE + DB წაშლა DRAFT/FAILED → მხოლოდ DB წაშლა / |
| `createTemplate()` | 🌐 public / ⚡ async | `dto: CreateTemplateDto` | `any` | შაბლონის შექმნა. / |
| `getTemplates()` | 🌐 public / ⚡ async | `არაფერი` | `any` | შაბლონების სია. / |
| `deleteTemplate()` | 🌐 public / ⚡ async | `templateId: string` | `any` | შაბლონის წაშლა. / |
| `getPageInsights()` | 🌐 public / ⚡ async | `period = 'week'` | `any` | Page-level Insights — followers, reach, engagement.  @param period — 'week' | 'month' | 'year' (ბოლო N დღე) / |
| `getPostEngagement()` | 🌐 public / ⚡ async | `postId: string` | `any` | პოსტის engagement დეტალები — ვინ დაალაიქა, ვინ დაწერა კომენტარი.  @param postId — MongoDB post _id @returns reactions[] + comments[] / |
| `syncPostInsights()` | 🌐 public / ⚡ async | `არაფერი` | `Promise<` | Post-level Insights სინქრონიზაცია. ბოლო N გამოქვეყნებული პოსტისთვის likes/comments/reach. Cron-ით ან ხელით გამოიძახება. / |
| `verifyWebhookSignature()` | 🌐 public / 🔄 sync | `signature: string, body: string` | `boolean` | Webhook Signature ვერიფიკაცია. HMAC-SHA256(body, app_secret) === x-hub-signature-256 / |
| `handleWebhookEvent()` | 🌐 public / ⚡ async | `body: any` | `Promise<void>` | Webhook Event-ების დამუშავება. / |
| `getConnectionAndToken()` | 🔒 private / ⚡ async | `არაფერი` | `any` | აქტიური კავშირის და დეშიფრული Token-ის წამოღება. ყოველ API call-ში იყენება. / |
| `syncSinglePostInsights()` | 🔒 private / ⚡ async | `fbPostId: string` | `Promise<void>` | ერთი პოსტის Insights-ების სინქრონიზაცია. / |
| `safeDeleteFile()` | 🔒 private / 🔄 sync | `filePath: string` | `void` | ფაილის უსაფრთხო წაშლა (არსებობის შემოწმება). / |

---

## 📦 მოდული: GIVEAWAY

### 🔹 `GiveawayService`
- **ფაილის გზა:** [`back/src/modules/giveaway/giveaway.service.ts`](file:///C:/Users/Gio/Desktop/fitness-saas/back/src/modules/giveaway/giveaway.service.ts)
- **ფუნქციების რაოდენობა:** 19

| ფუნქციის დასახელება | ტიპი | პარამეტრები (Input) | დაბრუნებული ტიპი | აღწერა და ლოგიკა |
| :--- | :--- | :--- | :--- | :--- |
| `getAllEvents()` | 🌐 public / ⚡ async | `არაფერი` | `any` | კომპანიის ყველა ივენთის სია. Admin list page-ისთვის.  @returns Giveaway_Event[] — უახლესი პირველი / |
| `getEventDetails()` | 🌐 public / ⚡ async | `eventID: string` | `any` | ერთი ივენთის დეტალები + პრიზები + სტატისტიკა.  @param eventID - ივენთის UUID @returns { event, prizes, stats } / |
| `updateEvent()` | 🌐 public / ⚡ async | `eventID: string, dto: UpdateGiveawayEventDto` | `any` | ივენთის განახლება.  წესი: მხოლოდ DRAFT და OPEN სტატუსებში ნებადართულია. CLOSED, DRAWN, COMPLETED ივენთები immutable-ია.  @param eventID - ივენთის UUID @param dto - UpdateGiveawayEventDto @returns განახლებული event / |
| `updateEventStatus()` | 🌐 public / ⚡ async | `eventID: string, newStatus: Giveaway_Event_Status` | `any` | ივენთის სტატუსის ცვლილება.  ვალიდური ტრანზიციები: DRAFT → OPEN, CANCELLED OPEN → CLOSED, CANCELLED CLOSED → DRAWING (draw engine-ით) DRAWN → COMPLETED ნებისმიერი → CANCELLED  @param eventID - ივენთის UUID @param newStatus - ახალი სტატუსი @returns განახლებული event / |
| `deleteEvent()` | 🌐 public / ⚡ async | `eventID: string` | `any` | ივენთის soft delete (გაუქმება).  თუ ივენთი DRAWN ან COMPLETED-ია — წაშლა დაუშვებელია. ამ შემთხვევაში CANCELLED სტატუსზე გადასვლა.  @param eventID - ივენთის UUID @returns { deleted: number } / |
| `createPrize()` | 🌐 public / ⚡ async | `eventID: string, dto: CreateGiveawayPrizeDto` | `any` | პრიზის დამატება ივენთისთვის.  წესი: პრიზები მხოლოდ DRAFT და OPEN სტატუსში ემატება.  @param eventID - ივენთის UUID @param dto - CreateGiveawayPrizeDto @returns შექმნილი Giveaway_Prize / |
| `getEventPrizes()` | 🌐 public / ⚡ async | `eventID: string` | `any` | ივენთის პრიზების სია.  @param eventID - ივენთის UUID @returns Giveaway_Prize[] — კატეგორიით სორტირებული / |
| `updatePrize()` | 🌐 public / ⚡ async | `prizeID: string, dto: UpdateGiveawayPrizeDto` | `any` | პრიზის განახლება.  @param prizeID - პრიზის UUID @param dto - UpdateGiveawayPrizeDto @returns განახლებული prize / |
| `deletePrize()` | 🌐 public / ⚡ async | `prizeID: string` | `any` | პრიზის soft delete.  @param prizeID - პრიზის UUID @returns { deleted: number } / |
| `getEventTickets()` | 🌐 public / ⚡ async | `eventID: string` | `any` | ივენთის მონაწილეების ბილეთების სია.  @param eventID - ივენთის UUID @returns Giveaway_Ticket[] — ბილეთებით კლებადი / |
| `addManualTickets()` | 🌐 public / ⚡ async | `ticketID: string, manualTickets: number` | `any` | ხელით ბილეთების დამატება კლიენტისთვის.  @param ticketID - ბილეთის UUID @param manualTickets - დასამატებელი რაოდენობა @returns განახლებული ticket / |
| `getEventWinners()` | 🌐 public / ⚡ async | `eventID: string` | `any` | ივენთის გამარჯვებულების სია.  @param eventID - ივენთის UUID @returns Giveaway_Winner[] — drawOrder-ით სორტირებული / |
| `getEventStats()` | 🌐 public / ⚡ async | `eventID: string` | `any` | ივენთის სტატისტიკა — dashboard widget.  @param eventID - ივენთის UUID @returns ბილეთების stats + winners count / |
| `getDrawLog()` | 🌐 public / ⚡ async | `eventID: string` | `any` | Draw audit log-ის წამოღება.  @param eventID - ივენთის UUID @returns Giveaway_Draw_Log[] — ქრონოლოგიურად / |
| `calculateEligibility()` | 🌐 public / ⚡ async | `eventID: string` | `any` | ბილეთების გამოთვლა ივენთისთვის.  EligibilityEngine-ს დელეგირებს: 1. კომპანიის ყველა კლიენტი ძებნა 2. თითოეულისთვის ბილეთების გამოთვლა (subscriptions, visits, referrals) 3. Upsert → Giveaway_Ticket collection  @param eventID — ივენთის UUID @returns { processed, eligible, skipped } / |
| `executeDraw()` | 🌐 public / ⚡ async | `eventID: string, performedBy?: Record<string, string>` | `any` | გათამაშების ჩატარება.  DrawEngine-ს დელეგირებს: 1. Seed generation (SHA256) 2. Weighted pool creation 3. Fisher-Yates shuffle 4. Winner selection 5. Winner records creation 6. Event finalization  @param eventID — ივენთის UUID @param performedBy — ადმინის ინფო (req.user) @returns { winners, seed, stats } / |
| `notifyWinners()` | 🌐 public / ⚡ async | `eventID: string` | `any` | გამარჯვებულების შეტყობინება (ხელით trigger).  @param eventID — ივენთის UUID @returns { notified, failed, total } / |
| `getDashboard()` | 🌐 public / ⚡ async | `არაფერი` | `any` | კომპანიის გათამაშების საერთო dashboard.  აგრეგირებს: - ყველა ივენთის რაოდენობა + სტატუსების განაწილება - ჯამური მონაწილეები, ბილეთები, გამარჯვებულები - აქტიური (OPEN/CLOSED) ივენთის დეტალები - ბოლო დასრულებული ივენთის შედეგები  @returns Dashboard data / |
| `exportEventCSV()` | 🌐 public / ⚡ async | `eventID: string` | `any` | ივენთის CSV ექსპორტი — მონაწილეები + ბილეთები + გამარჯვებულები.  CSV სტრუქტურა: customerID, firstname, lastname, mobile, email, totalTickets, subscription, visits, referrals, ptSessions, manual, isStaff, isWinner, prizeName, prizeCategory, winnerStatus  @param eventID — ივენთის UUID @returns { csv: string, filename: string } / |

---

## 📦 მოდული: GO-SMS-API

### 🔹 `SmsApiService`
- **ფაილის გზა:** [`back/src/modules/go-sms-api/sms.api.service.ts`](file:///C:/Users/Gio/Desktop/fitness-saas/back/src/modules/go-sms-api/sms.api.service.ts)
- **ფუნქციების რაოდენობა:** 5

| ფუნქციის დასახელება | ტიპი | პარამეტრები (Input) | დაბრუნებული ტიპი | აღწერა და ლოგიკა |
| :--- | :--- | :--- | :--- | :--- |
| `checkBalance()` | 🌐 public / ⚡ async | `არაფერი` | `any` | xarea |
| `sendOtpSms()` | 🌐 public / ⚡ async | `phoneNumber: string` | `any` | OTP (ერთჯერადი კოდის) გაგზავნა  @param phoneNumber - ტელეფონის ნომერი / |
| `verifyOtpSms()` | 🌐 public / ⚡ async | `phoneNumber: string, hash: string, code: string` | `any` | OTP-ის ვერიფიკაცია  @param phoneNumber - ტელეფონის ნომერი @param hash - sendOtpSms-დან დაბრუნებული ჰეში @param code - კლიენტის მიერ შეყვანილი კოდი / |
| `createSenderName()` | 🌐 public / ⚡ async | `name: string` | `any` | ახალი გამომგზავნის (Sender) სახელის შექმნის მოთხოვნა საჭიროებს GoSMS.ge-სგან დადასტურებას.  @param name - ახალი Sender სახელი / |
| `checkSmsStatus()` | 🌐 public / ⚡ async | `smsID: string` | `any` | მონაცემთა ვალიდაცია და წესებთან თავსებადობის შემოწმება |

---

## 📦 მოდული: GUEST

### 🔹 `GuestService`
- **ფაილის გზა:** [`back/src/modules/guest/guest.service.ts`](file:///C:/Users/Gio/Desktop/fitness-saas/back/src/modules/guest/guest.service.ts)
- **ფუნქციების რაოდენობა:** 15

| ფუნქციის დასახელება | ტიპი | პარამეტრები (Input) | დაბრუნებული ტიპი | აღწერა და ლოგიკა |
| :--- | :--- | :--- | :--- | :--- |
| `updateGuest()` | 🌐 public / ⚡ async | `guestID: string, guestData: UpdateGuestDataDto` | `any` | არსებული ჩანაწერის მონაცემების განახლება |
| `getGuestByID()` | 🌐 public / ⚡ async | `guestID: string` | `any` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `deleteGuest()` | 🌐 public / ⚡ async | `guestID: string` | `any` | სტუმრუს წაშლა იშლება ასევე ტურნიკეტიდან ბარათიც |
| `deactivateGuest()` | 🌐 public / ⚡ async | `guestID: string` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `removeGuest()` | 🌐 public / ⚡ async | `guestID: string` | `any` | ! სატესტო შეცდომის გასასწპრებლად, x-area |
| `findGuestsByEndDate()` | 🌐 public / ⚡ async | `არაფერი` | `any` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `saveNewTurniketCode()` | 🔒 private / ⚡ async | `turniketCode?: string` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `deleteTurniketCode()` | 🔒 private / ⚡ async | `turniketCode?: string` | `any` | ჩანაწერის წაშლა ან დეაქტივაცია (Soft Delete) |
| `getGuestList()` | 🌐 public / ⚡ async | `არაფერი` | `any` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `checkGuest()` | 🌐 public / ⚡ async | `guestID: string` | `any` | მონაცემთა ვალიდაცია და წესებთან თავსებადობის შემოწმება |
| `activateTurniketCodeOnGuest()` | 🌐 public / ⚡ async | `guestID: string` | `any` | ! kკონკრეტულ სტუმარზე ვააქტიურებ ბარათს |
| `assignTurniketCodeUser()` | 🌐 public / ⚡ async | `userID: string, turniketCode: string` | `any` | ! დროებით სტუმრების სერვისში ვაკეთებ circular defendence პრობლემა იუზერში ვერ შემომაქ ტურნიკეტ სერვისი |
| `sendSmsToGuest()` | 🌐 public / ⚡ async | `guestID: string, text: string` | `any` | შეტყობინების/ნოტიფიკაციის გაგზავნა |
| `exportGuestsToExcel()` | 🌐 public / ⚡ async | `guests: any[]` | `Promise<Buffer>` | გაფილტრული სტუმრების ექსელის ფაილში გადატანა |
| `birthdayToday()` | 🌐 public / ⚡ async | `არაფერი` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |

---

## 📦 მოდული: HANDOVER

### 🔹 `HandoverService`
- **ფაილის გზა:** [`back/src/modules/handover/handover.service.ts`](file:///C:/Users/Gio/Desktop/fitness-saas/back/src/modules/handover/handover.service.ts)
- **ფუნქციების რაოდენობა:** 10

| ფუნქციის დასახელება | ტიპი | პარამეტრები (Input) | დაბრუნებული ტიპი | აღწერა და ლოგიკა |
| :--- | :--- | :--- | :--- | :--- |
| `getActiveShift()` | 🌐 public / ⚡ async | `companyID: string, userID: string` | `any` | მიმდინარე აქტიური ცვლის ინფო / |
| `getAllActiveShifts()` | 🌐 public / ⚡ async | `companyID: string` | `any` | კომპანიის ყველა აქტიური ცვლა — incoming admin-ის არჩევისთვის / |
| `getLatestShift()` | 🌐 public / ⚡ async | `companyID: string, userID: string` | `any` | ბოლო ცვლა (ნებისმიერი სტატუსი) — ShiftReminder-ისთვის თუ ბოლო ცვლა TRANSFERRED/CLOSED-ია, ადმინს ახალი ცვლის იძულება არ სჭირდება / |
| `getMyDisputedHandover()` | 🌐 public / ⚡ async | `companyID: string, adminId: string` | `any` | outgoing admin-ის DISPUTED handover — frontend-ის alert-ისთვის / |
| `getPendingForUser()` | 🌐 public / ⚡ async | `companyID: string, userID: string` | `any` | incoming admin-ის PENDING handover-ები — login-ისას ჩეკი / |
| `getPendingCountForCompany()` | 🌐 public / ⚡ async | `companyID: string` | `any` | კომპანიის ყველა PENDING handover-ის რაოდენობა — KPI dashboard / |
| `getAllCompanyAdmins()` | 🌐 public / ⚡ async | `companyID: string` | `any` | კომპანიის ყველა ადმინი (current user-ის ჩათვლით) — KPI dashboard / |
| `getDisputedHandovers()` | 🌐 public / ⚡ async | `companyID: string` | `any` | DISPUTED handover-ები — supervisor-ისთვის / |
| `getRevenueReport()` | 🌐 public / ⚡ async | `companyID: string, from: string, to: string` | `any` | Revenue report — დღიური ნავაჭრის aggregation / |
| `getCompanyAdmins()` | 🌐 public / ⚡ async | `companyID: string, excludeUserID?: string` | `any` | კომპანიის ადმინების სია — incoming admin-ის არჩევისთვის (dropdown) / |

---

## 📦 მოდული: IP

### 🔹 `IpService`
- **ფაილის გზა:** [`back/src/modules/ip/ip.service.ts`](file:///C:/Users/Gio/Desktop/fitness-saas/back/src/modules/ip/ip.service.ts)
- **ფუნქციების რაოდენობა:** 3

| ფუნქციის დასახელება | ტიპი | პარამეტრები (Input) | დაბრუნებული ტიპი | აღწერა და ლოგიკა |
| :--- | :--- | :--- | :--- | :--- |
| `createIp()` | 🌐 public / ⚡ async | `ipData: IpDataDto` | `any` | ახალი ჩანაწერის/ენტიტის შექმნა და ვალიდაცია |
| `getCompanyIps()` | 🌐 public / ⚡ async | `companyID: string` | `any` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `deleteIp()` | 🌐 public / ⚡ async | `companyID: string, ipID: string` | `any` | ჩანაწერის წაშლა ან დეაქტივაცია (Soft Delete) |

---

## 📦 მოდული: KEEPZ-PAYMENT

### 🔹 `KeepzPaymentService`
- **ფაილის გზა:** [`back/src/modules/keepz-payment/keepz-payment.service.ts`](file:///C:/Users/Gio/Desktop/fitness-saas/back/src/modules/keepz-payment/keepz-payment.service.ts)
- **ფუნქციების რაოდენობა:** 1

| ფუნქციის დასახელება | ტიპი | პარამეტრები (Input) | დაბრუნებული ტიპი | აღწერა და ლოგიკა |
| :--- | :--- | :--- | :--- | :--- |
| `getPaymentStatus()` | 🌐 public / ⚡ async | `paymentTransactionID: string` | `any` | ჩანაწერების სიის მიღება ან ფილტრაცია |

---

## 📦 მოდული: KPI-DASHBOARD

### 🔹 `KpiDashboardService`
- **ფაილის გზა:** [`back/src/modules/kpi-dashboard/kpi.dashboard.service.ts`](file:///C:/Users/Gio/Desktop/fitness-saas/back/src/modules/kpi-dashboard/kpi.dashboard.service.ts)
- **ფუნქციების რაოდენობა:** 3

| ფუნქციის დასახელება | ტიპი | პარამეტრები (Input) | დაბრუნებული ტიპი | აღწერა და ლოგიკა |
| :--- | :--- | :--- | :--- | :--- |
| `getDashboardData()` | 🌐 public / ⚡ async | `companyID: string` | `any` | 📊 მთავარი Dashboard endpoint — ყველა KPI ერთ call-ში / |
| `generateAlerts()` | 🔒 private / 🔄 sync | `data: any` | `any` | �🔔 ავტომატური Alerts / |
| `generateInsights()` | 🔒 private / 🔄 sync | `data: any` | `any` | 💡 AI Insights — ტექსტური ანალიზი / |

---

## 📦 მოდული: LEGAL-CLIENT

### 🔹 `LegalClientService`
- **ფაილის გზა:** [`back/src/modules/legal-client/legal-client.service.ts`](file:///C:/Users/Gio/Desktop/fitness-saas/back/src/modules/legal-client/legal-client.service.ts)
- **ფუნქციების რაოდენობა:** 10

| ფუნქციის დასახელება | ტიპი | პარამეტრები (Input) | დაბრუნებული ტიპი | აღწერა და ლოგიკა |
| :--- | :--- | :--- | :--- | :--- |
| `getLegalClient()` | 🌐 public / ⚡ async | `legalClientID: string` | `Promise<Legal_Client>` | ──────── READ ──────── |
| `legalClientsList()` | 🌐 public / ⚡ async | `legalCompanyID: string` | `any` | ──────── LIST ──────── |
| `searchLegalClients()` | 🌐 public / ⚡ async | `legalCompanyID: string, query: string` | `any` | ──────── SEARCH ──────── |
| `countLegalClients()` | 🌐 public / ⚡ async | `legalCompanyID: string` | `any` | ──────── COUNT ──────── |
| `toggleLegalClientStatus()` | 🌐 public / ⚡ async | `legalClientID: string` | `any` | ──────── TOGGLE STATUS ──────── |
| `deleteLegalClient()` | 🌐 public / ⚡ async | `legalClientID: string` | `any` | ──────── DELETE ──────── |
| `checkCompany()` | 🔒 private / ⚡ async | `companyID: string` | `any` | ──────── VALIDATORS ──────── |
| `checkLegalCompany()` | 🔒 private / ⚡ async | `legalCompanyID: string` | `any` | მონაცემთა ვალიდაცია და წესებთან თავსებადობის შემოწმება |
| `checkLegalClient()` | 🔒 private / ⚡ async | `legalClientID: string` | `any` | მონაცემთა ვალიდაცია და წესებთან თავსებადობის შემოწმება |
| `saveNewTurniketCode()` | 🔒 private / ⚡ async | `turniketCode: string` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |

---

## 📦 მოდული: LEGAL-COMPANY

### 🔹 `LegalCompanyService`
- **ფაილის გზა:** [`back/src/modules/legal-company/legal-company.service.ts`](file:///C:/Users/Gio/Desktop/fitness-saas/back/src/modules/legal-company/legal-company.service.ts)
- **ფუნქციების რაოდენობა:** 7

| ფუნქციის დასახელება | ტიპი | პარამეტრები (Input) | დაბრუნებული ტიპი | აღწერა და ლოგიკა |
| :--- | :--- | :--- | :--- | :--- |
| `getLegalCompany()` | 🌐 public / ⚡ async | `legalCompanyID: string` | `Promise<Legal_Company>` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `legalCompaniesList()` | 🌐 public / ⚡ async | `companyID: string` | `any` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `searchLegalCompanies()` | 🌐 public / ⚡ async | `companyID: string, query: string` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `toggleLegalCompanyStatus()` | 🌐 public / ⚡ async | `legalCompanyID: string` | `any` | სტატისტიკური მონაცემების აგრეგაცია და ანალიტიკა |
| `deleteLegalCompany()` | 🌐 public / ⚡ async | `legalCompanyID: string` | `any` | ჩანაწერის წაშლა ან დეაქტივაცია (Soft Delete) |
| `checkCompany()` | 🌐 public / ⚡ async | `companyID: string` | `any` | ──────── VALIDATORS ──────── |
| `checkLegalCompany()` | 🌐 public / ⚡ async | `legalCompanyID: string` | `any` | მონაცემთა ვალიდაცია და წესებთან თავსებადობის შემოწმება |

---

## 📦 მოდული: LEGAL-SALE

### 🔹 `LegalSaleService`
- **ფაილის გზა:** [`back/src/modules/legal-sale/legal-sale.service.ts`](file:///C:/Users/Gio/Desktop/fitness-saas/back/src/modules/legal-sale/legal-sale.service.ts)
- **ფუნქციების რაოდენობა:** 14

| ფუნქციის დასახელება | ტიპი | პარამეტრები (Input) | დაბრუნებული ტიპი | აღწერა და ლოგიკა |
| :--- | :--- | :--- | :--- | :--- |
| `getLegalSale()` | 🌐 public / ⚡ async | `legalSaleID: string` | `Promise<Legal_Sale>` | ──────── READ ──────── |
| `getLegalSalesByCompanyID()` | 🌐 public / ⚡ async | `companyID: string` | `any` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `getLegalSalesByLegalCompanyID()` | 🌐 public / ⚡ async | `legalCompanyID: string` | `any` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `extendLegalSale()` | 🌐 public / ⚡ async | `legalSaleID: string, extraDays: number` | `any` | ──────── EXTEND (ვადის გახანგძლივება) ──────── |
| `deleteLegalSale()` | 🌐 public / ⚡ async | `legalSaleID: string` | `any` | ──────── DELETE ──────── |
| `filterLegalSales()` | 🌐 public / ⚡ async | `filterData: FilterLegalSales` | `any` | ──────── FILTER ──────── |
| `registerClientVisit()` | 🌐 public / ⚡ async | `legalSaleID: string, legalClientID: string` | `any` | ──────── VISIT COUNT ──────── |
| `getLegalSaleStats()` | 🌐 public / ⚡ async | `companyID: string` | `any` | ──────── STATISTICS (სტატისტიკა) ──────── |
| `confirmLegalSale()` | 🌐 public / ⚡ async | `legalSaleID: string` | `any` | ──────── CONFIRM SALE (სეილის დადასტურება გადახდის შემდეგ) ──────── |
| `generateInvoiceHtml()` | 🌐 public / 🔄 sync | `sale: Legal_Sale` | `string` | ──────── GENERATE INVOICE HTML ──────── |
| `updateInvoiceStatus()` | 🌐 public / ⚡ async | `legalSaleID: string, status: string` | `any` | ──────── UPDATE INVOICE STATUS ──────── |
| `findExpiredActiveSales()` | 🌐 public / ⚡ async | `არაფერი` | `any` | ──────── EXPIRED SALES CHECK ──────── |
| `checkCompany()` | 🔒 private / ⚡ async | `companyID: string` | `any` | ──────── VALIDATORS ──────── |
| `checkLegalSale()` | 🔒 private / ⚡ async | `legalSaleID: string` | `any` | მონაცემთა ვალიდაცია და წესებთან თავსებადობის შემოწმება |

---

## 📦 მოდული: LOCKER

### 🔹 `LockerService`
- **ფაილის გზა:** [`back/src/modules/locker/locker.service.ts`](file:///C:/Users/Gio/Desktop/fitness-saas/back/src/modules/locker/locker.service.ts)
- **ფუნქციების რაოდენობა:** 26

| ფუნქციის დასახელება | ტიპი | პარამეტრები (Input) | დაბრუნებული ტიპი | აღწერა და ლოგიკა |
| :--- | :--- | :--- | :--- | :--- |
| `createZone()` | 🌐 public / ⚡ async | `dto: CreateZoneDto, branchID?: string` | `any` | ახალი ზონის შექმნა. companyID ავტომატურად inject-ირდება CLS-იდან.  @param dto - CreateZoneDto (name, gender, floor, capacity) @returns შექმნილი Locker_Zone / |
| `getAllZones()` | 🌐 public / ⚡ async | `არაფერი` | `any` | კომპანიის ყველა ზონა (+ ყოველ ზონაში კარადების რაოდენობის ინფო). Admin panel-ის zone management page-ისთვის. / |
| `updateZone()` | 🌐 public / ⚡ async | `zoneID: string, dto: UpdateZoneDto` | `any` | არსებული ჩანაწერის მონაცემების განახლება |
| `deleteZone()` | 🌐 public / ⚡ async | `zoneID: string` | `any` | ზონის წაშლა — მხოლოდ თუ აქტიური კარადები არ შეიცავს. OCCUPIED კარადა = წაშლა შეუძლებელია. / |
| `createLocker()` | 🌐 public / ⚡ async | `dto: CreateLockerDto` | `any` | ახალი კარადის შექმნა. auto-numbering: თუ lockerNumber არ მიეთითა → ავტო-გენერაცია. duplicate check: ზონაში ერთნაირი ნომერი არ უნდა იყოს. / |
| `bulkCreateLockers()` | 🌐 public / ⚡ async | `dto: BulkCreateLockersDto` | `any` | Bulk create — რამდენიმე კარადის ერთდროული შექმნა. "დაამატე 20 კარადა" ღილაკისთვის. auto-numbering ყველა კარადისთვის. / |
| `getAllLockers()` | 🌐 public / ⚡ async | `filters?: { zoneID?: string; status?: Locker_Status }` | `any` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `getAvailableLockers()` | 🌐 public / ⚡ async | `zoneID?: string` | `any` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `getLockerDetails()` | 🌐 public / ⚡ async | `lockerID: string` | `any` | კარადის დეტალები + მიმდინარე აქტიური სესია (თუ OCCUPIED-ია). / |
| `updateLocker()` | 🌐 public / ⚡ async | `lockerID: string, dto: UpdateLockerDto` | `any` | არსებული ჩანაწერის მონაცემების განახლება |
| `bulkStatusChange()` | 🌐 public / ⚡ async | `dto: BulkStatusDto` | `any` | სტატისტიკური მონაცემების აგრეგაცია და ანალიტიკა |
| `deleteLocker()` | 🌐 public / ⚡ async | `lockerID: string` | `any` | ჩანაწერის წაშლა ან დეაქტივაცია (Soft Delete) |
| `checkin()` | 🌐 public / ⚡ async | `dto: CheckinDto, adminInfo: Record<string, string>` | `any` | CHECK-IN — კლიენტს ვანიჭებთ კარადას.  ვალიდაცია: 1. კარადა AVAILABLE სტატუსში უნდა იყოს 2. კლიენტს უკვე არ უნდა ჰქონდეს აქტიური კარადა 3. ზონა აქტიური უნდა იყოს  ეფექტი: - კარადის სტატუსი → OCCUPIED - იქმნება ახალი Locker_Session (checkedOutAt = null)  @param dto - { lockerID, customerID, notes? } @param adminInfo - { userID, firstname, lastname } @returns შექმნილი სესია / |
| `checkout()` | 🌐 public / ⚡ async | `dto: CheckoutDto` | `any` | CHECK-OUT — კარადის გათავისუფლება.  ეფექტი: - სესიის checkedOutAt = now, durationMinutes = auto-calc - კარადის სტატუსი → AVAILABLE - ამ სესიის ალერტები → auto-resolve  @param dto - { sessionID, notes? } @returns დახურული სესია duration-ით / |
| `getActiveSessions()` | 🌐 public / ⚡ async | `არაფერი` | `any` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `getClientHistory()` | 🌐 public / ⚡ async | `customerID: string` | `any` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `getLockerHistory()` | 🌐 public / ⚡ async | `lockerID: string` | `any` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `getDashboardSummary()` | 🌐 public / ⚡ async | `არაფერი` | `any` | Dashboard Summary — summary cards-ის მონაცემები.  @returns { lockerSummary: { total, available, occupied, ... }, sessionSummary: { todaySessions, avgDurationMinutes }, alertCount: number } / |
| `getOccupancyMap()` | 🌐 public / ⚡ async | `არაფერი` | `any` | Occupancy Map — ვიზუალური grid-ის მონაცემები. ყველა ზონა + ყველა კარადა + სტატუსები + აქტიური სესიების ინფო. / |
| `getPeakHours()` | 🌐 public / ⚡ async | `from: string, to: string` | `any` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `getTopLockers()` | 🌐 public / ⚡ async | `limit = 10` | `any` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `getAvgDurationByZone()` | 🌐 public / ⚡ async | `არაფერი` | `any` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `getUnresolvedAlerts()` | 🌐 public / ⚡ async | `არაფერი` | `any` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `resolveAlert()` | 🌐 public / ⚡ async | `alertID: string, adminInfo: Record<string, string>` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `getConfig()` | 🌐 public / ⚡ async | `არაფერი` | `any` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `updateConfig()` | 🌐 public / ⚡ async | `dto: UpdateLockerConfigDto` | `any` | არსებული ჩანაწერის მონაცემების განახლება |

---

## 📦 მოდული: MAINTENANCE

### 🔹 `MaintenanceService`
- **ფაილის გზა:** [`back/src/modules/maintenance/maintenance.service.ts`](file:///C:/Users/Gio/Desktop/fitness-saas/back/src/modules/maintenance/maintenance.service.ts)
- **ფუნქციების რაოდენობა:** 6

| ფუნქციის დასახელება | ტიპი | პარამეტრები (Input) | დაბრუნებული ტიპი | აღწერა და ლოგიკა |
| :--- | :--- | :--- | :--- | :--- |
| `getAnalytics()` | 🌐 public / ⚡ async | `companyID: string, from?: string, to?: string` | `any` | Dashboard Analytics — ყველა widget ერთ call-ში / |
| `getMonthlyReport()` | 🌐 public / ⚡ async | `companyID: string, from: string, to: string` | `any` | თვიური რეპორტი — CSV/Excel-ისთვის / |
| `getCategories()` | 🌐 public / ⚡ async | `companyID: string` | `Promise<MaintenanceCategory[]>` | კატეგორიების სია — ყველა აქტიური (dropdown-ისთვის) თუ კომპანიას არც ერთი არ აქვს — seed defaults / |
| `getAllCategories()` | 🌐 public / ⚡ async | `companyID: string` | `Promise<MaintenanceCategory[]>` | კატეგორიების სია — მენეჯერისთვის (inactive-ების ჩათვლით) / |
| `getCompanyUsers()` | 🌐 public / ⚡ async | `companyID: string` | `any` | კომპანიის ტექნიკოსების/თანამშრომლების სია — assign dropdown / |
| `getBadgeCounts()` | 🌐 public / ⚡ async | `companyID: string, userID: string` | `any` | Sidebar badge counts — lightweight endpoint openCount: ყველა არადახურული request criticalCount: კრიტიკული პრიორიტეტის myAssignedCount: ჩემზე დანიშნული / |

---

## 📦 მოდული: MARKET-ANALYTICS

### 🔹 `MarketAnalyticsService`
- **ფაილის გზა:** [`back/src/modules/market-analytics/market.analytics.service.ts`](file:///C:/Users/Gio/Desktop/fitness-saas/back/src/modules/market-analytics/market.analytics.service.ts)
- **ფუნქციების რაოდენობა:** 29

| ფუნქციის დასახელება | ტიპი | პარამეტრები (Input) | დაბრუნებული ტიპი | აღწერა და ლოგიკა |
| :--- | :--- | :--- | :--- | :--- |
| `getDailySales()` | 🔒 private / ⚡ async | `companyID: string, from: Date, to: Date` | `any` | ═══════════════════════════════════════════════════ |
| `getHourlySales()` | 🔒 private / ⚡ async | `companyID: string, from: Date, to: Date` | `any` | ═══════════════════════════════════════════════════ |
| `getTopProducts()` | 🔒 private / ⚡ async | `companyID: string, from: Date, to: Date` | `any` | ═══════════════════════════════════════════════════ |
| `getStockBalance()` | 🔒 private / ⚡ async | `companyID: string` | `any` | ═══════════════════════════════════════════════════ |
| `categorizeStockAlerts()` | 🔒 private / 🔄 sync | `stockBalance: any[]` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `getProfitMargins()` | 🔒 private / ⚡ async | `companyID: string, from: Date, to: Date` | `any` | ═══════════════════════════════════════════════════ |
| `getCategoryAnalytics()` | 🔒 private / ⚡ async | `companyID: string, from: Date, to: Date` | `any` | ═══════════════════════════════════════════════════ |
| `getPeakHours()` | 🔒 private / ⚡ async | `companyID: string, from: Date, to: Date` | `any` | ═══════════════════════════════════════════════════ |
| `getMissedSales()` | 🔒 private / ⚡ async | `companyID: string, stockBalance: any[]` | `any` | ═══════════════════════════════════════════════════ |
| `getCustomerSpending()` | 🔒 private / ⚡ async | `companyID: string, from: Date, to: Date` | `any` | ═══════════════════════════════════════════════════ |
| `getSellThroughSpeed()` | 🔒 private / ⚡ async | `companyID: string` | `any` | ═══════════════════════════════════════════════════ |
| `getSalesTrend()` | 🔒 private / ⚡ async | `companyID: string, from: Date, to: Date` | `any` | ═══════════════════════════════════════════════════ |
| `getRevenueForecast()` | 🔒 private / ⚡ async | `companyID: string, from: Date, to: Date` | `any` | ═══════════════════════════════════════════════════ |
| `generateSuggestions()` | 🔒 private / 🔄 sync | `data: any` | `any` | ═══════════════════════════════════════════════════ |
| `generateAlerts()` | 🔒 private / 🔄 sync | `data: any` | `any` | ═══════════════════════════════════════════════════ |
| `getDayOfWeekAnalytics()` | 🔒 private / ⚡ async | `companyID: string, from: Date, to: Date` | `any` | ═══════════════════════════════════════════════════ |
| `getABCAnalysis()` | 🔒 private / ⚡ async | `companyID: string, from: Date, to: Date` | `any` | ═══════════════════════════════════════════════════ |
| `getCrossSellAnalysis()` | 🔒 private / ⚡ async | `companyID: string, from: Date, to: Date` | `any` | ═══════════════════════════════════════════════════ |
| `convertToExcel()` | 🌐 public / ⚡ async | `data: any` | `Promise<Buffer>` | 📊 Excel (.xlsx) გენერატორი — პროფესიონალური ფორმატირებით ფერები, ბორდერები, bold headers, auto-width, section styling / |
| `getSparklineData()` | 🔒 private / ⚡ async | `companyID: string, from: Date, to: Date` | `any` | ═══════════════════════════════════════════════════ |
| `getGoalsWithProgress()` | 🌐 public / ⚡ async | `companyID: string` | `any` | ═══════════════════════════════════════════════════ |
| `getTopRecipes()` | 🔒 private / ⚡ async | `companyID: string, from: Date, to: Date` | `any` | 2️⃣ ტოპ რეცეპტები — ყველაზე გაყიდვადი / |
| `getRecipeMargins()` | 🔒 private / ⚡ async | `companyID: string, from: Date, to: Date` | `any` | 4️⃣ რეცეპტის მარჟა — food cost ანალიზი / |
| `getRecentOrders()` | 🔒 private / ⚡ async | `companyID: string, limit = 20` | `any` | ═══════════════════════════════════════════════════ |
| `getBasketDistribution()` | 🔒 private / ⚡ async | `companyID: string, from: Date, to: Date` | `any` | ═══════════════════════════════════════════════════ |
| `getInventoryAging()` | 🔒 private / ⚡ async | `companyID: string, stockBalance: any[]` | `any` | ═══════════════════════════════════════════════════ |
| `getPurchaseCostTrend()` | 🔒 private / ⚡ async | `companyID: string` | `any` | ═══════════════════════════════════════════════════ |
| `getSeasonalTrends()` | 🔒 private / ⚡ async | `companyID: string` | `any` | ═══════════════════════════════════════════════════ |
| `getCustomerRetention()` | 🔒 private / ⚡ async | `companyID: string` | `any` | ═══════════════════════════════════════════════════ |

---

## 📦 მოდული: MEET

### 🔹 `GoogleCalendarService`
- **ფაილის გზა:** [`back/src/modules/meet/google-calendar.service.ts`](file:///C:/Users/Gio/Desktop/fitness-saas/back/src/modules/meet/google-calendar.service.ts)
- **ფუნქციების რაოდენობა:** 4

| ფუნქციის დასახელება | ტიპი | პარამეტრები (Input) | დაბრუნებული ტიპი | აღწერა და ლოგიკა |
| :--- | :--- | :--- | :--- | :--- |
| `onModuleInit()` | 🌐 public / ⚡ async | `არაფერი` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `initializeCalendar()` | 🔒 private / 🔄 sync | `არაფერი` | `any` | OAuth2 Client-ის ინიციალიზაცია — იგივე credentials რაც GmailService-ში / |
| `checkConnection()` | 🌐 public / 🔄 sync | `არაფერი` | `boolean` | კავშირის შემოწმება / |
| `deleteMeeting()` | 🌐 public / ⚡ async | `eventId: string` | `Promise<void>` | Google Calendar Event-ის წაშლა (სესიის გაუქმებისას) / |

### 🔹 `MeetCronService`
- **ფაილის გზა:** [`back/src/modules/meet/meet-cron.service.ts`](file:///C:/Users/Gio/Desktop/fitness-saas/back/src/modules/meet/meet-cron.service.ts)
- **ფუნქციების რაოდენობა:** 1

| ფუნქციის დასახელება | ტიპი | პარამეტრები (Input) | დაბრუნებული ტიპი | აღწერა და ლოგიკა |
| :--- | :--- | :--- | :--- | :--- |
| `handleSessionStatusCron()` | 🌐 public / ⚡ async | `არაფერი` | `any` | სტატისტიკური მონაცემების აგრეგაცია და ანალიტიკა |

### 🔹 `MeetService`
- **ფაილის გზა:** [`back/src/modules/meet/meet.service.ts`](file:///C:/Users/Gio/Desktop/fitness-saas/back/src/modules/meet/meet.service.ts)
- **ფუნქციების რაოდენობა:** 11

| ფუნქციის დასახელება | ტიპი | პარამეტრები (Input) | დაბრუნებული ტიპი | აღწერა და ლოგიკა |
| :--- | :--- | :--- | :--- | :--- |
| `updateSession()` | 🌐 public / ⚡ async | `meetSessionID: string, dto: any` | `any` | არსებული ჩანაწერის მონაცემების განახლება |
| `generateMeetLink()` | 🌐 public / ⚡ async | `meetSessionID: string` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `sendNotifications()` | 🌐 public / ⚡ async | `meetSessionID: string` | `any` | შეტყობინების/ნოტიფიკაციის გაგზავნა |
| `addParticipants()` | 🌐 public / ⚡ async | `meetSessionID: string, customerIDs: string[]` | `any` | ახალი ჩანაწერის/ენტიტის შექმნა და ვალიდაცია |
| `removeParticipant()` | 🌐 public / ⚡ async | `meetSessionID: string, customerID: string` | `any` | ჩანაწერის წაშლა ან დეაქტივაცია (Soft Delete) |
| `getUpcoming()` | 🌐 public / ⚡ async | `companyID: string` | `any` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `getSessionDetail()` | 🌐 public / ⚡ async | `meetSessionID: string` | `any` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `getByDateRange()` | 🌐 public / ⚡ async | `companyID: string, from: string, to: string` | `any` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `getStatistics()` | 🌐 public / ⚡ async | `companyID: string` | `any` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `cancelSession()` | 🌐 public / ⚡ async | `meetSessionID: string` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `buildMeetEmailHtml()` | 🔒 private / 🔄 sync | `session: any` | `string` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |

---

## 📦 მოდული: MESSAGE-BUILDER

### 🔹 `MessageBuilderService`
- **ფაილის გზა:** [`back/src/modules/message-builder/telegram-message-builder.service.ts`](file:///C:/Users/Gio/Desktop/fitness-saas/back/src/modules/message-builder/telegram-message-builder.service.ts)
- **ფუნქციების რაოდენობა:** 7

| ფუნქციის დასახელება | ტიპი | პარამეტრები (Input) | დაბრუნებული ტიპი | აღწერა და ლოგიკა |
| :--- | :--- | :--- | :--- | :--- |
| `registerFont()` | 🌐 public / 🔄 sync | `fontPath, { family: 'NotoSansGeorgian' }` | `any` | ახალი ჩანაწერის/ენტიტის შექმნა და ვალიდაცია |
| `buildCustomerRegisterMessage()` | 🌐 public / 🔄 sync | `customer: Customer` | `string` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `buildSalesRegisterMessage()` | 🌐 public / 🔄 sync | `sale: Sales` | `string` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `buildSingleSalesMessage()` | 🌐 public / 🔄 sync | `data: any` | `string` | ერთჯერადი გაყიდვა |
| `buildAccessorySaleMessage()` | 🌐 public / 🔄 sync | `data: any` | `string` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `buildHBDMessage()` | 🌐 public / 🔄 sync | `customer: Customer, companyName: string` | `any` | შეგვიძლია შევთავაზოთ ფასდაკლება ნებისმიერ აბონიმენტზე |
| `drawSection()` | 🌐 public / 🔄 sync | `'💪 გაყიდული აბონიმენტები', lines, abonimentTotal` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |

---

## 📦 მოდული: MONEY-EXCHANGE

### 🔹 `MoneyExchangeService`
- **ფაილის გზა:** [`back/src/modules/money-exchange/money-exchange.service.ts`](file:///C:/Users/Gio/Desktop/fitness-saas/back/src/modules/money-exchange/money-exchange.service.ts)
- **ფუნქციების რაოდენობა:** 4

| ფუნქციის დასახელება | ტიპი | პარამეტრები (Input) | დაბრუნებული ტიპი | აღწერა და ლოგიკა |
| :--- | :--- | :--- | :--- | :--- |
| `customerMoneyDepositList()` | 🌐 public / ⚡ async | `customerID: string` | `any` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `countCustomerCoinsBalance()` | 🌐 public / ⚡ async | `customerID: string` | `any` | ჩანაწერების რაოდენობის დათვლა |
| `checkCompany()` | 🌐 public / ⚡ async | `companyID: string` | `any` | მონაცემთა ვალიდაცია და წესებთან თავსებადობის შემოწმება |
| `checkCustomer()` | 🌐 public / ⚡ async | `customerID: string` | `any` | მონაცემთა ვალიდაცია და წესებთან თავსებადობის შემოწმება |

---

## 📦 მოდული: MONITORING

### 🔹 `MonitoringService`
- **ფაილის გზა:** [`back/src/modules/monitoring/monitoring.service.ts`](file:///C:/Users/Gio/Desktop/fitness-saas/back/src/modules/monitoring/monitoring.service.ts)
- **ფუნქციების რაოდენობა:** 21

| ფუნქციის დასახელება | ტიპი | პარამეტრები (Input) | დაბრუნებული ტიპი | აღწერა და ლოგიკა |
| :--- | :--- | :--- | :--- | :--- |
| `getTodayDisconnects()` | 🌐 public / ⚡ async | `companyID: string` | `Promise<` | მიმდინარე დღის დისკონექტების ისტორია / |
| `startOfDay()` | 🌐 public / 🔄 sync | `today` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `endOfDay()` | 🌐 public / 🔄 sync | `today` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `getTodayAccessLogs()` | 🌐 public / ⚡ async | `არაფერი` | `any` | დღევანდელი კარის გაღების ისტორია / |
| `getDoorLogsByDateRange()` | 🌐 public / ⚡ async | `from: Date, to: Date` | `any` | თარიღის მიხედვით კარის გაღების ლოგები + სტატისტიკა / |
| `getTodayExpiredSales()` | 🌐 public / ⚡ async | `companyID: string` | `any` | დღევანდელი წაშლილი ვადაგასული კლიენტები / |
| `startOfDay()` | 🌐 public / 🔄 sync | `today` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `endOfDay()` | 🌐 public / 🔄 sync | `today` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `getExpiredSalesByDateRange()` | 🌐 public / ⚡ async | `companyID: string, from: Date, to: Date` | `any` | თარიღის მიხედვით წაშლილი ვადაგასული კლიენტების ისტორია / |
| `getTodayMorningSales()` | 🌐 public / ⚡ async | `companyID: string` | `any` | დღევანდელი წაშლილი დილის აბონიმენტები / |
| `startOfDay()` | 🌐 public / 🔄 sync | `today` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `endOfDay()` | 🌐 public / 🔄 sync | `today` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `getMorningSalesByDateRange()` | 🌐 public / ⚡ async | `companyID: string, from: Date, to: Date` | `any` | თარიღის მიხედვით წაშლილი დილის აბონიმენტების ისტორია / |
| `getTodayDeleteHistory()` | 🌐 public / ⚡ async | `companyID: string` | `any` | დღევანდელი 15 წუთიანი წაშლის ისტორია / |
| `startOfDay()` | 🌐 public / 🔄 sync | `today` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `endOfDay()` | 🌐 public / 🔄 sync | `today` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `getDeleteHistoryByDateRange()` | 🌐 public / ⚡ async | `companyID: string, from: Date, to: Date` | `any` | თარიღის მიხედვით 15 წუთიანი წაშლის ისტორია / |
| `getTodayReactivations()` | 🌐 public / ⚡ async | `companyID: string` | `any` | დღევანდელი რეაქტივაციები / |
| `startOfDay()` | 🌐 public / 🔄 sync | `today` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `endOfDay()` | 🌐 public / 🔄 sync | `today` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `getReactivationsByDateRange()` | 🌐 public / ⚡ async | `companyID: string, from: Date, to: Date` | `any` | თარიღის მიხედვით რეაქტივაციების ისტორია / |

---

## 📦 მოდული: MUSIC

### 🔹 `MusicService`
- **ფაილის გზა:** [`back/src/modules/music/music.service.ts`](file:///C:/Users/Gio/Desktop/fitness-saas/back/src/modules/music/music.service.ts)
- **ფუნქციების რაოდენობა:** 29

| ფუნქციის დასახელება | ტიპი | პარამეტრები (Input) | დაბრუნებული ტიპი | აღწერა და ლოგიკა |
| :--- | :--- | :--- | :--- | :--- |
| `uploadTrack()` | 🌐 public / ⚡ async | `fileUrl: string, dto: CreateTrackDto, companyID: string` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `updateTrack()` | 🌐 public / ⚡ async | `trackID: string, dto: UpdateTrackDto` | `any` | არსებული ჩანაწერის მონაცემების განახლება |
| `deleteTrack()` | 🌐 public / ⚡ async | `trackID: string` | `any` | ჩანაწერის წაშლა ან დეაქტივაცია (Soft Delete) |
| `createPlaylist()` | 🌐 public / ⚡ async | `dto: CreatePlaylistDto, companyID: string` | `any` | ახალი ჩანაწერის/ენტიტის შექმნა და ვალიდაცია |
| `getPlaylists()` | 🌐 public / ⚡ async | `companyID: string` | `any` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `updatePlaylist()` | 🌐 public / ⚡ async | `playlistID: string, dto: UpdatePlaylistDto` | `any` | არსებული ჩანაწერის მონაცემების განახლება |
| `deletePlaylist()` | 🌐 public / ⚡ async | `playlistID: string` | `any` | ჩანაწერის წაშლა ან დეაქტივაცია (Soft Delete) |
| `getUserFavorites()` | 🌐 public / ⚡ async | `userID: string` | `any` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `getTrackFavorites()` | 🌐 public / ⚡ async | `trackID: string` | `any` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `recordListen()` | 🌐 public / ⚡ async | `dto: RecordListenDto, userID: string, companyID: string` | `any` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `getAnalytics()` | 🌐 public / ⚡ async | `companyID: string` | `any` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `getListeningHistory()` | 🌐 public / ⚡ async | `companyID: string, limit = 50` | `any` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `createSchedule()` | 🌐 public / ⚡ async | `dto: CreateScheduleDto, companyID: string` | `any` | ახალი ჩანაწერის/ენტიტის შექმნა და ვალიდაცია |
| `getSchedules()` | 🌐 public / ⚡ async | `companyID: string` | `any` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `deleteSchedule()` | 🌐 public / ⚡ async | `scheduleID: string` | `any` | ჩანაწერის წაშლა ან დეაქტივაცია (Soft Delete) |
| `toggleSchedule()` | 🌐 public / ⚡ async | `scheduleID: string` | `any` | პერიოდული ავტომატური ამოცანის (Cron Job) შესრულება |
| `getActiveSchedule()` | 🌐 public / ⚡ async | `companyID: string, zone?: string` | `any` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `getZones()` | 🌐 public / ⚡ async | `companyID: string` | `any` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `getAllTags()` | 🌐 public / ⚡ async | `companyID: string` | `any` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `getArtists()` | 🌐 public / ⚡ async | `companyID: string` | `any` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `getArtistTracks()` | 🌐 public / ⚡ async | `companyID: string, artist: string` | `any` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `getMusicRequests()` | 🌐 public / ⚡ async | `companyID: string, status?: string` | `any` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `getMyRequests()` | 🌐 public / ⚡ async | `companyID: string, userID: string` | `any` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `getPendingRequestCount()` | 🌐 public / ⚡ async | `companyID: string` | `any` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `getZoneVolumes()` | 🌐 public / ⚡ async | `companyID: string` | `any` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `setZoneVolume()` | 🌐 public / ⚡ async | `dto: UpdateZoneVolumeDto, companyID: string` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `getCurrentZoneVolume()` | 🌐 public / ⚡ async | `companyID: string, zone: string` | `any` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `sharePlaylist()` | 🌐 public / ⚡ async | `playlistID: string, targetCompanyID: string` | `any` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `duplicatePlaylist()` | 🌐 public / ⚡ async | `playlistID: string, companyID: string` | `any` | ჩანაწერების სიის მიღება ან ფილტრაცია |

### 🔹 `MusicSyncService`
- **ფაილის გზა:** [`back/src/modules/music/music.sync.service.ts`](file:///C:/Users/Gio/Desktop/fitness-saas/back/src/modules/music/music.sync.service.ts)
- **ფუნქციების რაოდენობა:** 6

| ფუნქციის დასახელება | ტიპი | პარამეტრები (Input) | დაბრუნებული ტიპი | აღწერა და ლოგიკა |
| :--- | :--- | :--- | :--- | :--- |
| `syncAllSources()` | 🌐 public / ⚡ async | `არაფერი` | `any` | მონაცემთა სინქრონიზაცია საგარეო სერვისთან ან ბაზასთან |
| `syncFromJamendo()` | 🌐 public / ⚡ async | `არაფერი` | `Promise<` | მონაცემთა სინქრონიზაცია საგარეო სერვისთან ან ბაზასთან |
| `syncFromAudius()` | 🌐 public / ⚡ async | `არაფერი` | `Promise<` | მონაცემთა სინქრონიზაცია საგარეო სერვისთან ან ბაზასთან |
| `parseInt()` | 🌐 public / 🔄 sync | `match[1] \|\| '0'` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `parseInt()` | 🌐 public / 🔄 sync | `match[2] \|\| '0'` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `parseInt()` | 🌐 public / 🔄 sync | `match[3] \|\| '0'` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |

---

## 📦 მოდული: NAVIGATION

### 🔹 `NavigationService`
- **ფაილის გზა:** [`back/src/modules/navigation/navigation.service.ts`](file:///C:/Users/Gio/Desktop/fitness-saas/back/src/modules/navigation/navigation.service.ts)
- **ფუნქციების რაოდენობა:** 2

| ფუნქციის დასახელება | ტიპი | პარამეტრები (Input) | დაბრუნებული ტიპი | აღწერა და ლოგიკა |
| :--- | :--- | :--- | :--- | :--- |
| `findAndAddBilling()` | 🌐 public / 🔄 sync | `configWithBilling` | `any` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `updateNavigationMenu()` | 🌐 public / ⚡ async | `companyID: string, config: any[]` | `Promise<Settings>` | არსებული ჩანაწერის მონაცემების განახლება |

---

## 📦 მოდული: NEWS

### 🔹 `NewsService`
- **ფაილის გზა:** [`back/src/modules/news/news.service.ts`](file:///C:/Users/Gio/Desktop/fitness-saas/back/src/modules/news/news.service.ts)
- **ფუნქციების რაოდენობა:** 7

| ფუნქციის დასახელება | ტიპი | პარამეტრები (Input) | დაბრუნებული ტიპი | აღწერა და ლოგიკა |
| :--- | :--- | :--- | :--- | :--- |
| `getNewsByID()` | 🌐 public / ⚡ async | `newsID: string` | `Promise<News>` | ნიუსის აიდით წამოღება |
| `statusOnNewsList()` | 🌐 public / ⚡ async | `companyID: string` | `any` | მხოლოდ იმ ნიუსების გამოჩენა რომლების status-on არის |
| `newsList()` | 🌐 public / ⚡ async | `companyID: string` | `any` | ყველა ნიუს ლისტის წამოღება |
| `deleteNewsPhotoPath()` | 🌐 public / ⚡ async | `newsID: string` | `Promise<News>` | ნიუსის ფოტოს მისამართის წაშლა |
| `deleteNews()` | 🌐 public / ⚡ async | `newsID: string` | `Promise<` | ჩანაწერის წაშლა ან დეაქტივაცია (Soft Delete) |
| `checkCompany()` | 🌐 public / ⚡ async | `companyID: string` | `any` | checks |
| `checkNews()` | 🌐 public / ⚡ async | `newsID: string` | `any` | მონაცემთა ვალიდაცია და წესებთან თავსებადობის შემოწმება |

---

## 📦 მოდული: ORDER

### 🔹 `OrderService`
- **ფაილის გზა:** [`back/src/modules/order/order.service.ts`](file:///C:/Users/Gio/Desktop/fitness-saas/back/src/modules/order/order.service.ts)
- **ფუნქციების რაოდენობა:** 10

| ფუნქციის დასახელება | ტიპი | პარამეტრები (Input) | დაბრუნებული ტიპი | აღწერა და ლოგიკა |
| :--- | :--- | :--- | :--- | :--- |
| `updateOrder()` | 🌐 public / ⚡ async | `orderID: string, updateData: GoodsDataDto` | `any` | არსებული ჩანაწერის მონაცემების განახლება |
| `changOrderSalesDate()` | 🌐 public / ⚡ async | `orderID: string, salesDate: string` | `any` | გაყიდვის თარიღის შეცვლა(მაგ ძველი თარიღით გატარება) |
| `addProductInorder()` | 🌐 public / ⚡ async | `orderID: string, updateData: GoodsDataDto` | `any` | პროდუქტის ჩამატება ორდერში |
| `calculateandSortOrders()` | 🌐 public / ⚡ async | `companyID: string` | `any` | გაყიდული პროდუქტების სორტირება და ჯამი |
| `getAggregatedOrderQuantities()` | 🌐 public / ⚡ async | `companyID: string` | `any` | ოპტიმიზებული — MongoDB Aggregation-ით არ ტვირთავს ყველა order-ს მეხსიერებაში / |
| `getAggregatedIngredientQuantities()` | 🌐 public / ⚡ async | `companyID: string` | `any` | რეცეპტით გაყიდული ინგრედიენტების ჯამი / |
| `filterOrder()` | 🌐 public / ⚡ async | `salesData: FilterOrderSales, page?: number, size?: number` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `checkOrder()` | 🔒 private / ⚡ async | `orderID: string` | `any` | მონაცემთა ვალიდაცია და წესებთან თავსებადობის შემოწმება |
| `deleteOrder()` | 🌐 public / ⚡ async | `orderID: string` | `Promise<` | ჩანაწერის წაშლა ან დეაქტივაცია (Soft Delete) |
| `exportOrdersToExcel()` | 🌐 public / ⚡ async | `data: any[]` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |

---

## 📦 მოდული: PDF

### 🔹 `PdfService`
- **ფაილის გზა:** [`back/src/modules/pdf/pdf.service.ts`](file:///C:/Users/Gio/Desktop/fitness-saas/back/src/modules/pdf/pdf.service.ts)
- **ფუნქციების რაოდენობა:** 1

| ფუნქციის დასახელება | ტიპი | პარამეტრები (Input) | დაბრუნებული ტიპი | აღწერა და ლოგიკა |
| :--- | :--- | :--- | :--- | :--- |
| `createPdf()` | 🌐 public / 🔄 sync | `fileName: string, text: string` | `any` | ახალი ჩანაწერის/ენტიტის შექმნა და ვალიდაცია |

---

## 📦 მოდული: PERMISSION

### 🔹 `PermissionService`
- **ფაილის გზა:** [`back/src/modules/permission/permission.service.ts`](file:///C:/Users/Gio/Desktop/fitness-saas/back/src/modules/permission/permission.service.ts)
- **ფუნქციების რაოდენობა:** 5

| ფუნქციის დასახელება | ტიპი | პარამეტრები (Input) | დაბრუნებული ტიპი | აღწერა და ლოგიკა |
| :--- | :--- | :--- | :--- | :--- |
| `createNewPermission()` | 🌐 public / ⚡ async | `dto: CreatePermissionDto` | `any` | ახალი ჩანაწერის/ენტიტის შექმნა და ვალიდაცია |
| `createPermissionXarea()` | 🌐 public / ⚡ async | `companyID: string, dto: CreatePermissionDto` | `any` | !ერთჯერადად ჩემთვის, ხსარეასთვის მთავარი უფლების შექმნა |
| `addAllAbonimentPermissions()` | 🌐 public / ⚡ async | `companyID: string, userID: string` | `any` | ახალი ჩანაწერის/ენტიტის შექმნა და ვალიდაცია |
| `getCompanyRolePermission()` | 🌐 public / ⚡ async | `companyID: string, roleID: string` | `any` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `getCompanyAllPermission()` | 🌐 public / ⚡ async | `companyID: string` | `any` | ჩანაწერების სიის მიღება ან ფილტრაცია |

---

## 📦 მოდული: PIN

### 🔹 `PinService`
- **ფაილის გზა:** [`back/src/modules/pin/pin.service.ts`](file:///C:/Users/Gio/Desktop/fitness-saas/back/src/modules/pin/pin.service.ts)
- **ფუნქციების რაოდენობა:** 3

| ფუნქციის დასახელება | ტიპი | პარამეტრები (Input) | დაბრუნებული ტიპი | აღწერა და ლოგიკა |
| :--- | :--- | :--- | :--- | :--- |
| `customerDetales()` | 🌐 public / ⚡ async | `customer: Customer` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `trainerDetales()` | 🌐 public / ⚡ async | `trainer: Trainer` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `guestDetales()` | 🌐 public / ⚡ async | `guest: Guest` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |

---

## 📦 მოდული: PLAN

### 🔹 `PlanService`
- **ფაილის გზა:** [`back/src/modules/plan/plan.service.ts`](file:///C:/Users/Gio/Desktop/fitness-saas/back/src/modules/plan/plan.service.ts)
- **ფუნქციების რაოდენობა:** 7

| ფუნქციის დასახელება | ტიპი | პარამეტრები (Input) | დაბრუნებული ტიპი | აღწერა და ლოგიკა |
| :--- | :--- | :--- | :--- | :--- |
| `getBranchPlans()` | 🌐 public / ⚡ async | `branchID: string` | `Promise<Plan[]>` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `getBranchUsage()` | 🌐 public / ⚡ async | `branchID: string` | `any` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `createPlan()` | 🌐 public / ⚡ async | `planData: PlanDataDto` | `any` | ახალი ჩანაწერის/ენტიტის შექმნა და ვალიდაცია |
| `createSinglePlan()` | 🔒 private / ⚡ async | `planData: PlanDataDto` | `any` | ახალი ჩანაწერის/ენტიტის შექმნა და ვალიდაცია |
| `getBillingPricing()` | 🌐 public / ⚡ async | `არაფერი` | `any` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `updateBillingPricing()` | 🌐 public / ⚡ async | `pricingData: any` | `any` | არსებული ჩანაწერის მონაცემების განახლება |
| `updatePlanGraceDays()` | 🌐 public / ⚡ async | `planID: string, graceDays: number` | `Promise<Plan>` | არსებული ჩანაწერის მონაცემების განახლება |

### 🔹 `SubscriptionSchedulerService`
- **ფაილის გზა:** [`back/src/modules/plan/subscription-scheduler.service.ts`](file:///C:/Users/Gio/Desktop/fitness-saas/back/src/modules/plan/subscription-scheduler.service.ts)
- **ფუნქციების რაოდენობა:** 1

| ფუნქციის დასახელება | ტიპი | პარამეტრები (Input) | დაბრუნებული ტიპი | აღწერა და ლოგიკა |
| :--- | :--- | :--- | :--- | :--- |
| `handleSubscriptionExpiry()` | 🌐 public / ⚡ async | `არაფერი` | `any` | პერიოდული ავტომატური ამოცანის (Cron Job) შესრულება |

---

## 📦 მოდული: PRODUCT

### 🔹 `ProductService`
- **ფაილის გზა:** [`back/src/modules/product/product.service.ts`](file:///C:/Users/Gio/Desktop/fitness-saas/back/src/modules/product/product.service.ts)
- **ფუნქციების რაოდენობა:** 6

| ფუნქციის დასახელება | ტიპი | პარამეტრები (Input) | დაბრუნებული ტიპი | აღწერა და ლოგიკა |
| :--- | :--- | :--- | :--- | :--- |
| `getProductByBarcode()` | 🌐 public / ⚡ async | `barcode: string` | `any` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `getProductByID()` | 🌐 public / ⚡ async | `productID: string` | `any` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `getProductsByIDs()` | 🌐 public / ⚡ async | `productIDs: string[]` | `any` | Batch — ერთი query-ით N პროდუქტის წამოღება / |
| `deleteProduct()` | 🌐 public / ⚡ async | `productID: string` | `Promise<` | ჩანაწერის წაშლა ან დეაქტივაცია (Soft Delete) |
| `checkCompany()` | 🌐 public / ⚡ async | `companyID: string` | `any` | მონაცემთა ვალიდაცია და წესებთან თავსებადობის შემოწმება |
| `checkProduct()` | 🌐 public / ⚡ async | `productID: string` | `any` | მონაცემთა ვალიდაცია და წესებთან თავსებადობის შემოწმება |

---

## 📦 მოდული: PRODUCT-CATEGORY

### 🔹 `ProductCategoryService`
- **ფაილის გზა:** [`back/src/modules/product-category/product.category.service.ts`](file:///C:/Users/Gio/Desktop/fitness-saas/back/src/modules/product-category/product.category.service.ts)
- **ფუნქციების რაოდენობა:** 2

| ფუნქციის დასახელება | ტიპი | პარამეტრები (Input) | დაბრუნებული ტიპი | აღწერა და ლოგიკა |
| :--- | :--- | :--- | :--- | :--- |
| `getProductCategoryList()` | 🌐 public / ⚡ async | `არაფერი` | `any` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `checkCompany()` | 🌐 public / ⚡ async | `companyID: string` | `any` | check |

---

## 📦 მოდული: PROMOTION

### 🔹 `PromotionService`
- **ფაილის გზა:** [`back/src/modules/promotion/promotion.service.ts`](file:///C:/Users/Gio/Desktop/fitness-saas/back/src/modules/promotion/promotion.service.ts)
- **ფუნქციების რაოდენობა:** 7

| ფუნქციის დასახელება | ტიპი | პარამეტრები (Input) | დაბრუნებული ტიპი | აღწერა და ლოგიკა |
| :--- | :--- | :--- | :--- | :--- |
| `getAllPromotions()` | 🌐 public / ⚡ async | `არაფერი` | `Promise<Promotion[]>` | ყველა აქციის წამოღება |
| `getPromotionByID()` | 🌐 public / ⚡ async | `promotionID: string` | `Promise<Promotion>` | ერთი აქციის წამოღება |
| `getActivePromotions()` | 🌐 public / ⚡ async | `არაფერი` | `Promise<Promotion[]>` | აქტიური აქციების წამოღება |
| `deletePromotion()` | 🌐 public / ⚡ async | `promotionID: string` | `Promise<` | აქციის წაშლა (soft delete) |
| `getPromotionCustomers()` | 🌐 public / ⚡ async | `promotionID: string` | `any` | კონკრეტული აქციის კლიენტების სია |
| `getUsageStats()` | 🌐 public / ⚡ async | `dateRange?: { startDate: Date; endDate: Date }` | `any` | გამოყენების სტატისტიკა (optional date range) |
| `getUsageStatsByDateRange()` | 🌐 public / ⚡ async | `startDate: Date, endDate: Date` | `any` | თარიღის მიხედვით გამოყენების სტატისტიკა |

---

## 📦 მოდული: PURCHASE

### 🔹 `PurchaseService`
- **ფაილის გზა:** [`back/src/modules/purchase/purchase.service.ts`](file:///C:/Users/Gio/Desktop/fitness-saas/back/src/modules/purchase/purchase.service.ts)
- **ფუნქციების რაოდენობა:** 9

| ფუნქციის დასახელება | ტიპი | პარამეტრები (Input) | დაბრუნებული ტიპი | აღწერა და ლოგიკა |
| :--- | :--- | :--- | :--- | :--- |
| `updatePurchase()` | 🌐 public / ⚡ async | `purchaseID: string, updateData: GoodsDataDto` | `any` | არსებული ჩანაწერის მონაცემების განახლება |
| `deleteProductInPurchase()` | 🌐 public / ⚡ async | `purchaseID: string, productID: string` | `any` | კონკრეტული პროდუქტის წაშლა |
| `getPurchase()` | 🌐 public / ⚡ async | `purchaseID: string` | `Promise<Purchase>` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `getPurchaseProductIDAndQuantities()` | 🌐 public / ⚡ async | `companyID: string` | `any` | ! ახალი ვერსია გვიბრუნებს პროდუქტებს რაოდენობებთან ერთად |
| `getProductDetailsByProductID()` | 🌐 public / ⚡ async | `productIDs: string[]` | `any` | ! ახალი ვარიანტი გადავცემთ აიდებს და გვიბრუნებს პროდუქტის დეტალებს |
| `getCalculatedPurchaseDetails()` | 🌐 public / ⚡ async | `companyID: string` | `any` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `balanceAccount()` | 🌐 public / ⚡ async | `companyID: string, text?: string` | `any` | ოპტიმიზებული ბალანსის გამოთვლა — MongoDB Aggregation Pipeline  ძველი ვერსია: ტვირთავდა ყველა purchase + ყველა order + N+1 product queries ახალი ვერსია: 2 aggregation query + 0 product queries / |
| `checkPurchase()` | 🔒 private / ⚡ async | `purchaseID: string` | `any` | მონაცემთა ვალიდაცია და წესებთან თავსებადობის შემოწმება |
| `exportBalancInExcel()` | 🌐 public / ⚡ async | `data: any[]` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |

---

## 📦 მოდული: PUSH-ANALYTICS

### 🔹 `PushAnalyticsService`
- **ფაილის გზა:** [`back/src/modules/push-analytics/push.analytics.service.ts`](file:///C:/Users/Gio/Desktop/fitness-saas/back/src/modules/push-analytics/push.analytics.service.ts)
- **ფუნქციების რაოდენობა:** 2

| ფუნქციის დასახელება | ტიპი | პარამეტრები (Input) | დაბრუნებული ტიპი | აღწერა და ლოგიკა |
| :--- | :--- | :--- | :--- | :--- |
| `getDashboardAnalytics()` | 🌐 public / ⚡ async | `startDateStr: string, endDateStr: string` | `any` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `getPaginatedLogs()` | 🌐 public / ⚡ async | `page = 1, limit = 20, filters: any = {}` | `any` | ჩანაწერების სიის მიღება ან ფილტრაცია |

---

## 📦 მოდული: PUSH-NOTIFICATION

### 🔹 `PushNotificationService`
- **ფაილის გზა:** [`back/src/modules/push-notification/push-notification.service.ts`](file:///C:/Users/Gio/Desktop/fitness-saas/back/src/modules/push-notification/push-notification.service.ts)
- **ფუნქციების რაოდენობა:** 0

*სერვისში ფუნქციები არ მოიძებნა ან მხოლოდ დამხმარე კონსტრუქტორია.*

---

## 📦 მოდული: RECIPE

### 🔹 `RecipeService`
- **ფაილის გზა:** [`back/src/modules/recipe/recipe.service.ts`](file:///C:/Users/Gio/Desktop/fitness-saas/back/src/modules/recipe/recipe.service.ts)
- **ფუნქციების რაოდენობა:** 4

| ფუნქციის დასახელება | ტიპი | პარამეტრები (Input) | დაბრუნებული ტიპი | აღწერა და ლოგიკა |
| :--- | :--- | :--- | :--- | :--- |
| `getRecipesByCompanyID()` | 🌐 public / ⚡ async | `companyID: string` | `Promise<Recipe[]>` | კომპანიის ყველა რეცეპტი / |
| `getRecipeByID()` | 🌐 public / ⚡ async | `recipeID: string` | `Promise<Recipe>` | ერთი რეცეპტის წამოღება / |
| `deleteRecipe()` | 🌐 public / ⚡ async | `recipeID: string` | `Promise<` | რეცეპტის წაშლა / |
| `checkRecipe()` | 🔒 private / ⚡ async | `recipeID: string` | `Promise<Recipe>` | მონაცემთა ვალიდაცია და წესებთან თავსებადობის შემოწმება |

---

## 📦 მოდული: REFERRAL

### 🔹 `ReferralService`
- **ფაილის გზა:** [`back/src/modules/referral/referral.service.ts`](file:///C:/Users/Gio/Desktop/fitness-saas/back/src/modules/referral/referral.service.ts)
- **ფუნქციების რაოდენობა:** 17

| ფუნქციის დასახელება | ტიპი | პარამეტრები (Input) | დაბრუნებული ტიპი | აღწერა და ლოგიკა |
| :--- | :--- | :--- | :--- | :--- |
| `createProgram()` | 🌐 public / ⚡ async | `data: any` | `any` | ახალი ჩანაწერის/ენტიტის შექმნა და ვალიდაცია |
| `getPrograms()` | 🌐 public / ⚡ async | `არაფერი` | `any` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `getActiveProgram()` | 🌐 public / ⚡ async | `არაფერი` | `any` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `updateProgram()` | 🌐 public / ⚡ async | `programID: string, data: any` | `any` | არსებული ჩანაწერის მონაცემების განახლება |
| `deleteProgram()` | 🌐 public / ⚡ async | `programID: string` | `any` | ჩანაწერის წაშლა ან დეაქტივაცია (Soft Delete) |
| `generateCode()` | 🌐 public / ⚡ async | `customerID: string, customerName?: string` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `getMyCode()` | 🌐 public / ⚡ async | `customerID: string` | `any` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `validateCode()` | 🌐 public / ⚡ async | `code: string, refereeCustomerID: string` | `any` | მონაცემთა ვალიდაცია და წესებთან თავსებადობის შემოწმება |
| `reverseReferral()` | 🌐 public / ⚡ async | `saleID: string` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `getStats()` | 🌐 public / ⚡ async | `dateRange?: { startDate: Date; endDate: Date }` | `any` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `getMyReferrals()` | 🌐 public / ⚡ async | `customerID: string` | `any` | Customer-ის მოწვეულების სია |
| `getMyRewards()` | 🌐 public / ⚡ async | `customerID: string` | `any` | Customer-ის ჯილდოების სია |
| `getAvailableRewards()` | 🌐 public / ⚡ async | `customerID: string` | `any` | Customer-ის ხელმისაწვდომი ჯილდოები |
| `getCustomerTier()` | 🌐 public / ⚡ async | `customerID: string` | `any` | Customer-ის ტიერი |
| `getAllReferrals()` | 🌐 public / ⚡ async | `page = 1, limit = 20` | `any` | ყველა მოწვევის სია (Admin) |
| `rejectReferral()` | 🌐 public / ⚡ async | `referralID: string, reason: string` | `any` | მოწვევის უარყოფა (Admin - fraud) |
| `generateUniqueCode()` | 🔒 private / 🔄 sync | `customerName?: string` | `string` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |

---

## 📦 მოდული: ROLE

### 🔹 `RoleService`
- **ფაილის გზა:** [`back/src/modules/role/role.service.ts`](file:///C:/Users/Gio/Desktop/fitness-saas/back/src/modules/role/role.service.ts)
- **ფუნქციების რაოდენობა:** 5

| ფუნქციის დასახელება | ტიპი | პარამეტრები (Input) | დაბრუნებული ტიპი | აღწერა და ლოგიკა |
| :--- | :--- | :--- | :--- | :--- |
| `createRole()` | 🌐 public / ⚡ async | `roleData: RoleDataDto, companyID: string` | `any` | ახალი ჩანაწერის/ენტიტის შექმნა და ვალიდაცია |
| `createRoleXarea()` | 🌐 public / ⚡ async | `companyID: string, roleName: string` | `any` | ახალი ჩანაწერის/ენტიტის შექმნა და ვალიდაცია |
| `getRole()` | 🌐 public / ⚡ async | `roleID: string` | `Promise<Role>` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `getAllRoles()` | 🌐 public / ⚡ async | `companyID: string` | `Promise<Role[]>` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `deleteRole()` | 🌐 public / ⚡ async | `roleID: string, companyID: string` | `any` | ჩანაწერის წაშლა ან დეაქტივაცია (Soft Delete) |

---

## 📦 მოდული: RS

### 🔹 `RsAuthService`
- **ფაილის გზა:** [`back/src/modules/rs/rs.auth.service.ts`](file:///C:/Users/Gio/Desktop/fitness-saas/back/src/modules/rs/rs.auth.service.ts)
- **ფუნქციების რაოდენობა:** 4

| ფუნქციის დასახელება | ტიპი | პარამეტრები (Input) | დაბრუნებული ტიპი | აღწერა და ლოგიკა |
| :--- | :--- | :--- | :--- | :--- |
| `getCredentials()` | 🌐 public / 🔄 sync | `არაფერი` | `` | RS.ge API-ს credentials-ის დაბრუნება / |
| `getApiUrl()` | 🌐 public / 🔄 sync | `არაფერი` | `string` | RS.ge API URL / |
| `buildSoapEnvelope()` | 🌐 public / 🔄 sync | `methodName: string, params: Record<string, any>` | `string` | SOAP Envelope-ის შექმნა RS.ge-ს API-სთვის / |
| `isConfigured()` | 🌐 public / 🔄 sync | `არაფერი` | `boolean` | Credentials ვალიდურია? / |

### 🔹 `RsInvoiceService`
- **ფაილის გზა:** [`back/src/modules/rs/rs.invoice.service.ts`](file:///C:/Users/Gio/Desktop/fitness-saas/back/src/modules/rs/rs.invoice.service.ts)
- **ფუნქციების რაოდენობა:** 6

| ფუნქციის დასახელება | ტიპი | პარამეტრები (Input) | დაბრუნებული ტიპი | აღწერა და ლოგიკა |
| :--- | :--- | :--- | :--- | :--- |
| `getWaybillById()` | 🌐 public / ⚡ async | `waybillId: number` | `Promise<RsWaybill \| null>` | ============================================================ |
| `getWaybillGoods()` | 🌐 public / ⚡ async | `waybillId: number` | `Promise<RsWaybillGood[]>` | ============================================================ |
| `parseWaybillsFromXml()` | 🔒 private / ⚡ async | `xml: string` | `Promise<RsWaybill[]>` | SOAP XML response-დან ზედნადებების ამოღება / |
| `mapRawWaybill()` | 🔒 private / 🔄 sync | `raw: any` | `RsWaybill` | Raw XML ობიექტიდან → RsWaybill / |
| `parseGoodsFromXml()` | 🔒 private / ⚡ async | `xml: string` | `Promise<RsWaybillGood[]>` | XML-დან საქონლის ამოღება / |
| `confirmWaybill()` | 🌐 public / ⚡ async | `waybillId: number` | `Promise<boolean>` | ============================================================ |

### 🔹 `RsMappingService`
- **ფაილის გზა:** [`back/src/modules/rs/rs.mapping.service.ts`](file:///C:/Users/Gio/Desktop/fitness-saas/back/src/modules/rs/rs.mapping.service.ts)
- **ფუნქციების რაოდენობა:** 3

| ფუნქციის დასახელება | ტიპი | პარამეტრები (Input) | დაბრუნებული ტიპი | აღწერა და ლოგიკა |
| :--- | :--- | :--- | :--- | :--- |
| `findProduct()` | 🔒 private / ⚡ async | `good: RsWaybillGood, companyID: string` | `any` | ============================================================ |
| `autoCreateProduct()` | 🔒 private / ⚡ async | `good: RsWaybillGood, companyID: string` | `any` | ============================================================ |
| `findOrCreateRsCategory()` | 🔒 private / ⚡ async | `companyID: string` | `any` | ახალი ჩანაწერის/ენტიტის შექმნა და ვალიდაცია |

### 🔹 `RsSyncService`
- **ფაილის გზა:** [`back/src/modules/rs/rs.sync.service.ts`](file:///C:/Users/Gio/Desktop/fitness-saas/back/src/modules/rs/rs.sync.service.ts)
- **ფუნქციების რაოდენობა:** 1

| ფუნქციის დასახელება | ტიპი | პარამეტრები (Input) | დაბრუნებული ტიპი | აღწერა და ლოგიკა |
| :--- | :--- | :--- | :--- | :--- |
| `getSyncHistory()` | 🌐 public / ⚡ async | `companyID: string, limit = 100` | `any` | ============================================================ |

### 🔹 `RsTaxPayerService`
- **ფაილის გზა:** [`back/src/modules/rs/rs.taxpayer.service.ts`](file:///C:/Users/Gio/Desktop/fitness-saas/back/src/modules/rs/rs.taxpayer.service.ts)
- **ფუნქციების რაოდენობა:** 9

| ფუნქციის დასახელება | ტიპი | პარამეტრები (Input) | დაბრუნებული ტიპი | აღწერა და ლოგიკა |
| :--- | :--- | :--- | :--- | :--- |
| `getCredentials()` | 🔒 private / 🔄 sync | `არაფერი` | `` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `getApiUrl()` | 🔒 private / 🔄 sync | `არაფერი` | `string` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `isConfigured()` | 🌐 public / 🔄 sync | `არაფერი` | `boolean` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `debugConfig()` | 🌐 public / 🔄 sync | `არაფერი` | `` | 🔧 Debug — რა credentials/URL იგზავნება RS.ge-ზე / |
| `parseResponse()` | 🔒 private / ⚡ async | `xml: string` | `Promise<any>` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `toSoapDateTime()` | 🔒 private / 🔄 sync | `dateStr: string` | `string` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `getIncomeAmount()` | 🌐 public / ⚡ async | `year: number` | `Promise<` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `activateApi()` | 🌐 public / ⚡ async | `saidCode?: string` | `Promise<` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `testAuth()` | 🌐 public / ⚡ async | `tpCode?: string` | `Promise<` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |

---

## 📦 მოდული: SALES

### 🔹 `SalesService`
- **ფაილის გზა:** [`back/src/modules/sales/sales.service.ts`](file:///C:/Users/Gio/Desktop/fitness-saas/back/src/modules/sales/sales.service.ts)
- **ფუნქციების რაოდენობა:** 101

| ფუნქციის დასახელება | ტიპი | პარამეტრები (Input) | დაბრუნებული ტიპი | აღწერა და ლოგიკა |
| :--- | :--- | :--- | :--- | :--- |
| `exportActiveSalesDataToExcel()` | 🌐 public / ⚡ async | `data: any[]` | `any` | ატლეტიკისთვის-სეილების  ბაზის ექსელში გადატანა |
| `exportSalesDataToExcel()` | 🌐 public / ⚡ async | `data: any` | `Promise<Buffer>` | გაფილტრული სეილების ექსელის ფაილში გადატანა |
| `addRows()` | 🌐 public / 🔄 sync | `data.accessorySales` | `any` | ახალი ჩანაწერის/ენტიტის შექმნა და ვალიდაცია |
| `readExcelDataAndCreateSales()` | 🌐 public / ⚡ async | `არაფერი` | `any` | ექსელიდან აქტიური სეილების ბაზაში შეყრა(იქსარეა) |
| `readExcelDataAndCreateSalesAthletic()` | 🌐 public / ⚡ async | `არაფერი` | `any` | ექსელიდან აქტიური სეილების ბაზაში შეყრა(ათლეტიკი) |
| `formatDate()` | 🔒 private / ⚡ async | `inputDate` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `addMonths()` | 🌐 public / 🔄 sync | `baseDate, existingAboniment.abonimentMonthPeriod` | `any` | ახალი ჩანაწერის/ენტიტის შექმნა და ვალიდაცია |
| `addWeeks()` | 🌐 public / 🔄 sync | `baseDate, existingAboniment.abonimentWeekPeriod` | `any` | ახალი ჩანაწერის/ენტიტის შექმნა და ვალიდაცია |
| `addMonths()` | 🌐 public / 🔄 sync | `giftBaseDate, aboniment.abonimentMonthPeriod` | `any` | ახალი ჩანაწერის/ენტიტის შექმნა და ვალიდაცია |
| `addWeeks()` | 🌐 public / 🔄 sync | `giftBaseDate, aboniment.abonimentWeekPeriod` | `any` | ახალი ჩანაწერის/ენტიტის შექმნა და ვალიდაცია |
| `customerValidTurniketCode()` | 🌐 public / ⚡ async | `customer: Customer` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `saveCustomerWithdraw()` | 🔒 private / ⚡ async | `obj: object, customerInfo: object` | `any` | კლიენტს როცა უნდა დაგროვებული ქულებით იყიდოს სეილი (ვინახავთ ქეშბექ კოლექციაში ტრანზაქციას) |
| `trainerDetalse()` | 🌐 public / ⚡ async | `trainer: TrainerDetailsDto` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `abonimentDetales()` | 🌐 public / ⚡ async | `aboniment: Aboniment` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `abonimentFullInfo()` | 🌐 public / ⚡ async | `aboniment: Aboniment` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `trainerPackageFullInfo()` | 🌐 public / 🔄 sync | `trainerPackage: any` | `any` | ტრენერის პაკეტის სრული სნაპშოტი — სეილის მომენტის მდგომარეობა |
| `customerDetales()` | 🌐 public / ⚡ async | `customer: Customer` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `userDetales()` | 🌐 public / ⚡ async | `user: User` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `customerVisit()` | 🌐 public / ⚡ async | `turniketCode: string, eventaddr: string` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `customerExit()` | 🌐 public / ⚡ async | `turniketCode: string, eventaddr: string` | `any` | ! ახალი ვერსია ტურნიკეტზე გამოსვლის დადება |
| `assignStartAndEndDate()` | 🌐 public / ⚡ async | `salesID: string` | `any` | ვიყენებ კიდევ ერთ ფუნქციაში ციკლში ვიყენებ |
| `addDays()` | 🌐 public / 🔄 sync | `sale.salesDate, checkStartDate` | `any` | ახალი ჩანაწერის/ენტიტის შექმნა და ვალიდაცია |
| `lastSale()` | 🌐 public / ⚡ async | `turniketCode: string` | `any` | ამ ფუნქციას ვიყენებ turniket.schedule |
| `addDays()` | 🌐 public / 🔄 sync | `referenceDate, checkStartDate` | `any` | ახალი ჩანაწერის/ენტიტის შექმნა და ვალიდაცია |
| `addDays()` | 🌐 public / 🔄 sync | `lastOldSale.endDate, 1` | `any` | ახალი ჩანაწერის/ენტიტის შექმნა და ვალიდაცია |
| `saveCustomerVisit()` | 🔒 private / ⚡ async | `sales: Sales, eventaddr: string` | `any` | ! ყოველდღიური მისვლა ვიზიტი ფიქსირდება customer_visit  ში |
| `now()` | 🌐 public / 🔄 sync | `არაფერი` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `saveCustomerExitVisit()` | 🔒 private / ⚡ async | `sales: Sales, eventaddr: string` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `now()` | 🌐 public / 🔄 sync | `არაფერი` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `findSalesByEndDate()` | 🌐 public / ⚡ async | `from: Date, to: Date` | `Promise<Sales[]>` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `findSalesByActivateDate()` | 🌐 public / ⚡ async | `from: Date, to: Date` | `Promise<Sales[]>` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `resetSalesAfterActivation()` | 🌐 public / ⚡ async | `salesID: string` | `Promise<void>` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `addMonths()` | 🌐 public / 🔄 sync | `sales.startDate, sales.abonimentCountMonth` | `any` | ახალი ჩანაწერის/ენტიტის შექმნა და ვალიდაცია |
| `calculateWorkoutTotalPrice()` | 🌐 public / ⚡ async | `salesData: ITotalSalesDataDto` | `any` | გვჭირდება გაყიდვის დროს გვაძლევს აბონიმენტის საერთო ფასს |
| `deleteSale()` | 🌐 public / ⚡ async | `salesID: string, reqUserID: string, comment: string` | `any` | სეილის წაშლა ,სეილთან ერთად იშლება ტურნიკედის კოდიც |
| `uploadActiveSales()` | 🌐 public / ⚡ async | `companyID: string` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `deleteInactiveCards()` | 🌐 public / ⚡ async | `companyID: string` | `Promise<string[]>` | არააქტიური ბარათების წაშლა ტურნიკეტის ტვინში (არააქტიური სეილების მიხედვით) |
| `uniqueComparator()` | 🔒 private / 🔄 sync | `x: any, i: number, arr: any[]` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `filtersales()` | 🌐 public / ⚡ async | `salesData: ISalesFilterDataDto` | `any` | ! todo აქ ჩასამატებელია მარკეტის ჯამი ნაღდი უნდაღდო |
| `getSaleByID()` | 🌐 public / ⚡ async | `salesID: string` | `Promise<Sales>` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `getUserBalanse()` | 🌐 public / ⚡ async | `userBalanceData: IUserBalanceDataDto` | `any` | ! აქ მოსაფიქრებელია კლიენტი როცა მოიტანს დავალიანებას ის როგორ გავატაროთ იმ დღის ხარჯებში |
| `getManagerBalanse()` | 🌐 public / ⚡ async | `managerBalanceData: IManagerBalanceDataDto` | `any` | !ახალი ვერსია მენეჯერის ბალანსი |
| `getCompanySalesList()` | 🌐 public / ⚡ async | `salesData: FilterSalesByTime` | `any` | //! fillter all sales |
| `getSalesByUserID()` | 🌐 public / ⚡ async | `salesData: FilterSalesByUserID` | `any` | და მომხმარებლების რაოდენობას ასევე თანხის ჯამს |
| `getManagerInfo()` | 🌐 public / ⚡ async | `salesData: FilterSalesByTime` | `any` | ! მენეჯერის დღიური ჯამი , მომხმარებლების  რაოდენობა |
| `getTrainerInfo()` | 🌐 public / ⚡ async | `salesData: FilterSalesByTrainerID` | `any` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `setSalesTurniketRegisterError()` | 🌐 public / ⚡ async | `salesID: string` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `resetSalesTurniketRegisterError()` | 🌐 public / ⚡ async | `salesID: string` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `findSalesByTurniketRegisterError()` | 🌐 public / ⚡ async | `არაფერი` | `any` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `developerModeCustomerVisit()` | 🌐 public / ⚡ async | `turniketCode: string` | `any` | ჩემთვის მჭირდება ხელით დროების დასამატებლათ ერთჯერადად (only development) |
| `addDays()` | 🌐 public / 🔄 sync | `oneSale.salesDate, aboniment.countStartsDays` | `any` | ახალი ჩანაწერის/ენტიტის შექმნა და ვალიდაცია |
| `transferTurniketInfo()` | 🌐 public / ⚡ async | `companyID: string` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `salesActivePasiveStatistic()` | 🌐 public / ⚡ async | `companyID: string` | `any` | სტატისტიკური მონაცემების აგრეგაცია და ანალიტიკა |
| `spendingTimeCurrentSales()` | 🌐 public / ⚡ async | `period: number` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `findDailyCustomerVisit()` | 🌐 public / ⚡ async | `არაფერი` | `any` | ვიზიტებს ვეძებ რომლებსაც 15 წუთის გასულები არიან დარბაზიდან |
| `findDailyCustomerVisitStatusTrue()` | 🌐 public / ⚡ async | `არაფერი` | `any` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `showTodayDeletedCustomers()` | 🌐 public / ⚡ async | `არაფერი` | `any` | ვიზიტებიდან მომაქ ინფო |
| `deletedClientsList()` | 🌐 public / ⚡ async | `text: string` | `any` | მომაქ 15 წუთის გამო წაშლილი კლიენტების ბაზიდან |
| `deletedMorningClientsList()` | 🌐 public / ⚡ async | `text: string` | `any` | ჩანაწერის წაშლა ან დეაქტივაცია (Soft Delete) |
| `countDeletedClients()` | 🌐 public / ⚡ async | `არაფერი` | `any` | აბრუნებს წაშლილი კლიენტების რაოდენობას |
| `countMorningDeletedClients()` | 🌐 public / ⚡ async | `არაფერი` | `any` | აბრუნებს დილის აბონიმენტის გამო წაშლილ კლიენტების კაუნტს |
| `activeMorningSales()` | 🌐 public / ⚡ async | `არაფერი` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `activeEveningSales()` | 🌐 public / ⚡ async | `companyID: string` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `getCurrentDayOfWeek()` | 🌐 public / ⚡ async | `არაფერი` | `any` | ! გვიბრუნებს დრევანდელ დღეს |
| `customerAccessByDayOfWeek()` | 🌐 public / ⚡ async | `არაფერი` | `Promise<any[]>` | Client access by days of the week |
| `getCurrentTimeFormatted()` | 🌐 public / 🔄 sync | `არაფერი` | `string` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `deleteallUnpaidSalesTurnikets()` | 🌐 public / ⚡ async | `არაფერი` | `any` | ჩანაწერის წაშლა ან დეაქტივაცია (Soft Delete) |
| `currentSale()` | 🌐 public / ⚡ async | `customerID: string` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `createCustomersSalesByDayOfWeekAndTimePeriod()` | 🌐 public / ⚡ async | `არაფერი` | `any` | კლიენტის შესაშვებად მაგ 12:00 დან 14:00 მდე |
| `deletecustomerSalesByDayOfWeekAndTimePeriod()` | 🌐 public / ⚡ async | `არაფერი` | `any` | კლიენტის შესაშვებად მაგ 12:00 დან 14:00 მდე |
| `createCustomersSalesOnlyTimePeriod()` | 🌐 public / ⚡ async | `არაფერი` | `any` | კლიენტის შესაშვებად მაგ 12:00 დან 14:00 მდე |
| `deleteCustomersSalesOnlyTimePeriod()` | 🌐 public / ⚡ async | `არაფერი` | `any` | ჩანაწერის წაშლა ან დეაქტივაცია (Soft Delete) |
| `deleteCustomersSalesByForbiddenStartTime()` | 🌐 public / ⚡ async | `არაფერი` | `any` | ჩანაწერის წაშლა ან დეაქტივაცია (Soft Delete) |
| `createCustomersSalesByForbiddeEndTime()` | 🌐 public / ⚡ async | `არაფერი` | `any` | ახალი ჩანაწერის/ენტიტის შექმნა და ვალიდაცია |
| `allActiveSalesData()` | 🌐 public / ⚡ async | `companyID: string` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `endDateNullSales()` | 🌐 public / ⚡ async | `არაფერი` | `any` | ათლეტიკისთვის მაინტერესებს |
| `activateRealSales()` | 🌐 public / ⚡ async | `companyID: string` | `any` | ვშლი ატლეტიკის ტვინს და ამ ფუნქციას გამოვიძახებ რომ აღვადგინო რეალური კოდები |
| `assignCustomersActiveTrueStatus()` | 🌐 public / ⚡ async | `companyID: string` | `any` | ერთჯერადად ათლეტიკისტვის კლიენტების გააქტიურება |
| `upcomingSalesExpirationDates()` | 🌐 public / ⚡ async | `არაფერი` | `any` | ვაჩვენებ რაოდენობებს |
| `allDeletedSales()` | 🌐 public / ⚡ async | `არაფერი` | `any` | ჩანაწერის წაშლა ან დეაქტივაცია (Soft Delete) |
| `checkCompany()` | 🌐 public / ⚡ async | `companyID: string` | `any` | მონაცემთა ვალიდაცია და წესებთან თავსებადობის შემოწმება |
| `checkCustomer()` | 🌐 public / ⚡ async | `customerID: string` | `any` | მონაცემთა ვალიდაცია და წესებთან თავსებადობის შემოწმება |
| `checkUser()` | 🌐 public / ⚡ async | `userID: string` | `any` | მონაცემთა ვალიდაცია და წესებთან თავსებადობის შემოწმება |
| `checkTrainer()` | 🌐 public / ⚡ async | `trainerID: string` | `any` | მონაცემთა ვალიდაცია და წესებთან თავსებადობის შემოწმება |
| `checkTrainerPackage()` | 🌐 public / ⚡ async | `trainerPackageID: string` | `any` | მონაცემთა ვალიდაცია და წესებთან თავსებადობის შემოწმება |
| `checkAboniment()` | 🌐 public / ⚡ async | `abonimentID: string` | `any` | მონაცემთა ვალიდაცია და წესებთან თავსებადობის შემოწმება |
| `checkCard()` | 🌐 public / ⚡ async | `cardID: string` | `any` | მონაცემთა ვალიდაცია და წესებთან თავსებადობის შემოწმება |
| `addOnlyActiveSales()` | 🌐 public / ⚡ async | `არაფერი` | `any` | ახალი ჩანაწერის/ენტიტის შექმნა და ვალიდაცია |
| `allSalesTurniketNole()` | 🌐 public / ⚡ async | `არაფერი` | `any` | x-area შეცდომების გასასწორებლად ჩემთვის |
| `allSalesByTurniketCode()` | 🌐 public / ⚡ async | `turniketCode: string` | `any` | satestod athleticistvis sadziebod |
| `getSalesDiscountNeZero()` | 🌐 public / ⚡ async | `არაფერი` | `any` | ვეძებ ისეთ სეილებს სადაც დისქაუნთი 0-ზე მეტია ანუ ფასდაკლებულია |
| `assignCorrectAbonimentPrice()` | 🌐 public / ⚡ async | `არაფერი` | `any` | x-area სთვის შეცდომის გასასწორებლად |
| `changeAbonimentPrice()` | 🌐 public / ⚡ async | `salesID: string, abonimentPrice: number` | `any` | ვასწორებ სეილში |
| `getOldDateButActiveSales()` | 🌐 public / ⚡ async | `არაფერი` | `any` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `getOldMaxDateButPendingSales()` | 🌐 public / ⚡ async | `არაფერი` | `any` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `overLimitEntries()` | 🌐 public / ⚡ async | `არაფერი` | `any` | ! გავტესტე და შეცდომა არ დაფიქსირდა იქსარეაში |
| `flagZeroSales()` | 🌐 public / ⚡ async | `არაფერი` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `findMaxEndDateLessThanEndDate()` | 🌐 public / ⚡ async | `არაფერი` | `any` | ? ეს კოდი გადასატარებელია იქსარიას ბაზაზე რომ გავასწოროთ |
| `flagLess6()` | 🌐 public / ⚡ async | `არაფერი` | `any` | ! flag less 6 |
| `fixBrokenTrainerInfo()` | 🌐 public / ⚡ async | `არაფერი` | `any` | ! ერთჯერადი მიგრაცია: trainerInfo-ს გასწორება |
| `fixSingleSaleTrainerPackage()` | 🌐 public / ⚡ async | `არაფერი` | `any` | ! ერთჯერადი ფიქსი: კონკრეტული სეილისთვის ტრენერის 150 ლარიანი პაკეტის მიბმა |

---

## 📦 მოდული: SCHEDULE

### 🔹 `SchedulesService`
- **ფაილის გზა:** [`back/src/modules/schedule/schedule.service.ts`](file:///C:/Users/Gio/Desktop/fitness-saas/back/src/modules/schedule/schedule.service.ts)
- **ფუნქციების რაოდენობა:** 1

| ფუნქციის დასახელება | ტიპი | პარამეტრები (Input) | დაბრუნებული ტიპი | აღწერა და ლოგიკა |
| :--- | :--- | :--- | :--- | :--- |
| `getDayOfWeek()` | 🔒 private / 🔄 sync | `date: Date` | `string` | ჩანაწერების სიის მიღება ან ფილტრაცია |

---

## 📦 მოდული: SECURITY

### 🔹 `SecurityService`
- **ფაილის გზა:** [`back/src/modules/security/security.service.ts`](file:///C:/Users/Gio/Desktop/fitness-saas/back/src/modules/security/security.service.ts)
- **ფუნქციების რაოდენობა:** 19

| ფუნქციის დასახელება | ტიპი | პარამეტრები (Input) | დაბრუნებული ტიპი | აღწერა და ლოგიკა |
| :--- | :--- | :--- | :--- | :--- |
| `getSettings()` | 🌐 public / ⚡ async | `companyID?: string` | `any` | კომპანიის security settings-ის წამოღება თუ companyID არ არის, default values ბრუნდება / |
| `updateSettings()` | 🌐 public / ⚡ async | `companyID: string, data: any, updatedBy?: string` | `any` | Settings-ის განახლება (მენეჯერისთვის) / |
| `checkAccountLock()` | 🌐 public / ⚡ async | `email: string` | `Promise<void>` | ჩანაწერების რაოდენობის დათვლა |
| `recordFailedAttempt()` | 🌐 public / ⚡ async | `email: string` | `Promise<void>` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `isIpTrusted()` | 🔒 private / 🔄 sync | `user: any, ip: string` | `boolean` | IP მისამართით ამოწმებს, trusted device-იდან არის თუ არა / |
| `forceLogoutAll()` | 🌐 public / ⚡ async | `email: string` | `Promise<` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `checkPasswordExpiry()` | 🌐 public / ⚡ async | `email: string` | `Promise<` | მონაცემთა ვალიდაცია და წესებთან თავსებადობის შემოწმება |
| `isTrustedDevice()` | 🌐 public / ⚡ async | `email: string, deviceId: string` | `Promise<boolean>` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `removeTrustedDevice()` | 🌐 public / ⚡ async | `email: string, deviceId: string` | `Promise<void>` | ჩანაწერის წაშლა ან დეაქტივაცია (Soft Delete) |
| `getTrustedDevices()` | 🌐 public / ⚡ async | `email: string` | `any` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `clearAllTrustedDevices()` | 🌐 public / ⚡ async | `email: string` | `Promise<void>` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `generateBackupCodes()` | 🌐 public / ⚡ async | `email: string` | `Promise<string[]>` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `validateBackupCode()` | 🌐 public / ⚡ async | `email: string, code: string` | `Promise<boolean>` | მონაცემთა ვალიდაცია და წესებთან თავსებადობის შემოწმება |
| `getBackupCodesStatus()` | 🌐 public / ⚡ async | `email: string` | `Promise<` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `getLoginHistory()` | 🌐 public / ⚡ async | `email: string, limit = 20` | `any` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `getCompanyLoginHistory()` | 🌐 public / ⚡ async | `companyID: string, limit = 50` | `any` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `getSecurityScore()` | 🌐 public / ⚡ async | `email: string` | `any` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `getActiveSessions()` | 🌐 public / ⚡ async | `email: string` | `any` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `getSessionHistory()` | 🌐 public / ⚡ async | `email: string, limit = 50` | `any` | ჩანაწერების სიის მიღება ან ფილტრაცია |

---

## 📦 მოდული: SERVICE

### 🔹 `ServiceService`
- **ფაილის გზა:** [`back/src/modules/service/service.service.ts`](file:///C:/Users/Gio/Desktop/fitness-saas/back/src/modules/service/service.service.ts)
- **ფუნქციების რაოდენობა:** 5

| ფუნქციის დასახელება | ტიპი | პარამეტრები (Input) | დაბრუნებული ტიპი | აღწერა და ლოგიკა |
| :--- | :--- | :--- | :--- | :--- |
| `removeSensitiveFields()` | 🔒 private / 🔄 sync | `service: any` | `any` | ჩანაწერის წაშლა ან დეაქტივაცია (Soft Delete) |
| `createService()` | 🌐 public / ⚡ async | `serviceData: IServiceDataDto` | `any` | ახალი ჩანაწერის/ენტიტის შექმნა და ვალიდაცია |
| `getServices()` | 🌐 public / ⚡ async | `არაფერი` | `any` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `updateService()` | 🌐 public / ⚡ async | `serviceID: string, serviceUpdateData: IServiceUpdateDataDto` | `any` | არსებული ჩანაწერის მონაცემების განახლება |
| `deleteService()` | 🌐 public / ⚡ async | `serviceID: string` | `any` | ჩანაწერის წაშლა ან დეაქტივაცია (Soft Delete) |

---

## 📦 მოდული: SETTINGS

### 🔹 `SettingsService`
- **ფაილის გზა:** [`back/src/modules/settings/settings.service.ts`](file:///C:/Users/Gio/Desktop/fitness-saas/back/src/modules/settings/settings.service.ts)
- **ფუნქციების რაოდენობა:** 7

| ფუნქციის დასახელება | ტიპი | პარამეტრები (Input) | დაბრუნებული ტიპი | აღწერა და ლოგიკა |
| :--- | :--- | :--- | :--- | :--- |
| `getSettings()` | 🌐 public / ⚡ async | `settingsID: string` | `Promise<Settings>` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `getSettingsByCompanyID()` | 🌐 public / ⚡ async | `companyID: string` | `Promise<Settings>` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `updateNavigationLabels()` | 🌐 public / ⚡ async | `companyID: string, labels: any` | `Promise<Settings>` | არსებული ჩანაწერის მონაცემების განახლება |
| `getDividingTime()` | 🌐 public / ⚡ async | `settingsID: string` | `any` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `deleteSettings()` | 🌐 public / ⚡ async | `settingsID: string` | `Promise<` | ჩანაწერის წაშლა ან დეაქტივაცია (Soft Delete) |
| `checkCompany()` | 🌐 public / ⚡ async | `companyID: string` | `any` | მონაცემთა ვალიდაცია და წესებთან თავსებადობის შემოწმება |
| `checkSettings()` | 🌐 public / ⚡ async | `settingsID: string` | `any` | მონაცემთა ვალიდაცია და წესებთან თავსებადობის შემოწმება |

---

## 📦 მოდული: SINGLE-SALE

### 🔹 `SingleSaleService`
- **ფაილის გზა:** [`back/src/modules/single-sale/single.sale.service.ts`](file:///C:/Users/Gio/Desktop/fitness-saas/back/src/modules/single-sale/single.sale.service.ts)
- **ფუნქციების რაოდენობა:** 3

| ფუნქციის დასახელება | ტიპი | პარამეტრები (Input) | დაბრუნებული ტიპი | აღწერა და ლოგიკა |
| :--- | :--- | :--- | :--- | :--- |
| `deleteSingleSale()` | 🌐 public / ⚡ async | `singleSaleID: string` | `Promise<` | ჩანაწერის წაშლა ან დეაქტივაცია (Soft Delete) |
| `getSingleSale()` | 🌐 public / ⚡ async | `singleSaleID: string` | `Promise<Single_Sale>` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `checkCompany()` | 🌐 public / ⚡ async | `companyID: string` | `any` | მონაცემთა ვალიდაცია და წესებთან თავსებადობის შემოწმება |

---

## 📦 მოდული: SMS-ANALYTICS

### 🔹 `SmsAnalyticsService`
- **ფაილის გზა:** [`back/src/modules/sms-analytics/sms.analytics.service.ts`](file:///C:/Users/Gio/Desktop/fitness-saas/back/src/modules/sms-analytics/sms.analytics.service.ts)
- **ფუნქციების რაოდენობა:** 2

| ფუნქციის დასახელება | ტიპი | პარამეტრები (Input) | დაბრუნებული ტიპი | აღწერა და ლოგიკა |
| :--- | :--- | :--- | :--- | :--- |
| `getDashboardAnalytics()` | 🌐 public / ⚡ async | `startDateStr: string, endDateStr: string` | `any` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `getPaginatedLogs()` | 🌐 public / ⚡ async | `page = 1, limit = 20, filters: any = {}` | `any` | ჩანაწერების სიის მიღება ან ფილტრაცია |

---

## 📦 მოდული: SUBSCRIPTION-LIMIT

### 🔹 `SubscriptionLimitService`
- **ფაილის გზა:** [`back/src/modules/subscription-limit/subscription-limit.service.ts`](file:///C:/Users/Gio/Desktop/fitness-saas/back/src/modules/subscription-limit/subscription-limit.service.ts)
- **ფუნქციების რაოდენობა:** 0

*სერვისში ფუნქციები არ მოიძებნა ან მხოლოდ დამხმარე კონსტრუქტორია.*

---

## 📦 მოდული: SUPPLIER

### 🔹 `SupplierService`
- **ფაილის გზა:** [`back/src/modules/supplier/supplier.service.ts`](file:///C:/Users/Gio/Desktop/fitness-saas/back/src/modules/supplier/supplier.service.ts)
- **ფუნქციების რაოდენობა:** 3

| ფუნქციის დასახელება | ტიპი | პარამეტრები (Input) | დაბრუნებული ტიპი | აღწერა და ლოგიკა |
| :--- | :--- | :--- | :--- | :--- |
| `getSupplier()` | 🌐 public / ⚡ async | `supplierID: string` | `Promise<Supplier>` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `getCompanySupplierList()` | 🌐 public / ⚡ async | `companyID: string` | `any` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `checkSupplier()` | 🔒 private / ⚡ async | `supplierID: string` | `any` | მონაცემთა ვალიდაცია და წესებთან თავსებადობის შემოწმება |

---

## 📦 მოდული: SUPPORT

### 🔹 `SupportBotService`
- **ფაილის გზა:** [`back/src/modules/support/bot/support-bot.service.ts`](file:///C:/Users/Gio/Desktop/fitness-saas/back/src/modules/support/bot/support-bot.service.ts)
- **ფუნქციების რაოდენობა:** 7

| ფუნქციის დასახელება | ტიპი | პარამეტრები (Input) | დაბრუნებული ტიპი | აღწერა და ლოგიკა |
| :--- | :--- | :--- | :--- | :--- |
| `onModuleInit()` | 🌐 public / ⚡ async | `არაფერი` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `initSupportChannel()` | 🔒 private / ⚡ async | `არაფერი` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `onMessageCreate()` | 🌐 public / ⚡ async | `@Context(` | `any` | ახალი ჩანაწერის/ენტიტის შექმნა და ვალიდაცია |
| `handleTicketClosed()` | 🌐 public / ⚡ async | `payload: { ticket: SupportTicket }` | `any` | პერიოდული ავტომატური ამოცანის (Cron Job) შესრულება |
| `archiveDiscordThread()` | 🌐 public / ⚡ async | `threadId: string` | `any` | Helper method to close thread from bot command |
| `updateParentMessageStatus()` | 🌐 public / ⚡ async | `ticket: SupportTicket, newStatus: string` | `any` | არსებული ჩანაწერის მონაცემების განახლება |
| `getDiscordFileObjects()` | 🔒 private / 🔄 sync | `attachments: string[]` | `any` | Helper to resolve localhost attachment URLs to local files for direct Discord upload |

### 🔹 `SupportService`
- **ფაილის გზა:** [`back/src/modules/support/support.service.ts`](file:///C:/Users/Gio/Desktop/fitness-saas/back/src/modules/support/support.service.ts)
- **ფუნქციების რაოდენობა:** 4

| ფუნქციის დასახელება | ტიპი | პარამეტრები (Input) | დაბრუნებული ტიპი | აღწერა და ლოგიკა |
| :--- | :--- | :--- | :--- | :--- |
| `listTickets()` | 🌐 public / ⚡ async | `companyID: string, page: number, limit: number` | `any` | 4. List all tickets for a company |
| `getTicketMessages()` | 🌐 public / ⚡ async | `ticketId: string` | `Promise<SupportMessage[]>` | 5. Get messages for a specific ticket |
| `closeTicket()` | 🌐 public / ⚡ async | `ticketId: string` | `Promise<SupportTicket \| null>` | 6. Close ticket |
| `getTicketFirstMessageText()` | 🌐 public / ⚡ async | `ticketId: string` | `Promise<string>` | 9. Get first message text helper |

---

## 📦 მოდული: TABLE-SETTINGS

### 🔹 `TableSettingsService`
- **ფაილის გზა:** [`back/src/modules/table-settings/table-settings.service.ts`](file:///C:/Users/Gio/Desktop/fitness-saas/back/src/modules/table-settings/table-settings.service.ts)
- **ფუნქციების რაოდენობა:** 1

| ფუნქციის დასახელება | ტიპი | პარამეტრები (Input) | დაბრუნებული ტიპი | აღწერა და ლოგიკა |
| :--- | :--- | :--- | :--- | :--- |
| `getSetting()` | 🌐 public / ⚡ async | `companyID: string, tableKey: string` | `Promise<TableSetting \| null>` | Retrieves the column configuration for a specific company and table key / |

---

## 📦 მოდული: TEMPLATE

### 🔹 `TemplateService`
- **ფაილის გზა:** [`back/src/modules/template/template.service.ts`](file:///C:/Users/Gio/Desktop/fitness-saas/back/src/modules/template/template.service.ts)
- **ფუნქციების რაოდენობა:** 3

| ფუნქციის დასახელება | ტიპი | პარამეტრები (Input) | დაბრუნებული ტიპი | აღწერა და ლოგიკა |
| :--- | :--- | :--- | :--- | :--- |
| `checkTemplate()` | 🌐 public / ⚡ async | `templateID: string` | `any` | მონაცემთა ვალიდაცია და წესებთან თავსებადობის შემოწმება |
| `templateList()` | 🌐 public / ⚡ async | `companyID: string` | `any` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `deleteTemplate()` | 🌐 public / ⚡ async | `templateID: string` | `any` | ჩანაწერის წაშლა ან დეაქტივაცია (Soft Delete) |

---

## 📦 მოდული: TICKET

### 🔹 `TicketService`
- **ფაილის გზა:** [`back/src/modules/ticket/ticket.service.ts`](file:///C:/Users/Gio/Desktop/fitness-saas/back/src/modules/ticket/ticket.service.ts)
- **ფუნქციების რაოდენობა:** 5

| ფუნქციის დასახელება | ტიპი | პარამეტრები (Input) | დაბრუნებული ტიპი | აღწერა და ლოგიკა |
| :--- | :--- | :--- | :--- | :--- |
| `getTicketByID()` | 🌐 public / ⚡ async | `ticketID: string` | `Promise<Ticket>` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `ticketsList()` | 🌐 public / ⚡ async | `companyID: string` | `any` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `deleteTicket()` | 🌐 public / ⚡ async | `ticketID: string` | `any` | ჩანაწერის წაშლა ან დეაქტივაცია (Soft Delete) |
| `checkCompany()` | 🌐 public / ⚡ async | `companyID: string` | `any` | მონაცემთა ვალიდაცია და წესებთან თავსებადობის შემოწმება |
| `checkTicket()` | 🌐 public / ⚡ async | `ticketID: string` | `any` | მონაცემთა ვალიდაცია და წესებთან თავსებადობის შემოწმება |

---

## 📦 მოდული: TODO

### 🔹 `TodoService`
- **ფაილის გზა:** [`back/src/modules/todo/todo.service.ts`](file:///C:/Users/Gio/Desktop/fitness-saas/back/src/modules/todo/todo.service.ts)
- **ფუნქციების რაოდენობა:** 10

| ფუნქციის დასახელება | ტიპი | პარამეტრები (Input) | დაბრუნებული ტიპი | აღწერა და ლოგიკა |
| :--- | :--- | :--- | :--- | :--- |
| `getTodo()` | 🌐 public / ⚡ async | `todoID: string` | `Promise<Todo>` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `getTrainerTodoList()` | 🌐 public / ⚡ async | `req: object` | `any` | კონკრეტული ტრენერის ლისტის |
| `reqTrainerInfo()` | 🔒 private / ⚡ async | `req: object` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `reqCompanyInfo()` | 🔒 private / ⚡ async | `req: object` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `deleteTodo()` | 🌐 public / ⚡ async | `todoID: string` | `Promise<` | ჩანაწერის წაშლა ან დეაქტივაცია (Soft Delete) |
| `plusVisit()` | 🌐 public / ⚡ async | `todoID: string` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `minusVisit()` | 🌐 public / ⚡ async | `todoID: string` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `totalAmount()` | 🌐 public / ⚡ async | `req: object` | `any` | ტრენერის გაყიდვები |
| `checkCompany()` | 🔒 private / ⚡ async | `companyID: string` | `any` | მონაცემთა ვალიდაცია და წესებთან თავსებადობის შემოწმება |
| `checkTodo()` | 🔒 private / ⚡ async | `todoID: string` | `any` | მონაცემთა ვალიდაცია და წესებთან თავსებადობის შემოწმება |

---

## 📦 მოდული: TRAINER

### 🔹 `TrainerHelperService`
- **ფაილის გზა:** [`back/src/modules/trainer/trainer-helper.service.ts`](file:///C:/Users/Gio/Desktop/fitness-saas/back/src/modules/trainer/trainer-helper.service.ts)
- **ფუნქციების რაოდენობა:** 1

| ფუნქციის დასახელება | ტიპი | პარამეტრები (Input) | დაბრუნებული ტიპი | აღწერა და ლოგიკა |
| :--- | :--- | :--- | :--- | :--- |
| `checkTurniketCodeCrossEntity()` | 🌐 public / ⚡ async | `turniketCode?: string` | `Promise<` | Checks turniket code uniqueness across Customer, Trainer, Guest, and User collections. / |

### 🔹 `TrainerService`
- **ფაილის გზა:** [`back/src/modules/trainer/trainer.service.ts`](file:///C:/Users/Gio/Desktop/fitness-saas/back/src/modules/trainer/trainer.service.ts)
- **ფუნქციების რაოდენობა:** 27

| ფუნქციის დასახელება | ტიპი | პარამეტრები (Input) | დაბრუნებული ტიპი | აღწერა და ლოგიკა |
| :--- | :--- | :--- | :--- | :--- |
| `removeSensitiveFields()` | 🔒 private / 🔄 sync | `trainer: any` | `Partial<Trainer>` | ჩანაწერის წაშლა ან დეაქტივაცია (Soft Delete) |
| `normalizeMobile()` | 🔒 private / 🔄 sync | `mobile?: string` | `string \| undefined` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `verifyEmail()` | 🔒 private / ⚡ async | `email?: string` | `Promise<void>` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `validateTrainer()` | 🔒 private / ⚡ async | `trainerID: string` | `Promise<Trainer>` | მონაცემთა ვალიდაცია და წესებთან თავსებადობის შემოწმება |
| `getTrainer()` | 🌐 public / ⚡ async | `trainerID: string` | `Promise<Partial<Trainer>>` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `getCompanyTrainersList()` | 🌐 public / ⚡ async | `companyID: string, includeDeleted = false` | `any` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `deletePhotoPath()` | 🌐 public / ⚡ async | `trainerID: string` | `any` | ჩანაწერის წაშლა ან დეაქტივაცია (Soft Delete) |
| `filterTrainer()` | 🌐 public / ⚡ async | `trainerFilterData: ITrainerFilterDataDto` | `any` | ძველი ფილტრი — backwards compatible / |
| `advancedFilterTrainers()` | 🌐 public / ⚡ async | `filterData: ITrainerFilterDataDto` | `any` | 🔍 Advanced filter with pagination GET /trainers supported filters: - search (firstName, lastName, phone) - specialization - experienceYears range - ratingMin - pagination (page, limit) - sorting (experienceYears, ratingAverage, createdAt) / |
| `updateTrainerRating()` | 🌐 public / ⚡ async | `trainerID: string, rating: number` | `any` | ტრენერის რეიტინგის განახლება @param trainerID — ტრენერის ID @param rating — 1-5 რეიტინგი / |
| `getTopTrainers()` | 🌐 public / ⚡ async | `companyID: string, limit = 10` | `any` | 🏆 Top trainers by rating / |
| `getMostExperienced()` | 🌐 public / ⚡ async | `companyID: string, limit = 10` | `any` | 💪 Most experienced trainers / |
| `getTrainerStats()` | 🌐 public / ⚡ async | `companyID: string` | `any` | 📈 Trainer statistics for company / |
| `trainerActiveOrPendingSalesList()` | 🌐 public / ⚡ async | `trainerID: string` | `any` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `SendSMSToTrainerClients()` | 🌐 public / ⚡ async | `trainerID: string, message?: string` | `any` | შეტყობინების/ნოტიფიკაციის გაგზავნა |
| `listTrainerPagination()` | 🌐 public / ⚡ async | `companyID: string, page: number, size: number` | `any` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `validateNoDuplicateCertifications()` | 🔒 private / 🔄 sync | `certifications: any[]` | `any` | სერტიფიკატების დუბლიკატის შემოწმება (title + organization) / |
| `saveNewTurniketCode()` | 🔒 private / ⚡ async | `turniketCode: string` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `deleteTurniketCode()` | 🔒 private / ⚡ async | `turniketCode: string` | `any` | ჩანაწერის წაშლა ან დეაქტივაცია (Soft Delete) |
| `checkCompany()` | 🌐 public / ⚡ async | `companyID: string` | `any` | მონაცემთა ვალიდაცია და წესებთან თავსებადობის შემოწმება |
| `checkTrainer()` | 🌐 public / ⚡ async | `trainerID: string` | `any` | მონაცემთა ვალიდაცია და წესებთან თავსებადობის შემოწმება |
| `restoreTrainer()` | 🌐 public / ⚡ async | `trainerID: string, adminUserID: string` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `activateTurniketCodeOnTrainer()` | 🌐 public / ⚡ async | `trainerID: string` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `deactivateTrainer()` | 🌐 public / ⚡ async | `trainerID: string` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `searchTrainerAudit()` | 🌐 public / ⚡ async | `trainerID: string` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `birthdayToday()` | 🌐 public / ⚡ async | `companyID: string` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `exportTrainersToExcel()` | 🌐 public / ⚡ async | `trainers: any[]` | `Promise<Buffer>` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |

---

## 📦 მოდული: TRAINER-PACKAGE

### 🔹 `TrainerPackageService`
- **ფაილის გზა:** [`back/src/modules/trainer-package/trainer.package.service.ts`](file:///C:/Users/Gio/Desktop/fitness-saas/back/src/modules/trainer-package/trainer.package.service.ts)
- **ფუნქციების რაოდენობა:** 5

| ფუნქციის დასახელება | ტიპი | პარამეტრები (Input) | დაბრუნებული ტიპი | აღწერა და ლოგიკა |
| :--- | :--- | :--- | :--- | :--- |
| `getTrainerPackageList()` | 🌐 public / ⚡ async | `trainerID: string` | `any` | კონკრეტული ტრენერის ლისტის |
| `allTrainerPackageList()` | 🌐 public / ⚡ async | `companyID: string` | `any` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `checkCompany()` | 🔒 private / ⚡ async | `companyID: string` | `any` | მონაცემთა ვალიდაცია და წესებთან თავსებადობის შემოწმება |
| `checkTrainerPackage()` | 🔒 private / ⚡ async | `trainerPackageID: string` | `any` | მონაცემთა ვალიდაცია და წესებთან თავსებადობის შემოწმება |
| `validatePackageData()` | 🔒 private / 🔄 sync | `data: TrainerPackageDataDto` | `any` | მონაცემთა ვალიდაცია და წესებთან თავსებადობის შემოწმება |

---

## 📦 მოდული: TURNIKET

### 🔹 `TurniketService`
- **ფაილის გზა:** [`back/src/modules/turniket/turniket.service.ts`](file:///C:/Users/Gio/Desktop/fitness-saas/back/src/modules/turniket/turniket.service.ts)
- **ფუნქციების რაოდენობა:** 26

| ფუნქციის დასახელება | ტიპი | პარამეტრები (Input) | დაბრუნებული ტიპი | აღწერა და ლოგიკა |
| :--- | :--- | :--- | :--- | :--- |
| `cb()` | 🌐 public / 🔄 sync | `არაფერი` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `close()` | 🌐 public / 🔄 sync | `(` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `close()` | 🌐 public / 🔄 sync | `(` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `close()` | 🌐 public / 🔄 sync | `(` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `setTimeout()` | 🌐 public / 🔄 sync | `(` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `setTimeout()` | 🌐 public / 🔄 sync | `(` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `close()` | 🌐 public / 🔄 sync | `(` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `write()` | 🔒 private / 🔄 sync | `commands: Buffer[], timeout: number` | `Promise<void>` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `cb()` | 🌐 public / 🔄 sync | `არაფერი` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `close()` | 🌐 public / 🔄 sync | `(` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `close()` | 🌐 public / 🔄 sync | `(` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `monitor()` | 🌐 public / 🔄 sync | `timeout: number` | `Promise<TurniketEntrance[]>` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `createCard()` | 🌐 public / 🔄 sync | `cardNumber: string` | `Promise<void>` | ახალი ჩანაწერის/ენტიტის შექმნა და ვალიდაცია |
| `buildCardInsertData()` | 🌐 public / 🔄 sync | `cardNumber, cardNumber` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `buildCardInsertConfirmPinData()` | 🌐 public / 🔄 sync | `cardNumber` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `removeCard()` | 🌐 public / 🔄 sync | `cardNumber: string` | `Promise<void>` | ჩანაწერის წაშლა ან დეაქტივაცია (Soft Delete) |
| `buildCommand()` | 🌐 public / 🔄 sync | `COMMAND_DELETE, buildCardRemovePinData(cardNumber` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `buildCardRemoveConfirmPinData()` | 🌐 public / 🔄 sync | `cardNumber` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `remove()` | 🌐 public / ⚡ async | `cardNumber: string` | `any` | ჩანაწერის წაშლა ან დეაქტივაცია (Soft Delete) |
| `parseInt()` | 🌐 public / 🔄 sync | `cardNumber, 10` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `openDoor()` | 🌐 public / 🔄 sync | `doorIndex: string` | `Promise<void>` | კარების გაღება უსასრულო დროით |
| `openDoorInterval()` | 🌐 public / 🔄 sync | `doorIndex: string, interval: number` | `Promise<void>` | !კარების გაღება / დაკეტვა |
| `buildDoorStateData()` | 🌐 public / 🔄 sync | `doorIndex, true, interval` | `any` | სტატისტიკური მონაცემების აგრეგაცია და ანალიტიკა |
| `closeDoor()` | 🌐 public / 🔄 sync | `doorIndex: string` | `Promise<void>` | კარების დახურვა |
| `saveNewTurniketCode()` | 🌐 public / ⚡ async | `turniketCode?: string` | `Promise<void>` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `deleteTurniketCode()` | 🌐 public / ⚡ async | `turniketCode?: string` | `Promise<void>` | ჩანაწერის წაშლა ან დეაქტივაცია (Soft Delete) |

---

## 📦 მოდული: USER

### 🔹 `UserHelperService`
- **ფაილის გზა:** [`back/src/modules/user/user-helper.service.ts`](file:///C:/Users/Gio/Desktop/fitness-saas/back/src/modules/user/user-helper.service.ts)
- **ფუნქციების რაოდენობა:** 1

| ფუნქციის დასახელება | ტიპი | პარამეტრები (Input) | დაბრუნებული ტიპი | აღწერა და ლოგიკა |
| :--- | :--- | :--- | :--- | :--- |
| `checkTurniketCodeCrossEntity()` | 🌐 public / ⚡ async | `turniketCode?: string` | `Promise<` | Checks turniket code uniqueness across Customer, Trainer, and Guest collections. / |

### 🔹 `UserService`
- **ფაილის გზა:** [`back/src/modules/user/user.service.ts`](file:///C:/Users/Gio/Desktop/fitness-saas/back/src/modules/user/user.service.ts)
- **ფუნქციების რაოდენობა:** 22

| ფუნქციის დასახელება | ტიპი | პარამეტრები (Input) | დაბრუნებული ტიპი | აღწერა და ლოგიკა |
| :--- | :--- | :--- | :--- | :--- |
| `removeSensitiveFields()` | 🔒 private / 🔄 sync | `user: any` | `Partial<User>` | ჩანაწერის წაშლა ან დეაქტივაცია (Soft Delete) |
| `normalizeMobile()` | 🔒 private / 🔄 sync | `mobile?: string` | `string \| undefined` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `verifyEmail()` | 🔒 private / ⚡ async | `email?: string` | `Promise<void>` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `generateAndSetTempPassword()` | 🔒 private / ⚡ async | `user: User` | `Promise<string>` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `hellWorld()` | 🌐 public / ⚡ async | `არაფერი` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `async()` | 🌐 public / 🔄 sync | `არაფერი` | `any` | მონაცემთა სინქრონიზაცია საგარეო სერვისთან ან ბაზასთან |
| `registerBulkUsers()` | 🌐 public / ⚡ async | `companyID: string, users: IUserDataDto[]` | `any` | ახალი ჩანაწერის/ენტიტის შექმნა და ვალიდაცია |
| `forgotPassword()` | 🌐 public / ⚡ async | `email: string` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `forgotPasswordByEmail()` | 🌐 public / ⚡ async | `email: string` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `resetPassword()` | 🌐 public / ⚡ async | `email: string, newPassword: string` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `getUserByID()` | 🌐 public / ⚡ async | `userID: string` | `Promise<User>` | 🔍 მომხმარებლის მიღება ID-ით და ვადაგასული დროებითი ფილიალების ავტომატური გასუფთავება |
| `listUserPagination()` | 🌐 public / ⚡ async | `companyID: string, page: number, size: number` | `any` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `restoreUser()` | 🌐 public / ⚡ async | `userID: string, adminUserID: string` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `getCompanyusersList()` | 🌐 public / ⚡ async | `companyID: string, includeDeleted = false` | `any` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `filterUser()` | 🌐 public / ⚡ async | `userFilterData: IUserFilterDataDto` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `checkUser()` | 🌐 public / ⚡ async | `userID: string` | `any` | მონაცემთა ვალიდაცია და წესებთან თავსებადობის შემოწმება |
| `assignRoleNamesAllUsers()` | 🌐 public / ⚡ async | `არაფერი` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `activateTurniketCodeOnUser()` | 🌐 public / ⚡ async | `userID: string` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `deactivateUser()` | 🌐 public / ⚡ async | `userID: string` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `birthdayToday()` | 🌐 public / ⚡ async | `companyID: string` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `searchUserAudit()` | 🌐 public / ⚡ async | `userID: string` | `any` | სერვისის შიდა ბიზნეს-ლოგიკის ფუნქცია |
| `getTemporaryBranchesHistory()` | 🌐 public / ⚡ async | `userID: string` | `Promise<any[]>` | 🔍 აბრუნებს კონკრეტული მომხმარებლის დროებითი ფილიალების წვდომის ისტორიას |

---

## 📦 მოდული: VIDEO

### 🔹 `VideoService`
- **ფაილის გზა:** [`back/src/modules/video/video.service.ts`](file:///C:/Users/Gio/Desktop/fitness-saas/back/src/modules/video/video.service.ts)
- **ფუნქციების რაოდენობა:** 8

| ფუნქციის დასახელება | ტიპი | პარამეტრები (Input) | დაბრუნებული ტიპი | აღწერა და ლოგიკა |
| :--- | :--- | :--- | :--- | :--- |
| `getVideoByID()` | 🌐 public / ⚡ async | `videoID: string` | `Promise<Video>` | კონკრეტული ვიდეოს წამოღება |
| `getVideoList()` | 🌐 public / ⚡ async | `companyID: string` | `Promise<Video[]>` | ვიდეოების ლისტის წამოღება |
| `getStatusOnVideoList()` | 🌐 public / ⚡ async | `companyID: string` | `Promise<Video[]>` | მხოლოდ იმ ვიდეოების წამოღება რომლის საიტზეც გამოჩენა გვინდა |
| `deleteVideo()` | 🌐 public / ⚡ async | `videoID: string` | `Promise<` | კოლექციიდან წაშლა |
| `deleteVideoPath()` | 🌐 public / ⚡ async | `videoID: string` | `Promise<Video>` | კოლეექციდაან მხოლოდ ვიდეოს ლინკის წაშლა |
| `filterVideos()` | 🌐 public / ⚡ async | `videoFilterData: IVideoFilterDataDto` | `any` | ფილტრი |
| `checkCompany()` | 🌐 public / ⚡ async | `companyID: string` | `any` | check |
| `checkVideo()` | 🌐 public / ⚡ async | `videoID: string` | `any` | მონაცემთა ვალიდაცია და წესებთან თავსებადობის შემოწმება |

---

## 📦 მოდული: WEATHER-NOTIFICATION

### 🔹 `WeatherNotificationService`
- **ფაილის გზა:** [`back/src/modules/weather-notification/weather-notification.service.ts`](file:///C:/Users/Gio/Desktop/fitness-saas/back/src/modules/weather-notification/weather-notification.service.ts)
- **ფუნქციების რაოდენობა:** 9

| ფუნქციის დასახელება | ტიპი | პარამეტრები (Input) | დაბრუნებული ტიპი | აღწერა და ლოგიკა |
| :--- | :--- | :--- | :--- | :--- |
| `fetch7DayForecast()` | 🌐 public / ⚡ async | `latitude: number, longitude: number` | `Promise<any[]>` | 📅 7-დღიანი პროგნოზი Open-Meteo-დან / |
| `sendWorkoutNotification()` | 🌐 public / ⚡ async | `companyID: string, branchID?: string` | `any` | 🏋️📤 ვარჯიშის რეკომენდაციის Push გაგზავნა / |
| `clearPreviewCache()` | 🌐 public / 🔄 sync | `cacheKey: string` | `any` | 🧊 Preview cache-ის გასუფთავება იძახება push გაგზავნის შემდეგ და config ცვლილებისას / |
| `getWeatherPreview()` | 🌐 public / ⚡ async | `companyID: string, branchID?: string` | `Promise<` | 🌤️ ამინდის Preview — ადმინისთვის (push-ის გაგზავნის გარეშე)  🧊 CACHED: 10 წუთი — dashboard-ის ყოველ refresh-ზე Gemini-ს აღარ ეძახის. ადმინს შეუძლია ნახოს ამინდის მონაცემები და AI-ს მიერ გენერირებული მესიჯის preview, push-ის გაგზავნამდე. / |
| `getNotificationHistory()` | 🌐 public / ⚡ async | `companyID: string, limit = 30, branchID?: string` | `any` | 📊 ნოტიფიკაციების ისტორია / |
| `getStats()` | 🌐 public / ⚡ async | `companyID: string, branchID?: string` | `any` | 📊 სტატისტიკა / |
| `hasBeenSentToday()` | 🌐 public / ⚡ async | `companyID: string, branchID?: string` | `Promise<boolean>` | 🔍 დღეს უკვე გაიგზავნა თუ არა / |
| `getWeatherConfig()` | 🌐 public / ⚡ async | `companyID: string, branchID?: string` | `Promise<any>` | ⚙️ ფილიალის weather config-ის წაკითხვა (GET) / |
| `getWeatherEnabledBranches()` | 🌐 public / ⚡ async | `არაფერი` | `Promise<Branch[]>` | 🏢 ყველა weather-enabled ფილიალის მოძიება (cron job-ისთვის) / |

---

## 📦 მოდული: WEBAUTHN

### 🔹 `WebauthnService`
- **ფაილის გზა:** [`back/src/modules/webauthn/webauthn.service.ts`](file:///C:/Users/Gio/Desktop/fitness-saas/back/src/modules/webauthn/webauthn.service.ts)
- **ფუნქციების რაოდენობა:** 5

| ფუნქციის დასახელება | ტიპი | პარამეტრები (Input) | დაბრუნებული ტიპი | აღწერა და ლოგიკა |
| :--- | :--- | :--- | :--- | :--- |
| `setChallenge()` | 🔒 private / 🔄 sync | `key: string, challenge: string, ttlMs = 60000` | `void` | Challenge-ს ვინახავთ TTL-ით |
| `setTimeout()` | 🌐 public / 🔄 sync | `(` | `any` | ავტომატური გასუფთავება TTL-ის შემდეგ |
| `getChallenge()` | 🔒 private / 🔄 sync | `key: string` | `string \| null` | Challenge-ს ვიღებთ და ვამოწმებთ ვადას |
| `getRelyingPartyConfig()` | 🔒 private / 🔄 sync | `requestOrigin?: string` | `` | ============================================ |
| `getCredentials()` | 🌐 public / ⚡ async | `email: string` | `Promise<` | ============================================ |

---

## 📦 მოდული: WIN-BACK

### 🔹 `WinBackAnalyticsService`
- **ფაილის გზა:** [`back/src/modules/win-back/win.back.analytics.service.ts`](file:///C:/Users/Gio/Desktop/fitness-saas/back/src/modules/win-back/win.back.analytics.service.ts)
- **ფუნქციების რაოდენობა:** 10

| ფუნქციის დასახელება | ტიპი | პარამეტრები (Input) | დაბრუნებული ტიპი | აღწერა და ლოგიკა |
| :--- | :--- | :--- | :--- | :--- |
| `getConfig()` | 🔒 private / ⚡ async | `companyID: string` | `any` | კომპანიის win-back კონფიგის წამოღება (DB ან default) / |
| `getWinBackConfig()` | 🌐 public / ⚡ async | `companyID: string` | `any` | 🔧 კონფიგის წამოღება მენეჯერისთვის (CRUD - GET) / |
| `updateWinBackConfig()` | 🌐 public / ⚡ async | `companyID: string, data: any` | `any` | 🔧 კონფიგის განახლება (CRUD - PUT/upsert) / |
| `buildLeadsList()` | 🔒 private / ⚡ async | `companyID: string` | `Promise<WinBackLead[]>` | 🚀 ერთი საერთო მეთოდი — ყველა ვადაგასული ლიდის აწყობა  MongoDB aggregation pipeline-ით ერთი query-ით წამოიღებს ყველა ვადაგასულ კლიენტს (OLD status), გამოთვლის სეგმენტს, პრიორიტეტს და რეკომენდებულ ფასდაკლებას. Dashboard-იც და Leads list-იც ამ მეთოდით იმუშავებს.  @param companyID - კომპანიის ID @returns WinBackLead[] — ლიდების მასივი სრული ინფორმაციით / |
| `getDashboardData()` | 🌐 public / ⚡ async | `companyID: string` | `any` | 📊 Dashboard — მთავარი ანალიტიკის გვერდის მონაცემები  აბრუნებს: - overview: ჯამური სტატისტიკა (totalInactive, hotLeads, warmLeads, etc.) - charts: სეგმენტის, პრიორიტეტის და კვირის chart მონაცემები - lists: topPriority ლიდები + ბოლო 7 დღეში ვადაგასულები  @param companyID - კომპანიის ID / |
| `getCalendarView()` | 🌐 public / ⚡ async | `companyID: string, year: number, month: number` | `any` | 📅 კალენდრის view — თვიური სტრუქტურა  აბრუნებს მითითებული თვის ყველა დღეს, სადაც ვადაგასული კლიენტები არიან. ყოველი დღისთვის: - count: რამდენი ვადაგასული - segments: სეგმენტის მიხედვით განაწილება - leads: კონკრეტული კლიენტების სია  @param companyID - კომპანიის ID @param year - წელი @param month - თვე (1-12) / |
| `groupByWeek()` | 🔒 private / 🔄 sync | `leads: WinBackLead[], weeks: number` | `any` | 📊 კვირების მიხედვით დაჯგუფება (Dashboard chart)  ბოლო N კვირის ვადაგასულების რაოდენობა და შემოსავალი. გამოიყენება Dashboard-ის trend chart-ისთვის.  @param leads - ლიდების მასივი @param weeks - რამდენი კვირა (default: 12) / |
| `getSegmentChart()` | 🔒 private / 🔄 sync | `leads: WinBackLead[]` | `any` | 🥧 სეგმენტის chart მონაცემები (Dashboard pie/bar chart)  ითვლის ყოველი სეგმენტის ლიდების რაოდენობას. / |
| `getPriorityChart()` | 🔒 private / 🔄 sync | `leads: WinBackLead[]` | `any` | 📊 პრიორიტეტის chart მონაცემები (Dashboard bar chart)  ითვლის ყოველი პრიორიტეტის ლიდების რაოდენობას. / |
| `checkPendingDeliveries()` | 🌐 public / ⚡ async | `companyID: string, limit = 30` | `Promise<void>` | 📨 Pending SMS-ების delivery status-ის შემოწმება GoSMS API-ით  გამოიძახება dashboard-ის ჩატვირთვისას ან SMS ისტორიის გახსნისას, რათა 'pending' სტატუსის SMS-ებს რეალური სტატუსი განახლეთ.  @param companyID - კომპანიის ID @param limit - მაქს. რამდენი SMS შემოწმდეს (default: 30) / |

### 🔹 `WinBackSchedulerService`
- **ფაილის გზა:** [`back/src/modules/win-back/win.back.scheduler.service.ts`](file:///C:/Users/Gio/Desktop/fitness-saas/back/src/modules/win-back/win.back.scheduler.service.ts)
- **ფუნქციების რაოდენობა:** 7

| ფუნქციის დასახელება | ტიპი | პარამეტრები (Input) | დაბრუნებული ტიპი | აღწერა და ლოგიკა |
| :--- | :--- | :--- | :--- | :--- |
| `onModuleInit()` | 🌐 public / ⚡ async | `არაფერი` | `any` | NestJS-ის lifecycle hook — აპლიკაციის გაშვებისას ავტომატურად გაეშვება. DB-დან წაიკითხავს ყველა უნიკალურ sendTime-ს და შექმნის CronJob-ებს. / |
| `registerDynamicCampaignCrons()` | 🔒 private / ⚡ async | `არაფერი` | `any` | მთავარი ფუნქცია — DB-დან წამოიღებს ყველა უნიკალურ sendTime-ს აქტიური კამპანიებიდან და თითოეულისთვის შექმნის დინამიურ CronJob-ს. / |
| `addCampaignCron()` | 🔒 private / 🔄 sync | `sendTime: string` | `any` | ქმნის CronJob-ს კონკრეტული sendTime-სთვის  @param sendTime - დრო "HH:mm" ფორმატში (მაგ: "14:30")  კრონის ლოგიკა: sendTime="14:30" → cronExpression="0 30 14 * * *" ეს ნიშნავს: ყოველდღე ზუსტად 14:30-ზე ერთხელ გაეშვება  განსხვავება aboniment.schedule.ts-სგან: აბონიმენტში retry სჭირდება (ტურნიკეტის API failure-ზე) Win-Back-ში ერთხელ გაშვება საკმარისია — SMS ლოგირდება და დუბლირების დაცვა lastExecutedAt-ით ხდება / |
| `ensureCronForSendTime()` | 🌐 public / 🔄 sync | `sendTime: string` | `any` | PUBLIC მეთოდი — გარედან იძახება (კამპანიის შექმნისას/განახლებისას)  უზრუნველყოფს რომ CronJob არსებობს მოცემული sendTime-სთვის. თუ ეს sendTime ახალია (მაგ: ახალი კამპანია "16:00"-ზე შეიქმნა), ავტომატურად შექმნის ახალ CronJob-ს. თუ ეს sendTime უკვე არსებობს — არაფერს აკეთებს (addCampaignCron შიგნით ამოწმებს).  @param sendTime - კამპანიის sendTime (მაგ: "16:00") / |
| `executeCampaignsForTime()` | 🔒 private / ⚡ async | `sendTime: string` | `any` | კონკრეტული sendTime-ის ყველა კამპანიის გაშვება  იძახება CronJob-ის callback-იდან. DB-დან მოძებნის ყველა აქტიურ კამპანიას ამ sendTime-ით, გაფილტრავს დღეს უკვე გაშვებულებს, და გაუშვებს executeCampaign()-ს.  @param sendTime - "HH:mm" (მაგ: "14:30") / |
| `executeCampaign()` | 🔒 private / ⚡ async | `campaign: any` | `any` | 🚀 ერთი კამპანიის სრული ციკლი  1. ლიდების წამოღება სეგმენტით/პრიორიტეტით 2. Cooldown ფილტრაცია — ბოლო N დღეში ვისზეც უკვე გაიგზავნა 3. SMS-ების გაგზავნა GoSMS API-ით 4. ყოველი SMS-ის ლოგირება sendType='automatic' ფლეგით 5. შედეგის შენახვა campaign-ის lastExecution ფილდებში  @param campaign - კამპანიის ობიექტი (name, smsText, segment, priority, etc.) / |
| `checkDeliveryStatuses()` | 🌐 public / ⚡ async | `არაფერი` | `any` | მონაცემთა ვალიდაცია და წესებთან თავსებადობის შემოწმება |

---

## 📦 მოდული: WORKOUT

### 🔹 `WorkoutService`
- **ფაილის გზა:** [`back/src/modules/workout/workout.service.ts`](file:///C:/Users/Gio/Desktop/fitness-saas/back/src/modules/workout/workout.service.ts)
- **ფუნქციების რაოდენობა:** 5

| ფუნქციის დასახელება | ტიპი | პარამეტრები (Input) | დაბრუნებული ტიპი | აღწერა და ლოგიკა |
| :--- | :--- | :--- | :--- | :--- |
| `getDayOfWeek()` | 🔒 private / 🔄 sync | `date: Date` | `string` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `getWorkout()` | 🌐 public / ⚡ async | `workoutID: string` | `Promise<Workout>` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `getCompanyWorkoutsList()` | 🌐 public / ⚡ async | `companyID: string` | `any` | ჩანაწერების სიის მიღება ან ფილტრაცია |
| `checkCompany()` | 🌐 public / ⚡ async | `companyID: string` | `any` | მონაცემთა ვალიდაცია და წესებთან თავსებადობის შემოწმება |
| `checkWorkout()` | 🌐 public / ⚡ async | `workoutID: string` | `any` | მონაცემთა ვალიდაცია და წესებთან თავსებადობის შემოწმება |

---

## 📦 მოდული: WORKOUT-SALES

### 🔹 `WorkoutSaleService`
- **ფაილის გზა:** [`back/src/modules/workout-sales/workout-sale.service.ts`](file:///C:/Users/Gio/Desktop/fitness-saas/back/src/modules/workout-sales/workout-sale.service.ts)
- **ფუნქციების რაოდენობა:** 1

| ფუნქციის დასახელება | ტიპი | პარამეტრები (Input) | დაბრუნებული ტიპი | აღწერა და ლოგიკა |
| :--- | :--- | :--- | :--- | :--- |
| `checkCompany()` | 🌐 public / ⚡ async | `companyID: string` | `any` | მონაცემთა ვალიდაცია და წესებთან თავსებადობის შემოწმება |

---

