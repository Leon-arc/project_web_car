document.addEventListener('DOMContentLoaded', () => {
    // Check if user is already logged in
    const isLoggedIn = localStorage.getItem('aventador_isLoggedIn');
    const currentUser = localStorage.getItem('aventador_username');
    const currentPage = window.location.pathname.split('/').pop();

    // Authentication flow control
    if (currentPage === 'index.html' && !isLoggedIn) {
        // If trying to access main page without login, redirect to login
        window.location.href = 'login.html';
        return;
    } else if (currentPage === 'login.html' && isLoggedIn) {
        // If already logged in and accessing login page, redirect to welcome
        window.location.href = 'welcome.html';
        return;
    }

    // Password toggle functionality
    if (currentPage === 'login.html') {
        const passwordInput = document.getElementById('password');
        const passwordToggle = document.getElementById('password-toggle');
        const loginForm = document.getElementById('login-form');
        const loginMessage = document.getElementById('login-message');

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
                
                // Simple validation (can be enhanced with proper authentication)
                if (username.trim() === '') {
                    showMessage('Please enter a username', 'error');
                    return;
                }
                
                if (password.trim() === '') {
                    showMessage('Please enter a password', 'error');
                    return;
                }
                
                // Demo login - In a real app, you would validate against your server
                // For demo, accept any non-empty username/password
                if (username && password) {
                    // Store login state
                    localStorage.setItem('aventador_isLoggedIn', 'true');
                    localStorage.setItem('aventador_username', username);
                    
                    if (rememberMe) {
                        localStorage.setItem('aventador_rememberMe', 'true');
                    } else {
                        localStorage.removeItem('aventador_rememberMe');
                    }
                    
                    // Show success message before redirecting
                    showMessage('Login successful. Redirecting...', 'success');
                    
                    setTimeout(() => {
                        window.location.href = 'welcome.html';
                    }, 1000);
                } else {
                    showMessage('Invalid username or password', 'error');
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
    }

    // Welcome page functionality
    if (currentPage === 'welcome.html') {
        const welcomeUsername = document.getElementById('welcome-username');
        const progressBar = document.getElementById('progress-bar');
        
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
});

// Log out function (can be called from other pages)
function logOut() {
    localStorage.removeItem('aventador_isLoggedIn');
    window.location.href = 'login.html';
}