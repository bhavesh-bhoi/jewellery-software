"use client";

import { ReactNode, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
Gem,
Home,
Package,
Users,
Receipt,
Wallet,
BarChart3,
Settings,
LogOut,
Menu,
X,
Shield,
Layers,
DollarSign,
Sparkles,
Bell,
User,
} from "lucide-react";
import { cn } from "../../lib/utils";
import { ThemeToggle } from "../theme-toggle";
import ProfileDropdown from "../ProfileDropdown";

const whiteNavItems = [
{ icon: Home, label: "Dashboard", href: "/white/dashboard" },
{ icon: Layers, label: "Touch Entry", href: "/white/touch" },
{ icon: Sparkles, label: "HM Entry", href: "/white/hm" },
{ icon: Package, label: "Gold Stock", href: "/white/gold-stock" },
{ icon: Package, label: "Silver Stock", href: "/white/silver-stock" },
{ icon: Users, label: "Customers", href: "/white/customers" },
{ icon: Receipt, label: "Billing", href: "/white/billing" },
{ icon: DollarSign, label: "Payments", href: "/white/payments" },
{ icon: BarChart3, label: "Reports", href: "/white/reports" },
{ icon: Settings, label: "Settings", href: "/white/settings" },
];

const blackNavItems = [
{ icon: Home, label: "Dashboard", href: "/black/dashboard" },
{ icon: Layers, label: "Touch Entry", href: "/black/touch" },
{ icon: Package, label: "Gold Stock", href: "/black/gold-stock" },
{ icon: Package, label: "Silver Stock", href: "/black/silver-stock" },
{ icon: Users, label: "Customers", href: "/black/customers" },
{ icon: Receipt, label: "Transactions", href: "/black/transactions" },
{ icon: BarChart3, label: "Reports", href: "/black/reports" },
{ icon: Shield, label: "Security", href: "/black/security" },
];

export function DashboardLayout({ children, environment }) {
const location = useLocation();
const [sidebarOpen, setSidebarOpen] = useState(true);
const navItems = environment === "white" ? whiteNavItems : blackNavItems;

return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 px-4 py-3">
        <div className="flex items-center justify-between">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1">
            {sidebarOpen ? (
              <X className="w-6 h-6 text-slate-600 dark:text-slate-400" />
            ) : (
              <Menu className="w-6 h-6 text-slate-600 dark:text-slate-400" />
            )}
          </button>
          <div className="flex items-center gap-2">
            <Gem className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            <span className="font-bold text-slate-900 dark:text-white">JewelVault</span>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
          </div>
        </div>
      </header>
{/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-40 h-full w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-700 transition-transform duration-300",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
          "lg:translate-x-0"
        )}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center gap-3 px-6 py-5 border-b border-slate-200 dark:border-slate-700">
            <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
              <Gem className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <span className="text-lg font-bold text-slate-900 dark:text-white">
                JewelVault
              </span>
              <span
                className={cn(
                  "block text-xs font-medium",
                  environment === "white"
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-red-500 dark:text-red-400"
                )}
              >
                {environment === "white" ? "White Environment" : "🔒 Black Environment"}
              </span>
            </div>
          </div>          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.label}
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                    isActive
                      ? environment === "white"
                        ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400"
                        : "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </Link>
              );
            })}
          </nav>          <div className="border-t border-slate-200 dark:border-slate-700 p-4 space-y-3">
            <div className="flex items-center justify-between px-2">
              <ThemeToggle />
              <ProfileDropdown />
            </div>
            <div className="px-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <p className={cn(
                "text-xs font-medium",
                environment === "white"
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-500 dark:text-red-400"
              )}>
                {environment === "white"
                  ? "🔒 Backup & Recovery Enabled"
                  : "⚠️ No Backup - No Recovery"}
              </p>
            </div>
          </div>
        </div>
      </aside>      <main className={cn("transition-all duration-300", "lg:ml-72", "pt-16 lg:pt-0")}>
        {children}
      </main>
    </div>
  );
}