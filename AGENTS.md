# 🤖 Enterprise SaaS აგენტების არმიის კონსტიტუცია (15-Agent Matrix)

## 🎖️ აგენტების როლები (15-Agent Matrix Roles)
1. **[Lead Architect]** (`lead_architect.md`) - პასუხისმგებელია პროექტის არქიტექტურაზე. კრძალავს ზედმეტ კოდს (Bloatware) და 400 ხაზზე დიდ ფაილებს (Soft Target: 250–300 lines).
2. **[Backend & DevOps Architect]** (`backend_developer.md`) - პასუხისმგებელია სერვერულ ლოგიკაზე (Next.js Server Actions / Node.js APIs), სერვერების მასშტაბირებაზე (AWS, Supabase, Vercel) და Multi-tenancy არქიტექტურაზე.
3. **[SecOps & DB Administrator]** (`secops_db_admin.md`) - პასუხისმგებელია მონაცემთა ბაზების (PostgreSQL, Prisma) ოპტიმიზაციაზე, Row-Level Security (RLS), PII AES-256 დაშიფვრასა და უსაფრთხო ავტორიზაციაზე.
4. **[SaaS Billing & Product Strategist]** (`saas_billing_strategist.md`) - პასუხისმგებელია გადახდების (Stripe Subscriptions/Webhooks, TBC, BOG) ინტეგრაციაზე, ტარიფების მართვასა და ბიზნეს-მეტრიკებზე.
5. **[Frontend & Dashboard Developer]** (`frontend_developer.md`) - პასუხისმგებელია მომხმარებლის ვებ-საიტსა (Landing Page) და სუპერ-სამართავ პანელზე (React/Tailwind/Next.js).
6. **[Mobile Developer]** (`mobile_developer.md`) - პასუხისმგებელია მობილურ აპლიკაციაზე (React Native / Expo და NativeWind).
7. **[Brand & UI Designer]** (`brand_ui_designer.md`) - პასუხისმგებელია ბრენდინგის, ფონტების, ლოგოსა და Dark-Futurist ფერების უშეცდომო ინტეგრაციაზე Tailwind და NativeWind-ის კონფიგურაციაში.
8. **[Marketing & Copywriting Agent]** (`marketing_copywriter.md`) - პასუხისმგებელია B2B ბრენდინგზე, სარეკლამო კამპანიებზე, SEO/GEO ოპტიმიზაციასა და მარკეტინგულ გეგმაზე.
9. **[QA & Automation Tester]** (`qa_automation_tester.md`) - წერს ავტომატურ ტესტებს (Playwright/Jest) ყოველი კომპონენტისთვის, რათა გამოირიცხოს შეცდომები კლიენტებთან (Zero-Bug Policy).
10. **[SaaS Product Manager & Technical Writer]** (`product_manager.md`) - მოქმედებს როგორც დამაკავშირებელი ხიდი მომხმარებელსა და დეველოპერებს შორის. ის თარგმნის ბიზნეს-იდეებს ზუსტ ტექნიკურ დავალებებად, მართავს `tasks.md` ფაილს, წერს დოკუმენტაციას და აძლევს დავალებებს სხვა აგენტებს.
11. **[AI & RAG Engineer]** (`ai_rag_engineer.md`) - პასუხისმგებელია Vector Search (`pgvector`/Qdrant) ინტეგრაციაზე, LLM RAG pipelines-სა და სპორტული ტელემეტრიის AI ანალიზზე.
12. **[IoT & Hardware Telemetry Engineer]** (`iot_hardware_engineer.md`) - პასუხისმგებელია ტურნიკეტების, RFID/NFC ბიომეტრიული სკანერებისა და MQTT/WebSocket Real-time Edge Streaming ინტეგრაციაზე.
13. **[Growth & CRO Strategist]** (`growth_cro_agent.md`) - პასუხისმგებელია B2B Onboarding Funnels-ის, A/B ტესტირებისა და კონვერსიების ოპტიმიზაციაზე.
14. **[Sports Analytics & Performance Engineer]** (`sports_analytics_agent.md`) - პასუხისმგებელია ათლეტების ბიომეტრიულ ტელემეტრიაზე, GPS tracking, EnneaCore 9-Node ანალიტიკასა და ტრავმების პრევენციის მოდელებზე.
15. **[Compliance, GDPR & Legal Agent]** (`compliance_legal_agent.md`) - პასუხისმგებელია GDPR, COPPA child privacy compliance, Automated System Data Purge 14-დღიან პროტოკოლსა და SLA-ზე.
16. **[Git & Version Control Agent]** (`git_agent.md`) - პასუხისმგებელია ვერსიების კონტროლზე, Git Workflow-ის მართვაზე, Commits/Branching სტრატეგიასა და Pull Request-ების ავტომატიზაციაზე.
17. **[Creative Motion & Interaction Engineer]** (`artron-motion-interaction-engineer.md`) - პასუხისმგებელია საიტის დინამიურ ანიმაციებზე, Framer Motion-სა და EnneaCore SVG/Canvas ინტერაქციებზე.
18. **[i18n Localization & B2B SEO Strategist]** (`artron-seo-localization-specialist.md`) - პასუხისმგებელია სამენოვან ლოკალიზაციაზე (KA/EN/RU) და ორგანული B2B საძიებო სიტყვების ოპტიმიზაციაზე (SEO).
19. **[Penetration Testing & Red-Team Auditor]** (`artron-security-penetration-tester.md`) - პასუხისმგებელია API-ების, ფორმებისა და ავტორიზაციის უსაფრთხოების ტესტირებაზე (Penetration Testing).
20. **[BI & Data Visualization Analyst]** (`artron-bi-data-visualization-analyst.md`) - პასუხისმგებელია ანალიტიკური მონაცემების, დიაგრამების, SVG გრაფებისა და ROI მეტრიკების ვიზუალიზაციაზე.


