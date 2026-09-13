# Portfolio & Resume Expansion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Expand Paul Karonji Waithaka's web portfolio and master resume to showcase his complete 20+ software project repertoire, introducing a Role-Perspective Switcher, an interactive System Inspector Workbench for architectural deep-dives, and an ATS-optimized 2-page senior systems engineer resume in DOCX and PDF.

**Architecture:** The web portfolio retains its high-speed zero-dependency vanilla architecture (`index.html`, `css/styles.css`, `js/main.js`, plus `js/architecture-data.js`). The project showcase is upgraded with a perspective filter (`Systems & Backend`, `Full-Stack & Product`, `All Systems`) and an interactive Architecture Inspector modal/workbench exposing Topology, Data Flow, Security Invariants, and Performance Specs. The resume is generated as a high-density 2-page document using an automated Python docx builder.

**Tech Stack:** HTML5, CSS3 (Modern Grid/Flexbox, Custom Properties), Vanilla JavaScript (ES6+), Python (for DOCX & PDF compilation).

**Spec:** `docs/superpowers/specs/2026-09-13-portfolio-resume-expansion-design.md`

## Global Constraints
- Zero external build tooling or npm dependencies required for the portfolio website.
- Responsive design from 320px mobile to 4K ultra-wide screens.
- Strict preservation of all real existing projects while integrating newly surfaced systems (FleetTrack, HotBill, Padi, WIK Online Cloud POS, Apollo's Den, Antigravity Quant, WIK Scholar, etc.).
- Complete exclusion of unbuilt research proposals (e.g., Aqualytica).
- ATS-optimized 2-page layout for the master resume in both DOCX and PDF.

---

### Task 1: Architectural Blueprint Specifications Data Model

**Files:**
- Create: `c:/Users/paul/Documents/Career path/Websites/paul_portfolio/js/architecture-data.js`
- Test: Manual browser console validation

**Interfaces:**
- Produces: `window.ARCHITECTURE_SPECS` object keyed by system ID (`wik-online-pos`, `fleettrack`, `hotbill`, `padi`, `mtaakeys`, `duesync`, `wik-pos-desktop`, `brixton-hms`, `wik-scholar`, `antigravity-quant`, `apollos-den`). Each entry contains: `title`, `category`, `badge`, `topology` (ASCII/structured blocks), `dataFlow` (array of numbered steps), `security` (list of invariants), and `specs` (key-value performance and runtime metrics).

- [ ] **Step 1: Write `js/architecture-data.js`**
Define comprehensive, production-accurate architectural blueprints for the top flagship systems.

- [ ] **Step 2: Validate data schema in browser console**
Load `js/architecture-data.js` in a node script or browser to ensure valid syntax and object structure.

- [ ] **Step 3: Commit**
```bash
git add js/architecture-data.js
git commit -m "feat: add architectural blueprints data model for system inspector"
```

---

### Task 2: Role-Perspective Switcher & System Inspector Workbench UI

**Files:**
- Modify: `c:/Users/paul/Documents/Career path/Websites/paul_portfolio/index.html`
- Modify: `c:/Users/paul/Documents/Career path/Websites/paul_portfolio/css/styles.css`
- Modify: `c:/Users/paul/Documents/Career path/Websites/paul_portfolio/js/main.js`

**Interfaces:**
- Consumes: `window.ARCHITECTURE_SPECS` from `js/architecture-data.js`.
- Produces: Interactive filter toggling (`[data-perspective="systems"]`, `[data-perspective="product"]`, `[data-perspective="all"]`) and interactive System Inspector modal/drawer with active tab state (`topology`, `flow`, `security`, `specs`).

- [ ] **Step 1: Add Perspective Switcher and Inspector Workbench markup to `index.html`**
Integrate the 3-state perspective bar above projects and the System Inspector container dialog/drawer.

- [ ] **Step 2: Add styles to `css/styles.css`**
Style the perspective controls, workbench terminal container, tab navigation, ASCII/diagram viewer, and responsive layouts.

- [ ] **Step 3: Add event handlers to `js/main.js`**
Wire filtering logic to show/hide project cards according to perspective, and bind click handlers to "Inspect Architecture ⚡" buttons to populate and open the Inspector workbench.

- [ ] **Step 4: Test interactions and keyboard accessibility**
Verify tab navigation, Esc to close Inspector, and filter switching.

- [ ] **Step 5: Commit**
```bash
git add index.html css/styles.css js/main.js
git commit -m "feat: implement role-perspective switcher and interactive system inspector"
```

---

### Task 3: Comprehensive 20+ Project Catalog Expansion

**Files:**
- Modify: `c:/Users/paul/Documents/Career path/Websites/paul_portfolio/index.html`
- Modify: `c:/Users/paul/Documents/Career path/Websites/paul_portfolio/css/styles.css`

**Interfaces:**
- Produces: Complete card markup for Tier 1 Flagships, Tier 2 Supporting Platforms, and Tier 3 Labs with appropriate data attributes (`data-domain="systems"`, `data-domain="product"`, `data-domain="ai"`, `data-domain="mobile"`).

- [ ] **Step 1: Structure Tier 1 Flagship Cards in `index.html`**
Add/update rich cards with tech stack badges, architectural callouts, and "Inspect Architecture" triggers for:
  - WIK Online Cloud POS (VPS Edition)
  - FleetTrack Enterprise
  - HotBill KE
  - Padi Password Manager
  - MtaaKeys
  - DueSync
  - WIK-POS Desktop Suite & License Server
  - Brixton Makunga HMS

- [ ] **Step 2: Structure Tier 2 Supporting Systems in `index.html`**
Add/update clean cards with live links and repository references for:
  - WIK Scholar ERP
  - K-Track
  - JHUB Africa Innovation Tracker
  - Logit (Juba Errands)
  - Biashara Hub
  - wiktrack Android App
  - Apollo's Den (Oracle ARM LLM)
  - Antigravity Multi-Asset Quant Engine v6
  - Hiro AI Agent Mesh
  - WIK Technologies Official
  - BikeLab Desktop
  - AsyncStream Concurrency Benchmark

- [ ] **Step 3: Structure Tier 3 Labs & Demos in `index.html`**
Add lightweight cards for:
  - Neural Network Playground
  - CodeCraft AI
  - Unsent
  - Framel
  - ARCH Kenya

- [ ] **Step 4: Verify CSS grid flow and card responsiveness**
Check card heights, badge wrapping, and visual hierarchy.

- [ ] **Step 5: Commit**
```bash
git add index.html css/styles.css
git commit -m "feat: expand portfolio project catalog to 20+ verified systems"
```

---

### Task 4: Hero, Skills Matrix & Experience Timeline Updates

**Files:**
- Modify: `c:/Users/paul/Documents/Career path/Websites/paul_portfolio/index.html`
- Modify: `c:/Users/paul/Documents/Career path/Websites/paul_portfolio/css/styles.css`

**Interfaces:**
- Produces: Updated Hero section, revamped 8-pillar skills matrix, and updated Experience cards.

- [ ] **Step 1: Update Hero copy and metrics strip**
Update title to "Full-Stack Software Engineer & Systems Architect", hero copy, and languages/systems proof metrics.

- [ ] **Step 2: Update Skills Band to reflect full systems depth**
Update categories to highlight Go, MikroTik, WebCrypto, KRA eTIMS, IoT Telematics, and Distributed Persistence.

- [ ] **Step 3: Update Experience timeline**
Add WIK Online POS (NestJS 11 + KRA eTIMS), FleetTrack Go telematics, and HotBill KE to WIK Technologies experience.

- [ ] **Step 4: Commit**
```bash
git add index.html css/styles.css
git commit -m "feat: align hero, skills, and experience with systems architect positioning"
```

---

### Task 5: ATS-Optimized 2-Page Master Resume Generation

**Files:**
- Create: `c:/Users/paul/Documents/Career path/Websites/paul_portfolio/scripts/generate_resume.py`
- Create: `c:/Users/paul/Documents/Career path/Websites/paul_portfolio/Paul-Karonji-Waithaka-Resume.docx`
- Create: `c:/Users/paul/Documents/Career path/Websites/paul_portfolio/Paul-Karonji-Waithaka-Resume.pdf`

**Interfaces:**
- Produces: Clean, standard font (Calibri / Arial), ATS-parseable headings, 0.5-inch margins, high-density 2-page DOCX and PDF resume files.

- [ ] **Step 1: Write `scripts/generate_resume.py`**
Script using `python-docx` to format the resume with precise styles, margins, tab stops, and bullet formatting.

- [ ] **Step 2: Run generation script to produce DOCX**
Execute script and inspect generated document layout.

- [ ] **Step 3: Convert/render DOCX to PDF**
Use Word COM automation / LibreOffice / PyMuPDF to render `Paul-Karonji-Waithaka-Resume.pdf`.

- [ ] **Step 4: Verify download links in portfolio**
Test that clicking "Download resume" in the Hero and Contact sections downloads the freshly generated resume.

- [ ] **Step 5: Commit**
```bash
git add scripts/generate_resume.py Paul-Karonji-Waithaka-Resume.docx Paul-Karonji-Waithaka-Resume.pdf
git commit -m "feat: generate updated ATS-compliant 2-page master resume in docx and pdf"
```

---

### Task 6: Full System Verification & Walkthrough

**Files:**
- Review: `index.html`, `css/styles.css`, `js/main.js`, `js/architecture-data.js`

- [ ] **Step 1: Test all interactive features in browser**
Verify perspective filtering, System Inspector tabs, card links, and mobile responsiveness.

- [ ] **Step 2: Inspect browser console for errors**
Confirm 0 JavaScript or CSS errors.

- [ ] **Step 3: Verify resume download integrity**
Confirm DOCX and PDF download cleanly and display accurate information.

- [ ] **Step 4: Final commit and create walkthrough document**
```bash
git add -A
git commit -m "chore: complete portfolio and resume expansion"
```
