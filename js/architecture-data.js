/**
 * Architectural Blueprint Specifications for System Inspector Workbench
 * Paul Karonji Waithaka - Full-Stack Software Engineer & Systems Architect
 */

window.ARCHITECTURE_SPECS = {
  'wik-online-pos': {
    id: 'wik-online-pos',
    title: 'WIK Online Cloud POS (VPS Edition)',
    badge: 'Cloud POS & Fiscal ERP',
    category: 'Enterprise Platform',
    stack: 'NestJS v11 · React 19 · PostgreSQL · KRA eTIMS · M-Pesa Daraja · Paystack · Cloudflare R2',
    topology: `+-------------------------------------------------------------------------------+
|                                CLIENT APPLICATION                             |
|              React 19 + Vite (Offline-Resilient POS UI / SuspendedWall)       |
+---------------------------------------+---------------------------------------+
                                        | HTTPS / WebSockets
                                        v
+-------------------------------------------------------------------------------+
|                       WIK POS BACKEND (NestJS v11 REST API)                   |
|                                                                               |
|  +--------------------+  +----------------------+  +-----------------------+  |
|  | ActiveSubscription |  |  M-Pesa STK & C2B    |  |  KRA eTIMS Fiscal     |  |
|  | Guard & Billing    |  |  Reconciliation Queue|  |  Worker (EtimsWorker) |  |
|  +--------------------+  +----------------------+  +-----------------------+  |
+-------------------+-------------------+-------------------+-------------------+
                    |                   |                   |
                    v                   v                   v
+-----------------------+   +-----------------------+   +-----------------------+
|  PostgreSQL Database  |   | Paystack SaaS Billing |   | Cloudflare R2 Storage |
|  Sub-50ms Analytics   |   | Recurring Subs & Card |   | Prescriptions & Docs  |
+-----------------------+   +-----------------------+   +-----------------------+`,
    dataFlow: [
      'Cashier initiates sale at till interface; selecting M-Pesa triggers a Daraja STK Push prompt directly to customer handset.',
      'Daraja webhook arrives at /api/v1/payments/mpesa/c2b-callback; payload signature is validated and confirmation is broadcast via WebSockets.',
      'EtimsWorker background daemon constructs OSCU/VSCU fiscal payload, signs with AES-256 tax credentials, submits to KRA eTIMS, and generates QR code.',
      'PostgreSQL commits sale transaction with sub-50ms indexed aggregation and automatically decrements inventory using FEFO batch rules.'
    ],
    security: [
      'KRA eTIMS AES-256 tax key storage at rest with strict background worker segregation',
      'ActiveSubscriptionGuard & SuspendedWall: graceful tenant lifecycle without sudden lockouts',
      'Paystack webhook HMAC-SHA256 signature verification computed over raw bytes',
      'Controlled substance Class A/B/C digital pharmacist verification chain and audit trail'
    ],
    specs: {
      'Runtime': 'Node.js 20 LTS / NestJS v11',
      'Query Latency': '<50ms aggregate reports on 100k+ records',
      'Fiscal Standard': 'KRA eTIMS OSCU/VSCU Automated Compliance',
      'Payments': 'M-Pesa Daraja (STK + C2B) & Paystack SaaS Subscriptions',
      'Storage': 'Cloudflare R2 Encrypted Document Vault'
    }
  },

  'fleettrack': {
    id: 'fleettrack',
    title: 'FleetTrack Enterprise Telematics',
    badge: 'IoT Telematics & Dispatch',
    category: 'Distributed Systems & IoT',
    stack: 'Go (Golang) · PostgreSQL · WebSockets · React 19 · React Native (Expo 57) · SQLite',
    topology: `+-----------------------------------+     +-----------------------------------+
|      Web Management Console       |     |        Driver Mobile App          |
|    (React 19 + Vite + Leaflet)    |     |   (React Native 0.86 + Expo 57)   |
|   - Live Operations Map & Triage  |     |   - Offline SQLite Telemetry Buffer|
+-----------------+-----------------+     +-----------------+-----------------+
                  | WebSockets                              | Batch TCP / HTTPS
                  +--------------------+--------------------+
                                       |
                                       v
+-------------------------------------------------------------------------------+
|                        HIGH-CONCURRENCY GO BACKEND                            |
|                                                                               |
|  +--------------------+  +----------------------+  +-----------------------+  |
|  | Batch Telemetry    |  | In-Memory Geofence   |  | Real-Time WebSocket   |  |
|  | Ingestion Pipeline |  | & Stoppage Evaluator |  | Fan-Out Event Bus     |  |
|  +--------------------+  +----------------------+  +-----------------------+  |
+--------------------------------------+----------------------------------------+
                                       |
                                       v
+-------------------------------------------------------------------------------+
|                     PostgreSQL Database & Relational Persistence              |
|                     Driver Shifts · Manifest Life Cycle · Audit Trails        |
+-------------------------------------------------------------------------------+`,
    dataFlow: [
      'Vehicles stream batch GPS coordinates, speed, and battery metrics into the Go ingestion endpoints.',
      'Go goroutines process telemetry packets through worker pools, running 30-minute stoppage and geofence evaluations.',
      'WebSocket fan-out bus delivers real-time vehicle movement to Leaflet dispatch map consoles and driver HUDs.',
      'Driver mobile app detects network dead zones, buffers events in local SQLite, and flushes automatically on reconnect.'
    ],
    security: [
      'Ephemeral driver token management and cryptographic QR dispatch claims',
      'Partitioned fleet isolation via PostgreSQL Row-Level Security policies',
      'Rate-limited batch telemetry ingress preventing denial-of-service',
      'Immutable pre-trip and post-trip safety inspection audit records'
    ],
    specs: {
      'Backend Runtime': 'Go 1.22 (Concurrent goroutines + sync.Pool)',
      'Ingestion Throughput': 'Sub-10ms batch telemetry processing',
      'Mobile Engine': 'React Native 0.86 / Expo 57 with native battery optimization',
      'Persistence': 'PostgreSQL + Mobile Client-Side SQLite Buffer'
    }
  },

  'hotbill': {
    id: 'hotbill',
    title: 'HotBill KE Telecommunications Billing',
    badge: 'ISP Billing & Network Automation',
    category: 'Network & Telecom',
    stack: 'MikroTik RouterOS API · Node.js · Express · Next.js 14 · Docker Compose · Nginx · M-Pesa',
    topology: `+-------------------------------------------------------------------------------+
|                       MikroTik RouterOS Network Core                          |
|             Hotspot Gateway · Bandwidth Queue Trees · User Active Sessions    |
+---------------------------------------+---------------------------------------+
                                        | Raw Socket API (:8728)
                                        v
+-------------------------------------------------------------------------------+
|                     HotBill KE Containerized Engine (Docker)                  |
|                                                                               |
|  +---------------------------+  +-------------------------------------------+ |
|  | Edge Nginx Reverse Proxy  |  | HotBill Express API (:4000)               | |
|  | Rate-Limiting & SSL Term  |  | - M-Pesa STK Push Billing Engine          | |
|  +-------------+-------------+  | - MikroTik API Socket Command Worker      | |
|                |                +---------------------+---------------------+ |
+----------------+--------------------------------------+-----------------------+
                 |                                      |
                 v                                      v
+---------------------------------+    +----------------------------------------+
|  Captive Portal User Handset    |    |  HotBill Admin NOC Console (:3000)     |
|  Package Selection & Phone No   |    |  Next.js 14 Real-Time Bandwidth Graphs |
+---------------------------------+    +----------------------------------------+`,
    dataFlow: [
      'Guest connects to ISP hotspot; captive portal captures phone number and selected internet package.',
      'HotBill Express API triggers M-Pesa Daraja STK Push to client mobile device.',
      'Upon callback confirmation, backend sends automated commands across the MikroTik RouterOS API socket.',
      'MikroTik creates user credentials, applies bandwidth rate-limits, and binds session to user MAC address.'
    ],
    security: [
      'Direct MikroTik RouterOS socket authentication over private LAN boundary',
      'Nginx edge proxy rate-limiting on public payment callbacks and captive endpoints',
      'Idempotent STK Push transaction matching preventing double-billing',
      'Docker Compose service isolation between ingress proxy, API, and NOC frontend'
    ],
    specs: {
      'Network Protocol': 'MikroTik RouterOS API socket protocol (:8728)',
      'Orchestration': 'Docker Compose multi-service container mesh',
      'Billing Engine': 'M-Pesa Daraja STK Push with instant automated activation',
      'NOC Dashboard': 'Next.js 14 dark-mode network operations center'
    }
  },

  'padi': {
    id: 'padi',
    title: 'Padi Zero-Knowledge Password Manager',
    badge: 'Zero-Knowledge Cryptography',
    category: 'Security & Crypto',
    stack: 'Web Crypto API · Manifest V3 · TypeScript · PBKDF2 · AES-GCM-256 · Supabase',
    topology: `+-------------------------------------------------------------------------------+
|                    CLIENT BROWSER (Zero-Knowledge Boundary)                   |
|                                                                               |
|   Master Password (Input Only)                                                |
|              |                                                                |
|              v                                                                |
|   +--------------------------+                                                |
|   | PBKDF2-HMAC-SHA256       |  --> 100,000 Iterations + User Unique Salt     |
|   | Key Derivation Function  |                                                |
|   +------------+-------------+                                                |
|                |                                                              |
|                v Derived 256-bit Key                                          |
|   +--------------------------+                                                |
|   | AES-GCM-256 Authenticated|  <-- Plaintext Vault Data (Passwords, Notes)   |
|   | Encryption / Decryption  |                                                |
|   +------------+-------------+                                                |
|                |                                                              |
|                v Encrypted Ciphertext + 96-bit IV (Plaintext Destroyed)       |
+----------------+--------------------------------------------------------------+
                 | HTTPS / Cloud Sync
                 v
+-------------------------------------------------------------------------------+
|                       Supabase Cloud Storage Engine                           |
|                       Encrypted Vault Blob Sync (Server Knows Zero Secrets)   |
+-------------------------------------------------------------------------------+`,
    dataFlow: [
      'Master password is entered by user and retained solely in ephemeral browser memory.',
      'Web Crypto API derives a cryptographic AES key using PBKDF2-HMAC-SHA256 across 100,000 rounds.',
      'Vault items are encrypted using AES-GCM-256 with unique 96-bit initialization vectors.',
      'Only the ciphertext, salt, and authentication tags are synced to the Supabase database.'
    ],
    security: [
      'Strict Zero-Knowledge guarantee: master password and decrypted data never leave device',
      'Hardware-accelerated crypto using browser native crypto.subtle implementation',
      'Manifest V3 background worker auto-locks vault after idle timeout to prevent memory snooping',
      'AES-GCM authentication tags guarantee integrity and prevent ciphertext tampering'
    ],
    specs: {
      'Key Derivation': 'PBKDF2-HMAC-SHA256 (100,000 iterations)',
      'Encryption': 'AES-256-GCM authenticated encryption',
      'Extension API': 'Chrome Manifest V3 Cross-Browser Extension + Web Vault',
      'Storage Sync': 'Supabase PostgreSQL cloud synchronization'
    }
  },

  'mtaakeys': {
    id: 'mtaakeys',
    title: 'MtaaKeys Property Marketplace',
    badge: 'Rental Marketplace Monorepo',
    category: 'Full-Stack SaaS',
    stack: 'Next.js 16 · Express 5 · PostgreSQL · Prisma · Socket.IO · Paystack · Cloudinary · Resend',
    topology: `+-------------------------------------------------------------------------------+
|                          MtaaKeys Web Client & Portals                        |
|       Next.js 16 App Router (Seekers) · Vite Admin / Agent Workspace          |
+---------------------------------------+---------------------------------------+
                                        | HTTPS / Socket.IO
                                        v
+-------------------------------------------------------------------------------+
|                       MTAAKEYS EXPRESS 5 API MONOREPO                         |
|                                                                               |
|  +--------------------+  +----------------------+  +-----------------------+  |
|  | Dual Paystack Sub  |  | Algorithmic Listing  |  | Real-Time Socket.IO   |  |
|  | Tier Quotas        |  | Curation Engine      |  | Tenant Messaging Bus  |  |
|  +--------------------+  +----------------------+  +-----------------------+  |
+---------------------------------------+---------------------------------------+
                                        |
                 +----------------------+----------------------+
                 |                      |                      |
                 v                      v                      v
+--------------------------------+  +--------------------+  +-------------------+
|  PostgreSQL Database (Prisma)  |  |  Cloudflare R2     |  | Africa's Talking  |
|  Full Audit Log Payload Diffs  |  |  Image Optimization|  | SMS Notifications |
+--------------------------------+  +--------------------+  +-------------------+`,
    dataFlow: [
      'Real estate agents purchase subscription tiers or per-listing boosts via Paystack webhooks.',
      'Automated curation algorithm scores listings via logarithmic view metrics, recency decay, and regional caps.',
      'Prospective tenants message agents directly through authenticated Socket.IO chat rooms.',
      'Admin changes generate full JSON payload diffs stored in an append-only audit trail.'
    ],
    security: [
      'Paystack webhook signature verification verified against raw request bytes',
      'Row-Level Security across 5 distinct user roles (Seeker, Agent, Landlord, Land Agent, Admin)',
      'Helmet security headers, strict CORS origin whitelisting, and auth rate limiting',
      'Automated security invariant test suite executing on every GitHub Actions CI build'
    ],
    specs: {
      'Frontend': 'Next.js 16 / React 19 App Router',
      'Backend': 'Express 5 / TypeScript monorepo with Prisma ORM',
      'Subscriptions': 'Dual tier model (Agent listings + Land Agent plans up to KES 15,000/mo)',
      'Auditing': 'Exact JSON diffing (oldData vs newData) on all admin actions'
    }
  },

  'duesync': {
    id: 'duesync',
    title: 'DueSync Smart Task Management & MCP',
    badge: 'Productivity SaaS & AI Agent MCP',
    category: 'Full-Stack SaaS & AI',
    stack: 'Next.js 15 · PostgreSQL · Prisma · Google Calendar v3 · Upstash Redis · Model Context Protocol',
    topology: `+-----------------------------------+     +-----------------------------------+
|     Next.js 15 PWA / Android TWA  |     |     AI Agents & Assistants        |
|    Pomodoro Mode & Offline State  |     |   (Claude / Gemini / Custom Agents)|
+-----------------+-----------------+     +-----------------+-----------------+
                  | HTTPS                                   | Stdio / Streamable HTTP
                  |                                         v
                  |                       +-----------------------------------+
                  |                       |   Native 13-Tool MCP Server       |
                  |                       |   Schedule Optimizer & Planner    |
                  |                       +-----------------+-----------------+
                  v                                         |
+-----------------------------------------------------------+-------------------+
|                            DUESYNC NEXT.JS 15 BACKEND                         |
|                                                                               |
|  +--------------------+  +----------------------+  +-----------------------+  |
|  | Upstash Redis      |  | Google Calendar API  |  | Vercel Cron           |  |
|  | Rate Limiting      |  | Two-Way Sync Engine  |  | Background Digest     |  |
|  +--------------------+  +----------------------+  +-----------------------+  |
+---------------------------------------+---------------------------------------+
                                        |
                                        v
+-------------------------------------------------------------------------------+
|                       PostgreSQL Database (Prisma ORM)                        |
|                       Row-Level Security & Recurring Task Recurrence Rules    |
+-------------------------------------------------------------------------------+`,
    dataFlow: [
      'User schedules task or Pomodoro focus session; background worker syncs changes to Google Calendar v3 via OAuth 2.0.',
      'AI agents connect to DueSync native MCP server to query free focus blocks and arrange prioritized tasks.',
      'Vercel Cron monitors upcoming deadlines and dispatches VAPID push and Resend email digests.',
      'Upstash Redis rate-limits incoming sync and auth requests to protect database capacity.'
    ],
    security: [
      'OAuth 2.0 proactive token refresh with secure token encryption at rest',
      'Granular Row-Level Security on all user task collections',
      'Patched RSC security invariants (CVE-2025-55182 and CVE-2025-66478)',
      'Upstash Redis token-bucket rate limiters guarding calendar and auth endpoints'
    ],
    specs: {
      'Framework': 'Next.js 15 App Router / React 18',
      'AI Integration': 'Native 13-tool Model Context Protocol (MCP) server',
      'Calendar Sync': 'Two-way Google Calendar API v3 bidirectional mirror',
      'Mobile Engine': 'Trusted Web Activity (TWA) native Android distribution'
    }
  },

  'wik-pos-desktop': {
    id: 'wik-pos-desktop',
    title: 'WIK-POS Desktop Suite & Licensing Authority',
    badge: 'Offline-First POS & Licensing',
    category: 'Desktop & Licensing',
    stack: 'Electron · React 19 · better-sqlite3 · Drizzle ORM · JWT Licensing · WhatsApp API',
    topology: `+-------------------------------------------------------------------------------+
|                       WIK-POS DESKTOP RUNTIME (Electron)                      |
|                                                                               |
|  +-----------------------------+     +-------------------------------------+  |
|  | React 19 Touch POS Interface|     | Local SQLite Database (WAL Mode)    |  |
|  | Pharmacy FEFO / Hotel LAN   |     | Instant Offline Read/Writes         |  |
|  +--------------+--------------+     +------------------+------------------+  |
|                 |                                       |                     |
|                 +-------------------+-------------------+                     |
|                                     |                                         |
|                                     v                                         |
|                 +---------------------------------------+                     |
|                 | Hardware-Bound Fingerprint Evaluator  |                     |
|                 | (CPU Serial Number + MAC Hash)        |                     |
|                 +-------------------+-------------------+                     |
+-------------------------------------+-----------------------------------------+
                                      | Periodic HTTPS License Ping
                                      v
+-------------------------------------------------------------------------------+
|                   POS CENTRAL LICENSE SERVER (JWT Authority)                  |
|                   3-Tier Model · Hardware Binding · Remote Kill-Switch        |
+-------------------------------------------------------------------------------+`,
    dataFlow: [
      'Desktop application interrogates host machine hardware (CPU serial & MAC address) on launch.',
      'App validates active license key against hardware hash using cryptographic JWT verification.',
      'Store operates completely offline; all inventory, cash register, and customer loyalty transactions write to local SQLite.',
      'When online, background worker checks for remote license renewals and sends WhatsApp e-receipts.'
    ],
    security: [
      'Hardware-bound cryptographic licensing: prevents copying database/app to unauthorized hardware',
      '30-day offline grace period clock with anti-clock-tampering protection',
      'Centralized remote kill-switch and instant license revocation capability',
      'SQLite write-ahead logging (WAL) preventing database corruption during power loss'
    ],
    specs: {
      'Desktop Stack': 'Electron + electron-vite + React 19',
      'Database': 'better-sqlite3 in WAL mode',
      'Editions': 'Pharmacy v1.3.33 (FEFO batching) & Hotel v1.3.26 (LAN F&B table ordering)',
      'Licensing Authority': 'Dedicated central hardware-binding license server'
    }
  },

  'brixton-hms': {
    id: 'brixton-hms',
    title: 'Brixton Makunga Hospital Management System',
    badge: 'Enterprise Healthcare ERP',
    category: 'Enterprise Platform',
    stack: 'Laravel 12 · React 19 · MySQL 8 · Observer Pattern · REST APIs · FEFO Pharmacy',
    topology: `+-------------------------------------------------------------------------------+
|                       HOSPITAL STAFF TOUCHPOINTS (React 19)                   |
|       Triage Reception · Doctor Consultation · Pharmacy Dispensary · Lab Desk |
+---------------------------------------+---------------------------------------+
                                        | RESTful API (200+ Endpoints)
                                        v
+-------------------------------------------------------------------------------+
|                       LARAVEL 12 CLINICAL CORE ENGINE                         |
|                                                                               |
|  +--------------------+  +----------------------+  +-----------------------+  |
|  | Real-Time Patient  |  | Automated Billing    |  | Pharmacy FEFO Batch   |  |
|  | Queue Controller   |  | Observer Pattern     |  | Expiry Manager        |  |
|  +--------------------+  +----------------------+  +-----------------------+  |
+---------------------------------------+---------------------------------------+
                                        |
                                        v
+-------------------------------------------------------------------------------+
|                        MySQL 8 Relational Database                            |
|                        56 Migrations · 35 Eloquent Models · Audit Logging     |
+-------------------------------------------------------------------------------+`,
    dataFlow: [
      'Patient registers at reception; system pushes ticket into active triage and doctor consultation queue.',
      'Doctor records diagnosis and orders medication; automated Observer triggers pharmacy dispensation request.',
      'Consolidated billing engine automatically appends charges to patient invoice ledger without manual cashier entry.',
      'Pharmacy module allocates medication bottles according to FEFO (First Expired, First Out) rules.'
    ],
    security: [
      'Role-Based Access Control isolating clinical records between Doctors, Nurses, and Cashiers',
      'Transactional integrity ensuring billing records and inventory decrements never desync',
      'Strict audit logs tracking all drug interaction alerts and prescription edits'
    ],
    specs: {
      'Architecture': '56 migrations, 35 Eloquent models, 200+ API endpoints',
      'Framework': 'Laravel 12 RESTful API + React 19 frontend',
      'Database': 'MySQL 8 with transactional row locks',
      'Compliance': 'FEFO pharmacy batch tracking and automated billing reconciliation'
    }
  },

  // === TIER 2: PRODUCTION PLATFORMS & SYSTEMS ===
'wik-scholar': {
    id: 'wik-scholar',
    title: 'WIK Scholar School Management ERP',
    badge: 'EdTech ERP & Rubrics',
    category: 'Multi-Role Enterprise ERP',
    stack: 'React 18 · Node.js · TypeScript · PostgreSQL · Prisma · Paystack',
    topology: `+-------------------------------------------------------------------------------+
|                       MULTI-ROLE USER PORTALS (REACT 18)                      |
|      SuperAdmin  |  School Admin  |  Bursar  |  Teacher  |  Parent OTP        |
+---------------------------------------+---------------------------------------+
                                        | HTTPS / REST
                                        v
+-------------------------------------------------------------------------------+
|                          WIK SCHOLAR BACKEND ENGINE                           |
|                                                                               |
|  +--------------------+  +----------------------+  +-----------------------+  |
|  | Multi-Tenant RBAC  |  | Double-Entry Fee     |  | CBC Rubric Grading    |  |
|  | & School Isolation |  | Ledger Engine        |  | & Report Card Parser  |  |
|  +--------------------+  +----------------------+  +-----------------------+  |
+-------------------+-------------------+-------------------+-------------------+
                    |                   |                   |
                    v                   v                   v
+-----------------------+   +-----------------------+   +-----------------------+
|  PostgreSQL + Prisma  |   | Paystack Fee Ingress  |   | Bulk CSV Migration    |
|  Strict Tenant FKs    |   | M-Pesa / Card Rails   |   | Mid-Year Class Ingest |
+-----------------------+   +-----------------------+   +-----------------------+`,
    dataFlow: [
      'Bursar posts student fee term charges; double-entry ledger journals debit and credit entries atomically.',
      'Parent logs in via phone number OTP, queries current fee balance, and initiates Paystack / M-Pesa payment.',
      'Paystack webhook validates settlement; payment reconciles student ledger account and issues digital receipt.',
      'Teacher enters CBC formative rubric scores; background worker aggregates strands into dynamic term PDF report cards.'
    ],
    security: [
      'Strict multi-tenant organization boundary validation on every Prisma query',
      'Immutable ledger journal entries: fee corrections require auditable reversing transactions',
      'HMAC-SHA256 authenticated Paystack webhook endpoint with replay protection',
      'Parent phone number verification via timed, rate-limited SMS OTP challenges'
    ],
    specs: {
      'Roles Supported': 'SuperAdmin, School Admin, Bursar, Teacher, Parent',
      'Curriculum': 'Kenyan CBC Rubrics & Traditional 8-4-4 Assessment',
      'Database': 'PostgreSQL with Prisma ORM and strict tenant isolation',
      'Migration Throughput': 'Bulk ingest of 2,000+ student records in <3 seconds',
      'Payment Rails': 'Paystack M-Pesa STK & Card Gateway Integration'
    }
  },

  'ktrack': {
    id: 'ktrack',
    title: 'K-Track Tutor Agency SaaS',
    badge: 'Commission SaaS & Escrow',
    category: 'Featured Agency Platform',
    stack: 'React 19 · Express 5 · TiDB Serverless · Socket.IO · Cloudflare R2 · Paystack',
    topology: `+-------------------------------------------------------------------------------+
|                       REACT 19 AGENCY & CLIENT WORKBENCH                      |
|             Task Board  |  Direct Negotiation Chat  |  Deliverable Vault      |
+---------------------------------------+---------------------------------------+
                                        | HTTPS / WSS
                                        v
+-------------------------------------------------------------------------------+
|                        EXPRESS 5 TASK ESCROW BACKEND                          |
|                                                                               |
|  +--------------------+  +----------------------+  +-----------------------+  |
|  | Task Pool & Escrow |  | Per-Task Socket.IO   |  | Guest Checkout URL    |  |
|  | Lifecycle Guards   |  | Room Coordinator     |  | HMAC Signer & Verifier|  |
|  +--------------------+  +----------------------+  +-----------------------+  |
+-------------------+-------------------+-------------------+-------------------+
                    |                   |                   |
                    v                   v                   v
+-----------------------+   +-----------------------+   +-----------------------+
|    TiDB Serverless    |   | Paystack FX Payments  |   | Cloudflare R2 Storage |
|  Distributed MySQL    |   | USD -> KES Conversion |   | Secure File Delivery  |
+-----------------------+   +-----------------------+   +-----------------------+`,
    dataFlow: [
      'Agency manager publishes job requirement; task enters pooled bidding queue for verified tutors.',
      'Client deposits funds; system computes platform commission and locks balance into escrow ledger.',
      'Tutor and client communicate inside private Socket.IO room with encrypted file upload to Cloudflare R2.',
      'Guest clients access task status via signed HMAC-SHA256 URLs without requiring permanent password creation.'
    ],
    security: [
      'Timing-safe crypto.timingSafeEqual verification for HMAC-SHA256 guest checkout tokens',
      'Payload tamper protection on Paystack webhook handling with exact raw-body hashing',
      'Socket.IO room authentication enforcing strict membership checks before message broadcast',
      'Presigned, expiring Cloudflare R2 URLs preventing unauthorized deliverable distribution'
    ],
    specs: {
      'Runtime': 'Express 5 on Node.js 20 LTS',
      'Database': 'TiDB Serverless (Distributed MySQL compatible)',
      'Storage': 'Cloudflare R2 Object Storage with presigned download links',
      'Real-Time': 'Socket.IO with localized room namespaces',
      'Currency Engine': 'Automated USD to KES FX calculation with Paystack integration'
    }
  },

  'jhub-tracker': {
    id: 'jhub-tracker',
    title: 'JHUB Africa Innovation Tracker',
    badge: 'Incubator & Lifecycle ERP',
    category: 'Enterprise Production System',
    stack: 'PHP 8.1 · MySQL · Docker · JavaScript · PHPMailer',
    topology: `+-------------------------------------------------------------------------------+
|                             JHUB WEB PORTAL (JS + CSS)                        |
|       Innovator Submissions  |  Mentor Reviews  |  Investor Portfolios        |
+---------------------------------------+---------------------------------------+
                                        | HTTPS
                                        v
+-------------------------------------------------------------------------------+
|                          PHP 8.1 MODULAR APPLICATION                          |
|                                                                               |
|  +--------------------+  +----------------------+  +-----------------------+  |
|  | 4-Tier RBAC Engine |  | 6-Stage Project      |  | Automated Mentor      |  |
|  | & Session Manager  |  | Lifecycle Governor   |  | Assignment Matrix     |  |
|  +--------------------+  +----------------------+  +-----------------------+  |
+-------------------+-------------------+-------------------+-------------------+
                    |                   |                   |
                    v                   v                   v
+-----------------------+   +-----------------------+   +-----------------------+
|     MySQL Database    |   | Document Repository   |   | Container Environment |
|  Audit Trail Logs     |   | Pitch Decks & IP Docs |   | Docker Compose Stack  |
+-----------------------+   +-----------------------+   +-----------------------+`,
    dataFlow: [
      'Innovator registers, completes 6-stage project milestone submission, and uploads pitch documentation.',
      'Automated routing engine maps project domain (Agritech, Fintech, Health) to specialized faculty mentors.',
      'Mentors score progress against standard innovation matrices and advance projects across lifecycle stages.',
      'Investors query curated, advanced-stage startups through restricted read-only portfolio views.'
    ],
    security: [
      'Role-based access control (RBAC) isolating Innovator, Mentor, Hub Admin, and Investor roles',
      'Parameterized PDO prepared statements across 100% of SQL queries preventing injection',
      'Strict MIME-type validation and file renaming on submitted intellectual property documents',
      'Immutable audit log tracking all milestone stage advancements and reviewer scores'
    ],
    specs: {
      'Runtime': 'PHP 8.1 on Apache with Docker Compose',
      'Standards': 'PSR-12 coding standard with automated linting',
      'Database': 'MySQL 8 with indexed lifecycle audit tables',
      'Project Lifecycle': '6 structured milestone gates from Ideation to Commercialization',
      'Deployment': 'Containerized Linux server serving live nationwide innovators'
    }
  },

  'logit': {
    id: 'logit',
    title: 'Logit Logistics Operations Platform',
    badge: 'Logistics Operations & Tracking',
    category: 'Commercial Dispatch Platform',
    stack: 'NestJS 10 · Next.js 14 · Turborepo · AWS S3 · Resend · ExcelJS',
    topology: `+-------------------------------------------------------------------------------+
|                      LOGIT MONOREPO (TURBOREPO ARCHITECTURE)                  |
|          Public Tracking Portal       |      Staff Ops & Warehouse PWA        |
+---------------------------------------+---------------------------------------+
                                        | HTTPS / REST
                                        v
+-------------------------------------------------------------------------------+
|                         NESTJS 10 LOGISTICS CORE API                          |
|                                                                               |
|  +--------------------+  +----------------------+  +-----------------------+  |
|  | Waybill Generator  |  | Checkpoint Pipeline  |  | Legacy Excel Manifest |  |
|  | & Barcode Dispatch |  | & Parcel State Machine| | Bulk Import Engine   |  |
|  +--------------------+  +----------------------+  +-----------------------+  |
+-------------------+-------------------+-------------------+-------------------+
                    |                   |                   |
                    v                   v                   v
+-----------------------+   +-----------------------+   +-----------------------+
|  PostgreSQL Database  |   | AWS S3 Object Storage |   | Resend Notification   |
|  State History Logs   |   | Waybill PDFs & Scans  |   | Customer SMS & Email  |
+-----------------------+   +-----------------------+   +-----------------------+`,
    dataFlow: [
      'Office dispatcher books parcel manifest; system issues unique waybill number with barcode rendering.',
      'Warehouse staff scan parcel at transporter checkpoints (Origin, Transit, Customs, Destination).',
      'State machine updates parcel status and fires transactional notification events via Resend.',
      'End customers enter tracking tokens on public portal to view real-time transit history and proof of delivery.'
    ],
    security: [
      'Finite State Machine (FSM) preventing invalid status leaps (e.g. Received cannot precede Booked)',
      'Cryptographically unique parcel tracking tokens preventing sequential enumeration attacks',
      'AWS S3 bucket policies restricting raw waybill access to authenticated ops staff',
      'Sanitized ExcelJS bulk import engine preventing CSV/Excel formula injection vectors'
    ],
    specs: {
      'Monorepo': 'Turborepo with shared TypeScript packages',
      'Backend': 'NestJS 10 with modular domain controllers',
      'Frontend': 'Next.js 14 App Router with Tailwind CSS',
      'Storage': 'AWS S3 with signed upload URLs',
      'Import Performance': 'Processes 1,000+ waybill manifest rows in <1.8 seconds'
    }
  },

  'biashara-hub': {
    id: 'biashara-hub',
    title: 'Biashara Hub Headless Commerce',
    badge: 'Headless Commerce & M-Pesa',
    category: 'Production E-Commerce',
    stack: 'Medusa.js v2 · Next.js App Router · pnpm Monorepo · PostgreSQL · M-Pesa',
    topology: `+-------------------------------------------------------------------------------+
|                       NEXT.JS APP ROUTER STOREFRONT                           |
|             Incremental Static Regeneration (ISR) / Tailwind CSS              |
+---------------------------------------+---------------------------------------+
                                        | HTTPS / Medusa Store API
                                        v
+-------------------------------------------------------------------------------+
|                          MEDUSA.JS V2 COMMERCE CORE                           |
|                                                                               |
|  +--------------------+  +----------------------+  +-----------------------+  |
|  | Cart, Product &    |  | Custom M-Pesa Daraja |  | Inventory Allocation  |  |
|  | Pricing Workflows  |  | Payment Plugin       |  | & Fulfillment Pipeline|  |
|  +--------------------+  +----------------------+  +-----------------------+  |
+-------------------+-------------------+-------------------+-------------------+
                    |                   |                   |
                    v                   v                   v
+-----------------------+   +-----------------------+   +-----------------------+
|  PostgreSQL Database  |   | Safaricom Daraja API  |   | Admin Dashboard PWA   |
|  Medusa Schema Tables |   | STK Push & C2B Queue  |   | Catalog & Order Ops   |
+-----------------------+   +-----------------------+   +-----------------------+`,
    dataFlow: [
      'Customer browses statically generated product catalog with sub-second page transitions via Next.js ISR.',
      'Adding items to cart triggers Medusa v2 workflow calculating Kenyan tax rates and shipping rules.',
      'Selecting M-Pesa payment fires custom Medusa payment plugin dispatching STK Push to customer handset.',
      'Daraja confirmation webhook completes order, decrements stock allocations, and generates customer invoice.'
    ],
    security: [
      'Custom Medusa.js v2 payment provider with strict idempotent webhook handling',
      'Safaricom Daraja passkey and consumer secret isolation via encrypted environment variables',
      'Session-bound shopping carts preventing cross-session data leaks or inventory locking exploits',
      'Content Security Policy (CSP) and CORS whitelist on public storefront APIs'
    ],
    specs: {
      'Engine': 'Medusa.js v2 Headless Commerce Framework',
      'Storefront': 'Next.js 14 App Router with React Server Components',
      'Package Manager': 'pnpm monorepo workspace architecture',
      'Payment Provider': 'Custom-built Safaricom M-Pesa Daraja payment module',
      'Performance': 'Lighthouse 96+ score with sub-second ISR edge delivery'
    }
  },

  'wiktrack-app': {
    id: 'wiktrack-app',
    title: 'wiktrack Mobile M-Pesa Analytics',
    badge: 'Mobile Fintech & Native SMS',
    category: 'Offline-First Mobile System',
    stack: 'React Native · Expo · Native Kotlin · SQLite · Supabase · Firebase FCM',
    topology: `+-------------------------------------------------------------------------------+
|                               ANDROID HARDWARE LAYER                          |
|           Incoming M-Pesa SMS -> Native Kotlin BroadcastReceiver              |
+---------------------------------------+---------------------------------------+
                                        | IPC Event Bridge
                                        v
+-------------------------------------------------------------------------------+
|                         REACT NATIVE APPLICATION LAYER                        |
|                                                                               |
|  +--------------------+  +----------------------+  +-----------------------+  |
|  | Regex Parser &     |  | Local SQLite Buffer  |  | Sync Daemon &         |  |
|  | Transaction Normal |  | Offline Transaction  |  | Exponential Backoff   |  |
|  | izer Engine        |  | Ledger               |  | Worker                |  |
|  +--------------------+  +----------------------+  +-----------------------+  |
+-------------------+-------------------+-------------------+-------------------+
                    |                                       |
                    v                                       v
+-----------------------+               +-----------------------+
| Local SQLite Database |               |   Supabase Cloud DB   |
| Zero-Data-Loss Buffer |               |   Encrypted Analytics |
+-----------------------+               +-----------------------+`,
    dataFlow: [
      'Device receives Safaricom M-Pesa SMS; native Kotlin BroadcastReceiver intercepts message in background.',
      'Kotlin module invokes deterministic regex parsing transaction code, amount, counterparty, and balance.',
      'Parsed payload is written immediately to local SQLite database with unique transaction constraint.',
      'Background worker verifies network connectivity and batches unsynced records to Supabase with exponential backoff.'
    ],
    security: [
      'Strict regex validation filtering only verified MPESA sender headers to prevent SMS spoofing',
      'Client-side SQLite unique constraints on transaction reference preventing double accounting',
      'Supabase Row-Level Security (RLS) policies guaranteeing user records cannot be accessed by other users',
      'Zero plaintext credential storage on device using Android Keystore encryption'
    ],
    specs: {
      'Mobile Framework': 'React Native 0.74 with Expo SDK',
      'Native Module': 'Custom Kotlin SMS parser module with Android background receiver',
      'Local Storage': 'SQLite with offline-first write guarantees',
      'Cloud Backend': 'Supabase PostgreSQL with Row Level Security',
      'Battery Overhead': '<1% daily consumption via event-driven intent listening'
    }
  },

﻿  'apollos-den': {
    id: 'apollos-den',
    title: 'Apollo\'s Den Private AI Studio',
    badge: 'Private LLM Host & Vision AI',
    category: 'AI Infrastructure & High-Performance Compute',
    stack: 'Python · Oracle ARM Ampere A1 (24GB RAM) · Qwen 3 VL · Q8_0 · SQLite WAL',
    topology: `+-------------------------------------------------------------------------------+
|                            CLIENT / API CONSUMERS                             |
|          Web Chat Console  |  OpenAI-Compatible REST API  |  AI Agents        |
+---------------------------------------+---------------------------------------+
                                        | HTTPS / Server-Sent Events (SSE)
                                        v
+-------------------------------------------------------------------------------+
|                         APOLLO\'S DEN INFERENCE ENGINE                         |
|                                                                               |
|  +--------------------+  +----------------------+  +-----------------------+  |
|  | OpenAI API Compat  |  | 256k Context Manager |  | Streaming Token       |  |
|  | Adapter & Routing  |  | & 4-Bit KV Cache     |  | Generator (SSE)       |  |
|  +--------------------+  +----------------------+  +-----------------------+  |
+-------------------+-------------------+-------------------+-------------------+
                    |                   |                   |
                    v                   v                   v
+-----------------------+   +-----------------------+   +-----------------------+
|  Qwen 3 VL (8.8B)     |   | Oracle ARM Ampere A1  |   | SQLite WAL Database   |
|  Q8_0 Precision Model |   | 4 OCPU / 24GB Memory  |   | Chat Memory & Tokens  |
+-----------------------+   +-----------------------+   +-----------------------+`,
    dataFlow: [
      'Client posts prompt or multimodal image payload to /v1/chat/completions endpoint.',
      'Engine tokenizes multimodal input and provisions dynamic 4-bit quantized Key-Value cache slots.',
      'Qwen 3 VL executes quantized forward pass on Oracle ARM Ampere A1 cores with NEON SIMD optimizations.',
      'Response streams tokens in real-time via Server-Sent Events (SSE) while recording metrics in SQLite WAL.'
    ],
    security: [
      'Self-hosted isolated cloud infrastructure: zero third-party telemetry or prompt data leakage',
      'API key authentication enforcing rate-limits and token quotas per client',
      'Memory boundaries isolating concurrent inference threads to prevent memory fragmentation',
      'Ephemeral image processing: uploaded visual assets are scrubbed from RAM post-inference'
    ],
    specs: {
      'Compute Node': 'Oracle Cloud ARM Ampere A1 (4 OCPU, 24 GB RAM)',
      'Model Weight': 'Qwen 3 VL (8.8B Vision-Language) at Q8_0 precision',
      'Context Window': 'Up to 256k tokens with 4-bit KV quantization',
      'API Interface': 'Drop-in replacement for OpenAI /v1/chat/completions',
      'Storage': 'SQLite with Write-Ahead Logging (WAL) for persistent session trees'
    }
  },

  'quant-engine': {
    id: 'quant-engine',
    title: 'Antigravity Quant Engine v6',
    badge: 'Quantitative Finance & MT5 IPC',
    category: 'High-Frequency & Algorithmic Trading',
    stack: 'Python · MetaTrader 5 IPC · Asyncio · Telegram Bot API · Confluence Scoring',
    topology: `+-------------------------------------------------------------------------------+
|                       TELEGRAM COMMAND & MONITORING CENTER                    |
|             Real-Time Position Alerts  |  Remote Order Execution Override     |
+---------------------------------------+---------------------------------------+
                                        | WSS / Telegram API
                                        v
+-------------------------------------------------------------------------------+
|                       ANTIGRAVITY QUANT ENGINE (PYTHON)                       |
|                                                                               |
|  +--------------------+  +----------------------+  +-----------------------+  |
|  | Signal Agent       |  | Confluence Scorer    |  | Execution Guard &     |  |
|  | Multi-Asset Scan   |  | (0-100 Threshold)    |  | Dynamic Trail Stop    |  |
|  +--------------------+  +----------------------+  +-----------------------+  |
+-------------------+-------------------+-------------------+-------------------+
                    |                   |                   |
                    v                   v                   v
+-----------------------+   +-----------------------+   +-----------------------+
| MetaTrader 5 IPC Pipe |   | Risk Manager Guard    |   | Position State Log    |
| Low-Latency Windows   |   | Max Drawdown Hard Stop|   | SQLite Audit Trail    |
+-----------------------+   +-----------------------+   +-----------------------+`,
    dataFlow: [
      'Signal Agent continuously streams tick and OHLC data from MetaTrader 5 via low-latency Python IPC.',
      'Confluence engine evaluates EMA trends, order-block liquidity pools, and volatility indices (0-100 score).',
      'Signals exceeding the strict confluence threshold (>78) pass to the Execution Guard.',
      'Execution Guard verifies portfolio risk limits, submits market order to MT5, and notifies Telegram.'
    ],
    security: [
      'Strict execution circuit breakers terminating all trading if daily drawdown reaches 2.5%',
      'Two-man rule Telegram authentication for manual parameter overrides and remote shutdowns',
      'Zero external API key exposure: trading executes entirely through local IPC sockets',
      'Atomic trade journaling logging slippage, execution latency, and spread conditions'
    ],
    specs: {
      'Runtime': 'Python 3.12 with asyncio low-latency scheduler',
      'Terminal IPC': 'Direct MetaTrader 5 Python IPC bridge (<12ms execution loop)',
      'Risk Model': 'Fixed fractional position sizing with dynamic ATR trailing stops',
      'Asset Coverage': 'Currencies, Commodities (Gold/XAUUSD), and Synthetic Indices',
      'Alerting': 'Bidirectional Telegram command bot with instant execution receipts'
    }
  },

  'hiro-agent': {
    id: 'hiro-agent',
    title: 'Hiro Autonomous AI Agent Mesh',
    badge: 'AI Agent Mesh & MCP',
    category: 'Autonomous Systems & Cognitive Architecture',
    stack: 'TypeScript · Node.js · OpenRouter · Pinecone · PostgreSQL · MCP SDK',
    topology: `+-------------------------------------------------------------------------------+
|                             CLIENT INTERFACES                                 |
|          Web Voice/Text Chat  |  CLI Terminal  |  MCP Tool Ingress            |
+---------------------------------------+---------------------------------------+
                                        | WebSockets / JSON-RPC
                                        v
+-------------------------------------------------------------------------------+
|                           HIRO AGENT RUNTIME CORE                             |
|                                                                               |
|  +--------------------+  +----------------------+  +-----------------------+  |
|  | Context Orchestr   |  | Dynamic Tool Registry|  | Dual-Tier Memory      |  |
|  | ator & Multi-Model |  | (MCP Server Bridge)  |  | Manager               |  |
|  +--------------------+  +----------------------+  +-----------------------+  |
+-------------------+-------------------+-------------------+-------------------+
                    |                   |                   |
                    v                   v                   v
+-----------------------+   +-----------------------+   +-----------------------+
|  Pinecone Vector DB   |   | LLM Provider Mesh     |   | Local Skills Runtime  |
|  Semantic Long-Memory |   | OpenRouter / Anthropic|   | Self-Improving Tools  |
+-----------------------+   +-----------------------+   +-----------------------+`,
    dataFlow: [
      'User transmits complex multi-step request via voice input or chat console.',
      'Hiro queries Pinecone vector database to retrieve semantically relevant past memories and preferences.',
      'Agent selects optimal specialized LLM via OpenRouter and queries connected Model Context Protocol (MCP) tools.',
      'Actions execute deterministically; results synthesize into a final response and persist to long-term memory.'
    ],
    security: [
      'Sandboxed execution environment for dynamic tool calls and file system operations',
      'Rate-limiting and budget guardrails preventing recursive agent loop token runaway',
      'End-to-end encrypted session persistence with zero vector leak across namespaces',
      'Strict schema validation on MCP tool arguments via Zod runtime checkers'
    ],
    specs: {
      'Runtime': 'Node.js with TypeScript and MCP SDK',
      'Model Mesh': 'Dynamic routing across Claude 3.5 Sonnet, GPT-4o, and Gemini 2.0',
      'Vector Memory': 'Pinecone vector index with cosine similarity search',
      'Tooling': 'Native Model Context Protocol (MCP) client connecting local & remote tools',
      'Voice Pipeline': 'Low-latency Whisper STT and elevenlabs neural audio synthesis'
    }
  },

  'wik-portal': {
    id: 'wik-portal',
    title: 'WIK Technologies Corporate Portal',
    badge: 'Corporate Edge Portal',
    category: 'Web Platform & Edge CDN',
    stack: 'HTML5 · CSS3 · JavaScript · Netlify Functions · Sharp Image Pipeline',
    topology: `+-------------------------------------------------------------------------------+
|                            GLOBAL EDGE USERS (BROWSER)                        |
|        Responsive Viewports (Mobile to 4K) · Zero Layout Shift (CLS 0.0)      |
+---------------------------------------+---------------------------------------+
                                        | HTTPS / Netlify CDN
                                        v
+-------------------------------------------------------------------------------+
|                         NETLIFY EDGE INFRASTRUCTURE                           |
|                                                                               |
|  +--------------------+  +----------------------+  +-----------------------+  |
|  | Static Asset Edge  |  | Serverless Contact   |  | Embedded Hiro AI      |  |
|  | Cache & Brotli Opt |  | Lead Pipeline        |  | Edge Assistant Worker |  |
|  +--------------------+  +----------------------+  +-----------------------+  |
+-------------------+-------------------+-------------------+-------------------+
                    |                   |                   |
                    v                   v                   v
+-----------------------+   +-----------------------+   +-----------------------+
|  Sharp Pre-Processing |   | Resend Webhook Ingest |   | OpenRouter Edge Relay |
|  WebP / AVIF Formats  |   | Instant Lead Alerts   |   | Live Inquiries        |
+-----------------------+   +-----------------------+   +-----------------------+`,
    dataFlow: [
      'Client requests website; Netlify Edge serves pre-compiled, Brotli-compressed assets with 100% cache hits.',
      'Interactive service inquiries route to an edge serverless function validating inputs with clean CSRF checks.',
      'Visitor interactions with the embedded assistant trigger a streaming edge invocation to the Hiro API.',
      'Qualified project leads trigger automated notifications directly to the engineering team.'
    ],
    security: [
      'Strict Content Security Policy (CSP), HSTS, and X-Content-Type-Options headers',
      'Serverless form submission rate-limiting with honeypot spam traps',
      'Zero client-side API key exposure via Netlify serverless proxy boundaries',
      'Static compilation ensuring zero server-side execution vulnerability attack surface'
    ],
    specs: {
      'Hosting': 'Netlify Global Edge CDN',
      'Asset Optimization': 'Sharp pre-compiled AVIF/WebP image pipeline',
      'Serverless': 'Node.js Netlify Edge Functions for contact routing',
      'Performance': 'Perfect 100 Lighthouse performance and accessibility scores',
      'Integrations': 'Embedded Hiro AI assistant and Resend transactional notifications'
    }
  },

  'bikelab-parts': {
    id: 'bikelab-parts',
    title: 'BikeLab Parts Manager Desktop',
    badge: 'Desktop Parts Catalog',
    category: 'Offline-First Desktop System',
    stack: 'Electron · Vite · Node.js · TypeScript · Local JSON/SQLite',
    topology: `+-------------------------------------------------------------------------------+
|                            DESKTOP UI (ELECTRON RENDERER)                     |
|           Vite + React UI · Real-Time Parts Filtering · Workshop Tickets      |
+---------------------------------------+---------------------------------------+
                                        | Context Bridge IPC (contextIsolation: true)
                                        v
+-------------------------------------------------------------------------------+
|                         ELECTRON MAIN PROCESS (NODE.JS)                       |
|                                                                               |
|  +--------------------+  +----------------------+  +-----------------------+  |
|  | High-Speed In-Mem  |  | Workshop Service     |  | Offline File I/O      |  |
|  | SKU Search Engine  |  | Ticket Lifecycle     |  | Sync & Backup Engine  |  |
|  +--------------------+  +----------------------+  +-----------------------+  |
+-------------------+-------------------+-------------------+-------------------+
                    |                   |                   |
                    v                   v                   v
+-----------------------+   +-----------------------+   +-----------------------+
| 5,000+ SKU Database   |   | PDF Job Card Printer  |   | Local JSON/SQLite     |
| Sub-10ms Indexed Find |   | Thermal / A4 Drivers  |   | Encrypted Data Store  |
+-----------------------+   +-----------------------+   +-----------------------+`,
    dataFlow: [
      'Workshop mechanics search replacement components via instant fuzzy-match input.',
      'Electron main process executes in-memory indexed queries across 5,000+ parts in <10ms.',
      'Selected parts attach to customer job card; pricing and labor totals compute automatically.',
      'System prints formatted thermal receipt or workshop job ticket directly to local printer spooler.'
    ],
    security: [
      'Electron contextIsolation: true with strict IPC channel whitelist preventing XSS escalation',
      'nodeIntegration disabled in all renderer windows',
      'Atomic file writes with temp-file replacement preventing catalog corruption on sudden power-off',
      'Automated rolling daily local backups to user documents folder'
    ],
    specs: {
      'Framework': 'Electron with Vite build pipeline and TypeScript',
      'Catalog Capacity': '5,000+ spare part SKUs with category taxonomies',
      'Search Speed': '<10ms instant response on local memory index',
      'Hardware': 'Direct USB/LAN thermal and desktop printer driver support',
      'Offline Resilience': '100% functional without external internet connectivity'
    }
  },

  'asyncstream-bench': {
    id: 'asyncstream-bench',
    title: 'AsyncStream Concurrency Benchmark',
    badge: 'Systems Benchmarking',
    category: 'High-Throughput Systems Engineering',
    stack: 'Python · Asyncio · Concurrency Invariants · Lock Mutexes',
    topology: `+-------------------------------------------------------------------------------+
|                           STREAM INGESTION PRODUCERS                          |
|         High-Frequency Event Generators (Simulated 50k events/sec)            |
+---------------------------------------+---------------------------------------+
                                        | Async Queues
                                        v
+-------------------------------------------------------------------------------+
|                    ASYNCSTREAM CONCURRENCY GOVERNOR CORE                      |
|                                                                               |
|  +--------------------+  +----------------------+  +-----------------------+  |
|  | Sliding Window     |  | Token-Bucket Credit  |  | Deadlock-Free Lock    |  |
|  | Backpressure Pipe  |  | Rate Limiter         |  | Acquisition Governor  |  |
|  +--------------------+  +----------------------+  +-----------------------+  |
+-------------------+-------------------+-------------------+-------------------+
                    |                   |                   |
                    v                   v                   v
+-----------------------+   +-----------------------+   +-----------------------+
| Mutex Lock Hierarchy  |   | Latency Telemetry     |   | Saturation Benchmark  |
| Cycle Prevention Guard|   | P95 / P99 Profiler    |   | Diagnostic Reports    |
+-----------------------+   +-----------------------+   +-----------------------+`,
    dataFlow: [
      'Producers push burst streams into asynchronous queues exceeding downstream consumption capacity.',
      'Sliding window backpressure regulator throttles upstream producers to protect system memory.',
      'Credit governor regulates release rate using strict lock hierarchy to prevent circular lock inversions.',
      'Telemetry profiler logs P50, P95, and P99 latency percentiles and identifies thread starvation bottlenecks.'
    ],
    security: [
      'Strict partial order on mutex acquisition preventing circular wait deadlocks (Dijkstra lock order)',
      'Bounded memory buffer pools preventing Out-Of-Memory (OOM) fatal crashes during microbursts',
      'Deterministic test harnesses validating safety invariants under high race-condition concurrency',
      'Thread-safe atomic counters tracking dropped, delayed, and processed packets'
    ],
    specs: {
      'Language': 'Python 3.12 with asyncio event loop optimizations',
      'Throughput Tested': '50,000+ async events per second with zero data drops',
      'Latency Profile': 'Sub-millisecond P95 latency under normal queue load',
      'Concurrency Model': 'Cooperative multitasking with non-blocking lock primitives',
      'Key Discovery': 'Diagnosed and eliminated circular inversion between backpressure & credit limits'
    }
  },

  // === TIER 3: APPLIED LABS & OPEN-SOURCE BUILDS ===
﻿  'nn-playground': {
    id: 'nn-playground',
    title: 'Neural Network Playground',
    badge: 'Machine Learning Lab',
    category: 'Browser Deep Learning & WebGL',
    stack: 'React 18 · TensorFlow.js · Chart.js · HTML5 Canvas · WebGL',
    topology: `+-------------------------------------------------------------------------------+
|                       REACT 18 CANVAS & VISUALIZATION UI                      |
|          Layer Configurator  |  Loss Curves Chart  |  Decision Boundary Canvas|
+---------------------------------------+---------------------------------------+
                                        | Client WebGL Context
                                        v
+-------------------------------------------------------------------------------+
|                        TENSORFLOW.JS IN-BROWSER RUNTIME                       |
|                                                                               |
|  +--------------------+  +----------------------+  +-----------------------+  |
|  | Dynamic Sequential |  | Real-Time Forward &  |  | Loss Calculation      |  |
|  | Model Builder      |  | Backprop Pipeline    |  | & Gradient Descent    |  |
|  +--------------------+  +----------------------+  +-----------------------+  |
+-------------------+-------------------+-------------------+-------------------+
                    |                   |                   |
                    v                   v                   v
+-----------------------+   +-----------------------+   +-----------------------+
| WebGL Acceleration    |   | Synthetic Datasets    |   | Model Weights Export  |
| GPU Tensor Operations |   | Circle, XOR, Spiral   |   | JSON / Keras Format   |
+-----------------------+   +-----------------------+   +-----------------------+`,
    dataFlow: [
      'User selects dataset (XOR, Spiral, Circle) and adds hidden layers with custom activation functions.',
      'TensorFlow.js compiles dynamic tf.sequential model and dispatches tensor math to WebGL GPU shader cores.',
      'Each training epoch computes loss; weight matrices update via gradient descent without blocking UI thread.',
      'Canvas renders real-time 2D decision boundary showing neural network classification convergence.'
    ],
    security: [
      '100% client-side WebGL compute: zero user dataset transmission to external servers',
      'Tensor disposal discipline (tf.dispose / tf.tidy) preventing WebGL VRAM memory leaks',
      'Input sanitization on custom training parameters preventing infinite loop UI freezes',
      'Safe model serialization verifying JSON weight manifests before loading'
    ],
    specs: {
      'Engine': 'TensorFlow.js with WebGL hardware acceleration',
      'UI Framework': 'React 18 with HTML5 Canvas drawing loop',
      'Datasets': 'Synthetic Spiral, XOR, Circle, and Gaussian distributions',
      'Supported Layers': 'Dense, Dropout, Activation (ReLU, Sigmoid, Tanh, Softmax)',
      'Frame Rate': 'Smooth 60 FPS decision boundary rendering during training'
    }
  },

  'codecraft-ai': {
    id: 'codecraft-ai',
    title: 'CodeCraft AI Code Analyzer',
    badge: 'Developer Tooling & AST',
    category: 'Software Engineering Metrics',
    stack: 'Express 4 · Socket.IO · Monaco Editor · Acorn / Esprima AST',
    topology: `+-------------------------------------------------------------------------------+
|                            MONACO EDITOR CLIENT (WEB)                         |
|         Live Code Input · Real-Time Diagnostic Warnings · Complexity Radar    |
+---------------------------------------+---------------------------------------+
                                        | WebSocket Stream
                                        v
+-------------------------------------------------------------------------------+
|                        CODECRAFT AST ANALYSIS ENGINE                          |
|                                                                               |
|  +--------------------+  +----------------------+  +-----------------------+  |
|  | Acorn/Esprima AST  |  | Cyclomatic & Cogni   |  | AI Optimization       |  |
|  | Syntax Parser      |  | tive Complexity Calc |  | Suggestion Engine     |  |
|  +--------------------+  +----------------------+  +-----------------------+  |
+-------------------+-------------------+-------------------+-------------------+
                    |                   |                   |
                    v                   v                   v
+-----------------------+   +-----------------------+   +-----------------------+
| Halstead Software     |   | AST Node Visitor      |   | WebSocket Response    |
| Science Metrics       |   | Scope & Shadowing     |   | Diagnostic Annotations|
+-----------------------+   +-----------------------+   +-----------------------+`,
    dataFlow: [
      'Developer types code into embedded Monaco editor; change event dispatches to analysis pipeline.',
      'Acorn parser constructs Abstract Syntax Tree (AST), identifying control flow forks and nesting depth.',
      'Engine calculates McCabe Cyclomatic Complexity, Cognitive Complexity, and Halstead Volume metrics.',
      'Diagnostics stream back via WebSockets, highlighting complex code blocks and suggesting refactorings.'
    ],
    security: [
      'Static AST parsing without dynamic code execution: zero eval() or arbitrary execution vectors',
      'Parser resource quotas preventing billion-laughs recursive AST parsing exploits',
      'WebSocket connection rate limits preventing DoS on the AST parser daemon',
      'Input size ceiling (max 10,000 lines) protecting server CPU availability'
    ],
    specs: {
      'Parser': 'Acorn / Esprima ECMAScript Abstract Syntax Tree parser',
      'Editor': 'Microsoft Monaco Editor (VS Code web editor engine)',
      'Calculated Metrics': 'Cyclomatic Complexity, Cognitive Complexity, Halstead Software Science',
      'Latency': 'Under 40ms real-time AST re-parsing on 1,000 lines of code',
      'Communication': 'Socket.IO bidirectional event pipeline'
    }
  },

  'unsent-pwa': {
    id: 'unsent-pwa',
    title: 'Unsent Privacy Diary PWA',
    badge: 'Privacy PWA & IndexedDB',
    category: 'Offline-First Personal System',
    stack: 'Vite · React 19 · Supabase RLS · idb-keyval (IndexedDB) · Vite PWA · JSZip',
    topology: `+-------------------------------------------------------------------------------+
|                           CLIENT BROWSER / MOBILE PWA                         |
|        Voice Dictation  |  Calendar View  |  Media Attachments  |  Auto-Lock  |
+---------------------------------------+---------------------------------------+
                                        | IndexedDB Transactions
                                        v
+-------------------------------------------------------------------------------+
|                         OFFLINE-FIRST CLIENT RUNTIME                          |
|                                                                               |
|  +--------------------+  +----------------------+  +-----------------------+  |
|  | idb-keyval Local   |  | Inactivity Auto-Lock |  | JSZip Client Backup   |  |
|  | Storage Controller |  | Security Timer       |  | Export Generator      |  |
|  +--------------------+  +----------------------+  +-----------------------+  |
+-------------------+-------------------+-------------------+-------------------+
                    |                                       |
                    v                                       v
+-----------------------+               +-----------------------+
| Local IndexedDB Vault |               |   Supabase Cloud DB   |
| Fast Offline Access   |               |   Encrypted Sync RLS  |
+-----------------------+               +-----------------------+`,
    dataFlow: [
      'User writes or dictates thoughts; entries persist immediately to local IndexedDB via idb-keyval.',
      'Inactivity detection monitors user idle state; triggers auto-lock screen requiring PIN / re-auth.',
      'When internet is present, background worker syncs encrypted entries to Supabase with Row-Level Security.',
      'User can export full diary history into a self-contained, offline ZIP archive containing photos and JSON.'
    ],
    security: [
      'Zero plaintext exposure: Supabase RLS ensures only authenticated user can read or write diary records',
      'Inactivity timer automatically locks screen after 2 minutes of idle time',
      'Local IndexedDB isolation protecting user private data within browser security sandbox',
      'Client-side ZIP backup generation executing 100% in browser memory with JSZip'
    ],
    specs: {
      'Architecture': 'Progressive Web App (PWA) installable on iOS, Android, and Desktop',
      'Local Cache': 'IndexedDB via idb-keyval with zero latency read/write',
      'Cloud Sync': 'Supabase PostgreSQL with Row Level Security (RLS)',
      'Offline Capability': '100% functional without internet connectivity',
      'Export': 'Encrypted local ZIP backup including markdown entries and media'
    }
  },

  'framel-api': {
    id: 'framel-api',
    title: 'Framel Commerce API',
    badge: 'Commerce API & Automated Tests',
    category: 'Commercial Backend API',
    stack: 'Express 4 · TypeScript · Firebase Admin · M-Pesa Daraja · Jest (45 Tests)',
    topology: `+-------------------------------------------------------------------------------+
|                            CLIENT STOREFRONT / ADMIN                          |
|           Product Inquiries  |  Checkout Flow  |  Admin Inventory Console     |
+---------------------------------------+---------------------------------------+
                                        | HTTPS / REST (Swagger Documented)
                                        v
+-------------------------------------------------------------------------------+
|                         FRAMEL EXPRESS 4 REST API                             |
|                                                                               |
|  +--------------------+  +----------------------+  +-----------------------+  |
|  | Daraja STK Push &  |  | Cloudinary Media     |  | 45 Automated Jest    |  |
|  | C2B Callback Guard |  | Upload Pipeline      |  | Test Assertions       |  |
|  +--------------------+  +----------------------+  +-----------------------+  |
+-------------------+-------------------+-------------------+-------------------+
                    |                   |                   |
                    v                   v                   v
+-----------------------+   +-----------------------+   +-----------------------+
| Firebase Cloud DB     |   | Safaricom Daraja API  |   | Cloudinary CDN        |
| Realtime Orders       |   | Mobile Money Rails    |   | Product Photos        |
+-----------------------+   +-----------------------+   +-----------------------+`,
    dataFlow: [
      'Customer initiates checkout; API registers order and requests M-Pesa STK Push from Safaricom.',
      'Safaricom callback endpoint validates payment signature and marks order status as confirmed.',
      'Cloudinary media pipeline handles image uploading, compression, and WebP transformation for flower catalog.',
      'Continuous Integration pipeline runs 45 automated Jest unit and integration tests on every commit.'
    ],
    security: [
      'Comprehensive automated test suite (45 Jest tests) ensuring zero regression in checkout logic',
      'Daraja webhook validation verifying Safaricom origin IP and payload checksum',
      'Firebase Admin SDK service account key isolation',
      'Strict input validation using Joi/Zod schemas on all API ingress routes'
    ],
    specs: {
      'Framework': 'Express 4 with TypeScript and modular architecture',
      'Test Coverage': '45 passing unit and integration tests in Jest',
      'Database': 'Firebase Cloud Firestore with transactional order writes',
      'Payments': 'Safaricom M-Pesa Daraja STK Push and C2B verification',
      'Media': 'Cloudinary automated image resizing and WebP transformation'
    }
  },

  'arch-kenya': {
    id: 'arch-kenya',
    title: 'ARCH Kenya Architectural Portfolio',
    badge: 'Design System & Luxury UI',
    category: 'Frontend Engineering & Design System',
    stack: 'HTML5 · CSS3 · Modern Typography · Responsive Design · Grid System',
    topology: `+-------------------------------------------------------------------------------+
|                             CLIENT VIEWPORT (BROWSER)                         |
|        Fluid Typography Scale · Earth Tone Palette · Responsive Masonry Grid   |
+---------------------------------------+---------------------------------------+
                                        | Pure Semantic HTML5 & CSS3
                                        v
+-------------------------------------------------------------------------------+
|                        ARCH KENYA DESIGN SYSTEM CORE                          |
|                                                                               |
|  +--------------------+  +----------------------+  +-----------------------+  |
|  | CSS Custom Propert |  | Fluid Typography &   |  | Zero-JS High Perf     |  |
|  | ies Design Tokens  |  | Modular Spacing Scale|  | Layout Engine         |  |
|  +--------------------+  +----------------------+  +-----------------------+  |
+-------------------+-------------------+-------------------+-------------------+
                    |                   |                   |
                    v                   v                   v
+-----------------------+   +-----------------------+   +-----------------------+
| Masonry Gallery Grid  |   | Architectural Type    |   | 100 Lighthouse Score  |
| CSS Grid + Flexbox    |   | Serif Display Headers |   | Zero Cumulative Shift |
+-----------------------+   +-----------------------+   +-----------------------+`,
    dataFlow: [
      'Browser requests static assets; semantic HTML5 markup renders instantly with zero JavaScript overhead.',
      'CSS custom properties initialize the warm earth-tone palette and fluid modular typography scale.',
      'Masonry grid arranges architectural case studies with precise aspect ratio preservation.',
      'Accessible focus styles and semantic heading structure deliver a 100/100 Lighthouse score.'
    ],
    security: [
      'Zero external runtime dependencies: eliminates supply chain vulnerability risks',
      'Strict Content Security Policy headers preventing unauthorized script injection',
      'Accessible keyboard navigation with visible, high-contrast focus rings',
      'Optimized image markup with width/height attributes preventing Cumulative Layout Shift (CLS 0.0)'
    ],
    specs: {
      'Design Philosophy': 'Luxury-industrial aesthetic with warm earth-tone palette',
      'Stack': 'Pure Semantic HTML5 and modern CSS3 (Zero external frameworks)',
      'Performance': '100/100 Lighthouse score across Performance, SEO, and Accessibility',
      'Layout Engine': 'CSS Grid and Flexbox with responsive fluid typography',
      'Layout Stability': 'Cumulative Layout Shift (CLS) = 0.00'
    }
  },

  'stac-weather': {
    id: 'stac-weather',
    title: 'STAC Weather Dynamic Portal',
    badge: 'Weather Portal & Dynamic Gradients',
    category: 'Utility Portal & APIs',
    stack: 'HTML5 · CSS3 · JavaScript · PHP Backend · Geolocation API',
    topology: `+-------------------------------------------------------------------------------+
|                            CLIENT DASHBOARD (BROWSER)                         |
|     Adaptive Gradient Background  |  24h Hourly Forecast  |  7-Day Weather Grid|
+---------------------------------------+---------------------------------------+
                                        | Geolocation / Fetch API
                                        v
+-------------------------------------------------------------------------------+
|                          STAC PHP BACKEND & PROXY                             |
|                                                                               |
|  +--------------------+  +----------------------+  +-----------------------+  |
|  | Geolocation Coord  |  | 15-Minute Response   |  | Condition-to-Color    |  |
|  | inate Resolver     |  | Caching Layer        |  | Mapping Pipeline      |  |
|  +--------------------+  +----------------------+  +-----------------------+  |
+-------------------+-------------------+-------------------+-------------------+
                    |                   |                   |
                    v                   v                   v
+-----------------------+   +-----------------------+   +-----------------------+
| OpenWeatherMap API    |   | Local JSON Cache      |   | CSS Dynamic Gradients |
| Global Weather Data   |   | Rate-Limit Protection |   | Adaptive Atmosphere   |
+-----------------------+   +-----------------------+   +-----------------------+`,
    dataFlow: [
      'User grants browser geolocation; coordinates transmit to lightweight PHP backend proxy.',
      'Backend queries OpenWeatherMap API or serves fresh response from 15-minute file cache.',
      'Frontend maps atmospheric weather code (Rain, Thunderstorm, Clear, Mist) to dynamic CSS gradient.',
      'Hourly forecast cards and 7-day extended outlook render with intuitive weather iconography.'
    ],
    security: [
      'Backend proxy conceals OpenWeatherMap API key from client network inspect tools',
      'Local 15-minute file cache protecting API quotas against rapid refresh abuse',
      'Sanitized city search autocomplete preventing reflected cross-site scripting (XSS)',
      'Strict HTTPS transport ensuring user geolocation privacy'
    ],
    specs: {
      'Frontend': 'Vanilla HTML5, CSS3, and modern JavaScript Fetch API',
      'Backend': 'Lightweight PHP API proxy and caching layer',
      'External Provider': 'OpenWeatherMap One Call API v3',
      'Caching Strategy': '15-minute rolling local cache per city/coordinate',
      'Visual Experience': 'Dynamic CSS gradient transitions matching real-world sky conditions'
    }
  }
};
