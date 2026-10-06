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
                const category = item.getAttribute('data-category') || '';
                const name = item.getAttribute('data-name') || '';
                const composition = item.getAttribute('data-composition') || '';
                const therapeutic = item.getAttribute('data-therapeutic') || '';
                
                const matchesCategory = activeCategory === 'all' || category === activeCategory;
                const matchesSearch = name.includes(searchQuery) || composition.includes(searchQuery) || therapeutic.includes(searchQuery);

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

    // --- 8. REALISTIC B2B ENQUIRY FORM SUBMISSION HANDLER & LEAD CAPTURE ---
    initEnquiryForms: function() {
        const modalClose = document.getElementById('close-modal');
        if (modalClose) {
            modalClose.onclick = () => this.closeEnquiryModal();
        }

        // Auto-track WhatsApp CTA clicks into LMS
        document.querySelectorAll('a[href*="wa.me"]').forEach(waLink => {
            if (!waLink.dataset.leadTracked) {
                waLink.dataset.leadTracked = 'true';
                waLink.addEventListener('click', () => {
                    if (window.DisicureLeads) {
                        const href = waLink.getAttribute('href') || '';
                        let query = '';
                        try {
                            const url = new URL(href);
                            query = url.searchParams.get('text') || '';
                        } catch (e) {
                            query = href;
                        }
                        const isFloating = waLink.closest('.fixed');
                        const sourceLabel = isFloating ? 'Floating WhatsApp CTA' : 'Page WhatsApp CTA';
                        window.DisicureLeads.captureWhatsAppClick(sourceLabel, decodeURIComponent(query));
                    }
                });
            }
        });
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

        // Automatically Capture into Lead Management System (LMS)
        if (window.DisicureLeads) {
            window.DisicureLeads.addLead({
                name: data.name,
                mobile: data.phone || data.mobile,
                whatsapp: data.whatsapp || data.phone || data.mobile,
                email: data.email,
                city: data.city,
                state: data.state,
                businessType: data.business_type || data.businessType || 'General B2B Client',
                requirementType: data.requirement_type || data.requirementType || data.service || 'Product Enquiry',
                productOrService: data.molecule || data.subject || data.service || 'Disicure Formulations',
                source: formId === 'modal-enquiry-form' ? 'Website B2B Modal' : 'Contact Page Form',
                assignedPerson: 'Nishant Chaturvedi (Director)',
                leadStatus: '🟢 New',
                notes: data.message || `Registered enquiry for requirement: ${data.requirement_type || data.service || 'B2B Wholesale'}.`,
            });
        }

        // Prepare B2B Submission object
        console.log(`[B2B Lead Captured - Form: ${formId}] Data:`, data);

        // Simulate secure server submission delay (1.2 seconds network latency)
        setTimeout(() => {
            // Revert Button states
            if (button) button.disabled = false;
            if (btnText) btnText.style.opacity = '1';
            if (spinner) spinner.classList.add('hidden');

            if (feedback) {
                feedback.classList.remove('bg-blue-50', 'text-blue-700');
                
                // Configurable Check: check if enquiryAPIUrl is defined
                if (this.enquiryAPIUrl) {
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
                    // Local-First LMS Success
                    this.displayFormSuccess(form, feedback);
                }
            }
        }, 1200);
    },

    displayFormSuccess: function(form, feedbackEl) {
        feedbackEl.classList.add('bg-green-50', 'text-green-800', 'border', 'border-green-100');
        feedbackEl.innerHTML = `
            <strong>Enquiry Successfully Captured in Lead System!</strong><br>
            Our pharmaceutical licensing team will review your B2B proposal and contact you shortly.
        `;
        form.reset();
        
        // If modal form, close after a delay
        if (form.id === 'modal-enquiry-form') {
            setTimeout(() => {
                this.closeEnquiryModal();
            }, 2500);
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
    },

    // --- 11. LEAD MANAGEMENT, PMS, DMS & TMS ADMIN PANEL CONTROLLER ---
    lmsState: {
        searchQuery: '',
        statusFilter: 'all',
        businessFilter: 'all',
        sourceFilter: 'all',
        sortBy: 'newest'
    },

    pmsState: {
        searchQuery: '',
        statusFilter: 'all',
        modeFilter: 'all'
    },

    dmsState: {
        searchQuery: '',
        categoryFilter: 'all',
        sortBy: 'newest'
    },

    tmsState: {
        searchQuery: '',
        roleFilter: 'all'
    },

    admPartnerState: {
        searchQuery: '',
        typeFilter: 'all'
    },

    initAdminPanel: function() {
        if (!window.DisicureLeads && !window.DisicurePayments && !window.DisicureDocuments && !window.DisicureTeam && !window.DisicurePartner) return;

        // LMS Search Input
        const searchInput = document.getElementById('lms-search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.lmsState.searchQuery = e.target.value.toLowerCase().trim();
                this.renderAdminLeads();
            });
        }

        // LMS Status Filter
        const statusFilter = document.getElementById('lms-status-filter');
        if (statusFilter) {
            statusFilter.addEventListener('change', (e) => {
                this.lmsState.statusFilter = e.target.value;
                this.renderAdminLeads();
            });
        }

        // LMS Business Filter
        const businessFilter = document.getElementById('lms-business-filter');
        if (businessFilter) {
            businessFilter.addEventListener('change', (e) => {
                this.lmsState.businessFilter = e.target.value;
                this.renderAdminLeads();
            });
        }

        // LMS Source Filter
        const sourceFilter = document.getElementById('lms-source-filter');
        if (sourceFilter) {
            sourceFilter.addEventListener('change', (e) => {
                this.lmsState.sourceFilter = e.target.value;
                this.renderAdminLeads();
            });
        }

        // LMS Sort Filter
        const sortFilter = document.getElementById('lms-sort-filter');
        if (sortFilter) {
            sortFilter.addEventListener('change', (e) => {
                this.lmsState.sortBy = e.target.value;
                this.renderAdminLeads();
            });
        }

        // PMS (Payment Management) Listeners
        const pmsSearch = document.getElementById('pms-search-input');
        if (pmsSearch) {
            pmsSearch.addEventListener('input', (e) => {
                this.pmsState.searchQuery = e.target.value.toLowerCase().trim();
                this.renderPaymentsTable();
            });
        }

        const pmsStatus = document.getElementById('pms-status-filter');
        if (pmsStatus) {
            pmsStatus.addEventListener('change', (e) => {
                this.pmsState.statusFilter = e.target.value;
                this.renderPaymentsTable();
            });
        }

        const pmsMode = document.getElementById('pms-mode-filter');
        if (pmsMode) {
            pmsMode.addEventListener('change', (e) => {
                this.pmsState.modeFilter = e.target.value;
                this.renderPaymentsTable();
            });
        }

        // DMS (Document Management) Listeners
        const dmsSearch = document.getElementById('dms-search-input');
        if (dmsSearch) {
            dmsSearch.addEventListener('input', (e) => {
                this.dmsState.searchQuery = e.target.value.toLowerCase().trim();
                this.renderDocumentsTable();
            });
        }

        const dmsCatSelect = document.getElementById('dms-category-select');
        if (dmsCatSelect) {
            dmsCatSelect.addEventListener('change', (e) => {
                this.dmsState.categoryFilter = e.target.value;
                this.renderDocumentsTable();
            });
        }

        const dmsSort = document.getElementById('dms-sort-select');
        if (dmsSort) {
            dmsSort.addEventListener('change', (e) => {
                this.dmsState.sortBy = e.target.value;
                this.renderDocumentsTable();
            });
        }

        // TMS (Team Management) Listeners
        const tmsSearch = document.getElementById('tms-search-input');
        if (tmsSearch) {
            tmsSearch.addEventListener('input', (e) => {
                this.tmsState.searchQuery = e.target.value.toLowerCase().trim();
                this.renderTeamTable();
            });
        }

        const tmsRoleSelect = document.getElementById('tms-role-select');
        if (tmsRoleSelect) {
            tmsRoleSelect.addEventListener('change', (e) => {
                this.tmsState.roleFilter = e.target.value;
                this.renderTeamTable();
            });
        }

        // Admin Partner Management Listeners
        const admPrtSearch = document.getElementById('adm-prt-search-input');
        if (admPrtSearch) {
            admPrtSearch.addEventListener('input', (e) => {
                this.admPartnerState.searchQuery = e.target.value.toLowerCase().trim();
                this.renderAdminPartners();
            });
        }

        const admPrtTypeSelect = document.getElementById('adm-prt-type-select');
        if (admPrtTypeSelect) {
            admPrtTypeSelect.addEventListener('change', (e) => {
                this.admPartnerState.typeFilter = e.target.value;
                this.renderAdminPartners();
            });
        }

        // Initial Full Render
        this.renderAdminLeads();
        this.renderPaymentsTable();
        this.renderDocumentsTable();
        this.renderTeamTable();
        this.renderAdminPartners();
    },

    // Tab Switching Functionality
    switchAdminTab: function(tabId) {
        const tabContents = document.querySelectorAll('.admin-tab-content');
        tabContents.forEach(tab => {
            tab.classList.add('hidden');
            tab.classList.remove('block');
        });

        const activeContent = document.getElementById(tabId);
        if (activeContent) {
            activeContent.classList.remove('hidden');
            activeContent.classList.add('block');
        }

        const tabBtns = document.querySelectorAll('.admin-tab-btn');
        tabBtns.forEach(btn => {
            btn.classList.remove('bg-blue-600', 'text-white', 'active');
            btn.classList.add('bg-slate-800/60', 'text-blue-200');
        });

        const activeBtn = document.getElementById(`btn-${tabId}`);
        if (activeBtn) {
            activeBtn.classList.remove('bg-slate-800/60', 'text-blue-200');
            activeBtn.classList.add('bg-blue-600', 'text-white', 'active');
        }

        // Trigger chart or table redraws if needed
        if (tabId === 'tab-dashboard') {
            this.renderDashboardAnalytics();
        } else if (tabId === 'tab-leads') {
            this.renderAdminLeads();
        } else if (tabId === 'tab-partners') {
            this.renderAdminPartners();
        } else if (tabId === 'tab-financials') {
            this.renderPaymentsTable();
        } else if (tabId === 'tab-documents') {
            this.renderDocumentsTable();
        } else if (tabId === 'tab-team') {
            this.renderTeamTable();
        }
    },

    renderAdminLeads: function() {
        if (!window.DisicureLeads) return;
        const allLeads = window.DisicureLeads.getAllLeads();

        // 1. Calculate and update dashboard analytics & charts
        this.renderDashboardAnalytics();

        // 2. Filter & Sort Leads for the LMS table
        const total = allLeads.length;
        let filtered = allLeads.filter(lead => {
            // Search Query
            const query = this.lmsState.searchQuery;
            const matchesQuery = !query || 
                (lead.name && lead.name.toLowerCase().includes(query)) ||
                (lead.leadId && lead.leadId.toLowerCase().includes(query)) ||
                (lead.mobile && lead.mobile.toLowerCase().includes(query)) ||
                (lead.whatsapp && lead.whatsapp.toLowerCase().includes(query)) ||
                (lead.email && lead.email.toLowerCase().includes(query)) ||
                (lead.city && lead.city.toLowerCase().includes(query)) ||
                (lead.state && lead.state.toLowerCase().includes(query)) ||
                (lead.productOrService && lead.productOrService.toLowerCase().includes(query));

            // Status Filter
            const matchesStatus = this.lmsState.statusFilter === 'all' || lead.leadStatus === this.lmsState.statusFilter;

            // Business Filter
            const matchesBusiness = this.lmsState.businessFilter === 'all' || lead.businessType === this.lmsState.businessFilter;

            // Source Filter
            const matchesSource = this.lmsState.sourceFilter === 'all' || (lead.source && lead.source.includes(this.lmsState.sourceFilter));

            return matchesQuery && matchesStatus && matchesBusiness && matchesSource;
        });

        // Sorting
        if (this.lmsState.sortBy === 'newest') {
            filtered.sort((a, b) => new Date(b.createdDate || 0) - new Date(a.createdDate || 0));
        } else if (this.lmsState.sortBy === 'oldest') {
            filtered.sort((a, b) => new Date(a.createdDate || 0) - new Date(b.createdDate || 0));
        } else if (this.lmsState.sortBy === 'followup') {
            filtered.sort((a, b) => (a.followUpDate || '9999').localeCompare(b.followUpDate || '9999'));
        }

        // 3. Render Table Rows
        const tbody = document.getElementById('lms-leads-tbody');
        const emptyState = document.getElementById('lms-empty-state');
        const countDisplay = document.getElementById('lms-showing-count');

        if (countDisplay) {
            countDisplay.innerText = `Showing ${filtered.length} of ${total} Leads`;
        }

        if (!tbody) return;

        if (filtered.length === 0) {
            tbody.innerHTML = '';
            if (emptyState) emptyState.classList.remove('hidden');
            return;
        }

        if (emptyState) emptyState.classList.add('hidden');

        // Status Badge Style Helper
        const getStatusBadge = (statusStr) => {
            const statusObj = window.DisicureLeads.STATUSES.find(s => s.label === statusStr) || window.DisicureLeads.STATUSES[0];
            return `<span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold border ${statusObj.color}">
                <span class="w-1.5 h-1.5 rounded-full ${statusObj.dot}"></span>
                ${statusStr}
            </span>`;
        };

        let rowsHtml = '';
        filtered.forEach(lead => {
            const cleanPhone = (lead.whatsapp || lead.mobile || '').replace(/[^0-9]/g, '');
            const waHref = cleanPhone ? `https://wa.me/${cleanPhone}?text=Hello%20${encodeURIComponent(lead.name)}%2C%20greetings%20from%20Disicure%20Care%20Pvt.%20Ltd.%20Regarding%20your%20enquiry%20for%20${encodeURIComponent(lead.productOrService || 'pharmaceutical solutions')}%3A` : '#';

            rowsHtml += `
            <tr class="border-b border-gray-100 hover:bg-blue-50/30 transition-colors text-xs">
                <!-- Lead ID & Date -->
                <td class="p-3.5 whitespace-nowrap">
                    <button onclick="window.DisicureMain.openLeadDrawer('${lead.leadId}')" class="font-extrabold text-blue-600 hover:underline block text-left">
                        ${lead.leadId}
                    </button>
                    <span class="text-[10px] text-gray-400 block mt-0.5">${lead.createdDate}</span>
                </td>

                <!-- Contact / Client Info -->
                <td class="p-3.5">
                    <div class="font-bold text-navy-950 text-sm">${lead.name}</div>
                    <div class="text-[11px] text-gray-500 font-normal flex items-center gap-1.5 mt-0.5">
                        <span>📍 ${lead.city}, ${lead.state}</span>
                    </div>
                    <div class="text-[11px] text-gray-600 font-mono mt-0.5">${lead.mobile}</div>
                </td>

                <!-- Business & Requirement -->
                <td class="p-3.5">
                    <div class="inline-block px-2 py-0.5 bg-gray-100 text-gray-700 text-[10px] font-bold rounded mb-1">
                        ${lead.businessType}
                    </div>
                    <div class="font-bold text-navy-950 text-xs">${lead.requirementType}</div>
                    <div class="text-[11px] text-blue-700 font-medium truncate max-w-xs">${lead.productOrService}</div>
                </td>

                <!-- Source Tag -->
                <td class="p-3.5 whitespace-nowrap">
                    <span class="inline-block px-2.5 py-1 bg-blue-50 text-blue-700 border border-blue-100 rounded text-[10px] font-bold uppercase tracking-wider">
                        ${lead.source}
                    </span>
                </td>

                <!-- Status Selector -->
                <td class="p-3.5 whitespace-nowrap">
                    <select onchange="window.DisicureMain.changeLeadStatusQuick('${lead.leadId}', this.value)" class="text-xs font-bold rounded-lg border border-gray-200 p-1.5 bg-white shadow-sm focus:outline-none focus:border-blue-500">
                        ${window.DisicureLeads.STATUSES.map(s => `
                            <option value="${s.label}" ${s.label === lead.leadStatus ? 'selected' : ''}>${s.label}</option>
                        `).join('')}
                    </select>
                </td>

                <!-- Assigned Person -->
                <td class="p-3.5 whitespace-nowrap">
                    <select onchange="window.DisicureMain.changeLeadAssignedQuick('${lead.leadId}', this.value)" class="text-xs font-medium rounded-lg border border-gray-200 p-1.5 bg-white shadow-sm focus:outline-none focus:border-blue-500 max-w-[150px] truncate">
                        ${window.DisicureLeads.TEAM_MEMBERS.map(m => `
                            <option value="${m}" ${m === lead.assignedPerson ? 'selected' : ''}>${m}</option>
                        `).join('')}
                    </select>
                    ${lead.followUpDate ? `
                        <div class="text-[10px] text-amber-700 font-bold mt-1 flex items-center gap-1">
                            <span>📅 Due: ${lead.followUpDate}</span>
                        </div>
                    ` : ''}
                </td>

                <!-- Actions -->
                <td class="p-3.5 whitespace-nowrap text-right">
                    <div class="flex items-center justify-end gap-1.5">
                        <!-- Edit Drawer -->
                        <button onclick="window.DisicureMain.openLeadDrawer('${lead.leadId}')" class="p-1.5 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white rounded-md transition-colors" title="View / Edit Lead">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                        </button>
                        
                        <!-- WhatsApp Direct -->
                        <a href="${waHref}" target="_blank" rel="noopener noreferrer" class="p-1.5 bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white rounded-md transition-colors" title="Chat on WhatsApp">
                            <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 001.33 4.982L2 22l5.233-1.371a9.994 9.994 0 004.773 1.226h.004c5.505 0 9.989-4.478 9.99-9.984a9.96 9.96 0 00-2.925-7.064 9.964 9.964 0 00-7.063-2.923zm5.035 14.175c-.276.776-1.357 1.411-1.854 1.503-.497.092-.992.176-2.915-.584-2.457-.973-4.043-3.473-4.165-3.637-.123-.164-1.002-1.332-1.002-2.541 0-1.21.635-1.803.862-2.049.227-.246.497-.307.662-.307.165 0 .331.006.475.012.148.006.348-.055.546.425.199.479.679 1.656.739 1.779.061.123.102.266.02.43-.082.164-.123.266-.246.41-.122.143-.258.32-.367.43-.122.123-.25.257-.107.502.143.246.636 1.05 1.37 1.702.946.84 1.74 1.1 1.987 1.224.246.123.389.102.532-.062.143-.164.615-.717.778-.962.164-.246.327-.205.551-.123.224.082 1.424.671 1.669.794.246.123.41.184.471.287.062.102.062.594-.214 1.37z"/></svg>
                        </a>
                        
                        <!-- Call Direct -->
                        <a href="tel:${lead.mobile}" class="p-1.5 bg-gray-50 text-gray-600 hover:bg-gray-800 hover:text-white rounded-md transition-colors" title="Call Mobile">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                        </a>

                        <!-- Delete Lead -->
                        <button onclick="window.DisicureMain.deleteLead('${lead.leadId}')" class="p-1.5 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white rounded-md transition-colors" title="Delete Lead">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                        </button>
                    </div>
                </td>
            </tr>
            `;
        });

        tbody.innerHTML = rowsHtml;
    },

    // Quick Status changer from table dropdown
    changeLeadStatusQuick: function(leadId, newStatus) {
        if (!window.DisicureLeads) return;
        window.DisicureLeads.updateStatus(leadId, newStatus);
        this.renderAdminLeads();
    },

    // Quick Assigned person changer from table dropdown
    changeLeadAssignedQuick: function(leadId, newPerson) {
        if (!window.DisicureLeads) return;
        window.DisicureLeads.updateLead(leadId, { assignedPerson: newPerson });
        this.renderAdminLeads();
    },

    // Open Edit/View Lead Drawer
    openLeadDrawer: function(leadId) {
        const leads = window.DisicureLeads.getAllLeads();
        const lead = leads.find(l => l.leadId === leadId);
        if (!lead) return;

        const drawer = document.getElementById('lms-lead-drawer');
        const container = document.getElementById('lms-drawer-content');
        if (!drawer || !container) return;

        container.innerHTML = `
        <div class="space-y-6">
            <!-- Header with ID & Status -->
            <div class="flex items-center justify-between border-b border-gray-100 pb-4">
                <div>
                    <span class="text-xs font-bold text-blue-600 uppercase tracking-wider block">Lead Record</span>
                    <h3 class="text-xl font-extrabold text-navy-950">${lead.leadId} — ${lead.name}</h3>
                </div>
                <div>
                    <span class="text-xs font-bold text-gray-400 block text-right">Captured: ${lead.createdDate}</span>
                    <span class="text-[10px] text-gray-400 block text-right">Updated: ${lead.lastUpdatedDate}</span>
                </div>
            </div>

            <!-- Edit Form -->
            <form id="lms-edit-lead-form" onsubmit="window.DisicureMain.saveLeadEdit(event, '${lead.leadId}')" class="space-y-4">
                <!-- Status & Assignee Grid -->
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-blue-50/40 p-4 rounded-xl border border-blue-100">
                    <div>
                        <label class="block text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-1">Lead Status *</label>
                        <select name="leadStatus" class="w-full bg-white border border-gray-200 rounded p-2 text-xs font-bold focus:border-blue-500">
                            ${window.DisicureLeads.STATUSES.map(s => `
                                <option value="${s.label}" ${s.label === lead.leadStatus ? 'selected' : ''}>${s.label}</option>
                            `).join('')}
                        </select>
                    </div>
                    <div>
                        <label class="block text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-1">Assigned Person *</label>
                        <select name="assignedPerson" class="w-full bg-white border border-gray-200 rounded p-2 text-xs font-medium focus:border-blue-500">
                            ${window.DisicureLeads.TEAM_MEMBERS.map(m => `
                                <option value="${m}" ${m === lead.assignedPerson ? 'selected' : ''}>${m}</option>
                            `).join('')}
                        </select>
                    </div>
                    <div>
                        <label class="block text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-1">Follow-up Date</label>
                        <input type="date" name="followUpDate" value="${lead.followUpDate || ''}" class="w-full bg-white border border-gray-200 rounded p-2 text-xs focus:border-blue-500">
                    </div>
                </div>

                <!-- Contact Info Grid -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-1">Contact Name *</label>
                        <input type="text" name="name" value="${lead.name}" required class="w-full bg-white border border-gray-200 rounded p-2 text-xs focus:border-blue-500 font-medium">
                    </div>
                    <div>
                        <label class="block text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-1">Email Address</label>
                        <input type="email" name="email" value="${lead.email}" class="w-full bg-white border border-gray-200 rounded p-2 text-xs focus:border-blue-500 font-medium">
                    </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-1">Mobile Number *</label>
                        <input type="tel" name="mobile" value="${lead.mobile}" required class="w-full bg-white border border-gray-200 rounded p-2 text-xs focus:border-blue-500 font-mono">
                    </div>
                    <div>
                        <label class="block text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-1">WhatsApp Number</label>
                        <input type="tel" name="whatsapp" value="${lead.whatsapp}" class="w-full bg-white border border-gray-200 rounded p-2 text-xs focus:border-blue-500 font-mono">
                    </div>
                </div>

                <!-- Location Grid -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-1">City</label>
                        <input type="text" name="city" value="${lead.city}" class="w-full bg-white border border-gray-200 rounded p-2 text-xs focus:border-blue-500">
                    </div>
                    <div>
                        <label class="block text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-1">State</label>
                        <input type="text" name="state" value="${lead.state}" class="w-full bg-white border border-gray-200 rounded p-2 text-xs focus:border-blue-500">
                    </div>
                </div>

                <!-- Business & Requirement Grid -->
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                        <label class="block text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-1">Business Type</label>
                        <input type="text" name="businessType" value="${lead.businessType}" class="w-full bg-white border border-gray-200 rounded p-2 text-xs focus:border-blue-500">
                    </div>
                    <div>
                        <label class="block text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-1">Requirement Type</label>
                        <input type="text" name="requirementType" value="${lead.requirementType}" class="w-full bg-white border border-gray-200 rounded p-2 text-xs focus:border-blue-500">
                    </div>
                    <div>
                        <label class="block text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-1">Lead Source</label>
                        <input type="text" name="source" value="${lead.source}" class="w-full bg-white border border-gray-200 rounded p-2 text-xs focus:border-blue-500">
                    </div>
                </div>

                <div>
                    <label class="block text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-1">Target Product / Service / Molecule</label>
                    <input type="text" name="productOrService" value="${lead.productOrService}" class="w-full bg-white border border-gray-200 rounded p-2 text-xs focus:border-blue-500 font-bold text-navy-950">
                </div>

                <!-- Notes & Follow-up History -->
                <div>
                    <label class="block text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-1">Lead Notes & Conversation History</label>
                    <textarea name="notes" rows="4" class="w-full bg-white border border-gray-200 rounded p-2.5 text-xs focus:border-blue-500 font-normal leading-relaxed">${lead.notes || ''}</textarea>
                </div>

                <!-- Quick Add Note Field -->
                <div class="bg-gray-50 p-3 rounded-lg border border-gray-200">
                    <label class="block text-[10px] font-bold text-blue-700 uppercase tracking-wider mb-1">+ Append New Timestamped Follow-up Note</label>
                    <div class="flex gap-2">
                        <input type="text" id="lms-new-note-input" placeholder="e.g. Called client, shared product catalog and pricing sheet..." class="flex-1 bg-white border border-gray-200 rounded p-2 text-xs focus:border-blue-500">
                        <button type="button" onclick="window.DisicureMain.appendLeadNote('${lead.leadId}')" class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded transition-colors">
                            Add Note
                        </button>
                    </div>
                </div>

                <!-- Form Action Buttons -->
                <div class="flex items-center justify-between pt-4 border-t border-gray-100">
                    <button type="button" onclick="window.DisicureMain.deleteLead('${lead.leadId}')" class="px-4 py-2.5 bg-rose-50 text-rose-700 hover:bg-rose-600 hover:text-white text-xs font-bold rounded transition-colors">
                        Delete Lead
                    </button>
                    <div class="flex gap-3">
                        <button type="button" onclick="window.DisicureMain.closeLeadDrawer()" class="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded transition-colors">
                            Cancel
                        </button>
                        <button type="submit" class="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded shadow transition-colors">
                            Save Changes
                        </button>
                    </div>
                </div>
            </form>
        </div>
        `;

        drawer.classList.remove('hidden');
        drawer.classList.add('flex');
        document.body.classList.add('overflow-hidden');
    },

    closeLeadDrawer: function() {
        const drawer = document.getElementById('lms-lead-drawer');
        if (drawer) {
            drawer.classList.remove('flex');
            drawer.classList.add('hidden');
            document.body.classList.remove('overflow-hidden');
        }
    },

    appendLeadNote: function(leadId) {
        const noteInput = document.getElementById('lms-new-note-input');
        if (!noteInput || !noteInput.value.trim()) return;

        window.DisicureLeads.addNote(leadId, noteInput.value.trim());
        noteInput.value = '';
        this.openLeadDrawer(leadId); // Refresh drawer content
        this.renderAdminLeads();
    },

    saveLeadEdit: function(event, leadId) {
        event.preventDefault();
        const form = document.getElementById('lms-edit-lead-form');
        if (!form) return;

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        window.DisicureLeads.updateLead(leadId, data);
        this.closeLeadDrawer();
        this.renderAdminLeads();
    },

    // Delete Lead
    deleteLead: function(leadId) {
        if (confirm(`Are you sure you want to delete lead record ${leadId}?`)) {
            window.DisicureLeads.deleteLead(leadId);
            this.closeLeadDrawer();
            this.renderAdminLeads();
        }
    },

    // Open Manual Add Lead Modal
    openAddLeadModal: function() {
        const modal = document.getElementById('lms-add-modal');
        if (modal) {
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            document.body.classList.add('overflow-hidden');
        }
    },

    closeAddLeadModal: function() {
        const modal = document.getElementById('lms-add-modal');
        if (modal) {
            modal.classList.remove('flex');
            modal.classList.add('hidden');
            document.body.classList.remove('overflow-hidden');
            const form = document.getElementById('lms-new-lead-form');
            if (form) form.reset();
        }
    },

    saveNewLead: function(event) {
        event.preventDefault();
        const form = document.getElementById('lms-new-lead-form');
        if (!form) return;

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        window.DisicureLeads.addLead({
            ...data,
            source: data.source || 'Admin Manual Entry'
        });

        this.closeAddLeadModal();
        this.renderAdminLeads();
    },

    // --- DASHBOARD ANALYTICS & VISUAL CHARTS RENDERER ---
    renderDashboardAnalytics: function() {
        if (!window.DisicureLeads || typeof window.DisicureLeads.getDashboardAnalytics !== 'function') return;
        const data = window.DisicureLeads.getDashboardAnalytics();

        // Helper to update text safely
        const setElText = (id, val) => {
            const el = document.getElementById(id);
            if (el) el.innerText = val;
        };

        // 1. Update 10 KPI Counters
        setElText('kpi-total-leads', data.totalLeads);
        setElText('kpi-new-leads', data.newLeads);
        setElText('kpi-followup-leads', data.followupLeads);
        setElText('kpi-converted-leads', data.convertedLeads);
        setElText('kpi-lost-leads', data.lostLeads);
        setElText('kpi-business-value', data.financials.totalBusinessFormatted);
        setElText('kpi-payments-received', data.financials.paymentsReceivedFormatted);
        setElText('kpi-pending-payments', data.financials.pendingPaymentsFormatted);
        setElText('kpi-active-partners', data.financials.activePartnersCount);
        setElText('kpi-team-members', data.financials.teamMembersCount);
        setElText('kpi-conversion-rate', `${data.conversionRate}% Won`);

        // 2. Render 6 Dedicated Charts
        this.renderMonthlyLeadsChart(data.monthlyLeads);
        this.renderConversionChart(data);
        this.renderRevenueChart(data.monthlyRevenue);
        this.renderPendingAgingChart(data.pendingAging);
        this.renderLeadSourcesChart(data.leadSources);
        this.renderPartnerPerformanceTable(data.partnerPerformance);

        // 3. Render Secondary Tabs Directories
        this.renderPartnersDirectory(data.partnerPerformance);
        this.renderTeamDirectory(data.teamMembers);
        this.renderFinancialsAging(data.pendingAging);
    },

    // Chart 1: Monthly Leads (Bar Chart SVG)
    renderMonthlyLeadsChart: function(monthlyData) {
        const container = document.getElementById('chart-monthly-leads');
        if (!container || !monthlyData || !monthlyData.length) return;

        const maxVal = Math.max(...monthlyData.map(d => d.count), 60);
        const svgHeight = 220;
        const svgWidth = 620;
        const paddingBottom = 30;
        const paddingTop = 25;
        const chartHeight = svgHeight - paddingBottom - paddingTop;
        const barWidth = 32;
        const gap = (svgWidth - 60 - (monthlyData.length * barWidth)) / (monthlyData.length - 1);

        let barsSvg = '';
        let labelsSvg = '';
        let gridSvg = '';

        // Grid lines
        for (let i = 0; i <= 4; i++) {
            const y = paddingTop + (chartHeight / 4) * i;
            const val = Math.round(maxVal - (maxVal / 4) * i);
            gridSvg += `
                <line x1="35" y1="${y}" x2="${svgWidth - 10}" y2="${y}" stroke="#f1f5f9" stroke-width="1" />
                <text x="30" y="${y + 3}" fill="#94a3b8" font-size="9" font-weight="600" text-anchor="end">${val}</text>
            `;
        }

        monthlyData.forEach((item, index) => {
            const x = 45 + index * (barWidth + gap);
            const h = (item.count / maxVal) * chartHeight;
            const y = paddingTop + chartHeight - h;

            barsSvg += `
                <g class="chart-bar-group cursor-pointer">
                    <rect x="${x}" y="${y}" width="${barWidth}" height="${h}" rx="6" fill="url(#blueBarGrad)" class="transition-all duration-300 hover:opacity-80" />
                    <text x="${x + barWidth / 2}" y="${y - 6}" fill="#1e3a8a" font-size="10" font-weight="700" text-anchor="middle">${item.count}</text>
                </g>
            `;

            labelsSvg += `
                <text x="${x + barWidth / 2}" y="${svgHeight - 10}" fill="#64748b" font-size="10" font-weight="600" text-anchor="middle">${item.month}</text>
            `;
        });

        container.innerHTML = `
            <svg viewBox="0 0 ${svgWidth} ${svgHeight}" class="w-full h-full select-none">
                <defs>
                    <linearGradient id="blueBarGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stop-color="#2563eb" />
                        <stop offset="100%" stop-color="#3b82f6" stop-opacity="0.7" />
                    </linearGradient>
                </defs>
                ${gridSvg}
                ${barsSvg}
                ${labelsSvg}
            </svg>
        `;
    },

    // Chart 2: Conversion Funnel & Status Distribution
    renderConversionChart: function(data) {
        const container = document.getElementById('chart-conversion-rate');
        if (!container) return;

        const total = data.totalLeads || 1;
        const statuses = [
            { label: '🟢 New', count: data.newLeads, color: 'bg-emerald-500', textCol: 'text-emerald-700' },
            { label: '🔵 Contacted', count: data.contactedLeads, color: 'bg-blue-500', textCol: 'text-blue-700' },
            { label: '🟡 Follow-up', count: data.followupLeads, color: 'bg-amber-500', textCol: 'text-amber-700' },
            { label: '🟠 Negotiation', count: data.negotiationLeads, color: 'bg-orange-500', textCol: 'text-orange-700' },
            { label: '🟣 Converted', count: data.convertedLeads, color: 'bg-purple-500', textCol: 'text-purple-700' },
            { label: '🔴 Lost', count: data.lostLeads, color: 'bg-rose-500', textCol: 'text-rose-700' },
            { label: '⚫ On Hold', count: data.onholdLeads, color: 'bg-gray-500', textCol: 'text-gray-700' }
        ];

        let rowsHtml = '';
        statuses.forEach(s => {
            const pct = Math.round((s.count / total) * 100);
            rowsHtml += `
                <div class="flex items-center gap-3 text-xs">
                    <span class="w-24 font-bold text-gray-700 truncate">${s.label}</span>
                    <div class="flex-1 bg-gray-100 rounded-full h-2.5 overflow-hidden">
                        <div class="${s.color} h-2.5 rounded-full transition-all duration-500" style="width: ${pct}%"></div>
                    </div>
                    <span class="w-10 text-right font-extrabold ${s.textCol}">${s.count}</span>
                    <span class="w-10 text-right text-[10px] text-gray-400 font-medium">${pct}%</span>
                </div>
            `;
        });

        container.innerHTML = `
            <div class="w-full space-y-2.5 py-1">
                ${rowsHtml}
            </div>
        `;
    },

    // Chart 3: Monthly Revenue Trajectory (Area / Line Chart SVG)
    renderRevenueChart: function(monthlyRev) {
        const container = document.getElementById('chart-revenue');
        if (!container || !monthlyRev || !monthlyRev.length) return;

        const maxRev = Math.max(...monthlyRev.map(d => d.revenue), 10);
        const svgHeight = 220;
        const svgWidth = 620;
        const paddingBottom = 30;
        const paddingTop = 25;
        const chartHeight = svgHeight - paddingBottom - paddingTop;
        const chartWidth = svgWidth - 60;
        const stepX = chartWidth / (monthlyRev.length - 1);

        let points = [];
        let dotsSvg = '';
        let labelsSvg = '';
        let gridSvg = '';

        // Grid lines
        for (let i = 0; i <= 4; i++) {
            const y = paddingTop + (chartHeight / 4) * i;
            const val = ((maxRev - (maxRev / 4) * i)).toFixed(1);
            gridSvg += `
                <line x1="45" y1="${y}" x2="${svgWidth - 10}" y2="${y}" stroke="#f1f5f9" stroke-width="1" />
                <text x="38" y="${y + 3}" fill="#94a3b8" font-size="9" font-weight="600" text-anchor="end">₹${val}L</text>
            `;
        }

        monthlyRev.forEach((item, index) => {
            const x = 50 + index * stepX;
            const y = paddingTop + chartHeight - (item.revenue / maxRev) * chartHeight;
            points.push(`${x},${y}`);

            dotsSvg += `
                <g class="chart-dot cursor-pointer">
                    <circle cx="${x}" cy="${y}" r="4" fill="#2563eb" stroke="#ffffff" stroke-width="2" />
                    <text x="${x}" y="${y - 8}" fill="#1e3a8a" font-size="9" font-weight="700" text-anchor="middle">₹${item.revenue}L</text>
                </g>
            `;

            labelsSvg += `
                <text x="${x}" y="${svgHeight - 10}" fill="#64748b" font-size="10" font-weight="600" text-anchor="middle">${item.month}</text>
            `;
        });

        const linePath = `M ${points.join(' L ')}`;
        const areaPath = `M ${points[0]} L ${points.join(' L ')} L ${50 + (monthlyRev.length - 1) * stepX},${paddingTop + chartHeight} L 50,${paddingTop + chartHeight} Z`;

        container.innerHTML = `
            <svg viewBox="0 0 ${svgWidth} ${svgHeight}" class="w-full h-full select-none">
                <defs>
                    <linearGradient id="revAreaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stop-color="#3b82f6" stop-opacity="0.3" />
                        <stop offset="100%" stop-color="#3b82f6" stop-opacity="0.0" />
                    </linearGradient>
                </defs>
                ${gridSvg}
                <path d="${areaPath}" fill="url(#revAreaGrad)" />
                <path d="${linePath}" fill="none" stroke="#2563eb" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                ${dotsSvg}
                ${labelsSvg}
            </svg>
        `;
    },

    // Chart 4: Pending Payments Aging Breakdown
    renderPendingAgingChart: function(agingData) {
        const container = document.getElementById('chart-pending-aging');
        if (!container || !agingData) return;

        let barsHtml = '';
        agingData.forEach(item => {
            barsHtml += `
                <div class="space-y-1.5">
                    <div class="flex items-center justify-between text-xs">
                        <span class="font-bold text-gray-800">${item.bucket}</span>
                        <div class="flex items-center gap-2">
                            <span class="font-extrabold text-navy-950">${item.amountFormatted}</span>
                            <span class="text-[10px] text-gray-500 font-semibold">(${item.percentage}%)</span>
                        </div>
                    </div>
                    <div class="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                        <div class="h-3 rounded-full transition-all duration-500" style="width: ${item.percentage}%; background-color: ${item.color};"></div>
                    </div>
                    <div class="flex justify-between items-center text-[10px]">
                        <span class="text-gray-400 font-medium">Status: ${item.status}</span>
                    </div>
                </div>
            `;
        });

        container.innerHTML = `
            <div class="w-full space-y-3.5 py-1">
                ${barsHtml}
            </div>
        `;
    },

    // Chart 5: Lead Sources Distribution
    renderLeadSourcesChart: function(sourcesData) {
        const container = document.getElementById('chart-lead-sources');
        if (!container || !sourcesData) return;

        let sourcesHtml = '';
        sourcesData.forEach(item => {
            sourcesHtml += `
                <div class="flex items-center justify-between gap-3 text-xs p-2 rounded-lg bg-gray-50/70 border border-gray-100">
                    <div class="flex items-center gap-2">
                        <span class="w-3 h-3 rounded-full" style="background-color: ${item.color}"></span>
                        <span class="font-bold text-navy-950">${item.source}</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <span class="font-extrabold text-blue-700">${item.count} Leads</span>
                        <span class="text-[11px] font-bold text-gray-500 bg-white px-2 py-0.5 rounded border border-gray-200">${item.percentage}%</span>
                    </div>
                </div>
            `;
        });

        container.innerHTML = `
            <div class="w-full space-y-2 py-1">
                ${sourcesHtml}
            </div>
        `;
    },

    // Chart 6: Partner Performance Leaderboard Table
    renderPartnerPerformanceTable: function(partners) {
        const container = document.getElementById('chart-partner-performance');
        if (!container || !partners) return;

        let rowsHtml = '';
        partners.forEach((p, idx) => {
            rowsHtml += `
                <tr class="border-b border-gray-100 hover:bg-indigo-50/20 text-xs">
                    <td class="p-3 font-extrabold text-navy-950 flex items-center gap-2">
                        <span class="w-5 h-5 rounded-full bg-indigo-50 text-indigo-700 flex items-center justify-center text-[10px] font-bold">${idx + 1}</span>
                        <div>
                            <div>${p.name}</div>
                            <div class="text-[10px] text-gray-400 font-normal">📍 ${p.region}</div>
                        </div>
                    </td>
                    <td class="p-3 text-gray-600 font-medium">${p.type}</td>
                    <td class="p-3 font-extrabold text-indigo-700">${p.orderVolume}</td>
                    <td class="p-3">
                        <div class="flex items-center gap-2">
                            <div class="w-20 bg-gray-100 rounded-full h-2 overflow-hidden">
                                <div class="bg-emerald-500 h-2 rounded-full" style="width: ${p.fulfillment}%"></div>
                            </div>
                            <span class="font-bold text-gray-700 text-[11px]">${p.fulfillment}%</span>
                        </div>
                    </td>
                    <td class="p-3 font-bold text-gray-700 text-center">${p.batches} Batches</td>
                    <td class="p-3 text-right">
                        <span class="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            ${p.status}
                        </span>
                    </td>
                </tr>
            `;
        });

        container.innerHTML = `
            <table class="w-full text-left border-collapse">
                <thead>
                    <tr class="bg-slate-50 border-b border-gray-200 text-[10px] font-extrabold text-gray-500 uppercase tracking-wider">
                        <th class="p-3">Partner & Region</th>
                        <th class="p-3">Category</th>
                        <th class="p-3">Order Volume</th>
                        <th class="p-3">Fulfillment</th>
                        <th class="p-3 text-center">Completed Batches</th>
                        <th class="p-3 text-right">Rating</th>
                    </tr>
                </thead>
                <tbody>
                    ${rowsHtml}
                </tbody>
            </table>
        `;
    },

    // Secondary Tab 3: Active Partners Directory Cards
    renderPartnersDirectory: function(partners) {
        const grid = document.getElementById('lms-partners-grid');
        if (!grid || !partners) return;

        let cardsHtml = '';
        partners.forEach(p => {
            cardsHtml += `
                <div class="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow space-y-3">
                    <div class="flex items-start justify-between">
                        <div>
                            <span class="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded uppercase tracking-wider">${p.type}</span>
                            <h4 class="text-base font-extrabold text-navy-950 mt-1">${p.name}</h4>
                            <p class="text-xs text-gray-500 font-normal">📍 ${p.region}</p>
                        </div>
                        <span class="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">${p.status}</span>
                    </div>
                    <div class="grid grid-cols-2 gap-2 pt-2 border-t border-gray-100 text-xs">
                        <div>
                            <span class="text-[10px] text-gray-400 block uppercase">Total Business</span>
                            <span class="font-extrabold text-indigo-700">${p.orderVolume}</span>
                        </div>
                        <div>
                            <span class="text-[10px] text-gray-400 block uppercase">Batches Cleared</span>
                            <span class="font-extrabold text-gray-800">${p.batches} Commercial Runs</span>
                        </div>
                    </div>
                    <div class="flex items-center justify-between text-xs pt-2">
                        <span class="text-gray-500">Order Fulfillment:</span>
                        <span class="font-bold text-emerald-600">${p.fulfillment}%</span>
                    </div>
                </div>
            `;
        });

        grid.innerHTML = cardsHtml;
    },

    // Secondary Tab 4: Team Directory Cards
    renderTeamDirectory: function(members) {
        const grid = document.getElementById('lms-team-grid');
        if (!grid || !members) return;

        let cardsHtml = '';
        members.forEach(m => {
            cardsHtml += `
                <div class="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow space-y-3">
                    <div class="w-12 h-12 rounded-full bg-blue-100 text-blue-700 font-extrabold text-lg flex items-center justify-center">
                        ${m.name.charAt(0)}
                    </div>
                    <div>
                        <h4 class="text-sm font-extrabold text-navy-950">${m.name}</h4>
                        <span class="text-xs font-bold text-blue-600">${m.role}</span>
                        <p class="text-[11px] text-gray-400 font-normal mt-0.5">${m.dept}</p>
                    </div>
                    <div class="pt-2 border-t border-gray-100 flex items-center justify-between text-xs">
                        <span class="text-gray-500 font-medium">Assigned Leads:</span>
                        <span class="font-extrabold text-navy-950 bg-blue-50 px-2 py-0.5 rounded">${m.activeLeads}</span>
                    </div>
                    <div class="flex items-center justify-between text-xs text-gray-600">
                        <span>📞 ${m.phone}</span>
                        <span class="text-[10px] font-bold text-emerald-600">${m.status}</span>
                    </div>
                </div>
            `;
        });

        grid.innerHTML = cardsHtml;
    },

    // Secondary Tab 5: Financials Aging Schedule
    renderFinancialsAging: function(aging) {
        const container = document.getElementById('lms-financials-aging');
        if (!container || !aging) return;

        let itemsHtml = '';
        aging.forEach(a => {
            itemsHtml += `
                <div class="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100 text-xs">
                    <div>
                        <span class="font-extrabold text-navy-950 text-sm block">${a.bucket}</span>
                        <span class="text-gray-500 font-normal">Terms: ${a.status}</span>
                    </div>
                    <div class="text-right">
                        <span class="font-extrabold text-base text-navy-950 block">${a.amountFormatted}</span>
                        <span class="text-[10px] font-bold text-gray-500">${a.percentage}% of outstanding portfolio</span>
                    </div>
                </div>
            `;
        });

        container.innerHTML = itemsHtml;
    },

    exportLeadsCSV: function() {
        if (window.DisicureLeads) {
            window.DisicureLeads.exportToCSV();
        }
    },

    resetLeadsData: function() {
        if (confirm('Reset lead management database to initial demo leads?')) {
            window.DisicureLeads.resetToDefaults();
            this.renderAdminLeads();
        }
    },

    // =========================================================================
    // --- 12. PAYMENT MANAGEMENT SYSTEM (PMS) CONTROLLER METHODS ---
    // =========================================================================
    renderPaymentsTable: function() {
        if (!window.DisicurePayments) return;
        const allPayments = window.DisicurePayments.getAllPayments();
        const summary = window.DisicurePayments.getSummary();

        // Update Summary KPI Cards
        const setElText = (id, val) => {
            const el = document.getElementById(id);
            if (el) el.innerText = val;
        };

        setElText('pms-total-invoiced', summary.totalInvoicedFormatted);
        setElText('pms-total-received', summary.totalReceivedFormatted);
        setElText('pms-total-pending', summary.totalPendingFormatted);
        setElText('pms-total-overdue', summary.overdueAmountFormatted);

        // Filter Payments
        const query = this.pmsState.searchQuery;
        let filtered = allPayments.filter(pay => {
            const matchesQuery = !query || 
                (pay.clientName && pay.clientName.toLowerCase().includes(query)) ||
                (pay.invoiceId && pay.invoiceId.toLowerCase().includes(query)) ||
                (pay.paymentId && pay.paymentId.toLowerCase().includes(query)) ||
                (pay.notes && pay.notes.toLowerCase().includes(query));

            const matchesStatus = this.pmsState.statusFilter === 'all' || pay.paymentStatus === this.pmsState.statusFilter;
            const matchesMode = this.pmsState.modeFilter === 'all' || pay.paymentMode === this.pmsState.modeFilter;

            return matchesQuery && matchesStatus && matchesMode;
        });

        const tbody = document.getElementById('pms-payments-tbody');
        const emptyState = document.getElementById('pms-empty-state');
        const countDisplay = document.getElementById('pms-showing-count');

        if (countDisplay) {
            countDisplay.innerText = `Showing ${filtered.length} of ${allPayments.length} Invoices / Transactions`;
        }

        if (!tbody) return;

        if (filtered.length === 0) {
            tbody.innerHTML = '';
            if (emptyState) emptyState.classList.remove('hidden');
            return;
        }

        if (emptyState) emptyState.classList.add('hidden');

        const formatINR = (val) => '₹' + Number(val || 0).toLocaleString('en-IN');

        let rowsHtml = '';
        filtered.forEach(p => {
            const statusObj = window.DisicurePayments.STATUSES.find(s => s.label === p.paymentStatus) || window.DisicurePayments.STATUSES[0];

            rowsHtml += `
            <tr class="border-b border-gray-100 hover:bg-blue-50/30 transition-colors text-xs">
                <!-- Invoice / Ref ID -->
                <td class="p-3.5 whitespace-nowrap">
                    <button onclick="window.DisicureMain.openPaymentDrawer('${p.paymentId}')" class="font-extrabold text-blue-600 hover:underline block text-left font-mono">
                        ${p.invoiceId}
                    </button>
                    <span class="text-[10px] text-gray-400 block mt-0.5">${p.paymentId}</span>
                </td>

                <!-- Client / Partner Name -->
                <td class="p-3.5">
                    <div class="font-extrabold text-navy-950 text-sm">${p.clientName}</div>
                    <div class="text-[11px] text-gray-500 font-normal mt-0.5 line-clamp-1">${p.notes || 'Commercial Batch Contract'}</div>
                </td>

                <!-- Total Amount -->
                <td class="p-3.5 whitespace-nowrap">
                    <span class="font-extrabold text-navy-950 text-sm">${formatINR(p.totalAmount)}</span>
                </td>

                <!-- Amount Received -->
                <td class="p-3.5 whitespace-nowrap">
                    <span class="font-extrabold text-emerald-600 text-sm">${formatINR(p.amountReceived)}</span>
                </td>

                <!-- Pending Amount -->
                <td class="p-3.5 whitespace-nowrap">
                    <span class="font-extrabold ${p.pendingAmount > 0 ? 'text-amber-600' : 'text-gray-400'} text-sm">${formatINR(p.pendingAmount)}</span>
                </td>

                <!-- Payment Date -->
                <td class="p-3.5 whitespace-nowrap text-gray-600 font-medium">
                    ${p.paymentDate}
                </td>

                <!-- Payment Mode -->
                <td class="p-3.5 whitespace-nowrap">
                    <span class="inline-block px-2.5 py-1 bg-slate-100 text-slate-700 rounded text-[10px] font-bold uppercase tracking-wider">
                        ${p.paymentMode}
                    </span>
                </td>

                <!-- Payment Status -->
                <td class="p-3.5 whitespace-nowrap">
                    <select onchange="window.DisicureMain.changePaymentStatusQuick('${p.paymentId}', this.value)" class="text-xs font-bold rounded-lg border border-gray-200 p-1.5 bg-white shadow-sm focus:outline-none focus:border-blue-500">
                        ${window.DisicurePayments.STATUSES.map(s => `
                            <option value="${s.label}" ${s.label === p.paymentStatus ? 'selected' : ''}>${s.label}</option>
                        `).join('')}
                    </select>
                </td>

                <!-- Proof / Document -->
                <td class="p-3.5 whitespace-nowrap">
                    ${p.proofDocument ? `
                        <button onclick="window.DisicureMain.openProofModal('${p.invoiceId} - ${p.clientName}', '${p.proofDocument}')" class="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-md text-[11px] font-bold transition-colors">
                            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                            <span class="max-w-[90px] truncate">${p.proofDocument}</span>
                        </button>
                    ` : `
                        <span class="text-[11px] text-gray-400 italic">No proof</span>
                    `}
                </td>

                <!-- Actions -->
                <td class="p-3.5 whitespace-nowrap text-right">
                    <div class="flex items-center justify-end gap-1.5">
                        <button onclick="window.DisicureMain.openPaymentDrawer('${p.paymentId}')" class="p-1.5 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white rounded-md transition-colors" title="Edit Payment Record">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                        </button>
                        <button onclick="window.DisicureMain.deletePayment('${p.paymentId}')" class="p-1.5 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white rounded-md transition-colors" title="Delete Record">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                        </button>
                    </div>
                </td>
            </tr>
            `;
        });

        tbody.innerHTML = rowsHtml;
    },

    // Live calculation for Add Payment Modal
    calcNewPaymentPending: function() {
        const totalInput = document.getElementById('pms-new-total');
        const receivedInput = document.getElementById('pms-new-received');
        const display = document.getElementById('pms-new-pending-display');
        const statusSelect = document.getElementById('pms-new-status');

        if (!totalInput || !receivedInput || !display) return;

        const total = parseFloat(totalInput.value) || 0;
        const received = parseFloat(receivedInput.value) || 0;
        const pending = Math.max(0, total - received);

        display.value = '₹' + Number(pending).toLocaleString('en-IN');

        if (statusSelect) {
            if (received >= total && total > 0) {
                statusSelect.value = '🟢 Paid';
            } else if (received > 0 && received < total) {
                statusSelect.value = '🟡 Partial';
            } else {
                statusSelect.value = '🔴 Pending';
            }
        }
    },

    // Live calculation for Edit Payment Drawer
    calcEditPaymentPending: function() {
        const totalInput = document.getElementById('pms-edit-total');
        const receivedInput = document.getElementById('pms-edit-received');
        const display = document.getElementById('pms-edit-pending-display');
        const statusSelect = document.getElementById('pms-edit-status');

        if (!totalInput || !receivedInput || !display) return;

        const total = parseFloat(totalInput.value) || 0;
        const received = parseFloat(receivedInput.value) || 0;
        const pending = Math.max(0, total - received);

        display.value = '₹' + Number(pending).toLocaleString('en-IN');

        if (statusSelect) {
            if (received >= total && total > 0) {
                statusSelect.value = '🟢 Paid';
            } else if (received > 0 && received < total) {
                statusSelect.value = '🟡 Partial';
            } else {
                statusSelect.value = '🔴 Pending';
            }
        }
    },

    handleProofUpload: function(event, targetHiddenInputId) {
        const file = event.target.files[0];
        if (file) {
            const targetInput = document.getElementById(targetHiddenInputId);
            if (targetInput) {
                targetInput.value = file.name;
            }
        }
    },

    // Open/Close Add Payment Modal
    openAddPaymentModal: function() {
        const modal = document.getElementById('pms-add-modal');
        if (modal) {
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            document.body.classList.add('overflow-hidden');
            this.calcNewPaymentPending();
        }
    },

    closeAddPaymentModal: function() {
        const modal = document.getElementById('pms-add-modal');
        if (modal) {
            modal.classList.remove('flex');
            modal.classList.add('hidden');
            document.body.classList.remove('overflow-hidden');
            const form = document.getElementById('pms-new-payment-form');
            if (form) form.reset();
        }
    },

    saveNewPayment: function(event) {
        event.preventDefault();
        const form = document.getElementById('pms-new-payment-form');
        if (!form) return;

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        window.DisicurePayments.addPayment(data);
        this.closeAddPaymentModal();
        this.renderPaymentsTable();
        this.renderDashboardAnalytics();
    },

    // Open/Close Edit Payment Drawer
    openPaymentDrawer: function(paymentId) {
        const payments = window.DisicurePayments.getAllPayments();
        const payment = payments.find(p => p.paymentId === paymentId);
        if (!payment) return;

        const drawer = document.getElementById('pms-edit-drawer');
        const container = document.getElementById('pms-drawer-content');
        if (!drawer || !container) return;

        container.innerHTML = `
        <div class="space-y-6">
            <div class="flex items-center justify-between border-b border-gray-100 pb-4">
                <div>
                    <span class="text-xs font-bold text-blue-600 uppercase tracking-wider block">Payment Transaction</span>
                    <h3 class="text-xl font-extrabold text-navy-950 font-mono">${payment.invoiceId} — ${payment.paymentId}</h3>
                </div>
                <div>
                    <span class="text-xs font-bold text-gray-400 block text-right">Recorded: ${payment.createdDate}</span>
                    <span class="text-[10px] text-gray-400 block text-right">Updated: ${payment.lastUpdatedDate}</span>
                </div>
            </div>

            <form id="pms-edit-payment-form" onsubmit="window.DisicureMain.savePaymentEdit(event, '${payment.paymentId}')" class="space-y-4">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-1">Client / Partner Name *</label>
                        <input type="text" name="clientName" value="${payment.clientName}" required class="w-full bg-white border border-gray-200 rounded p-2.5 text-xs font-bold focus:border-blue-500">
                    </div>
                    <div>
                        <label class="block text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-1">Invoice / Reference ID *</label>
                        <input type="text" name="invoiceId" value="${payment.invoiceId}" required class="w-full bg-white border border-gray-200 rounded p-2.5 text-xs font-mono focus:border-blue-500">
                    </div>
                </div>

                <!-- Financial Breakdown -->
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-blue-50/40 p-4 rounded-xl border border-blue-100">
                    <div>
                        <label class="block text-[10px] font-bold text-blue-900 uppercase tracking-wider mb-1">Total Amount (₹) *</label>
                        <input type="number" id="pms-edit-total" name="totalAmount" value="${payment.totalAmount}" required min="0" step="any" oninput="window.DisicureMain.calcEditPaymentPending()" class="w-full bg-white border border-gray-200 rounded p-2 text-xs font-extrabold text-navy-950 focus:border-blue-500">
                    </div>
                    <div>
                        <label class="block text-[10px] font-bold text-emerald-900 uppercase tracking-wider mb-1">Amount Received (₹) *</label>
                        <input type="number" id="pms-edit-received" name="amountReceived" value="${payment.amountReceived}" required min="0" step="any" oninput="window.DisicureMain.calcEditPaymentPending()" class="w-full bg-white border border-gray-200 rounded p-2 text-xs font-extrabold text-emerald-600 focus:border-blue-500">
                    </div>
                    <div>
                        <label class="block text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-1">Pending Amount (₹)</label>
                        <input type="text" id="pms-edit-pending-display" readonly value="₹${Number(payment.pendingAmount).toLocaleString('en-IN')}" class="w-full bg-gray-100 border border-gray-200 rounded p-2 text-xs font-extrabold text-amber-700 cursor-not-allowed">
                    </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                        <label class="block text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-1">Payment Date *</label>
                        <input type="date" name="paymentDate" value="${payment.paymentDate}" required class="w-full bg-white border border-gray-200 rounded p-2.5 text-xs focus:border-blue-500">
                    </div>
                    <div>
                        <label class="block text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-1">Payment Mode *</label>
                        <select name="paymentMode" class="w-full bg-white border border-gray-200 rounded p-2.5 text-xs font-medium focus:border-blue-500">
                            ${window.DisicurePayments.PAYMENT_MODES.map(m => `
                                <option value="${m}" ${m === payment.paymentMode ? 'selected' : ''}>${m}</option>
                            `).join('')}
                        </select>
                    </div>
                    <div>
                        <label class="block text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-1">Payment Status *</label>
                        <select id="pms-edit-status" name="paymentStatus" class="w-full bg-white border border-gray-200 rounded p-2.5 text-xs font-bold focus:border-blue-500">
                            ${window.DisicurePayments.STATUSES.map(s => `
                                <option value="${s.label}" ${s.label === payment.paymentStatus ? 'selected' : ''}>${s.label}</option>
                            `).join('')}
                        </select>
                    </div>
                </div>

                <!-- Proof Document -->
                <div>
                    <label class="block text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-1">Payment Proof / Document</label>
                    <div class="flex items-center gap-3">
                        <input type="file" id="pms-edit-proof-file" accept="image/*,.pdf,.doc,.docx" onchange="window.DisicureMain.handleProofUpload(event, 'pms-edit-proof-name')" class="text-xs text-gray-500 file:mr-3 file:py-2 file:px-4 file:rounded file:border-0 file:text-xs file:font-bold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer">
                        <input type="text" id="pms-edit-proof-name" name="proofDocument" value="${payment.proofDocument || 'proof_receipt.pdf'}" class="flex-1 bg-white border border-gray-200 rounded p-2 text-xs font-mono text-gray-600">
                    </div>
                </div>

                <div>
                    <label class="block text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-1">Payment Notes & Batch Reference</label>
                    <textarea name="notes" rows="3" class="w-full bg-white border border-gray-200 rounded p-2.5 text-xs focus:border-blue-500 font-normal">${payment.notes || ''}</textarea>
                </div>

                <div class="flex items-center justify-between pt-4 border-t border-gray-100">
                    <button type="button" onclick="window.DisicureMain.deletePayment('${payment.paymentId}')" class="px-4 py-2.5 bg-rose-50 text-rose-700 hover:bg-rose-600 hover:text-white text-xs font-bold rounded transition-colors">
                        Delete Record
                    </button>
                    <div class="flex gap-3">
                        <button type="button" onclick="window.DisicureMain.closePaymentDrawer()" class="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded transition-colors">
                            Cancel
                        </button>
                        <button type="submit" class="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded shadow transition-colors">
                            Save Changes
                        </button>
                    </div>
                </div>
            </form>
        </div>
        `;

        drawer.classList.remove('hidden');
        drawer.classList.add('flex');
        document.body.classList.add('overflow-hidden');
    },

    closePaymentDrawer: function() {
        const drawer = document.getElementById('pms-edit-drawer');
        if (drawer) {
            drawer.classList.remove('flex');
            drawer.classList.add('hidden');
            document.body.classList.remove('overflow-hidden');
        }
    },

    savePaymentEdit: function(event, paymentId) {
        event.preventDefault();
        const form = document.getElementById('pms-edit-payment-form');
        if (!form) return;

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        window.DisicurePayments.updatePayment(paymentId, data);
        this.closePaymentDrawer();
        this.renderPaymentsTable();
        this.renderDashboardAnalytics();
    },

    deletePayment: function(paymentId) {
        if (confirm(`Are you sure you want to delete payment record ${paymentId}?`)) {
            window.DisicurePayments.deletePayment(paymentId);
            this.closePaymentDrawer();
            this.renderPaymentsTable();
            this.renderDashboardAnalytics();
        }
    },

    changePaymentStatusQuick: function(paymentId, newStatus) {
        if (!window.DisicurePayments) return;
        window.DisicurePayments.updateStatus(paymentId, newStatus);
        this.renderPaymentsTable();
        this.renderDashboardAnalytics();
    },

    // Proof Document Modal
    openProofModal: function(title, filename) {
        const modal = document.getElementById('pms-proof-modal');
        const titleEl = document.getElementById('pms-proof-title');
        const fileEl = document.getElementById('pms-proof-filename');

        if (titleEl) titleEl.innerText = title;
        if (fileEl) fileEl.innerText = filename;

        if (modal) {
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            document.body.classList.add('overflow-hidden');
        }
    },

    closeProofModal: function() {
        const modal = document.getElementById('pms-proof-modal');
        if (modal) {
            modal.classList.remove('flex');
            modal.classList.add('hidden');
            document.body.classList.remove('overflow-hidden');
        }
    },

    exportPaymentsCSV: function() {
        if (window.DisicurePayments) {
            window.DisicurePayments.exportToCSV();
        }
    },

    // =========================================================================
    // --- 13. DOCUMENT & EXCEL MANAGEMENT SYSTEM (DMS) CONTROLLER METHODS ---
    // =========================================================================
    renderDocumentsTable: function() {
        if (!window.DisicureDocuments) return;
        const allDocs = window.DisicureDocuments.getAllDocuments();
        const summary = window.DisicureDocuments.getSummary();

        // Update Summary KPI Cards
        const setElText = (id, val) => {
            const el = document.getElementById(id);
            if (el) el.innerText = val;
        };

        setElText('dms-total-docs', summary.totalDocs);
        setElText('dms-total-excel', summary.countExcel);
        setElText('dms-total-pdf', summary.countPdf);
        setElText('dms-total-other', summary.countWord + summary.countImages + summary.countProducts + summary.countInvoices);

        // Render Category Filter Pills
        this.renderDocCategoryPills(allDocs);

        // Filter Documents
        const query = this.dmsState.searchQuery;
        let filtered = allDocs.filter(doc => {
            const matchesQuery = !query ||
                (doc.title && doc.title.toLowerCase().includes(query)) ||
                (doc.category && doc.category.toLowerCase().includes(query)) ||
                (doc.tags && doc.tags.toLowerCase().includes(query)) ||
                (doc.notes && doc.notes.toLowerCase().includes(query));

            const matchesCategory = this.dmsState.categoryFilter === 'all' || doc.category === this.dmsState.categoryFilter;

            return matchesQuery && matchesCategory;
        });

        // Date-wise and Name Sorting
        if (this.dmsState.sortBy === 'newest') {
            filtered.sort((a, b) => new Date(b.uploadDate || 0) - new Date(a.uploadDate || 0));
        } else if (this.dmsState.sortBy === 'oldest') {
            filtered.sort((a, b) => new Date(a.uploadDate || 0) - new Date(b.uploadDate || 0));
        } else if (this.dmsState.sortBy === 'name-asc') {
            filtered.sort((a, b) => (a.title || '').localeCompare(b.title || ''));
        } else if (this.dmsState.sortBy === 'name-desc') {
            filtered.sort((a, b) => (b.title || '').localeCompare(a.title || ''));
        }

        const tbody = document.getElementById('dms-docs-tbody');
        const emptyState = document.getElementById('dms-empty-state');
        const countDisplay = document.getElementById('dms-showing-count');

        if (countDisplay) {
            countDisplay.innerText = `Showing ${filtered.length} of ${allDocs.length} Business Documents`;
        }

        if (!tbody) return;

        if (filtered.length === 0) {
            tbody.innerHTML = '';
            if (emptyState) emptyState.classList.remove('hidden');
            return;
        }

        if (emptyState) emptyState.classList.add('hidden');

        // File Format Badge Style Helper
        const getFormatBadge = (type) => {
            const ext = (type || 'file').toLowerCase();
            if (ext.includes('xls') || ext.includes('csv')) {
                return '<span class="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded text-[10px] font-extrabold uppercase tracking-wider">XLSX</span>';
            } else if (ext.includes('pdf')) {
                return '<span class="px-2 py-0.5 bg-rose-100 text-rose-800 rounded text-[10px] font-extrabold uppercase tracking-wider">PDF</span>';
            } else if (ext.includes('doc')) {
                return '<span class="px-2 py-0.5 bg-blue-100 text-blue-800 rounded text-[10px] font-extrabold uppercase tracking-wider">DOCX</span>';
            } else if (ext.includes('png') || ext.includes('jpg') || ext.includes('jpeg')) {
                return '<span class="px-2 py-0.5 bg-purple-100 text-purple-800 rounded text-[10px] font-extrabold uppercase tracking-wider">IMG</span>';
            }
            return '<span class="px-2 py-0.5 bg-gray-100 text-gray-800 rounded text-[10px] font-extrabold uppercase tracking-wider">DOC</span>';
        };

        let rowsHtml = '';
        filtered.forEach(doc => {
            rowsHtml += `
            <tr class="border-b border-gray-100 hover:bg-blue-50/30 transition-colors text-xs">
                <!-- Title & Format -->
                <td class="p-3.5">
                    <div class="flex items-center gap-2.5">
                        ${getFormatBadge(doc.fileType)}
                        <div>
                            <button onclick="window.DisicureMain.openPreviewDocModal('${doc.docId}')" class="font-extrabold text-navy-950 hover:text-blue-600 transition-colors text-left block text-sm">
                                ${doc.title}
                            </button>
                            <span class="text-[10px] text-gray-400 font-mono block mt-0.5">${doc.docId}</span>
                        </div>
                    </div>
                </td>

                <!-- Category -->
                <td class="p-3.5 whitespace-nowrap">
                    <span class="inline-block px-2.5 py-1 bg-slate-100 text-slate-700 rounded text-[11px] font-bold">
                        ${doc.category}
                    </span>
                </td>

                <!-- File Size -->
                <td class="p-3.5 whitespace-nowrap font-mono text-gray-600 font-medium">
                    ${doc.fileSize}
                </td>

                <!-- Upload Date -->
                <td class="p-3.5 whitespace-nowrap text-gray-600 font-medium">
                    ${doc.uploadDate}
                </td>

                <!-- Tags / Description -->
                <td class="p-3.5 max-w-xs">
                    <div class="text-[11px] text-blue-700 font-medium line-clamp-1">${doc.tags}</div>
                    <div class="text-[10px] text-gray-400 font-normal line-clamp-1 mt-0.5">${doc.notes || 'Business Document'}</div>
                </td>

                <!-- Actions -->
                <td class="p-3.5 whitespace-nowrap text-right">
                    <div class="flex items-center justify-end gap-1.5">
                        <!-- Preview -->
                        <button onclick="window.DisicureMain.openPreviewDocModal('${doc.docId}')" class="p-1.5 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white rounded-md transition-colors" title="Preview Document">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                        </button>

                        <!-- Download -->
                        <button onclick="window.DisicureMain.downloadDoc('${doc.docId}')" class="p-1.5 bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white rounded-md transition-colors" title="Download Document">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
                        </button>

                        <!-- Rename -->
                        <button onclick="window.DisicureMain.openRenameDocModal('${doc.docId}')" class="p-1.5 bg-amber-50 text-amber-700 hover:bg-amber-600 hover:text-white rounded-md transition-colors" title="Rename / Edit Tags">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                        </button>

                        <!-- Delete -->
                        <button onclick="window.DisicureMain.deleteDoc('${doc.docId}')" class="p-1.5 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white rounded-md transition-colors" title="Delete Document">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                        </button>
                    </div>
                </td>
            </tr>
            `;
        });

        tbody.innerHTML = rowsHtml;
    },

    renderDocCategoryPills: function(docs) {
        const container = document.getElementById('dms-category-pills');
        if (!container || !window.DisicureDocuments) return;

        const cats = window.DisicureDocuments.CATEGORIES;
        let pillsHtml = '';

        cats.forEach(cat => {
            const isAll = cat.id === 'all';
            const count = isAll ? docs.length : docs.filter(d => d.category.includes(cat.label.replace(/^[^\s]+\s/, ''))).length;
            const isActive = (isAll && this.dmsState.categoryFilter === 'all') || (!isAll && this.dmsState.categoryFilter.includes(cat.label.replace(/^[^\s]+\s/, '')));

            pillsHtml += `
                <button onclick="window.DisicureMain.filterDocCategory('${isAll ? 'all' : cat.label}')" class="px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${isActive ? 'bg-blue-600 text-white shadow-sm' : 'bg-slate-100 hover:bg-slate-200 text-gray-700'}">
                    <span>${cat.label}</span>
                    <span class="text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? 'bg-white/20 text-white' : 'bg-white text-gray-600 border border-gray-200'}">${count}</span>
                </button>
            `;
        });

        container.innerHTML = pillsHtml;
    },

    filterDocCategory: function(catLabel) {
        this.dmsState.categoryFilter = catLabel;
        const select = document.getElementById('dms-category-select');
        if (select) {
            select.value = catLabel;
        }
        this.renderDocumentsTable();
    },

    openUploadDocModal: function() {
        const modal = document.getElementById('dms-upload-modal');
        if (modal) {
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            document.body.classList.add('overflow-hidden');
        }
    },

    closeUploadDocModal: function() {
        const modal = document.getElementById('dms-upload-modal');
        if (modal) {
            modal.classList.remove('flex');
            modal.classList.add('hidden');
            document.body.classList.remove('overflow-hidden');
            const form = document.getElementById('dms-upload-form');
            if (form) form.reset();
            const fnLabel = document.getElementById('dms-selected-filename');
            if (fnLabel) fnLabel.innerText = 'Click to Select Excel, PDF, Word, Image, or Contract';
        }
    },

    handleDocFileSelected: function(event) {
        const file = event.target.files[0];
        if (!file) return;

        const fnLabel = document.getElementById('dms-selected-filename');
        const fsLabel = document.getElementById('dms-selected-filesize');
        const titleInput = document.getElementById('dms-doc-title');
        const catSelect = document.getElementById('dms-doc-category');
        const sizeHidden = document.getElementById('dms-doc-filesize');
        const typeHidden = document.getElementById('dms-doc-filetype');
        const dataHidden = document.getElementById('dms-doc-filedata');

        if (fnLabel) fnLabel.innerText = file.name;

        const sizeFormatted = file.size > 1024 * 1024 ? (file.size / (1024 * 1024)).toFixed(1) + ' MB' : (file.size / 1024).toFixed(0) + ' KB';
        if (fsLabel) fsLabel.innerText = `File Size: ${sizeFormatted}`;
        if (sizeHidden) sizeHidden.value = sizeFormatted;

        const ext = (file.name.split('.').pop() || '').toLowerCase();
        if (typeHidden) typeHidden.value = ext;

        if (titleInput && !titleInput.value) {
            titleInput.value = file.name;
        }

        // Auto categorizer
        if (catSelect) {
            if (['xlsx', 'xls', 'csv'].includes(ext)) catSelect.value = '📊 Excel & Spreadsheets';
            else if (['pdf'].includes(ext)) catSelect.value = '📄 PDF Documents';
            else if (['docx', 'doc', 'rtf'].includes(ext)) catSelect.value = '📝 Word Documents';
            else if (['png', 'jpg', 'jpeg', 'webp', 'svg'].includes(ext)) catSelect.value = '🖼️ Images & Visuals';
        }

        // Read File as Data URL for download & preview
        const reader = new FileReader();
        reader.onload = function(e) {
            if (dataHidden) {
                dataHidden.value = e.target.result;
            }
        };
        reader.readAsDataURL(file);
    },

    saveNewDocument: function(event) {
        event.preventDefault();
        const form = document.getElementById('dms-upload-form');
        if (!form) return;

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        const ext = (data.title.split('.').pop() || 'file').toLowerCase();
        let previewType = 'text';
        if (['png', 'jpg', 'jpeg', 'webp', 'svg'].includes(ext)) {
            previewType = 'image';
        } else if (['xlsx', 'xls', 'csv'].includes(ext)) {
            previewType = 'table';
        } else if (['pdf'].includes(ext)) {
            previewType = 'pdf_summary';
        }

        window.DisicureDocuments.addDocument({
            ...data,
            previewType: previewType,
            previewUrl: data.fileData || null,
            previewContent: `Document Title: ${data.title}\nCategory: ${data.category}\nTags: ${data.tags || 'General'}\nNotes: ${data.notes || 'Recorded via Disicure DMS.'}`
        });

        this.closeUploadDocModal();
        this.renderDocumentsTable();
    },

    openRenameDocModal: function(docId) {
        const docs = window.DisicureDocuments.getAllDocuments();
        const doc = docs.find(d => d.docId === docId);
        if (!doc) return;

        const modal = document.getElementById('dms-rename-modal');
        const idInput = document.getElementById('dms-rename-doc-id');
        const titleInput = document.getElementById('dms-rename-title');
        const catSelect = document.getElementById('dms-rename-category');
        const tagsInput = document.getElementById('dms-rename-tags');
        const notesInput = document.getElementById('dms-rename-notes');

        if (idInput) idInput.value = doc.docId;
        if (titleInput) titleInput.value = doc.title;
        if (catSelect) catSelect.value = doc.category;
        if (tagsInput) tagsInput.value = doc.tags || '';
        if (notesInput) notesInput.value = doc.notes || '';

        if (modal) {
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            document.body.classList.add('overflow-hidden');
        }
    },

    closeRenameDocModal: function() {
        const modal = document.getElementById('dms-rename-modal');
        if (modal) {
            modal.classList.remove('flex');
            modal.classList.add('hidden');
            document.body.classList.remove('overflow-hidden');
        }
    },

    saveRenameDoc: function(event) {
        event.preventDefault();
        const form = document.getElementById('dms-rename-form');
        if (!form) return;

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        window.DisicureDocuments.updateDocument(data.docId, {
            title: data.title,
            category: data.category,
            tags: data.tags,
            notes: data.notes
        });

        this.closeRenameDocModal();
        this.renderDocumentsTable();
    },

    deleteDoc: function(docId) {
        if (confirm(`Are you sure you want to delete document ${docId}?`)) {
            window.DisicureDocuments.deleteDocument(docId);
            this.renderDocumentsTable();
        }
    },

    downloadDoc: function(docId) {
        if (window.DisicureDocuments) {
            window.DisicureDocuments.downloadDocument(docId);
        }
    },

    openPreviewDocModal: function(docId) {
        const docs = window.DisicureDocuments.getAllDocuments();
        const doc = docs.find(d => d.docId === docId);
        if (!doc) return;

        const modal = document.getElementById('dms-preview-modal');
        const badgeEl = document.getElementById('dms-preview-badge');
        const titleEl = document.getElementById('dms-preview-title');
        const metaEl = document.getElementById('dms-preview-meta');
        const bodyEl = document.getElementById('dms-preview-body');
        const dlBtn = document.getElementById('dms-preview-download-btn');

        if (badgeEl) badgeEl.innerText = (doc.fileType || 'DOC').toUpperCase();
        if (titleEl) titleEl.innerText = doc.title;
        if (metaEl) metaEl.innerText = `${doc.category} • ${doc.fileSize} • Uploaded ${doc.uploadDate}`;
        if (dlBtn) dlBtn.onclick = () => this.downloadDoc(doc.docId);

        if (!bodyEl) return;

        // Render preview according to document type
        if (doc.previewType === 'table' && doc.previewData) {
            // Interactive Spreadsheet Table Preview
            let tableHtml = `
                <div class="space-y-3">
                    <div class="flex items-center justify-between pb-2 border-b border-gray-200">
                        <span class="text-xs font-bold text-emerald-800 flex items-center gap-1.5">
                            <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
                            Excel / Spreadsheet Data Grid Preview (${doc.previewData.length - 1} Records)
                        </span>
                        <span class="text-[11px] text-gray-400">Live Structured View</span>
                    </div>
                    <div class="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
                        <table class="w-full text-left text-xs border-collapse">
                            <thead>
                                <tr class="bg-slate-100 border-b border-gray-200 text-[11px] font-extrabold text-navy-950">
                                    ${doc.previewData[0].map(h => `<th class="p-3 border-r border-gray-200">${h}</th>`).join('')}
                                </tr>
                            </thead>
                            <tbody>
                                ${doc.previewData.slice(1).map(row => `
                                    <tr class="border-b border-gray-100 hover:bg-emerald-50/20">
                                        ${row.map(cell => `<td class="p-3 border-r border-gray-100 font-medium text-gray-700">${cell}</td>`).join('')}
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            `;
            bodyEl.innerHTML = tableHtml;
        } else if (doc.previewType === 'image' || (doc.fileData && doc.fileData.startsWith('data:image')) || doc.previewUrl) {
            // Image Preview
            const imgSrc = doc.previewUrl || doc.fileData || 'images/service_07_pkg.jpg';
            bodyEl.innerHTML = `
                <div class="flex flex-col items-center justify-center p-4">
                    <img src="${imgSrc}" alt="${doc.title}" class="max-h-[500px] w-auto object-contain rounded-lg shadow-md border border-gray-200">
                    <p class="text-xs text-gray-500 mt-3 font-mono">${doc.title} (${doc.fileSize})</p>
                </div>
            `;
        } else if (doc.previewType === 'pdf_summary' || doc.category.includes('PDF')) {
            // PDF Document Reader
            bodyEl.innerHTML = `
                <div class="space-y-4 max-w-2xl mx-auto bg-white p-6 rounded-xl border border-gray-200 shadow-sm text-xs">
                    <div class="flex items-center justify-between border-b border-gray-100 pb-3">
                        <div class="flex items-center gap-2">
                            <span class="w-3 h-3 rounded-full bg-rose-500"></span>
                            <span class="font-extrabold text-navy-950 uppercase tracking-wider">PDF Document Preview</span>
                        </div>
                        <span class="font-mono text-gray-400 text-[11px]">Disicure Vault Certified</span>
                    </div>
                    <div class="bg-rose-50/40 p-4 rounded-lg border border-rose-100">
                        <h4 class="font-extrabold text-rose-950 text-sm mb-1">${doc.title}</h4>
                        <p class="text-gray-600 font-normal leading-relaxed whitespace-pre-line">${doc.previewContent || doc.notes || 'PDF Document archived in Disicure Enterprise Vault.'}</p>
                    </div>
                    <div class="grid grid-cols-2 gap-3 pt-2 text-[11px] text-gray-500">
                        <div><strong class="text-gray-700">Classification:</strong> ${doc.category}</div>
                        <div><strong class="text-gray-700">File Size:</strong> ${doc.fileSize}</div>
                        <div><strong class="text-gray-700">Search Tags:</strong> ${doc.tags}</div>
                        <div><strong class="text-gray-700">Archived Date:</strong> ${doc.uploadDate}</div>
                    </div>
                </div>
            `;
        } else {
            // Formatted Text / Word Document View
            bodyEl.innerHTML = `
                <div class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm max-w-2xl mx-auto space-y-4 text-xs">
                    <div class="flex items-center justify-between border-b border-gray-100 pb-3">
                        <span class="font-extrabold text-navy-950 uppercase tracking-wider">Word Document Content</span>
                        <span class="font-mono text-gray-400 text-[11px]">${doc.fileType.toUpperCase()} Format</span>
                    </div>
                    <div class="bg-slate-50 p-4 rounded-lg border border-gray-100 font-mono text-gray-700 leading-relaxed whitespace-pre-line">
                        ${doc.previewContent || doc.notes || 'Document content archived.'}
                    </div>
                </div>
            `;
        }

        if (modal) {
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            document.body.classList.add('overflow-hidden');
        }
    },

    closePreviewDocModal: function() {
        const modal = document.getElementById('dms-preview-modal');
        if (modal) {
            modal.classList.remove('flex');
            modal.classList.add('hidden');
            document.body.classList.remove('overflow-hidden');
        }
    },

    // =========================================================================
    // --- 14. TEAM MANAGEMENT & RBAC GOVERNANCE (TMS) CONTROLLER METHODS ---
    // =========================================================================
    renderTeamTable: function() {
        if (!window.DisicureTeam) return;
        const allMembers = window.DisicureTeam.getAllMembers();
        const summary = window.DisicureTeam.getSummary();

        // Update Summary KPI Cards
        const setElText = (id, val) => {
            const el = document.getElementById(id);
            if (el) el.innerText = val;
        };

        setElText('tms-total-members', summary.totalMembers);
        setElText('tms-total-admins', (summary.countSuperAdmin + summary.countAdmin));
        setElText('tms-total-sales', summary.countSales);
        setElText('tms-total-partners', summary.countPartner);

        // Render Role Pills
        this.renderTeamRolePills(summary);

        // Filter Team Members
        const query = this.tmsState.searchQuery;
        let filtered = allMembers.filter(m => {
            const matchesQuery = !query ||
                (m.name && m.name.toLowerCase().includes(query)) ||
                (m.email && m.email.toLowerCase().includes(query)) ||
                (m.mobile && m.mobile.toLowerCase().includes(query)) ||
                (m.username && m.username.toLowerCase().includes(query)) ||
                (m.dept && m.dept.toLowerCase().includes(query)) ||
                (m.designation && m.designation.toLowerCase().includes(query)) ||
                (m.role && m.role.toLowerCase().includes(query));

            const matchesRole = this.tmsState.roleFilter === 'all' || m.role.includes(this.tmsState.roleFilter);

            return matchesQuery && matchesRole;
        });

        const tbody = document.getElementById('tms-team-tbody');
        const emptyState = document.getElementById('tms-empty-state');
        const countDisplay = document.getElementById('tms-showing-count');

        if (countDisplay) {
            countDisplay.innerText = `Showing ${filtered.length} of ${allMembers.length} Team Members`;
        }

        if (!tbody) return;

        if (filtered.length === 0) {
            tbody.innerHTML = '';
            if (emptyState) emptyState.classList.remove('hidden');
            return;
        }

        if (emptyState) emptyState.classList.add('hidden');

        let rowsHtml = '';
        filtered.forEach(m => {
            const roleBadgeClass = m.role.includes('Super Admin') ? 'bg-amber-100 text-amber-900 border-amber-300' :
                                   m.role.includes('Admin') ? 'bg-blue-100 text-blue-900 border-blue-300' :
                                   m.role.includes('Sales') ? 'bg-emerald-100 text-emerald-900 border-emerald-300' :
                                   m.role.includes('Partner') ? 'bg-purple-100 text-purple-900 border-purple-300' :
                                   'bg-indigo-100 text-indigo-900 border-indigo-300';

            const statusBadgeClass = m.accountStatus && m.accountStatus.includes('Active') ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                                     m.accountStatus && m.accountStatus.includes('Leave') ? 'bg-amber-50 text-amber-700 border-amber-200' :
                                     'bg-rose-50 text-rose-700 border-rose-200';

            rowsHtml += `
            <tr class="border-b border-gray-100 hover:bg-indigo-50/20 transition-colors text-xs">
                <!-- Member Profile / Name -->
                <td class="p-3.5">
                    <div class="flex items-center gap-3">
                        <div class="w-9 h-9 rounded-full ${m.avatarBg || 'bg-blue-600'} text-white font-extrabold flex items-center justify-center text-sm shadow-sm shrink-0">
                            ${m.avatar || m.name.charAt(0)}
                        </div>
                        <div>
                            <button onclick="window.DisicureMain.openTeamMemberDrawer('${m.memberId}')" class="font-extrabold text-navy-950 hover:text-blue-600 text-left transition-colors">
                                ${m.name}
                            </button>
                            <span class="text-[11px] text-gray-500 block font-normal">${m.designation || 'Specialist'} • <span class="text-gray-400 font-mono">${m.memberId}</span></span>
                        </div>
                    </div>
                </td>

                <!-- Role Badge -->
                <td class="p-3.5 whitespace-nowrap">
                    <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold border ${roleBadgeClass}">
                        ${m.role}
                    </span>
                    <span class="text-[10px] text-gray-400 block mt-1">${m.dept}</span>
                </td>

                <!-- Contact Details -->
                <td class="p-3.5 whitespace-nowrap">
                    <a href="tel:${m.mobile}" class="font-mono text-gray-700 hover:text-blue-600 block">${m.mobile}</a>
                    <a href="mailto:${m.email}" class="text-[11px] text-gray-500 hover:underline block">${m.email}</a>
                </td>

                <!-- Portal Credentials -->
                <td class="p-3.5 whitespace-nowrap font-mono text-xs">
                    <div class="flex items-center gap-1.5 text-navy-950 font-bold">
                        <svg class="w-3.5 h-3.5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                        <span>${m.username}</span>
                    </div>
                    <span class="text-[10px] text-gray-400 block mt-0.5">Hash: ${m.passwordHash || '••••••••'}</span>
                </td>

                <!-- Assigned Leads & Pipeline -->
                <td class="p-3.5 whitespace-nowrap">
                    <div class="flex items-center gap-2">
                        <span class="font-extrabold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100 text-xs">${m.assignedLeadsCount || 0} Leads</span>
                    </div>
                    <div class="text-[10px] text-gray-400 mt-1 flex items-center gap-1">
                        <span>Win: <strong>${m.performance ? m.performance.winRate : 75}%</strong></span>
                        <span>•</span>
                        <span>Rev: <strong>${m.performance ? m.performance.revenueGenerated : '₹0'}</strong></span>
                    </div>
                </td>

                <!-- Account Status -->
                <td class="p-3.5 whitespace-nowrap">
                    <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${statusBadgeClass}">
                        ${m.accountStatus || '🟢 Active'}
                    </span>
                    <span class="text-[10px] text-gray-400 block mt-0.5">Last: ${m.lastLoginDate ? m.lastLoginDate.split(' ')[0] : 'Today'}</span>
                </td>

                <!-- Actions -->
                <td class="p-3.5 whitespace-nowrap text-right">
                    <div class="flex items-center justify-end gap-1.5">
                        <!-- View Profile Drawer -->
                        <button onclick="window.DisicureMain.openTeamMemberDrawer('${m.memberId}')" class="p-1.5 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white rounded-md transition-colors" title="View Full Profile & Activity Audit">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                        </button>
                        
                        <!-- Edit Profile Modal -->
                        <button onclick="window.DisicureMain.openEditTeamModal('${m.memberId}')" class="p-1.5 bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white rounded-md transition-colors" title="Edit Role & Permissions">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                        </button>

                        <!-- Delete Member -->
                        <button onclick="window.DisicureMain.deleteTeamMember('${m.memberId}')" class="p-1.5 bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white rounded-md transition-colors" title="Delete Account">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                        </button>
                    </div>
                </td>
            </tr>
            `;
        });

        tbody.innerHTML = rowsHtml;
    },

    renderTeamRolePills: function(summary) {
        const container = document.getElementById('tms-role-pills');
        if (!container) return;

        const roles = [
            { key: 'all', label: 'All Roles', count: summary ? summary.totalMembers : 0, icon: '👥' },
            { key: 'Super Admin', label: 'Super Admins', count: summary ? summary.countSuperAdmin : 0, icon: '👑' },
            { key: 'Admin', label: 'Admins', count: summary ? summary.countAdmin : 0, icon: '🧑‍💼' },
            { key: 'Sales', label: 'Sales Execs', count: summary ? summary.countSales : 0, icon: '📞' },
            { key: 'Team Member', label: 'Team Members', count: summary ? summary.countTeam : 0, icon: '👨‍💻' },
            { key: 'Partner', label: 'Partners', count: summary ? summary.countPartner : 0, icon: '🤝' }
        ];

        let html = '';
        roles.forEach(r => {
            const isActive = (r.key === 'all' && this.tmsState.roleFilter === 'all') || (r.key !== 'all' && this.tmsState.roleFilter === r.key);
            const activeClass = isActive 
                ? 'bg-indigo-600 text-white shadow-sm font-extrabold border-indigo-600' 
                : 'bg-white text-gray-700 hover:bg-indigo-50 border-gray-200 font-medium';

            html += `
                <button onclick="window.DisicureMain.filterTeamRole('${r.key}')" class="px-3.5 py-1.5 rounded-lg border text-xs whitespace-nowrap transition-all duration-200 flex items-center gap-1.5 ${activeClass}">
                    <span>${r.icon}</span>
                    <span>${r.label}</span>
                    <span class="text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? 'bg-indigo-700 text-indigo-100' : 'bg-gray-100 text-gray-600'} font-bold">${r.count}</span>
                </button>
            `;
        });

        container.innerHTML = html;
    },

    filterTeamRole: function(roleKey) {
        this.tmsState.roleFilter = roleKey;
        const select = document.getElementById('tms-role-select');
        if (select) {
            select.value = roleKey;
        }
        this.renderTeamTable();
    },

    openAddTeamModal: function() {
        const modal = document.getElementById('tms-add-modal');
        if (modal) {
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            document.body.classList.add('overflow-hidden');
        }
    },

    closeAddTeamModal: function() {
        const modal = document.getElementById('tms-add-modal');
        if (modal) {
            modal.classList.remove('flex');
            modal.classList.add('hidden');
            document.body.classList.remove('overflow-hidden');
            const form = document.getElementById('tms-new-member-form');
            if (form) form.reset();
        }
    },

    saveNewTeamMember: function(event) {
        event.preventDefault();
        const form = document.getElementById('tms-new-member-form');
        if (!form || !window.DisicureTeam) return;

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        window.DisicureTeam.addMember({
            name: data.name,
            role: data.role,
            dept: data.dept,
            designation: data.designation,
            mobile: data.mobile,
            email: data.email,
            username: data.username,
            accountStatus: data.accountStatus,
            assignedLeadsCount: parseInt(data.assignedLeadsCount) || 0
        });

        this.closeAddTeamModal();
        this.renderTeamTable();
    },

    openTeamMemberDrawer: function(memberId) {
        if (!window.DisicureTeam) return;
        const members = window.DisicureTeam.getAllMembers();
        const member = members.find(m => m.memberId === memberId);
        if (!member) return;

        const drawer = document.getElementById('tms-profile-drawer');
        const container = document.getElementById('tms-drawer-content');
        if (!drawer || !container) return;

        const roleBadgeClass = member.role.includes('Super Admin') ? 'bg-amber-100 text-amber-900 border-amber-300' :
                               member.role.includes('Admin') ? 'bg-blue-100 text-blue-900 border-blue-300' :
                               member.role.includes('Sales') ? 'bg-emerald-100 text-emerald-900 border-emerald-300' :
                               member.role.includes('Partner') ? 'bg-purple-100 text-purple-900 border-purple-300' :
                               'bg-indigo-100 text-indigo-900 border-indigo-300';

        const historyHtml = (member.activityHistory && member.activityHistory.length > 0)
            ? member.activityHistory.map(act => `
                <div class="relative pl-6 pb-4 border-l-2 border-indigo-200 last:border-l-0 last:pb-0">
                    <span class="absolute -left-1.5 top-0 w-3 h-3 rounded-full bg-indigo-600 ring-4 ring-indigo-50"></span>
                    <div class="flex items-center justify-between text-[11px] mb-0.5">
                        <strong class="text-navy-950 font-extrabold">${act.action}</strong>
                        <span class="text-gray-400 font-mono text-[10px]">${act.date}</span>
                    </div>
                    <p class="text-xs text-gray-600 font-normal leading-relaxed">${act.detail}</p>
                </div>
            `).join('')
            : '<p class="text-xs text-gray-400 font-normal">No activity logs recorded yet.</p>';

        container.innerHTML = `
        <div class="space-y-6">
            <!-- Header Card with Profile -->
            <div class="flex items-start justify-between border-b border-gray-100 pb-5">
                <div class="flex items-center gap-4">
                    <div class="w-14 h-14 rounded-2xl ${member.avatarBg || 'bg-blue-600'} text-white font-extrabold text-2xl flex items-center justify-center shadow-md">
                        ${member.avatar || member.name.charAt(0)}
                    </div>
                    <div>
                        <div class="flex items-center gap-2">
                            <h3 class="text-xl font-extrabold text-navy-950">${member.name}</h3>
                            <span class="text-xs px-2.5 py-0.5 rounded-full font-bold border ${roleBadgeClass}">${member.role}</span>
                        </div>
                        <p class="text-xs text-gray-500 mt-0.5 font-medium">${member.designation || 'Corporate Specialist'} • <span class="text-indigo-600 font-bold">${member.dept}</span></p>
                        <span class="text-[11px] text-gray-400 font-mono">Member ID: ${member.memberId}</span>
                    </div>
                </div>
                <div class="text-right">
                    <span class="inline-block px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 mb-1">
                        ${member.accountStatus || '🟢 Active'}
                    </span>
                    <span class="text-[10px] text-gray-400 block font-mono">Joined: ${member.createdDate ? member.createdDate.split(' ')[0] : '2026-01-10'}</span>
                </div>
            </div>

            <!-- Credentials & Quick Info Grid -->
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-50 p-4 rounded-xl border border-gray-200 text-xs">
                <div>
                    <span class="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Official Mobile</span>
                    <span class="font-extrabold text-navy-950 font-mono">${member.mobile}</span>
                </div>
                <div>
                    <span class="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Official Email</span>
                    <span class="font-medium text-navy-950 truncate block">${member.email}</span>
                </div>
                <div>
                    <span class="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Portal Username</span>
                    <span class="font-extrabold text-indigo-700 font-mono">${member.username}</span>
                </div>
            </div>

            <!-- Performance & Pipeline Metrics Grid -->
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div class="p-3 bg-blue-50/50 rounded-xl border border-blue-100">
                    <span class="text-[10px] font-bold text-blue-900 uppercase tracking-wider block">Assigned Leads</span>
                    <span class="text-xl font-extrabold text-blue-700">${member.assignedLeadsCount || 0}</span>
                </div>
                <div class="p-3 bg-emerald-50/50 rounded-xl border border-emerald-100">
                    <span class="text-[10px] font-bold text-emerald-900 uppercase tracking-wider block">Win / Conversion</span>
                    <span class="text-xl font-extrabold text-emerald-700">${member.performance ? member.performance.winRate : 75}%</span>
                </div>
                <div class="p-3 bg-indigo-50/50 rounded-xl border border-indigo-100">
                    <span class="text-[10px] font-bold text-indigo-900 uppercase tracking-wider block">Revenue Won</span>
                    <span class="text-base font-extrabold text-indigo-900 mt-1 block">${member.performance ? member.performance.revenueGenerated : '₹0'}</span>
                </div>
                <div class="p-3 bg-amber-50/50 rounded-xl border border-amber-100">
                    <span class="text-[10px] font-bold text-amber-900 uppercase tracking-wider block">Batches Handled</span>
                    <span class="text-xl font-extrabold text-amber-800">${member.performance ? member.performance.completedBatches : 0}</span>
                </div>
            </div>

            <!-- Activity Audit Trail Timeline -->
            <div class="space-y-3 bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                <div class="flex items-center justify-between border-b border-gray-100 pb-3">
                    <h4 class="text-xs font-extrabold text-navy-950 uppercase tracking-wider flex items-center gap-2">
                        <span>📜 Activity History & Audit Trail</span>
                    </h4>
                    <span class="text-[10px] text-gray-400">Enterprise Compliance Log</span>
                </div>
                <div class="space-y-2 pt-2">
                    ${historyHtml}
                </div>
            </div>

            <!-- Action Controls -->
            <div class="flex items-center justify-between pt-4 border-t border-gray-100">
                <button type="button" onclick="window.DisicureMain.deleteTeamMember('${member.memberId}')" class="px-4 py-2 bg-rose-50 text-rose-700 hover:bg-rose-600 hover:text-white text-xs font-bold rounded transition-colors">
                    Delete Member
                </button>
                <div class="flex gap-2">
                    <button type="button" onclick="window.DisicureMain.closeTeamMemberDrawer()" class="px-5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded">
                        Close
                    </button>
                    <button type="button" onclick="window.DisicureMain.closeTeamMemberDrawer(); window.DisicureMain.openEditTeamModal('${member.memberId}')" class="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded shadow">
                        Edit Profile & Role
                    </button>
                </div>
            </div>
        </div>
        `;

        drawer.classList.remove('hidden');
        drawer.classList.add('flex');
        document.body.classList.add('overflow-hidden');
    },

    closeTeamMemberDrawer: function() {
        const drawer = document.getElementById('tms-profile-drawer');
        if (drawer) {
            drawer.classList.remove('flex');
            drawer.classList.add('hidden');
            document.body.classList.remove('overflow-hidden');
        }
    },

    openEditTeamModal: function(memberId) {
        if (!window.DisicureTeam) return;
        const members = window.DisicureTeam.getAllMembers();
        const member = members.find(m => m.memberId === memberId);
        if (!member) return;

        const modal = document.getElementById('tms-edit-modal');
        const idInput = document.getElementById('tms-edit-id');
        const nameInput = document.getElementById('tms-edit-name');
        const roleSelect = document.getElementById('tms-edit-role');
        const mobileInput = document.getElementById('tms-edit-mobile');
        const emailInput = document.getElementById('tms-edit-email');
        const deptInput = document.getElementById('tms-edit-dept');
        const desigInput = document.getElementById('tms-edit-designation');
        const statusSelect = document.getElementById('tms-edit-status');

        if (idInput) idInput.value = member.memberId;
        if (nameInput) nameInput.value = member.name;
        if (roleSelect) roleSelect.value = member.role;
        if (mobileInput) mobileInput.value = member.mobile;
        if (emailInput) emailInput.value = member.email;
        if (deptInput) deptInput.value = member.dept || '';
        if (desigInput) desigInput.value = member.designation || '';
        if (statusSelect) statusSelect.value = member.accountStatus || '🟢 Active';

        if (modal) {
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            document.body.classList.add('overflow-hidden');
        }
    },

    closeEditTeamModal: function() {
        const modal = document.getElementById('tms-edit-modal');
        if (modal) {
            modal.classList.remove('flex');
            modal.classList.add('hidden');
            document.body.classList.remove('overflow-hidden');
        }
    },

    saveEditTeamMember: function(event) {
        event.preventDefault();
        const form = document.getElementById('tms-edit-member-form');
        if (!form || !window.DisicureTeam) return;

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        const updatePayload = {
            name: data.name,
            role: data.role,
            mobile: data.mobile,
            email: data.email,
            dept: data.dept,
            designation: data.designation,
            accountStatus: data.accountStatus
        };

        if (data.newPassword && data.newPassword.trim()) {
            updatePayload.passwordHash = '••••••••••••';
            window.DisicureTeam.logActivity(data.memberId, 'Password Reset', 'Portal login credential updated by Super Admin.');
        }

        window.DisicureTeam.updateMember(data.memberId, updatePayload);
        this.closeEditTeamModal();
        this.renderTeamTable();
    },

    deleteTeamMember: function(memberId) {
        if (confirm(`Are you sure you want to delete team member ${memberId}?`)) {
            if (window.DisicureTeam) {
                window.DisicureTeam.deleteMember(memberId);
            }
            this.closeTeamMemberDrawer();
            this.renderTeamTable();
        }
    },

    // Role-Based Access Control (RBAC) Permissions Matrix
    openRBACModal: function() {
        this.renderRBACMatrix();
        const modal = document.getElementById('tms-rbac-modal');
        if (modal) {
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            document.body.classList.add('overflow-hidden');
        }
    },

    closeRBACModal: function() {
        const modal = document.getElementById('tms-rbac-modal');
        if (modal) {
            modal.classList.remove('flex');
            modal.classList.add('hidden');
            document.body.classList.remove('overflow-hidden');
        }
    },

    renderRBACMatrix: function() {
        if (!window.DisicureTeam) return;
        const permissions = window.DisicureTeam.getRBACPermissions();
        const tbody = document.getElementById('tms-rbac-tbody');
        if (!tbody) return;

        const roles = ['👑 Super Admin', '🧑‍💼 Admin', '📞 Sales Executive', '👨‍💻 Team Member', '🤝 Partner'];
        let html = '';

        roles.forEach(role => {
            const perm = permissions[role] || {};
            const isSuperAdmin = role.includes('Super Admin');

            html += `
            <tr class="border-b border-gray-100 hover:bg-slate-50 text-xs">
                <td class="p-3.5 font-extrabold text-navy-950">
                    <span class="block">${role}</span>
                    <span class="text-[10px] text-gray-400 font-normal">Governance Level</span>
                </td>
                <td class="p-3.5 text-center">
                    <input type="checkbox" name="${role}_dashboard" ${perm.dashboard ? 'checked' : ''} ${isSuperAdmin ? 'disabled checked' : ''} class="w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500 cursor-pointer">
                </td>
                <td class="p-3.5 text-center">
                    <input type="checkbox" name="${role}_leads" ${perm.leads_view ? 'checked' : ''} ${isSuperAdmin ? 'disabled checked' : ''} class="w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500 cursor-pointer">
                </td>
                <td class="p-3.5 text-center">
                    <input type="checkbox" name="${role}_payments" ${perm.payments_view ? 'checked' : ''} ${isSuperAdmin ? 'disabled checked' : ''} class="w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500 cursor-pointer">
                </td>
                <td class="p-3.5 text-center">
                    <input type="checkbox" name="${role}_documents" ${perm.documents_view ? 'checked' : ''} ${isSuperAdmin ? 'disabled checked' : ''} class="w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500 cursor-pointer">
                </td>
                <td class="p-3.5 text-center">
                    <input type="checkbox" name="${role}_team" ${perm.team_manage ? 'checked' : ''} ${isSuperAdmin ? 'disabled checked' : ''} class="w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500 cursor-pointer">
                </td>
            </tr>
            `;
        });

        tbody.innerHTML = html;
    },

    saveRBACMatrix: function(event) {
        event.preventDefault();
        const form = document.getElementById('tms-rbac-form');
        if (!form || !window.DisicureTeam) return;

        const roles = ['👑 Super Admin', '🧑‍💼 Admin', '📞 Sales Executive', '👨‍💻 Team Member', '🤝 Partner'];
        const currentPerms = window.DisicureTeam.getRBACPermissions();

        roles.forEach(role => {
            if (role.includes('Super Admin')) return; // Super admin always full
            if (!currentPerms[role]) currentPerms[role] = {};

            currentPerms[role].dashboard = !!form[`${role}_dashboard`]?.checked;
            currentPerms[role].leads_view = !!form[`${role}_leads`]?.checked;
            currentPerms[role].payments_view = !!form[`${role}_payments`]?.checked;
            currentPerms[role].documents_view = !!form[`${role}_documents`]?.checked;
            currentPerms[role].team_manage = !!form[`${role}_team`]?.checked;
        });

        window.DisicureTeam.saveRBACPermissions(currentPerms);
        this.closeRBACModal();
        alert('Role permissions successfully updated and enforced.');
    },

    // =========================================================================
    // --- 15. PARTNER / CLIENT PORTAL & DASHBOARD CONTROLLER METHODS ---
    // =========================================================================
    initPartnerLogin: function() {
        const usernameInput = document.getElementById('prt-login-username');
        if (usernameInput) usernameInput.focus();
    },

    fillPartnerDemo: function(username, password) {
        const uInput = document.getElementById('prt-login-username');
        const pInput = document.getElementById('prt-login-password');
        if (uInput) uInput.value = username;
        if (pInput) pInput.value = password;

        // Auto login on select
        const form = document.getElementById('partner-login-form');
        if (form) {
            const fakeEvt = { preventDefault: () => {} };
            this.handlePartnerLogin(fakeEvt);
        }
    },

    handlePartnerLogin: function(event) {
        event.preventDefault();
        const usernameInput = document.getElementById('prt-login-username');
        const passwordInput = document.getElementById('prt-login-password');
        const errorEl = document.getElementById('prt-login-error');

        if (!usernameInput || !passwordInput || !window.DisicurePartner) return;

        const result = window.DisicurePartner.login(usernameInput.value, passwordInput.value);

        if (result.success) {
            if (errorEl) errorEl.classList.add('hidden');
            window.location.hash = '#/partner/dashboard';
        } else {
            if (errorEl) {
                errorEl.innerText = result.message || 'Invalid username or password.';
                errorEl.classList.remove('hidden');
            } else {
                alert(result.message || 'Invalid username or password.');
            }
        }
    },

    handlePartnerLogout: function() {
        if (confirm('Are you sure you want to log out of your Partner Portal session?')) {
            if (window.DisicurePartner) {
                window.DisicurePartner.logout();
            }
            window.location.hash = '#/partner/login';
        }
    },

    initPartnerDashboard: function() {
        if (!window.DisicurePartner) return;
        const session = window.DisicurePartner.getCurrentSession();
        if (!session) return;

        this.renderPartnerDashboardData();
    },

    switchPartnerTab: function(tabId) {
        const tabs = document.querySelectorAll('.prt-tab-content');
        tabs.forEach(t => {
            t.classList.add('hidden');
            t.classList.remove('block');
        });

        const target = document.getElementById(tabId);
        if (target) {
            target.classList.remove('hidden');
            target.classList.add('block');
        }

        const btns = document.querySelectorAll('.prt-tab-btn');
        btns.forEach(b => {
            b.classList.remove('bg-blue-600', 'text-white', 'shadow-sm', 'font-extrabold');
            b.classList.add('bg-white', 'text-gray-700', 'border', 'border-gray-200', 'font-bold');
        });

        const activeBtn = document.getElementById(`btn-${tabId}`);
        if (activeBtn) {
            activeBtn.classList.remove('bg-white', 'text-gray-700', 'border', 'border-gray-200');
            activeBtn.classList.add('bg-blue-600', 'text-white', 'shadow-sm', 'font-extrabold');
        }

        this.renderPartnerDashboardData();
    },

    renderPartnerDashboardData: function() {
        if (!window.DisicurePartner) return;
        const session = window.DisicurePartner.getCurrentSession();
        if (!session) return;

        const orders = window.DisicurePartner.getPartnerOrders(session.partnerId);
        const referrals = window.DisicurePartner.getPartnerReferredLeads(session.partnerId);

        // 1. Overview Orders Table
        const overviewTbody = document.getElementById('prt-overview-orders-tbody');
        if (overviewTbody) {
            if (orders.length === 0) {
                overviewTbody.innerHTML = `<tr><td colspan="5" class="p-4 text-center text-gray-400">No recent orders recorded. Place your first batch order.</td></tr>`;
            } else {
                overviewTbody.innerHTML = orders.slice(0, 3).map(o => `
                    <tr class="border-b border-gray-100 hover:bg-slate-50">
                        <td class="p-3 font-mono font-bold text-navy-950">${o.orderId}<span class="block text-[10px] text-gray-400">${o.orderDate}</span></td>
                        <td class="p-3 font-bold text-blue-700">${o.productName}</td>
                        <td class="p-3"><span class="font-bold">${o.quantity}</span><span class="block font-mono text-[10px] text-gray-400">${o.batchNumber}</span></td>
                        <td class="p-3"><span class="px-2 py-0.5 rounded text-[10px] font-bold ${o.status.includes('Delivered') || o.status.includes('Dispatched') ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}">${o.status}</span></td>
                        <td class="p-3 font-extrabold text-navy-950">${o.invoiceAmount}</td>
                    </tr>
                `).join('');
            }
        }

        // 2. Full Orders Table
        const fullOrdersTbody = document.getElementById('prt-full-orders-tbody');
        if (fullOrdersTbody) {
            if (orders.length === 0) {
                fullOrdersTbody.innerHTML = `<tr><td colspan="7" class="p-6 text-center text-gray-400">No batch orders placed yet. Click "+ Place New Batch Order".</td></tr>`;
            } else {
                fullOrdersTbody.innerHTML = orders.map(o => `
                    <tr class="border-b border-gray-100 hover:bg-slate-50">
                        <td class="p-3.5 font-mono font-bold text-navy-950">${o.orderId}<span class="block text-[10px] text-gray-400">${o.orderDate}</span></td>
                        <td class="p-3.5 font-bold text-blue-700">${o.productName}</td>
                        <td class="p-3.5 font-mono text-xs text-gray-700">${o.batchNumber}</td>
                        <td class="p-3.5 font-bold text-navy-950">${o.quantity}</td>
                        <td class="p-3.5"><span class="inline-block px-2.5 py-1 rounded text-xs font-bold ${o.status.includes('Delivered') || o.status.includes('Dispatched') ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'}">${o.status}</span></td>
                        <td class="p-3.5 font-extrabold text-navy-950">${o.invoiceAmount}</td>
                        <td class="p-3.5 text-right whitespace-nowrap">
                            <button onclick="alert('Downloading Certified Batch COA: ${o.coaDocument || 'COA_Batch.pdf'}')" class="px-2.5 py-1 bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white rounded text-[11px] font-bold transition-colors">
                                Download COA
                            </button>
                        </td>
                    </tr>
                `).join('');
            }
        }

        // 3. Invoices Table
        const invoicesTbody = document.getElementById('prt-invoices-tbody');
        if (invoicesTbody) {
            const demoInvoices = [
                { id: `INV-${session.partnerId}-01`, batch: 'BT-DSR-2608', date: '2026-10-01', mode: 'NEFT / LC 30 Days', amount: '₹2,45,000', status: '🟡 Pending Settlement' },
                { id: `INV-${session.partnerId}-02`, batch: 'BT-MOL-2609', date: '2026-09-24', mode: 'RTGS Cleared', amount: '₹1,85,000', status: '🟢 Paid & Reconciled' }
            ];

            invoicesTbody.innerHTML = demoInvoices.map(inv => `
                <tr class="border-b border-gray-100 hover:bg-slate-50">
                    <td class="p-3.5 font-mono font-bold text-navy-950">${inv.id}</td>
                    <td class="p-3.5 font-mono text-gray-600">${inv.batch}</td>
                    <td class="p-3.5 text-gray-500">${inv.date}</td>
                    <td class="p-3.5 font-medium text-gray-700">${inv.mode}</td>
                    <td class="p-3.5 font-extrabold text-navy-950">${inv.amount}</td>
                    <td class="p-3.5"><span class="px-2.5 py-1 rounded-full text-xs font-bold ${inv.status.includes('Paid') ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'}">${inv.status}</span></td>
                    <td class="p-3.5 text-right whitespace-nowrap">
                        <button onclick="alert('Downloading GST Tax Invoice ${inv.id}...')" class="px-2.5 py-1 bg-slate-100 hover:bg-blue-600 hover:text-white text-gray-700 rounded text-[11px] font-bold transition-colors">
                            PDF Invoice
                        </button>
                    </td>
                </tr>
            `).join('');
        }

        // 4. Referrals Table
        const referralsTbody = document.getElementById('prt-referrals-tbody');
        if (referralsTbody) {
            if (referrals.length === 0) {
                referralsTbody.innerHTML = `<tr><td colspan="7" class="p-6 text-center text-gray-400">No client leads submitted yet. Click "+ Submit Client Lead" to claim your commission.</td></tr>`;
            } else {
                referralsTbody.innerHTML = referrals.map(l => `
                    <tr class="border-b border-gray-100 hover:bg-slate-50">
                        <td class="p-3.5 font-mono font-bold text-purple-700">${l.leadId}<span class="block text-[10px] text-gray-400">${l.submittedDate}</span></td>
                        <td class="p-3.5 font-bold text-navy-950">${l.clientName}<span class="block text-[11px] text-gray-500 font-normal">Contact: ${l.contactPerson} (${l.phone})</span></td>
                        <td class="p-3.5 text-gray-600">${l.city}</td>
                        <td class="p-3.5 text-gray-700 text-xs">${l.requirement}</td>
                        <td class="p-3.5"><span class="px-2.5 py-1 rounded text-xs font-bold ${l.status.includes('Converted') ? 'bg-purple-50 text-purple-700 border border-purple-200' : 'bg-blue-50 text-blue-700 border border-blue-200'}">${l.status}</span></td>
                        <td class="p-3.5 font-extrabold text-emerald-700">${l.commissionEarned}</td>
                        <td class="p-3.5"><span class="px-2 py-0.5 rounded text-[10px] font-bold ${l.commissionStatus.includes('Paid') ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}">${l.commissionStatus}</span></td>
                    </tr>
                `).join('');
            }
        }
    },

    openPartnerOrderModal: function() {
        const modal = document.getElementById('prt-order-modal');
        if (modal) {
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            document.body.classList.add('overflow-hidden');
        }
    },

    closePartnerOrderModal: function() {
        const modal = document.getElementById('prt-order-modal');
        if (modal) {
            modal.classList.remove('flex');
            modal.classList.add('hidden');
            document.body.classList.remove('overflow-hidden');
            const form = document.getElementById('prt-new-order-form');
            if (form) form.reset();
        }
    },

    savePartnerOrder: function(event) {
        event.preventDefault();
        const form = document.getElementById('prt-new-order-form');
        const session = window.DisicurePartner.getCurrentSession();
        if (!form || !session || !window.DisicurePartner) return;

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        window.DisicurePartner.placePartnerOrder(session.partnerId, data);
        this.closePartnerOrderModal();
        this.renderPartnerDashboardData();
        alert('Batch Order successfully received and submitted to Disicure Production Queue.');
    },

    openPartnerPaymentModal: function() {
        const modal = document.getElementById('prt-payment-modal');
        if (modal) {
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            document.body.classList.add('overflow-hidden');
        }
    },

    closePartnerPaymentModal: function() {
        const modal = document.getElementById('prt-payment-modal');
        if (modal) {
            modal.classList.remove('flex');
            modal.classList.add('hidden');
            document.body.classList.remove('overflow-hidden');
            const form = document.getElementById('prt-new-payment-form');
            if (form) form.reset();
        }
    },

    savePartnerPaymentProof: function(event) {
        event.preventDefault();
        const form = document.getElementById('prt-new-payment-form');
        const session = window.DisicurePartner.getCurrentSession();
        if (!form || !session || !window.DisicurePartner) return;

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        if (window.DisicurePayments) {
            window.DisicurePayments.addPayment({
                clientName: session.companyName,
                invoiceId: data.invoiceId,
                totalAmount: parseFloat(data.amountPaid) || 0,
                amountReceived: parseFloat(data.amountPaid) || 0,
                paymentDate: new Date().toISOString().substring(0, 10),
                paymentMode: data.paymentMode,
                paymentStatus: '🟢 Paid',
                notes: `Direct Partner Settlement UTR: ${data.utrRef}`
            });
        }

        this.closePartnerPaymentModal();
        this.renderPartnerDashboardData();
        alert('Payment settlement slip received. Reconciled with Disicure Accounts.');
    },

    openPartnerLeadModal: function() {
        const modal = document.getElementById('prt-lead-modal');
        if (modal) {
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            document.body.classList.add('overflow-hidden');
        }
    },

    closePartnerLeadModal: function() {
        const modal = document.getElementById('prt-lead-modal');
        if (modal) {
            modal.classList.remove('flex');
            modal.classList.add('hidden');
            document.body.classList.remove('overflow-hidden');
            const form = document.getElementById('prt-new-lead-form');
            if (form) form.reset();
        }
    },

    savePartnerReferredLead: function(event) {
        event.preventDefault();
        const form = document.getElementById('prt-new-lead-form');
        const session = window.DisicurePartner.getCurrentSession();
        if (!form || !session || !window.DisicurePartner) return;

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        window.DisicurePartner.submitReferredLead(session.partnerId, data);
        this.closePartnerLeadModal();
        this.renderPartnerDashboardData();
        alert('Lead registered in Master LMS. Commission tracking active.');
    },

    savePartnerSelfProfile: function(event) {
        event.preventDefault();
        const form = document.getElementById('prt-profile-form');
        const session = window.DisicurePartner.getCurrentSession();
        if (!form || !session || !window.DisicurePartner) return;

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        window.DisicurePartner.updatePartner(session.partnerId, {
            companyName: data.companyName,
            contactPerson: data.contactPerson,
            mobile: data.mobile,
            email: data.email,
            gstin: data.gstin,
            drugLicense: data.drugLicense
        });

        alert('Partner profile details successfully saved.');
    },

    // =========================================================================
    // --- 16. ADMIN PARTNER MANAGEMENT SUITE CONTROLLER METHODS ---
    // =========================================================================
    renderAdminPartners: function() {
        if (!window.DisicurePartner) return;
        const allPartners = window.DisicurePartner.getAllPartners();
        const summary = window.DisicurePartner.getSummary();

        // Update Summary KPI Cards
        const setElText = (id, val) => {
            const el = document.getElementById(id);
            if (el) el.innerText = val;
        };

        setElText('adm-prt-total', summary.total);
        setElText('adm-prt-distributors', (summary.distributors + summary.businessPartners));
        setElText('adm-prt-clients', summary.clients);
        setElText('adm-prt-marketing', (summary.marketingPartners + summary.freelancers + summary.salesPartners + summary.agencies));

        // Render Type Filter Pills
        this.renderPartnerTypePills(summary);

        // Filter Partners
        const query = this.admPartnerState.searchQuery;
        let filtered = allPartners.filter(p => {
            const matchesQuery = !query ||
                (p.companyName && p.companyName.toLowerCase().includes(query)) ||
                (p.contactPerson && p.contactPerson.toLowerCase().includes(query)) ||
                (p.partnerType && p.partnerType.toLowerCase().includes(query)) ||
                (p.email && p.email.toLowerCase().includes(query)) ||
                (p.mobile && p.mobile.toLowerCase().includes(query)) ||
                (p.city && p.city.toLowerCase().includes(query)) ||
                (p.assignedTerritory && p.assignedTerritory.toLowerCase().includes(query)) ||
                (p.username && p.username.toLowerCase().includes(query));

            const matchesType = this.admPartnerState.typeFilter === 'all' || p.partnerType.includes(this.admPartnerState.typeFilter);

            return matchesQuery && matchesType;
        });

        const tbody = document.getElementById('adm-prt-tbody');
        const emptyState = document.getElementById('adm-prt-empty-state');
        const countDisplay = document.getElementById('adm-prt-showing-count');

        if (countDisplay) {
            countDisplay.innerText = `Showing ${filtered.length} of ${allPartners.length} Partners`;
        }

        if (!tbody) return;

        if (filtered.length === 0) {
            tbody.innerHTML = '';
            if (emptyState) emptyState.classList.remove('hidden');
            return;
        }

        if (emptyState) emptyState.classList.add('hidden');

        let rowsHtml = '';
        filtered.forEach(p => {
            const badgeClass = p.partnerType.includes('Distributor') ? 'bg-blue-100 text-blue-900 border-blue-300' :
                               p.partnerType.includes('Client') || p.partnerType.includes('Hospital') ? 'bg-rose-100 text-rose-900 border-rose-300' :
                               p.partnerType.includes('Marketing') ? 'bg-purple-100 text-purple-900 border-purple-300' :
                               p.partnerType.includes('Freelancer') ? 'bg-teal-100 text-teal-900 border-teal-300' :
                               p.partnerType.includes('Sales') ? 'bg-emerald-100 text-emerald-900 border-emerald-300' :
                               'bg-indigo-100 text-indigo-900 border-indigo-300';

            const statusClass = p.accountStatus && p.accountStatus.includes('Active') ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200';

            rowsHtml += `
            <tr class="border-b border-gray-100 hover:bg-blue-50/20 transition-colors text-xs">
                <!-- Company & Contact -->
                <td class="p-3.5">
                    <div class="font-extrabold text-navy-950 text-sm">${p.companyName}</div>
                    <div class="text-xs text-gray-600 font-medium">👤 ${p.contactPerson}</div>
                    <div class="text-[11px] text-gray-400 font-mono mt-0.5">${p.mobile} • ${p.city}, ${p.state}</div>
                </td>

                <!-- Category Badge -->
                <td class="p-3.5 whitespace-nowrap">
                    <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold border ${badgeClass}">
                        ${p.partnerType}
                    </span>
                    <span class="text-[10px] text-gray-400 block mt-1 font-mono">${p.partnerId}</span>
                </td>

                <!-- Territory & Commercial Terms -->
                <td class="p-3.5">
                    <div class="font-bold text-navy-950 text-xs">📍 ${p.assignedTerritory}</div>
                    <div class="text-[11px] text-indigo-700 font-medium mt-0.5">${p.commercialTerms}</div>
                </td>

                <!-- Login Credentials -->
                <td class="p-3.5 whitespace-nowrap font-mono text-xs">
                    <div class="font-bold text-navy-950">🔑 ${p.username}</div>
                    <span class="text-[10px] text-gray-400 block mt-0.5">Pass: ••••••••</span>
                </td>

                <!-- Business & Orders -->
                <td class="p-3.5 whitespace-nowrap">
                    <div class="font-extrabold text-navy-950">${p.totalBusinessValue}</div>
                    <span class="text-[10px] text-blue-600 font-bold block mt-0.5">${p.activeOrdersCount || p.referredLeadsCount || 0} Batches / Refs</span>
                </td>

                <!-- Account Status -->
                <td class="p-3.5 whitespace-nowrap">
                    <span class="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${statusClass}">
                        ${p.accountStatus || '🟢 Active'}
                    </span>
                    <span class="text-[10px] text-gray-400 block mt-0.5">Last: ${p.lastLoginDate ? p.lastLoginDate.split(' ')[0] : 'Today'}</span>
                </td>

                <!-- Actions -->
                <td class="p-3.5 whitespace-nowrap text-right">
                    <div class="flex items-center justify-end gap-1.5">
                        <!-- Impersonate Login -->
                        <button onclick="window.DisicureMain.impersonatePartner('${p.partnerId}')" class="p-1.5 bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white rounded-md transition-colors" title="Login As Partner (Open Dashboard)">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"/></svg>
                        </button>
                        
                        <!-- Edit Partner -->
                        <button onclick="window.DisicureMain.openEditPartnerModal('${p.partnerId}')" class="p-1.5 bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white rounded-md transition-colors" title="Edit Partner">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                        </button>

                        <!-- Delete Partner -->
                        <button onclick="window.DisicureMain.deletePartner('${p.partnerId}')" class="p-1.5 bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white rounded-md transition-colors" title="Delete Partner">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                        </button>
                    </div>
                </td>
            </tr>
            `;
        });

        tbody.innerHTML = rowsHtml;
    },

    renderPartnerTypePills: function(summary) {
        const container = document.getElementById('adm-prt-type-pills');
        if (!container) return;

        const types = [
            { key: 'all', label: 'All Partners', count: summary ? summary.total : 0, icon: '🤝' },
            { key: 'Pharma Distributor', label: 'Distributors', count: summary ? summary.distributors : 0, icon: '🏢' },
            { key: 'Business Partner', label: 'PCD Franchises', count: summary ? summary.businessPartners : 0, icon: '🤝' },
            { key: 'Client', label: 'Hospital Clients', count: summary ? summary.clients : 0, icon: '🏥' },
            { key: 'Marketing Partner', label: 'Marketing', count: summary ? summary.marketingPartners : 0, icon: '📢' },
            { key: 'Freelancer', label: 'Freelancers', count: summary ? summary.freelancers : 0, icon: '💼' },
            { key: 'Sales Partner', label: 'Sales Alliances', count: summary ? summary.salesPartners : 0, icon: '📞' },
            { key: 'Agency', label: 'Agencies', count: summary ? summary.agencies : 0, icon: '🏢' }
        ];

        let html = '';
        types.forEach(t => {
            const isActive = (t.key === 'all' && this.admPartnerState.typeFilter === 'all') || (t.key !== 'all' && this.admPartnerState.typeFilter === t.key);
            const activeClass = isActive 
                ? 'bg-blue-600 text-white shadow-sm font-extrabold border-blue-600' 
                : 'bg-white text-gray-700 hover:bg-blue-50 border-gray-200 font-medium';

            html += `
                <button onclick="window.DisicureMain.filterAdminPartnerType('${t.key}')" class="px-3.5 py-1.5 rounded-lg border text-xs whitespace-nowrap transition-all duration-200 flex items-center gap-1.5 ${activeClass}">
                    <span>${t.icon}</span>
                    <span>${t.label}</span>
                    <span class="text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? 'bg-blue-700 text-blue-100' : 'bg-gray-100 text-gray-600'} font-bold">${t.count}</span>
                </button>
            `;
        });

        container.innerHTML = html;
    },

    filterAdminPartnerType: function(typeKey) {
        this.admPartnerState.typeFilter = typeKey;
        const select = document.getElementById('adm-prt-type-select');
        if (select) select.value = typeKey;
        this.renderAdminPartners();
    },

    openAddPartnerModal: function() {
        const modal = document.getElementById('lms-add-partner-modal');
        if (modal) {
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            document.body.classList.add('overflow-hidden');
        }
    },

    closeAddPartnerModal: function() {
        const modal = document.getElementById('lms-add-partner-modal');
        if (modal) {
            modal.classList.remove('flex');
            modal.classList.add('hidden');
            document.body.classList.remove('overflow-hidden');
            const form = document.getElementById('lms-new-partner-form');
            if (form) form.reset();
        }
    },

    saveNewPartner: function(event) {
        event.preventDefault();
        const form = document.getElementById('lms-new-partner-form');
        if (!form || !window.DisicurePartner) return;

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        window.DisicurePartner.addPartner(data);
        this.closeAddPartnerModal();
        this.renderAdminPartners();
    },

    openEditPartnerModal: function(partnerId) {
        if (!window.DisicurePartner) return;
        const partner = window.DisicurePartner.getPartnerById(partnerId);
        if (!partner) return;

        const modal = document.getElementById('adm-edit-partner-modal');
        const idInput = document.getElementById('adm-edit-prt-id');
        const compInput = document.getElementById('adm-edit-prt-company');
        const typeSelect = document.getElementById('adm-edit-prt-type');
        const contInput = document.getElementById('adm-edit-prt-contact');
        const mobInput = document.getElementById('adm-edit-prt-mobile');
        const terrInput = document.getElementById('adm-edit-prt-territory');
        const termsInput = document.getElementById('adm-edit-prt-terms');
        const statusSelect = document.getElementById('adm-edit-prt-status');

        if (idInput) idInput.value = partner.partnerId;
        if (compInput) compInput.value = partner.companyName;
        if (typeSelect) typeSelect.value = partner.partnerType;
        if (contInput) contInput.value = partner.contactPerson;
        if (mobInput) mobInput.value = partner.mobile;
        if (terrInput) terrInput.value = partner.assignedTerritory || '';
        if (termsInput) termsInput.value = partner.commercialTerms || '';
        if (statusSelect) statusSelect.value = partner.accountStatus || '🟢 Active';

        if (modal) {
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            document.body.classList.add('overflow-hidden');
        }
    },

    closeEditPartnerModal: function() {
        const modal = document.getElementById('adm-edit-partner-modal');
        if (modal) {
            modal.classList.remove('flex');
            modal.classList.add('hidden');
            document.body.classList.remove('overflow-hidden');
        }
    },

    saveEditPartner: function(event) {
        event.preventDefault();
        const form = document.getElementById('adm-edit-partner-form');
        if (!form || !window.DisicurePartner) return;

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        const updatePayload = {
            companyName: data.companyName,
            partnerType: data.partnerType,
            contactPerson: data.contactPerson,
            mobile: data.mobile,
            assignedTerritory: data.assignedTerritory,
            commercialTerms: data.commercialTerms,
            accountStatus: data.accountStatus
        };

        if (data.newPassword && data.newPassword.trim()) {
            updatePayload.password = data.newPassword.trim();
        }

        window.DisicurePartner.updatePartner(data.partnerId, updatePayload);
        this.closeEditPartnerModal();
        this.renderAdminPartners();
    },

    deletePartner: function(partnerId) {
        if (confirm(`Are you sure you want to remove partner ${partnerId}?`)) {
            if (window.DisicurePartner) {
                window.DisicurePartner.deletePartner(partnerId);
            }
            this.renderAdminPartners();
        }
    },

    impersonatePartner: function(partnerId) {
        if (!window.DisicurePartner) return;
        const partner = window.DisicurePartner.getPartnerById(partnerId);
        if (partner) {
            window.DisicurePartner.setSession(partner);
            window.location.hash = '#/partner/dashboard';
        }
    }
};

// Make main controller globally accessible
window.DisicureMain = DisicureMain;

// Initialize on load
DisicureMain.init();
