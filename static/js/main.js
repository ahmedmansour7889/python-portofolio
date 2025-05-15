/**
 * Portfolio Website - Main JavaScript File
 */

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Update copyright year
    updateCopyrightYear();

    // Initialize project filters
    initProjectFilters();

    // Contact form handling
    setupContactForm();

    // Add scroll animations
    addScrollAnimations();

    // Theme switcher
    initThemeSwitcher();

    // Initialize counters
    initCounters();

    // Initialize circular progress
    initCircularProgress();

    // Initialize blog filters
    initBlogFilters();

    // Initialize testimonial carousel if exists
    if (document.querySelector('.testimonial-carousel')) {
        new Swiper('.testimonial-carousel', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                },
                992: {
                    slidesPerView: 3,
                }
            }
        });
    }
});

/**
 * Updates the copyright year in the footer
 */
function updateCopyrightYear() {
    const currentYear = new Date().getFullYear();
    const yearElement = document.querySelector('footer p');

    if (yearElement) {
        yearElement.innerHTML = yearElement.innerHTML.replace('{{ current_year }}', currentYear);
    }
}

/**
 * Initialize enhanced project filtering functionality with animations
 */
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');

    if (filterButtons.length && projectItems.length) {
        // Add CSS for animations if not already in stylesheet
        if (!document.getElementById('project-animations-css')) {
            const style = document.createElement('style');
            style.id = 'project-animations-css';
            style.textContent = `
                @keyframes projectFadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes projectFadeOut {
                    from { opacity: 1; transform: translateY(0); }
                    to { opacity: 0; transform: translateY(20px); }
                }
                .project-fade-in {
                    animation: projectFadeIn 0.5s forwards;
                }
                .project-fade-out {
                    animation: projectFadeOut 0.3s forwards;
                }
            `;
            document.head.appendChild(style);
        }

        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));

                // Add active class to clicked button with animation
                this.classList.add('active');

                // Create ripple effect on button
                const ripple = document.createElement('span');
                ripple.classList.add('filter-btn-ripple');
                this.appendChild(ripple);

                // Get position and size for ripple
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                ripple.style.width = ripple.style.height = `${size}px`;

                // Remove ripple after animation completes
                setTimeout(() => {
                    ripple.remove();
                }, 600);

                // Get filter value
                const filterValue = this.getAttribute('data-filter');

                // Filter projects with staggered animations
                projectItems.forEach((item, index) => {
                    // First set all items to fade out
                    item.classList.add('project-fade-out');
                    item.classList.remove('project-fade-in');

                    setTimeout(() => {
                        if (filterValue === 'all' || item.classList.contains(filterValue)) {
                            item.style.display = 'block';
                            // Stagger the animations
                            setTimeout(() => {
                                item.classList.remove('project-fade-out');
                                item.classList.add('project-fade-in');
                            }, index * 50); // Stagger by 50ms per item
                        } else {
                            setTimeout(() => {
                                item.style.display = 'none';
                            }, 300); // Wait for fade out to complete
                        }
                    }, 300);
                });
            });
        });

        // Initialize project modal thumbnails
        document.addEventListener('shown.bs.modal', function(event) {
            const modal = event.target;
            const thumbs = modal.querySelectorAll('.project-modal-thumb');

            if (thumbs.length) {
                thumbs.forEach(thumb => {
                    thumb.addEventListener('click', function() {
                        const mainImg = this.closest('.project-modal-gallery').querySelector('.project-modal-main-img img');
                        const thumbImg = this.querySelector('img');

                        // Add fade effect
                        mainImg.style.opacity = '0';
                        setTimeout(() => {
                            // Update main image
                            mainImg.src = thumbImg.src;
                            mainImg.style.opacity = '1';
                        }, 300);

                        // Update active state
                        thumbs.forEach(t => t.classList.remove('active'));
                        this.classList.add('active');
                    });
                });
            }
        });

        // Add mouse move effect to project cards
        projectItems.forEach(item => {
            const card = item.querySelector('.project-card');
            if (card) {
                card.addEventListener('mousemove', function(e) {
                    const rect = this.getBoundingClientRect();
                    const x = e.clientX - rect.left; // x position within the element
                    const y = e.clientY - rect.top;  // y position within the element

                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;

                    const deltaX = (x - centerX) / centerX * 5; // Max rotation 5deg
                    const deltaY = (y - centerY) / centerY * 5;

                    this.style.transform = `translateY(-5px) rotateX(${-deltaY}deg) rotateY(${deltaX}deg)`;
                });

                card.addEventListener('mouseleave', function() {
                    this.style.transform = '';
                    setTimeout(() => {
                        this.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                    }, 100);
                });

                card.addEventListener('mouseenter', function() {
                    this.style.transition = 'all 0.1s ease';
                });
            }
        });

        // Initialize process timeline if it exists
        const timelinePoints = document.querySelectorAll('.process-timeline-point');
        if (timelinePoints.length) {
            timelinePoints.forEach(point => {
                point.addEventListener('click', function() {
                    timelinePoints.forEach(p => p.classList.remove('active'));
                    this.classList.add('active');

                    // Here you could add code to show different content based on the selected step
                    const step = this.getAttribute('data-step');
                    console.log(`Step ${step} selected`);
                });
            });
        }
    }
}

