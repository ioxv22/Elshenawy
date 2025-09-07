// ===== DOM Elements =====
const themeToggle = document.getElementById('themeToggle');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const header = document.getElementById('header');
const contactForm = document.getElementById('contactForm');
const faqItems = document.querySelectorAll('.faq-item');
const testimonialCards = document.querySelectorAll('.testimonial-card');
const testimonialDots = document.querySelectorAll('.dot');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const videoModal = document.getElementById('videoModal');
const videoFrame = document.getElementById('videoFrame');
const videoTitle = document.getElementById('videoTitle');
const videoDescription = document.getElementById('videoDescription');
const languageToggle = document.getElementById('languageToggle');
const langButtons = document.querySelectorAll('.lang-btn');

// ===== Theme Toggle =====
let currentTheme = localStorage.getItem('theme') || 'light';

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    const icon = themeToggle.querySelector('i');
    if (theme === 'dark') {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
}

// Initialize theme
setTheme(currentTheme);

themeToggle.addEventListener('click', () => {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(currentTheme);
});

// ===== Mobile Navigation =====
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// ===== Header Scroll Effect =====
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.style.background = currentTheme === 'dark' 
            ? 'rgba(17, 24, 39, 0.98)' 
            : 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = currentTheme === 'dark' 
            ? 'rgba(17, 24, 39, 0.95)' 
            : 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// ===== Smooth Scrolling =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = header.offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== FAQ Accordion =====
faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all FAQ items
        faqItems.forEach(faqItem => {
            faqItem.classList.remove('active');
        });
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// ===== Testimonials Slider =====
let currentTestimonial = 0;

function showTestimonial(index) {
    testimonialCards.forEach((card, i) => {
        card.classList.toggle('active', i === index);
    });
    
    testimonialDots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
    showTestimonial(currentTestimonial);
}

function prevTestimonial() {
    currentTestimonial = (currentTestimonial - 1 + testimonialCards.length) % testimonialCards.length;
    showTestimonial(currentTestimonial);
}

// Event listeners for testimonial controls
if (nextBtn) {
    nextBtn.addEventListener('click', nextTestimonial);
}

if (prevBtn) {
    prevBtn.addEventListener('click', prevTestimonial);
}

testimonialDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentTestimonial = index;
        showTestimonial(currentTestimonial);
    });
});

// Auto-play testimonials
setInterval(nextTestimonial, 5000);

// ===== Contact Form =====
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const name = formData.get('name');
        const grade = formData.get('grade');
        const message = formData.get('message');
        
        // Create WhatsApp message
        const gradeText = {
            'grade9': 'صف تاسع متقدم',
            'grade10': 'صف عاشر متقدم',
            'grade11': 'صف حادي عشر متقدم'
        };
        
        const whatsappMessage = `مرحباً أستاذ إسلام،
        
الاسم: ${name}
الصف الدراسي: ${gradeText[grade] || grade}

الرسالة:
${message}`;
        
        const encodedMessage = encodeURIComponent(whatsappMessage);
        const whatsappURL = `https://wa.me/+97156880360?text=${encodedMessage}`;

        // Show success message
        showNotification('تم إرسال رسالتك بنجاح! سيتم توجيهك إلى واتساب...', 'success');
        
        // Redirect to WhatsApp after 2 seconds
        setTimeout(() => {
            window.open(whatsappURL, '_blank');
        }, 2000);
        
        // Reset form
        this.reset();
    });
}

// ===== Notification System =====
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease-in-out;
        max-width: 300px;
        font-family: var(--font-arabic);
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 4000);
}

// ===== Scroll Animations =====
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.pricing-card, .feature-item, .testimonial-card, .faq-item').forEach(el => {
        observer.observe(el);
    });
}

// ===== Parallax Effect =====
function initParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.physics-animation');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translate(-50%, -50%) translateY(${scrolled * speed}px)`;
        });
    });
}

// ===== Counter Animation =====
function animateCounters() {
    const counters = document.querySelectorAll('.amount');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        // Start animation when element is visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(counter);
    });
}

// ===== Typing Effect =====
function initTypingEffect() {
    const typingElement = document.querySelector('.hero-title');
    if (!typingElement) return;
    
    const text = typingElement.textContent;
    typingElement.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            typingElement.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    };
    
    // Start typing effect after page load
    setTimeout(typeWriter, 1000);
}

// ===== Loading Screen =====
function initLoadingScreen() {
    const loader = document.createElement('div');
    loader.className = 'loader';
    loader.innerHTML = `
        <div class="loader-content">
            <div class="loader-logo">
                <img src="https://i.ibb.co/xSFLPSGn/image.png" alt="Loading">
            </div>
            <div class="loader-text">جاري التحميل...</div>
            <div class="loader-progress">
                <div class="loader-bar"></div>
            </div>
        </div>
    `;
    
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        color: white;
        font-family: var(--font-arabic);
    `;
    
    document.body.appendChild(loader);
    
    // Remove loader after page load
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(loader);
            }, 500);
        }, 1000);
    });
}

// ===== Scroll to Top Button =====
function initScrollToTop() {
    const scrollBtn = document.createElement('button');
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--gradient-primary);
        border: none;
        border-radius: 50%;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: var(--shadow-medium);
    `;
    
    document.body.appendChild(scrollBtn);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollBtn.style.opacity = '1';
            scrollBtn.style.visibility = 'visible';
        } else {
            scrollBtn.style.opacity = '0';
            scrollBtn.style.visibility = 'hidden';
        }
    });
    
    // Scroll to top on click
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== Active Navigation Link =====
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// ===== Lazy Loading Images =====
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ===== Form Validation =====
function initFormValidation() {
    const inputs = document.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearError);
    });
    
    function validateField(e) {
        const field = e.target;
        const value = field.value.trim();
        
        // Remove existing error
        clearError(e);
        
        // Validate based on field type
        if (field.hasAttribute('required') && !value) {
            showFieldError(field, 'هذا الحقل مطلوب');
            return false;
        }
        
        if (field.type === 'email' && value && !isValidEmail(value)) {
            showFieldError(field, 'يرجى إدخال بريد إلكتروني صحيح');
            return false;
        }
        
        return true;
    }
    
    function clearError(e) {
        const field = e.target;
        const errorElement = field.parentNode.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }
        field.classList.remove('error');
    }
    
    function showFieldError(field, message) {
        field.classList.add('error');
        const errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.textContent = message;
        errorElement.style.cssText = `
            color: #ef4444;
            font-size: 0.875rem;
            margin-top: 0.25rem;
        `;
        field.parentNode.appendChild(errorElement);
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}

// ===== Initialize AOS =====
function initAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 100
        });
    }
}

// ===== Performance Optimization =====
function optimizePerformance() {
    // Preload critical resources
    const preloadLinks = [
        'https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700&family=Poppins:wght@300;400;600;700&display=swap',
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
    ];
    
    preloadLinks.forEach(href => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = href;
        document.head.appendChild(link);
    });
    
    // Lazy load non-critical CSS
    const lazyStyles = document.querySelectorAll('link[data-lazy]');
    lazyStyles.forEach(link => {
        link.rel = 'stylesheet';
        link.removeAttribute('data-lazy');
    });
}

