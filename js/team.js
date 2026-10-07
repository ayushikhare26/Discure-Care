// ==========================================================================
// Disicure Care Pvt. Ltd. — Team & Role-Based Access Control (TMS / RBAC) Engine
// ==========================================================================

const DisicureTeam = {
    STORAGE_KEY: 'disicure_team_db_v1',
    RBAC_STORAGE_KEY: 'disicure_rbac_permissions_v1',

    // Official System Roles
    ROLES: [
        { id: 'super_admin', label: '👑 Super Admin', color: 'bg-amber-100 text-amber-900 border-amber-300', icon: '👑', desc: 'Full unrestricted governance across system, ledger, security & RBAC settings.' },
        { id: 'admin', label: '🧑‍💼 Admin', color: 'bg-blue-100 text-blue-900 border-blue-300', icon: '🧑‍💼', desc: 'Operational manager with complete access to leads, payments, catalog & documents.' },
        { id: 'sales_executive', label: '📞 Sales Executive', color: 'bg-emerald-100 text-emerald-900 border-emerald-300', icon: '📞', desc: 'Lead follow-ups, quotation dispatches, pipeline conversion & distributor communication.' },
        { id: 'team_member', label: '👨‍💻 Team Member', color: 'bg-indigo-100 text-indigo-900 border-indigo-300', icon: '👨‍💻', desc: 'Formulation data entry, quality assurance, SOP compliance & catalog maintenance.' },
        { id: 'partner', label: '🤝 Partner', color: 'bg-purple-100 text-purple-900 border-purple-300', icon: '🤝', desc: 'External distributor / PCD partner view for order tracking and document downloads.' }
    ],

    // Default Role-Based Access Control (RBAC) Module Permissions
    DEFAULT_PERMISSIONS: {
        '👑 Super Admin': {
            dashboard: true,
            leads_view: true,
            leads_edit: true,
            leads_delete: true,
            payments_view: true,
            payments_edit: true,
            documents_view: true,
            documents_upload: true,
            team_manage: true,
            rbac_control: true
        },
        '🧑‍💼 Admin': {
            dashboard: true,
            leads_view: true,
            leads_edit: true,
            leads_delete: false,
            payments_view: true,
            payments_edit: true,
            documents_view: true,
            documents_upload: true,
            team_manage: true,
            rbac_control: false
        },
        '📞 Sales Executive': {
            dashboard: true,
            leads_view: true,
            leads_edit: true,
            leads_delete: false,
            payments_view: true,
            payments_edit: false,
            documents_view: true,
            documents_upload: false,
            team_manage: false,
            rbac_control: false
        },
        '👨‍💻 Team Member': {
            dashboard: false,
            leads_view: true,
            leads_edit: false,
            leads_delete: false,
            payments_view: false,
            payments_edit: false,
            documents_view: true,
            documents_upload: true,
            team_manage: false,
            rbac_control: false
        },
        '🤝 Partner': {
            dashboard: false,
            leads_view: false,
            leads_edit: false,
            leads_delete: false,
            payments_view: true,
            payments_edit: false,
            documents_view: true,
            documents_upload: false,
            team_manage: false,
            rbac_control: false
        }
    },

    // Seed realistic Initial Team Members with complete profiles, credentials, metrics & logs
    INITIAL_MEMBERS: [
        {
            memberId: 'TM-2026-001',
            name: 'Mr. Nishant Chaturvedi',
            avatar: 'N',
            avatarBg: 'bg-amber-600',
            dept: 'Executive Directorate & Governance',
            designation: 'Founder & Managing Director',
            role: '👑 Super Admin',
            mobile: '+91 9792009307',
            email: 'director@disicurecare.com',
            username: 'nishant.director',
            passwordHash: '••••••••••••',
            accountStatus: '🟢 Active',
            assignedLeadsCount: 5,
            leadStatusSummary: {
                active: 2,
                negotiation: 1,
                converted: 2
            },
            performance: {
                winRate: 88,
                revenueGenerated: '₹24,50,000',
                completedBatches: 42,
                rating: '⭐⭐⭐⭐⭐'
            },
            activityHistory: [
                { date: '2026-10-06 14:30', action: 'Approved Wholesale Contract', detail: 'Authorized 10,000 box run for Medilink Pharma Network.' },
                { date: '2026-10-05 16:15', action: 'Master Pricing Rate Card Updated', detail: 'Released FY2026-27 updated Alu-Alu formulation rate card.' },
                { date: '2026-10-04 11:00', action: 'Lead Assigned', detail: 'Assigned Apollo Hospital supply enquiry to Institutional Desk.' },
                { date: '2026-10-02 09:40', action: 'Security Login', detail: 'Directorate 2FA authentication verified from IP 103.21.x.x.' }
            ],
            createdDate: '2026-01-10 10:00',
            lastLoginDate: '2026-10-06 14:30'
        },
        {
            memberId: 'TM-2026-002',
            name: 'Dr. Vivek Sharma',
            avatar: 'V',
            avatarBg: 'bg-blue-600',
            dept: 'Hospital & Institutional Sales',
            designation: 'VP Institutional Sales & Key Accounts',
            role: '🧑‍💼 Admin',
            mobile: '+91 9104313824',
            email: 'vivek.sharma@disicurecare.com',
            username: 'vivek.admin',
            passwordHash: '••••••••••••',
            accountStatus: '🟢 Active',
            assignedLeadsCount: 4,
            leadStatusSummary: {
                active: 2,
                negotiation: 1,
                converted: 1
            },
            performance: {
                winRate: 82,
                revenueGenerated: '₹14,80,000',
                completedBatches: 28,
                rating: '⭐⭐⭐⭐⭐'
            },
            activityHistory: [
                { date: '2026-10-06 11:20', action: 'Institutional Quotation Sent', detail: 'Dispatched COA & rate card to Apollo Hospital UP.' },
                { date: '2026-10-05 15:40', action: 'Payment Proof Verified', detail: 'Verified HDFC LC settlement of ₹8,50,000.' },
                { date: '2026-10-03 14:10', action: 'Hospital Procurement Call', detail: 'Negotiated tender terms for DISIZOLE-DSR supply.' }
            ],
            createdDate: '2026-02-15 11:30',
            lastLoginDate: '2026-10-06 11:20'
        },
        {
            memberId: 'TM-2026-003',
            name: 'Mohit Saxena',
            avatar: 'M',
            avatarBg: 'bg-emerald-600',
            dept: 'PCD Franchise Operations',
            designation: 'Senior PCD Franchise Manager',
            role: '📞 Sales Executive',
            mobile: '+91 9792009307',
            email: 'mohit.pcd@disicurecare.com',
            username: 'mohit.sales',
            passwordHash: '••••••••••••',
            accountStatus: '🟢 Active',
            assignedLeadsCount: 6,
            leadStatusSummary: {
                active: 3,
                negotiation: 2,
                converted: 1
            },
            performance: {
                winRate: 75,
                revenueGenerated: '₹9,80,000',
                completedBatches: 35,
                rating: '⭐⭐⭐⭐'
            },
            activityHistory: [
                { date: '2026-10-06 10:45', action: 'PCD Monopoly Agreement Drafted', detail: 'Sent Ahmedabad & Surat zone monopoly draft to Gujarat Pharma Hub.' },
                { date: '2026-10-04 17:10', action: 'Promotional Input Kit Dispatched', detail: 'Courier tracking #DTDC-8849 shared for MR visual aids.' },
                { date: '2026-10-01 12:30', action: 'Lead Follow-up Recorded', detail: 'Logged follow-up call with prospective partner in Jaipur.' }
            ],
            createdDate: '2026-03-01 09:15',
            lastLoginDate: '2026-10-06 10:45'
        },
        {
            memberId: 'TM-2026-004',
            name: 'Priyanshu Gupta',
            avatar: 'P',
            avatarBg: 'bg-teal-600',
            dept: 'Commercial Sales & Distribution',
            designation: 'Commercial Distribution Lead',
            role: '📞 Sales Executive',
            mobile: '+91 9104313824',
            email: 'priyanshu@disicurecare.com',
            username: 'priyanshu.sales',
            passwordHash: '••••••••••••',
            accountStatus: '🟢 Active',
            assignedLeadsCount: 7,
            leadStatusSummary: {
                active: 4,
                negotiation: 1,
                converted: 2
            },
            performance: {
                winRate: 79,
                revenueGenerated: '₹11,40,000',
                completedBatches: 22,
                rating: '⭐⭐⭐⭐'
            },
            activityHistory: [
                { date: '2026-10-06 13:00', action: 'Follow-up Call Completed', detail: 'Spoke with CarePlus Medicals regarding bulk syrup dispatch.' },
                { date: '2026-10-03 16:40', action: 'Lead Status Changed', detail: 'Shifted CarePlus Medicals lead to 🟠 Negotiation.' },
                { date: '2026-09-29 11:15', action: 'Bulk Discount Approved', detail: 'Offered 4% volume rebate on 5,000+ box orders.' }
            ],
            createdDate: '2026-03-15 14:00',
            lastLoginDate: '2026-10-06 13:00'
        },
        {
            memberId: 'TM-2026-005',
            name: 'Anjali Rawat',
            avatar: 'A',
            avatarBg: 'bg-indigo-600',
            dept: 'Quality Assurance & Regulatory',
            designation: 'Regulatory Affairs & QA Officer',
            role: '👨‍💻 Team Member',
            mobile: '+91 9005874417',
            email: 'qa.regulatory@disicurecare.com',
            username: 'anjali.qa',
            passwordHash: '••••••••••••',
            accountStatus: '🟢 Active',
            assignedLeadsCount: 3,
            leadStatusSummary: {
                active: 2,
                negotiation: 0,
                converted: 1
            },
            performance: {
                winRate: 95,
                revenueGenerated: '₹5,90,000',
                completedBatches: 48,
                rating: '⭐⭐⭐⭐⭐'
            },
            activityHistory: [
                { date: '2026-10-05 14:00', action: 'COA Certificate Uploaded', detail: 'Uploaded official COA for DISIMOL-SP lot #DC-992.' },
                { date: '2026-10-02 11:10', action: 'SOP Document Revised', detail: 'Updated finished formulation disintegration testing SOP.' },
                { date: '2026-09-28 09:30', action: 'Assay Lab Compliance Verified', detail: 'Completed periodic WHO-GMP audit checklist.' }
            ],
            createdDate: '2026-04-01 10:00',
            lastLoginDate: '2026-10-05 14:00'
        },
        {
            memberId: 'TM-2026-006',
            name: 'Rajesh Kumar Singhania',
            avatar: 'R',
            avatarBg: 'bg-purple-600',
            dept: 'Authorized Partner Network',
            designation: 'Principal Stockist (Medilink Network)',
            role: '🤝 Partner',
            mobile: '+91 98112 34567',
            email: 'rajesh.singhania@medilinkpharma.in',
            username: 'partner.medilink',
            passwordHash: '••••••••••••',
            accountStatus: '🟢 Active',
            assignedLeadsCount: 1,
            leadStatusSummary: {
                active: 0,
                negotiation: 0,
                converted: 1
            },
            performance: {
                winRate: 100,
                revenueGenerated: '₹12,40,000',
                completedBatches: 42,
                rating: '⭐⭐⭐⭐⭐'
            },
            activityHistory: [
                { date: '2026-10-04 16:30', action: 'Order PO Released', detail: 'Submitted purchase order for October manufacturing run.' },
                { date: '2026-10-02 11:30', action: 'Payment NEFT Cleared', detail: 'Remitted ₹12,40,000 via RTGS for invoice INV-881.' },
                { date: '2026-09-25 15:00', action: 'Catalog Downloaded', detail: 'Downloaded master product rate card from partner portal.' }
            ],
            createdDate: '2026-05-10 12:00',
            lastLoginDate: '2026-10-04 16:30'
        }
    ],

    // Initialize Database in LocalStorage
    init: function() {
        if (!localStorage.getItem(this.STORAGE_KEY)) {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.INITIAL_MEMBERS));
        }
        if (!localStorage.getItem(this.RBAC_STORAGE_KEY)) {
            localStorage.setItem(this.RBAC_STORAGE_KEY, JSON.stringify(this.DEFAULT_PERMISSIONS));
        }
    },

    // Retrieve all team members
    getAllMembers: function() {
        this.init();
        try {
            const raw = localStorage.getItem(this.STORAGE_KEY);
            return JSON.parse(raw) || [];
        } catch (e) {
            console.error('Error reading team from storage:', e);
            return this.INITIAL_MEMBERS;
        }
    },

    // Save team list
    saveMembers: function(members) {
        try {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(members));
            return true;
        } catch (e) {
            console.error('Error saving team to storage:', e);
            return false;
        }
    },

    // Retrieve RBAC Permissions
    getRBACPermissions: function() {
        this.init();
        try {
            const raw = localStorage.getItem(this.RBAC_STORAGE_KEY);
            return JSON.parse(raw) || this.DEFAULT_PERMISSIONS;
        } catch (e) {
            return this.DEFAULT_PERMISSIONS;
        }
    },

    getPermissions: function(role) {
        const rbac = this.getRBACPermissions();
        if (role && rbac[role]) return rbac[role];
        return this.DEFAULT_PERMISSIONS[role] || {};
    },

    // Save RBAC Permissions
    saveRBACPermissions: function(perms) {
        try {
            localStorage.setItem(this.RBAC_STORAGE_KEY, JSON.stringify(perms));
            return true;
        } catch (e) {
            return false;
        }
    },

    // Generate unique member ID
    generateMemberId: function() {
        const members = this.getAllMembers();
        const count = members.length + 1;
        return `TM-2026-00${count}`;
    },

    // Add new team member
    addMember: function(data) {
        const members = this.getAllMembers();
        const now = new Date();
        const dateStr = now.toISOString().replace('T', ' ').substring(0, 16);

        const colors = ['bg-blue-600', 'bg-emerald-600', 'bg-teal-600', 'bg-indigo-600', 'bg-purple-600', 'bg-rose-600'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];

        const newMember = {
            memberId: data.memberId || this.generateMemberId(),
            name: data.name || 'Team Member',
            avatar: (data.name || 'T').charAt(0).toUpperCase(),
            avatarBg: randomColor,
            dept: data.dept || 'Commercial Operations',
            designation: data.designation || 'Representative',
            role: data.role || '📞 Sales Executive',
            mobile: data.mobile || '+91 9000000000',
            email: data.email || 'team@disicurecare.com',
            username: data.username || (data.email ? data.email.split('@')[0] : 'member'),
            passwordHash: '••••••••••••',
            accountStatus: data.accountStatus || '🟢 Active',
            assignedLeadsCount: parseInt(data.assignedLeadsCount) || 0,
            leadStatusSummary: {
                active: 0,
                negotiation: 0,
                converted: 0
            },
            performance: {
                winRate: 70,
                revenueGenerated: '₹0',
                completedBatches: 0,
                rating: '⭐⭐⭐⭐'
            },
            activityHistory: [
                { date: dateStr, action: 'Account Created', detail: `Profile provisioned with role ${data.role || 'Sales Executive'}.` }
            ],
            createdDate: dateStr,
            lastLoginDate: 'First login pending'
        };

        members.unshift(newMember);
        this.saveMembers(members);
        return newMember;
    },

    // Update existing member
    updateMember: function(memberId, updatedFields) {
        const members = this.getAllMembers();
        const index = members.findIndex(m => m.memberId === memberId);
        if (index === -1) return false;

        members[index] = {
            ...members[index],
            ...updatedFields,
            lastModifiedDate: new Date().toISOString().replace('T', ' ').substring(0, 16)
        };

        this.saveMembers(members);
        return members[index];
    },

    // Delete member
    deleteMember: function(memberId) {
        let members = this.getAllMembers();
        members = members.filter(m => m.memberId !== memberId);
        this.saveMembers(members);
        return true;
    },

    // Log new activity for a member
    logActivity: function(memberId, action, detail) {
        const members = this.getAllMembers();
        const member = members.find(m => m.memberId === memberId);
        if (!member) return false;

        const dateStr = new Date().toISOString().replace('T', ' ').substring(0, 16);
        if (!member.activityHistory) member.activityHistory = [];

        member.activityHistory.unshift({ date: dateStr, action: action, detail: detail });
        this.saveMembers(members);
        return true;
    },

    // Get Summary KPIs
    getSummary: function() {
        const members = this.getAllMembers();
        let countSuperAdmin = 0;
        let countAdmin = 0;
        let countSales = 0;
        let countTeam = 0;
        let countPartner = 0;

        members.forEach(m => {
            if (m.role.includes('Super Admin')) countSuperAdmin++;
            else if (m.role.includes('Admin')) countAdmin++;
            else if (m.role.includes('Sales')) countSales++;
            else if (m.role.includes('Partner')) countPartner++;
            else countTeam++;
        });

        return {
            totalMembers: members.length,
            countSuperAdmin: countSuperAdmin,
            countAdmin: countAdmin,
            countSales: countSales,
            countTeam: countTeam,
            countPartner: countPartner
        };
    },

    // Reset to defaults
    resetToDefaults: function() {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.INITIAL_MEMBERS));
        localStorage.setItem(this.RBAC_STORAGE_KEY, JSON.stringify(this.DEFAULT_PERMISSIONS));
        return this.INITIAL_MEMBERS;
    }
};

// Global Exposure
window.DisicureTeam = DisicureTeam;
DisicureTeam.init();
