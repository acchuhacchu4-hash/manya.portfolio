document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // If it's the progress bar fill, animate it
                if (entry.target.classList.contains('progress-fill')) {
                    entry.target.style.width = entry.target.getAttribute('style').split(':')[1];
                }
            }
        });
    }, observerOptions);

    // Apply observer to all fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    // Add a class for CSS to handle the animation state
    const style = document.createElement('style');
    style.innerHTML = `
        .fade-in {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }
        .fade-in.visible {
            opacity: 1;
            transform: translateY(0);
        }
        .stagger-1 { transition-delay: 0.2s; }
        .stagger-2 { transition-delay: 0.4s; }
        .stagger-3 { transition-delay: 0.6s; }
    `;
    document.head.appendChild(style);

    // Smooth scroll for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Mobile Navigation Toggle (Simple version)
    const createMobileNav = () => {
        const nav = document.querySelector('nav');
        const navLinks = document.querySelector('.nav-links');
        
        if (window.innerWidth <= 968) {
            if (!document.querySelector('.mobile-toggle')) {
                const toggle = document.createElement('div');
                toggle.className = 'mobile-toggle';
                toggle.innerHTML = '<i class="fas fa-bars"></i>';
                toggle.style.fontSize = '1.5rem';
                toggle.style.cursor = 'pointer';
                toggle.style.color = 'var(--secondary-color)';
                
                nav.insertBefore(toggle, navLinks);
                
                toggle.addEventListener('click', () => {
                    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
                    navLinks.style.flexDirection = 'column';
                    navLinks.style.position = 'absolute';
                    navLinks.style.top = '100%';
                    navLinks.style.left = '0';
                    navLinks.style.width = '100%';
                    navLinks.style.background = 'var(--white)';
                    navLinks.style.padding = '2rem';
                    navLinks.style.boxShadow = 'var(--shadow)';
                });
            }
        }
    };

    window.addEventListener('resize', createMobileNav);
    createMobileNav();
});