// ===== Error Handling =====
window.addEventListener('error', (e) => {
    console.error('JavaScript Error:', e.error);
    // You can add error reporting here
});

// ===== Initialize Everything =====
document.addEventListener('DOMContentLoaded', () => {
    initLoadingScreen();
    initScrollAnimations();
    initParallax();
    animateCounters();
    initScrollToTop();
    updateActiveNavLink();
    initLazyLoading();
    initFormValidation();
    initAOS();
    optimizePerformance();
    
    // Initialize typing effect after a delay
    setTimeout(initTypingEffect, 2000);
});

// ===== Service Worker Registration =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// ===== Analytics and Tracking =====
function trackEvent(eventName, eventData = {}) {
    // Add your analytics tracking code here
    console.log('Event tracked:', eventName, eventData);
}

// Track button clicks
document.addEventListener('click', (e) => {
    if (e.target.matches('.btn-primary')) {
        trackEvent('button_click', {
            button_text: e.target.textContent.trim(),
            page_url: window.location.href
        });
    }
});

// Track form submissions
document.addEventListener('submit', (e) => {
    trackEvent('form_submit', {
        form_id: e.target.id,
        page_url: window.location.href
    });
});

// ===== Accessibility Improvements =====
function initAccessibility() {
    // Add skip to content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.textContent = 'تخطي إلى المحتوى الرئيسي';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--primary-color);
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 10000;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add main landmark
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.setAttribute('id', 'main');
        heroSection.setAttribute('role', 'main');
    }
    
    // Improve button accessibility
    document.querySelectorAll('button, .btn').forEach(btn => {
        if (!btn.getAttribute('aria-label') && !btn.textContent.trim()) {
            const icon = btn.querySelector('i');
            if (icon) {
                btn.setAttribute('aria-label', 'زر');
            }
        }
    });
}

// Initialize accessibility features
document.addEventListener('DOMContentLoaded', initAccessibility);

