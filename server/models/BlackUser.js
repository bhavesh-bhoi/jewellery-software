import mongoose from 'mongoose';
const blackUserSchema = new mongoose.Schema({
username: { type: String, required: true, unique: true },
passwordHash: { type: String, required: true },
fullName: { type: String, required: true },
isActive: { type: Boolean, default: true },
lastLogin: { type: Date },
createdAt: { type: Date, default: Date.now },
updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });
export default mongoose.model('BlackUser', blackUserSchema);