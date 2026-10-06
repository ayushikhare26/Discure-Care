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
            defaultCommissionModel: 'percentage',
            defaultCommissionRate: 10,
            defaultCommissionLabel: '10% Revenue Margin',
            gstin: '09AABCM1234F1Z8',
            drugLicense: 'UP/20B/2021/8849',
            businessGeneratedFormatted: '₹14,50,000',
            businessGeneratedNumeric: 1450000,
            commissionEarnedFormatted: '₹1,45,000',
            commissionEarnedNumeric: 145000,
            paymentReceivedFormatted: '₹1,05,000',
            paymentReceivedNumeric: 105000,
            pendingPaymentFormatted: '₹40,000',
            pendingPaymentNumeric: 40000,
            leadsGeneratedCount: 10,
            leadsConvertedCount: 3,
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
            defaultCommissionModel: 'percentage',
            defaultCommissionRate: 0,
            defaultCommissionLabel: 'Institutional Supply Margin (0%)',
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
            defaultCommissionModel: 'custom',
            defaultCommissionRate: 'Milestone Slab Tier 1 + 5% Inbound',
            defaultCommissionLabel: 'Custom Milestone Slabs',
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
            commercialTerms: '₹15,000 Fixed per Converted Franchisee + 8% Reorders',
            defaultCommissionModel: 'fixed',
            defaultCommissionRate: 15000,
            defaultCommissionLabel: '₹15,000 Flat per Client',
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
            defaultCommissionModel: 'percentage',
            defaultCommissionRate: 20,
            defaultCommissionLabel: '20% PCD Franchise Margin',
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
            defaultCommissionModel: 'percentage',
            defaultCommissionRate: 12,
            defaultCommissionLabel: '12% Key Account Margin',
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
            defaultCommissionModel: 'percentage',
            defaultCommissionRate: 15,
            defaultCommissionLabel: '15% Master Brokerage Commission',
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

    // Seed realistic Initial Leads belonging strictly to partners with complete lifecycle chains:
    // Partner → Lead → Client → Requirement → Status → Business Value → Commission/Earning → Payment
    INITIAL_PARTNER_LEADS: [
        // --- PARTNER A (Medilink Pharma Network: PRT-2026-101): EXACT 10 LEADS FUNNEL (8 Contacted, 5 Qualified, 3 Converted) ---
        {
            leadId: 'PLEAD-2026-801',
            partnerId: 'PRT-2026-101',
            partnerName: 'Medilink Pharma Network',
            clientName: 'Shri Ram Chemist & Druggist Hub',
            contactPerson: 'Mr. Alok Goyal',
            mobile: '+91 98371 44552',
            email: 'alok@shrirampharma.in',
            city: 'Agra',
            state: 'Uttar Pradesh',
            requirement: 'Monthly Supply 20,000 Strips DISIZOLE-DSR + Paracetamol',
            leadStatus: '🟣 Converted',
            businessValueNumeric: 500000,
            businessValue: '₹5,00,000',
            commissionModel: 'percentage',
            commissionRate: '10%',
            commissionNumeric: 50000,
            commission: '₹50,000',
            commissionDetails: '10% Revenue Margin on ₹5,00,000 Contract',
            approvalStatus: '🟢 Approved',
            approvedBy: 'Mr. Nishant Chaturvedi (Super Admin)',
            approvedDate: '2026-09-26 10:00',
            approvalNotes: 'Contract and commercial GST invoice verified.',
            paymentStatus: '🟢 Paid',
            paidNumeric: 50000,
            paidFormatted: '₹50,000',
            pendingNumeric: 0,
            pendingFormatted: '₹0',
            paymentRef: 'UTR-HDFC-992144',
            paymentDate: '2026-09-30',
            followUpDate: '2026-10-15',
            notes: 'Commercial contract executed. ₹50,000 commission cleared via RTGS to Partner account.',
            createdDate: '2026-09-15',
            lifecycleStages: [
                { stage: 'Partner Attributed', timestamp: '2026-09-15 10:00', detail: 'Medilink Pharma Network (Agra Zone)' },
                { stage: 'Lead Registered', timestamp: '2026-09-15 10:15', detail: 'PLEAD-2026-801 created by Mr. Rajesh Singhal' },
                { stage: 'Client Contacted', timestamp: '2026-09-16 11:30', detail: 'Mr. Alok Goyal contacted; verified stock requirement' },
                { stage: 'Requirement Qualified', timestamp: '2026-09-18 14:00', detail: 'Formulation: 20,000 strips DISIZOLE-DSR' },
                { stage: 'Negotiation', timestamp: '2026-09-22 16:30', detail: 'Wholesale price locked at ₹25/strip' },
                { stage: 'Converted & PO Signed', timestamp: '2026-09-25 12:00', detail: 'Purchase Order #PO-SRC-2026-88 valued at ₹5,00,000' },
                { stage: 'Commission Approved', timestamp: '2026-09-26 10:00', detail: '10% partner margin (₹50,000) approved by Mr. Nishant Chaturvedi' },
                { stage: 'Payment Disbursed', timestamp: '2026-09-30 15:30', detail: 'Cleared ₹50,000 via UTR-HDFC-992144' }
            ]
        },
        {
            leadId: 'PLEAD-2026-802',
            partnerId: 'PRT-2026-101',
            partnerName: 'Medilink Pharma Network',
            clientName: 'Mathura Medicare Wholesale',
            contactPerson: 'Mr. Deepak Sharma',
            mobile: '+91 97580 99881',
            email: 'deepak@mathuramedicare.com',
            city: 'Mathura',
            state: 'Uttar Pradesh',
            requirement: 'Bulk PCD Franchise for Antibiotics & Cough Syrups',
            leadStatus: '🟣 Converted',
            businessValueNumeric: 600000,
            businessValue: '₹6,00,000',
            commissionModel: 'percentage',
            commissionRate: '10%',
            commissionNumeric: 60000,
            commission: '₹60,000',
            commissionDetails: '10% PCD Franchise Fee on ₹6,00,000 Agreement',
            approvalStatus: '🟢 Approved',
            approvedBy: 'Mr. Nishant Chaturvedi (Super Admin)',
            approvedDate: '2026-09-29 11:00',
            approvalNotes: 'PCD franchise agreement executed and verified.',
            paymentStatus: '🟡 Partial',
            paidNumeric: 55000,
            paidFormatted: '₹55,000',
            pendingNumeric: 5000,
            pendingFormatted: '₹5,000',
            paymentRef: 'UTR-ICICI-881290',
            paymentDate: '2026-10-02',
            followUpDate: '2026-10-08',
            notes: 'PCD franchise agreement executed. ₹55,000 paid; ₹5,000 retention due upon second batch dispatch.',
            createdDate: '2026-09-20',
            lifecycleStages: [
                { stage: 'Partner Attributed', timestamp: '2026-09-20 09:30', detail: 'Medilink Pharma Network (Agra Zone)' },
                { stage: 'Lead Registered', timestamp: '2026-09-20 09:45', detail: 'PLEAD-2026-802 created for Mathura wholesale' },
                { stage: 'Client Contacted', timestamp: '2026-09-21 15:00', detail: 'Mr. Deepak Sharma briefed on PCD terms' },
                { stage: 'Requirement Qualified', timestamp: '2026-09-23 11:30', detail: 'PCD Antibiotics & Syrups franchise portfolio' },
                { stage: 'Negotiation', timestamp: '2026-09-26 14:00', detail: 'Exclusive territory agreed for Mathura dist.' },
                { stage: 'Converted & PO Signed', timestamp: '2026-09-28 17:00', detail: 'Agreement executed for ₹6,00,000' },
                { stage: 'Commission Approved', timestamp: '2026-09-29 11:00', detail: '10% partner margin (₹60,000) approved by Super Admin' },
                { stage: 'Partial Payment Cleared', timestamp: '2026-10-02 16:00', detail: '₹55,000 disbursed (UTR-ICICI-881290), ₹5,000 pending' }
            ]
        },
        {
            leadId: 'PLEAD-2026-803',
            partnerId: 'PRT-2026-101',
            partnerName: 'Medilink Pharma Network',
            clientName: 'Taj City Multi-Speciality Hospital',
            contactPerson: 'Dr. S. K. Mittal',
            mobile: '+91 98370 77665',
            email: 'mittal@tajcityhospital.in',
            city: 'Agra',
            state: 'Uttar Pradesh',
            requirement: 'Annual Rabeprazole & Cefpodoxime Hospital Supply Contract',
            leadStatus: '🟣 Converted',
            businessValueNumeric: 350000,
            businessValue: '₹3,50,000',
            commissionModel: 'fixed',
            commissionRate: '₹35,000 Fixed',
            commissionNumeric: 35000,
            commission: '₹35,000',
            commissionDetails: 'Fixed ₹35,000 Procurement Referral Incentive',
            approvalStatus: '🟢 Approved',
            approvedBy: 'Dr. Vivek Sharma (VP Institutional)',
            approvedDate: '2026-10-02 09:30',
            approvalNotes: 'Institutional procurement rate cleared. Payout scheduled.',
            paymentStatus: '🔴 Pending',
            paidNumeric: 0,
            paidFormatted: '₹0',
            pendingNumeric: 35000,
            pendingFormatted: '₹35,000',
            paymentRef: 'INV-DC-2026-803',
            paymentDate: 'Pending Verification',
            followUpDate: '2026-10-12',
            notes: 'Contract awarded. First batch in blistering; partner commission invoice submitted and scheduled for clearance.',
            createdDate: '2026-09-22',
            lifecycleStages: [
                { stage: 'Partner Attributed', timestamp: '2026-09-22 11:00', detail: 'Medilink Pharma Network' },
                { stage: 'Lead Registered', timestamp: '2026-09-22 11:15', detail: 'PLEAD-2026-803 hospital tender referral' },
                { stage: 'Client Contacted', timestamp: '2026-09-24 10:00', detail: 'Dr. Mittal presented Disicure certified COAs' },
                { stage: 'Requirement Qualified', timestamp: '2026-09-26 16:00', detail: 'Rabeprazole & Cefpodoxime institutional pack' },
                { stage: 'Negotiation', timestamp: '2026-09-29 15:30', detail: 'Institutional rate approved by Disicure Director' },
                { stage: 'Converted & MOU Signed', timestamp: '2026-10-01 12:00', detail: 'Annual contract closed at ₹3,50,000' },
                { stage: 'Commission Approved', timestamp: '2026-10-02 09:30', detail: 'Fixed ₹35,000 partner commission approved by Dr. Vivek Sharma' },
                { stage: 'Payment Pending', timestamp: '2026-10-02 10:00', detail: 'Accounts voucher generated (VOUCH-803); pending payout' }
            ]
        },
        {
            leadId: 'PLEAD-2026-804',
            partnerId: 'PRT-2026-101',
            partnerName: 'Medilink Pharma Network',
            clientName: 'Gwalior LifeCare Pharmacy Chain',
            contactPerson: 'Dr. S. K. Gupta',
            mobile: '+91 94251 33221',
            email: 'gupta@lifecaregwalior.com',
            city: 'Gwalior',
            state: 'Madhya Pradesh',
            requirement: 'Inquiry for DISIPOD-200 and Multivitamin formulations',
            leadStatus: '🟠 Negotiation',
            businessValueNumeric: 320000,
            businessValue: '₹3,20,000',
            commissionModel: 'custom',
            commissionRate: 'Custom Earning',
            commissionNumeric: 32000,
            commission: '₹32,000 (Potential)',
            commissionDetails: 'Base ₹20,000 + 3.75% Volume Bonus',
            approvalStatus: '🟡 Pending Approval',
            approvedBy: 'Awaiting Admin Sign-off',
            approvedDate: '-',
            approvalNotes: 'Under active commercial negotiation.',
            paymentStatus: '⚪ In Negotiation',
            paidNumeric: 0,
            paidFormatted: '₹0',
            pendingNumeric: 0,
            pendingFormatted: '₹0',
            paymentRef: 'N/A (Pipeline)',
            paymentDate: 'Pending Close',
            followUpDate: '2026-10-09',
            notes: 'Samples dispatched via BlueDart. Client reviewing pricing discounts on bulk volume.',
            createdDate: '2026-09-25',
            lifecycleStages: [
                { stage: 'Partner Attributed', timestamp: '2026-09-25 14:00', detail: 'Medilink Pharma Network' },
                { stage: 'Lead Registered', timestamp: '2026-09-25 14:20', detail: 'PLEAD-2026-804 Gwalior retail chain' },
                { stage: 'Client Contacted', timestamp: '2026-09-27 11:00', detail: 'Sample box dispatched with Visual Aid' },
                { stage: 'Requirement Qualified', timestamp: '2026-09-30 15:00', detail: 'DISIPOD-200 & DISIVIT-Z 15,000 tabs' },
                { stage: 'Negotiation Active', timestamp: '2026-10-03 14:30', detail: 'Commercial contract draft under review' }
            ]
        },
        {
            leadId: 'PLEAD-2026-805',
            partnerId: 'PRT-2026-101',
            partnerName: 'Medilink Pharma Network',
            clientName: 'Aligarh Medical Agency',
            contactPerson: 'Mr. Pradeep Agarwal',
            mobile: '+91 98971 22334',
            email: 'pradeep@aligarhemedical.in',
            city: 'Aligarh',
            state: 'Uttar Pradesh',
            requirement: 'PCD Franchise for Respiratory Line & Syrups',
            leadStatus: '🟠 Negotiation',
            businessValueNumeric: 280000,
            businessValue: '₹2,80,000',
            commissionModel: 'percentage',
            commissionRate: '10%',
            commissionNumeric: 28000,
            commission: '₹28,000 (Potential)',
            commissionDetails: '10% of ₹2,80,000 PCD Quote',
            approvalStatus: '🟡 Pending Approval',
            approvedBy: 'Awaiting Admin Sign-off',
            approvedDate: '-',
            approvalNotes: 'Under territory review.',
            paymentStatus: '⚪ In Negotiation',
            paidNumeric: 0,
            paidFormatted: '₹0',
            pendingNumeric: 0,
            pendingFormatted: '₹0',
            paymentRef: 'N/A (Pipeline)',
            paymentDate: 'Pending Close',
            followUpDate: '2026-10-10',
            notes: 'Territory non-compete clause under review by partner legal representative.',
            createdDate: '2026-09-27',
            lifecycleStages: [
                { stage: 'Partner Attributed', timestamp: '2026-09-27 10:30', detail: 'Medilink Pharma Network' },
                { stage: 'Lead Registered', timestamp: '2026-09-27 10:45', detail: 'PLEAD-2026-805 Aligarh distributor desk' },
                { stage: 'Client Contacted', timestamp: '2026-09-29 16:00', detail: 'Discussed exclusivity for Aligarh region' },
                { stage: 'Requirement Qualified', timestamp: '2026-10-01 12:30', detail: 'Syrups & Cough Relief line' },
                { stage: 'Negotiation Active', timestamp: '2026-10-04 11:00', detail: 'Finalizing quarterly volume threshold' }
            ]
        },
        {
            leadId: 'PLEAD-2026-806',
            partnerId: 'PRT-2026-101',
            partnerName: 'Medilink Pharma Network',
            clientName: 'Firozabad Health Point',
            contactPerson: 'Mr. Vivek Jain',
            mobile: '+91 97600 55441',
            email: 'vivek@firozabadhealth.com',
            city: 'Firozabad',
            state: 'Uttar Pradesh',
            requirement: 'Generic Paracetamol 650 Bulk Stock Supply',
            leadStatus: '🔵 Contacted',
            businessValueNumeric: 210000,
            businessValue: '₹2,10,000',
            commissionModel: 'percentage',
            commissionRate: '10%',
            commissionNumeric: 21000,
            commission: '₹21,000 (Potential)',
            commissionDetails: '10% of ₹2,10,000 Supply Value',
            approvalStatus: '🟡 Pending Approval',
            approvedBy: 'Awaiting Admin Sign-off',
            paymentStatus: '⚪ Discussion Initiated',
            paidNumeric: 0,
            paidFormatted: '₹0',
            pendingNumeric: 0,
            pendingFormatted: '₹0',
            paymentRef: 'N/A (Pipeline)',
            paymentDate: 'Pending Close',
            followUpDate: '2026-10-11',
            notes: 'Product specification sheets and Batch COAs shared. Ready for price quotes.',
            createdDate: '2026-09-29',
            lifecycleStages: [
                { stage: 'Partner Attributed', timestamp: '2026-09-29 15:00', detail: 'Medilink Pharma Network' },
                { stage: 'Lead Registered', timestamp: '2026-09-29 15:15', detail: 'PLEAD-2026-806 Firozabad wholesale' },
                { stage: 'Client Contacted', timestamp: '2026-10-01 10:30', detail: 'Mr. Vivek Jain confirmed commercial interest' }
            ]
        },
        {
            leadId: 'PLEAD-2026-807',
            partnerId: 'PRT-2026-101',
            partnerName: 'Medilink Pharma Network',
            clientName: 'Bharatpur Clinical Care Pharmacy',
            contactPerson: 'Dr. M. L. Sharma',
            mobile: '+91 94140 88992',
            email: 'sharma@bharatpurclinic.in',
            city: 'Bharatpur',
            state: 'Rajasthan',
            requirement: 'Pediatric Drops & Anti-Allergic Suspensions',
            leadStatus: '🔵 Contacted',
            businessValueNumeric: 190000,
            businessValue: '₹1,90,000',
            commissionModel: 'percentage',
            commissionRate: '10%',
            commissionNumeric: 19000,
            commission: '₹19,000 (Potential)',
            commissionDetails: '10% of ₹1,90,000 Pediatric Line',
            approvalStatus: '🟡 Pending Approval',
            approvedBy: 'Awaiting Admin Sign-off',
            paymentStatus: '⚪ Discussion Initiated',
            paidNumeric: 0,
            paidFormatted: '₹0',
            pendingNumeric: 0,
            pendingFormatted: '₹0',
            paymentRef: 'N/A (Pipeline)',
            paymentDate: 'Pending Close',
            followUpDate: '2026-10-13',
            notes: 'Initial phone conference done. Catalog sent via WhatsApp & Email.',
            createdDate: '2026-10-01',
            lifecycleStages: [
                { stage: 'Partner Attributed', timestamp: '2026-10-01 11:30', detail: 'Medilink Pharma Network' },
                { stage: 'Lead Registered', timestamp: '2026-10-01 11:45', detail: 'PLEAD-2026-807 Bharatpur clinic' },
                { stage: 'Client Contacted', timestamp: '2026-10-02 14:00', detail: 'Introductory detailing call completed' }
            ]
        },
        {
            leadId: 'PLEAD-2026-808',
            partnerId: 'PRT-2026-101',
            partnerName: 'Medilink Pharma Network',
            clientName: 'Mainpuri Druggists Association Member Hub',
            contactPerson: 'Mr. Arvind Yadav',
            mobile: '+91 98391 66550',
            email: 'arvind@mainpuridrug.org',
            city: 'Mainpuri',
            state: 'Uttar Pradesh',
            requirement: 'Third-party Syrups Batch 5,000 units',
            leadStatus: '🔵 Contacted',
            businessValueNumeric: 160000,
            businessValue: '₹1,60,000',
            commissionModel: 'percentage',
            commissionRate: '10%',
            commissionNumeric: 16000,
            commission: '₹16,000 (Potential)',
            commissionDetails: '10% Third-party Manufacturing Margin',
            approvalStatus: '🟡 Pending Approval',
            approvedBy: 'Awaiting Admin Sign-off',
            paymentStatus: '⚪ Discussion Initiated',
            paidNumeric: 0,
            paidFormatted: '₹0',
            pendingNumeric: 0,
            pendingFormatted: '₹0',
            paymentRef: 'N/A (Pipeline)',
            paymentDate: 'Pending Close',
            followUpDate: '2026-10-14',
            notes: 'Discussion ongoing regarding custom bottle labeling and outer cartoon design.',
            createdDate: '2026-10-02',
            lifecycleStages: [
                { stage: 'Partner Attributed', timestamp: '2026-10-02 10:00', detail: 'Medilink Pharma Network' },
                { stage: 'Lead Registered', timestamp: '2026-10-02 10:20', detail: 'PLEAD-2026-808 Mainpuri Hub' },
                { stage: 'Client Contacted', timestamp: '2026-10-03 12:00', detail: 'Shared technical specs of syrups line' }
            ]
        },
        {
            leadId: 'PLEAD-2026-809',
            partnerId: 'PRT-2026-101',
            partnerName: 'Medilink Pharma Network',
            clientName: 'Hathras Lifeline Chemist',
            contactPerson: 'Mr. Kamal Kishore',
            mobile: '+91 97590 33221',
            email: 'kamal@hathraslifeline.in',
            city: 'Hathras',
            state: 'Uttar Pradesh',
            requirement: 'Injectables and Pain Management Formulation Enquiry',
            leadStatus: '🟢 New',
            businessValueNumeric: 120000,
            businessValue: '₹1,20,000',
            commissionModel: 'percentage',
            commissionRate: '10%',
            commissionNumeric: 12000,
            commission: '₹12,000 (Potential)',
            commissionDetails: '10% Anticipated Commission',
            approvalStatus: '🟡 Pending Approval',
            approvedBy: 'Awaiting Admin Sign-off',
            paymentStatus: '⚪ New Lead Received',
            paidNumeric: 0,
            paidFormatted: '₹0',
            pendingNumeric: 0,
            pendingFormatted: '₹0',
            paymentRef: 'N/A (Pipeline)',
            paymentDate: 'Pending Close',
            followUpDate: '2026-10-16',
            notes: 'New enquiry received from partner field MR. Needs sales assignment.',
            createdDate: '2026-10-04',
            lifecycleStages: [
                { stage: 'Partner Attributed', timestamp: '2026-10-04 09:15', detail: 'Medilink Pharma Network' },
                { stage: 'Lead Registered', timestamp: '2026-10-04 09:30', detail: 'PLEAD-2026-809 Hathras Chemist logged' }
            ]
        },
        {
            leadId: 'PLEAD-2026-810',
            partnerId: 'PRT-2026-101',
            partnerName: 'Medilink Pharma Network',
            clientName: 'Etah Wellness Care Clinic',
            contactPerson: 'Dr. Anoop Chauhan',
            mobile: '+91 94110 99883',
            email: 'anoop@etahwellness.in',
            city: 'Etah',
            state: 'Uttar Pradesh',
            requirement: 'Multivitamin & Mineral Syrups Trial Batch',
            leadStatus: '🟢 New',
            businessValueNumeric: 110000,
            businessValue: '₹1,10,000',
            commissionModel: 'percentage',
            commissionRate: '10%',
            commissionNumeric: 11000,
            commission: '₹11,000 (Potential)',
            commissionDetails: '10% Anticipated Commission',
            approvalStatus: '🟡 Pending Approval',
            approvedBy: 'Awaiting Admin Sign-off',
            paymentStatus: '⚪ New Lead Received',
            paidNumeric: 0,
            paidFormatted: '₹0',
            pendingNumeric: 0,
            pendingFormatted: '₹0',
            paymentRef: 'N/A (Pipeline)',
            paymentDate: 'Pending Close',
            followUpDate: '2026-10-17',
            notes: 'New enquiry registered online via Partner Portal.',
            createdDate: '2026-10-05',
            lifecycleStages: [
                { stage: 'Partner Attributed', timestamp: '2026-10-05 14:00', detail: 'Medilink Pharma Network' },
                { stage: 'Lead Registered', timestamp: '2026-10-05 14:15', detail: 'PLEAD-2026-810 Etah Clinic logged' }
            ]
        },

        // --- OTHER PARTNERS SEED LEADS WITH RICH LIFECYCLE CHAINS ---
        {
            leadId: 'PLEAD-2026-820',
            partnerId: 'PRT-2026-102',
            partnerName: 'Apollo Super Speciality Hospital Procurement',
            clientName: 'Apollo Heart & Oncology Super Speciality Hospital',
            contactPerson: 'Dr. Sunita Verma',
            mobile: '+91 98111 22334',
            email: 'oncology.proc@apollo.org',
            city: 'Lucknow',
            state: 'Uttar Pradesh',
            requirement: 'Annual Institutional Rate Contract (Rabeprazole & Antibiotics)',
            leadStatus: '🟣 Converted',
            businessValueNumeric: 2800000,
            businessValue: '₹28,00,000',
            commissionModel: 'fixed',
            commissionRate: '0%',
            commissionNumeric: 0,
            commission: '₹0 (Institutional)',
            commissionDetails: 'Direct Hospital Procurement Margin (0%)',
            approvalStatus: '🟢 Approved',
            approvedBy: 'Dr. Vivek Sharma (VP Institutional)',
            approvedDate: '2026-03-01 12:00',
            approvalNotes: 'Direct institutional purchase verified.',
            paymentStatus: '🟢 Paid',
            paidNumeric: 2800000,
            paidFormatted: '₹28,00,000',
            pendingNumeric: 0,
            pendingFormatted: '₹0',
            paymentRef: 'LC-APOLLO-2026-88',
            paymentDate: '2026-03-15',
            followUpDate: '2026-10-20',
            notes: 'Institutional MOU signed. Regular monthly bulk dispatches underway.',
            createdDate: '2026-02-12',
            lifecycleStages: [
                { stage: 'Partner Attributed', timestamp: '2026-02-12 10:00', detail: 'Apollo Super Speciality Procurement' },
                { stage: 'Lead Registered', timestamp: '2026-02-12 10:30', detail: 'PLEAD-2026-820 Annual rate contract' },
                { stage: 'Client Contacted', timestamp: '2026-02-14 11:00', detail: 'Chief Pharmacist Dr. Sunita Verma' },
                { stage: 'Requirement Qualified', timestamp: '2026-02-20 15:00', detail: 'Oncology & Antibiotic formulations' },
                { stage: 'Converted & LC Issued', timestamp: '2026-03-01 12:00', detail: 'MOU executed for ₹28,00,000' },
                { stage: 'Payment Cleared', timestamp: '2026-03-15 16:00', detail: 'Direct Letter of Credit settlement ₹28,00,000' }
            ]
        },
        {
            leadId: 'PLEAD-2026-830',
            partnerId: 'PRT-2026-103',
            partnerName: 'Apex Healthcare Media & Promotions',
            clientName: 'Sunrise Multi-Speciality Clinic Network',
            contactPerson: 'Dr. Alok Verma',
            mobile: '+91 98390 12345',
            email: 'alok.sunrise@gmail.com',
            city: 'Varanasi',
            state: 'Uttar Pradesh',
            requirement: 'Contract Packaging 50,000 Caps (DISIZOLE-DSR)',
            leadStatus: '🟣 Converted',
            businessValueNumeric: 320000,
            businessValue: '₹3,20,000',
            commissionModel: 'custom',
            commissionRate: 'Custom Earning',
            commissionNumeric: 32000,
            commission: '₹32,000',
            commissionDetails: 'Digital Inbound Attributed Margin (10%)',
            approvalStatus: '🟢 Approved',
            approvedBy: 'Mr. Nishant Chaturvedi (Super Admin)',
            approvedDate: '2026-09-26 14:00',
            approvalNotes: 'Attributed marketing inbound closed.',
            paymentStatus: '🟢 Paid',
            paidNumeric: 32000,
            paidFormatted: '₹32,00,000',
            pendingNumeric: 0,
            pendingFormatted: '₹0',
            paymentRef: 'UTR-HDFC-882910',
            paymentDate: '2026-09-28',
            followUpDate: '2026-10-18',
            notes: 'Doctor sample visual aid shared. Commercial PO received and commission disbursed.',
            createdDate: '2026-09-18',
            lifecycleStages: [
                { stage: 'Partner Attributed', timestamp: '2026-09-18 11:00', detail: 'Apex Healthcare Media' },
                { stage: 'Lead Registered', timestamp: '2026-09-18 11:30', detail: 'PLEAD-2026-830 Digital Inbound Lead' },
                { stage: 'Converted & Contract Cleared', timestamp: '2026-09-25 14:00', detail: 'PO received for ₹3,20,000' },
                { stage: 'Payment Disbursed', timestamp: '2026-09-28 17:00', detail: '₹32,000 commission cleared via UTR-HDFC-882910' }
            ]
        },
        {
            leadId: 'PLEAD-2026-840',
            partnerId: 'PRT-2026-104',
            partnerName: 'Dr. Manoj K. Saxena (Independent Associate)',
            clientName: 'Doon Valley Wellness Center & Clinics',
            contactPerson: 'Dr. K. N. Joshi',
            mobile: '+91 94111 88776',
            email: 'drjoshi@doonwellness.in',
            city: 'Dehradun',
            state: 'Uttarakhand',
            requirement: 'Third-Party Syrup Manufacturing 2,000 bottles (DISILIV-DS & DISIKUF)',
            leadStatus: '🟣 Converted',
            businessValueNumeric: 140000,
            businessValue: '₹1,40,000',
            commissionModel: 'fixed',
            commissionRate: '₹11,200 Fixed',
            commissionNumeric: 11200,
            commission: '₹11,200',
            commissionDetails: 'Fixed ₹11,200 Field MR Referral Tier 1',
            approvalStatus: '🟢 Approved',
            approvedBy: 'Ankit Rawat (Sales Executive)',
            approvedDate: '2026-09-29 10:00',
            approvalNotes: 'Clinical trial order verified.',
            paymentStatus: '🟢 Paid',
            paidNumeric: 11200,
            paidFormatted: '₹11,200',
            pendingNumeric: 0,
            pendingFormatted: '₹0',
            paymentRef: 'UTR-PNB-554411',
            paymentDate: '2026-09-30',
            followUpDate: '2026-10-14',
            notes: 'First batch delivered successfully. Repeat scheduled for next month.',
            createdDate: '2026-09-22',
            lifecycleStages: [
                { stage: 'Partner Attributed', timestamp: '2026-09-22 10:00', detail: 'Dr. Manoj K. Saxena' },
                { stage: 'Converted & Delivered', timestamp: '2026-09-28 15:00', detail: 'Syrups batch cleared ₹1,40,000' },
                { stage: 'Payment Disbursed', timestamp: '2026-09-30 16:30', detail: '8% referral incentive ₹11,200 paid' }
            ]
        },
        {
            leadId: 'PLEAD-2026-850',
            partnerId: 'PRT-2026-105',
            partnerName: 'BioPharm PCD Strategic Associates',
            clientName: 'Patna Central Hospital & Trauma Center',
            contactPerson: 'Dr. R. K. Choudhary',
            mobile: '+91 94310 77889',
            email: 'procurement@patnatrauma.in',
            city: 'Patna',
            state: 'Bihar',
            requirement: 'Institutional Bulk Antibiotic & Injectable Supply Contract',
            leadStatus: '🟣 Converted',
            businessValueNumeric: 840000,
            businessValue: '₹8,40,000',
            commissionModel: 'percentage',
            commissionRate: '20%',
            commissionNumeric: 168000,
            commission: '₹1,68,000',
            commissionDetails: '20% PCD Franchise Key Account Margin',
            approvalStatus: '🟢 Approved',
            approvedBy: 'Dr. Vivek Sharma (VP Institutional)',
            approvedDate: '2026-09-10 16:00',
            approvalNotes: 'Institutional contract approved.',
            paymentStatus: '🟢 Paid',
            paidNumeric: 168000,
            paidFormatted: '₹1,68,000',
            paymentRef: 'UTR-SBI-778822',
            paymentDate: '2026-09-15',
            followUpDate: '2026-10-16',
            notes: 'Agreement signed for 6 months. First batch dispatched.',
            createdDate: '2026-08-20',
            lifecycleStages: [
                { stage: 'Partner Attributed', timestamp: '2026-08-20 12:00', detail: 'BioPharm PCD Strategic Associates' },
                { stage: 'Converted & Supplied', timestamp: '2026-09-05 14:00', detail: 'PO cleared ₹8,40,000' },
                { stage: 'Commission Disbursed', timestamp: '2026-09-15 11:00', detail: '20% margin ₹1,68,000 paid via UTR-SBI-778822' }
            ]
        },
        {
            leadId: 'PLEAD-2026-870',
            partnerId: 'PRT-2026-107',
            partnerName: 'Nexus Global Pharma Agency',
            clientName: 'Guwahati Medical Stockists Union',
            contactPerson: 'Mr. Bipul Goswami',
            mobile: '+91 98640 55443',
            email: 'goswami@guwahatistockist.org',
            city: 'Guwahati',
            state: 'Assam',
            requirement: 'Antibiotic Range Bulk Institutional Supply for NE Zone',
            leadStatus: '🟣 Converted',
            businessValueNumeric: 850000,
            businessValue: '₹8,50,000',
            commissionModel: 'percentage',
            commissionRate: '15%',
            commissionNumeric: 127500,
            commission: '₹1,27,500',
            commissionDetails: '15% Master Brokerage Commission',
            approvalStatus: '🟢 Approved',
            approvedBy: 'Mr. Nishant Chaturvedi (Super Admin)',
            approvedDate: '2026-09-12 11:00',
            approvalNotes: 'North-East regional procurement broker agreement verified.',
            paymentStatus: '🟢 Paid',
            paidNumeric: 127500,
            paidFormatted: '₹1,27,500',
            pendingNumeric: 0,
            pendingFormatted: '₹0',
            paymentRef: 'UTR-AXIS-993321',
            paymentDate: '2026-09-18',
            followUpDate: '2026-10-15',
            notes: 'Bulk purchase order executed for 8 Stockist branches in Assam.',
            createdDate: '2026-08-25',
            lifecycleStages: [
                { stage: 'Partner Attributed', timestamp: '2026-08-25 10:00', detail: 'Nexus Global Pharma Agency' },
                { stage: 'Lead Registered', timestamp: '2026-08-25 10:30', detail: 'PLEAD-2026-870 Stockist Union PO' },
                { stage: 'Converted & Contract Signed', timestamp: '2026-09-10 14:00', detail: 'PO cleared for ₹8,50,000' },
                { stage: 'Commission Disbursed', timestamp: '2026-09-18 16:30', detail: '15% brokerage ₹1,27,500 paid' }
            ]
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

    // --- PARTNER LEAD LIFECYCLE & FUNNEL TRACKING ENGINE (MODULE 11) ---
    getLeadById: function(leadId) {
        const leads = this.getAllLeads();
        return leads.find(l => l.leadId === leadId);
    },

    getPartnerLeadFunnel: function(partnerId) {
        const leads = this.getPartnerLeads(partnerId);
        const totalLeads = leads.length;
        
        // Funnel stages computation:
        // Converted: leadStatus contains 'Converted'
        // Qualified: leadStatus contains 'Converted', 'Negotiation', or 'Qualified'
        // Contacted: Any lead that is beyond 'New' / 'Lost' / 'Hold'
        const convertedLeads = leads.filter(l => l.leadStatus && l.leadStatus.includes('Converted')).length;
        const negotiationLeads = leads.filter(l => l.leadStatus && l.leadStatus.includes('Negotiation')).length;
        const qualifiedLeads = leads.filter(l => l.leadStatus && (l.leadStatus.includes('Converted') || l.leadStatus.includes('Negotiation') || l.leadStatus.includes('Qualified'))).length;
        const contactedLeads = leads.filter(l => l.leadStatus && !l.leadStatus.includes('New') && !l.leadStatus.includes('Lost') && !l.leadStatus.includes('Hold')).length;
        const newLeads = leads.filter(l => l.leadStatus && l.leadStatus.includes('New')).length;
        const lostLeads = leads.filter(l => l.leadStatus && l.leadStatus.includes('Lost')).length;
        const onHoldLeads = leads.filter(l => l.leadStatus && l.leadStatus.includes('Hold')).length;

        let businessGeneratedNumeric = 0;
        let commissionEarnedNumeric = 0;
        let approvedEarningsNumeric = 0;
        let pendingApprovalNumeric = 0;
        let paidNumeric = 0;
        let pendingNumeric = 0;
        let totalPipelineValueNumeric = 0;

        leads.forEach(l => {
            const val = parseFloat(l.businessValueNumeric) || (parseFloat(String(l.estimatedValue || '').replace(/[^0-9.]/g, '')) || 0);
            const comm = parseFloat(l.commissionNumeric) || (parseFloat(String(l.commission || '').replace(/[^0-9.]/g, '')) || 0);
            const paid = parseFloat(l.paidNumeric) || 0;
            const pending = parseFloat(l.pendingNumeric) || 0;

            totalPipelineValueNumeric += val;

            if (l.leadStatus && l.leadStatus.includes('Converted')) {
                businessGeneratedNumeric += val;
                commissionEarnedNumeric += comm;
                if (l.approvalStatus && (l.approvalStatus.includes('Approved') || l.approvalStatus.includes('Disbursed'))) {
                    approvedEarningsNumeric += comm;
                } else {
                    pendingApprovalNumeric += comm;
                }
                paidNumeric += paid;
                pendingNumeric += pending;
            }
        });

        // Conversion rate
        const conversionRate = totalLeads > 0 ? Math.round((convertedLeads / totalLeads) * 100) : 0;

        return {
            totalLeads,
            contactedLeads,
            qualifiedLeads,
            negotiationLeads,
            convertedLeads,
            newLeads,
            lostLeads,
            onHoldLeads,
            conversionRate,
            businessGeneratedNumeric,
            businessGeneratedFormatted: `₹${businessGeneratedNumeric.toLocaleString('en-IN')}`,
            commissionEarnedNumeric,
            commissionEarnedFormatted: `₹${commissionEarnedNumeric.toLocaleString('en-IN')}`,
            approvedEarningsNumeric,
            approvedEarningsFormatted: `₹${approvedEarningsNumeric.toLocaleString('en-IN')}`,
            pendingApprovalNumeric,
            pendingApprovalFormatted: `₹${pendingApprovalNumeric.toLocaleString('en-IN')}`,
            paidNumeric,
            paidFormatted: `₹${paidNumeric.toLocaleString('en-IN')}`,
            pendingNumeric,
            pendingFormatted: `₹${pendingNumeric.toLocaleString('en-IN')}`,
            totalPipelineValueNumeric,
            totalPipelineValueFormatted: `₹${totalPipelineValueNumeric.toLocaleString('en-IN')}`
        };
    },

    // --- MODULE 12: COMMISSION CALCULATION & APPROVAL ENGINE ---
    calculateCommissionValue: function(model, rateOrAmount, businessValue, customNote) {
        const bVal = parseFloat(String(businessValue || '0').replace(/[^0-9.]/g, '')) || 0;
        if (model === 'fixed') {
            const amt = Math.round(parseFloat(String(rateOrAmount || '0').replace(/[^0-9.]/g, '')) || 0);
            return {
                model: 'fixed',
                modelLabel: `Fixed Commission (₹${amt.toLocaleString('en-IN')})`,
                rateLabel: `₹${amt.toLocaleString('en-IN')} Flat`,
                amountNumeric: amt,
                amountFormatted: `₹${amt.toLocaleString('en-IN')}`,
                details: customNote || `Fixed ₹${amt.toLocaleString('en-IN')} deal commission`
            };
        } else if (model === 'custom') {
            const amt = Math.round(parseFloat(String(rateOrAmount || '0').replace(/[^0-9.]/g, '')) || 0);
            return {
                model: 'custom',
                modelLabel: 'Custom Earning',
                rateLabel: 'Custom Earning',
                amountNumeric: amt,
                amountFormatted: `₹${amt.toLocaleString('en-IN')}`,
                details: customNote || `Custom calculated earning of ₹${amt.toLocaleString('en-IN')}`
            };
        } else {
            // default percentage
            const pct = parseFloat(String(rateOrAmount || '10').replace(/[^0-9.]/g, '')) || 10;
            const amt = Math.round((bVal * pct) / 100);
            return {
                model: 'percentage',
                modelLabel: `Percentage Commission (${pct}%)`,
                rateLabel: `${pct}%`,
                amountNumeric: amt,
                amountFormatted: `₹${amt.toLocaleString('en-IN')}`,
                details: customNote || `${pct}% margin on ₹${bVal.toLocaleString('en-IN')} business value`
            };
        }
    },

    // Get all partner commissions across the platform for Admin Commission Desk
    getAllCommissions: function() {
        const leads = this.getAllLeads();
        return leads.map(l => {
            const partner = this.getPartnerById(l.partnerId) || {};
            const isApproved = l.approvalStatus && (l.approvalStatus.includes('Approved') || l.approvalStatus.includes('Disbursed'));
            return {
                leadId: l.leadId,
                partnerId: l.partnerId,
                partnerName: l.partnerName || partner.companyName || 'Partner',
                clientName: l.clientName,
                leadStatus: l.leadStatus,
                businessValue: l.businessValue || '₹0',
                businessValueNumeric: l.businessValueNumeric || 0,
                commissionModel: l.commissionModel || 'percentage',
                commissionRate: l.commissionRate || '10%',
                commissionNumeric: l.commissionNumeric || 0,
                commission: l.commission || '₹0',
                commissionDetails: l.commissionDetails || `${l.commissionRate || '10%'} Commercial Margin`,
                approvalStatus: l.approvalStatus || (l.leadStatus && l.leadStatus.includes('Converted') ? '🟢 Approved' : '🟡 Pending Approval'),
                approvedBy: l.approvedBy || (isApproved ? 'Mr. Nishant Chaturvedi (Super Admin)' : 'Awaiting Review'),
                approvedDate: l.approvedDate || (isApproved ? (l.createdDate || '2026-09-26') : '-'),
                approvalNotes: l.approvalNotes || '',
                paymentStatus: l.paymentStatus || '⚪ In Pipeline',
                paidNumeric: l.paidNumeric || 0,
                paidFormatted: l.paidFormatted || '₹0',
                pendingNumeric: l.pendingNumeric || 0,
                pendingFormatted: l.pendingFormatted || '₹0',
                paymentRef: l.paymentRef || 'N/A',
                paymentDate: l.paymentDate || 'Pending Payout',
                createdDate: l.createdDate || ''
            };
        });
    },

    // Fast 1-Click Approve Commission by Admin
    approveCommission: function(leadId, approverName, notes) {
        const lead = this.getLeadById(leadId);
        if (!lead) return false;

        const dateStr = new Date().toISOString().replace('T', ' ').substring(0, 16);
        const adminName = approverName || 'Mr. Nishant Chaturvedi (Super Admin)';
        const approvalNotes = notes || 'Manually approved by Admin upon contract verification.';

        return this.updateLeadLifecycle(leadId, {
            approvalStatus: '🟢 Approved',
            approvedBy: adminName,
            approvedDate: dateStr,
            approvalNotes: approvalNotes,
            newStageEvent: {
                stage: 'Commission Approved',
                detail: `${lead.commission || 'Commission'} approved by ${adminName}`
            }
        });
    },

    // Comprehensive update/reconfigure commission by Admin
    updatePartnerCommission: function(leadId, data) {
        const lead = this.getLeadById(leadId);
        if (!lead) return false;

        const calc = this.calculateCommissionValue(
            data.commissionModel || lead.commissionModel || 'percentage',
            data.rateOrAmount !== undefined ? data.rateOrAmount : (lead.commissionNumeric || 10),
            data.businessValueNumeric !== undefined ? data.businessValueNumeric : lead.businessValueNumeric,
            data.commissionDetails || lead.commissionDetails
        );

        const dateStr = new Date().toISOString().replace('T', ' ').substring(0, 16);
        const updates = {
            commissionModel: calc.model,
            commissionRate: calc.rateLabel,
            commissionNumeric: calc.amountNumeric,
            commission: calc.amountFormatted,
            commissionDetails: calc.details,
            approvalStatus: data.approvalStatus || lead.approvalStatus || '🟢 Approved',
            approvedBy: data.approvedBy || lead.approvedBy || 'Mr. Nishant Chaturvedi (Super Admin)',
            approvedDate: data.approvalStatus && data.approvalStatus.includes('Approved') ? (lead.approvedDate && lead.approvedDate !== '-' ? lead.approvedDate : dateStr) : '-',
            approvalNotes: data.approvalNotes !== undefined ? data.approvalNotes : (lead.approvalNotes || '')
        };

        if (data.businessValueNumeric !== undefined) {
            updates.businessValueNumeric = parseFloat(data.businessValueNumeric) || 0;
            updates.businessValue = `₹${updates.businessValueNumeric.toLocaleString('en-IN')}`;
        }

        if (data.paymentStatus !== undefined) {
            updates.paymentStatus = data.paymentStatus;
        }

        if (data.paidNumeric !== undefined) {
            updates.paidNumeric = parseFloat(data.paidNumeric) || 0;
            updates.paidFormatted = `₹${updates.paidNumeric.toLocaleString('en-IN')}`;
            updates.pendingNumeric = Math.max(0, updates.commissionNumeric - updates.paidNumeric);
            updates.pendingFormatted = `₹${updates.pendingNumeric.toLocaleString('en-IN')}`;
        }

        if (data.paymentRef !== undefined) {
            updates.paymentRef = data.paymentRef;
        }
        if (data.paymentDate !== undefined) {
            updates.paymentDate = data.paymentDate;
        }

        updates.newStageEvent = {
            stage: 'Commission Configured',
            detail: `${calc.modelLabel} updated: ${calc.amountFormatted} (${updates.approvalStatus})`
        };

        return this.updateLeadLifecycle(leadId, updates);
    },

    updateLeadLifecycle: function(leadId, updates) {
        let leads = this.getAllLeads();
        const index = leads.findIndex(l => l.leadId === leadId);
        if (index === -1) return false;

        const currentLead = leads[index];
        const updatedLead = {
            ...currentLead,
            ...updates
        };

        // Recalculate formatted fields if numeric values updated
        if (updates.businessValueNumeric !== undefined) {
            updatedLead.businessValue = `₹${parseFloat(updates.businessValueNumeric || 0).toLocaleString('en-IN')}`;
        }
        if (updates.commissionNumeric !== undefined) {
            updatedLead.commission = `₹${parseFloat(updates.commissionNumeric || 0).toLocaleString('en-IN')}`;
        }
        if (updates.paidNumeric !== undefined) {
            updatedLead.paidFormatted = `₹${parseFloat(updates.paidNumeric || 0).toLocaleString('en-IN')}`;
        }
        if (updates.pendingNumeric !== undefined) {
            updatedLead.pendingFormatted = `₹${parseFloat(updates.pendingNumeric || 0).toLocaleString('en-IN')}`;
        }

        // Add audit stage event to lifecycle stages
        if (updates.newStageEvent) {
            if (!updatedLead.lifecycleStages) updatedLead.lifecycleStages = [];
            const now = new Date();
            const dateStr = now.toISOString().replace('T', ' ').substring(0, 16);
            updatedLead.lifecycleStages.push({
                stage: updates.newStageEvent.stage || 'Status Updated',
                timestamp: dateStr,
                detail: updates.newStageEvent.detail || `Lead updated to ${updatedLead.leadStatus}`
            });
        }

        leads[index] = updatedLead;
        localStorage.setItem(this.LEADS_STORAGE_KEY, JSON.stringify(leads));

        // Also update partner cached aggregate metrics
        if (updatedLead.partnerId) {
            const funnel = this.getPartnerLeadFunnel(updatedLead.partnerId);
            this.updatePartner(updatedLead.partnerId, {
                leadsGeneratedCount: funnel.totalLeads,
                leadsConvertedCount: funnel.convertedLeads,
                businessGeneratedFormatted: funnel.businessGeneratedFormatted,
                businessGeneratedNumeric: funnel.businessGeneratedNumeric,
                commissionEarnedFormatted: funnel.commissionEarnedFormatted,
                commissionEarnedNumeric: funnel.commissionEarnedNumeric,
                paymentReceivedFormatted: funnel.paidFormatted,
                paymentReceivedNumeric: funnel.paidNumeric,
                pendingPaymentFormatted: funnel.pendingFormatted,
                pendingPaymentNumeric: funnel.pendingNumeric
            });
        }

        return updatedLead;
    },

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
        const now = new Date();
        const dateStr = now.toISOString().substring(0, 10);
        const timeStr = now.toISOString().replace('T', ' ').substring(0, 16);
        const partner = this.getPartnerById(partnerId);
        const partnerName = partner ? partner.companyName : `Partner ${partnerId}`;

        // Parse numerical estimated value and compute partner commission based on configured model
        const cleanVal = parseFloat(String(leadData.estimatedValue || leadData.businessValueNumeric || '0').replace(/[^0-9.]/g, '')) || 0;
        const model = (partner && partner.defaultCommissionModel) || 'percentage';
        const rateOrAmt = (partner && partner.defaultCommissionRate !== undefined) ? partner.defaultCommissionRate : 10;
        const calc = this.calculateCommissionValue(model, rateOrAmt, cleanVal, `${(partner && partner.defaultCommissionLabel) || 'Commercial Margin'}`);

        const newLead = {
            leadId: nextId,
            partnerId: partnerId,
            partnerName: partnerName,
            clientName: leadData.clientName,
            contactPerson: leadData.contactPerson,
            mobile: leadData.mobile,
            email: leadData.email || '',
            city: leadData.city || 'India',
            state: leadData.state || '',
            requirement: leadData.requirement,
            leadStatus: leadData.leadStatus || '🟢 New',
            businessValueNumeric: cleanVal,
            businessValue: cleanVal > 0 ? `₹${cleanVal.toLocaleString('en-IN')}` : 'Under Evaluation',
            commissionModel: calc.model,
            commissionRate: calc.rateLabel,
            commissionNumeric: calc.amountNumeric,
            commission: calc.amountNumeric > 0 ? `₹${calc.amountNumeric.toLocaleString('en-IN')} (Potential)` : 'Calculating',
            commissionDetails: calc.details,
            approvalStatus: '🟡 Pending Approval',
            approvedBy: 'Awaiting Admin Sign-off',
            approvedDate: '-',
            approvalNotes: 'Lead newly registered; pending qualification.',
            paymentStatus: '⚪ Lead In Pipeline',
            paidNumeric: 0,
            paidFormatted: '₹0',
            pendingNumeric: 0,
            pendingFormatted: '₹0',
            paymentRef: 'N/A (Pipeline)',
            paymentDate: 'Pending Close',
            followUpDate: leadData.followUpDate || dateStr,
            notes: leadData.notes || 'Referred via Partner Dashboard.',
            createdDate: dateStr,
            lifecycleStages: [
                { stage: 'Partner Attributed', timestamp: timeStr, detail: `${partnerName} (${partnerId})` },
                { stage: 'Lead Registered', timestamp: timeStr, detail: `${nextId} created for ${leadData.clientName}` }
            ]
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
                source: `Partner Ref: ${partnerId} (${partnerName})`,
                notes: `Submitted by Partner ID ${partnerId}. Contact: ${leadData.contactPerson}. Value: ₹${cleanVal.toLocaleString('en-IN')}. Notes: ${leadData.notes || ''}`
            });
        }

        // Increment partner counts and recompute funnel
        if (partner) {
            const funnel = this.getPartnerLeadFunnel(partnerId);
            this.updatePartner(partnerId, {
                leadsGeneratedCount: funnel.totalLeads,
                leadsConvertedCount: funnel.convertedLeads
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

    // Summary KPIs calculation for current partner (Dynamically computed from live funnel & data)
    getPartnerSummaryKPIs: function(partnerId) {
        const partner = this.getPartnerById(partnerId) || {};
        const funnel = this.getPartnerLeadFunnel(partnerId);
        const followups = this.getPartnerFollowups(partnerId);
        const orders = this.getPartnerOrders(partnerId);
        const docs = this.getPartnerSharedDocuments(partnerId);

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
            leadsGenerated: funnel.totalLeads,
            // Required Metric 2: Leads Converted
            leadsConverted: funnel.convertedLeads,
            conversionRate: funnel.conversionRate,
            // Funnel Stages:
            contactedLeads: funnel.contactedLeads,
            qualifiedLeads: funnel.qualifiedLeads,
            negotiationLeads: funnel.negotiationLeads,
            newLeads: funnel.newLeads,
            // Required Metric 3: Business Generated
            businessGenerated: funnel.businessGeneratedFormatted,
            businessGeneratedNumeric: funnel.businessGeneratedNumeric,
            // Required Metric 4: Commission / Earnings
            commissionEarned: funnel.commissionEarnedFormatted,
            commissionEarnedNumeric: funnel.commissionEarnedNumeric,
            approvedEarnings: funnel.approvedEarningsFormatted,
            approvedEarningsNumeric: funnel.approvedEarningsNumeric,
            pendingApproval: funnel.pendingApprovalFormatted,
            pendingApprovalNumeric: funnel.pendingApprovalNumeric,
            // Required Metric 5: Payment Received / Disbursed
            paymentReceived: funnel.paidFormatted,
            paymentReceivedNumeric: funnel.paidNumeric,
            // Required Metric 6: Pending Payment
            pendingPayment: funnel.pendingFormatted,
            pendingPaymentNumeric: funnel.pendingNumeric,
            // Pipeline Value
            totalPipelineValue: funnel.totalPipelineValueFormatted,
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
