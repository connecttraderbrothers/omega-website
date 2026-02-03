// ============ CONFIGURATION ============
// Splash screen duration in seconds
const SPLASH_DURATION = 6;

// ============ DOM ELEMENTS ============
const splashScreen = document.getElementById('splash-screen');
const mainContent = document.getElementById('main-content');
const splashVideo = document.getElementById('splash-video');
const nav = document.querySelector('nav');
const contactModal = document.getElementById('contact-modal');
const contactForm = document.getElementById('contact-form');

// ============ SPLASH SCREEN ============
function endSplash() {
    if (splashScreen) {
        splashScreen.classList.add('hidden');
    }
    if (mainContent) {
        mainContent.classList.add('visible');
    }
    document.body.style.overflow = 'auto';
}

function initSplash() {
    // Prevent scrolling during splash
    document.body.style.overflow = 'hidden';

    if (splashVideo) {
        // End splash when video reaches 6 seconds
        splashVideo.addEventListener('timeupdate', () => {
            if (splashVideo.currentTime >= SPLASH_DURATION) {
                endSplash();
            }
        });

        // Fallback: end splash when video ends (in case video is shorter)
        splashVideo.addEventListener('ended', endSplash);

        // If video fails to load, end splash after the duration
        splashVideo.addEventListener('error', () => {
            console.warn('Splash video failed to load, ending splash screen');
            setTimeout(endSplash, 500);
        });

        // Ensure video plays (handle autoplay restrictions)
        const playPromise = splashVideo.play();
        if (playPromise !== undefined) {
            playPromise.catch(() => {
                // Autoplay was prevented, end splash immediately
                console.warn('Autoplay prevented, skipping splash');
                endSplash();
            });
        }
    } else {
        // No video element found, end splash after duration
        setTimeout(endSplash, SPLASH_DURATION * 1000);
    }
}

// ============ NAVIGATION ============
function initNavigation() {
    if (nav) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
            }
        });
    });
}

// ============ MODAL ============
function openModal() {
    if (contactModal) {
        contactModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    if (contactModal) {
        contactModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

function initModal() {
    // Close modal on outside click
    if (contactModal) {
        contactModal.addEventListener('click', (e) => {
            if (e.target.id === 'contact-modal') {
                closeModal();
            }
        });
    }

    // Close modal on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && contactModal?.classList.contains('active')) {
            closeModal();
        }
    });

    // Form submission
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // You can add your form handling logic here (e.g., send to API)
            alert('Thank you for your message! We\'ll be in touch soon.');
            closeModal();
            contactForm.reset();
        });
    }
}

// ============ SCROLL ANIMATIONS ============
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Animate service cards, stats, and process steps
    document.querySelectorAll('.service-card, .stat-item, .process-step').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ============ INITIALIZE ============
document.addEventListener('DOMContentLoaded', () => {
    initSplash();
    initNavigation();
    initModal();
    initScrollAnimations();
});

// Make modal functions globally available for onclick handlers
window.openModal = openModal;
window.closeModal = closeModal;