// ===== Print Styles =====
function initPrintStyles() {
    const printStyles = `
        @media print {
            .header, .footer, .theme-toggle, .scroll-to-top {
                display: none !important;
            }
            
            body {
                font-size: 12pt;
                line-height: 1.5;
                color: black;
                background: white;
            }
            
            .container {
                max-width: none;
                padding: 0;
            }
            
            .section {
                page-break-inside: avoid;
                margin-bottom: 20pt;
            }
            
            .btn {
                border: 1pt solid black;
                background: white;
                color: black;
            }
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = printStyles;
    document.head.appendChild(styleSheet);
}

// Initialize print styles
initPrintStyles();

// ===== Courses Functionality =====
function initializeCourses() {
    // Load and display videos from admin panel
    loadAndDisplayVideos();
    
    const categoryBtns = document.querySelectorAll('.category-btn');
    
    // Category filtering
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.getAttribute('data-category');
            
            // Update active button
            categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filter courses
            filterCoursesByCategory(category);
        });
    });
}

function loadAndDisplayVideos() {
    console.log('🎥 Starting loadAndDisplayVideos...');
    
    const coursesGrid = document.querySelector('.courses-grid');
    console.log('🎥 Found coursesGrid:', coursesGrid ? 'YES' : 'NO');
    
    if (!coursesGrid) {
        console.error('🎥 coursesGrid not found!');
        return;
    }
    
    // Check if videos are already loaded and protected
    if (coursesGrid.getAttribute('data-videos-loaded') === 'true') {
        console.log('🛡️ Videos are already loaded and protected - ABORTING');
        return;
    }
    
    // Check if there are already videos in HTML (check for course-card elements)
    const existingCourseCards = coursesGrid.querySelectorAll('.course-card');
    console.log('🎥 Existing course cards in HTML:', existingCourseCards.length);
    
    // ALWAYS keep existing course cards - never replace them if they exist
    if (existingCourseCards.length > 0) {
        console.log('✅ Course cards found in HTML - NEVER replacing them!');
        
        // Make sure they're all visible and protected
        existingCourseCards.forEach((card, index) => {
            card.style.display = 'block';
            card.style.opacity = '1';
            card.style.visibility = 'visible';
            card.setAttribute('data-protected', 'true');
            card.classList.add('protected-video');
            console.log(`✅ Made course card ${index + 1} visible and protected`);
        });
        
        // Mark as loaded and protected
        coursesGrid.setAttribute('data-videos-loaded', 'true');
        
        // Initialize category filtering for existing cards
        initCategoryButtons();
        return; // EXIT - Don't do anything else
    }
    
    console.log('🎥 No existing course cards found, will attempt to load from storage...');
    
    // Force ensure we have videos - get from both sources
    let videos = loadVideosFromAdmin();
    console.log('🎥 Videos from loadVideosFromAdmin:', videos.length);
    
    // If no videos, create them directly
    if (videos.length === 0) {
        console.log('🎥 No videos found, creating default videos...');
        videos = [
            {
                id: 1,
                title: 'فيديو فيزياء صف 9 متقدم',
                description: 'شرح شامل ومبسط لمنهج الصف التاسع المتقدم',
                duration: '120 دقيقة',
                category: 'grade9',
                videoUrl: 'https://drive.google.com/file/d/1vOihXtyhX7Xptn0kOs1fISHXsBQOzxum/view?usp=drive_link',
                thumbnail: 'https://via.placeholder.com/400x225/1e3a8a/ffffff?text=فيزياء+الصف+التاسع+المتقدم',
                isPremium: false,
                type: 'free'
            },
            {
                id: 2,
                title: 'فيديو صف 10 متقدم',
                description: 'شرح مفصل لمنهج العاشر المتقدم بطريقة ممتازة',
                duration: '135 دقيقة',
                category: 'grade10',
                videoUrl: 'https://drive.google.com/file/d/1iTO2628HDuKpEdPG5_z2VV-v0hHAs8sI/view?usp=drive_link',
                thumbnail: 'https://via.placeholder.com/400x225/3b82f6/ffffff?text=فيزياء+الصف+العاشر+المتقدم',
                isPremium: false,
                type: 'free'
            },
            {
                id: 3,
                title: 'فيديو فيزياء صف 11 متقدم',
                description: 'الفيديو الأصلي لمنهج الحادي عشر المتقدم كاملاً',
                duration: '145 دقيقة',
                category: 'grade11',
                videoUrl: 'https://drive.google.com/file/d/1hD5GUReRwAz5L-AJd-IaxKqqJ00DZkJJ/view?usp=drive_link',
                thumbnail: 'https://via.placeholder.com/400x225/f59e0b/ffffff?text=فيزياء+صف+11+متقدم',
                isPremium: false,
                type: 'free'
            }
        ];
    }
    
    console.log('🎥 Total videos to display:', videos.length);
    
    // Final check - if there are protected videos, don't replace
    const protectedVideos = coursesGrid.querySelectorAll('.course-card[data-protected="true"]');
    if (protectedVideos.length > 0) {
        console.log('🛡️ PROTECTED VIDEOS FOUND - ABORTING innerHTML replacement');
        return;
    }
    
    coursesGrid.innerHTML = videos.map(video => `
        <div class="course-card ${video.category}" data-aos="fade-up">
            <div class="course-thumbnail">
                <img src="${video.thumbnail}" alt="${video.title}" loading="lazy">
                <div class="course-duration">${video.duration}</div>
                ${video.isPremium ? '<div class="premium-badge"><i class="fas fa-crown"></i></div>' : ''}
                <div class="course-overlay">
                    <button class="play-btn" onclick="openVideoModal('${video.id}')">
                        <i class="fas fa-play"></i>
                    </button>
                </div>
            </div>
            <div class="course-info">
                <h3>${video.title}</h3>
                <p>${video.description}</p>
                <div class="course-meta">
                    <span class="course-type">${getTypeNameArabic(video.type)}</span>
                    <span class="course-grade">${getGradeNameArabic(video.category)}</span>
                </div>
                <button class="course-btn ${video.isPremium ? 'premium' : 'free'}" 
                        onclick="${video.isPremium ? 'requireSubscription()' : `openVideoModal('${video.id}')`}">
                    ${video.isPremium ? '<i class="fas fa-crown"></i> يتطلب اشتراك' : '<i class="fas fa-play"></i> مشاهدة مجانية'}
                </button>
            </div>
        </div>
    `).join('');
    
    console.log('🎥 Videos displayed successfully! HTML length:', coursesGrid.innerHTML.length);
    
    // Initialize category filtering
    initCategoryButtons();
}

function getTypeNameArabic(type) {
    const types = {
        'lesson': 'درس',
        'review': 'مراجعة',
        'exam': 'امتحان',
        'homework': 'واجب'
    };
    return types[type] || 'درس';
}

function getGradeNameArabic(grade) {
    const grades = {
        'grade9': 'الصف التاسع',
        'grade10': 'الصف العاشر',
        'grade11': 'الصف الحادي عشر'
    };
    return grades[grade] || grade;
}

function filterCoursesByCategory(category) {
    const courseCards = document.querySelectorAll('.course-card');
    
    courseCards.forEach(card => {
        if (category === 'all' || card.classList.contains(category)) {
            card.classList.remove('hidden');
            card.style.display = 'block';
        } else {
            card.classList.add('hidden');
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });
}

// ===== Video Modal Functions =====
function openVideoModal(videoId) {
    const videos = loadVideosFromAdmin();
    const video = videos.find(v => v.id == videoId);
    
    if (video) {
        const videoModal = document.getElementById('videoModal');
        const videoFrame = document.getElementById('videoFrame');
        const videoTitle = document.getElementById('videoTitle');
        const videoDescription = document.getElementById('videoDescription');
        
        if (videoModal && videoFrame && videoTitle && videoDescription) {
            // For Google Drive links, open directly in new tab
            if (video.videoUrl.includes('drive.google.com')) {
                window.open(video.videoUrl, '_blank');
                return;
            }
            videoFrame.src = video.videoUrl;
            videoTitle.textContent = video.title;
            videoDescription.textContent = video.description;
            videoModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
}

function closeVideoModal() {
    videoModal.classList.remove('active');
    videoFrame.src = '';
    document.body.style.overflow = 'auto';
}

function getCourseData(courseId) {
    const courses = {
        'grade9-chapter1': {
            title: 'الفصل الثالث: الحركة',
            description: 'شرح مفصل لمفاهيم الحركة والسرعة والتسارع',
            videoUrl: 'https://drive.google.com/file/d/1vOihXtyhX7Xptn0kOs1fISHXsBQOzxum/view?usp=sharing'
        },
        'grade10-chapter1': {
            title: 'الفصل الثالث: المغناطيس',
            description: 'مفاهيم المغناطيس ',
            videoUrl: 'https://drive.google.com/file/d/1iTO2628HDuKpEdPG5_z2VV-v0hHAs8sI/view?usp=sharing'
        },
        'grade11-chapter1': {
            title: 'الفصل الثالث: الكتلة',
            description: 'الكتلة والحجم والكثافة',
            videoUrl: 'https://drive.google.com/file/d/1hD5GUReRwAz5L-AJd-IaxKqqJ00DZkJJ/view?usp=sharing'
        },
    };
    
    return courses[courseId];
}

// ===== Subscription Requirement =====
function requireSubscription(grade) {
    const gradeTexts = {
        'grade9': 'الصف التاسع',
        'grade10': 'الصف العاشر',
        'grade11': 'الصف الحادي عشر'
    };
    
    const message = `للوصول إلى كورسات ${gradeTexts[grade]}، يجب عليك الاشتراك أولاً.`;
    
    showNotification(message, 'info');
    
    // Scroll to pricing section
    setTimeout(() => {
        document.querySelector('#pricing').scrollIntoView({
            behavior: 'smooth'
        });
    }, 1000);
}

// ===== Enhanced Contact Form =====
function enhanceContactForm() {
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const messageData = {
                name: formData.get('name'),
                grade: formData.get('grade'),
                message: formData.get('message'),
                timestamp: Date.now()
            };
            
            // Save to admin panel if available
            if (window.adminPanel) {
                window.adminPanel.addMessage(messageData);
            }
            
            // Create WhatsApp message
            const gradeText = {
                'grade9': 'صف تاسع متقدم',
                'grade10': 'صف عاشر متقدم',
                'grade11': 'صف حادي عشر متقدم'
            };
            
            const whatsappMessage = `مرحباً أستاذ إسلام،
            
الاسم: ${messageData.name}
الصف الدراسي: ${gradeText[messageData.grade] || messageData.grade}

الرسالة:
${messageData.message}`;
            
            const encodedMessage = encodeURIComponent(whatsappMessage);
            const whatsappURL = `https://wa.me/971501234567?text=${encodedMessage}`;
            
            // Show success message
            showNotification('تم إرسال رسالتك بنجاح! سيتم توجيهك إلى واتساب...', 'success');
            
            // Redirect to WhatsApp after 2 seconds
            setTimeout(() => {
                window.open(whatsappURL, '_blank');
            }, 2000);
            
            // Reset form
            this.reset();
        });
    }
}

// ===== Admin Panel Integration =====
function checkAdminAccess() {
    const adminLink = document.querySelector('.admin-link');
    const currentUser = sessionStorage.getItem('adminUser');
    
    if (currentUser || window.location.hash === '#admin') {
        if (adminLink) {
            adminLink.style.display = 'block';
        }
    }
}

// ===== Enhanced Animations =====
function initEnhancedAnimations() {
    // Enhanced Intersection Observer for all animated elements
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    entry.target.classList.add('animate-in');
                }, index * 100);
            }
        });
    }, observerOptions);

    // Animate all cards and features
    const animatedElements = document.querySelectorAll(
        '.subscription-features .feature-item, .course-card, .experiment-card, .certificate-card, .feature-item'
    );
    
    animatedElements.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = `all 0.6s ease ${index * 0.05}s`;
        observer.observe(item);
    });

    // Enhanced parallax effect
    let ticking = false;
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-background, .physics-animation');
        
        parallaxElements.forEach(element => {
            if (element) {
                const speed = element.dataset.speed || 0.3;
                element.style.transform = `translateY(${scrolled * speed}px)`;
            }
        });
        
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });

    // Add interactive hover effects
    addInteractiveEffects();
    
    // Initialize floating particles
    initFloatingParticles();
}

