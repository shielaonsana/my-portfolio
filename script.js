document.addEventListener("DOMContentLoaded", function () {
    const header = document.querySelector("header");
    const homeSection = document.querySelector(".home");
    const menuIcon = document.querySelector('#menu-icon');
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.navbar a');
    
    // Function to create scroll-triggered animations
    function createScrollAnimation(options) {
        const defaults = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1,
            onEnter: () => {},
            onExit: () => {}
        };
        
        const config = {...defaults, ...options};
        let observer;
        
        function handleIntersect(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    config.onEnter(entry.target, entry);
                } else {
                    config.onExit(entry.target, entry);
                }
            });
        }
        
        observer = new IntersectionObserver(handleIntersect, {
            root: config.root,
            rootMargin: config.rootMargin,
            threshold: config.threshold
        });
        
        return {
            observe: element => observer.observe(element),
            unobserve: element => observer.unobserve(element)
        };
    }
    
    // Set initial state for scrolling text effect
    document.querySelectorAll('h2.heading, .about-text h2, .work-heading').forEach(el => {
        const text = el.textContent;
        el.innerHTML = '';
        
        for (let i = 0; i < text.length; i++) {
            const span = document.createElement('span');
            span.textContent = text[i] === ' ' ? '\u00A0' : text[i];
            span.style.opacity = '0';
            span.style.transition = `opacity 0.03s ease ${i * 0.03}s, transform 0.2s ease ${i * 0.03}s`;
            span.style.display = 'inline-block';
            span.style.transform = 'translateY(20px)';
            el.appendChild(span);
        }
    });
    
    // Create animation observers
    const fadeInUpObserver = createScrollAnimation({
        threshold: 0.1,
        onEnter: (element) => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        },
        onExit: (element) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
        }
    });
    
    const fadeInLeftObserver = createScrollAnimation({
        threshold: 0.1,
        onEnter: (element) => {
            element.style.opacity = '1';
            element.style.transform = 'translateX(0)';
        },
        onExit: (element) => {
            element.style.opacity = '0';
            element.style.transform = 'translateX(-50px)';
        }
    });
    
    const fadeInRightObserver = createScrollAnimation({
        threshold: 0.1,
        onEnter: (element) => {
            element.style.opacity = '1';
            element.style.transform = 'translateX(0)';
        },
        onExit: (element) => {
            element.style.opacity = '0';
            element.style.transform = 'translateX(50px)';
        }
    });
    
    const scaleInObserver = createScrollAnimation({
        threshold: 0.1,
        onEnter: (element) => {
            element.style.opacity = '1';
            element.style.transform = 'scale(1)';
        },
        onExit: (element) => {
            element.style.opacity = '0';
            element.style.transform = 'scale(0.8)';
        }
    });
    
    const textAnimationObserver = createScrollAnimation({
        threshold: 0.1,
        onEnter: (element) => {
            const spans = element.querySelectorAll('span');
            spans.forEach((span, i) => {
                setTimeout(() => {
                    span.style.opacity = '1';
                    span.style.transform = 'translateY(0)';
                }, i * 30);
            });
        },
        onExit: (element) => {
            const spans = element.querySelectorAll('span');
            spans.forEach((span, i) => {
                setTimeout(() => {
                    span.style.opacity = '0';
                    span.style.transform = 'translateY(20px)';
                }, i * 10);
            });
        }
    });
    
    // Apply initial styles
    document.querySelectorAll('.skill-box').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        fadeInUpObserver.observe(el);
    });
    
    document.querySelectorAll('.about-img').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateX(-50px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        fadeInLeftObserver.observe(el);
    });
    
    document.querySelectorAll('.about-text').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateX(50px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        fadeInRightObserver.observe(el);
    });
    
    document.querySelectorAll('.timeline-item:nth-child(odd)').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateX(-50px)';
        el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
        fadeInLeftObserver.observe(el);
    });
    
    document.querySelectorAll('.timeline-item:nth-child(even)').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateX(50px)';
        el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
        fadeInRightObserver.observe(el);
    });
    
    document.querySelectorAll('.work').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'scale(0.8)';
        el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
        scaleInObserver.observe(el);
    });
    
    document.querySelectorAll('h2.heading, .about-text h2, h4, .work-heading').forEach(el => {
        textAnimationObserver.observe(el);
    });
    
    // Scroll effect for header transparency with parallax
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const homeHeight = homeSection.offsetHeight;
        
        // Header transparency and background effect
        if (scrollPosition < homeHeight - 100) {
            header.classList.add("transparent");
            
            // Parallax effect for home section
            const homeText = document.querySelector('.home-text');
            if (homeText) {
                homeText.style.transform = `translateY(${scrollPosition * 0.4}px)`;
            }
        } else {
            header.classList.remove("transparent");
        }
        
        // Update active nav link
        document.querySelectorAll('section[id]').forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // Simple toggle for mobile menu - moved up to the main event listener
    menuIcon.addEventListener('click', function() {
        navbar.classList.toggle('active');
        console.log('Menu clicked'); // For debugging
    });
    
    // Close menu when clicking on a link - moved up to the main event listener
    document.querySelectorAll('.navbar a').forEach(link => {
        link.addEventListener('click', function() {
            navbar.classList.remove('active');
        });
    });

    
    // Cursor effect
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.position = 'fixed';
    cursor.style.width = '20px';
    cursor.style.height = '20px';
    cursor.style.borderRadius = '50%';
    cursor.style.border = '2px solid #ddd';
    cursor.style.pointerEvents = 'none';
    cursor.style.zIndex = '9999';
    cursor.style.transform = 'translate(-50%, -50%)';
    cursor.style.transition = 'width 0.2s, height 0.2s, background-color 0.2s';
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    
    document.querySelectorAll('a, button, .skill-box, .timeline-content, .work').forEach(el => {
        el.addEventListener('mouseenter', function() {
            cursor.style.width = '40px';
            cursor.style.height = '40px';
            cursor.style.backgroundColor = 'rgba(221, 221, 221, 0.2)';
            cursor.style.border = '1px solid #ddd';
        });
        
        el.addEventListener('mouseleave', function() {
            cursor.style.width = '20px';
            cursor.style.height = '20px';
            cursor.style.backgroundColor = 'transparent';
            cursor.style.border = '2px solid #ddd';
        });
    });
    
    // Hide cursor when leaving window
    document.addEventListener('mouseleave', function() {
        cursor.style.opacity = '0';
    });
    
    document.addEventListener('mouseenter', function() {
        cursor.style.opacity = '1';
    });
});