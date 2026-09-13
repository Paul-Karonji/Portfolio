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
  }
};
