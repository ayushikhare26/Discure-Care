// ==========================================================================
// Disicure Care Pvt. Ltd. — Partner & Client Portal & Authentication Engine
// ==========================================================================

const DisicurePartner = {
    STORAGE_KEY: 'disicure_partners_db_v1',
    SESSION_KEY: 'disicure_partner_session_v1',
    ORDERS_STORAGE_KEY: 'disicure_partner_orders_v1',
    REFERRED_LEADS_KEY: 'disicure_partner_leads_v1',

    // Official Partner & Client Types
    PARTNER_TYPES: [
        { id: 'distributor', label: '🏢 Pharma Distributor', color: 'bg-blue-100 text-blue-900 border-blue-300', icon: '🏢', desc: 'Wholesale regional medicine distribution and stockist network.' },
        { id: 'business_partner', label: '🤝 Business Partner', color: 'bg-indigo-100 text-indigo-900 border-indigo-300', icon: '🤝', desc: 'Strategic co-development, joint venture & PCD pharma franchisee.' },
        { id: 'marketing_partner', label: '📢 Marketing Partner', color: 'bg-purple-100 text-purple-900 border-purple-300', icon: '📢', desc: 'Medical promotional campaigns, branding and doctor detailing agency.' },
        { id: 'freelancer', label: '💼 Freelancer', color: 'bg-teal-100 text-teal-900 border-teal-300', icon: '💼', desc: 'Independent medical representative (MR) and regional field associate.' },
        { id: 'sales_partner', label: '📞 Sales Partner', color: 'bg-emerald-100 text-emerald-900 border-emerald-300', icon: '📞', desc: 'Direct corporate sales, retail chains & bulk institutional procurement.' },
        { id: 'client', label: '🏥 Client / Hospital / Clinic', color: 'bg-rose-100 text-rose-900 border-rose-300', icon: '🏥', desc: 'Hospitals, medical institutions, nursing homes & chain pharmacies.' },
        { id: 'agency', label: '🏢 Agency', color: 'bg-amber-100 text-amber-900 border-amber-300', icon: '🏢', desc: 'Master pharmaceutical sourcing broker & consulting agency.' }
    ],

    // Seed realistic Initial Partners across all 7 categories
    INITIAL_PARTNERS: [
        {
            partnerId: 'PRT-2026-101',
            companyName: 'Medilink Pharma Network',
            contactPerson: 'Mr. Rajesh Singhal',
            partnerType: '🏢 Pharma Distributor',
            mobile: '+91 98765 11223',
            whatsapp: '+91 98765 11223',
            email: 'distributor@medilink.com',
            username: 'medilink.dist',
            password: 'partner123',
            accountStatus: '🟢 Active',
            city: 'Agra',
            state: 'Uttar Pradesh',
            assignedTerritory: 'Western UP & NCR Stockist Zone',
            commercialTerms: '22% Commercial Wholesale Discount • 30 Days Credit',
            gstin: '09AABCM1234F1Z8',
            drugLicense: 'UP/20B/2021/8849',
            totalBusinessValue: '₹34,50,000',
            totalBusinessNumeric: 3450000,
            outstandingBalance: '₹3,20,000',
            outstandingNumeric: 320000,
            activeOrdersCount: 2,
            completedBatchesCount: 18,
            accountManager: 'Mr. Nishant Chaturvedi (Director)',
            createdDate: '2026-01-15 10:30',
            lastLoginDate: '2026-10-06 18:45'
        },
        {
            partnerId: 'PRT-2026-102',
            companyName: 'Apollo Super Speciality Hospital Procurement',
            contactPerson: 'Dr. Sunita Verma (Chief Pharmacist)',
            partnerType: '🏥 Client / Hospital / Clinic',
            mobile: '+91 98111 22334',
            whatsapp: '+91 98111 22334',
            email: 'procurement@apollohospitals.org',
            username: 'apollo.client',
            password: 'partner123',
            accountStatus: '🟢 Active',
            city: 'Lucknow',
            state: 'Uttar Pradesh',
            assignedTerritory: 'Institutional Hospital Supply Rate Agreement',
            commercialTerms: '15% Institutional Tender Margin • Net 15 LC',
            gstin: '09AABCA9988D1Z2',
            drugLicense: 'UP/20B/HOSP/2023/112',
            totalBusinessValue: '₹28,00,000',
            totalBusinessNumeric: 2800000,
            outstandingBalance: '₹0 (All Clear)',
            outstandingNumeric: 0,
            activeOrdersCount: 1,
            completedBatchesCount: 12,
            accountManager: 'Dr. Vivek Sharma (VP Institutional)',
            createdDate: '2026-02-10 14:00',
            lastLoginDate: '2026-10-06 15:20'
        },
        {
            partnerId: 'PRT-2026-103',
            companyName: 'Apex Healthcare Media & Promotions',
            contactPerson: 'Mr. Vikram Adani',
            partnerType: '📢 Marketing Partner',
            mobile: '+91 99220 33445',
            whatsapp: '+91 99220 33445',
            email: 'marketing@apexmedia.in',
            username: 'apex.marketing',
            password: 'partner123',
            accountStatus: '🟢 Active',
            city: 'Mumbai',
            state: 'Maharashtra',
            assignedTerritory: 'Digital & Physician Detailing Campaigns',
            commercialTerms: '10% Commission on Attributed B2B Inbound Contracts',
            gstin: '27AABCA5566G1Z4',
            drugLicense: 'N/A (Marketing Agency)',
            totalBusinessValue: '₹4,80,000 (Commissions)',
            totalBusinessNumeric: 480000,
            outstandingBalance: '₹65,000 (Pending Payout)',
            outstandingNumeric: 65000,
            referredLeadsCount: 14,
            convertedLeadsCount: 6,
            accountManager: 'Mr. Nishant Chaturvedi (Director)',
            createdDate: '2026-03-01 11:15',
            lastLoginDate: '2026-10-05 16:10'
        },
        {
            partnerId: 'PRT-2026-104',
            companyName: 'Dr. Manoj K. Saxena (Independent Associate)',
            contactPerson: 'Dr. Manoj Saxena',
            partnerType: '💼 Freelancer',
            mobile: '+91 94120 55667',
            whatsapp: '+91 94120 55667',
            email: 'dr.manoj@pharmafreelance.in',
            username: 'manoj.freelance',
            password: 'partner123',
            accountStatus: '🟢 Active',
            city: 'Dehradun',
            state: 'Uttarakhand',
            assignedTerritory: 'Dehradun & Haridwar Clinical Network',
            commercialTerms: '8% Referral Incentive on Confirmed Institutional Orders',
            gstin: '05AADPS8899K1Z1',
            drugLicense: 'UK/DR/2024/099',
            totalBusinessValue: '₹2,10,000 (Incentives)',
            totalBusinessNumeric: 210000,
            outstandingBalance: '₹25,000 (Pending Payout)',
            outstandingNumeric: 25000,
            referredLeadsCount: 9,
            convertedLeadsCount: 4,
            accountManager: 'Ankit Rawat (Sales Executive)',
            createdDate: '2026-04-12 09:30',
            lastLoginDate: '2026-10-04 12:00'
        },
        {
            partnerId: 'PRT-2026-105',
            companyName: 'BioPharm PCD Strategic Associates',
            contactPerson: 'Mr. Amitabh Sen',
            partnerType: '🤝 Business Partner',
            mobile: '+91 97180 88990',
            whatsapp: '+91 97180 88990',
            email: 'partner@biopharm.co.in',
            username: 'biopharm.partner',
            password: 'partner123',
            accountStatus: '🟢 Active',
            city: 'Patna',
            state: 'Bihar',
            assignedTerritory: 'Bihar & Jharkhand Exclusive PCD Franchise Zone',
            commercialTerms: '20% PCD Franchise Margin Tier 1 • Visual Aid Kit Provided',
            gstin: '10AABCB4433E1Z9',
            drugLicense: 'BR/20B/PCD/2022/441',
            totalBusinessValue: '₹41,20,000',
            totalBusinessNumeric: 4120000,
            outstandingBalance: '₹4,50,000',
            outstandingNumeric: 450000,
            activeOrdersCount: 3,
            completedBatchesCount: 22,
            accountManager: 'Dr. Vivek Sharma (VP Institutional)',
            createdDate: '2026-01-20 16:45',
            lastLoginDate: '2026-10-06 11:30'
        },
        {
            partnerId: 'PRT-2026-106',
            companyName: 'Zenith Medical Sales Alliance',
            contactPerson: 'Ms. Pooja Deshmukh',
            partnerType: '📞 Sales Partner',
            mobile: '+91 98200 44556',
            whatsapp: '+91 98200 44556',
            email: 'sales@zenithalliance.com',
            username: 'zenith.sales',
            password: 'partner123',
            accountStatus: '🟢 Active',
            city: 'Ahmedabad',
            state: 'Gujarat',
            assignedTerritory: 'Gujarat & Western Maharashtra Bulk Supply',
            commercialTerms: '12% Key Account Margin • Net 21 Days',
            gstin: '24AABCZ7788P1Z6',
            drugLicense: 'GJ/20B/2020/9981',
            totalBusinessValue: '₹6,40,000',
            totalBusinessNumeric: 640000,
            outstandingBalance: '₹1,10,000',
            outstandingNumeric: 110000,
            referredLeadsCount: 19,
            convertedLeadsCount: 8,
            accountManager: 'Neha Gupta (Sales Executive)',
            createdDate: '2026-03-15 13:00',
            lastLoginDate: '2026-10-06 09:15'
        },
        {
            partnerId: 'PRT-2026-107',
            companyName: 'Nexus Global Pharma Agency',
            contactPerson: 'Mr. Rohan Mehra',
            partnerType: '🏢 Agency',
            mobile: '+91 99887 66554',
            whatsapp: '+91 99887 66554',
            email: 'agency@nexusglobal.com',
            username: 'nexus.agency',
            password: 'partner123',
            accountStatus: '🟢 Active',
            city: 'Guwahati',
            state: 'Assam',
            assignedTerritory: 'North-East Institutional Procurement Desk',
            commercialTerms: '15% Master Brokerage Commission',
            gstin: '18AABCN3322L1Z3',
            drugLicense: 'AS/20B/AGY/2023/505',
            totalBusinessValue: '₹9,75,000',
            totalBusinessNumeric: 975000,
            outstandingBalance: '₹1,80,000 (Pending Payout)',
            outstandingNumeric: 180000,
            referredLeadsCount: 25,
            convertedLeadsCount: 11,
            accountManager: 'Mr. Nishant Chaturvedi (Director)',
            createdDate: '2026-02-28 10:00',
            lastLoginDate: '2026-10-05 14:40'
        }
    ],

    // Seed realistic initial orders for partners
    INITIAL_ORDERS: [
        {
            orderId: 'ORD-2026-8801',
            partnerId: 'PRT-2026-101',
            productName: 'DISIZOLE-DSR Capsules (Rabeprazole + Domperidone)',
            quantity: '5,000 Strips (50,000 Caps)',
            batchNumber: 'BT-DSR-2608',
            orderDate: '2026-10-01',
            expectedDispatch: '2026-10-08',
            invoiceAmount: '₹2,45,000',
            status: '🟡 In Production & Blistering',
            coaDocument: 'COA_BT_DSR_2608.pdf',
            deliveryAddress: 'Medilink Central Warehouse, Transport Nagar, Agra'
        },
        {
            orderId: 'ORD-2026-8802',
            partnerId: 'PRT-2026-101',
            productName: 'DISIMOL-650 Tablets (Paracetamol 650mg)',
            quantity: '10,000 Strips (100,000 Tabs)',
            batchNumber: 'BT-MOL-2609',
            orderDate: '2026-09-24',
            expectedDispatch: '2026-10-03',
            invoiceAmount: '₹1,85,000',
            status: '🟢 Dispatched (BlueDart AWB #8892112)',
            coaDocument: 'COA_BT_MOL_2609.pdf',
            deliveryAddress: 'Medilink Central Warehouse, Transport Nagar, Agra'
        },
        {
            orderId: 'ORD-2026-8803',
            partnerId: 'PRT-2026-102',
            productName: 'DISIPOD-200 Tablets (Cefpodoxime Proxetil 200mg)',
            quantity: '3,000 Alu-Alu Strips',
            batchNumber: 'BT-POD-2611',
            orderDate: '2026-10-03',
            expectedDispatch: '2026-10-10',
            invoiceAmount: '₹3,60,000',
            status: '🔵 QA & QC Testing (Assay 99.8%)',
            coaDocument: 'COA_BT_POD_2611.pdf',
            deliveryAddress: 'Apollo Central Hospital Pharmacy Dept, Lucknow'
        },
        {
            orderId: 'ORD-2026-8804',
            partnerId: 'PRT-2026-105',
            productName: 'DISIKUF-DX Cough Relief Syrup (100ml)',
            quantity: '6,000 PET Bottles',
            batchNumber: 'BT-KUF-2605',
            orderDate: '2026-09-28',
            expectedDispatch: '2026-10-05',
            invoiceAmount: '₹2,90,000',
            status: '🟢 Delivered & Batch Cleared',
            coaDocument: 'COA_BT_KUF_2605.pdf',
            deliveryAddress: 'BioPharm Logistics Hub, Exhibition Road, Patna'
        }
    ],

    // Seed realistic partner-referred leads (for Freelancers, Marketing, Agencies)
    INITIAL_PARTNER_LEADS: [
        {
            leadId: 'REF-2026-501',
            partnerId: 'PRT-2026-103',
            clientName: 'Sunrise Multi-Speciality Clinic',
            contactPerson: 'Dr. Alok Verma',
            phone: '+91 98390 12345',
            city: 'Varanasi',
            requirement: 'Contract Packaging 50,000 Caps (DISIZOLE-DSR)',
            status: '🟣 Converted (Order Invoiced ₹3,20,000)',
            commissionEarned: '₹32,000',
            commissionStatus: '🟢 Paid',
            submittedDate: '2026-09-18'
        },
        {
            leadId: 'REF-2026-502',
            partnerId: 'PRT-2026-103',
            clientName: 'Citycare Pharmacy Franchise Group',
            contactPerson: 'Mr. Prateek Jain',
            phone: '+91 97210 65432',
            city: 'Kanpur',
            requirement: 'PCD Franchise for Respiratory Line',
            status: '🟠 In Negotiation',
            commissionEarned: '₹18,000 (Est.)',
            commissionStatus: '⏳ Pending Final PO',
            submittedDate: '2026-10-02'
        },
        {
            leadId: 'REF-2026-503',
            partnerId: 'PRT-2026-104',
            clientName: 'Doon Valley Wellness Center',
            contactPerson: 'Dr. K. N. Joshi',
            phone: '+91 94111 88776',
            city: 'Dehradun',
            requirement: 'Third-Party Syrup Manufacturing 2,000 bottles',
            status: '🟣 Converted (Invoiced ₹1,40,000)',
            commissionEarned: '₹11,200',
            commissionStatus: '🟢 Paid',
            submittedDate: '2026-09-22'
        },
        {
            leadId: 'REF-2026-504',
            partnerId: 'PRT-2026-107',
            clientName: 'Guwahati Medical Stockists Union',
            contactPerson: 'Mr. Bipul Goswami',
            phone: '+91 98640 55443',
            city: 'Guwahati',
            requirement: 'Antibiotic Range Bulk Institutional Supply',
            status: '🟣 Converted (Invoiced ₹8,50,000)',
            commissionEarned: '₹1,27,500',
            commissionStatus: '🟡 Partial Payout Approved',
            submittedDate: '2026-09-10'
        }
    ],

    // Initialize Database
    init: function() {
        if (!localStorage.getItem(this.STORAGE_KEY)) {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.INITIAL_PARTNERS));
        }
        if (!localStorage.getItem(this.ORDERS_STORAGE_KEY)) {
            localStorage.setItem(this.ORDERS_STORAGE_KEY, JSON.stringify(this.INITIAL_ORDERS));
        }
        if (!localStorage.getItem(this.REFERRED_LEADS_KEY)) {
            localStorage.setItem(this.REFERRED_LEADS_KEY, JSON.stringify(this.INITIAL_PARTNER_LEADS));
        }
    },

    // Get all partners
    getAllPartners: function() {
        this.init();
        try {
            return JSON.parse(localStorage.getItem(this.STORAGE_KEY)) || this.INITIAL_PARTNERS;
        } catch (e) {
            return this.INITIAL_PARTNERS;
        }
    },

    savePartners: function(partners) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(partners));
    },

    getPartnerById: function(partnerId) {
        const partners = this.getAllPartners();
        return partners.find(p => p.partnerId === partnerId || p.username === partnerId || p.email === partnerId);
    },

    // ID Generator
    generatePartnerId: function() {
        const partners = this.getAllPartners();
        const nextNum = 100 + partners.length + 1;
        return `PRT-2026-${nextNum}`;
    },

    // Add New Partner
    addPartner: function(data) {
        const partners = this.getAllPartners();
        const now = new Date();
        const dateStr = now.toISOString().replace('T', ' ').substring(0, 16);

        const newPartner = {
            partnerId: data.partnerId || this.generatePartnerId(),
            companyName: data.companyName || data.name || 'Partner Company',
            contactPerson: data.contactPerson || data.name || 'Contact Person',
            partnerType: data.partnerType || '🏢 Pharma Distributor',
            mobile: data.mobile || '+91 90000 00000',
            whatsapp: data.whatsapp || data.mobile || '+91 90000 00000',
            email: data.email || 'partner@disicurecare.com',
            username: data.username || (data.email ? data.email.split('@')[0] : 'partner.user'),
            password: data.password || 'partner123',
            accountStatus: data.accountStatus || '🟢 Active',
            city: data.city || 'Dehradun',
            state: data.state || 'Uttarakhand',
            assignedTerritory: data.assignedTerritory || 'General B2B Partner Zone',
            commercialTerms: data.commercialTerms || 'Standard B2B Commercial Terms',
            gstin: data.gstin || '09AABCP1122Q1Z0',
            drugLicense: data.drugLicense || 'DL-2026-GEN-01',
            totalBusinessValue: data.totalBusinessValue || '₹0',
            totalBusinessNumeric: 0,
            outstandingBalance: data.outstandingBalance || '₹0',
            outstandingNumeric: 0,
            activeOrdersCount: 0,
            completedBatchesCount: 0,
            referredLeadsCount: 0,
            convertedLeadsCount: 0,
            accountManager: data.accountManager || 'Mr. Nishant Chaturvedi (Director)',
            createdDate: dateStr,
            lastLoginDate: 'First login pending'
        };

        partners.unshift(newPartner);
        this.savePartners(partners);
        return newPartner;
    },

    // Update Partner
    updatePartner: function(partnerId, updatedFields) {
        const partners = this.getAllPartners();
        const index = partners.findIndex(p => p.partnerId === partnerId);
        if (index === -1) return false;

        partners[index] = {
            ...partners[index],
            ...updatedFields,
            lastModifiedDate: new Date().toISOString().replace('T', ' ').substring(0, 16)
        };

        this.savePartners(partners);

        // Update active session if currently logged in
        const session = this.getCurrentSession();
        if (session && session.partnerId === partnerId) {
            this.setSession(partners[index]);
        }

        return partners[index];
    },

    // Delete Partner
    deletePartner: function(partnerId) {
        let partners = this.getAllPartners();
        partners = partners.filter(p => p.partnerId !== partnerId);
        this.savePartners(partners);
        return true;
    },

    // --- AUTHENTICATION & SESSION MANAGEMENT ---
    login: function(identifier, password) {
        const cleanIdent = (identifier || '').trim().toLowerCase();
        const cleanPass = (password || '').trim();

        const partners = this.getAllPartners();
        const partner = partners.find(p => 
            (p.username.toLowerCase() === cleanIdent || p.email.toLowerCase() === cleanIdent || p.partnerId.toLowerCase() === cleanIdent) &&
            p.password === cleanPass
        );

        if (!partner) {
            return { success: false, message: 'Invalid username/email or password.' };
        }

        if (partner.accountStatus && partner.accountStatus.includes('Inactive')) {
            return { success: false, message: 'Your account is inactive. Please contact Disicure Admin.' };
        }

        const dateStr = new Date().toISOString().replace('T', ' ').substring(0, 16);
        this.updatePartner(partner.partnerId, { lastLoginDate: dateStr });

        partner.lastLoginDate = dateStr;
        this.setSession(partner);

        return { success: true, partner: partner };
    },

    setSession: function(partner) {
        localStorage.setItem(this.SESSION_KEY, JSON.stringify(partner));
    },

    getCurrentSession: function() {
        try {
            const raw = localStorage.getItem(this.SESSION_KEY);
            return raw ? JSON.parse(raw) : null;
        } catch (e) {
            return null;
        }
    },

    logout: function() {
        localStorage.removeItem(this.SESSION_KEY);
    },

    // --- PARTNER ORDERS ENGINE ---
    getAllOrders: function() {
        this.init();
        try {
            return JSON.parse(localStorage.getItem(this.ORDERS_STORAGE_KEY)) || this.INITIAL_ORDERS;
        } catch (e) {
            return this.INITIAL_ORDERS;
        }
    },

    getPartnerOrders: function(partnerId) {
        const all = this.getAllOrders();
        return all.filter(o => o.partnerId === partnerId);
    },

    placePartnerOrder: function(partnerId, orderData) {
        let orders = this.getAllOrders();
        const nextId = `ORD-2026-${8800 + orders.length + 1}`;
        const dateStr = new Date().toISOString().substring(0, 10);

        const newOrder = {
            orderId: nextId,
            partnerId: partnerId,
            productName: orderData.productName,
            quantity: orderData.quantity,
            batchNumber: `BT-ALLOC-${Math.floor(1000 + Math.random() * 9000)}`,
            orderDate: dateStr,
            expectedDispatch: 'Dispatch in 7-10 Days',
            invoiceAmount: orderData.estimatedAmount || 'Quote Under Generation',
            status: '🟢 Order Received (Commercial Review)',
            coaDocument: 'COA_Pending_Production.pdf',
            deliveryAddress: orderData.deliveryAddress || 'Registered Partner Facility Address'
        };

        orders.unshift(newOrder);
        localStorage.setItem(this.ORDERS_STORAGE_KEY, JSON.stringify(orders));

        // Increment active orders count on partner
        const partner = this.getPartnerById(partnerId);
        if (partner) {
            this.updatePartner(partnerId, {
                activeOrdersCount: (partner.activeOrdersCount || 0) + 1
            });
        }

        return newOrder;
    },

    // --- PARTNER REFERRED LEADS ENGINE (For Freelancers / Sales Partners / Agencies) ---
    getAllReferredLeads: function() {
        this.init();
        try {
            return JSON.parse(localStorage.getItem(this.REFERRED_LEADS_KEY)) || this.INITIAL_PARTNER_LEADS;
        } catch (e) {
            return this.INITIAL_PARTNER_LEADS;
        }
    },

    getPartnerReferredLeads: function(partnerId) {
        const all = this.getAllReferredLeads();
        return all.filter(l => l.partnerId === partnerId);
    },

    submitReferredLead: function(partnerId, leadData) {
        let leads = this.getAllReferredLeads();
        const nextId = `REF-2026-${500 + leads.length + 1}`;
        const dateStr = new Date().toISOString().substring(0, 10);

        const newLead = {
            leadId: nextId,
            partnerId: partnerId,
            clientName: leadData.clientName,
            contactPerson: leadData.contactPerson,
            phone: leadData.phone,
            city: leadData.city || 'India',
            requirement: leadData.requirement,
            status: '🟢 New Lead Registered (Assigned to Directorate)',
            commissionEarned: leadData.expectedCommission || 'Calculating (8-15%)',
            commissionStatus: '⏳ Under Evaluation',
            submittedDate: dateStr
        };

        leads.unshift(newLead);
        localStorage.setItem(this.REFERRED_LEADS_KEY, JSON.stringify(leads));

        // Automatically push into Master Lead Management System (LMS)
        if (window.DisicureLeads) {
            window.DisicureLeads.addLead({
                name: leadData.clientName,
                mobile: leadData.phone,
                email: leadData.email || '',
                city: leadData.city || '',
                state: leadData.state || '',
                businessType: 'Partner Referred Client',
                requirementType: 'Third-Party / Commercial Run',
                productOrService: leadData.requirement,
                source: `Partner Ref: ${partnerId}`,
                notes: `Submitted by Partner ID ${partnerId}. Contact: ${leadData.contactPerson}`
            });
        }

        // Increment partner counts
        const partner = this.getPartnerById(partnerId);
        if (partner) {
            this.updatePartner(partnerId, {
                referredLeadsCount: (partner.referredLeadsCount || 0) + 1
            });
        }

        return newLead;
    },

    // Summary KPIs for Admin View
    getSummary: function() {
        const partners = this.getAllPartners();
        let counts = {
            total: partners.length,
            distributors: 0,
            businessPartners: 0,
            marketingPartners: 0,
            freelancers: 0,
            salesPartners: 0,
            clients: 0,
            agencies: 0
        };

        partners.forEach(p => {
            const t = p.partnerType || '';
            if (t.includes('Distributor')) counts.distributors++;
            else if (t.includes('Business')) counts.businessPartners++;
            else if (t.includes('Marketing')) counts.marketingPartners++;
            else if (t.includes('Freelancer')) counts.freelancers++;
            else if (t.includes('Sales')) counts.salesPartners++;
            else if (t.includes('Client') || t.includes('Hospital')) counts.clients++;
            else if (t.includes('Agency')) counts.agencies++;
        });

        return counts;
    },

    // Reset Database
    resetToDefaults: function() {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.INITIAL_PARTNERS));
        localStorage.setItem(this.ORDERS_STORAGE_KEY, JSON.stringify(this.INITIAL_ORDERS));
        localStorage.setItem(this.REFERRED_LEADS_KEY, JSON.stringify(this.INITIAL_PARTNER_LEADS));
        return this.INITIAL_PARTNERS;
    }
};

// Global Exposure
window.DisicurePartner = DisicurePartner;
DisicurePartner.init();
