// Performance Optimizer for Ultra Fast Loading
// تحسين الأداء للتحميل السريع جداً

(function() {
    'use strict';
    
    console.log('🚀 Performance Optimizer loaded');
    
    // 1. Preload critical resources immediately
    function preloadCriticalResources() {
        const criticalImages = [
            'https://i.ibb.co/xSFLPSGn/image.png',
            'https://i.ibb.co/dsQw1yV4/image.png'
        ];
        
        criticalImages.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = src;
            document.head.appendChild(link);
        });
    }
    
    // 2. Optimize images loading
    function optimizeImages() {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            // Add loading="lazy" if not already present
            if (!img.hasAttribute('loading') && !img.src.includes('xSFLPSGn') && !img.src.includes('dsQw1yV4')) {
                img.loading = 'lazy';
            }
            
            // Add decode="async" for better performance
            img.decoding = 'async';
        });
    }
    
    // 3. Minimize reflows and repaints
    function optimizeDOM() {
        // Use requestAnimationFrame for DOM updates
        const observer = new MutationObserver(function(mutations) {
            requestAnimationFrame(() => {
                mutations.forEach(mutation => {
                    if (mutation.type === 'childList') {
                        optimizeImages();
                    }
                });
            });
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
    
    // 4. Optimize welcome screen for instant display
    function optimizeWelcomeScreen() {
        const welcomeScreen = document.getElementById('welcomeScreen');
        if (welcomeScreen) {
            // Force hardware acceleration
            welcomeScreen.style.transform = 'translateZ(0)';
            welcomeScreen.style.willChange = 'opacity, visibility, transform';
            
            // Optimize animations
            const animatedElements = welcomeScreen.querySelectorAll('[class*="welcome-"]');
            animatedElements.forEach(el => {
                el.style.transform = 'translateZ(0)';
                el.style.willChange = 'transform, opacity';
            });
        }
    }
    
    // 5. Reduce JavaScript execution time
    function optimizeScripts() {
        // Defer non-critical scripts
        const scripts = document.querySelectorAll('script[src]');
        scripts.forEach(script => {
            if (!script.src.includes('script.js') && 
                !script.src.includes('performance-optimizer.js') &&
                !script.hasAttribute('defer') && 
                !script.hasAttribute('async')) {
                script.defer = true;
            }
        });
    }
    
    // 6. Memory optimization
    function optimizeMemory() {
        // Clean up unused event listeners
        window.addEventListener('beforeunload', () => {
            // Remove all event listeners before page unload
            document.removeEventListener('DOMContentLoaded', initOptimizations);
            window.removeEventListener('load', finalOptimizations);
        });
    }
    
    // 7. Network optimization
    function optimizeNetwork() {
        // Add resource hints for external domains
        const domains = [
            'https://fonts.googleapis.com',
            'https://fonts.gstatic.com',
            'https://cdnjs.cloudflare.com',
            'https://unpkg.com',
            'https://www.gstatic.com'
        ];
        
        domains.forEach(domain => {
            const link = document.createElement('link');
            link.rel = 'dns-prefetch';
            link.href = domain;
            document.head.appendChild(link);
        });
    }
    
    // Initialize optimizations
    function initOptimizations() {
        console.log('🔧 Initializing performance optimizations...');
        preloadCriticalResources();
        optimizeWelcomeScreen();
        optimizeDOM();
        optimizeScripts();
        optimizeNetwork();
        optimizeMemory();
        console.log('✅ Performance optimizations complete');
    }
    
    // Final optimizations after page load
    function finalOptimizations() {
        console.log('🎯 Running final optimizations...');
        optimizeImages();
        
        // Remove will-change properties after animations complete
        setTimeout(() => {
            const elements = document.querySelectorAll('[style*="will-change"]');
            elements.forEach(el => {
                el.style.willChange = 'auto';
            });
        }, 3000);
        
        console.log('🏁 All optimizations complete');
    }
    
    // Run optimizations
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initOptimizations);
    } else {
        initOptimizations();
    }
    
    window.addEventListener('load', finalOptimizations);
    
})();