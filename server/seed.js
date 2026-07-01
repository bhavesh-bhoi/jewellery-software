import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import WhiteUser from './models/WhiteUser.js';
import BlackUser from './models/BlackUser.js';
import WhiteCustomer from './models/WhiteCustomer.js';
import WhiteGoldTouch from './models/WhiteGoldTouch.js';
import WhiteInvoice from './models/WhiteInvoice.js';

dotenv.config();
const seed = async () => {
try {
await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/jewelvault');
console.log('📦 Connected to MongoDB');
await WhiteUser.deleteMany({});
await BlackUser.deleteMany({});
await WhiteCustomer.deleteMany({});
await WhiteGoldTouch.deleteMany({});
await WhiteInvoice.deleteMany({});

const admin = await WhiteUser.create({
username: 'admin', email: 'admin@jewelvault.com',
passwordHash: await bcrypt.hash('admin@2026', 10),
fullName: 'System Administrator', role: 'ADMIN'
});
const manager = await WhiteUser.create({
username: 'manager', email: 'manager@jewelvault.com',
passwordHash: await bcrypt.hash('manager@2026', 10),
fullName: 'Store Manager', role: 'MANAGER'
});
const employee = await WhiteUser.create({
username: 'employee', email: 'employee@jewelvault.com',
passwordHash: await bcrypt.hash('employee@2026', 10),
fullName: 'Store Employee', role: 'EMPLOYEE'
});
await BlackUser.create({
username: 'blackadmin',
passwordHash: await bcrypt.hash('black@2026', 10),
fullName: 'Black Environment Admin'
});

const cust = await WhiteCustomer.insertMany([
{ customerId: 'CUST-001', name: 'Rajesh Jewellers', mobile: '9876543210', address: 'Mumbai', gstNumber: 'GST123456789', openingBalance: 50000, createdBy: admin._id },
{ customerId: 'CUST-002', name: 'Meera Gold', mobile: '9876543211', address: 'Delhi', gstNumber: 'GST987654321', openingBalance: 75000, createdBy: admin._id }
]);

await WhiteGoldTouch.insertMany([
{ entryNumber: 'GT-001', date: new Date(), customer: cust[0]._id, itemName: '22K Gold Chain', grossWeight: 25.5, lessWeight: 0.5, netWeight: 25.0, touchPercent: 91.67, fineGoldWeight: 22.92, remarks: 'First batch', createdBy: admin._id },
{ entryNumber: 'GT-002', date: new Date(), customer: cust[1]._id, itemName: '18K Gold Ring', grossWeight: 12.0, lessWeight: 0.2, netWeight: 11.8, touchPercent: 75.0, fineGoldWeight: 8.85, remarks: 'Custom order', createdBy: admin._id }
]);

await WhiteInvoice.insertMany([
{ invoiceNumber: 'INV-001', date: new Date(), customer: cust[0]._id, type: 'SALE', productType: 'GOLD', weight: 25.0, purity: 22, rate: 7200, makingCharges: 500, gst: 1800, totalAmount: 185000, paidAmount: 100000, balance: 85000, status: 'PARTIAL', createdBy: admin._id },
{ invoiceNumber: 'INV-002', date: new Date(), customer: cust[1]._id, type: 'SALE', productType: 'GOLD', weight: 11.8, purity: 18, rate: 5500, makingCharges: 300, gst: 1200, totalAmount: 72000, paidAmount: 72000, balance: 0, status: 'PAID', createdBy: admin._id }
]);

console.log('✅ Seeding complete!');
console.log('\nWhite: admin/admin@2026, manager/manager@2026, employee/employee@2026');
console.log('Black: blackadmin/black@2026');
process.exit(0);
} catch (error) { console.error('❌ Seeding failed:', error); process.exit(1); }
};
seed();