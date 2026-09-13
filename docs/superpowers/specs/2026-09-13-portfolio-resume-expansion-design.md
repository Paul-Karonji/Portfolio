# Design Specification: Portfolio & Resume Comprehensive Expansion

- **Author**: Paul Karonji Waithaka & Antigravity
- **Date**: 2026-09-13
- **Target Role**: High-Impact Full-Stack Software Engineer & Systems Architect
- **Status**: Approved by User

---

## 1. Executive Summary & Goals

The goal of this initiative is to expand Paul Karonji Waithaka's personal web portfolio and professional resume so they comprehensively reflect his full engineering repertoire. A forensic scan of the developer's workstation revealed significant production-grade systems—including a high-concurrency Go telematics platform (**FleetTrack**), network automation & M-Pesa billing engine for MikroTik RouterOS (**HotBill KE**), zero-knowledge Web Crypto password manager (**Padi**), an Oracle Cloud ARM Ampere LLM inference studio (**Apollo's Den**), and a flagship cloud **WIK Online POS (VPS Edition)** with KRA eTIMS fiscal compliance—which were previously missing or underrepresented.

This specification details:
1. The **Role-Perspective Switcher** and **Interactive System Inspector Workbench** on the web portfolio.
2. The **Categorized Multi-Tier Project Catalog** encompassing all 20+ verified software projects.
3. The **ATS-Optimized 2-Page Master Resume** (in DOCX and PDF formats) aligned with senior systems engineering expectations.

---

## 2. Web Portfolio Architecture (`paul_portfolio`)

### 2.1 Hero & Framing Redesign
* **Eyebrow**: `Nairobi, Kenya | Full-Stack Software Engineer & Systems Architect`
* **Headline**: `Paul Karonji Waithaka`
* **Lead Invariant**: *"Engineering high-concurrency backends, offline-first distributed systems, cryptographic security, and production-grade software ecosystems."*
* **Metrics & Proof Strip**:
  * **Languages**: Go (Golang), TypeScript/JavaScript, Python, PHP 8, Kotlin, SQL (PostgreSQL, MySQL, SQLite).
  * **Core Systems**: High-concurrency Go backends, IoT telematics, MikroTik network automation, Zero-Knowledge crypto, offline-first SQLite sync, and KRA eTIMS compliance.
  * **Proven Record**: 10+ delivered enterprise and SaaS production systems serving live businesses.

### 2.2 Role-Perspective Switcher
A persistent, keyboard-accessible filter bar situated at the top of the Projects section with three modes:
1. `⚙️ Systems & Distributed Backend` (Filters and prioritizes Go, IoT, MikroTik, WebSockets, Zero-Knowledge Crypto, and offline persistence).
2. `🚀 Full-Stack & Product Architecture` (Filters and prioritizes Next.js/NestJS monorepos, multi-tenant SaaS, school ERP, and payment rails).
3. `🌐 All Engineered Systems` (Displays all 20+ projects with domain badges).

### 2.3 Interactive System Inspector Workbench
An integrated, zero-dependency architectural console embedded in the project showcase. Clicking **"Inspect Architecture ⚡"** on any major system activates the workbench with 4 interactive inspection tabs:
1. **Topology & Concurrency**: Visual diagrams (structured visual layout) showing processes, goroutines/event loops, network boundaries, and daemons.
2. **Data Flow & Protocols**: Step-by-step transaction/telemetry pipelines (e.g., GPS packet → Go ingestion worker → WebSocket fan-out → PostgreSQL; or MikroTik API socket ↔ STK Push daemon).
3. **Security Invariants**: Cryptographic parameters (PBKDF2 SHA-256 100k iterations, AES-GCM-256, HMAC-SHA256 timing-safe verification, CPU/MAC hardware binding, Row-Level Security, KRA eTIMS OSCU/VSCU encryption).
4. **Stack & Performance Specs**: Runtime engines, latency benchmarks, database indexing, and offline-first cache strategies.

---

## 3. Verified Project Roster & Categorization

Every project on the portfolio is verified to exist on Paul's machine, eliminating unbuilt proposals (such as Aqualytica):

### Tier 1: Flagship Production Systems
1. **WIK Online Cloud POS (VPS Edition)** (`Wik/wik online pos vps`):
   * *Stack*: React 19 + Vite, NestJS v11, PostgreSQL, Cloudflare R2.
   * *Capabilities*: Multi-tenant cloud POS, KRA eTIMS Tax Compliance Engine (`EtimsWorker` background fiscalization supporting OSCU/VSCU protocols with AES-256 encrypted tax credentials), M-Pesa Daraja STK Push & C2B Paybill Callbacks with real-time WebSockets and cashier reconciliation queue (`C2BQueueModal`), Paystack SaaS recurring subscriptions with lifecycle walls (`ActiveSubscriptionGuard`, `SuspendedWall`), sub-50ms database aggregations, and specialized Retail, FEFO Pharmacy, and Hotel modes.
2. **FleetTrack Enterprise** (`Wik/freight`):
   * *Stack*: Go (Golang), PostgreSQL, WebSockets, React 19 + Vite + Tailwind, React Native 0.86 + Expo 57, SQLite.
   * *Capabilities*: High-concurrency Go backend for batch IoT telematics ingestion and real-time WebSocket fan-out, React 19 executive dashboard with Leaflet live maps, dispatch manifest studio, driver token management, and driver mobile app with offline-first SQLite telemetry buffer and 30-min stoppage detection.
3. **HotBill KE** (`Wik/billing`):
   * *Stack*: Node.js, Express, Next.js 14, Docker Compose, Nginx reverse proxy, MikroTik RouterOS API, M-Pesa Daraja.
   * *Capabilities*: Automated M-Pesa telecommunications billing daemon with MikroTik RouterOS socket integration for hotspot/ISP bandwidth provisioning, captive portal, and dark-mode Next.js 14 NOC console.
4. **Padi Password Manager** (`Wik/cross-browser-password-manager`):
   * *Stack*: JavaScript/TypeScript, Manifest V3, Web Crypto API (`crypto.subtle`), Supabase.
   * *Capabilities*: Zero-knowledge cross-browser password manager extension and Web Vault. Client-side PBKDF2 key derivation (SHA-256, 100,000 iterations), AES-GCM-256 vault encryption, and secure cloud sync.
5. **MtaaKeys** (`Wik/MtaaKeys/mtaakeys-platform`):
   * *Stack*: Next.js 16, Express 5, TypeScript, PostgreSQL, Prisma, Socket.IO, Paystack, Africa's Talking, Cloudinary, Resend.
   * *Capabilities*: Property marketplace and rental management platform with 5 user roles, dual Paystack subscription tiers (agents & land agents up to KES 15k/mo), pay-per-use listing boosts, logarithmic listing curation, real-time chat, admin audit logs with exact diffing, and automated security invariant CI tests.
6. **DueSync** (`Wik/TaskIQ`):
   * *Stack*: Next.js 15, TypeScript, PostgreSQL, Prisma, NextAuth v5, Upstash Redis, Vercel Cron, Resend, Google Calendar API v3, Radix UI.
   * *Capabilities*: Smart task management PWA and Android TWA with two-way Google Calendar OAuth2 sync, Pomodoro focus mode, timezone-aware push/email reminders, Upstash Redis rate limiting, CVE mitigations, and a native 13-tool MCP server for AI agent orchestration.
7. **WIK-POS Desktop Suite & Central License Server** (`Wik/pos family`):
   * *Stack*: Electron, React, TypeScript, better-sqlite3, Drizzle ORM, JWT, electron-builder.
   * *Capabilities*: Offline-first desktop POS, hardware-bound licensing (CPU + MAC fingerprinting), 30-day offline grace periods, customer loyalty CRM, WhatsApp receipts, WIK Pharmacy Edition (v1.3.33 with FEFO expiry tracking), WIK Hotel Edition (v1.3.26 with multi-terminal LAN F&B ordering), POS Central License Server, and Remote Dashboard.
8. **Brixton Makunga HMS** (`Wik/wik hms demo` & `Websites/kenya_Hospital_Management`):
   * *Stack*: Laravel 12 / Node.js, React 19, MySQL.
   * *Capabilities*: 200+ REST API endpoints, 56 database migrations, 35 Eloquent models, automated billing via Observer pattern, real-time queue management, and pharmacy FEFO batch inventory.

### Tier 2: Supporting Production & Client Systems
9. **WIK Scholar ERP** (`Wik/wik scholar/wik-scholar`): Comprehensive School ERP with multi-role portals (SuperAdmin, Bursar, Teacher, Parent OTP login), ledger-accurate fee invoicing, CBC rubric grading, and mid-year migration wizard.
10. **K-Track** (`ktrack.vercel.app`): Multi-tutor commission agency platform with task pooling, real-time per-task chat, Cloudflare R2 delivery, Paystack payments with USD→KES conversion, timing-safe HMAC guest checkouts, and idempotent database auto-patching.
11. **JHUB Africa Innovation Tracker** (`Career path/JHUB`): JKUAT innovation management platform serving innovators, mentors, investors, and admins across Kenya (PHP 8.1, MySQL, Docker, 4 roles, 6 lifecycle stages).
12. **Logit** (`Wik/logit`): Logistics operations platform for Juba Errands (NestJS 10, Next.js 14 Turborepo, AWS S3, waybill booking, parcel tracking).
13. **Biashara Hub** (`Wik/biashara hub`): Headless e-commerce on Medusa.js v2 + Next.js App Router monorepo with native M-Pesa rails.
14. **wiktrack** (`Wik/Wik track`): Android M-Pesa income tracker with custom native Kotlin SMS reader module, local SQLite storage, and background Supabase sync.
15. **Apollo's Den** (`Wik/Apollos Den`): Private AI studio & OpenAI-compatible endpoint running Qwen 3 VL 8.8B at Q8_0 precision with 256k context and 4-bit KV caching on Oracle Cloud ARM Ampere A1.
16. **Antigravity Multi-Asset Quant Engine v6** (`Documents/ai-gold-trader`): Quantitative algorithmic trading engine in Python with MetaTrader 5 (MT5) low-latency IPC, dual-tier agent architecture, 0–100 confluence scoring, and Telegram bot.
17. **Hiro AI Agent Mesh** (`Wik/Hiro`): Self-hosted AI agent with multi-model workflows, document ingestion, web search, memory persistence, voice I/O, and dynamic skills engine.
18. **WIK Technologies Official Portal** (`Wik/Main website`): Official corporate site with Hiro AI chatbot running on Netlify Functions.
19. **BikeLab Parts Manager Desktop** (`Documents/bikelab-parts-manager-desktop`): Desktop parts catalog and workshop inventory manager built with Electron + Vite.
20. **AsyncStream Concurrency Benchmark** (`Documents/moses task/async-stream-deadlock`): Concurrency debugging benchmarks resolving circular lock inversions in high-throughput async streaming pipelines.

### Tier 3: Applied Labs & Interactive Demos
21. **Neural Network Playground** (`Career path/New folder`): In-browser ML platform in React + TensorFlow.js with canvas neuron activations, layer builder, and MNIST training.
22. **CodeCraft AI** (`Career path/New folder (2)`): Code complexity and maintainability analysis platform with Monaco Editor and AST parsing.
23. **Unsent** (`Wik/my diary`): Privacy-first personal diary PWA with IndexedDB and Supabase RLS.
24. **Framel** (`Websites/Flamera` / `GitHub/framel`): Tested flower commerce API with 45 passing automated tests and M-Pesa integration.
25. **ARCH Kenya** (`Websites/arch`): Luxury-industrial architecture showcase website.

---

## 4. Master Resume Architecture (`Paul-Karonji-Waithaka-Resume`)

### 4.1 Specification
* **Format**: High-density 2-page ATS-compliant layout.
* **Outputs**: Both `.docx` (editable master) and `.pdf` (formatted export), accessible directly from the portfolio download buttons.
* **Tone**: Crisp, authoritative systems engineering voice emphasizing throughput, security invariants, concurrency models, protocol integrations, and business impact.

### 4.2 Sections
1. **Header**: Name, Title (Full-Stack Software Engineer · Systems Architect · Founder), Location, Phone, Email, Portfolio, LinkedIn, GitHub.
2. **Professional Summary**: Focus on 3+ years shipping distributed backends, offline-first systems, KRA eTIMS compliance, Go telematics, MikroTik automation, and zero-knowledge crypto.
3. **Technical Skills**: Structured into 7 categories: Languages, Backend & Systems, Frontend & Mobile, Databases & Storage, Security & Cryptography, Cloud & DevOps, Integrations & Protocols.
4. **Professional Experience**:
   * *Founder & Systems Architect | WIK Technologies* (Oct 2025 – Present) — Deep bullets for WIK Online Cloud POS, FleetTrack Go Telematics, HotBill KE, Padi Zero-Knowledge Vault, WIK-POS Desktop Suite, and DueSync.
   * *Technical Lead (Industrial Attachment) | JHUB Africa* (Sep 2025 – Dec 2025) — Bullets for JHUB Africa Innovation Tracker platform.
   * *Freelance Software Engineer & Systems Consultant | Independent* (2023 – Present) — Bullets for MtaaKeys, Brixton Makunga HMS, K-Track, and Biashara Hub.
5. **Education**: BSc Software Development at KCA University (Sep 2021 – Dec 2026 Expected).
6. **Certifications**: Cybersecurity Fundamentals (IBM SkillsBuild), Data Protection Basics (Atingi), Zoho Creator Developer Certification.

---

## 5. Implementation & Verification Plan

1. **Portfolio Updates (`index.html`, `css/styles.css`, `js/main.js`)**:
   * Update Hero text, stats, and proof strip.
   * Implement the Role-Perspective Switcher filter buttons.
   * Build the interactive System Inspector Workbench component with tabbed views (Topology, Data Flow, Security Invariants, Stack & Metrics) and pre-loaded architecture specs for top flagships.
   * Populate the expanded project catalog with all Tier 1, Tier 2, and Tier 3 projects.
   * Update Skills and Experience sections to match the new systems depth.
2. **Resume Generation**:
   * Write and format the complete updated text in `Paul-Karonji-Waithaka-Resume.docx`.
   * Compile/render to `Paul-Karonji-Waithaka-Resume.pdf`.
3. **Verification**:
   * Verify all navigation links, perspective filters, and System Inspector tabs function without console errors.
   * Verify responsiveness on desktop, tablet, and mobile viewport sizes.
   * Verify resume downloads and links work cleanly.