/**
 * Set up contact form submission and validation
 */
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            // Simple validation
            if (!name || !email || !subject || !message) {
                alert('يرجى ملء جميع الحقول المطلوبة');
                return;
            }

            // Here you would typically send the form data to a server
            // For demonstration, we'll just show a success message

            // Clear the form
            contactForm.reset();

            // Show success message (in a real app, you might use a modal or toast)
            alert('تم إرسال رسالتك بنجاح! سأتواصل معك قريبًا.');
        });
    }
}

/**
 * Add scroll animations to elements
 */
function addScrollAnimations() {
    // Add the 'animated' class to elements when they come into view
    const animatedElements = document.querySelectorAll('.skill-card, .card, h1, h2, .timeline-item');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // Elements that slide in from right
    const rightElements = document.querySelectorAll('.slide-right-trigger');

    const rightObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('slide-right');
                rightObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    rightElements.forEach(element => {
        rightObserver.observe(element);
    });

    // Elements that slide in from left
    const leftElements = document.querySelectorAll('.slide-left-trigger');

    const leftObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('slide-left');
                leftObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    leftElements.forEach(element => {
        leftObserver.observe(element);
    });
}

/**
 * Initialize enhanced theme switcher functionality with animations
 */
function initThemeSwitcher() {
    // Create theme toggle button if it doesn't exist
    if (!document.querySelector('.theme-toggle')) {
        const themeToggle = document.createElement('div');
        themeToggle.className = 'theme-toggle';
        themeToggle.innerHTML = '<i class="fas fa-moon"></i><span class="theme-toggle-tooltip">تبديل الوضع</span>';
        document.body.appendChild(themeToggle);
    }

    const themeToggle = document.querySelector('.theme-toggle');
    const root = document.documentElement;

    // Check for saved theme preference or use preferred color scheme
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        root.setAttribute('data-theme', 'dark');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i><span class="theme-toggle-tooltip">الوضع الفاتح</span>';
        document.body.classList.add('dark-mode');
    } else {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i><span class="theme-toggle-tooltip">الوضع الداكن</span>';
    }

    // Add click event to toggle theme with animation
    themeToggle.addEventListener('click', () => {
        // Add transition class to body for smooth color transitions
        document.body.classList.add('theme-transition');

        // Add overlay animation
        const overlay = document.createElement('div');
        overlay.className = 'theme-transition-overlay';
        document.body.appendChild(overlay);

        setTimeout(() => {
            overlay.classList.add('active');
        }, 10);

        // Toggle theme after a short delay for animation
        setTimeout(() => {
            const currentTheme = root.getAttribute('data-theme');

            if (currentTheme === 'dark') {
                root.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
                themeToggle.innerHTML = '<i class="fas fa-moon"></i><span class="theme-toggle-tooltip">الوضع الداكن</span>';
                document.body.classList.remove('dark-mode');
            } else {
                root.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
                themeToggle.innerHTML = '<i class="fas fa-sun"></i><span class="theme-toggle-tooltip">الوضع الفاتح</span>';
                document.body.classList.add('dark-mode');
            }

            // Remove overlay after theme change
            setTimeout(() => {
                overlay.classList.remove('active');
                setTimeout(() => {
                    document.body.removeChild(overlay);
                    // Remove transition class after animation completes
                    document.body.classList.remove('theme-transition');
                }, 500);
            }, 500);
        }, 300);
    });

    // Add hover effect for tooltip
    themeToggle.addEventListener('mouseenter', () => {
        const tooltip = themeToggle.querySelector('.theme-toggle-tooltip');
        if (tooltip) {
            tooltip.style.opacity = '1';
            tooltip.style.transform = 'translateY(0)';
        }
    });

    themeToggle.addEventListener('mouseleave', () => {
        const tooltip = themeToggle.querySelector('.theme-toggle-tooltip');
        if (tooltip) {
            tooltip.style.opacity = '0';
            tooltip.style.transform = 'translateY(10px)';
        }
    });
}

