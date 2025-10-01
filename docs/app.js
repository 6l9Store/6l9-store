// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive components
    initMobileMenu();
    initFAQAccordion();
    initCategoryFiltering();
    initNewsletterForm();
    initSearchFunctionality();
    initSmoothScrolling();
    initGameCardInteractions();
});

// Mobile Menu Toggle
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.textContent = navMenu.classList.contains('active') ? '✕' : '☰';
        });

        // Close menu when clicking on nav links
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                menuToggle.textContent = '☰';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!menuToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                menuToggle.textContent = '☰';
            }
        });
    }
}

// FAQ Accordion
function initFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        if (question && answer) {
            question.addEventListener('click', function() {
                // Close other open FAQ items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        const otherQuestion = otherItem.querySelector('.faq-question');
                        const otherAnswer = otherItem.querySelector('.faq-answer');
                        otherQuestion.classList.remove('active');
                        otherAnswer.classList.remove('active');
                    }
                });
                
                // Toggle current FAQ item
                question.classList.toggle('active');
                answer.classList.toggle('active');
            });
        }
    });
}

// Category Filtering
function initCategoryFiltering() {
    const categoryBtns = document.querySelectorAll('.category-btn');
    
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            categoryBtns.forEach(otherBtn => otherBtn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get the selected category
            const selectedCategory = this.dataset.category;
            
            // Simulate filtering animation
            showFilterAnimation(selectedCategory);
        });
    });
}

function showFilterAnimation(category) {
    // Create a temporary notification
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #00d4ff 0%, #0099cc 100%);
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        font-weight: 500;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(0, 212, 255, 0.4);
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    notification.textContent = `Filtered by: ${category === 'all' ? 'All Games' : category.toUpperCase()}`;
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Animate out and remove
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 2000);
}

// Newsletter Form
function initNewsletterForm() {
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('.newsletter-input');
            const submitBtn = this.querySelector('.btn');
            const email = emailInput.value.trim();
            
            if (email && isValidEmail(email)) {
                // Simulate successful subscription
                const originalBtnText = submitBtn.textContent;
                submitBtn.textContent = 'Subscribed!';
                submitBtn.style.background = 'linear-gradient(135deg, #00ff88 0%, #00cc6a 100%)';
                
                emailInput.value = '';
                
                setTimeout(() => {
                    submitBtn.textContent = originalBtnText;
                    submitBtn.style.background = '';
                }, 2000);
                
                showNotification('Successfully subscribed to newsletter!', 'success');
            } else {
                showNotification('Please enter a valid email address.', 'error');
            }
        });
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Search Functionality
function initSearchFunctionality() {
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    
    if (searchInput && searchBtn) {
        function performSearch() {
            const query = searchInput.value.trim();
            if (query) {
                showNotification(`Searching for: "${query}"`, 'info');
                // In a real application, this would trigger actual search functionality
            }
        }
        
        searchBtn.addEventListener('click', performSearch);
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
        
        // Search suggestions simulation
        searchInput.addEventListener('input', function() {
            const query = this.value.trim().toLowerCase();
            if (query.length > 2) {
                // Simulate search suggestions
                console.log(`Searching for suggestions: ${query}`);
            }
        });
    }
}

// Smooth Scrolling
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Game Card Interactions
function initGameCardInteractions() {
    const gameCards = document.querySelectorAll('.game-card');
    
    gameCards.forEach(card => {
        // Add click interaction
        card.addEventListener('click', function() {
            const gameTitle = this.querySelector('h3, h4')?.textContent || 'Unknown Game';
            showGameDetails(gameTitle);
        });
        
        // Add hover effects for price animation
        const priceElement = card.querySelector('.current-price');
        if (priceElement) {
            card.addEventListener('mouseenter', function() {
                priceElement.style.transform = 'scale(1.1)';
                priceElement.style.color = '#00ff88';
            });
            
            card.addEventListener('mouseleave', function() {
                priceElement.style.transform = 'scale(1)';
                priceElement.style.color = '';
            });
        }
    });
}

function showGameDetails(gameTitle) {
    showNotification(`Viewing details for: ${gameTitle}`, 'info');
    // In a real application, this would open a game details modal or redirect to a product page
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    
    const colors = {
        success: 'linear-gradient(135deg, #00ff88 0%, #00cc6a 100%)',
        error: 'linear-gradient(135deg, #ff3030 0%, #cc0000 100%)',
        info: 'linear-gradient(135deg, #00d4ff 0%, #0099cc 100%)',
        warning: 'linear-gradient(135deg, #ff9800 0%, #cc7700 100%)'
    };
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${colors[type] || colors.info};
        color: white;
        padding: 16px 20px;
        border-radius: 8px;
        font-weight: 500;
        z-index: 1001;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto-remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Login/Register Button Interactions
document.addEventListener('DOMContentLoaded', function() {
    const loginBtn = document.querySelector('.login-btn');
    const registerBtn = document.querySelector('.register-btn');
    
    if (loginBtn) {
        loginBtn.addEventListener('click', function() {
            showNotification('Login functionality would be implemented here.', 'info');
        });
    }
    
    if (registerBtn) {
        registerBtn.addEventListener('click', function() {
            showNotification('Registration functionality would be implemented here.', 'info');
        });
    }
});

// Add some dynamic effects
function addDynamicEffects() {
    // Animate discount badges
    const discountBadges = document.querySelectorAll('.game-discount');
    discountBadges.forEach(badge => {
        badge.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(-5deg)';
            this.style.boxShadow = '0 4px 15px rgba(255, 48, 48, 0.6)';
        });
        
        badge.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
    
    // Add pulse effect to featured games
    const featuredCards = document.querySelectorAll('.game-card.featured');
    featuredCards.forEach(card => {
        setInterval(() => {
            card.style.boxShadow = '0 0 30px rgba(255, 107, 53, 0.8)';
            setTimeout(() => {
                card.style.boxShadow = '';
            }, 1000);
        }, 3000);
    });
}

// Initialize dynamic effects when page loads
document.addEventListener('DOMContentLoaded', addDynamicEffects);

// Add scroll-based animations
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
    
    // Observe game cards for scroll animations
    const gameCards = document.querySelectorAll('.game-card');
    gameCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Observe news cards
    const newsCards = document.querySelectorAll('.news-card');
    newsCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.15}s, transform 0.6s ease ${index * 0.15}s`;
        observer.observe(card);
    });
}

// Initialize scroll animations
document.addEventListener('DOMContentLoaded', initScrollAnimations);