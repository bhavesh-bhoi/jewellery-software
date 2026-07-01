import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import WhiteDashboard from './pages/WhiteDashboard'
import BlackDashboard from './pages/BlackDashboard'
import WhiteCustomers from './pages/WhiteCustomers'
import WhiteGoldTouch from './pages/WhiteGoldTouch'
import WhiteInvoices from './pages/WhiteInvoices'
import BlackTransactions from './pages/BlackTransactions'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
return (
<AuthProvider>
<Routes>
<Route path="/" element={<Navigate to="/login" />} />
<Route path="/login" element={<Login />} />

{/* White Environment Routes */}
<Route path="/white/dashboard" element={
<ProtectedRoute environment="white">
<WhiteDashboard />
</ProtectedRoute>
} />
<Route path="/white/customers" element={
<ProtectedRoute environment="white">
<WhiteCustomers />
</ProtectedRoute>
} />
<Route path="/white/gold-touch" element={
<ProtectedRoute environment="white">
<WhiteGoldTouch />
</ProtectedRoute>
} />
<Route path="/white/invoices" element={
<ProtectedRoute environment="white">
<WhiteInvoices />
</ProtectedRoute>
} />

{/* Black Environment Routes */}
<Route path="/black/dashboard" element={
<ProtectedRoute environment="black">
<BlackDashboard />
</ProtectedRoute>
} />
<Route path="/black/transactions" element={
<ProtectedRoute environment="black">
<BlackTransactions />
</ProtectedRoute>
} />
</Routes>
</AuthProvider>
)
}

export default App