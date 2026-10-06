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

    // --- 11. LEAD MANAGEMENT SYSTEM (LMS) & ADMIN DASHBOARD CONTROLLER ---
    lmsState: {
        searchQuery: '',
        statusFilter: 'all',
        businessFilter: 'all',
        sourceFilter: 'all',
        sortBy: 'newest'
    },

    initAdminPanel: function() {
        if (!window.DisicureLeads) return;

        // Tab Switching buttons if present
        const searchInput = document.getElementById('lms-search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.lmsState.searchQuery = e.target.value.toLowerCase().trim();
                this.renderAdminLeads();
            });
        }

        // Status Filter
        const statusFilter = document.getElementById('lms-status-filter');
        if (statusFilter) {
            statusFilter.addEventListener('change', (e) => {
                this.lmsState.statusFilter = e.target.value;
                this.renderAdminLeads();
            });
        }

        // Business Filter
        const businessFilter = document.getElementById('lms-business-filter');
        if (businessFilter) {
            businessFilter.addEventListener('change', (e) => {
                this.lmsState.businessFilter = e.target.value;
                this.renderAdminLeads();
            });
        }

        // Source Filter
        const sourceFilter = document.getElementById('lms-source-filter');
        if (sourceFilter) {
            sourceFilter.addEventListener('change', (e) => {
                this.lmsState.sourceFilter = e.target.value;
                this.renderAdminLeads();
            });
        }

        // Sort Filter
        const sortFilter = document.getElementById('lms-sort-filter');
        if (sortFilter) {
            sortFilter.addEventListener('change', (e) => {
                this.lmsState.sortBy = e.target.value;
                this.renderAdminLeads();
            });
        }

        // Initial Full Render (Dashboard + Table + Charts + Directories)
        this.renderAdminLeads();
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
    }
};

// Make main controller globally accessible
window.DisicureMain = DisicureMain;

// Initialize on load
DisicureMain.init();
