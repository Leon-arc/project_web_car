document.addEventListener('DOMContentLoaded', () => {
    // Check if user is already logged in
    const isLoggedIn = localStorage.getItem('aventador_isLoggedIn');
    const currentUser = localStorage.getItem('aventador_username');
    const currentPage = window.location.pathname.split('/').pop();

    // Enable smooth scrolling for all pages
    document.documentElement.style.scrollBehavior = 'smooth'
    
    // Authentication flow control
    if (currentPage === 'index.html' && !isLoggedIn) {
        window.location.href = 'login.html';
        return;
    } else if (currentPage === 'login.html' && isLoggedIn) {
        window.location.href = 'welcome.html';
        return;
    }

    // Initialize scroll enhancements
    initializeScrollEnhancements()

    // Password toggle functionality
    if (currentPage === 'login.html') {
        const passwordInput = document.getElementById('password');
        const passwordToggle = document.getElementById('password-toggle');
        const loginForm = document.getElementById('login-form');
        const loginMessage = document.getElementById('login-message');

        // Add scroll support for login form
        setupLoginScrolling()

        // Password visibility toggle
        if (passwordToggle) {
            passwordToggle.addEventListener('click', () => {
                const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
                passwordInput.setAttribute('type', type);
                
                // Toggle icon
                passwordToggle.classList.toggle('ri-eye-line');
                passwordToggle.classList.toggle('ri-eye-off-line');
            });
        }

        // Login form submission
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                const username = document.getElementById('username').value;
                const password = document.getElementById('password').value;
                const rememberMe = document.getElementById('remember').checked;
                
                // Simple validation
                if (username.trim() === '') {
                    showMessage('Please enter a username', 'error');
                    scrollToMessage();
                    return;
                }
                
                if (password.trim() === '') {
                    showMessage('Please enter a password', 'error');
                    scrollToMessage();
                    return;
                }
                
                // Demo login
                if (username && password) {
                    localStorage.setItem('aventador_isLoggedIn', 'true');
                    localStorage.setItem('aventador_username', username);
                    
                    if (rememberMe) {
                        localStorage.setItem('aventador_rememberMe', 'true');
                    } else {
                        localStorage.removeItem('aventador_rememberMe');
                    }
                    
                    showMessage('Login successful. Redirecting...', 'success');
                    
                    setTimeout(() => {
                        window.location.href = 'welcome.html';
                    }, 1000);
                } else {
                    showMessage('Invalid username or password', 'error');
                    scrollToMessage();
                    loginForm.classList.add('shake');
                    setTimeout(() => {
                        loginForm.classList.remove('shake');
                    }, 500);
                }
            });
        }

        // Message display function
        function showMessage(message, type) {
            loginMessage.textContent = message;
            loginMessage.className = 'login__message ' + type;
            
            if (type === 'error') {
                setTimeout(() => {
                    loginMessage.classList.remove('error');
                    loginMessage.textContent = '';
                }, 3000);
            }
        }

        // Scroll to message function
        function scrollToMessage() {
            setTimeout(() => {
                const form = document.querySelector('.login__form');
                if (form) {
                    form.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                }
            }, 100);
        }
    }

    // Welcome page functionality
    if (currentPage === 'welcome.html') {
        const welcomeUsername = document.getElementById('welcome-username');
        const progressBar = document.getElementById('progress-bar');
        
        // Setup welcome page scrolling
        setupWelcomeScrolling()
        
        // Display username 
        if (welcomeUsername && currentUser) {
            welcomeUsername.textContent = currentUser;
        }
        
        // Progress bar animation
        let width = 0;
        const autoRedirectTime = 5000; // 5 seconds
        const interval = 50;
        const increment = (100 / (autoRedirectTime / interval));
        
        const progressTimer = setInterval(() => {
            if (width >= 100) {
                clearInterval(progressTimer);
                window.location.href = 'index.html';
            } else {
                width += increment;
                progressBar.style.width = width + '%';
            }
        }, interval);
    }

    // Function to initialize scroll enhancements
    function initializeScrollEnhancements() {
        // Add smooth scrolling to all internal links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Add keyboard scroll support for pages
        document.addEventListener('keydown', (e) => {
            if (!e.ctrlKey && !e.altKey && !e.shiftKey) {
                switch(e.key) {
                    case 'ArrowDown':
                        e.preventDefault();
                        window.scrollBy({ top: 100, behavior: 'smooth' });
                        break;
                    case 'ArrowUp':
                        e.preventDefault();
                        window.scrollBy({ top: -100, behavior: 'smooth' });
                        break;
                    case 'PageDown':
                        e.preventDefault();
                        window.scrollBy({ top: window.innerHeight * 0.8, behavior: 'smooth' });
                        break;
                    case 'PageUp':
                        e.preventDefault();
                        window.scrollBy({ top: -window.innerHeight * 0.8, behavior: 'smooth' });
                        break;
                    case 'Home':
                        e.preventDefault();
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                        break;
                    case 'End':
                        e.preventDefault();
                        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                        break;
                }
            }
        });
    }

    // Function to setup login page scrolling
    function setupLoginScrolling() {
        const loginForm = document.querySelector('.login__form');
        const loginContainer = document.querySelector('.login__container');
        
        if (loginForm) {
            // Add scroll event listener
            loginForm.addEventListener('scroll', function() {
                // Add visual feedback for scrollable content
                if (this.scrollTop > 0) {
                    this.classList.add('scrolled');
                } else {
                    this.classList.remove('scrolled');
                }
            });

            // Auto-scroll to show more content if needed
            setTimeout(() => {
                if (loginForm.scrollHeight > loginForm.clientHeight) {
                    loginForm.classList.add('has-scroll');
                }
            }, 500);
        }

        // Handle container scrolling on mobile
        if (window.innerWidth <= 768 && loginContainer) {
            loginContainer.style.alignItems = 'flex-start';
            loginContainer.style.paddingTop = '2rem';
        }
    }

    // Function to setup welcome page scrolling
    function setupWelcomeScrolling() {
        const welcomeContent = document.querySelector('.welcome__main-content');
        const welcomeContainer = document.querySelector('.welcome__container');
        
        if (welcomeContent) {
            // Add scroll event listener
            welcomeContent.addEventListener('scroll', function() {
                if (this.scrollTop > 0) {
                    this.classList.add('scrolled');
                } else {
                    this.classList.remove('scrolled');
                }
            });

            // Auto-scroll to show more content if needed
            setTimeout(() => {
                if (welcomeContent.scrollHeight > welcomeContent.clientHeight) {
                    welcomeContent.classList.add('has-scroll');
                }
            }, 500);
        }

        // Handle container scrolling
        if (welcomeContainer) {
            if (window.innerWidth <= 768) {
                welcomeContainer.style.alignItems = 'flex-start';
                welcomeContainer.style.paddingTop = '1rem';
            }
        }
    }

    // Handle window resize for responsive scrolling
    window.addEventListener('resize', () => {
        if (currentPage === 'login.html') {
            setupLoginScrolling();
        } else if (currentPage === 'welcome.html') {
            setupWelcomeScrolling();
        }
    });
});

// Log out function (can be called from other pages)
function logOut() {
    localStorage.removeItem('aventador_isLoggedIn');
    localStorage.removeItem('aventador_username');
    localStorage.removeItem('aventador_rememberMe');
    window.location.href = 'login.html';
}

// Scroll to top function for pages
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Export functions for global use
window.scrollToTop = scrollToTop;