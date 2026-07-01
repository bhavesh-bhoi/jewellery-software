import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Users, Search, Plus, Edit, Trash2, ArrowLeft } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const WhiteCustomers = () => {
  const { token } = useAuth();
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [formData, setFormData] = useState({
    name: '', mobile: '', alternativeMobile: '', address: '', gstNumber: '', panNumber: '', openingBalance: 0
  });
  const API_URL = import.meta.env.VITE_API_URL || '[http://localhost:5000/api](http://localhost:5000/api)';

  useEffect(() => { fetchCustomers(); }, []);
  const fetchCustomers = async () => {
    try {
      const res = await axios.get(`${API_URL}/white/customers`, { headers: { Authorization: `Bearer ${token}` } });
      setCustomers(res.data);
    } catch (error) { toast.error('Failed to load customers'); } finally { setLoading(false); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = editingCustomer ? `${API_URL}/white/customers/${editingCustomer._id}` : `${API_URL}/white/customers`;
      const method = editingCustomer ? 'put' : 'post';
      await axios[method](endpoint, formData, { headers: { Authorization: `Bearer ${token}` } });
      toast.success(editingCustomer ? 'Customer updated!' : 'Customer created!');
      setShowModal(false); setEditingCustomer(null);
      setFormData({ name: '', mobile: '', alternativeMobile: '', address: '', gstNumber: '', panNumber: '', openingBalance: 0 });
      fetchCustomers();
    } catch (error) { toast.error(error.response?.data?.message || 'Operation failed'); }
  };

  const handleEdit = (customer) => {
    setEditingCustomer(customer);
    setFormData({
      name: [customer.name], mobile: customer.mobile, alternativeMobile: customer.alternativeMobile || '',
      address: customer.address || '', gstNumber: customer.gstNumber || '', panNumber: customer.panNumber || '',
      openingBalance: customer.openingBalance || 0
    });
    setShowModal(true);
  };

  const filteredCustomers = customers.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.mobile.includes(searchTerm) ||
    c.customerId.includes(searchTerm)
  );

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent" /></div>;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3"><Users className="w-6 h-6 text-blue-600 dark:text-blue-400" /><div><h1 className="text-xl font-bold text-slate-900 dark:text-white">Customers</h1><p className="text-sm text-slate-500 dark:text-slate-400">Manage your customer database</p></div></div>
          <button onClick={() => { setEditingCustomer(null); setFormData({ name: '', mobile: '', alternativeMobile: '', address: '', gstNumber: '', panNumber: '', openingBalance: 0 }); setShowModal(true); }} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"><Plus className="w-4 h-4" /> Add Customer</button>
        </div>
      </header>
      <div className="p-6">
        <div className="mb-6"><div className="relative max-w-md"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" /><input type="text" placeholder="Search customers..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" /></div></div>
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 dark:bg-slate-800/50"><tr><th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">ID</th><th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Name</th><th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Mobile</th><th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Balance</th><th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Actions</th></tr></thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {filteredCustomers.length > 0 ? filteredCustomers.map((customer) => (
                  <tr key={customer._id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
                    <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white">{customer.customerId}</td>
                    <td className="px-6 py-4 text-sm text-slate-700 dark:text-slate-300">{customer.name}</td>
                    <td className="px-6 py-4 text-sm text-slate-700 dark:text-slate-300">{customer.mobile}</td>
                    <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white">₹{customer.openingBalance?.toLocaleString() || 0}</td>
                    <td className="px-6 py-4 text-sm"><div className="flex gap-2"><button onClick={() => handleEdit(customer)} className="p-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition"><Edit className="w-4 h-4" /></button><button className="p-1.5 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 transition"><Trash2 className="w-4 h-4" /></button></div></td>
                  </tr>
                )) : <tr><td colSpan="5" className="px-6 py-8 text-center text-slate-500 dark:text-slate-400">No customers found</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto hide-scrollbar">
            <div className="flex items-center justify-between mb-6"><h2 className="text-xl font-bold text-slate-900 dark:text-white">{editingCustomer ? 'Edit Customer' : 'Add New Customer'}</h2><button onClick={() => { setShowModal(false); setEditingCustomer(null); }} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"><ArrowLeft className="w-5 h-5 text-slate-500" /></button></div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Customer Name *</label><input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" required /></div>
              <div><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Mobile Number *</label><input type="tel" value={formData.mobile} onChange={(e) => setFormData({ ...formData, mobile: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" required /></div>
              <div><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Alternative Mobile</label><input type="tel" value={formData.alternativeMobile} onChange={(e) => setFormData({ ...formData, alternativeMobile: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" /></div>
              <div><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Address</label><input type="text" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" /></div>
              <div className="grid grid-cols-2 gap-4"><div><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">GST Number</label><input type="text" value={formData.gstNumber} onChange={(e) => setFormData({ ...formData, gstNumber: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" /></div><div><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">PAN Number</label><input type="text" value={formData.panNumber} onChange={(e) => setFormData({ ...formData, panNumber: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" /></div></div>
              <div><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Opening Balance (₹)</label><input type="number" value={formData.openingBalance} onChange={(e) => setFormData({ ...formData, openingBalance: parseFloat(e.target.value) || 0 })} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" /></div>
              <button type="submit" className="w-full py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition">{editingCustomer ? 'Update Customer' : 'Create Customer'}</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default WhiteCustomers;