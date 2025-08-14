// ===== Language Toggle System =====

// Get DOM elements for language switching
const languageToggle = document.getElementById('languageToggle');
const langButtons = document.querySelectorAll('.lang-btn');

// Initialize language from localStorage or default to Arabic
let currentLanguage = localStorage.getItem('language') || 'ar';

// Language translations object
const translations = {
    ar: {
        // Meta
        title: "الأستاذ إسلام الشناوي - مدرس فيزياء متخصص",
        description: "الأستاذ إسلام الشناوي، مدرس فيزياء للصفوف المتقدمة في الإمارات، بخبرة واسعة في تبسيط المفاهيم الفيزيائية",
        
        // Navigation
        home: "الرئيسية",
        about: "من أنا",
        courses: "الكورسات",
        pricing: "الاشتراكات",
        testimonials: "آراء الطلبة",
        faq: "أسئلة شائعة",
        contact: "تواصل معي",
        subscribe: "اشترك الآن",
        telegram: "تيليجرام",
        
        // Hero Section
        heroTitle: "مرحباً بك في عالم الفيزياء",
        heroHighlight: "الممتع والمبسط",
        heroSubtitle: "مع الأستاذ إسلام الشناوي، اكتشف أسرار الفيزياء وتفوق في دراستك",
        startJourney: "ابدأ رحلتك الآن",
        meetTeacher: "تعرف على الأستاذ",
        
        // About Section
        aboutTitle: "من هو الأستاذ إسلام الشناوي؟",
        
        // Features
        experience: "خبرة واسعة",
        experienceDesc: "سنوات من الخبرة في تدريس الفيزياء للصفوف المتقدمة",
        simplification: "تبسيط المفاهيم",
        simplificationDesc: "أسلوب مبتكر في شرح المفاهيم الفيزيائية المعقدة",
        results: "نتائج متميزة",
        resultsDesc: "مساعدة الطلبة على تحقيق أعلى الدرجات والتفوق",
        interactive: "تعليم تفاعلي",
        interactiveDesc: "حصص أونلاين تفاعلية مع تسجيل جميع الدروس",
        
        // Buttons
        telegramTitle: "انضم إلى قناة التيليجرام",
        themeToggleTitle: "تبديل الوضع",
        
        // Social Sharing
        shareTitle: "شارك مع الأصدقاء",
        whatsapp: "واتساب",
        telegram: "تيليجرام",
        twitter: "تويتر",
        facebook: "فيسبوك",
        copyLink: "نسخ الرابط",
        
        // Additional translations for existing content
        heroSlogan: "تعلم الفيزياء بسلاسة وسرعة",
        joinNow: "ابدأ الآن",
        guarantee: "ضمان استرداد المال خلال 30 يوم",
        studentsCount: "500+ طالب منتسب",
        successRate: "95% معدل النجاح",
        topGrades: "ضمان درجات A+",
        coursesTitle: "الكورسات والفيديوهات التعليمية",
        coursesSubtitle: "شاهد شروحاتي المفصلة واشترك للوصول إلى جميع الكورسات",
        allCourses: "جميع الكورسات",
        grade9: "الصف التاسع",
        grade10: "الصف العاشر",
        grade11: "الصف الحادي عشر",
        watchCourse: "مشاهدة الكورس",
        freePreview: "عينة مجانية",
        subscribeNow: "اشترك الآن",
        uploadReceipt: "رفع الإيصال",
        testimonialsTitle: "آراء الطلبة",
        testimonialsSubtitle: "ماذا يقول طلابنا عن تجربتهم معنا",
        
        // Rating System
        rateUs: "شاركنا رأيك",
        shareOpinion: "شاركنا رأيك",
        rateExperience: "كيف تقيم تجربتك؟",
        areaType: "نوع المنطقة:",
        chooseType: "اختر نوع",
        yourMessage: "رسائلك:",
        detailedFeedback: "شاركنا تفاصيل ملاحظاتك...",
        emailOptional: "البريد الإلكتروني (اختياري):",
        yourEmail: "بريدك الإلكتروني",
        weReply: "نرد عليك",
        sendFeedback: "إرسال الملاحظة",
        fieldRequired: "هذا الحقل مطلوب"
    },
    en: {
        // Meta
        title: "Professor Islam El-Shenawy - Specialized Physics Teacher",
        description: "Professor Islam El-Shenawy, physics teacher for advanced grades in UAE, with extensive experience in simplifying physics concepts",
        
        // Navigation
        home: "Home",
        about: "About",
        courses: "Courses",
        pricing: "Pricing",
        testimonials: "Testimonials",
        faq: "FAQ",
        contact: "Contact",
        subscribe: "Subscribe Now",
        telegram: "Telegram",
        
        // Hero Section
        heroTitle: "Welcome to the World of Physics",
        heroHighlight: "Fun and Simplified",
        heroSubtitle: "With Professor Islam El-Shenawy, discover the secrets of physics and excel in your studies",
        startJourney: "Start Your Journey Now",
        meetTeacher: "Meet the Professor",
        
        // About Section
        aboutTitle: "Who is Professor Islam El-Shenawy?",
        
        // Features
        experience: "Extensive Experience",
        experienceDesc: "Years of experience teaching physics to advanced grades",
        simplification: "Concept Simplification",
        simplificationDesc: "Innovative approach to explaining complex physics concepts",
        results: "Outstanding Results",
        resultsDesc: "Helping students achieve top grades and excel",
        interactive: "Interactive Learning",
        interactiveDesc: "Interactive online sessions with all lessons recorded",
        
        // Buttons
        telegramTitle: "Join Telegram Channel",
        themeToggleTitle: "Toggle Theme",
        
        // Social Sharing
        shareTitle: "Share with Friends",
        whatsapp: "WhatsApp",
        telegram: "Telegram",
        twitter: "Twitter",
        facebook: "Facebook",
        copyLink: "Copy Link",
        
        // Additional translations for existing content
        heroSlogan: "Learn Physics with Ease and Speed",
        joinNow: "Start Now",
        guarantee: "30-Day Money Back Guarantee",
        studentsCount: "500+ Enrolled Students",
        successRate: "95% Success Rate",
        topGrades: "A+ Grades Guaranteed",
        coursesTitle: "Educational Courses & Videos",
        coursesSubtitle: "Watch my detailed explanations and subscribe to access all courses",
        allCourses: "All Courses",
        grade9: "Grade 9",
        grade10: "Grade 10", 
        grade11: "Grade 11",
        watchCourse: "Watch Course",
        freePreview: "Free Preview",
        subscribeNow: "Subscribe Now",
        uploadReceipt: "Upload Receipt",
        testimonialsTitle: "Student Reviews",
        testimonialsSubtitle: "What our students say about their experience with us",
        
        // Rating System
        rateUs: "Rate Us",
        shareOpinion: "Share Your Opinion",
        rateExperience: "How do you rate your experience?",
        areaType: "Area Type:",
        chooseType: "Choose type",
        yourMessage: "Your Message:",
        detailedFeedback: "Share your detailed feedback...",
        emailOptional: "Email (Optional):",
        yourEmail: "Your email",
        weReply: "We'll reply to you",
        sendFeedback: "Send Feedback",
        fieldRequired: "This field is required"
    }
};

