import express from 'express';
import WhiteCustomer from '../models/WhiteCustomer.js';
import WhiteGoldTouch from '../models/WhiteGoldTouch.js';
import WhiteInvoice from '../models/WhiteInvoice.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.get('/dashboard', authMiddleware, async (req, res) => {
try {
const totalCustomers = await WhiteCustomer.countDocuments();
const totalInvoices = await WhiteInvoice.countDocuments();
const pendingInvoices = await WhiteInvoice.countDocuments({ status: 'PENDING' });
const invoices = await WhiteInvoice.find({});
const totalRevenue = invoices.reduce((sum, inv) => sum + inv.totalAmount, 0);
const totalPaid = invoices.reduce((sum, inv) => sum + inv.paidAmount, 0);
res.json({ totalCustomers, totalInvoices, pendingInvoices, totalRevenue, pendingBalance: totalRevenue - totalPaid, goldStock: 3245.5, silverStock: 18750.0 });
} catch (error) { res.status(500).json({ message: error.message }); }
});

router.get('/customers', authMiddleware, async (req, res) => {
try { const customers = await WhiteCustomer.find().sort({ createdAt: -1 }); res.json(customers); }
catch (error) { res.status(500).json({ message: error.message }); }
});

router.post('/customers', authMiddleware, async (req, res) => {
try {
const customerData = { ...req.body, customerId: `CUST-${Date.now()}`, createdBy: req.user.id };
const customer = new WhiteCustomer(customerData);
await customer.save();
res.status(201).json(customer);
} catch (error) { res.status(500).json({ message: error.message }); }
});

router.get('/gold-touch', authMiddleware, async (req, res) => {
try { const entries = await WhiteGoldTouch.find().populate('customer', 'name mobile').sort({ createdAt: -1 }); res.json(entries); }
catch (error) { res.status(500).json({ message: error.message }); }
});

router.post('/gold-touch', authMiddleware, async (req, res) => {
try {
const entryData = { ...req.body, entryNumber: `GT-${Date.now()}`, createdBy: req.user.id };
const entry = new WhiteGoldTouch(entryData);
await entry.save();
res.status(201).json(entry);
} catch (error) { res.status(500).json({ message: error.message }); }
});

router.get('/invoices', authMiddleware, async (req, res) => {
try { const invoices = await WhiteInvoice.find().populate('customer', 'name mobile').sort({ createdAt: -1 }); res.json(invoices); }
catch (error) { res.status(500).json({ message: error.message }); }
});

router.post('/invoices', authMiddleware, async (req, res) => {
try {
const invoiceData = { ...req.body, invoiceNumber: `INV-${Date.now()}`, createdBy: req.user.id };
const invoice = new WhiteInvoice(invoiceData);
await invoice.save();
res.status(201).json(invoice);
} catch (error) { res.status(500).json({ message: error.message }); }
});

router.get('/recent-transactions', authMiddleware, async (req, res) => {
try {
const invoices = await WhiteInvoice.find().populate('customer', 'name').sort({ createdAt: -1 }).limit(5);
const transactions = invoices.map(inv => ({ id: inv._id, customer: inv.customer?.name || 'Unknown', type: inv.type, amount: inv.totalAmount, status: inv.status, date: inv.createdAt }));
res.json(transactions);
} catch (error) { res.status(500).json({ message: error.message }); }
});

export default router;