// Interactive effects for better UX
function addInteractiveEffects() {
    document.querySelectorAll('.btn, .course-card, .experiment-card, .certificate-card').forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.03)';
            this.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.2)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '';
        });
    });
}

// Floating particles for hero section
function initFloatingParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'floating-particles-container';
    particlesContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
        overflow: hidden;
    `;

    // Create animated particles
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        particle.style.cssText = `
            position: absolute;
            width: ${2 + Math.random() * 4}px;
            height: ${2 + Math.random() * 4}px;
            background: rgba(255, 255, 255, ${0.3 + Math.random() * 0.4});
            border-radius: 50%;
            animation: float ${4 + Math.random() * 3}s ease-in-out infinite;
            animation-delay: ${Math.random() * 3}s;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
        `;
        particlesContainer.appendChild(particle);
    }

    hero.appendChild(particlesContainer);
}

// ===== Keyboard Navigation =====
function initKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        // Close video modal with Escape key
        if (e.key === 'Escape' && videoModal.classList.contains('active')) {
            closeVideoModal();
        }
        
        // Navigate testimonials with arrow keys
        if (e.key === 'ArrowLeft' && !videoModal.classList.contains('active')) {
            nextTestimonial();
        } else if (e.key === 'ArrowRight' && !videoModal.classList.contains('active')) {
            prevTestimonial();
        }
    });
}

// ===== Welcome Screen - INSTANT LOAD =====
function initializeWelcomeScreen() {
    const welcomeScreen = document.getElementById('welcomeScreen');
    
    if (!welcomeScreen) return;
    
    // 🚀 INSTANT HIDE - NO DELAYS!
    console.log('⚡ INSTANT LOAD: Hiding welcome screen immediately');
    welcomeScreen.style.display = 'none';
    welcomeScreen.classList.add('hidden');
    
    // Ensure body is scrollable immediately
    document.body.style.overflow = '';
    
    console.log('✅ Welcome screen hidden instantly - site ready!');
}

// ===== Receipt Upload Modal =====
function initializeReceiptModal() {
    const receiptModal = document.getElementById('receiptModal');
    const receiptForm = document.getElementById('receiptForm');
    const fileInput = document.getElementById('receiptImage');
    const uploadArea = document.getElementById('fileUploadArea');
    const uploadPreview = document.getElementById('uploadPreview');
    const uploadPlaceholder = uploadArea?.querySelector('.upload-placeholder');
    const previewImage = document.getElementById('previewImage');
    
    if (!receiptModal) return;
    
    // File upload handling
    if (fileInput) {
        fileInput.addEventListener('change', handleFileSelect);
    }
    
    // Drag and drop
    if (uploadArea) {
        uploadArea.addEventListener('dragover', handleDragOver);
        uploadArea.addEventListener('dragleave', handleDragLeave);
        uploadArea.addEventListener('drop', handleFileDrop);
    }
    
    // Form submission
    if (receiptForm) {
        receiptForm.addEventListener('submit', handleReceiptSubmit);
    }
    
    function handleFileSelect(e) {
        const file = e.target.files[0];
        if (file) {
            displayImagePreview(file);
        }
    }
    
    function handleDragOver(e) {
        e.preventDefault();
        uploadArea.classList.add('dragover');
    }
    
    function handleDragLeave(e) {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
    }
    
    function handleFileDrop(e) {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            const file = files[0];
            if (file.type.startsWith('image/')) {
                fileInput.files = files;
                displayImagePreview(file);
            } else {
                showNotification('يرجى رفع ملف صورة فقط', 'error');
            }
        }
    }
    
    function displayImagePreview(file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            previewImage.src = e.target.result;
            uploadPlaceholder.style.display = 'none';
            uploadPreview.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
    
    async function handleReceiptSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(receiptForm);
        const receiptData = {
            studentName: formData.get('studentName'),
            studentGrade: formData.get('studentGrade'),
            studentPhone: formData.get('studentPhone'),
            paymentMethod: formData.get('paymentMethod'),
            notes: formData.get('notes'),
            timestamp: Date.now(),
            status: 'pending'
        };
        
        // Convert image to base64 for storage
        const imageFile = formData.get('receiptImage');
        if (imageFile && imageFile.size > 0) {
            const reader = new FileReader();
            reader.onload = function(e) {
                receiptData.receiptImage = e.target.result;
                saveReceiptData(receiptData);
            };
            reader.readAsDataURL(imageFile);
        } else {
            saveReceiptData(receiptData);
        }
    }
    
    function saveReceiptData(receiptData) {
        // Save to localStorage for admin panel
        const receipts = JSON.parse(localStorage.getItem('receipts') || '[]');
        receipts.push(receiptData);
        localStorage.setItem('receipts', JSON.stringify(receipts));
        
        // Send receipt notification to Telegram
        sendReceiptToTelegram(receiptData);
        
        // Save to Firebase if available
        if (window.firebaseDb && window.getCurrentUser && window.getCurrentUser()) {
            const db = window.firebaseDb();
            db.collection('receipts').add(receiptData)
                .then(() => {
                    console.log('Receipt saved to Firebase');
                })
                .catch((error) => {
                    console.error('Error saving receipt to Firebase:', error);
                });
        }
        
        showNotification('تم رفع الإيصال بنجاح! سيتم مراجعته من قبل الإدارة قريباً.', 'success');
        closeReceiptModal();
        receiptForm.reset();
        resetFileUpload();
        
        // Show success animation
        showReceiptSuccessAnimation();
    }
    
    // Send receipt notification to Telegram
    function sendReceiptToTelegram(receiptData) {
        const telegramBotToken = '8300804684:AAEpxmj8MfkH9lRYMgYX2vbnTZwUzlaLQxs'; // Your actual bot token
        // Send to specific chat IDs (you'll need to get these by messaging the bot first)
        // For now, we'll try to send to the bot owner's chat
        const chatIds = ['@abdurhman009', '@Elshenawy_Physics']; // Target usernames
        
        // Alternative: Send to bot owner (you need to message the bot first to get your chat ID)
        // You can get your chat ID by messaging the bot and checking: https://api.telegram.org/bot8300804684:AAEpxmj8MfkH9lRYMgYX2vbnTZwUzlaLQxs/getUpdates
        
        // Skip if no bot token configured
        if (telegramBotToken === 'YOUR_BOT_TOKEN_HERE') {
            console.log('Telegram bot token not configured. Receipt saved locally only.');
            return;
        }
        
        const gradeText = {
            'grade9': 'الصف التاسع المتقدم',
            'grade10': 'الصف العاشر المتقدم', 
            'grade11': 'الصف الحادي عشر المتقدم'
        };
        
        const paymentMethodText = {
            'bank_transfer': 'تحويل بنكي',
            'cash': 'نقداً',
            'online': 'دفع إلكتروني'
        };
        
        const message = `🧾 *إيصال دفع جديد*
        
👤 *الطالب:* ${receiptData.studentName}
📚 *الصف:* ${gradeText[receiptData.grade] || receiptData.grade}
📞 *الهاتف:* ${receiptData.phone}
💳 *طريقة الدفع:* ${paymentMethodText[receiptData.paymentMethod] || receiptData.paymentMethod}
📝 *ملاحظات:* ${receiptData.notes || 'لا توجد ملاحظات'}
⏰ *وقت الإرسال:* ${new Date(receiptData.timestamp).toLocaleString('ar-EG')}

