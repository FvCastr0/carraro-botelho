// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
    // Register GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Initial Hero Animation Sequence
    const heroTl = gsap.timeline();

    heroTl.to(".hero-bg.reveal-fade", {
        opacity: 1,
        duration: 1.5,
        ease: "power2.out"
    })
    .to(".hero-accent.reveal-up", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out"
    }, "-=0.5")
    .to(".hero-title.reveal-up", {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out"
    }, "-=0.6")
    .to(".hero-subtitle.reveal-up", {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out"
    }, "-=0.8")
    .to(".hero-actions.reveal-up", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out"
    }, "-=0.8");

    // Scroll Animations for Sections
    
    // Select all elements with reveal-up class that aren't in the hero section
    const revealElements = document.querySelectorAll("section:not(.hero) .reveal-up");
    
    revealElements.forEach((element) => {
        // Simple stagger based on data-delay attribute or transition-delay style
        let delay = 0;
        if(element.dataset.delay) {
            delay = parseFloat(element.dataset.delay);
        } else if(element.style.transitionDelay) {
            delay = parseFloat(element.style.transitionDelay) / 1000;
        }

        gsap.to(element, {
            scrollTrigger: {
                trigger: element,
                start: "top 85%", // Animation starts when element top is 85% down the viewport
                toggleActions: "play none none reverse"
            },
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: delay,
            ease: "power3.out"
        });
    });

    // Header Blur Effect on Scroll
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(19, 19, 19, 0.85)';
            header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
        } else {
            header.style.background = 'rgba(19, 19, 19, 0.6)';
            header.style.boxShadow = 'none';
        }
    });

    // Smooth Scrolling for Nav Links
    document.querySelectorAll('.nav-link[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return; // Skip if it's just '#'
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
                
                // Update active state
                document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
                this.classList.add('active');

                // Close mobile menu if open
                const navLinks = document.querySelector('.nav-links');
                const menuToggleIcon = document.querySelector('.menu-toggle .material-symbols-outlined');
                if(navLinks && navLinks.classList.contains('mobile-menu-open')) {
                    navLinks.classList.remove('mobile-menu-open');
                    if(menuToggleIcon) menuToggleIcon.textContent = 'menu';
                }
            }
        });
    });

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinksContainer = document.querySelector('.nav-links');
    const menuToggleIcon = document.querySelector('.menu-toggle .material-symbols-outlined');

    if (menuToggle && navLinksContainer) {
        menuToggle.addEventListener('click', () => {
            navLinksContainer.classList.toggle('mobile-menu-open');
            
            // Toggle Icon
            if (navLinksContainer.classList.contains('mobile-menu-open')) {
                menuToggleIcon.textContent = 'close';
            } else {
                menuToggleIcon.textContent = 'menu';
            }
        });
    }
});
