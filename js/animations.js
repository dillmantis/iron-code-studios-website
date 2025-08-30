// Iron Code Studios - Advanced Animations

document.addEventListener('DOMContentLoaded', function() {
    initAdvancedAnimations();
    initParticleSystem();
    initScrollReveal();
    initMorphingShapes();
    initInteractiveElements();
});

// Advanced animation system
function initAdvancedAnimations() {
    // Intersection Observer for reveal animations
    const revealObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                
                // Trigger custom animations based on element type
                if (entry.target.classList.contains('counter')) {
                    entry.target.classList.add('animate');
                }
                
                if (entry.target.classList.contains('progress-bar')) {
                    const progressFill = entry.target.querySelector('.progress-fill');
                    if (progressFill) {
                        progressFill.style.animationPlayState = 'running';
                    }
                }
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe all reveal elements
    document.querySelectorAll('.reveal, .counter, .progress-bar').forEach(el => {
        revealObserver.observe(el);
    });
}

// Particle system for hero background
function initParticleSystem() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    const particleContainer = document.createElement('div');
    particleContainer.className = 'particles';
    hero.appendChild(particleContainer);

    // Create particles
    for (let i = 0; i < 20; i++) {
        createParticle(particleContainer, i);
    }
}

function createParticle(container, index) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random properties
    const size = Math.random() * 6 + 2;
    const left = Math.random() * 100;
    const delay = Math.random() * 10;
    const duration = Math.random() * 10 + 10;
    
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${left}%`;
    particle.style.animationDelay = `${delay}s`;
    particle.style.animationDuration = `${duration}s`;
    
    container.appendChild(particle);
}

// Scroll reveal animations
function initScrollReveal() {
    const scrollElements = document.querySelectorAll('.scroll-reveal');
    
    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
        );
    };

    const elementOutofView = (el) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop > (window.innerHeight || document.documentElement.clientHeight)
        );
    };

    const displayScrollElement = (element) => {
        element.classList.add('scrolled');
    };

    const hideScrollElement = (element) => {
        element.classList.remove('scrolled');
    };

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.25)) {
                displayScrollElement(el);
            } else if (elementOutofView(el)) {
                hideScrollElement(el);
            }
        });
    };

    window.addEventListener('scroll', throttle(handleScrollAnimation, 16));
}

// Morphing shapes animation
function initMorphingShapes() {
    const morphShapes = document.querySelectorAll('.morph-shape');
    
    morphShapes.forEach(shape => {
        // Add random animation delay
        const delay = Math.random() * 2;
        shape.style.animationDelay = `${delay}s`;
        
        // Add interaction
        shape.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused';
        });
        
        shape.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running';
        });
    });
}

// Interactive elements
function initInteractiveElements() {
    // Magnetic effect for buttons
    initMagneticEffect();
    
    // Ripple effect for buttons
    initRippleEffect();
    
    // Glitch effect on hover
    initGlitchEffect();
    
    // Floating elements
    initFloatingElements();
}

function initMagneticEffect() {
    const magneticElements = document.querySelectorAll('.btn-primary, .magnetic');
    
    magneticElements.forEach(element => {
        element.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            const moveX = x * 0.1;
            const moveY = y * 0.1;
            
            this.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'translate(0, 0)';
        });
    });
}

function initRippleEffect() {
    const rippleElements = document.querySelectorAll('.btn, .ripple');
    
    rippleElements.forEach(element => {
        element.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            const ripple = document.createElement('span');
            ripple.className = 'ripple-effect';
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            this.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

function initGlitchEffect() {
    const glitchElements = document.querySelectorAll('.glitch-trigger');
    
    glitchElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.classList.add('glitch');
            this.setAttribute('data-text', this.textContent);
        });
        
        element.addEventListener('mouseleave', function() {
            this.classList.remove('glitch');
        });
    });
}

function initFloatingElements() {
    const floatingElements = document.querySelectorAll('.float');
    
    floatingElements.forEach((element, index) => {
        // Add random delay and duration
        const delay = Math.random() * 2;
        const duration = 4 + Math.random() * 4;
        
        element.style.animationDelay = `${delay}s`;
        element.style.animationDuration = `${duration}s`;
    });
}

// Text animation effects
function initTextAnimations() {
    // Typewriter effect
    const typewriterElements = document.querySelectorAll('.typewriter');
    
    typewriterElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        element.style.width = '0';
        
        let charIndex = 0;
        const typeInterval = setInterval(() => {
            if (charIndex < text.length) {
                element.textContent += text.charAt(charIndex);
                charIndex++;
            } else {
                clearInterval(typeInterval);
                element.style.borderRight = 'none';
            }
        }, 100);
    });
    
    // Text reveal animation
    const textRevealElements = document.querySelectorAll('.text-reveal');
    
    textRevealElements.forEach(element => {
        const lines = element.innerHTML.split('<br>');
        element.innerHTML = lines.map(line => `<div class="line">${line}</div>`).join('');
        
        const lineElements = element.querySelectorAll('.line');
        lineElements.forEach((line, index) => {
            line.style.animationDelay = `${index * 0.1}s`;
        });
    });
}

// Background animations
function initBackgroundAnimations() {
    // Matrix effect
    const matrixElements = document.querySelectorAll('.matrix-bg');
    
    matrixElements.forEach(element => {
        // Create matrix dots
        const dots = document.createElement('div');
        dots.className = 'matrix-dots';
        element.appendChild(dots);
        
        for (let i = 0; i < 50; i++) {
            const dot = document.createElement('div');
            dot.className = 'matrix-dot';
            dot.style.left = Math.random() * 100 + '%';
            dot.style.top = Math.random() * 100 + '%';
            dot.style.animationDelay = Math.random() * 5 + 's';
            dots.appendChild(dot);
        }
    });
}

// 3D tilt effect
function init3DTilt() {
    const tiltElements = document.querySelectorAll('.tilt-3d');
    
    tiltElements.forEach(element => {
        element.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        });
    });
}

// Scroll-triggered number counting
function initScrollCounters() {
    const counters = document.querySelectorAll('.scroll-counter');
    
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = parseInt(counter.getAttribute('data-duration')) || 2000;
                
                animateCounterUp(counter, target, duration);
                counterObserver.unobserve(counter);
            }
        });
    });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

function animateCounterUp(element, target, duration) {
    let start = 0;
    const step = target / (duration / 16);
    
    const animate = () => {
        start += step;
        if (start >= target) {
            element.textContent = target;
        } else {
            element.textContent = Math.floor(start);
            requestAnimationFrame(animate);
        }
    };
    
    animate();
}

// Page transition effects
function initPageTransitions() {
    // Add class to body when page is loading
    document.body.classList.add('page-loading');
    
    window.addEventListener('load', function() {
        document.body.classList.remove('page-loading');
        document.body.classList.add('page-loaded');
        
        // Trigger entrance animations
        triggerEntranceAnimations();
    });
}

function triggerEntranceAnimations() {
    // Staggered fade in for main sections
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        section.style.animationDelay = `${index * 0.1}s`;
        section.classList.add('fade-in-up');
    });
}

// Mouse cursor effects
function initCursorEffects() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    
    const cursorDot = document.createElement('div');
    cursorDot.className = 'cursor-dot';
    document.body.appendChild(cursorDot);
    
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animateCursor() {
        const diffX = mouseX - cursorX;
        const diffY = mouseY - cursorY;
        
        cursorX += diffX * 0.1;
        cursorY += diffY * 0.1;
        
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
    
    // Cursor interactions
    const interactiveElements = document.querySelectorAll('a, button, .btn');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            cursor.classList.add('cursor-hover');
            cursorDot.classList.add('cursor-hover');
        });
        
        element.addEventListener('mouseleave', function() {
            cursor.classList.remove('cursor-hover');
            cursorDot.classList.remove('cursor-hover');
        });
    });
}

// Scroll-based animations
function initScrollBasedAnimations() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollPercent = scrolled / (documentHeight - windowHeight);
        
        // Update progress bar
        updateScrollProgress(scrollPercent);
        
        // Parallax backgrounds
        updateParallaxBackgrounds(scrolled);
        
        // Scale elements based on scroll
        updateScrollScaling(scrollPercent);
    });
}

function updateScrollProgress(percent) {
    const progressBar = document.querySelector('.scroll-progress');
    if (progressBar) {
        progressBar.style.width = `${percent * 100}%`;
    }
}

function updateParallaxBackgrounds(scrolled) {
    const parallaxBgs = document.querySelectorAll('.parallax-bg');
    
    parallaxBgs.forEach(bg => {
        const speed = bg.getAttribute('data-speed') || 0.5;
        const yPos = -(scrolled * speed);
        bg.style.transform = `translateY(${yPos}px)`;
    });
}

function updateScrollScaling(percent) {
    const scaleElements = document.querySelectorAll('.scroll-scale');
    
    scaleElements.forEach(element => {
        const scale = 1 + (percent * 0.2);
        element.style.transform = `scale(${scale})`;
    });
}

// Interactive hover effects
function initHoverEffects() {
    // Magnetic hover effect
    const magneticElements = document.querySelectorAll('.magnetic');
    
    magneticElements.forEach(element => {
        element.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            const moveX = x * 0.15;
            const moveY = y * 0.15;
            
            this.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'translate(0, 0)';
        });
    });
    
    // Tilt effect
    const tiltElements = document.querySelectorAll('.tilt');
    
    tiltElements.forEach(element => {
        element.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
        });
    });
}

// Loading animations
function initLoadingAnimations() {
    // Skeleton loading
    const skeletonElements = document.querySelectorAll('.skeleton');
    
    // Simulate content loading
    setTimeout(() => {
        skeletonElements.forEach(skeleton => {
            skeleton.classList.add('loaded');
        });
    }, 2000);
    
    // Progress loading
    const progressElements = document.querySelectorAll('.loading-progress');
    
    progressElements.forEach(element => {
        const progress = element.querySelector('.progress-fill');
        let width = 0;
        
        const interval = setInterval(() => {
            width += Math.random() * 10;
            if (width >= 100) {
                width = 100;
                clearInterval(interval);
                element.classList.add('complete');
            }
            progress.style.width = `${width}%`;
        }, 100);
    });
}

// Form animations
function initFormAnimations() {
    const formInputs = document.querySelectorAll('input, textarea, select');
    
    formInputs.forEach(input => {
        // Focus animations
        input.addEventListener('focus', function() {
            this.parentNode.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentNode.classList.remove('focused');
            }
        });
        
        // Check if input has value on load
        if (input.value) {
            input.parentNode.classList.add('focused');
        }
    });
    
    // Form submission animation
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function() {
            this.classList.add('submitting');
        });
    });
}

// Card flip animations
function initCardFlips() {
    const flipCards = document.querySelectorAll('.flip-card');
    
    flipCards.forEach(card => {
        card.addEventListener('click', function() {
            this.classList.toggle('flipped');
        });
    });
}

// Timeline animations
function initTimelineAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const timelineObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, {
        threshold: 0.5
    });
    
    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });
}

// Image reveal animations
function initImageReveal() {
    const imageContainers = document.querySelectorAll('.image-reveal');
    
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target.querySelector('img');
                if (img) {
                    img.classList.add('revealed');
                }
                imageObserver.unobserve(entry.target);
            }
        });
    });
    
    imageContainers.forEach(container => {
        imageObserver.observe(container);
    });
}

// Smooth scroll with easing
function smoothScrollTo(target, duration = 1000) {
    const targetElement = document.querySelector(target);
    if (!targetElement) return;
    
    const start = window.pageYOffset;
    const targetPosition = targetElement.offsetTop - 80;
    const distance = targetPosition - start;
    let startTime = null;
    
    function easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    }
    
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = easeInOutCubic(timeElapsed / duration) * distance + start;
        
        window.scrollTo(0, run);
        
        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        }
    }
    
    requestAnimationFrame(animation);
}

// Performance optimizations
function optimizeAnimations() {
    // Use transform instead of changing layout properties
    const animatedElements = document.querySelectorAll('.animate');
    
    animatedElements.forEach(element => {
        element.style.willChange = 'transform, opacity';
    });
    
    // Clean up will-change after animations
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                entry.target.style.willChange = 'auto';
            }
        });
    });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Device-specific optimizations
function initDeviceOptimizations() {
    // Reduce animations on mobile devices
    if (window.innerWidth <= 768) {
        document.body.classList.add('mobile-device');
        
        // Disable resource-intensive animations
        const heavyAnimations = document.querySelectorAll('.particle, .matrix-bg, .parallax');
        heavyAnimations.forEach(element => {
            element.style.display = 'none';
        });
    }
    
    // Battery level optimization
    if ('getBattery' in navigator) {
        navigator.getBattery().then(function(battery) {
            if (battery.level < 0.2) {
                document.body.classList.add('low-battery');
                // Disable non-essential animations
            }
        });
    }
}

// Initialize all animation systems
initTextAnimations();
initBackgroundAnimations();
init3DTilt();
initHoverEffects();
initLoadingAnimations();
initFormAnimations();
initCardFlips();
initTimelineAnimations();
initImageReveal();
initScrollBasedAnimations();
optimizeAnimations();
initDeviceOptimizations();
initPageTransitions();

// CSS for custom cursor (injected dynamically)
const cursorStyles = `
.custom-cursor {
    position: fixed;
    width: 20px;
    height: 20px;
    border: 2px solid var(--primary-color);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    mix-blend-mode: difference;
    transition: all 0.1s ease;
}

