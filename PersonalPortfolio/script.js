// Logo Loading Animation
document.addEventListener('DOMContentLoaded', function() {

    const loadingOverlay = document.createElement('div');
    loadingOverlay.id = 'loading-overlay';
    loadingOverlay.innerHTML = `
        <div class="loading-logo">
            <img src="assests/logo.png" alt="Loading...">
        </div>
    `;
    document.body.appendChild(loadingOverlay);
    

    document.body.style.overflow = 'hidden';
    
    setTimeout(() => {
        loadingOverlay.classList.add('fade-out');
        document.body.style.overflow = 'auto';
        

        setTimeout(() => {
            loadingOverlay.remove();
            initScrollAnimations();
            initNavbarFade();
            initFormValidation();
            initCustomCursor();
        }, 800);
    }, 2000);
});

// Fade-in Animation on Scroll
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    const elementsToAnimate = [
        '.profile-info',
        '.about-container',
        '.tools-icons',
        '.project-left',
        '.contact-container',
        '.footer-content'
    ];
    
    elementsToAnimate.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            el.style.transitionDelay = `${index * 0.2}s`;
            observer.observe(el);
        });
    });
}

// 3. Navigation Bar Fade on Scroll
function initNavbarFade() {
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;
    let isScrolling = false;
    
    function updateNavbar() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            if (currentScrollY > lastScrollY) {
                // Scrolling down
                header.style.transform = 'translateY(-100%)';
                header.style.opacity = '0.7';
            } else {
                // Scrolling up
                header.style.transform = 'translateY(0)';
                header.style.opacity = '1';
            }
        } else {
            header.style.transform = 'translateY(0)';
            header.style.opacity = '1';
        }
        
        lastScrollY = currentScrollY;
        isScrolling = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!isScrolling) {
            requestAnimationFrame(updateNavbar);
            isScrolling = true;
        }
    });
    
    header.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
}

// Form Validation
function initFormValidation() {
    const form = document.querySelector('.contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    const submitBtn = document.querySelector('.submit-btn');
    
    // Validation patterns
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const namePattern = /^[a-zA-Z\s]{2,50}$/;
    
    // Create error message elements
    function createErrorElement(input) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.cssText = `
            color: #ff6b6b;
            font-size: 12px;
            margin-top: 5px;
            opacity: 0;
            transition: opacity 0.3s ease;
            font-family: "IBM Plex Mono", monospace;
        `;
        input.parentNode.appendChild(errorDiv);
        return errorDiv;
    }
    
    const nameError = createErrorElement(nameInput);
    const emailError = createErrorElement(emailInput);
    const subjectError = createErrorElement(subjectInput);
    const messageError = createErrorElement(messageInput);
    
    // Validation functions
    function validateName() {
        const value = nameInput.value.trim();
        if (!value) {
            showError(nameError, 'Name is required');
            return false;
        } else if (!namePattern.test(value)) {
            showError(nameError, 'Please enter a valid name (2-50 characters)');
            return false;
        } else {
            hideError(nameError);
            return true;
        }
    }
    
    function validateEmail() {
        const value = emailInput.value.trim();
        if (!value) {
            showError(emailError, 'Email is required');
            return false;
        } else if (!emailPattern.test(value)) {
            showError(emailError, 'Please enter a valid email address');
            return false;
        } else {
            hideError(emailError);
            return true;
        }
    }
    
    function validateSubject() {
        const value = subjectInput.value.trim();
        if (!value) {
            showError(subjectError, 'Subject is required');
            return false;
        } else if (value.length < 5) {
            showError(subjectError, 'Subject must be at least 5 characters');
            return false;
        } else {
            hideError(subjectError);
            return true;
        }
    }
    
    function validateMessage() {
        const value = messageInput.value.trim();
        if (!value) {
            showError(messageError, 'Message is required');
            return false;
        } else if (value.length < 10) {
            showError(messageError, 'Message must be at least 10 characters');
            return false;
        } else {
            hideError(messageError);
            return true;
        }
    }
    
    function showError(errorElement, message) {
        errorElement.textContent = message;
        errorElement.style.opacity = '1';
        errorElement.previousElementSibling.style.borderColor = '#ff6b6b';
    }
    
    function hideError(errorElement) {
        errorElement.style.opacity = '0';
        errorElement.previousElementSibling.style.borderColor = 'transparent';
    }
    
    // Real-time validation
    nameInput.addEventListener('blur', validateName);
    emailInput.addEventListener('blur', validateEmail);
    subjectInput.addEventListener('blur', validateSubject);
    messageInput.addEventListener('blur', validateMessage);
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isSubjectValid = validateSubject();
        const isMessageValid = validateMessage();
        
        if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
    
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            submitBtn.style.backgroundColor = '#4CAF50';
            
            setTimeout(() => {
                form.reset();
                submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
                submitBtn.style.backgroundColor = '#E2C044';
            }, 2000);
        }
    });
}

// Cursor with Yellow Glow
function initCustomCursor() {
    // Create cursor element
    const cursor = document.createElement('div');
    cursor.id = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 50px;
        height: 50px;
        background: radial-gradient(circle, rgba(226, 192, 68, 0.8) 0%, rgba(226, 192, 68, 0.3) 50%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease;
        mix-blend-mode: screen;
    `;
    document.body.appendChild(cursor);
    
    // Update cursor position
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = (e.clientX - 10) + 'px';
        cursor.style.top = (e.clientY - 10) + 'px';
    });
    
    // Cursor interactions
    const interactiveElements = document.querySelectorAll('a, button, .tech-list li, .tools-icons img');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
            cursor.style.background = 'radial-gradient(circle, rgba(226, 192, 68, 1) 0%, rgba(226, 192, 68, 0.5) 50%, transparent 70%)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.background = 'radial-gradient(circle, rgba(226, 192, 68, 0.8) 0%, rgba(226, 192, 68, 0.3) 50%, transparent 70%)';
        });
    });
}


const additionalStyles = `
<style>
#loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #1E2019;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10000;
    transition: opacity 0.8s ease;
}

#loading-overlay.fade-out {
    opacity: 0;
}

.loading-logo img {
    width: 120px;
    height: 120px;
    animation: pulse 2s infinite;
}

@keyframes pulse {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.1); opacity: 0.8; }
}

.fade-in {
    opacity: 1 !important;
    transform: translateY(0) !important;
}

.error-message {
    font-family: "IBM Plex Mono", monospace;
}

/* Smooth scrolling for navigation links */
html {
    scroll-behavior: smooth;
}

/* Hide cursor on touch devices */
@media (hover: none) {
    #custom-cursor {
        display: none !important;
    }
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .social-icons {
        display: none;
    }
    
    #custom-cursor {
        display: none;
    }
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', additionalStyles);