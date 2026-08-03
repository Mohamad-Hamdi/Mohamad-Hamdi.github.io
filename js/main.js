document.addEventListener("DOMContentLoaded", () => {
    // 1. Core State
    let currentLang = localStorage.getItem("portfolio_lang") || "ar";
    let currentTheme = localStorage.getItem("portfolio_theme") || "dark";
    const data = loadData();

    // 2. DOM Elements
    const htmlEl = document.documentElement;
    const langToggle = document.getElementById("lang-toggle");
    const langLabel = document.getElementById("lang-label");
    const themeToggle = document.getElementById("theme-toggle");
    const themeIcon = document.getElementById("theme-icon");
    const navbar = document.getElementById("navbar");
    const menuToggle = document.getElementById("menu-toggle");
    const menuIcon = document.getElementById("menu-icon");
    const header = document.getElementById("header");
    const scrollTopBtn = document.getElementById("scroll-top");
    const scrollProgress = document.getElementById("scroll-progress");

    // Modals
    const projectModal = document.getElementById("project-modal");
    const modalClose = document.getElementById("modal-close");
    const modalBody = document.getElementById("modal-body");

    // Init
    function init() {
        initTheme();
        initLang();
        renderAll();
        initMobileMenu();
        initScrollEffects();
        initContactForm();
        initModal();
    }

    // --- 1. LANGUAGE SYSTEM ---
    function initLang() {
        setLang(currentLang);
        langToggle.addEventListener("click", () => {
            currentLang = currentLang === "ar" ? "en" : "ar";
            localStorage.setItem("portfolio_lang", currentLang);
            setLang(currentLang);
            renderAll();
        });
    }

    function setLang(lang) {
        htmlEl.lang = lang;
        htmlEl.dir = lang === "ar" ? "rtl" : "ltr";
        langLabel.textContent = lang === "ar" ? "EN" : "AR";
        document.body.style.fontFamily = lang === "en" ? "'Inter', sans-serif" : "'Cairo', sans-serif";
    }

    // --- 2. THEME SYSTEM ---
    function initTheme() {
        setTheme(currentTheme);
        themeToggle.addEventListener("click", () => {
            currentTheme = currentTheme === "dark" ? "light" : "dark";
            localStorage.setItem("portfolio_theme", currentTheme);
            setTheme(currentTheme);
        });
    }

    function setTheme(theme) {
        htmlEl.setAttribute("data-theme", theme);
        themeIcon.className = theme === "dark" ? "bx bx-moon" : "bx bx-sun";
    }

    // --- RENDER ALL ---
    function renderAll() {
        renderNavbar();
        renderHero();
        renderAbout();
        renderEducation();
        renderExperience();
        renderSkills();
        renderProjects();
        renderContact();
        renderCustomSections();
        renderFooter();
        // Re-initialize animations and typing since DOM changed
        initTypingEffect();
        initStatCounters();
        initTiltEffect();
        initScrollAnimations();
    }

    // --- 3. NAVBAR RENDERING ---
    function renderNavbar() {
        navbar.innerHTML = data.ui.navItems.map(item => `
            <a href="#${item.id}" class="nav-link">${getText(item.label, currentLang)}</a>
        `).join("");
        
        // Active link highlighting
        const navLinks = document.querySelectorAll(".nav-link");
        const sections = document.querySelectorAll("section");
        
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    navLinks.forEach(link => {
                        link.classList.toggle("active", link.getAttribute("href").substring(1) === entry.target.id);
                    });
                }
            });
        }, { threshold: 0.5 });
        
        sections.forEach(sec => observer.observe(sec));
    }

    // --- 4. MOBILE MENU ---
    function initMobileMenu() {
        menuToggle.addEventListener("click", () => {
            navbar.classList.toggle("active");
            const isOpen = navbar.classList.contains("active");
            menuIcon.className = isOpen ? "bx bx-x" : "bx bx-menu";
        });

        // Close on link click
        navbar.addEventListener("click", (e) => {
            if (e.target.classList.contains("nav-link")) {
                navbar.classList.remove("active");
                menuIcon.className = "bx bx-menu";
            }
        });

        // Close on scroll
        window.addEventListener("scroll", () => {
            if (navbar.classList.contains("active")) {
                navbar.classList.remove("active");
                menuIcon.className = "bx bx-menu";
            }
        });
    }

    // --- 5. HERO SECTION ---
    function renderHero() {
        document.getElementById("hero-greeting").textContent = currentLang === "ar" ? "مرحبًا، أنا" : "Hi, I am";
        document.getElementById("hero-name").textContent = getText(data.personal.name, currentLang);
        const heroBadgeText = document.getElementById("hero-badge-text");
        if (heroBadgeText) heroBadgeText.textContent = getText(data.personal.title, currentLang);
        document.getElementById("hero-desc").textContent = getText(data.about.text, currentLang);
        
        document.getElementById("typing-prefix").textContent = currentLang === "ar" ? "أنا" : "I'm a";
        
        document.getElementById("hero-cta-contact").innerHTML = `<i class="bx bx-envelope"></i><span>${getText(data.ui.heroCTA.contact, currentLang)}</span>`;
        
        const cvBtn = document.getElementById("hero-cta-cv");
        cvBtn.innerHTML = `<i class="bx bx-download"></i><span>${getText(data.ui.heroCTA.cv, currentLang)}</span>`;
        cvBtn.href = data.personal.cvFile || "#";
        
        const socialHTML = Object.entries(data.personal.social).map(([platform, url]) => {
            let icon = "bx-link";
            if(platform === "facebook") icon = "bxl-facebook";
            if(platform === "linkedin") icon = "bxl-linkedin";
            if(platform === "github") icon = "bxl-github";
            if(platform === "whatsapp") icon = "bxl-whatsapp";
            return `<a href="${url}" class="social-link" target="_blank"><i class="bx ${icon}"></i></a>`;
        }).join("");
        document.getElementById("hero-social").innerHTML = socialHTML;
    }

    // --- 18. TYPING EFFECT ---
    let typingTimeout;
    function initTypingEffect() {
        clearTimeout(typingTimeout);
        const typingEl = document.getElementById("typing-text");
        const texts = data.ui.heroTexts[currentLang];
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            if (!typingEl) return;
            const currentText = texts[textIndex];
            if (isDeleting) {
                typingEl.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingEl.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = isDeleting ? 40 : 80;

            if (!isDeleting && charIndex === currentText.length) {
                typeSpeed = 2000; // pause at end
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typeSpeed = 500; // pause before typing next
            }

            typingTimeout = setTimeout(type, typeSpeed);
        }
        typingEl.textContent = "";
        type();
    }

    // --- 6. ABOUT SECTION ---
    function renderAbout() {
        document.getElementById("about-title").innerHTML = getText(data.ui.sectionTitles.about, currentLang);
        document.getElementById("about-text").textContent = getText(data.about.text, currentLang);
        
        const statsHtml = data.about.stats.map(stat => {
            return `
                <div class="stat-card glass-card reveal-up">
                    <i class="bx ${stat.icon}"></i>
                    <h3 class="stat-value" data-target="${stat.value}">${currentLang === 'ar' ? '0' : '0'}</h3>
                    <p class="stat-label">${getText(stat.label, currentLang)}</p>
                </div>
            `;
        }).join("");
        document.getElementById("stats-grid").innerHTML = statsHtml;
    }

    // --- 17. STAT COUNTERS ---
    function initStatCounters() {
        const stats = document.querySelectorAll(".stat-value");
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const targetEl = entry.target;
                    const targetText = targetEl.getAttribute("data-target");
                    const targetNum = parseInt(targetText.replace(/[^0-9]/g, '')) || 0;
                    const suffix = targetText.replace(/[0-9]/g, '');
                    
                    let startNum = 0;
                    const duration = 2000;
                    const startTime = performance.now();
                    
                    function updateCounter(currentTime) {
                        const elapsedTime = currentTime - startTime;
                        const progress = Math.min(elapsedTime / duration, 1);
                        const currentVal = Math.floor(progress * targetNum);
                        targetEl.textContent = currentVal + suffix;
                        
                        if (progress < 1) {
                            requestAnimationFrame(updateCounter);
                        } else {
                            targetEl.textContent = targetText;
                        }
                    }
                    requestAnimationFrame(updateCounter);
                    observer.unobserve(targetEl);
                }
            });
        }, { threshold: 0.5 });
        
        stats.forEach(stat => observer.observe(stat));
    }

    // --- 7. EDUCATION TIMELINE ---
    function renderEducation() {
        document.getElementById("education-title").innerHTML = getText(data.ui.sectionTitles.education, currentLang);
        const timeline = document.getElementById("education-timeline");
        
        const contentHTML = data.education.map(item => {
            const iconHtml = item.image 
                ? `<img src="${item.image}" alt="Icon" onerror="this.style.display='none'" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">` 
                : `<i class="bx ${item.icon}"></i>`;
            return `
            <div class="timeline-item reveal-up">
                <div class="timeline-dot">${iconHtml}</div>
                <div class="timeline-card glass-card">
                    <span class="timeline-date">${getText(item.period, currentLang)}</span>
                    <h3>${getText(item.degree, currentLang)}</h3>
                    <p>${getText(item.institution, currentLang)}</p>
                    <p>${getText(item.description, currentLang)}</p>
                </div>
            </div>
            `;
        }).join("");
        
        timeline.innerHTML = '<div class="timeline-progress"></div>' + contentHTML;
        
        // Add lines
        const items = timeline.querySelectorAll('.timeline-item');
        if(items.length > 0) {
            const line = document.createElement('div');
            line.className = 'timeline-line';
            timeline.prepend(line);
        }
    }

    // --- 8. EXPERIENCE SECTION ---
    function renderExperience() {
        document.getElementById("experience-title").innerHTML = getText(data.ui.sectionTitles.experience, currentLang);
        
        const timeline = document.getElementById("experience-timeline");
        
        const contentHTML = data.experience.map(item => {
            const iconHtml = item.image 
                ? `<img src="${item.image}" alt="Icon" onerror="this.style.display='none'" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">` 
                : `<i class="bx ${item.icon}"></i>`;
            const detailsList = getText(item.details, currentLang).map(d => `<li>${d}</li>`).join("");
            return `
            <div class="timeline-item reveal-up">
                <div class="timeline-dot">${iconHtml}</div>
                <div class="timeline-card glass-card">
                    <span class="timeline-date">${getText(item.period, currentLang)}</span>
                    <h3>${getText(item.title, currentLang)}</h3>
                    <p>${getText(item.description, currentLang)}</p>
                    <ul class="exp-details" style="margin-top: 10px; display: block;">${detailsList}</ul>
                </div>
            </div>
            `;
        }).join("");
        
        timeline.innerHTML = '<div class="timeline-progress"></div>' + contentHTML;
    }

    // --- 9. SKILLS SECTION ---
    function renderSkills() {
        document.getElementById("skills-title").innerHTML = getText(data.ui.sectionTitles.skills, currentLang);
        
        const container = document.getElementById("skills-container");
        container.innerHTML = "";
        
        const cats = [
            { id: "languages", data: data.skills.languages },
            { id: "backend", data: data.skills.backend },
            { id: "tools", data: data.skills.tools }
        ];

        cats.forEach((cat, index) => {
            const title = getText(data.ui.skillCategoryTitles[cat.id], currentLang);
            const tags = cat.data.map((skill, i) => `
                <div class="skill-tag" style="transition-delay: ${i * 50}ms">
                    <i class="bx ${skill.icon}" style="color: ${skill.color || 'var(--accent-1)'};"></i><span>${skill.name}</span>
                </div>
            `).join("");
            
            container.innerHTML += `
                <div class="skill-category reveal-up" data-delay="${index}">
                    <h3 class="skill-category-title">${title}</h3>
                    <div class="skill-tags">${tags}</div>
                </div>
            `;
        });
    }

    // --- 10. PROJECTS SECTION & 3D TILT ---
    function renderProjects() {
        document.getElementById("projects-title").innerHTML = getText(data.ui.sectionTitles.projects, currentLang);
        
        const grid = document.getElementById("projects-grid");
        
        const sortedProjects = [...data.projects].sort((a, b) => b.featured - a.featured);
        
        grid.innerHTML = sortedProjects.map((proj, i) => {
            const imgHtml = proj.image ? `
                <div class="project-card-image">
                    <img src="${proj.image}" alt="">
                    <div class="project-card-overlay"></div>
                </div>
            ` : "";
            
            const techHtml = proj.techStack.map(t => `<span class="tech-tag">${t}</span>`).join("");
            
            return `
                <div class="project-card glass-card reveal-up ${proj.featured ? 'featured' : ''}" data-delay="${i}">
                    ${imgHtml}
                    <div class="project-card-body">
                        <h3 class="project-card-title">${getText(proj.title, currentLang)}</h3>
                        <p class="project-card-subtitle">${getText(proj.subtitle, currentLang)}</p>
                        <p class="project-card-desc">${getText(proj.description, currentLang)}</p>
                        <div class="project-tech-stack">${techHtml}</div>
                        <div class="project-card-actions">
                            ${proj.liveLink ? `<a href="${proj.liveLink}" class="btn btn-outline project-link" target="_blank"><i class="bx bx-link-external"></i> ${currentLang === 'ar' ? 'معاينة' : 'Live'}</a>` : ''}
                            ${proj.githubLink ? `<a href="${proj.githubLink}" class="btn btn-outline project-link" target="_blank"><i class="bx bxl-github"></i> ${currentLang === 'ar' ? 'الكود' : 'Code'}</a>` : ''}
                            <button class="btn btn-primary project-card-expand" data-project-id="${proj.id}"><i class="bx bx-expand-alt"></i> ${currentLang === 'ar' ? 'التفاصيل' : 'Details'}</button>
                        </div>
                    </div>
                </div>
            `;
        }).join("");
    }

    function initTiltEffect() {
        const cards = document.querySelectorAll('.project-card');
        cards.forEach(card => {
            card.addEventListener('mousemove', e => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = ((y - centerY) / centerY) * -10;
                const rotateY = ((x - centerX) / centerX) * 10;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            });
        });
    }

    // --- 11. PROJECT MODAL ---
    function initModal() {
        document.addEventListener("click", e => {
            const expandBtn = e.target.closest(".project-card-expand");
            if (expandBtn) {
                const projId = expandBtn.getAttribute("data-project-id");
                const proj = data.projects.find(p => p.id === projId);
                if (proj) openModal(proj);
            }
        });

        modalClose.addEventListener("click", closeModal);
        projectModal.addEventListener("click", e => {
            if (e.target === projectModal) closeModal();
        });
        document.addEventListener("keydown", e => {
            if (e.key === "Escape" && projectModal.classList.contains("active")) closeModal();
        });
    }

    function openModal(proj) {
        document.body.style.overflow = "hidden";
        projectModal.classList.add("active");
        
        const detailsList = getText(proj.details, currentLang).map(d => `<li>${d}</li>`).join("");
        const techHtml = proj.techStack.map(t => `<span class="tech-tag">${t}</span>`).join("");
        
        modalBody.innerHTML = `
            ${proj.image ? `<img src="${proj.image}" alt="" style="width:100%; border-radius:8px; margin-bottom:1rem;">` : ''}
            <h2>${getText(proj.title, currentLang)}</h2>
            <h4 style="color: var(--primary-color); margin-bottom: 1rem;">${getText(proj.subtitle, currentLang)}</h4>
            <p>${getText(proj.description, currentLang)}</p>
            <ul style="margin: 1rem 0; padding-inline-start: 1.5rem; text-align: start;">${detailsList}</ul>
            <div class="project-tech-stack" style="margin-bottom: 1.5rem;">${techHtml}</div>
            <div style="display: flex; gap: 1rem;">
                ${proj.liveLink ? `<a href="${proj.liveLink}" class="btn btn-primary" target="_blank"><i class="bx bx-link-external"></i> ${currentLang === 'ar' ? 'عرض مباشر' : 'Live Demo'}</a>` : ''}
                ${proj.githubLink ? `<a href="${proj.githubLink}" class="btn btn-glass" target="_blank"><i class="bx bxl-github"></i> Github</a>` : ''}
            </div>
        `;
    }

    function closeModal() {
        document.body.style.overflow = "";
        projectModal.classList.remove("active");
    }

    // --- 12. CONTACT SECTION ---
    function renderContact() {
        document.getElementById("contact-title").innerHTML = getText(data.ui.sectionTitles.contact, currentLang);
        
        document.getElementById("contact-email-label").textContent = currentLang === "ar" ? "البريد الإلكتروني" : "Email";
        document.getElementById("contact-email-link").textContent = data.personal.email;
        document.getElementById("contact-email-link").href = `mailto:${data.personal.email}`;
        
        document.getElementById("contact-phone-label").textContent = currentLang === "ar" ? "الهاتف" : "Phone";
        document.getElementById("contact-phone-link").textContent = data.personal.phone;
        document.getElementById("contact-phone-link").href = `tel:${data.personal.phone.replace(/\\s+/g, '')}`;
        
        document.getElementById("form-name-label").textContent = getText(data.ui.contactForm.nameLabel, currentLang);
        document.getElementById("form-email-label").textContent = getText(data.ui.contactForm.emailLabel, currentLang);
        document.getElementById("form-message-label").textContent = getText(data.ui.contactForm.messageLabel, currentLang);
        document.getElementById("form-submit-btn").innerHTML = `<i class="bx bx-send"></i><span>${getText(data.ui.contactForm.sendBtn, currentLang)}</span>`;
    }

    function initContactForm() {
        const inputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
        inputs.forEach(input => {
            if(input.value.trim() !== "") input.classList.add("has-value");
            
            input.addEventListener('focus', () => {
                input.classList.add('has-value');
            });
            
            input.addEventListener('blur', () => {
                if (input.value.trim() === '') {
                    input.classList.remove('has-value');
                }
            });
        });
    }

    // --- 13. CUSTOM SECTIONS ---
    function renderCustomSections() {
        const container = document.getElementById("custom-sections-container");
        container.innerHTML = data.customSections.map(sec => `
            <section class="section custom-section">
                <h2 class="section-title reveal-up">${getText(sec.title, currentLang)}</h2>
                <div class="custom-section-content reveal-up">
                    ${getText(sec.content, currentLang)}
                </div>
            </section>
        `).join("");
    }

    // --- 14. FOOTER ---
    // --- 14. FOOTER ---
    function renderFooter() {
        const copyrightEl = document.getElementById("footer-copyright");
        if(copyrightEl) {
            copyrightEl.textContent = `© ${new Date().getFullYear()} ${getText(data.personal.name, currentLang)} — ${getText(data.ui.footer.text, currentLang)}`;
        }
        
        const socialEl = document.getElementById("footer-social");
        if(socialEl) {
            const socialHTML = Object.entries(data.personal.social).map(([platform, url]) => {
                let icon = "bx-link";
                if(platform === "facebook") icon = "bxl-facebook";
                if(platform === "linkedin") icon = "bxl-linkedin";
                if(platform === "github") icon = "bxl-github";
                if(platform === "whatsapp") icon = "bxl-whatsapp";
                return `<a href="${url}" class="social-link" target="_blank"><i class="bx ${icon}"></i></a>`;
            }).join("");
            socialEl.innerHTML = socialHTML;
        }
    }

    // --- 15 & 16. SCROLL ANIMATIONS & HEADER/PROGRESS ---
    function initScrollEffects() {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 50) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }
            
            const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollPos = window.scrollY;
            const percent = (scrollPos / docHeight) * 100;
            if(scrollProgress) scrollProgress.style.width = `${percent}%`;
            
            if (window.scrollY > 500) {
                scrollTopBtn.classList.add("active");
            } else {
                scrollTopBtn.classList.remove("active");
            }
            
            // Timeline progress scroll animation
            document.querySelectorAll(".timeline").forEach(timeline => {
                const progress = timeline.querySelector(".timeline-progress");
                if(progress) {
                    const rect = timeline.getBoundingClientRect();
                    const windowHeight = window.innerHeight;
                    let startY = rect.top - (windowHeight / 2);
                    let heightPx = -startY;
                    if(heightPx < 0) heightPx = 0;
                    if(heightPx > rect.height) heightPx = rect.height;
                    progress.style.height = `${heightPx}px`;
                }
            });
        });
        
        scrollTopBtn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    function initScrollAnimations() {
        const revealElements = document.querySelectorAll(".reveal-up, .reveal-left, .reveal-right");
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const delay = entry.target.getAttribute("data-delay");
                    if (delay) {
                        entry.target.style.transitionDelay = `${delay * 100}ms`;
                    }
                    entry.target.classList.add("revealed");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
        
        revealElements.forEach(el => observer.observe(el));
    }

    // START
    init();
});