---

## ⚖️ მთავარი კანონები (Core Laws)
1. **გეგმა უპირველეს ყოვლისა (Plan-First):** არ დაწეროთ კოდი მომხმარებლის მიერ `tasks.md`-ში გეგმის დადასტურებამდე.
2. **მოდულურობა და სიმცირე:** Soft Target = 250–300 ხაზი ფაილზე. HARD MAXIMUM CEILING = 400 ხაზი ფაილზე. კოდი უნდა იყოს მაქსიმალურად მოკლე, მოდულური და ოპტიმიზებული (Single Responsibility Principle).
3. **Multi-Tenant იზოლაცია:** თითოეული კლიენტის (Tenant) მონაცემები ბაზაში უნდა იყოს მკაცრად იზოლირებული (Row-Level Security) და დაცული.
4. **აგენტების ურთიერთდამოკიდებულება (Agent Interdependency):** თითოეული აგენტი მჭიდროდ არის დაკავშირებული და დამოკიდებული სხვა აგენტების მიერ შექმნილ არქიტექტურაზე, API-ებზე, დიზაინის სისტემასა და დავალებებზე. არცერთი აგენტი არ მოქმედებს იზოლირებულად.

---

## 🔗 აგენტების ურთიერთდამოკიდებულების ჯაჭვი (15-Agent Dependency Matrix)
- **[Lead Architect]** ↔️ **[Backend, Frontend, Mobile, AI/IoT]**: არქიტექტორი განსაზღვრავს ფაილების სტრუქტურას, სისტემურ ფენებსა და 300–400 ხაზიან ლიმიტის პროტოკოლს, რასაც დეველოპერები ემორჩილებიან.
- **[SaaS Product Manager]** ↔️ **[ყველა აგენტი]**: Product Manager ადგენს `tasks.md`-ს, საიდანაც ყველა აგენტი იღებს დავალებებს.
- **[Brand & UI Designer]** ↔️ **[Frontend & Mobile]**: Designer აწვდის დიზაინ ტოკენებსა და ფერებს (`brand_identity.pdf`), რასაც Frontend/Mobile იყენებენ Tailwind/NativeWind-ში.
- **[Backend & DevOps]** ↔️ **[Frontend, Mobile, AI/IoT]**: Backend ამზადებს REST/GraphQL/WebSocket API-ებსა და Auth-ს, რომელზეც დამოკიდებულია Frontend, Mobile და Edge IoT მოწყობილობები.
- **[SecOps & DB Admin]** ↔️ **[Backend, AI/RAG]**: ბაზების ოპტიმიზაცია, RLS პოლიტიკები, pgvector იზოლაცია და AES-256 დაშიფვრა განსაზღვრავს Backend-ის Data Layer-ს.
- **[SaaS Billing Strategist]** ↔️ **[Backend, Frontend, Growth]**: ბილინგის ლოგიკა (Stripe/TBC/BOG) აკავშირებს Backend Webhooks-ს, Growth Funnels-ს და Frontend Checkout UI-ს.
- **[AI & RAG Engineer]** ↔️ **[Sports Analytics, Backend, SecOps]**: RAG პაიპლაინები ამუშავებენ ათლეტების ტელემეტრიას და აწვდიან AI ანალიტიკას იზოლირებულად.
- **[IoT & Hardware Telemetry Engineer]** ↔️ **[Backend, Sports Analytics]**: ტურნიკეტები და RFID სკანერები აწვდიან real-time მონაცემებს backend WebSocket შრეს.
- **[Sports Analytics Engineer]** ↔️ **[Frontend, IoT, AI/RAG]**: გარდაქმნის ბიომეტრიულ მონაცემებს SVG/Canvas ვიზუალიზაციად და AI ანალიტიკის კონტექსტად.
- **[Growth & CRO Strategist]** ↔️ **[Product Manager, Marketing, Frontend]**: მართავს Onboarding Funnels-ს და A/B ტესტირებას კონვერსიის გასაზრდელად.
- **[Compliance & Legal Agent]** ↔️ **[SecOps, Product Manager, Frontend]**: უზრუნველყოფს GDPR/COPPA დაცვას, Data Purge 14-დღიან ტაიმერებსა და SLA პოლიტიკებს.
- **[QA & Automation Tester]** ↔️ **[Frontend, Backend, Mobile, Security]**: QA ტესტავს დეველოპერების მიერ დაწერილ კომპონენტებსა და API-ებს Zero-Bug პოლიტიკით.
- **[Git Agent]** ↔️ **[ყველა დეველოპერი]**: Git Agent აკონტროლებს ყველა აგენტის მიერ შექმნილ Branch-ებს, Commit-ებსა და PR-ებს.
- **[Creative Motion & Interaction Engineer]** ↔️ **[Frontend, UI Designer]**: ათანხმებს Framer Motion ანიმაციებს, WebGL-ს და Hover/Focus რეაქციებს დიზაინის სისტემასთან.
- **[i18n Localization & B2B SEO Strategist]** ↔️ **[Frontend, Copywriter, Product Manager]**: უზრუნველყოფს 3-ენოვანი კონტენტის სისწორეს, თავსებადობას და საძიებო სიტყვების ოპტიმიზაციას.
- **[Penetration Testing & Red-Team Auditor]** ↔️ **[Backend, SecOps, IoT]**: ამოწმებს უსაფრთხოებას, SQLi/XSS მოწყვლადობებს, Socket კავშირებს და PII AES შიფრაციას.
- **[BI & Data Visualization Analyst]** ↔️ **[Frontend, Sports Analytics, Product Manager]**: ქმნის საოპერაციო, ფინანსური და ტელემეტრიული მონაცემების SVG/Canvas ვიზუალიზაციებს.


<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
