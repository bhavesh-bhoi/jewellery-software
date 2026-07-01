import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
const [user, setUser] = useState(null);
const [token, setToken] = useState(localStorage.getItem('token'));
const [loading, setLoading] = useState(true);

const API_URL = import.meta.env.VITE_API_URL || '[http://localhost:5000/api](http://localhost:5000/api)';

useEffect(() => {
if (token) {
const storedUser = localStorage.getItem('user');
if (storedUser) setUser(JSON.parse(storedUser));
}
setLoading(false);
}, [token]);

const login = async (username, password) => {
try {
const response = await axios.post(`${API_URL}/auth/login`, { username, password });
if (response.data.token) {
localStorage.setItem('token', response.data.token);
localStorage.setItem('user', JSON.stringify(response.data.user));
setToken(response.data.token);
setUser(response.data.user);
return { success: true, user: response.data.user };
}
return { success: false, message: response.data.message };
} catch (error) {
return { success: false, message: error.response?.data?.message || 'Login failed' };
}
};

const logout = () => {
localStorage.removeItem('token');
localStorage.removeItem('user');
setToken(null);
setUser(null);
};

return (
<AuthContext.Provider value={{ user, token, loading, login, logout, isAuthenticated: !!token && !!user }}>
{children}
</AuthContext.Provider>
);
};