✅ يرجى مراجعة الإيصال في لوحة الإدارة`;

        // Send to each chat
        chatIds.forEach(chatId => {
            // Send text message first
            fetch(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: message,
                    parse_mode: 'Markdown'
                })
            }).then(response => {
                if (response.ok) {
                    console.log(`Receipt notification sent to ${chatId}`);
                } else {
                    console.error(`Failed to send notification to ${chatId}`);
                }
            }).catch(error => {
                console.error(`Error sending to ${chatId}:`, error);
            });
            
            // Send image if available
            if (receiptData.receiptImage) {
                // Convert base64 to blob for sending
                fetch(receiptData.receiptImage)
                    .then(res => res.blob())
                    .then(blob => {
                        const formData = new FormData();
                        formData.append('chat_id', chatId);
                        formData.append('photo', blob, 'receipt.jpg');
                        formData.append('caption', `📸 صورة الإيصال - ${receiptData.studentName}`);
                        
                        return fetch(`https://api.telegram.org/bot${telegramBotToken}/sendPhoto`, {
                            method: 'POST',
                            body: formData
                        });
                    })
                    .then(response => {
                        if (response.ok) {
                            console.log(`Receipt image sent to ${chatId}`);
                        } else {
                            console.error(`Failed to send image to ${chatId}`);
                        }
                    })
                    .catch(error => {
                        console.error(`Error sending image to ${chatId}:`, error);
                    });
            }
        });
    }
    
    // Send receipt directly to Telegram bot (for user interaction)
    window.sendReceiptToTelegramBot = function() {
        const form = document.getElementById('receiptForm');
        const formData = new FormData(form);
        
        // Validate required fields
        if (!formData.get('studentName') || !formData.get('phone') || !formData.get('paymentMethod')) {
            showNotification('يرجى ملء جميع الحقول المطلوبة', 'error');
            return;
        }
        
        const receiptData = {
            studentName: formData.get('studentName'),
            phone: formData.get('phone'),
            grade: document.getElementById('receiptGrade').value,
            paymentMethod: formData.get('paymentMethod'),
            notes: formData.get('notes') || '',
            timestamp: Date.now()
        };
        
        // Convert image to base64 if available
        const imageFile = formData.get('receiptImage');
        if (imageFile && imageFile.size > 0) {
            const reader = new FileReader();
            reader.onload = function(e) {
                receiptData.receiptImage = e.target.result;
                sendDirectToTelegramBot(receiptData);
            };
            reader.readAsDataURL(imageFile);
        } else {
            sendDirectToTelegramBot(receiptData);
        }
    };
    
    // Send directly to Telegram bot
    function sendDirectToTelegramBot(receiptData) {
        const telegramBotToken = '8300804684:AAEpxmj8MfkH9lRYMgYX2vbnTZwUzlaLQxs';
        
        // Create message for Telegram
        const gradeText = {
            'grade9': 'الصف التاسع المتقدم',
            'grade10': 'الصف العاشر المتقدم', 
            'grade11': 'الصف الحادي عشر المتقدم'
        };
        
        const paymentMethodText = {
            'ziina': 'Ziina',
            'bank_transfer': 'تحويل بنكي',
            'cash': 'نقداً',
            'other': 'أخرى'
        };
        
        const message = `🧾 *إيصال دفع جديد*

👤 *الطالب:* ${receiptData.studentName}
📚 *الصف:* ${gradeText[receiptData.grade] || receiptData.grade}
📞 *الهاتف:* ${receiptData.phone}
💳 *طريقة الدفع:* ${paymentMethodText[receiptData.paymentMethod] || receiptData.paymentMethod}
📝 *ملاحظات:* ${receiptData.notes || 'لا توجد ملاحظات'}
⏰ *وقت الإرسال:* ${new Date(receiptData.timestamp).toLocaleString('ar-EG')}

📱 *تم الإرسال من الموقع مباشرة*`;

        // Method 1: Try to send via API to a specific chat (you need to provide your chat ID)
        const yourChatId = '7733935141'; // Replace with your actual chat ID
        
        if (yourChatId !== 'YOUR_CHAT_ID') {
            // Send message via API
            fetch(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: yourChatId,
                    text: message,
                    parse_mode: 'Markdown'
                })
            }).then(response => {
                if (response.ok) {
                    console.log('Receipt sent to Telegram successfully');
                    showNotification('تم إرسال الإيصال للتيليجرام بنجاح!', 'success');
                    
                    // Send image if available
                    if (receiptData.receiptImage) {
                        sendImageToTelegram(receiptData, yourChatId, telegramBotToken);
                    }
                } else {
                    console.error('Failed to send to Telegram');
                    fallbackToTelegramLink(receiptData, message);
                }
            }).catch(error => {
                console.error('Error sending to Telegram:', error);
                fallbackToTelegramLink(receiptData, message);
            });
        } else {
            // Fallback: Open Telegram with pre-filled message
            fallbackToTelegramLink(receiptData, message);
        }
        
        // Save locally
        const receipts = JSON.parse(localStorage.getItem('receipts') || '[]');
        receipts.push({...receiptData, status: 'sent_to_bot'});
        localStorage.setItem('receipts', JSON.stringify(receipts));
        
        closeReceiptModal();
        document.getElementById('receiptForm').reset();
        resetFileUpload();
    }
    
    // Send image to Telegram
    function sendImageToTelegram(receiptData, chatId, botToken) {
        if (receiptData.receiptImage) {
            fetch(receiptData.receiptImage)
                .then(res => res.blob())
                .then(blob => {
                    const formData = new FormData();
                    formData.append('chat_id', chatId);
                    formData.append('photo', blob, 'receipt.jpg');
                    formData.append('caption', `📸 صورة الإيصال - ${receiptData.studentName}`);
                    
                    return fetch(`https://api.telegram.org/bot${botToken}/sendPhoto`, {
                        method: 'POST',
                        body: formData
                    });
                })
                .then(response => {
                    if (response.ok) {
                        console.log('Receipt image sent to Telegram');
                    }
                })
                .catch(error => {
                    console.error('Error sending image:', error);
                });
        }
    }
    
    // Fallback method: Open Telegram app/web
    function fallbackToTelegramLink(receiptData, message) {
        // Create a simple message for URL
        const simpleMessage = `إيصال دفع من ${receiptData.studentName} - ${receiptData.phone}`;
        
        // Try to open Telegram app first, then web
        const telegramAppUrl = `tg://msg?text=${encodeURIComponent(simpleMessage)}`;
        const telegramWebUrl = `https://web.telegram.org/k/#@abdurhman009`;
        
        // Try app first
        const link = document.createElement('a');
        link.href = telegramAppUrl;
        link.click();
        
        // Fallback to web after a short delay
        setTimeout(() => {
            window.open(telegramWebUrl, '_blank');
        }, 1000);
        
        showNotification('تم فتح التيليجرام. يرجى إرسال تفاصيل الإيصال يدوياً', 'info');
    }
}

