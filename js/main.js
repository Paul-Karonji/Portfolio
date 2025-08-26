// Loading screen
window.addEventListener('load', function() {
    const loading = document.getElementById('loading');
    loading.classList.add('hidden');
    setTimeout(() => {
        loading.style.display = 'none';
    }, 500);
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling for navigation links
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

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Typing effect for hero subtitle
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Start typing effect after page loads
setTimeout(() => {
    const subtitle = document.querySelector('.hero .subtitle');
    const originalText = subtitle.textContent;
    typeWriter(subtitle, originalText, 80);
}, 1000);

// Parallax effect for floating shapes
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const shapes = document.querySelectorAll('.shape');
    
    shapes.forEach((shape, index) => {
        const speed = 0.5 + (index * 0.2);
        shape.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
    });
});

// Dynamic hover effects for project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', function(e) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', function() {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
});

// Add dynamic background particles
function createParticle() {
    const particle = document.createElement('div');
    particle.style.position = 'absolute';
    particle.style.width = '2px';
    particle.style.height = '2px';
    particle.style.background = '#dc2626';
    particle.style.borderRadius = '50%';
    particle.style.pointerEvents = 'none';
    particle.style.opacity = '0.6';
    
    const startX = Math.random() * window.innerWidth;
    const startY = window.innerHeight + 10;
    const endY = -10;
    const duration = 3000 + Math.random() * 2000;
    
    particle.style.left = startX + 'px';
    particle.style.top = startY + 'px';
    
    document.querySelector('.floating-shapes').appendChild(particle);
    
    particle.animate([
        { top: startY + 'px', opacity: 0 },
        { top: endY + 'px', opacity: 0.6 },
        { top: endY + 'px', opacity: 0 }
    ], {
        duration: duration,
        easing: 'linear'
    }).addEventListener('finish', () => {
        particle.remove();
    });
}

// Create particles periodically
setInterval(createParticle, 300);

// Enhanced button hover effects
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.6)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s linear';
        ripple.style.left = (e.clientX - e.target.offsetLeft) + 'px';
        ripple.style.top = (e.clientY - e.target.offsetTop) + 'px';
        ripple.style.width = ripple.style.height = '20px';
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Counter animation for stats (if you want to add any stats)
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        start += increment;
        element.textContent = Math.floor(start);
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        }
    }, 16);
}

// Mobile menu toggle (for future enhancement)
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
}

// Add scroll progress indicator
const progressBar = document.createElement('div');
progressBar.style.position = 'fixed';
progressBar.style.top = '0';
progressBar.style.left = '0';
progressBar.style.width = '0%';
progressBar.style.height = '3px';
progressBar.style.background = 'linear-gradient(90deg, #dc2626, #2563eb)';
progressBar.style.zIndex = '9999';
progressBar.style.transition = 'width 0.3s ease';
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + '%';
});

// Preload important images and resources
function preloadResources() {
    // Add any images or resources you want to preload here
    const resources = [
        // Add image URLs here if you have any
    ];
    
    resources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource;
        link.as = 'image';
        document.head.appendChild(link);
    });
}

// Initialize preloading
preloadResources();

// Add some Easter eggs for fun
let konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
let konamiIndex = 0;

document.addEventListener('keydown', function(e) {
    if (e.keyCode === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            // Easter egg activated!
            document.body.style.animation = 'rainbow 2s infinite';
            setTimeout(() => {
                document.body.style.animation = '';
            }, 10000);
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

// Add rainbow animation for Easter egg
const rainbowStyle = document.createElement('style');
rainbowStyle.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(rainbowStyle);

// Image upload functionality
document.getElementById('imageUpload').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const placeholder = document.getElementById('profilePlaceholder');
            
            // Create img element if it doesn't exist
            let img = placeholder.querySelector('img');
            if (!img) {
                img = document.createElement('img');
                img.className = 'profile-image';
                placeholder.innerHTML = '';
                placeholder.appendChild(img);
                placeholder.style.background = 'transparent';
                placeholder.style.fontSize = '0';
            }
            
            img.src = e.target.result;
            
            // Add upload success animation
            img.style.opacity = '0';
            img.style.transform = 'scale(0.8)';
            
            setTimeout(() => {
                img.style.transition = 'all 0.5s ease';
                img.style.opacity = '1';
                img.style.transform = 'scale(1)';
            }, 100);
            
            // Add a subtle success notification
            showNotification('Profile image updated successfully! 📸');
        };
        reader.readAsDataURL(file);
    }
});

// Notification function
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.position = 'fixed';
    notification.style.top = '100px';
    notification.style.right = '20px';
    notification.style.background = 'var(--gradient-1)';
    notification.style.color = 'var(--white)';
    notification.style.padding = '1rem 2rem';
    notification.style.borderRadius = '50px';
    notification.style.zIndex = '9999';
    notification.style.transform = 'translateX(100%)';
    notification.style.transition = 'transform 0.3s ease';
    notification.style.boxShadow = '0 10px 30px rgba(220, 38, 38, 0.3)';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Drag and drop functionality for the image upload
const uploadArea = document.querySelector('.upload-area');

uploadArea.addEventListener('dragover', function(e) {
    e.preventDefault();
    uploadArea.style.transform = 'scale(1.05)';
    uploadArea.style.opacity = '0.8';
});

uploadArea.addEventListener('dragleave', function(e) {
    e.preventDefault();
    uploadArea.style.transform = 'scale(1)';
    uploadArea.style.opacity = '1';
});

uploadArea.addEventListener('drop', function(e) {
    e.preventDefault();
    uploadArea.style.transform = 'scale(1)';
    uploadArea.style.opacity = '1';
    
    const files = e.dataTransfer.files;
    if (files.length > 0 && files[0].type.startsWith('image/')) {
        const fileInput = document.getElementById('imageUpload');
        fileInput.files = files;
        fileInput.dispatchEvent(new Event('change'));
    }
});

console.log('🚀 Portfolio loaded successfully! Made with ❤️ by Paul Karonji');
console.log('💡 Try the Konami Code for a surprise: ↑↑↓↓←→←→BA');