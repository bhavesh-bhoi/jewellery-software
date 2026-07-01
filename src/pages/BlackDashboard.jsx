import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import {
Shield, Lock, Key, AlertTriangle, Eye, EyeOff,
Gem, Package, Users, DollarSign, Clock, Calendar,
LayoutDashboard, TrendingUp, Receipt
} from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import {
LineChart, Line, BarChart, Bar, AreaChart, Area,
PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid,
Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import CustomSelect from '../components/ui/CustomSelect';
import CustomDate from '../components/ui/CustomDate';

const BlackDashboard = () => {
const { token } = useAuth();
const [stats, setStats] = useState(null);
const [transactions, setTransactions] = useState([]);
const [loading, setLoading] = useState(true);
const [showSecret, setShowSecret] = useState(false);
const [date, setDate] = useState(new Date());
const [chartType, setChartType] = useState('line');
const [timeRange, setTimeRange] = useState('week');

const API_URL = import.meta.env.VITE_API_URL || '[http://localhost:5000/api](http://localhost:5000/api)';

const blackSalesData = [
{ name: 'Mon', value: 1200, volume: 800 },
{ name: 'Tue', value: 900, volume: 600 },
{ name: 'Wed', value: 1500, volume: 1000 },
{ name: 'Thu', value: 800, volume: 500 },
{ name: 'Fri', value: 2000, volume: 1400 },
{ name: 'Sat', value: 1800, volume: 1200 },
{ name: 'Sun', value: 600, volume: 400 },
];

const blackPieData = [
{ name: 'Gold', value: 250 },
{ name: 'Silver', value: 180 },
{ name: 'Diamond', value: 120 },
{ name: 'Other', value: 50 },
];
const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4'];

const timeRangeOptions = [
{ value: 'week', label: 'This Week' },
{ value: 'month', label: 'This Month' },
{ value: 'quarter', label: 'This Quarter' },
];
const chartTypeOptions = [
{ value: 'line', label: 'Line Chart' },
{ value: 'bar', label: 'Bar Chart' },
{ value: 'area', label: 'Area Chart' },
{ value: 'pie', label: 'Pie Chart' },
];

useEffect(() => {
const timer = setInterval(() => setDate(new Date()), 60000);
return () => clearInterval(timer);
}, []);

useEffect(() => {
fetchData();
}, []);

const fetchData = async () => {
try {
const [statsRes, transactionsRes] = await Promise.all([
axios.get(`${API_URL}/black/dashboard`, {
headers: { Authorization: `Bearer ${token}` }
}),
axios.get(`${API_URL}/black/transactions`, {
headers: { Authorization: `Bearer ${token}` }
})
]);
setStats(statsRes.data);
setTransactions(transactionsRes.data.slice(0, 5));
} catch (error) {
toast.error('Failed to load black data');
} finally {
setLoading(false);
}
};

const renderChart = () => {
switch (chartType) {
case 'bar':
return (
<ResponsiveContainer width="100%" height={300}>
<BarChart data={blackSalesData}>
<CartesianGrid strokeDasharray="3 3" />
<XAxis dataKey="name" />
<YAxis />
<Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#FF6B6B" />
              <Bar dataKey="volume" fill="#4ECDC4" />
            </BarChart>
          </ResponsiveContainer>
        );
      case 'area':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={blackSalesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="value" stroke="#FF6B6B" fill="#FF6B6B" />
              <Area type="monotone" dataKey="volume" stroke="#4ECDC4" fill="#4ECDC4" />
            </AreaChart>
          </ResponsiveContainer>
        );
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={blackPieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {blackPieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        );
      default:
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={blackSalesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#FF6B6B" />
              <Line type="monotone" dataKey="volume" stroke="#4ECDC4" />
            </LineChart>
          </ResponsiveContainer>
        );
    }
  };
if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-4 border-slate-600 border-t-transparent" /></div>;

return (
<DashboardLayout environment="black">
      <div className="p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-red-500" />
            <div>
              <h1 className="text-xl font-bold text-slate-900 dark:text-white">Black Dashboard</h1>
              <p className="text-sm text-red-500 dark:text-red-400 flex items-center gap-2"><Lock className="w-3.5 h-3.5" /> Confidential — No Backup — No Recovery</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 px-4 py-2 rounded-xl">
            <Calendar className="w-4 h-4 text-red-500" />
            <span>{date.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })}</span>
          </div>
        </div>        <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800/30 rounded-2xl p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-xl"><Key className="w-5 h-5 text-red-600 dark:text-red-400" /></div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-red-700 dark:text-red-400">⚠️ Black Environment — High Security Mode</p>
              <p className="text-xs text-red-600/70 dark:text-red-400/70">Incorrect secret phrase during login will permanently destroy all Black data</p>
            </div>
            <button onClick={() => setShowSecret(!showSecret)} className="p-2 rounded-xl bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-800/30 transition">
              {showSecret ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {showSecret && (
            <div className="mt-3 p-3 bg-red-100/50 dark:bg-red-900/20 rounded-xl font-mono text-xs text-red-700 dark:text-red-400 break-all border border-red-200 dark:border-red-800/30">
              🔑 Secret Phrase: JewelVault@2026
            </div>
          )}
        </div>        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <BlackStatCard icon={DollarSign} label="Total Value" value={stats?.totalValue || 0} color="slate" />
          <BlackStatCard icon={Package} label="Gold Stock" value={stats?.goldStock || 0} suffix="g" color="amber" />
          <BlackStatCard icon={Package} label="Silver Stock" value={stats?.silverStock || 0} suffix="g" color="slate" />
          <BlackStatCard icon={Users} label="Confidential Clients" value={stats?.customers || 0} color="red" />
        </div>        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2"><Lock className="w-4 h-4 text-red-500" /> Confidential Analytics</h3>
            <div className="flex flex-wrap gap-3">
              <CustomSelect options={chartTypeOptions} value={chartType} onChange={setChartType} className="w-40" />
              <CustomSelect options={timeRangeOptions} value={timeRange} onChange={setTimeRange} className="w-40" />
              <CustomDate value="2026-06-21" onChange={() => {}} className="w-48" />
            </div>
          </div>
          <div className="w-full h-80">{renderChart()}</div>
        </div>        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2"><Lock className="w-4 h-4 text-red-500" /> Confidential Transactions</h3>
            <span className="text-xs bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 px-2.5 py-1 rounded-full">{stats?.totalTransactions || 0} total</span>
          </div>
          <div className="space-y-2">
            {transactions.length > 0 ? transactions.map((tx) => (
              <div key={tx._id} className="flex items-center justify-between p-3 rounded-xl border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
                <div>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">{tx.customerName}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{tx.type} • {new Date(tx.date).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <span className="text-sm font-semibold text-slate-900 dark:text-white">₹{tx.amount.toLocaleString()}</span>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{tx.productType}</p>
                </div>
              </div>
            )) : <p className="text-center text-slate-500 dark:text-slate-400 py-8">No confidential transactions</p>}
          </div>
        </div>        <div className="flex items-center justify-center gap-2 text-xs text-red-400 dark:text-red-500 border-t border-red-200 dark:border-red-800/30 pt-4">
          <AlertTriangle className="w-3.5 h-3.5 animate-pulse" />
          <span>This data is NOT backed up and will be destroyed on unauthorized access attempt</span>
        </div>
      </div>
    </DashboardLayout>
  );
};
const BlackStatCard = ({ icon: Icon, label, value, suffix = '', color }) => {
const colorClasses = {
red: 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400',
amber: 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400',
slate: 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400',
};
return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-slate-500 dark:text-slate-400">{label}</p>
          <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
            {typeof value === 'number' && value > 10000 ? `₹${value.toLocaleString()}` : value.toLocaleString()}
            {suffix && <span className="text-sm font-normal text-slate-500 ml-0.5">{suffix}</span>}
          </p>
        </div>
        <div className={`p-2.5 rounded-xl ${colorClasses[color]}`}><Icon className="w-5 h-5" /></div>
      </div>
    </div>
  );
};
export default BlackDashboard;