import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Shield, Plus, Search, Eye, Trash2, Lock } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const BlackTransactions = () => {
const { token } = useAuth();
const [transactions, setTransactions] = useState([]);
const [loading, setLoading] = useState(true);
const [showModal, setShowModal] = useState(false);
const [formData, setFormData] = useState({
customerName: '', mobile: '', type: 'SALE', productType: 'GOLD',
weight: 0, purity: 22, rate: 0, amount: 0, remarks: ''
});
const API_URL = import.meta.env.VITE_API_URL || '[http://localhost:5000/api](http://localhost:5000/api)';

useEffect(() => { fetchTransactions(); }, []);
const fetchTransactions = async () => {
try {
const res = await axios.get(`${API_URL}/black/transactions`, { headers: { Authorization: `Bearer ${token}` } });
setTransactions(res.data);
} catch (error) { toast.error('Failed to load transactions'); } finally { setLoading(false); }
};

const handleSubmit = async (e) => {
e.preventDefault();
try {
await axios.post(`${API_URL}/black/transactions`, formData, { headers: { Authorization: `Bearer ${token}` } });
toast.success('Confidential transaction created!');
setShowModal(false);
setFormData({ customerName: '', mobile: '', type: 'SALE', productType: 'GOLD', weight: 0, purity: 22, rate: 0, amount: 0, remarks: '' });
fetchTransactions();
} catch (error) { toast.error(error.response?.data?.message || 'Failed to create transaction'); }
};

if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-4 border-slate-600 border-t-transparent" /></div>;

return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3"><Shield className="w-6 h-6 text-red-500" /><div><h1 className="text-xl font-bold text-slate-900 dark:text-white">Confidential Transactions</h1><p className="text-sm text-red-500 dark:text-red-400 flex items-center gap-2"><Lock className="w-3.5 h-3.5" /> No Backup — No Recovery</p></div></div>
          <button onClick={() => setShowModal(true)} className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-white rounded-xl hover:bg-slate-900 transition"><Plus className="w-4 h-4" /> New Transaction</button>
        </div>
      </header>
      <div className="p-6">
        <div className="mb-6"><div className="relative max-w-md"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" /><input type="text" placeholder="Search transactions..." className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition" /></div></div>
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 dark:bg-slate-800/50"><tr><th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Transaction #</th><th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Customer</th><th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Type</th><th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Product</th><th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Weight</th><th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Amount</th><th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Actions</th></tr></thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {transactions.length > 0 ? transactions.map((tx) => (
                  <tr key={tx._id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
                    <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white">{tx.transactionId}</td>
                    <td className="px-6 py-4 text-sm text-slate-700 dark:text-slate-300">{tx.customerName}</td>
                    <td className="px-6 py-4 text-sm text-slate-700 dark:text-slate-300">{tx.type}</td>
                    <td className="px-6 py-4 text-sm text-slate-700 dark:text-slate-300">{tx.productType}</td>
                    <td className="px-6 py-4 text-sm text-slate-700 dark:text-slate-300">{tx.weight}g</td>
                    <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white">₹{tx.amount.toLocaleString()}</td>
                    <td className="px-6 py-4 text-sm"><div className="flex gap-2"><button className="p-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition"><Eye className="w-4 h-4" /></button><button className="p-1.5 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 transition"><Trash2 className="w-4 h-4" /></button></div></td>
                  </tr>
                )) : <tr><td colSpan="7" className="px-6 py-8 text-center text-slate-500 dark:text-slate-400">No confidential transactions</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-center gap-2 text-xs text-red-400 dark:text-red-500"><Lock className="w-3 h-3" /><span>This data is NOT backed up</span></div>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto hide-scrollbar">
            <div className="flex items-center justify-between mb-6"><h2 className="text-xl font-bold text-slate-900 dark:text-white">New Confidential Transaction</h2><button onClick={() => setShowModal(false)} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition text-slate-500">✕</button></div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4"><div><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Customer Name *</label><input type="text" value={formData.customerName} onChange={(e) => setFormData({ ...formData, customerName: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition" required /></div><div><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Mobile *</label><input type="tel" value={formData.mobile} onChange={(e) => setFormData({ ...formData, mobile: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition" required /></div></div>
              <div className="grid grid-cols-2 gap-4"><div><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Type *</label><select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"><option value="SALE">Sale</option><option value="PURCHASE">Purchase</option><option value="EXCHANGE">Exchange</option></select></div><div><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Product Type *</label><select value={formData.productType} onChange={(e) => setFormData({ ...formData, productType: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"><option value="GOLD">Gold</option><option value="SILVER">Silver</option></select></div></div>
              <div className="grid grid-cols-2 gap-4"><div><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Weight (g) *</label><input type="number" step="0.01" value={formData.weight} onChange={(e) => setFormData({ ...formData, weight: parseFloat(e.target.value) || 0 })} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition" required /></div><div><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Purity (K) *</label><input type="number" value={formData.purity} onChange={(e) => setFormData({ ...formData, purity: parseFloat(e.target.value) || 0 })} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition" required /></div></div>
              <div className="grid grid-cols-2 gap-4"><div><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Rate (₹/g) *</label><input type="number" value={formData.rate} onChange={(e) => setFormData({ ...formData, rate: parseFloat(e.target.value) || 0 })} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition" required /></div><div><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Amount (₹) *</label><input type="number" value={formData.amount} onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) || 0 })} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition" required /></div></div>
              <div><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Remarks</label><input type="text" value={formData.remarks} onChange={(e) => setFormData({ ...formData, remarks: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition" /></div>
              <button type="submit" className="w-full py-3 bg-slate-800 text-white rounded-xl font-medium hover:bg-slate-900 transition">Create Confidential Transaction</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default BlackTransactions;