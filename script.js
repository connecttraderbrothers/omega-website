// ============ CONFIGURATION ============
const SPLASH_DURATION = 6; // seconds

// ============ SPLASH SCREEN ============
let splashEnded = false;

function endSplash() {
    if (splashEnded) return; // Prevent multiple calls
    splashEnded = true;
    
    const splashScreen = document.getElementById('splash-screen');
    const mainContent = document.getElementById('main-content');
    const splashVideo = document.getElementById('splash-video');
    
    // Stop the video
    if (splashVideo) {
        splashVideo.pause();
        splashVideo.currentTime = 0;
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

function playVideo(video) {
    // Ensure all autoplay-required attributes are set
    video.muted = true;
    video.playsInline = true;
    video.autoplay = true;
    video.controls = false;
    video.removeAttribute('controls');
    
    // Try to play
    const playPromise = video.play();
    
    if (playPromise !== undefined) {
        playPromise.then(() => {
            console.log('✓ Video autoplay started successfully');
        }).catch((error) => {
            console.log('Autoplay blocked, trying again...', error.message);
            // Try again after a tiny delay
            setTimeout(() => {
                video.play().catch(e => {
                    console.log('Second attempt failed:', e.message);
                });
            }, 50);
        });
    }
}

function initSplash() {
    const splashVideo = document.getElementById('splash-video');
    
    // Prevent scrolling during splash
    document.body.style.overflow = 'hidden';
    
    // Guaranteed end after 6 seconds
    setTimeout(endSplash, SPLASH_DURATION * 1000);
    
    if (splashVideo) {
        // Remove controls attribute completely
        splashVideo.removeAttribute('controls');
        splashVideo.controls = false;
        
        // Set required attributes for autoplay
        splashVideo.muted = true;
        splashVideo.playsInline = true;
        splashVideo.autoplay = true;
        
        // Play based on ready state
        if (splashVideo.readyState >= 3) {
            // Video is ready to play
            playVideo(splashVideo);
        } else {
            // Wait for video to be ready
            splashVideo.addEventListener('canplay', function onCanPlay() {
                playVideo(splashVideo);
                splashVideo.removeEventListener('canplay', onCanPlay);
            });
            
            // Also try on loadeddata
            splashVideo.addEventListener('loadeddata', function onLoaded() {
                playVideo(splashVideo);
                splashVideo.removeEventListener('loadeddata', onLoaded);
            });
        }
        
        // End splash when video ends (if shorter than 6 seconds)
        splashVideo.addEventListener('ended', endSplash);
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
    
    if (contactModal) {
        contactModal.addEventListener('click', (e) => {
            if (e.target.id === 'contact-modal') {
                closeModal();
            }
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });

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

// ============ INITIALIZE - RUN IMMEDIATELY ============
// Run splash as early as possible
initSplash();

// Run other initializations when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initNavigation();
        initModal();
        initScrollAnimations();
    });
} else {
    initNavigation();
    initModal();
    initScrollAnimations();
}

// Make modal functions globally available
window.openModal = openModal;
window.closeModal = closeModal;
