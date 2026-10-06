// Disicure Care Client-Side Router with Upgraded Visual Layouts
const DisicureRouter = {
    currentRoute: null,
    
    init: function() {
        window.addEventListener('hashchange', () => this.handleRouting());
        
        if (document.readyState === 'complete' || document.readyState === 'interactive') {
            this.handleRouting();
        } else {
            window.addEventListener('DOMContentLoaded', () => this.handleRouting());
        }
    },

    handleRouting: function() {
        const hash = window.location.hash || '#/';
        this.currentRoute = hash;

        // If not home, clean up any intro overlay immediately
        if (hash !== '#/' && hash !== '#') {
            const overlay = document.getElementById('intro-overlay');
            if (overlay) overlay.remove();
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });
        this.updateNavLinks(hash);

        const appView = document.getElementById('app-view');
        if (!appView) return;

        appView.classList.remove('opacity-100');
        appView.classList.add('opacity-0');

        setTimeout(() => {
            if (window.DisicureMain && typeof window.DisicureMain.cleanupScrollytelling === 'function') {
                window.DisicureMain.cleanupScrollytelling();
            }
            appView.innerHTML = this.resolveRoute(hash);
            this.initRouteInteractions(hash);
            appView.classList.remove('opacity-0');
            appView.classList.add('opacity-100');
            
            if (window.DisicureMain && typeof window.DisicureMain.revealOnScroll === 'function') {
                window.DisicureMain.revealOnScroll();
            }
        }, 200);
    },

    updateNavLinks: function(hash) {
        const links = document.querySelectorAll('.nav-link');
        links.forEach(link => {
            const href = link.getAttribute('href');
            if (href === hash) {
                link.classList.add('active');
            } else if (hash.startsWith('#/products') && href === '#/products') {
                link.classList.add('active');
            } else if (hash.startsWith('#/services') && href === '#/services') {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        const drawer = document.getElementById('mobile-drawer');
        if (drawer && drawer.classList.contains('open')) {
            drawer.classList.remove('open');
            document.body.classList.remove('overflow-hidden');
        }
    },

    resolveRoute: function(hash) {
        if (hash === '#/' || hash === '#') {
            return this.templates.home();
        }
        if (hash === '#/about') {
            return this.templates.about();
        }
        if (hash === '#/products') {
            return this.templates.products();
        }
        if (hash === '#/services') {
            return this.templates.services();
        }
        if (hash === '#/journey') {
            return this.templates.journey();
        }
        if (hash === '#/contact') {
            return this.templates.contact();
        }
        if (hash === '#/privacy-policy') {
            return this.templates.privacyPolicy();
        }
        if (hash === '#/terms') {
            return this.templates.terms();
        }
        if (hash === '#/disclaimer') {
            return this.templates.disclaimer();
        }
        if (hash === '#/admin' || hash === '#/admin/leads' || hash === '#/leads') {
            return this.templates.adminLeads();
        }

        if (hash.startsWith('#/products/')) {
            const slug = hash.replace('#/products/', '');
            const product = window.DisicureData.products.find(p => p.slug === slug);
            if (product) {
                return this.templates.productDetail(product);
            }
        }

        if (hash.startsWith('#/services/')) {
            const slug = hash.replace('#/services/', '');
            const service = window.DisicureData.services.find(s => s.slug === slug);
            if (service) {
                return this.templates.serviceDetail(service);
            }
        }

        return this.templates.notFound();
    },

    initRouteInteractions: function(hash) {
        if (hash === '#/' || hash === '#') {
            if (window.DisicureMain) {
                window.DisicureMain.initHomeMarquee();
                window.DisicureMain.initEnquiryForms();
                
                // Add home page showcase category filter listener
                const pills = document.querySelectorAll('.showcase-filter-pill');
                pills.forEach(pill => {
                    pill.addEventListener('click', (e) => {
                        pills.forEach(p => p.classList.remove('active'));
                        e.target.classList.add('active');
                        const filterVal = e.target.getAttribute('data-filter');
                        window.DisicureMain.filterMarquee(filterVal);
                    });
                });
            }
        } else if (hash === '#/products') {
            if (window.DisicureMain) {
                window.DisicureMain.initProductCatalog();
            }
        } else if (hash === '#/contact') {
            if (window.DisicureMain) {
                window.DisicureMain.initEnquiryForms();
                
                // Contact Quick select category selection logic
                const quickPills = document.querySelectorAll('.quick-select-pill');
                const requirementSelect = document.getElementById('contact-service');
                
                quickPills.forEach(pill => {
                    pill.addEventListener('click', (e) => {
                        quickPills.forEach(p => p.classList.remove('active', 'bg-blue-600', 'text-white'));
                        quickPills.forEach(p => p.classList.add('bg-white', 'text-gray-700'));
                        
                        e.target.classList.remove('bg-white', 'text-gray-700');
                        e.target.classList.add('active', 'bg-blue-600', 'text-white');
                        
                        const val = e.target.getAttribute('data-value');
                        if (requirementSelect) {
                            requirementSelect.value = val;
                        }
                    });
                });
            }
        } else if (hash.startsWith('#/products/')) {
            if (window.DisicureMain) {
                window.DisicureMain.initEnquiryForms();
            }
        } else if (hash === '#/admin' || hash === '#/admin/leads' || hash === '#/leads') {
            if (window.DisicureMain && typeof window.DisicureMain.initAdminPanel === 'function') {
                window.DisicureMain.initAdminPanel();
            }
        }
    },

    templates: {
        // --- 1. UPGRADED HOME TEMPLATE ---
        home: function() {
            const info = window.DisicureData.companyInfo;
            const featuredProducts = window.DisicureData.products;
            
            // Build Marquee slide HTML (all 8 products staged elegantly)
            let marqueeHtml = '';
            featuredProducts.forEach(p => {
                marqueeHtml += `
                <div class="product-card-slide flex-shrink-0 w-80 bg-white border border-blue-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 mx-4 flex flex-col justify-between" data-category="${p.category}">
                    <div>
                        <div class="h-48 flex items-center justify-center bg-blue-50/20 rounded-lg mb-3 overflow-hidden relative group border border-blue-50">
                            <img src="${p.image}" alt="${p.name}" class="h-40 object-contain transition-transform duration-500 group-hover:scale-105">
                            <span class="absolute top-2 right-2 text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 bg-blue-600 text-white rounded shadow-sm">${p.dosageForm}</span>
                        </div>
                        <span class="inline-block text-[9px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded uppercase tracking-wider mb-1">${p.therapeuticCategory || 'Pharmaceutical Formulation'}</span>
                        <h3 class="text-base font-extrabold text-navy-950 mb-1 line-clamp-1">${p.name}</h3>
                        <p class="text-[11px] text-blue-600 font-bold mb-2">${p.packaging}</p>
                        <p class="text-xs text-gray-500 mb-4 line-clamp-2 h-10 font-normal leading-relaxed">${p.composition}</p>
                    </div>
                    <div class="flex gap-1.5 justify-between pt-2 border-t border-blue-50 mt-auto">
                        <a href="#/products/${p.slug}" class="flex-1 text-center py-2 bg-blue-50 text-blue-700 text-xs font-bold rounded-md hover:bg-blue-600 hover:text-white transition-colors duration-300">Details</a>
                        <button onclick="window.DisicureMain.openEnquiryModal('${p.name}')" class="py-2 px-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-md transition-colors flex items-center gap-1 justify-center whitespace-nowrap">
                            Quote
                        </button>
                        <a href="https://wa.me/919005874417?text=Hello%20Disicure%20Care%20Team%2C%20I%20need%20assistance%20regarding%20a%20product%20enquiry%20for%20${encodeURIComponent(p.name)}." target="_blank" rel="noopener noreferrer" class="py-2 px-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors flex items-center justify-center shrink-0" aria-label="WhatsApp Enquiry">
                            <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 001.33 4.982L2 22l5.233-1.371a9.994 9.994 0 004.773 1.226h.004c5.505 0 9.989-4.478 9.99-9.984a9.96 9.96 0 00-2.925-7.064 9.964 9.964 0 00-7.063-2.923zm5.035 14.175c-.276.776-1.357 1.411-1.854 1.503-.497.092-.992.176-2.915-.584-2.457-.973-4.043-3.473-4.165-3.637-.123-.164-1.002-1.332-1.002-2.541 0-1.21.635-1.803.862-2.049.227-.246.497-.307.662-.307.165 0 .331.006.475.012.148.006.348-.055.546.425.199.479.679 1.656.739 1.779.061.123.102.266.02.43-.082.164-.123.266-.246.41-.122.143-.258.32-.367.43-.122.123-.25.257-.107.502.143.246.636 1.05 1.37 1.702.946.84 1.74 1.1 1.987 1.224.246.123.389.102.532-.062.143-.164.615-.717.778-.962.164-.246.327-.205.551-.123.224.082 1.424.671 1.669.794.246.123.41.184.471.287.062.102.062.594-.214 1.37z"/></svg>
                        </a>
                    </div>
                </div>
                `;
            });

            // Asymmetric Capabilities Grid
            const capList = [
                { title: "Third-Party Manufacturing", desc: "Professional pharmaceutical manufacturing solutions tailored around partner brand requirements and batch specifications.", icon: "factory", sizeClass: "cap-card-wide" },
                { title: "Custom Product Development", desc: "Customized molecule combinations and formulation support from concept to market-ready formulations.", icon: "beaker", sizeClass: "" },
                { title: "Custom Pharmaceutical Designing", desc: "Professional logo, catalog, packshot packaging designs aligned with corporate regulatory guidelines.", icon: "design", sizeClass: "" },
                { title: "Private Label Manufacturing", desc: "Launch complete medical lines under your exclusive label with full infrastructure and manufacturing support.", icon: "tag", sizeClass: "cap-card-wide" },
                { title: "Pharmaceutical Packaging", desc: "Premium protection using high-end Blister (PVC-Alu) or Alu-Alu configurations designed for safety.", icon: "box", sizeClass: "" },
                { title: "Quality Assurance & QC", desc: "Meticulous quality control processes ensuring consistency and strict compliance with national safety standards.", icon: "shield", sizeClass: "" }
            ];

            let capabilitiesHtml = '';
            capList.forEach(c => {
                capabilitiesHtml += `
                <div class="bg-white border border-blue-100 p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 scroll-reveal ${c.sizeClass}">
                    <div class="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-5">
                        ${DisicureRouter.icons[c.icon]}
                    </div>
                    <h3 class="text-lg font-extrabold text-navy-950 mb-3">${c.title}</h3>
                    <p class="text-sm text-gray-600 leading-relaxed font-normal">${c.desc}</p>
                </div>
                `;
            });

            // Journey timeline HTML
            let journeyHtml = '';
            window.DisicureData.journey.forEach((j, index) => {
                journeyHtml += `
                <div class="relative flex flex-col items-center flex-1 min-w-[220px] text-center px-4 group scroll-reveal">
                    ${index < window.DisicureData.journey.length - 1 ? `
                    <div class="hidden lg:block absolute top-8 left-1/2 w-full h-[2px] bg-blue-100 group-hover:bg-blue-300 transition-colors duration-500 z-0"></div>
                    ` : ''}
                    <div class="w-16 h-16 rounded-full bg-white border-2 border-blue-500 text-blue-600 flex items-center justify-center shadow-md relative z-10 transition-transform duration-300 group-hover:scale-110 mb-4">
                        <span class="absolute -top-3 text-[10px] font-bold px-2 py-0.5 bg-blue-600 text-white rounded-full">${j.stage}</span>
                        ${j.icon}
                    </div>
                    <h4 class="text-sm font-extrabold text-navy-950 mb-2">${j.title}</h4>
                    <p class="text-xs text-gray-500 leading-relaxed max-w-[190px] font-normal">${j.desc}</p>
                </div>
                `;
            });

            // Numbered Services list HTML
            let servicesListHtml = '';
            window.DisicureData.services.slice(0, 10).forEach(s => {
                servicesListHtml += `
                <a href="#/services/${s.slug}" class="flex items-center justify-between p-4 bg-white border border-blue-50 rounded-lg hover:border-blue-500 hover:shadow-sm transition-all duration-300 scroll-reveal">
                    <div class="flex items-center gap-4">
                        <span class="text-sm font-extrabold text-blue-500 bg-blue-50/50 w-8 h-8 rounded-full flex items-center justify-center">${s.number}</span>
                        <span class="text-sm font-bold text-navy-950">${s.title}</span>
                    </div>
                    <span class="text-gray-300 hover:text-blue-600 transition-colors">
                        ${DisicureRouter.icons.arrowRight}
                    </span>
                </a>
                `;
            });

            return `
            <!-- Premium Pharmaceutical Corporate Hero Section -->
            <section class="relative w-full bg-gradient-to-br from-[#06142a] via-[#0a1e3f] to-[#07162c] text-white border-b border-blue-900/50 py-12 lg:py-16 overflow-hidden">
                <!-- Ambient scientific background glow & grid elements -->
                <div class="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                    <div class="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/15 rounded-full filter blur-3xl"></div>
                    <div class="absolute -bottom-24 -left-24 w-96 h-96 bg-teal-500/10 rounded-full filter blur-3xl"></div>
                    <div class="absolute inset-0 bg-[radial-gradient(#3b82f615_1px,transparent_1px)] [background-size:24px_24px] opacity-40"></div>
                </div>
                
                <div class="max-w-7xl mx-auto px-4 lg:px-8 w-full relative z-10">
                    <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
                        
                        <!-- Left Column: Authority Corporate Proposition & Lead CTAs -->
                        <div class="lg:col-span-7 space-y-6 scroll-reveal">
                            <!-- Live Enterprise Badge -->
                            <div class="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-blue-950/90 border border-blue-500/30 text-blue-200 text-xs font-semibold backdrop-blur-md shadow-sm">
                                <span class="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                                <span class="tracking-wider uppercase text-[11px] font-bold text-cyan-300">Trusted B2B Pharmaceutical Partner & Manufacturer</span>
                            </div>
                            
                            <!-- Master Authority Headline -->
                            <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.18]">
                                Quality-Driven <span class="bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-300 bg-clip-text text-transparent">Pharmaceutical Manufacturing</span> & Strategic B2B Solutions
                            </h1>
                            
                            <!-- Corporate Narrative & Value Proposition -->
                            <p class="text-sm sm:text-base text-blue-100/85 leading-relaxed font-normal max-w-2xl">
                                Disicure Care Pvt. Ltd. provides scalable, WHO/GMP-compliant Contract Manufacturing, PCD Pharma Franchise distribution networks, Formulation R&D, and Bulk Institutional Supplies. We empower distributors, hospitals, and pharma enterprises with dependable quality and pan-India supply capability.
                            </p>
                            
                            <!-- Core Focus Area Badges (5 Strategic Pillars) -->
                            <div class="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1 max-w-xl">
                                <div class="flex items-center gap-2 bg-blue-900/40 border border-blue-600/30 px-3 py-2 rounded-lg text-xs text-blue-100 backdrop-blur-sm">
                                    <span class="text-cyan-400 shrink-0">${DisicureRouter.icons.factory}</span>
                                    <span class="font-semibold text-[11px]">Contract / Third-Party Mfg</span>
                                </div>
                                <div class="flex items-center gap-2 bg-blue-900/40 border border-blue-600/30 px-3 py-2 rounded-lg text-xs text-blue-100 backdrop-blur-sm">
                                    <span class="text-cyan-400 shrink-0">${DisicureRouter.icons.tag}</span>
                                    <span class="font-semibold text-[11px]">PCD Pharma Marketing</span>
                                </div>
                                <div class="flex items-center gap-2 bg-blue-900/40 border border-blue-600/30 px-3 py-2 rounded-lg text-xs text-blue-100 backdrop-blur-sm">
                                    <span class="text-cyan-400 shrink-0">${DisicureRouter.icons.beaker}</span>
                                    <span class="font-semibold text-[11px]">Formulation R&D</span>
                                </div>
                                <div class="flex items-center gap-2 bg-blue-900/40 border border-blue-600/30 px-3 py-2 rounded-lg text-xs text-blue-100 backdrop-blur-sm">
                                    <span class="text-cyan-400 shrink-0">${DisicureRouter.icons.box}</span>
                                    <span class="font-semibold text-[11px]">Institutional & Bulk Supply</span>
                                </div>
                                <div class="flex items-center gap-2 bg-blue-900/40 border border-blue-600/30 px-3 py-2 rounded-lg text-xs text-blue-100 backdrop-blur-sm sm:col-span-2">
                                    <span class="text-cyan-400 shrink-0">${DisicureRouter.icons.shield}</span>
                                    <span class="font-semibold text-[11px]">Private Label & Packaging Solutions</span>
                                </div>
                            </div>
                            
                            <!-- High-Impact 4-Button Corporate CTA Action Strip -->
                            <div class="pt-3 flex flex-wrap items-center gap-3">
                                <!-- CTA 1: Enquire Now -->
                                <button onclick="window.DisicureMain.openEnquiryModal('General Hero B2B Enquiry', 'Product Enquiry')" class="px-5 py-3 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg shadow-lg hover:shadow-blue-500/30 uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 transform hover:-translate-y-0.5">
                                    <span>Enquire Now</span>
                                    ${DisicureRouter.icons.arrowRight}
                                </button>
                                
                                <!-- CTA 2: Become a Partner -->
                                <button onclick="window.DisicureMain.openEnquiryModal('PCD Franchise & Distribution Partnership', 'PCD Franchise')" class="px-5 py-3 bg-navy-950/90 hover:bg-navy-900 border border-blue-400/40 text-blue-100 hover:text-white text-xs font-bold rounded-lg shadow-sm uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 transform hover:-translate-y-0.5">
                                    <svg class="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
                                    <span>Become a Partner</span>
                                </button>

                                <!-- CTA 3: Generate Business Lead -->
                                <button onclick="window.DisicureMain.openEnquiryModal('Contract Manufacturing Business Lead', 'Third-Party Manufacturing')" class="px-5 py-3 bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-white text-xs font-bold rounded-lg shadow-lg hover:shadow-teal-500/30 uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 transform hover:-translate-y-0.5">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                                    <span>Generate Business Lead</span>
                                </button>
                                
                                <!-- CTA 4: WhatsApp Us -->
                                <a href="https://wa.me/919005874417?text=Hello%20Disicure%20Care%20Team%2C%20I%20am%20interested%20in%20your%20pharmaceutical%20business%20solutions.%20Please%20share%20details%20and%20quotation." target="_blank" rel="noopener noreferrer" class="px-5 py-3 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold rounded-lg shadow-md hover:shadow-green-500/30 uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 transform hover:-translate-y-0.5">
                                    <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                                    <span>WhatsApp Us</span>
                                </a>
                            </div>
                        </div>
                        
                        <!-- Right Column: Corporate Pharmaceutical Solutions Hub & Dashboard -->
                        <div class="lg:col-span-5 scroll-reveal">
                            <div class="relative w-full max-w-lg mx-auto">
                                <!-- Ambient glow border -->
                                <div class="absolute -inset-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl blur-lg opacity-25"></div>
                                
                                <div class="relative bg-[#0d2246]/95 border border-blue-400/30 rounded-2xl p-6 sm:p-7 backdrop-blur-xl shadow-2xl space-y-5">
                                    <!-- Panel Top Indicator -->
                                    <div class="flex items-center justify-between border-b border-blue-800/60 pb-3.5">
                                        <div>
                                            <span class="text-[10px] font-bold text-cyan-400 uppercase tracking-widest block">Operational Capabilities</span>
                                            <h3 class="text-base font-extrabold text-white">B2B Pharmaceutical Solutions Hub</h3>
                                        </div>
                                        <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[10px] font-bold uppercase tracking-wider">
                                            <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                                            Active Capacity
                                        </span>
                                    </div>

                                    <!-- 4 Division Cards -->
                                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                        <!-- Division 1 -->
                                        <div onclick="window.DisicureMain.openEnquiryModal('Contract Manufacturing Enquiry', 'Third-Party Manufacturing')" class="p-3.5 rounded-xl bg-blue-950/70 border border-blue-700/40 hover:border-cyan-400/60 transition-all duration-200 cursor-pointer group">
                                            <div class="w-8 h-8 rounded-lg bg-blue-600/20 text-cyan-300 flex items-center justify-center mb-2.5 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                                ${DisicureRouter.icons.factory}
                                            </div>
                                            <h4 class="font-bold text-white text-xs mb-1">Contract Manufacturing</h4>
                                            <p class="text-[10px] text-blue-200/75 leading-relaxed">High-volume tablet, capsule & liquid oral production.</p>
                                        </div>

                                        <!-- Division 2 -->
                                        <div onclick="window.DisicureMain.openEnquiryModal('PCD Pharma Franchise Enquiry', 'PCD Franchise')" class="p-3.5 rounded-xl bg-blue-950/70 border border-blue-700/40 hover:border-cyan-400/60 transition-all duration-200 cursor-pointer group">
                                            <div class="w-8 h-8 rounded-lg bg-blue-600/20 text-cyan-300 flex items-center justify-center mb-2.5 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                                ${DisicureRouter.icons.tag}
                                            </div>
                                            <h4 class="font-bold text-white text-xs mb-1">PCD Pharma Franchise</h4>
                                            <p class="text-[10px] text-blue-200/75 leading-relaxed">Monopoly distribution rights & marketing materials.</p>
                                        </div>

                                        <!-- Division 3 -->
                                        <div onclick="window.DisicureMain.openEnquiryModal('Custom Formulation R&D Enquiry', 'Custom Formulation')" class="p-3.5 rounded-xl bg-blue-950/70 border border-blue-700/40 hover:border-cyan-400/60 transition-all duration-200 cursor-pointer group">
                                            <div class="w-8 h-8 rounded-lg bg-blue-600/20 text-cyan-300 flex items-center justify-center mb-2.5 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                                ${DisicureRouter.icons.beaker}
                                            </div>
                                            <h4 class="font-bold text-white text-xs mb-1">Product Development</h4>
                                            <p class="text-[10px] text-blue-200/75 leading-relaxed">Custom molecule combinations & stability profiling.</p>
                                        </div>

                                        <!-- Division 4 -->
                                        <div onclick="window.DisicureMain.openEnquiryModal('Hospital & Institutional Supply Enquiry', 'Hospital Supply')" class="p-3.5 rounded-xl bg-blue-950/70 border border-blue-700/40 hover:border-cyan-400/60 transition-all duration-200 cursor-pointer group">
                                            <div class="w-8 h-8 rounded-lg bg-blue-600/20 text-cyan-300 flex items-center justify-center mb-2.5 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                                ${DisicureRouter.icons.box}
                                            </div>
                                            <h4 class="font-bold text-white text-xs mb-1">Institutional Supply</h4>
                                            <p class="text-[10px] text-blue-200/75 leading-relaxed">Direct hospital procurement, clinic chains & bulk supply.</p>
                                        </div>
                                    </div>

                                    <!-- Bottom Live Trust Strip -->
                                    <div class="pt-2.5 border-t border-blue-800/60 flex items-center justify-between text-[11px] text-blue-200/90 font-medium">
                                        <span class="flex items-center gap-1"><span class="text-teal-400">✓</span> Pan-India Delivery</span>
                                        <span class="flex items-center gap-1"><span class="text-teal-400">✓</span> Stringent QA/QC</span>
                                        <span class="flex items-center gap-1"><span class="text-teal-400">✓</span> Fast Quotes</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <!-- Corporate Trust Strip -->
            <section class="bg-white border-b border-blue-50 py-6 relative z-20">
                <div class="max-w-7xl mx-auto px-4 lg:px-8">
                    <div class="flex flex-wrap lg:flex-nowrap justify-between items-center gap-6 text-center lg:text-left">
                        <div class="trust-strip-item flex-1 flex items-center gap-3 justify-center lg:justify-start">
                            <span class="text-blue-600">${DisicureRouter.icons.shield}</span>
                            <span class="text-xs font-extrabold text-navy-950 uppercase tracking-wider">Quality-Focused Manufacturing</span>
                        </div>
                        <div class="trust-strip-item flex-1 flex items-center gap-3 justify-center lg:justify-start">
                            <span class="text-blue-600">${DisicureRouter.icons.box}</span>
                            <span class="text-xs font-extrabold text-navy-950 uppercase tracking-wider">B2B Pharmaceutical Solutions</span>
                        </div>
                        <div class="trust-strip-item flex-1 flex items-center gap-3 justify-center lg:justify-start">
                            <span class="text-blue-600">${DisicureRouter.icons.truck}</span>
                            <span class="text-xs font-extrabold text-navy-950 uppercase tracking-wider">Pan-India Supply</span>
                        </div>
                        <div class="trust-strip-item flex-1 flex items-center gap-3 justify-center lg:justify-start">
                            <span class="text-blue-600">${DisicureRouter.icons.factory}</span>
                            <span class="text-xs font-extrabold text-navy-950 uppercase tracking-wider">Custom & Private Label Solutions</span>
                        </div>
                        <div class="trust-strip-item flex-1 flex items-center gap-3 justify-center lg:justify-start">
                            <span class="text-blue-600">${DisicureRouter.icons.beaker}</span>
                            <span class="text-xs font-extrabold text-navy-950 uppercase tracking-wider">Reliable Business Support</span>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Product Showcase / Marquee Section (Major Upgraded Highlight) -->
            <section class="py-6 md:py-8 md:py-14 bg-white border-b border-blue-50 relative overflow-hidden">
                <div class="max-w-7xl mx-auto px-4 lg:px-8 mb-6 md:mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div class="scroll-reveal">
                        <span class="text-xs font-bold text-blue-600 tracking-wider uppercase">Our Portfolio</span>
                        <h2 class="text-3xl font-extrabold text-navy-950 mt-1 uppercase tracking-wide">Our Pharmaceutical Products</h2>
                        <p class="text-sm text-gray-500 mt-2 font-normal">Focused pharmaceutical solutions across multiple therapeutic and nutritional categories.</p>
                    </div>
                    
                    <!-- Showcase Category Navigation -->
                    <div class="flex items-center gap-6 border-b border-blue-100 pb-2 scroll-reveal">
                        <span class="showcase-filter-pill filter-pill active" data-filter="all">All</span>
                        <span class="showcase-filter-pill filter-pill" data-filter="tablets">Tablets</span>
                        <span class="showcase-filter-pill filter-pill" data-filter="capsules">Capsules</span>
                    </div>
                    
                    <div class="flex gap-3 scroll-reveal">
                        <button id="marquee-prev" class="w-10 h-10 border border-blue-200 rounded-full flex items-center justify-center text-blue-700 hover:bg-blue-50 transition-colors">
                            ${DisicureRouter.icons.arrowLeft}
                        </button>
                        <button id="marquee-next" class="w-10 h-10 border border-blue-200 rounded-full flex items-center justify-center text-blue-700 hover:bg-blue-50 transition-colors">
                            ${DisicureRouter.icons.arrowRight}
                        </button>
                    </div>
                </div>
                
                <!-- Product Marquee Track -->
                <div class="relative w-full overflow-hidden select-none cursor-grab active:cursor-grabbing" id="marquee-container">
                    <div class="flex transition-transform duration-500 ease-out py-4" id="marquee-track">
                        ${marqueeHtml}
                    </div>
                </div>
            </section>

            <!-- About Section (Substantial Company Presentation) -->
            <section class="py-6 md:py-8 md:py-14 bg-blue-50/20">
                <div class="max-w-7xl mx-auto px-4 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    
                    <!-- Left: Clinical scientific graphical panel (actual components, no screenshots) -->
                    <div class="lg:col-span-5 scroll-reveal">
                        <div class="bg-gradient-to-br from-blue-900 to-navy-950 text-white rounded-2xl p-8 shadow-xl relative overflow-hidden min-h-[340px] flex flex-col justify-between border-4 border-white">
                            <!-- Ambient molecular grid lines -->
                            <div class="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-blue-400 via-transparent to-transparent pointer-events-none"></div>
                            
                            <div class="relative z-10 space-y-4">
                                <span class="inline-block px-3 py-1 bg-blue-500/25 border border-blue-400/30 text-blue-300 text-[10px] font-bold rounded uppercase tracking-wider">Operational Facilities</span>
                                <h3 class="text-xl font-extrabold text-white uppercase tracking-wider">Quality Assurance Staging</h3>
                                <p class="text-xs text-blue-100 leading-relaxed font-normal">
                                    Our process-oriented manufacturing and packaging layouts align with national regulatory standards to guarantee formulation consistency.
                                </p>
                            </div>
                            
                            <!-- Small floating product collage for visual richness -->
                            <div class="relative z-10 flex gap-4 mt-6">
                                <div class="w-1/2 bg-white/10 backdrop-blur border border-white/10 rounded-lg p-2.5 flex items-center justify-center">
                                    <img src="images/disimol_sp.jpg" alt="Tablet Formulation" class="h-20 object-contain drop-shadow-md">
                                </div>
                                <div class="w-1/2 bg-white/10 backdrop-blur border border-white/10 rounded-lg p-2.5 flex items-center justify-center">
                                    <img src="images/disizole_dsr.jpg" alt="Capsule Formulation" class="h-20 object-contain drop-shadow-md">
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Right: Corporate Details -->
                    <div class="lg:col-span-7 space-y-6 scroll-reveal">
                        <span class="text-xs font-bold text-blue-600 tracking-wider uppercase">Executive Overview</span>
                        <h2 class="text-3xl font-extrabold text-navy-950 uppercase tracking-wide">About Disicure Care</h2>
                        <p class="text-base text-gray-700 leading-relaxed font-normal">
                            Disicure Care Pvt. Ltd. was established in 2021 with a vision to build a trusted, quality-driven pharmaceutical organization delivering reliable healthcare solutions. The company is committed to quality, ethical business practices, scientific excellence and long-term relationships with healthcare professionals, distributors and business partners.
                        </p>
                        
                        <!-- Trust pillars grid -->
                        <div class="grid grid-cols-2 gap-4 border-t border-blue-100 pt-6">
                            <div class="flex items-start gap-2.5">
                                <span class="text-blue-600 mt-1">${DisicureRouter.icons.check}</span>
                                <div>
                                    <h4 class="font-bold text-navy-950 text-sm">Quality</h4>
                                    <p class="text-[11px] text-gray-500 leading-normal font-normal">Process-oriented QA systems</p>
                                </div>
                            </div>
                            <div class="flex items-start gap-2.5">
                                <span class="text-blue-600 mt-1">${DisicureRouter.icons.check}</span>
                                <div>
                                    <h4 class="font-bold text-navy-950 text-sm">Innovation</h4>
                                    <p class="text-[11px] text-gray-500 leading-normal font-normal">Customized molecule layouts</p>
                                </div>
                            </div>
                            <div class="flex items-start gap-2.5">
                                <span class="text-blue-600 mt-1">${DisicureRouter.icons.check}</span>
                                <div>
                                    <h4 class="font-bold text-navy-950 text-sm">Trust</h4>
                                    <p class="text-[11px] text-gray-500 leading-normal font-normal">Long-term B2B relationships</p>
                                </div>
                            </div>
                            <div class="flex items-start gap-2.5">
                                <span class="text-blue-600 mt-1">${DisicureRouter.icons.check}</span>
                                <div>
                                    <h4 class="font-bold text-navy-950 text-sm">Care</h4>
                                    <p class="text-[11px] text-gray-500 leading-normal font-normal">Healthcare-focused approach</p>
                                </div>
                            </div>
                        </div>
                        
                        <div class="pt-4">
                            <a href="#/about" class="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white text-xs font-bold rounded hover:bg-blue-700 transition-colors uppercase tracking-wider shadow">
                                Explore Our Company ${DisicureRouter.icons.arrowRight}
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Capabilities Section (Asymmetric Grid) -->
            <section class="py-6 md:py-8 md:py-14 bg-white">
                <div class="max-w-7xl mx-auto px-4 lg:px-8 text-center mb-8 md:mb-10 max-w-3xl scroll-reveal">
                    <span class="text-xs font-bold text-blue-600 tracking-wider uppercase font-extrabold">Capabilities</span>
                    <h2 class="text-3xl font-extrabold text-navy-950 mt-1 uppercase tracking-wide">Our Pharmaceutical Capabilities</h2>
                    <p class="text-sm text-gray-600 mt-3 font-normal leading-relaxed">
                        Supporting your pharmaceutical business requirements from molecule combination definitions to commercial distribution channels.
                    </p>
                </div>
                
                <div class="max-w-7xl mx-auto px-4 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    ${capabilitiesHtml}
                </div>
            </section>

            <!-- Conversion-Focused: Why Partner with Us Section -->
            <section class="py-12 md:py-16 bg-white border-t border-blue-100">
                <div class="max-w-7xl mx-auto px-4 lg:px-8">
                    <!-- Section Title -->
                    <div class="text-center mb-10 md:mb-12 max-w-2xl mx-auto space-y-3 scroll-reveal">
                        <span class="text-xs font-extrabold text-blue-600 tracking-wider uppercase bg-blue-50 px-3 py-1 rounded-full">Strategic Advantages</span>
                        <h2 class="text-3xl font-extrabold text-navy-950 uppercase tracking-wide">Why Partner with Us?</h2>
                        <div class="w-16 h-1 bg-blue-600 mx-auto rounded"></div>
                        <p class="text-sm text-gray-500 mt-3 font-normal leading-relaxed">
                            Discover the genuine benefits and professional infrastructure that Disicure Care brings to your pharmaceutical B2B venture.
                        </p>
                    </div>

                    <!-- Genuine Points Grid -->
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <!-- Point 1 -->
                        <div class="p-6 bg-blue-50/10 border border-blue-100/50 rounded-xl hover:border-blue-500 hover:shadow-sm transition-all duration-300 scroll-reveal">
                            <div class="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                                ${DisicureRouter.icons.shield}
                            </div>
                            <h4 class="font-extrabold text-navy-950 text-sm mb-2">Quality-Focused Approach</h4>
                            <p class="text-xs text-gray-600 leading-relaxed font-normal">Strict quality control protocols and process consistency across all medicine packaging and formulations.</p>
                        </div>
                        <!-- Point 2 -->
                        <div class="p-6 bg-blue-50/10 border border-blue-100/50 rounded-xl hover:border-blue-500 hover:shadow-sm transition-all duration-300 scroll-reveal">
                            <div class="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                                ${DisicureRouter.icons.box}
                            </div>
                            <h4 class="font-extrabold text-navy-950 text-sm mb-2">Flexible Pharma Solutions</h4>
                            <p class="text-xs text-gray-600 leading-relaxed font-normal">Flexible batch scaling and customizable product configurations tailored to fit your specific market requirements.</p>
                        </div>
                        <!-- Point 3 -->
                        <div class="p-6 bg-blue-50/10 border border-blue-100/50 rounded-xl hover:border-blue-500 hover:shadow-sm transition-all duration-300 scroll-reveal">
                            <div class="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                                ${DisicureRouter.icons.beaker}
                            </div>
                            <h4 class="font-extrabold text-navy-950 text-sm mb-2">Custom Product Development</h4>
                            <p class="text-xs text-gray-600 leading-relaxed font-normal">Expert formulation and packaging support to convert molecule combinations into commercial products.</p>
                        </div>
                        <!-- Point 4 -->
                        <div class="p-6 bg-blue-50/10 border border-blue-100/50 rounded-xl hover:border-blue-500 hover:shadow-sm transition-all duration-300 scroll-reveal">
                            <div class="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                                ${DisicureRouter.icons.tag}
                            </div>
                            <h4 class="font-extrabold text-navy-950 text-sm mb-2">Private-Label Support</h4>
                            <p class="text-xs text-gray-600 leading-relaxed font-normal">Launch complete medical lines under your exclusive company branding with end-to-end design assistance.</p>
                        </div>
                        <!-- Point 5 -->
                        <div class="p-6 bg-blue-50/10 border border-blue-100/50 rounded-xl hover:border-blue-500 hover:shadow-sm transition-all duration-300 scroll-reveal">
                            <div class="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
                            </div>
                            <h4 class="font-extrabold text-navy-950 text-sm mb-2">Professional Coordination</h4>
                            <p class="text-xs text-gray-600 leading-relaxed font-normal">Transparent communications and structured project management throughout our manufacturing pipeline.</p>
                        </div>
                        <!-- Point 6 -->
                        <div class="p-6 bg-blue-50/10 border border-blue-100/50 rounded-xl hover:border-blue-500 hover:shadow-sm transition-all duration-300 scroll-reveal">
                            <div class="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                                ${DisicureRouter.icons.truck}
                            </div>
                            <h4 class="font-extrabold text-navy-950 text-sm mb-2">Reliable Supply Support</h4>
                            <p class="text-xs text-gray-600 leading-relaxed font-normal">Pan-India logistics ensuring secure transit, regulatory compliance, and consistent delivery speeds.</p>
                        </div>
                        <!-- Point 7 -->
                        <div class="p-6 bg-blue-50/10 border border-blue-100/50 rounded-xl hover:border-blue-500 hover:shadow-sm transition-all duration-300 scroll-reveal">
                            <div class="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                            </div>
                            <h4 class="font-extrabold text-navy-950 text-sm mb-2">B2B-Focused Approach</h4>
                            <p class="text-xs text-gray-600 leading-relaxed font-normal">Dedicated resources designed for corporate stockists, distributors, and bulk institutional procurement.</p>
                        </div>
                        <!-- Point 8 -->
                        <div class="p-6 bg-blue-50/10 border border-blue-100/50 rounded-xl hover:border-blue-500 hover:shadow-sm transition-all duration-300 scroll-reveal">
                            <div class="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/></svg>
                            </div>
                            <h4 class="font-extrabold text-navy-950 text-sm mb-2">Long-Term Partnership Mindset</h4>
                            <p class="text-xs text-gray-600 leading-relaxed font-normal">Commitment to mutual growth, product line extensions, and ethical business collaborations.</p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Services Section (Condensed Numbered visual list) -->
            <section class="py-6 md:py-8 md:py-14 bg-blue-50/20 border-t border-b border-blue-50">
                <div class="max-w-7xl mx-auto px-4 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    
                    <div class="lg:col-span-5 space-y-5 scroll-reveal">
                        <span class="text-xs font-bold text-blue-600 tracking-wider uppercase font-extrabold">Corporate Services</span>
                        <h2 class="text-3xl font-extrabold text-navy-950 uppercase tracking-wide">Our B2B Services</h2>
                        <p class="text-sm text-gray-600 leading-relaxed font-normal">
                            We deploy structured, process-oriented pharmaceutical capabilities to satisfy custom packaging, manufacturing, and distribution requirements.
                        </p>
                        <div class="pt-2">
                            <a href="#/services" class="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white text-xs font-bold rounded hover:bg-blue-700 transition-colors uppercase tracking-wider shadow">
                                View All Services ${DisicureRouter.icons.arrowRight}
                            </a>
                        </div>
                    </div>
                    
                    <div class="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        ${servicesListHtml}
                    </div>
                    
                </div>
            </section>

            <!-- Molecule to Market Journey Timeline (Signature Visual Highlight) -->
            <section class="py-6 md:py-8 md:py-14 bg-blue-950 text-white overflow-hidden relative">
                <div class="absolute inset-0 bg-gradient-to-tr from-blue-900 via-navy-950 to-blue-950 pointer-events-none"></div>
                
                <div class="max-w-7xl mx-auto px-4 lg:px-8 relative z-10 text-center mb-8 md:mb-10 scroll-reveal">
                    <span class="text-xs font-bold text-blue-400 tracking-wider uppercase">Strategic Journey</span>
                    <h2 class="text-3xl font-extrabold text-white mt-1 uppercase tracking-wider">From Molecule to Market</h2>
                    <p class="text-sm text-blue-200/80 mt-3 max-w-2xl mx-auto font-normal leading-relaxed">
                        An end-to-end strategic journey ensuring the quality, safety, and visual premium styling of every formulation we supply.
                    </p>
                </div>
                
                <!-- Horizontal timeline layout on desktop, transforms on mobile -->
                <div class="max-w-7xl mx-auto px-4 lg:px-8 relative z-10 flex flex-col lg:flex-row gap-8 lg:gap-4 overflow-x-auto pb-6 scroll-reveal" id="timeline-scroll-container">
                    ${journeyHtml}
                </div>
            </section>

            <!-- B2B Pharmaceutical FAQ Section -->
            <section class="py-12 md:py-16 bg-blue-50/15 border-t border-blue-100">
                <div class="max-w-4xl mx-auto px-4 lg:px-8">
                    <!-- Section Title -->
                    <div class="text-center mb-10 space-y-3 scroll-reveal">
                        <span class="text-xs font-extrabold text-blue-600 tracking-wider uppercase bg-blue-50 px-3 py-1 rounded-full">B2B Help Center</span>
                        <h2 class="text-3xl font-extrabold text-navy-950 uppercase tracking-wide">Frequently Asked Questions</h2>
                        <div class="w-16 h-1 bg-blue-600 mx-auto rounded"></div>
                        <p class="text-sm text-gray-500 mt-2 font-normal">Answers to common queries regarding our third-party manufacturing and pharmaceutical partnership solutions.</p>
                    </div>

                    <!-- Accordion Wrapper -->
                    <div class="space-y-4">
                        <!-- Q1 -->
                        <div class="bg-white border border-blue-100 rounded-lg p-5 shadow-sm scroll-reveal">
                            <h4 class="font-extrabold text-navy-950 text-sm flex justify-between items-center cursor-pointer select-none" onclick="this.nextElementSibling.classList.toggle('hidden'); this.querySelector('svg').classList.toggle('rotate-180');">
                                <span>What is third-party pharmaceutical manufacturing?</span>
                                <svg class="w-4 h-4 text-blue-500 transform transition-transform duration-300" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg>
                            </h4>
                            <p class="text-xs text-gray-600 leading-relaxed font-normal mt-3 hidden">
                                Third-party pharmaceutical manufacturing is a B2B arrangement where one company manufactures pharmaceutical formulations (like tablets, capsules, or syrups) under another company's brand name. It enables businesses to develop and market products without investing in their own manufacturing plants.
                            </p>
                        </div>
                        
                        <!-- Q2 -->
                        <div class="bg-white border border-blue-100 rounded-lg p-5 shadow-sm scroll-reveal">
                            <h4 class="font-extrabold text-navy-950 text-sm flex justify-between items-center cursor-pointer select-none" onclick="this.nextElementSibling.classList.toggle('hidden'); this.querySelector('svg').classList.toggle('rotate-180');">
                                <span>Do you provide private-label manufacturing?</span>
                                <svg class="w-4 h-4 text-blue-500 transform transition-transform duration-300" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg>
                            </h4>
                            <p class="text-xs text-gray-600 leading-relaxed font-normal mt-3 hidden">
                                Yes, we offer complete private-label manufacturing solutions. We formulate, manufacture, and package high-quality pharmaceutical products branded exclusively under your business logo and guidelines, ready for market launch.
                            </p>
                        </div>

                        <!-- Q3 -->
                        <div class="bg-white border border-blue-100 rounded-lg p-5 shadow-sm scroll-reveal">
                            <h4 class="font-extrabold text-navy-950 text-sm flex justify-between items-center cursor-pointer select-none" onclick="this.nextElementSibling.classList.toggle('hidden'); this.querySelector('svg').classList.toggle('rotate-180');">
                                <span>Can you develop custom formulations?</span>
                                <svg class="w-4 h-4 text-blue-500 transform transition-transform duration-300" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg>
                            </h4>
                            <p class="text-xs text-gray-600 leading-relaxed font-normal mt-3 hidden">
                                Yes, we can assist in developing custom molecule combinations and customized formulations. Our product development support covers adjustments to strength, formulation composition, and specific therapeutic combinations based on your market entry needs.
                            </p>
                        </div>

                        <!-- Q4 -->
                        <div class="bg-white border border-blue-100 rounded-lg p-5 shadow-sm scroll-reveal">
                            <h4 class="font-extrabold text-navy-950 text-sm flex justify-between items-center cursor-pointer select-none" onclick="this.nextElementSibling.classList.toggle('hidden'); this.querySelector('svg').classList.toggle('rotate-180');">
                                <span>What minimum order quantity is required?</span>
                                <svg class="w-4 h-4 text-blue-500 transform transition-transform duration-300" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg>
                            </h4>
                            <p class="text-xs text-gray-600 leading-relaxed font-normal mt-3 hidden">
                                Minimum order quantities (MOQs) vary depending on the dosage form (tablets, capsules, syrups, injectables) and specific molecule specifications. Please contact our B2B business support managers directly with your product choice to get specific MOQ details.
                            </p>
                        </div>

                        <!-- Q5 -->
                        <div class="bg-white border border-blue-100 rounded-lg p-5 shadow-sm scroll-reveal">
                            <h4 class="font-extrabold text-navy-950 text-sm flex justify-between items-center cursor-pointer select-none" onclick="this.nextElementSibling.classList.toggle('hidden'); this.querySelector('svg').classList.toggle('rotate-180');">
                                <span>Do you provide product samples?</span>
                                <svg class="w-4 h-4 text-blue-500 transform transition-transform duration-300" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg>
                            </h4>
                            <p class="text-xs text-gray-600 leading-relaxed font-normal mt-3 hidden">
                                Yes, we can provide formulation samples for evaluation and testing to business partners upon request. You can coordinate sample requests through our B2B enquiry portal or by contacting customer support.
                            </p>
                        </div>

                        <!-- Q6 -->
                        <div class="bg-white border border-blue-100 rounded-lg p-5 shadow-sm scroll-reveal">
                            <h4 class="font-extrabold text-navy-950 text-sm flex justify-between items-center cursor-pointer select-none" onclick="this.nextElementSibling.classList.toggle('hidden'); this.querySelector('svg').classList.toggle('rotate-180');">
                                <span>Do you supply hospitals?</span>
                                <svg class="w-4 h-4 text-blue-500 transform transition-transform duration-300" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg>
                            </h4>
                            <p class="text-xs text-gray-600 leading-relaxed font-normal mt-3 hidden">
                                Yes, we provide dedicated institutional and hospital pharma supply solutions. We support hospital procurement networks, clinics, and government healthcare institutions with bulk supply contracts and timely logistics.
                            </p>
                        </div>

                        <!-- Q7 -->
                        <div class="bg-white border border-blue-100 rounded-lg p-5 shadow-sm scroll-reveal">
                            <h4 class="font-extrabold text-navy-950 text-sm flex justify-between items-center cursor-pointer select-none" onclick="this.nextElementSibling.classList.toggle('hidden'); this.querySelector('svg').classList.toggle('rotate-180');">
                                <span>Do you provide bulk pharmaceutical supply?</span>
                                <svg class="w-4 h-4 text-blue-500 transform transition-transform duration-300" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg>
                            </h4>
                            <p class="text-xs text-gray-600 leading-relaxed font-normal mt-3 hidden">
                                Yes, we supply bulk pharmaceutical formulations to licensed stockists, distributors, and marketing companies. Our pan-India logistics network ensures consistent inventory replenishment and shipping security.
                            </p>
                        </div>

                        <!-- Q8 -->
                        <div class="bg-white border border-blue-100 rounded-lg p-5 shadow-sm scroll-reveal">
                            <h4 class="font-extrabold text-navy-950 text-sm flex justify-between items-center cursor-pointer select-none" onclick="this.nextElementSibling.classList.toggle('hidden'); this.querySelector('svg').classList.toggle('rotate-180');">
                                <span>Which dosage forms are available?</span>
                                <svg class="w-4 h-4 text-blue-500 transform transition-transform duration-300" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg>
                            </h4>
                            <p class="text-xs text-gray-600 leading-relaxed font-normal mt-3 hidden">
                                We support manufacturing in multiple dosage formats including tablets (Alu-Alu and PVC-Alu blisters), capsules, syrups, dry syrups, nutraceuticals, injectables, softgels, and topical ointments.
                            </p>
                        </div>

                        <!-- Q9 -->
                        <div class="bg-white border border-blue-100 rounded-lg p-5 shadow-sm scroll-reveal">
                            <h4 class="font-extrabold text-navy-950 text-sm flex justify-between items-center cursor-pointer select-none" onclick="this.nextElementSibling.classList.toggle('hidden'); this.querySelector('svg').classList.toggle('rotate-180');">
                                <span>How can I request a quotation?</span>
                                <svg class="w-4 h-4 text-blue-500 transform transition-transform duration-300" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg>
                            </h4>
                            <p class="text-xs text-gray-600 leading-relaxed font-normal mt-3 hidden">
                                You can request a quotation by filling out our detailed B2B Enquiry Form (available on the contact page or by clicking any 'Request Quote' button). You can also send product requirements directly to disicurecare@gmail.com.
                            </p>
                        </div>

                        <!-- Q10 -->
                        <div class="bg-white border border-blue-100 rounded-lg p-5 shadow-sm scroll-reveal">
                            <h4 class="font-extrabold text-navy-950 text-sm flex justify-between items-center cursor-pointer select-none" onclick="this.nextElementSibling.classList.toggle('hidden'); this.querySelector('svg').classList.toggle('rotate-180');">
                                <span>How can I contact your business team?</span>
                                <svg class="w-4 h-4 text-blue-500 transform transition-transform duration-300" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg>
                            </h4>
                            <p class="text-xs text-gray-600 leading-relaxed font-normal mt-3 hidden">
                                You can call our corporate directors directly at +91 9792009307 or +91 9104313824. For customer care and quick product enquiries, you can message our assistance line via WhatsApp at +91 9005874417.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Business Partnership CTA (Full-Width Blue Band) -->
            <section class="py-12 md:py-16 bg-gradient-to-r from-blue-700 via-blue-800 to-navy-950 text-white relative overflow-hidden">
                <div class="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-blue-600/30 via-transparent to-transparent pointer-events-none"></div>
                <div class="max-w-5xl mx-auto px-4 text-center space-y-6 relative z-10 scroll-reveal">
                    <span class="text-xs font-bold text-cyan-300 tracking-wider uppercase bg-blue-950/60 px-3 py-1 rounded-full border border-blue-400/30">Strategic Collaboration</span>
                    <h2 class="text-3xl sm:text-4xl font-extrabold tracking-tight uppercase">Scale Your Pharmaceutical Business With Disicure Care</h2>
                    <p class="text-base text-blue-100/90 max-w-2xl mx-auto leading-relaxed font-normal">
                        From formulation development and contract manufacturing to branding, packaging, PCD franchise networks and bulk institutional supply — explore solutions designed around your pharmaceutical business requirements.
                    </p>
                    <div class="flex flex-wrap gap-4 justify-center pt-2">
                        <button onclick="window.DisicureMain.openEnquiryModal('Footer B2B Partnership Discussion', 'Third-Party Manufacturing')" class="px-7 py-3.5 bg-white hover:bg-blue-50 text-blue-900 text-xs font-bold rounded-lg transition-all duration-200 shadow-lg transform hover:-translate-y-0.5 uppercase tracking-wider">
                            Discuss Your Requirement
                        </button>
                        <a href="https://wa.me/919005874417?text=Hello%20Disicure%20Care%20Team%2C%20I%20am%20interested%20in%20your%20pharmaceutical%20business%20solutions.%20Please%20share%20details%20and%20quotation." target="_blank" rel="noopener noreferrer" class="px-7 py-3.5 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold rounded-lg transition-all duration-200 shadow-lg hover:shadow-green-500/20 transform hover:-translate-y-0.5 flex items-center gap-2 uppercase tracking-wider">
                            <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                            <span>WhatsApp Assistance</span>
                        </a>
                    </div>
                </div>
            </section>
            `;
        },

        // --- 2. ABOUT US TEMPLATE ---
        about: function() {
            const info = window.DisicureData.companyInfo;

            const caps = [
                { num: "01", title: "Bulk Custom Manufacturing", desc: "Pharmaceutical manufacturing solutions tailored to specific business and market requirements.", icon: "factory" },
                { num: "02", title: "Custom Molecule Development", desc: "Support for customized molecule/product requirements based on defined pharmaceutical specifications.", icon: "beaker" },
                { num: "03", title: "Custom Product Development", desc: "Development and execution of customized pharmaceutical products for B2B partners.", icon: "box" },
                { num: "04", title: "Custom Pharmaceutical Designing", desc: "Customized product concepts, formulations, packaging and presentation aligned with brand requirements.", icon: "design" },
                { num: "05", title: "Third-Party / Contract Manufacturing", desc: "Flexible pharmaceutical manufacturing support for business partners seeking reliable production capabilities.", icon: "tag" },
                { num: "06", title: "Dedicated Manufacturing Infrastructure", desc: "Access to dedicated manufacturing infrastructure focused on process control, consistency and quality-oriented production.", icon: "factory" },
                { num: "07", title: "Quality Assurance & Quality Control", desc: "Strong emphasis on quality systems, process monitoring, documentation and product consistency.", icon: "shield" },
                { num: "08", title: "Pharmaceutical Sales & Distribution Support", desc: "Professional commercial support for pharmaceutical product marketing, sales expansion and channel development.", icon: "truck" }
            ];

            let capabilityListHtml = '';
            caps.forEach(c => {
                capabilityListHtml += `
                <div class="bg-white border border-blue-100 p-6 rounded-xl shadow-sm hover:shadow-md hover:border-blue-500 transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between scroll-reveal min-h-[220px]">
                    <div class="space-y-4">
                        <div class="flex items-center justify-between">
                            <span class="text-xs font-extrabold text-blue-500 bg-blue-50 px-2.5 py-1 rounded">${c.num}</span>
                            <span class="text-blue-600">${DisicureRouter.icons[c.icon] || DisicureRouter.icons.box}</span>
                        </div>
                        <h4 class="font-extrabold text-navy-950 text-base leading-tight">${c.title}</h4>
                        <p class="text-xs text-gray-500 leading-relaxed font-normal">${c.desc}</p>
                    </div>
                </div>
                `;
            });

            return `
            <!-- Top Clinical Mesh Background Section -->
            <section class="bg-gradient-to-b from-blue-50/30 to-white py-8 md:py-12 relative overflow-hidden">
                
                <!-- Ambient Watermark Particle Grid -->
                <div class="absolute inset-0 pointer-events-none opacity-20 z-0">
                    <div class="absolute top-10 left-10 w-80 h-80 bg-blue-200 rounded-full filter blur-3xl"></div>
                    <div class="absolute bottom-10 right-10 w-96 h-96 bg-cyan-100 rounded-full filter blur-3xl"></div>
                </div>

                <div class="max-w-7xl mx-auto px-4 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    <!-- Left Column: Corporate Brand & Story (lg:col-span-8) -->
                    <div class="lg:col-span-8 space-y-8">
                        
                        <!-- Premium Branded Identity Header Card -->
                        <div class="bg-white border-2 border-blue-600/30 rounded-2xl p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 scroll-reveal">
                            <div class="flex items-center gap-4">
                                <img src="images/logo.jpg" alt="Disicure Care logo" class="w-16 h-16 object-contain rounded-full border border-blue-100 p-1 shadow-inner">
                                <div>
                                    <h1 class="text-2xl font-extrabold text-navy-950 tracking-wide uppercase">DISICURE CARE</h1>
                                    <p class="text-xs text-blue-600 font-extrabold uppercase tracking-widest mt-0.5">We Cure With Care</p>
                                </div>
                            </div>
                            <div class="text-center md:text-right border-t md:border-t-0 md:border-l border-blue-100 pt-4 md:pt-0 md:pl-6 space-y-1">
                                <span class="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest block">Corporate Profile</span>
                                <span class="text-sm font-extrabold text-navy-950 block">Established in 2021</span>
                            </div>
                        </div>

                        <!-- Main Company Story Panel -->
                        <div class="bg-white/90 backdrop-blur border border-blue-100 rounded-2xl p-8 shadow-md relative scroll-reveal">
                            <!-- Inner decorative border -->
                            <div class="absolute inset-2 border border-dashed border-blue-200/50 rounded-xl pointer-events-none"></div>
                            
                            <div class="relative z-10 space-y-6">
                                <div class="flex items-center gap-3 border-b border-blue-50 pb-4">
                                    <span class="text-blue-600">${DisicureRouter.icons.beaker}</span>
                                    <h2 class="text-xl font-extrabold text-navy-950 uppercase tracking-wider">Our Company</h2>
                                </div>
                                
                                <p class="text-base text-gray-700 leading-relaxed font-bold border-l-4 border-blue-600 pl-4">
                                    Disicure Care Pvt. Ltd. was established in 2021 with a vision to build a trusted and quality-driven pharmaceutical organization focused on delivering reliable healthcare solutions.
                                </p>
                                
                                <p class="text-sm text-gray-600 leading-relaxed font-normal">
                                    The company is committed to quality, ethical business practices, scientific excellence and long-term relationships with healthcare professionals, distributors and business partners. We coordinate manufacturing process lines, implement strict control limits, and provide robust B2B packaging and logistic infrastructures to satisfy requirements pan-India.
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Right Column: Founder profile card (lg:col-span-4) -->
                    <div class="lg:col-span-4 scroll-reveal">
                        <div class="bg-white border-2 border-blue-600/40 rounded-2xl p-6 text-center shadow-md relative overflow-visible">
                            <!-- Header silhouette -->
                            <div class="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-blue-600 to-blue-800 rounded-t-xl"></div>
                            
                            <!-- Complete Founder Image Box (Contains portrait, circular frame, name and title already) -->
                            <div class="w-full flex justify-center items-center overflow-visible my-4">
                                <img src="images/founder.jpg" alt="Mr. Nishant Chaturvedi - Founder & Director" class="w-full max-w-[360px] h-auto object-contain object-center block rounded-lg shadow-sm">
                            </div>
                            
                            <!-- Divider line -->
                            <div class="border-b border-blue-100 my-4"></div>
                            
                            <!-- Vision Quote Bubble -->
                            <div class="mt-4 bg-blue-50/40 border border-blue-50 rounded-xl p-4 text-left relative">
                                <div class="absolute -top-3 left-6 px-2.5 py-0.5 bg-blue-600 text-white text-[9px] font-bold uppercase rounded-full tracking-wider shadow">Founder's Vision</div>
                                <blockquote class="text-xs italic text-gray-600 leading-relaxed font-semibold mt-1">
                                    "To build Disicure Care into a trusted pharmaceutical organization recognized for quality, reliability, ethical practices and a strong commitment to better healthcare."
                                </blockquote>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </section>

            <!-- OUR PHARMACEUTICAL CAPABILITIES -->
            <section class="py-6 md:py-8 md:py-14 bg-white border-t border-b border-blue-100 relative">
                <div class="max-w-7xl mx-auto px-4 lg:px-8">
                    
                    <!-- Section Title Block -->
                    <div class="text-center mb-8 md:mb-10 max-w-2xl mx-auto space-y-3 scroll-reveal">
                        <span class="text-xs font-extrabold text-blue-600 tracking-wider uppercase bg-blue-50 px-3 py-1 rounded-full">B2B Core Operations</span>
                        <h2 class="text-3xl font-extrabold text-navy-950 uppercase tracking-wide">Our Pharmaceutical Capabilities</h2>
                        <div class="w-16 h-1 bg-blue-600 mx-auto rounded"></div>
                        <p class="text-sm text-gray-500 mt-3 font-normal leading-relaxed">
                            Supporting B2B partners across all manufacturing phases with compliance, scientific precision, and end-to-end processing support.
                        </p>
                    </div>
                    
                    <!-- Grid System (4 columns on desktop, responsive reflow) -->
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        ${capabilityListHtml}
                    </div>
                    
                </div>
            </section>

            <!-- Bottom Section: Quality Panel & B2B Strip -->
            <section class="py-8 md:py-12 bg-slate-50/50">
                <div class="max-w-7xl mx-auto px-4 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    
                    <!-- Left: Capabilities statement panel (lg:col-span-6) -->
                    <div class="lg:col-span-6 scroll-reveal">
                        <div class="space-y-4">
                            <span class="text-xs font-bold text-blue-600 tracking-wider uppercase">Strategic Alignment</span>
                            <h3 class="text-2xl font-extrabold text-navy-950 uppercase tracking-wide">Our Commitment to Partners</h3>
                            <p class="text-sm text-gray-600 leading-relaxed font-normal">
                                Disicure Care Pvt. Ltd. provides complete infrastructure pipelines. We work closely with our distributors, franchise associates, and bulk purchasers to supply quality formulations wrapped in Alu-Alu or Blister pack arrangements designed to maintain active therapeutic molecular integrity.
                            </p>
                        </div>
                    </div>
                    
                    <!-- Right: Visual QUALITY AT THE CORE card (lg:col-span-6) -->
                    <div class="lg:col-span-6 scroll-reveal">
                        <div class="bg-gradient-to-br from-blue-900 to-navy-950 text-white rounded-2xl p-8 shadow-xl relative overflow-hidden">
                            <!-- Molecular visual grid lines -->
                            <div class="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-blue-400 via-transparent to-transparent pointer-events-none"></div>
                            
                            <div class="relative z-10 space-y-4">
                                <div class="flex items-center gap-3">
                                    <div class="w-10 h-10 bg-white/10 rounded flex items-center justify-center text-blue-400 border border-white/20 shadow-inner">
                                        ${DisicureRouter.icons.shield}
                                    </div>
                                    <h4 class="font-extrabold text-lg uppercase tracking-wider text-white">Quality at the Core</h4>
                                </div>
                                <p class="text-xs sm:text-sm text-blue-100 leading-relaxed font-normal">
                                    Our approach combines quality-focused manufacturing, controlled processes, professional pharmaceutical practices and continuous attention to product consistency — because healthcare demands nothing less than trust.
                                </p>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </section>

            <!-- Bottom Full-Width Corporate Statement Strip -->
            <section class="w-full bg-blue-900 py-6 text-white border-t border-blue-800 relative z-10">
                <div class="max-w-7xl mx-auto px-4 lg:px-8 flex flex-col md:flex-row items-center justify-center gap-4 text-center">
                    <span class="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-blue-300">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94-3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"/></svg>
                    </span>
                    <p class="text-xs sm:text-sm font-bold leading-normal uppercase tracking-wider">
                        We are committed to building long-term partnerships based on <span class="text-blue-300 font-extrabold">trust</span>, <span class="text-blue-300 font-extrabold">transparency</span>, <span class="text-blue-300 font-extrabold">quality</span> and <span class="text-blue-300 font-extrabold">mutual growth</span>.
                    </p>
                </div>
            </section>
            `;
        },

        // --- 3. UPGRADED PRODUCTS CATALOG TEMPLATE (3-Column substantial grid) ---
        products: function() {
            const products = window.DisicureData.products;

            let productsGridHtml = '';
            products.forEach(p => {
                productsGridHtml += `
                <div class="product-item bg-white border border-blue-100 p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 scroll-reveal flex flex-col justify-between" data-category="${p.category}" data-name="${p.name.toLowerCase()}" data-composition="${p.composition.toLowerCase()}" data-therapeutic="${(p.therapeuticCategory || '').toLowerCase()}">
                    <div>
                        <div class="h-56 flex items-center justify-center bg-blue-50/15 rounded-lg mb-4 overflow-hidden relative group p-4 border border-blue-50">
                            <img src="${p.image}" alt="${p.name}" class="h-44 object-contain transition-transform duration-500 group-hover:scale-105 drop-shadow-md">
                            <span class="absolute top-3 right-3 text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 bg-blue-600 text-white rounded shadow-sm">${p.dosageForm}</span>
                        </div>
                        <div class="mb-2">
                            <span class="inline-block text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-100 px-2.5 py-1 rounded uppercase tracking-wider">${p.therapeuticCategory || 'Pharmaceutical Formulation'}</span>
                        </div>
                        <h3 class="text-lg font-extrabold text-navy-950 mb-1 leading-snug">${p.name}</h3>
                        <p class="text-xs text-blue-600 font-extrabold mb-3 uppercase tracking-wide flex items-center gap-1.5">
                            <span class="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                            ${p.details} • ${p.packaging}
                        </p>
                        <div class="bg-blue-50/30 border border-blue-100/60 rounded-lg p-3 mb-3">
                            <span class="text-[10px] font-extrabold text-blue-700 uppercase tracking-wider block mb-1">Active Composition</span>
                            <p class="text-xs text-navy-950 font-bold leading-relaxed line-clamp-2">${p.composition}</p>
                        </div>
                        <p class="text-xs text-gray-500 leading-relaxed font-normal h-10 line-clamp-2 mb-4">${p.description}</p>
                    </div>
                    <div class="flex gap-2 pt-3 border-t border-blue-50 mt-auto">
                        <a href="#/products/${p.slug}" class="flex-1 text-center py-2.5 bg-blue-50 text-blue-700 text-xs font-bold rounded-md hover:bg-blue-600 hover:text-white transition-colors">Details</a>
                        <button onclick="window.DisicureMain.openEnquiryModal('${p.name}')" class="py-2.5 px-3.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-md transition-colors flex items-center gap-1 justify-center whitespace-nowrap">
                            Request Quote
                        </button>
                        <a href="https://wa.me/919005874417?text=Hello%20Disicure%20Care%20Team%2C%20I%20need%20assistance%20regarding%20a%20product%20enquiry%20for%20${encodeURIComponent(p.name)}." target="_blank" rel="noopener noreferrer" class="py-2.5 px-3 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors flex items-center justify-center shrink-0" aria-label="WhatsApp Enquiry">
                            <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 001.33 4.982L2 22l5.233-1.371a9.994 9.994 0 004.773 1.226h.004c5.505 0 9.989-4.478 9.99-9.984a9.96 9.96 0 00-2.925-7.064 9.964 9.964 0 00-7.063-2.923zm5.035 14.175c-.276.776-1.357 1.411-1.854 1.503-.497.092-.992.176-2.915-.584-2.457-.973-4.043-3.473-4.165-3.637-.123-.164-1.002-1.332-1.002-2.541 0-1.21.635-1.803.862-2.049.227-.246.497-.307.662-.307.165 0 .331.006.475.012.148.006.348-.055.546.425.199.479.679 1.656.739 1.779.061.123.102.266.02.43-.082.164-.123.266-.246.41-.122.143-.258.32-.367.43-.122.123-.25.257-.107.502.143.246.636 1.05 1.37 1.702.946.84 1.74 1.1 1.987 1.224.246.123.389.102.532-.062.143-.164.615-.717.778-.962.164-.246.327-.205.551-.123.224.082 1.424.671 1.669.794.246.123.41.184.471.287.062.102.062.594-.214 1.37z"/></svg>
                        </a>
                    </div>
                </div>
                `;
            });

            return `
            <!-- Upgraded Catalog Header -->
            <section class="bg-gradient-to-r from-blue-900 to-navy-950 text-white py-6 md:py-8 md:py-14 relative overflow-hidden">
                <div class="absolute inset-0 opacity-15 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-blue-400 via-transparent to-transparent"></div>
                <div class="max-w-7xl mx-auto px-4 lg:px-8 text-center space-y-4 relative z-10 scroll-reveal">
                    <span class="text-xs font-bold text-blue-300 tracking-wider uppercase font-extrabold">Product Portfolio</span>
                    <h1 class="text-4xl font-extrabold uppercase tracking-wide">PHARMACEUTICAL PRODUCTS</h1>
                    <p class="text-sm text-blue-200 max-w-xl mx-auto font-normal">Explore the Disicure Care product portfolio. Quality-focused pharmaceutical formulations designed for diverse therapeutic requirements.</p>
                </div>
            </section>

            <!-- Search & Filters Container (Toolbar) -->
            <section class="py-6 md:py-8 bg-blue-50/20 border-b border-blue-100">
                <div class="max-w-7xl mx-auto px-4 lg:px-8 flex flex-col md:flex-row gap-6 justify-between items-center">
                    
                    <!-- Search Input -->
                    <div class="relative w-full md:max-w-md scroll-reveal">
                        <input type="text" id="catalog-search" placeholder="Search by name, composition or therapeutic category..." class="w-full bg-white border border-blue-100 rounded-md p-3.5 pl-11 text-sm focus:outline-none focus:border-blue-500 font-normal shadow-sm">
                        <span class="absolute left-4 top-4 text-gray-400">
                            ${DisicureRouter.icons.search}
                        </span>
                    </div>
                    
                    <!-- Filters -->
                    <div class="flex gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scroll-reveal">
                        <button class="filter-btn active px-5 py-2.5 bg-white border border-blue-100 text-xs font-extrabold rounded-md hover:bg-blue-50 text-gray-700 transition-colors uppercase tracking-wider shadow-sm" data-filter="all">All Formulations</button>
                        <button class="filter-btn px-5 py-2.5 bg-white border border-blue-100 text-xs font-extrabold rounded-md hover:bg-blue-50 text-gray-700 transition-colors uppercase tracking-wider shadow-sm" data-filter="tablets">Tablets</button>
                        <button class="filter-btn px-5 py-2.5 bg-white border border-blue-100 text-xs font-extrabold rounded-md hover:bg-blue-50 text-gray-700 transition-colors uppercase tracking-wider shadow-sm" data-filter="capsules">Capsules</button>
                    </div>
                    
                </div>
            </section>

            <!-- Catalog Grid (3-Column Desktop Grid) -->
            <section class="py-8 md:py-12 bg-white min-h-[50vh]">
                <div class="max-w-7xl mx-auto px-4 lg:px-8">
                    <!-- Dynamic Product Count -->
                    <div class="mb-8 text-xs text-gray-500 font-bold uppercase tracking-wider scroll-reveal" id="results-count">
                        Showing all ${products.length} formulations
                    </div>
                    
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10" id="catalog-grid">
                        ${productsGridHtml}
                    </div>
                    
                    <!-- Empty State -->
                    <div id="catalog-empty" class="hidden text-center py-12 md:py-8 md:py-12">
                        <div class="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            ${DisicureRouter.icons.box}
                        </div>
                        <h3 class="text-lg font-bold text-navy-950">No Formulations Found</h3>
                        <p class="text-xs text-gray-500 mt-2 max-w-sm mx-auto leading-relaxed font-normal">We couldn't find any products matching your search term. Try checking spelling or search for active molecules.</p>
                    </div>
                </div>
            </section>
            `;
        },

        // --- 4. PRODUCT DETAIL TEMPLATE ---
        productDetail: function(product) {
            const products = window.DisicureData.products;
            const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3);
            
            let relatedHtml = '';
            related.forEach(r => {
                relatedHtml += `
                <div class="bg-white border border-blue-100 p-5 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 scroll-reveal flex flex-col justify-between">
                    <div>
                        <div class="h-36 flex items-center justify-center bg-blue-50/10 rounded mb-4 border border-blue-50 relative">
                            <img src="${r.image}" alt="${r.name}" class="h-28 object-contain">
                            <span class="absolute top-2 right-2 text-[9px] font-bold px-2 py-0.5 bg-blue-600 text-white rounded">${r.dosageForm}</span>
                        </div>
                        <h4 class="font-extrabold text-navy-950 text-sm mb-1 line-clamp-1">${r.name}</h4>
                        <p class="text-[10px] text-blue-600 font-bold uppercase tracking-wider mb-2">${r.details} • ${r.packaging}</p>
                        <p class="text-xs text-gray-500 line-clamp-2 mb-4 font-normal">${r.composition}</p>
                    </div>
                    <a href="#/products/${r.slug}" class="block text-center py-2 bg-blue-50 text-blue-700 text-xs font-bold rounded hover:bg-blue-600 hover:text-white transition-colors">View Details</a>
                </div>
                `;
            });

            let indicationsHtml = '';
            product.indications.forEach(ind => {
                indicationsHtml += `
                <li class="flex gap-3 text-sm text-gray-600 leading-relaxed font-normal scroll-reveal">
                    <span class="text-blue-600 mt-1 shrink-0">${DisicureRouter.icons.check}</span>
                    <span>${ind}</span>
                </li>
                `;
            });

            let benefitsHtml = '';
            product.benefits.forEach(b => {
                benefitsHtml += `
                <li class="flex gap-3 text-sm text-gray-600 leading-relaxed font-normal scroll-reveal">
                    <span class="text-blue-600 mt-1 shrink-0">${DisicureRouter.icons.check}</span>
                    <span>${b}</span>
                </li>
                `;
            });

            return `
            <section class="bg-blue-50/30 py-4 border-b border-blue-50">
                <div class="max-w-7xl mx-auto px-4 lg:px-8 text-xs text-gray-500 font-bold uppercase tracking-wider flex items-center gap-2">
                    <a href="#/" class="hover:text-blue-600">Home</a>
                    <span>/</span>
                    <a href="#/products" class="hover:text-blue-600">Products</a>
                    <span>/</span>
                    <span class="text-navy-950">${product.name}</span>
                </div>
            </section>

            <section class="py-8 md:py-12 bg-white">
                <div class="max-w-7xl mx-auto px-4 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    
                    <!-- Left Side: Product Staging Visual -->
                    <div class="lg:col-span-5 scroll-reveal">
                        <div class="border border-blue-100 p-8 rounded-2xl bg-gradient-to-b from-blue-50/20 to-white flex items-center justify-center relative min-h-[380px] shadow-sm">
                            <img src="${product.image}" alt="${product.name}" class="h-80 object-contain drop-shadow-lg max-w-full">
                            <!-- Packaging Badge -->
                            <div class="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur border border-blue-100 p-3 rounded-xl shadow-sm flex items-center justify-between">
                                <span class="text-[10px] font-extrabold text-gray-400 uppercase">Packaging Standard</span>
                                <span class="text-[10px] font-extrabold text-blue-700 px-3 py-0.5 bg-blue-50 border border-blue-100 rounded-full uppercase">${product.packaging}</span>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Right Side: Content Details -->
                    <div class="lg:col-span-7 space-y-6 scroll-reveal">
                        <div class="space-y-2">
                            <div class="flex flex-wrap items-center gap-2">
                                <span class="inline-block px-2.5 py-1 bg-blue-600 text-white text-xs font-bold rounded uppercase tracking-wider">${product.dosageForm}</span>
                                <span class="inline-block px-2.5 py-1 bg-blue-50 text-blue-700 border border-blue-100 text-xs font-bold rounded uppercase tracking-wider">${product.therapeuticCategory || 'Pharmaceutical Formulation'}</span>
                            </div>
                            <h1 class="text-3xl font-extrabold text-navy-950">${product.name}</h1>
                        </div>
                        
                        <!-- Packaging Specification & Composition Cards Grid -->
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <!-- Composition Card -->
                            <div class="bg-blue-50/40 border border-blue-100 p-4 rounded-xl">
                                <h4 class="text-[10px] font-extrabold text-blue-700 uppercase tracking-wider mb-1">Active Composition</h4>
                                <p class="text-sm font-extrabold text-navy-950 leading-snug">${product.composition}</p>
                            </div>
                            <!-- Packaging Info Card -->
                            <div class="bg-blue-50/40 border border-blue-100 p-4 rounded-xl">
                                <h4 class="text-[10px] font-extrabold text-blue-700 uppercase tracking-wider mb-1">Packaging Information</h4>
                                <p class="text-sm font-extrabold text-navy-950 leading-snug">${product.details}</p>
                                <p class="text-xs text-blue-600 font-semibold mt-0.5">${product.packaging}</p>
                            </div>
                        </div>
                        
                        <!-- Product Overview -->
                        <div>
                            <h3 class="text-base font-extrabold text-navy-950 mb-2 border-b border-blue-50 pb-2">Product Overview</h3>
                            <p class="text-sm text-gray-600 leading-relaxed font-normal">${product.description}</p>
                        </div>
                        
                        <!-- Indications & Clinical support information -->
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                            <div>
                                <h3 class="text-base font-extrabold text-navy-950 mb-3 border-b border-blue-50 pb-2">Indications / Uses</h3>
                                <ul class="space-y-3">
                                    ${indicationsHtml}
                                </ul>
                            </div>
                            <div>
                                <h3 class="text-base font-extrabold text-navy-950 mb-3 border-b border-blue-50 pb-2">Key Benefits</h3>
                                <ul class="space-y-3">
                                    ${benefitsHtml}
                                </ul>
                            </div>
                        </div>
                        
                        <!-- Actions -->
                        <div class="border-t border-blue-50 pt-6 flex flex-wrap gap-4">
                            <button onclick="window.DisicureMain.openEnquiryModal('${product.name}')" class="px-7 py-3.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded shadow-sm hover:shadow transition-all duration-300 uppercase tracking-wider">
                                Request Business Quote
                            </button>
                            <a href="https://wa.me/919005874417?text=Hello%20Disicure%20Care%20Team%2C%20I%20need%20assistance%20regarding%20a%20product%20enquiry%20for%20${encodeURIComponent(product.name)}." target="_blank" rel="noopener noreferrer" class="px-6 py-3.5 bg-green-600 hover:bg-green-700 text-white text-xs font-bold rounded shadow-sm hover:shadow transition-all duration-300 flex items-center gap-2 uppercase tracking-wider">
                                <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 001.33 4.982L2 22l5.233-1.371a9.994 9.994 0 004.773 1.226h.004c5.505 0 9.989-4.478 9.99-9.984a9.96 9.96 0 00-2.925-7.064 9.964 9.964 0 00-7.063-2.923zm5.035 14.175c-.276.776-1.357 1.411-1.854 1.503-.497.092-.992.176-2.915-.584-2.457-.973-4.043-3.473-4.165-3.637-.123-.164-1.002-1.332-1.002-2.541 0-1.21.635-1.803.862-2.049.227-.246.497-.307.662-.307.165 0 .331.006.475.012.148.006.348-.055.546.425.199.479.679 1.656.739 1.779.061.123.102.266.02.43-.082.164-.123.266-.246.41-.122.143-.258.32-.367.43-.122.123-.25.257-.107.502.143.246.636 1.05 1.37 1.702.946.84 1.74 1.1 1.987 1.224.246.123.389.102.532-.062.143-.164.615-.717.778-.962.164-.246.327-.205.551-.123.224.082 1.424.671 1.669.794.246.123.41.184.471.287.062.102.062.594-.214 1.37z"/></svg>
                                <span>WhatsApp Enquiry</span>
                            </a>
                            <a href="#/products" class="px-6 py-3.5 bg-white border border-blue-200 text-blue-700 text-xs font-bold rounded hover:bg-blue-50 transition-colors uppercase tracking-wider">
                                Back to Products
                            </a>
                        </div>
                    </div>
                    
                </div>
            </section>

            <!-- Related Products Section -->
            <section class="py-8 md:py-12 bg-blue-50/20 border-t border-blue-50">
                <div class="max-w-7xl mx-auto px-4 lg:px-8">
                    <h3 class="text-xl font-extrabold text-navy-950 mb-8 border-b border-blue-100 pb-3 scroll-reveal">Related Formulations</h3>
                    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                        ${relatedHtml}
                    </div>
                </div>
            </section>
            `;
        },

        // --- 5. SERVICES TEMPLATE ---
        services: function() {
            const services = window.DisicureData.services;

            let servicesListHtml = '';
            services.forEach((s, idx) => {
                const isEven = idx % 2 === 0;
                
                let capabilitiesList = '';
                s.capabilities.forEach(cap => {
                    capabilitiesList += `
                    <li class="flex items-start gap-2.5 text-xs font-semibold text-gray-600">
                        <span class="text-blue-600 mt-0.5">${DisicureRouter.icons.check}</span>
                        <span>${cap}</span>
                    </li>
                    `;
                });

                servicesListHtml += `
                <div class="flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center bg-white border border-blue-50 rounded-xl p-8 shadow-sm hover:shadow-md transition-all duration-300 scroll-reveal">
                    <div class="w-full lg:w-1/2">
                        <div class="h-64 rounded-lg overflow-hidden relative border border-blue-100 shadow-inner group">
                            <img src="${s.image}" alt="${s.title}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105">
                            <div class="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent flex items-end p-5">
                                <span class="text-3xl font-extrabold text-blue-400 opacity-60">${s.number}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="w-full lg:w-1/2 space-y-4">
                        <h3 class="text-xl font-extrabold text-navy-950">${s.title}</h3>
                        <p class="text-sm text-gray-600 leading-relaxed font-normal">${s.shortDesc}</p>
                        
                        <div class="border-t border-blue-50 pt-3">
                            <h4 class="text-xs font-bold text-blue-700 uppercase tracking-wider mb-2">Scope of Services</h4>
                            <ul class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                ${capabilitiesList}
                            </ul>
                        </div>
                        
                        <div class="pt-2 flex gap-4">
                            <a href="#/services/${s.slug}" class="py-2 px-4 bg-blue-50 text-blue-700 text-xs font-bold rounded hover:bg-blue-600 hover:text-white transition-colors">Learn More</a>
                            <button onclick="window.DisicureMain.openEnquiryModal('Service: ${s.title}')" class="py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded transition-colors">Enquire Now</button>
                        </div>
                    </div>
                </div>
                `;
            });

            return `
            <!-- Services Header -->
            <section class="bg-gradient-to-r from-blue-900 to-navy-950 text-white py-8 md:py-12 relative">
                <div class="max-w-7xl mx-auto px-4 lg:px-8 text-center space-y-4 scroll-reveal">
                    <span class="text-xs font-bold text-blue-300 tracking-wider uppercase">Our Service Capabilities</span>
                    <h1 class="text-3xl sm:text-4xl font-extrabold">B2B Pharmaceutical Services</h1>
                    <p class="text-sm text-blue-200 max-w-xl mx-auto font-normal">Offering comprehensive pharmaceutical business support spanning custom packaging development to high-end supply logistics.</p>
                </div>
            </section>

            <!-- Services List Grid -->
            <section class="py-8 md:py-12 bg-blue-50/20">
                <div class="max-w-7xl mx-auto px-4 lg:px-8 space-y-12">
                    ${servicesListHtml}
                </div>
            </section>
            `;
        },

        // --- 6. SERVICE DETAIL TEMPLATE ---
        serviceDetail: function(service) {
            let capabilitiesHtml = '';
            service.capabilities.forEach(cap => {
                capabilitiesHtml += `
                <div class="flex gap-3 bg-white p-4 rounded border border-blue-50 shadow-inner">
                    <div class="text-blue-600 mt-1">${DisicureRouter.icons.check}</div>
                    <span class="text-sm font-bold text-navy-950">${cap}</span>
                </div>
                `;
            });

            return `
            <!-- Service Breadcrumb -->
            <section class="bg-blue-50/30 py-4 border-b border-blue-50">
                <div class="max-w-7xl mx-auto px-4 lg:px-8 text-xs text-gray-500 font-bold uppercase tracking-wider flex items-center gap-2">
                    <a href="#/" class="hover:text-blue-600">Home</a>
                    <span>/</span>
                    <a href="#/services" class="hover:text-blue-600">Services</a>
                    <span>/</span>
                    <span class="text-navy-950">${service.title}</span>
                </div>
            </section>

            <!-- Service Details -->
            <section class="py-8 md:py-12 bg-white">
                <div class="max-w-7xl mx-auto px-4 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
                    
                    <!-- Left Column: Copy & Details -->
                    <div class="lg:col-span-8 space-y-6 scroll-reveal">
                        <div>
                            <span class="text-3xl font-extrabold text-blue-600 opacity-80">${service.number}</span>
                            <h1 class="text-3xl font-extrabold text-navy-950 mt-1">${service.title}</h1>
                        </div>
                        <p class="text-base text-gray-600 leading-relaxed font-normal">${service.shortDesc}</p>
                        
                        <div class="border-t border-blue-50 pt-6">
                            <h3 class="text-lg font-bold text-navy-950 mb-4">Scope of Capabilities</h3>
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                ${capabilitiesHtml}
                            </div>
                        </div>
                        
                        <div class="pt-4 flex flex-wrap gap-4">
                            <button onclick="window.DisicureMain.openEnquiryModal('Service: ${service.title}')" class="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded shadow transition-all">
                                Enquire Now
                            </button>
                            <a href="https://wa.me/919005874417?text=Hello%20Disicure%20Care%20Team%2C%20I%20need%20assistance%20regarding%20a%20service%20enquiry%20for%20${encodeURIComponent(service.title)}." target="_blank" rel="noopener noreferrer" class="px-6 py-3 bg-green-600 hover:bg-green-700 text-white text-sm font-bold rounded shadow transition-all flex items-center gap-1.5">
                                <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 001.33 4.982L2 22l5.233-1.371a9.994 9.994 0 004.773 1.226h.004c5.505 0 9.989-4.478 9.99-9.984a9.96 9.96 0 00-2.925-7.064 9.964 9.964 0 00-7.063-2.923zm5.035 14.175c-.276.776-1.357 1.411-1.854 1.503-.497.092-.992.176-2.915-.584-2.457-.973-4.043-3.473-4.165-3.637-.123-.164-1.002-1.332-1.002-2.541 0-1.21.635-1.803.862-2.049.227-.246.497-.307.662-.307.165 0 .331.006.475.012.148.006.348-.055.546.425.199.479.679 1.656.739 1.779.061.123.102.266.02.43-.082.164-.123.266-.246.41-.122.143-.258.32-.367.43-.122.123-.25.257-.107.502.143.246.636 1.05 1.37 1.702.946.84 1.74 1.1 1.987 1.224.246.123.389.102.532-.062.143-.164.615-.717.778-.962.164-.246.327-.205.551-.123.224.082 1.424.671 1.669.794.246.123.41.184.471.287.062.102.062.594-.214 1.37z"/></svg>
                                <span>WhatsApp Enquire</span>
                            </a>
                            <a href="#/services" class="px-6 py-3 border border-blue-200 text-blue-700 text-sm font-bold rounded hover:bg-blue-50 transition-colors">
                                Back to All Services
                            </a>
                        </div>
                    </div>
                    
                    <!-- Right Column: Visual and Trust CTA -->
                    <div class="lg:col-span-4 space-y-6 scroll-reveal">
                        <img src="${service.image}" alt="${service.title}" class="w-full rounded-lg shadow-md border border-blue-100">
                        <div class="bg-blue-50/30 border border-blue-50 p-6 rounded-xl text-center space-y-4">
                            <h4 class="font-bold text-navy-950 text-sm">Need a Custom Setup?</h4>
                            <p class="text-xs text-gray-500 leading-relaxed font-normal">Contact our development managers to discuss molecule customization or dedicated distribution infrastructure.</p>
                            <a href="#/contact" class="block w-full py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded transition-colors uppercase tracking-wider">Talk to Us</a>
                        </div>
                    </div>
                    
                </div>
            </section>
            `;
        },

        // --- 7. JOURNEY TIMELINE TEMPLATE ---
        journey: function() {
            let timelineHtml = '';
            window.DisicureData.journey.forEach((j, index) => {
                timelineHtml += `
                <!-- Timeline Row -->
                <div class="flex flex-col md:flex-row items-center gap-6 md:gap-12 relative z-10 scroll-reveal">
                    <div class="flex items-center justify-center w-16 h-16 rounded-full bg-white border-2 border-blue-600 text-blue-600 shadow-md relative z-10 font-bold shrink-0">
                        <span class="absolute -top-3 text-[10px] font-bold px-2 py-0.5 bg-blue-600 text-white rounded-full">${j.stage}</span>
                        ${j.icon}
                    </div>
                    
                    <div class="bg-white border border-blue-100 p-6 rounded-lg shadow-sm flex-1 md:max-w-xl">
                        <h3 class="text-lg font-bold text-navy-950 mb-2">${j.title}</h3>
                        <p class="text-sm text-gray-600 leading-relaxed font-normal">${j.desc}</p>
                    </div>
                </div>
                `;
            });

            return `
            <!-- Journey Header -->
            <section class="bg-gradient-to-r from-blue-900 to-navy-950 text-white py-8 md:py-12 relative">
                <div class="max-w-7xl mx-auto px-4 lg:px-8 text-center space-y-4 scroll-reveal">
                    <span class="text-xs font-bold text-blue-300 tracking-wider uppercase">Strategic Implementation</span>
                    <h1 class="text-3xl sm:text-4xl font-extrabold">From Molecule to Market</h1>
                    <p class="text-sm text-blue-200 max-w-xl mx-auto font-normal">Our complete, step-by-step pharmaceutical pipeline ensuring packaging integrity, formulation quality, and reliable commercial logistics.</p>
                </div>
            </section>

            <!-- Vertical Timeline Section -->
            <section class="py-6 md:py-8 md:py-14 bg-white relative">
                <!-- Center timeline line (desktop only) -->
                <div class="hidden md:block absolute left-[56px] top-20 bottom-20 w-[2px] bg-blue-100 z-0"></div>
                
                <div class="max-w-4xl mx-auto px-4 space-y-12 relative">
                    ${timelineHtml}
                </div>
            </section>
            `;
        },

        // --- 8. UPGRADED CONTACT US TEMPLATE ---
        contact: function() {
            const info = window.DisicureData.companyInfo;

            return `
            <!-- Contact Hero -->
            <section class="bg-gradient-to-r from-blue-900 to-navy-950 text-white py-6 md:py-8 md:py-14 relative overflow-hidden">
                <div class="absolute inset-0 opacity-15 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-400 via-transparent to-transparent"></div>
                <div class="max-w-7xl mx-auto px-4 lg:px-8 text-center space-y-4 relative z-10 scroll-reveal">
                    <span class="text-xs font-bold text-blue-300 tracking-wider uppercase font-extrabold">B2B Connect</span>
                    <h1 class="text-4xl font-extrabold uppercase tracking-wide">LET'S BUILD YOUR PHARMA BUSINESS TOGETHER</h1>
                    <p class="text-sm text-blue-200 max-w-xl mx-auto font-normal">Connect with Disicure Care Pvt. Ltd. for pharmaceutical products, manufacturing, product development, branding, packaging, marketing and supply requirements.</p>
                </div>
            </section>

            <!-- Contact Forms & Columns Layout -->
            <section class="py-8 md:py-12 bg-white">
                <div class="max-w-7xl mx-auto px-4 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
                    
                    <!-- Left: Details Column -->
                    <div class="lg:col-span-5 space-y-8 scroll-reveal">
                        <div>
                            <span class="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full tracking-wider uppercase mb-3">Corporate Identity</span>
                            <h2 class="text-2xl font-extrabold text-navy-950 uppercase tracking-wider">${info.name}</h2>
                            <p class="text-xs text-blue-600 font-bold uppercase tracking-wider mt-1">"${info.tagline}"</p>
                        </div>
                        
                        <!-- Contact Cards Group -->
                        <div class="space-y-4">
                            <div class="flex gap-4 bg-blue-50/20 border border-blue-50/50 p-5 rounded-lg">
                                <div class="text-blue-600 mt-1">${DisicureRouter.icons.mapPin}</div>
                                <div>
                                    <h4 class="font-extrabold text-navy-950 text-sm">Registered Address</h4>
                                    <p class="text-xs text-gray-600 mt-1 leading-relaxed font-normal">${info.address}</p>
                                </div>
                            </div>
                            
                            <a href="tel:+919792009307" class="flex gap-4 bg-blue-50/20 border border-blue-50/50 p-5 rounded-lg hover:border-blue-500 transition-colors duration-300 block">
                                <div class="text-blue-600 mt-1">${DisicureRouter.icons.phone}</div>
                                <div>
                                    <h4 class="font-extrabold text-navy-950 text-sm">Direct Phone Channels</h4>
                                    <p class="text-xs text-gray-600 mt-1 font-bold">${info.contact.phones.join(' | ')}</p>
                                    <span class="text-[10px] text-blue-600 font-bold uppercase tracking-wider block mt-1">Tap to call manager</span>
                                </div>
                            </a>
                            
                            <a href="mailto:disicurecare@gmail.com" class="flex gap-4 bg-blue-50/20 border border-blue-50/50 p-5 rounded-lg hover:border-blue-500 transition-colors duration-300 block">
                                <div class="text-blue-600 mt-1">${DisicureRouter.icons.mail}</div>
                                <div>
                                    <h4 class="font-extrabold text-navy-950 text-sm">Corporate Email</h4>
                                    <p class="text-xs text-blue-600 font-bold mt-1">${info.contact.email}</p>
                                    <span class="text-[10px] text-blue-600 font-bold uppercase tracking-wider block mt-1">Tap to send email</span>
                                </div>
                            </a>
                            
                            <!-- Customer Care Support Card -->
                            <a href="https://wa.me/919005874417?text=Hello%20Disicure%20Care%20Team%2C%20I%20need%20assistance%20regarding%20a%20product%20enquiry." target="_blank" rel="noopener noreferrer" class="flex gap-4 bg-blue-50/20 border border-blue-50/50 p-5 rounded-lg hover:border-blue-500 transition-colors duration-300 block">
                                <div class="text-green-500 mt-1">
                                    <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 001.33 4.982L2 22l5.233-1.371a9.994 9.994 0 004.773 1.226h.004c5.505 0 9.989-4.478 9.99-9.984a9.96 9.96 0 00-2.925-7.064 9.964 9.964 0 00-7.063-2.923zm5.035 14.175c-.276.776-1.357 1.411-1.854 1.503-.497.092-.992.176-2.915-.584-2.457-.973-4.043-3.473-4.165-3.637-.123-.164-1.002-1.332-1.002-2.541 0-1.21.635-1.803.862-2.049.227-.246.497-.307.662-.307.165 0 .331.006.475.012.148.006.348-.055.546.425.199.479.679 1.656.739 1.779.061.123.102.266.02.43-.082.164-.123.266-.246.41-.122.143-.258.32-.367.43-.122.123-.25.257-.107.502.143.246.636 1.05 1.37 1.702.946.84 1.74 1.1 1.987 1.224.246.123.389.102.532-.062.143-.164.615-.717.778-.962.164-.246.327-.205.551-.123.224.082 1.424.671 1.669.794.246.123.41.184.471.287.062.102.062.594-.214 1.37z"/></svg>
                                </div>
                                <div>
                                    <h4 class="font-extrabold text-navy-950 text-sm">Need Assistance?</h4>
                                    <p class="text-[11px] text-gray-500 font-normal mt-0.5">For Customer Care & Product Enquiries,</p>
                                    <p class="text-xs text-blue-600 font-bold mt-1 flex items-center gap-1.5">
                                        <svg class="w-4 h-4 fill-current text-green-500" viewBox="0 0 24 24"><path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 001.33 4.982L2 22l5.233-1.371a9.994 9.994 0 004.773 1.226h.004c5.505 0 9.989-4.478 9.99-9.984a9.96 9.96 0 00-2.925-7.064 9.964 9.964 0 00-7.063-2.923zm5.035 14.175c-.276.776-1.357 1.411-1.854 1.503-.497.092-.992.176-2.915-.584-2.457-.973-4.043-3.473-4.165-3.637-.123-.164-1.002-1.332-1.002-2.541 0-1.21.635-1.803.862-2.049.227-.246.497-.307.662-.307.165 0 .331.006.475.012.148.006.348-.055.546.425.199.479.679 1.656.739 1.779.061.123.102.266.02.43-.082.164-.123.266-.246.41-.122.143-.258.32-.367.43-.122.123-.25.257-.107.502.143.246.636 1.05 1.37 1.702.946.84 1.74 1.1 1.987 1.224.246.123.389.102.532-.062.143-.164.615-.717.778-.962.164-.246.327-.205.551-.123.224.082 1.424.671 1.669.794.246.123.41.184.471.287.062.102.062.594-.214 1.37z"/></svg>
                                        <span>+91 9005874417</span>
                                    </p>
                                    <span class="text-[10px] text-blue-600 font-bold uppercase tracking-wider block mt-1.5">Tap to chat with customer support</span>
                                </div>
                            </a>
                        </div>
                    </div>
                    
                    <!-- Right: Form & Category Selection Column -->
                    <div class="lg:col-span-7 bg-blue-50/20 border border-blue-50 p-8 rounded-xl scroll-reveal">
                        <!-- visual element: micro molecular silhouette -->
                        <div class="flex items-center justify-between border-b border-blue-100 pb-4 mb-6">
                            <h3 class="text-xl font-extrabold text-navy-950 uppercase tracking-wide">Send B2B Enquiry</h3>
                            <div class="text-blue-500 opacity-60">
                                ${DisicureRouter.icons.beaker}
                            </div>
                        </div>
                        
                        <!-- Enquiry Categories quick select pills -->
                        <div class="mb-6">
                            <span class="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">Quick Select Enquiry Type:</span>
                            <div class="flex flex-wrap gap-2">
                                <span class="quick-select-pill enquiry-pill px-3 py-1.5 rounded-full text-xs font-semibold text-gray-600" data-value="Third-Party Manufacturing">Third-Party Manufacturing</span>
                                <span class="quick-select-pill enquiry-pill px-3 py-1.5 rounded-full text-xs font-semibold text-gray-600" data-value="PCD Pharma Franchise">PCD Franchise</span>
                                <span class="quick-select-pill enquiry-pill px-3 py-1.5 rounded-full text-xs font-semibold text-gray-600" data-value="Custom Product Development">Product Development</span>
                                <span class="quick-select-pill enquiry-pill px-3 py-1.5 rounded-full text-xs font-semibold text-gray-600" data-value="Supply & Distribution">Distribution & Supply</span>
                            </div>
                        </div>
                        
                        <form id="contact-enquiry-form" class="space-y-4" onsubmit="window.DisicureMain.handleFormSubmit(event, 'contact-enquiry-form')">
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1" for="contact-name">Full Name *</label>
                                    <input type="text" id="contact-name" name="name" required class="w-full bg-white border border-blue-100 rounded p-2.5 text-sm focus:outline-none focus:border-blue-500 font-normal">
                                </div>
                                <div>
                                    <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1" for="contact-company">Company Name</label>
                                    <input type="text" id="contact-company" name="company" class="w-full bg-white border border-blue-100 rounded p-2.5 text-sm focus:outline-none focus:border-blue-500 font-normal">
                                </div>
                            </div>
                            
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1" for="contact-phone">Mobile Number *</label>
                                    <input type="tel" id="contact-phone" name="phone" required class="w-full bg-white border border-blue-100 rounded p-2.5 text-sm focus:outline-none focus:border-blue-500 font-normal">
                                </div>
                                <div>
                                    <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1" for="contact-whatsapp">WhatsApp Number</label>
                                    <input type="tel" id="contact-whatsapp" name="whatsapp" class="w-full bg-white border border-blue-100 rounded p-2.5 text-sm focus:outline-none focus:border-blue-500 font-normal">
                                </div>
                            </div>
                            
                            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div class="sm:col-span-1">
                                    <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1" for="contact-email">Email Address *</label>
                                    <input type="email" id="contact-email" name="email" required class="w-full bg-white border border-blue-100 rounded p-2.5 text-sm focus:outline-none focus:border-blue-500 font-normal">
                                </div>
                                <div>
                                    <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1" for="contact-city">City *</label>
                                    <input type="text" id="contact-city" name="city" required class="w-full bg-white border border-blue-100 rounded p-2.5 text-sm focus:outline-none focus:border-blue-500 font-normal">
                                </div>
                                <div>
                                    <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1" for="contact-state">State *</label>
                                    <input type="text" id="contact-state" name="state" required class="w-full bg-white border border-blue-100 rounded p-2.5 text-sm focus:outline-none focus:border-blue-500 font-normal">
                                </div>
                            </div>
                            
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1" for="contact-business-type">Business Type *</label>
                                    <select id="contact-business-type" name="business_type" required class="w-full bg-white border border-blue-100 rounded p-2.5 text-sm focus:outline-none focus:border-blue-500 font-normal">
                                        <option value="" disabled selected>Select Business Type</option>
                                        <option value="Distributor">Distributor</option>
                                        <option value="Stockist">Stockist</option>
                                        <option value="Pharmacy">Pharmacy</option>
                                        <option value="Hospital">Hospital</option>
                                        <option value="Clinic">Clinic</option>
                                        <option value="Pharma Company">Pharma Company</option>
                                        <option value="Entrepreneur">Entrepreneur</option>
                                        <option value="Institutional Buyer">Institutional Buyer</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1" for="contact-service">Requirement Type *</label>
                                    <select id="contact-service" name="service" required class="w-full bg-white border border-blue-100 rounded p-2.5 text-sm focus:outline-none focus:border-blue-500 font-normal">
                                        <option value="" disabled selected>Select Requirement</option>
                                        <option value="Third-Party Manufacturing">Third-Party Manufacturing</option>
                                        <option value="Private Label">Private Label</option>
                                        <option value="PCD Franchise">PCD Franchise</option>
                                        <option value="Custom Formulation">Custom Formulation</option>
                                        <option value="Bulk Supply">Bulk Supply</option>
                                        <option value="Hospital Supply">Hospital Supply</option>
                                        <option value="Product Enquiry">Product Enquiry</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                            </div>
                            
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1" for="contact-molecule">Product / Molecule</label>
                                    <input type="text" id="contact-molecule" name="molecule" class="w-full bg-white border border-blue-100 rounded p-2.5 text-sm focus:outline-none focus:border-blue-500 font-normal" placeholder="e.g. Disimol-SP, Paracetamol">
                                </div>
                                <div>
                                    <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1" for="contact-quantity">Approximate Quantity</label>
                                    <input type="text" id="contact-quantity" name="quantity" class="w-full bg-white border border-blue-100 rounded p-2.5 text-sm focus:outline-none focus:border-blue-500 font-normal" placeholder="e.g. 1000 boxes, 50,000 tabs">
                                </div>
                            </div>
                            
                            <div>
                                <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1" for="contact-message">Enquiry Message *</label>
                                <textarea id="contact-message" name="message" rows="4" required class="w-full bg-white border border-blue-100 rounded p-2.5 text-sm focus:outline-none focus:border-blue-500 font-normal" placeholder="Specify dosage specifications or custom request details..."></textarea>
                            </div>
                            <div class="pt-2">
                                <button type="submit" class="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded shadow-sm hover:shadow transition-all duration-300 flex items-center justify-center gap-2">
                                    <span class="btn-text">Submit Enquiry</span>
                                    <svg class="animate-spin h-5 w-5 text-white hidden spinner" viewBox="0 0 24 24" fill="none">
                                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                </button>
                            </div>
                            <div class="form-feedback hidden text-center text-xs font-bold p-3 rounded mt-2"></div>
                        </form>
                    </div>
                </div>
            </section>

            <!-- Contact Page Bottom CTA (Have requirement?) -->
            <section class="py-8 md:py-12 bg-blue-900 text-white border-t border-blue-800">
                <div class="max-w-4xl mx-auto px-4 text-center space-y-6 scroll-reveal">
                    <h3 class="text-2xl font-extrabold uppercase tracking-wide">HAVE A PHARMACEUTICAL REQUIREMENT?</h3>
                    <p class="text-sm text-blue-200 max-w-xl mx-auto font-normal">Let's discuss your requirement with the Disicure Care team. Our managers are ready to support your business expansion.</p>
                    <div class="flex flex-wrap gap-4 justify-center pt-2">
                        <a href="tel:+919792009307" class="px-6 py-3 bg-white text-blue-800 text-xs font-bold rounded-md hover:bg-blue-50 transition-colors uppercase">Call Now</a>
                        <a href="https://wa.me/919792009307" target="_blank" class="px-6 py-3 bg-green-500 text-white text-xs font-bold rounded-md hover:bg-green-600 transition-colors uppercase">WhatsApp</a>
                        <a href="mailto:disicurecare@gmail.com" class="px-6 py-3 bg-blue-600 text-white text-xs font-bold rounded-md border border-blue-500 hover:bg-blue-700 transition-colors uppercase">Email</a>
                    </div>
                </div>
            </section>
            `;
        },

        // --- 9. PRIVACY POLICY TEMPLATE ---
        privacyPolicy: function() {
            return `
            <section class="py-8 md:py-12 bg-white min-h-[70vh]">
                <div class="max-w-4xl mx-auto px-4 space-y-6 scroll-reveal">
                    <h1 class="text-3xl font-extrabold text-navy-950">Privacy Policy</h1>
                    <p class="text-xs text-gray-400 font-bold uppercase tracking-wider">Effective Date: August 21, 2026</p>
                    <hr class="border-blue-100">
                    <p class="text-sm text-gray-600 leading-relaxed font-normal">
                        Disicure Care Pvt. Ltd. ("we", "our", "us") values your privacy. This policy outlines how we collect, store, and manage company contact information submitted through our online inquiry portals.
                    </p>
                    <h3 class="text-lg font-bold text-navy-950">1. Information Collection</h3>
                    <p class="text-sm text-gray-600 leading-relaxed font-normal">
                        We collect business identifiers such as contact names, phone numbers, corporate email addresses, and specific product/service requirements that you submit voluntarily through forms.
                    </p>
                    <h3 class="text-lg font-bold text-navy-950">2. Purpose of Processing</h3>
                    <p class="text-sm text-gray-600 leading-relaxed font-normal">
                        Your information is processed exclusively to answer your B2B inquiries, formulate commercial quotations, coordinate product logistics, or establish manufacturing and PCD franchise relations.
                    </p>
                    <h3 class="text-lg font-bold text-navy-950">3. Data Sharing</h3>
                    <p class="text-sm text-gray-600 leading-relaxed font-normal">
                        We do not sell, rent, or lease corporate databases to third parties. Information is shared only with quality-focused supply partners, logistics operations, or regulatory authorities where mandated by law.
                    </p>
                </div>
            </section>
            `;
        },

        // --- 10. TERMS & CONDITIONS TEMPLATE ---
        terms: function() {
            return `
            <section class="py-8 md:py-12 bg-white min-h-[70vh]">
                <div class="max-w-4xl mx-auto px-4 space-y-6 scroll-reveal">
                    <h1 class="text-3xl font-extrabold text-navy-950">Terms & Conditions</h1>
                    <p class="text-xs text-gray-400 font-bold uppercase tracking-wider">Effective Date: August 21, 2026</p>
                    <hr class="border-blue-100">
                    <p class="text-sm text-gray-600 leading-relaxed font-normal">
                        Welcome to the corporate website of Disicure Care Pvt. Ltd. By accessing this platform, you agree to comply with and be bound by the terms and conditions outlined below.
                    </p>
                    <h3 class="text-lg font-bold text-navy-950">1. Proprietary Content</h3>
                    <p class="text-sm text-gray-600 leading-relaxed font-normal">
                        All brand names, packaging graphics, logos, layouts, and copy are copyrighted assets of Disicure Care Pvt. Ltd. Unauthorised duplication, reproduction, or use of brand imagery is strictly prohibited.
                    </p>
                    <h3 class="text-lg font-bold text-navy-950">2. Disclaimer of Trade</h3>
                    <p class="text-sm text-gray-600 leading-relaxed font-normal">
                        The content on this website is for corporate B2B informational purposes. It does not constitute a direct contract or offer of sale. Business relationships are governed exclusively by formal contract terms.
                    </p>
                    <h3 class="text-lg font-bold text-navy-950">3. Local Laws</h3>
                    <p class="text-sm text-gray-600 leading-relaxed font-normal">
                        These terms shall be governed by and construed in accordance with the laws of Uttarakhand, India. Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the courts of Dehradun.
                    </p>
                </div>
            </section>
            `;
        },

        // --- 11. DISCLAIMER TEMPLATE ---
        disclaimer: function() {
            return `
            <section class="py-8 md:py-12 bg-white min-h-[70vh]">
                <div class="max-w-4xl mx-auto px-4 space-y-6 scroll-reveal">
                    <h1 class="text-3xl font-extrabold text-navy-950">Medical Disclaimer</h1>
                    <p class="text-xs text-gray-400 font-bold uppercase tracking-wider">Compliance Review</p>
                    <hr class="border-blue-100">
                    <div class="bg-amber-50 border-l-4 border-amber-500 p-5 rounded-r-lg">
                        <p class="text-sm text-amber-800 font-medium leading-relaxed">
                            <strong>IMPORTANT:</strong> The information displayed on this website is strictly for informational and B2B corporate coordination purposes. It is NOT a substitute for professional medical advice, diagnosis, treatment, or clinical assessment.
                        </p>
                    </div>
                    <p class="text-sm text-gray-600 leading-relaxed font-normal">
                        Patients should not use the information on this website to self-diagnose or treat any medical conditions. Please consult with a qualified medical practitioner or doctor for clinical prescriptions, therapeutic claims, and dosage options.
                    </p>
                    <p class="text-sm text-gray-600 leading-relaxed font-normal">
                        Disicure Care Pvt. Ltd. does not sell pharmaceutical formulations directly to individual patients. Our operations are strictly restricted to licensed distributors, stockists, medical practitioners, hospitals, and institutional procurement channels in accordance with the Drugs and Cosmetics Act, 1940.
                    </p>
                </div>
            </section>
            `;
        },

        // --- 12. EXECUTIVE ADMIN DASHBOARD & LMS TEMPLATE ---
        adminLeads: function() {
            return `
            <!-- Admin Top Navigation Bar -->
            <section class="bg-[#07162c] text-white border-b border-blue-900/60 py-6 md:py-8 relative overflow-hidden">
                <div class="absolute inset-0 opacity-15 bg-[radial-gradient(#3b82f630_1px,transparent_1px)] [background-size:20px_20px]"></div>
                <div class="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
                    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div class="space-y-1">
                            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950 border border-blue-500/30 text-cyan-300 text-[10px] font-bold uppercase tracking-wider">
                                <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                                Executive Pharmaceutical Business Portal
                            </div>
                            <h1 class="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                                Disicure Care — Admin Dashboard & CRM
                            </h1>
                            <p class="text-xs text-blue-200/80 font-normal">
                                Real-time executive dashboard, lead pipeline tracking, financial ledger, and partner network analytics.
                            </p>
                        </div>
                        
                        <!-- Top Action Buttons -->
                        <div class="flex flex-wrap items-center gap-2.5">
                            <button onclick="window.DisicureMain.openAddLeadModal()" class="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg shadow-sm transition-all flex items-center gap-1.5 uppercase tracking-wider">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
                                <span>Add New Lead</span>
                            </button>
                            <button onclick="window.DisicureMain.exportLeadsCSV()" class="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg shadow-sm transition-all flex items-center gap-1.5 uppercase tracking-wider">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
                                <span>Export CSV</span>
                            </button>
                            <button onclick="window.DisicureMain.resetLeadsData()" class="px-3.5 py-2.5 bg-slate-800 hover:bg-slate-700 text-gray-300 text-xs font-bold rounded-lg border border-slate-700 transition-all flex items-center gap-1.5" title="Reset Demo Data">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
                                <span class="hidden sm:inline">Reset</span>
                            </button>
                        </div>
                    </div>

                    <!-- Dashboard Navigation Tabs -->
                    <div class="flex items-center gap-2 overflow-x-auto pt-6 border-t border-blue-900/50 mt-6 text-xs font-bold">
                        <button onclick="window.DisicureMain.switchAdminTab('tab-dashboard')" id="btn-tab-dashboard" class="admin-tab-btn active px-4 py-2 rounded-lg bg-blue-600 text-white transition-all whitespace-nowrap flex items-center gap-2">
                            <span>📊 Executive Dashboard</span>
                        </button>
                        <button onclick="window.DisicureMain.switchAdminTab('tab-leads')" id="btn-tab-leads" class="admin-tab-btn px-4 py-2 rounded-lg bg-slate-800/60 hover:bg-slate-800 text-blue-200 transition-all whitespace-nowrap flex items-center gap-2">
                            <span>📋 Lead Management (LMS)</span>
                        </button>
                        <button onclick="window.DisicureMain.switchAdminTab('tab-partners')" id="btn-tab-partners" class="admin-tab-btn px-4 py-2 rounded-lg bg-slate-800/60 hover:bg-slate-800 text-blue-200 transition-all whitespace-nowrap flex items-center gap-2">
                            <span>🤝 Active Partners Directory</span>
                        </button>
                        <button onclick="window.DisicureMain.switchAdminTab('tab-team')" id="btn-tab-team" class="admin-tab-btn px-4 py-2 rounded-lg bg-slate-800/60 hover:bg-slate-800 text-blue-200 transition-all whitespace-nowrap flex items-center gap-2">
                            <span>👥 Team & Assignees</span>
                        </button>
                        <button onclick="window.DisicureMain.switchAdminTab('tab-financials')" id="btn-tab-financials" class="admin-tab-btn px-4 py-2 rounded-lg bg-slate-800/60 hover:bg-slate-800 text-blue-200 transition-all whitespace-nowrap flex items-center gap-2">
                            <span>💳 Financials & Ledger</span>
                        </button>
                    </div>
                </div>
            </section>

            <!-- ================================================================= -->
            <!-- TAB 1: EXECUTIVE DASHBOARD (10 KPI Metrics + 6 Interactive Charts) -->
            <!-- ================================================================= -->
            <div id="tab-dashboard" class="admin-tab-content block">
                <!-- 10 Primary Metric KPI Cards -->
                <section class="py-6 bg-slate-50 border-b border-gray-200">
                    <div class="max-w-7xl mx-auto px-4 lg:px-8">
                        <div class="mb-3 flex items-center justify-between">
                            <span class="text-xs font-extrabold text-gray-500 uppercase tracking-wider">Business Key Performance Indicators</span>
                            <span class="text-[11px] text-blue-600 font-bold">Real-time Pipeline Sync</span>
                        </div>
                        
                        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5">
                            <!-- 1. 📊 Total Leads -->
                            <div class="bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                                <div class="flex items-center justify-between text-[11px] font-extrabold text-gray-500 uppercase tracking-wider">
                                    <span>📊 Total Leads</span>
                                </div>
                                <div class="text-2xl font-extrabold text-navy-950 mt-2" id="kpi-total-leads">0</div>
                                <span class="text-[10px] text-gray-400 font-medium">All capture channels</span>
                            </div>

                            <!-- 2. 📈 New Leads -->
                            <div class="bg-white p-4 rounded-xl border border-emerald-200 shadow-sm hover:shadow-md transition-shadow bg-emerald-50/15">
                                <div class="flex items-center justify-between text-[11px] font-extrabold text-emerald-700 uppercase tracking-wider">
                                    <span>📈 New Leads</span>
                                    <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
                                </div>
                                <div class="text-2xl font-extrabold text-emerald-600 mt-2" id="kpi-new-leads">0</div>
                                <span class="text-[10px] text-emerald-600 font-medium">Awaiting first contact</span>
                            </div>

                            <!-- 3. 📞 Follow-ups -->
                            <div class="bg-white p-4 rounded-xl border border-amber-200 shadow-sm hover:shadow-md transition-shadow bg-amber-50/15">
                                <div class="flex items-center justify-between text-[11px] font-extrabold text-amber-700 uppercase tracking-wider">
                                    <span>📞 Follow-ups</span>
                                    <span class="w-2 h-2 rounded-full bg-amber-500"></span>
                                </div>
                                <div class="text-2xl font-extrabold text-amber-600 mt-2" id="kpi-followup-leads">0</div>
                                <span class="text-[10px] text-amber-600 font-medium">Action scheduled</span>
                            </div>

                            <!-- 4. ✅ Converted Leads -->
                            <div class="bg-white p-4 rounded-xl border border-purple-200 shadow-sm hover:shadow-md transition-shadow bg-purple-50/15">
                                <div class="flex items-center justify-between text-[11px] font-extrabold text-purple-700 uppercase tracking-wider">
                                    <span>✅ Converted</span>
                                    <span class="w-2 h-2 rounded-full bg-purple-500"></span>
                                </div>
                                <div class="text-2xl font-extrabold text-purple-600 mt-2" id="kpi-converted-leads">0</div>
                                <span class="text-[10px] text-purple-600 font-medium" id="kpi-conversion-rate">0% Won</span>
                            </div>

                            <!-- 5. ❌ Lost Leads -->
                            <div class="bg-white p-4 rounded-xl border border-rose-200 shadow-sm hover:shadow-md transition-shadow bg-rose-50/15">
                                <div class="flex items-center justify-between text-[11px] font-extrabold text-rose-700 uppercase tracking-wider">
                                    <span>❌ Lost Leads</span>
                                    <span class="w-2 h-2 rounded-full bg-rose-500"></span>
                                </div>
                                <div class="text-2xl font-extrabold text-rose-600 mt-2" id="kpi-lost-leads">0</div>
                                <span class="text-[10px] text-rose-600 font-medium">Closed lost</span>
                            </div>

                            <!-- 6. 💰 Total Business Value -->
                            <div class="bg-white p-4 rounded-xl border border-blue-200 shadow-sm hover:shadow-md transition-shadow bg-blue-50/15">
                                <div class="flex items-center justify-between text-[11px] font-extrabold text-blue-700 uppercase tracking-wider">
                                    <span>💰 Business Value</span>
                                </div>
                                <div class="text-2xl font-extrabold text-blue-700 mt-2" id="kpi-business-value">₹48,50,000</div>
                                <span class="text-[10px] text-blue-600 font-medium">Total pipeline & orders</span>
                            </div>

                            <!-- 7. 💳 Payments Received -->
                            <div class="bg-white p-4 rounded-xl border border-teal-200 shadow-sm hover:shadow-md transition-shadow bg-teal-50/15">
                                <div class="flex items-center justify-between text-[11px] font-extrabold text-teal-700 uppercase tracking-wider">
                                    <span>💳 Received</span>
                                </div>
                                <div class="text-2xl font-extrabold text-teal-700 mt-2" id="kpi-payments-received">₹32,80,000</div>
                                <span class="text-[10px] text-teal-600 font-medium">Cleared collections</span>
                            </div>

                            <!-- 8. ⏳ Pending Payments -->
                            <div class="bg-white p-4 rounded-xl border border-orange-200 shadow-sm hover:shadow-md transition-shadow bg-orange-50/15">
                                <div class="flex items-center justify-between text-[11px] font-extrabold text-orange-700 uppercase tracking-wider">
                                    <span>⏳ Pending</span>
                                </div>
                                <div class="text-2xl font-extrabold text-orange-600 mt-2" id="kpi-pending-payments">₹15,70,000</div>
                                <span class="text-[10px] text-orange-600 font-medium">Outstanding receivables</span>
                            </div>

                            <!-- 9. 🤝 Active Partners -->
                            <div class="bg-white p-4 rounded-xl border border-indigo-200 shadow-sm hover:shadow-md transition-shadow bg-indigo-50/15">
                                <div class="flex items-center justify-between text-[11px] font-extrabold text-indigo-700 uppercase tracking-wider">
                                    <span>🤝 Active Partners</span>
                                </div>
                                <div class="text-2xl font-extrabold text-indigo-700 mt-2" id="kpi-active-partners">42</div>
                                <span class="text-[10px] text-indigo-600 font-medium">Distributors & PCD</span>
                            </div>

                            <!-- 10. 👥 Team Members -->
                            <div class="bg-white p-4 rounded-xl border border-cyan-200 shadow-sm hover:shadow-md transition-shadow bg-cyan-50/15">
                                <div class="flex items-center justify-between text-[11px] font-extrabold text-cyan-800 uppercase tracking-wider">
                                    <span>👥 Team Members</span>
                                </div>
                                <div class="text-2xl font-extrabold text-cyan-800 mt-2" id="kpi-team-members">8</div>
                                <span class="text-[10px] text-cyan-700 font-medium">Representatives & Staff</span>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- 6 Dedicated Visual Charts Grid -->
                <section class="py-8 bg-white">
                    <div class="max-w-7xl mx-auto px-4 lg:px-8 space-y-8">
                        
                        <!-- Row 1: Monthly Leads (Bar/Trend) & Conversion Funnel -->
                        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
                            <!-- Chart 1: Monthly Leads -->
                            <div class="lg:col-span-7 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
                                <div class="flex items-center justify-between border-b border-gray-100 pb-3">
                                    <div>
                                        <h3 class="text-base font-extrabold text-navy-950 flex items-center gap-2">
                                            <span>📈 Monthly Leads Progression</span>
                                            <span class="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">2026 Inflow</span>
                                        </h3>
                                        <p class="text-xs text-gray-500 font-normal">Tracking volume of pharmaceutical business inquiries by month.</p>
                                    </div>
                                    <span class="text-xs font-extrabold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded">+24% YoY Growth</span>
                                </div>
                                <div id="chart-monthly-leads" class="w-full h-64 flex items-center justify-center">
                                    <!-- Populated dynamically via SVG in main.js -->
                                </div>
                            </div>

                            <!-- Chart 2: Conversion Funnel & Status Breakdown -->
                            <div class="lg:col-span-5 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
                                <div class="flex items-center justify-between border-b border-gray-100 pb-3">
                                    <div>
                                        <h3 class="text-base font-extrabold text-navy-950 flex items-center gap-2">
                                            <span>🔄 Lead Conversion Funnel</span>
                                        </h3>
                                        <p class="text-xs text-gray-500 font-normal">Status stage distribution & pipeline conversion rate.</p>
                                    </div>
                                    <span class="text-xs font-extrabold text-purple-600 bg-purple-50 px-2.5 py-1 rounded">78% Win Ratio</span>
                                </div>
                                <div id="chart-conversion-rate" class="w-full h-64 flex items-center justify-center">
                                    <!-- Populated dynamically via SVG in main.js -->
                                </div>
                            </div>
                        </div>

                        <!-- Row 2: Monthly Revenue & Pending Payments Aging -->
                        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
                            <!-- Chart 3: Monthly Revenue Trajectory -->
                            <div class="lg:col-span-7 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
                                <div class="flex items-center justify-between border-b border-gray-100 pb-3">
                                    <div>
                                        <h3 class="text-base font-extrabold text-navy-950 flex items-center gap-2">
                                            <span>💵 Monthly Revenue Trajectory (in ₹ Lakhs)</span>
                                        </h3>
                                        <p class="text-xs text-gray-500 font-normal">Monthly commercial collections & manufacturing batch billings.</p>
                                    </div>
                                    <span class="text-xs font-extrabold text-blue-600 bg-blue-50 px-2.5 py-1 rounded">Total: ₹48.5L</span>
                                </div>
                                <div id="chart-revenue" class="w-full h-64 flex items-center justify-center">
                                    <!-- Populated dynamically via SVG in main.js -->
                                </div>
                            </div>

                            <!-- Chart 4: Pending Payments Aging Breakdown -->
                            <div class="lg:col-span-5 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
                                <div class="flex items-center justify-between border-b border-gray-100 pb-3">
                                    <div>
                                        <h3 class="text-base font-extrabold text-navy-950 flex items-center gap-2">
                                            <span>⏳ Pending Payments Aging Breakdown</span>
                                        </h3>
                                        <p class="text-xs text-gray-500 font-normal">Outstanding invoices categorized by credit terms and aging.</p>
                                    </div>
                                    <span class="text-xs font-extrabold text-orange-600 bg-orange-50 px-2.5 py-1 rounded">₹15.70L Due</span>
                                </div>
                                <div id="chart-pending-aging" class="w-full h-64 flex flex-col justify-center">
                                    <!-- Populated dynamically via SVG in main.js -->
                                </div>
                            </div>
                        </div>

                        <!-- Row 3: Lead Sources Distribution & Partner Performance Leaderboard -->
                        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
                            <!-- Chart 5: Lead Sources Distribution -->
                            <div class="lg:col-span-5 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
                                <div class="flex items-center justify-between border-b border-gray-100 pb-3">
                                    <div>
                                        <h3 class="text-base font-extrabold text-navy-950 flex items-center gap-2">
                                            <span>🌐 Lead Sources Distribution</span>
                                        </h3>
                                        <p class="text-xs text-gray-500 font-normal">Origin breakdown of incoming business inquiries.</p>
                                    </div>
                                </div>
                                <div id="chart-lead-sources" class="w-full h-64 flex items-center justify-center">
                                    <!-- Populated dynamically via SVG in main.js -->
                                </div>
                            </div>

                            <!-- Chart 6: Partner Performance Leaderboard -->
                            <div class="lg:col-span-7 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
                                <div class="flex items-center justify-between border-b border-gray-100 pb-3">
                                    <div>
                                        <h3 class="text-base font-extrabold text-navy-950 flex items-center gap-2">
                                            <span>🏆 Partner Performance Leaderboard</span>
                                        </h3>
                                        <p class="text-xs text-gray-500 font-normal">Top distributors and PCD franchise partners ranked by order volume.</p>
                                    </div>
                                    <span class="text-xs font-extrabold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded">42 Partners Active</span>
                                </div>
                                <div id="chart-partner-performance" class="w-full overflow-x-auto">
                                    <!-- Populated dynamically via table in main.js -->
                                </div>
                            </div>
                        </div>

                    </div>
                </section>
            </div>

            <!-- ================================================================= -->
            <!-- TAB 2: LEAD MANAGEMENT & PIPELINE (LMS DATA TABLE & FILTERS)     -->
            <!-- ================================================================= -->
            <div id="tab-leads" class="admin-tab-content hidden">
                <section class="py-8 bg-white min-h-[70vh]">
                    <div class="max-w-7xl mx-auto px-4 lg:px-8 space-y-6">
                        
                        <!-- Search & Filter Controls Toolbar -->
                        <div class="bg-slate-50 border border-gray-200 p-4 rounded-xl shadow-sm space-y-4">
                            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                                <!-- Live Search Input -->
                                <div class="lg:col-span-2 relative">
                                    <input type="text" id="lms-search-input" placeholder="Search by name, ID, phone, city, or product..." class="w-full bg-white border border-gray-200 rounded-lg p-2.5 pl-10 text-xs font-medium focus:outline-none focus:border-blue-500 shadow-sm">
                                    <span class="absolute left-3.5 top-3 text-gray-400">
                                        ${DisicureRouter.icons.search}
                                    </span>
                                </div>

                                <!-- Status Filter -->
                                <div>
                                    <select id="lms-status-filter" class="w-full bg-white border border-gray-200 rounded-lg p-2.5 text-xs font-bold text-gray-700 focus:outline-none focus:border-blue-500 shadow-sm">
                                        <option value="all">All Lead Statuses</option>
                                        <option value="🟢 New">🟢 New</option>
                                        <option value="🔵 Contacted">🔵 Contacted</option>
                                        <option value="🟡 Follow-up">🟡 Follow-up</option>
                                        <option value="🟠 Negotiation">🟠 Negotiation</option>
                                        <option value="🟣 Converted">🟣 Converted</option>
                                        <option value="🔴 Lost">🔴 Lost</option>
                                        <option value="⚫ On Hold">⚫ On Hold</option>
                                    </select>
                                </div>

                                <!-- Business Type Filter -->
                                <div>
                                    <select id="lms-business-filter" class="w-full bg-white border border-gray-200 rounded-lg p-2.5 text-xs font-medium text-gray-700 focus:outline-none focus:border-blue-500 shadow-sm">
                                        <option value="all">All Business Types</option>
                                        <option value="Distributor">Distributor</option>
                                        <option value="Stockist">Stockist</option>
                                        <option value="Hospital">Hospital</option>
                                        <option value="Pharmacy">Pharmacy / Chain</option>
                                        <option value="Clinic">Clinic</option>
                                        <option value="PCD Partner">PCD Partner</option>
                                        <option value="Pharma Company">Pharma Company</option>
                                        <option value="Institutional Buyer">Institutional Buyer</option>
                                    </select>
                                </div>

                                <!-- Source Filter -->
                                <div>
                                    <select id="lms-source-filter" class="w-full bg-white border border-gray-200 rounded-lg p-2.5 text-xs font-medium text-gray-700 focus:outline-none focus:border-blue-500 shadow-sm">
                                        <option value="all">All Lead Sources</option>
                                        <option value="Website">Website Forms</option>
                                        <option value="WhatsApp">WhatsApp CTA</option>
                                        <option value="Product">Product Enquiries</option>
                                        <option value="Hero">Hero B2B CTAs</option>
                                        <option value="Contact">Contact Page</option>
                                        <option value="Admin">Manual Entry</option>
                                    </select>
                                </div>
                            </div>

                            <!-- Secondary Bar: Count & Sort -->
                            <div class="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-gray-200 text-xs">
                                <div class="font-bold text-gray-600" id="lms-showing-count">
                                    Loading lead registry...
                                </div>
                                <div class="flex items-center gap-2">
                                    <span class="text-gray-400 font-semibold">Sort By:</span>
                                    <select id="lms-sort-filter" class="bg-white border border-gray-200 rounded p-1.5 text-xs font-semibold text-gray-700 focus:outline-none focus:border-blue-500">
                                        <option value="newest">Newest First</option>
                                        <option value="oldest">Oldest First</option>
                                        <option value="followup">Follow-up Due Date</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <!-- Leads Data Table Card -->
                        <div class="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                            <div class="overflow-x-auto">
                                <table class="w-full text-left border-collapse" id="lms-leads-table">
                                    <thead>
                                        <tr class="bg-slate-100/80 border-b border-gray-200 text-[11px] font-extrabold text-gray-600 uppercase tracking-wider">
                                            <th class="p-3.5">Lead ID & Date</th>
                                            <th class="p-3.5">Lead Info & Contact</th>
                                            <th class="p-3.5">Business & Requirement</th>
                                            <th class="p-3.5">Source</th>
                                            <th class="p-3.5">Lead Status</th>
                                            <th class="p-3.5">Assigned & Follow-up</th>
                                            <th class="p-3.5 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody id="lms-leads-tbody">
                                        <!-- Populated dynamically by window.DisicureMain.renderAdminLeads() -->
                                    </tbody>
                                </table>
                            </div>

                            <!-- Empty State Notice -->
                            <div id="lms-empty-state" class="hidden py-16 text-center">
                                <div class="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                                    ${DisicureRouter.icons.search}
                                </div>
                                <h3 class="text-base font-extrabold text-navy-950">No Leads Found</h3>
                                <p class="text-xs text-gray-500 max-w-sm mx-auto mt-1 font-normal leading-relaxed">
                                    No leads match your selected search term or filters. Try resetting the filters or add a new manual lead.
                                </p>
                            </div>
                        </div>
                        
                    </div>
                </section>
            </div>

            <!-- ================================================================= -->
            <!-- TAB 3: ACTIVE PARTNERS DIRECTORY                                 -->
            <!-- ================================================================= -->
            <div id="tab-partners" class="admin-tab-content hidden">
                <section class="py-8 bg-white min-h-[70vh]">
                    <div class="max-w-7xl mx-auto px-4 lg:px-8 space-y-6">
                        <div class="flex items-center justify-between border-b border-gray-100 pb-4">
                            <div>
                                <h2 class="text-xl font-extrabold text-navy-950">🤝 Active Pharmaceutical Partners Directory</h2>
                                <p class="text-xs text-gray-500 font-normal">Authorized distributors, hospital procurement networks, and PCD franchise operators.</p>
                            </div>
                            <span class="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">42 Registered Partners</span>
                        </div>
                        <div id="lms-partners-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <!-- Populated dynamically via main.js -->
                        </div>
                    </div>
                </section>
            </div>

            <!-- ================================================================= -->
            <!-- TAB 4: TEAM & ASSIGNEES DIRECTORY                                 -->
            <!-- ================================================================= -->
            <div id="tab-team" class="admin-tab-content hidden">
                <section class="py-8 bg-white min-h-[70vh]">
                    <div class="max-w-7xl mx-auto px-4 lg:px-8 space-y-6">
                        <div class="flex items-center justify-between border-b border-gray-100 pb-4">
                            <div>
                                <h2 class="text-xl font-extrabold text-navy-950">👥 Disicure Team & Representative Directory</h2>
                                <p class="text-xs text-gray-500 font-normal">Internal executive team, licensing desk officers, and commercial sales leads.</p>
                            </div>
                            <span class="text-xs font-bold text-cyan-800 bg-cyan-50 px-3 py-1 rounded-full border border-cyan-100">8 Active Representatives</span>
                        </div>
                        <div id="lms-team-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <!-- Populated dynamically via main.js -->
                        </div>
                    </div>
                </section>
            </div>

            <!-- ================================================================= -->
            <!-- TAB 5: FINANCIALS & LEDGER                                       -->
            <!-- ================================================================= -->
            <div id="tab-financials" class="admin-tab-content hidden">
                <section class="py-8 bg-white min-h-[70vh]">
                    <div class="max-w-7xl mx-auto px-4 lg:px-8 space-y-6">
                        <div class="flex items-center justify-between border-b border-gray-100 pb-4">
                            <div>
                                <h2 class="text-xl font-extrabold text-navy-950">💳 Commercial Financials & Invoicing Ledger</h2>
                                <p class="text-xs text-gray-500 font-normal">Accounts receivable, manufacturing contract milestones, and collection cycles.</p>
                            </div>
                            <span class="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">FY 2026-27 Active</span>
                        </div>
                        
                        <!-- Financial Highlights Grid -->
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div class="bg-blue-50/40 border border-blue-100 p-6 rounded-2xl">
                                <span class="text-xs font-extrabold text-blue-700 uppercase tracking-wider block">Total Business Invoiced</span>
                                <div class="text-3xl font-extrabold text-navy-950 mt-2">₹48,50,000</div>
                                <p class="text-xs text-gray-500 mt-2">Across 180+ wholesale batches & contract runs</p>
                            </div>
                            <div class="bg-emerald-50/40 border border-emerald-100 p-6 rounded-2xl">
                                <span class="text-xs font-extrabold text-emerald-700 uppercase tracking-wider block">Payments Cleared & Received</span>
                                <div class="text-3xl font-extrabold text-emerald-600 mt-2">₹32,80,000</div>
                                <p class="text-xs text-gray-500 mt-2">67.6% collection clearance efficiency</p>
                            </div>
                            <div class="bg-orange-50/40 border border-orange-100 p-6 rounded-2xl">
                                <span class="text-xs font-extrabold text-orange-700 uppercase tracking-wider block">Outstanding Receivables</span>
                                <div class="text-3xl font-extrabold text-orange-600 mt-2">₹15,70,000</div>
                                <p class="text-xs text-gray-500 mt-2">Under active 15–30 day credit cycles</p>
                            </div>
                        </div>

                        <!-- Aging Ledger Table -->
                        <div class="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-4">
                            <h3 class="text-base font-extrabold text-navy-950">Receivables Aging Schedule</h3>
                            <div id="lms-financials-aging" class="space-y-3">
                                <!-- Populated dynamically -->
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <!-- Edit/View Lead Details Drawer/Modal -->
            <div id="lms-lead-drawer" class="fixed inset-0 z-50 items-center justify-center hidden">
                <!-- Backdrop -->
                <div class="absolute inset-0 bg-navy-950/60 backdrop-blur-sm" onclick="window.DisicureMain.closeLeadDrawer()"></div>
                
                <!-- Drawer Box -->
                <div class="relative bg-white rounded-2xl p-6 md:p-8 max-w-3xl w-full mx-4 shadow-2xl z-10 max-h-[92vh] overflow-y-auto transform transition-all duration-300">
                    <button class="absolute top-4 right-4 text-gray-400 hover:text-navy-950 focus:outline-none" onclick="window.DisicureMain.closeLeadDrawer()">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
                    </button>
                    <div id="lms-drawer-content">
                        <!-- Populated dynamically by window.DisicureMain.openLeadDrawer(leadId) -->
                    </div>
                </div>
            </div>

            <!-- Add New Manual Lead Modal -->
            <div id="lms-add-modal" class="fixed inset-0 z-50 items-center justify-center hidden">
                <!-- Backdrop -->
                <div class="absolute inset-0 bg-navy-950/60 backdrop-blur-sm" onclick="window.DisicureMain.closeAddLeadModal()"></div>
                
                <!-- Modal Card -->
                <div class="relative bg-white rounded-2xl p-6 md:p-8 max-w-2xl w-full mx-4 shadow-2xl z-10 max-h-[90vh] overflow-y-auto">
                    <button class="absolute top-4 right-4 text-gray-400 hover:text-navy-950 focus:outline-none" onclick="window.DisicureMain.closeAddLeadModal()">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
                    </button>
                    
                    <h3 class="text-xl font-extrabold text-navy-950 mb-1">Add New Pharmaceutical Lead</h3>
                    <p class="text-xs text-gray-500 mb-6 font-normal">Manually record an enquiry from phone calls, exhibition meetings, or direct emails.</p>
                    
                    <form id="lms-new-lead-form" onsubmit="window.DisicureMain.saveNewLead(event)" class="space-y-4">
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-1">Full Name *</label>
                                <input type="text" name="name" required class="w-full bg-slate-50 border border-gray-200 rounded p-2.5 text-xs focus:border-blue-500">
                            </div>
                            <div>
                                <label class="block text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-1">Email Address</label>
                                <input type="email" name="email" class="w-full bg-slate-50 border border-gray-200 rounded p-2.5 text-xs focus:border-blue-500">
                            </div>
                        </div>

                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-1">Mobile Number *</label>
                                <input type="tel" name="mobile" required class="w-full bg-slate-50 border border-gray-200 rounded p-2.5 text-xs focus:border-blue-500">
                            </div>
                            <div>
                                <label class="block text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-1">WhatsApp Number</label>
                                <input type="tel" name="whatsapp" class="w-full bg-slate-50 border border-gray-200 rounded p-2.5 text-xs focus:border-blue-500">
                            </div>
                        </div>

                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-1">City *</label>
                                <input type="text" name="city" required class="w-full bg-slate-50 border border-gray-200 rounded p-2.5 text-xs focus:border-blue-500">
                            </div>
                            <div>
                                <label class="block text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-1">State *</label>
                                <input type="text" name="state" required class="w-full bg-slate-50 border border-gray-200 rounded p-2.5 text-xs focus:border-blue-500">
                            </div>
                        </div>

                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-1">Business Type *</label>
                                <select name="businessType" required class="w-full bg-slate-50 border border-gray-200 rounded p-2.5 text-xs focus:border-blue-500">
                                    <option value="Distributor">Distributor</option>
                                    <option value="Stockist">Stockist</option>
                                    <option value="Hospital">Hospital</option>
                                    <option value="Pharmacy">Pharmacy / Chain</option>
                                    <option value="Clinic">Clinic</option>
                                    <option value="PCD Partner">PCD Partner</option>
                                    <option value="Pharma Company">Pharma Company</option>
                                    <option value="Institutional Buyer">Institutional Buyer</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-1">Requirement Type *</label>
                                <select name="requirementType" required class="w-full bg-slate-50 border border-gray-200 rounded p-2.5 text-xs focus:border-blue-500">
                                    <option value="Third-Party Manufacturing">Third-Party Manufacturing</option>
                                    <option value="PCD Franchise">PCD Franchise</option>
                                    <option value="Bulk Purchase">Bulk Purchase</option>
                                    <option value="Hospital Supply">Hospital Supply</option>
                                    <option value="Custom Formulation">Custom Formulation</option>
                                    <option value="Product Enquiry">Product Enquiry</option>
                                    <option value="General Enquiry">General Enquiry</option>
                                </select>
                            </div>
                        </div>

                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-1">Product / Molecule / Service</label>
                                <input type="text" name="productOrService" placeholder="e.g. Disimol-SP, Capsules" class="w-full bg-slate-50 border border-gray-200 rounded p-2.5 text-xs focus:border-blue-500">
                            </div>
                            <div>
                                <label class="block text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-1">Assigned Person</label>
                                <select name="assignedPerson" class="w-full bg-slate-50 border border-gray-200 rounded p-2.5 text-xs focus:border-blue-500">
                                    ${window.DisicureLeads ? window.DisicureLeads.TEAM_MEMBERS.map(m => `<option value="${m}">${m}</option>`).join('') : '<option value="Nishant Chaturvedi (Director)">Nishant Chaturvedi (Director)</option>'}
                                </select>
                            </div>
                        </div>

                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-1">Initial Status</label>
                                <select name="leadStatus" class="w-full bg-slate-50 border border-gray-200 rounded p-2.5 text-xs font-bold focus:border-blue-500">
                                    <option value="🟢 New">🟢 New</option>
                                    <option value="🔵 Contacted">🔵 Contacted</option>
                                    <option value="🟡 Follow-up">🟡 Follow-up</option>
                                    <option value="🟠 Negotiation">🟠 Negotiation</option>
                                    <option value="🟣 Converted">🟣 Converted</option>
                                    <option value="🔴 Lost">🔴 Lost</option>
                                    <option value="⚫ On Hold">⚫ On Hold</option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-1">Follow-up Date</label>
                                <input type="date" name="followUpDate" class="w-full bg-slate-50 border border-gray-200 rounded p-2.5 text-xs focus:border-blue-500">
                            </div>
                        </div>

                        <div>
                            <label class="block text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-1">Enquiry Details / Notes</label>
                            <textarea name="notes" rows="3" class="w-full bg-slate-50 border border-gray-200 rounded p-2.5 text-xs focus:border-blue-500 font-normal" placeholder="Add specific client requirement details or notes..."></textarea>
                        </div>

                        <div class="pt-2 flex justify-end gap-3">
                            <button type="button" onclick="window.DisicureMain.closeAddLeadModal()" class="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded">
                                Cancel
                            </button>
                            <button type="submit" class="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded shadow">
                                Create Lead
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            `;
        },

        // --- 13. 404 NOT FOUND TEMPLATE ---
        notFound: function() {
            return `
            <section class="py-12 md:py-8 md:py-12 bg-white text-center min-h-[60vh] flex flex-col justify-center items-center">
                <div class="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-6">
                    <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" class="w-10 h-10"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
                </div>
                <h1 class="text-4xl font-extrabold text-navy-950 mb-2">404 - Page Not Found</h1>
                <p class="text-sm text-gray-500 max-w-sm mx-auto mb-8 font-normal leading-relaxed">The page route you requested does not exist or has been shifted. Return to our home page to browse products.</p>
                <a href="#/" class="px-6 py-3 bg-blue-600 text-white text-sm font-bold rounded hover:bg-blue-700 transition-colors">Go to Home Page</a>
            </section>
            `;
        }
    },

    icons: {
        arrowRight: `<svg fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" class="w-4 h-4 inline"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/></svg>`,
        arrowLeft: `<svg fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" class="w-4 h-4 inline"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"/></svg>`,
        check: `<svg fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"/></svg>`,
        search: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.602 10.602z"/></svg>`,
        mapPin: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/></svg>`,
        phone: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.622c0-1.272.933-2.316 2.193-2.47a12.448 12.448 0 0110.823 11.066c.009.072.012.146.012.22 0 1.258-1.009 2.225-2.223 2.225-1.173 0-2.164-.813-2.348-1.956a11.963 11.963 0 01-2.04-1.96 11.984 11.984 0 01-1.96-2.04c-1.144-.184-1.956-1.175-1.956-2.348 0-.074.003-.148.012-.22zM19.5 4.5h.008v.008h-.008V4.5z"/></svg>`,
        mail: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/></svg>`,
        box: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"/></svg>`,
        factory: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 21h16.5M4.5 3h15a2.25 2.25 0 012.25 2.25v13.5A2.25 2.25 0 0119.5 21h-15A2.25 2.25 0 012.25 18.75V5.25A2.25 2.25 0 014.5 3z"/></svg>`,
        beaker: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M9.75 3.104v1.242c0 .289.139.56.375.725l5.25 3.682A1.25 1.25 0 0116 9.778v5.118a3 3 0 01-3 3H11a3 3 0 01-3-3V9.778c0-.395.187-.768.5-.996l3-2.182a1.25 1.25 0 00.5-.996V3.104m-2.25 0h4.5"/></svg>`,
        design: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.83 20.613a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685 10.062-10.828zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"/></svg>`,
        tag: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581a2.25 2.25 0 003.181 0l4.319-4.319a2.25 2.25 0 000-3.182L11.16 3.659A2.25 2.25 0 009.568 3z"/><path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6z"/></svg>`,
        shield: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"/></svg>`,
        truck: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.75a1.125 1.125 0 01-1.125-1.125V7.5a1.125 1.125 0 011.125-1.125h9.75a1.125 1.125 0 011.125 1.125v10.125m-9.75 1.5a1.5 1.5 0 003 0m0 0h4.5m4.5 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.5a1.125 1.125 0 001.125-1.125v-3.375a3.375 3.375 0 00-.985-2.386l-2.025-2.025A2.625 2.625 0 0017.625 9.75H15V7.5m3 11.25a1.5 1.5 0 003 0m0 0H21m-6-11.25V18.75"/></svg>`
    }
};

window.DisicureRouter = DisicureRouter;
