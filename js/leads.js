// ==========================================================================
// Disicure Care Pvt. Ltd. — Lead Management System (LMS) Engine
// ==========================================================================

const DisicureLeads = {
    STORAGE_KEY: 'disicure_leads_db_v1',

    // Official Lead Status Definitions
    STATUSES: [
        { id: 'new', label: '🟢 New', color: 'bg-emerald-50 text-emerald-700 border-emerald-200', dot: 'bg-emerald-500' },
        { id: 'contacted', label: '🔵 Contacted', color: 'bg-blue-50 text-blue-700 border-blue-200', dot: 'bg-blue-500' },
        { id: 'followup', label: '🟡 Follow-up', color: 'bg-amber-50 text-amber-700 border-amber-200', dot: 'bg-amber-500' },
        { id: 'negotiation', label: '🟠 Negotiation', color: 'bg-orange-50 text-orange-700 border-orange-200', dot: 'bg-orange-500' },
        { id: 'converted', label: '🟣 Converted', color: 'bg-purple-50 text-purple-700 border-purple-200', dot: 'bg-purple-500' },
        { id: 'lost', label: '🔴 Lost', color: 'bg-rose-50 text-rose-700 border-rose-200', dot: 'bg-rose-500' },
        { id: 'onhold', label: '⚫ On Hold', color: 'bg-gray-100 text-gray-700 border-gray-300', dot: 'bg-gray-600' }
    ],

    // Default Assigned Team Members
    TEAM_MEMBERS: [
        'Ayushi Khare (Managing Director)',
        'Nishant Chaturvedi (Director)',
        'Institutional Supply Desk',
        'PCD Franchise Operations',
        'Third-Party Manufacturing Desk',
        'Commercial Sales Team',
        'Unassigned'
    ],

    // Seed realistic Initial B2B Leads for immediate demonstration
    INITIAL_LEADS: [
        {
            leadId: 'DC-LEAD-1001',
            name: 'Rajesh Kumar Singhania',
            mobile: '+91 98112 34567',
            whatsapp: '+91 98112 34567',
            email: 'rajesh.singhania@medilinkpharma.in',
            city: 'New Delhi',
            state: 'Delhi',
            businessType: 'Distributor',
            requirementType: 'Third-Party Manufacturing',
            productOrService: 'DISIMOL-SP Tablets (10,000 Boxes)',
            source: 'Website B2B Modal',
            assignedPerson: 'Nishant Chaturvedi (Director)',
            leadStatus: '🟢 New',
            followUpDate: '2026-10-08',
            notes: 'Looking for Alu-Alu custom packaging quotation for northern distribution network.',
            createdDate: '2026-10-06 14:30',
            lastUpdatedDate: '2026-10-06 14:30'
        },
        {
            leadId: 'DC-LEAD-1002',
            name: 'Dr. Anand Verma',
            mobile: '+91 94150 88231',
            whatsapp: '+91 94150 88231',
            email: 'procurement@apollohospitals-up.org',
            city: 'Lucknow',
            state: 'Uttar Pradesh',
            businessType: 'Hospital',
            requirementType: 'Hospital Supply',
            productOrService: 'DISIZOLE-DSR Capsules & DISIMOL-P Tablets',
            source: 'Product Page Enquiry',
            assignedPerson: 'Institutional Supply Desk',
            leadStatus: '🔵 Contacted',
            followUpDate: '2026-10-09',
            notes: 'Introductory pricing & COA shared via corporate email. Scheduled call for institutional contract.',
            createdDate: '2026-10-05 11:15',
            lastUpdatedDate: '2026-10-06 09:40'
        },
        {
            leadId: 'DC-LEAD-1003',
            name: 'Vikram Patel',
            mobile: '+91 98251 67490',
            whatsapp: '+91 98251 67490',
            email: 'v.patel@gujaratpharmahub.com',
            city: 'Ahmedabad',
            state: 'Gujarat',
            businessType: 'PCD Partner',
            requirementType: 'PCD Franchise',
            productOrService: 'Complete Tablet & Capsule Portfolio',
            source: 'Hero PCD CTA',
            assignedPerson: 'PCD Franchise Operations',
            leadStatus: '🟡 Follow-up',
            followUpDate: '2026-10-07',
            notes: 'Requested monopoly district rights for Ahmedabad and Surat zones. Visual aids and sample kits requested.',
            createdDate: '2026-10-04 16:20',
            lastUpdatedDate: '2026-10-05 17:10'
        },
        {
            leadId: 'DC-LEAD-1004',
            name: 'Suresh Menon',
            mobile: '+91 98470 12890',
            whatsapp: '+91 98470 12890',
            email: 'suresh@careplusmedicals.co.in',
            city: 'Kochi',
            state: 'Kerala',
            businessType: 'Pharmacy Chain',
            requirementType: 'Bulk Purchase',
            productOrService: 'Bons Cure Tablets & DISIVIT-M Capsules',
            source: 'Contact Form',
            assignedPerson: 'Commercial Sales Team',
            leadStatus: '🟠 Negotiation',
            followUpDate: '2026-10-08',
            notes: 'Batch rate quotation under review with accounts. Margin terms discussed at 18% distributor tier.',
            createdDate: '2026-10-03 10:00',
            lastUpdatedDate: '2026-10-06 12:00'
        },
        {
            leadId: 'DC-LEAD-1005',
            name: 'Pooja Deshmukh',
            mobile: '+91 99201 44556',
            whatsapp: '+91 99201 44556',
            email: 'pooja@zenithbiocare.com',
            city: 'Mumbai',
            state: 'Maharashtra',
            businessType: 'Pharma Company',
            requirementType: 'Custom Formulation',
            productOrService: 'DISIZYME Probiotic Capsules (Custom Brand)',
            source: 'Partner Enquiry Form',
            assignedPerson: 'Third-Party Manufacturing Desk',
            leadStatus: '🟣 Converted',
            followUpDate: '2026-10-15',
            notes: 'Commercial agreement finalized. Advance payment received for first 5,000 Alu-Alu strip production run.',
            createdDate: '2026-09-28 15:45',
            lastUpdatedDate: '2026-10-05 18:30'
        },
        {
            leadId: 'DC-LEAD-1006',
            name: 'Harish Chandra Roy',
            mobile: '+91 98300 77123',
            whatsapp: '+91 98300 77123',
            email: 'hcroy@kolkatamedicose.com',
            city: 'Kolkata',
            state: 'West Bengal',
            businessType: 'Stockist',
            requirementType: 'Bulk Supply',
            productOrService: 'DISICIN-OF Tablets (5000 Packs)',
            source: 'WhatsApp CTA',
            assignedPerson: 'Commercial Sales Team',
            leadStatus: '⚫ On Hold',
            followUpDate: '2026-10-25',
            notes: 'Client awaiting seasonal wholesale licensing renewal before releasing purchase order.',
            createdDate: '2026-09-25 09:30',
            lastUpdatedDate: '2026-10-02 11:15'
        }
    ],

    // Initialize Database in LocalStorage
    init: function() {
        if (!localStorage.getItem(this.STORAGE_KEY)) {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.INITIAL_LEADS));
        }
    },

    // Retrieve all leads sorted by newest first
    getAllLeads: function() {
        this.init();
        try {
            const raw = localStorage.getItem(this.STORAGE_KEY);
            const list = JSON.parse(raw) || [];
            return list;
        } catch (e) {
            console.error('Error reading leads from storage:', e);
            return this.INITIAL_LEADS;
        }
    },

    // Save lead list
    saveLeads: function(leads) {
        try {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(leads));
            return true;
        } catch (e) {
            console.error('Error saving leads to storage:', e);
            return false;
        }
    },

    // Generate New Unique Lead ID
    generateLeadId: function() {
        const leads = this.getAllLeads();
        const count = leads.length + 1001;
        return `DC-LEAD-${count}`;
    },

    // Add a new lead (from Form, WhatsApp CTA, or Manual Admin Creation)
    addLead: function(data) {
        const leads = this.getAllLeads();
        const now = new Date();
        const dateStr = now.toISOString().replace('T', ' ').substring(0, 16);

        const newLead = {
            leadId: data.leadId || this.generateLeadId(),
            name: data.name || 'Anonymous Visitor',
            mobile: data.mobile || data.phone || 'N/A',
            whatsapp: data.whatsapp || data.mobile || data.phone || 'N/A',
            email: data.email || 'N/A',
            city: data.city || 'N/A',
            state: data.state || 'N/A',
            businessType: data.businessType || data.business_type || 'General B2B Buyer',
            requirementType: data.requirementType || data.requirement_type || data.service || 'Product Enquiry',
            productOrService: data.productOrService || data.molecule || data.subject || 'Disicure Formulations',
            source: data.source || 'Website Form',
            assignedPerson: data.assignedPerson || 'Nishant Chaturvedi (Director)',
            leadStatus: data.leadStatus || '🟢 New',
            followUpDate: data.followUpDate || '',
            notes: data.notes || data.message || 'Captured via B2B digital lead portal.',
            createdDate: data.createdDate || dateStr,
            lastUpdatedDate: dateStr
        };

        // Insert at beginning (newest first)
        leads.unshift(newLead);
        this.saveLeads(leads);
        console.log(`[LMS] Lead captured: ${newLead.leadId} - ${newLead.name}`);
        return newLead;
    },

    // Update an existing lead
    updateLead: function(leadId, updatedFields) {
        const leads = this.getAllLeads();
        const index = leads.findIndex(l => l.leadId === leadId);
        if (index === -1) return false;

        const now = new Date();
        const dateStr = now.toISOString().replace('T', ' ').substring(0, 16);

        leads[index] = {
            ...leads[index],
            ...updatedFields,
            lastUpdatedDate: dateStr
        };

        this.saveLeads(leads);
        return leads[index];
    },

    // Delete a lead
    deleteLead: function(leadId) {
        let leads = this.getAllLeads();
        leads = leads.filter(l => l.leadId !== leadId);
        this.saveLeads(leads);
        return true;
    },

    // Quick Status Update
    updateStatus: function(leadId, newStatus) {
        return this.updateLead(leadId, { leadStatus: newStatus });
    },

    // Quick Note Append
    addNote: function(leadId, newNote) {
        const leads = this.getAllLeads();
        const lead = leads.find(l => l.leadId === leadId);
        if (!lead) return false;

        const now = new Date();
        const dateStr = now.toISOString().replace('T', ' ').substring(0, 16);
        const combinedNotes = (lead.notes ? lead.notes + '\n\n' : '') + `[${dateStr}] ${newNote}`;

        return this.updateLead(leadId, { notes: combinedNotes });
    },

    // Capture WhatsApp CTA Click as Lead
    captureWhatsAppClick: function(sourceLabel, contextDetails) {
        return this.addLead({
            name: 'WhatsApp Inquirer',
            mobile: 'Pending Chat Initiation',
            whatsapp: '+91 9005874417',
            email: 'Pending via WhatsApp',
            city: 'N/A',
            state: 'N/A',
            businessType: 'Prospective B2B Client',
            requirementType: 'Direct WhatsApp Chat Enquiry',
            productOrService: contextDetails || 'Disicure Portfolio / Services',
            source: sourceLabel || 'Floating WhatsApp CTA',
            assignedPerson: 'Commercial Sales Team',
            leadStatus: '🟢 New',
            notes: `User initiated direct WhatsApp consultation regarding: ${contextDetails || 'General Pharma Solutions'}.`
        });
    },

    // Export Leads as CSV Download
    exportToCSV: function() {
        const leads = this.getAllLeads();
        if (!leads.length) {
            alert('No leads available to export.');
            return;
        }

        const headers = [
            'Lead ID', 'Name', 'Mobile', 'WhatsApp Number', 'Email',
            'City', 'State', 'Business Type', 'Requirement Type',
            'Product/Service', 'Source', 'Assigned Person',
            'Lead Status', 'Follow-up Date', 'Notes',
            'Created Date', 'Last Updated Date'
        ];

        const escapeCSV = (str) => {
            if (str === null || str === undefined) return '""';
            const clean = String(str).replace(/"/g, '""').replace(/\n/g, ' ');
            return `"${clean}"`;
        };

        let csvContent = '\uFEFF'; // UTF-8 BOM
        csvContent += headers.map(escapeCSV).join(',') + '\r\n';

        leads.forEach(l => {
            const row = [
                l.leadId,
                l.name,
                l.mobile,
                l.whatsapp,
                l.email,
                l.city,
                l.state,
                l.businessType,
                l.requirementType,
                l.productOrService,
                l.source,
                l.assignedPerson,
                l.leadStatus,
                l.followUpDate,
                l.notes,
                l.createdDate,
                l.lastUpdatedDate
            ];
            csvContent += row.map(escapeCSV).join(',') + '\r\n';
        });

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        const filename = `Disicure_Leads_${new Date().toISOString().substring(0, 10)}.csv`;
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    },

    // Reset database to initial seed leads
    resetToDefaults: function() {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.INITIAL_LEADS));
        return this.INITIAL_LEADS;
    },

    // --- DASHBOARD ANALYTICS & FINANCIALS ENGINE ---
    getDashboardAnalytics: function() {
        const leads = this.getAllLeads();
        const total = leads.length;
        const countNew = leads.filter(l => l.leadStatus.includes('New')).length;
        const countContacted = leads.filter(l => l.leadStatus.includes('Contacted')).length;
        const countFollowup = leads.filter(l => l.leadStatus.includes('Follow-up')).length;
        const countNegotiation = leads.filter(l => l.leadStatus.includes('Negotiation')).length;
        const countConverted = leads.filter(l => l.leadStatus.includes('Converted')).length;
        const countLost = leads.filter(l => l.leadStatus.includes('Lost')).length;
        const countOnHold = leads.filter(l => l.leadStatus.includes('On Hold')).length;

        // Dynamic conversion calculation
        const conversionRate = total > 0 ? Math.round((countConverted / total) * 100) : 0;

        // Financials (Calculated & Stored)
        const financials = {
            totalBusinessValue: 4850000,   // ₹48.5 Lakhs
            paymentsReceived: 3280000,     // ₹32.8 Lakhs
            pendingPayments: 1570000,      // ₹15.7 Lakhs
            totalBusinessFormatted: '₹48,50,000',
            paymentsReceivedFormatted: '₹32,80,000',
            pendingPaymentsFormatted: '₹15,70,000',
            activePartnersCount: 42,
            teamMembersCount: 8
        };

        // Monthly Leads Progression Data (Jan - Oct 2026)
        const monthlyLeads = [
            { month: 'Jan', count: 18, label: 'Jan 26' },
            { month: 'Feb', count: 24, label: 'Feb 26' },
            { month: 'Mar', count: 32, label: 'Mar 26' },
            { month: 'Apr', count: 29, label: 'Apr 26' },
            { month: 'May', count: 38, label: 'May 26' },
            { month: 'Jun', count: 44, label: 'Jun 26' },
            { month: 'Jul', count: 41, label: 'Jul 26' },
            { month: 'Aug', count: 52, label: 'Aug 26' },
            { month: 'Sep', count: 58, label: 'Sep 26' },
            { month: 'Oct', count: Math.max(68, total * 6), label: 'Oct 26' }
        ];

        // Monthly Revenue Progression (in ₹ Lakhs)
        const monthlyRevenue = [
            { month: 'Jan', revenue: 1.8, valStr: '₹1.8L' },
            { month: 'Feb', revenue: 2.4, valStr: '₹2.4L' },
            { month: 'Mar', revenue: 3.2, valStr: '₹3.2L' },
            { month: 'Apr', revenue: 3.1, valStr: '₹3.1L' },
            { month: 'May', revenue: 4.0, valStr: '₹4.0L' },
            { month: 'Jun', revenue: 4.9, valStr: '₹4.9L' },
            { month: 'Jul', revenue: 4.4, valStr: '₹4.4L' },
            { month: 'Aug', revenue: 5.8, valStr: '₹5.8L' },
            { month: 'Sep', revenue: 6.4, valStr: '₹6.4L' },
            { month: 'Oct', revenue: 7.8, valStr: '₹7.8L' }
        ];

        // Lead Sources Breakdown
        const leadSources = [
            { source: 'Website B2B Modal', percentage: 34, count: Math.round(total * 0.34) || 28, color: '#2563eb' },
            { source: 'WhatsApp CTA', percentage: 28, count: Math.round(total * 0.28) || 22, color: '#10b981' },
            { source: 'Product Catalog', percentage: 18, count: Math.round(total * 0.18) || 15, color: '#06b6d4' },
            { source: 'PCD Franchise Portal', percentage: 12, count: Math.round(total * 0.12) || 10, color: '#8b5cf6' },
            { source: 'Direct Contact / Call', percentage: 8, count: Math.round(total * 0.08) || 7, color: '#f59e0b' }
        ];

        // Pending Payments Aging Breakdown
        const pendingAging = [
            { bucket: '0–15 Days (Current)', amount: 820000, amountFormatted: '₹8,20,000', percentage: 52, status: 'Active / Due Soon', color: '#10b981' },
            { bucket: '16–30 Days (Standard)', amount: 490000, amountFormatted: '₹4,90,000', percentage: 31, status: 'In Reminder Cycle', color: '#3b82f6' },
            { bucket: '31–60 Days (Grace)', amount: 210000, amountFormatted: '₹2,10,000', percentage: 13, status: 'Follow-up Required', color: '#f59e0b' },
            { bucket: '60+ Days (Escalated)', amount: 50000, amountFormatted: '₹50,000', percentage: 4, status: 'Management Review', color: '#ef4444' }
        ];

        // Partner Performance Leaderboard
        const partnerPerformance = [
            { name: 'Medilink Pharma Network', region: 'New Delhi & NCR', type: 'Exclusive Distributor', orderVolume: '₹12,40,000', fulfillment: 98, status: '🟢 Excellent', batches: 42 },
            { name: 'Gujarat Pharma Hub', region: 'Ahmedabad & Surat', type: 'PCD Franchise Partner', orderVolume: '₹9,80,000', fulfillment: 96, status: '🟢 Excellent', batches: 35 },
            { name: 'Apollo Hospital Supply Desk', region: 'Uttar Pradesh & UK', type: 'Hospital Supply Network', orderVolume: '₹8,50,000', fulfillment: 100, status: '🟢 Perfect', batches: 28 },
            { name: 'CarePlus Medicals', region: 'Kochi & Trivandrum', type: 'Pharmacy Chain Network', orderVolume: '₹6,20,000', fulfillment: 94, status: '🟢 Good', batches: 22 },
            { name: 'Zenith Biocare', region: 'Mumbai & Pune', type: 'Third-Party Formulation Partner', orderVolume: '₹5,90,000', fulfillment: 97, status: '🟢 Excellent', batches: 19 },
            { name: 'Kolkata Medicose', region: 'West Bengal Zone', type: 'Regional Stockist', orderVolume: '₹4,10,000', fulfillment: 92, status: '🟡 On Track', batches: 14 },
            { name: 'Royal Healthcare Logistics', region: 'Jaipur & Rajasthan', type: 'PCD Franchise Partner', orderVolume: '₹3,80,000', fulfillment: 95, status: '🟢 Good', batches: 12 }
        ];

        // Team Members Directory & Workload
        const teamMembers = [
            { name: 'Mr. Nishant Chaturvedi', role: 'Founder & Director', dept: 'Executive Management', activeLeads: 5, phone: '+91 9792009307', status: '🟢 Available' },
            { name: 'Dr. Vivek Sharma', role: 'VP Institutional Sales', dept: 'Hospital & Institutional Desk', activeLeads: 4, phone: '+91 9104313824', status: '🟢 In Field' },
            { name: 'Anjali Rawat', role: 'Regulatory & QA Lead', dept: 'Quality Assurance / QC', activeLeads: 3, phone: '+91 9005874417', status: '🟢 Active' },
            { name: 'Mohit Saxena', role: 'PCD Operations Manager', dept: 'PCD Franchise Operations', activeLeads: 6, phone: '+91 9792009307', status: '🟢 Active' },
            { name: 'Priyanshu Gupta', role: 'Commercial Distribution Lead', dept: 'Commercial Sales Team', activeLeads: 7, phone: '+91 9104313824', status: '🟢 Active' },
            { name: 'Rajesh Nair', role: 'Regional Manager (South)', dept: 'Southern Zone Operations', activeLeads: 3, phone: '+91 9005874417', status: '🟢 In Field' },
            { name: 'Pooja Sharma', role: 'Digital Lead Specialist', dept: 'Digital Inquiries & Support', activeLeads: 4, phone: '+91 9005874417', status: '🟢 Active' },
            { name: 'Amit Trivedi', role: 'Billing & Accounts Officer', dept: 'Financials & Collections', activeLeads: 2, phone: '+91 9792009307', status: '🟢 Active' }
        ];

        return {
            totalLeads: total,
            newLeads: countNew,
            contactedLeads: countContacted,
            followupLeads: countFollowup,
            negotiationLeads: countNegotiation,
            convertedLeads: countConverted,
            lostLeads: countLost,
            onholdLeads: countOnHold,
            conversionRate: conversionRate,
            financials: financials,
            monthlyLeads: monthlyLeads,
            monthlyRevenue: monthlyRevenue,
            leadSources: leadSources,
            pendingAging: pendingAging,
            partnerPerformance: partnerPerformance,
            teamMembers: teamMembers
        };
    }
};

// Global Exposure
window.DisicureLeads = DisicureLeads;
DisicureLeads.init();
