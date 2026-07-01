import mongoose from 'mongoose';
const whiteCustomerSchema = new mongoose.Schema({
customerId: { type: String, required: true, unique: true },
name: { type: String, required: true },
mobile: { type: String, required: true, unique: true },
alternativeMobile: { type: String },
address: { type: String },
gstNumber: { type: String },
panNumber: { type: String },
aadhaarNumber: { type: String },
openingBalance: { type: Number, default: 0 },
createdAt: { type: Date, default: Date.now },
updatedAt: { type: Date, default: Date.now },
createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'WhiteUser' }
}, { timestamps: true });
export default mongoose.model('WhiteCustomer', whiteCustomerSchema);