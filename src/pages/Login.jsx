import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Gem, Eye, EyeOff, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';

const Login = () => {
const navigate = useNavigate();
const { login } = useAuth();
const [showPassword, setShowPassword] = useState(false);
const [loading, setLoading] = useState(false);
const [formData, setFormData] = useState({ username: '', password: '' });

const handleSubmit = async (e) => {
e.preventDefault();
setLoading(true);
const result = await login(formData.username, formData.password);
if (result.success) {
toast.success(`Welcome, ${result.user.fullName}!`);
navigate(`/${result.user.environment}/dashboard`);
} else {
toast.error(result.message);
}
setLoading(false);
};

return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-4">
      <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-8 backdrop-blur-sm">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-100 dark:bg-blue-900/30 mb-4">
              <Gem className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">JewelVault ERP</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Sign in to your account</p>
          </div>          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Username</label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="Enter username"
                required
              />
            </div>            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition pr-12"
                  placeholder="Enter password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
<button
type="submit"
disabled={loading}
className="w-full py-3 rounded-xl font-medium text-white transition-all duration-200 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] shadow-lg shadow-blue-600/30 disabled:opacity-70 disabled:cursor-not-allowed"

> 

{loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Authenticating...
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>          <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span>🔒 Secure connection</span>
              <span className="flex items-center gap-1"><Sparkles className="w-3 h-3" /> v1.0.0</span>
            </div>
          </div>
        </div>        <div className="mt-6 text-center text-xs text-slate-400 dark:text-slate-600">
          <p>Demo Credentials:</p>
          <p className="mt-1 space-x-2">
            <span className="inline-block px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded">admin / admin@2026</span>
            <span className="inline-block px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded">manager / manager@2026</span>
            <span className="inline-block px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded">employee / employee@2026</span>
          </p>
          <p className="mt-1 text-red-400">Black: blackadmin / black@2026</p>
        </div>
      </div>
    </div>
  );
};
export default Login;