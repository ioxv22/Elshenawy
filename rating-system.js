// ===== Rating System JavaScript =====

class RatingSystem {
    constructor() {
        this.currentRating = 0;
        this.modal = null;
        this.stars = null;
        this.form = null;
        this.init();
    }

    init() {
        // Wait for DOM to be loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }

    setup() {
        this.modal = document.getElementById('ratingModal');
        this.stars = document.querySelectorAll('.star-rating .star');
        this.form = document.getElementById('ratingForm');

        if (!this.modal || !this.stars.length || !this.form) {
            console.log('Rating system elements not found');
            return;
        }

        this.attachEventListeners();
    }

    attachEventListeners() {
        // Float button click
        const floatBtn = document.getElementById('ratingFloatBtn');
        if (floatBtn) {
            floatBtn.addEventListener('click', () => this.openModal());
        }

        // Close button click
        const closeBtn = document.getElementById('ratingClose');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.closeModal());
        }

        // Modal backdrop click
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });

        // Star rating system
        this.stars.forEach((star, index) => {
            star.addEventListener('click', () => this.setRating(index + 1));
            star.addEventListener('mouseenter', () => this.highlightStars(index + 1));
        });

        // Reset star highlighting when leaving the star container
        const starContainer = document.querySelector('.star-rating');
        if (starContainer) {
            starContainer.addEventListener('mouseleave', () => this.highlightStars(this.currentRating));
        }

        // Form submission
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));

        // ESC key to close modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                this.closeModal();
            }
        });
    }

    openModal() {
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Focus first input
        const firstInput = this.form.querySelector('select, textarea, input');
        if (firstInput) {
            setTimeout(() => firstInput.focus(), 300);
        }
    }

    closeModal() {
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
        this.resetForm();
    }

    setRating(rating) {
        this.currentRating = rating;
        this.highlightStars(rating);
        
        // Add glowing effect
        this.stars.forEach((star, index) => {
            if (index < rating) {
                star.classList.add('active');
            } else {
                star.classList.remove('active');
            }
        });
    }

    highlightStars(rating) {
        this.stars.forEach((star, index) => {
            if (index < rating) {
                star.style.color = '#fbbf24';
                star.style.transform = 'scale(1.2)';
            } else {
                star.style.color = '#d1d5db';
                star.style.transform = 'scale(1)';
            }
        });
    }

    async handleSubmit(e) {
        e.preventDefault();
        console.log('📝 Rating form submitted!');

        if (this.currentRating === 0) {
            this.showNotification('يرجى اختيار تقييم أولاً | Please select a rating first', 'error');
            return;
        }

        const formData = new FormData(this.form);
        const ratingData = {
            rating: this.currentRating,
            grade: formData.get('grade'),
            message: formData.get('message'),
            email: formData.get('email') || '',
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent
        };

        // Show loading state
        const submitBtn = this.form.querySelector('.submit-rating-btn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>جاري الإرسال...</span>';
        submitBtn.disabled = true;

        try {
            // Simulate API call (replace with actual endpoint)
            await this.submitRating(ratingData);
            
            this.showNotification('شكراً لك! تم إرسال التقييم بنجاح | Thank you! Rating submitted successfully', 'success');
            this.closeModal();
        } catch (error) {
            console.error('Rating submission error:', error);
            this.showNotification('حدث خطأ في الإرسال، يرجى المحاولة مرة أخرى | Error sending rating, please try again', 'error');
        } finally {
            // Restore button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    }

    async submitRating(data) {
        // Save to localStorage for admin panel
        const existingRatings = JSON.parse(localStorage.getItem('studentRatings') || '[]');
        const ratingWithId = {
            id: Date.now(),
            ...data,
            status: 'new'
        };
        existingRatings.push(ratingWithId);
        localStorage.setItem('studentRatings', JSON.stringify(existingRatings));
        
        // Also save to admin messages for review
        const existingMessages = JSON.parse(localStorage.getItem('adminMessages') || '[]');
        const messageFromRating = {
            id: Date.now() + Math.random(),
            name: `طالب ${data.grade}`,
            email: data.email || 'غير محدد',
            grade: data.grade,
            phone: 'غير محدد',
            message: `تقييم: ${data.rating}/5 نجوم\n\nالرسالة: ${data.message}`,
            date: data.timestamp,
            status: 'new',
            priority: data.rating <= 3 ? 'high' : 'medium',
            type: 'rating'
        };
        existingMessages.push(messageFromRating);
        localStorage.setItem('adminMessages', JSON.stringify(existingMessages));
        
        // Send to Telegram if low rating (optional)
        if (data.rating <= 3) {
            const telegramMessage = `🚨 تقييم منخفض!\n\n⭐ التقييم: ${data.rating}/5\n👤 الصف: ${data.grade}\n📧 البريد: ${data.email}\n\n💬 الرسالة:\n${data.message}`;
            // You can implement Telegram Bot API here
        }
        
        console.log('Rating saved:', ratingWithId);
        
        // Simulate API call
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Always resolve successfully since we're saving locally
                resolve({ success: true, id: ratingWithId.id });
            }, 1000);
        });
    }

    resetForm() {
        this.currentRating = 0;
        this.form.reset();
        this.highlightStars(0);
        this.stars.forEach(star => star.classList.remove('active'));
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `rating-notification rating-notification-${type}`;
        
        const icon = type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle';
        const bgColor = type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6';
        
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${icon}"></i>
                <span>${message}</span>
            </div>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${bgColor};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 0.5rem;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
            z-index: 10001;
            transform: translateX(400px);
            transition: transform 0.3s ease-in-out;
            max-width: 350px;
            font-family: var(--font-arabic);
            font-size: 14px;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            line-height: 1.5;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 5000);
    }
}

// Initialize the rating system
window.addEventListener('load', () => {
    console.log('⭐ Initializing Rating System...');
    new RatingSystem();
    console.log('⭐ Rating System initialized successfully!');
});

// Export for external use
window.RatingSystem = RatingSystem;