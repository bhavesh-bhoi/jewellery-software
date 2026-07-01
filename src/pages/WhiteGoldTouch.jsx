import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Gem, Plus, Search, Edit, Trash2, Eye } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const WhiteGoldTouch = () => {
const { token } = useAuth();
const [entries, setEntries] = useState([]);
const [customers, setCustomers] = useState([]);
const [loading, setLoading] = useState(true);
const [showModal, setShowModal] = useState(false);
const [formData, setFormData] = useState({
customer: '', itemName: '', grossWeight: 0, lessWeight: 0, touchPercent: 91.67, remarks: ''
});
const API_URL = import.meta.env.VITE_API_URL || '[http://localhost:5000/api](http://localhost:5000/api)';

useEffect(() => { fetchData(); }, []);

const fetchData = async () => {
try {
const [entriesRes, customersRes] = await Promise.all([
axios.get(`${API_URL}/white/gold-touch`, { headers: { Authorization: `Bearer ${token}` } }),
axios.get(`${API_URL}/white/customers`, { headers: { Authorization: `Bearer ${token}` } })
]);
setEntries(entriesRes.data);
setCustomers(customersRes.data);
} catch (error) { toast.error('Failed to load data'); } finally { setLoading(false); }
};

const handleSubmit = async (e) => {
e.preventDefault();
try {
const netWeight = formData.grossWeight - formData.lessWeight;
const fineGoldWeight = netWeight * (formData.touchPercent / 100);
const payload = { ...formData, netWeight, fineGoldWeight };
await axios.post(`${API_URL}/white/gold-touch`, payload, { headers: { Authorization: `Bearer ${token}` } });
toast.success('Gold touch entry created!');
setShowModal(false);
setFormData({ customer: '', itemName: '', grossWeight: 0, lessWeight: 0, touchPercent: 91.67, remarks: '' });
fetchData();
} catch (error) { toast.error(error.response?.data?.message || 'Failed to create entry'); }
};

const calculateFineWeight = () => {
const netWeight = formData.grossWeight - formData.lessWeight;
const fineGoldWeight = netWeight * (formData.touchPercent / 100);
return { netWeight, fineGoldWeight };
};
const { netWeight, fineGoldWeight } = calculateFineWeight();

if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-4 border-amber-600 border-t-transparent" /></div>;

return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3"><Gem className="w-6 h-6 text-amber-600 dark:text-amber-400" /><div><h1 className="text-xl font-bold text-slate-900 dark:text-white">Gold Touch Entry</h1><p className="text-sm text-slate-500 dark:text-slate-400">Manage gold purity testing</p></div></div>
          <button onClick={() => setShowModal(true)} className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-xl hover:bg-amber-700 transition"><Plus className="w-4 h-4" /> New Entry</button>
        </div>
      </header>
      <div className="p-6">
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 dark:bg-slate-800/50"><tr><th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Entry #</th><th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Customer</th><th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Item</th><th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Gross</th><th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Net</th><th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Touch %</th><th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Fine</th><th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Actions</th></tr></thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {entries.length > 0 ? entries.map((entry) => (
                  <tr key={entry._id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
                    <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white">{entry.entryNumber}</td>
                    <td className="px-6 py-4 text-sm text-slate-700 dark:text-slate-300">{entry.customer?.name || 'N/A'}</td>
                    <td className="px-6 py-4 text-sm text-slate-700 dark:text-slate-300">{entry.itemName}</td>
                    <td className="px-6 py-4 text-sm text-slate-700 dark:text-slate-300">{entry.grossWeight}g</td>
                    <td className="px-6 py-4 text-sm text-slate-700 dark:text-slate-300">{entry.netWeight}g</td>
                    <td className="px-6 py-4 text-sm text-slate-700 dark:text-slate-300">{entry.touchPercent}%</td>
                    <td className="px-6 py-4 text-sm font-medium text-amber-600 dark:text-amber-400">{entry.fineGoldWeight}g</td>
                    <td className="px-6 py-4 text-sm"><div className="flex gap-2"><button className="p-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition"><Eye className="w-4 h-4" /></button><button className="p-1.5 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 transition"><Trash2 className="w-4 h-4" /></button></div></td>
                  </tr>
                )) : <tr><td colSpan="8" className="px-6 py-8 text-center text-slate-500 dark:text-slate-400">No gold touch entries</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto hide-scrollbar">
            <div className="flex items-center justify-between mb-6"><h2 className="text-xl font-bold text-slate-900 dark:text-white">New Gold Touch Entry</h2><button onClick={() => setShowModal(false)} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition text-slate-500">✕</button></div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Customer *</label><select value={formData.customer} onChange={(e) => setFormData({ ...formData, customer: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition" required><option value="">Select customer</option>{customers.map((c) => <option key={c._id} value={c._id}>{c.name} - {c.mobile}</option>)}</select></div>
              <div><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Item Name *</label><input type="text" value={formData.itemName} onChange={(e) => setFormData({ ...formData, itemName: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition" required /></div>
              <div className="grid grid-cols-2 gap-4"><div><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Gross Weight (g) *</label><input type="number" step="0.01" value={formData.grossWeight} onChange={(e) => setFormData({ ...formData, grossWeight: parseFloat(e.target.value) || 0 })} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition" required /></div><div><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Less Weight (g)</label><input type="number" step="0.01" value={formData.lessWeight} onChange={(e) => setFormData({ ...formData, lessWeight: parseFloat(e.target.value) || 0 })} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition" /></div></div>
              <div><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Touch Percentage (%) *</label><input type="number" step="0.01" value={formData.touchPercent} onChange={(e) => setFormData({ ...formData, touchPercent: parseFloat(e.target.value) || 0 })} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition" required /></div>
              <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-xl"><p className="text-sm text-slate-700 dark:text-slate-300"><span className="font-medium">Calculations:</span></p><p className="text-sm text-slate-600 dark:text-slate-400">Net Weight: {netWeight.toFixed(2)}g | Fine Gold Weight: {fineGoldWeight.toFixed(2)}g</p></div>
              <div><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Remarks</label><input type="text" value={formData.remarks} onChange={(e) => setFormData({ ...formData, remarks: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition" /></div>
              <button type="submit" className="w-full py-3 bg-amber-600 text-white rounded-xl font-medium hover:bg-amber-700 transition">Create Entry</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default WhiteGoldTouch;