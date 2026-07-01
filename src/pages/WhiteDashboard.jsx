import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
Gem, TrendingUp, TrendingDown, DollarSign, Users, Package,
Bell, Clock, ChevronRight, ArrowUpRight, ArrowDownRight,
Calendar, LayoutDashboard, ShoppingBag, Receipt, UserPlus
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

const WhiteDashboard = () => {
const { token } = useAuth();
const [stats, setStats] = useState(null);
const [transactions, setTransactions] = useState([]);
const [loading, setLoading] = useState(true);
const [date, setDate] = useState(new Date());
const [chartType, setChartType] = useState('line');
const [timeRange, setTimeRange] = useState('week');

const API_URL = import.meta.env.VITE_API_URL || '[http://localhost:5000/api](http://localhost:5000/api)';

const salesData = [
{ name: 'Mon', sales: 4000, revenue: 2400 },
{ name: 'Tue', sales: 3000, revenue: 1398 },
{ name: 'Wed', sales: 2000, revenue: 9800 },
{ name: 'Thu', sales: 2780, revenue: 3908 },
{ name: 'Fri', sales: 1890, revenue: 4800 },
{ name: 'Sat', sales: 2390, revenue: 3800 },
{ name: 'Sun', sales: 3490, revenue: 4300 },
];

const pieData = [
{ name: 'Gold', value: 400 },
{ name: 'Silver', value: 300 },
{ name: 'Diamond', value: 200 },
{ name: 'Platinum', value: 100 },
];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

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
axios.get(`${API_URL}/white/dashboard`, {
headers: { Authorization: `Bearer ${token}` }
}),
axios.get(`${API_URL}/white/recent-transactions`, {
headers: { Authorization: `Bearer ${token}` }
})
]);
setStats(statsRes.data);
setTransactions(transactionsRes.data);
} catch (error) {
toast.error('Failed to load dashboard data');
} finally {
setLoading(false);
}
};

const renderChart = () => {
switch (chartType) {
case 'bar':
return (
<ResponsiveContainer width="100%" height={300}>
<BarChart data={salesData}>
<CartesianGrid strokeDasharray="3 3" />
<XAxis dataKey="name" />
<YAxis />
<Tooltip />
              <Legend />
              <Bar dataKey="sales" fill="#8884d8" />
              <Bar dataKey="revenue" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        );
      case 'area':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="sales" stackId="1" stroke="#8884d8" fill="#8884d8" />
              <Area type="monotone" dataKey="revenue" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
            </AreaChart>
          </ResponsiveContainer>
        );
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
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
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="sales" stroke="#8884d8" />
              <Line type="monotone" dataKey="revenue" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        );
    }
  };
if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent" /></div>;

return (
<DashboardLayout environment="white">
      <div className="p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <LayoutDashboard className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            <div><h1 className="text-xl font-bold text-slate-900 dark:text-white">White Dashboard</h1><p className="text-sm text-slate-500 dark:text-slate-400">Official Records</p></div>
          </div>
          <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 px-4 py-2 rounded-xl">
            <Calendar className="w-4 h-4 text-blue-500" />
            <span>{date.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}</span>
            <span className="w-px h-4 bg-slate-200 dark:bg-slate-700" />
            <Clock className="w-4 h-4 text-blue-500" />
            <span>{date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
        </div>        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard icon={DollarSign} label="Total Revenue" value={stats?.totalRevenue || 0} change={12.5} positive color="blue" />
          <StatCard icon={Users} label="Total Customers" value={stats?.totalCustomers || 0} change={8.2} positive color="green" />
          <StatCard icon={Package} label="Gold Stock" value={stats?.goldStock || 0} suffix="g" change={0.8} positive color="amber" />
          <StatCard icon={Bell} label="Pending Balance" value={stats?.pendingBalance || 0} change={5.1} positive={false} color="rose" />
        </div>        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <QuickAction to="/white/customers" icon={UserPlus} label="Add Customer" color="blue" />
          <QuickAction to="/white/gold-touch" icon={Gem} label="Gold Touch" color="amber" />
          <QuickAction to="/white/invoices" icon={Receipt} label="New Invoice" color="green" />
          <QuickAction to="/white/invoices" icon={ShoppingBag} label="View Invoices" color="slate" />
        </div>        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300">Sales Analytics</h3>
            <div className="flex flex-wrap gap-3">
              <CustomSelect options={chartTypeOptions} value={chartType} onChange={setChartType} className="w-40" />
              <CustomSelect options={timeRangeOptions} value={timeRange} onChange={setTimeRange} className="w-40" />
              <CustomDate value="2026-06-21" onChange={() => {}} className="w-48" />
            </div>
          </div>
          <div className="w-full h-80">{renderChart()}</div>
        </div>        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300">Recent Transactions</h3>
            <Link to="/white/invoices" className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">View All <ChevronRight className="w-3 h-3" /></Link>
          </div>
          <div className="space-y-2.5">
            {transactions.length > 0 ? transactions.map((tx) => (
              <div key={tx.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition">
                <div>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">{tx.customer}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{tx.type} • {new Date(tx.date).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <span className="text-sm font-semibold text-slate-900 dark:text-white">₹{tx.amount.toLocaleString()}</span>
                  <p className={`text-xs font-medium ${tx.status === 'PAID' ? 'text-green-600 dark:text-green-400' : tx.status === 'PARTIAL' ? 'text-amber-600 dark:text-amber-400' : 'text-red-600 dark:text-red-400'}`}>{tx.status}</p>
                </div>
              </div>
            )) : <p className="text-center text-slate-500 dark:text-slate-400 py-8">No transactions yet</p>}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
const StatCard = ({ icon: Icon, label, value, suffix = '', change, positive, color }) => {
const colorClasses = {
blue: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
green: 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400',
amber: 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400',
rose: 'bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400',
};
return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-slate-500 dark:text-slate-400">{label}</p>
          <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
            {typeof value === 'number' && value > 1000 ? `₹${value.toLocaleString()}` : value}
            {suffix && <span className="text-sm font-normal text-slate-500 ml-0.5">{suffix}</span>}
          </p>
        </div>
        <div className={`p-2.5 rounded-xl ${colorClasses[color]}`}><Icon className="w-5 h-5" /></div>
      </div>
      <div className="flex items-center gap-1.5 mt-3">
        {positive ? <ArrowUpRight className="w-3.5 h-3.5 text-green-600" /> : <ArrowDownRight className="w-3.5 h-3.5 text-red-600" />}
        <span className={`text-xs font-medium ${positive ? 'text-green-600' : 'text-red-600'}`}>{Math.abs(change)}%</span>
        <span className="text-xs text-slate-500 dark:text-slate-400">vs last month</span>
      </div>
    </div>
  );
};
const QuickAction = ({ to, icon: Icon, label, color }) => {
const colorClasses = {
blue: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30',
amber: 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-900/30',
green: 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30',
slate: 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700',
};
return (
    <Link to={to} className={`flex items-center justify-center gap-2 p-4 rounded-xl ${colorClasses[color]} transition-all duration-200 hover:scale-[1.02]`}>
      <Icon className="w-5 h-5" /><span className="text-sm font-medium">{label}</span>
    </Link>
  );
};
export default WhiteDashboard;