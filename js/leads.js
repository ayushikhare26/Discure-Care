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
    }
};

// Global Exposure
window.DisicureLeads = DisicureLeads;
DisicureLeads.init();
