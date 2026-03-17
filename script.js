// Sophisticated Portfolio JavaScript
// Minimal, Clean, Performance-Focused

(function() {
    'use strict';

    // ============================================
    // THEME TOGGLE
    // ============================================

    const initThemeToggle = () => {
        const savedTheme = localStorage.getItem('theme') || 'dark';
        document.documentElement.setAttribute('data-theme', savedTheme);

        const navMenu = document.querySelector('.nav-menu');
        const themeToggle = document.createElement('button');
        themeToggle.className = 'theme-toggle';
        themeToggle.setAttribute('aria-label', 'Toggle theme');
        themeToggle.innerHTML = savedTheme === 'light' ? '🌙' : '☀️';

        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            themeToggle.innerHTML = newTheme === 'light' ? '🌙' : '☀️';
        });

        navMenu.appendChild(themeToggle);
    };

    // ============================================
    // SMOOTH SCROLL
    // ============================================

    const initSmoothScroll = () => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                if (href === '#') return;

                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    };

    // ============================================
    // SCROLL REVEAL
    // ============================================

    const initScrollReveal = () => {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe all cards
        const elements = document.querySelectorAll('.project-card, .expertise-card, .timeline-item, .language-card');
        elements.forEach(el => observer.observe(el));
    };

    // ============================================
    // STAT COUNTER ANIMATION
    // ============================================

    const animateStats = () => {
        const stats = document.querySelectorAll('.stat-value');

        const observerOptions = {
            threshold: 0.5
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.dataset.animated) {
                    const target = entry.target;
                    const text = target.textContent;
                    const hasPlus = text.includes('+');
                    const hasPercent = text.includes('%');
                    const number = parseInt(text.replace(/[^0-9]/g, ''));

                    if (!isNaN(number)) {
                        animateValue(target, 0, number, 1200, hasPlus, hasPercent);
                        target.dataset.animated = 'true';
                    }
                }
            });
        }, observerOptions);

        stats.forEach(stat => observer.observe(stat));
    };

    const animateValue = (element, start, end, duration, hasPlus, hasPercent) => {
        const startTime = performance.now();

        const updateValue = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(start + (end - start) * easeOut);

            let displayText = current.toString();
            if (hasPlus) displayText += '+';
            if (hasPercent) displayText += '%';

            element.textContent = displayText;

            if (progress < 1) {
                requestAnimationFrame(updateValue);
            }
        };

        requestAnimationFrame(updateValue);
    };

    // ============================================
    // NAVIGATION SCROLL
    // ============================================

    const initNavScroll = () => {
        const nav = document.querySelector('.navigation');
        const navLinks = document.querySelectorAll('.nav-link:not(.nav-link-cta)');
        const sections = ['hero', 'work', 'projects', 'expertise', 'contact'].map(id => document.getElementById(id)).filter(Boolean);
        const sectionPill = document.getElementById('nav-section-pill');
        const sectionLabels = { hero: 'Home', work: 'Experience', projects: 'Projects', expertise: 'Expertise', contact: 'Contact' };

        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;

            // Nav background
            if (currentScroll > 100) {
                nav.style.background = 'rgba(0, 0, 0, 0.95)';
                nav.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
            } else {
                nav.style.background = 'rgba(0, 0, 0, 0.7)';
                nav.style.borderBottom = '1px solid rgba(255, 255, 255, 0.05)';
            }

            // Active nav link
            let current = '';
            sections.forEach(section => {
                if (currentScroll >= section.offsetTop - 200) {
                    current = section.id;
                }
            });
            navLinks.forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === '#' + current);
            });

            // Section pill indicator
            if (sectionPill) {
                if (currentScroll > 200 && current && current !== 'hero') {
                    sectionPill.textContent = sectionLabels[current] || current;
                    sectionPill.classList.add('visible');
                } else {
                    sectionPill.classList.remove('visible');
                }
            }
        });
    };

    // ============================================
    // SCROLL PROGRESS BAR
    // ============================================

    const initScrollProgress = () => {
        const bar = document.getElementById('scroll-progress');
        if (!bar) return;
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            bar.style.width = (docHeight > 0 ? (scrollTop / docHeight) * 100 : 0) + '%';
        });
    };

    // ============================================
    // BACK TO TOP BUTTON
    // ============================================

    const initBackToTop = () => {
        const btn = document.querySelector('.back-to-top');
        if (!btn) return;
        window.addEventListener('scroll', () => {
            btn.classList.toggle('visible', window.pageYOffset > 400);
        });
        btn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    };

    // ============================================
    // HAMBURGER MENU
    // ============================================

    const initHamburger = () => {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        if (!hamburger || !navMenu) return;

        hamburger.addEventListener('click', () => {
            const isOpen = hamburger.classList.toggle('open');
            navMenu.classList.toggle('open', isOpen);
            hamburger.setAttribute('aria-expanded', isOpen);
        });

        // Close on nav link click
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('open');
                navMenu.classList.remove('open');
                hamburger.setAttribute('aria-expanded', 'false');
            });
        });
    };

    // ============================================
    // KEYBOARD SHORTCUTS
    // ============================================

    const initKeyboardShortcuts = () => {
        document.addEventListener('keydown', (e) => {
            // Don't trigger if user is typing in an input
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

            const shortcuts = {
                'Escape': '#hero',
                '1': '#hero',
                '2': '#work',
                '3': '#projects',
                '4': '#expertise',
                '5': '#contact'
            };

            const section = shortcuts[e.key];
            if (section) {
                const element = document.querySelector(section);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }

            // T for theme toggle
            if (e.key === 't' || e.key === 'T') {
                const themeToggle = document.querySelector('.theme-toggle');
                if (themeToggle) themeToggle.click();
            }
        });
    };

    // ============================================
    // MOUSE SPOTLIGHT + CUSTOM CURSOR
    // ============================================

    const initMouseFX = () => {
        const spotlight = document.getElementById('spotlight');
        const dot = document.getElementById('cursor-dot');
        const ring = document.getElementById('cursor-ring');
        if (!spotlight && !dot) return;

        let ringX = 0, ringY = 0, dotX = 0, dotY = 0;
        let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            if (spotlight) {
                spotlight.style.left = mouseX + 'px';
                spotlight.style.top = mouseY + 'px';
            }
            if (dot) {
                dot.style.left = mouseX + 'px';
                dot.style.top = mouseY + 'px';
            }
        });

        // Ring follows with smooth lag
        const animateRing = () => {
            ringX += (mouseX - ringX) * 0.12;
            ringY += (mouseY - ringY) * 0.12;
            if (ring) {
                ring.style.left = ringX + 'px';
                ring.style.top = ringY + 'px';
            }
            requestAnimationFrame(animateRing);
        };
        animateRing();

        // Expand ring on clickable elements
        document.querySelectorAll('a, button, .project-card').forEach(el => {
            el.addEventListener('mouseenter', () => {
                if (ring) { ring.style.width = '48px'; ring.style.height = '48px'; ring.style.borderColor = 'var(--accent)'; }
            });
            el.addEventListener('mouseleave', () => {
                if (ring) { ring.style.width = '32px'; ring.style.height = '32px'; ring.style.borderColor = 'rgba(0,217,255,0.5)'; }
            });
        });

        document.addEventListener('mouseleave', () => {
            if (dot) dot.style.opacity = '0';
            if (ring) ring.style.opacity = '0';
        });
        document.addEventListener('mouseenter', () => {
            if (dot) dot.style.opacity = '1';
            if (ring) ring.style.opacity = '1';
        });
    };

    // ============================================
    // 3D CARD TILT
    // ============================================

    const initCardTilt = () => {
        document.querySelectorAll('.expertise-card, .stat-item').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width - 0.5;
                const y = (e.clientY - rect.top) / rect.height - 0.5;
                card.style.transform = `perspective(800px) rotateX(${-y * 8}deg) rotateY(${x * 8}deg) translateY(-4px)`;
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });
    };

    // ============================================
    // CONSOLE MESSAGE
    // ============================================

    const showConsoleMessage = () => {
        const styles = {
            title: 'color: #00D9FF; font-size: 24px; font-weight: bold;',
            subtitle: 'color: #a3a3a3; font-size: 14px;',
            line: 'color: #262626;',
            info: 'color: #737373;',
            link: 'color: #00D9FF;'
        };

        console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', styles.line);
        console.log('%c Ali Pourrahim', styles.title);
        console.log('%c Full-stack Developer & Lifelong Student', styles.subtitle);
        console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', styles.line);
        console.log('%c Open to: Programmer, IT Specialist & Python Developer roles', styles.info);
        console.log('%c GitHub: github.com/Aliipou', styles.link);
        console.log('%c LinkedIn: linkedin.com/in/ali-pourrahim', styles.link);
        console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', styles.line);
        console.log('%c Keyboard Shortcuts:', styles.subtitle);
        console.log('%c  ESC / 1 → Home', styles.info);
        console.log('%c  2 → Work Experience', styles.info);
        console.log('%c  3 → Projects', styles.info);
        console.log('%c  4 → Expertise', styles.info);
        console.log('%c  5 → Contact', styles.info);
        console.log('%c  T → Toggle Theme', styles.info);
    };

    // ============================================
    // PERFORMANCE MONITORING
    // ============================================

    const logPerformance = () => {
        if ('performance' in window) {
            window.addEventListener('load', () => {
                setTimeout(() => {
                    const perfData = window.performance.timing;
                    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;

                    const emoji = pageLoadTime < 1000 ? '🚀' : pageLoadTime < 2000 ? '⚡' : '✓';
                    console.log(`%c${emoji} Portfolio loaded in ${pageLoadTime}ms`, 'color: #00D9FF; font-weight: bold;');
                }, 0);
            });
        }
    };

    // ============================================
    // PROFILE PHOTO INTERACTIONS
    // ============================================

    const initProfileInteractions = () => {
        const profileContainer = document.querySelector('.profile-image-container');
        const glassesIcon = document.querySelector('.developer-icon');

        if (!profileContainer || !glassesIcon) return;

        // Add subtle tilt effect on mouse move
        document.addEventListener('mousemove', (e) => {
            const rect = profileContainer.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const angleX = (e.clientY - centerY) / 30;
            const angleY = (centerX - e.clientX) / 30;

            profileContainer.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
        });

        // Reset transform when mouse leaves
        document.addEventListener('mouseleave', () => {
            profileContainer.style.transform = '';
        });
    };

    // ============================================
    // TYPEWRITER EFFECT
    // ============================================

    const initTypewriter = () => {
        const el = document.getElementById('typewriter-text');
        if (!el) return;

        const phrases = [
            'Full-stack Developer',
            'Cloud Engineer',
            'Python & Go Developer',
            'AI/NLP Specialist'
        ];
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        const typingSpeed = 70;
        const deletingSpeed = 35;
        const pauseAfterType = 2000;
        const pauseAfterDelete = 400;

        const tick = () => {
            const currentPhrase = phrases[phraseIndex];
            if (!isDeleting) {
                el.textContent = currentPhrase.slice(0, charIndex + 1);
                charIndex++;
                if (charIndex === currentPhrase.length) {
                    isDeleting = true;
                    setTimeout(tick, pauseAfterType);
                    return;
                }
                setTimeout(tick, typingSpeed);
            } else {
                el.textContent = currentPhrase.slice(0, charIndex - 1);
                charIndex--;
                if (charIndex === 0) {
                    isDeleting = false;
                    phraseIndex = (phraseIndex + 1) % phrases.length;
                    setTimeout(tick, pauseAfterDelete);
                    return;
                }
                setTimeout(tick, deletingSpeed);
            }
        };

        tick();
    };

    // ============================================
    // TIMELINE REVEAL (LEFT FADE-IN)
    // ============================================

    const initTimelineReveal = () => {
        const items = document.querySelectorAll('.timeline-item');
        if (!items.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

        items.forEach(item => observer.observe(item));
    };

    // ============================================
    // INITIALIZE ALL
    // ============================================

    const init = () => {
        initThemeToggle();
        initSmoothScroll();
        initScrollReveal();
        animateStats();
        initNavScroll();
        initScrollProgress();
        initBackToTop();
        initHamburger();
        initKeyboardShortcuts();
        initProfileInteractions();
        initMouseFX();
        initCardTilt();
        initTypewriter();
        initTimelineReveal();
        showConsoleMessage();
        logPerformance();
    };

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