function openReceiptModal(grade) {
    const modal = document.getElementById('receiptModal');
    const gradeSelect = document.getElementById('studentGrade');
    
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Pre-select grade if provided
        if (grade && gradeSelect) {
            gradeSelect.value = grade;
        }
        
        // Pre-fill user data if logged in
        if (window.getCurrentUser && window.getUserData) {
            const user = window.getCurrentUser();
            const userData = window.getUserData();
            
            if (user && userData) {
                const nameInput = document.getElementById('studentName');
                if (nameInput && !nameInput.value) {
                    nameInput.value = userData.name || user.displayName || '';
                }
                
                if (gradeSelect && !gradeSelect.value && userData.grade) {
                    gradeSelect.value = userData.grade;
                }
            }
        }
    }
}

function closeReceiptModal() {
    const modal = document.getElementById('receiptModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        resetFileUpload();
    }
}

function removeImage() {
    resetFileUpload();
}

function resetFileUpload() {
    const fileInput = document.getElementById('receiptImage');
    const uploadArea = document.getElementById('fileUploadArea');
    const uploadPreview = document.getElementById('uploadPreview');
    const uploadPlaceholder = uploadArea?.querySelector('.upload-placeholder');
    
    if (fileInput) fileInput.value = '';
    if (uploadPreview) uploadPreview.style.display = 'none';
    if (uploadPlaceholder) uploadPlaceholder.style.display = 'block';
}

