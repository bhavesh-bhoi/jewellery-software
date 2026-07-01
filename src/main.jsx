import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { ThemeProvider } from './providers/theme-provider'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
<StrictMode>
<ThemeProvider attribute="class" defaultTheme="light" enableSystem>
<BrowserRouter>
<App />
<Toaster position="top-right" />
</BrowserRouter>
</ThemeProvider>
</StrictMode>,
)