/**
 * Initialize animated counters
 */
function initCounters() {
    const counters = document.querySelectorAll('.counter-number');

    if (counters.length) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-target'));
                    let count = 0;
                    const speed = 2000 / target; // adjust speed based on target value

                    const updateCount = () => {
                        if (count < target) {
                            count++;
                            counter.innerText = count;
                            setTimeout(updateCount, speed);
                        } else {
                            counter.innerText = target;
                        }
                    };

                    updateCount();
                    observer.unobserve(counter);
                }
            });
        }, {
            threshold: 0.1
        });

        counters.forEach(counter => {
            observer.observe(counter);
        });
    }
}

/**
 * Initialize circular progress bars for skills
 */
function initCircularProgress() {
    const skillCircles = document.querySelectorAll('.skill-circle');

    if (skillCircles.length) {
        skillCircles.forEach(circle => {
            const percentage = parseInt(circle.getAttribute('data-percentage'));
            const radius = 50;
            const circumference = 2 * Math.PI * radius;

            // Create SVG element programmatically
            const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.setAttribute('viewBox', '0 0 120 120');

            // Background circle
            const bgCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            bgCircle.setAttribute('cx', '60');
            bgCircle.setAttribute('cy', '60');
            bgCircle.setAttribute('r', radius);
            bgCircle.setAttribute('class', 'bg');

            // Progress circle
            const progressCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            progressCircle.setAttribute('cx', '60');
            progressCircle.setAttribute('cy', '60');
            progressCircle.setAttribute('r', radius);
            progressCircle.setAttribute('class', 'meter');
            progressCircle.setAttribute('stroke-dasharray', circumference);
            progressCircle.setAttribute('stroke-dashoffset', circumference);

            svg.appendChild(bgCircle);
            svg.appendChild(progressCircle);
            circle.appendChild(svg);

            // Add percentage text
            const percentageText = document.createElement('div');
            percentageText.className = 'skill-percentage';
            percentageText.textContent = percentage + '%';
            circle.appendChild(percentageText);

            // Animate progress when in view
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const offset = circumference - (percentage / 100) * circumference;
                        progressCircle.style.transition = 'stroke-dashoffset 1.5s ease-in-out';
                        progressCircle.style.strokeDashoffset = offset;
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1
            });

            observer.observe(circle);
        });
    }
}

/**
 * Initialize blog filtering functionality
 */
function initBlogFilters() {
    const blogFilterButtons = document.querySelectorAll('.blog-filter-btn');
    const blogItems = document.querySelectorAll('.blog-item');

    if (blogFilterButtons.length && blogItems.length) {
        blogFilterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                blogFilterButtons.forEach(btn => btn.classList.remove('active'));

                // Add active class to clicked button
                this.classList.add('active');

                // Get filter value
                const filterValue = this.getAttribute('data-filter');

                // Filter blog posts
                blogItems.forEach(item => {
                    if (filterValue === 'all') {
                        item.style.display = 'block';
                    } else {
                        if (item.classList.contains(filterValue)) {
                            item.style.display = 'block';
                        } else {
                            item.style.display = 'none';
                        }
                    }
                });
            });
        });
    }
}

/**
 * Toggle mobile navigation menu (for smaller screens)
 */
function toggleMobileMenu() {
    const navbar = document.querySelector('.navbar-collapse');
    if (navbar.classList.contains('show')) {
        navbar.classList.remove('show');
    } else {
        navbar.classList.add('show');
    }
}