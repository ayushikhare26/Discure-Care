/**
 * Disicure Care Pvt. Ltd. - Client & Customer Management Module (Module 13)
 * Comprehensive 360° Client Profile & Lifecycle Relationship Engine
 * 
 * Fields Managed:
 * 1. Company Name
 * 2. Contact Person & Designation
 * 3. Mobile
 * 4. Email
 * 5. Location (City, State, Full Address, Pincode)
 * 6. Business Type (Hospital Chain, PCD Franchise, Retail Pharmacy, Govt Institution, Marketing Partner, Distributor)
 * 7. Requirements (Specifications, Active Requirements, Batch Sizes, Target Dates, Budgets)
 * 8. Products / Services (Contracted Formulations, Third-party Manufacturing, Unit Rates, Volumes)
 * 9. Leads (Historical CRM & Partner inquiries, Funnel conversions, Inception values)
 * 10. Orders / Business (Purchase Orders, Supply Contracts, Quantities, Values, Delivery Status)
 * 11. Payments (Tax Invoices, Paid Totals, Outstanding Balances, RTGS/NEFT Transaction Slips)
 * 12. Documents (GST Certificate, Drug License 20B/21B, Master Supply Agreement, COA, Invoices)
 * 13. Notes (Internal Account Manager logs, Quality comments, Timestamped memos)
 * 14. Communication History (Omnichannel touchpoints: Calls, WhatsApp, Emails, Meetings, Zoom conferences)
 */

