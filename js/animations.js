document.addEventListener('DOMContentLoaded', () => {
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.padding = '0.5rem 0';
            navbar.querySelector('.navbar-brand img').style.height = '40px';
        } else {
            navbar.style.padding = '1rem 0';
            navbar.querySelector('.navbar-brand img').style.height = '50px';
        }
    });

    // Motion animations
    Motion.animate('.hero-content', {
        opacity: [0, 1],
        y: [20, 0]
    }, {
        duration: 1,
        easing: 'ease-out'
    });

    Motion.animate('.hero-image', {
        opacity: [0, 1],
        x: [20, 0]
    }, {
        duration: 1,
        delay: 0.3,
        easing: 'ease-out'
    });
});


// Stats counter animation
function animateCounter(element) {
    const target = parseInt(element.dataset.target);
    const duration = 2000; // 2 seconds
    const steps = 50;
    const stepValue = target / steps;
    let current = 0;

    const timer = setInterval(() => {
        current += stepValue;
        if (current > target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, duration / steps);
}

// Intersection Observer for stats
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Animate all counters in the stats section
            document.querySelectorAll('.counter').forEach(counter => {
                animateCounter(counter);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.5
});

// Observe the stats section
document.querySelector('.stats-section').addEventListener('DOMContentLoaded', () => {
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
});

// Motion animations for stats items
document.querySelectorAll('.stat-item').forEach((item, index) => {
    Motion.animate(item, {
        opacity: [0, 1],
        y: [20, 0]
    }, {
        duration: 0.8,
        delay: 0.2 * index,
        easing: 'ease-out'
    });
});


// About section animations
document.addEventListener('DOMContentLoaded', () => {
    // Feature items hover effect
    const featureItems = document.querySelectorAll('.feature-item');
    featureItems.forEach((item, index) => {
        Motion.animate(item, {
            opacity: [0, 1],
            x: [-20, 0]
        }, {
            duration: 0.8,
            delay: 0.2 * index,
            easing: 'ease-out'
        });
    });

    // Video play button pulse animation
    const playButton = document.querySelector('.play-button');
    if (playButton) {
        setInterval(() => {
            Motion.animate(playButton, {
                scale: [1, 1.1, 1]
            }, {
                duration: 2,
                easing: 'ease-in-out'
            });
        }, 3000);
    }

    // Info card animation
    const infoCard = document.querySelector('.info-card');
    if (infoCard) {
        Motion.animate(infoCard, {
            opacity: [0, 1],
            y: [50, 0]
        }, {
            duration: 1,
            delay: 0.5,
            easing: 'ease-out'
        });
    }
});

// Speakers section animations
document.addEventListener('DOMContentLoaded', () => {
    // Animate stats boxes
    const statBoxes = document.querySelectorAll('.stat-box');
    statBoxes.forEach((box, index) => {
        Motion.animate(box, {
            opacity: [0, 1],
            y: [20, 0]
        }, {
            duration: 0.8,
            delay: 0.2 * index,
            easing: 'ease-out'
        });
    });

    // Animate speaker cards on scroll
    const speakerCards = document.querySelectorAll('.speaker-card');
    const observerOptions = {
        threshold: 0.2
    };

    const speakerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.opacity = '1';
                speakerObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    speakerCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        speakerObserver.observe(card);
    });
});

// Schedule section animations
document.addEventListener('DOMContentLoaded', () => {
    // Animate timeline items on scroll
    const timelineItems = document.querySelectorAll('.timeline-item');
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '50px'
    };

    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
                timelineObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-50px)';
        item.style.transition = 'all 0.5s ease';
        timelineObserver.observe(item);
    });

    // Tab switching animation
    const scheduleNavLinks = document.querySelectorAll('.schedule-nav .nav-link');
    scheduleNavLinks.forEach(link => {
        link.addEventListener('shown.bs.tab', (e) => {
            const targetPane = document.querySelector(e.target.dataset.bsTarget);
            Motion.animate(targetPane, {
                opacity: [0, 1],
                x: [20, 0]
            }, {
                duration: 0.5,
                easing: 'ease-out'
            });
        });
    });
});

// Sponsors section animations
document.addEventListener('DOMContentLoaded', () => {
    // Animate sponsor counter
    const sponsorsCounter = document.querySelector('.sponsors-counter');
    let animated = false;

    const observerOptions = {
        threshold: 0.5
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                animated = true;
                Motion.animate(sponsorsCounter, {
                    scale: [0.9, 1],
                    opacity: [0, 1]
                }, {
                    duration: 0.5,
                    easing: 'ease-out'
                });
            }
        });
    }, observerOptions);

    if (sponsorsCounter) {
        counterObserver.observe(sponsorsCounter);
    }

    // Animate sponsor cards on scroll
    const sponsorCards = document.querySelectorAll('.sponsor-card');
    sponsorCards.forEach((card, index) => {
        Motion.animate(card, {
            opacity: [0, 1],
            y: [20, 0]
        }, {
            duration: 0.5,
            delay: 0.1 * index,
            easing: 'ease-out'
        });
    });

    // Modal form validation
    const sponsorForm = document.querySelector('.sponsor-form');
    if (sponsorForm) {
        sponsorForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Add form submission logic here
        });
    }
});

// Ticket section animations
document.addEventListener('DOMContentLoaded', () => {
    // Animate ticket cards on scroll
    const ticketCards = document.querySelectorAll('.ticket-card');
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '50px'
    };

    const ticketObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = entry.target.classList.contains('featured') 
                    ? 'scale(1.05)' 
                    : 'translateY(0)';
                ticketObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    ticketCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        ticketObserver.observe(card);
    });

    // QR Section animation
    const qrSection = document.querySelector('.qr-section');
    if (qrSection) {
        Motion.animate(qrSection, {
            opacity: [0, 1],
            y: [20, 0]
        }, {
            duration: 0.8,
            delay: 0.5,
            easing: 'ease-out'
        });
    }

    // Purchase button hover effect
    const purchaseButtons = document.querySelectorAll('.ticket-card .btn');
    purchaseButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            Motion.animate(button, {
                scale: [1, 1.05]
            }, {
                duration: 0.2,
                easing: 'ease-out'
            });
        });

        button.addEventListener('mouseleave', () => {
            Motion.animate(button, {
                scale: [1.05, 1]
            }, {
                duration: 0.2,
                easing: 'ease-out'
            });
        });
    });
});

// Footer animations and functionality
document.addEventListener('DOMContentLoaded', () => {
    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Add newsletter subscription logic here
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            console.log('Newsletter subscription:', emailInput.value);
            emailInput.value = '';
        });
    }

    // Back to top button
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });

        backToTop.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Footer animations
    const footerElements = document.querySelectorAll('.footer-main .col-lg-3, .footer-main .col-lg-4');
    footerElements.forEach((element, index) => {
        Motion.animate(element, {
            opacity: [0, 1],
            y: [20, 0]
        }, {
            duration: 0.8,
            delay: 0.2 * index,
            easing: 'ease-out'
        });
    });
});