// Main language switching function
function setLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    
    // Update HTML attributes
    const htmlElement = document.documentElement;
    htmlElement.setAttribute('lang', lang);
    htmlElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    
    // Update active language button
    if (langButtons && langButtons.length > 0) {
        langButtons.forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
        });
    }
    
    // Update document title
    document.title = translations[lang].title;
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
        metaDescription.setAttribute('content', translations[lang].description);
    }
    
    // Update elements with data attributes (NEW SYSTEM)
    document.querySelectorAll('[data-ar][data-en]').forEach(element => {
        const text = element.getAttribute(`data-${lang}`);
        if (text) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = text;
            } else if (element.tagName === 'BUTTON') {
                // Handle button text (could be inside span)
                const span = element.querySelector('span');
                if (span) {
                    span.textContent = text;
                } else {
                    element.textContent = text;
                }
            } else {
                element.textContent = text;
            }
        }
    });
    
    // Update navigation links
    updateNavigation(lang);
    
    // Update hero section
    updateHeroSection(lang);
    
    // Update about section
    updateAboutSection(lang);
    
    // Update button titles
    updateButtonTitles(lang);
    
    // Update courses section
    updateCoursesSection(lang);
    
    // Update testimonials section  
    updateTestimonialsSection(lang);
    
    // Update pricing section
    updatePricingSection(lang);
    
    // Update rating system
    updateRatingSystem(lang);
    
    // Show notification
    const message = lang === 'ar' ? 'تم تغيير اللغة إلى العربية' : 'Language changed to English';
    showLanguageNotification(message, 'success');
}

