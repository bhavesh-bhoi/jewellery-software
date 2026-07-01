import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Receipt, Plus, Search, Eye, Download, Printer } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const WhiteInvoices = () => {
const { token } = useAuth();
const [invoices, setInvoices] = useState([]);
const [customers, setCustomers] = useState([]);
const [loading, setLoading] = useState(true);
const [showModal, setShowModal] = useState(false);
const [formData, setFormData] = useState({
customer: '', type: 'SALE', productType: 'GOLD', weight: 0, purity: 22, rate: 0, makingCharges: 0, gst: 0
});
const API_URL = import.meta.env.VITE_API_URL || '[http://localhost:5000/api](http://localhost:5000/api)';

useEffect(() => { fetchData(); }, []);
const fetchData = async () => {
try {
const [invoicesRes, customersRes] = await Promise.all([
axios.get(`${API_URL}/white/invoices`, { headers: { Authorization: `Bearer ${token}` } }),
axios.get(`${API_URL}/white/customers`, { headers: { Authorization: `Bearer ${token}` } })
]);
setInvoices(invoicesRes.data);
setCustomers(customersRes.data);
} catch (error) { toast.error('Failed to load data'); } finally { setLoading(false); }
};

const handleSubmit = async (e) => {
e.preventDefault();
try {
const totalAmount = (formData.weight * formData.rate) + formData.makingCharges + formData.gst;
const payload = { ...formData, totalAmount, paidAmount: 0, balance: totalAmount, status: 'PENDING' };
await axios.post(`${API_URL}/white/invoices`, payload, { headers: { Authorization: `Bearer ${token}` } });
toast.success('Invoice created!');
setShowModal(false);
setFormData({ customer: '', type: 'SALE', productType: 'GOLD', weight: 0, purity: 22, rate: 0, makingCharges: 0, gst: 0 });
fetchData();
} catch (error) { toast.error(error.response?.data?.message || 'Failed to create invoice'); }
};

const getStatusColor = (status) => {
switch(status) {
case 'PAID': return 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20';
case 'PARTIAL': return 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20';
default: return 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20';
}
};

if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-4 border-green-600 border-t-transparent" /></div>;

return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3"><Receipt className="w-6 h-6 text-green-600 dark:text-green-400" /><div><h1 className="text-xl font-bold text-slate-900 dark:text-white">Invoices</h1><p className="text-sm text-slate-500 dark:text-slate-400">Manage all invoices</p></div></div>
          <button onClick={() => setShowModal(true)} className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"><Plus className="w-4 h-4" /> New Invoice</button>
        </div>
      </header>
      <div className="p-6">
        <div className="mb-6"><div className="relative max-w-md"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" /><input type="text" placeholder="Search invoices..." className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition" /></div></div>
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 dark:bg-slate-800/50"><tr><th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Invoice #</th><th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Customer</th><th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Type</th><th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Amount</th><th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Balance</th><th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Status</th><th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Actions</th></tr></thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {invoices.length > 0 ? invoices.map((invoice) => (
                  <tr key={invoice._id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
                    <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white">{invoice.invoiceNumber}</td>
                    <td className="px-6 py-4 text-sm text-slate-700 dark:text-slate-300">{invoice.customer?.name || 'N/A'}</td>
                    <td className="px-6 py-4 text-sm text-slate-700 dark:text-slate-300">{invoice.type}</td>
                    <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white">₹{invoice.totalAmount.toLocaleString()}</td>
                    <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white">₹{invoice.balance.toLocaleString()}</td>
                    <td className="px-6 py-4 text-sm"><span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}>{invoice.status}</span></td>
                    <td className="px-6 py-4 text-sm"><div className="flex gap-2"><button className="p-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition"><Eye className="w-4 h-4" /></button><button className="p-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition"><Download className="w-4 h-4" /></button><button className="p-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition"><Printer className="w-4 h-4" /></button></div></td>
                  </tr>
                )) : <tr><td colSpan="7" className="px-6 py-8 text-center text-slate-500 dark:text-slate-400">No invoices found</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto hide-scrollbar">
            <div className="flex items-center justify-between mb-6"><h2 className="text-xl font-bold text-slate-900 dark:text-white">New Invoice</h2><button onClick={() => setShowModal(false)} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition text-slate-500">✕</button></div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Customer *</label><select value={formData.customer} onChange={(e) => setFormData({ ...formData, customer: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition" required><option value="">Select customer</option>{customers.map((c) => <option key={c._id} value={c._id}>{c.name} - {c.mobile}</option>)}</select></div>
              <div className="grid grid-cols-2 gap-4"><div><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Type *</label><select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"><option value="SALE">Sale</option><option value="PURCHASE">Purchase</option><option value="EXCHANGE">Exchange</option></select></div><div><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Product Type *</label><select value={formData.productType} onChange={(e) => setFormData({ ...formData, productType: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"><option value="GOLD">Gold</option><option value="SILVER">Silver</option></select></div></div>
              <div className="grid grid-cols-2 gap-4"><div><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Weight (g) *</label><input type="number" step="0.01" value={formData.weight} onChange={(e) => setFormData({ ...formData, weight: parseFloat(e.target.value) || 0 })} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition" required /></div><div><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Purity (K) *</label><input type="number" value={formData.purity} onChange={(e) => setFormData({ ...formData, purity: parseFloat(e.target.value) || 0 })} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition" required /></div></div>
              <div className="grid grid-cols-2 gap-4"><div><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Rate (₹/g) *</label><input type="number" value={formData.rate} onChange={(e) => setFormData({ ...formData, rate: parseFloat(e.target.value) || 0 })} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition" required /></div><div><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Making Charges (₹)</label><input type="number" value={formData.makingCharges} onChange={(e) => setFormData({ ...formData, makingCharges: parseFloat(e.target.value) || 0 })} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition" /></div></div>
              <div><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">GST (₹)</label><input type="number" value={formData.gst} onChange={(e) => setFormData({ ...formData, gst: parseFloat(e.target.value) || 0 })} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition" /></div>
              <button type="submit" className="w-full py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition">Create Invoice</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default WhiteInvoices;