// Fake user database (localStorage)
let users = JSON.parse(localStorage.getItem('users')) || [];

// Modal functions
function showLogin() {
    document.getElementById('loginModal').style.display = 'block';
}

function closeLogin() {
    document.getElementById('loginModal').style.display = 'none';
    document.getElementById('loginForm').reset();
    document.getElementById('loginMessage').textContent = 'Please login to track your progress';
}

function showRegister() {
    closeLogin();
    document.getElementById('registerModal').style.display = 'block';
}

function closeRegister() {
    document.getElementById('registerModal').style.display = 'none';
    document.getElementById('registerForm').reset();
}

// FIXED REGISTER FORM - Works 100%
document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form inputs properly
    const formData = new FormData(e.target);
    const fullName = formData.get('fullName') || e.target.querySelector('input[type="text"]').value.trim();
    const email = formData.get('email') || e.target.querySelector('input[type="email"]').value.trim();
    const phone = formData.get('phone') || e.target.querySelector('input[type="tel"]').value.trim();
    const username = formData.get('username') || e.target.querySelectorAll('input[type="text"]')[1].value.trim();
    const password = e.target.querySelector('input[type="password"]').value;
    const confirmPassword = e.target.querySelectorAll('input[type="password"]')[1].value;
    
    // Validation
    if (password !== confirmPassword) {
        alert('❌ Passwords do not match!');
        return;
    }
    
    if (password.length < 6) {
        alert('❌ Password must be at least 6 characters!');
        return;
    }
    
    // Check if user exists
    if (users.find(user => user.email === email || user.phone === phone || user.username === username)) {
        alert('❌ User already exists! Please login.');
        return;
    }
    
    // Create new user
    const newUser = {
        fullName,
        email,
        phone,
        username,
        password,
        progress: {html: 0, css: 0, js: 0, python: 0, c: 0}
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    alert('✅ Registration successful! Please login.');
    closeRegister();
    showLogin();
});

// FIXED LOGIN FORM
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const emailPhone = document.getElementById('loginEmailPhone').value.trim();
    const password = document.getElementById('loginPassword').value;
    
    const user = users.find(u => 
        (u.email === emailPhone || u.phone === emailPhone || u.username === emailPhone) && 
        u.password === password
    );
    
    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        alert(`✅ Welcome back, ${user.fullName}!`);
        closeLogin();
        location.reload(); // Refresh to show logged-in state
    } else {
        document.getElementById('loginMessage').textContent = '❌ Invalid credentials. <a href="#" onclick="showRegister()">Register first</a>';
        document.getElementById('loginMessage').innerHTML = '❌ Invalid credentials. <a href="#" onclick="showRegister()">Register first</a>';
    }
});

// Navbar course links (for course pages)
function showLogin() {
    document.getElementById('loginModal').style.display = 'block';
}

// Close modals when clicking outside
window.onclick = function(event) {
    const loginModal = document.getElementById('loginModal');
    const registerModal = document.getElementById('registerModal');
    
    if (event.target === loginModal) closeLogin();
    if (event.target === registerModal) closeRegister();
}
