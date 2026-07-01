import mongoose from 'mongoose';
const whiteGoldTouchSchema = new mongoose.Schema({
entryNumber: { type: String, required: true, unique: true },
date: { type: Date, default: Date.now },
customer: { type: mongoose.Schema.Types.ObjectId, ref: 'WhiteCustomer', required: true },
itemName: { type: String, required: true },
grossWeight: { type: Number, required: true },
lessWeight: { type: Number, default: 0 },
netWeight: { type: Number, required: true },
touchPercent: { type: Number, required: true },
fineGoldWeight: { type: Number, required: true },
remarks: { type: String },
createdAt: { type: Date, default: Date.now },
updatedAt: { type: Date, default: Date.now },
createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'WhiteUser' }
}, { timestamps: true });
export default mongoose.model('WhiteGoldTouch', whiteGoldTouchSchema);