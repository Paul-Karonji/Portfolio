import os
import docx
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.style import WD_STYLE_TYPE
from docx.oxml import parse_xml, OxmlElement
from docx.oxml.ns import nsdecls, qn

def create_resume():
    doc = docx.Document()

    # Configure Margins (0.5 in = 36 pt)
    sections = doc.sections
    for section in sections:
        section.top_margin = Inches(0.48)
        section.bottom_margin = Inches(0.48)
        section.left_margin = Inches(0.5)
        section.right_margin = Inches(0.5)

    # Base font
    normal_style = doc.styles['Normal']
    normal_style.font.name = 'Calibri'
    normal_style.font.size = Pt(9.5)
    normal_style.font.color.rgb = RGBColor(0x22, 0x22, 0x22)

    def add_header():
        p_name = doc.add_paragraph()
        p_name.alignment = WD_ALIGN_PARAGRAPH.CENTER
        p_name.paragraph_format.space_before = Pt(0)
        p_name.paragraph_format.space_after = Pt(1)
        r_name = p_name.add_run("PAUL KARONJI WAITHAKA")
        r_name.font.size = Pt(18)
        r_name.font.bold = True
        r_name.font.color.rgb = RGBColor(0x11, 0x11, 0x11)

        p_title = doc.add_paragraph()
        p_title.alignment = WD_ALIGN_PARAGRAPH.CENTER
        p_title.paragraph_format.space_before = Pt(0)
        p_title.paragraph_format.space_after = Pt(3)
        r_title = p_title.add_run("Full-Stack Software Engineer · Systems Architect · Founder")
        r_title.font.size = Pt(11)
        r_title.font.bold = True
        r_title.font.color.rgb = RGBColor(0x8B, 0x2E, 0x1A)

        p_contact = doc.add_paragraph()
        p_contact.alignment = WD_ALIGN_PARAGRAPH.CENTER
        p_contact.paragraph_format.space_before = Pt(0)
        p_contact.paragraph_format.space_after = Pt(2)
        r_c1 = p_contact.add_run("Nairobi, Kenya  |  +254 729 089 168  |  karonjipaul.w@gmail.com  |  Portfolio: https://paul-karonji.github.io/Portfolio")
        r_c1.font.size = Pt(9)
        r_c1.font.color.rgb = RGBColor(0x44, 0x44, 0x44)

        p_social = doc.add_paragraph()
        p_social.alignment = WD_ALIGN_PARAGRAPH.CENTER
        p_social.paragraph_format.space_before = Pt(0)
        p_social.paragraph_format.space_after = Pt(7)
        r_s1 = p_social.add_run("LinkedIn: linkedin.com/in/paul-karonji-562080381  |  GitHub: github.com/Paul-Karonji")
        r_s1.font.size = Pt(9)
        r_s1.font.color.rgb = RGBColor(0x44, 0x44, 0x44)

    def add_section_heading(title):
        p = doc.add_paragraph()
        p.paragraph_format.space_before = Pt(7)
        p.paragraph_format.space_after = Pt(3)
        p.paragraph_format.keep_with_next = True
        r = p.add_run(title.upper())
        r.font.size = Pt(11)
        r.font.bold = True
        r.font.color.rgb = RGBColor(0x11, 0x11, 0x11)

        # Add bottom border
        pPr = p._p.get_or_add_pPr()
        pBdr = parse_xml(r'<w:pBdr xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">'
                         r'<w:bottom w:val="single" w:sz="6" w:space="1" w:color="111111"/>'
                         r'</w:pBdr>')
        pPr.append(pBdr)

    def add_paragraph(text, justify=True):
        p = doc.add_paragraph()
        p.paragraph_format.space_before = Pt(0)
        p.paragraph_format.space_after = Pt(4)
        if justify:
            p.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
        r = p.add_run(text)
        r.font.size = Pt(9.2)
        r.font.color.rgb = RGBColor(0x22, 0x22, 0x22)
        return p

    def add_skill_line(category, items):
        p = doc.add_paragraph()
        p.paragraph_format.space_before = Pt(0)
        p.paragraph_format.space_after = Pt(2)
        p.paragraph_format.left_indent = Inches(0.15)
        
        r_bullet = p.add_run("▪  ")
        r_bullet.font.size = Pt(8.5)
        r_bullet.font.color.rgb = RGBColor(0x8B, 0x2E, 0x1A)

        r_cat = p.add_run(category + ": ")
        r_cat.font.size = Pt(9.2)
        r_cat.font.bold = True
        r_cat.font.color.rgb = RGBColor(0x11, 0x11, 0x11)

        r_items = p.add_run(items)
        r_items.font.size = Pt(9.2)
        r_items.font.color.rgb = RGBColor(0x33, 0x33, 0x33)

    def add_job_header(role, company, location, dates):
        p = doc.add_paragraph()
        p.paragraph_format.space_before = Pt(5)
        p.paragraph_format.space_after = Pt(1.5)
        p.paragraph_format.keep_with_next = True

        r_role = p.add_run(role + "  |  " + company)
        r_role.font.size = Pt(9.8)
        r_role.font.bold = True
        r_role.font.color.rgb = RGBColor(0x11, 0x11, 0x11)

        r_meta = p.add_run("  —  " + location + " (" + dates + ")")
        r_meta.font.size = Pt(9)
        r_meta.font.italic = True
        r_meta.font.color.rgb = RGBColor(0x55, 0x55, 0x55)

    def add_bullet(lead_in, text):
        p = doc.add_paragraph()
        p.paragraph_format.space_before = Pt(0)
        p.paragraph_format.space_after = Pt(2)
        p.paragraph_format.left_indent = Inches(0.2)
        p.paragraph_format.first_line_indent = Inches(-0.15)

        r_bullet = p.add_run("•  ")
        r_bullet.font.size = Pt(8.5)
        r_bullet.font.color.rgb = RGBColor(0x33, 0x33, 0x33)

        if lead_in:
            r_lead = p.add_run(lead_in + ": ")
            r_lead.font.size = Pt(9.1)
            r_lead.font.bold = True
            r_lead.font.color.rgb = RGBColor(0x1A, 0x1A, 0x1A)

        r_body = p.add_run(text)
        r_body.font.size = Pt(9.1)
        r_body.font.color.rgb = RGBColor(0x2B, 0x2B, 0x2B)

    # 1. Header
    add_header()

    # 2. Professional Summary
    add_section_heading("Professional Summary")
    add_paragraph(
        "Full-Stack Software Engineer and Systems Architect with 3+ years delivering production-grade systems spanning distributed backends, "
        "enterprise cloud platforms, offline-first desktop/mobile architectures, and cryptographic tooling. Founder of WIK Technologies, creator of "
        "WIK Online Cloud POS (NestJS 11 + KRA eTIMS fiscal compliance), FleetTrack (high-concurrency Go IoT telematics), HotBill KE (MikroTik network "
        "automation & M-Pesa billing), MtaaKeys (property marketplace monorepo), DueSync (Next.js SaaS + 13-tool native MCP AI server), and Padi "
        "(zero-knowledge PBKDF2 password manager). Deep expertise in Go, TypeScript, Python, and PHP, offline-first SQLite synchronization, emerging-market "
        "payment rails (M-Pesa, Paystack), and end-to-end production delivery. Final-year Software Development student at KCA University (Expected 2026)."
    )

    # 3. Technical Competencies
    add_section_heading("Technical Competencies")
    add_skill_line("Languages", "Go (Golang), TypeScript, JavaScript (ES6+), Python, PHP 8, Kotlin, SQL (PostgreSQL, MySQL, SQLite), HTML5, CSS3, Bash")
    add_skill_line("Systems & Backend", "Go Goroutines & Channels, NestJS 11, Node.js, Express 5, Laravel 12, Next.js API Routes, WebSockets, Socket.IO, MikroTik RouterOS API (:8728), RESTful APIs")
    add_skill_line("Frontend & Mobile", "React 19, Next.js 16/15, React Native 0.86, Expo 57, Electron, Vite, Tailwind CSS, Radix UI, TanStack Query, Progressive Web Apps (PWAs), IndexedDB")
    add_skill_line("Databases & Storage", "PostgreSQL, MySQL 8 / TiDB Serverless, SQLite (better-sqlite3, Expo SQLite), Prisma ORM, Drizzle ORM, Eloquent ORM, Supabase, Cloudflare R2, AWS S3, Upstash Redis")
    add_skill_line("Security & Cryptography", "Zero-Knowledge client-side encryption (Web Crypto PBKDF2/SHA-256 100k rounds, AES-GCM-256), hardware-bound CPU/MAC fingerprinting, timing-safe HMAC-SHA256, RLS, Helmet, rate limiting, KRA eTIMS AES-256 keys, CVE patching")
    add_skill_line("DevOps & Cloud", "Docker, Docker Compose, Nginx edge reverse proxy, Vercel, Oracle Cloud Infrastructure (ARM Ampere A1), GitHub Actions CI/CD, Vercel Cron, Netlify Functions")
    add_skill_line("Payments & Protocols", "KRA eTIMS (OSCU/VSCU automated fiscalization), M-Pesa Daraja (STK Push & C2B Webhook queues), Paystack (SaaS subscriptions & split payments), Model Context Protocol (MCP), Google Calendar API v3 (OAuth 2.0), Africa's Talking, Cloudinary, Resend")

    # 4. Professional Experience
    add_section_heading("Professional Experience")
    
    add_job_header("Founder & Systems Architect", "WIK Technologies", "Nairobi, Kenya", "Oct 2025 – Present")
    add_bullet(
        "WIK Online Cloud POS",
        "Architected multi-tenant cloud retail operations platform on NestJS 11, React 19, and PostgreSQL; built automated KRA eTIMS fiscalization worker (OSCU/VSCU) with AES-256 encrypted tax credentials, real-time M-Pesa STK push & C2B Paybill cashier reconciliation queue (C2BQueueModal), and Paystack recurring SaaS billing with lifecycle walls (ActiveSubscriptionGuard, SuspendedWall)."
    )
    add_bullet(
        "FleetTrack Enterprise Telematics",
        "Engineered high-concurrency Go backend for batch IoT telematics ingestion and real-time WebSocket fan-out, paired with an offline-first React Native (Expo 57) driver mobile app buffering telemetry in local SQLite with QR manifest claiming and stoppage detection."
    )
    add_bullet(
        "HotBill KE Telecommunications",
        "Built automated telecommunications billing daemon integrating MikroTik RouterOS socket API with M-Pesa Daraja STK push and a Next.js 14 NOC console for ISP/hotspot bandwidth automation in Docker Compose."
    )
    add_bullet(
        "Padi Password Manager",
        "Developed zero-knowledge cross-browser extension (Manifest V3) and Web Vault using client-side Web Crypto PBKDF2 (100,000 rounds) and AES-GCM-256 with Supabase cloud synchronization."
    )
    add_bullet(
        "WIK-POS Desktop Suite & Licensing Authority",
        "Shipped offline-first Electron + SQLite retail suite featuring hardware-bound licensing (CPU+MAC fingerprinting), 30-day offline grace periods, FEFO pharmacy expiry batching (v1.3.33), and hotel multi-terminal LAN F&B ordering (v1.3.26)."
    )
    add_bullet(
        "DueSync Smart Task Management & MCP",
        "Shipped task-management SaaS on Next.js 15 featuring two-way Google Calendar OAuth2 sync, Upstash Redis rate limiting, and a native 13-tool MCP server allowing AI agents to orchestrate schedule planning."
    )

    add_job_header("Technical Lead (Industrial Attachment)", "JHUB Africa", "Nairobi, Kenya", "Sep 2025 – Dec 2025")
    add_bullet(
        "JHUB Africa Innovation Tracker",
        "Directed engineering of the JKUAT innovation management platform (PHP 8.1, MySQL, Docker, JavaScript) across 4 user roles, 6 project lifecycle stages, and automated mentor assignment engines; delivered in production for active nationwide use."
    )
    add_bullet(
        "Quality & DevOps Standards",
        "Established PSR-12 coding standards, conducted code reviews, and containerized the platform with Docker Compose, ensuring high reliability for innovators and investors."
    )

    add_job_header("Freelance Software Engineer & Systems Consultant", "Independent Contractor", "Remote & Nairobi", "2023 – Present")
    add_bullet(
        "MtaaKeys Property Marketplace",
        "Shipped full-stack property marketplace monorepo (Next.js 16, Express 5, PostgreSQL, Prisma, Socket.IO) with dual Paystack subscription tiers (agents & land agents), logarithmic listing curation algorithms, and CI/CD security invariant tests."
    )
    add_bullet(
        "Brixton Makunga Hospital Management System",
        "Delivered 200+ endpoint hospital management ERP (Laravel 12, React 19, MySQL) with automated billing via Observer pattern, real-time queue management, and pharmacy FEFO inventory."
    )
    add_bullet(
        "K-Track Commission SaaS",
        "Built multi-tutor agency commission platform (React 19, Express 5, TiDB Serverless, Cloudflare R2, Socket.IO) with timing-safe HMAC guest checkout URLs and idempotent boot-time database patching."
    )
    add_bullet(
        "Biashara Hub Headless Commerce",
        "Engineered production headless e-commerce for Kenyan retail using Medusa.js v2 and Next.js App Router with native M-Pesa payment rails."
    )

    # 5. Education & Credentials
    add_section_heading("Education & Credentials")
    add_job_header("Bachelor of Science in Software Development", "KCA University", "Nairobi, Kenya", "Sep 2021 – Dec 2026 Expected")
    add_bullet(
        None,
        "Relevant Coursework: Advanced Web Development, Data Structures & Algorithms, Database Management, Network Security, Software Engineering, System Integration, Mobile Application Development, OOP, Agile Project Management."
    )
    add_bullet(
        None,
        "Certifications: Cybersecurity Fundamentals (IBM SkillsBuild, 2025) · Data Protection Basics (Atingi eLearning Platform, Sep 2025) · Zoho Creator Developer Certification (Zoho, Nov/Dec 2025)."
    )

    # Output file
    output_docx = os.path.join(os.getcwd(), 'Paul-Karonji-Waithaka-Resume.docx')
    doc.save(output_docx)
    print(f"Successfully generated DOCX resume: {output_docx}")

if __name__ == '__main__':
    create_resume()
