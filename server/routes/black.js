import express from 'express';
import BlackTransaction from '../models/BlackTransaction.js';
import { blackAuthMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.get('/dashboard', blackAuthMiddleware, async (req, res) => {
try {
const transactions = await BlackTransaction.find({});
const totalValue = transactions.reduce((sum, tx) => sum + tx.amount, 0);
const totalTransactions = transactions.length;
const customers = await BlackTransaction.distinct('customerName');
res.json({ totalValue, totalTransactions, customers: customers.length, goldStock: 1860.8, silverStock: 14250.0, pendingBalance: 320000 });
} catch (error) { res.status(500).json({ message: error.message }); }
});

router.get('/transactions', blackAuthMiddleware, async (req, res) => {
try { const transactions = await BlackTransaction.find().sort({ createdAt: -1 }); res.json(transactions); }
catch (error) { res.status(500).json({ message: error.message }); }
});

router.post('/transactions', blackAuthMiddleware, async (req, res) => {
try {
const transactionData = { ...req.body, transactionId: `BT-${Date.now()}`, createdBy: req.user.id };
const transaction = new BlackTransaction(transactionData);
await transaction.save();
res.status(201).json(transaction);
} catch (error) { res.status(500).json({ message: error.message }); }
});

router.delete('/destroy', blackAuthMiddleware, async (req, res) => {
try { await BlackTransaction.deleteMany({}); res.json({ message: 'All black data destroyed' }); }
catch (error) { res.status(500).json({ message: error.message }); }
});

export default router;