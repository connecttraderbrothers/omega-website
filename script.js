// ============ CONFIGURATION ============
const SPLASH_DURATION = 6; // seconds

// ============ SPLASH SCREEN ============
function endSplash() {
    const splashScreen = document.getElementById('splash-screen');
    const mainContent = document.getElementById('main-content');
    const splashVideo = document.getElementById('splash-video');
    
    // Stop the video
    if (splashVideo) {
        splashVideo.pause();
    }
    
    // Hide splash screen
    if (splashScreen) {
        splashScreen.classList.add('hidden');
    }
    
    // Show main content with fade in
    if (mainContent) {
        mainContent.classList.add('visible');
    }
    
    // Re-enable scrolling
    document.body.style.overflow = 'auto';
}

function forceVideoPlay(video) {
    // Multiple attempts to play the video
    const playVideo = () => {
        video.muted = true; // Ensure muted (required for autoplay)
        
        const playPromise = video.play();
        
        if (playPromise !== undefined) {
            playPromise.then(() => {
                console.log('Video playing successfully');
            }).catch((error) => {
                console.log('Play attempt failed, retrying...', error);
                // Retry after a short delay
                setTimeout(() => {
                    video.play().catch(e => console.log('Retry failed:', e));
                }, 100);
            });
        }
    };
    
    // Try to play immediately
    playVideo();
    
    // Also try on user interaction (backup for strict browsers)
    const playOnInteraction = () => {
        playVideo();
        document.removeEventListener('click', playOnInteraction);
        document.removeEventListener('touchstart', playOnInteraction);
        document.removeEventListener('scroll', playOnInteraction);
    };
    
    document.addEventListener('click', playOnInteraction, { once: true });
    document.addEventListener('touchstart', playOnInteraction, { once: true });
    document.addEventListener('scroll', playOnInteraction, { once: true });
}

function initSplash() {
    const splashVideo = document.getElementById('splash-video');
    
    // Prevent scrolling during splash
    document.body.style.overflow = 'hidden';
    
    // Set a guaranteed timer to end splash after 6 seconds
    const splashTimer = setTimeout(() => {
        endSplash();
    }, SPLASH_DURATION * 1000);
    
    if (splashVideo) {
        // Ensure video attributes are set
        splashVideo.muted = true;
        splashVideo.playsInline = true;
        splashVideo.autoplay = true;
        
        // Remove any controls
        splashVideo.controls = false;
        splashVideo.removeAttribute('controls');
        
        // Wait for video to be ready, then force play
        if (splashVideo.readyState >= 2) {
            // Video is already loaded enough
            forceVideoPlay(splashVideo);
        } else {
            // Wait for video to load
            splashVideo.addEventListener('loadeddata', () => {
                forceVideoPlay(splashVideo);
            });
            
            // Also try on canplay
            splashVideo.addEventListener('canplay', () => {
                forceVideoPlay(splashVideo);
            });
        }
        
        // End when video ends (backup)
        splashVideo.addEventListener('ended', () => {
            clearTimeout(splashTimer);
            endSplash();
        });
    }
}

// ============ NAVIGATION ============
function initNavigation() {
    const nav = document.querySelector('nav');
    
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
    const contactModal = document.getElementById('contact-modal');
    if (contactModal) {
        contactModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    const contactModal = document.getElementById('contact-modal');
    if (contactModal) {
        contactModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

function initModal() {
    const contactModal = document.getElementById('contact-modal');
    const contactForm = document.getElementById('contact-form');
    
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
        if (e.key === 'Escape') {
            closeModal();
        }
    });

    // Form submission
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
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

    document.querySelectorAll('.service-card, .stat-item, .process-step').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ============ INITIALIZE ============
// Start as early as possible
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initSplash();
        initNavigation();
        initModal();
        initScrollAnimations();
    });
} else {
    // DOM already loaded
    initSplash();
    initNavigation();
    initModal();
    initScrollAnimations();
}

// Make modal functions globally available
window.openModal = openModal;
window.closeModal = closeModal;
