// ===== Social Sharing System =====

// Social sharing functionality
class SocialShare {
    constructor() {
        this.baseUrl = window.location.origin;
        this.pageTitle = document.title;
        this.pageDescription = document.querySelector('meta[name="description"]')?.content || '';
        this.init();
    }
    
    init() {
        this.createShareButtons();
        this.addEventListeners();
        this.createFloatingShareButton();
    }
    
    // Create main share buttons
    createShareButtons() {
        const shareContainer = document.createElement('div');
        shareContainer.className = 'social-share-container';
        shareContainer.innerHTML = `
            <div class="share-section">
                <h3 class="share-title">
                    <i class="fas fa-share-alt"></i>
                    <span data-ar="شارك مع الأصدقاء" data-en="Share with Friends">شارك مع الأصدقاء</span>
                </h3>
                <div class="share-buttons">
                    <button class="share-btn whatsapp" data-platform="whatsapp">
                        <i class="fab fa-whatsapp"></i>
                        <span data-ar="واتساب" data-en="WhatsApp">واتساب</span>
                    </button>
                    <button class="share-btn telegram" data-platform="telegram">
                        <i class="fab fa-telegram"></i>
                        <span data-ar="تيليجرام" data-en="Telegram">تيليجرام</span>
                    </button>
                    <button class="share-btn twitter" data-platform="twitter">
                        <i class="fab fa-twitter"></i>
                        <span data-ar="تويتر" data-en="Twitter">تويتر</span>
                    </button>
                    <button class="share-btn facebook" data-platform="facebook">
                        <i class="fab fa-facebook"></i>
                        <span data-ar="فيسبوك" data-en="Facebook">فيسبوك</span>
                    </button>
                    <button class="share-btn copy" data-platform="copy">
                        <i class="fas fa-copy"></i>
                        <span data-ar="نسخ الرابط" data-en="Copy Link">نسخ الرابط</span>
                    </button>
                </div>
            </div>
        `;
        
        // Insert after about section
        const aboutSection = document.querySelector('#about');
        if (aboutSection) {
            aboutSection.parentNode.insertBefore(shareContainer, aboutSection.nextSibling);
        }
    }
    
    // Create floating share button
    createFloatingShareButton() {
        const floatingShare = document.createElement('div');
        floatingShare.className = 'floating-share';
        floatingShare.innerHTML = `
            <button class="floating-share-btn" id="floatingShareBtn">
                <i class="fas fa-share-alt"></i>
            </button>
            <div class="floating-share-menu" id="floatingShareMenu">
                <button class="mini-share-btn" data-platform="whatsapp" title="واتساب">
                    <i class="fab fa-whatsapp"></i>
                </button>
                <button class="mini-share-btn" data-platform="telegram" title="تيليجرام">
                    <i class="fab fa-telegram"></i>
                </button>
                <button class="mini-share-btn" data-platform="twitter" title="تويتر">
                    <i class="fab fa-twitter"></i>
                </button>
                <button class="mini-share-btn" data-platform="copy" title="نسخ الرابط">
                    <i class="fas fa-copy"></i>
                </button>
            </div>
        `;
        
        document.body.appendChild(floatingShare);
        
        // Floating share toggle functionality
        const floatingBtn = document.getElementById('floatingShareBtn');
        const floatingMenu = document.getElementById('floatingShareMenu');
        
        floatingBtn.addEventListener('click', () => {
            floatingMenu.classList.toggle('active');
            floatingBtn.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!floatingShare.contains(e.target)) {
                floatingMenu.classList.remove('active');
                floatingBtn.classList.remove('active');
            }
        });
    }
    
    // Add event listeners
    addEventListeners() {
        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-platform]') || e.target.closest('[data-platform]')) {
                const button = e.target.matches('[data-platform]') ? e.target : e.target.closest('[data-platform]');
                const platform = button.getAttribute('data-platform');
                this.share(platform);
            }
        });
    }
    
    // Main sharing function
    share(platform) {
        const shareData = {
            url: this.baseUrl,
            title: this.pageTitle,
            text: `🔥 تعلم الفيزياء مع الأستاذ إسلام الشناوي - شروحات مبسطة وممتعة!\n\n${this.pageDescription}\n\n`
        };
        
        const shareUrls = {
            whatsapp: `https://wa.me/?text=${encodeURIComponent(shareData.text + shareData.url)}`,
            telegram: `https://t.me/share/url?url=${encodeURIComponent(shareData.url)}&text=${encodeURIComponent(shareData.text)}`,
            twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareData.text)}&url=${encodeURIComponent(shareData.url)}`,
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareData.url)}&quote=${encodeURIComponent(shareData.text)}`
        };
        
        if (platform === 'copy') {
            this.copyToClipboard(shareData.url);
        } else if (shareUrls[platform]) {
            window.open(shareUrls[platform], '_blank', 'width=600,height=400');
        }
        
        // Close floating menu after sharing
        const floatingMenu = document.getElementById('floatingShareMenu');
        const floatingBtn = document.getElementById('floatingShareBtn');
        if (floatingMenu) {
            floatingMenu.classList.remove('active');
            floatingBtn.classList.remove('active');
        }
    }
    
    // Copy to clipboard function
    async copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
            this.showShareNotification('تم نسخ الرابط بنجاح!', 'success');
        } catch (err) {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            
            try {
                document.execCommand('copy');
                this.showShareNotification('تم نسخ الرابط بنجاح!', 'success');
            } catch (err) {
                this.showShareNotification('فشل في نسخ الرابط', 'error');
            }
            
            document.body.removeChild(textArea);
        }
    }
    
    // Show notification
    showShareNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `share-notification share-notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
                <span>${message}</span>
            </div>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
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
            display: flex;
            align-items: center;
            gap: 0.5rem;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// Course-specific sharing
function shareCourse(courseTitle, courseDescription) {
    const shareText = `📚 ${courseTitle}\n\n${courseDescription}\n\nمع الأستاذ إسلام الشناوي\n\n`;
    const shareUrl = `https://wa.me/?text=${encodeURIComponent(shareText + window.location.href)}`;
    window.open(shareUrl, '_blank');
}

// Group enrollment sharing
function shareGroupDiscount() {
    const message = `🎓 خصم جماعي على كورسات الفيزياء!\n\nانضم مع أصدقائك واحصل على خصم مميز\nمع الأستاذ إسلام الشناوي\n\n${window.location.href}`;
    const shareUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(shareUrl, '_blank');
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new SocialShare();
});

// Export for use in other scripts
window.SocialShare = SocialShare;