// ==========================================================================
// Disicure Care Pvt. Ltd. — Enterprise Notification & WhatsApp Engine (Module 18)
// ==========================================================================

const DisicureNotifications = {
    STORAGE_KEY: 'disicure_notifications_db_v1',
    SETTINGS_STORAGE_KEY: 'disicure_notification_settings_v1',

    // Initial realistic notification seed entries
    INITIAL_NOTIFICATIONS: [
        {
            id: 'NOTIF-2026-001',
            type: 'lead_new',
            category: 'leads',
            icon: '📋',
            title: 'New Commercial Enquiry Captured',
            message: 'Maxcure Hospitals (Dr. Arvind Swaminathan) requested bulk quote for DISICEF-1000 Injection.',
            timestamp: '2026-10-07 20:30',
            timeAgo: '10 mins ago',
            read: false,
            priority: 'urgent',
            actionUrl: '#/admin',
            actionTab: 'tab-leads',
            actionLabel: 'View Lead Details',
            phone: '+91 98112 33445',
            whatsappPayload: 'Hello Dr. Arvind Swaminathan, thank you for submitting your bulk enquiry for DISICEF-1000 Injection with Disicure Care Pvt. Ltd. Our institutional desk is reviewing your technical specifications.'
        },
        {
            id: 'NOTIF-2026-002',
            type: 'payment_update',
            category: 'payments',
            icon: '💰',
            title: 'Commercial Payment Verified',
            message: 'Payment of ₹12,00,000 received from Maxcure Hospitals via RTGS (Ref: HDFCR520260930).',
            timestamp: '2026-10-07 18:45',
            timeAgo: '2 hours ago',
            read: false,
            priority: 'high',
            actionUrl: '#/admin',
            actionTab: 'tab-financials',
            actionLabel: 'View Ledger Invoice',
            phone: '+91 98112 33445',
            whatsappPayload: 'Payment Receipt: Received ₹12,00,000 against Invoice INV-2026-CLI-01 from Maxcure Hospitals. Thank you for your continued partnership with Disicure Care Pvt. Ltd.'
        },
        {
            id: 'NOTIF-2026-003',
            type: 'followup_due',
            category: 'followups',
            icon: '📅',
            title: 'Follow-up Scheduled Today',
            message: 'Scheduled follow-up with Medilink Pharma Network regarding Western UP & NCR Q4 Stockist reorders.',
            timestamp: '2026-10-07 16:15',
            timeAgo: '4 hours ago',
            read: false,
            priority: 'high',
            actionUrl: '#/admin',
            actionTab: 'tab-leads',
            actionLabel: 'Open Follow-up Desk',
            phone: '+91 98765 11223',
            whatsappPayload: 'Dear Partner (Medilink Pharma), reminder regarding our scheduled Q4 formulation supply discussion today with Disicure Care Director.'
        },
        {
            id: 'NOTIF-2026-004',
            type: 'partner_new',
            category: 'partners',
            icon: '🤝',
            title: 'New Distributor Onboarded',
            message: 'Gujarat Pharma Distributor registered for Ahmedabad & Surat distribution rights.',
            timestamp: '2026-10-07 14:00',
            timeAgo: '6 hours ago',
            read: true,
            priority: 'normal',
            actionUrl: '#/admin',
            actionTab: 'tab-partners',
            actionLabel: 'Review Partner Profile',
            phone: '+91 98200 44556',
            whatsappPayload: 'Welcome to Disicure Care Pvt. Ltd. Your distributor portal access has been provisioned successfully.'
        },
        {
            id: 'NOTIF-2026-005',
            type: 'partner_lead_update',
            category: 'partners',
            icon: '💵',
            title: 'Partner Commission Approved',
            message: 'Admin approved 10% commission (₹50,000) for Medilink Pharma Network on Shri Ram Chemist contract.',
            timestamp: '2026-10-06 17:30',
            timeAgo: '1 day ago',
            read: true,
            priority: 'high',
            actionUrl: '#/admin',
            actionTab: 'tab-partners',
            actionLabel: 'View Earnings Statement',
            phone: '+91 98765 11223',
            whatsappPayload: 'Dear Partner, your commission of ₹50,000 for deal PLEAD-2026-801 has been approved and scheduled for disbursement.'
        },
        {
            id: 'NOTIF-2026-006',
            type: 'document_new',
            category: 'documents',
            icon: '📁',
            title: 'New Batch COA Uploaded',
            message: 'QA & Compliance team uploaded Certificate of Analysis (COA) for DISIMOL-SP Lot #DC-992.',
            timestamp: '2026-10-06 12:10',
            timeAgo: '1 day ago',
            read: true,
            priority: 'normal',
            actionUrl: '#/admin',
            actionTab: 'tab-documents',
            actionLabel: 'Open Document Vault',
            phone: '+91 9005874417',
            whatsappPayload: 'Quality Certificate Notice: COA for DISIMOL-SP Lot #DC-992 is now available for download in Disicure Document Vault.'
        }
    ],

    // Notification settings
    DEFAULT_SETTINGS: {
        soundAlerts: true,
        toastPopups: true,
        autoWhatsAppLeadAlerts: true,
        autoFollowupReminders: true,
        paymentVerificationAlerts: true,
        documentUploadAlerts: true
    },

    // Initialize database
    init: function() {
        if (!localStorage.getItem(this.STORAGE_KEY)) {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.INITIAL_NOTIFICATIONS));
        }
        if (!localStorage.getItem(this.SETTINGS_STORAGE_KEY)) {
            localStorage.setItem(this.SETTINGS_STORAGE_KEY, JSON.stringify(this.DEFAULT_SETTINGS));
        }
    },

    getAllNotifications: function() {
        this.init();
        try {
            return JSON.parse(localStorage.getItem(this.STORAGE_KEY)) || this.INITIAL_NOTIFICATIONS;
        } catch (e) {
            return this.INITIAL_NOTIFICATIONS;
        }
    },

    saveNotifications: function(notifications) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(notifications));
        this.updateBadgeCounters();
    },

    getUnreadCount: function() {
        const notifs = this.getAllNotifications();
        return notifs.filter(n => !n.read).length;
    },

    // Add a new notification programmatically
    addNotification: function(notif) {
        const notifs = this.getAllNotifications();
        const now = new Date();
        const dateStr = now.toISOString().replace('T', ' ').substring(0, 16);
        const id = `NOTIF-${now.getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

        const newNotif = {
            id: id,
            type: notif.type || 'lead_new',
            category: notif.category || 'leads',
            icon: notif.icon || this.getCategoryIcon(notif.category || 'leads'),
            title: notif.title || 'System Notification',
            message: notif.message || 'New business update recorded.',
            timestamp: dateStr,
            timeAgo: 'Just now',
            read: false,
            priority: notif.priority || 'normal',
            actionUrl: notif.actionUrl || '#/admin',
            actionTab: notif.actionTab || 'tab-dashboard',
            actionLabel: notif.actionLabel || 'View Details',
            phone: notif.phone || '+91 9792009307',
            whatsappPayload: notif.whatsappPayload || notif.message || 'Notification from Disicure Care Pvt. Ltd.'
        };

        notifs.unshift(newNotif);
        this.saveNotifications(notifs);

        // Play subtle sound or show toast if enabled
        if (window.DisicureMain && window.DisicureMain.showToast) {
            window.DisicureMain.showToast('info', `🔔 ${newNotif.title}`);
        }

        return newNotif;
    },

    getCategoryIcon: function(category) {
        switch (category) {
            case 'leads': return '📋';
            case 'partners': return '🤝';
            case 'payments': return '💰';
            case 'followups': return '📅';
            case 'documents': return '📁';
            default: return '🔔';
        }
    },

    markAsRead: function(id) {
        const notifs = this.getAllNotifications();
        const item = notifs.find(n => n.id === id);
        if (item) {
            item.read = true;
            this.saveNotifications(notifs);
        }
    },

    markAllAsRead: function() {
        const notifs = this.getAllNotifications();
        notifs.forEach(n => n.read = true);
        this.saveNotifications(notifs);
    },

    clearAllNotifications: function() {
        this.saveNotifications([]);
    },

    deleteNotification: function(id) {
        let notifs = this.getAllNotifications();
        notifs = notifs.filter(n => n.id !== id);
        this.saveNotifications(notifs);
    },

    // Trigger Notification for New Lead
    notifyNewLead: function(lead) {
        return this.addNotification({
            type: 'lead_new',
            category: 'leads',
            icon: '📋',
            title: 'New Lead: ' + (lead.name || 'Commercial Enquiry'),
            message: `${lead.name} from ${lead.city || 'India'} (${lead.businessType || 'B2B Client'}) enquired for ${lead.productOrService || lead.requirementType || 'formulations'}.`,
            priority: 'urgent',
            actionUrl: '#/admin',
            actionTab: 'tab-leads',
            actionLabel: 'Open LMS Record',
            phone: lead.mobile || lead.whatsapp || '',
            whatsappPayload: `Hello ${lead.name}, greetings from Disicure Care Pvt. Ltd. We have received your inquiry for ${lead.productOrService || 'pharmaceutical products'} and our commercial manager will assist you shortly.`
        });
    },

    // Trigger Notification for New Partner
    notifyNewPartner: function(partner) {
        return this.addNotification({
            type: 'partner_new',
            category: 'partners',
            icon: '🤝',
            title: 'New Partner Onboarded: ' + (partner.companyName || 'Channel Partner'),
            message: `${partner.companyName} (${partner.partnerType}) provisioned for ${partner.assignedTerritory || 'Distribution Zone'}.`,
            priority: 'high',
            actionUrl: '#/admin',
            actionTab: 'tab-partners',
            actionLabel: 'View Partner Dossier',
            phone: partner.mobile || partner.whatsapp || '',
            whatsappPayload: `Welcome ${partner.companyName}! Your partner account has been activated on the Disicure Care Partner Portal. Login: ${partner.username || 'username'}`
        });
    },

    // Trigger Notification for Payment Update
    notifyPaymentUpdate: function(payment) {
        return this.addNotification({
            type: 'payment_update',
            category: 'payments',
            icon: '💰',
            title: 'Payment Status Update: ' + (payment.invoiceId || 'Invoice'),
            message: `Payment of ₹${Number(payment.amountReceived || payment.totalAmount || 0).toLocaleString('en-IN')} for ${payment.clientName} is marked ${payment.paymentStatus || 'Recorded'}.`,
            priority: 'high',
            actionUrl: '#/admin',
            actionTab: 'tab-financials',
            actionLabel: 'View Financial Ledger',
            phone: '+91 9792009307',
            whatsappPayload: `Disicure Care Payment Confirmation: Recorded payment of ₹${Number(payment.amountReceived || 0).toLocaleString('en-IN')} against ${payment.invoiceId} for ${payment.clientName}. Status: ${payment.paymentStatus}.`
        });
    },

    // Trigger Notification for Follow-up Reminder
    notifyFollowupReminder: function(leadOrFollowup) {
        return this.addNotification({
            type: 'followup_due',
            category: 'followups',
            icon: '📅',
            title: 'Follow-up Due: ' + (leadOrFollowup.name || leadOrFollowup.clientName || 'Client'),
            message: `Scheduled follow-up is due for ${leadOrFollowup.name || leadOrFollowup.clientName} regarding ${leadOrFollowup.productOrService || leadOrFollowup.requirement || 'supply terms'}.`,
            priority: 'high',
            actionUrl: '#/admin',
            actionTab: 'tab-leads',
            actionLabel: 'Call / Follow-up',
            phone: leadOrFollowup.mobile || '',
            whatsappPayload: `Hello ${leadOrFollowup.name || leadOrFollowup.clientName}, following up regarding your pharmaceutical formulation requirement with Disicure Care Pvt. Ltd.`
        });
    },

    // Trigger Notification for New Document Upload
    notifyNewDocument: function(doc) {
        return this.addNotification({
            type: 'document_new',
            category: 'documents',
            icon: '📁',
            title: 'New Document Uploaded: ' + (doc.title || 'Business File'),
            message: `File "${doc.title}" (${doc.category || 'Compliance'}) is now accessible in Document Vault.`,
            priority: 'normal',
            actionUrl: '#/admin',
            actionTab: 'tab-documents',
            actionLabel: 'Preview Document',
            phone: '+91 9005874417',
            whatsappPayload: `Disicure Document Vault Notice: New file "${doc.title}" has been uploaded and verified.`
        });
    },

    // Trigger Notification for Partner Lead Update & Commission Approval
    notifyPartnerLeadUpdate: function(lead, eventType) {
        const isApproval = eventType === 'commission_approved';
        return this.addNotification({
            type: 'partner_lead_update',
            category: 'partners',
            icon: isApproval ? '💵' : '📋',
            title: isApproval ? `Partner Commission Approved (${lead.commission || '₹0'})` : `Partner Lead Update (${lead.clientName})`,
            message: isApproval 
                ? `Commission of ${lead.commission || 'payout'} approved for ${lead.partnerName || 'Partner'} on ${lead.clientName} deal.` 
                : `Partner lead ${lead.leadId} for ${lead.clientName} updated to status ${lead.leadStatus}.`,
            priority: 'high',
            actionUrl: '#/admin',
            actionTab: 'tab-partners',
            actionLabel: 'Open Commission Desk',
            phone: lead.mobile || '',
            whatsappPayload: isApproval 
                ? `Dear ${lead.partnerName || 'Partner'}, your commission of ${lead.commission} for client ${lead.clientName} is approved by Disicure Admin.` 
                : `Partner lead ${lead.leadId} updated to ${lead.leadStatus}.`
        });
    },

    // Update floating badge counters on UI
    updateBadgeCounters: function() {
        const unreadCount = this.getUnreadCount();
        const badgeEls = document.querySelectorAll('.notification-unread-badge');
        badgeEls.forEach(el => {
            if (unreadCount > 0) {
                el.innerText = unreadCount > 99 ? '99+' : unreadCount;
                el.classList.remove('hidden');
            } else {
                el.classList.add('hidden');
            }
        });
    }
};

// Auto initialize on load
if (typeof window !== 'undefined') {
    window.DisicureNotifications = DisicureNotifications;
    DisicureNotifications.init();
}