// Update navigation links
function updateNavigation(lang) {
    const navLinks = document.querySelectorAll('.nav-link');
    const linkTexts = [
        translations[lang].home,
        translations[lang].about,
        translations[lang].courses,
        translations[lang].pricing,
        translations[lang].testimonials,
        translations[lang].faq,
        translations[lang].contact
    ];
    
    navLinks.forEach((link, index) => {
        if (index < linkTexts.length && !link.classList.contains('admin-link')) {
            link.textContent = linkTexts[index];
        }
    });
}

// Update hero section content
function updateHeroSection(lang) {
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    
    if (heroTitle) {
        heroTitle.innerHTML = `${translations[lang].heroTitle} <span class="highlight">${translations[lang].heroHighlight}</span>`;
    }
    if (heroSubtitle) {
        heroSubtitle.textContent = translations[lang].heroSubtitle;
    }
    
    // Update hero buttons
    const startJourneyBtn = document.querySelector('.hero-buttons .btn-primary');
    const meetTeacherBtn = document.querySelector('.hero-buttons .btn-outline');
    
    if (startJourneyBtn) {
        startJourneyBtn.innerHTML = `<i class="fas fa-rocket"></i> ${translations[lang].startJourney}`;
    }
    if (meetTeacherBtn) {
        meetTeacherBtn.innerHTML = `<i class="fas fa-user"></i> ${translations[lang].meetTeacher}`;
    }
}

// Update about section content
function updateAboutSection(lang) {
    const aboutTitle = document.querySelector('#about .section-title');
    if (aboutTitle) {
        aboutTitle.textContent = translations[lang].aboutTitle;
    }
    
    // Update feature items
    const featureItems = document.querySelectorAll('.feature-item h3');
    const featureDescriptions = document.querySelectorAll('.feature-item p');
    
    if (featureItems.length >= 4) {
        featureItems[0].textContent = translations[lang].experience;
        featureItems[1].textContent = translations[lang].simplification;
        featureItems[2].textContent = translations[lang].results;
        featureItems[3].textContent = translations[lang].interactive;
    }
    
    if (featureDescriptions.length >= 4) {
        featureDescriptions[0].textContent = translations[lang].experienceDesc;
        featureDescriptions[1].textContent = translations[lang].simplificationDesc;
        featureDescriptions[2].textContent = translations[lang].resultsDesc;
        featureDescriptions[3].textContent = translations[lang].interactiveDesc;
    }
}

// Update button titles
function updateButtonTitles(lang) {
    const telegramBtn = document.querySelector('.telegram-btn');
    const themeToggle = document.querySelector('#themeToggle');
    const floatingTelegram = document.querySelector('.floating-telegram');
    
    if (telegramBtn) {
        telegramBtn.setAttribute('title', translations[lang].telegramTitle);
    }
    
    if (themeToggle) {
        themeToggle.setAttribute('title', translations[lang].themeToggleTitle);
    }
    
    if (floatingTelegram) {
        const tooltipText = lang === 'ar' ? 'انضم إلى التيليجرام' : 'Join Telegram Channel';
        floatingTelegram.setAttribute('data-tooltip', tooltipText);
    }
}

