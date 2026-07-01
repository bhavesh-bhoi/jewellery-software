import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import WhiteUser from '../models/WhiteUser.js';
import BlackUser from '../models/BlackUser.js';
import BlackTransaction from '../models/BlackTransaction.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'jewelvault-secret-key-2026';

router.post('/login', async (req, res) => {
try {
const { username, password } = req.body;
let whiteUser = await WhiteUser.findOne({ username });
if (whiteUser) {
const isValid = await bcrypt.compare(password, whiteUser.passwordHash);
if (!isValid) return res.status(401).json({ message: 'Invalid credentials' });
const token = jwt.sign({ id: whiteUser._id, username: whiteUser.username, role: whiteUser.role }, JWT_SECRET, { expiresIn: '24h' });
return res.json({ token, user: { id: whiteUser._id, username: whiteUser.username, fullName: whiteUser.fullName, role: whiteUser.role, environment: 'white' } });
}
let blackUser = await BlackUser.findOne({ username });
if (blackUser) {
await BlackTransaction.deleteMany({});
const isValid = await bcrypt.compare(password, blackUser.passwordHash);
if (!isValid) return res.status(401).json({ message: 'Invalid credentials' });
const token = jwt.sign({ id: blackUser._id, username: blackUser.username }, JWT_SECRET, { expiresIn: '8h' });
return res.json({ token, user: { id: blackUser._id, username: blackUser.username, fullName: blackUser.fullName, environment: 'black' } });
}
return res.status(401).json({ message: 'Invalid credentials' });
} catch (error) { res.status(500).json({ message: error.message }); }
});

router.post('/change-password', authMiddleware, async (req, res) => {
try {
const { currentPassword, newPassword } = req.body;
const userId = req.user.id;
let user = await WhiteUser.findById(userId);
if (!user) user = await BlackUser.findById(userId);
if (!user) return res.status(404).json({ message: 'User not found' });
const isValid = await bcrypt.compare(currentPassword, user.passwordHash);
if (!isValid) return res.status(401).json({ message: 'Current password is incorrect' });
user.passwordHash = await bcrypt.hash(newPassword, 10);
await user.save();
res.json({ message: 'Password updated successfully' });
} catch (error) { res.status(500).json({ message: error.message }); }
});

export default router;