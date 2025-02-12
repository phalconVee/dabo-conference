
document.addEventListener('DOMContentLoaded', () => {
    // Global Variables
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    let isScrolling = false;

    // Initialize Bootstrap tooltips
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));

    // Navbar scroll behavior
    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    }

    // Smooth scroll for anchor links
    function smoothScroll(e) {
        if (this.hash !== '') {
            e.preventDefault();
            const hash = this.hash;
            const target = document.querySelector(hash);
            
            if (target) {
                const offsetTop = target.offsetTop - navbar.offsetHeight - 20;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });

                // Update URL without jumping
                history.pushState(null, null, hash);
            }
        }
    }

    // Active section highlighting in navbar
    function highlightNavigation() {
        if (!isScrolling) {
            isScrolling = true;

            setTimeout(() => {
                const scrollPosition = window.scrollY;

                document.querySelectorAll('section').forEach(section => {
                    const sectionTop = section.offsetTop - navbar.offsetHeight - 100;
                    const sectionBottom = sectionTop + section.offsetHeight;
                    const sectionId = section.getAttribute('id');

                    if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                        navLinks.forEach(link => {
                            link.classList.remove('active');
                            if (link.getAttribute('href') === `#${sectionId}`) {
                                link.classList.add('active');
                            }
                        });
                    }
                });

                isScrolling = false;
            }, 100);
        }
    }

    // Mobile menu handling
    function handleMobileMenu() {
        const navbarCollapse = document.querySelector('.navbar-collapse');
        const navbarToggler = document.querySelector('.navbar-toggler');

        // Close mobile menu on link click
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navbarCollapse.classList.contains('show')) {
                    navbarToggler.click();
                }
            });
        });
    }

    // Preloader
    function handlePreloader() {
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            window.addEventListener('load', () => {
                preloader.style.opacity = '0';
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 500);
            });
        }
    }

    // Lazy loading images
    function lazyLoadImages() {
        const lazyImages = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // Form validation
    function initializeFormValidation() {
        const forms = document.querySelectorAll('.needs-validation');

        forms.forEach(form => {
            form.addEventListener('submit', (event) => {
                if (!form.checkValidity()) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
            });
        });
    }

    // Counter animation
    function animateCounters() {
        const counters = document.querySelectorAll('.counter-value');
        
        const counterObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = parseInt(entry.target.getAttribute('data-target'));
                    let count = 0;
                    const duration = 2000; // 2 seconds
                    const increment = target / (duration / 16); // 60fps

                    function updateCount() {
                        count += increment;
                        if (count < target) {
                            entry.target.textContent = Math.ceil(count);
                            requestAnimationFrame(updateCount);
                        } else {
                            entry.target.textContent = target;
                        }
                    }

                    requestAnimationFrame(updateCount);
                    observer.unobserve(entry.target);
                }
            });
        });

        counters.forEach(counter => counterObserver.observe(counter));
    }

    // Event Listeners
    window.addEventListener('scroll', handleNavbarScroll);
    window.addEventListener('scroll', highlightNavigation);
    navLinks.forEach(link => link.addEventListener('click', smoothScroll));

    // Initialize functions
    handleMobileMenu();
    handlePreloader();
    lazyLoadImages();
    initializeFormValidation();
    animateCounters();

    // Handle browser back/forward buttons
    window.addEventListener('popstate', () => {
        const hash = window.location.hash;
        if (hash) {
            const target = document.querySelector(hash);
            if (target) {
                const offsetTop = target.offsetTop - navbar.offsetHeight - 20;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });

    // Add resize event listener for responsive adjustments
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            // Handle any necessary responsive adjustments
            handleMobileMenu();
        }, 250);
    });
});

// Calendar functionality
function initializeCalendar() {
    const addToCalendarBtn = document.getElementById('addToCalendar');
    if (addToCalendarBtn) {
        addToCalendarBtn.addEventListener('click', createCalendarEvent);
    }
}

function createCalendarEvent() {
    // Event details
    const event = {
        title: '2025 DABO Conference',
        description: 'Leveraging Technology as a Catalyst for Growth - Join us for the annual Darden African Business Organization Conference.',
        location: 'Charlottesville, Virginia',
        start: '2025-04-11T09:00:00', // Start time
        end: '2025-04-11T17:00:00',   // End time
    };

    // Create calendar links for different platforms
    const googleCalendarUrl = createGoogleCalendarUrl(event);
    const icsFileContent = createICSFile(event);

    // Create and show the calendar options modal
    const modalHtml = `
        <div class="modal fade" id="calendarModal" tabindex="-1">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Add to Calendar</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div class="d-grid gap-3">
                            <a href="${googleCalendarUrl}" target="_blank" class="btn btn-outline-primary">
                                <i class="bi bi-google me-2"></i>Add to Google Calendar
                            </a>
                            <button class="btn btn-outline-primary" onclick="downloadICS()">
                                <i class="bi bi-calendar-event me-2"></i>Download ICS File
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Add modal to document if it doesn't exist
    if (!document.getElementById('calendarModal')) {
        document.body.insertAdjacentHTML('beforeend', modalHtml);
    }

    // Show the modal
    const modal = new bootstrap.Modal(document.getElementById('calendarModal'));
    modal.show();

    // Store ICS content in a global variable to be accessed by downloadICS function
    window.icsFileContent = icsFileContent;
}

function createGoogleCalendarUrl(event) {
    const encodedDetails = encodeURIComponent(event.description);
    const encodedLocation = encodeURIComponent(event.location);
    const encodedTitle = encodeURIComponent(event.title);

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodedTitle}&dates=${event.start.replace(/[-:]/g, '')}/${event.end.replace(/[-:]/g, '')}&details=${encodedDetails}&location=${encodedLocation}`;
}

function createICSFile(event) {
    return `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTART:${event.start.replace(/[-:]/g, '')}
DTEND:${event.end.replace(/[-:]/g, '')}
SUMMARY:${event.title}
DESCRIPTION:${event.description}
LOCATION:${event.location}
END:VEVENT
END:VCALENDAR`;
}

// Function to download ICS file
window.downloadICS = function() {
    const blob = new Blob([window.icsFileContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'dabo-conference-2025.ics';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Initialize calendar functionality
document.addEventListener('DOMContentLoaded', initializeCalendar);