(function(window) {
    'use strict';

    const STORAGE_KEY = 'disicure_clients_store_v1';

    const INITIAL_CLIENTS = [
        {
            id: 'CLI-1001',
            companyName: 'Maxcure Super Specialty Hospitals Ltd.',
            contactPerson: 'Dr. Arvind Swaminathan',
            designation: 'Director of Central Pharmacy & Procurement',
            mobile: '+91 98201 44521',
            whatsapp: '+91 98201 44521',
            email: 'arvind.procure@maxcurehospitals.com',
            accountStatus: 'Key Enterprise Account', // Active Account, Key Enterprise Account, Onboarding, Inactive
            businessType: 'Hospital & Healthcare Network',
            accountManager: 'Ayushi Khare',
            gstin: '27AAACM1234F1Z8',
            drugLicense: 'DL-MH-20B-789456 / 21B-789457',
            pan: 'AAACM1234F',
            creditLimit: '₹25,00,000',
            creditDays: 30,
            location: {
                address: 'Maxcure Corporate Medical Tower, Bandra Kurla Complex, G Block',
                city: 'Mumbai',
                state: 'Maharashtra',
                pincode: '400051',
                country: 'India'
            },
            requirements: [
                {
                    reqId: 'REQ-MAX-01',
                    title: 'ICU & Emergency Antibiotics Annual Supply',
                    category: 'Hospital Institutional Supply',
                    specifications: 'Disicef-1000 (Ceftriaxone 1g Vials + WFI), Disimol-IV 100ml Infusion',
                    batchSize: '30,000 Vials/mo + 15,000 IV Bottles/mo',
                    status: 'Active Fulfillment',
                    targetDate: '2026-11-15',
                    budget: '₹28,50,000'
                },
                {
                    reqId: 'REQ-MAX-02',
                    title: 'Post-Operative Analgesic & Anti-inflammatory Tablets',
                    category: 'Tablets & Capsules',
                    specifications: 'Disimol-SP (Aceclofenac 100mg + Paracetamol 325mg + Serratiopeptidase 15mg)',
                    batchSize: '1,00,000 Tablets/quarter',
                    status: 'Delivered / Contract Renewed',
                    targetDate: '2026-12-01',
                    budget: '₹12,00,000'
                }
            ],
            productsServices: [
                {
                    prodId: 'PRD-CLI-01',
                    name: 'Disicef-1000 (Ceftriaxone 1000mg Injection USP)',
                    category: 'Injectables & Infusions',
                    form: 'Vial with WFI (Sterile Pack)',
                    unitPrice: '₹84.50 / vial',
                    monthlyVolume: '25,000 Vials',
                    activeContract: true
                },
                {
                    prodId: 'PRD-CLI-02',
                    name: 'Disimol-SP Tablets (Aceclofenac + Para + Serratiopeptidase)',
                    category: 'Solid Oral Dosage',
                    form: 'Alu-Alu Strip 10x10',
                    unitPrice: '₹3.80 / tablet',
                    monthlyVolume: '80,000 Tablets',
                    activeContract: true
                },
                {
                    prodId: 'SRV-CLI-01',
                    name: 'Hospital Private-Label Packaging & Barcoded Lot Tracing',
                    category: 'Value-Added Services',
                    form: 'Custom QR/Barcode Labeling for Hospital Inventory',
                    unitPrice: 'Included in Contract',
                    monthlyVolume: 'All Deliveries',
                    activeContract: true
                }
            ],
            leads: [
                {
                    leadId: 'LD-PRT-1003',
                    inquiryDate: '2026-08-14',
                    requirement: 'Hospital Injectables & Antibiotics Rate Contract',
                    status: 'Converted',
                    value: 1850000,
                    valueFormatted: '₹18,50,000',
                    originPartner: 'Amit Verma (MedTech Sales Consultancy)'
                },
                {
                    leadId: 'LD-MAX-882',
                    inquiryDate: '2026-06-10',
                    requirement: 'Direct Hospital Tender Inquiry',
                    status: 'Converted',
                    value: 2200000,
                    valueFormatted: '₹22,00,000',
                    originPartner: 'Direct Institutional Channel'
                }
            ],
            orders: [
                {
                    orderId: 'ORD-MAX-2026-01',
                    poNumber: 'PO-MAX-26-9901',
                    orderDate: '2026-09-10',
                    deliveryDate: '2026-10-18',
                    items: 'Disicef-1000 (25,000 Vials), Disimol-SP (1,00,000 Tabs)',
                    totalAmount: 2492500,
                    totalFormatted: '₹24,92,500',
                    status: 'Dispatched / In Transit',
                    paymentStatus: 'Advance Paid (70%)'
                },
                {
                    orderId: 'ORD-MAX-2026-02',
                    poNumber: 'PO-MAX-26-8840',
                    orderDate: '2026-07-22',
                    deliveryDate: '2026-08-15',
                    items: 'Disimol-IV 100ml Infusion (15,000 Bottles)',
                    totalAmount: 1557500,
                    totalFormatted: '₹15,57,500',
                    status: 'Delivered & Accepted',
                    paymentStatus: 'Fully Paid'
                }
            ],
            payments: [
                {
                    invoiceId: 'INV-2026-MAX-01',
                    poNumber: 'PO-MAX-26-9901',
                    invDate: '2026-09-12',
                    dueDate: '2026-10-25',
                    totalAmount: 2492500,
                    paidAmount: 1744750,
                    balanceDue: 747750,
                    status: 'Partially Paid',
                    paymentMode: 'RTGS / NEFT',
                    transactions: [
                        {
                            txId: 'TX-MAX-901',
                            date: '2026-09-14',
                            amount: 1744750,
                            amountFormatted: '₹17,44,750',
                            mode: 'HDFC Bank RTGS',
                            refNo: 'HDFCR520260914008291',
                            status: 'Verified & Credited'
                        }
                    ]
                },
                {
                    invoiceId: 'INV-2026-MAX-02',
                    poNumber: 'PO-MAX-26-8840',
                    invDate: '2026-07-24',
                    dueDate: '2026-08-20',
                    totalAmount: 1557500,
                    paidAmount: 1557500,
                    balanceDue: 0,
                    status: 'Fully Paid',
                    paymentMode: 'NEFT Transfer',
                    transactions: [
                        {
                            txId: 'TX-MAX-772',
                            date: '2026-08-18',
                            amount: 1557500,
                            amountFormatted: '₹15,57,500',
                            mode: 'ICICI Bank NEFT',
                            refNo: 'ICICIN2026081899102',
                            status: 'Verified & Credited'
                        }
                    ]
                }
            ],
            documents: [
                {
                    docId: 'CDOC-MAX-01',
                    title: 'GST Registration Certificate (Form REG-06)',
                    category: 'Tax & Compliance',
                    fileName: 'Maxcure_GST_Registration_27AAACM.pdf',
                    uploadDate: '2026-07-10',
                    fileSize: '1.4 MB',
                    verified: true,
                    verifiedBy: 'Compliance Officer'
                },
                {
                    docId: 'CDOC-MAX-02',
                    title: 'Wholesale Drug License Form 20B & 21B',
                    category: 'Regulatory Licenses',
                    fileName: 'Maxcure_Drug_License_20B_21B.pdf',
                    uploadDate: '2026-07-10',
                    fileSize: '2.3 MB',
                    verified: true,
                    verifiedBy: 'Quality Assurance Head'
                },
                {
                    docId: 'CDOC-MAX-03',
                    title: 'Annual Rate Contract & Master Supply Agreement (Signed)',
                    category: 'Legal Contracts & MSA',
                    fileName: 'Disicure_Maxcure_MSA_Contract_2026.pdf',
                    uploadDate: '2026-07-15',
                    fileSize: '4.8 MB',
                    verified: true,
                    verifiedBy: 'Director'
                },
                {
                    docId: 'CDOC-MAX-04',
                    title: 'Certificate of Analysis (COA) - Batch #DC-902',
                    category: 'Quality & Test Reports',
                    fileName: 'COA_Disicef1000_Batch_DC902.pdf',
                    uploadDate: '2026-09-18',
                    fileSize: '890 KB',
                    verified: true,
                    verifiedBy: 'Senior QC Analyst'
                }
            ],
            notes: [
                {
                    noteId: 'NOT-MAX-01',
                    date: '2026-10-04 14:30',
                    author: 'Ayushi Khare',
                    tag: 'Procurement Priority',
                    text: 'Dr. Arvind requested priority dispatch for Batch #DC-903 due to seasonal respiratory infection surge. Warehouse informed to prep 15,000 vials by Oct 12.'
                },
                {
                    noteId: 'NOT-MAX-02',
                    date: '2026-09-14 10:15',
                    author: 'Accounts Lead',
                    tag: 'Payment Clearance',
                    text: 'Advance of ₹17,44,750 credited via RTGS for PO-MAX-26-9901. Remaining balance ₹7,47,750 payable upon delivery inspection.'
                }
            ],
            communicationHistory: [
                {
                    commId: 'COMM-MAX-01',
                    type: 'Phone Call',
                    date: '2026-10-04 11:20',
                    contactPerson: 'Dr. Arvind Swaminathan',
                    summary: 'Reviewed Q4 procurement volume expansion and discussed adding Disipod-200 to their ICU formulary.',
                    nextAction: 'Send revised price quote and stability study data by Oct 10.',
                    loggedBy: 'Sales Director'
                },
                {
                    commId: 'COMM-MAX-02',
                    type: 'WhatsApp Message',
                    date: '2026-09-28 16:40',
                    contactPerson: 'Mr. Ramesh (Store In-Charge)',
                    summary: 'Shared live GPS tracking link for consignment #DC-LR-8921 dispatched from Baddi plant.',
                    nextAction: 'Confirm receipt and unloading at Mumbai warehouse.',
                    loggedBy: 'Logistics Executive'
                },
                {
                    commId: 'COMM-MAX-03',
                    type: 'In-Person Meeting',
                    date: '2026-09-05 14:00',
                    contactPerson: 'Procurement Committee & Dr. Arvind',
                    summary: 'Formal presentation of Disicure GMP sterile injectable facility and quality assurance standards. Finalized 1-year rate contract.',
                    nextAction: 'Execute signed MSA documents and receive initial PO.',
                    loggedBy: 'Director of Business Dev'
                },
                {
                    commId: 'COMM-MAX-04',
                    type: 'Email Communication',
                    date: '2026-09-10 09:45',
                    contactPerson: 'finance@maxcurehospitals.com',
                    summary: 'Received official Purchase Order PO-MAX-26-9901 for ₹24,92,500 with billing details.',
                    nextAction: 'Issue Proforma Invoice and schedule batch production.',
                    loggedBy: 'Commercial Team'
                }
            ]
        },
        {
            id: 'CLI-1002',
            companyName: 'Apex Lifesciences PCD Franchise',
            contactPerson: 'Suresh Kumar Aggarwal',
            designation: 'Managing Director & Principal Franchisee',
            mobile: '+91 94140 22391',
            whatsapp: '+91 94140 22391',
            email: 'suresh@apexlifesciences.in',
            accountStatus: 'Active Account',
            businessType: 'PCD Pharma Franchise',
            accountManager: 'Vikram Mehta',
            gstin: '08AAHCA4456K1ZU',
            drugLicense: 'DL-RJ-20B-112233 / 21B-112234',
            pan: 'AAHCA4456K',
            creditLimit: '₹10,00,000',
            creditDays: 21,
            location: {
                address: 'Plot 44, Industrial Area Phase II, Mansarovar',
                city: 'Jaipur',
                state: 'Rajasthan',
                pincode: '302020',
                country: 'India'
            },
            requirements: [
                {
                    reqId: 'REQ-APX-01',
                    title: 'PCD Exclusive Monopoly Distribution for Rajasthan East',
                    category: 'PCD Pharma Franchise',
                    specifications: 'Full range: Antibiotics, PPI Antacids, Multivitamin syrups, Gynae softgels',
                    batchSize: 'Monthly recurring orders ₹3,50,000+',
                    status: 'Active Fulfillment',
                    targetDate: '2026-10-30',
                    budget: '₹15,00,000'
                }
            ],
            productsServices: [
                {
                    prodId: 'PRD-APX-01',
                    name: 'Disipan-DSR (Pantoprazole 40mg + Domperidone 30mg SR)',
                    category: 'Gastroenterology',
                    form: 'Alu-Alu Strip 10x10',
                    unitPrice: '₹4.20 / cap',
                    monthlyVolume: '25,000 Capsules',
                    activeContract: true
                },
                {
                    prodId: 'PRD-APX-02',
                    name: 'Disivita Syrup (Multivitamin + Minerals + L-Lysine 200ml)',
                    category: 'Nutraceuticals & Syrups',
                    form: 'Pet Bottle with Carton 200ml',
                    unitPrice: '₹42.00 / bottle',
                    monthlyVolume: '3,000 Bottles',
                    activeContract: true
                },
                {
                    prodId: 'SRV-APX-01',
                    name: 'Visual Aids, LBLs, MR Bags & Doctor Gift Kits Marketing Support',
                    category: 'Promotional Input Support',
                    form: 'Complete MR Launch Kit',
                    unitPrice: 'Complimentary on Target',
                    monthlyVolume: '15 Kits/quarter',
                    activeContract: true
                }
            ],
            leads: [
                {
                    leadId: 'LD-PRT-1002',
                    inquiryDate: '2026-08-01',
                    requirement: 'PCD Franchise Rights for Jaipur & Ajmer Divisions',
                    status: 'Converted',
                    value: 650000,
                    valueFormatted: '₹6,50,000',
                    originPartner: 'Priya Sharma (HealthPulse Agency)'
                }
            ],
            orders: [
                {
                    orderId: 'ORD-APX-2026-01',
                    poNumber: 'PO-APX-RJ-04',
                    orderDate: '2026-09-18',
                    deliveryDate: '2026-10-05',
                    items: 'Disipan-DSR (25,000 Caps), Disivita Syrup (3,000 Bottles)',
                    totalAmount: 631000,
                    totalFormatted: '₹6,31,000',
                    status: 'Delivered & Accepted',
                    paymentStatus: 'Fully Paid'
                }
            ],
            payments: [
                {
                    invoiceId: 'INV-2026-APX-01',
                    poNumber: 'PO-APX-RJ-04',
                    invDate: '2026-09-20',
                    dueDate: '2026-10-10',
                    totalAmount: 631000,
                    paidAmount: 631000,
                    balanceDue: 0,
                    status: 'Fully Paid',
                    paymentMode: 'Bank Transfer (IMPS)',
                    transactions: [
                        {
                            txId: 'TX-APX-101',
                            date: '2026-09-22',
                            amount: 631000,
                            amountFormatted: '₹6,31,000',
                            mode: 'SBI IMPS',
                            refNo: 'SBI092288192301',
                            status: 'Verified & Credited'
                        }
                    ]
                }
            ],
            documents: [
                {
                    docId: 'CDOC-APX-01',
                    title: 'PCD Franchise Monopoly Agreement Rajasthan',
                    category: 'Legal Contracts & MSA',
                    fileName: 'Apex_PCD_Agreement_Rajasthan_2026.pdf',
                    uploadDate: '2026-08-10',
                    fileSize: '3.2 MB',
                    verified: true,
                    verifiedBy: 'Legal Advisor'
                },
                {
                    docId: 'CDOC-APX-02',
                    title: 'Drug License 20B/21B Rajasthan',
                    category: 'Regulatory Licenses',
                    fileName: 'Apex_Drug_License_Jaipur.pdf',
                    uploadDate: '2026-08-05',
                    fileSize: '1.8 MB',
                    verified: true,
                    verifiedBy: 'Compliance Officer'
                }
            ],
            notes: [
                {
                    noteId: 'NOT-APX-01',
                    date: '2026-09-25 11:00',
                    author: 'Vikram Mehta',
                    tag: 'Market Feedback',
                    text: 'Disipan-DSR received strong acceptance from physicians in Jaipur civil lines. Franchisee planning to add cardiac range in Q1 2027.'
                }
            ],
            communicationHistory: [
                {
                    commId: 'COMM-APX-01',
                    type: 'Phone Call',
                    date: '2026-10-02 15:30',
                    contactPerson: 'Suresh Aggarwal',
                    summary: 'Discussed replenishment order for October Diwali festive season.',
                    nextAction: 'Prepare Proforma for 50,000 caps Disipan-DSR.',
                    loggedBy: 'Sales Rep'
                },
                {
                    commId: 'COMM-APX-02',
                    type: 'WhatsApp Message',
                    date: '2026-09-24 18:15',
                    contactPerson: 'Suresh Aggarwal',
                    summary: 'Sent high-resolution product visual aid PDFs for doctor detailing.',
                    nextAction: 'Dispatch printed visual aids with next consignment.',
                    loggedBy: 'Marketing Executive'
                }
            ]
        },
        {
            id: 'CLI-1003',
            companyName: 'Apollo Medplus Retail Chain Pharmacies',
            contactPerson: 'Rajesh Nambiar',
            designation: 'Vice President - Trade Sales & Channel Distribution',
            mobile: '+91 98450 11928',
            whatsapp: '+91 98450 11928',
            email: 'rajesh.nambiar@apollomedplus.com',
            accountStatus: 'Key Enterprise Account',
            businessType: 'Retail & Chain Pharmacy',
            accountManager: 'Ayushi Khare',
            gstin: '29AABCA9876M1Z2',
            drugLicense: 'DL-KA-20B-998811 / 21B-998812',
            pan: 'AABCA9876M',
            creditLimit: '₹30,00,000',
            creditDays: 45,
            location: {
                address: 'Medplus Logistics Hub, Hosur Main Road, Electronic City Phase 1',
                city: 'Bengaluru',
                state: 'Karnataka',
                pincode: '560100',
                country: 'India'
            },
            requirements: [
                {
                    reqId: 'REQ-APL-01',
                    title: 'Pan-South India Retail Shelf Placement for OTC & Pain Care',
                    category: 'Retail Distribution',
                    specifications: 'Disimol-650 Tablets, DisiCof Cough Formula, DisiPro Protein Supplements',
                    batchSize: '500 Retail Outlets Supply',
                    status: 'Active Fulfillment',
                    targetDate: '2026-11-20',
                    budget: '₹35,00,000'
                }
            ],
            productsServices: [
                {
                    prodId: 'PRD-APL-01',
                    name: 'Disimol-650 (Paracetamol 650mg Fast-Action)',
                    category: 'OTC & General Analgesics',
                    form: 'Blister 15 Tablets Pack',
                    unitPrice: '₹1.95 / tablet',
                    monthlyVolume: '2,50,000 Tablets',
                    activeContract: true
                },
                {
                    prodId: 'PRD-APL-02',
                    name: 'DisiCof-DX Honey Herbal Syrup (100ml)',
                    category: 'Respiratory Care',
                    form: 'Amber PET 100ml Bottle',
                    unitPrice: '₹38.50 / bottle',
                    monthlyVolume: '15,000 Bottles',
                    activeContract: true
                }
            ],
            leads: [
                {
                    leadId: 'LD-PRT-1001',
                    inquiryDate: '2026-07-28',
                    requirement: 'South India Retail Chain Distribution Contract',
                    status: 'Converted',
                    value: 1200000,
                    valueFormatted: '₹12,00,000',
                    originPartner: 'Rajesh Nambiar (Apollo Distribution)'
                }
            ],
            orders: [
                {
                    orderId: 'ORD-APL-2026-01',
                    poNumber: 'PO-APL-KA-881',
                    orderDate: '2026-08-20',
                    deliveryDate: '2026-09-15',
                    items: 'Disimol-650 (2,50,000 Tabs), DisiCof-DX (15,000 Bottles)',
                    totalAmount: 1065000,
                    totalFormatted: '₹10,65,000',
                    status: 'Delivered & Accepted',
                    paymentStatus: 'Fully Paid'
                }
            ],
            payments: [
                {
                    invoiceId: 'INV-2026-APL-01',
                    poNumber: 'PO-APL-KA-881',
                    invDate: '2026-08-25',
                    dueDate: '2026-10-10',
                    totalAmount: 1065000,
                    paidAmount: 1065000,
                    balanceDue: 0,
                    status: 'Fully Paid',
                    paymentMode: 'Corporate RTGS',
                    transactions: [
                        {
                            txId: 'TX-APL-891',
                            date: '2026-09-30',
                            amount: 1065000,
                            amountFormatted: '₹10,65,000',
                            mode: 'Axis Bank RTGS',
                            refNo: 'UTIBR5202609308192',
                            status: 'Verified & Credited'
                        }
                    ]
                }
            ],
            documents: [
                {
                    docId: 'CDOC-APL-01',
                    title: 'Apollo Medplus Vendor Code Registration Form',
                    category: 'Vendor Onboarding',
                    fileName: 'Apollo_Vendor_Registration_Verified.pdf',
                    uploadDate: '2026-08-01',
                    fileSize: '2.5 MB',
                    verified: true,
                    verifiedBy: 'Commercial Lead'
                },
                {
                    docId: 'CDOC-APL-02',
                    title: 'Pan-India Chain Drug License Certification',
                    category: 'Regulatory Licenses',
                    fileName: 'Apollo_Central_Drug_License.pdf',
                    uploadDate: '2026-08-01',
                    fileSize: '4.1 MB',
                    verified: true,
                    verifiedBy: 'Compliance Officer'
                }
            ],
            notes: [
                {
                    noteId: 'NOT-APL-01',
                    date: '2026-10-01 16:20',
                    author: 'Ayushi Khare',
                    tag: 'Expansion Milestone',
                    text: 'Apollo procurement team confirmed expanding shelf placement from 500 to 1,200 retail stores across Karnataka, Tamil Nadu, and Telangana in Q4.'
                }
            ],
            communicationHistory: [
                {
                    commId: 'COMM-APL-01',
                    type: 'Zoom Video Call',
                    date: '2026-10-03 14:00',
                    contactPerson: 'Rajesh Nambiar & Category Managers',
                    summary: 'Reviewed 30-day sell-through figures for Disimol-650. Stock rotation velocity was 92%.',
                    nextAction: 'Lock in Q4 festive inventory dispatch schedule.',
                    loggedBy: 'Executive Team'
                }
            ]
        },
        {
            id: 'CLI-1004',
            companyName: 'Uttarakhand State Medical Supplies Corp.',
            contactPerson: 'Er. Kailash Chandra Joshi',
            designation: 'Joint Director - Institutional Healthcare Procurement',
            mobile: '+91 94120 77610',
            whatsapp: '+91 94120 77610',
            email: 'procurement@usmsc.gov.in',
            accountStatus: 'Active Account',
            businessType: 'Government & Institutional Healthcare',
            accountManager: 'Dr. Vivek Sharma',
            gstin: '05AAAGU1928K1ZB',
            drugLicense: 'DL-UK-GOVT-INST-2026-09',
            pan: 'AAAGU1928K',
            creditLimit: '₹50,00,000',
            creditDays: 60,
            location: {
                address: 'Health Directorate Complex, Sahastradhara Road',
                city: 'Dehradun',
                state: 'Uttarakhand',
                pincode: '248001',
                country: 'India'
            },
            requirements: [
                {
                    reqId: 'REQ-GOV-01',
                    title: 'State Essential Drug List (EDL) Hospital Tender 2026-27',
                    category: 'Government Institutional Tender',
                    specifications: 'Essential NSAIDs, Antibiotics, IV Fluids & ORS Sachets',
                    batchSize: 'Quarterly State Supply (13 Districts)',
                    status: 'Active Fulfillment',
                    targetDate: '2026-12-31',
                    budget: '₹45,00,000'
                }
            ],
            productsServices: [
                {
                    prodId: 'PRD-GOV-01',
                    name: 'Disimol-500 (Paracetamol Tablets IP 500mg Govt Supply)',
                    category: 'Government EDL Supply',
                    form: 'Govt Pack Strip 10x10 (Not For Sale)',
                    unitPrice: '₹0.98 / tablet',
                    monthlyVolume: '5,00,000 Tablets',
                    activeContract: true
                },
                {
                    prodId: 'PRD-GOV-02',
                    name: 'Disi-ORS Electrolyte Sachet (WHO Formula 21.8g)',
                    category: 'Oral Rehydration Solution',
                    form: 'Triple Laminate Sachet',
                    unitPrice: '₹7.20 / sachet',
                    monthlyVolume: '50,000 Sachets',
                    activeContract: true
                }
            ],
            leads: [
                {
                    leadId: 'LD-GOV-441',
                    inquiryDate: '2026-06-20',
                    requirement: 'State EDL Essential Medicine Tender Batch 4',
                    status: 'Converted',
                    value: 4500000,
                    valueFormatted: '₹45,00,000',
                    originPartner: 'Govt Tenders Department'
                }
            ],
            orders: [
                {
                    orderId: 'ORD-GOV-2026-01',
                    poNumber: 'PO-USMSC-TNDR-2026-90',
                    orderDate: '2026-08-10',
                    deliveryDate: '2026-10-25',
                    items: 'Disimol-500 Govt Pack (10,00,000 Tabs), Disi-ORS (1,00,000 Sachets)',
                    totalAmount: 1700000,
                    totalFormatted: '₹17,00,000',
                    status: 'In Production / Quality Testing',
                    paymentStatus: 'Against LC / Treasury Bill'
                }
            ],
            payments: [
                {
                    invoiceId: 'INV-2026-GOV-01',
                    poNumber: 'PO-USMSC-TNDR-2026-90',
                    invDate: '2026-08-15',
                    dueDate: '2026-11-15',
                    totalAmount: 1700000,
                    paidAmount: 850000,
                    balanceDue: 850000,
                    status: 'Partially Paid',
                    paymentMode: 'Govt Treasury e-Challan / PFMS',
                    transactions: [
                        {
                            txId: 'TX-GOV-091',
                            date: '2026-09-02',
                            amount: 850000,
                            amountFormatted: '₹8,50,000',
                            mode: 'PFMS Treasury Disbursal',
                            refNo: 'PFMSUK202609028819',
                            status: 'Verified & Credited'
                        }
                    ]
                }
            ],
            documents: [
                {
                    docId: 'CDOC-GOV-01',
                    title: 'Govt Tender Award Letter & Rate Contract Sanction',
                    category: 'Tender Sanction Order',
                    fileName: 'USMSC_Tender_Sanction_Order_2026.pdf',
                    uploadDate: '2026-07-28',
                    fileSize: '5.6 MB',
                    verified: true,
                    verifiedBy: 'Managing Director'
                },
                {
                    docId: 'CDOC-GOV-02',
                    title: 'WHO-GMP & Schedule M Compliance Certificate',
                    category: 'Compliance Audit',
                    fileName: 'Disicure_WHO_GMP_Compliance_Cert.pdf',
                    uploadDate: '2026-07-25',
                    fileSize: '3.1 MB',
                    verified: true,
                    verifiedBy: 'QA Director'
                }
            ],
            notes: [
                {
                    noteId: 'NOT-GOV-01',
                    date: '2026-09-20 15:00',
                    author: 'Dr. Vivek Sharma',
                    tag: 'Tender Compliance',
                    text: 'All 10,00,000 Disimol-500 tablets are printed with "Uttarakhand Govt Supply - Not For Sale" red striping as per tender specifications.'
                }
            ],
            communicationHistory: [
                {
                    commId: 'COMM-GOV-01',
                    type: 'In-Person Meeting',
                    date: '2026-09-18 11:30',
                    contactPerson: 'Er. K. C. Joshi & QC Committee',
                    summary: 'Pre-dispatch batch inspection completed at Dehradun central store. Samples passed all pharmacopoeia assays.',
                    nextAction: 'Release final dispatch clearance certificate.',
                    loggedBy: 'Regulatory Lead'
                }
            ]
        },
        {
            id: 'CLI-1005',
            companyName: 'Zydus Care Bioceuticals Pvt. Ltd.',
            contactPerson: 'Ananya Deshmukh',
            designation: 'Head of Third-Party Outsourcing & Tech Transfer',
            mobile: '+91 97245 88210',
            whatsapp: '+91 97245 88210',
            email: 'ananya.outsourcing@zydusbio.com',
            accountStatus: 'Onboarding',
            businessType: 'Contract Pharma Manufacturing & Tech Transfer',
            accountManager: 'Ayushi Khare',
            gstin: '24AAACZ7781N1Z0',
            drugLicense: 'DL-GJ-20B-667788 / 21B-667789',
            pan: 'AAACZ7781N',
            creditLimit: '₹20,00,000',
            creditDays: 30,
            location: {
                address: 'Zydus Corporate Park, Sarkhej-Bavla Highway, Changodar',
                city: 'Ahmedabad',
                state: 'Gujarat',
                pincode: '382213',
                country: 'India'
            },
            requirements: [
                {
                    reqId: 'REQ-ZYD-01',
                    title: 'Third-Party Contract Manufacturing for Gynae Probiotic Softgels',
                    category: 'Contract Manufacturing',
                    specifications: 'Probiotic + Prebiotic + FOS capsules in moisture-proof Alu-Alu blister',
                    batchSize: '5,00,000 Softgels / batch',
                    status: 'Pilot Batch Validation',
                    targetDate: '2026-11-30',
                    budget: '₹22,00,000'
                }
            ],
            productsServices: [
                {
                    prodId: 'PRD-ZYD-01',
                    name: 'Third-Party Softgel Capsule Formulation & Tech Transfer',
                    category: 'Contract Manufacturing',
                    form: 'Custom Softgel Formulation',
                    unitPrice: '₹2.85 / softgel',
                    monthlyVolume: '5,00,000 Softgels',
                    activeContract: true
                }
            ],
            leads: [
                {
                    leadId: 'LD-ZYD-109',
                    inquiryDate: '2026-09-01',
                    requirement: 'Contract Manufacturing Softgel Facility Audit',
                    status: 'Qualified / In Discussion',
                    value: 2200000,
                    valueFormatted: '₹22,00,000',
                    originPartner: 'Direct Corporate Channel'
                }
            ],
            orders: [
                {
                    orderId: 'ORD-ZYD-2026-01',
                    poNumber: 'PO-ZYD-TECH-01',
                    orderDate: '2026-09-25',
                    deliveryDate: '2026-11-10',
                    items: 'Validation Pilot Batch #VAL-01 (1,00,000 Softgels)',
                    totalAmount: 385000,
                    totalFormatted: '₹3,85,000',
                    status: 'In Production / Quality Testing',
                    paymentStatus: '100% Advance Received'
                }
            ],
            payments: [
                {
                    invoiceId: 'INV-2026-ZYD-01',
                    poNumber: 'PO-ZYD-TECH-01',
                    invDate: '2026-09-26',
                    dueDate: '2026-10-05',
                    totalAmount: 385000,
                    paidAmount: 385000,
                    balanceDue: 0,
                    status: 'Fully Paid',
                    paymentMode: 'HDFC RTGS',
                    transactions: [
                        {
                            txId: 'TX-ZYD-01',
                            date: '2026-09-27',
                            amount: 385000,
                            amountFormatted: '₹3,85,000',
                            mode: 'RTGS Transfer',
                            refNo: 'HDFCR520260927881',
                            status: 'Verified & Credited'
                        }
                    ]
                }
            ],
            documents: [
                {
                    docId: 'CDOC-ZYD-01',
                    title: 'Non-Disclosure Agreement (NDA) & Formulation Tech Transfer',
                    category: 'Legal Contracts & MSA',
                    fileName: 'Zydus_Disicure_NDA_Signed.pdf',
                    uploadDate: '2026-09-05',
                    fileSize: '2.9 MB',
                    verified: true,
                    verifiedBy: 'Legal Head'
                },
                {
                    docId: 'CDOC-ZYD-02',
                    title: 'Zydus Vendor Quality Audit Assessment Report (Score: 96%)',
                    category: 'Quality & Test Reports',
                    fileName: 'Zydus_Audit_Report_Baddi_Facility.pdf',
                    uploadDate: '2026-09-15',
                    fileSize: '4.2 MB',
                    verified: true,
                    verifiedBy: 'QA Director'
                }
            ],
            notes: [
                {
                    noteId: 'NOT-ZYD-01',
                    date: '2026-09-28 10:30',
                    author: 'QA Lead',
                    tag: 'Tech Transfer',
                    text: 'Trial blend for pilot batch passed disintegration and assay tests with 99.8% uniformity.'
                }
            ],
            communicationHistory: [
                {
                    commId: 'COMM-ZYD-01',
                    type: 'Email Communication',
                    date: '2026-10-02 09:15',
                    contactPerson: 'Ananya Deshmukh',
                    summary: 'Shared analytical method validation protocol (AMVP) for HPLC analysis.',
                    nextAction: 'Receive formal sign-off from Zydus analytical head.',
                    loggedBy: 'QC Lab Manager'
                },
                {
                    commId: 'COMM-ZYD-02',
                    type: 'Zoom Video Call',
                    date: '2026-09-12 16:00',
                    contactPerson: 'Tech Transfer Team',
                    summary: 'Joint review of pilot batch stability study protocol and blister packaging specs.',
                    nextAction: 'Finalize packaging artwork.',
                    loggedBy: 'Plant Head'
                }
            ]
        }
    ];

    const DisicureClients = {
        _clients: null,

        _initStore: function() {
            if (this._clients) return this._clients;
            try {
                const stored = localStorage.getItem(STORAGE_KEY);
                if (stored) {
                    this._clients = JSON.parse(stored);
                } else {
                    this._clients = JSON.parse(JSON.stringify(INITIAL_CLIENTS));
                    this._saveStore();
                }
            } catch (e) {
                console.error('[DisicureClients] Store init error:', e);
                this._clients = JSON.parse(JSON.stringify(INITIAL_CLIENTS));
            }
            return this._clients;
        },

        _saveStore: function() {
            try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(this._clients));
            } catch (e) {
                console.error('[DisicureClients] Store save error:', e);
            }
        },

        getAllClients: function() {
            return this._initStore();
        },

        getClientById: function(id) {
            const clients = this.getAllClients();
            return clients.find(c => c.id === id) || null;
        },

        addClient: function(clientData) {
            const clients = this.getAllClients();
            const nextNum = 1000 + clients.length + 1;
            const newId = `CLI-${nextNum}`;

            const newClient = {
                id: newId,
                companyName: clientData.companyName || 'Unnamed Pharma Client',
                contactPerson: clientData.contactPerson || 'Primary Contact',
                designation: clientData.designation || 'Business Head',
                mobile: clientData.mobile || '',
                whatsapp: clientData.whatsapp || clientData.mobile || '',
                email: clientData.email || '',
                accountStatus: clientData.accountStatus || 'Active Account',
                businessType: clientData.businessType || 'Healthcare Distributor',
                accountManager: clientData.accountManager || 'Ayushi Khare',
                gstin: clientData.gstin || '',
                drugLicense: clientData.drugLicense || '',
                pan: clientData.pan || '',
                creditLimit: clientData.creditLimit || '₹5,00,000',
                creditDays: parseInt(clientData.creditDays) || 30,
                location: {
                    address: clientData.address || '',
                    city: clientData.city || 'Dehradun',
                    state: clientData.state || 'Uttarakhand',
                    pincode: clientData.pincode || '',
                    country: 'India'
                },
                requirements: clientData.requirements || [],
                productsServices: clientData.productsServices || [],
                leads: clientData.leads || [],
                orders: clientData.orders || [],
                payments: clientData.payments || [],
                documents: clientData.documents || [],
                notes: clientData.notes || [
                    {
                        noteId: `NOT-${Date.now()}`,
                        date: new Date().toISOString().replace('T', ' ').substring(0, 16),
                        author: 'Admin',
                        tag: 'Account Created',
                        text: 'Client account registered into Disicure Enterprise CRM.'
                    }
                ],
                communicationHistory: clientData.communicationHistory || [
                    {
                        commId: `COMM-${Date.now()}`,
                        type: 'System Note',
                        date: new Date().toISOString().replace('T', ' ').substring(0, 16),
                        contactPerson: clientData.contactPerson || 'Contact',
                        summary: 'Initial client profile onboarded and KYC profile initialized.',
                        nextAction: 'Verify Drug License and GST documents.',
                        loggedBy: 'Admin'
                    }
                ]
            };

            clients.unshift(newClient);
            this._saveStore();
            return newClient;
        },

        updateClient: function(id, data) {
            const clients = this.getAllClients();
            const index = clients.findIndex(c => c.id === id);
            if (index === -1) return null;

            const existing = clients[index];
            clients[index] = {
                ...existing,
                ...data,
                location: {
                    ...existing.location,
                    ...(data.location || {})
                }
            };

            this._saveStore();
            return clients[index];
        },

        deleteClient: function(id) {
            let clients = this.getAllClients();
            const index = clients.findIndex(c => c.id === id);
            if (index === -1) return false;

            clients.splice(index, 1);
            this._clients = clients;
            this._saveStore();
            return true;
        },

        // Requirement Sub-records
        addClientRequirement: function(clientId, req) {
            const client = this.getClientById(clientId);
            if (!client) return false;
            if (!client.requirements) client.requirements = [];
            const reqId = `REQ-${Date.now().toString().slice(-4)}`;
            client.requirements.unshift({
                reqId: reqId,
                title: req.title || 'General Pharmaceutical Requirement',
                category: req.category || 'Third-Party Manufacturing',
                specifications: req.specifications || '',
                batchSize: req.batchSize || 'Standard Batch',
                status: req.status || 'Active Requirement',
                targetDate: req.targetDate || new Date().toISOString().split('T')[0],
                budget: req.budget || '₹5,00,000'
            });
            this._saveStore();
            return true;
        },

        // Products / Services Sub-records
        addClientProductService: function(clientId, prod) {
            const client = this.getClientById(clientId);
            if (!client) return false;
            if (!client.productsServices) client.productsServices = [];
            const prodId = `PRD-CLI-${Date.now().toString().slice(-4)}`;
            client.productsServices.unshift({
                prodId: prodId,
                name: prod.name || 'Pharmaceutical Formulation',
                category: prod.category || 'Oral Solid Dosage',
                form: prod.form || 'Tablets / Capsules',
                unitPrice: prod.unitPrice || '₹0.00',
                monthlyVolume: prod.monthlyVolume || '10,000 Units',
                activeContract: true
            });
            this._saveStore();
            return true;
        },

        // Orders / Business Sub-records
        addClientOrder: function(clientId, order) {
            const client = this.getClientById(clientId);
            if (!client) return false;
            if (!client.orders) client.orders = [];
            const orderId = `ORD-CLI-${Date.now().toString().slice(-4)}`;
            const amtNum = parseFloat(order.totalAmount) || 0;
            client.orders.unshift({
                orderId: orderId,
                poNumber: order.poNumber || `PO-DIR-${Date.now().toString().slice(-4)}`,
                orderDate: order.orderDate || new Date().toISOString().split('T')[0],
                deliveryDate: order.deliveryDate || '',
                items: order.items || 'Pharma Formulations Batch Supply',
                totalAmount: amtNum,
                totalFormatted: '₹' + amtNum.toLocaleString('en-IN'),
                status: order.status || 'In Production / Quality Testing',
                paymentStatus: order.paymentStatus || 'Pending Invoice'
            });
            this._saveStore();
            return true;
        },

        // Payments / Invoices Sub-records
        addClientPayment: function(clientId, payment) {
            const client = this.getClientById(clientId);
            if (!client) return false;
            if (!client.payments) client.payments = [];
            const invId = payment.invoiceId || `INV-2026-CLI-${Date.now().toString().slice(-4)}`;
            const totNum = parseFloat(payment.totalAmount) || 0;
            const paidNum = parseFloat(payment.paidAmount) || 0;
            const balDue = Math.max(0, totNum - paidNum);

            let status = 'Pending Payment';
            if (paidNum >= totNum && totNum > 0) status = 'Fully Paid';
            else if (paidNum > 0) status = 'Partially Paid';

            const newInv = {
                invoiceId: invId,
                poNumber: payment.poNumber || 'N/A',
                invDate: payment.invDate || new Date().toISOString().split('T')[0],
                dueDate: payment.dueDate || '',
                totalAmount: totNum,
                paidAmount: paidNum,
                balanceDue: balDue,
                status: status,
                paymentMode: payment.paymentMode || 'RTGS / NEFT Transfer',
                transactions: []
            };

            if (paidNum > 0) {
                newInv.transactions.push({
                    txId: `TX-${Date.now().toString().slice(-4)}`,
                    date: new Date().toISOString().split('T')[0],
                    amount: paidNum,
                    amountFormatted: '₹' + paidNum.toLocaleString('en-IN'),
                    mode: payment.paymentMode || 'Bank Transfer',
                    refNo: payment.refNo || `REF-${Date.now()}`,
                    status: 'Verified & Credited'
                });
            }

            client.payments.unshift(newInv);
            this._saveStore();
            return true;
        },

        // Record Transaction to Existing Invoice
        recordPaymentTransaction: function(clientId, invoiceId, txData) {
            const client = this.getClientById(clientId);
            if (!client || !client.payments) return false;
            const inv = client.payments.find(p => p.invoiceId === invoiceId);
            if (!inv) return false;

            const txAmt = parseFloat(txData.amount) || 0;
            inv.paidAmount = (inv.paidAmount || 0) + txAmt;
            inv.balanceDue = Math.max(0, inv.totalAmount - inv.paidAmount);

            if (inv.paidAmount >= inv.totalAmount) {
                inv.status = 'Fully Paid';
            } else if (inv.paidAmount > 0) {
                inv.status = 'Partially Paid';
            }

            if (!inv.transactions) inv.transactions = [];
            inv.transactions.unshift({
                txId: `TX-${Date.now().toString().slice(-4)}`,
                date: txData.date || new Date().toISOString().split('T')[0],
                amount: txAmt,
                amountFormatted: '₹' + txAmt.toLocaleString('en-IN'),
                mode: txData.mode || 'RTGS / NEFT Transfer',
                refNo: txData.refNo || `REF-${Date.now()}`,
                status: 'Verified & Credited'
            });

            this._saveStore();
            return true;
        },

        // Documents Sub-records
        addClientDocument: function(clientId, doc) {
            const client = this.getClientById(clientId);
            if (!client) return false;
            if (!client.documents) client.documents = [];
            const docId = `CDOC-${Date.now().toString().slice(-4)}`;
            client.documents.unshift({
                docId: docId,
                title: doc.title || 'Compliance Document',
                category: doc.category || 'Regulatory & Tax',
                fileName: doc.fileName || 'Document.pdf',
                uploadDate: new Date().toISOString().split('T')[0],
                fileSize: doc.fileSize || '1.2 MB',
                verified: true,
                verifiedBy: doc.verifiedBy || 'Admin'
            });
            this._saveStore();
            return true;
        },

        // Notes Sub-records
        addClientNote: function(clientId, noteText, author, tag) {
            const client = this.getClientById(clientId);
            if (!client) return false;
            if (!client.notes) client.notes = [];
            client.notes.unshift({
                noteId: `NOT-${Date.now().toString().slice(-4)}`,
                date: new Date().toISOString().replace('T', ' ').substring(0, 16),
                author: author || 'Admin',
                tag: tag || 'General Note',
                text: noteText
            });
            this._saveStore();
            return true;
        },

        // Communication History Sub-records
        addClientCommunication: function(clientId, comm) {
            const client = this.getClientById(clientId);
            if (!client) return false;
            if (!client.communicationHistory) client.communicationHistory = [];
            client.communicationHistory.unshift({
                commId: `COMM-${Date.now().toString().slice(-4)}`,
                type: comm.type || 'Phone Call',
                date: comm.date || new Date().toISOString().replace('T', ' ').substring(0, 16),
                contactPerson: comm.contactPerson || client.contactPerson || 'Contact',
                summary: comm.summary || '',
                nextAction: comm.nextAction || '',
                loggedBy: comm.loggedBy || 'Admin'
            });
            this._saveStore();
            return true;
        },

        // Summary Analytics & KPIs
        getClientSummaryKPIs: function() {
            const clients = this.getAllClients();
            let totalClients = clients.length;
            let activeAccounts = 0;
            let keyAccounts = 0;
            let onboardingAccounts = 0;
            let totalBusinessValue = 0;
            let totalReceived = 0;
            let totalOutstanding = 0;

            clients.forEach(c => {
                if (c.accountStatus === 'Active Account' || c.accountStatus === 'Key Enterprise Account') activeAccounts++;
                if (c.accountStatus === 'Key Enterprise Account') keyAccounts++;
                if (c.accountStatus === 'Onboarding') onboardingAccounts++;

                // Orders / Business total
                if (c.orders && c.orders.length > 0) {
                    c.orders.forEach(o => {
                        totalBusinessValue += (o.totalAmount || 0);
                    });
                }

                // Payments breakdown
                if (c.payments && c.payments.length > 0) {
                    c.payments.forEach(p => {
                        totalReceived += (p.paidAmount || 0);
                        totalOutstanding += (p.balanceDue || 0);
                    });
                }
            });

            return {
                totalClients,
                activeAccounts,
                keyAccounts,
                onboardingAccounts,
                totalBusinessValue,
                totalBusinessFormatted: '₹' + totalBusinessValue.toLocaleString('en-IN'),
                totalReceived,
                totalReceivedFormatted: '₹' + totalReceived.toLocaleString('en-IN'),
                totalOutstanding,
                totalOutstandingFormatted: '₹' + totalOutstanding.toLocaleString('en-IN')
            };
        }
    };

    window.DisicureClients = DisicureClients;

})(window);
