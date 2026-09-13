/**
 * Main Client Script - Paul Karonji Waithaka Portfolio
 * Includes Mobile Navigation, Scroll Spy, Role-Perspective Switcher,
 * and the Interactive System Inspector Workbench.
 */

(function () {
    // 1. Mobile Navigation Toggle
    const toggle = document.querySelector(".nav-toggle");
    const navLinks = document.querySelector("#navLinks");
    const navItems = document.querySelectorAll(".nav-links a");
    const sections = [...document.querySelectorAll("main section[id]")];

    if (toggle && navLinks) {
        toggle.addEventListener("click", () => {
            const isOpen = toggle.getAttribute("aria-expanded") === "true";
            toggle.setAttribute("aria-expanded", String(!isOpen));
            toggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
            navLinks.classList.toggle("is-open", !isOpen);
            document.body.classList.toggle("nav-open", !isOpen);
        });

        navItems.forEach((item) => {
            item.addEventListener("click", () => {
                toggle.setAttribute("aria-expanded", "false");
                toggle.setAttribute("aria-label", "Open navigation");
                navLinks.classList.remove("is-open");
                document.body.classList.remove("nav-open");
            });
        });
    }

    // 2. Scroll Spy Navigation Highlight
    if ("IntersectionObserver" in window && sections.length) {
        const sectionMap = new Map(sections.map((section) => [section.id, section]));
        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

                if (!visible) return;

                navItems.forEach((item) => {
                    const id = item.getAttribute("href")?.replace("#", "");
                    item.classList.toggle("is-active", sectionMap.get(id) === visible.target);
                });
            },
            {
                rootMargin: "-25% 0px -60% 0px",
                threshold: [0.15, 0.35, 0.6],
            }
        );

        sections.forEach((section) => observer.observe(section));
    }

    // 3. Systems Hub Controls: Tabbed Tiers & Role-Perspective Switcher
    const tierTabs = document.querySelectorAll("[data-tier-tab]");
    const tierPanels = document.querySelectorAll("[data-tier-panel]");
    const perspectiveButtons = document.querySelectorAll("[data-perspective]");
    const projectCards = document.querySelectorAll(".project-card[data-perspective-tags]");

    let currentTier = "tier1";
    let currentPerspective = "all";

    function updateHubDisplay() {
        // Update tier tabs
        tierTabs.forEach((tab) => {
            const isActive = tab.dataset.tierTab === currentTier;
            tab.classList.toggle("is-active", isActive);
            tab.setAttribute("aria-selected", String(isActive));
        });

        // Update tier panels
        tierPanels.forEach((panel) => {
            const panelTier = panel.dataset.tierPanel;
            const isVisible = currentTier === "all" || currentTier === panelTier;
            panel.hidden = !isVisible;
            panel.classList.toggle("is-active", isVisible);
        });

        // Update perspective buttons
        perspectiveButtons.forEach((btn) => {
            const isActive = btn.dataset.perspective === currentPerspective;
            btn.classList.toggle("is-active", isActive);
            btn.setAttribute("aria-pressed", String(isActive));
        });

        // Filter cards by perspective
        projectCards.forEach((card) => {
            const tags = (card.dataset.perspectiveTags || "").split(" ");
            const matches = currentPerspective === "all" || tags.includes(currentPerspective);
            card.classList.toggle("is-filtered-out", !matches);
        });
    }

    if (tierTabs.length) {
        tierTabs.forEach((tab) => {
            tab.addEventListener("click", () => {
                currentTier = tab.dataset.tierTab;
                updateHubDisplay();
            });
        });
    }

    if (perspectiveButtons.length) {
        perspectiveButtons.forEach((btn) => {
            btn.addEventListener("click", () => {
                currentPerspective = btn.dataset.perspective;
                updateHubDisplay();
            });
        });
    }

    // Initialize display
    updateHubDisplay();

    // 4. Interactive System Inspector Workbench
    const inspectorModal = document.getElementById("systemInspector");
    const inspectorBackdrop = document.getElementById("inspectorBackdrop");
    const inspectorCloseBtn = document.getElementById("inspectorCloseBtn");
    const inspectorDismissBtn = document.getElementById("inspectorDismissBtn");
    const inspectorTabs = document.querySelectorAll(".inspector-tab");
    const inspectButtons = document.querySelectorAll("[data-inspect]");

    // Target elements inside inspector
    const badgeEl = document.getElementById("inspectorBadge");
    const titleEl = document.getElementById("inspectorTitle");
    const stackEl = document.getElementById("inspectorStack");
    const topologyCodeEl = document.getElementById("inspectorTopology");
    const dataFlowListEl = document.getElementById("inspectorDataFlow");
    const securityListEl = document.getElementById("inspectorSecurity");
    const specsGridEl = document.getElementById("inspectorSpecs");

    let lastFocusedElement = null;

    function openInspector(systemId) {
        const specs = window.ARCHITECTURE_SPECS && window.ARCHITECTURE_SPECS[systemId];
        if (!specs || !inspectorModal) return;

        lastFocusedElement = document.activeElement;

        // Populate content
        if (badgeEl) badgeEl.textContent = specs.badge || specs.category || "Architecture Spec";
        if (titleEl) titleEl.textContent = specs.title || "System Blueprint";
        if (stackEl) stackEl.textContent = specs.stack || "";
        if (topologyCodeEl) topologyCodeEl.textContent = specs.topology || "Topology diagram not available.";

        if (dataFlowListEl) {
            dataFlowListEl.innerHTML = "";
            (specs.dataFlow || []).forEach((step, idx) => {
                const li = document.createElement("li");
                const num = String(idx + 1).padStart(2, "0");
                li.innerHTML = `<span class="flow-step-num">${num}</span><div>${step}</div>`;
                dataFlowListEl.appendChild(li);
            });
        }

        if (securityListEl) {
            securityListEl.innerHTML = "";
            (specs.security || []).forEach((item) => {
                const li = document.createElement("li");
                li.textContent = item;
                securityListEl.appendChild(li);
            });
        }

        if (specsGridEl) {
            specsGridEl.innerHTML = "";
            const specEntries = Object.entries(specs.specs || {});
            specEntries.forEach(([key, val]) => {
                const div = document.createElement("div");
                div.className = "spec-item";
                div.innerHTML = `<dt>${key}</dt><dd>${val}</dd>`;
                specsGridEl.appendChild(div);
            });
        }

        // Reset to first tab (Topology)
        activateTab("topology");

        // Show modal
        inspectorModal.hidden = false;
        requestAnimationFrame(() => {
            inspectorModal.classList.add("is-open");
            document.body.style.overflow = "hidden";
            if (inspectorCloseBtn) inspectorCloseBtn.focus();
        });
    }

    function closeInspector() {
        if (!inspectorModal) return;
        inspectorModal.classList.remove("is-open");
        document.body.style.overflow = "";
        setTimeout(() => {
            inspectorModal.hidden = true;
            if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
                lastFocusedElement.focus();
            }
        }, 220);
    }

    function activateTab(tabKey) {
        inspectorTabs.forEach((tab) => {
            const isActive = tab.dataset.tab === tabKey;
            tab.classList.toggle("is-active", isActive);
            tab.setAttribute("aria-selected", String(isActive));
        });

        const panels = {
            topology: document.getElementById("tabPanelTopology"),
            dataFlow: document.getElementById("tabPanelDataFlow"),
            security: document.getElementById("tabPanelSecurity"),
            specs: document.getElementById("tabPanelSpecs"),
        };

        Object.entries(panels).forEach(([key, panel]) => {
            if (panel) {
                const isMatch = key === tabKey;
                panel.hidden = !isMatch;
                panel.classList.toggle("is-active", isMatch);
            }
        });
    }

    // Bind tab clicks
    inspectorTabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            activateTab(tab.dataset.tab);
        });
    });

    // Bind trigger buttons
    document.addEventListener("click", (e) => {
        const trigger = e.target.closest("[data-inspect]");
        if (trigger) {
            e.preventDefault();
            openInspector(trigger.dataset.inspect);
        }
    });

    if (inspectorCloseBtn) inspectorCloseBtn.addEventListener("click", closeInspector);
    if (inspectorDismissBtn) inspectorDismissBtn.addEventListener("click", closeInspector);
    if (inspectorBackdrop) inspectorBackdrop.addEventListener("click", closeInspector);

    window.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && inspectorModal && !inspectorModal.hidden) {
            closeInspector();
        }
    });
})();