// Show language change notification
function showLanguageNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `language-notification language-notification-${type}`;
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
        font-size: 14px;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Update courses section
function updateCoursesSection(lang) {
    const coursesTitle = document.querySelector('.courses .section-title');
    const coursesSubtitle = document.querySelector('.courses .section-subtitle');
    
    if (coursesTitle) coursesTitle.textContent = translations[lang].coursesTitle;
    if (coursesSubtitle) coursesSubtitle.textContent = translations[lang].coursesSubtitle;
    
    // Update category buttons
    const categoryBtns = document.querySelectorAll('.category-btn');
    const categoryTexts = [
        translations[lang].allCourses,
        translations[lang].grade9,
        translations[lang].grade10,
        translations[lang].grade11
    ];
    
    categoryBtns.forEach((btn, index) => {
        if (categoryTexts[index]) {
            btn.textContent = categoryTexts[index];
        }
    });
    
    // Update course buttons
    const courseBtns = document.querySelectorAll('.course-btn');
    courseBtns.forEach(btn => {
        if (btn.querySelector('span')) {
            btn.querySelector('span').textContent = translations[lang].watchCourse;
        }
    });
    
    const previewBtns = document.querySelectorAll('.course-preview');
    previewBtns.forEach(btn => {
        if (btn.querySelector('span')) {
            btn.querySelector('span').textContent = translations[lang].freePreview;
        }
    });
}

// Update testimonials section
function updateTestimonialsSection(lang) {
    const testimonialsTitle = document.querySelector('.testimonials .section-title');
    const testimonialsSubtitle = document.querySelector('.testimonials .section-subtitle');
    
    if (testimonialsTitle) testimonialsTitle.textContent = translations[lang].testimonialsTitle;
    if (testimonialsSubtitle) testimonialsSubtitle.textContent = translations[lang].testimonialsSubtitle;
}

// Update pricing section
function updatePricingSection(lang) {
    const subscribeButtons = document.querySelectorAll('.btn-primary');
    const uploadButtons = document.querySelectorAll('.btn-outline');
    
    subscribeButtons.forEach(btn => {
        if (btn.textContent.includes('اشترك') || btn.textContent.includes('Subscribe')) {
            btn.innerHTML = `<i class="fas fa-credit-card"></i> ${translations[lang].subscribeNow}`;
        }
    });
    
    uploadButtons.forEach(btn => {
        if (btn.textContent.includes('رفع') || btn.textContent.includes('Upload')) {
            btn.innerHTML = `<i class="fas fa-receipt"></i> ${translations[lang].uploadReceipt}`;
        }
    });
}

// Update rating system
function updateRatingSystem(lang) {
    const tooltip = document.querySelector('.rating-tooltip');
    if (tooltip) tooltip.textContent = translations[lang].rateUs;
}

// Initialize language system when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('🌍 Language system initializing...');
    
    // Wait a bit for all elements to be ready
    setTimeout(() => {
        // Set initial language
        setLanguage(currentLanguage);
        console.log(`🌍 Initial language set to: ${currentLanguage}`);
        
        // Re-select language buttons in case they were loaded dynamically
        const refreshedLangButtons = document.querySelectorAll('.lang-btn');
        console.log(`🌍 Found ${refreshedLangButtons.length} language buttons`);
        
        // Add event listeners to language buttons
        refreshedLangButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const lang = btn.getAttribute('data-lang');
                console.log(`🌍 Language button clicked: ${lang}`);
                if (lang && lang !== currentLanguage) {
                    setLanguage(lang);
                    console.log(`🌍 Language switched to: ${lang}`);
                }
            });
        });
        
        // Force update of language elements
        console.log('🌍 Forcing language update...');
        setLanguage(currentLanguage);
        
        console.log('🌍 Language system initialized successfully!');
    }, 500);
});

// Export functions for use in other scripts
window.LanguageSystem = {
    setLanguage,
    getCurrentLanguage: () => currentLanguage,
    translations
};