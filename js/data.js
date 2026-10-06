// Centralized Data for Disicure Care Pvt. Ltd.
const DisicureData = {
    companyInfo: {
        name: "Disicure Care Pvt. Ltd.",
        tagline: "We Cure With Care",
        established: 2021,
        founder: "Mr. Nishant Chaturvedi",
        founderRole: "Founder & Director",
        founderVision: "To build Disicure Care into a trusted quality-driven pharmaceutical organization recognized for quality, reliability, ethical practices and a strong commitment to better healthcare.",
        address: "75, Vivekanand Enclave, Lane No.- 6C, Phase- II, Near Jogiwala, Dehradun-248001",
        contact: {
            phones: ["+91 9792009307", "+91 9104313824"],
            email: "disicurecare@gmail.com",
            whatsapp: "+919792009307"
        }
    },
    
    // Centralized Social Links Placeholder configuration
    socialLinks: {
        linkedin: "#",
        facebook: "#",
        twitter: "#",
        instagram: "#"
    },

    products: [
        {
            id: "disimol-sp",
            slug: "disimol-sp",
            name: "DISIMOL-SP Tablets",
            composition: "Aceclofenac 100 mg + Paracetamol 325 mg + Serratiopeptidase 15 mg",
            dosageForm: "Tablet",
            therapeuticCategory: "Analgesic, Anti-inflammatory & Anti-edema",
            packaging: "PVC-Aluminium Foil Blister Pack",
            details: "10x10 Tablets",
            description: "A rational triple-action combination designed to address pain, inflammation and associated swelling through complementary pharmacological actions. It provides effective relief from traumatic, inflammatory, and post-operative conditions.",
            indications: [
                "Acute painful inflammatory conditions",
                "Joint pain and inflammation",
                "Sprains and strains",
                "Post-traumatic pain & swelling",
                "Postoperative pain and swelling"
            ],
            benefits: [
                "Synergistic combination for comprehensive relief",
                "Addresses pain, inflammation and swelling together",
                "Designed for effective patient care"
            ],
            image: "images/disimol_sp.jpg",
            category: "tablets",
            isFeatured: true
        },
        {
            id: "disimol-p",
            slug: "disimol-p",
            name: "DISIMOL-P Tablets",
            composition: "Aceclofenac 100 mg + Paracetamol 325 mg",
            dosageForm: "Tablet",
            therapeuticCategory: "Analgesic & Antipyretic (NSAID)",
            packaging: "PVC-Aluminium Foil Blister Pack",
            details: "10x10 Tablets",
            description: "A trusted combination for effective pain relief, reduced inflammation and improved daily comfort. Combines Aceclofenac (NSAID) and Paracetamol (Analgesic/Antipyretic) for dual-action pain management.",
            indications: [
                "Relief of mild to moderate pain",
                "Musculoskeletal pain and inflammation",
                "Joint and arthritic pain",
                "Backache and related painful inflammatory conditions",
                "Pain associated with musculoskeletal disorders"
            ],
            benefits: [
                "Dual Action: Analgesic + Anti-inflammatory",
                "Effective pain management for acute and chronic pain",
                "Improves mobility & comfort"
            ],
            image: "images/disimol_p.jpg",
            category: "tablets",
            isFeatured: true
        },
        {
            id: "bonscure",
            slug: "bonscure",
            name: "Bons Cure Tablets",
            composition: "Calcium Citrate Malate + Vitamin D3 + Magnesium + Zinc",
            dosageForm: "Tablet",
            therapeuticCategory: "Bone Health & Nutritional Supplement",
            packaging: "PVC-Aluminium Foil Blister Pack",
            details: "10x10 Tablets",
            description: "A premium 4-in-1 bone and mineral support formulation. Helps in supporting normal bones and teeth, calcium absorption, muscle health, and physiological immune functions.",
            indications: [
                "Calcium and mineral supplementation",
                "Support for bone and skeletal health",
                "Nutritional support where calcium/vitamin D intake is inadequate",
                "Pregnancy nutrition and mineral support during lactation",
                "Support during periods of increased nutritional demand"
            ],
            benefits: [
                "4-in-1 Nutrient Formula: Calcium + Vitamin D3 + Magnesium + Zinc",
                "Bone & Mineral Support: Designed around essential nutrients in bone metabolism",
                "Convenient nutritional support for healthy bones and teeth"
            ],
            image: "images/bonscure.jpg",
            category: "tablets",
            isFeatured: true
        },
        {
            id: "disizole-dsr",
            slug: "disizole-dsr",
            name: "DISIZOLE-DSR Capsules",
            composition: "Pantoprazole 20 mg + Domperidone 30 mg",
            dosageForm: "Capsule",
            therapeuticCategory: "Gastrointestinal & Anti-Reflux",
            packaging: "Attractive Alu-Alu Pack",
            details: "10x10 Capsules",
            description: "Dual-action gastrointestinal support combining Pantoprazole (proton pump inhibitor) and Domperidone (dopamine-antagonist prokinetic agent). Delivers enteric-coated and sustained-release protection from acidity and reflux.",
            indications: [
                "GERD / Acid reflux and heartburn",
                "Dyspeptic symptoms with delayed gastric emptying",
                "Acid-related upper GI symptoms",
                "Gastric motility-related discomfort, fullness, and bloating"
            ],
            benefits: [
                "Dual Action: Acid suppression + Prokinetic support",
                "Advanced enteric-coated + sustained-release technology",
                "Comprehensive support for upper GI comfort"
            ],
            image: "images/disizole_dsr.jpg",
            category: "capsules",
            isFeatured: true
        },
        {
            id: "disizyme",
            slug: "disizyme",
            name: "DISIZYME Capsules",
            composition: "Prebiotic + Probiotic + Zinc",
            dosageForm: "Capsule",
            therapeuticCategory: "Gut Health & Digestive Wellness",
            packaging: "Attractive Alu-Alu Pack",
            details: "10x10 Capsules",
            description: "A complete prebiotic, probiotic and zinc formulation designed for gut health and nutritional support. Restores beneficial gut microorganisms, maintains gut microbial balance, and supports the immune system.",
            indications: [
                "Supports healthy gut microbiota",
                "Nutritional support for digestive wellness",
                "Prebiotic and probiotic supplementation",
                "Additional nutritional support from Zinc for immune function"
            ],
            benefits: [
                "Pre + Pro: Dual approach to gut microbiome support",
                "Added Zinc: Additional nutritional and immune-support advantage",
                "Complete Concept: Gut microbiome + nutritional support in one formulation"
            ],
            image: "images/disizyme.jpg",
            category: "capsules",
            isFeatured: true
        },
        {
            id: "disifer-xt",
            slug: "disifer-xt",
            name: "DISIFER-XT Tablets",
            composition: "Ferrous Ascorbate + Folic Acid + Vitamin B12 + Zinc",
            dosageForm: "Tablet",
            therapeuticCategory: "Haematinic & Iron Supplement",
            packaging: "PVC-Aluminium Foil Blister Pack",
            details: "10x10 Tablets",
            description: "A comprehensive 4-in-1 nutritional formula designed to support haemoglobin formation, address iron deficiency, support red blood cell synthesis, and boost immune functions.",
            indications: [
                "Iron deficiency and nutritional iron supplementation",
                "Iron-deficiency anaemia",
                "Folic acid supplementation",
                "Nutritional support during pregnancy, lactation, and other high-demand states"
            ],
            benefits: [
                "Iron: Supports haemoglobin formation",
                "Folic Acid: Essential for DNA synthesis & RBC formation",
                "Vitamin B12: Supports RBC synthesis and nervous system health",
                "Zinc: Supports normal immune function and physiological processes"
            ],
            image: "images/disifer_xt.jpg",
            category: "tablets",
            isFeatured: true
        },
        {
            id: "disivit-m",
            slug: "disivit-m",
            name: "DISIVIT-M Capsules",
            composition: "Lycopene + Multivitamins + Multiminerals + Antioxidants",
            dosageForm: "Capsule",
            therapeuticCategory: "Multinutrient & Antioxidant",
            packaging: "Attractive Alu-Alu Pack",
            details: "10x10 Capsules",
            description: "Complete multinutrient and antioxidant support. Features the Lycopene Advantage - a carotenoid with high antioxidant properties to combat oxidative stress and promote general wellness across all age groups.",
            indications: [
                "Daily multivitamin and multimineral supplementation",
                "Nutritional support during dietary insufficiency",
                "Antioxidant nutritional support to fight oxidative stress",
                "Support during periods of increased nutritional demand"
            ],
            benefits: [
                "Lycopene: Carotenoid with high antioxidant properties",
                "Complete: Full spectrum of multivitamins + multiminerals",
                "Antioxidant: Oxidative-stress support across life stages"
            ],
            image: "images/disivit_m.jpg",
            category: "capsules",
            isFeatured: true
        },
        {
            id: "disicin-of",
            slug: "disicin-of",
            name: "DISICIN-OF Tablets",
            composition: "Ofloxacin 200 mg",
            dosageForm: "Tablet",
            therapeuticCategory: "Antibacterial & Antimicrobial",
            packaging: "PVC-Aluminium Foil Blister Pack",
            details: "10x10 Tablets",
            description: "Fluoroquinolone antibacterial agent designed for targeted antibacterial therapy. Broad clinical utility for selected susceptible bacterial infections.",
            indications: [
                "Urinary tract infections",
                "Respiratory tract infections",
                "Skin and soft-tissue infections",
                "Prostatitis due to susceptible organisms",
                "Selected bacterial infections"
            ],
            benefits: [
                "Ofloxacin 200 mg: Fluoroquinolone antibacterial agent",
                "Broad Clinical Utility: Used for selected susceptible bacterial infections",
                "Rational Antibacterial Use: Targeted antibacterial therapy"
            ],
            image: "images/disicin_of.jpg",
            category: "tablets",
            isFeatured: true
        }
    ],

    services: [
        {
            id: "third-party-pharma-manufacturing",
            slug: "third-party-pharma-manufacturing",
            number: "01",
            title: "Third-Party Pharma Manufacturing",
            shortDesc: "Professional pharmaceutical manufacturing solutions for businesses looking to develop and market their own branded products.",
            image: "images/service_01.jpg",
            capabilities: [
                "Tablets",
                "Capsules",
                "Syrups & Dry Syrups",
                "Injections",
                "Ointments & Creams",
                "Softgels",
                "Powders & Sachets",
                "Customized Pharmaceutical Formulations"
            ]
        },
        {
            id: "pcd-pharma-franchise",
            slug: "pcd-pharma-franchise",
            number: "02",
            title: "PCD Pharma Franchise",
            shortDesc: "Build and expand your pharmaceutical business with our quality-focused product portfolio and comprehensive marketing support.",
            image: "images/service_02.jpg",
            capabilities: [
                "Monopoly-Based Pharma Franchise",
                "Product Portfolio Support",
                "Promotional Materials",
                "Marketing Support",
                "Territory-Based Business Opportunities"
            ]
        },
        {
            id: "pharmaceutical-marketing",
            slug: "pharmaceutical-marketing",
            number: "03",
            title: "Pharmaceutical Marketing",
            shortDesc: "Strategic pharmaceutical marketing solutions designed to strengthen product visibility, brand positioning and market reach.",
            image: "images/service_03.jpg",
            capabilities: [
                "Ethical Pharma Marketing",
                "Doctor-Focused Product Promotion",
                "Brand Development",
                "Product Positioning",
                "Marketing Strategy",
                "Promotional Campaign Support"
            ]
        },
        {
            id: "custom-pharma-product-development",
            slug: "custom-pharma-product-development",
            number: "04",
            title: "Custom Pharma Product Development",
            shortDesc: "Transform your pharmaceutical concept into a market-ready product with customized formulation and development support.",
            image: "images/service_04.jpg",
            capabilities: [
                "Custom Molecule Combinations",
                "Customized Formulations",
                "Strength & Dosage Customization",
                "New Product Concepts",
                "Product Portfolio Development"
            ]
        },
        {
            id: "private-label-pharma-manufacturing",
            slug: "private-label-pharma-manufacturing",
            number: "05",
            title: "Private Label Pharma Manufacturing",
            shortDesc: "Launch pharmaceutical products under your own brand with customized manufacturing, packaging and branding solutions.",
            image: "images/service_05.jpg",
            capabilities: [
                "Your Brand, Our Manufacturing",
                "Customized Product Portfolio",
                "Customized Packaging",
                "Private Label Solutions",
                "Brand-Focused Manufacturing Support"
            ]
        },
        {
            id: "pharma-product-branding-designing",
            slug: "pharma-product-branding-designing",
            number: "06",
            title: "Pharma Product Branding & Designing",
            shortDesc: "Complete pharmaceutical branding solutions to create professional, memorable and market-ready products.",
            image: "images/service_06.jpg",
            capabilities: [
                "Product Naming",
                "Logo & Brand Identity",
                "Product Packaging Design",
                "Label & Carton Design",
                "Promotional Creatives",
                "Product Catalogue Design"
            ]
        },
        {
            id: "pharmaceutical-packaging-solutions",
            slug: "pharmaceutical-packaging-solutions",
            number: "07",
            title: "Pharmaceutical Packaging Solutions",
            shortDesc: "Customized packaging solutions designed according to product requirements and brand identity.",
            image: "images/service_07.jpg",
            capabilities: [
                "Blister Packaging",
                "Alu-Alu Packaging",
                "Strip Packaging",
                "Bottle Packaging",
                "Tube Packaging",
                "Sachets & Powder Packaging",
                "Customized Packaging Solutions"
            ]
        },
        {
            id: "pharma-supply-distribution",
            slug: "pharma-supply-distribution",
            number: "08",
            title: "Pharma Supply & Distribution",
            shortDesc: "Reliable pharmaceutical supply solutions for distributors, stockists, hospitals, institutions and retail pharmacies.",
            image: "images/service_08.jpg",
            capabilities: [
                "Bulk Pharmaceutical Supply",
                "Distributor & Stockist Support",
                "Hospital Supply",
                "Institutional Supply",
                "Retail Pharmacy Supply",
                "Pan-India Supply Support"
            ]
        },
        {
            id: "hospital-institutional-pharma-supply",
            slug: "hospital-institutional-pharma-supply",
            number: "09",
            title: "Hospital & Institutional Pharma Supply",
            shortDesc: "Dedicated pharmaceutical supply solutions for hospitals, healthcare institutions and bulk procurement requirements.",
            image: "images/service_09.jpg",
            capabilities: [
                "Institutional Product Supply",
                "Bulk Procurement Support",
                "Hospital-Specific Requirements",
                "Customized Product Requirements",
                "Reliable Supply Coordination"
            ]
        },
        {
            id: "pharma-business-consultation-support",
            slug: "pharma-business-consultation-support",
            number: "10",
            title: "Pharma Business Consultation & Support",
            shortDesc: "End-to-end business support for entrepreneurs, distributors, pharma marketers and healthcare businesses.",
            image: "images/service_10.jpg",
            capabilities: [
                "Product Selection",
                "Product Portfolio Planning",
                "Pricing Strategy",
                "Market Entry Support",
                "Promotional Material Support",
                "Pharma Business Consultation"
            ]
        }
    ],

    journey: [
        {
            stage: "01",
            title: "Idea & Consultation",
            icon: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>`,
            desc: "Aligning on requirements, formulation goals, therapeutic categories, and feasibility analysis."
        },
        {
            stage: "02",
            title: "Formulation R&D",
            icon: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/></svg>`,
            desc: "Selecting raw materials and defining precise composition limits to secure maximum product efficacy."
        },
        {
            stage: "03",
            title: "Precision Manufacturing",
            icon: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/></svg>`, // modified slightly
            icon: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><circle cx="12" cy="12" r="3"/></svg>`,
            desc: "Processing products in state-of-the-art facilities with stringent quality assurance control."
        },
        {
            stage: "04",
            title: "Branding & Identity",
            icon: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>`,
            desc: "Formulating strong brand identities, memorable naming conventions, and layout structures."
        },
        {
            stage: "05",
            title: "Advanced Packaging",
            icon: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>`,
            desc: "Designing and sealing in Alu-Alu or PVC-Aluminium blister configurations tailored for product safety."
        },
        {
            stage: "06",
            title: "Marketing Campaigns",
            icon: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"/></svg>`,
            desc: "Creating promotional campaign setups, medical literature, and catalog support tools."
        },
        {
            stage: "07",
            title: "Reliable Distribution",
            icon: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"/><path stroke-linecap="round" stroke-linejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10M13 16h6M19 16h2m-2-4h2m-2 4v-4m-12 4h1M13 8h7a1 1 0 011 1v3h-8V8z"/></svg>`,
            desc: "Coordinating swift shipping channels to secure inventory levels at medical stores and distributors."
        }
    ]
};

// Make data globally accessible for non-module scripts
window.DisicureData = DisicureData;
