import mongoose from 'mongoose';
const whiteInvoiceSchema = new mongoose.Schema({
invoiceNumber: { type: String, required: true, unique: true },
date: { type: Date, default: Date.now },
customer: { type: mongoose.Schema.Types.ObjectId, ref: 'WhiteCustomer', required: true },
type: { type: String, enum: ['SALE', 'PURCHASE', 'EXCHANGE'], required: true },
productType: { type: String, enum: ['GOLD', 'SILVER'], required: true },
weight: { type: Number, required: true },
purity: { type: Number, required: true },
rate: { type: Number, required: true },
makingCharges: { type: Number, default: 0 },
gst: { type: Number, default: 0 },
totalAmount: { type: Number, required: true },
paidAmount: { type: Number, default: 0 },
balance: { type: Number, default: 0 },
status: { type: String, enum: ['PENDING', 'PARTIAL', 'PAID'], default: 'PENDING' },
pdfUrl: { type: String },
qrCode: { type: String },
createdAt: { type: Date, default: Date.now },
updatedAt: { type: Date, default: Date.now },
createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'WhiteUser' }
}, { timestamps: true });
export default mongoose.model('WhiteInvoice', whiteInvoiceSchema);