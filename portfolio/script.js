/**
 * Daniel Huie Portfolio - Interactive Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    initNavigation();
    initCaseStudyFilters();
    initScrollReveal();
    initSmoothScroll();
});

/**
 * Mobile Navigation Toggle
 */
function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (!navToggle || !navLinks) return;

    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('nav-open');
        navToggle.classList.toggle('nav-toggle-active');
    });

    // Close mobile nav when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('nav-open');
            navToggle.classList.remove('nav-toggle-active');
        });
    });

    // Add scroll behavior to nav
    let lastScroll = 0;
    const nav = document.querySelector('.nav');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            nav.classList.add('nav-scrolled');
        } else {
            nav.classList.remove('nav-scrolled');
        }

        lastScroll = currentScroll;
    });
}

/**
 * Case Study Category Filters
 */
function initCaseStudyFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const caseStudies = document.querySelectorAll('.case-study');

    if (!filterButtons.length || !caseStudies.length) return;

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Get filter category
            const filterValue = button.dataset.filter;

            // Filter case studies
            caseStudies.forEach(caseStudy => {
                const category = caseStudy.dataset.category;

                if (filterValue === 'all' || category === filterValue) {
                    caseStudy.style.display = 'grid';
                    setTimeout(() => {
                        caseStudy.style.opacity = '1';
                        caseStudy.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    caseStudy.style.opacity = '0';
                    caseStudy.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        caseStudy.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

/**
 * Scroll Reveal Animations
 */
function initScrollReveal() {
    const revealElements = document.querySelectorAll(
        '.case-study, .value-prop, .process-step, .testimonial-card, .gallery-item'
    );

    if (!revealElements.length) return;

    // Add reveal class to all elements
    revealElements.forEach(el => {
        el.classList.add('reveal');
    });

    // Intersection Observer for reveal animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(el => observer.observe(el));
}

/**
 * Smooth Scroll for Anchor Links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;

            const navHeight = document.querySelector('.nav').offsetHeight;
            const targetPosition = targetElement.offsetTop - navHeight - 20;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });
}

/**
 * Lazy Load Images (optional enhancement)
 */
function initLazyLoad() {
    const images = document.querySelectorAll('img[data-src]');

    if (!images.length || !('IntersectionObserver' in window)) {
        // Fallback: load all images immediately
        images.forEach(img => {
            img.src = img.dataset.src;
        });
        return;
    }

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

/**
 * Gallery Lightbox (optional - can be enhanced with a library)
 */
function initGalleryLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            if (!img) return;

            // Create lightbox overlay
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            lightbox.innerHTML = `
                <div class="lightbox-content">
                    <img src="${img.src}" alt="${img.alt}">
                    <button class="lightbox-close">&times;</button>
                </div>
            `;

            document.body.appendChild(lightbox);
            document.body.style.overflow = 'hidden';

            // Close on click
            lightbox.addEventListener('click', (e) => {
                if (e.target === lightbox || e.target.classList.contains('lightbox-close')) {
                    lightbox.remove();
                    document.body.style.overflow = '';
                }
            });

            // Close on Escape
            document.addEventListener('keydown', function closeOnEscape(e) {
                if (e.key === 'Escape') {
                    lightbox.remove();
                    document.body.style.overflow = '';
                    document.removeEventListener('keydown', closeOnEscape);
                }
            });
        });
    });
}