function showReceiptSuccessAnimation() {
    const successModal = document.createElement('div');
    successModal.className = 'success-modal-overlay';
    successModal.innerHTML = `
        <div class="success-modal-content">
            <div class="success-icon">
                <i class="fas fa-check-circle"></i>
            </div>
            <h3>تم رفع الإيصال بنجاح!</h3>
            <p>سيتم مراجعة الإيصال من قبل الإدارة وسيتم التواصل معك قريباً</p>
            <div class="success-animation">
                <div class="checkmark">
                    <svg viewBox="0 0 52 52">
                        <circle cx="26" cy="26" r="25" fill="none"/>
                        <path fill="none" d="m14.1 27.2l7.1 7.2 16.7-16.8"/>
                    </svg>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(successModal);
    
    setTimeout(() => {
        successModal.classList.add('active');
    }, 100);
    
    setTimeout(() => {
        successModal.classList.remove('active');
        setTimeout(() => {
            document.body.removeChild(successModal);
        }, 300);
    }, 3000);
}

// ===== Course Search Functionality =====
function initCourseSearch() {
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'البحث في الكورسات...';
    searchInput.className = 'course-search';
    searchInput.style.cssText = `
        width: 100%;
        max-width: 400px;
        padding: 1rem;
        margin: 0 auto 2rem;
        display: block;
        border: 2px solid var(--border-color);
        border-radius: var(--radius-lg);
        font-family: var(--font-arabic);
        font-size: var(--font-size-base);
        background: var(--bg-primary);
        color: var(--text-primary);
        transition: all var(--transition-normal);
    `;
    
    const coursesSection = document.querySelector('.courses .container');
    const sectionHeader = coursesSection.querySelector('.section-header');
    
    if (sectionHeader) {
        sectionHeader.appendChild(searchInput);
        
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const courseCards = document.querySelectorAll('.course-card');
            
            courseCards.forEach(card => {
                const title = card.querySelector('.course-title').textContent.toLowerCase();
                const description = card.querySelector('.course-description').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || description.includes(searchTerm)) {
                    card.style.display = 'block';
                    card.classList.remove('hidden');
                } else {
                    card.style.display = 'none';
                    card.classList.add('hidden');
                }
            });
        });
    }
}

// ===== Welcome Screen Enhanced =====
function initializeWelcomeScreen() {
    const welcomeScreen = document.getElementById('welcomeScreen');
    const typingText = document.getElementById('typingText');
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    
    if (!welcomeScreen) return;
    
    const messages = [
        'اكتشف أسرار الفيزياء معنا 🔬',
        'تعلم بطريقة مبسطة وممتعة ✨',
        'انضم إلى رحلة التفوق العلمي 🚀',
        'مع الأستاذ إسلام الشناوي 👨‍🏫'
    ];
    
    let messageIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typeMessage() {
        const currentMessage = messages[messageIndex];
        
        if (!isDeleting && charIndex < currentMessage.length) {
            typingText.textContent += currentMessage.charAt(charIndex);
            charIndex++;
            setTimeout(typeMessage, 80);
        } else if (isDeleting && charIndex > 0) {
            typingText.textContent = currentMessage.substring(0, charIndex - 1);
            charIndex--;
            setTimeout(typeMessage, 40);
        } else if (!isDeleting && charIndex === currentMessage.length) {
            setTimeout(() => {
                isDeleting = true;
                typeMessage();
            }, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            messageIndex = (messageIndex + 1) % messages.length;
            setTimeout(typeMessage, 200);
        }
    }
    
    // Start typing animation
    setTimeout(typeMessage, 1000);
    
    // Enhanced progress bar animation
    let progress = 0;
    const loadingSteps = [
        { progress: 15, text: 'تحميل الموارد...', delay: 100 },
        { progress: 35, text: 'تحضير المحتوى...', delay: 80 },
        { progress: 55, text: 'تجهيز الكورسات...', delay: 60 },
        { progress: 75, text: 'إعداد التجربة...', delay: 70 },
        { progress: 90, text: 'اللمسات الأخيرة...', delay: 90 },
        { progress: 100, text: 'مرحباً بك! 🎉', delay: 50 }
    ];
    
    let stepIndex = 0;
    
    function updateProgress() {
        if (stepIndex < loadingSteps.length) {
            const step = loadingSteps[stepIndex];
            const targetProgress = step.progress;
            
            const progressInterval = setInterval(() => {
                if (progress < targetProgress) {
                    progress += 1;
                    progressFill.style.width = progress + '%';
                    progressText.textContent = step.text;
                } else {
                    clearInterval(progressInterval);
                    stepIndex++;
                    setTimeout(updateProgress, step.delay);
                }
            }, 30);
        } else {
            // Finish loading with enhanced animation
            setTimeout(() => {
                welcomeScreen.style.transform = 'scale(1.1)';
                welcomeScreen.style.opacity = '0';
                setTimeout(() => {
                    welcomeScreen.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }, 800);
            }, 1000);
        }
    }
    
    // Start progress animation
    setTimeout(updateProgress, 500);
}

// ===== Load Videos from Admin Panel =====
function loadVideosFromAdmin() {
    // Return real course data from admin panel
    const realCourses = [
        {
            id: 1,
            title: 'فيديو فيزياء صف 9 متقدم',
            description: 'شرح شامل ومبسط لمنهج الصف التاسع المتقدم',
            duration: '120 دقيقة',
            category: 'grade9',
            videoUrl: 'https://drive.google.com/file/d/1vOihXtyhX7Xptn0kOs1fISHXsBQOzxum/view?usp=drive_link',
            thumbnail: 'https://via.placeholder.com/400x225/1e3a8a/ffffff?text=فيزياء+الصف+التاسع+المتقدم',
            isPremium: false,
            type: 'free'
        },
        {
            id: 2,
            title: 'فيديو صف 10 متقدم',
            description: 'شرح مفصل لمنهج العاشر المتقدم بطريقة ممتازة',
            duration: '135 دقيقة',
            category: 'grade10',
            videoUrl: 'https://drive.google.com/file/d/1iTO2628HDuKpEdPG5_z2VV-v0hHAs8sI/view?usp=drive_link',
            thumbnail: 'https://via.placeholder.com/400x225/3b82f6/ffffff?text=فيزياء+الصف+العاشر+المتقدم',
            isPremium: false,
            type: 'free'
        },
        {
            id: 3,
            title: 'فيديو فيزياء صف 11 متقدم',
            description: 'الفيديو الأصلي لمنهج الحادي عشر المتقدم كاملاً',
            duration: '145 دقيقة',
            category: 'grade11',
            videoUrl: 'https://drive.google.com/file/d/1hD5GUReRwAz5L-AJd-IaxKqqJ00DZkJJ/view?usp=drive_link',
            thumbnail: 'https://via.placeholder.com/400x225/f59e0b/ffffff?text=فيزياء+صف+11+متقدم',
            isPremium: false,
            type: 'free'
        }
    ];
    
    // Also check localStorage for any additional videos from admin
    const adminVideos = JSON.parse(localStorage.getItem('adminCourses') || '[]');
    const additionalVideos = adminVideos.map(video => ({
        id: video.id,
        title: video.title,
        description: video.description,
        duration: video.duration,
        category: video.grade,
        videoUrl: video.videoUrl,
        thumbnail: video.thumbnailUrl,
        isPremium: false,
        type: 'free'
    }));
    
    return [...realCourses, ...additionalVideos];
}

function extractVideoId(url) {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
    return match ? match[1] : '';
}
<<<<<<< HEAD

// ===== Initialize All New Features =====
document.addEventListener('DOMContentLoaded', () => {
    // Initialize welcome screen first
    initializeWelcomeScreen();
    
    // Initialize existing features
    initLoadingScreen();
    initScrollAnimations();
    initParallax();
    animateCounters();
    initScrollToTop();
    updateActiveNavLink();
    initLazyLoading();
    initFormValidation();
    initAOS();
    optimizePerformance();
    
    // Initialize new features
    initializeCourses();
    initializeReceiptModal();
    enhanceContactForm();
    checkAdminAccess();
    initEnhancedAnimations();
    initKeyboardNavigation();
    initCourseSearch();
    initializeNewFeatures();
    
    // Initialize typing effect after a delay
    setTimeout(initTypingEffect, 2000);
});

// ===== Experiments Section Functions =====
function showTodayLab() {
    const labModal = document.createElement('div');
    labModal.className = 'lab-modal';
    labModal.innerHTML = `
        <div class="modal-overlay" onclick="closeTodayLab()"></div>
        <div class="modal-content">
            <div class="modal-header">
                <h3>تجارب عملية - الصف العاشر المتقدم</h3>
                <button class="modal-close" onclick="closeTodayLab()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <div class="lab-content">
                    <div class="lab-info">
                        <h4>تجربة اليوم: دراسة الحركة التوافقية البسيطة</h4>
                        <p>في هذه التجربة سنقوم بدراسة:</p>
                        <ul>
                            <li>حركة البندول البسيط</li>
                            <li>تأثير الطول على الدورة الزمنية</li>
                            <li>العلاقة بين الكتلة والحركة</li>
                            <li>حساب التسارع الأرضي</li>
                        </ul>
                    </div>
                    <div class="lab-links">
                        <h4>روابط التجارب التفاعلية:</h4>
                        <div class="lab-buttons">
                            <a href="https://phet.colorado.edu/en/simulations/pendulum-lab" target="_blank" class="btn btn-primary">
                                <i class="fas fa-pendulum"></i>
                                تجربة البندول
                            </a>
                            <a href="https://phet.colorado.edu/sims/html/masses-and-springs/latest/masses-and-springs_all.html" target="_blank" class="btn btn-primary">
                                <i class="fas fa-spring"></i>
                                الكتلة والنابض
                            </a>
                        </div>
                    </div>
                    <div class="lab-instructions">
                        <h4>تعليمات التجربة:</h4>
                        <ol>
                            <li>افتح رابط تجربة البندول</li>
                            <li>غير طول البندول وسجل النتائج</li>
                            <li>احسب الدورة الزمنية لكل طول</li>
                            <li>ارسم العلاقة البيانية</li>
                            <li>استنتج العلاقة الرياضية</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(labModal);
    labModal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
    `;
    
    const overlay = labModal.querySelector('.modal-overlay');
    overlay.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(5px);
    `;
    
    const content = labModal.querySelector('.modal-content');
    content.style.cssText = `
        position: relative;
        background: var(--bg-primary);
        border-radius: 15px;
        max-width: 800px;
        max-height: 90vh;
        overflow-y: auto;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        animation: modalSlideIn 0.3s ease-out;
    `;
    
    const header = labModal.querySelector('.modal-header');
    header.style.cssText = `
        padding: 20px;
        border-bottom: 1px solid var(--border-color);
        display: flex;
        justify-content: space-between;
        align-items: center;
    `;
    
    const body = labModal.querySelector('.modal-body');
    body.style.cssText = `
        padding: 20px;
    `;
    
    const closeBtn = labModal.querySelector('.modal-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: var(--text-secondary);
        transition: color 0.3s;
    `;
    
    document.body.style.overflow = 'hidden';
}

function closeTodayLab() {
    const labModal = document.querySelector('.lab-modal');
    if (labModal) {
        labModal.remove();
        document.body.style.overflow = 'auto';
    }
}

// ===== Certificate Modal Functions =====
function openCertificateModal(imageUrl) {
    const certificateModal = document.getElementById('certificateModal');
    const certificateImage = document.getElementById('certificateImage');
    
    if (certificateModal && certificateImage) {
        certificateImage.src = imageUrl;
        certificateModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Add zoom functionality
        certificateImage.style.cursor = 'zoom-in';
        certificateImage.onclick = () => {
            if (certificateImage.style.transform === 'scale(1.5)') {
                certificateImage.style.transform = 'scale(1)';
                certificateImage.style.cursor = 'zoom-in';
            } else {
                certificateImage.style.transform = 'scale(1.5)';
                certificateImage.style.cursor = 'zoom-out';
            }
        };
    }
}

function closeCertificateModal() {
    const certificateModal = document.getElementById('certificateModal');
    const certificateImage = document.getElementById('certificateImage');
    
    if (certificateModal) {
        certificateModal.classList.remove('active');
        document.body.style.overflow = 'auto';
        
        if (certificateImage) {
            certificateImage.style.transform = 'scale(1)';
            certificateImage.onclick = null;
        }
    }
}

// ===== Enhanced Animations for New Sections =====
function initExperimentAnimations() {
    const experimentCards = document.querySelectorAll('.experiment-card');
    
    experimentCards.forEach((card, index) => {
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('.experiment-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('.experiment-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
}

function initCertificateAnimations() {
    const certificateItems = document.querySelectorAll('.certificate-item');
    
    certificateItems.forEach((item, index) => {
        item.addEventListener('mouseenter', () => {
            // Add subtle rotation effect
            item.style.transform = 'translateY(-5px) scale(1.02) rotate(1deg)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0) scale(1) rotate(0deg)';
        });
    });
}

// ===== Statistics Counter Animation =====
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = target.textContent;
                const numericValue = parseInt(finalValue.replace(/\D/g, ''));
                
                if (numericValue) {
                    animateNumber(target, 0, numericValue, finalValue);
                }
                
                observer.unobserve(target);
            }
        });
    });
    
    statNumbers.forEach(stat => observer.observe(stat));
}

function animateNumber(element, start, end, finalText) {
    const duration = 2000;
    const increment = end / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
            element.textContent = finalText;
            clearInterval(timer);
        } else {
            const suffix = finalText.includes('+') ? '+' : 
                          finalText.includes('%') ? '%' : '';
            element.textContent = Math.floor(current) + suffix;
        }
    }, 16);
}

// ===== Keyboard Navigation for Modals =====
function initModalKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            // Close any open modals
            closeCertificateModal();
            closeTodayLab();
            closeVideoModal();
        }
    });
}

// ===== Improved Loading Performance =====
function optimizeNewSections() {
    // Lazy load certificate images
    const certificateImages = document.querySelectorAll('.certificate-image img');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    certificateImages.forEach(img => {
        if (img.src) {
            img.dataset.src = img.src;
            img.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200"><rect width="300" height="200" fill="%23f3f4f6"/><text x="150" y="100" text-anchor="middle" fill="%236b7280">جاري التحميل...</text></svg>';
        }
        imageObserver.observe(img);
    });
}

// ===== Enhanced Accessibility =====
function enhanceAccessibility() {
    // Add ARIA labels to experiment buttons
    const experimentBtns = document.querySelectorAll('.experiment-btn');
    experimentBtns.forEach(btn => {
        const title = btn.closest('.experiment-card').querySelector('.experiment-title').textContent;
        btn.setAttribute('aria-label', `ابدأ تجربة ${title}`);
    });
    
    // Add ARIA labels to certificate buttons
    const certificateBtns = document.querySelectorAll('.view-certificate');
    certificateBtns.forEach((btn, index) => {
        btn.setAttribute('aria-label', `عرض شهادة التقدير رقم ${index + 1}`);
    });
    
    // Add keyboard navigation for certificate gallery
    const certificateItems = document.querySelectorAll('.certificate-item');
    certificateItems.forEach((item, index) => {
        item.setAttribute('tabindex', '0');
        item.setAttribute('role', 'button');
        item.setAttribute('aria-label', `شهادة تقدير رقم ${index + 1}`);
        
        item.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const img = item.querySelector('img');
                if (img) {
                    openCertificateModal(img.src);
                }
            }
        });
    });
}

// ===== Initialize New Features =====
function initializeNewFeatures() {
    initExperimentAnimations();
    initCertificateAnimations();
    animateStats();
    initModalKeyboardNavigation();
    optimizeNewSections();
    enhanceAccessibility();
    addAdvancedFeatures();
}

// ===== Advanced Features =====
function addAdvancedFeatures() {
    // Add smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Add active state to navigation
                document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    // Enhanced loading states for buttons
    document.querySelectorAll('.btn').forEach(btn => {
        if (!btn.dataset.originalText) {
            btn.dataset.originalText = btn.innerHTML;
        }
        
        btn.addEventListener('click', function(e) {
            if (!this.classList.contains('loading') && !this.href && !this.onclick) {
                e.preventDefault();
                this.classList.add('loading');
                this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري التحميل...';
                
                setTimeout(() => {
                    this.classList.remove('loading');
                    this.innerHTML = this.dataset.originalText;
                    
                    // Add success animation
                    this.classList.add('success');
                    setTimeout(() => this.classList.remove('success'), 1000);
                }, 1500);
            }
        });
    });

    // Enhanced progress indicator
    const progressBar = document.createElement('div');
    progressBar.className = 'page-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #1e40af, #3b82f6, #f59e0b);
        z-index: 9999;
        transition: width 0.3s ease;
        box-shadow: 0 0 10px rgba(30, 64, 175, 0.5);
    `;
    document.body.appendChild(progressBar);

    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
                progressBar.style.width = Math.min(scrollPercent, 100) + '%';
                ticking = false;
            });
            ticking = true;
        }
    });

    // Add keyboard shortcuts
    addKeyboardShortcuts();
    
    // Add performance optimizations
    addPerformanceOptimizations();
    
    // Add tooltips
    addTooltips();
}

