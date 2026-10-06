// ==========================================================================
// Disicure Care Pvt. Ltd. — Partner & Client Portal & Authentication Engine
// ==========================================================================

const DisicurePartner = {
    STORAGE_KEY: 'disicure_partners_db_v1',
    SESSION_KEY: 'disicure_partner_session_v1',
    ORDERS_STORAGE_KEY: 'disicure_partner_orders_v1',
    LEADS_STORAGE_KEY: 'disicure_partner_leads_v1',
    FOLLOWUPS_STORAGE_KEY: 'disicure_partner_followups_v1',
    DOCUMENTS_STORAGE_KEY: 'disicure_partner_documents_v1',

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
            businessGeneratedFormatted: '₹34,50,000',
            businessGeneratedNumeric: 3450000,
            commissionEarnedFormatted: '₹4,14,000',
            commissionEarnedNumeric: 414000,
            paymentReceivedFormatted: '₹31,30,000',
            paymentReceivedNumeric: 3130000,
            pendingPaymentFormatted: '₹3,20,000',
            pendingPaymentNumeric: 320000,
            leadsGeneratedCount: 16,
            leadsConvertedCount: 11,
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
            businessGeneratedFormatted: '₹28,00,000',
            businessGeneratedNumeric: 2800000,
            commissionEarnedFormatted: '₹0 (Institutional Procurement)',
            commissionEarnedNumeric: 0,
            paymentReceivedFormatted: '₹28,00,000',
            paymentReceivedNumeric: 2800000,
            pendingPaymentFormatted: '₹0 (All Clear)',
            pendingPaymentNumeric: 0,
            leadsGeneratedCount: 8,
            leadsConvertedCount: 7,
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
            businessGeneratedFormatted: '₹48,00,000',
            businessGeneratedNumeric: 4800000,
            commissionEarnedFormatted: '₹4,80,000',
            commissionEarnedNumeric: 480000,
            paymentReceivedFormatted: '₹4,15,000',
            paymentReceivedNumeric: 415000,
            pendingPaymentFormatted: '₹65,000 (Pending Payout)',
            pendingPaymentNumeric: 65000,
            leadsGeneratedCount: 14,
            leadsConvertedCount: 6,
            activeOrdersCount: 0,
            completedBatchesCount: 0,
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
            businessGeneratedFormatted: '₹26,25,000',
            businessGeneratedNumeric: 2625000,
            commissionEarnedFormatted: '₹2,10,000',
            commissionEarnedNumeric: 210000,
            paymentReceivedFormatted: '₹1,85,000',
            paymentReceivedNumeric: 185000,
            pendingPaymentFormatted: '₹25,000 (Pending Payout)',
            pendingPaymentNumeric: 25000,
            leadsGeneratedCount: 9,
            leadsConvertedCount: 4,
            activeOrdersCount: 0,
            completedBatchesCount: 0,
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
            businessGeneratedFormatted: '₹41,20,000',
            businessGeneratedNumeric: 4120000,
            commissionEarnedFormatted: '₹8,24,000',
            commissionEarnedNumeric: 824000,
            paymentReceivedFormatted: '₹36,70,000',
            paymentReceivedNumeric: 3670000,
            pendingPaymentFormatted: '₹4,50,000',
            pendingPaymentNumeric: 450000,
            leadsGeneratedCount: 18,
            leadsConvertedCount: 12,
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
            businessGeneratedFormatted: '₹53,30,000',
            businessGeneratedNumeric: 5330000,
            commissionEarnedFormatted: '₹6,40,000',
            commissionEarnedNumeric: 640000,
            paymentReceivedFormatted: '₹5,30,000',
            paymentReceivedNumeric: 530000,
            pendingPaymentFormatted: '₹1,10,000',
            pendingPaymentNumeric: 110000,
            leadsGeneratedCount: 19,
            leadsConvertedCount: 8,
            activeOrdersCount: 1,
            completedBatchesCount: 6,
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
            businessGeneratedFormatted: '₹65,00,000',
            businessGeneratedNumeric: 6500000,
            commissionEarnedFormatted: '₹9,75,000',
            commissionEarnedNumeric: 975000,
            paymentReceivedFormatted: '₹7,95,000',
            paymentReceivedNumeric: 795000,
            pendingPaymentFormatted: '₹1,80,000 (Pending Payout)',
            pendingPaymentNumeric: 180000,
            leadsGeneratedCount: 25,
            leadsConvertedCount: 11,
            activeOrdersCount: 2,
            completedBatchesCount: 14,
            accountManager: 'Mr. Nishant Chaturvedi (Director)',
            createdDate: '2026-02-28 10:00',
            lastLoginDate: '2026-10-05 14:40'
        }
    ],

    // Seed realistic Initial Leads belonging strictly to partners
    INITIAL_PARTNER_LEADS: [
        {
            leadId: 'PLEAD-2026-801',
            partnerId: 'PRT-2026-101',
            clientName: 'Shri Ram Chemist & Druggist Hub',
            contactPerson: 'Mr. Alok Goyal',
            mobile: '+91 98371 44552',
            email: 'alok@shrirampharma.in',
            city: 'Agra',
            state: 'Uttar Pradesh',
            requirement: 'Monthly Supply 20,000 Strips DISIZOLE-DSR + Paracetamol',
            estimatedValue: '₹4,50,000',
            commission: '₹45,000',
            leadStatus: '🟣 Converted',
            followUpDate: '2026-10-15',
            notes: 'Order confirmed and scheduled for third-party packaging batch.',
            createdDate: '2026-09-15'
        },
        {
            leadId: 'PLEAD-2026-802',
            partnerId: 'PRT-2026-101',
            clientName: 'Mathura Medicare Wholesale',
            contactPerson: 'Mr. Deepak Sharma',
            mobile: '+91 97580 99881',
            email: 'deepak@mathuramedicare.com',
            city: 'Mathura',
            state: 'Uttar Pradesh',
            requirement: 'Bulk PCD Franchise for Antibiotics & Cough Syrups',
            estimatedValue: '₹3,20,000',
            commission: '₹32,000',
            leadStatus: '🟠 Negotiation',
            followUpDate: '2026-10-08',
            notes: 'Negotiating wholesale price tiers and delivery schedule for Mathura region.',
            createdDate: '2026-09-28'
        },
        {
            leadId: 'PLEAD-2026-802B',
            partnerId: 'PRT-2026-101',
            clientName: 'Gwalior LifeCare Pharmacy',
            contactPerson: 'Dr. S. K. Gupta',
            mobile: '+91 94251 33221',
            email: 'gupta@lifecaregwalior.com',
            city: 'Gwalior',
            state: 'Madhya Pradesh',
            requirement: 'Inquiry for DISIPOD-200 and Multivitamin formulations',
            estimatedValue: '₹2,80,000',
            commission: '₹28,000',
            leadStatus: '🟡 Follow-up',
            followUpDate: '2026-10-09',
            notes: 'Samples dispatched via BlueDart. Client testing packaging finish.',
            createdDate: '2026-10-02'
        },
        {
            leadId: 'PLEAD-2026-803',
            partnerId: 'PRT-2026-102',
            clientName: 'Apollo Heart & Oncology Super Speciality Hospital',
            contactPerson: 'Dr. Sunita Verma',
            mobile: '+91 98111 22334',
            email: 'oncology.proc@apollo.org',
            city: 'Lucknow',
            state: 'Uttar Pradesh',
            requirement: 'Annual Institutional Rate Contract (Rabeprazole & Antibiotics)',
            estimatedValue: '₹28,00,000',
            commission: '₹0 (Institutional)',
            leadStatus: '🟣 Converted',
            followUpDate: '2026-10-20',
            notes: 'Institutional MOU signed. Regular monthly bulk dispatches underway.',
            createdDate: '2026-02-12'
        },
        {
            leadId: 'PLEAD-2026-804',
            partnerId: 'PRT-2026-103',
            clientName: 'Sunrise Multi-Speciality Clinic Network',
            contactPerson: 'Dr. Alok Verma',
            mobile: '+91 98390 12345',
            email: 'alok.sunrise@gmail.com',
            city: 'Varanasi',
            state: 'Uttar Pradesh',
            requirement: 'Contract Packaging 50,000 Caps (DISIZOLE-DSR)',
            estimatedValue: '₹3,20,000',
            commission: '₹32,000',
            leadStatus: '🟣 Converted',
            followUpDate: '2026-10-18',
            notes: 'Doctor sample visual aid shared. Commercial PO received.',
            createdDate: '2026-09-18'
        },
        {
            leadId: 'PLEAD-2026-805',
            partnerId: 'PRT-2026-103',
            clientName: 'Citycare Pharmacy Franchise Group',
            contactPerson: 'Mr. Prateek Jain',
            mobile: '+91 97210 65432',
            email: 'prateek@citycare.in',
            city: 'Kanpur',
            state: 'Uttar Pradesh',
            requirement: 'PCD Franchise for Respiratory Line',
            estimatedValue: '₹1,80,000',
            commission: '₹18,000',
            leadStatus: '🟠 Negotiation',
            followUpDate: '2026-10-09',
            notes: 'Discussing exclusive territory rights for Kanpur Nagar.',
            createdDate: '2026-10-02'
        },
        {
            leadId: 'PLEAD-2026-806',
            partnerId: 'PRT-2026-104',
            clientName: 'Doon Valley Wellness Center & Clinics',
            contactPerson: 'Dr. K. N. Joshi',
            mobile: '+91 94111 88776',
            email: 'drjoshi@doonwellness.in',
            city: 'Dehradun',
            state: 'Uttarakhand',
            requirement: 'Third-Party Syrup Manufacturing 2,000 bottles (DISILIV-DS & DISIKUF)',
            estimatedValue: '₹1,40,000',
            commission: '₹11,200',
            leadStatus: '🟣 Converted',
            followUpDate: '2026-10-14',
            notes: 'First batch delivered successfully. Repeat scheduled for next month.',
            createdDate: '2026-09-22'
        },
        {
            leadId: 'PLEAD-2026-807',
            partnerId: 'PRT-2026-104',
            clientName: 'Rishikesh Central Pharmacy',
            contactPerson: 'Mr. Manish Rawat',
            mobile: '+91 98970 44551',
            email: 'rawat@rishikeshpharmacy.com',
            city: 'Rishikesh',
            state: 'Uttarakhand',
            requirement: 'Supply of Paracetamol 650 & Cefpodoxime-200 Tablets',
            estimatedValue: '₹95,000',
            commission: '₹7,600',
            leadStatus: '🟡 Follow-up',
            followUpDate: '2026-10-10',
            notes: 'Following up after product catalog presentation.',
            createdDate: '2026-10-04'
        },
        {
            leadId: 'PLEAD-2026-808',
            partnerId: 'PRT-2026-105',
            clientName: 'Patna Central Hospital & Trauma Center',
            contactPerson: 'Dr. R. K. Choudhary',
            mobile: '+91 94310 77889',
            email: 'procurement@patnatrauma.in',
            city: 'Patna',
            state: 'Bihar',
            requirement: 'Institutional Bulk Antibiotic & Injectable Supply Contract',
            estimatedValue: '₹8,40,000',
            commission: '₹1,68,000',
            leadStatus: '🟣 Converted',
            followUpDate: '2026-10-16',
            notes: 'Agreement signed for 6 months. First batch dispatched.',
            createdDate: '2026-08-20'
        },
        {
            leadId: 'PLEAD-2026-809',
            partnerId: 'PRT-2026-107',
            clientName: 'Guwahati Medical Stockists Union',
            contactPerson: 'Mr. Bipul Goswami',
            mobile: '+91 98640 55443',
            email: 'goswami@guwahatistockist.org',
            city: 'Guwahati',
            state: 'Assam',
            requirement: 'Antibiotic Range Bulk Institutional Supply for NE Zone',
            estimatedValue: '₹8,50,000',
            commission: '₹1,27,500',
            leadStatus: '🟣 Converted',
            followUpDate: '2026-10-12',
            notes: 'Master stockist agreement executed. Dispatches in transit.',
            createdDate: '2026-09-10'
        }
    ],

    // Seed realistic Follow-ups strictly for partners
    INITIAL_FOLLOWUPS: [
        {
            followupId: 'FOL-2026-301',
            partnerId: 'PRT-2026-101',
            leadId: 'PLEAD-2026-802',
            clientName: 'Mathura Medicare Wholesale',
            contactPerson: 'Mr. Deepak Sharma',
            scheduledDate: '2026-10-08',
            scheduledTime: '11:30 AM',
            actionType: '📞 Commercial Negotiation Call',
            status: '⏳ Scheduled',
            notes: 'Confirm final carton quantity and lock in 30-day payment credit approval.'
        },
        {
            followupId: 'FOL-2026-302',
            partnerId: 'PRT-2026-101',
            leadId: 'PLEAD-2026-802B',
            clientName: 'Gwalior LifeCare Pharmacy',
            contactPerson: 'Dr. S. K. Gupta',
            scheduledDate: '2026-10-09',
            scheduledTime: '03:00 PM',
            actionType: '📦 Sample Feedback Review',
            status: '⏳ Scheduled',
            notes: 'Review blister packaging sample results and finalize PO for 10,000 boxes.'
        },
        {
            followupId: 'FOL-2026-303',
            partnerId: 'PRT-2026-101',
            leadId: 'PLEAD-2026-801',
            clientName: 'Shri Ram Chemist Hub',
            contactPerson: 'Mr. Alok Goyal',
            scheduledDate: '2026-10-15',
            scheduledTime: '02:00 PM',
            actionType: '🚚 Batch Dispatch Verification',
            status: '✅ Completed',
            notes: 'Batch COA shared via Document Vault; confirmed delivery tracking info.'
        },
        {
            followupId: 'FOL-2026-304',
            partnerId: 'PRT-2026-102',
            leadId: 'PLEAD-2026-803',
            clientName: 'Apollo Super Speciality Hospital',
            contactPerson: 'Dr. Sunita Verma',
            scheduledDate: '2026-10-20',
            scheduledTime: '10:00 AM',
            actionType: '📑 Quarterly Institutional Audit',
            status: '⏳ Scheduled',
            notes: 'Quarterly compliance review and next quarter purchase order requisition.'
        },
        {
            followupId: 'FOL-2026-305',
            partnerId: 'PRT-2026-103',
            leadId: 'PLEAD-2026-805',
            clientName: 'Citycare Pharmacy Franchise Group',
            contactPerson: 'Mr. Prateek Jain',
            scheduledDate: '2026-10-09',
            scheduledTime: '12:00 PM',
            actionType: '🤝 PCD Territory Agreement Signing',
            status: '⏳ Scheduled',
            notes: 'Review draft agreement terms and confirm minimum quarterly commitment.'
        },
        {
            followupId: 'FOL-2026-306',
            partnerId: 'PRT-2026-104',
            leadId: 'PLEAD-2026-807',
            clientName: 'Rishikesh Central Pharmacy',
            contactPerson: 'Mr. Manish Rawat',
            scheduledDate: '2026-10-10',
            scheduledTime: '04:30 PM',
            actionType: '💊 Doctor Detailing Folder Review',
            status: '⏳ Scheduled',
            notes: 'Demonstrate Disicure visual aid and provide product sample pack.'
        }
    ],

    // Seed realistic Shared Documents specifically for each partner
    INITIAL_SHARED_DOCS: [
        {
            docId: 'DOC-PRT-01',
            partnerId: 'PRT-2026-101',
            title: 'Disicure_Distributor_Agreement_Agra_2026.pdf',
            category: '📑 Agreements & Contracts',
            fileType: 'PDF',
            fileSize: '1.8 MB',
            uploadDate: '2026-01-15',
            description: 'Executed Exclusive Stockist & Authorized Wholesale Distribution Agreement for Western UP.'
        },
        {
            docId: 'DOC-PRT-02',
            partnerId: 'PRT-2026-101',
            title: 'Master_Wholesale_RateCard_AluAlu_FY2026.xlsx',
            category: '📊 Rate Cards & Price Lists',
            fileType: 'XLSX',
            fileSize: '2.4 MB',
            uploadDate: '2026-04-01',
            description: 'Approved commercial rate card with quantity slab margins for Disicure product portfolio.'
        },
        {
            docId: 'DOC-PRT-03',
            partnerId: 'PRT-2026-101',
            title: 'Batch_COA_Certified_DISIZOLE_BT2608.pdf',
            category: '📦 Product Specs & COA',
            fileType: 'PDF',
            fileSize: '950 KB',
            uploadDate: '2026-10-01',
            description: 'Certified Certificate of Analysis (COA) for Batch BT-DSR-2608 (Assay 99.8%).'
        },
        {
            docId: 'DOC-PRT-04',
            partnerId: 'PRT-2026-101',
            title: 'Physician_Visual_Aid_Detailing_Brochure.pdf',
            category: '🖼️ Marketing & Detailing Visuals',
            fileType: 'PDF',
            fileSize: '5.2 MB',
            uploadDate: '2026-03-10',
            description: 'High-resolution doctor detailing folder for field medical representatives.'
        },
        {
            docId: 'DOC-PRT-05',
            partnerId: 'PRT-2026-102',
            title: 'Apollo_Institutional_Supply_MOU_2026.pdf',
            category: '📑 Agreements & Contracts',
            fileType: 'PDF',
            fileSize: '2.1 MB',
            uploadDate: '2026-02-10',
            description: 'Annual Institutional Hospital Supply Rate Contract with Apollo Super Speciality.'
        },
        {
            docId: 'DOC-PRT-06',
            partnerId: 'PRT-2026-102',
            title: 'Disicure_GMP_ISO_Quality_Certifications.pdf',
            category: '📋 Licenses & Compliance',
            fileType: 'PDF',
            fileSize: '3.4 MB',
            uploadDate: '2026-01-20',
            description: 'WHO-GMP, GLP, and ISO 9001:2015 Manufacturing Quality Accreditation Certificates.'
        },
        {
            docId: 'DOC-PRT-07',
            partnerId: 'PRT-2026-103',
            title: 'Marketing_Commission_Agreement_Apex_2026.pdf',
            category: '📑 Agreements & Contracts',
            fileType: 'PDF',
            fileSize: '1.4 MB',
            uploadDate: '2026-03-01',
            description: 'Official 10% B2B Referral Commission and Digital Marketing Alliance Terms.'
        },
        {
            docId: 'DOC-PRT-08',
            partnerId: 'PRT-2026-104',
            title: 'Freelance_Associate_Agreement_DrManoj_2026.pdf',
            category: '📑 Agreements & Contracts',
            fileType: 'PDF',
            fileSize: '1.1 MB',
            uploadDate: '2026-04-12',
            description: 'Regional Field Representative commission structure for Dehradun & Haridwar zone.'
        },
        {
            docId: 'DOC-PRT-09',
            partnerId: 'PRT-2026-105',
            title: 'BioPharm_PCD_Exclusive_Franchise_Deed.pdf',
            category: '📑 Agreements & Contracts',
            fileType: 'PDF',
            fileSize: '2.8 MB',
            uploadDate: '2026-01-20',
            description: 'Exclusive PCD Franchise Territory Rights for Bihar and Jharkhand.'
        },
        {
            docId: 'DOC-PRT-10',
            partnerId: 'PRT-2026-107',
            title: 'Nexus_Agency_Master_Procurement_Agreement.pdf',
            category: '📑 Agreements & Contracts',
            fileType: 'PDF',
            fileSize: '2.5 MB',
            uploadDate: '2026-02-28',
            description: 'Master Agency brokerage contract for North-East state procurement tenders.'
        }
    ],

    // Seed realistic Initial Orders for partners
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

    // Initialize Database
    init: function() {
        if (!localStorage.getItem(this.STORAGE_KEY)) {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.INITIAL_PARTNERS));
        }
        if (!localStorage.getItem(this.ORDERS_STORAGE_KEY)) {
            localStorage.setItem(this.ORDERS_STORAGE_KEY, JSON.stringify(this.INITIAL_ORDERS));
        }
        if (!localStorage.getItem(this.LEADS_STORAGE_KEY)) {
            localStorage.setItem(this.LEADS_STORAGE_KEY, JSON.stringify(this.INITIAL_PARTNER_LEADS));
        }
        if (!localStorage.getItem(this.FOLLOWUPS_STORAGE_KEY)) {
            localStorage.setItem(this.FOLLOWUPS_STORAGE_KEY, JSON.stringify(this.INITIAL_FOLLOWUPS));
        }
        if (!localStorage.getItem(this.DOCUMENTS_STORAGE_KEY)) {
            localStorage.setItem(this.DOCUMENTS_STORAGE_KEY, JSON.stringify(this.INITIAL_SHARED_DOCS));
        }
    },

    // --- PARTNER REPOSITORY (Admin View & Directory) ---
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

    generatePartnerId: function() {
        const partners = this.getAllPartners();
        const nextNum = 100 + partners.length + 1;
        return `PRT-2026-${nextNum}`;
    },

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
            businessGeneratedFormatted: data.businessGeneratedFormatted || '₹0',
            businessGeneratedNumeric: 0,
            commissionEarnedFormatted: data.commissionEarnedFormatted || '₹0',
            commissionEarnedNumeric: 0,
            paymentReceivedFormatted: data.paymentReceivedFormatted || '₹0',
            paymentReceivedNumeric: 0,
            pendingPaymentFormatted: data.pendingPaymentFormatted || '₹0',
            pendingPaymentNumeric: 0,
            leadsGeneratedCount: 0,
            leadsConvertedCount: 0,
            activeOrdersCount: 0,
            completedBatchesCount: 0,
            accountManager: data.accountManager || 'Mr. Nishant Chaturvedi (Director)',
            createdDate: dateStr,
            lastLoginDate: 'First login pending'
        };

        partners.unshift(newPartner);
        this.savePartners(partners);
        return newPartner;
    },

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

    // =========================================================================
    // --- ISOLATED PARTNER DATA ENGINE (STRICT SCOPE: ONLY LOGGED-IN PARTNER) ---
    // =========================================================================

    // 1. Leads Generated & Status Tracking (Filtered strictly by partnerId)
    getAllLeads: function() {
        this.init();
        try {
            return JSON.parse(localStorage.getItem(this.LEADS_STORAGE_KEY)) || this.INITIAL_PARTNER_LEADS;
        } catch (e) {
            return this.INITIAL_PARTNER_LEADS;
        }
    },

    getPartnerLeads: function(partnerId) {
        const all = this.getAllLeads();
        return all.filter(l => l.partnerId === partnerId);
    },

    addPartnerLead: function(partnerId, leadData) {
        let leads = this.getAllLeads();
        const nextId = `PLEAD-2026-${800 + leads.length + 1}`;
        const dateStr = new Date().toISOString().substring(0, 10);

        const newLead = {
            leadId: nextId,
            partnerId: partnerId,
            clientName: leadData.clientName,
            contactPerson: leadData.contactPerson,
            mobile: leadData.mobile,
            email: leadData.email || '',
            city: leadData.city || 'India',
            state: leadData.state || '',
            requirement: leadData.requirement,
            estimatedValue: leadData.estimatedValue || 'Under Evaluation',
            commission: leadData.commission || 'Calculating (8-15%)',
            leadStatus: leadData.leadStatus || '🟢 New',
            followUpDate: leadData.followUpDate || dateStr,
            notes: leadData.notes || 'Referred via Partner Dashboard.',
            createdDate: dateStr
        };

        leads.unshift(newLead);
        localStorage.setItem(this.LEADS_STORAGE_KEY, JSON.stringify(leads));

        // Sync with Master LMS if present
        if (window.DisicureLeads) {
            window.DisicureLeads.addLead({
                name: leadData.clientName,
                mobile: leadData.mobile,
                email: leadData.email || '',
                city: leadData.city || '',
                state: leadData.state || '',
                businessType: 'Partner Referred Client',
                requirementType: 'Commercial Requirement',
                productOrService: leadData.requirement,
                source: `Partner Ref: ${partnerId}`,
                notes: `Submitted by Partner ID ${partnerId}. Contact: ${leadData.contactPerson}. Notes: ${leadData.notes || ''}`
            });
        }

        // Increment partner counts
        const partner = this.getPartnerById(partnerId);
        if (partner) {
            this.updatePartner(partnerId, {
                leadsGeneratedCount: (partner.leadsGeneratedCount || 0) + 1
            });
        }

        return newLead;
    },

    // 2. Scheduled Follow-ups (Filtered strictly by partnerId)
    getAllFollowups: function() {
        this.init();
        try {
            return JSON.parse(localStorage.getItem(this.FOLLOWUPS_STORAGE_KEY)) || this.INITIAL_FOLLOWUPS;
        } catch (e) {
            return this.INITIAL_FOLLOWUPS;
        }
    },

    getPartnerFollowups: function(partnerId) {
        const all = this.getAllFollowups();
        return all.filter(f => f.partnerId === partnerId);
    },

    addPartnerFollowup: function(partnerId, data) {
        let followups = this.getAllFollowups();
        const nextId = `FOL-2026-${300 + followups.length + 1}`;

        const newFollowup = {
            followupId: nextId,
            partnerId: partnerId,
            leadId: data.leadId || 'GENERAL',
            clientName: data.clientName,
            contactPerson: data.contactPerson,
            scheduledDate: data.scheduledDate,
            scheduledTime: data.scheduledTime || '11:00 AM',
            actionType: data.actionType || '📞 Follow-up Call',
            status: '⏳ Scheduled',
            notes: data.notes || ''
        };

        followups.unshift(newFollowup);
        localStorage.setItem(this.FOLLOWUPS_STORAGE_KEY, JSON.stringify(followups));
        return newFollowup;
    },

    completePartnerFollowup: function(partnerId, followupId) {
        let followups = this.getAllFollowups();
        const index = followups.findIndex(f => f.followupId === followupId && f.partnerId === partnerId);
        if (index !== -1) {
            followups[index].status = '✅ Completed';
            localStorage.setItem(this.FOLLOWUPS_STORAGE_KEY, JSON.stringify(followups));
            return true;
        }
        return false;
    },

    // 3. Shared Documents Vault (Filtered strictly by partnerId)
    getAllSharedDocuments: function() {
        this.init();
        try {
            return JSON.parse(localStorage.getItem(this.DOCUMENTS_STORAGE_KEY)) || this.INITIAL_SHARED_DOCS;
        } catch (e) {
            return this.INITIAL_SHARED_DOCS;
        }
    },

    getPartnerSharedDocuments: function(partnerId) {
        const all = this.getAllSharedDocuments();
        return all.filter(d => d.partnerId === partnerId || d.partnerId === 'GLOBAL_PARTNERS');
    },

    // 4. Batch Orders (Filtered strictly by partnerId)
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

        const partner = this.getPartnerById(partnerId);
        if (partner) {
            this.updatePartner(partnerId, {
                activeOrdersCount: (partner.activeOrdersCount || 0) + 1
            });
        }

        return newOrder;
    },

    // Summary KPIs calculation for current partner
    getPartnerSummaryKPIs: function(partnerId) {
        const partner = this.getPartnerById(partnerId) || {};
        const leads = this.getPartnerLeads(partnerId);
        const followups = this.getPartnerFollowups(partnerId);
        const orders = this.getPartnerOrders(partnerId);
        const docs = this.getPartnerSharedDocuments(partnerId);

        const totalLeads = leads.length || partner.leadsGeneratedCount || 0;
        const convertedLeads = leads.filter(l => l.leadStatus && l.leadStatus.includes('Converted')).length || partner.leadsConvertedCount || 0;
        const conversionRate = totalLeads > 0 ? Math.round((convertedLeads / totalLeads) * 100) : 0;
        const pendingFollowups = followups.filter(f => f.status && f.status.includes('Scheduled')).length;

        return {
            companyName: partner.companyName || 'Partner Portal',
            partnerType: partner.partnerType || '🏢 Pharma Distributor',
            partnerId: partner.partnerId || partnerId,
            contactPerson: partner.contactPerson || 'Authorized Representative',
            assignedTerritory: partner.assignedTerritory || 'Commercial Territory',
            commercialTerms: partner.commercialTerms || 'Standard Wholesale Discount',
            gstin: partner.gstin || '09AABCM1234F1Z8',
            drugLicense: partner.drugLicense || 'UP/20B/2021/8849',
            accountManager: partner.accountManager || 'Mr. Nishant Chaturvedi (Director)',
            // Required Metric 1: Leads Generated
            leadsGenerated: totalLeads,
            // Required Metric 2: Leads Converted
            leadsConverted: convertedLeads,
            conversionRate: conversionRate,
            // Required Metric 3: Business Generated
            businessGenerated: partner.businessGeneratedFormatted || '₹0',
            // Required Metric 4: Commission / Earnings
            commissionEarned: partner.commissionEarnedFormatted || '₹0',
            // Required Metric 5: Payment Received
            paymentReceived: partner.paymentReceivedFormatted || '₹0',
            // Required Metric 6: Pending Payment
            pendingPayment: partner.pendingPaymentFormatted || '₹0',
            // Required Metric 7: Follow-ups Count
            pendingFollowups: pendingFollowups,
            totalFollowups: followups.length,
            // Required Metric 8: Shared Documents Count
            sharedDocsCount: docs.length,
            activeOrdersCount: orders.length || partner.activeOrdersCount || 0
        };
    },

    // Summary KPIs for Admin View (Total aggregates across all partners)
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
        localStorage.setItem(this.LEADS_STORAGE_KEY, JSON.stringify(this.INITIAL_PARTNER_LEADS));
        localStorage.setItem(this.FOLLOWUPS_STORAGE_KEY, JSON.stringify(this.INITIAL_FOLLOWUPS));
        localStorage.setItem(this.DOCUMENTS_STORAGE_KEY, JSON.stringify(this.INITIAL_SHARED_DOCS));
        return this.INITIAL_PARTNERS;
    }
};

// Global Exposure
window.DisicurePartner = DisicurePartner;
DisicurePartner.init();
