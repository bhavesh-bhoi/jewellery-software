import mongoose from 'mongoose';
const whiteUserSchema = new mongoose.Schema({
username: { type: String, required: true, unique: true },
email: { type: String, required: true, unique: true },
passwordHash: { type: String, required: true },
fullName: { type: String, required: true },
role: { type: String, enum: ['ADMIN', 'MANAGER', 'EMPLOYEE'], default: 'EMPLOYEE' },
isActive: { type: Boolean, default: true },
lastLogin: { type: Date },
createdAt: { type: Date, default: Date.now },
updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });
export default mongoose.model('WhiteUser', whiteUserSchema);