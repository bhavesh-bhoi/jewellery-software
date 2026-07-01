import mongoose from 'mongoose';
const blackTransactionSchema = new mongoose.Schema({
transactionId: { type: String, required: true, unique: true },
date: { type: Date, default: Date.now },
customerName: { type: String, required: true },
mobile: { type: String, required: true },
type: { type: String, enum: ['SALE', 'PURCHASE', 'EXCHANGE'], required: true },
productType: { type: String, enum: ['GOLD', 'SILVER'], required: true },
weight: { type: Number, required: true },
purity: { type: Number, required: true },
rate: { type: Number, required: true },
amount: { type: Number, required: true },
remarks: { type: String },
createdAt: { type: Date, default: Date.now },
updatedAt: { type: Date, default: Date.now },
createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'BlackUser' }
}, { timestamps: true });
export default mongoose.model('BlackTransaction', blackTransactionSchema);