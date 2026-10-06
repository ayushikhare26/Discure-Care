// ==========================================================================
// Disicure Care Pvt. Ltd. — Payment Management System (PMS) Engine
// ==========================================================================

const DisicurePayments = {
    STORAGE_KEY: 'disicure_payments_db_v1',

    // Official Payment Status Definitions
    STATUSES: [
        { id: 'paid', label: '🟢 Paid', color: 'bg-emerald-50 text-emerald-700 border-emerald-200', dot: 'bg-emerald-500' },
        { id: 'partial', label: '🟡 Partial', color: 'bg-amber-50 text-amber-700 border-amber-200', dot: 'bg-amber-500' },
        { id: 'pending', label: '🔴 Pending', color: 'bg-rose-50 text-rose-700 border-rose-200', dot: 'bg-rose-500' },
        { id: 'overdue', label: '⚫ Overdue', color: 'bg-slate-800 text-rose-300 border-slate-700', dot: 'bg-rose-500' }
    ],

    // Standard Payment Modes
    PAYMENT_MODES: [
        'NEFT / RTGS',
        'UPI / IMPS',
        'Cheque / DD',
        'Letter of Credit (LC)',
        'Bank Wire Transfer',
        'Cash Deposit'
    ],

    // Seed realistic Initial B2B Payments for immediate demonstration
    INITIAL_PAYMENTS: [
        {
            paymentId: 'PAY-2026-1001',
            clientName: 'Medilink Pharma Network',
            invoiceId: 'INV-DC-2026-881',
            totalAmount: 1240000,
            amountReceived: 1240000,
            pendingAmount: 0,
            paymentDate: '2026-10-02',
            paymentMode: 'NEFT / RTGS',
            paymentStatus: '🟢 Paid',
            notes: '100% advance cleared for Batch #DC-992 DISIMOL-SP & DISIZOLE-DSR commercial run.',
            proofDocument: 'receipt_neft_medilink_881.pdf',
            createdDate: '2026-10-02 11:30',
            lastUpdatedDate: '2026-10-02 11:30'
        },
        {
            paymentId: 'PAY-2026-1002',
            clientName: 'Gujarat Pharma Hub',
            invoiceId: 'INV-DC-2026-882',
            totalAmount: 980000,
            amountReceived: 650000,
            pendingAmount: 330000,
            paymentDate: '2026-10-04',
            paymentMode: 'NEFT / RTGS',
            paymentStatus: '🟡 Partial',
            notes: 'Phase 1 advance (66%) credited via Axis Bank. Balance scheduled upon dispatch delivery.',
            proofDocument: 'utr_rtgs_gujaratpharma.pdf',
            createdDate: '2026-10-04 15:45',
            lastUpdatedDate: '2026-10-05 10:20'
        },
        {
            paymentId: 'PAY-2026-1003',
            clientName: 'Apollo Hospital Supply Desk',
            invoiceId: 'INV-DC-2026-883',
            totalAmount: 850000,
            amountReceived: 850000,
            pendingAmount: 0,
            paymentDate: '2026-10-01',
            paymentMode: 'Letter of Credit (LC)',
            paymentStatus: '🟢 Paid',
            notes: 'Institutional supply LC settlement acknowledged by HDFC Bank desk.',
            proofDocument: 'bank_lc_apollo_883.pdf',
            createdDate: '2026-10-01 10:15',
            lastUpdatedDate: '2026-10-01 10:15'
        },
        {
            paymentId: 'PAY-2026-1004',
            clientName: 'CarePlus Medicals',
            invoiceId: 'INV-DC-2026-884',
            totalAmount: 620000,
            amountReceived: 300000,
            pendingAmount: 320000,
            paymentDate: '2026-09-28',
            paymentMode: 'UPI / IMPS',
            paymentStatus: '🟡 Partial',
            notes: '50% token received for formulation raw materials. Remainder payable on 15-day credit cycle.',
            proofDocument: 'upi_trans_careplus.png',
            createdDate: '2026-09-28 14:20',
            lastUpdatedDate: '2026-10-03 16:10'
        },
        {
            paymentId: 'PAY-2026-1005',
            clientName: 'Zenith Biocare',
            invoiceId: 'INV-DC-2026-885',
            totalAmount: 590000,
            amountReceived: 240000,
            pendingAmount: 350000,
            paymentDate: '2026-09-20',
            paymentMode: 'Cheque / DD',
            paymentStatus: '🟡 Partial',
            notes: 'Cheque clearing pending for second packaging milestone.',
            proofDocument: 'cheque_scan_zenith_885.jpg',
            createdDate: '2026-09-20 09:30',
            lastUpdatedDate: '2026-09-25 11:00'
        },
        {
            paymentId: 'PAY-2026-1006',
            clientName: 'Kolkata Medicose',
            invoiceId: 'INV-DC-2026-886',
            totalAmount: 410000,
            amountReceived: 0,
            pendingAmount: 410000,
            paymentDate: '2026-10-05',
            paymentMode: 'NEFT / RTGS',
            paymentStatus: '🔴 Pending',
            notes: 'Proforma invoice generated. Awaiting seasonal purchase order release.',
            proofDocument: 'proforma_kolkata_886.pdf',
            createdDate: '2026-10-05 16:00',
            lastUpdatedDate: '2026-10-05 16:00'
        },
        {
            paymentId: 'PAY-2026-1007',
            clientName: 'Royal Healthcare Logistics',
            invoiceId: 'INV-DC-2026-887',
            totalAmount: 160000,
            amountReceived: 0,
            pendingAmount: 160000,
            paymentDate: '2026-08-15',
            paymentMode: 'Cheque / DD',
            paymentStatus: '⚫ Overdue',
            notes: 'Payment due date exceeded 45 days. Follow-up reminder notice dispatched by commercial sales.',
            proofDocument: 'demand_notice_royal_887.pdf',
            createdDate: '2026-08-15 12:00',
            lastUpdatedDate: '2026-09-30 14:20'
        }
    ],

    // Initialize Database in LocalStorage
    init: function() {
        if (!localStorage.getItem(this.STORAGE_KEY)) {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.INITIAL_PAYMENTS));
        }
    },

    // Retrieve all payment records sorted by newest first
    getAllPayments: function() {
        this.init();
        try {
            const raw = localStorage.getItem(this.STORAGE_KEY);
            const list = JSON.parse(raw) || [];
            return list;
        } catch (e) {
            console.error('Error reading payments from storage:', e);
            return this.INITIAL_PAYMENTS;
        }
    },

    // Save payment list
    savePayments: function(payments) {
        try {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(payments));
            return true;
        } catch (e) {
            console.error('Error saving payments to storage:', e);
            return false;
        }
    },

    // Generate New Unique Payment Record ID
    generatePaymentId: function() {
        const payments = this.getAllPayments();
        const count = payments.length + 1001;
        return `PAY-2026-${count}`;
    },

    // Add a new payment record
    addPayment: function(data) {
        const payments = this.getAllPayments();
        const now = new Date();
        const dateStr = now.toISOString().replace('T', ' ').substring(0, 16);

        const total = parseFloat(data.totalAmount) || 0;
        const received = parseFloat(data.amountReceived) || 0;
        const pending = Math.max(0, total - received);

        let status = data.paymentStatus;
        if (!status) {
            if (received >= total && total > 0) {
                status = '🟢 Paid';
            } else if (received > 0 && received < total) {
                status = '🟡 Partial';
            } else {
                status = '🔴 Pending';
            }
        }

        const newPayment = {
            paymentId: data.paymentId || this.generatePaymentId(),
            clientName: data.clientName || 'Unnamed Client',
            invoiceId: data.invoiceId || `INV-DC-${Math.floor(1000 + Math.random() * 9000)}`,
            totalAmount: total,
            amountReceived: received,
            pendingAmount: pending,
            paymentDate: data.paymentDate || now.toISOString().substring(0, 10),
            paymentMode: data.paymentMode || 'NEFT / RTGS',
            paymentStatus: status,
            notes: data.notes || 'Recorded via Payment Management System.',
            proofDocument: data.proofDocument || 'proof_receipt.pdf',
            createdDate: data.createdDate || dateStr,
            lastUpdatedDate: dateStr
        };

        payments.unshift(newPayment);
        this.savePayments(payments);
        return newPayment;
    },

    // Update an existing payment record
    updatePayment: function(paymentId, updatedFields) {
        const payments = this.getAllPayments();
        const index = payments.findIndex(p => p.paymentId === paymentId);
        if (index === -1) return false;

        const now = new Date();
        const dateStr = now.toISOString().replace('T', ' ').substring(0, 16);

        const total = updatedFields.totalAmount !== undefined ? parseFloat(updatedFields.totalAmount) : payments[index].totalAmount;
        const received = updatedFields.amountReceived !== undefined ? parseFloat(updatedFields.amountReceived) : payments[index].amountReceived;
        const pending = Math.max(0, total - received);

        payments[index] = {
            ...payments[index],
            ...updatedFields,
            totalAmount: total,
            amountReceived: received,
            pendingAmount: pending,
            lastUpdatedDate: dateStr
        };

        this.savePayments(payments);
        return payments[index];
    },

    // Delete a payment record
    deletePayment: function(paymentId) {
        let payments = this.getAllPayments();
        payments = payments.filter(p => p.paymentId !== paymentId);
        this.savePayments(payments);
        return true;
    },

    // Quick Status Update
    updateStatus: function(paymentId, newStatus) {
        return this.updatePayment(paymentId, { paymentStatus: newStatus });
    },

    // Summary calculation for financial metrics & dashboard
    getSummary: function() {
        const payments = this.getAllPayments();
        let totalInvoiced = 0;
        let totalReceived = 0;
        let totalPending = 0;
        let overdueAmount = 0;

        let countPaid = 0;
        let countPartial = 0;
        let countPending = 0;
        let countOverdue = 0;

        payments.forEach(p => {
            totalInvoiced += (p.totalAmount || 0);
            totalReceived += (p.amountReceived || 0);
            totalPending += (p.pendingAmount || 0);

            if (p.paymentStatus.includes('Paid')) {
                countPaid++;
            } else if (p.paymentStatus.includes('Partial')) {
                countPartial++;
            } else if (p.paymentStatus.includes('Overdue')) {
                countOverdue++;
                overdueAmount += (p.pendingAmount || 0);
            } else if (p.paymentStatus.includes('Pending')) {
                countPending++;
            }
        });

        const formatINR = (val) => {
            return '₹' + Number(val).toLocaleString('en-IN');
        };

        return {
            totalInvoiced: totalInvoiced,
            totalReceived: totalReceived,
            totalPending: totalPending,
            overdueAmount: overdueAmount,
            totalInvoicedFormatted: formatINR(totalInvoiced),
            totalReceivedFormatted: formatINR(totalReceived),
            totalPendingFormatted: formatINR(totalPending),
            overdueAmountFormatted: formatINR(overdueAmount),
            countPaid: countPaid,
            countPartial: countPartial,
            countPending: countPending,
            countOverdue: countOverdue,
            totalRecords: payments.length
        };
    },

    // Export Payments as CSV Download
    exportToCSV: function() {
        const payments = this.getAllPayments();
        if (!payments.length) {
            alert('No payment records available to export.');
            return;
        }

        const headers = [
            'Payment ID', 'Client/Partner Name', 'Invoice/Reference ID',
            'Total Amount (INR)', 'Amount Received (INR)', 'Pending Amount (INR)',
            'Payment Date', 'Payment Mode', 'Payment Status', 'Notes',
            'Proof Document', 'Created Date', 'Last Updated Date'
        ];

        const escapeCSV = (str) => {
            if (str === null || str === undefined) return '""';
            const clean = String(str).replace(/"/g, '""').replace(/\n/g, ' ');
            return `"${clean}"`;
        };

        let csvContent = '\uFEFF'; // UTF-8 BOM
        csvContent += headers.map(escapeCSV).join(',') + '\r\n';

        payments.forEach(p => {
            const row = [
                p.paymentId,
                p.clientName,
                p.invoiceId,
                p.totalAmount,
                p.amountReceived,
                p.pendingAmount,
                p.paymentDate,
                p.paymentMode,
                p.paymentStatus,
                p.notes,
                p.proofDocument,
                p.createdDate,
                p.lastUpdatedDate
            ];
            csvContent += row.map(escapeCSV).join(',') + '\r\n';
        });

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        const filename = `Disicure_Payments_${new Date().toISOString().substring(0, 10)}.csv`;
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    },

    // Reset database to initial seed payments
    resetToDefaults: function() {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.INITIAL_PAYMENTS));
        return this.INITIAL_PAYMENTS;
    }
};

// Global Exposure
window.DisicurePayments = DisicurePayments;
DisicurePayments.init();
