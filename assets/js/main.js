// Typing Effect dengan Loop
const text = "Muhamad Aufa Al-Baihaqi";
const typingElement = document.getElementById("typing-text");
let index = 0;
let isDeleting = false;

function typeWriter() {
    const currentText = text.substring(0, index);
    typingElement.textContent = currentText;

    if (!isDeleting && index < text.length) {
        // Mengetik - tambah huruf
        index++;
        setTimeout(typeWriter, 120);
    } else if (!isDeleting && index === text.length) {
        // Pause setelah selesai mengetik
        setTimeout(() => {
            isDeleting = true;
            typeWriter();
        }, 2500);
    } else if (isDeleting && index > 0) {
        // Menghapus - kurangi huruf
        index--;
        setTimeout(typeWriter, 80);
    } else if (isDeleting && index === 0) {
        // Reset dan mulai lagi
        isDeleting = false;
        setTimeout(typeWriter, 800);
    }
}

// Start typing when page loads
window.addEventListener('load', () => {
    setTimeout(typeWriter, 500);
});

// Smooth Scroll Function
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Navbar Links Smooth Scroll
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        scrollToSection(targetId);
    });
});

// Active Nav on Scroll
const sections = document.querySelectorAll('.hero-section, .project-section, .contact-section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });

    // Navbar background on scroll
    const navbar = document.querySelector('.navbar-container');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Scroll Animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.project-section, .contact-section').forEach(section => {
    observer.observe(section);
});

// Form Validation and Submission
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    // Simple validation
    if (name === '' || email === '' || message === '') {
        showMessage('Please fill in all fields', 'error');
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showMessage('Please enter a valid email address', 'error');
        return;
    }

    // Success message (in real scenario, this would send to server)
    showMessage('Message sent successfully! I will get back to you soon.', 'success');
    contactForm.reset();

    // Hide message after 5 seconds
    setTimeout(() => {
        formMessage.style.display = 'none';
    }, 5000);
});

function showMessage(text, type) {
    formMessage.textContent = text;
    formMessage.className = 'form-message ' + type;
}

// Add hover effect for project items
document.querySelectorAll('.project-section .item').forEach((item, index) => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05) rotate(2deg)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) rotate(0deg)';
    });
});