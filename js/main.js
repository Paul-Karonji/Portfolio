(function () {
    const toggle = document.querySelector(".nav-toggle");
    const navLinks = document.querySelector("#navLinks");
    const navItems = document.querySelectorAll(".nav-links a");
    const sections = [...document.querySelectorAll("main section[id]")];
    const projectButtons = document.querySelectorAll("[data-project-target]");
    const projectPanels = document.querySelectorAll("[data-project-view]");

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

    if (projectButtons.length && projectPanels.length) {
        projectButtons.forEach((button) => {
            button.addEventListener("click", () => {
                const target = button.dataset.projectTarget;

                projectButtons.forEach((item) => {
                    const isActive = item === button;
                    item.classList.toggle("is-active", isActive);
                    item.setAttribute("aria-pressed", String(isActive));
                });

                projectPanels.forEach((panel) => {
                    const isActive = panel.dataset.projectView === target;
                    panel.hidden = !isActive;
                    panel.classList.toggle("is-active", isActive);
                });
            });
        });
    }
})();
