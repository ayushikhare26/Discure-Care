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

    // Global Toast Notification Helper
    showToast: function(type, message) {
        let container = document.getElementById('disicure-toast-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'disicure-toast-container';
            container.className = 'fixed bottom-5 right-5 z-[99999] flex flex-col gap-2 pointer-events-none';
            document.body.appendChild(container);
        }

        const toast = document.createElement('div');
        const bgColor = type === 'success' ? 'bg-emerald-600 text-white' : type === 'error' ? 'bg-rose-600 text-white' : 'bg-navy-900 text-white';
        const icon = type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ';
        
        toast.className = `${bgColor} px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 text-xs font-bold pointer-events-auto transform translate-y-4 opacity-0 transition-all duration-300 max-w-md`;
        toast.innerHTML = `<span class="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[11px]">${icon}</span><span class="flex-1 leading-snug">${message}</span>`;
        
        container.appendChild(toast);
        
        requestAnimationFrame(() => {
            toast.classList.remove('translate-y-4', 'opacity-0');
            toast.classList.add('translate-y-0', 'opacity-100');
        });

        setTimeout(() => {
            toast.classList.remove('translate-y-0', 'opacity-100');
            toast.classList.add('translate-y-4', 'opacity-0');
            setTimeout(() => toast.remove(), 350);
        }, 4000);
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

    prtLeadState: {
        searchQuery: '',
        statusFilter: 'all'
    },

    // Global Search & 9-Dimensional Multi-Filter State (Module 16)
    globalSearchState: {
        globalQuery: '',
        name: '',
        mobile: '',
        company: '',
        city: '',
        product: '',
        partner: '',
        leadStatus: 'all',
        paymentStatus: 'all',
        dateFrom: '',
        dateTo: '',
        datePreset: 'all',
        isFilterOpen: false
    },

    // Notification State (Module 18)
    notifFilterState: {
        category: 'all'
    },

    // Security & Audit Log State (Module 19)
    secState: {
        searchQuery: '',
        categoryFilter: 'all',
        severityFilter: 'all'
    },

    initAdminPanel: function() {
        if (!window.DisicureLeads && !window.DisicurePayments && !window.DisicureDocuments && !window.DisicureTeam && !window.DisicurePartner) return;

        // Initialize Global Omnibar Search & 9-Point Multi-Filter (Module 16)
        this.initGlobalSearchAndFilters();

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

        // Security & Audit Log Listeners (Module 19)
        const secSearch = document.getElementById('sec-search-input');
        if (secSearch) {
            secSearch.addEventListener('input', (e) => {
                this.secState.searchQuery = e.target.value.toLowerCase().trim();
                this.renderSecurityAuditTable();
            });
        }

        const secCat = document.getElementById('sec-category-filter');
        if (secCat) {
            secCat.addEventListener('change', (e) => {
                this.secState.categoryFilter = e.target.value;
                this.renderSecurityAuditTable();
            });
        }

        const secSev = document.getElementById('sec-severity-filter');
        if (secSev) {
            secSev.addEventListener('change', (e) => {
                this.secState.severityFilter = e.target.value;
                this.renderSecurityAuditTable();
            });
        }

        // Notification Badges & Session Display (Modules 18 & 19)
        if (window.DisicureNotifications) {
            window.DisicureNotifications.updateBadgeCounters();
        }
        this.updateAdminUserDisplay();

        // Initial Full Render
        this.renderAdminLeads();
        this.renderPaymentsTable();
        this.renderDocumentsTable();
        this.renderTeamTable();
        this.renderAdminPartners();
        this.renderSecurityAuditTable();
        this.renderSecurityDashboardOverview();
    },

    // Tab Switching Functionality with Role-Based Access Control (RBAC) Checks
    switchAdminTab: function(tabId) {
        // RBAC Permission Check (Module 19)
        if (window.DisicureSecurity && !window.DisicureSecurity.hasPermission(tabId)) {
            const session = window.DisicureSecurity.getAdminSession();
            const roleName = session ? session.role : 'Your Role';
            this.showToast('error', `⛔ Access Denied: ${roleName} is not permitted to access this module.`);
            if (window.DisicureSecurity.logActivity) {
                window.DisicureSecurity.logActivity('RBAC Access Blocked', 'RBAC_CHECK', `Unauthorized attempt to open ${tabId} by ${roleName}.`, session ? session.name : 'Unknown', 'SECURITY');
            }
            return;
        }

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
            this.renderAdminCommissionsTable();
        } else if (tabId === 'tab-clients') {
            this.renderClientsTable();
        } else if (tabId === 'tab-products') {
            this.renderAdminProductsTable();
        } else if (tabId === 'tab-financials') {
            this.renderPaymentsTable();
        } else if (tabId === 'tab-documents') {
            this.renderDocumentsTable();
        } else if (tabId === 'tab-team') {
            this.renderTeamTable();
        } else if (tabId === 'tab-security') {
            this.renderSecurityAuditTable();
            this.renderSecurityDashboardOverview();
        }
    },

    // =========================================================================
    // --- GLOBAL SEARCH & 9-DIMENSIONAL MULTI-FILTER CONTROLLER (Module 16) ---
    // =========================================================================
    initGlobalSearchAndFilters: function() {
        // Ctrl + K or Meta + K keyboard shortcut to focus global omnibar
        window.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'K')) {
                e.preventDefault();
                const searchInput = document.getElementById('global-omnibar-search');
                if (searchInput) {
                    searchInput.focus();
                    searchInput.select();
                    this.openGlobalSearchFlyout();
                }
            }
        });

        // Click outside flyout to close
        document.addEventListener('click', (e) => {
            const flyout = document.getElementById('global-search-flyout');
            const searchInput = document.getElementById('global-omnibar-search');
            if (flyout && !flyout.contains(e.target) && e.target !== searchInput) {
                this.closeGlobalSearchFlyout();
            }
        });

        this.updateGlobalFilterStats();
    },

    handleGlobalSearchInput: function(event) {
        const query = (event.target.value || '').trim();
        this.globalSearchState.globalQuery = query.toLowerCase();

        const clearBtn = document.getElementById('btn-clear-global-search');
        if (clearBtn) {
            if (query) clearBtn.classList.remove('hidden');
            else clearBtn.classList.add('hidden');
        }

        this.renderGlobalSearchResults();
        this.updateGlobalFilterStats();
        this.syncAllAdminViews();
    },

    openGlobalSearchFlyout: function() {
        const flyout = document.getElementById('global-search-flyout');
        if (!flyout) return;
        this.renderGlobalSearchResults();
        flyout.classList.remove('hidden');
    },

    closeGlobalSearchFlyout: function() {
        const flyout = document.getElementById('global-search-flyout');
        if (flyout) flyout.classList.add('hidden');
    },

    clearGlobalSearch: function() {
        const input = document.getElementById('global-omnibar-search');
        if (input) input.value = '';
        this.globalSearchState.globalQuery = '';
        const clearBtn = document.getElementById('btn-clear-global-search');
        if (clearBtn) clearBtn.classList.add('hidden');
        this.closeGlobalSearchFlyout();
        this.updateGlobalFilterStats();
        this.syncAllAdminViews();
    },

    toggleGlobalFilterDrawer: function() {
        const consoleEl = document.getElementById('global-filters-console');
        if (!consoleEl) return;
        const isHidden = consoleEl.classList.contains('hidden');
        if (isHidden) {
            consoleEl.classList.remove('hidden');
            this.globalSearchState.isFilterOpen = true;
        } else {
            consoleEl.classList.add('hidden');
            this.globalSearchState.isFilterOpen = false;
        }
        this.updateGlobalFilterStats();
    },

    handleFilterChange: function(field, value) {
        this.globalSearchState[field] = value;
        this.updateGlobalFilterStats();
        this.syncAllAdminViews();
    },

    applyFilterPreset: function(preset) {
        // Reset all 9 fields first
        this.globalSearchState.name = '';
        this.globalSearchState.mobile = '';
        this.globalSearchState.company = '';
        this.globalSearchState.city = '';
        this.globalSearchState.product = '';
        this.globalSearchState.partner = '';
        this.globalSearchState.leadStatus = 'all';
        this.globalSearchState.paymentStatus = 'all';
        this.globalSearchState.dateFrom = '';
        this.globalSearchState.dateTo = '';
        this.globalSearchState.datePreset = preset;

        // Reset inputs in DOM
        const ids = ['gfilter-name', 'gfilter-mobile', 'gfilter-company', 'gfilter-city', 'gfilter-product', 'gfilter-partner', 'gfilter-lead-status', 'gfilter-payment-status', 'gfilter-date-from', 'gfilter-date-to'];
        ids.forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                if (el.tagName === 'SELECT') el.value = el.options[0].value;
                else el.value = '';
            }
        });

        // Set preset values
        if (preset === 'new_leads') {
            this.globalSearchState.leadStatus = '🟢 New';
            const el = document.getElementById('gfilter-lead-status');
            if (el) el.value = '🟢 New';
            this.switchAdminTab('tab-leads');
        } else if (preset === 'pending_payments') {
            this.globalSearchState.paymentStatus = 'Pending';
            const el = document.getElementById('gfilter-payment-status');
            if (el) el.value = 'Pending';
            this.switchAdminTab('tab-financials');
        } else if (preset === 'hospital_clients') {
            this.globalSearchState.company = 'Hospital';
            const el = document.getElementById('gfilter-company');
            if (el) el.value = 'Hospital';
            this.switchAdminTab('tab-clients');
        } else if (preset === 'active_partners') {
            this.globalSearchState.partner = 'Medilink';
            const el = document.getElementById('gfilter-partner');
            if (el) el.value = 'Medilink';
            this.switchAdminTab('tab-partners');
        } else if (preset === 'disimol_products') {
            this.globalSearchState.product = 'DISIMOL-SP';
            const el = document.getElementById('gfilter-product');
            if (el) el.value = 'DISIMOL-SP';
            this.switchAdminTab('tab-products');
        } else if (preset === 'today') {
            const todayStr = new Date().toISOString().substring(0, 10);
            this.globalSearchState.dateFrom = todayStr;
            this.globalSearchState.dateTo = todayStr;
            const elFrom = document.getElementById('gfilter-date-from');
            const elTo = document.getElementById('gfilter-date-to');
            if (elFrom) elFrom.value = todayStr;
            if (elTo) elTo.value = todayStr;
        }

        this.updateGlobalFilterStats();
        this.syncAllAdminViews();
    },

    resetAllGlobalFilters: function() {
        this.clearGlobalSearch();
        this.applyFilterPreset('all');
        this.showToast('success', 'All 9 search filters have been reset to default.');
    },

    applyGlobalFiltersAndClose: function() {
        this.toggleGlobalFilterDrawer();
        this.syncAllAdminViews();
        this.showToast('success', 'Global filters applied across all ERP modules!');
    },

    syncAllAdminViews: function() {
        this.renderAdminLeads();
        this.renderClientsTable();
        this.renderAdminPartners();
        this.renderAdminProductsTable();
        this.renderPaymentsTable();
    },

    getActiveFilterCount: function() {
        const s = this.globalSearchState;
        let count = 0;
        if (s.globalQuery) count++;
        if (s.name) count++;
        if (s.mobile) count++;
        if (s.company) count++;
        if (s.city) count++;
        if (s.product) count++;
        if (s.partner) count++;
        if (s.leadStatus && s.leadStatus !== 'all') count++;
        if (s.paymentStatus && s.paymentStatus !== 'all') count++;
        if (s.dateFrom || s.dateTo) count++;
        return count;
    },

    updateGlobalFilterStats: function() {
        const activeCount = this.getActiveFilterCount();
        const badge = document.getElementById('global-filter-badge-count');
        if (badge) {
            if (activeCount > 0) {
                badge.innerText = activeCount;
                badge.classList.remove('hidden');
            } else {
                badge.classList.add('hidden');
            }
        }

        const matches = this.getGlobalFilterMatches();
        const matchCountEl = document.getElementById('global-filter-match-count');
        if (matchCountEl) {
            matchCountEl.innerText = `Matching: ${matches.total} records across ERP`;
        }

        const statsEl = document.getElementById('global-breakdown-stats');
        if (statsEl) {
            statsEl.innerHTML = `
                <span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-blue-900/60 border border-blue-600/40 text-cyan-300 font-bold">
                    📋 ${matches.leads.length} Leads
                </span>
                <span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-indigo-900/60 border border-indigo-600/40 text-indigo-300 font-bold">
                    🏢 ${matches.clients.length} Clients
                </span>
                <span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-purple-900/60 border border-purple-600/40 text-purple-300 font-bold">
                    🤝 ${matches.partners.length} Partners
                </span>
                <span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-900/60 border border-emerald-600/40 text-emerald-300 font-bold">
                    💊 ${matches.products.length} Products
                </span>
                <span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-amber-900/60 border border-amber-600/40 text-amber-300 font-bold">
                    💳 ${matches.payments.length} Payments
                </span>
            `;
        }
    },

    getGlobalFilterMatches: function() {
        const gf = this.globalSearchState;
        const gq = (gf.globalQuery || '').toLowerCase().trim();

        // 1. Leads
        const allLeads = (window.DisicureLeads && window.DisicureLeads.getAllLeads()) || [];
        const leads = allLeads.filter(lead => {
            if (gq) {
                const matchesGq = 
                    (lead.name && lead.name.toLowerCase().includes(gq)) ||
                    (lead.leadId && lead.leadId.toLowerCase().includes(gq)) ||
                    (lead.mobile && lead.mobile.toLowerCase().includes(gq)) ||
                    (lead.whatsapp && lead.whatsapp.toLowerCase().includes(gq)) ||
                    (lead.email && lead.email.toLowerCase().includes(gq)) ||
                    (lead.city && lead.city.toLowerCase().includes(gq)) ||
                    (lead.state && lead.state.toLowerCase().includes(gq)) ||
                    (lead.productOrService && lead.productOrService.toLowerCase().includes(gq)) ||
                    (lead.businessType && lead.businessType.toLowerCase().includes(gq)) ||
                    (lead.source && lead.source.toLowerCase().includes(gq)) ||
                    (lead.assignedPerson && lead.assignedPerson.toLowerCase().includes(gq));
                if (!matchesGq) return false;
            }
            if (gf.name && !(lead.name && lead.name.toLowerCase().includes(gf.name.toLowerCase().trim()))) return false;
            if (gf.mobile && !((lead.mobile && lead.mobile.includes(gf.mobile.trim())) || (lead.whatsapp && lead.whatsapp.includes(gf.mobile.trim())))) return false;
            if (gf.company && !((lead.name && lead.name.toLowerCase().includes(gf.company.toLowerCase().trim())) || (lead.businessType && lead.businessType.toLowerCase().includes(gf.company.toLowerCase().trim())))) return false;
            if (gf.city && !((lead.city && lead.city.toLowerCase().includes(gf.city.toLowerCase().trim())) || (lead.state && lead.state.toLowerCase().includes(gf.city.toLowerCase().trim())))) return false;
            if (gf.product && !((lead.productOrService && lead.productOrService.toLowerCase().includes(gf.product.toLowerCase().trim())) || (lead.requirementType && lead.requirementType.toLowerCase().includes(gf.product.toLowerCase().trim())))) return false;
            if (gf.partner) {
                const pf = gf.partner.toLowerCase().trim();
                const matchesP = (lead.source && lead.source.toLowerCase().includes(pf)) ||
                    (lead.assignedPerson && lead.assignedPerson.toLowerCase().includes(pf)) ||
                    (lead.email && lead.email.toLowerCase().includes(pf)) ||
                    (lead.notes && lead.notes.toLowerCase().includes(pf)) ||
                    (lead.name && lead.name.toLowerCase().includes(pf)) ||
                    (lead.businessType && lead.businessType.toLowerCase().includes(pf));
                if (!matchesP) return false;
            }
            if (gf.leadStatus && gf.leadStatus !== 'all') {
                const cleanStatus = gf.leadStatus.replace(/[^\w]/g, '').toLowerCase();
                const leadCleanStatus = (lead.leadStatus || '').replace(/[^\w]/g, '').toLowerCase();
                if (leadCleanStatus !== cleanStatus && !leadCleanStatus.includes(cleanStatus)) return false;
            }
            if (gf.paymentStatus && gf.paymentStatus !== 'all') {
                if (gf.paymentStatus === 'high_value' && !(lead.value >= 500000)) return false;
            }
            if (gf.dateFrom) {
                const lDate = (lead.createdDate || '').substring(0, 10);
                const lFollow = (lead.followUpDate || '');
                if (lDate < gf.dateFrom && (!lFollow || lFollow < gf.dateFrom)) return false;
            }
            if (gf.dateTo) {
                const lDate = (lead.createdDate || '').substring(0, 10);
                const lFollow = (lead.followUpDate || '');
                if (lDate > gf.dateTo && (!lFollow || lFollow > gf.dateTo)) return false;
            }
            return true;
        });

        // 2. Clients
        const allClients = (window.DisicureClients && window.DisicureClients.getAllClients()) || [];
        const clients = allClients.filter(c => {
            if (gq) {
                const matchesGq = 
                    (c.companyName && c.companyName.toLowerCase().includes(gq)) ||
                    (c.contactPerson && c.contactPerson.toLowerCase().includes(gq)) ||
                    (c.mobile && c.mobile.toLowerCase().includes(gq)) ||
                    (c.email && c.email.toLowerCase().includes(gq)) ||
                    (c.id && c.id.toLowerCase().includes(gq)) ||
                    (c.location && ((c.location.city && c.location.city.toLowerCase().includes(gq)) || (c.location.state && c.location.state.toLowerCase().includes(gq)))) ||
                    (c.businessType && c.businessType.toLowerCase().includes(gq));
                if (!matchesGq) return false;
            }
            if (gf.name && !((c.contactPerson && c.contactPerson.toLowerCase().includes(gf.name.toLowerCase().trim())) || (c.companyName && c.companyName.toLowerCase().includes(gf.name.toLowerCase().trim())))) return false;
            if (gf.mobile && !((c.mobile && c.mobile.includes(gf.mobile.trim())) || (c.whatsapp && c.whatsapp.includes(gf.mobile.trim())))) return false;
            if (gf.company && !(c.companyName && c.companyName.toLowerCase().includes(gf.company.toLowerCase().trim()))) return false;
            if (gf.city && !(c.location && ((c.location.city && c.location.city.toLowerCase().includes(gf.city.toLowerCase().trim())) || (c.location.state && c.location.state.toLowerCase().includes(gf.city.toLowerCase().trim())) || (c.location.address && c.location.address.toLowerCase().includes(gf.city.toLowerCase().trim()))))) return false;
            if (gf.product) {
                const prodMatch = (c.productsServices && c.productsServices.some(p => p.name && p.name.toLowerCase().includes(gf.product.toLowerCase().trim()))) ||
                                  (c.requirements && c.requirements.some(r => (r.specifications && r.specifications.toLowerCase().includes(gf.product.toLowerCase().trim())) || (r.title && r.title.toLowerCase().includes(gf.product.toLowerCase().trim()))));
                if (!prodMatch) return false;
            }
            if (gf.partner && !((c.businessType && c.businessType.toLowerCase().includes(gf.partner.toLowerCase().trim())) || (c.accountManager && c.accountManager.toLowerCase().includes(gf.partner.toLowerCase().trim())))) return false;
            if (gf.leadStatus && gf.leadStatus !== 'all') {
                const cleanStatus = gf.leadStatus.replace(/[^\w]/g, '').toLowerCase();
                const accStatus = (c.accountStatus || '').replace(/[^\w]/g, '').toLowerCase();
                if (!accStatus.includes(cleanStatus) && cleanStatus !== 'converted' && cleanStatus !== 'new') return false;
            }
            if (gf.paymentStatus && gf.paymentStatus !== 'all') {
                if (gf.paymentStatus === 'Pending') {
                    const hasPending = c.payments && c.payments.some(p => p.status === 'Pending' || p.status === 'Unpaid');
                    if (!hasPending && !c.creditLimit) return false;
                } else if (gf.paymentStatus === 'Paid') {
                    const allPaid = !c.payments || c.payments.every(p => p.status === 'Paid');
                    if (!allPaid) return false;
                }
            }
            if (gf.dateFrom) {
                const cDate = (c.createdDate || c.orders?.[0]?.date || '').substring(0, 10);
                if (cDate && cDate < gf.dateFrom) return false;
            }
            if (gf.dateTo) {
                const cDate = (c.createdDate || c.orders?.[0]?.date || '').substring(0, 10);
                if (cDate && cDate > gf.dateTo) return false;
            }
            return true;
        });

        // 3. Partners
        const allPartners = (window.DisicurePartner && window.DisicurePartner.getAllPartners()) || [];
        const partners = allPartners.filter(p => {
            if (gq) {
                const matchesGq = 
                    (p.companyName && p.companyName.toLowerCase().includes(gq)) ||
                    (p.contactPerson && p.contactPerson.toLowerCase().includes(gq)) ||
                    (p.partnerType && p.partnerType.toLowerCase().includes(gq)) ||
                    (p.email && p.email.toLowerCase().includes(gq)) ||
                    (p.mobile && p.mobile.toLowerCase().includes(gq)) ||
                    (p.city && p.city.toLowerCase().includes(gq)) ||
                    (p.state && p.state.toLowerCase().includes(gq)) ||
                    (p.assignedTerritory && p.assignedTerritory.toLowerCase().includes(gq)) ||
                    (p.partnerId && p.partnerId.toLowerCase().includes(gq));
                if (!matchesGq) return false;
            }
            if (gf.name && !((p.contactPerson && p.contactPerson.toLowerCase().includes(gf.name.toLowerCase().trim())) || (p.companyName && p.companyName.toLowerCase().includes(gf.name.toLowerCase().trim())))) return false;
            if (gf.mobile && !((p.mobile && p.mobile.includes(gf.mobile.trim())) || (p.whatsapp && p.whatsapp.includes(gf.mobile.trim())))) return false;
            if (gf.company && !(p.companyName && p.companyName.toLowerCase().includes(gf.company.toLowerCase().trim()))) return false;
            if (gf.city && !((p.city && p.city.toLowerCase().includes(gf.city.toLowerCase().trim())) || (p.state && p.state.toLowerCase().includes(gf.city.toLowerCase().trim())) || (p.assignedTerritory && p.assignedTerritory.toLowerCase().includes(gf.city.toLowerCase().trim())))) return false;
            if (gf.product && !((p.assignedTerritory && p.assignedTerritory.toLowerCase().includes(gf.product.toLowerCase().trim())) || (p.commercialTerms && p.commercialTerms.toLowerCase().includes(gf.product.toLowerCase().trim())))) return false;
            if (gf.partner && !((p.companyName && p.companyName.toLowerCase().includes(gf.partner.toLowerCase().trim())) || (p.partnerType && p.partnerType.toLowerCase().includes(gf.partner.toLowerCase().trim())) || (p.partnerId && p.partnerId.toLowerCase().includes(gf.partner.toLowerCase().trim())))) return false;
            if (gf.leadStatus && gf.leadStatus !== 'all') {
                const cleanStatus = gf.leadStatus.replace(/[^\w]/g, '').toLowerCase();
                const pStatus = (p.accountStatus || '').replace(/[^\w]/g, '').toLowerCase();
                if (!pStatus.includes(cleanStatus)) return false;
            }
            if (gf.paymentStatus && gf.paymentStatus !== 'all') {
                if (gf.paymentStatus === 'Pending' && !(p.pendingPaymentNumeric > 0 || (p.pendingPaymentFormatted && !p.pendingPaymentFormatted.includes('All Clear')))) return false;
                if (gf.paymentStatus === 'Paid' && !(p.pendingPaymentNumeric === 0 || (p.pendingPaymentFormatted && p.pendingPaymentFormatted.includes('All Clear')))) return false;
            }
            if (gf.dateFrom) {
                const pDate = (p.createdDate || '').substring(0, 10);
                if (pDate && pDate < gf.dateFrom) return false;
            }
            if (gf.dateTo) {
                const pDate = (p.createdDate || '').substring(0, 10);
                if (pDate && pDate > gf.dateTo) return false;
            }
            return true;
        });

        // 4. Products
        const allProducts = (window.DisicureData && window.DisicureData.getAllProducts()) || [];
        const products = allProducts.filter(p => {
            if (gq) {
                const matchesGq = 
                    (p.name && p.name.toLowerCase().includes(gq)) ||
                    (p.composition && p.composition.toLowerCase().includes(gq)) ||
                    (p.therapeuticCategory && p.therapeuticCategory.toLowerCase().includes(gq)) ||
                    (p.packaging && p.packaging.toLowerCase().includes(gq)) ||
                    (p.details && p.details.toLowerCase().includes(gq)) ||
                    (p.category && p.category.toLowerCase().includes(gq)) ||
                    (p.id && p.id.toLowerCase().includes(gq));
                if (!matchesGq) return false;
            }
            if (gf.name && !(p.name && p.name.toLowerCase().includes(gf.name.toLowerCase().trim()))) return false;
            if (gf.product && !((p.name && p.name.toLowerCase().includes(gf.product.toLowerCase().trim())) || (p.composition && p.composition.toLowerCase().includes(gf.product.toLowerCase().trim())) || (p.category && p.category.toLowerCase().includes(gf.product.toLowerCase().trim())))) return false;
            if (gf.leadStatus && gf.leadStatus !== 'all') {
                const cleanStatus = gf.leadStatus.replace(/[^\w]/g, '').toLowerCase();
                const pStatus = (p.status || '').replace(/[^\w]/g, '').toLowerCase();
                if (!pStatus.includes(cleanStatus)) return false;
            }
            return true;
        });

        // 5. Payments
        const allPayments = (window.DisicurePayments && window.DisicurePayments.getAllPayments()) || [];
        const payments = allPayments.filter(pay => {
            if (gq) {
                const matchesGq = 
                    (pay.clientName && pay.clientName.toLowerCase().includes(gq)) ||
                    (pay.invoiceId && pay.invoiceId.toLowerCase().includes(gq)) ||
                    (pay.paymentId && pay.paymentId.toLowerCase().includes(gq)) ||
                    (pay.notes && pay.notes.toLowerCase().includes(gq)) ||
                    (pay.productOrService && pay.productOrService.toLowerCase().includes(gq)) ||
                    (pay.paymentStatus && pay.paymentStatus.toLowerCase().includes(gq));
                if (!matchesGq) return false;
            }
            if (gf.name && !(pay.clientName && pay.clientName.toLowerCase().includes(gf.name.toLowerCase().trim()))) return false;
            if (gf.mobile && !(pay.mobile && pay.mobile.includes(gf.mobile.trim()))) return false;
            if (gf.company && !((pay.clientName && pay.clientName.toLowerCase().includes(gf.company.toLowerCase().trim())) || (pay.companyName && pay.companyName.toLowerCase().includes(gf.company.toLowerCase().trim())))) return false;
            if (gf.city && !(pay.city && pay.city.toLowerCase().includes(gf.city.toLowerCase().trim()))) return false;
            if (gf.product && !((pay.productOrService && pay.productOrService.toLowerCase().includes(gf.product.toLowerCase().trim())) || (pay.notes && pay.notes.toLowerCase().includes(gf.product.toLowerCase().trim())))) return false;
            if (gf.partner && !((pay.partnerName && pay.partnerName.toLowerCase().includes(gf.partner.toLowerCase().trim())) || (pay.clientName && pay.clientName.toLowerCase().includes(gf.partner.toLowerCase().trim())))) return false;
            if (gf.paymentStatus && gf.paymentStatus !== 'all') {
                if (gf.paymentStatus === 'high_value') {
                    const amt = pay.amountNumeric || pay.amount || 0;
                    if (amt < 500000) return false;
                } else if (pay.paymentStatus !== gf.paymentStatus) {
                    return false;
                }
            }
            if (gf.dateFrom) {
                const pDate = (pay.paymentDate || pay.date || '').substring(0, 10);
                if (pDate && pDate < gf.dateFrom) return false;
            }
            if (gf.dateTo) {
                const pDate = (pay.paymentDate || pay.date || '').substring(0, 10);
                if (pDate && pDate > gf.dateTo) return false;
            }
            return true;
        });

        const total = leads.length + clients.length + partners.length + products.length + payments.length;
        return { total, leads, clients, partners, products, payments };
    },

    renderGlobalSearchResults: function() {
        const flyout = document.getElementById('global-search-flyout');
        if (!flyout) return;

        const matches = this.getGlobalFilterMatches();
        const query = (this.globalSearchState.globalQuery || '').trim();
        const activeFilterCount = this.getActiveFilterCount();

        if (!query && activeFilterCount === 0) {
            flyout.innerHTML = `
            <div class="p-5 text-center space-y-3">
                <div class="w-10 h-10 rounded-full bg-blue-950 border border-blue-500/40 text-cyan-400 flex items-center justify-center mx-auto text-base">
                    🔎
                </div>
                <h4 class="text-sm font-extrabold text-white">Global Search & 9-Point ERP Filter Engine</h4>
                <p class="text-xs text-blue-200/70 max-w-md mx-auto">
                    Type a keyword above to search instantly across <strong>Leads, Clients, Partners, Products, and Invoices</strong>, or select a Quick Preset.
                </p>
                <div class="flex items-center justify-center gap-2 pt-2 text-[11px] font-bold">
                    <button onclick="window.DisicureMain.applyFilterPreset('new_leads')" class="px-3 py-1.5 rounded-lg bg-blue-600/30 hover:bg-blue-600 text-blue-200 hover:text-white border border-blue-500/40 transition-colors">🟢 New Leads</button>
                    <button onclick="window.DisicureMain.applyFilterPreset('pending_payments')" class="px-3 py-1.5 rounded-lg bg-amber-600/30 hover:bg-amber-600 text-amber-200 hover:text-white border border-amber-500/40 transition-colors">💰 Pending Payments</button>
                    <button onclick="window.DisicureMain.applyFilterPreset('hospital_clients')" class="px-3 py-1.5 rounded-lg bg-rose-600/30 hover:bg-rose-600 text-rose-200 hover:text-white border border-rose-500/40 transition-colors">🏥 Hospital Clients</button>
                </div>
            </div>
            `;
            return;
        }

        if (matches.total === 0) {
            flyout.innerHTML = `
            <div class="p-6 text-center space-y-3">
                <div class="w-10 h-10 rounded-full bg-rose-950 border border-rose-500/40 text-rose-400 flex items-center justify-center mx-auto text-base">
                    ✕
                </div>
                <h4 class="text-sm font-extrabold text-white">No Matching Records Found</h4>
                <p class="text-xs text-blue-200/70 max-w-sm mx-auto">
                    No results matched your search <em>"${query || 'active filters'}"</em> across Leads, Clients, Partners, Products, or Invoices.
                </p>
                <div class="pt-2">
                    <button onclick="window.DisicureMain.resetAllGlobalFilters()" class="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold transition-colors">
                        Reset All Filters
                    </button>
                </div>
            </div>
            `;
            return;
        }

        let html = `
        <div class="p-3 border-b border-blue-800/80 bg-[#051124] flex items-center justify-between text-xs">
            <span class="font-extrabold text-cyan-300">Found ${matches.total} matching records across ERP</span>
            <span class="text-[10px] text-gray-400">Click any record to jump directly</span>
        </div>
        <div class="overflow-y-auto max-h-[380px] divide-y divide-blue-900/40 p-2 space-y-3">
        `;

        // 1. Leads Group
        if (matches.leads.length > 0) {
            html += `
            <div>
                <div class="text-[10px] font-extrabold text-cyan-400 uppercase tracking-wider px-2 py-1 flex items-center justify-between">
                    <span>📋 Leads & Enquiries (${matches.leads.length})</span>
                    <button onclick="window.DisicureMain.switchAdminTab('tab-leads'); window.DisicureMain.closeGlobalSearchFlyout();" class="text-blue-300 hover:text-white hover:underline text-[10px] font-bold">View All &rarr;</button>
                </div>
                <div class="space-y-1 mt-1">
                    ${matches.leads.slice(0, 4).map(l => `
                    <div onclick="window.DisicureMain.jumpToSearchResult('lead', '${l.leadId}', 'tab-leads')" class="p-2.5 rounded-xl hover:bg-blue-950/70 cursor-pointer transition-colors flex items-center justify-between gap-3 text-xs border border-transparent hover:border-blue-600/40">
                        <div class="space-y-0.5">
                            <div class="font-bold text-white flex items-center gap-2">
                                <span>${l.name}</span>
                                <span class="text-[10px] font-mono font-bold text-cyan-300 px-1.5 py-0.2 bg-blue-900/60 rounded">${l.leadId}</span>
                                <span class="text-[10px] px-2 py-0.5 rounded font-bold ${l.leadStatus.includes('New') ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40' : 'bg-blue-950 text-blue-300 border border-blue-500/40'}">${l.leadStatus}</span>
                            </div>
                            <div class="text-[11px] text-blue-200/80 flex items-center gap-3">
                                <span>📱 ${l.mobile}</span>
                                <span>📍 ${l.city}, ${l.state}</span>
                                <span class="text-amber-300 font-medium truncate max-w-xs">📦 ${l.productOrService}</span>
                            </div>
                        </div>
                        <div class="shrink-0">
                            <span class="px-2.5 py-1 bg-blue-600 text-white rounded-lg text-[10px] font-bold shadow-sm">Open LMS &rarr;</span>
                        </div>
                    </div>
                    `).join('')}
                </div>
            </div>
            `;
        }

        // 2. Clients Group
        if (matches.clients.length > 0) {
            html += `
            <div class="pt-2">
                <div class="text-[10px] font-extrabold text-indigo-400 uppercase tracking-wider px-2 py-1 flex items-center justify-between">
                    <span>🏢 Clients & Customers (${matches.clients.length})</span>
                    <button onclick="window.DisicureMain.switchAdminTab('tab-clients'); window.DisicureMain.closeGlobalSearchFlyout();" class="text-indigo-300 hover:text-white hover:underline text-[10px] font-bold">View All &rarr;</button>
                </div>
                <div class="space-y-1 mt-1">
                    ${matches.clients.slice(0, 3).map(c => `
                    <div onclick="window.DisicureMain.jumpToSearchResult('client', '${c.id}', 'tab-clients')" class="p-2.5 rounded-xl hover:bg-blue-950/70 cursor-pointer transition-colors flex items-center justify-between gap-3 text-xs border border-transparent hover:border-indigo-600/40">
                        <div class="space-y-0.5">
                            <div class="font-bold text-white flex items-center gap-2">
                                <span>${c.companyName}</span>
                                <span class="text-[10px] font-mono font-bold text-indigo-300 px-1.5 py-0.2 bg-indigo-900/60 rounded">${c.id}</span>
                                <span class="text-[10px] px-2 py-0.5 rounded font-bold bg-indigo-950 text-indigo-300 border border-indigo-500/40">${c.accountStatus}</span>
                            </div>
                            <div class="text-[11px] text-blue-200/80 flex items-center gap-3">
                                <span>👤 ${c.contactPerson}</span>
                                <span>📱 ${c.mobile}</span>
                                <span>📍 ${c.location?.city || ''}</span>
                            </div>
                        </div>
                        <div class="shrink-0">
                            <span class="px-2.5 py-1 bg-indigo-600 text-white rounded-lg text-[10px] font-bold shadow-sm">View 360° Profile &rarr;</span>
                        </div>
                    </div>
                    `).join('')}
                </div>
            </div>
            `;
        }

        // 3. Partners Group
        if (matches.partners.length > 0) {
            html += `
            <div class="pt-2">
                <div class="text-[10px] font-extrabold text-purple-400 uppercase tracking-wider px-2 py-1 flex items-center justify-between">
                    <span>🤝 Active Partners (${matches.partners.length})</span>
                    <button onclick="window.DisicureMain.switchAdminTab('tab-partners'); window.DisicureMain.closeGlobalSearchFlyout();" class="text-purple-300 hover:text-white hover:underline text-[10px] font-bold">View All &rarr;</button>
                </div>
                <div class="space-y-1 mt-1">
                    ${matches.partners.slice(0, 3).map(p => `
                    <div onclick="window.DisicureMain.jumpToSearchResult('partner', '${p.partnerId}', 'tab-partners')" class="p-2.5 rounded-xl hover:bg-blue-950/70 cursor-pointer transition-colors flex items-center justify-between gap-3 text-xs border border-transparent hover:border-purple-600/40">
                        <div class="space-y-0.5">
                            <div class="font-bold text-white flex items-center gap-2">
                                <span>${p.companyName}</span>
                                <span class="text-[10px] font-mono font-bold text-purple-300 px-1.5 py-0.2 bg-purple-900/60 rounded">${p.partnerId}</span>
                                <span class="text-[10px] px-2 py-0.5 rounded font-bold bg-purple-950 text-purple-300 border border-purple-500/40">${p.partnerType}</span>
                            </div>
                            <div class="text-[11px] text-blue-200/80 flex items-center gap-3">
                                <span>👤 ${p.contactPerson}</span>
                                <span>📱 ${p.mobile}</span>
                                <span>📍 ${p.city}</span>
                            </div>
                        </div>
                        <div class="shrink-0">
                            <span class="px-2.5 py-1 bg-purple-600 text-white rounded-lg text-[10px] font-bold shadow-sm">Manage Partner &rarr;</span>
                        </div>
                    </div>
                    `).join('')}
                </div>
            </div>
            `;
        }

        // 4. Products Group
        if (matches.products.length > 0) {
            html += `
            <div class="pt-2">
                <div class="text-[10px] font-extrabold text-emerald-400 uppercase tracking-wider px-2 py-1 flex items-center justify-between">
                    <span>💊 Formulations & Catalog (${matches.products.length})</span>
                    <button onclick="window.DisicureMain.switchAdminTab('tab-products'); window.DisicureMain.closeGlobalSearchFlyout();" class="text-emerald-300 hover:text-white hover:underline text-[10px] font-bold">View All &rarr;</button>
                </div>
                <div class="space-y-1 mt-1">
                    ${matches.products.slice(0, 3).map(prod => `
                    <div onclick="window.DisicureMain.jumpToSearchResult('product', '${prod.id}', 'tab-products')" class="p-2.5 rounded-xl hover:bg-blue-950/70 cursor-pointer transition-colors flex items-center justify-between gap-3 text-xs border border-transparent hover:border-emerald-600/40">
                        <div class="space-y-0.5">
                            <div class="font-bold text-white flex items-center gap-2">
                                <span>${prod.name}</span>
                                <span class="text-[10px] font-bold text-emerald-300 px-1.5 py-0.2 bg-emerald-900/60 rounded">${prod.dosageForm || prod.packaging}</span>
                            </div>
                            <div class="text-[11px] text-blue-200/80 truncate max-w-md">
                                <span>🔬 ${prod.composition}</span>
                            </div>
                        </div>
                        <div class="shrink-0">
                            <span class="px-2.5 py-1 bg-emerald-600 text-white rounded-lg text-[10px] font-bold shadow-sm">Edit Formulation &rarr;</span>
                        </div>
                    </div>
                    `).join('')}
                </div>
            </div>
            `;
        }

        // 5. Payments Group
        if (matches.payments.length > 0) {
            html += `
            <div class="pt-2">
                <div class="text-[10px] font-extrabold text-amber-400 uppercase tracking-wider px-2 py-1 flex items-center justify-between">
                    <span>💳 Payments & Invoices (${matches.payments.length})</span>
                    <button onclick="window.DisicureMain.switchAdminTab('tab-financials'); window.DisicureMain.closeGlobalSearchFlyout();" class="text-amber-300 hover:text-white hover:underline text-[10px] font-bold">View All &rarr;</button>
                </div>
                <div class="space-y-1 mt-1">
                    ${matches.payments.slice(0, 3).map(pay => `
                    <div onclick="window.DisicureMain.jumpToSearchResult('payment', '${pay.paymentId}', 'tab-financials')" class="p-2.5 rounded-xl hover:bg-blue-950/70 cursor-pointer transition-colors flex items-center justify-between gap-3 text-xs border border-transparent hover:border-amber-600/40">
                        <div class="space-y-0.5">
                            <div class="font-bold text-white flex items-center gap-2">
                                <span>${pay.clientName}</span>
                                <span class="text-[10px] font-mono font-bold text-amber-300 px-1.5 py-0.2 bg-amber-900/60 rounded">${pay.invoiceId}</span>
                                <span class="text-[10px] px-2 py-0.5 rounded font-bold ${pay.paymentStatus === 'Paid' ? 'bg-emerald-950 text-emerald-300' : 'bg-amber-950 text-amber-300'}">${pay.paymentStatus}</span>
                            </div>
                            <div class="text-[11px] text-blue-200/80 flex items-center gap-3">
                                <span>💰 ${pay.amountFormatted}</span>
                                <span>📅 ${pay.paymentDate || pay.date}</span>
                                <span>🏦 ${pay.paymentMode}</span>
                            </div>
                        </div>
                        <div class="shrink-0">
                            <span class="px-2.5 py-1 bg-amber-600 text-white rounded-lg text-[10px] font-bold shadow-sm">View Ledger &rarr;</span>
                        </div>
                    </div>
                    `).join('')}
                </div>
            </div>
            `;
        }

        html += `
        </div>
        <div class="p-2.5 bg-[#051124] border-t border-blue-800/80 text-center text-[10px] text-gray-400">
            Press <kbd class="px-1 py-0.5 bg-blue-950 text-blue-300 rounded">Esc</kbd> or click outside to close
        </div>
        `;

        flyout.innerHTML = html;
    },

    jumpToSearchResult: function(type, id, tabId) {
        this.closeGlobalSearchFlyout();
        if (tabId) this.switchAdminTab(tabId);

        setTimeout(() => {
            if (type === 'lead' && typeof this.openLeadDrawer === 'function') {
                this.openLeadDrawer(id);
            } else if (type === 'client' && typeof this.openClient360Modal === 'function') {
                this.openClient360Modal(id);
            } else if (type === 'partner' && typeof this.openEditPartnerModal === 'function') {
                this.openEditPartnerModal(id);
            } else if (type === 'product' && typeof this.openEditProductModal === 'function') {
                this.openEditProductModal(id);
            } else if (type === 'payment' && typeof this.openPaymentDrawer === 'function') {
                this.openPaymentDrawer(id);
            }
        }, 250);
    },

    renderAdminLeads: function() {
        if (!window.DisicureLeads) return;
        const allLeads = window.DisicureLeads.getAllLeads();

        // 1. Calculate and update dashboard analytics & charts
        this.renderDashboardAnalytics();

        // 2. Filter & Sort Leads for the LMS table with 9-Dimensional Multi-Filters
        const gf = this.globalSearchState;
        const total = allLeads.length;
        let filtered = allLeads.filter(lead => {
            // Global Query
            const gq = (gf.globalQuery || '').toLowerCase().trim();
            if (gq) {
                const matchesGq = 
                    (lead.name && lead.name.toLowerCase().includes(gq)) ||
                    (lead.leadId && lead.leadId.toLowerCase().includes(gq)) ||
                    (lead.mobile && lead.mobile.toLowerCase().includes(gq)) ||
                    (lead.whatsapp && lead.whatsapp.toLowerCase().includes(gq)) ||
                    (lead.email && lead.email.toLowerCase().includes(gq)) ||
                    (lead.city && lead.city.toLowerCase().includes(gq)) ||
                    (lead.state && lead.state.toLowerCase().includes(gq)) ||
                    (lead.productOrService && lead.productOrService.toLowerCase().includes(gq)) ||
                    (lead.businessType && lead.businessType.toLowerCase().includes(gq)) ||
                    (lead.source && lead.source.toLowerCase().includes(gq)) ||
                    (lead.assignedPerson && lead.assignedPerson.toLowerCase().includes(gq));
                if (!matchesGq) return false;
            }

            // 1. Name Filter
            if (gf.name && !(lead.name && lead.name.toLowerCase().includes(gf.name.toLowerCase().trim()))) return false;

            // 2. Mobile Filter
            if (gf.mobile && !((lead.mobile && lead.mobile.includes(gf.mobile.trim())) || (lead.whatsapp && lead.whatsapp.includes(gf.mobile.trim())))) return false;

            // 3. Company Filter
            if (gf.company && !((lead.name && lead.name.toLowerCase().includes(gf.company.toLowerCase().trim())) || (lead.businessType && lead.businessType.toLowerCase().includes(gf.company.toLowerCase().trim())))) return false;

            // 4. City Filter
            if (gf.city && !((lead.city && lead.city.toLowerCase().includes(gf.city.toLowerCase().trim())) || (lead.state && lead.state.toLowerCase().includes(gf.city.toLowerCase().trim())))) return false;

            // 5. Product Filter
            if (gf.product && !((lead.productOrService && lead.productOrService.toLowerCase().includes(gf.product.toLowerCase().trim())) || (lead.requirementType && lead.requirementType.toLowerCase().includes(gf.product.toLowerCase().trim())))) return false;

            // 6. Partner Filter
            if (gf.partner) {
                const pf = gf.partner.toLowerCase().trim();
                const matchesP = (lead.source && lead.source.toLowerCase().includes(pf)) ||
                    (lead.assignedPerson && lead.assignedPerson.toLowerCase().includes(pf)) ||
                    (lead.email && lead.email.toLowerCase().includes(pf)) ||
                    (lead.notes && lead.notes.toLowerCase().includes(pf)) ||
                    (lead.name && lead.name.toLowerCase().includes(pf)) ||
                    (lead.businessType && lead.businessType.toLowerCase().includes(pf));
                if (!matchesP) return false;
            }

            // 7. Lead Status Filter
            if (gf.leadStatus && gf.leadStatus !== 'all') {
                const cleanStatus = gf.leadStatus.replace(/[^\w]/g, '').toLowerCase();
                const leadCleanStatus = (lead.leadStatus || '').replace(/[^\w]/g, '').toLowerCase();
                if (leadCleanStatus !== cleanStatus && !leadCleanStatus.includes(cleanStatus)) return false;
            }

            // 8. Payment Status Filter
            if (gf.paymentStatus && gf.paymentStatus !== 'all') {
                if (gf.paymentStatus === 'high_value' && !(lead.value >= 500000)) return false;
            }

            // 9. Date Filter
            if (gf.dateFrom) {
                const lDate = (lead.createdDate || '').substring(0, 10);
                const lFollow = (lead.followUpDate || '');
                if (lDate < gf.dateFrom && (!lFollow || lFollow < gf.dateFrom)) return false;
            }
            if (gf.dateTo) {
                const lDate = (lead.createdDate || '').substring(0, 10);
                const lFollow = (lead.followUpDate || '');
                if (lDate > gf.dateTo && (!lFollow || lFollow > gf.dateTo)) return false;
            }

            // Local LMS Tab Filters
            const query = (this.lmsState.searchQuery || '').toLowerCase().trim();
            const matchesQuery = !query || 
                (lead.name && lead.name.toLowerCase().includes(query)) ||
                (lead.leadId && lead.leadId.toLowerCase().includes(query)) ||
                (lead.mobile && lead.mobile.toLowerCase().includes(query)) ||
                (lead.whatsapp && lead.whatsapp.toLowerCase().includes(query)) ||
                (lead.email && lead.email.toLowerCase().includes(query)) ||
                (lead.city && lead.city.toLowerCase().includes(query)) ||
                (lead.state && lead.state.toLowerCase().includes(query)) ||
                (lead.productOrService && lead.productOrService.toLowerCase().includes(query));

            const matchesStatus = this.lmsState.statusFilter === 'all' || lead.leadStatus === this.lmsState.statusFilter;
            const matchesBusiness = this.lmsState.businessFilter === 'all' || lead.businessType === this.lmsState.businessFilter;
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
                        ${[...new Set([...window.DisicureLeads.TEAM_MEMBERS, lead.assignedPerson].filter(Boolean))].map(m => `
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
                        <!-- Convert to Client -->
                        <button onclick="window.DisicureMain.convertLeadToClient('${lead.leadId}')" class="px-2 py-1 bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white rounded-md transition-colors text-[10px] font-bold flex items-center gap-1 border border-emerald-200" title="Convert Enquiry to Client Profile">
                            <span>🏢 Client</span>
                        </button>

                        <!-- Convert to Partner -->
                        <button onclick="window.DisicureMain.convertLeadToPartner('${lead.leadId}')" class="px-2 py-1 bg-purple-50 text-purple-700 hover:bg-purple-600 hover:text-white rounded-md transition-colors text-[10px] font-bold flex items-center gap-1 border border-purple-200" title="Onboard as Registered Partner">
                            <span>🤝 Partner</span>
                        </button>

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
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-4">
                <div>
                    <span class="text-xs font-bold text-blue-600 uppercase tracking-wider block">Website Enquiry Record</span>
                    <h3 class="text-xl font-extrabold text-navy-950">${lead.leadId} — ${lead.name}</h3>
                </div>
                <div class="flex items-center gap-2 flex-wrap">
                    <button type="button" onclick="window.DisicureMain.convertLeadToClient('${lead.leadId}')" class="px-3.5 py-1.5 bg-emerald-50 hover:bg-emerald-600 text-emerald-700 hover:text-white border border-emerald-200 rounded-lg text-xs font-bold transition-all flex items-center gap-1 shadow-sm">
                        <span>🏢 Convert to Client</span>
                    </button>
                    <button type="button" onclick="window.DisicureMain.convertLeadToPartner('${lead.leadId}')" class="px-3.5 py-1.5 bg-purple-50 hover:bg-purple-600 text-purple-700 hover:text-white border border-purple-200 rounded-lg text-xs font-bold transition-all flex items-center gap-1 shadow-sm">
                        <span>🤝 Convert to Partner</span>
                    </button>
                </div>
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
                            ${[...new Set([...window.DisicureLeads.TEAM_MEMBERS, lead.assignedPerson].filter(Boolean))].map(m => `
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

    // Convert Lead to Client Profile (Module 15)
    convertLeadToClient: function(leadId) {
        if (!window.DisicureLeads || !window.DisicureClients) return;
        const allLeads = window.DisicureLeads.getAllLeads();
        const lead = allLeads.find(l => l.leadId === leadId);
        if (!lead) return;

        // Create new Client
        const newClient = window.DisicureClients.addClient({
            companyName: lead.name.includes('Hospital') || lead.name.includes('Pharma') || lead.name.includes('Ltd') || lead.name.includes('Care') 
                ? lead.name 
                : `${lead.name} Enterprises`,
            contactPerson: lead.name,
            designation: 'Decision Maker / Proprietor',
            mobile: lead.mobile,
            whatsapp: lead.whatsapp || lead.mobile,
            email: lead.email || '',
            city: lead.city || 'Dehradun',
            state: lead.state || 'Uttarakhand',
            businessType: lead.businessType || 'Healthcare Distributor',
            accountStatus: 'Active Account',
            creditLimit: '₹10,00,000',
            creditDays: 30,
            requirements: [
                {
                    reqId: `REQ-${Date.now().toString().slice(-4)}`,
                    title: lead.requirementType || 'Product Procurement',
                    category: lead.productOrService || 'Pharmaceutical Formulations',
                    specifications: `Enquiry Details: ${lead.productOrService}. Initial notes: ${lead.notes || 'None'}`,
                    batchSize: 'Standard Initial Order',
                    status: 'Active Fulfillment',
                    targetDate: new Date().toISOString().split('T')[0],
                    budget: '₹5,00,000'
                }
            ],
            leads: [
                {
                    leadId: lead.leadId,
                    inquiryDate: lead.createdDate,
                    requirement: lead.requirementType,
                    status: 'Converted',
                    value: 500000,
                    valueFormatted: '₹5,00,000',
                    originPartner: lead.source || 'Website Enquiry Form'
                }
            ],
            notes: [
                {
                    noteId: `NOT-${Date.now()}`,
                    date: new Date().toISOString().replace('T', ' ').substring(0, 16),
                    author: 'LMS Conversion Engine',
                    tag: 'Lead Converted',
                    text: `Converted from Website Enquiry #${lead.leadId}. Original Source: ${lead.source}. Initial Requirements: ${lead.requirementType} - ${lead.productOrService}.`
                }
            ],
            communicationHistory: [
                {
                    commId: `COMM-${Date.now()}`,
                    type: 'System Note',
                    date: new Date().toISOString().replace('T', ' ').substring(0, 16),
                    contactPerson: lead.name,
                    summary: `Enquiry received via ${lead.source} and converted to active customer account.`,
                    nextAction: 'Assign dedicated account manager and dispatch initial proforma quotation.',
                    loggedBy: 'Admin'
                }
            ]
        });

        // Update Lead status and log note
        window.DisicureLeads.updateLead(leadId, {
            leadStatus: '🏆 Converted',
            notes: (lead.notes ? lead.notes + '\n\n' : '') + `[${new Date().toISOString().replace('T', ' ').substring(0, 16)}] Converted into Client Account: ${newClient.companyName} (${newClient.id}).`
        });

        this.closeLeadDrawer();
        this.renderAdminLeads();
        this.showToast('success', `Enquiry ${lead.leadId} successfully converted into Client: ${newClient.companyName}!`);
        
        // Open the newly created client's 360 profile
        setTimeout(() => {
            this.switchAdminTab('tab-clients');
            this.openClient360Modal(newClient.id);
        }, 600);
    },

    // Convert Lead to Partner Profile (Module 15)
    convertLeadToPartner: function(leadId) {
        if (!window.DisicureLeads || !window.DisicurePartner) return;
        const allLeads = window.DisicureLeads.getAllLeads();
        const lead = allLeads.find(l => l.leadId === leadId);
        if (!lead) return;

        // Determine partner type
        let pType = '🏢 Pharma Distributor';
        const bType = (lead.businessType || '').toLowerCase();
        if (bType.includes('franchise') || bType.includes('pcd')) pType = '🤝 PCD Pharma Franchise';
        else if (bType.includes('marketing') || bType.includes('agency')) pType = '📢 Marketing Partner / Agency';
        else if (bType.includes('freelance') || bType.includes('sales')) pType = '💼 Sales Partner / Freelancer';

        const newPartner = window.DisicurePartner.addPartner({
            companyName: lead.name.includes('Pharma') || lead.name.includes('Distributor') ? lead.name : `${lead.name} Healthcare & Distribution`,
            contactPerson: lead.name,
            partnerType: pType,
            mobile: lead.mobile,
            whatsapp: lead.whatsapp || lead.mobile,
            email: lead.email || `partner_${Date.now().toString().slice(-4)}@disicurecare.com`,
            city: lead.city || 'Dehradun',
            state: lead.state || 'Uttarakhand',
            defaultCommissionModel: 'percentage',
            defaultCommissionRate: 10,
            defaultCommissionLabel: '10% Revenue Share',
            accountStatus: '🟢 Active'
        });

        // Update Lead status and log note
        window.DisicureLeads.updateLead(leadId, {
            leadStatus: '🏆 Converted',
            notes: (lead.notes ? lead.notes + '\n\n' : '') + `[${new Date().toISOString().replace('T', ' ').substring(0, 16)}] Converted and onboarded as Partner: ${newPartner.companyName} (${newPartner.partnerId}).`
        });

        this.closeLeadDrawer();
        this.renderAdminLeads();
        this.showToast('success', `Enquiry ${lead.leadId} onboarded as Partner: ${newPartner.companyName}! (Login: ${newPartner.email} / partner123)`);

        // Switch to Partner Tab
        setTimeout(() => {
            this.switchAdminTab('tab-partners');
        }, 600);
    },

    // Export Leads to CSV / Excel (Module 15)
    exportLeadsCSV: function() {
        if (!window.DisicureLeads) return;
        window.DisicureLeads.exportToCSV();
        this.showToast('success', 'Enquiries & LMS ledger exported to CSV / Excel!');
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

        const newLead = window.DisicureLeads.addLead({
            ...data,
            source: data.source || 'Admin Manual Entry'
        });

        // Trigger Notification & Security Audit Log (Modules 18 & 19)
        if (window.DisicureNotifications) {
            window.DisicureNotifications.notifyNewLead(newLead);
        }
        if (window.DisicureSecurity && window.DisicureSecurity.logActivity) {
            window.DisicureSecurity.logActivity(
                'Manual Lead Created',
                'LEAD_ACTION',
                `New lead ${newLead.leadId} created for ${newLead.name} (${newLead.productOrService}).`,
                window.DisicureSecurity.getAdminSession() ? window.DisicureSecurity.getAdminSession().name : 'Admin'
            );
        }

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

        // Filter Payments with 9-Point Global Filters
        const gf = this.globalSearchState;
        const gq = (gf.globalQuery || '').toLowerCase().trim();
        const query = (this.pmsState.searchQuery || '').toLowerCase().trim();

        let filtered = allPayments.filter(pay => {
            if (gq) {
                const matchesGq = 
                    (pay.clientName && pay.clientName.toLowerCase().includes(gq)) ||
                    (pay.invoiceId && pay.invoiceId.toLowerCase().includes(gq)) ||
                    (pay.paymentId && pay.paymentId.toLowerCase().includes(gq)) ||
                    (pay.notes && pay.notes.toLowerCase().includes(gq)) ||
                    (pay.productOrService && pay.productOrService.toLowerCase().includes(gq)) ||
                    (pay.paymentStatus && pay.paymentStatus.toLowerCase().includes(gq));
                if (!matchesGq) return false;
            }

            // 1. Name Filter
            if (gf.name && !(pay.clientName && pay.clientName.toLowerCase().includes(gf.name.toLowerCase().trim()))) return false;

            // 2. Mobile Filter
            if (gf.mobile && !(pay.mobile && pay.mobile.includes(gf.mobile.trim()))) return false;

            // 3. Company Filter
            if (gf.company && !((pay.clientName && pay.clientName.toLowerCase().includes(gf.company.toLowerCase().trim())) || (pay.companyName && pay.companyName.toLowerCase().includes(gf.company.toLowerCase().trim())))) return false;

            // 4. City Filter
            if (gf.city && !(pay.city && pay.city.toLowerCase().includes(gf.city.toLowerCase().trim()))) return false;

            // 5. Product Filter
            if (gf.product && !((pay.productOrService && pay.productOrService.toLowerCase().includes(gf.product.toLowerCase().trim())) || (pay.notes && pay.notes.toLowerCase().includes(gf.product.toLowerCase().trim())))) return false;

            // 6. Partner Filter
            if (gf.partner && !((pay.partnerName && pay.partnerName.toLowerCase().includes(gf.partner.toLowerCase().trim())) || (pay.clientName && pay.clientName.toLowerCase().includes(gf.partner.toLowerCase().trim())))) return false;

            // 8. Payment Status Filter
            if (gf.paymentStatus && gf.paymentStatus !== 'all') {
                if (gf.paymentStatus === 'high_value') {
                    const amt = pay.amountNumeric || pay.amount || 0;
                    if (amt < 500000) return false;
                } else if (!pay.paymentStatus.toLowerCase().includes(gf.paymentStatus.toLowerCase())) {
                    return false;
                }
            }

            // 9. Date Filter
            if (gf.dateFrom) {
                const pDate = (pay.paymentDate || pay.date || '').substring(0, 10);
                if (pDate && pDate < gf.dateFrom) return false;
            }
            if (gf.dateTo) {
                const pDate = (pay.paymentDate || pay.date || '').substring(0, 10);
                if (pDate && pDate > gf.dateTo) return false;
            }

            // Local PMS Filter
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

        const newPay = window.DisicurePayments.addPayment(data);

        // Trigger Notification & Security Audit Log (Modules 18 & 19)
        if (window.DisicureNotifications) {
            window.DisicureNotifications.notifyPaymentUpdate(newPay);
        }
        if (window.DisicureSecurity && window.DisicureSecurity.logActivity) {
            window.DisicureSecurity.logActivity(
                'Commercial Payment Recorded',
                'PAYMENT_ACTION',
                `Recorded payment of ₹${Number(newPay.amountReceived || 0).toLocaleString('en-IN')} for ${newPay.clientName} (${newPay.invoiceId}).`,
                window.DisicureSecurity.getAdminSession() ? window.DisicureSecurity.getAdminSession().name : 'Admin'
            );
        }

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

        const newDoc = window.DisicureDocuments.addDocument({
            ...data,
            previewType: previewType,
            previewUrl: data.fileData || null,
            previewContent: `Document Title: ${data.title}\nCategory: ${data.category}\nTags: ${data.tags || 'General'}\nNotes: ${data.notes || 'Recorded via Disicure DMS.'}`
        });

        // Trigger Notification & Security Audit Log (Modules 18 & 19)
        if (window.DisicureNotifications) {
            window.DisicureNotifications.notifyNewDocument(newDoc);
        }
        if (window.DisicureSecurity && window.DisicureSecurity.logActivity) {
            window.DisicureSecurity.logActivity(
                'Document Uploaded to Vault',
                'CATALOG_UPDATE',
                `Uploaded "${newDoc.title}" to category ${newDoc.category}.`,
                window.DisicureSecurity.getAdminSession() ? window.DisicureSecurity.getAdminSession().name : 'Admin'
            );
        }

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

        const kpi = window.DisicurePartner.getPartnerSummaryKPIs(session.partnerId);
        const leads = window.DisicurePartner.getPartnerLeads(session.partnerId);
        const followups = window.DisicurePartner.getPartnerFollowups(session.partnerId);
        const orders = window.DisicurePartner.getPartnerOrders(session.partnerId);
        const docs = window.DisicurePartner.getPartnerSharedDocuments(session.partnerId);

        // Helper to update text safely
        const setElText = (id, val) => {
            const el = document.getElementById(id);
            if (el) el.innerText = val;
        };

        // Update Top Summary KPI Cards
        setElText('prt-kpi-leads', `${kpi.leadsGenerated} Leads`);
        setElText('prt-kpi-converted', `${kpi.leadsConverted} Deals`);
        setElText('prt-kpi-business', kpi.businessGenerated);
        setElText('prt-kpi-commission', kpi.commissionEarned);
        setElText('prt-kpi-received', kpi.paymentReceived);
        setElText('prt-kpi-pending', kpi.pendingPayment);

        // Update Module 11 Funnel Specific KPIs
        setElText('prt-fn-generated', kpi.leadsGenerated);
        setElText('prt-fn-contacted', kpi.contactedLeads || 0);
        setElText('prt-fn-qualified', kpi.qualifiedLeads || 0);
        setElText('prt-fn-converted', kpi.leadsConverted || 0);
        setElText('prt-fn-business', kpi.businessGenerated);
        setElText('prt-fn-commission', kpi.commissionEarned);
        setElText('prt-fn-paid', kpi.paymentReceived);
        setElText('prt-fn-pending', kpi.pendingPayment);
        setElText('prt-funnel-pipeline-val', kpi.totalPipelineValue || '₹0');

        // Update Module 12 Financials & Earnings KPIs
        setElText('prt-fin-kpi-biz', kpi.businessGenerated);
        setElText('prt-fin-kpi-approved', kpi.approvedEarnings || kpi.commissionEarned);
        setElText('prt-fin-kpi-pending', kpi.pendingApproval || '₹0');
        setElText('prt-fin-kpi-received', kpi.paymentReceived);
        setElText('prt-fin-kpi-due', kpi.pendingPayment);

        // Render Partner Earnings Ledger
        this.renderPartnerEarningsLedger(session.partnerId);

        // Status Badge Helper
        const getStatusBadge = (statusStr) => {
            if (!statusStr) return `<span class="px-2 py-0.5 rounded text-xs font-bold bg-gray-100 text-gray-700">🟢 New</span>`;
            let badgeStyle = 'bg-gray-100 text-gray-700 border-gray-200';
            if (statusStr.includes('New')) badgeStyle = 'bg-emerald-50 text-emerald-700 border-emerald-200';
            else if (statusStr.includes('Contacted')) badgeStyle = 'bg-blue-50 text-blue-700 border-blue-200';
            else if (statusStr.includes('Qualified') || statusStr.includes('Follow-up')) badgeStyle = 'bg-indigo-50 text-indigo-700 border-indigo-200';
            else if (statusStr.includes('Negotiation')) badgeStyle = 'bg-orange-50 text-orange-700 border-orange-200';
            else if (statusStr.includes('Converted')) badgeStyle = 'bg-purple-50 text-purple-700 border-purple-200';
            else if (statusStr.includes('Lost')) badgeStyle = 'bg-rose-50 text-rose-700 border-rose-200';
            else if (statusStr.includes('Hold')) badgeStyle = 'bg-gray-100 text-gray-700 border-gray-300';
            
            return `<span class="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${badgeStyle}">${statusStr}</span>`;
        };

        // 1. Overview Recent Leads Table
        const overviewLeadsTbody = document.getElementById('prt-overview-leads-tbody');
        if (overviewLeadsTbody) {
            if (leads.length === 0) {
                overviewLeadsTbody.innerHTML = `<tr><td colspan="3" class="p-4 text-center text-gray-400">No leads registered yet. Click "Register New Client Lead".</td></tr>`;
            } else {
                overviewLeadsTbody.innerHTML = leads.slice(0, 3).map(l => `
                    <tr class="border-b border-gray-100 hover:bg-slate-50">
                        <td class="p-2.5 font-bold text-navy-950">${l.clientName}<span class="block text-[10px] text-gray-400 font-normal">📍 ${l.city} • ${l.contactPerson}</span></td>
                        <td class="p-2.5 text-blue-700 font-medium truncate max-w-[140px]">${l.requirement}</td>
                        <td class="p-2.5">${getStatusBadge(l.leadStatus)}</td>
                    </tr>
                `).join('');
            }
        }

        // 2. Overview Upcoming Follow-ups Table
        const overviewFollowupsTbody = document.getElementById('prt-overview-followups-tbody');
        if (overviewFollowupsTbody) {
            if (followups.length === 0) {
                overviewFollowupsTbody.innerHTML = `<tr><td colspan="3" class="p-4 text-center text-gray-400">No upcoming follow-ups scheduled.</td></tr>`;
            } else {
                overviewFollowupsTbody.innerHTML = followups.slice(0, 3).map(f => `
                    <tr class="border-b border-gray-100 hover:bg-slate-50">
                        <td class="p-2.5 font-mono font-bold text-navy-950">${f.scheduledDate}<span class="block text-[10px] text-gray-400">${f.scheduledTime || ''}</span></td>
                        <td class="p-2.5 font-bold text-navy-950">${f.clientName}<span class="block text-[10px] text-indigo-700 font-medium">${f.actionType}</span></td>
                        <td class="p-2.5"><span class="px-2 py-0.5 rounded text-[10px] font-bold ${f.status.includes('Completed') ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}">${f.status}</span></td>
                    </tr>
                `).join('');
            }
        }

        // 3. Sub-Tab 2: Full Leads & Pipeline Table (Filtered strictly for this partner with 8-column lifecycle chain)
        const fullLeadsTbody = document.getElementById('prt-full-leads-tbody');
        if (fullLeadsTbody) {
            const query = this.prtLeadState.searchQuery;
            const statusFilt = this.prtLeadState.statusFilter;

            let filteredLeads = leads.filter(l => {
                const matchesQuery = !query || 
                    (l.clientName && l.clientName.toLowerCase().includes(query)) ||
                    (l.contactPerson && l.contactPerson.toLowerCase().includes(query)) ||
                    (l.city && l.city.toLowerCase().includes(query)) ||
                    (l.mobile && l.mobile.toLowerCase().includes(query)) ||
                    (l.requirement && l.requirement.toLowerCase().includes(query)) ||
                    (l.leadId && l.leadId.toLowerCase().includes(query));

                const matchesStatus = statusFilt === 'all' || l.leadStatus === statusFilt || (statusFilt === '🟡 Qualified' && (l.leadStatus.includes('Qualified') || l.leadStatus.includes('Follow-up')));
                return matchesQuery && matchesStatus;
            });

            if (filteredLeads.length === 0) {
                fullLeadsTbody.innerHTML = `<tr><td colspan="8" class="p-6 text-center text-gray-400">No leads match your filter or search query. Click "+ Register New Client Lead".</td></tr>`;
            } else {
                fullLeadsTbody.innerHTML = filteredLeads.map(l => {
                    const payStatusClass = l.paymentStatus && l.paymentStatus.includes('Paid') ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                                           l.paymentStatus && l.paymentStatus.includes('Partial') ? 'bg-amber-50 text-amber-700 border-amber-200' :
                                           l.paymentStatus && l.paymentStatus.includes('Pending') ? 'bg-rose-50 text-rose-700 border-rose-200' :
                                           'bg-gray-100 text-gray-600 border-gray-200';

                    return `
                    <tr class="border-b border-gray-100 hover:bg-blue-50/20 transition-colors">
                        <td class="p-3.5 font-mono font-bold text-purple-700 whitespace-nowrap">
                            ${l.leadId}
                            <span class="block text-[10px] text-gray-400 font-normal">📅 ${l.createdDate}</span>
                            <span class="block text-[10px] text-indigo-700 font-bold truncate max-w-[130px]">${l.partnerName || session.companyName}</span>
                        </td>
                        <td class="p-3.5">
                            <div class="font-extrabold text-navy-950">${l.clientName}</div>
                            <div class="text-[11px] text-gray-500 font-medium">👤 ${l.contactPerson} (${l.mobile})</div>
                            <div class="text-[10px] text-gray-400">📍 ${l.city}, ${l.state || ''}</div>
                        </td>
                        <td class="p-3.5">
                            <div class="text-xs text-navy-950 font-medium max-w-xs">${l.requirement}</div>
                            ${l.followUpDate ? `<span class="text-[10px] text-amber-800 font-bold block mt-0.5">📅 Next: ${l.followUpDate}</span>` : ''}
                        </td>
                        <td class="p-3.5 whitespace-nowrap">${getStatusBadge(l.leadStatus)}</td>
                        <td class="p-3.5 whitespace-nowrap">
                            <span class="font-extrabold text-navy-950 text-xs block">${l.businessValue || 'Under Eval'}</span>
                            <span class="text-[10px] text-gray-400 block">Gross Order</span>
                        </td>
                        <td class="p-3.5 whitespace-nowrap">
                            <span class="font-extrabold text-emerald-700 text-xs block">${l.commission || 'Calculating'}</span>
                            <span class="text-[10px] text-indigo-700 font-bold block">${l.commissionRate || '10%'} margin</span>
                        </td>
                        <td class="p-3.5 whitespace-nowrap">
                            <span class="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${payStatusClass}">${l.paymentStatus || '⚪ In Pipeline'}</span>
                            ${l.paymentRef && l.paymentRef !== 'N/A (Pipeline)' ? `<span class="block text-[10px] font-mono text-gray-500 mt-0.5">${l.paymentRef}</span>` : ''}
                        </td>
                        <td class="p-3.5 text-right whitespace-nowrap">
                            <button onclick="window.DisicureMain.openPartnerLeadLifecycleModal('${l.leadId}')" class="px-3 py-1.5 bg-blue-50 hover:bg-blue-600 hover:text-white text-blue-700 rounded-lg text-xs font-bold transition-all inline-flex items-center gap-1 shadow-sm">
                                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                                <span>View Chain</span>
                            </button>
                        </td>
                    </tr>
                    `;
                }).join('');
            }
        }

        // 4. Sub-Tab 3: Full Follow-ups Table
        const fullFollowupsTbody = document.getElementById('prt-full-followups-tbody');
        if (fullFollowupsTbody) {
            if (followups.length === 0) {
                fullFollowupsTbody.innerHTML = `<tr><td colspan="7" class="p-6 text-center text-gray-400">No client follow-ups recorded. Click "+ Schedule Follow-up".</td></tr>`;
            } else {
                fullFollowupsTbody.innerHTML = followups.map(f => `
                    <tr class="border-b border-gray-100 hover:bg-slate-50">
                        <td class="p-3.5 font-mono font-bold text-blue-700">${f.followupId}</td>
                        <td class="p-3.5">
                            <div class="font-bold text-navy-950">${f.clientName}</div>
                            <div class="text-[11px] text-gray-500">👤 ${f.contactPerson}</div>
                        </td>
                        <td class="p-3.5 font-mono text-xs">
                            <span class="font-bold text-navy-950">📅 ${f.scheduledDate}</span>
                            <span class="text-gray-400 block text-[10px]">${f.scheduledTime || ''}</span>
                        </td>
                        <td class="p-3.5">
                            <span class="inline-block px-2 py-0.5 rounded text-[11px] font-bold bg-blue-50 text-blue-800 border border-blue-100">
                                ${f.actionType}
                            </span>
                        </td>
                        <td class="p-3.5 text-xs text-gray-700 max-w-xs">${f.notes}</td>
                        <td class="p-3.5 whitespace-nowrap">
                            <span class="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold ${f.status.includes('Completed') ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'}">
                                ${f.status}
                            </span>
                        </td>
                        <td class="p-3.5 text-right whitespace-nowrap">
                            ${!f.status.includes('Completed') ? `
                                <button onclick="window.DisicureMain.completePartnerFollowup('${f.followupId}')" class="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-600 hover:text-white text-emerald-700 rounded text-[11px] font-bold transition-colors shadow-sm">
                                    ✓ Mark Done
                                </button>
                            ` : `<span class="text-[11px] text-emerald-600 font-bold">✓ Logged</span>`}
                        </td>
                    </tr>
                `).join('');
            }
        }

        // 5. Sub-Tab 4: Invoices & Payment Ledger
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

        // 6. Sub-Tab 5: Batch Orders Table
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

        // 7. Sub-Tab 6: Shared Documents Vault Grid (Isolated to current partner)
        const vaultGrid = document.getElementById('prt-vault-grid');
        if (vaultGrid) {
            if (docs.length === 0) {
                vaultGrid.innerHTML = `<div class="col-span-3 p-8 text-center bg-slate-50 rounded-2xl border border-gray-200 text-gray-400">No shared documents currently in your vault.</div>`;
            } else {
                vaultGrid.innerHTML = docs.map(d => {
                    const iconBg = d.fileType === 'XLSX' ? 'bg-emerald-50 text-emerald-600' :
                                   d.fileType === 'PDF' ? 'bg-rose-50 text-rose-600' :
                                   d.fileType === 'DOCX' ? 'bg-blue-50 text-blue-600' : 'bg-indigo-50 text-indigo-600';

                    return `
                    <div class="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4">
                        <div>
                            <div class="flex items-start justify-between gap-2">
                                <span class="w-10 h-10 rounded-xl ${iconBg} flex items-center justify-center font-extrabold text-xs">
                                    ${d.fileType}
                                </span>
                                <span class="text-[10px] font-bold text-gray-500 bg-slate-100 px-2 py-0.5 rounded">
                                    ${d.category}
                                </span>
                            </div>
                            <h4 class="text-sm font-extrabold text-navy-950 mt-3 break-all">${d.title}</h4>
                            <p class="text-xs text-gray-500 mt-1 line-clamp-2">${d.description || ''}</p>
                        </div>
                        <div class="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                            <span class="text-[11px] text-gray-400 font-medium">${d.fileSize} • ${d.uploadDate}</span>
                            <button onclick="alert('Downloading ${d.title} (Secure Verified Link)...')" class="px-3 py-1.5 bg-blue-50 hover:bg-blue-600 hover:text-white text-blue-700 rounded-lg text-xs font-bold transition-colors flex items-center gap-1">
                                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
                                <span>Download</span>
                            </button>
                        </div>
                    </div>
                    `;
                }).join('');
            }
        }
    },

    filterPartnerLeads: function() {
        const searchInput = document.getElementById('prt-lead-search');
        const statusFilter = document.getElementById('prt-lead-status-filter');
        if (searchInput) this.prtLeadState.searchQuery = searchInput.value.toLowerCase().trim();
        if (statusFilter) this.prtLeadState.statusFilter = statusFilter.value;
        this.renderPartnerDashboardData();
    },

    openPartnerFollowupModal: function() {
        const modal = document.getElementById('prt-followup-modal');
        if (modal) {
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            document.body.classList.add('overflow-hidden');
        }
    },

    closePartnerFollowupModal: function() {
        const modal = document.getElementById('prt-followup-modal');
        if (modal) {
            modal.classList.remove('flex');
            modal.classList.add('hidden');
            document.body.classList.remove('overflow-hidden');
            const form = document.getElementById('prt-new-followup-form');
            if (form) form.reset();
        }
    },

    savePartnerFollowup: function(event) {
        event.preventDefault();
        const form = document.getElementById('prt-new-followup-form');
        const session = window.DisicurePartner.getCurrentSession();
        if (!form || !session || !window.DisicurePartner) return;

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        window.DisicurePartner.addPartnerFollowup(session.partnerId, data);
        this.closePartnerFollowupModal();
        this.renderPartnerDashboardData();
        alert('Client follow-up touchpoint scheduled successfully.');
    },

    completePartnerFollowup: function(followupId) {
        const session = window.DisicurePartner.getCurrentSession();
        if (!session || !window.DisicurePartner) return;

        window.DisicurePartner.completePartnerFollowup(session.partnerId, followupId);
        this.renderPartnerDashboardData();
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

    calculateLeadAnticipatedCommission: function(val) {
        const previewEl = document.getElementById('prt-newlead-comm-preview');
        if (!previewEl) return;
        const session = window.DisicurePartner ? window.DisicurePartner.getCurrentSession() : null;
        const rate = session && session.commercialTerms && session.commercialTerms.includes('%') 
            ? (parseFloat(session.commercialTerms.match(/(\d+)%/)?.[1]) || 10) 
            : 10;
        
        const numVal = parseFloat(String(val).replace(/[^0-9.]/g, '')) || 0;
        const comm = Math.round((numVal * rate) / 100);
        previewEl.innerText = `₹${comm.toLocaleString('en-IN')}`;
    },

    openPartnerLeadLifecycleModal: function(leadId) {
        if (!window.DisicurePartner) return;
        const lead = window.DisicurePartner.getLeadById(leadId);
        if (!lead) return;

        const setElText = (id, val) => {
            const el = document.getElementById(id);
            if (el) el.innerText = val;
        };

        setElText('prt-lc-leadid', lead.leadId);
        setElText('prt-lc-createddate', `Registered: ${lead.createdDate}`);
        setElText('prt-lc-clientname', lead.clientName);
        setElText('prt-lc-contact', lead.contactPerson || 'N/A');
        setElText('prt-lc-mobile', lead.mobile || 'N/A');
        setElText('prt-lc-email', lead.email || 'N/A');
        setElText('prt-lc-location', `${lead.city || ''}, ${lead.state || ''}`);
        setElText('prt-lc-requirement', lead.requirement || 'N/A');
        setElText('prt-lc-status', lead.leadStatus || '🟢 New');
        setElText('prt-lc-bizvalue', lead.businessValue || (lead.businessValueNumeric ? `₹${lead.businessValueNumeric.toLocaleString('en-IN')}` : 'Under Evaluation'));
        setElText('prt-lc-rate', lead.commissionRate || '10%');
        setElText('prt-lc-commission', lead.commission || (lead.commissionNumeric ? `₹${lead.commissionNumeric.toLocaleString('en-IN')}` : 'Calculating'));
        setElText('prt-lc-paystatus', lead.paymentStatus || '⚪ In Pipeline');
        setElText('prt-lc-paid', lead.paidFormatted || (lead.paidNumeric ? `₹${lead.paidNumeric.toLocaleString('en-IN')}` : '₹0'));
        setElText('prt-lc-pending', lead.pendingFormatted || (lead.pendingNumeric ? `₹${lead.pendingNumeric.toLocaleString('en-IN')}` : '₹0'));
        setElText('prt-lc-payref', lead.paymentRef || 'N/A (Pipeline)');

        // Render 8 Chain Badges
        const chainBadgesContainer = document.getElementById('prt-lc-chain-badges');
        if (chainBadgesContainer) {
            const isConverted = lead.leadStatus && lead.leadStatus.includes('Converted');
            const isNegotiation = isConverted || (lead.leadStatus && lead.leadStatus.includes('Negotiation'));
            const isQualified = isNegotiation || (lead.leadStatus && (lead.leadStatus.includes('Qualified') || lead.leadStatus.includes('Follow-up')));
            const isContacted = isQualified || (lead.leadStatus && lead.leadStatus.includes('Contacted'));
            const isPaid = lead.paymentStatus && lead.paymentStatus.includes('Paid');

            const steps = [
                { num: '1', title: 'Partner Attributed', active: true, val: lead.partnerName || 'Partner' },
                { num: '2', title: 'Lead Ingested', active: true, val: lead.leadId },
                { num: '3', title: 'Client Contacted', active: isContacted, val: isContacted ? 'Done' : 'Pending' },
                { num: '4', title: 'Requirement Qualified', active: isQualified, val: isQualified ? 'Qualified' : 'Pending' },
                { num: '5', title: 'Negotiation Closed', active: isNegotiation, val: isNegotiation ? 'Agreed' : 'In Review' },
                { num: '6', title: 'Business Value Locked', active: isConverted, val: lead.businessValue || '₹0' },
                { num: '7', title: 'Commission Earned', active: isConverted, val: lead.commission || '₹0' },
                { num: '8', title: 'Payment Settlement', active: isPaid, val: isPaid ? 'Paid' : (lead.paymentStatus || 'Pending') }
            ];

            chainBadgesContainer.innerHTML = steps.map(s => `
                <div class="p-2.5 rounded-xl border ${s.active ? 'bg-blue-600/30 border-blue-400 text-white' : 'bg-white/5 border-white/10 text-gray-400'}">
                    <span class="text-[10px] font-bold block opacity-80">${s.num}. ${s.title}</span>
                    <span class="text-xs font-extrabold mt-0.5 block truncate ${s.active ? 'text-emerald-300' : 'text-gray-500'}">${s.val}</span>
                </div>
            `).join('');
        }

        // Render Lifecycle Audit Progression Stepper
        const timelineContainer = document.getElementById('prt-lc-stages-timeline');
        if (timelineContainer) {
            const stages = lead.lifecycleStages && lead.lifecycleStages.length > 0 ? lead.lifecycleStages : [
                { stage: 'Partner Attributed', timestamp: lead.createdDate, detail: `${lead.partnerName || 'Partner'}` },
                { stage: 'Lead Registered', timestamp: lead.createdDate, detail: `${lead.leadId} created for ${lead.clientName}` }
            ];

            timelineContainer.innerHTML = stages.map(st => `
                <div class="relative group">
                    <div class="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-blue-600 border-2 border-white shadow"></div>
                    <div class="flex items-center justify-between">
                        <span class="font-extrabold text-navy-950 text-xs">${st.stage}</span>
                        <span class="text-[10px] font-mono text-gray-400">${st.timestamp}</span>
                    </div>
                    <p class="text-[11px] text-gray-600 mt-0.5 font-medium">${st.detail}</p>
                </div>
            `).join('');
        }

        const modal = document.getElementById('prt-lead-lifecycle-modal');
        if (modal) {
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            document.body.classList.add('overflow-hidden');
        }
    },

    closePartnerLeadLifecycleModal: function() {
        const modal = document.getElementById('prt-lead-lifecycle-modal');
        if (modal) {
            modal.classList.remove('flex');
            modal.classList.add('hidden');
            document.body.classList.remove('overflow-hidden');
        }
    },

    savePartnerLead: function(event) {
        event.preventDefault();
        const form = document.getElementById('prt-new-lead-form');
        const session = window.DisicurePartner.getCurrentSession();
        if (!form || !session || !window.DisicurePartner) return;

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        window.DisicurePartner.addPartnerLead(session.partnerId, data);
        this.closePartnerLeadModal();
        this.renderPartnerDashboardData();
        alert('Lead registered in Master LMS with complete lifecycle chain. Commission tracking active.');
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

        // Filter Partners with 9-Point Global Filters
        const gf = this.globalSearchState;
        const gq = (gf.globalQuery || '').toLowerCase().trim();
        const query = (this.admPartnerState.searchQuery || '').toLowerCase().trim();

        let filtered = allPartners.filter(p => {
            if (gq) {
                const matchesGq = 
                    (p.companyName && p.companyName.toLowerCase().includes(gq)) ||
                    (p.contactPerson && p.contactPerson.toLowerCase().includes(gq)) ||
                    (p.partnerType && p.partnerType.toLowerCase().includes(gq)) ||
                    (p.email && p.email.toLowerCase().includes(gq)) ||
                    (p.mobile && p.mobile.toLowerCase().includes(gq)) ||
                    (p.city && p.city.toLowerCase().includes(gq)) ||
                    (p.state && p.state.toLowerCase().includes(gq)) ||
                    (p.assignedTerritory && p.assignedTerritory.toLowerCase().includes(gq)) ||
                    (p.partnerId && p.partnerId.toLowerCase().includes(gq));
                if (!matchesGq) return false;
            }

            // 1. Name Filter
            if (gf.name && !((p.contactPerson && p.contactPerson.toLowerCase().includes(gf.name.toLowerCase().trim())) || (p.companyName && p.companyName.toLowerCase().includes(gf.name.toLowerCase().trim())))) return false;

            // 2. Mobile Filter
            if (gf.mobile && !((p.mobile && p.mobile.includes(gf.mobile.trim())) || (p.whatsapp && p.whatsapp.includes(gf.mobile.trim())))) return false;

            // 3. Company Filter
            if (gf.company && !(p.companyName && p.companyName.toLowerCase().includes(gf.company.toLowerCase().trim()))) return false;

            // 4. City Filter
            if (gf.city && !((p.city && p.city.toLowerCase().includes(gf.city.toLowerCase().trim())) || (p.state && p.state.toLowerCase().includes(gf.city.toLowerCase().trim())) || (p.assignedTerritory && p.assignedTerritory.toLowerCase().includes(gf.city.toLowerCase().trim())))) return false;

            // 5. Product Filter
            if (gf.product && !((p.assignedTerritory && p.assignedTerritory.toLowerCase().includes(gf.product.toLowerCase().trim())) || (p.commercialTerms && p.commercialTerms.toLowerCase().includes(gf.product.toLowerCase().trim())))) return false;

            // 6. Partner Filter
            if (gf.partner && !((p.companyName && p.companyName.toLowerCase().includes(gf.partner.toLowerCase().trim())) || (p.partnerType && p.partnerType.toLowerCase().includes(gf.partner.toLowerCase().trim())) || (p.partnerId && p.partnerId.toLowerCase().includes(gf.partner.toLowerCase().trim())))) return false;

            // 7. Lead / Account Status Filter
            if (gf.leadStatus && gf.leadStatus !== 'all') {
                const cleanStatus = gf.leadStatus.replace(/[^\w]/g, '').toLowerCase();
                const pStatus = (p.accountStatus || '').replace(/[^\w]/g, '').toLowerCase();
                if (!pStatus.includes(cleanStatus)) return false;
            }

            // 8. Payment Status Filter
            if (gf.paymentStatus && gf.paymentStatus !== 'all') {
                if (gf.paymentStatus === 'Pending' && !(p.pendingPaymentNumeric > 0 || (p.pendingPaymentFormatted && !p.pendingPaymentFormatted.includes('All Clear')))) return false;
                if (gf.paymentStatus === 'Paid' && !(p.pendingPaymentNumeric === 0 || (p.pendingPaymentFormatted && p.pendingPaymentFormatted.includes('All Clear')))) return false;
            }

            // 9. Date Filter
            if (gf.dateFrom) {
                const pDate = (p.createdDate || '').substring(0, 10);
                if (pDate && pDate < gf.dateFrom) return false;
            }
            if (gf.dateTo) {
                const pDate = (p.createdDate || '').substring(0, 10);
                if (pDate && pDate > gf.dateTo) return false;
            }

            // Local Partner Filters
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
                    <div class="font-extrabold text-navy-950">${p.businessGeneratedFormatted || p.totalBusinessValue || '₹0'}</div>
                    <span class="text-[10px] text-blue-600 font-bold block mt-0.5">${p.activeOrdersCount || p.leadsGeneratedCount || 0} Batches / Leads</span>
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

        const newPartner = window.DisicurePartner.addPartner(data);

        // Trigger Notification & Security Audit Log (Modules 18 & 19)
        if (window.DisicureNotifications) {
            window.DisicureNotifications.notifyNewPartner(newPartner);
        }
        if (window.DisicureSecurity && window.DisicureSecurity.logActivity) {
            window.DisicureSecurity.logActivity(
                'Partner Account Provisioned',
                'PARTNER_ISOLATION',
                `New partner ${newPartner.companyName} (${newPartner.partnerType}) provisioned for ${newPartner.assignedTerritory || 'Distribution'}.`,
                window.DisicureSecurity.getAdminSession() ? window.DisicureSecurity.getAdminSession().name : 'Admin',
                'SECURITY'
            );
        }

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
    },

    // =========================================================================
    // --- MODULE 12: PARTNER COMMISSION & EARNINGS MANAGEMENT CONTROLLER ---
    // =========================================================================
    admCommState: {
        searchQuery: '',
        statusFilter: 'all'
    },

    currentCommLead: null,

    renderAdminCommissionsTable: function() {
        if (!window.DisicurePartner) return;
        const commissions = window.DisicurePartner.getAllCommissions();

        let totalAccrued = 0;
        let approvedAccrued = 0;
        let pendingAccrued = 0;
        let disbursedAccrued = 0;

        commissions.forEach(c => {
            const amt = parseFloat(c.commissionNumeric) || 0;
            totalAccrued += amt;
            if (c.approvalStatus && (c.approvalStatus.includes('Approved') || c.approvalStatus.includes('Disbursed'))) {
                approvedAccrued += amt;
            } else if (c.approvalStatus && c.approvalStatus.includes('Pending')) {
                pendingAccrued += amt;
            }
            if (c.paymentStatus && c.paymentStatus.includes('Paid')) {
                disbursedAccrued += (parseFloat(c.paidNumeric) || amt);
            } else if (c.paidNumeric) {
                disbursedAccrued += parseFloat(c.paidNumeric) || 0;
            }
        });

        // Update KPI summary cards
        const setEl = (id, val) => {
            const el = document.getElementById(id);
            if (el) el.innerText = val;
        };
        setEl('adm-comm-kpi-total', `₹${totalAccrued.toLocaleString('en-IN')}`);
        setEl('adm-comm-kpi-approved', `₹${approvedAccrued.toLocaleString('en-IN')}`);
        setEl('adm-comm-kpi-pending', `₹${pendingAccrued.toLocaleString('en-IN')}`);
        setEl('adm-comm-kpi-disbursed', `₹${disbursedAccrued.toLocaleString('en-IN')}`);

        // Filter Commission Records
        const q = (this.admCommState.searchQuery || '').toLowerCase();
        const stat = this.admCommState.statusFilter;

        const filtered = commissions.filter(c => {
            const matchesQ = !q || 
                (c.leadId && c.leadId.toLowerCase().includes(q)) ||
                (c.partnerName && c.partnerName.toLowerCase().includes(q)) ||
                (c.clientName && c.clientName.toLowerCase().includes(q)) ||
                (c.commissionModel && c.commissionModel.toLowerCase().includes(q));

            const matchesStat = stat === 'all' || (c.approvalStatus && c.approvalStatus.includes(stat));

            return matchesQ && matchesStat;
        });

        const tbody = document.getElementById('adm-commission-tbody');
        if (!tbody) return;

        if (filtered.length === 0) {
            tbody.innerHTML = `<tr><td colspan="9" class="p-8 text-center text-gray-400">No partner commission records found matching your filters.</td></tr>`;
            return;
        }

        tbody.innerHTML = filtered.map(c => {
            const modelBadge = c.commissionModel === 'fixed' 
                ? '<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">🏷️ Fixed Commission</span>'
                : c.commissionModel === 'custom'
                ? '<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-800 border border-indigo-200">⚙️ Custom Earning</span>'
                : '<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-800 border border-blue-200">📊 Percentage (%)</span>';

            const approvalBadge = c.approvalStatus && (c.approvalStatus.includes('Approved') || c.approvalStatus.includes('Disbursed'))
                ? `<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">🟢 Approved</span>`
                : c.approvalStatus && c.approvalStatus.includes('Hold')
                ? `<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">🔴 On Hold</span>`
                : `<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">🟡 Pending Review</span>`;

            const paymentBadge = c.paymentStatus && c.paymentStatus.includes('Paid')
                ? `<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700">🟢 Paid</span>`
                : c.paymentStatus && c.paymentStatus.includes('Partial')
                ? `<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-700">🟡 Partial</span>`
                : `<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-gray-600">🔴 Unpaid</span>`;

            return `
            <tr class="border-b border-gray-100 hover:bg-slate-50 text-xs">
                <td class="p-3.5 font-mono font-bold text-blue-600">${c.leadId}</td>
                <td class="p-3.5 font-bold text-navy-950">${c.partnerName}</td>
                <td class="p-3.5">
                    <div class="font-bold text-gray-800">${c.clientName}</div>
                    <span class="text-[10px] text-gray-400 font-normal truncate block max-w-[150px]">${c.leadStatus}</span>
                </td>
                <td class="p-3.5 font-extrabold text-navy-950">${c.businessValue}</td>
                <td class="p-3.5 whitespace-nowrap">
                    ${modelBadge}
                    <span class="text-[10px] text-gray-500 block mt-0.5 font-medium">${c.commissionDetails}</span>
                </td>
                <td class="p-3.5 font-extrabold text-emerald-700">${c.commission}</td>
                <td class="p-3.5 whitespace-nowrap">
                    ${approvalBadge}
                    <span class="text-[10px] text-gray-400 block mt-0.5">${c.approvedBy ? c.approvedBy.split(' ')[0] : 'Admin'}</span>
                </td>
                <td class="p-3.5 whitespace-nowrap">
                    ${paymentBadge}
                    ${c.paidFormatted && c.paidFormatted !== '₹0' ? `<span class="text-[10px] text-emerald-700 font-bold block mt-0.5">${c.paidFormatted} cleared</span>` : ''}
                </td>
                <td class="p-3.5 text-right whitespace-nowrap">
                    <div class="flex items-center justify-end gap-1.5">
                        ${!c.approvalStatus || c.approvalStatus.includes('Pending') ? `
                            <button onclick="window.DisicureMain.quickApproveCommission('${c.leadId}')" class="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-[11px] font-bold shadow-sm transition-colors" title="1-Click Approve Commission">
                                ✓ Approve
                            </button>
                        ` : ''}
                        <button onclick="window.DisicureMain.openCommissionModal('${c.leadId}')" class="px-2.5 py-1 bg-blue-50 hover:bg-blue-600 hover:text-white text-blue-700 rounded text-[11px] font-bold transition-colors shadow-sm" title="Configure Commission Model, Rate, and Payment">
                            ✏️ Configure
                        </button>
                    </div>
                </td>
            </tr>
            `;
        }).join('');
    },

    filterCommissionTable: function() {
        const qInput = document.getElementById('adm-comm-search-input');
        const sSelect = document.getElementById('adm-comm-status-select');
        this.admCommState.searchQuery = qInput ? qInput.value.trim() : '';
        this.admCommState.statusFilter = sSelect ? sSelect.value : 'all';
        this.renderAdminCommissionsTable();
    },

    openCommissionModal: function(leadId) {
        if (!window.DisicurePartner) return;
        const lead = window.DisicurePartner.getLeadById(leadId);
        if (!lead) return;

        this.currentCommLead = lead;

        const setVal = (id, val) => {
            const el = document.getElementById(id);
            if (el) el.value = val;
        };
        const setText = (id, val) => {
            const el = document.getElementById(id);
            if (el) el.innerText = val;
        };

        setVal('adm-comm-leadid', lead.leadId);
        setText('adm-comm-disp-leadid', lead.leadId);
        setText('adm-comm-disp-partner', lead.partnerName || lead.partnerId);
        setText('adm-comm-disp-client', lead.clientName);
        setText('adm-comm-disp-bizval', lead.businessValue || `₹${(lead.businessValueNumeric || 0).toLocaleString('en-IN')}`);

        // Model selector radio check
        const model = lead.commissionModel || 'percentage';
        const radios = document.querySelectorAll('input[name="commModel"]');
        radios.forEach(r => {
            r.checked = (r.value === model);
        });
        this.onCommissionModelChange(model);

        // Inputs populate
        if (model === 'fixed') {
            setVal('adm-comm-fixed-input', lead.commissionNumeric || 35000);
        } else if (model === 'custom') {
            setVal('adm-comm-custom-amt-input', lead.commissionNumeric || 32000);
            setVal('adm-comm-custom-formula-input', lead.commissionDetails || 'Base + Volume Bonus');
        } else {
            // percentage
            const pctVal = parseFloat(String(lead.commissionRate || '10').replace(/[^0-9.]/g, '')) || 10;
            setVal('adm-comm-pct-input', pctVal);
        }

        setVal('adm-comm-approval-status', lead.approvalStatus || '🟢 Approved');
        setVal('adm-comm-approver-name', lead.approvedBy || 'Mr. Nishant Chaturvedi (Super Admin)');
        setVal('adm-comm-payment-status', lead.paymentStatus && lead.paymentStatus.includes('Paid') ? '🟢 Paid' : lead.paymentStatus && lead.paymentStatus.includes('Partial') ? '🟡 Partial' : '🔴 Pending');
        setVal('adm-comm-paid-amt', lead.paidNumeric || 0);
        setVal('adm-comm-utr', lead.paymentRef && !lead.paymentRef.includes('N/A') ? lead.paymentRef : '');
        setVal('adm-comm-notes', lead.approvalNotes || '');

        this.calculateCommissionPreview();

        const modal = document.getElementById('adm-commission-modal');
        if (modal) {
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            document.body.classList.add('overflow-hidden');
        }
    },

    closeCommissionModal: function() {
        const modal = document.getElementById('adm-commission-modal');
        if (modal) {
            modal.classList.remove('flex');
            modal.classList.add('hidden');
            document.body.classList.remove('overflow-hidden');
        }
        this.currentCommLead = null;
    },

    onCommissionModelChange: function(model) {
        const pctWrap = document.getElementById('comm-input-pct-wrapper');
        const fixWrap = document.getElementById('comm-input-fixed-wrapper');
        const cstWrap = document.getElementById('comm-input-custom-wrapper');

        if (pctWrap) pctWrap.classList.toggle('hidden', model !== 'percentage');
        if (fixWrap) fixWrap.classList.toggle('hidden', model !== 'fixed');
        if (cstWrap) cstWrap.classList.toggle('hidden', model !== 'custom');

        this.calculateCommissionPreview();
    },

    calculateCommissionPreview: function() {
        if (!this.currentCommLead || !window.DisicurePartner) return;
        const checkedRadio = document.querySelector('input[name="commModel"]:checked');
        const model = checkedRadio ? checkedRadio.value : 'percentage';
        const bVal = this.currentCommLead.businessValueNumeric || 0;

        let rateOrAmt = 10;
        let customNote = '';

        if (model === 'fixed') {
            rateOrAmt = document.getElementById('adm-comm-fixed-input')?.value || 0;
            customNote = `Fixed Flat Commission ₹${(parseFloat(rateOrAmt) || 0).toLocaleString('en-IN')}`;
        } else if (model === 'custom') {
            rateOrAmt = document.getElementById('adm-comm-custom-amt-input')?.value || 0;
            customNote = document.getElementById('adm-comm-custom-formula-input')?.value || 'Custom calculated earning';
        } else {
            rateOrAmt = document.getElementById('adm-comm-pct-input')?.value || 10;
            customNote = `${rateOrAmt}% Margin on ₹${bVal.toLocaleString('en-IN')} Contract`;
        }

        const calc = window.DisicurePartner.calculateCommissionValue(model, rateOrAmt, bVal, customNote);

        const prevEl = document.getElementById('adm-comm-calc-preview');
        const detEl = document.getElementById('adm-comm-calc-details');
        if (prevEl) prevEl.innerText = calc.amountFormatted;
        if (detEl) detEl.innerText = calc.details;

        return calc;
    },

    saveAdminCommission: function(event) {
        event.preventDefault();
        if (!this.currentCommLead || !window.DisicurePartner) return;

        const checkedRadio = document.querySelector('input[name="commModel"]:checked');
        const model = checkedRadio ? checkedRadio.value : 'percentage';
        const leadId = document.getElementById('adm-comm-leadid')?.value || this.currentCommLead.leadId;

        let rateOrAmt = 10;
        let details = '';

        if (model === 'fixed') {
            rateOrAmt = document.getElementById('adm-comm-fixed-input')?.value || 0;
            details = `Fixed Flat Commission ₹${(parseFloat(rateOrAmt) || 0).toLocaleString('en-IN')}`;
        } else if (model === 'custom') {
            rateOrAmt = document.getElementById('adm-comm-custom-amt-input')?.value || 0;
            details = document.getElementById('adm-comm-custom-formula-input')?.value || 'Custom calculated earning';
        } else {
            rateOrAmt = document.getElementById('adm-comm-pct-input')?.value || 10;
            details = `${rateOrAmt}% Margin on Deal`;
        }

        const approvalStatus = document.getElementById('adm-comm-approval-status')?.value || '🟢 Approved';
        const approvedBy = document.getElementById('adm-comm-approver-name')?.value || 'Mr. Nishant Chaturvedi (Super Admin)';
        const paymentStatus = document.getElementById('adm-comm-payment-status')?.value || '🟢 Paid';
        const paidNumeric = parseFloat(document.getElementById('adm-comm-paid-amt')?.value || 0);
        const paymentRef = document.getElementById('adm-comm-utr')?.value || '';
        const approvalNotes = document.getElementById('adm-comm-notes')?.value || '';

        window.DisicurePartner.updatePartnerCommission(leadId, {
            commissionModel: model,
            rateOrAmount: rateOrAmt,
            commissionDetails: details,
            approvalStatus: approvalStatus,
            approvedBy: approvedBy,
            paymentStatus: paymentStatus,
            paidNumeric: paidNumeric,
            paymentRef: paymentRef,
            approvalNotes: approvalNotes
        });

        // Trigger Notification & Security Audit Log (Modules 18 & 19)
        if (window.DisicureNotifications) {
            window.DisicureNotifications.notifyPartnerLeadUpdate(this.currentCommLead, 'commission_approved');
        }
        if (window.DisicureSecurity && window.DisicureSecurity.logActivity) {
            window.DisicureSecurity.logActivity(
                'Partner Commission Approved',
                'COMMISSION_ACTION',
                `Approved commission for lead ${leadId} (${details}). Approved by ${approvedBy}.`,
                approvedBy,
                'SECURITY'
            );
        }

        this.closeCommissionModal();
        this.renderAdminCommissionsTable();
        this.renderAdminPartners();
    },

    quickApproveCommission: function(leadId) {
        if (!window.DisicurePartner) return;
        window.DisicurePartner.approveCommission(leadId, 'Mr. Nishant Chaturvedi (Super Admin)', 'Fast 1-Click Approved by Admin');

        if (window.DisicureSecurity && window.DisicureSecurity.logActivity) {
            window.DisicureSecurity.logActivity(
                'Partner Commission Quick Approved',
                'COMMISSION_ACTION',
                `Fast 1-click approved commission for lead ${leadId}.`,
                'Mr. Nishant Chaturvedi (Super Admin)',
                'SECURITY'
            );
        }

        this.renderAdminCommissionsTable();
        this.renderAdminPartners();
    },

    // Render Partner Portal Earnings Ledger (Sub-Tab 4)
    renderPartnerEarningsLedger: function(partnerId) {
        if (!window.DisicurePartner) return;
        const leads = window.DisicurePartner.getPartnerLeads(partnerId);
        const tbody = document.getElementById('prt-earnings-tbody');
        if (!tbody) return;

        if (leads.length === 0) {
            tbody.innerHTML = `<tr><td colspan="7" class="p-6 text-center text-gray-400">No earnings or commission deals recorded yet.</td></tr>`;
            return;
        }

        tbody.innerHTML = leads.map(l => {
            const isApproved = l.approvalStatus && (l.approvalStatus.includes('Approved') || l.approvalStatus.includes('Disbursed'));
            const isPaid = l.paymentStatus && l.paymentStatus.includes('Paid');

            const modelBadge = l.commissionModel === 'fixed'
                ? '<span class="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">🏷️ Fixed (Flat)</span>'
                : l.commissionModel === 'custom'
                ? '<span class="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-50 text-indigo-800 border border-indigo-200">⚙️ Custom Earning</span>'
                : '<span class="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-800 border border-blue-200">📊 Percentage (%)</span>';

            const approvalHtml = isApproved
                ? `<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">🟢 Approved</span><span class="block text-[9px] text-gray-400 mt-0.5">By ${l.approvedBy ? l.approvedBy.split(' ')[0] : 'Admin'}</span>`
                : `<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">🟡 Under Review</span><span class="block text-[9px] text-gray-400 mt-0.5">Awaiting Sign-off</span>`;

            const paymentHtml = isPaid
                ? `<span class="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">🟢 Paid</span><span class="block text-[9px] text-emerald-600 font-mono mt-0.5">${l.paymentRef || 'UTR Cleared'}</span>`
                : l.paymentStatus && l.paymentStatus.includes('Partial')
                ? `<span class="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">🟡 Partial</span><span class="block text-[9px] text-gray-400 mt-0.5">Paid: ${l.paidFormatted}</span>`
                : `<span class="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">🔴 Pending</span><span class="block text-[9px] text-rose-600 mt-0.5">Due: ${l.commission || '₹0'}</span>`;

            return `
            <tr class="border-b border-gray-100 hover:bg-slate-50 text-xs">
                <td class="p-3.5">
                    <span class="font-extrabold text-navy-950 block">${l.clientName}</span>
                    <span class="text-[10px] text-gray-400 font-mono">${l.leadId} • ${l.city}</span>
                </td>
                <td class="p-3.5 font-bold text-navy-950">${l.businessValue || '₹0'}</td>
                <td class="p-3.5 whitespace-nowrap">
                    ${modelBadge}
                    <span class="text-[10px] text-gray-500 block mt-0.5">${l.commissionDetails || (l.commissionRate + ' Margin')}</span>
                </td>
                <td class="p-3.5 font-extrabold text-emerald-700 text-sm">${l.commission || '₹0'}</td>
                <td class="p-3.5 whitespace-nowrap">${approvalHtml}</td>
                <td class="p-3.5 whitespace-nowrap">${paymentHtml}</td>
                <td class="p-3.5 text-right whitespace-nowrap">
                    <button onclick="window.DisicureMain.openPartnerLeadLifecycleModal('${l.leadId}')" class="px-2.5 py-1 bg-slate-100 hover:bg-blue-600 hover:text-white text-gray-700 rounded text-[11px] font-bold transition-colors">
                        View Chain
                    </button>
                </td>
            </tr>
            `;
        }).join('');
    },

    // =========================================================================
    // MODULE 13: CLIENT MANAGEMENT CONTROLLER & 360° PROFILE ENGINE
    // =========================================================================
    clientState: {
        searchQuery: '',
        typeFilter: 'all',
        statusFilter: 'all',
        sortFilter: 'newest'
    },
    activeClientId: null,
    activeClient360Tab: 'cli-tab-overview',

    renderClientsTable: function() {
        if (!window.DisicureClients) return;
        const allClients = window.DisicureClients.getAllClients();
        const kpis = window.DisicureClients.getClientSummaryKPIs();

        // 1. Update KPI Cards
        const setElText = (id, txt) => {
            const el = document.getElementById(id);
            if (el) el.innerText = txt;
        };
        setElText('cli-kpi-total', kpis.totalClients);
        setElText('cli-kpi-active', kpis.activeAccounts);
        setElText('cli-kpi-orders', kpis.totalBusinessFormatted);
        setElText('cli-kpi-dues', kpis.totalOutstandingFormatted);

        // 2. Filter & Sort Clients with 9-Point Global Filters
        const gf = this.globalSearchState;
        const gq = (gf.globalQuery || '').toLowerCase().trim();
        const query = (this.clientState.searchQuery || '').toLowerCase().trim();
        const typeF = this.clientState.typeFilter;
        const statusF = this.clientState.statusFilter;
        const sortF = this.clientState.sortFilter;

        let filtered = allClients.filter(c => {
            if (gq) {
                const matchesGq = 
                    (c.companyName && c.companyName.toLowerCase().includes(gq)) ||
                    (c.contactPerson && c.contactPerson.toLowerCase().includes(gq)) ||
                    (c.mobile && c.mobile.toLowerCase().includes(gq)) ||
                    (c.email && c.email.toLowerCase().includes(gq)) ||
                    (c.id && c.id.toLowerCase().includes(gq)) ||
                    (c.location && ((c.location.city && c.location.city.toLowerCase().includes(gq)) || (c.location.state && c.location.state.toLowerCase().includes(gq)))) ||
                    (c.businessType && c.businessType.toLowerCase().includes(gq));
                if (!matchesGq) return false;
            }

            // 1. Name Filter
            if (gf.name && !((c.contactPerson && c.contactPerson.toLowerCase().includes(gf.name.toLowerCase().trim())) || (c.companyName && c.companyName.toLowerCase().includes(gf.name.toLowerCase().trim())))) return false;

            // 2. Mobile Filter
            if (gf.mobile && !((c.mobile && c.mobile.includes(gf.mobile.trim())) || (c.whatsapp && c.whatsapp.includes(gf.mobile.trim())))) return false;

            // 3. Company Filter
            if (gf.company && !(c.companyName && c.companyName.toLowerCase().includes(gf.company.toLowerCase().trim()))) return false;

            // 4. City Filter
            if (gf.city && !(c.location && ((c.location.city && c.location.city.toLowerCase().includes(gf.city.toLowerCase().trim())) || (c.location.state && c.location.state.toLowerCase().includes(gf.city.toLowerCase().trim())) || (c.location.address && c.location.address.toLowerCase().includes(gf.city.toLowerCase().trim()))))) return false;

            // 5. Product Filter
            if (gf.product) {
                const prodMatch = (c.productsServices && c.productsServices.some(p => p.name && p.name.toLowerCase().includes(gf.product.toLowerCase().trim()))) ||
                                  (c.requirements && c.requirements.some(r => (r.specifications && r.specifications.toLowerCase().includes(gf.product.toLowerCase().trim())) || (r.title && r.title.toLowerCase().includes(gf.product.toLowerCase().trim()))));
                if (!prodMatch) return false;
            }

            // 6. Partner Filter
            if (gf.partner && !((c.businessType && c.businessType.toLowerCase().includes(gf.partner.toLowerCase().trim())) || (c.accountManager && c.accountManager.toLowerCase().includes(gf.partner.toLowerCase().trim())))) return false;

            // 7. Lead / Account Status Filter
            if (gf.leadStatus && gf.leadStatus !== 'all') {
                const cleanStatus = gf.leadStatus.replace(/[^\w]/g, '').toLowerCase();
                const accStatus = (c.accountStatus || '').replace(/[^\w]/g, '').toLowerCase();
                if (!accStatus.includes(cleanStatus) && cleanStatus !== 'converted' && cleanStatus !== 'new') return false;
            }

            // 8. Payment Status Filter
            if (gf.paymentStatus && gf.paymentStatus !== 'all') {
                if (gf.paymentStatus === 'Pending') {
                    const hasPending = c.payments && c.payments.some(p => p.status === 'Pending' || p.status === 'Unpaid');
                    if (!hasPending && !c.creditLimit) return false;
                } else if (gf.paymentStatus === 'Paid') {
                    const allPaid = !c.payments || c.payments.every(p => p.status === 'Paid');
                    if (!allPaid) return false;
                }
            }

            // 9. Date Filter
            if (gf.dateFrom) {
                const cDate = (c.createdDate || c.orders?.[0]?.date || '').substring(0, 10);
                if (cDate && cDate < gf.dateFrom) return false;
            }
            if (gf.dateTo) {
                const cDate = (c.createdDate || c.orders?.[0]?.date || '').substring(0, 10);
                if (cDate && cDate > gf.dateTo) return false;
            }

            // Local Client Tab Filters
            const matchesQuery = !query ||
                (c.companyName && c.companyName.toLowerCase().includes(query)) ||
                (c.contactPerson && c.contactPerson.toLowerCase().includes(query)) ||
                (c.mobile && c.mobile.toLowerCase().includes(query)) ||
                (c.email && c.email.toLowerCase().includes(query)) ||
                (c.id && c.id.toLowerCase().includes(query)) ||
                (c.location && c.location.city && c.location.city.toLowerCase().includes(query)) ||
                (c.location && c.location.state && c.location.state.toLowerCase().includes(query)) ||
                (c.businessType && c.businessType.toLowerCase().includes(query));

            const matchesType = (typeF === 'all') || (c.businessType === typeF);
            const matchesStatus = (statusF === 'all') || (c.accountStatus === statusF);

            return matchesQuery && matchesType && matchesStatus;
        });

        // Sorting
        if (sortF === 'name-asc') {
            filtered.sort((a, b) => (a.companyName || '').localeCompare(b.companyName || ''));
        } else if (sortF === 'value-desc') {
            filtered.sort((a, b) => {
                const aVal = (a.orders || []).reduce((acc, o) => acc + (o.totalAmount || 0), 0);
                const bVal = (b.orders || []).reduce((acc, o) => acc + (o.totalAmount || 0), 0);
                return bVal - aVal;
            });
        } else if (sortF === 'due-desc') {
            filtered.sort((a, b) => {
                const aDue = (a.payments || []).reduce((acc, p) => acc + (p.balanceDue || 0), 0);
                const bDue = (b.payments || []).reduce((acc, p) => acc + (p.balanceDue || 0), 0);
                return bDue - aDue;
            });
        }

        // Update count indicator
        setElText('cli-showing-count', `Showing ${filtered.length} of ${allClients.length} client accounts`);

        // Render Table Rows
        const tbody = document.getElementById('adm-clients-tbody');
        const emptyState = document.getElementById('adm-clients-empty');
        if (!tbody) return;

        if (filtered.length === 0) {
            tbody.innerHTML = '';
            if (emptyState) emptyState.classList.remove('hidden');
            return;
        }

        if (emptyState) emptyState.classList.add('hidden');

        tbody.innerHTML = filtered.map(c => {
            const totalOrdersVal = (c.orders || []).reduce((sum, o) => sum + (o.totalAmount || 0), 0);
            const totalOrdersFormatted = '₹' + totalOrdersVal.toLocaleString('en-IN');
            const totalBalanceDue = (c.payments || []).reduce((sum, p) => sum + (p.balanceDue || 0), 0);
            const balanceDueFormatted = '₹' + totalBalanceDue.toLocaleString('en-IN');

            // Status Badge
            let statusBadge = '';
            if (c.accountStatus === 'Key Enterprise Account') {
                statusBadge = `<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-200">⭐ Key Enterprise</span>`;
            } else if (c.accountStatus === 'Active Account') {
                statusBadge = `<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">🟢 Active</span>`;
            } else if (c.accountStatus === 'Onboarding') {
                statusBadge = `<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">🟡 Onboarding</span>`;
            } else {
                statusBadge = `<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-gray-100 text-gray-600 border border-gray-200">⚪ Inactive</span>`;
            }

            // Requirements & Products count summary
            const reqCount = (c.requirements || []).length;
            const prodCount = (c.productsServices || []).length;
            const ordersCount = (c.orders || []).length;
            const primaryReq = c.requirements && c.requirements[0] ? c.requirements[0].title : 'General Supply';

            return `
            <tr class="border-b border-gray-100 hover:bg-slate-50 text-xs transition-colors">
                <td class="p-4">
                    <div class="flex items-start gap-3">
                        <div class="w-9 h-9 rounded-xl bg-blue-100 text-blue-800 font-extrabold flex items-center justify-center flex-shrink-0 text-xs">
                            ${(c.companyName || 'C').substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                            <span class="font-extrabold text-navy-950 block hover:text-blue-600 cursor-pointer" onclick="window.DisicureMain.openClient360Modal('${c.id}')">
                                ${c.companyName}
                            </span>
                            <div class="flex items-center gap-2 text-[11px] text-gray-500 mt-0.5">
                                <span>👤 ${c.contactPerson}</span>
                                <span>•</span>
                                <span class="font-mono text-gray-400">${c.id}</span>
                            </div>
                            <div class="text-[10px] text-gray-400 mt-0.5">
                                📱 ${c.mobile} | ✉️ ${c.email}
                            </div>
                        </div>
                    </div>
                </td>
                <td class="p-4">
                    <span class="font-bold text-gray-800 block">${c.businessType}</span>
                    <span class="text-[11px] text-gray-500 mt-0.5 block">📍 ${c.location ? (c.location.city + ', ' + c.location.state) : 'India'}</span>
                    <span class="text-[10px] text-gray-400 font-mono">GST: ${c.gstin || 'N/A'}</span>
                </td>
                <td class="p-4">
                    <span class="font-semibold text-gray-800 line-clamp-1">${primaryReq}</span>
                    <div class="flex items-center gap-2 mt-1">
                        <span class="text-[10px] bg-blue-50 text-blue-700 font-bold px-2 py-0.5 rounded">${reqCount} Requirements</span>
                        <span class="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded">${prodCount} Formulations</span>
                    </div>
                </td>
                <td class="p-4">
                    <div class="font-extrabold text-navy-950 text-sm">${totalOrdersFormatted}</div>
                    <div class="text-[10px] text-gray-500">${ordersCount} Supply Contracts / POs</div>
                    ${totalBalanceDue > 0 
                        ? `<div class="text-[10px] text-rose-600 font-bold mt-0.5">Due: ${balanceDueFormatted}</div>`
                        : `<div class="text-[10px] text-emerald-600 font-bold mt-0.5">✓ Cleared</div>`
                    }
                </td>
                <td class="p-4 whitespace-nowrap">
                    ${statusBadge}
                    <span class="block text-[10px] text-gray-400 mt-1">Mgr: ${c.accountManager || 'Admin'}</span>
                </td>
                <td class="p-4 text-right whitespace-nowrap">
                    <div class="flex items-center justify-end gap-1.5">
                        <button onclick="window.DisicureMain.openClient360Modal('${c.id}')" title="View 360° Profile" class="px-2.5 py-1.5 bg-blue-50 hover:bg-blue-600 hover:text-white text-blue-700 rounded-lg text-xs font-bold transition-all flex items-center gap-1 border border-blue-100">
                            <span>👁️ 360° Profile</span>
                        </button>
                        <button onclick="window.DisicureMain.openEditClientModal('${c.id}')" title="Edit Client" class="p-1.5 bg-slate-100 hover:bg-slate-200 text-gray-600 rounded-lg text-xs font-bold transition-colors">
                            ✏️
                        </button>
                        <button onclick="window.DisicureMain.deleteClient('${c.id}')" title="Delete Client" class="p-1.5 bg-rose-50 hover:bg-rose-600 hover:text-white text-rose-600 rounded-lg text-xs font-bold transition-colors">
                            🗑️
                        </button>
                    </div>
                </td>
            </tr>
            `;
        }).join('');
    },

    filterClientsTable: function() {
        const searchInput = document.getElementById('cli-search-input');
        const typeFilter = document.getElementById('cli-type-filter');
        const statusFilter = document.getElementById('cli-status-filter');
        const sortFilter = document.getElementById('cli-sort-select');

        if (searchInput) this.clientState.searchQuery = searchInput.value;
        if (typeFilter) this.clientState.typeFilter = typeFilter.value;
        if (statusFilter) this.clientState.statusFilter = statusFilter.value;
        if (sortFilter) this.clientState.sortFilter = sortFilter.value;

        this.renderClientsTable();
    },

    resetClientFilters: function() {
        this.clientState = {
            searchQuery: '',
            typeFilter: 'all',
            statusFilter: 'all',
            sortFilter: 'newest'
        };

        const searchInput = document.getElementById('cli-search-input');
        const typeFilter = document.getElementById('cli-type-filter');
        const statusFilter = document.getElementById('cli-status-filter');
        const sortFilter = document.getElementById('cli-sort-select');

        if (searchInput) searchInput.value = '';
        if (typeFilter) typeFilter.value = 'all';
        if (statusFilter) statusFilter.value = 'all';
        if (sortFilter) sortFilter.value = 'newest';

        this.renderClientsTable();
    },

    openCreateClientModal: function() {
        const form = document.getElementById('adm-client-form');
        if (form) form.reset();
        const editId = document.getElementById('cli-form-edit-id');
        if (editId) editId.value = '';
        const title = document.getElementById('client-form-modal-title');
        if (title) title.innerText = 'Register New Pharma Client Account';

        const modal = document.getElementById('adm-client-form-modal');
        if (modal) {
            modal.classList.remove('hidden');
            modal.classList.add('flex');
        }
    },

    openEditClientModal: function(clientId) {
        if (!window.DisicureClients) return;
        const client = window.DisicureClients.getClientById(clientId);
        if (!client) return;

        const setVal = (id, val) => {
            const el = document.getElementById(id);
            if (el) el.value = val !== undefined ? val : '';
        };

        setVal('cli-form-edit-id', client.id);
        setVal('cli-form-company', client.companyName);
        setVal('cli-form-type', client.businessType);
        setVal('cli-form-contact', client.contactPerson);
        setVal('cli-form-designation', client.designation);
        setVal('cli-form-manager', client.accountManager);
        setVal('cli-form-mobile', client.mobile);
        setVal('cli-form-whatsapp', client.whatsapp);
        setVal('cli-form-email', client.email);
        setVal('cli-form-address', client.location ? client.location.address : '');
        setVal('cli-form-city', client.location ? client.location.city : '');
        setVal('cli-form-state', client.location ? client.location.state : '');
        setVal('cli-form-pincode', client.location ? client.location.pincode : '');
        setVal('cli-form-gstin', client.gstin);
        setVal('cli-form-druglicense', client.drugLicense);
        setVal('cli-form-status', client.accountStatus);
        setVal('cli-form-creditlimit', client.creditLimit);
        setVal('cli-form-creditdays', client.creditDays);

        const title = document.getElementById('client-form-modal-title');
        if (title) title.innerText = `Edit Profile: ${client.companyName}`;

        const modal = document.getElementById('adm-client-form-modal');
        if (modal) {
            modal.classList.remove('hidden');
            modal.classList.add('flex');
        }
    },

    closeClientFormModal: function() {
        const modal = document.getElementById('adm-client-form-modal');
        if (modal) {
            modal.classList.remove('flex');
            modal.classList.add('hidden');
        }
    },

    saveClientForm: function(event) {
        if (event) event.preventDefault();
        if (!window.DisicureClients) return;

        const form = document.getElementById('adm-client-form');
        if (!form) return;

        const formData = new FormData(form);
        const editId = formData.get('clientId');

        const clientData = {
            companyName: formData.get('companyName'),
            businessType: formData.get('businessType'),
            contactPerson: formData.get('contactPerson'),
            designation: formData.get('designation'),
            accountManager: formData.get('accountManager'),
            mobile: formData.get('mobile'),
            whatsapp: formData.get('whatsapp'),
            email: formData.get('email'),
            address: formData.get('address'),
            city: formData.get('city'),
            state: formData.get('state'),
            pincode: formData.get('pincode'),
            gstin: formData.get('gstin'),
            drugLicense: formData.get('drugLicense'),
            accountStatus: formData.get('accountStatus'),
            creditLimit: formData.get('creditLimit'),
            creditDays: formData.get('creditDays')
        };

        if (editId) {
            window.DisicureClients.updateClient(editId, clientData);
            this.showToast('success', `Client account "${clientData.companyName}" updated successfully!`);
            if (this.activeClientId === editId) {
                this.renderClient360Details(editId);
            }
        } else {
            const created = window.DisicureClients.addClient(clientData);
            this.showToast('success', `New client "${created.companyName}" registered into CRM!`);
        }

        this.closeClientFormModal();
        this.renderClientsTable();
    },

    deleteClient: function(clientId) {
        if (!window.DisicureClients) return;
        const client = window.DisicureClients.getClientById(clientId);
        if (!client) return;

        if (confirm(`Are you sure you want to delete client account "${client.companyName}"? This action cannot be undone.`)) {
            window.DisicureClients.deleteClient(clientId);
            this.showToast('info', `Client account "${client.companyName}" deleted.`);
            this.renderClientsTable();
            if (this.activeClientId === clientId) {
                this.closeClient360Modal();
            }
        }
    },

    // -------------------------------------------------------------------------
    // 360° CLIENT PROFILE MODAL CONTROLLER
    // -------------------------------------------------------------------------
    openClient360Modal: function(clientId) {
        if (!window.DisicureClients) return;
        const client = window.DisicureClients.getClientById(clientId);
        if (!client) return;

        this.activeClientId = clientId;
        this.activeClient360Tab = 'cli-tab-overview';

        // Update Top Banner
        const setElText = (id, txt) => {
            const el = document.getElementById(id);
            if (el) el.innerText = txt || '-';
        };

        setElText('cli360-company-name', client.companyName);
        setElText('cli360-contact-person', client.contactPerson);
        setElText('cli360-designation', client.designation || 'Client Representative');
        setElText('cli360-location-summary', client.location ? `${client.location.city}, ${client.location.state}` : 'India');
        setElText('cli360-mgr', client.accountManager || 'Admin');
        setElText('cli360-footer-id', client.id);

        // Status & Type Badges
        const statusBadge = document.getElementById('cli360-status-badge');
        if (statusBadge) {
            statusBadge.innerText = client.accountStatus || 'Active';
            statusBadge.className = client.accountStatus === 'Key Enterprise Account'
                ? 'text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-400/30'
                : 'text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30';
        }

        const typeBadge = document.getElementById('cli360-type-badge');
        if (typeBadge) {
            typeBadge.innerText = client.businessType || 'Healthcare Client';
        }

        // Quick Communication Action Buttons
        const callBtn = document.getElementById('cli360-call-btn');
        if (callBtn) callBtn.href = `tel:${client.mobile || ''}`;

        const waBtn = document.getElementById('cli360-wa-btn');
        if (waBtn) {
            const phoneClean = (client.whatsapp || client.mobile || '').replace(/[^0-9]/g, '');
            waBtn.href = `https://wa.me/${phoneClean}?text=Hello%20${encodeURIComponent(client.contactPerson)},%20greetings%20from%20Disicure%20Care%20Pvt.%20Ltd.`;
        }

        const emailBtn = document.getElementById('cli360-email-btn');
        if (emailBtn) emailBtn.href = `mailto:${client.email || ''}?subject=Disicure%20Care%20-%20Account%20Updates`;

        // Update Sub-Tab Counts
        setElText('cli360-count-req', (client.requirements || []).length);
        setElText('cli360-count-prod', (client.productsServices || []).length);
        setElText('cli360-count-leads', (client.leads || []).length);
        setElText('cli360-count-orders', (client.orders || []).length);
        setElText('cli360-count-payments', (client.payments || []).length);
        setElText('cli360-count-docs', (client.documents || []).length);
        setElText('cli360-count-notes', (client.notes || []).length);
        setElText('cli360-count-comms', (client.communicationHistory || []).length);

        // Reset sub-tab active classes
        this.switchClient360Tab('cli-tab-overview');

        const modal = document.getElementById('adm-client-360-modal');
        if (modal) {
            modal.classList.remove('hidden');
            modal.classList.add('flex');
        }
    },

    closeClient360Modal: function() {
        const modal = document.getElementById('adm-client-360-modal');
        if (modal) {
            modal.classList.remove('flex');
            modal.classList.add('hidden');
        }
        this.activeClientId = null;
    },

    switchClient360Tab: function(tabId) {
        this.activeClient360Tab = tabId;

        // Update button visual styles
        const btns = document.querySelectorAll('.cli360-tab-btn');
        btns.forEach(btn => {
            btn.classList.remove('bg-blue-600', 'text-white', 'active');
            btn.classList.add('bg-slate-800', 'text-blue-200');
        });

        const activeBtn = document.getElementById(`btn-${tabId}`);
        if (activeBtn) {
            activeBtn.classList.remove('bg-slate-800', 'text-blue-200');
            activeBtn.classList.add('bg-blue-600', 'text-white', 'active');
        }

        if (this.activeClientId) {
            this.renderClient360Details(this.activeClientId);
        }
    },

    renderClient360Details: function(clientId) {
        if (!window.DisicureClients) return;
        const client = window.DisicureClients.getClientById(clientId);
        if (!client) return;

        const body = document.getElementById('cli360-modal-body');
        if (!body) return;

        const tab = this.activeClient360Tab;

        if (tab === 'cli-tab-overview') {
            // SUB-TAB 1: 📋 Profile Overview & KYC
            body.innerHTML = `
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <!-- Organization & Contact Card -->
                <div class="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-4">
                    <h4 class="text-xs font-extrabold text-navy-950 uppercase tracking-wider border-b border-gray-100 pb-2">🏢 Organization & Contact</h4>
                    <div class="space-y-2.5 text-xs">
                        <div>
                            <span class="text-gray-400 block text-[10px] uppercase font-bold">Company Name</span>
                            <span class="font-extrabold text-navy-950">${client.companyName}</span>
                        </div>
                        <div>
                            <span class="text-gray-400 block text-[10px] uppercase font-bold">Business Vertical</span>
                            <span class="font-bold text-blue-700">${client.businessType}</span>
                        </div>
                        <div>
                            <span class="text-gray-400 block text-[10px] uppercase font-bold">Primary Contact</span>
                            <span class="font-bold text-gray-800">${client.contactPerson} (${client.designation || 'Representative'})</span>
                        </div>
                        <div>
                            <span class="text-gray-400 block text-[10px] uppercase font-bold">Direct Phone / WhatsApp</span>
                            <span class="font-mono text-gray-800">${client.mobile} / ${client.whatsapp || client.mobile}</span>
                        </div>
                        <div>
                            <span class="text-gray-400 block text-[10px] uppercase font-bold">Email Address</span>
                            <span class="font-mono text-gray-800">${client.email}</span>
                        </div>
                    </div>
                </div>

                <!-- Location & Facilities -->
                <div class="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-4">
                    <h4 class="text-xs font-extrabold text-navy-950 uppercase tracking-wider border-b border-gray-100 pb-2">📍 Geographic Location</h4>
                    <div class="space-y-2.5 text-xs">
                        <div>
                            <span class="text-gray-400 block text-[10px] uppercase font-bold">Operating Address</span>
                            <span class="text-gray-800 font-medium">${client.location ? client.location.address : 'Registered Head Office'}</span>
                        </div>
                        <div class="grid grid-cols-2 gap-2">
                            <div>
                                <span class="text-gray-400 block text-[10px] uppercase font-bold">City</span>
                                <span class="font-bold text-gray-800">${client.location ? client.location.city : 'Dehradun'}</span>
                            </div>
                            <div>
                                <span class="text-gray-400 block text-[10px] uppercase font-bold">State</span>
                                <span class="font-bold text-gray-800">${client.location ? client.location.state : 'Uttarakhand'}</span>
                            </div>
                        </div>
                        <div>
                            <span class="text-gray-400 block text-[10px] uppercase font-bold">Postal Pincode</span>
                            <span class="font-mono text-gray-800">${client.location ? (client.location.pincode || 'N/A') : 'N/A'}</span>
                        </div>
                        <div>
                            <span class="text-gray-400 block text-[10px] uppercase font-bold">Country</span>
                            <span class="text-gray-800 font-medium">India</span>
                        </div>
                    </div>
                </div>

                <!-- Compliance, Credit & Account Terms -->
                <div class="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-4">
                    <h4 class="text-xs font-extrabold text-navy-950 uppercase tracking-wider border-b border-gray-100 pb-2">⚖️ Compliance & Credit Terms</h4>
                    <div class="space-y-2.5 text-xs">
                        <div>
                            <span class="text-gray-400 block text-[10px] uppercase font-bold">GSTIN Registration</span>
                            <span class="font-mono font-bold text-navy-950">${client.gstin || 'Pending Verification'}</span>
                        </div>
                        <div>
                            <span class="text-gray-400 block text-[10px] uppercase font-bold">Wholesale Drug License (20B/21B)</span>
                            <span class="font-mono font-bold text-emerald-700">${client.drugLicense || 'Under Document Verification'}</span>
                        </div>
                        <div class="grid grid-cols-2 gap-2">
                            <div>
                                <span class="text-gray-400 block text-[10px] uppercase font-bold">Credit Limit</span>
                                <span class="font-extrabold text-purple-700">${client.creditLimit || '₹5,00,000'}</span>
                            </div>
                            <div>
                                <span class="text-gray-400 block text-[10px] uppercase font-bold">Credit Days</span>
                                <span class="font-bold text-gray-800">${client.creditDays || 30} Days</span>
                            </div>
                        </div>
                        <div>
                            <span class="text-gray-400 block text-[10px] uppercase font-bold">Dedicated Account Manager</span>
                            <span class="font-extrabold text-navy-950">${client.accountManager || 'Ayushi Khare'}</span>
                        </div>
                    </div>
                </div>
            </div>
            `;
        } else if (tab === 'cli-tab-requirements') {
            // SUB-TAB 2: 📑 Requirements & Specifications
            const reqs = client.requirements || [];
            body.innerHTML = `
            <div class="space-y-4">
                <div class="flex items-center justify-between">
                    <div>
                        <h4 class="text-sm font-extrabold text-navy-950">Active & Historical Product Requirements</h4>
                        <p class="text-xs text-gray-500">Track specifications, batch quantities, formulations, target delivery dates, and budgets.</p>
                    </div>
                    <button onclick="window.DisicureMain.openClientSubModal('cli-add-req-modal')" class="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg shadow-sm transition-all flex items-center gap-1.5">
                        <span>+ Add Requirement</span>
                    </button>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    ${reqs.length === 0 ? `<div class="col-span-2 text-center py-8 text-gray-400 text-xs">No requirements recorded yet. Click above to add one.</div>` : ''}
                    ${reqs.map(r => `
                    <div class="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-3">
                        <div class="flex items-start justify-between gap-2">
                            <div>
                                <span class="text-[10px] font-mono text-blue-600 font-bold">${r.reqId}</span>
                                <h5 class="text-sm font-extrabold text-navy-950">${r.title}</h5>
                                <span class="text-[10px] font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded">${r.category}</span>
                            </div>
                            <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">${r.status}</span>
                        </div>
                        <p class="text-xs text-gray-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100">${r.specifications || 'No specific chemical assay notes provided.'}</p>
                        <div class="grid grid-cols-2 gap-2 text-xs border-t border-gray-100 pt-2 text-gray-500">
                            <div>📦 Batch Size: <strong class="text-gray-800">${r.batchSize}</strong></div>
                            <div>💰 Budget: <strong class="text-emerald-700">${r.budget}</strong></div>
                        </div>
                    </div>
                    `).join('')}
                </div>
            </div>
            `;
        } else if (tab === 'cli-tab-products') {
            // SUB-TAB 3: 💊 Products & Services
            const prods = client.productsServices || [];
            body.innerHTML = `
            <div class="space-y-4">
                <div class="flex items-center justify-between">
                    <div>
                        <h4 class="text-sm font-extrabold text-navy-950">Contracted Formulations & Services</h4>
                        <p class="text-xs text-gray-500">Active manufactured molecules, dosage forms, contracted unit rates, and monthly recurring volumes.</p>
                    </div>
                    <button onclick="window.DisicureMain.openClientSubModal('cli-add-prod-modal')" class="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg shadow-sm transition-all flex items-center gap-1.5">
                        <span>+ Add Product / Service</span>
                    </button>
                </div>

                <div class="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                    <table class="w-full text-left text-xs">
                        <thead class="bg-slate-50 text-[11px] font-extrabold text-navy-950 uppercase tracking-wider border-b border-gray-200">
                            <tr>
                                <th class="p-3.5">Product / Service Name</th>
                                <th class="p-3.5">Category</th>
                                <th class="p-3.5">Dosage Form / Packaging</th>
                                <th class="p-3.5">Contract Unit Price</th>
                                <th class="p-3.5">Monthly Volume</th>
                                <th class="p-3.5 text-right">Contract Status</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-100 font-medium">
                            ${prods.length === 0 ? `<tr><td colspan="6" class="p-6 text-center text-gray-400">No contracted products listed yet.</td></tr>` : ''}
                            ${prods.map(p => `
                            <tr class="hover:bg-slate-50">
                                <td class="p-3.5 font-bold text-navy-950">
                                    ${p.name}
                                    <span class="block text-[10px] text-gray-400 font-mono">${p.prodId}</span>
                                </td>
                                <td class="p-3.5 text-gray-600">${p.category}</td>
                                <td class="p-3.5 text-gray-600">${p.form}</td>
                                <td class="p-3.5 font-extrabold text-emerald-700">${p.unitPrice}</td>
                                <td class="p-3.5 text-gray-700 font-bold">${p.monthlyVolume}</td>
                                <td class="p-3.5 text-right">
                                    <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">✓ Active Contract</span>
                                </td>
                            </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
            `;
        } else if (tab === 'cli-tab-leads') {
            // SUB-TAB 4: 🎯 CRM Leads & Inquiries
            const leads = client.leads || [];
            body.innerHTML = `
            <div class="space-y-4">
                <div>
                    <h4 class="text-sm font-extrabold text-navy-950">CRM Inquiry & Lead Conversion History</h4>
                    <p class="text-xs text-gray-500">Historical customer inquiries, pipeline conversion stages, and partner origin sources.</p>
                </div>

                <div class="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                    <table class="w-full text-left text-xs">
                        <thead class="bg-slate-50 text-[11px] font-extrabold text-navy-950 uppercase tracking-wider border-b border-gray-200">
                            <tr>
                                <th class="p-3.5">Lead ID & Inquiry Date</th>
                                <th class="p-3.5">Requirement Details</th>
                                <th class="p-3.5">Origin Partner / Channel</th>
                                <th class="p-3.5">Deal Business Value</th>
                                <th class="p-3.5 text-right">Conversion Status</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-100 font-medium">
                            ${leads.length === 0 ? `<tr><td colspan="5" class="p-6 text-center text-gray-400">No linked CRM leads recorded.</td></tr>` : ''}
                            ${leads.map(l => `
                            <tr class="hover:bg-slate-50">
                                <td class="p-3.5">
                                    <span class="font-bold text-navy-950 font-mono">${l.leadId}</span>
                                    <span class="block text-[10px] text-gray-400">${l.inquiryDate}</span>
                                </td>
                                <td class="p-3.5 text-gray-800 font-semibold">${l.requirement}</td>
                                <td class="p-3.5 text-gray-600">${l.originPartner || 'Direct Inbound'}</td>
                                <td class="p-3.5 font-extrabold text-emerald-700">${l.valueFormatted || ('₹' + (l.value || 0).toLocaleString('en-IN'))}</td>
                                <td class="p-3.5 text-right">
                                    <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">${l.status}</span>
                                </td>
                            </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
            `;
        } else if (tab === 'cli-tab-orders') {
            // SUB-TAB 5: 📦 Orders & Business Fulfillment
            const orders = client.orders || [];
            body.innerHTML = `
            <div class="space-y-4">
                <div class="flex items-center justify-between">
                    <div>
                        <h4 class="text-sm font-extrabold text-navy-950">Purchase Orders & Supply Fulfillment</h4>
                        <p class="text-xs text-gray-500">Commercial supply contracts, purchase orders, batch dispatches, and manufacturing fulfillment.</p>
                    </div>
                    <button onclick="window.DisicureMain.openClientSubModal('cli-add-order-modal')" class="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg shadow-sm transition-all flex items-center gap-1.5">
                        <span>+ Record PO / Order</span>
                    </button>
                </div>

                <div class="space-y-3">
                    ${orders.length === 0 ? `<div class="text-center py-8 text-gray-400 text-xs bg-white rounded-2xl border border-gray-200">No purchase orders recorded yet.</div>` : ''}
                    ${orders.map(o => `
                    <div class="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-3">
                        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-3">
                            <div>
                                <span class="text-[10px] font-mono text-purple-700 font-bold bg-purple-50 px-2 py-0.5 rounded">${o.poNumber}</span>
                                <h5 class="text-sm font-extrabold text-navy-950 mt-1">${o.items}</h5>
                                <span class="text-[11px] text-gray-400">Order Date: ${o.orderDate} • Target Delivery: ${o.deliveryDate || 'Standard'}</span>
                            </div>
                            <div class="text-right">
                                <span class="text-base font-extrabold text-emerald-700 block">${o.totalFormatted || ('₹' + (o.totalAmount || 0).toLocaleString('en-IN'))}</span>
                                <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 inline-block mt-1">${o.status}</span>
                            </div>
                        </div>
                        <div class="flex items-center justify-between text-xs text-gray-500">
                            <span>💳 Payment Status: <strong class="text-navy-950">${o.paymentStatus}</strong></span>
                            <span class="font-mono text-gray-400">${o.orderId}</span>
                        </div>
                    </div>
                    `).join('')}
                </div>
            </div>
            `;
        } else if (tab === 'cli-tab-payments') {
            // SUB-TAB 6: 💳 Invoices & Payments Ledger
            const payments = client.payments || [];
            const totInvoiced = payments.reduce((sum, p) => sum + (p.totalAmount || 0), 0);
            const totPaid = payments.reduce((sum, p) => sum + (p.paidAmount || 0), 0);
            const totDue = payments.reduce((sum, p) => sum + (p.balanceDue || 0), 0);

            body.innerHTML = `
            <div class="space-y-4">
                <div class="flex items-center justify-between">
                    <div>
                        <h4 class="text-sm font-extrabold text-navy-950">Tax Invoices & Payment Ledger</h4>
                        <p class="text-xs text-gray-500">GST tax invoices, RTGS/NEFT transaction settlements, and outstanding credit balances.</p>
                    </div>
                    <button onclick="window.DisicureMain.openClientSubModal('cli-add-payment-modal')" class="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg shadow-sm transition-all flex items-center gap-1.5">
                        <span>+ Record Tax Invoice</span>
                    </button>
                </div>

                <!-- 3 KPI Cards -->
                <div class="grid grid-cols-3 gap-4">
                    <div class="bg-blue-50/50 border border-blue-100 p-4 rounded-xl">
                        <span class="text-[10px] font-bold text-blue-700 uppercase">Total Invoiced</span>
                        <div class="text-xl font-extrabold text-navy-950 mt-1">₹${totInvoiced.toLocaleString('en-IN')}</div>
                    </div>
                    <div class="bg-emerald-50/50 border border-emerald-100 p-4 rounded-xl">
                        <span class="text-[10px] font-bold text-emerald-700 uppercase">Settled / Received</span>
                        <div class="text-xl font-extrabold text-emerald-600 mt-1">₹${totPaid.toLocaleString('en-IN')}</div>
                    </div>
                    <div class="bg-rose-50/50 border border-rose-100 p-4 rounded-xl">
                        <span class="text-[10px] font-bold text-rose-700 uppercase">Outstanding Balance Due</span>
                        <div class="text-xl font-extrabold text-rose-600 mt-1">₹${totDue.toLocaleString('en-IN')}</div>
                    </div>
                </div>

                <div class="space-y-3">
                    ${payments.length === 0 ? `<div class="text-center py-8 text-gray-400 text-xs bg-white rounded-2xl border border-gray-200">No invoices recorded yet.</div>` : ''}
                    ${payments.map(p => `
                    <div class="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-3">
                        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-3">
                            <div>
                                <span class="font-extrabold text-navy-950 text-sm">${p.invoiceId}</span>
                                <span class="text-[11px] text-gray-500 block">Ref PO: ${p.poNumber} • Date: ${p.invDate} • Due: ${p.dueDate || '30 Days'}</span>
                            </div>
                            <div class="text-right">
                                <span class="text-base font-extrabold text-navy-950 block">₹${(p.totalAmount || 0).toLocaleString('en-IN')}</span>
                                <span class="text-[10px] font-bold px-2 py-0.5 rounded-full ${p.status === 'Fully Paid' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'}">${p.status}</span>
                            </div>
                        </div>
                        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-gray-600">
                            <div>Paid: <strong class="text-emerald-700">₹${(p.paidAmount || 0).toLocaleString('en-IN')}</strong></div>
                            <div>Balance: <strong class="text-rose-600">₹${(p.balanceDue || 0).toLocaleString('en-IN')}</strong></div>
                            <div>Mode: <strong>${p.paymentMode}</strong></div>
                            <div>Transactions: <strong>${(p.transactions || []).length} Recorded</strong></div>
                        </div>
                        ${(p.transactions && p.transactions.length > 0) ? `
                        <div class="bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-[11px] space-y-1">
                            <span class="font-bold text-gray-700 block">Settlement Transaction Slips:</span>
                            ${p.transactions.map(t => `
                            <div class="flex items-center justify-between text-gray-500">
                                <span>💳 ${t.date} • ${t.mode} (${t.refNo})</span>
                                <span class="font-bold text-emerald-700 font-mono">${t.amountFormatted || ('₹' + t.amount)}</span>
                            </div>
                            `).join('')}
                        </div>
                        ` : ''}
                    </div>
                    `).join('')}
                </div>
            </div>
            `;
        } else if (tab === 'cli-tab-docs') {
            // SUB-TAB 7: 📁 Document Vault
            const docs = client.documents || [];
            body.innerHTML = `
            <div class="space-y-4">
                <div class="flex items-center justify-between">
                    <div>
                        <h4 class="text-sm font-extrabold text-navy-950">Verified KYC & Compliance Vault</h4>
                        <p class="text-xs text-gray-500">GSTIN, wholesale drug licenses (20B/21B), MSA contracts, and batch Certificate of Analysis (COA).</p>
                    </div>
                    <button onclick="window.DisicureMain.openClientSubModal('cli-add-doc-modal')" class="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg shadow-sm transition-all flex items-center gap-1.5">
                        <span>+ Upload Document</span>
                    </button>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    ${docs.length === 0 ? `<div class="col-span-2 text-center py-8 text-gray-400 text-xs">No documents uploaded yet.</div>` : ''}
                    ${docs.map(d => `
                    <div class="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex items-start gap-3">
                        <div class="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 font-bold flex items-center justify-center flex-shrink-0 text-sm">
                            📄
                        </div>
                        <div class="flex-1 min-w-0">
                            <h5 class="text-xs font-extrabold text-navy-950 truncate">${d.title}</h5>
                            <span class="text-[10px] text-gray-400 block">${d.category} • ${d.fileSize || 'PDF'}</span>
                            <div class="flex items-center gap-2 mt-2">
                                <span class="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">✓ Verified</span>
                                <button onclick="window.DisicureMain.showToast('info', 'Viewing document: ${d.fileName}')" class="text-[10px] font-bold text-blue-600 hover:underline">
                                    Download / View
                                </button>
                            </div>
                        </div>
                    </div>
                    `).join('')}
                </div>
            </div>
            `;
        } else if (tab === 'cli-tab-notes') {
            // SUB-TAB 8: 📝 Internal Notes & Account Logs
            const notes = client.notes || [];
            body.innerHTML = `
            <div class="space-y-4">
                <div class="flex items-center justify-between">
                    <div>
                        <h4 class="text-sm font-extrabold text-navy-950">Internal Team Notes & Directives</h4>
                        <p class="text-xs text-gray-500">Internal memos between sales heads, quality assurance, logistics, and executive management.</p>
                    </div>
                    <button onclick="window.DisicureMain.openClientSubModal('cli-add-note-modal')" class="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg shadow-sm transition-all flex items-center gap-1.5">
                        <span>+ Add Note</span>
                    </button>
                </div>

                <div class="space-y-3">
                    ${notes.length === 0 ? `<div class="text-center py-8 text-gray-400 text-xs bg-white rounded-2xl border border-gray-200">No internal notes logged.</div>` : ''}
                    ${notes.map(n => `
                    <div class="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm space-y-2">
                        <div class="flex items-center justify-between text-xs">
                            <span class="font-extrabold text-navy-950">📝 ${n.author || 'Admin'} <span class="text-[10px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded ml-1">${n.tag || 'General'}</span></span>
                            <span class="text-[10px] text-gray-400">${n.date}</span>
                        </div>
                        <p class="text-xs text-gray-700 leading-relaxed">${n.text}</p>
                    </div>
                    `).join('')}
                </div>
            </div>
            `;
        } else if (tab === 'cli-tab-comms') {
            // SUB-TAB 9: 📞 Omnichannel Communication History
            const comms = client.communicationHistory || [];
            body.innerHTML = `
            <div class="space-y-4">
                <div class="flex items-center justify-between">
                    <div>
                        <h4 class="text-sm font-extrabold text-navy-950">Omnichannel Touchpoint Log</h4>
                        <p class="text-xs text-gray-500">Chronological history of Phone calls, WhatsApp chats, Meetings, Emails, and Video conferences.</p>
                    </div>
                    <button onclick="window.DisicureMain.openClientSubModal('cli-add-comm-modal')" class="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg shadow-sm transition-all flex items-center gap-1.5">
                        <span>+ Log Communication</span>
                    </button>
                </div>

                <div class="space-y-3">
                    ${comms.length === 0 ? `<div class="text-center py-8 text-gray-400 text-xs bg-white rounded-2xl border border-gray-200">No touchpoints recorded.</div>` : ''}
                    ${comms.map(cm => `
                    <div class="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm space-y-2.5">
                        <div class="flex items-center justify-between text-xs border-b border-gray-100 pb-2">
                            <div class="flex items-center gap-2">
                                <span class="font-extrabold text-navy-950">${cm.type}</span>
                                <span class="text-gray-400">•</span>
                                <span class="text-gray-600">With: <strong>${cm.contactPerson}</strong></span>
                            </div>
                            <span class="text-[10px] text-gray-400">${cm.date}</span>
                        </div>
                        <p class="text-xs text-gray-800 font-medium">${cm.summary}</p>
                        ${cm.nextAction ? `
                        <div class="bg-amber-50/60 border border-amber-100 p-2 rounded-lg text-[11px] text-amber-800 flex items-center gap-1.5">
                            <span>⚡ Next Action:</span>
                            <strong>${cm.nextAction}</strong>
                        </div>
                        ` : ''}
                        <div class="text-[10px] text-gray-400 text-right">Logged by: ${cm.loggedBy || 'Sales Head'}</div>
                    </div>
                    `).join('')}
                </div>
            </div>
            `;
        }
    },

    // -------------------------------------------------------------------------
    // SUB-MODALS FOR 360° PROFILE (REQUIREMENT, PRODUCT, ORDER, PAYMENT, DOC, NOTE, COMM)
    // -------------------------------------------------------------------------
    openClientSubModal: function(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('hidden');
            modal.classList.add('flex');
        }
    },

    closeClientSubModal: function(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('flex');
            modal.classList.add('hidden');
        }
    },

    saveClientRequirement: function(event) {
        if (event) event.preventDefault();
        if (!this.activeClientId || !window.DisicureClients) return;

        const form = event.target;
        const formData = new FormData(form);

        window.DisicureClients.addClientRequirement(this.activeClientId, {
            title: formData.get('title'),
            category: formData.get('category'),
            specifications: formData.get('specifications'),
            batchSize: formData.get('batchSize'),
            budget: formData.get('budget')
        });

        this.showToast('success', 'Pharmaceutical requirement added!');
        this.closeClientSubModal('cli-add-req-modal');
        form.reset();
        this.openClient360Modal(this.activeClientId);
        this.switchClient360Tab('cli-tab-requirements');
        this.renderClientsTable();
    },

    saveClientProduct: function(event) {
        if (event) event.preventDefault();
        if (!this.activeClientId || !window.DisicureClients) return;

        const form = event.target;
        const formData = new FormData(form);

        window.DisicureClients.addClientProductService(this.activeClientId, {
            name: formData.get('name'),
            category: formData.get('category'),
            form: formData.get('form'),
            unitPrice: formData.get('unitPrice'),
            monthlyVolume: formData.get('monthlyVolume')
        });

        this.showToast('success', 'Contracted formulation saved!');
        this.closeClientSubModal('cli-add-prod-modal');
        form.reset();
        this.openClient360Modal(this.activeClientId);
        this.switchClient360Tab('cli-tab-products');
        this.renderClientsTable();
    },

    saveClientOrder: function(event) {
        if (event) event.preventDefault();
        if (!this.activeClientId || !window.DisicureClients) return;

        const form = event.target;
        const formData = new FormData(form);

        window.DisicureClients.addClientOrder(this.activeClientId, {
            poNumber: formData.get('poNumber'),
            totalAmount: formData.get('totalAmount'),
            items: formData.get('items'),
            deliveryDate: formData.get('deliveryDate'),
            status: formData.get('status')
        });

        this.showToast('success', 'Purchase order recorded successfully!');
        this.closeClientSubModal('cli-add-order-modal');
        form.reset();
        this.openClient360Modal(this.activeClientId);
        this.switchClient360Tab('cli-tab-orders');
        this.renderClientsTable();
    },

    saveClientPayment: function(event) {
        if (event) event.preventDefault();
        if (!this.activeClientId || !window.DisicureClients) return;

        const form = event.target;
        const formData = new FormData(form);

        window.DisicureClients.addClientPayment(this.activeClientId, {
            invoiceId: formData.get('invoiceId'),
            poNumber: formData.get('poNumber'),
            totalAmount: formData.get('totalAmount'),
            paidAmount: formData.get('paidAmount'),
            paymentMode: formData.get('paymentMode'),
            refNo: formData.get('refNo')
        });

        this.showToast('success', 'Tax invoice & payment settlement saved!');
        this.closeClientSubModal('cli-add-payment-modal');
        form.reset();
        this.openClient360Modal(this.activeClientId);
        this.switchClient360Tab('cli-tab-payments');
        this.renderClientsTable();
    },

    saveClientDocument: function(event) {
        if (event) event.preventDefault();
        if (!this.activeClientId || !window.DisicureClients) return;

        const form = event.target;
        const formData = new FormData(form);

        window.DisicureClients.addClientDocument(this.activeClientId, {
            title: formData.get('title'),
            category: formData.get('category'),
            fileName: formData.get('fileName')
        });

        this.showToast('success', 'Document uploaded to client vault!');
        this.closeClientSubModal('cli-add-doc-modal');
        form.reset();
        this.openClient360Modal(this.activeClientId);
        this.switchClient360Tab('cli-tab-docs');
        this.renderClientsTable();
    },

    saveClientNote: function(event) {
        if (event) event.preventDefault();
        if (!this.activeClientId || !window.DisicureClients) return;

        const form = event.target;
        const formData = new FormData(form);

        window.DisicureClients.addClientNote(
            this.activeClientId,
            formData.get('text'),
            formData.get('author'),
            formData.get('tag')
        );

        this.showToast('success', 'Internal note logged!');
        this.closeClientSubModal('cli-add-note-modal');
        form.reset();
        this.openClient360Modal(this.activeClientId);
        this.switchClient360Tab('cli-tab-notes');
        this.renderClientsTable();
    },

    saveClientComm: function(event) {
        if (event) event.preventDefault();
        if (!this.activeClientId || !window.DisicureClients) return;

        const form = event.target;
        const formData = new FormData(form);

        window.DisicureClients.addClientCommunication(this.activeClientId, {
            type: formData.get('type'),
            contactPerson: formData.get('contactPerson'),
            summary: formData.get('summary'),
            nextAction: formData.get('nextAction')
        });

        this.showToast('success', 'Communication touchpoint recorded!');
        this.closeClientSubModal('cli-add-comm-modal');
        form.reset();
        this.openClient360Modal(this.activeClientId);
        this.switchClient360Tab('cli-tab-comms');
        this.renderClientsTable();
    },

    exportClientsCSV: function() {
        if (!window.DisicureClients) return;
        const clients = window.DisicureClients.getAllClients();
        if (!clients || clients.length === 0) {
            this.showToast('error', 'No client data available to export.');
            return;
        }

        const headers = ['Client ID', 'Company Name', 'Business Type', 'Contact Person', 'Designation', 'Mobile', 'Email', 'City', 'State', 'GSTIN', 'Drug License', 'Account Status', 'Credit Limit', 'Total Orders (INR)', 'Balance Due (INR)'];
        
        const rows = clients.map(c => {
            const totOrders = (c.orders || []).reduce((sum, o) => sum + (o.totalAmount || 0), 0);
            const totDue = (c.payments || []).reduce((sum, p) => sum + (p.balanceDue || 0), 0);
            return [
                `"${c.id}"`,
                `"${(c.companyName || '').replace(/"/g, '""')}"`,
                `"${(c.businessType || '').replace(/"/g, '""')}"`,
                `"${(c.contactPerson || '').replace(/"/g, '""')}"`,
                `"${(c.designation || '').replace(/"/g, '""')}"`,
                `"${c.mobile || ''}"`,
                `"${c.email || ''}"`,
                `"${c.location ? c.location.city : ''}"`,
                `"${c.location ? c.location.state : ''}"`,
                `"${c.gstin || ''}"`,
                `"${c.drugLicense || ''}"`,
                `"${c.accountStatus || ''}"`,
                `"${c.creditLimit || ''}"`,
                `"${totOrders}"`,
                `"${totDue}"`
            ].join(',');
        });

        const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows].join('\n');
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', `Disicure_Clients_Ledger_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        this.showToast('success', 'Client Ledger exported as CSV!');
    },

    // =========================================================================
    // MODULE 14: PRODUCT & CATALOG MANAGEMENT CONTROLLER (NO-CODE CMS)
    // =========================================================================
    productState: {
        searchQuery: '',
        categoryFilter: 'all',
        statusFilter: 'all',
        sortFilter: 'newest'
    },

    renderAdminProductsTable: function() {
        if (!window.DisicureData) return;
        const allProducts = window.DisicureData.getAllProducts();

        // 1. Calculate KPI Metrics
        const total = allProducts.length;
        const active = allProducts.filter(p => !p.status || p.status.includes('Active') || p.status.includes('Stock')).length;
        const featured = allProducts.filter(p => !!p.isFeatured).length;
        const uniqueCategories = new Set(allProducts.map(p => p.category || 'tablets')).size;

        const setElText = (id, txt) => {
            const el = document.getElementById(id);
            if (el) el.innerText = txt;
        };
        setElText('adm-prod-kpi-total', total);
        setElText('adm-prod-kpi-active', active);
        setElText('adm-prod-kpi-featured', featured);
        setElText('adm-prod-kpi-cats', uniqueCategories);

        // 2. Filter & Sort Products with 9-Point Global Filters
        const gf = this.globalSearchState;
        const gq = (gf.globalQuery || '').toLowerCase().trim();
        const query = (this.productState.searchQuery || '').toLowerCase().trim();
        const catF = this.productState.categoryFilter;
        const statusF = this.productState.statusFilter;
        const sortF = this.productState.sortFilter;

        let filtered = allProducts.filter(p => {
            if (gq) {
                const matchesGq = 
                    (p.name && p.name.toLowerCase().includes(gq)) ||
                    (p.composition && p.composition.toLowerCase().includes(gq)) ||
                    (p.therapeuticCategory && p.therapeuticCategory.toLowerCase().includes(gq)) ||
                    (p.packaging && p.packaging.toLowerCase().includes(gq)) ||
                    (p.details && p.details.toLowerCase().includes(gq)) ||
                    (p.category && p.category.toLowerCase().includes(gq)) ||
                    (p.id && p.id.toLowerCase().includes(gq)) ||
                    (p.slug && p.slug.toLowerCase().includes(gq));
                if (!matchesGq) return false;
            }

            // 1. Name Filter
            if (gf.name && !(p.name && p.name.toLowerCase().includes(gf.name.toLowerCase().trim()))) return false;

            // 5. Product Filter
            if (gf.product && !((p.name && p.name.toLowerCase().includes(gf.product.toLowerCase().trim())) || (p.composition && p.composition.toLowerCase().includes(gf.product.toLowerCase().trim())) || (p.category && p.category.toLowerCase().includes(gf.product.toLowerCase().trim())))) return false;

            // 7. Status Filter
            if (gf.leadStatus && gf.leadStatus !== 'all') {
                const cleanStatus = gf.leadStatus.replace(/[^\w]/g, '').toLowerCase();
                const pStatus = (p.status || '').replace(/[^\w]/g, '').toLowerCase();
                if (!pStatus.includes(cleanStatus)) return false;
            }

            // Local Product Filters
            const matchesQuery = !query ||
                (p.name && p.name.toLowerCase().includes(query)) ||
                (p.composition && p.composition.toLowerCase().includes(query)) ||
                (p.therapeuticCategory && p.therapeuticCategory.toLowerCase().includes(query)) ||
                (p.packaging && p.packaging.toLowerCase().includes(query)) ||
                (p.details && p.details.toLowerCase().includes(query)) ||
                (p.id && p.id.toLowerCase().includes(query)) ||
                (p.slug && p.slug.toLowerCase().includes(query));

            const matchesCat = (catF === 'all') || ((p.category || '').toLowerCase() === catF.toLowerCase());
            const matchesStatus = (statusF === 'all') || (p.status === statusF);

            return matchesQuery && matchesCat && matchesStatus;
        });

        // Sorting
        if (sortF === 'name-asc') {
            filtered.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
        } else if (sortF === 'category') {
            filtered.sort((a, b) => (a.category || '').localeCompare(b.category || ''));
        } else if (sortF === 'featured') {
            filtered.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
        }

        // Update count indicator
        setElText('adm-prod-showing-count', `Showing ${filtered.length} of ${allProducts.length} pharmaceutical formulations`);

        // Render Table Rows
        const tbody = document.getElementById('adm-products-tbody');
        const emptyState = document.getElementById('adm-prod-empty');
        if (!tbody) return;

        if (filtered.length === 0) {
            tbody.innerHTML = '';
            if (emptyState) emptyState.classList.remove('hidden');
            return;
        }

        if (emptyState) emptyState.classList.add('hidden');

        tbody.innerHTML = filtered.map(p => {
            // Status Badge
            let statusBadge = '';
            const st = p.status || 'Active / In Stock';
            if (st.includes('Low')) {
                statusBadge = `<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">🟡 Low Stock</span>`;
            } else if (st.includes('Upcoming')) {
                statusBadge = `<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">🔵 Upcoming</span>`;
            } else if (st.includes('Active') || st.includes('Stock')) {
                statusBadge = `<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">🟢 In Stock</span>`;
            } else {
                statusBadge = `<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">🔴 ${st}</span>`;
            }

            // Featured Badge
            const featuredBadge = p.isFeatured
                ? `<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-extrabold bg-amber-50 text-amber-800 border border-amber-200">⭐ Featured</span>`
                : `<span class="text-[10px] text-gray-400">Regular</span>`;

            // Image Thumbnail
            const imgSrc = p.image || 'images/logo.jpg';

            return `
            <tr class="border-b border-gray-100 hover:bg-slate-50 text-xs transition-colors">
                <td class="p-4 text-center">
                    <div class="w-12 h-12 rounded-xl bg-slate-100 border border-gray-200 overflow-hidden mx-auto flex items-center justify-center group relative cursor-pointer" onclick="window.DisicureMain.openEditProductModal('${p.id}')">
                        <img src="${imgSrc}" alt="${p.name}" class="w-full h-full object-contain p-1 group-hover:scale-110 transition-transform">
                    </div>
                </td>
                <td class="p-4">
                    <span class="font-extrabold text-navy-950 block hover:text-blue-600 cursor-pointer" onclick="window.DisicureMain.openEditProductModal('${p.id}')">
                        ${p.name}
                    </span>
                    <a href="#/product/${p.slug}" class="text-[10px] text-blue-600 font-mono hover:underline block mt-0.5">
                        #/product/${p.slug}
                    </a>
                </td>
                <td class="p-4">
                    <span class="font-bold text-blue-900 block line-clamp-1">${p.composition}</span>
                    <span class="text-[10px] text-gray-500 block mt-0.5">${p.therapeuticCategory || 'General Healthcare'}</span>
                </td>
                <td class="p-4">
                    <span class="font-semibold text-gray-800 block">${p.dosageForm || 'Tablet'} (${(p.category || 'tablets').toUpperCase()})</span>
                    <span class="text-[10px] text-gray-500 block mt-0.5">📦 ${p.details || 'Standard'}</span>
                </td>
                <td class="p-4">
                    <span class="font-medium text-gray-700 block">${p.packaging || 'PVC-Alu Blister'}</span>
                    <span class="text-[10px] text-gray-400 font-mono">${p.id}</span>
                </td>
                <td class="p-4 whitespace-nowrap">
                    <div class="space-y-1">
                        <div>${statusBadge}</div>
                        <div>${featuredBadge}</div>
                    </div>
                </td>
                <td class="p-4 text-right whitespace-nowrap">
                    <div class="flex items-center justify-end gap-1.5">
                        <button onclick="window.DisicureMain.openEditProductModal('${p.id}')" title="Edit Product" class="px-2.5 py-1.5 bg-blue-50 hover:bg-blue-600 hover:text-white text-blue-700 rounded-lg text-xs font-bold transition-all flex items-center gap-1 border border-blue-100">
                            <span>✏️ Edit</span>
                        </button>
                        <a href="#/product/${p.slug}" target="_blank" title="View Live Product Page" class="p-1.5 bg-slate-100 hover:bg-slate-200 text-gray-700 rounded-lg text-xs font-bold transition-colors">
                            👁️
                        </a>
                        <button onclick="window.DisicureMain.deleteProduct('${p.id}')" title="Delete Product" class="p-1.5 bg-rose-50 hover:bg-rose-600 hover:text-white text-rose-600 rounded-lg text-xs font-bold transition-colors">
                            🗑️
                        </button>
                    </div>
                </td>
            </tr>
            `;
        }).join('');
    },

    filterProductsTable: function() {
        const searchInput = document.getElementById('adm-prod-search-input');
        const catFilter = document.getElementById('adm-prod-cat-filter');
        const statusFilter = document.getElementById('adm-prod-status-filter');
        const sortFilter = document.getElementById('adm-prod-sort-select');

        if (searchInput) this.productState.searchQuery = searchInput.value;
        if (catFilter) this.productState.categoryFilter = catFilter.value;
        if (statusFilter) this.productState.statusFilter = statusFilter.value;
        if (sortFilter) this.productState.sortFilter = sortFilter.value;

        this.renderAdminProductsTable();
    },

    resetProductFilters: function() {
        this.productState = {
            searchQuery: '',
            categoryFilter: 'all',
            statusFilter: 'all',
            sortFilter: 'newest'
        };

        const searchInput = document.getElementById('adm-prod-search-input');
        const catFilter = document.getElementById('adm-prod-cat-filter');
        const statusFilter = document.getElementById('adm-prod-status-filter');
        const sortFilter = document.getElementById('adm-prod-sort-select');

        if (searchInput) searchInput.value = '';
        if (catFilter) catFilter.value = 'all';
        if (statusFilter) statusFilter.value = 'all';
        if (sortFilter) sortFilter.value = 'newest';

        this.renderAdminProductsTable();
    },

    openCreateProductModal: function() {
        const form = document.getElementById('adm-product-form');
        if (form) form.reset();
        
        const editId = document.getElementById('prod-form-edit-id');
        if (editId) editId.value = '';
        
        const imgData = document.getElementById('prod-form-image-data');
        if (imgData) imgData.value = 'images/logo.jpg';

        const previewImg = document.getElementById('prod-form-preview-img');
        if (previewImg) previewImg.src = 'images/logo.jpg';

        const previewText = document.getElementById('prod-form-preview-text');
        if (previewText) previewText.innerText = 'Default Logo / Placeholder';

        const title = document.getElementById('adm-prod-modal-title');
        if (title) title.innerText = 'Add New Pharmaceutical Product';

        const modal = document.getElementById('adm-product-modal');
        if (modal) {
            modal.classList.remove('hidden');
            modal.classList.add('flex');
        }
    },

    openEditProductModal: function(productId) {
        if (!window.DisicureData) return;
        const prod = window.DisicureData.getProductById(productId) || window.DisicureData.getProductBySlug(productId);
        if (!prod) return;

        const setVal = (id, val) => {
            const el = document.getElementById(id);
            if (el) el.value = val !== undefined ? val : '';
        };

        setVal('prod-form-edit-id', prod.id);
        setVal('prod-form-name', prod.name);
        setVal('prod-form-comp', prod.composition);
        setVal('prod-form-therap', prod.therapeuticCategory);
        setVal('prod-form-cat', prod.category || 'tablets');
        setVal('prod-form-dosage', prod.dosageForm);
        setVal('prod-form-status', prod.status || 'Active / In Stock');
        setVal('prod-form-pack', prod.packaging);
        setVal('prod-form-details', prod.details);
        setVal('prod-form-desc', prod.description);
        
        // Indications & Benefits
        setVal('prod-form-indications', Array.isArray(prod.indications) ? prod.indications.join('\n') : (prod.indications || ''));
        setVal('prod-form-benefits', Array.isArray(prod.benefits) ? prod.benefits.join('\n') : (prod.benefits || ''));

        // Image
        setVal('prod-form-image-data', prod.image || 'images/logo.jpg');
        setVal('prod-form-image-url', prod.image || '');

        const previewImg = document.getElementById('prod-form-preview-img');
        if (previewImg) previewImg.src = prod.image || 'images/logo.jpg';

        const previewText = document.getElementById('prod-form-preview-text');
        if (previewText) previewText.innerText = 'Current Visual Asset';

        // Featured Checkbox
        const featuredCb = document.getElementById('prod-form-featured');
        if (featuredCb) featuredCb.checked = !!prod.isFeatured;

        const title = document.getElementById('adm-prod-modal-title');
        if (title) title.innerText = `Edit Formulation: ${prod.name}`;

        const modal = document.getElementById('adm-product-modal');
        if (modal) {
            modal.classList.remove('hidden');
            modal.classList.add('flex');
        }
    },

    closeProductModal: function() {
        const modal = document.getElementById('adm-product-modal');
        if (modal) {
            modal.classList.remove('flex');
            modal.classList.add('hidden');
        }
    },

    handleProductImageUpload: function(event) {
        const file = event.target.files && event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const base64 = e.target.result;
            const imgData = document.getElementById('prod-form-image-data');
            if (imgData) imgData.value = base64;

            const previewImg = document.getElementById('prod-form-preview-img');
            if (previewImg) previewImg.src = base64;

            const previewText = document.getElementById('prod-form-preview-text');
            if (previewText) previewText.innerText = `Uploaded: ${file.name} (${(file.size / 1024).toFixed(1)} KB)`;
        };
        reader.readAsDataURL(file);
    },

    handleProductImageUrlInput: function(url) {
        const cleanUrl = url.trim();
        if (!cleanUrl) return;

        const imgData = document.getElementById('prod-form-image-data');
        if (imgData) imgData.value = cleanUrl;

        const previewImg = document.getElementById('prod-form-preview-img');
        if (previewImg) previewImg.src = cleanUrl;

        const previewText = document.getElementById('prod-form-preview-text');
        if (previewText) previewText.innerText = 'Custom Image URL';
    },

    saveProductForm: function(event) {
        if (event) event.preventDefault();
        if (!window.DisicureData) return;

        const form = document.getElementById('adm-product-form');
        if (!form) return;

        const formData = new FormData(form);
        const editId = document.getElementById('prod-form-edit-id').value;
        const imgVal = document.getElementById('prod-form-image-data').value || formData.get('imageUrl') || 'images/logo.jpg';
        const isFeatured = document.getElementById('prod-form-featured').checked;

        const productData = {
            name: formData.get('name'),
            composition: formData.get('composition'),
            therapeuticCategory: formData.get('therapeuticCategory'),
            category: formData.get('category'),
            dosageForm: formData.get('dosageForm'),
            status: formData.get('status'),
            packaging: formData.get('packaging'),
            details: formData.get('details'),
            description: formData.get('description'),
            indications: (formData.get('indications') || '').split('\n').map(s => s.trim()).filter(Boolean),
            benefits: (formData.get('benefits') || '').split('\n').map(s => s.trim()).filter(Boolean),
            image: imgVal,
            isFeatured: isFeatured
        };

        if (editId) {
            window.DisicureData.updateProduct(editId, productData);
            this.showToast('success', `Product "${productData.name}" updated successfully!`);
        } else {
            const created = window.DisicureData.addProduct(productData);
            this.showToast('success', `New formulation "${created.name}" published to catalog!`);
        }

        this.closeProductModal();
        this.renderAdminProductsTable();
    },

    deleteProduct: function(productId) {
        if (!window.DisicureData) return;
        const prod = window.DisicureData.getProductById(productId) || window.DisicureData.getProductBySlug(productId);
        if (!prod) return;

        if (confirm(`Are you sure you want to delete product "${prod.name}" from catalog? This will remove it from the website.`)) {
            window.DisicureData.deleteProduct(prod.id);
            this.showToast('info', `Product "${prod.name}" removed from catalog.`);
            this.renderAdminProductsTable();
        }
    },

    resetDefaultProducts: function() {
        if (confirm('Are you sure you want to reset the product catalog to the default factory formulations? Any custom added products will be reset.')) {
            window.DisicureData.resetProductsToDefault();
            this.showToast('success', 'Product catalog restored to factory default list.');
            this.renderAdminProductsTable();
        }
    },

    exportProductsCSV: function() {
        if (!window.DisicureData) return;
        const products = window.DisicureData.getAllProducts();
        if (!products || products.length === 0) {
            this.showToast('error', 'No products available to export.');
            return;
        }

        const headers = ['Product ID', 'Product Name', 'URL Slug', 'Molecule Composition', 'Therapeutic Category', 'Dosage Category', 'Dosage Form', 'Packaging Specs', 'Pack Details', 'Status', 'Featured on Home', 'Description'];
        
        const rows = products.map(p => [
            `"${p.id}"`,
            `"${(p.name || '').replace(/"/g, '""')}"`,
            `"${p.slug || ''}"`,
            `"${(p.composition || '').replace(/"/g, '""')}"`,
            `"${(p.therapeuticCategory || '').replace(/"/g, '""')}"`,
            `"${p.category || ''}"`,
            `"${p.dosageForm || ''}"`,
            `"${(p.packaging || '').replace(/"/g, '""')}"`,
            `"${(p.details || '').replace(/"/g, '""')}"`,
            `"${p.status || 'Active'}"`,
            `"${p.isFeatured ? 'Yes' : 'No'}"`,
            `"${(p.description || '').replace(/"/g, '""')}"`
        ].join(','));

        const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows].join('\n');
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', `Disicure_Product_Catalog_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        this.showToast('success', 'Product catalog exported as CSV!');
    },

    exportTeamCSV: function() {
        if (!window.DisicureTeam) return;
        const team = window.DisicureTeam.getAllMembers();
        if (!team || team.length === 0) {
            this.showToast('error', 'No team members available to export.');
            return;
        }

        const headers = ['Member ID', 'Full Name', 'Department', 'Designation', 'System Role', 'Mobile', 'Email', 'Username', 'Account Status', 'Assigned Leads Count'];
        const rows = team.map(m => [
            `"${m.memberId || ''}"`,
            `"${(m.name || '').replace(/"/g, '""')}"`,
            `"${(m.dept || '').replace(/"/g, '""')}"`,
            `"${(m.designation || '').replace(/"/g, '""')}"`,
            `"${(m.role || '').replace(/"/g, '""')}"`,
            `"${m.mobile || ''}"`,
            `"${m.email || ''}"`,
            `"${m.username || ''}"`,
            `"${m.accountStatus || ''}"`,
            `"${m.assignedLeadsCount || 0}"`
        ].join(','));

        const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows].join('\n');
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', `Disicure_Team_Roster_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        this.showToast('success', 'Team roster exported to CSV / Excel!');
    },

    exportPartnersCSV: function() {
        if (!window.DisicurePartner) return;
        const partners = window.DisicurePartner.getAllPartners();
        if (!partners || partners.length === 0) {
            this.showToast('error', 'No partners available to export.');
            return;
        }

        const headers = ['Partner ID', 'Company Name', 'Contact Person', 'Partner Type', 'Mobile', 'Email', 'City', 'State', 'Assigned Territory', 'GSTIN', 'Drug License', 'Business Generated (INR)', 'Commission Earned (INR)', 'Payment Received (INR)', 'Pending Payment (INR)', 'Account Status', 'Account Manager'];
        const rows = partners.map(p => [
            `"${p.partnerId || ''}"`,
            `"${(p.companyName || '').replace(/"/g, '""')}"`,
            `"${(p.contactPerson || '').replace(/"/g, '""')}"`,
            `"${(p.partnerType || '').replace(/"/g, '""')}"`,
            `"${p.mobile || ''}"`,
            `"${p.email || ''}"`,
            `"${(p.city || '').replace(/"/g, '""')}"`,
            `"${(p.state || '').replace(/"/g, '""')}"`,
            `"${(p.assignedTerritory || '').replace(/"/g, '""')}"`,
            `"${p.gstin || ''}"`,
            `"${p.drugLicense || ''}"`,
            `"${p.businessGeneratedNumeric || p.businessGeneratedFormatted || 0}"`,
            `"${p.commissionEarnedNumeric || p.commissionEarnedFormatted || 0}"`,
            `"${p.paymentReceivedNumeric || p.paymentReceivedFormatted || 0}"`,
            `"${p.pendingPaymentNumeric || p.pendingPaymentFormatted || 0}"`,
            `"${p.accountStatus || ''}"`,
            `"${(p.accountManager || '').replace(/"/g, '""')}"`
        ].join(','));

        const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows].join('\n');
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', `Disicure_Partners_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        this.showToast('success', 'Partner directory exported to CSV / Excel!');
    },

    exportBusinessReportExcel: function() {
        const leads = (window.DisicureLeads && window.DisicureLeads.getAllLeads()) || [];
        const payments = (window.DisicurePayments && window.DisicurePayments.getAllPayments()) || [];
        const clients = (window.DisicureClients && window.DisicureClients.getAllClients()) || [];
        const partners = (window.DisicurePartner && window.DisicurePartner.getAllPartners()) || [];
        const products = (window.DisicureData && window.DisicureData.getAllProducts()) || [];
        const team = (window.DisicureTeam && window.DisicureTeam.getAllMembers()) || [];

        const totalRevenue = payments.reduce((acc, p) => acc + (Number(p.amountReceived) || 0), 0);
        const totalInvoiced = payments.reduce((acc, p) => acc + (Number(p.totalAmount) || 0), 0);
        const totalPending = payments.reduce((acc, p) => acc + (Number(p.pendingAmount) || 0), 0);
        const totalPartnersCommission = partners.reduce((acc, p) => acc + (Number(p.commissionEarnedNumeric) || 0), 0);

        let csv = [];
        csv.push('"DISICURE CARE PRIVATE LIMITED — COMPREHENSIVE BUSINESS AUDIT & PERFORMANCE REPORT"');
        csv.push(`"Generated Date: ${new Date().toLocaleString('en-IN')}"`);
        csv.push('"Corporate HQ: Plot No. 12, Industrial Area, Phase-II, Lucknow, Uttar Pradesh 226010, India"');
        csv.push('""');

        // Section 1: Executive KPI Summary
        csv.push('"=== 1. EXECUTIVE FINANCIAL & OPERATIONAL KPIs ==="');
        csv.push('"Metric","Value"');
        csv.push(`"Total Invoiced Business (INR)","INR ${totalInvoiced.toLocaleString('en-IN')}"`);
        csv.push(`"Total Realized Collections / Revenue (INR)","INR ${totalRevenue.toLocaleString('en-IN')}"`);
        csv.push(`"Total Outstanding Receivables (INR)","INR ${totalPending.toLocaleString('en-IN')}"`);
        csv.push(`"Total Partner Commissions Payable (INR)","INR ${totalPartnersCommission.toLocaleString('en-IN')}"`);
        csv.push(`"Total Active Client Accounts","${clients.length}"`);
        csv.push(`"Total Registered Channel Partners","${partners.length}"`);
        csv.push(`"Total Pipeline Leads","${leads.length}"`);
        csv.push(`"Total Approved Catalog Formulations","${products.length}"`);
        csv.push(`"Total Corporate Team Strength","${team.length}"`);
        csv.push('""');

        // Section 2: Recent Payments & Invoices
        csv.push('"=== 2. FINANCIAL LEDGER & INVOICE COLLECTIONS ==="');
        csv.push('"Invoice ID","Client / Partner","Total Amount (INR)","Received (INR)","Pending (INR)","Payment Date","Mode","Status"');
        payments.forEach(p => {
            csv.push(`"${p.invoiceId || ''}","${(p.clientName || '').replace(/"/g, '""')}","${p.totalAmount || 0}","${p.amountReceived || 0}","${p.pendingAmount || 0}","${p.paymentDate || ''}","${p.paymentMode || ''}","${p.paymentStatus || ''}"`);
        });
        csv.push('""');

        // Section 3: Leads Pipeline Summary
        csv.push('"=== 3. COMMERCIAL LEADS & PIPELINE STATUS ==="');
        csv.push('"Lead ID","Name","Mobile","City","Business Type","Requirement","Status","Assigned Person"');
        leads.forEach(l => {
            csv.push(`"${l.leadId || ''}","${(l.name || '').replace(/"/g, '""')}","${l.mobile || ''}","${l.city || ''}","${l.businessType || ''}","${(l.productOrService || l.requirementType || '').replace(/"/g, '""')}","${l.leadStatus || ''}","${l.assignedPerson || ''}"`);
        });
        csv.push('""');

        // Section 4: Key Client Accounts
        csv.push('"=== 4. KEY CLIENT ACCOUNTS SUMMARY ==="');
        csv.push('"Client ID","Company Name","Contact Person","Business Type","City","Account Status","Contract Value"');
        clients.forEach(c => {
            csv.push(`"${c.id || ''}","${(c.companyName || '').replace(/"/g, '""')}","${(c.contactPerson || '').replace(/"/g, '""')}","${c.businessType || ''}","${c.location?.city || ''}","${c.accountStatus || ''}","${c.totalBusinessValueFormatted || ''}"`);
        });
        csv.push('""');

        // Section 5: Partner Directory & Commissions
        csv.push('"=== 5. CHANNEL PARTNER PERFORMANCE ==="');
        csv.push('"Partner ID","Company Name","Partner Type","Territory","Business Done","Commission Earned","Pending Commission"');
        partners.forEach(prt => {
            csv.push(`"${prt.partnerId || ''}","${(prt.companyName || '').replace(/"/g, '""')}","${prt.partnerType || ''}","${(prt.assignedTerritory || '').replace(/"/g, '""')}","${prt.businessGeneratedFormatted || ''}","${prt.commissionEarnedFormatted || ''}","${prt.pendingPaymentFormatted || ''}"`);
        });

        const csvContent = 'data:text/csv;charset=utf-8,' + csv.join('\n');
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', `Disicure_Executive_Business_Report_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        this.showToast('success', 'Full Disicure Business Report exported to Excel (.CSV)!');
    },

    openPrintableReportModal: function(reportType, targetId) {
        const modal = document.getElementById('printable-report-modal');
        const titleEl = document.getElementById('printable-modal-title');
        const bodyEl = document.getElementById('printable-report-body');
        if (!modal || !bodyEl) return;

        const titles = {
            'executive': 'Disicure Care Executive Business Statement',
            'leads': 'Commercial Leads & Enquiry Pipeline Report',
            'payments': 'Corporate Financial Ledger & Invoicing Statement',
            'partners': 'Channel Partner Performance & Earnings Statement',
            'products': 'Pharmaceutical Product Formulary & Catalog Statement',
            'team': 'Corporate Organization & Team Directory Statement',
            'client': 'Enterprise Client 360° Account Dossier'
        };

        if (titleEl) {
            titleEl.innerText = titles[reportType] || 'Disicure Care Corporate Business Report';
        }

        bodyEl.innerHTML = this.renderPrintableReportContent(reportType, targetId);

        modal.classList.remove('hidden');
        modal.classList.add('flex');
        document.body.classList.add('overflow-hidden');
    },

    closePrintableReportModal: function() {
        const modal = document.getElementById('printable-report-modal');
        if (modal) {
            modal.classList.remove('flex');
            modal.classList.add('hidden');
            document.body.classList.remove('overflow-hidden');
        }
    },

    renderPrintableReportContent: function(reportType, targetId) {
        const now = new Date();
        const dateStr = now.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
        const timeStr = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
        const refId = `DISI-RPT-${now.getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

        const letterhead = `
        <div class="border-b-2 border-navy-950 pb-4 mb-6">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div class="flex items-center gap-3">
                    <img src="images/logo.jpg" alt="Disicure Care" class="h-12 w-auto object-contain" onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'48\\' height=\\'48\\' fill=\\'none\\' stroke=\\'%231e3a8a\\' viewBox=\\'0 0 24 24\\"><path stroke-linecap=\\'round\\' stroke-linejoin=\\'round\\' stroke-width=\\'2\\' d=\\'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4\\'/></svg>'">
                    <div>
                        <h1 class="text-xl font-black text-navy-950 tracking-tight uppercase">DISICURE CARE PRIVATE LIMITED</h1>
                        <p class="text-[11px] font-bold text-blue-900">Excellence in Pharmaceutical Formulations & Contract Manufacturing</p>
                    </div>
                </div>
                <div class="text-right text-[10px] text-gray-600 font-medium">
                    <p class="font-bold text-navy-950">CIN / Reg: U24232UP2026PTC123456</p>
                    <p>Plot No. 12, Industrial Area, Phase-II, Lucknow, UP 226010</p>
                    <p>Phone: +91 9792009307 | Web: www.disicurecare.com</p>
                </div>
            </div>
            <div class="mt-3 pt-2 border-t border-gray-200 flex items-center justify-between text-[11px] font-bold text-gray-500">
                <span>Statement Ref: <strong class="text-navy-950 font-mono">${refId}</strong></span>
                <span>Date of Generation: <strong class="text-navy-950">${dateStr} at ${timeStr}</strong></span>
            </div>
        </div>
        `;

        const signatureBlock = `
        <div class="mt-8 pt-6 border-t border-gray-200 grid grid-cols-2 gap-8 text-[11px]">
            <div>
                <p class="font-bold text-gray-700">Official Verification Note:</p>
                <p class="text-gray-500 text-[10px] mt-0.5 leading-relaxed">This is a system-generated commercial statement from the Disicure Care Enterprise ERP & Reporting Portal. Digitally certified & verified for internal governance and partner audits.</p>
            </div>
            <div class="text-right flex flex-col items-end">
                <div class="h-10 w-32 border-b border-dashed border-gray-400 mb-1"></div>
                <p class="font-black text-navy-950">Authorized Signatory</p>
                <p class="text-gray-500 text-[10px]">Mr. Nishant Chaturvedi (Managing Director)</p>
                <p class="text-blue-900 text-[10px] font-bold">Disicure Care Pvt. Ltd.</p>
            </div>
        </div>
        `;

        let body = '';

        if (reportType === 'leads') {
            const leads = (window.DisicureLeads && window.DisicureLeads.getAllLeads()) || [];
            body = `
                <div class="mb-4">
                    <h2 class="text-base font-extrabold text-navy-950">Commercial Leads & Pipeline Statement</h2>
                    <p class="text-xs text-gray-500">Comprehensive summary of website enquiries, phone leads, and active franchisee negotiations.</p>
                </div>
                <div class="grid grid-cols-4 gap-3 mb-6">
                    <div class="bg-blue-50/60 p-3 rounded-lg border border-blue-100">
                        <span class="text-[10px] font-bold text-blue-800 uppercase block">Total Leads</span>
                        <span class="text-xl font-black text-navy-950">${leads.length}</span>
                    </div>
                    <div class="bg-emerald-50/60 p-3 rounded-lg border border-emerald-100">
                        <span class="text-[10px] font-bold text-emerald-800 uppercase block">Converted</span>
                        <span class="text-xl font-black text-emerald-700">${leads.filter(l => (l.leadStatus || '').includes('Converted')).length}</span>
                    </div>
                    <div class="bg-amber-50/60 p-3 rounded-lg border border-amber-100">
                        <span class="text-[10px] font-bold text-amber-800 uppercase block">In Follow-up / Neg</span>
                        <span class="text-xl font-black text-amber-700">${leads.filter(l => (l.leadStatus || '').includes('Follow') || (l.leadStatus || '').includes('Negot')).length}</span>
                    </div>
                    <div class="bg-purple-50/60 p-3 rounded-lg border border-purple-100">
                        <span class="text-[10px] font-bold text-purple-800 uppercase block">New Untouched</span>
                        <span class="text-xl font-black text-purple-700">${leads.filter(l => (l.leadStatus || '').includes('New')).length}</span>
                    </div>
                </div>
                <table class="w-full text-left border-collapse text-xs">
                    <thead>
                        <tr class="bg-slate-100 border-b border-gray-300 font-extrabold text-navy-950">
                            <th class="p-2">Lead ID</th>
                            <th class="p-2">Contact Name & City</th>
                            <th class="p-2">Mobile / WhatsApp</th>
                            <th class="p-2">Business Type & Requirement</th>
                            <th class="p-2">Assigned Executive</th>
                            <th class="p-2 text-right">Status</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                        ${leads.map(l => `
                            <tr>
                                <td class="p-2 font-mono text-[11px] font-bold text-blue-900">${l.leadId || '-'}</td>
                                <td class="p-2 font-bold text-gray-900">${l.name || '-'}<span class="block text-[10px] font-normal text-gray-500">${l.city || ''}, ${l.state || ''}</span></td>
                                <td class="p-2 font-mono text-[11px] text-gray-700">${l.mobile || '-'}</td>
                                <td class="p-2 text-gray-800"><span class="font-semibold">${l.businessType || '-'}</span><span class="block text-[10px] text-gray-500">${l.productOrService || l.requirementType || '-'}</span></td>
                                <td class="p-2 text-gray-700">${l.assignedPerson || '-'}</td>
                                <td class="p-2 text-right font-bold text-[11px]">${l.leadStatus || '-'}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            `;
        } else if (reportType === 'payments') {
            const payments = (window.DisicurePayments && window.DisicurePayments.getAllPayments()) || [];
            const totalInvoiced = payments.reduce((acc, p) => acc + (Number(p.totalAmount) || 0), 0);
            const totalReceived = payments.reduce((acc, p) => acc + (Number(p.amountReceived) || 0), 0);
            const totalPending = payments.reduce((acc, p) => acc + (Number(p.pendingAmount) || 0), 0);
            body = `
                <div class="mb-4">
                    <h2 class="text-base font-extrabold text-navy-950">Corporate Financial Ledger & Receivables Statement</h2>
                    <p class="text-xs text-gray-500">Official ledger detailing customer billing, realized batch payments, and outstanding milestone dues.</p>
                </div>
                <div class="grid grid-cols-3 gap-4 mb-6">
                    <div class="bg-blue-50/60 p-3 rounded-lg border border-blue-100">
                        <span class="text-[10px] font-bold text-blue-800 uppercase block">Total Billed Business</span>
                        <span class="text-xl font-black text-navy-950">₹${totalInvoiced.toLocaleString('en-IN')}</span>
                    </div>
                    <div class="bg-emerald-50/60 p-3 rounded-lg border border-emerald-100">
                        <span class="text-[10px] font-bold text-emerald-800 uppercase block">Collections Received</span>
                        <span class="text-xl font-black text-emerald-700">₹${totalReceived.toLocaleString('en-IN')}</span>
                    </div>
                    <div class="bg-amber-50/60 p-3 rounded-lg border border-amber-100">
                        <span class="text-[10px] font-bold text-amber-800 uppercase block">Outstanding Balance</span>
                        <span class="text-xl font-black text-amber-700">₹${totalPending.toLocaleString('en-IN')}</span>
                    </div>
                </div>
                <table class="w-full text-left border-collapse text-xs">
                    <thead>
                        <tr class="bg-slate-100 border-b border-gray-300 font-extrabold text-navy-950">
                            <th class="p-2">Invoice / Ref ID</th>
                            <th class="p-2">Client / Partner Name</th>
                            <th class="p-2">Payment Date & Mode</th>
                            <th class="p-2 text-right">Invoiced (₹)</th>
                            <th class="p-2 text-right">Received (₹)</th>
                            <th class="p-2 text-right">Pending (₹)</th>
                            <th class="p-2 text-right">Status</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200 font-medium">
                        ${payments.map(p => `
                            <tr>
                                <td class="p-2 font-mono text-[11px] font-bold text-blue-900">${p.invoiceId || p.paymentId}</td>
                                <td class="p-2 font-bold text-gray-900">${p.clientName || '-'}</td>
                                <td class="p-2 text-gray-600">${p.paymentDate || '-'}<span class="block text-[10px] text-gray-400">${p.paymentMode || ''}</span></td>
                                <td class="p-2 text-right font-mono font-bold">₹${Number(p.totalAmount || 0).toLocaleString('en-IN')}</td>
                                <td class="p-2 text-right font-mono font-bold text-emerald-700">₹${Number(p.amountReceived || 0).toLocaleString('en-IN')}</td>
                                <td class="p-2 text-right font-mono font-bold text-amber-700">₹${Number(p.pendingAmount || 0).toLocaleString('en-IN')}</td>
                                <td class="p-2 text-right font-bold text-[11px]">${p.paymentStatus || '-'}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            `;
        } else if (reportType === 'partners') {
            const partners = (window.DisicurePartner && window.DisicurePartner.getAllPartners()) || [];
            const totalBusiness = partners.reduce((acc, p) => acc + (Number(p.businessGeneratedNumeric) || 0), 0);
            const totalCommissions = partners.reduce((acc, p) => acc + (Number(p.commissionEarnedNumeric) || 0), 0);
            const totalPendingComm = partners.reduce((acc, p) => acc + (Number(p.pendingPaymentNumeric) || 0), 0);
            body = `
                <div class="mb-4">
                    <h2 class="text-base font-extrabold text-navy-950">Channel Partner Performance & Commission Statement</h2>
                    <p class="text-xs text-gray-500">Performance report of authorized distributors, PCD franchisees, and institutional partners.</p>
                </div>
                <div class="grid grid-cols-3 gap-4 mb-6">
                    <div class="bg-purple-50/60 p-3 rounded-lg border border-purple-100">
                        <span class="text-[10px] font-bold text-purple-800 uppercase block">Total Partner Volume</span>
                        <span class="text-xl font-black text-navy-950">₹${totalBusiness.toLocaleString('en-IN')}</span>
                    </div>
                    <div class="bg-emerald-50/60 p-3 rounded-lg border border-emerald-100">
                        <span class="text-[10px] font-bold text-emerald-800 uppercase block">Commissions Earned</span>
                        <span class="text-xl font-black text-emerald-700">₹${totalCommissions.toLocaleString('en-IN')}</span>
                    </div>
                    <div class="bg-amber-50/60 p-3 rounded-lg border border-amber-100">
                        <span class="text-[10px] font-bold text-amber-800 uppercase block">Pending Payouts</span>
                        <span class="text-xl font-black text-amber-700">₹${totalPendingComm.toLocaleString('en-IN')}</span>
                    </div>
                </div>
                <table class="w-full text-left border-collapse text-xs">
                    <thead>
                        <tr class="bg-slate-100 border-b border-gray-300 font-extrabold text-navy-950">
                            <th class="p-2">Partner ID</th>
                            <th class="p-2">Firm & Contact</th>
                            <th class="p-2">Partner Type & Territory</th>
                            <th class="p-2 text-right">Business (₹)</th>
                            <th class="p-2 text-right">Commission (₹)</th>
                            <th class="p-2 text-right">Pending (₹)</th>
                            <th class="p-2 text-right">Status</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200 font-medium">
                        ${partners.map(p => `
                            <tr>
                                <td class="p-2 font-mono text-[11px] font-bold text-blue-900">${p.partnerId || '-'}</td>
                                <td class="p-2 font-bold text-gray-900">${p.companyName || '-'}<span class="block text-[10px] font-normal text-gray-500">${p.contactPerson || ''} (${p.city || ''})</span></td>
                                <td class="p-2 text-gray-700">${p.partnerType || '-'}<span class="block text-[10px] text-gray-400">${p.assignedTerritory || ''}</span></td>
                                <td class="p-2 text-right font-mono font-bold">₹${Number(p.businessGeneratedNumeric || 0).toLocaleString('en-IN')}</td>
                                <td class="p-2 text-right font-mono font-bold text-emerald-700">₹${Number(p.commissionEarnedNumeric || 0).toLocaleString('en-IN')}</td>
                                <td class="p-2 text-right font-mono font-bold text-amber-700">₹${Number(p.pendingPaymentNumeric || 0).toLocaleString('en-IN')}</td>
                                <td class="p-2 text-right font-bold text-[11px]">${p.accountStatus || '-'}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            `;
        } else if (reportType === 'products') {
            const products = (window.DisicureData && window.DisicureData.getAllProducts()) || [];
            body = `
                <div class="mb-4">
                    <h2 class="text-base font-extrabold text-navy-950">Pharmaceutical Product Formulary & Catalog Statement</h2>
                    <p class="text-xs text-gray-500">Official schedule of approved pharmaceutical formulations, active molecular compositions, and packaging configurations.</p>
                </div>
                <div class="grid grid-cols-3 gap-4 mb-6">
                    <div class="bg-teal-50/60 p-3 rounded-lg border border-teal-100">
                        <span class="text-[10px] font-bold text-teal-800 uppercase block">Total Formulations</span>
                        <span class="text-xl font-black text-navy-950">${products.length} Products</span>
                    </div>
                    <div class="bg-blue-50/60 p-3 rounded-lg border border-blue-100">
                        <span class="text-[10px] font-bold text-blue-800 uppercase block">Active In Stock</span>
                        <span class="text-xl font-black text-blue-700">${products.filter(p => (p.status || 'Active').includes('Active') || (p.status || 'Active').includes('Stock')).length}</span>
                    </div>
                    <div class="bg-purple-50/60 p-3 rounded-lg border border-purple-100">
                        <span class="text-[10px] font-bold text-purple-800 uppercase block">Featured Lines</span>
                        <span class="text-xl font-black text-purple-700">${products.filter(p => p.isFeatured).length}</span>
                    </div>
                </div>
                <table class="w-full text-left border-collapse text-xs">
                    <thead>
                        <tr class="bg-slate-100 border-b border-gray-300 font-extrabold text-navy-950">
                            <th class="p-2">Code</th>
                            <th class="p-2">Brand Formulation Name</th>
                            <th class="p-2">Active Molecular Composition (APIs)</th>
                            <th class="p-2">Therapeutic Segment</th>
                            <th class="p-2">Packaging Specs</th>
                            <th class="p-2 text-right">Status</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200 font-medium">
                        ${products.map(p => `
                            <tr>
                                <td class="p-2 font-mono text-[11px] font-bold text-blue-900">${p.id || '-'}</td>
                                <td class="p-2 font-bold text-gray-900">${p.name || '-'}<span class="block text-[10px] font-normal text-gray-500">${p.dosageForm || p.category || ''}</span></td>
                                <td class="p-2 font-mono text-[11px] text-gray-800 font-semibold">${p.composition || '-'}</td>
                                <td class="p-2 text-gray-700">${p.therapeuticCategory || '-'}</td>
                                <td class="p-2 text-gray-600">${p.packaging || '-'}<span class="block text-[10px] text-gray-400">${p.details || ''}</span></td>
                                <td class="p-2 text-right font-bold text-[11px] text-emerald-700">${p.status || 'Active'}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            `;
        } else if (reportType === 'team') {
            const team = (window.DisicureTeam && window.DisicureTeam.getAllMembers()) || [];
            body = `
                <div class="mb-4">
                    <h2 class="text-base font-extrabold text-navy-950">Corporate Organization & Team Directory</h2>
                    <p class="text-xs text-gray-500">Corporate hierarchy, designations, system access levels, and assigned commercial portfolios.</p>
                </div>
                <table class="w-full text-left border-collapse text-xs">
                    <thead>
                        <tr class="bg-slate-100 border-b border-gray-300 font-extrabold text-navy-950">
                            <th class="p-2">Member ID</th>
                            <th class="p-2">Full Name & Designation</th>
                            <th class="p-2">Department</th>
                            <th class="p-2">System Role</th>
                            <th class="p-2">Contact Details</th>
                            <th class="p-2 text-right">Status</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200 font-medium">
                        ${team.map(m => `
                            <tr>
                                <td class="p-2 font-mono text-[11px] font-bold text-blue-900">${m.memberId || '-'}</td>
                                <td class="p-2 font-bold text-gray-900">${m.name || '-'}<span class="block text-[10px] font-normal text-gray-500">${m.designation || ''}</span></td>
                                <td class="p-2 text-gray-700">${m.dept || '-'}</td>
                                <td class="p-2 text-gray-800 font-bold">${m.role || '-'}</td>
                                <td class="p-2 text-gray-600 text-[11px] font-mono">${m.email || ''}<span class="block text-[10px] text-gray-500">${m.mobile || ''}</span></td>
                                <td class="p-2 text-right font-bold text-[11px] text-emerald-700">${m.accountStatus || 'Active'}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            `;
        } else {
            // Default: Executive Business Summary
            const leads = (window.DisicureLeads && window.DisicureLeads.getAllLeads()) || [];
            const payments = (window.DisicurePayments && window.DisicurePayments.getAllPayments()) || [];
            const clients = (window.DisicureClients && window.DisicureClients.getAllClients()) || [];
            const partners = (window.DisicurePartner && window.DisicurePartner.getAllPartners()) || [];
            const products = (window.DisicureData && window.DisicureData.getAllProducts()) || [];
            const totalRevenue = payments.reduce((acc, p) => acc + (Number(p.amountReceived) || 0), 0);
            const totalInvoiced = payments.reduce((acc, p) => acc + (Number(p.totalAmount) || 0), 0);
            const totalPending = payments.reduce((acc, p) => acc + (Number(p.pendingAmount) || 0), 0);

            body = `
                <div class="mb-4">
                    <h2 class="text-base font-extrabold text-navy-950">Executive Business Performance & Audit Statement</h2>
                    <p class="text-xs text-gray-500">Consolidated executive snapshot of revenue, accounts receivable, client onboarding, and franchise distribution channels.</p>
                </div>
                <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                    <div class="bg-blue-50/60 p-3 rounded-lg border border-blue-100">
                        <span class="text-[10px] font-bold text-blue-800 uppercase block">Total Billed Turnover</span>
                        <span class="text-xl font-black text-navy-950">₹${totalInvoiced.toLocaleString('en-IN')}</span>
                    </div>
                    <div class="bg-emerald-50/60 p-3 rounded-lg border border-emerald-100">
                        <span class="text-[10px] font-bold text-emerald-800 uppercase block">Realized Revenue</span>
                        <span class="text-xl font-black text-emerald-700">₹${totalRevenue.toLocaleString('en-IN')}</span>
                    </div>
                    <div class="bg-amber-50/60 p-3 rounded-lg border border-amber-100">
                        <span class="text-[10px] font-bold text-amber-800 uppercase block">Pending Receivables</span>
                        <span class="text-xl font-black text-amber-700">₹${totalPending.toLocaleString('en-IN')}</span>
                    </div>
                    <div class="bg-purple-50/60 p-3 rounded-lg border border-purple-100">
                        <span class="text-[10px] font-bold text-purple-800 uppercase block">Enterprise Clients</span>
                        <span class="text-xl font-black text-purple-700">${clients.length} Accounts</span>
                    </div>
                </div>
                <div class="space-y-4">
                    <div class="border border-gray-200 rounded-lg p-3 bg-slate-50/50">
                        <h3 class="text-xs font-bold text-navy-950 uppercase tracking-wider mb-2">Key Operational Milestones</h3>
                        <ul class="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                            <li class="p-2 bg-white rounded border border-gray-100"><strong class="text-navy-950 font-bold block">📦 Formulations:</strong> ${products.length} Approved Products</li>
                            <li class="p-2 bg-white rounded border border-gray-100"><strong class="text-navy-950 font-bold block">🤝 Channel Network:</strong> ${partners.length} Regional Partners</li>
                            <li class="p-2 bg-white rounded border border-gray-100"><strong class="text-navy-950 font-bold block">🎯 Leads Pipeline:</strong> ${leads.length} Enquiries Tracked</li>
                        </ul>
                    </div>
                </div>
            `;
        }

        return `
            <div class="space-y-4 text-slate-800">
                ${letterhead}
                ${body}
                ${signatureBlock}
            </div>
        `;
    },

    // =========================================================================
    // --- MODULE 18: ENTERPRISE NOTIFICATION SYSTEM & WHATSAPP GATEWAY -------
    // =========================================================================
    openNotificationDrawer: function() {
        const drawer = document.getElementById('notification-center-drawer');
        if (drawer) {
            drawer.classList.remove('hidden');
            this.renderNotifications();
            document.body.classList.add('overflow-hidden');
        }
    },

    closeNotificationDrawer: function() {
        const drawer = document.getElementById('notification-center-drawer');
        if (drawer) {
            drawer.classList.add('hidden');
            document.body.classList.remove('overflow-hidden');
        }
    },

    filterNotifications: function(category) {
        this.notifFilterState.category = category;
        const btns = document.querySelectorAll('.notif-filter-btn');
        btns.forEach(btn => {
            btn.classList.remove('bg-blue-600', 'text-white');
            btn.classList.add('bg-slate-200', 'text-gray-700');
        });

        const activeBtn = document.getElementById(`btn-notif-filter-${category}`);
        if (activeBtn) {
            activeBtn.classList.remove('bg-slate-200', 'text-gray-700');
            activeBtn.classList.add('bg-blue-600', 'text-white');
        }

        this.renderNotifications();
    },

    renderNotifications: function() {
        if (!window.DisicureNotifications) return;
        const allNotifs = window.DisicureNotifications.getAllNotifications();
        const unreadCount = window.DisicureNotifications.getUnreadCount();

        const countLabel = document.getElementById('notif-count-label');
        if (countLabel) {
            countLabel.innerText = unreadCount === 0 
                ? 'All Caught Up (0 Unread)' 
                : `${unreadCount} Unread Alert${unreadCount > 1 ? 's' : ''}`;
        }

        // Filter by category
        const cat = this.notifFilterState.category;
        const filtered = cat === 'all' ? allNotifs : allNotifs.filter(n => n.category === cat);

        const container = document.getElementById('notification-list-container');
        if (!container) return;

        if (filtered.length === 0) {
            container.innerHTML = `
                <div class="py-12 text-center text-gray-400">
                    <div class="w-12 h-12 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-2 text-xl">
                        🔔
                    </div>
                    <p class="text-xs font-bold text-gray-700">No Notifications in this folder</p>
                    <p class="text-[11px] text-gray-400">You're all caught up with business alerts.</p>
                </div>
            `;
            return;
        }

        container.innerHTML = filtered.map(n => `
            <div class="p-3.5 rounded-xl border ${n.read ? 'bg-white border-gray-100 text-gray-600' : 'bg-blue-50/50 border-blue-200 text-navy-950 shadow-sm'} transition-all hover:shadow-md space-y-2">
                <div class="flex items-start justify-between gap-2">
                    <div class="flex items-start gap-2.5">
                        <span class="text-xl p-1.5 rounded-lg ${n.read ? 'bg-gray-100' : 'bg-blue-100'}">${n.icon || '🔔'}</span>
                        <div>
                            <div class="flex items-center gap-2">
                                <h4 class="text-xs font-extrabold ${n.read ? 'text-gray-800' : 'text-blue-950'}">${n.title}</h4>
                                ${!n.read ? '<span class="w-2 h-2 rounded-full bg-blue-600 inline-block"></span>' : ''}
                            </div>
                            <p class="text-[11px] text-gray-600 leading-relaxed mt-0.5">${n.message}</p>
                        </div>
                    </div>
                    <button onclick="window.DisicureMain.deleteNotificationItem('${n.id}')" class="text-gray-400 hover:text-rose-600 p-1 text-xs" title="Dismiss">
                        ✕
                    </button>
                </div>

                <div class="flex items-center justify-between pt-2 border-t ${n.read ? 'border-gray-50' : 'border-blue-100'} text-[10px]">
                    <span class="text-gray-400 font-mono">${n.timestamp || n.timeAgo}</span>
                    <div class="flex items-center gap-2">
                        ${n.phone ? `
                            <button onclick="window.DisicureMain.openWhatsAppModal('${n.phone}', 'custom', '${encodeURIComponent(n.whatsappPayload || n.message)}')" class="px-2 py-1 rounded bg-emerald-50 text-emerald-700 font-bold hover:bg-emerald-100 flex items-center gap-1 transition-colors">
                                <span>💬 WhatsApp</span>
                            </button>
                        ` : ''}
                        <button onclick="window.DisicureMain.handleNotificationAction('${n.id}')" class="px-2.5 py-1 rounded bg-blue-600 text-white font-bold hover:bg-blue-700 transition-colors">
                            ${n.actionLabel || 'Open'} &rarr;
                        </button>
                    </div>
                </div>
            </div>
        `).join('');

        window.DisicureNotifications.updateBadgeCounters();
    },

    markNotificationRead: function(id) {
        if (window.DisicureNotifications) {
            window.DisicureNotifications.markAsRead(id);
            this.renderNotifications();
        }
    },

    markAllNotificationsRead: function() {
        if (window.DisicureNotifications) {
            window.DisicureNotifications.markAllAsRead();
            this.renderNotifications();
            this.showToast('info', 'All notifications marked as read.');
        }
    },

    clearAllNotifications: function() {
        if (window.DisicureNotifications) {
            window.DisicureNotifications.clearAllNotifications();
            this.renderNotifications();
            this.showToast('info', 'Notification box cleared.');
        }
    },

    deleteNotificationItem: function(id) {
        if (window.DisicureNotifications) {
            window.DisicureNotifications.deleteNotification(id);
            this.renderNotifications();
        }
    },

    handleNotificationAction: function(notifId) {
        if (!window.DisicureNotifications) return;
        const allNotifs = window.DisicureNotifications.getAllNotifications();
        const n = allNotifs.find(item => item.id === notifId);
        if (!n) return;

        window.DisicureNotifications.markAsRead(notifId);
        this.closeNotificationDrawer();

        if (n.actionTab) {
            this.switchAdminTab(n.actionTab);
        }
    },

    // --- WHATSAPP BUSINESS GATEWAY CONTROLLER (Module 18) ---
    openWhatsAppModal: function(recipientPhone, templateKey, customPayload) {
        const modal = document.getElementById('whatsapp-gateway-modal');
        const phoneInput = document.getElementById('wa-recipient-phone');
        const templateSelect = document.getElementById('wa-template-select');
        const textarea = document.getElementById('wa-message-content');

        if (phoneInput && recipientPhone) {
            phoneInput.value = recipientPhone;
        }

        if (templateSelect && templateKey) {
            templateSelect.value = templateKey;
        }

        if (textarea) {
            if (customPayload) {
                textarea.value = decodeURIComponent(customPayload);
            } else {
                textarea.value = this.getWATemplateText(templateKey || 'lead_welcome', phoneInput ? phoneInput.value : '');
            }
        }

        if (modal) {
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            document.body.classList.add('overflow-hidden');
        }
    },

    closeWhatsAppModal: function() {
        const modal = document.getElementById('whatsapp-gateway-modal');
        if (modal) {
            modal.classList.remove('flex');
            modal.classList.add('hidden');
            document.body.classList.remove('overflow-hidden');
        }
    },

    handleWATemplateChange: function(event) {
        const key = event.target.value;
        const phone = document.getElementById('wa-recipient-phone')?.value || '+91 9792009307';
        const textarea = document.getElementById('wa-message-content');
        if (textarea) {
            textarea.value = this.getWATemplateText(key, phone);
        }
    },

    getWATemplateText: function(key, phone) {
        switch (key) {
            case 'lead_welcome':
                return `*Greetings from Disicure Care Pvt. Ltd.* 🌿\n\nThank you for reaching out to us regarding our pharmaceutical formulations & manufacturing. Our institutional sales desk is reviewing your specifications and will provide the official quotation shortly.\n\n📞 Direct Hotline: +91 9792009307\n🌐 Portal: https://disicurecare.com`;
            case 'payment_receipt':
                return `*Disicure Care — Payment Verification Notice* 🧾\n\nWe confirm receipt of your commercial payment against registered invoice. The funds have been credited and reconciled with our treasury ledger.\n\nThank you for your trusted partnership.\n— Commercial Finance Desk, Disicure Care Pvt. Ltd.`;
            case 'followup_reminder':
                return `*Disicure Care Follow-up Reminder* 📅\n\nDear Partner / Client, this is a scheduled touchpoint regarding your ongoing formulation inquiry and bulk purchase requirements. Please let us know a convenient time to finalize batch dispatch terms.\n\nDirector Desk: +91 9792009307`;
            case 'partner_onboarding':
                return `*Welcome to Disicure Partner Network!* 🤝\n\nYour dedicated distributor portal account has been activated with territorial exclusivity and wholesale margin terms.\n\nPortal URL: https://disicurecare.com/#/partner-login\nSupport: director@disicurecare.com`;
            case 'commission_approved':
                return `*Disicure Partner Commission Approved* 💵\n\nCongratulations! Your referral commission has been verified and approved by Disicure Admin. Disbursement has been scheduled to your registered bank account.\n\n— Executive Directorate, Disicure Care`;
            case 'document_ready':
                return `*Disicure Document Vault Notice* 📁\n\nYour requested Certificate of Analysis (COA), Wholesale Price List, or Manufacturing MSA is now available for download from your verified portal dossier.\n\nDisicure Care Pvt. Ltd.`;
            default:
                return `Hello from Disicure Care Pvt. Ltd.`;
        }
    },

    copyWhatsAppText: function() {
        const textarea = document.getElementById('wa-message-content');
        if (textarea) {
            navigator.clipboard.writeText(textarea.value);
            this.showToast('success', 'WhatsApp message copied to clipboard!');
        }
    },

    sendWhatsAppMessage: function(event) {
        if (event) event.preventDefault();
        const phone = document.getElementById('wa-recipient-phone')?.value.replace(/[^0-9]/g, '') || '919792009307';
        const msg = document.getElementById('wa-message-content')?.value || '';
        const encoded = encodeURIComponent(msg);

        // Direct WhatsApp Link
        const waUrl = `https://wa.me/${phone}?text=${encoded}`;
        window.open(waUrl, '_blank');

        if (window.DisicureSecurity && window.DisicureSecurity.logActivity) {
            window.DisicureSecurity.logActivity(
                'WhatsApp Dispatch Triggered',
                'COMMUNICATION_ACTION',
                `WhatsApp notification dispatched to recipient +${phone}.`,
                'Admin User'
            );
        }

        this.showToast('success', `WhatsApp Web launcher opened for +${phone}!`);
        this.closeWhatsAppModal();
    },

    // =========================================================================
    // --- MODULE 19: SECURITY, RBAC & AUDIT LOG ENGINE CONTROLLER -------------
    // =========================================================================
    openAdminLoginModal: function() {
        const modal = document.getElementById('admin-login-modal');
        if (modal) {
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            document.body.classList.add('overflow-hidden');
        }
    },

    closeAdminLoginModal: function() {
        const modal = document.getElementById('admin-login-modal');
        if (modal) {
            modal.classList.remove('flex');
            modal.classList.add('hidden');
            document.body.classList.remove('overflow-hidden');
            const err = document.getElementById('adm-login-error');
            if (err) err.classList.add('hidden');
        }
    },

    fillAdminDemo: function(username, password) {
        const u = document.getElementById('adm-login-user');
        const p = document.getElementById('adm-login-pwd');
        if (u) u.value = username;
        if (p) p.value = password;
    },

    handleAdminLogin: function(event) {
        event.preventDefault();
        const u = document.getElementById('adm-login-user')?.value;
        const p = document.getElementById('adm-login-pwd')?.value;
        const err = document.getElementById('adm-login-error');

        if (!window.DisicureSecurity) return;
        const result = window.DisicureSecurity.loginAdmin(u, p);

        if (result.success) {
            this.closeAdminLoginModal();
            this.updateAdminUserDisplay();
            this.renderSecurityAuditTable();
            this.renderSecurityDashboardOverview();
            this.showToast('success', `Authenticated successfully as ${result.user.name} (${result.user.role})!`);
        } else {
            if (err) {
                err.innerText = result.message || 'Invalid credentials. Please try again.';
                err.classList.remove('hidden');
            }
        }
    },

    handleAdminLogout: function() {
        if (!window.DisicureSecurity) return;
        if (confirm('Are you sure you want to end your current session?')) {
            window.DisicureSecurity.logoutAdmin();
            this.updateAdminUserDisplay();
            this.renderSecurityAuditTable();
            this.renderSecurityDashboardOverview();
            this.showToast('info', 'Logged out successfully. Re-authenticating demo session...');
            setTimeout(() => {
                this.openAdminLoginModal();
            }, 400);
        }
    },

    updateAdminUserDisplay: function() {
        if (!window.DisicureSecurity) return;
        const session = window.DisicureSecurity.getAdminSession();
        const el = document.getElementById('admin-user-display');
        const secUser = document.getElementById('sec-current-user');
        const secTime = document.getElementById('sec-current-session-time');

        if (session) {
            if (el) el.innerText = `${session.role || 'Admin'} (${session.name || session.username})`;
            if (secUser) secUser.innerText = `${session.name} — ${session.role}`;
            if (secTime) secTime.innerText = `Active Session • Signed in ${new Date(session.loginTime || Date.now()).toLocaleTimeString()}`;
        } else {
            if (el) el.innerText = '🔒 Locked Session';
            if (secUser) secUser.innerText = 'Unauthenticated Session';
            if (secTime) secTime.innerText = 'Session Expired / Logged Out';
        }
    },

    renderSecurityDashboardOverview: function() {
        if (!window.DisicureSecurity) return;
        const logs = window.DisicureSecurity.getAllAuditLogs();
        const totalCount = document.getElementById('sec-total-audit-count');
        if (totalCount) totalCount.innerText = logs.length;
        this.updateAdminUserDisplay();
    },

    renderSecurityAuditTable: function() {
        if (!window.DisicureSecurity) return;
        const allLogs = window.DisicureSecurity.getAllAuditLogs();
        const query = this.secState.searchQuery;
        const catFilter = this.secState.categoryFilter;
        const sevFilter = this.secState.severityFilter;

        let filtered = allLogs.filter(l => {
            const matchesQuery = !query ||
                (l.action && l.action.toLowerCase().includes(query)) ||
                (l.user && l.user.toLowerCase().includes(query)) ||
                (l.detail && l.detail.toLowerCase().includes(query)) ||
                (l.logId && l.logId.toLowerCase().includes(query)) ||
                (l.ipAddress && l.ipAddress.toLowerCase().includes(query));

            const matchesCat = catFilter === 'all' || l.category === catFilter;
            const matchesSev = sevFilter === 'all' || l.severity === sevFilter;

            return matchesQuery && matchesCat && matchesSev;
        });

        const tbody = document.getElementById('sec-audit-tbody');
        if (!tbody) return;

        if (filtered.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="5" class="p-8 text-center text-xs text-gray-500 font-medium">
                        No audit log records match your search filter criteria.
                    </td>
                </tr>
            `;
            return;
        }

        tbody.innerHTML = filtered.map(l => {
            const sevBadge = l.severity === 'SECURITY' 
                ? '<span class="px-2 py-0.5 rounded text-[10px] font-black bg-rose-100 text-rose-800">SECURITY</span>'
                : l.severity === 'WARNING'
                ? '<span class="px-2 py-0.5 rounded text-[10px] font-black bg-amber-100 text-amber-800">WARNING</span>'
                : '<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800">INFO</span>';

            return `
                <tr class="border-b border-gray-100 hover:bg-slate-50 transition-colors text-xs font-medium">
                    <td class="p-3.5 whitespace-nowrap">
                        <span class="font-mono font-bold text-navy-950 block">${l.logId}</span>
                        <span class="text-[10px] text-gray-400 font-mono">${l.timestamp}</span>
                    </td>
                    <td class="p-3.5 whitespace-nowrap">
                        <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-100 text-slate-700">${l.category}</span>
                    </td>
                    <td class="p-3.5 whitespace-nowrap">
                        ${sevBadge}
                    </td>
                    <td class="p-3.5">
                        <span class="font-bold text-gray-800 block">${l.user || 'System'}</span>
                        <span class="text-[10px] text-gray-400 font-mono">${l.ipAddress || 'Internal'}</span>
                    </td>
                    <td class="p-3.5">
                        <span class="font-extrabold text-navy-950 block">${l.action}</span>
                        <p class="text-[11px] text-gray-600 font-normal leading-relaxed mt-0.5">${l.detail}</p>
                    </td>
                </tr>
            `;
        }).join('');
    },

    exportSecurityAuditCSV: function() {
        if (window.DisicureSecurity && window.DisicureSecurity.exportAuditLogsCSV) {
            window.DisicureSecurity.exportAuditLogsCSV();
            this.showToast('success', 'Security & Activity Audit Log CSV exported successfully!');
        }
    }
};

// Make main controller globally accessible
window.DisicureMain = DisicureMain;

// Initialize on load
DisicureMain.init();
