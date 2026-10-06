// Disicure Care Pvt. Ltd. — Main JavaScript Controller
const DisicureMain = {
    // Marquee auto-scroll interval
    marqueeInterval: null,
    scrollPosition: 0,
    isDragging: false,
    startX: 0,
    scrollLeft: 0,

    init: function() {
        this.initPreloader();
        this.initNavbar();
        this.initMobileDrawer();
        this.revealOnScroll();
        
        // Listen to scroll events for scroll-reveal
        window.addEventListener('scroll', () => {
            this.handleNavbarScroll();
            this.revealOnScroll();
        });
        
        // Setup initial B2B enquiry configuration
        this.enquiryAPIUrl = null; // Configure with real backend endpoint later
    },

    // --- 1. PRELOADER CONTROLLER ---
    initPreloader: function() {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            const fadeOut = () => {
                setTimeout(() => {
                    preloader.style.opacity = '0';
                    preloader.style.visibility = 'hidden';
                    // Trigger the Intro Overlay immediately after preloader clears
                    this.playIntroOverlay();
                }, 400); // Quick fade-out latency
            };

            if (document.readyState === 'complete') {
                fadeOut();
            } else {
                window.addEventListener('load', fadeOut);
            }

            // Safety fallback in case load event does not trigger
            setTimeout(fadeOut, 2500);
        }
    },

    // --- 2. STICKY NAVBAR SCROLL HANDLER ---
    initNavbar: function() {
        this.handleNavbarScroll(); // Run once in case user loads page scrolled down
    },

    handleNavbarScroll: function() {
        const navbar = document.getElementById('navbar-wrapper');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    },

    // --- 3. MOBILE HAMBURGER DRAWER ---
    initMobileDrawer: function() {
        const toggle = document.getElementById('mobile-toggle');
        const drawer = document.getElementById('mobile-drawer');
        const close = document.getElementById('close-drawer');
        const overlay = document.getElementById('drawer-overlay');

        if (toggle && drawer) {
            toggle.addEventListener('click', () => {
                drawer.classList.add('open');
                document.body.classList.add('overflow-hidden');
            });
        }

        const closeAction = () => {
            if (drawer) {
                drawer.classList.remove('open');
                document.body.classList.remove('overflow-hidden');
            }
        };

        if (close) close.addEventListener('click', closeAction);
        if (overlay) overlay.addEventListener('click', closeAction);
    },

    // --- 4. SCROLL REVEAL (INTERSECTION OBSERVER) ---
    revealOnScroll: function() {
        const revealElements = document.querySelectorAll('.scroll-reveal');
        
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('reveal-active');
                        observer.unobserve(entry.target); // Reveal only once
                    }
                });
            }, {
                root: null,
                threshold: 0.15,
                rootMargin: '0px 0px -50px 0px'
            });

            revealElements.forEach(el => observer.observe(el));
        } else {
            // Fallback for older browsers
            revealElements.forEach(el => el.classList.add('reveal-active'));
        }
    },

    // --- 5. HOMEPAGE PRODUCT SHOWCASE / MARQUEE CAROUSEL ---
    initHomeMarquee: function() {
        const container = document.getElementById('marquee-container');
        const track = document.getElementById('marquee-track');
        const prevBtn = document.getElementById('marquee-prev');
        const nextBtn = document.getElementById('marquee-next');

        if (!container || !track) return;

        clearInterval(this.marqueeInterval);
        this.scrollPosition = 0;
        track.style.transform = `translateX(0px)`;

        // Width logic
        const getSlideWidth = () => {
            const firstCard = track.querySelector('.product-card-slide');
            return firstCard ? firstCard.offsetWidth + 32 : 352; // Card width + margin
        };

        const maxScroll = () => {
            return track.scrollWidth - container.clientWidth;
        };

        const scrollMarquee = (direction) => {
            const slideWidth = getSlideWidth();
            let newPos = this.scrollPosition + (direction * slideWidth);

            const max = maxScroll();
            if (newPos > 0) {
                newPos = -max; // wrap to end
            } else if (Math.abs(newPos) > max) {
                newPos = 0; // wrap to start
            }

            this.scrollPosition = newPos;
            track.style.transform = `translateX(${this.scrollPosition}px)`;
        };

        // Navigation Clicks
        if (prevBtn) prevBtn.onclick = () => {
            clearInterval(this.marqueeInterval);
            scrollMarquee(1);
            startAutoPlay();
        };

        if (nextBtn) nextBtn.onclick = () => {
            clearInterval(this.marqueeInterval);
            scrollMarquee(-1);
            startAutoPlay();
        };

        // Auto Play
        const startAutoPlay = () => {
            this.marqueeInterval = setInterval(() => {
                scrollMarquee(-1);
            }, 4000);
        };

        // Pause on Hover
        container.onmouseenter = () => clearInterval(this.marqueeInterval);
        container.onmouseleave = startAutoPlay;

        // Mobile Drag / Touch Events
        container.addEventListener('mousedown', (e) => {
            this.isDragging = true;
            this.startX = e.pageX - track.offsetLeft;
            this.scrollLeft = this.scrollPosition;
            clearInterval(this.marqueeInterval);
        });

        window.addEventListener('mouseup', () => {
            if (this.isDragging) {
                this.isDragging = false;
                startAutoPlay();
            }
        });

        container.addEventListener('mousemove', (e) => {
            if (!this.isDragging) return;
            e.preventDefault();
            const x = e.pageX - track.offsetLeft;
            const walk = (x - this.startX) * 1.5;
            let targetPos = this.scrollLeft + walk;
            
            const max = maxScroll();
            if (targetPos > 0) targetPos = 0;
            if (Math.abs(targetPos) > max) targetPos = -max;

            this.scrollPosition = targetPos;
            track.style.transform = `translateX(${this.scrollPosition}px)`;
        });

        // Touch Support for Mobile Swipe
        container.addEventListener('touchstart', (e) => {
            this.isDragging = true;
            this.startX = e.touches[0].pageX - track.offsetLeft;
            this.scrollLeft = this.scrollPosition;
            clearInterval(this.marqueeInterval);
        });

        container.addEventListener('touchend', () => {
            this.isDragging = false;
            startAutoPlay();
        });

        container.addEventListener('touchmove', (e) => {
            if (!this.isDragging) return;
            const x = e.touches[0].pageX - track.offsetLeft;
            const walk = (x - this.startX) * 1.2;
            let targetPos = this.scrollLeft + walk;
            
            const max = maxScroll();
            if (targetPos > 0) targetPos = 0;
            if (Math.abs(targetPos) > max) targetPos = -max;

            this.scrollPosition = targetPos;
            track.style.transform = `translateX(${this.scrollPosition}px)`;
        });

        startAutoPlay();
    },

    filterMarquee: function(category) {
        const track = document.getElementById('marquee-track');
        if (!track) return;
        const slides = track.querySelectorAll('.product-card-slide');
        slides.forEach(slide => {
            const slideCat = slide.getAttribute('data-category');
            if (category === 'all' || slideCat === category) {
                slide.style.display = '';
            } else {
                slide.style.display = 'none';
            }
        });
        this.scrollPosition = 0;
        track.style.transform = `translateX(0px)`;
    },

    // --- 6. PRODUCTS CATALOG SEARCH & FILTERS ---
    initProductCatalog: function() {
        const searchInput = document.getElementById('catalog-search');
        const filterBtns = document.querySelectorAll('.filter-btn');
        const productItems = document.querySelectorAll('.product-item');
        const resultsCount = document.getElementById('results-count');
        const emptyState = document.getElementById('catalog-empty');

        if (!productItems.length) return;

        let activeCategory = 'all';
        let searchQuery = '';

        const applyFilters = () => {
            let visibleCount = 0;

            productItems.forEach(item => {
                const category = item.getAttribute('data-category');
                const name = item.getAttribute('data-name');
                const composition = item.getAttribute('data-composition');
                
                const matchesCategory = activeCategory === 'all' || category === activeCategory;
                const matchesSearch = name.includes(searchQuery) || composition.includes(searchQuery);

                if (matchesCategory && matchesSearch) {
                    item.classList.remove('hidden');
                    visibleCount++;
                } else {
                    item.classList.add('hidden');
                }
            });

            // Update Counts
            if (resultsCount) {
                resultsCount.innerText = `Found ${visibleCount} formulations`;
            }

            // Toggle Empty State
            if (emptyState) {
                if (visibleCount === 0) {
                    emptyState.classList.remove('hidden');
                } else {
                    emptyState.classList.add('hidden');
                }
            }
        };

        // Search Input listener
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                searchQuery = e.target.value.toLowerCase().trim();
                applyFilters();
            });
        }

        // Filter button listeners
        filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                filterBtns.forEach(b => b.classList.remove('active', 'bg-blue-600', 'text-white'));
                filterBtns.forEach(b => b.classList.add('bg-white', 'text-gray-700'));
                
                e.target.classList.remove('bg-white', 'text-gray-700');
                e.target.classList.add('active', 'bg-blue-600', 'text-white');

                activeCategory = e.target.getAttribute('data-filter');
                applyFilters();
            });
        });
    },

    // --- 7. DYNAMIC B2B ENQUIRY MODAL SYSTEM ---
    openEnquiryModal: function(productOrServiceName, requirementType) {
        const modal = document.getElementById('enquiry-modal');
        const field = document.getElementById('modal-subject');
        const reqSelect = document.getElementById('modal-requirement-type');
        
        if (modal && field) {
            field.value = productOrServiceName || 'General B2B Enquiry';
            if (reqSelect && requirementType) {
                reqSelect.value = requirementType;
            }
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            document.body.classList.add('overflow-hidden');
        }
    },

    closeEnquiryModal: function() {
        const modal = document.getElementById('enquiry-modal');
        if (modal) {
            modal.classList.remove('flex');
            modal.classList.add('hidden');
            document.body.classList.remove('overflow-hidden');
            
            // Reset modal form
            const form = document.getElementById('modal-enquiry-form');
            if (form) {
                form.reset();
                const feedback = form.querySelector('.form-feedback');
                if (feedback) feedback.classList.add('hidden');
            }
        }
    },

    // --- 8. REALISTIC B2B ENQUIRY FORM SUBMISSION HANDLER ---
    initEnquiryForms: function() {
        const modalClose = document.getElementById('close-modal');
        if (modalClose) {
            modalClose.onclick = () => this.closeEnquiryModal();
        }
    },

    handleFormSubmit: function(event, formId) {
        event.preventDefault();
        const form = document.getElementById(formId);
        if (!form) return;

        const button = form.querySelector('button[type="submit"]');
        const btnText = form.querySelector('.btn-text');
        const spinner = form.querySelector('.spinner');
        const feedback = form.querySelector('.form-feedback');

        // Form Validation Check
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        // Set Loading State UI
        if (button) button.disabled = true;
        if (btnText) btnText.style.opacity = '0.5';
        if (spinner) spinner.classList.remove('hidden');
        if (feedback) {
            feedback.classList.remove('hidden', 'bg-green-100', 'text-green-800', 'bg-red-100', 'text-red-800');
            feedback.classList.add('bg-blue-50', 'text-blue-700');
            feedback.innerText = "Processing B2B inquiry registration details...";
        }

        // Extract Form Data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        // Prepare B2B Submission object
        console.log(`[B2B Submission - Form: ${formId}] Data:`, data);

        // Simulate secure server submission delay (1.5 seconds network latency)
        setTimeout(() => {
            // Revert Button states
            if (button) button.disabled = false;
            if (btnText) btnText.style.opacity = '1';
            if (spinner) spinner.classList.add('hidden');

            if (feedback) {
                feedback.classList.remove('bg-blue-50', 'text-blue-700');
                
                // Configurable Check: check if enquiryAPIUrl is defined
                if (this.enquiryAPIUrl) {
                    // Implement real fetch submission to backend endpoint here
                    fetch(this.enquiryAPIUrl, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(data)
                    })
                    .then(response => {
                        if (response.ok) {
                            this.displayFormSuccess(form, feedback);
                        } else {
                            this.displayFormError(feedback, "Network response unsuccessful. Contact email directly.");
                        }
                    })
                    .catch(() => {
                        this.displayFormError(feedback, "Connection failure. Please submit inquiry via email client.");
                    });
                } else {
                    // Local fallback validation simulation (Local-First Success)
                    this.displayFormSuccess(form, feedback);
                }
            }
        }, 1500);
    },

    displayFormSuccess: function(form, feedbackEl) {
        feedbackEl.classList.add('bg-green-50', 'text-green-800', 'border', 'border-green-100');
        feedbackEl.innerHTML = `
            <strong>Enquiry Registered Successfully!</strong><br>
            Our medical licensing manager will review your B2B proposal and contact you within 24 business hours.
        `;
        form.reset();
        
        // If modal form, close after a delay
        if (form.id === 'modal-enquiry-form') {
            setTimeout(() => {
                this.closeEnquiryModal();
            }, 3000);
        }
    },

    displayFormError: function(feedbackEl, errMsg) {
        feedbackEl.classList.add('bg-red-50', 'text-red-800', 'border', 'border-red-100');
        feedbackEl.innerText = `Error: ${errMsg}`;
    },

    canvasAnimFrame: null,
    canvasNodes: [],
    scrollListener: null,

    initScrollytelling: function() {
        const canvas = document.getElementById('hero-canvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const resizeCanvas = () => {
            canvas.width = canvas.parentElement.clientWidth;
            canvas.height = canvas.parentElement.clientHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Initialize nodes
        this.canvasNodes = [];
        const nodeCount = window.innerWidth < 768 ? 20 : 40;
        for (let i = 0; i < nodeCount; i++) {
            this.canvasNodes.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.4,
                vy: (Math.random() - 0.5) * 0.4,
                r: Math.random() * 2 + 1
            });
        }

        // Start animation loop
        const tick = () => {
            if (!document.getElementById('hero-canvas')) {
                return; // element removed, stop loop
            }
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw clean subtle medical grid/dots
            const grad = ctx.createRadialGradient(canvas.width / 2, canvas.height / 2, 50, canvas.width / 2, canvas.height / 2, canvas.width);
            grad.addColorStop(0, '#ffffff');
            grad.addColorStop(1, '#f4f9ff');
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = 'rgba(37, 99, 235, 0.15)';
            ctx.strokeStyle = 'rgba(37, 99, 235, 0.05)';
            ctx.lineWidth = 1;

            // Draw floating particles
            this.canvasNodes.forEach(node => {
                node.x += node.vx;
                node.y += node.vy;

                if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
                if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

                ctx.beginPath();
                ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
                ctx.fill();
            });

            // Connect nodes with light lines
            for (let i = 0; i < this.canvasNodes.length; i++) {
                for (let j = i + 1; j < this.canvasNodes.length; j++) {
                    const dx = this.canvasNodes[i].x - this.canvasNodes[j].x;
                    const dy = this.canvasNodes[i].y - this.canvasNodes[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 120) {
                        ctx.beginPath();
                        ctx.moveTo(this.canvasNodes[i].x, this.canvasNodes[i].y);
                        ctx.lineTo(this.canvasNodes[j].x, this.canvasNodes[j].y);
                        ctx.stroke();
                    }
                }
            }

            this.canvasAnimFrame = requestAnimationFrame(tick);
        };

        if (this.canvasAnimFrame) {
            cancelAnimationFrame(this.canvasAnimFrame);
        }
        tick();

        // Bind scroll updates
        if (this.scrollListener) {
            window.removeEventListener('scroll', this.scrollListener);
        }
        this.scrollListener = () => this.updateScrolly();
        window.addEventListener('scroll', this.scrollListener);

        // Initial render
        this.updateScrolly();
    },

    updateScrolly: function() {
        const track = document.getElementById('scrolly-hero-track');
        const box = document.getElementById('scrolly-sticky-box');
        if (!track || !box) return;

        const rect = track.getBoundingClientRect();
        const scrollHeight = track.offsetHeight - window.innerHeight;
        const scrollOffset = -rect.top;
        let progress = scrollOffset / scrollHeight;

        if (progress < 0) progress = 0;
        if (progress > 1) progress = 1;

        // Check prefers-reduced-motion
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReduced) {
            const products = document.querySelectorAll('.hero-scroll-product');
            products.forEach((prod) => {
                prod.style.opacity = 1;
                prod.style.transform = 'translate(-50%, -50%) scale(0.9)';
            });
            const textOverlay = document.getElementById('hero-text-overlay');
            if (textOverlay) {
                textOverlay.style.opacity = 1;
                textOverlay.style.pointerEvents = 'auto';
            }
            return;
        }

        const logo = document.getElementById('hero-center-logo');
        const ring = document.getElementById('hero-science-ring');
        const textOverlay = document.getElementById('hero-text-overlay');
        const isMobile = window.innerWidth < 768;

        // 1. Initial Logo Reveal (0.0 to 0.20)
        if (progress <= 0.20) {
            const logoScale = 1.0 - (progress * 0.5);
            if (logo) {
                logo.style.opacity = 1;
                logo.style.transform = `translate(-50%, -50%) scale(${logoScale})`;
            }
            if (ring) {
                ring.style.opacity = 0.75;
                ring.style.transform = `translate(-50%, -50%) scale(${logoScale})`;
            }
        } else if (progress > 0.20 && progress <= 0.40) {
            const fadeP = (progress - 0.20) / 0.15;
            const opacity = Math.max(0, 1 - fadeP);
            const scale = 1.0 - (0.3 * fadeP);

            if (logo) {
                logo.style.opacity = opacity;
                logo.style.transform = `translate(-50%, -50%) scale(${scale})`;
            }
            if (ring) {
                ring.style.opacity = opacity * 0.7;
                ring.style.transform = `translate(-50%, -50%) scale(${scale})`;
            }
        } else {
            if (logo) logo.style.opacity = 0;
            if (ring) ring.style.opacity = 0;
        }

        // 2. Product Entrance & Composition (0.20 to 0.70)
        const products = document.querySelectorAll('.hero-scroll-product');
        const targetTranslates = isMobile ? [
            { x: -50, y: 30, scale: 0.75, z: 25 },
            { x: 50, y: 40, scale: 0.75, z: 26 },
            { x: -60, y: -20, scale: 0.65, z: 20 },
            { x: 0, y: 20, scale: 0.7, z: 22 },
            { x: 60, y: -15, scale: 0.65, z: 21 },
            { x: -40, y: -70, scale: 0.55, z: 10 },
            { x: 0, y: -80, scale: 0.55, z: 11 },
            { x: 40, y: -70, scale: 0.55, z: 12 }
        ] : [
            { x: -220, y: 80, scale: 1.1, z: 25 },
            { x: 160, y: 90, scale: 1.1, z: 26 },
            { x: -280, y: -40, scale: 0.9, z: 20 },
            { x: 0, y: 60, scale: 1.0, z: 22 },
            { x: 260, y: -30, scale: 0.9, z: 21 },
            { x: -160, y: -150, scale: 0.75, z: 10 },
            { x: 0, y: -190, scale: 0.75, z: 11 },
            { x: 160, y: -150, scale: 0.75, z: 12 }
        ];

        products.forEach((prod) => {
            const idx = parseInt(prod.getAttribute('data-index'));
            const target = targetTranslates[idx];

            const startP = 0.20 + (idx * 0.035);
            const endP = startP + 0.06;

            if (progress < startP) {
                prod.style.opacity = 0;
                prod.style.transform = `translate(-50%, -50%) scale(0.5)`;
            } else if (progress >= startP && progress < 0.60) {
                const revealFraction = (progress - startP) / (endP - startP);
                const currentOpacity = Math.min(1, Math.max(0, revealFraction));
                const currentScale = 0.5 + (0.5 * currentOpacity);

                const shiftFraction = Math.max(0, (progress - endP) / (0.60 - endP));
                const currentX = target.x * shiftFraction;
                const currentY = target.y * shiftFraction;
                const finalScale = currentScale + ((target.scale - currentScale) * shiftFraction);

                prod.style.opacity = currentOpacity;
                prod.style.zIndex = target.z;
                prod.style.transform = `translate(calc(-50% + ${currentX}px), calc(-50% + ${currentY}px)) scale(${finalScale})`;
                if (!isMobile && idx >= 5) {
                    prod.style.filter = `blur(${(1 - shiftFraction) * 4}px)`;
                } else {
                    prod.style.filter = '';
                }
            } else if (progress >= 0.60 && progress < 0.75) {
                prod.style.opacity = 1;
                prod.style.zIndex = target.z;
                prod.style.transform = `translate(calc(-50% + ${target.x}px), calc(-50% + ${target.y}px)) scale(${target.scale})`;
                if (!isMobile && idx >= 5) {
                    prod.style.filter = 'blur(1px)';
                } else {
                    prod.style.filter = '';
                }
            } else if (progress >= 0.75 && progress < 0.90) {
                const slideP = (progress - 0.75) / 0.15;
                const shiftX = isMobile ? target.x : target.x + (180 * slideP);
                const shiftY = isMobile ? target.y - (100 * slideP) : target.y;
                const finalScale = isMobile ? target.scale * (1 - 0.25 * slideP) : target.scale * (1 - 0.05 * slideP);

                prod.style.opacity = 1;
                prod.style.transform = `translate(calc(-50% + ${shiftX}px), calc(-50% + ${shiftY}px)) scale(${finalScale})`;
            } else {
                const fadeOutP = (progress - 0.90) / 0.10;
                const finalOpacity = Math.max(0, 1 - fadeOutP);
                const shiftX = isMobile ? target.x : target.x + 180;
                const shiftY = isMobile ? target.y - 100 - (50 * fadeOutP) : target.y;
                const finalScale = isMobile ? target.scale * 0.75 : target.scale * 0.95;

                prod.style.opacity = finalOpacity;
                prod.style.transform = `translate(calc(-50% + ${shiftX}px), calc(-50% + ${shiftY}px)) scale(${finalScale})`;
            }
        });

        // 3. Text Overlay Reveal (0.75 to 0.95)
        if (progress >= 0.75) {
            const textP = (progress - 0.75) / 0.15;
            const textOpacity = Math.min(1, Math.max(0, textP));

            if (textOverlay) {
                textOverlay.style.opacity = textOpacity;
                textOverlay.style.pointerEvents = textOpacity > 0.8 ? 'auto' : 'none';

                if (!isMobile) {
                    const shiftTextX = -250 + (50 * (1 - textOpacity));
                    textOverlay.style.transform = `translate(calc(-50% + ${shiftTextX}px), -50%)`;
                    textOverlay.style.left = '50%';
                    textOverlay.style.top = '50%';
                } else {
                    const shiftTextY = 120 + (35 * (1 - textOpacity));
                    textOverlay.style.transform = `translate(-50%, calc(-50% + ${shiftTextY}px))`;
                    textOverlay.style.left = '50%';
                    textOverlay.style.top = '50%';
                }
            }
        } else {
            if (textOverlay) {
                textOverlay.style.opacity = 0;
                textOverlay.style.pointerEvents = 'none';
            }
        }
    },

    cleanupScrollytelling: function() {
        if (this.canvasAnimFrame) {
            cancelAnimationFrame(this.canvasAnimFrame);
            this.canvasAnimFrame = null;
        }
        if (this.scrollListener) {
            window.removeEventListener('scroll', this.scrollListener);
            this.scrollListener = null;
        }
    },

    playIntroOverlay: function() {
        // Only run if on Home page route and has not played in this session
        const hash = window.location.hash;
        const isHome = hash === '' || hash === '#/' || hash === '#';
        const hasPlayed = (typeof sessionStorage !== 'undefined') ? sessionStorage.getItem('disicure_intro_played') : 'true';
        
        if (!isHome || hasPlayed) {
            return;
        }

        // Set played status
        if (typeof sessionStorage !== 'undefined') {
            sessionStorage.setItem('disicure_intro_played', 'true');
        }

        // Create overlay container
        const overlay = document.createElement('div');
        overlay.id = 'intro-overlay';
        overlay.style.transition = 'opacity 500ms ease-in-out, visibility 500ms ease-in-out';
        
        overlay.innerHTML = `
            <!-- Scientific spinning lines background -->
            <div class="absolute w-80 h-80 md:w-[450px] md:h-[450px] border border-blue-200/30 rounded-full flex items-center justify-center pointer-events-none">
                <div class="absolute w-72 h-72 md:w-[400px] md:h-[400px] border border-dashed border-blue-400/25 rounded-full animate-spin" style="animation-duration: 20s"></div>
                <div class="absolute w-88 h-88 md:w-[500px] md:h-[500px] border border-blue-500/10 rounded-full animate-spin" style="animation-duration: 10s; animation-direction: reverse;"></div>
            </div>
            
            <!-- Central Logo -->
            <div class="relative z-10 w-24 h-24 bg-white rounded-full flex items-center justify-center border border-blue-100 shadow-md p-1 transform scale-50 opacity-0 transition-all duration-700" id="intro-logo">
                <img src="images/logo.jpg" alt="Disicure Care Logo" class="w-full h-full object-contain rounded-full">
            </div>
            
            <!-- Injected Product Grid -->
            <div class="relative w-full h-[320px] md:h-[400px] flex items-center justify-center max-w-lg mt-6 overflow-visible z-20" id="intro-products"></div>
        `;
        
        document.body.appendChild(overlay);

        const logo = document.getElementById('intro-logo');
        const container = document.getElementById('intro-products');

        // Check prefers-reduced-motion
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReduced) {
            // Skip animation and transition immediately
            setTimeout(() => {
                overlay.style.opacity = '0';
                setTimeout(() => overlay.remove(), 500);
            }, 300);
            return;
        }

        // Fade in logo
        setTimeout(() => {
            if (logo) {
                logo.style.opacity = '1';
                logo.style.transform = 'scale(1.1)';
            }
        }, 100);

        // Preload product images
        const productImages = [
            'images/disimol_sp.jpg',
            'images/disimol_p.jpg',
            'images/disizole_dsr.jpg',
            'images/disizyme.jpg',
            'images/bonscure.jpg',
            'images/disifer_xt.jpg',
            'images/disivit_m.jpg',
            'images/disicin_of.jpg'
        ];

        let loadedCount = 0;
        const loadedImages = [];
        let preloadFinished = false;

        const startAnimation = () => {
            if (preloadFinished) return;
            preloadFinished = true;
            
            if (loadedImages.length === 0) {
                // If all image loads failed, clear overlay immediately to avoid blank
                overlay.style.opacity = '0';
                setTimeout(() => overlay.remove(), 500);
                return;
            }

            // Animate items sequentially
            loadedImages.forEach((src, idx) => {
                const item = document.createElement('div');
                item.className = 'absolute opacity-0 scale-50 transition-all duration-500 ease-out z-20';
                item.style.pointerEvents = 'none';
                
                // Outer translation coordinates around a ring
                const angle = (idx / loadedImages.length) * 2 * Math.PI;
                const isMobile = window.innerWidth < 768;
                const radius = isMobile ? 80 : 150;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius - 10;
                
                item.style.transform = `translate(${x}px, ${y}px) scale(0.5)`;
                item.innerHTML = `<img src="${src}" class="h-20 md:h-28 object-contain drop-shadow-2xl intro-float-img">`;
                
                if (container) container.appendChild(item);

                // Cascade trigger
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = `translate(${x}px, ${y}px) scale(1)`;
                }, idx * 180); // Stagger cascade every 180ms
            });

            // Smooth completion transition after cascade ends
            const totalDuration = (loadedImages.length * 180) + 1000;
            setTimeout(() => {
                if (logo) logo.style.transform = 'scale(1.2) rotate(360deg)';
                overlay.style.opacity = '0';
                setTimeout(() => {
                    overlay.remove();
                }, 500);
            }, totalDuration);
        };

        // Safety timeout to trigger animation if load hangs
        const timeoutId = setTimeout(() => {
            startAnimation();
        }, 1200);

        productImages.forEach(src => {
            const img = new Image();
            img.onload = () => {
                loadedImages.push(src);
                loadedCount++;
                if (loadedCount === productImages.length) {
                    clearTimeout(timeoutId);
                    startAnimation();
                }
            };
            img.onerror = () => {
                loadedCount++;
                if (loadedCount === productImages.length) {
                    clearTimeout(timeoutId);
                    startAnimation();
                }
            };
            img.src = src;
        });
    }
};

// Make main controller globally accessible
window.DisicureMain = DisicureMain;

// Initialize on load
DisicureMain.init();