// Keyboard shortcuts
function addKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + K for search
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            const searchInput = document.querySelector('#courseSearch');
            if (searchInput) {
                searchInput.focus();
            }
        }
        
        // Escape to close modals
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('.modal-overlay.active');
            if (activeModal) {
                activeModal.classList.remove('active');
            }
        }
        
        // Arrow keys for navigation
        if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
            const focusedElement = document.activeElement;
            if (focusedElement.classList.contains('course-card') || 
                focusedElement.classList.contains('experiment-card')) {
                e.preventDefault();
                const cards = Array.from(document.querySelectorAll('.course-card, .experiment-card'));
                const currentIndex = cards.indexOf(focusedElement);
                
                if (e.key === 'ArrowUp' && currentIndex > 0) {
                    cards[currentIndex - 1].focus();
                } else if (e.key === 'ArrowDown' && currentIndex < cards.length - 1) {
                    cards[currentIndex + 1].focus();
                }
            }
        }
    });
}

// Performance optimizations
function addPerformanceOptimizations() {
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // Preload critical resources
    const preloadLinks = [
        'https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700&display=swap',
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
    ];

    preloadLinks.forEach(href => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = href;
        document.head.appendChild(link);
    });

    // Optimize scroll performance
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        document.body.classList.add('scrolling');
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            document.body.classList.remove('scrolling');
        }, 150);
    }, { passive: true });
}

// Enhanced tooltips
function addTooltips() {
    const tooltip = document.createElement('div');
    tooltip.className = 'custom-tooltip';
    tooltip.style.cssText = `
        position: absolute;
        background: var(--bg-dark);
        color: white;
        padding: 8px 12px;
        border-radius: 6px;
        font-size: 14px;
        z-index: 10000;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.3s ease;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    `;
    document.body.appendChild(tooltip);

    document.querySelectorAll('[data-tooltip]').forEach(element => {
        element.addEventListener('mouseenter', (e) => {
            tooltip.textContent = e.target.dataset.tooltip;
            tooltip.style.opacity = '1';
        });

        element.addEventListener('mousemove', (e) => {
            tooltip.style.left = e.pageX + 10 + 'px';
            tooltip.style.top = e.pageY - 40 + 'px';
        });

        element.addEventListener('mouseleave', () => {
            tooltip.style.opacity = '0';
        });
    });
}

// ===== Global Functions for HTML =====
window.openVideoModal = openVideoModal;
window.closeVideoModal = closeVideoModal;
window.requireSubscription = requireSubscription;
window.showTodayLab = showTodayLab;
window.closeTodayLab = closeTodayLab;
window.openCertificateModal = openCertificateModal;
window.closeCertificateModal = closeCertificateModal;
=======
>>>>>>> cf0331e2ffd5392e3adcdd87fd7d42ac49fbee63