.cursor-dot {
    position: fixed;
    width: 4px;
    height: 4px;
    background: var(--primary-color);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    transition: all 0.1s ease;
}

.cursor-hover {
    transform: scale(1.5);
}

.tooltip {
    position: absolute;
    background: var(--gray-900);
    color: var(--white);
    padding: 8px 12px;
    border-radius: 6px;
    font-size: 14px;
    z-index: 10000;
    opacity: 0;
    transform: translateY(10px);
    transition: all 0.3s ease;
    pointer-events: none;
}

.tooltip.show {
    opacity: 1;
    transform: translateY(0);
}

.tooltip::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 5px solid transparent;
    border-top-color: var(--gray-900);
}

.skip-link {
    position: absolute;
    top: -40px;
    left: 6px;
    background: var(--primary-color);
    color: var(--white);
    padding: 8px;
    border-radius: 4px;
    text-decoration: none;
    z-index: 100;
}

.skip-link:focus {
    top: 6px;
}

.sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
}

.ripple-effect {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.6);
    transform: scale(0);
    animation: ripple-animation 0.6s linear;
    pointer-events: none;
}

@keyframes ripple-animation {
    to {
        transform: scale(4);
        opacity: 0;
    }
}

.page-loading * {
    animation-play-state: paused !important;
}

.theme-transition,
.theme-transition *,
.theme-transition *::before,
.theme-transition *::after {
    transition: all 0.3s !important;
    transition-delay: 0 !important;
}

@media (max-width: 768px) {
    .mobile-device .parallax,
    .mobile-device .particle,
    .mobile-device .matrix-bg {
        display: none !important;
    }
}

.low-battery .particle,
.low-battery .matrix-bg,
.low-battery .morph-shape {
    animation-play-state: paused !important;
}
`;

// Inject cursor styles
const styleSheet = document.createElement('style');
styleSheet.textContent = cursorStyles;
document.head.appendChild(styleSheet);

// Initialize cursor effects only on desktop
if (window.innerWidth > 768 && !('ontouchstart' in window)) {
    initCursorEffects();
}

// Utility function to check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Throttle function for performance
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Export animation utilities
window.AnimationUtils = {
    smoothScrollTo,
    isInViewport,
    throttle,
    animateCounterUp
};
