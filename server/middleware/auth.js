import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET || 'jewelvault-secret-key-2026';

export const authMiddleware = (req, res, next) => {
const token = req.header('Authorization')?.replace('Bearer ', '');
if (!token) return res.status(401).json({ message: 'No token' });
try { const decoded = jwt.verify(token, JWT_SECRET); req.user = decoded; next(); }
catch { res.status(401).json({ message: 'Invalid token' }); }
};

export const blackAuthMiddleware = (req, res, next) => {
const token = req.header('Authorization')?.replace('Bearer ', '');
if (!token) return res.status(401).json({ message: 'No token' });
try {
const decoded = jwt.verify(token, JWT_SECRET);
if (decoded.environment !== 'black') return res.status(403).json({ message: 'Black access required' });
req.user = decoded;
next();
} catch { res.status(401).json({ message: 'Invalid token' }); }
};