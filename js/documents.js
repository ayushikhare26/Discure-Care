// ==========================================================================
// Disicure Care Pvt. Ltd. — Document & Excel Management System (DMS) Engine
// ==========================================================================

const DisicureDocuments = {
    STORAGE_KEY: 'disicure_documents_db_v1',

    // Official Document Categories
    CATEGORIES: [
        { id: 'all', label: '📁 All Documents', icon: 'folder' },
        { id: 'excel', label: '📊 Excel & Spreadsheets', icon: 'table', extensions: ['.xlsx', '.xls', '.csv'] },
        { id: 'pdf', label: '📄 PDF Documents', icon: 'file-text', extensions: ['.pdf'] },
        { id: 'word', label: '📝 Word Documents', icon: 'file', extensions: ['.docx', '.doc', '.rtf'] },
        { id: 'images', label: '🖼️ Images & Visuals', icon: 'image', extensions: ['.jpg', '.jpeg', '.png', '.webp', '.svg'] },
        { id: 'products', label: '📦 Product Specs & COA', icon: 'box', extensions: ['.pdf', '.xlsx', '.png'] },
        { id: 'agreements', label: '📑 Agreements & Contracts', icon: 'shield', extensions: ['.pdf', '.docx'] },
        { id: 'reports', label: '📈 Reports & Audits', icon: 'chart', extensions: ['.pdf', '.xlsx'] },
        { id: 'invoices', label: '🧾 Invoices & Billing', icon: 'credit-card', extensions: ['.pdf', '.xlsx'] },
        { id: 'licenses', label: '📋 Licenses & Compliance', icon: 'check-circle', extensions: ['.pdf', '.jpg'] }
    ],

    // Seed realistic initial documents for instant administration
    INITIAL_DOCUMENTS: [
        {
            docId: 'DOC-2026-101',
            title: 'Disicure_Formulations_Master_PriceList_2026.xlsx',
            category: '📊 Excel & Spreadsheets',
            fileType: 'xlsx',
            fileSize: '1.4 MB',
            uploadDate: '2026-10-06 14:15',
            tags: 'Pricing, Formulations, Wholesale, 2026 Rate Card',
            notes: 'Complete master pricing table for tablets, capsules, and syrups with tier-1 distributor margins.',
            fileData: null,
            downloadName: 'Disicure_Formulations_Master_PriceList_2026.xlsx',
            previewType: 'table',
            previewData: [
                ['Product Code', 'Molecule Name', 'Dosage Form', 'Packaging', 'MRP (INR)', 'Wholesale Net (INR)'],
                ['DC-TAB-01', 'DISIMOL-SP (Aceclofenac + Paracetamol + Serratiopeptidase)', 'Tablet', '10x10 Alu-Alu', '₹118.00', '₹34.50'],
                ['DC-CAP-02', 'DISIZOLE-DSR (Rabeprazole + Domperidone)', 'Capsule', '10x10 Alu-Alu', '₹145.00', '₹42.00'],
                ['DC-CAP-03', 'DISIVIT-M (Prebiotic + Probiotic + Zinc)', 'Capsule', '10x1x10 Alu-Alu', '₹165.00', '₹48.00'],
                ['DC-TAB-04', 'DISICIN-OF (Ofloxacin + Ornidazole)', 'Tablet', '10x10 Blister', '₹125.00', '₹38.00'],
                ['DC-CAP-05', 'DISIZYME Probiotic Blend', 'Capsule', '10x10 Alu-Alu', '₹155.00', '₹45.00'],
                ['DC-TAB-06', 'Bons Cure (Calcium Citrate + Vitamin D3)', 'Tablet', '10x15 Blister', '₹130.00', '₹36.00']
            ]
        },
        {
            docId: 'DOC-2026-102',
            title: 'Disicure_Corporate_Brochure_&_PCD_Franchise_Catalog.pdf',
            category: '📄 PDF Documents',
            fileType: 'pdf',
            fileSize: '4.8 MB',
            uploadDate: '2026-10-05 11:20',
            tags: 'Catalog, PCD Franchise, Corporate Profile, Marketing',
            notes: 'Official high-resolution product catalog with monopoly district rights terms and visual aids.',
            fileData: null,
            downloadName: 'Disicure_Corporate_Brochure_&_PCD_Franchise_Catalog.pdf',
            previewType: 'pdf_summary',
            previewContent: 'Disicure Care Pvt. Ltd. — Corporate Formulation Portfolio (2026-27 Edition). Complete PCD monopoly rights terms, promotional input aids (visual aids, MR bags, catch covers, sample kits), and quality certifications.'
        },
        {
            docId: 'DOC-2026-103',
            title: 'Third_Party_Manufacturing_Agreement_Template.docx',
            category: '📑 Agreements & Contracts',
            fileType: 'docx',
            fileSize: '620 KB',
            uploadDate: '2026-10-04 16:40',
            tags: 'Contract, Third-Party Manufacturing, Legal Agreement',
            notes: 'Standard legal manufacturing terms, batch minimums, quality assurance covenants, and credit milestones.',
            fileData: null,
            downloadName: 'Third_Party_Manufacturing_Agreement_Template.docx',
            previewType: 'text',
            previewContent: 'AGREEMENT FOR THIRD-PARTY PHARMACEUTICAL MANUFACTURING\n\nThis Manufacturing Agreement is executed between Disicure Care Pvt. Ltd. (Manufacturer) and the Partner Brand (Principal). Under this covenant, Manufacturer undertakes batch manufacturing under strict WHO-GMP compliance standards, ensuring Certificate of Analysis (COA) for every dispatched lot.'
        },
        {
            docId: 'DOC-2026-104',
            title: 'DISIMOL-SP_Certificate_of_Analysis_Batch_DC992.pdf',
            category: '📦 Product Specs & COA',
            fileType: 'pdf',
            fileSize: '890 KB',
            uploadDate: '2026-10-04 10:30',
            tags: 'COA, Quality Control, Batch DC-992, Lab Analysis',
            notes: 'Analytical testing report and assay confirmation for Aceclofenac, Paracetamol & Serratiopeptidase lot #DC-992.',
            fileData: null,
            downloadName: 'DISIMOL-SP_COA_Batch_DC992.pdf',
            previewType: 'pdf_summary',
            previewContent: 'CERTIFICATE OF ANALYSIS (COA)\nProduct: DISIMOL-SP Tablets\nBatch No: DC-992 | Mfg: 09/2026 | Exp: 08/2028\nAssay Results:\n- Aceclofenac: 100.2% (Standard: 90-110%)\n- Paracetamol: 99.8% (Standard: 90-110%)\n- Serratiopeptidase: 101.4% (Standard: 90-115%)\nConclusion: Complies with IP specifications.'
        },
        {
            docId: 'DOC-2026-105',
            title: 'Disicure_Manufacturing_Plant_GMP_Certification.pdf',
            category: '📋 Licenses & Compliance',
            fileType: 'pdf',
            fileSize: '1.9 MB',
            uploadDate: '2026-09-30 09:15',
            tags: 'GMP, Drug License, ISO 9001, Quality Certification',
            notes: 'State Drug Controller manufacturing license and Good Manufacturing Practices compliance certificate.',
            fileData: null,
            downloadName: 'Disicure_GMP_License_Certification.pdf',
            previewType: 'pdf_summary',
            previewContent: 'PHARMACEUTICAL MANUFACTURING LICENSE & GMP COMPLIANCE CERTIFICATE\nLicensing Authority: State Drug Control Directorate, Uttarakhand\nRegistration: Form 25 & 28 / Commercial Pharma License\nStandards: WHO-GMP & Revised Schedule M Compliant.'
        },
        {
            docId: 'DOC-2026-106',
            title: 'Q3_2026_Distribution_Sales_Performance_Report.xlsx',
            category: '📈 Reports & Audits',
            fileType: 'xlsx',
            fileSize: '2.1 MB',
            uploadDate: '2026-10-01 18:00',
            tags: 'Sales Report, Q3 2026, Regional Performance, Revenue',
            notes: 'Quarterly dispatch numbers, zone-wise PCD distributor volumes, and pending receivable aging.',
            fileData: null,
            downloadName: 'Q3_2026_Distribution_Sales_Report.xlsx',
            previewType: 'table',
            previewData: [
                ['Zone', 'Key Partner', 'Dispatched Batches', 'Invoiced Value (INR)', 'Payment Realized', 'Status'],
                ['North Zone', 'Medilink Pharma Network', '42 Batches', '₹12,40,000', '100% Cleared', '🟢 Top Performer'],
                ['West Zone', 'Gujarat Pharma Hub', '35 Batches', '₹9,80,000', '66% Cleared', '🟢 Active'],
                ['Institutional', 'Apollo Hospital Supply Desk', '28 Batches', '₹8,50,000', '100% Cleared', '🟢 Perfect'],
                ['South Zone', 'CarePlus Medicals', '22 Batches', '₹6,20,000', '50% Cleared', '🟡 In Cycle'],
                ['East Zone', 'Kolkata Medicose', '14 Batches', '₹4,10,000', 'Proforma Pending', '🔴 Awaiting Release']
            ]
        },
        {
            docId: 'DOC-2026-107',
            title: 'Tax_Invoice_INV-DC-2026-881_Medilink_Pharma.pdf',
            category: '🧾 Invoices & Billing',
            fileType: 'pdf',
            fileSize: '450 KB',
            uploadDate: '2026-10-02 11:45',
            tags: 'Tax Invoice, GST, Medilink Pharma, INV-881',
            notes: 'Official GST Tax Invoice for 10,000 boxes DISIMOL-SP & DISIZOLE-DSR.',
            fileData: null,
            downloadName: 'Tax_Invoice_INV-DC-2026-881.pdf',
            previewType: 'pdf_summary',
            previewContent: 'GST TAX INVOICE — DISICURE CARE PVT. LTD.\nInvoice No: INV-DC-2026-881 | Date: 02-Oct-2026\nBilled to: Medilink Pharma Network (New Delhi)\nHSN: 30049099 | GSTIN: 05AAACD1234F1Z5\nTotal Invoice Amount: ₹12,40,000 (CGST+SGST 12% included)\nPayment Status: Fully Paid via NEFT / UTR Verified.'
        },
        {
            docId: 'DOC-2026-108',
            title: 'Packaging_Alu_Alu_Foil_Design_Box_Packshot.png',
            category: '🖼️ Images & Visuals',
            fileType: 'png',
            fileSize: '3.2 MB',
            uploadDate: '2026-09-25 15:30',
            tags: 'Packaging, Artwork, Alu-Alu, Blister, Brand Design',
            notes: 'Final approved packaging artwork and blister die-line for Disicure formulations.',
            fileData: 'images/service_07_pkg.jpg',
            downloadName: 'Packaging_Alu_Alu_Foil_Design.jpg',
            previewType: 'image',
            previewUrl: 'images/service_07_pkg.jpg'
        },
        {
            docId: 'DOC-2026-109',
            title: 'Standard_Operating_Procedure_SOP_Formulation_QC.docx',
            category: '📝 Word Documents',
            fileType: 'docx',
            fileSize: '540 KB',
            uploadDate: '2026-09-22 14:10',
            tags: 'SOP, Quality Assurance, Laboratory, Testing Guidelines',
            notes: 'Standard operating procedure for disintegration time, dissolution assay, and hardness testing.',
            fileData: null,
            downloadName: 'SOP_Formulation_Quality_Control.docx',
            previewType: 'text',
            previewContent: 'STANDARD OPERATING PROCEDURE (SOP-QC-041)\nTitle: Finished Formulation Release & Stability Testing Protocol\nDepartment: Quality Assurance / Analytical Development\n1. Disintegration Time: Not more than 15 minutes for uncoated tablets; 30 minutes for film-coated.\n2. Friability: Not more than 1.0% w/w.\n3. Uniformity of Dosage: Within ±5% of label claim.'
        }
    ],

    // Initialize Database in LocalStorage
    init: function() {
        if (!localStorage.getItem(this.STORAGE_KEY)) {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.INITIAL_DOCUMENTS));
        }
    },

    // Retrieve all documents
    getAllDocuments: function() {
        this.init();
        try {
            const raw = localStorage.getItem(this.STORAGE_KEY);
            return JSON.parse(raw) || [];
        } catch (e) {
            console.error('Error reading documents from storage:', e);
            return this.INITIAL_DOCUMENTS;
        }
    },

    // Save document list
    saveDocuments: function(docs) {
        try {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(docs));
            return true;
        } catch (e) {
            console.error('Error saving documents to storage:', e);
            return false;
        }
    },

    // Generate unique doc ID
    generateDocId: function() {
        const docs = this.getAllDocuments();
        const count = docs.length + 101;
        return `DOC-2026-${count}`;
    },

    // Add a new document (from file upload or manual upload modal)
    addDocument: function(docData) {
        const docs = this.getAllDocuments();
        const now = new Date();
        const dateStr = now.toISOString().replace('T', ' ').substring(0, 16);

        const newDoc = {
            docId: docData.docId || this.generateDocId(),
            title: docData.title || 'Untitled_Document',
            category: docData.category || '📁 All Documents',
            fileType: docData.fileType || (docData.title.split('.').pop() || 'file').toLowerCase(),
            fileSize: docData.fileSize || '1.2 MB',
            uploadDate: docData.uploadDate || dateStr,
            tags: docData.tags || 'General Business Document',
            notes: docData.notes || 'Uploaded via Document Management System.',
            fileData: docData.fileData || null,
            downloadName: docData.downloadName || docData.title,
            previewType: docData.previewType || 'text',
            previewContent: docData.previewContent || null,
            previewUrl: docData.previewUrl || null,
            previewData: docData.previewData || null
        };

        docs.unshift(newDoc);
        this.saveDocuments(docs);
        return newDoc;
    },

    // Update / Rename an existing document
    updateDocument: function(docId, updatedFields) {
        const docs = this.getAllDocuments();
        const index = docs.findIndex(d => d.docId === docId);
        if (index === -1) return false;

        docs[index] = {
            ...docs[index],
            ...updatedFields,
            lastModifiedDate: new Date().toISOString().replace('T', ' ').substring(0, 16)
        };

        this.saveDocuments(docs);
        return docs[index];
    },

    // Delete a document
    deleteDocument: function(docId) {
        let docs = this.getAllDocuments();
        docs = docs.filter(d => d.docId !== docId);
        this.saveDocuments(docs);
        return true;
    },

    // Get Summary Analytics for KPIs
    getSummary: function() {
        const docs = this.getAllDocuments();
        let countExcel = 0;
        let countPdf = 0;
        let countWord = 0;
        let countImages = 0;
        let countAgreements = 0;
        let countProducts = 0;
        let countInvoices = 0;

        docs.forEach(d => {
            const cat = d.category || '';
            const ext = (d.fileType || '').toLowerCase();
            if (cat.includes('Excel') || ext === 'xlsx' || ext === 'xls' || ext === 'csv') countExcel++;
            else if (cat.includes('PDF') || ext === 'pdf') countPdf++;
            else if (cat.includes('Word') || ext === 'docx' || ext === 'doc') countWord++;
            else if (cat.includes('Images') || ext === 'png' || ext === 'jpg' || ext === 'jpeg') countImages++;
            else if (cat.includes('Agreements')) countAgreements++;
            else if (cat.includes('Product')) countProducts++;
            else if (cat.includes('Invoices')) countInvoices++;
        });

        return {
            totalDocs: docs.length,
            countExcel: countExcel,
            countPdf: countPdf,
            countWord: countWord,
            countImages: countImages,
            countAgreements: countAgreements,
            countProducts: countProducts,
            countInvoices: countInvoices
        };
    },

    // Download document helper
    downloadDocument: function(docId) {
        const docs = this.getAllDocuments();
        const doc = docs.find(d => d.docId === docId);
        if (!doc) return;

        if (doc.fileData && doc.fileData.startsWith('data:')) {
            // Real uploaded file with data URI
            const link = document.createElement('a');
            link.href = doc.fileData;
            link.download = doc.downloadName || doc.title;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            return;
        }

        if (doc.previewUrl) {
            const link = document.createElement('a');
            link.href = doc.previewUrl;
            link.download = doc.downloadName || doc.title;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            return;
        }

        // Generate text/csv/pdf blob download for demo files
        let mime = 'text/plain';
        let content = doc.previewContent || `${doc.title}\n\nDisicure Care Pvt. Ltd. Official Business Document\nDocument ID: ${doc.docId}\nCategory: ${doc.category}\nUpload Date: ${doc.uploadDate}\n\nNotes: ${doc.notes || 'N/A'}`;

        if (doc.previewData && Array.isArray(doc.previewData)) {
            mime = 'text/csv;charset=utf-8;';
            content = '\uFEFF' + doc.previewData.map(row => row.map(c => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\r\n');
        }

        const blob = new Blob([content], { type: mime });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = doc.downloadName || doc.title;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    },

    // Reset to defaults
    resetToDefaults: function() {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.INITIAL_DOCUMENTS));
        return this.INITIAL_DOCUMENTS;
    }
};

// Global Exposure
window.DisicureDocuments = DisicureDocuments;
DisicureDocuments.init();
