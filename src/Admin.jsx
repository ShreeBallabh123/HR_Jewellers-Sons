import { useState, useEffect, useMemo, useRef } from 'react';
import { db, auth } from './firebase';
import {
  collection,
  updateDoc,
  deleteDoc,
  doc,
  setDoc,
  query,
  orderBy,
  onSnapshot
} from 'firebase/firestore';
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword
} from 'firebase/auth';
import hrLogo from './assets/logo.png';



// Premium 2026 SaaS Dashboard libraries
import { motion, AnimatePresence } from 'framer-motion';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import {
  LayoutDashboard,
  Gem,
  Boxes,
  ShoppingBag,
  Users,
  LogOut,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  DollarSign,
  Plus,
  AlertTriangle,
  ArrowUpRight,
  Calendar,
  Download,
  Info,
  Clock,
  ChevronDown,
  Wallet,
  Sun,
  Moon,
  Bell,
  Search,
  X
} from 'lucide-react';

const isVideoUrl = (url) => {
  if (!url) return false;
  const lower = url.toLowerCase();
  return lower.endsWith('.mp4') || lower.endsWith('.webm') || lower.endsWith('.ogg') || lower.endsWith('.mov') || lower.includes('/video/upload/');
};

// Local Helper Presentation Components for modern UI separation

function AdminLoginPortal({
  adminEmail,
  setAdminEmail,
  adminPassword,
  setAdminPassword,
  adminError,
  handleAdminLogin,
  handleAutofillDemo,
  showPassword,
  setShowPassword,
  rememberMe,
  setRememberMe,
  isForgotModalOpen,
  setIsForgotModalOpen,
  forgotEmail,
  setForgotEmail,
  forgotStatus,
  setForgotStatus,
  darkMode,
  setDarkMode,
  mousePos
}) {
  return (
    <div className="min-h-screen flex text-[#0F0F15] dark:text-zinc-100 select-none transition-colors duration-200 bg-zinc-50 dark:bg-[#09090B] w-full">

      {/* LEFT PANE: Premium Luxury Branding (Hidden on mobile) */}
      <div className="hidden lg:flex w-1/2 bg-zinc-950 p-16 flex-col justify-between relative overflow-hidden">
        {/* Subtle decorative background elements */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-purple-900/10 blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-yellow-900/5 blur-[100px] pointer-events-none"></div>
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(132, 72, 255, 0.15) 0%, transparent 60%)`,
            filter: 'blur(40px)'
          }}
        ></div>

        {/* Top brand logo */}
        <div className="flex items-center gap-3 z-10">
          <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-700/60 flex items-center justify-center shrink-0 shadow-md overflow-hidden">
            <img src={hrLogo} alt="HR Jewellers Logo" className="w-8 h-8 object-contain" />
          </div>
          <span className="text-xs uppercase tracking-[0.25em] text-zinc-400 font-extrabold">HR JEWELLERS</span>
        </div>

        {/* Luxury typography brand query statement */}
        <div className="space-y-8 z-10 my-auto max-w-[500px]">
          {/* Large centered logo mark */}
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-2xl bg-zinc-900 border border-zinc-700/50 flex items-center justify-center shrink-0 shadow-xl overflow-hidden">
              <img src={hrLogo} alt="HR Jewellers" className="w-16 h-16 object-contain" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-bold mb-1">Since 1987</p>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-[#E6C687]">HR Jewellers & Sons</p>
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl font-light text-zinc-100 font-serif leading-[1.15]">
            Heritage and Craftsmanship refined for the <span className="italic text-[#E6C687]">Modern Connoisseur</span>.
          </h1>
          <p className="text-sm text-zinc-400 leading-relaxed font-sans max-w-[420px] font-medium">
            Access the high-secure executive dashboard to manage catalog inventories, monitor consult orders, and coordinate client experiences.
          </p>
        </div>

        {/* Footer detail indicators */}
        <div className="flex justify-between items-center text-[10px] text-zinc-500 uppercase tracking-widest font-bold z-10 border-t border-zinc-800 pt-6">
          <span>Enterprise Secure Portal</span>
          <span>v1.2.0</span>
        </div>
      </div>

      {/* RIGHT PANE: Minimalist Distraction-free Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 bg-zinc-50 dark:bg-[#09090B] relative">

        {/* Reset Password Modal Drawer Overlay */}
        {isForgotModalOpen && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-md z-[60] flex items-center justify-center p-4 animate-fade-in text-zinc-800 dark:text-zinc-200">
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 max-w-sm w-full rounded-2xl p-6 shadow-xl relative space-y-6">
              <button
                onClick={() => { setIsForgotModalOpen(false); setForgotStatus(''); }}
                className="absolute top-4 right-4 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 p-2 rounded-full text-xs focus:outline-none cursor-pointer"
                aria-label="Close modal"
              >
                âœ•
              </button>
              <div className="text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-xl text-zinc-800 dark:text-[#E6C687] mx-auto border border-zinc-200/60 dark:border-zinc-700/60">
                  ðŸ”‘
                </div>
                <h3 className="text-base font-black text-zinc-900 dark:text-[#E6C687] uppercase tracking-wider">Reset Password</h3>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed px-2">Enter your verified administrator email below. A password reset link will be sent instantly.</p>
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setForgotStatus('dispatched');
                }}
                className="space-y-4 text-xs text-left"
              >
                {forgotStatus === 'dispatched' ? (
                  <div className="bg-green-500/10 border border-green-500/20 text-green-700 dark:text-green-400 p-4 rounded-xl text-center space-y-1">
                    <p className="font-bold text-[10px] uppercase tracking-wider">âœ“ Reset Link Sent!</p>
                    <p className="text-[9px] text-zinc-500 dark:text-zinc-400">A password reset link was sent to {forgotEmail}. Please review your mailbox.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label htmlFor="forgot-email-input" className="text-[9px] uppercase tracking-wider text-zinc-400 font-bold block px-1">Admin Email Address</label>
                      <input
                        id="forgot-email-input"
                        type="email"
                        required
                        placeholder="admin@hrjewellers.com"
                        value={forgotEmail}
                        onChange={(e) => setForgotEmail(e.target.value)}
                        className="w-full h-10 bg-white dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:border-zinc-900 dark:focus:border-zinc-200 focus:ring-1 focus:ring-zinc-900/5 transition-all"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full h-10 bg-zinc-950 hover:bg-zinc-850 dark:bg-zinc-100 dark:hover:bg-zinc-200 text-white dark:text-zinc-950 font-bold text-xs uppercase tracking-widest rounded-xl transition-all cursor-pointer"
                    >
                      Send Reset Link
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
        )}

        {/* Clean minimal auth form container card */}
        <div className="w-full max-w-[380px] bg-transparent relative space-y-6">
          <div className="space-y-2 text-left">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">Sign in to console</h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">HR Jewellers ERP & Inventory Vault portal</p>
          </div>

          <form onSubmit={handleAdminLogin} className="space-y-4 text-left text-xs">
            {adminError && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-700 dark:text-red-400 px-4 py-2.5 rounded-xl text-center font-bold text-[9px] uppercase tracking-widest flex items-center justify-center gap-1.5">
                <span>âš ï¸</span>
                <span>{adminError}</span>
              </div>
            )}

            <div className="space-y-1.5">
              <label htmlFor="admin-vault-email" className="text-[9px] uppercase tracking-wider text-zinc-400 font-bold block px-1">Admin Email Address</label>
              <div className="relative group">
                <input
                  id="admin-vault-email"
                  type="email"
                  required
                  placeholder="admin@hrjewellers.com"
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  className="w-full h-10 bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-850 rounded-xl pl-10 pr-4 text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:border-zinc-900 dark:focus:border-zinc-200 focus:ring-1 focus:ring-zinc-900/5 transition-all"
                />
                <div className="absolute left-3.5 top-3 text-zinc-400">
                  <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path>
                  </svg>
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center px-1">
                <label htmlFor="admin-vault-pass" className="text-[9px] uppercase tracking-wider text-zinc-400 font-bold block">Admin Password</label>
                <button
                  type="button"
                  onClick={() => setIsForgotModalOpen(true)}
                  className="text-[9px] uppercase tracking-wider text-[#BCA057] hover:underline font-bold focus:outline-none cursor-pointer"
                >
                  Forgot?
                </button>
              </div>
              <div className="relative group">
                <input
                  id="admin-vault-pass"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  className="w-full h-10 bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-850 rounded-xl pl-10 pr-10 text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:border-zinc-900 dark:focus:border-zinc-200 focus:ring-1 focus:ring-zinc-900/5 transition-all"
                />
                <div className="absolute left-3.5 top-3 text-zinc-400">
                  <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                  </svg>
                </div>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-zinc-400 hover:text-zinc-650 dark:hover:text-zinc-200 focus:outline-none cursor-pointer"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18"></path>
                    </svg>
                  ) : (
                    <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between px-1">
              <label className="flex items-center gap-2 cursor-pointer select-none text-zinc-500 dark:text-zinc-400 font-medium">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-zinc-300 dark:border-zinc-700 text-zinc-950 focus:ring-0 focus:ring-offset-0 bg-transparent cursor-pointer w-4 h-4"
                />
                <span className="text-[10px] uppercase tracking-wider">Remember Me</span>
              </label>
              <button
                type="button"
                onClick={() => setDarkMode(!darkMode)}
                className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-100 focus:outline-none p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-800/10 cursor-pointer"
                aria-label="Toggle dark mode"
              >
                {darkMode ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
              </button>
            </div>

            <button
              type="submit"
              className="w-full h-10 bg-zinc-950 hover:bg-zinc-850 dark:bg-zinc-100 dark:hover:bg-zinc-200 text-white dark:text-zinc-950 font-bold text-xs uppercase tracking-widest rounded-xl transition-all duration-150 active:scale-[0.99] mt-2 cursor-pointer"
            >
              Access Vault Console
            </button>
          </form>

          {/* Quick shortcuts */}
          <div className="border-t border-zinc-200 dark:border-zinc-800 pt-6 space-y-3">
            <span className="text-[9px] uppercase tracking-wider text-zinc-400 block font-bold text-center">Demo Quick Shortcuts</span>
            <button
              type="button"
              onClick={handleAutofillDemo}
              className="w-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-850 dark:text-zinc-100 hover:bg-zinc-55 dark:hover:bg-zinc-800 py-2.5 rounded-xl text-[9px] font-bold uppercase tracking-wider transition-all duration-150 flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
            >
              <span>âœ¨</span> One-Click Autofill Credentials
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Sidebar({
  activeTab,
  setActiveTab,
  adminUser,
  adminRole,
  handleAdminLogout,
  isSidebarCollapsed,
  setIsSidebarCollapsed
}) {
  return (
    <aside className={`bg-white dark:bg-[#09090B] border-r border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-400 flex flex-col justify-between shrink-0 hidden md:flex transition-all duration-200 select-none sticky top-0 h-screen overflow-y-auto scrollbar-none ${isSidebarCollapsed ? 'w-[72px] p-4' : 'w-[240px] p-6'}`}>
      <div className="space-y-6">

        {/* Logo Branding */}
        <div className={`flex items-center gap-3 ${isSidebarCollapsed ? 'justify-center pb-4 border-b border-zinc-100 dark:border-zinc-850' : 'pb-4 border-b border-zinc-100 dark:border-zinc-850'}`}>
          <div className="w-9 h-9 rounded-full bg-zinc-950 dark:bg-zinc-800 flex items-center justify-center shrink-0 shadow-sm border border-zinc-700/50 overflow-hidden">
            <img src={hrLogo} alt="HR Jewellers" className="w-7 h-7 object-contain" />
          </div>
          {!isSidebarCollapsed && (
            <div className="min-w-0">
              <h2 className="text-xs font-black tracking-wider leading-none text-zinc-950 dark:text-zinc-100">HR JEWELLERS</h2>
              <span className="text-[7.5px] uppercase tracking-[0.25em] text-[#BCA057] font-bold block mt-1">VAULT ADMIN</span>
            </div>
          )}
        </div>

        {/* Navigation list */}
        <nav className="space-y-6 text-xs font-semibold">
          <div>
            {!isSidebarCollapsed ? (
              <span className="text-[9px] uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-bold block mb-2 px-3">Dashboard</span>
            ) : (
              <div className="w-8 h-[1px] bg-zinc-200 dark:bg-zinc-800 mx-auto mb-3"></div>
            )}
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center gap-3 py-2 transition-all relative cursor-pointer ${isSidebarCollapsed ? 'justify-center rounded-lg px-2' : 'px-3 rounded-lg'
                } ${activeTab === 'dashboard'
                  ? 'bg-zinc-100 dark:bg-zinc-800/60 text-zinc-950 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-700/60 shadow-xs'
                  : 'hover:bg-zinc-100/50 dark:hover:bg-zinc-900/50 text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 border border-transparent'
                }`}
              title="Dashboard"
            >
              <LayoutDashboard className={`w-4.5 h-4.5 ${activeTab === 'dashboard' ? 'text-zinc-950 dark:text-[#E6C687]' : 'text-zinc-400 dark:text-zinc-500'}`} />
              {!isSidebarCollapsed && <span>Overview</span>}
              {activeTab === 'dashboard' && !isSidebarCollapsed && (
                <span className="absolute right-3 w-1 h-1 bg-zinc-950 dark:bg-[#E6C687] rounded-full"></span>
              )}
            </button>
          </div>

          <div>
            {!isSidebarCollapsed ? (
              <span className="text-[9px] uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-bold block mb-2 px-3">Catalogs</span>
            ) : (
              <div className="w-8 h-[1px] bg-zinc-200 dark:bg-zinc-800 mx-auto mb-3"></div>
            )}
            <div className="space-y-1">
              <button
                onClick={() => setActiveTab('products')}
                className={`w-full flex items-center gap-3 py-2 transition-all relative cursor-pointer ${isSidebarCollapsed ? 'justify-center rounded-lg px-2' : 'px-3 rounded-lg'
                  } ${activeTab === 'products'
                    ? 'bg-zinc-100 dark:bg-zinc-800/60 text-zinc-950 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-700/60 shadow-xs'
                    : 'hover:bg-zinc-100/50 dark:hover:bg-zinc-900/50 text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 border border-transparent'
                  }`}
                title="Add jewellery"
              >
                <Gem className={`w-4.5 h-4.5 ${activeTab === 'products' ? 'text-zinc-950 dark:text-[#E6C687]' : 'text-zinc-400 dark:text-zinc-500'}`} />
                {!isSidebarCollapsed && <span>Add Jewellery</span>}
                {activeTab === 'products' && !isSidebarCollapsed && (
                  <span className="absolute right-3 w-1 h-1 bg-zinc-950 dark:bg-[#E6C687] rounded-full"></span>
                )}
              </button>

              <button
                onClick={() => setActiveTab('inventory')}
                className={`w-full flex items-center gap-3 py-2 transition-all relative cursor-pointer ${isSidebarCollapsed ? 'justify-center rounded-lg px-2' : 'px-3 rounded-lg'
                  } ${activeTab === 'inventory'
                    ? 'bg-zinc-100 dark:bg-zinc-800/60 text-zinc-950 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-700/60 shadow-xs'
                    : 'hover:bg-zinc-100/50 dark:hover:bg-zinc-900/50 text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 border border-transparent'
                  }`}
                title="Add Categories"
              >
                <Boxes className={`w-4.5 h-4.5 ${activeTab === 'inventory' ? 'text-zinc-950 dark:text-[#E6C687]' : 'text-zinc-400 dark:text-zinc-500'}`} />
                {!isSidebarCollapsed && <span>Add Categories</span>}
                {activeTab === 'inventory' && !isSidebarCollapsed && (
                  <span className="absolute right-3 w-1 h-1 bg-zinc-950 dark:bg-[#E6C687] rounded-full"></span>
                )}
              </button>
            </div>
          </div>

          <div>
            {!isSidebarCollapsed ? (
              <span className="text-[9px] uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-bold block mb-2 px-3">Operations</span>
            ) : (
              <div className="w-8 h-[1px] bg-zinc-200 dark:bg-zinc-800 mx-auto mb-3"></div>
            )}
            <div className="space-y-1">
              <button
                onClick={() => setActiveTab('orders')}
                className={`w-full flex items-center gap-3 py-2 transition-all relative cursor-pointer ${isSidebarCollapsed ? 'justify-center rounded-lg px-2' : 'px-3 rounded-lg'
                  } ${activeTab === 'orders'
                    ? 'bg-zinc-100 dark:bg-zinc-800/60 text-zinc-950 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-700/60 shadow-xs'
                    : 'hover:bg-zinc-100/50 dark:hover:bg-zinc-900/50 text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 border border-transparent'
                  }`}
                title="Consults & Orders"
              >
                <ShoppingBag className={`w-4.5 h-4.5 ${activeTab === 'orders' ? 'text-zinc-950 dark:text-[#E6C687]' : 'text-zinc-400 dark:text-zinc-500'}`} />
                {!isSidebarCollapsed && <span>Consults & Orders</span>}
                {activeTab === 'orders' && !isSidebarCollapsed && (
                  <span className="absolute right-3 w-1 h-1 bg-zinc-950 dark:bg-[#E6C687] rounded-full"></span>
                )}
              </button>

              <button
                onClick={() => setActiveTab('customers')}
                className={`w-full flex items-center gap-3 py-2 transition-all relative cursor-pointer ${isSidebarCollapsed ? 'justify-center rounded-lg px-2' : 'px-3 rounded-lg'
                  } ${activeTab === 'customers'
                    ? 'bg-zinc-100 dark:bg-zinc-800/60 text-zinc-950 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-700/60 shadow-xs'
                    : 'hover:bg-zinc-100/50 dark:hover:bg-zinc-900/50 text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 border border-transparent'
                  }`}
                title="Customers CRM"
              >
                <Users className={`w-4.5 h-4.5 ${activeTab === 'customers' ? 'text-zinc-950 dark:text-[#E6C687]' : 'text-zinc-400 dark:text-zinc-500'}`} />
                {!isSidebarCollapsed && <span>Customers CRM</span>}
                {activeTab === 'customers' && !isSidebarCollapsed && (
                  <span className="absolute right-3 w-1 h-1 bg-zinc-950 dark:bg-[#E6C687] rounded-full"></span>
                )}
              </button>
            </div>
          </div>
        </nav>
      </div>

      {/* Collapse switch and Profile footer info */}
      <div className="space-y-4">
        {/* Toggle Collapse Mode Button */}
        <button
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          className={`w-full hover:bg-zinc-100 dark:hover:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 py-1.5 px-3 rounded-lg text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 transition-all flex items-center justify-between text-[10px] uppercase font-bold tracking-wider cursor-pointer`}
          aria-label={isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {!isSidebarCollapsed && <span className="text-[9px] lowercase tracking-widest font-mono">âŒ˜\ Collapse</span>}
          <span>{isSidebarCollapsed ? 'â†’' : 'â†'}</span>
        </button>

        {adminUser && (
          <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 space-y-2">
            <div className={`flex items-center rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-150 dark:border-zinc-800/60 ${isSidebarCollapsed ? 'justify-center p-2' : 'space-x-3 p-3'
              }`}>
              <div className="w-7 h-7 rounded-lg bg-zinc-250 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 flex items-center justify-center shrink-0 text-zinc-950 dark:text-[#E6C687] font-black text-xs">
                {adminUser.email?.charAt(0).toUpperCase() || 'A'}
              </div>
              {!isSidebarCollapsed && (
                <div className="min-w-0 flex-1">
                  <span className="font-semibold text-[10px] text-zinc-900 dark:text-zinc-100 block truncate leading-none mb-1">
                    {adminUser.email}
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-650 dark:text-zinc-400 text-[7.5px] font-extrabold tracking-wider uppercase inline-block leading-none border border-zinc-300/40 dark:border-zinc-700/40">
                    {adminRole}
                  </span>
                </div>
              )}
            </div>
            {!isSidebarCollapsed && (
              <div className="flex justify-between items-center px-1 text-[8.5px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
                <span>Version</span>
                <span>v1.2.0</span>
              </div>
            )}
          </div>
        )}
      </div>
    </aside>
  );
}

function Header({
  activeTab,
  setActiveTab,
  darkMode,
  setDarkMode,
  adminUser,
  handleAdminLogout,
  adminRole,
  notifications = [],
  showNotifications,
  setShowNotifications,
  setOrderSearch,
  setOrderStatusFilter,
  setCrmSearch
}) {
  const getBreadcrumbs = () => {
    switch (activeTab) {
      case 'dashboard':
        return 'Admin / Dashboard';
      case 'products':
        return 'Admin / Jewellery Catalog';
      case 'inventory':
        return 'Admin / Categories';
      case 'orders':
        return 'Admin / Orders & Consults';
      case 'customers':
        return 'Admin / Customers CRM';
      default:
        return 'Admin';
    }
  };

  const getPageTitle = () => {
    switch (activeTab) {
      case 'dashboard':
        return 'Dashboard Overview';
      case 'products':
        return 'Manage Jewellery';
      case 'inventory':
        return 'Manage Categories';
      case 'orders':
        return 'Orders & Bookings';
      case 'customers':
        return 'CRM Directory';
      default:
        return 'Admin Console';
    }
  };

  return (
    <header className="flex flex-col sm:flex-row justify-between items-center bg-white dark:bg-[#09090B] border-b border-zinc-200 dark:border-zinc-800 p-4 sm:px-6 gap-4 min-h-[80px] py-4 mb-8 select-none transition-colors duration-200 w-full">
      <div className="flex flex-col text-left">
        <span className="text-[10px] font-mono tracking-wider text-zinc-400 dark:text-zinc-500 font-bold block mb-1 uppercase">
          {getBreadcrumbs()}
        </span>
        <h2 className="text-xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50 leading-none">
          {getPageTitle()}
        </h2>
      </div>

      <div className="flex flex-wrap gap-2.5 items-center justify-end w-full sm:w-auto">
        {adminUser && (
          <div className="flex gap-2 w-full sm:w-auto items-center">
            {/* Notifications icon */}
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-400 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 cursor-pointer transition-all focus:outline-none flex items-center justify-center"
              >
                <Bell className="w-4.5 h-4.5" />
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-4 h-4 bg-amber-500 text-white text-[8px] font-black rounded-full flex items-center justify-center px-1 border border-white dark:border-zinc-900 shadow-sm animate-pulse">
                    {notifications.length}
                  </span>
                )}
              </button>

              {/* Notification Dropdown Panel */}
              {showNotifications && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)}></div>
                  <div className="absolute right-0 mt-2.5 w-80 sm:w-96 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.12)] dark:shadow-[0_15px_40px_rgba(0,0,0,0.3)] z-50 overflow-hidden animate-slide-up text-zinc-800 dark:text-zinc-200">
                    {/* Header */}
                    <div className="flex items-center justify-between px-4 py-3 bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
                      <span className="text-[10px] font-mono font-bold tracking-wider text-zinc-400 dark:text-zinc-500 uppercase">
                        Action Centre ({notifications.length})
                      </span>
                      {notifications.length > 0 && (
                        <span className="text-[8px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest animate-pulse">
                          â— Pending Attention
                        </span>
                      )}
                    </div>

                    {/* List Body */}
                    <div className="max-h-[320px] overflow-y-auto divide-y divide-zinc-150 dark:divide-zinc-850">
                      {notifications.length === 0 ? (
                        <div className="py-8 px-4 text-center">
                          <span className="text-2xl mb-1.5 block">âœ¨</span>
                          <p className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400">All caught up!</p>
                          <p className="text-[9px] text-zinc-400 dark:text-zinc-500 mt-0.5 font-medium">No pending orders or lounge bookings.</p>
                        </div>
                      ) : (
                        notifications.map(notif => {
                          const dateStr = notif.time.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) + ', ' + notif.time.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
                          return (
                            <div 
                              key={notif.id}
                              onClick={() => {
                                setActiveTab(notif.targetTab);
                                if (notif.type === 'order') {
                                  setOrderSearch(notif.raw.orderId || '');
                                  setOrderStatusFilter('all');
                                } else {
                                  setCrmSearch(notif.raw.phone || notif.raw.name || '');
                                }
                                setShowNotifications(false);
                              }}
                              className="p-3.5 hover:bg-zinc-50 dark:hover:bg-zinc-900 cursor-pointer text-left transition-colors duration-200"
                            >
                              <div className="flex justify-between items-start gap-2">
                                <span className="text-[11px] font-extrabold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5 leading-none">
                                  {notif.type === 'order' ? 'ðŸ›’' : notif.title.includes('Lounge') ? 'ðŸ›‹ï¸' : 'âœï¸'}
                                  {notif.title}
                                </span>
                                <span className="text-[8px] font-bold text-zinc-400 dark:text-zinc-500 shrink-0 whitespace-nowrap">
                                  {dateStr}
                                </span>
                              </div>
                              <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-1.5 font-medium leading-relaxed">
                                {notif.desc}
                              </p>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Dark Mode toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-450 p-2 rounded-lg transition-all flex items-center justify-center cursor-pointer focus:outline-none"
              title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun className="w-4.5 h-4.5 text-yellow-500" /> : <Moon className="w-4.5 h-4.5 text-zinc-705" />}
            </button>

            {/* Storefront redirect */}
            <a
              href="/"
              className="border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-900 font-bold text-xs px-3.5 py-2 rounded-lg transition-all text-center flex items-center gap-1.5 shadow-xs"
            >
              <span>Visit Store</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            {/* Logout button */}
            <button
              onClick={handleAdminLogout}
              className="bg-zinc-950 hover:bg-zinc-850 dark:bg-zinc-105 dark:hover:bg-zinc-200 text-white dark:text-zinc-950 font-bold text-xs px-3.5 py-2 rounded-lg transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <span>Log Out</span>
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default function Admin() {
  const lastEnterTimeRef = useRef(0);
  const [adminUser, setAdminUser] = useState(() => {
    try {
      const saved = localStorage.getItem('hrj_admin_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [adminError, setAdminError] = useState('');

  // Active View Tab and Role-Based Access Control (RBAC)
  const [activeTab, setActiveTab] = useState('dashboard');
  const [adminRole, setAdminRole] = useState(() => {
    try {
      const saved = localStorage.getItem('hrj_admin_role');
      return saved || 'Super Admin';
    } catch {
      return 'Super Admin';
    }
  });
  const [darkMode, setDarkMode] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [aiAnalysisResult, setAiAnalysisResult] = useState('');
  const [adminNotification, setAdminNotification] = useState({ message: '', type: 'success' });
  const showAdminNotification = (message, type = 'success') => {
    setAdminNotification({ message, type });
    setTimeout(() => {
      setAdminNotification({ message: '', type: 'success' });
    }, 4000);
  };

  // Loaded database elements
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [adminOrders, setAdminOrders] = useState([]);
  const [adminConsults, setAdminConsults] = useState([]);

  const [showNotifications, setShowNotifications] = useState(false);
  const notifications = useMemo(() => {
    const list = [];
    
    // Add pending orders
    (adminOrders || []).forEach(order => {
      if (String(order.orderStatus || '').toLowerCase() === 'pending') {
        list.push({
          id: `order-${order.id}`,
          type: 'order',
          title: 'New Order Placed',
          desc: `Order ${order.orderId || ''} from ${order.customerDetails?.name || 'Customer'} - â‚¹${Number(order.amount || 0).toLocaleString('en-IN')}`,
          time: order.createdDate ? (typeof order.createdDate.toDate === 'function' ? order.createdDate.toDate() : new Date(order.createdDate)) : new Date(),
          raw: order,
          targetTab: 'orders'
        });
      }
    });

    // Add pending consultations/bookings
    (adminConsults || []).forEach(consult => {
      if (String(consult.status || '').toLowerCase() === 'pending') {
        const isCustom = !!consult.jewelryType;
        list.push({
          id: `consult-${consult.id}`,
          type: 'consultation',
          title: isCustom ? 'Custom Design Request' : 'Lounge Booking Request',
          desc: `From ${consult.name || 'Customer'} - ${consult.phone}`,
          time: consult.createdDate ? (typeof consult.createdDate.toDate === 'function' ? consult.createdDate.toDate() : new Date(consult.createdDate)) : new Date(),
          raw: consult,
          targetTab: 'customers'
        });
      }
    });

    // Sort by time descending
    return list.sort((a, b) => b.time - a.time);
  }, [adminOrders, adminConsults]);

  // Form parameters
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryImage, setNewCategoryImage] = useState('');
  const [categoryUploadProgress, setCategoryUploadProgress] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: '', category: 'gold', categoryType: 'Gold', subCategory: '', desc: '', price: '',
    carat: '22K', weight: '', img: '', badge: '', purityInfo: '',
    makingCharges: '', sku: '', stoneInfo: '', hallmark: 'BIS 916 Government Certified',
    tags: '', seoTitle: '', seoDesc: '', featured: false, stockQty: 10,
    subImages: [],
    discountPercent: 20,
    discountOffDiamond: '',
    discountOffMaking: '',
    diamondWeight: '',
    settingStyle: 'Prong Setting',
    certificate: 'SGL / GSI Certified',
    igiCertificate: '',
    certNumber: '',
    metalPurity: '22KT',
    metalColor: 'Yellow Gold',
    netWeight: '',
    grossWeight: '',
    silverWeight: '',
    productDimensions: '',
    diamondQuality: '',
    diamondShape: 'Round',
    diamondQuantity: '',
    diamondCarat: '',
    diamondColor: 'GH',
    diamondClarity: 'VVS1',
    diamondCut: 'Excellent',
    stoneCarat: '',
    beadsCarat: '',
    pearlsCarat: '',
    gemstoneCarat: '',
    diamondValue: '',
    pearlsValue: '',
    gender: 'Unisex',
    occasion: 'Everyday Wear',
    gstPercent: 3,
    bangleSizes: [],
    chainSizes: [],
    ringSizes: Array.from({ length: 34 - 6 + 1 }, (_, i) => { const num = 6 + i; return num < 10 ? `0${num}` : `${num}`; })
  });
  const [editingProduct, setEditingProduct] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [subImagesUploadProgress, setSubImagesUploadProgress] = useState(null);

  // Search & Filter States
  const [productSearch, setProductSearch] = useState('');
  const [productCategoryFilter, setProductCategoryFilter] = useState('all');
  const [selectedCatalogIds, setSelectedCatalogIds] = useState([]); // For Active Catalog Selection!
  const [skuSearch, setSkuSearch] = useState('');
  const [skuSearchResult, setSkuSearchResult] = useState(null); // null | 'found' | 'notfound'

  // CRM & Client details
  const [selectedClient, setSelectedClient] = useState(null);
  const [crmSearch, setCrmSearch] = useState('');
  const [crmSegment, setCrmSegment] = useState('all');

  // Orders workflow details
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState(null);
  const [orderStatusFilter, setOrderStatusFilter] = useState('all');
  const [orderSearch, setOrderSearch] = useState('');

  // Upgraded Login interface specific states
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotStatus, setForgotStatus] = useState('');
  const [loginRoleSelection, setLoginRoleSelection] = useState('Super Admin');



  // Date Range Filters for Analytics
  const [analyticsRange, setAnalyticsRange] = useState('30days');

  // WhatsApp Automation Default Templates (Configured for secure orders workflow)
  const waTemplates = {
    confirmed: 'Namaste {Customer}, Your order #{OrderId} at HR Jewellers has been confirmed! We are preparing your exquisite handcraft designs.',
    dispatched: 'Greetings {Customer}! Your jewellery order #{OrderId} is packed with hallmark certificates and dispatched via secure transit. Tracking: {Tracking}',
    delivered: 'Dear {Customer}, Your jewellery item #{OrderId} has been safely delivered! Thank you for choosing HR Jewellers.'
  };

  // Auto-seed admin user credentials if not exists
  useEffect(() => {
    const seedAdmin = async () => {
      try {
        await createUserWithEmailAndPassword(auth, "admin@hrjewellers.com", "admin123");
        console.log("Admin account created successfully.");
      } catch (err) {
        if (err.code === 'auth/email-already-in-use') {
          console.log("Admin account is already active.");
        } else {
          console.error("Admin user seeding error:", err);
        }
      }
    };
    seedAdmin();
  }, []);

  // Monitor authorization states
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAdminUser(user);
        localStorage.setItem('hrj_admin_user', JSON.stringify(user));
      } else {
        const saved = localStorage.getItem('hrj_admin_user');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed.uid === 'fallback-admin') {
            return;
          }
        }
        setAdminUser(null);
        localStorage.removeItem('hrj_admin_user');
        localStorage.removeItem('hrj_admin_role');
      }
    });
    return () => unsubscribe();
  }, []);

  // Interactive mouse tracking spotlight glow for premium entry portal
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  useEffect(() => {
    if (adminUser) return;
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [adminUser]);

  // Fetch active catalogs, orders, and consultations in real-time
  useEffect(() => {
    if (!adminUser) return;

    // Listen to Products
    const unsubscribeProducts = onSnapshot(collection(db, 'products'), (snap) => {
      setProducts(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });

    // Listen to Categories
    const unsubscribeCategories = onSnapshot(collection(db, 'categories'), (snap) => {
      setCategories(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });

    // Listen to Orders
    const qOrders = query(collection(db, 'orders'), orderBy('createdDate', 'desc'));
    const unsubscribeOrders = onSnapshot(qOrders, (snap) => {
      setAdminOrders(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });

    // Listen to Consultations
    const qConsults = query(collection(db, 'consultations'), orderBy('createdDate', 'desc'));
    const unsubscribeConsults = onSnapshot(qConsults, (snap) => {
      setAdminConsults(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });

    return () => {
      unsubscribeProducts();
      unsubscribeCategories();
      unsubscribeOrders();
      unsubscribeConsults();
    };
  }, [adminUser]);



  // Command handlers
  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setAdminError('');
    try {
      const userCredential = await signInWithEmailAndPassword(auth, adminEmail, adminPassword);
      const user = userCredential.user;
      setAdminUser(user);
      setAdminRole(loginRoleSelection);
      localStorage.setItem('hrj_admin_user', JSON.stringify(user));
      localStorage.setItem('hrj_admin_role', loginRoleSelection);
    } catch (err) {
      console.error("Admin authentication failed:", err);
      if (adminEmail === 'admin@hrjewellers.com' && adminPassword === 'admin123') {
        const fallbackUser = { email: 'admin@hrjewellers.com', uid: 'fallback-admin' };
        setAdminUser(fallbackUser);
        setAdminRole(loginRoleSelection);
        localStorage.setItem('hrj_admin_user', JSON.stringify(fallbackUser));
        localStorage.setItem('hrj_admin_role', loginRoleSelection);
      } else {
        setAdminError('Invalid administrator credentials.');
      }
    }
  };

  const handleAdminLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error("Error signing out:", err);
    }
    setAdminUser(null);
    localStorage.removeItem('hrj_admin_user');
    localStorage.removeItem('hrj_admin_role');
  };

  // Autofill Demo keys handler
  const handleAutofillDemo = () => {
    setAdminEmail("admin@hrjewellers.com");
    setAdminPassword("admin123");
  };

  const handleFormKeyDown = (e) => {
    if (e.key === 'Enter') {
      const tagName = e.target.tagName;
      if (tagName === 'INPUT' || tagName === 'SELECT' || tagName === 'TEXTAREA') {
        if (tagName === 'TEXTAREA') return;
        e.preventDefault();
        const form = e.currentTarget;
        const index = Array.prototype.indexOf.call(form.elements, e.target);

        const now = Date.now();
        const isDoubleEnter = now - lastEnterTimeRef.current < 300;
        lastEnterTimeRef.current = isDoubleEnter ? 0 : now;

        const skipCount = isDoubleEnter ? 2 : 1;
        let nextIndex = index + 1;
        let foundCount = 0;
        while (nextIndex < form.elements.length) {
          const nextElement = form.elements[nextIndex];
          if (
            (nextElement.tagName === 'INPUT' || nextElement.tagName === 'SELECT' || nextElement.tagName === 'TEXTAREA') &&
            nextElement.type !== 'hidden' &&
            nextElement.type !== 'submit' &&
            !nextElement.disabled &&
            !nextElement.readOnly
          ) {
            foundCount++;
            if (foundCount === skipCount) {
              nextElement.focus();
              break;
            }
          }
          nextIndex++;
        }
      }
    }
  };

  // Product CRUD Operations
  const handleAddProduct = async (e) => {
    e.preventDefault();
    // RBAC Security Check
    if (adminRole === 'Manager' || adminRole === 'Marketing Manager') {
      showAdminNotification("Role Permission Error: Only Super Admin and Inventory Managers can add products.", "error");
      return;
    }
    try {
      const prodId = `hrj-custom-${Date.now()}`;
      await setDoc(doc(db, 'products', prodId), {
        ...newProduct,
        id: prodId,
        reviews: [],
        createdDate: new Date()
      });
      setNewProduct({
        name: '', category: 'gold', categoryType: 'Gold', subCategory: '', desc: '', price: '',
        carat: '22K', weight: '', img: '', badge: '', purityInfo: '',
        makingCharges: '', sku: '', stoneInfo: '', hallmark: 'BIS 916 Government Certified',
        tags: '', seoTitle: '', seoDesc: '', featured: false, stockQty: 10,
        subImages: [],
        discountPercent: 20,
        discountOffDiamond: '',
        discountOffMaking: '',
        diamondWeight: '',
        settingStyle: 'Prong Setting',
        certificate: 'SGL / GSI Certified',
        igiCertificate: '',
        certNumber: '',
        metalPurity: '22KT',
        metalColor: 'Yellow Gold',
        netWeight: '',
        grossWeight: '',
        silverWeight: '',
        productDimensions: '',
        diamondQuality: '',
        diamondShape: 'Round',
        diamondQuantity: '',
        diamondCarat: '',
        diamondColor: 'GH',
        diamondClarity: 'VVS1',
        diamondCut: 'Excellent',
        stoneCarat: '',
        beadsCarat: '',
        pearlsCarat: '',
        gemstoneCarat: '',
        diamondValue: '',
        pearlsValue: '',
        gender: 'Unisex',
        occasion: 'Everyday Wear',
        gstPercent: 3,
        bangleSizes: [],
        chainSizes: [],
        ringSizes: Array.from({ length: 34 - 6 + 1 }, (_, i) => { const num = 6 + i; return num < 10 ? `0${num}` : `${num}`; })
      });
      showAdminNotification("New jewellery item added successfully!", "success");
    } catch (err) {
      console.error("Error adding product:", err);
      showAdminNotification("Error adding product: " + err.message, "error");
    }
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    if (adminRole === 'Manager' || adminRole === 'Marketing Manager') {
      showAdminNotification("Role Permission Error: Only Super Admin and Inventory Managers can edit products.", "error");
      return;
    }
    try {
      await updateDoc(doc(db, 'products', editingProduct.id), editingProduct);
      setEditingProduct(null);
      showAdminNotification("Catalog product updated successfully!", "success");
    } catch (err) {
      console.error("Error updating product:", err);
      showAdminNotification("Error updating product: " + err.message, "error");
    }
  };

  const handleDeleteProduct = async (prodId) => {
    if (adminRole === 'Manager' || adminRole === 'Marketing Manager') {
      showAdminNotification("Role Permission Error: Only Super Admin and Inventory Managers can delete products.", "error");
      return;
    }
    if (!window.confirm("Are you sure you want to delete this jewellery item?")) return;
    try {
      await deleteDoc(doc(db, 'products', prodId));
      showAdminNotification("Product deleted successfully!", "success");
    } catch (err) {
      console.error("Error deleting product:", err);
      showAdminNotification("Error deleting product: " + err.message, "error");
    }
  };

  const handleDeleteSelectedCatalog = async () => {
    if (adminRole === 'Manager' || adminRole === 'Marketing Manager') {
      showAdminNotification("Role Permission Error: Only Super Admin and Inventory Managers can delete products.", "error");
      return;
    }
    if (selectedCatalogIds.length === 0) return;
    if (!window.confirm(`Are you sure you want to delete all ${selectedCatalogIds.length} selected jewellery items?`)) return;
    try {
      for (const prodId of selectedCatalogIds) {
        await deleteDoc(doc(db, 'products', prodId));
      }
      setSelectedCatalogIds([]);
      showAdminNotification("Selected jewellery items deleted successfully!", "success");
    } catch (err) {
      console.error("Error deleting selected products:", err);
      showAdminNotification("Error deleting selected products: " + err.message, "error");
    }
  };

  // Upload category cover image directly to Cloudinary
  const handleCategoryImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const isLarge = file.size > 500 * 1024;
    setCategoryUploadProgress(isLarge ? "âš ï¸ Warning: Image exceeds 500KB. Uploading..." : "Uploading category image...");
    try {
      const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'dcraweoxj';
      const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'hr_jewellers_unsigned';

      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', uploadPreset);
      formData.append('folder', 'categories');

      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Failed to upload to Cloudinary');
      }

      const data = await response.json();
      const downloadURL = data.secure_url;
      setNewCategoryImage(downloadURL);
      setCategoryUploadProgress(isLarge ? "âš ï¸ Upload complete (Image exceeds 500KB)!" : "Image upload complete!");
    } catch (err) {
      console.error("Cloudinary category upload error:", err);
      setCategoryUploadProgress(`Image upload failed: ${err.message}`);
    }
  };

  // Upload asset directly to Cloudinary
  const handleImageUpload = async (e, mode) => {
    const file = e.target.files[0];
    if (!file) return;
    const isLarge = file.size > 500 * 1024;
    setImageUploadProgress(isLarge ? "âš ï¸ Warning: Image exceeds 500KB. Uploading..." : "Uploading master image...");
    try {
      const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'dcraweoxj';
      const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'hr_jewellers_unsigned';

      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', uploadPreset);
      formData.append('folder', 'products');

      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Failed to upload to Cloudinary');
      }

      const data = await response.json();
      const downloadURL = data.secure_url;

      if (mode === 'new') {
        setNewProduct(prev => ({ ...prev, img: downloadURL }));
      } else {
        setEditingProduct(prev => ({ ...prev, img: downloadURL }));
      }
      setImageUploadProgress(isLarge ? "âš ï¸ Upload complete (Image exceeds 500KB)!" : "Image upload complete!");
    } catch (err) {
      console.error("Cloudinary upload error:", err);
      setImageUploadProgress(`Image upload failed: ${err.message}`);
    }
  };

  const handleSubImagesUpload = async (e, mode) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
    const largeFilesCount = files.filter(f => f.size > 500 * 1024).length;
    setSubImagesUploadProgress(largeFilesCount > 0 ? `âš ï¸ Warning: ${largeFilesCount} file(s) exceed 500KB. Uploading...` : `Uploading ${files.length} files...`);
    try {
      const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'dcraweoxj';
      const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'hr_jewellers_unsigned';

      const urls = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', uploadPreset);
        formData.append('folder', 'products');

        const isVideo = file.type.startsWith('video/');
        const resourceType = isVideo ? 'video' : 'image';

        const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`, {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error?.message || 'Failed to upload sub-image');
        }

        const data = await response.json();
        urls.push(data.secure_url);
      }

      if (mode === 'new') {
        setNewProduct(prev => ({
          ...prev,
          subImages: [...(prev.subImages || []), ...urls]
        }));
      } else {
        setEditingProduct(prev => ({
          ...prev,
          subImages: [...(prev.subImages || []), ...urls]
        }));
      }
      setSubImagesUploadProgress(largeFilesCount > 0 ? "âš ï¸ Upload complete (Some files exceeded 500KB)!" : "Files upload complete!");
    } catch (err) {
      console.error("Cloudinary sub-images upload error:", err);
      setSubImagesUploadProgress(`Upload failed: ${err.message}`);
    }
  };

  const handleRemoveSubImage = (indexToRemove, mode) => {
    if (mode === 'new') {
      setNewProduct(prev => ({
        ...prev,
        subImages: (prev.subImages || []).filter((_, idx) => idx !== indexToRemove)
      }));
    } else {
      setEditingProduct(prev => ({
        ...prev,
        subImages: (prev.subImages || []).filter((_, idx) => idx !== indexToRemove)
      }));
    }
  };

  // Category Operations
  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (adminRole === 'Manager' || adminRole === 'Marketing Manager') {
      showAdminNotification("Role Permission Error: Access Denied.", "error");
      return;
    }
    if (!newCategoryName.trim()) return;
    try {
      const catId = newCategoryName.toLowerCase().replace(/\s+/g, '-');
      await setDoc(doc(db, 'categories', catId), {
        name: newCategoryName,
        id: catId,
        img: newCategoryImage || ''
      });
      setNewCategoryName('');
      setNewCategoryImage('');
      setCategoryUploadProgress(null);
      showAdminNotification("Category added successfully!", "success");
    } catch (err) {
      console.error("Error adding category:", err);
      showAdminNotification("Error adding category: " + err.message, "error");
    }
  };

  const handleUpdateCategory = async (e) => {
    e.preventDefault();
    if (adminRole === 'Manager' || adminRole === 'Marketing Manager') {
      showAdminNotification("Role Permission Error: Access Denied.", "error");
      return;
    }
    if (!newCategoryName.trim()) return;
    try {
      await updateDoc(doc(db, 'categories', editingCategory.id), {
        name: newCategoryName,
        img: newCategoryImage || ''
      });
      setNewCategoryName('');
      setNewCategoryImage('');
      setCategoryUploadProgress(null);
      setEditingCategory(null);
      showAdminNotification("Category updated successfully!", "success");
    } catch (err) {
      console.error("Error updating category:", err);
      showAdminNotification("Error updating category: " + err.message, "error");
    }
  };

  const handleDeleteCategory = async (catId) => {
    if (adminRole === 'Manager' || adminRole === 'Marketing Manager') {
      showAdminNotification("Role Permission Error: Access Denied.", "error");
      return;
    }
    if (!window.confirm("Are you sure you want to delete this category?")) return;
    try {
      await deleteDoc(doc(db, 'categories', catId));
      showAdminNotification("Category deleted successfully!", "success");
    } catch (err) {
      console.error("Error deleting category:", err);
      showAdminNotification("Error deleting category: " + err.message, "error");
    }
  };

  // Status Modifiers
  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    if (adminRole === 'Inventory Manager' || adminRole === 'Marketing Manager') {
      showAdminNotification("Role Permission Error: Only Super Admin and Managers can modify orders.", "error");
      return;
    }
    try {
      await updateDoc(doc(db, 'orders', orderId), { orderStatus: newStatus });
      showAdminNotification(`Order status updated to: ${newStatus}`, "success");
    } catch (err) {
      console.error("Error updating order status:", err);
      showAdminNotification("Error updating order status: " + err.message, "error");
    }
  };

  const handleDeleteOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to permanently delete this order?")) {
      return;
    }
    try {
      await deleteDoc(doc(db, 'orders', orderId));
      showAdminNotification("Order deleted successfully!", "success");
    } catch (err) {
      console.error("Error deleting order:", err);
      showAdminNotification("Error deleting order: " + err.message, "error");
    }
  };

  const handleDeleteConsult = async (consultId) => {
    if (!window.confirm("Are you sure you want to permanently delete this booking request?")) {
      return;
    }
    try {
      await deleteDoc(doc(db, 'consultations', consultId));
      showAdminNotification("Booking request deleted successfully!", "success");
    } catch (err) {
      console.error("Error deleting booking request:", err);
      showAdminNotification("Error deleting booking request: " + err.message, "error");
    }
  };

  const handleUpdateConsultStatus = async (consultId, newStatus) => {
    try {
      await updateDoc(doc(db, 'consultations', consultId), { status: newStatus });
      showAdminNotification(`Consultation status updated to: ${newStatus}`, "success");
    } catch (err) {
      console.error("Error updating consultation status:", err);
      showAdminNotification("Error updating consultation status: " + err.message, "error");
    }
  };

  // Dynamic Excel/CSV reports exporter
  const handleExportCSV = (dataType) => {
    let csvContent = "data:text/csv;charset=utf-8,";
    if (dataType === 'orders') {
      csvContent += "Order ID,Customer,Phone,Amount,Status,Date\n";
      adminOrders.forEach(o => {
        csvContent += `"${o.orderId}","${o.customerDetails?.name || ''}","${o.customerDetails?.phone || ''}",${o.amount || 0},"${o.orderStatus}","${o.createdDate?.toDate().toLocaleDateString() || ''}"\n`;
      });
    } else {
      csvContent += "Customer Name,Phone,Email,Total Bookings\n";
      adminConsults.forEach(c => {
        csvContent += `"${c.name}","${c.phone || ''}","${c.email || ''}",1\n`;
      });
    }
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `hr-jewellers-${dataType}-${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };



  // Simulated local premium AI prediction/generation
  const generateAiAnalysis = () => {
    setAiAnalysisResult("Consulting intelligence model...");
    setTimeout(() => {
      const insights = `HR JEWELLERS - AI ANALYTICS INTELLIGENCE:\n\n* Demand Shift: Rings & Kada portfolios witnessed a massive 38% increase in searches this month due to festive wedding alignments.\n* Stock Advisory: Mayur Solitaire Ring inventory will deplete in 12 days based on current average checkout velocities. Consider seeding 5 more units.\n* VIP Client: Customer 'Shree Ballabh Kiradoo' from Bikaner is in the 95th percentile of purchase intent. Consider offering a dedicated 5% loyalty coupon ('GOLDHR5').`;
      setAiAnalysisResult(insights);
    }, 1200);
  };

  // WhatsApp automation template prefiller
  const sendWhatsAppNotification = (order, type) => {
    const template = waTemplates[type];
    let msg = template
      .replace('{Customer}', order.customerDetails?.name || 'Patron')
      .replace('{OrderId}', order.orderId)
      .replace('{Tracking}', 'HRJ-SECURE-98342')
      .replace('{Amount}', order.amount?.toLocaleString('en-IN') || '0');

    window.open(`https://wa.me/${order.customerDetails?.phone || ''}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  // Dynamic calculations for stats
  const analyticsStats = () => {
    const totalOrdersCount = adminOrders.length;
    const pendingOrdersCount = adminOrders.filter(o => o.orderStatus === 'Pending').length;
    const completedOrdersCount = adminOrders.filter(o => o.orderStatus === 'Completed').length;
    const totalSalesRevenue = adminOrders.reduce((sum, o) => sum + (o.amount || 0), 0);
    const avgOrderVal = totalOrdersCount > 0 ? Math.round(totalSalesRevenue / totalOrdersCount) : 0;

    // VIP counts
    const totalClientsCount = adminConsults.length;

    return {
      revenue: totalSalesRevenue,
      todayRevenue: Math.round(totalSalesRevenue * 0.12), // Simulated daily stats
      monthlyRevenue: Math.round(totalSalesRevenue * 0.85),
      orders: totalOrdersCount,
      pending: pendingOrdersCount,
      completed: completedOrdersCount,
      customers: totalClientsCount,
      aov: avgOrderVal
    };
  };

  const stats = analyticsStats();

  return (
    <div className={`${darkMode ? 'dark bg-[#121216] text-white' : 'bg-[#F6F7FB] text-[#1E1F29]'} min-h-screen relative font-sans flex transition-colors duration-300 w-full`}>



      {/* Dynamic Invoice Printable Overlay Modal */}
      {selectedInvoiceOrder && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white text-gray-900 max-w-2xl w-full rounded-3xl p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto print:p-0 print:shadow-none print:max-h-full">
            <button
              onClick={() => setSelectedInvoiceOrder(null)}
              className="absolute top-4 right-4 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold p-2.5 rounded-full text-xs print:hidden focus:outline-none"
            >
              âœ•
            </button>

            {/* Print trigger button */}
            <div className="flex justify-end gap-3 mb-6 print:hidden">
              <button
                onClick={() => window.print()}
                className="bg-[#3F1F54] hover:bg-[#2C133C] text-white font-bold text-[10px] uppercase tracking-wider px-5 py-2.5 rounded-full shadow-md"
              >
                Print Invoice Document
              </button>
            </div>

            {/* Actual Invoice sheet */}
            <div id="invoice-sheet" className="space-y-6 normal-case text-xs">
              <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                <div>
                  <h2 className="serif-luxury text-xl font-bold text-[#3F1F54]">HR JEWELLERS & SONS</h2>
                  <p className="text-[9px] text-[#BCA057] uppercase tracking-widest font-bold mt-0.5">Heritage Jewellery Craftsmanship</p>
                  <p className="text-[9px] text-gray-500 mt-1">Bikaner, Rajasthan Â· +91 97838 43978</p>
                </div>
                <div className="text-right">
                  <h3 className="text-lg font-bold text-gray-800">INVOICE</h3>
                  <p className="font-semibold text-gray-600 mt-0.5">{selectedInvoiceOrder.orderId}</p>
                  <p className="text-[9px] text-gray-400 mt-1">{selectedInvoiceOrder.createdDate?.toDate().toLocaleString()}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-[9px] uppercase tracking-wider text-gray-400 font-bold mb-1">Patron Details:</h4>
                  <p className="font-bold text-gray-800">{selectedInvoiceOrder.customerDetails?.name}</p>
                  <p className="text-gray-500 font-medium">{selectedInvoiceOrder.customerDetails?.phone}</p>
                  <p className="text-gray-500 font-light mt-0.5">{selectedInvoiceOrder.customerDetails?.email}</p>
                </div>
                <div className="text-right">
                  <h4 className="text-[9px] uppercase tracking-wider text-gray-400 font-bold mb-1">Secure Shipping Destination:</h4>
                  <p className="text-gray-600 font-medium">{selectedInvoiceOrder.customerDetails?.address}</p>
                  <p className="text-gray-500 font-light mt-0.5">Transit Partner: HR Royal Courier</p>
                </div>
              </div>

              <table className="w-full border-collapse border-b border-gray-100">
                <thead>
                  <tr className="bg-gray-50 text-gray-600 uppercase text-[9px] tracking-wider font-bold">
                    <th className="py-2.5 px-3 text-left">Item Description</th>
                    <th className="py-2.5 px-3 text-center">Weight / Spec</th>
                    <th className="py-2.5 px-3 text-right">Unit Value</th>
                    <th className="py-2.5 px-3 text-center">Qty</th>
                    <th className="py-2.5 px-3 text-right">Total Net</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedInvoiceOrder.productDetails?.map((item, idx) => (
                    <tr key={idx} className="border-b border-gray-100/50 text-gray-700">
                      <td className="py-3 px-3 font-semibold">{item.name}</td>
                      <td className="py-3 px-3 text-center text-gray-500">{item.weight || 'Gold'} Â· {item.carat || '22K'}</td>
                      <td className="py-3 px-3 text-right">â‚¹{item.price?.toLocaleString('en-IN')}</td>
                      <td className="py-3 px-3 text-center">{item.quantity || 1}</td>
                      <td className="py-3 px-3 text-right font-semibold">â‚¹{(item.price * (item.quantity || 1))?.toLocaleString('en-IN')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="flex justify-end">
                <div className="w-64 space-y-2 border-t border-gray-100 pt-3 text-xs">
                  <div className="flex justify-between text-gray-500">
                    <span>Subtotal Val:</span>
                    <span>â‚¹{selectedInvoiceOrder.amount?.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-gray-500">
                    <span>BIS Hallmark stamp tax (GST 3%):</span>
                    <span>Inclusive</span>
                  </div>
                  <div className="flex justify-between text-gray-500">
                    <span>Making Charges:</span>
                    <span>Inclusive</span>
                  </div>
                  <div className="flex justify-between font-bold text-gray-900 border-t border-dashed border-gray-200 pt-2 text-sm">
                    <span>Invoice Total:</span>
                    <span className="text-[#3F1F54]">â‚¹{selectedInvoiceOrder.amount?.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-6 text-center text-gray-400 text-[9px] uppercase tracking-wider space-y-1">
                <p className="font-bold text-[#BCA057]">â˜… Certified Government BIS Hallmark Stamps Provided â˜…</p>
                <p>This is a computer generated invoice. No signature required.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CRM Client Details Sliding Drawer Modal */}
      {selectedClient && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex justify-end animate-fade-in">
          <div className="bg-white dark:bg-[#1E1F29] text-gray-900 dark:text-gray-100 max-w-md w-full h-full p-8 shadow-2xl relative flex flex-col space-y-6 overflow-y-auto animate-slide-left">
            <button
              onClick={() => setSelectedClient(null)}
              className="absolute top-4 left-4 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 font-bold p-2 rounded-full text-xs"
            >
              â† Close
            </button>

            <div className="pt-6 text-center space-y-2">
              <div className="w-20 h-20 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full flex items-center justify-center text-2xl font-bold mx-auto">
                {selectedClient.name?.charAt(0)}
              </div>
              <h3 className="serif-luxury text-xl font-bold text-[#3F1F54] dark:text-[#E6C687]">{selectedClient.name}</h3>
              <span className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider ${selectedClient.segment === 'VIP' ? 'bg-yellow-100 text-yellow-700' : 'bg-purple-100 text-purple-700'}`}>
                {selectedClient.segment}
              </span>
            </div>

            <div className="border-t border-gray-100 dark:border-gray-800 pt-4 space-y-3 text-xs">
              <p><strong>Mobile Contact:</strong> {selectedClient.phone}</p>
              <p><strong>Secure Mail:</strong> {selectedClient.email || 'N/A'}</p>
              <p><strong>Registered City:</strong> {selectedClient.city || 'Bikaner'}</p>
              <p><strong>Total Purchases spend:</strong> <span className="font-bold text-green-600">â‚¹{selectedClient.totalSpend?.toLocaleString('en-IN')}</span></p>
              <p><strong>Active Bookings count:</strong> {selectedClient.totalOrders}</p>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-[9px] uppercase tracking-wider text-gray-400">Interaction Timeline Log</h4>
              <div className="border-l-2 border-purple-200 dark:border-purple-800 ml-2 pl-4 space-y-4 text-[10px]">
                <div className="relative">
                  <div className="absolute -left-[21px] top-1 w-2 h-2 rounded-full bg-purple-600"></div>
                  <p className="font-bold">Consultation Booked</p>
                  <p className="text-gray-400">Scheduled for jewelry showcase review.</p>
                </div>
                <div className="relative">
                  <div className="absolute -left-[21px] top-1 w-2 h-2 rounded-full bg-yellow-500"></div>
                  <p className="font-bold">WhatsApp Template Sent</p>
                  <p className="text-gray-400">Custom design preview link shared via WhatsApp.</p>
                </div>
              </div>
            </div>

            <div className="space-y-2.5 pt-4">
              <label htmlFor="crm-notes-input" className="font-bold text-[9px] uppercase tracking-wider text-gray-400 block">Internal Staff Notes</label>
              <textarea
                id="crm-notes-input"
                rows="3"
                placeholder="Write specific diamond preference notes, sizing constraints..."
                className="w-full bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 text-xs text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none resize-none"
              ></textarea>
              <button
                onClick={() => { showAdminNotification("Staff logs updated successfully!", "success"); setSelectedClient(null); }}
                className="w-full bg-[#3F1F54] hover:bg-[#2C133C] text-white font-bold text-xs uppercase tracking-widest py-3 rounded-xl transition-all"
              >
                Save Timeline Log
              </button>
            </div>
          </div>
        </div>
      )}

      {!adminUser ? (
        <AdminLoginPortal
          adminEmail={adminEmail}
          setAdminEmail={setAdminEmail}
          adminPassword={adminPassword}
          setAdminPassword={setAdminPassword}
          adminError={adminError}
          handleAdminLogin={handleAdminLogin}
          handleAutofillDemo={handleAutofillDemo}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          rememberMe={rememberMe}
          setRememberMe={setRememberMe}
          isForgotModalOpen={isForgotModalOpen}
          setIsForgotModalOpen={setIsForgotModalOpen}
          forgotEmail={forgotEmail}
          setForgotEmail={setForgotEmail}
          forgotStatus={forgotStatus}
          setForgotStatus={setForgotStatus}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          mousePos={mousePos}
        />
      ) : (

        /* STANDARD VAULT LAYOUT */
        <div className="flex w-full">

          {/* AMETHYST SIDEBAR NAVIGATION GRID */}
          <Sidebar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            adminUser={adminUser}
            adminRole={adminRole}
            handleAdminLogout={handleAdminLogout}
            isSidebarCollapsed={isSidebarCollapsed}
            setIsSidebarCollapsed={setIsSidebarCollapsed}
          />

          {/* MAIN VIEW CONTAINER GRID */}
          <main className="flex-1 min-w-0 p-4 sm:p-10 pb-24 md:pb-10 flex flex-col justify-between">

            {adminNotification.message && (
              <div className={`mb-6 p-4 rounded-2xl flex items-center justify-between border ${adminNotification.type === 'error'
                ? 'bg-red-500/10 border-red-500/20 text-red-600 dark:text-red-400'
                : 'bg-green-500/10 border-green-500/20 text-green-600 dark:text-green-400'
                }`}>
                <span className="text-xs font-bold uppercase tracking-wider">{adminNotification.message}</span>
                <button onClick={() => setAdminNotification({ message: '', type: 'success' })} className="font-bold text-sm">âœ•</button>
              </div>
            )}

            {/* UPPER CONSOLE HEADER */}
            <Header
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              darkMode={darkMode}
              setDarkMode={setDarkMode}
              adminUser={adminUser}
              handleAdminLogout={handleAdminLogout}
              adminRole={adminRole}
              notifications={notifications}
              showNotifications={showNotifications}
              setShowNotifications={setShowNotifications}
              setOrderSearch={setOrderSearch}
              setOrderStatusFilter={setOrderStatusFilter}
              setCrmSearch={setCrmSearch}
            />

            {/* ERP DASHBOARD VIEWPORT PANELS */}
            <div className="flex-1 animate-fade-in text-xs">

              {activeTab === 'dashboard' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Total Jewellery Card */}
                    <div className="bg-white dark:bg-[#1E1F29] border border-gray-150/40 dark:border-gray-800 rounded-[24px] shadow-[0_8px_32px_rgba(15,23,42,0.05)] p-6 flex items-center justify-between hover:shadow-md transition-all h-[140px]">
                      <div className="flex items-center space-x-4">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#BCA057] to-[#E6C687] text-white flex items-center justify-center shrink-0 shadow-sm">
                          <Gem className="w-6 h-6 text-white" />
                        </div>
                        <div className="space-y-1">
                          <span className="text-[12px] uppercase tracking-wider text-gray-400 dark:text-gray-500 font-medium block leading-none">Total Number of Jewellery</span>
                          <h3 className="text-[32px] font-bold text-[#3F1F54] dark:text-[#E6C687] leading-none my-1">{products.length}</h3>
                          <span className="text-[10px] text-gray-400 dark:text-gray-500 font-medium">Jewellery items in catalog</span>
                        </div>
                      </div>
                    </div>

                    {/* Total Categories Card */}
                    <div className="bg-white dark:bg-[#1E1F29] border border-gray-150/40 dark:border-gray-800 rounded-[24px] shadow-[0_8px_32px_rgba(15,23,42,0.05)] p-6 flex items-center justify-between hover:shadow-md transition-all h-[140px]">
                      <div className="flex items-center space-x-4">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#3F1F54] to-[#603080] text-white flex items-center justify-center shrink-0 shadow-sm">
                          <Boxes className="w-6 h-6 text-white" />
                        </div>
                        <div className="space-y-1">
                          <span className="text-[12px] uppercase tracking-wider text-gray-400 dark:text-gray-500 font-medium block leading-none">Total Number of Categories</span>
                          <h3 className="text-[32px] font-bold text-[#3F1F54] dark:text-[#E6C687] leading-none my-1">{categories.length}</h3>
                          <span className="text-[10px] text-gray-400 dark:text-gray-500 font-medium">Active collections</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {activeTab === 'products' && (
                <div className="space-y-10">

                  {/* â”€â”€ SKU Quick Search Bar â”€â”€ */}
                  <div className="bg-white dark:bg-[#15151A] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-xs">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-[#3F1F54]/10 dark:bg-[#E6C687]/10 flex items-center justify-center shrink-0">
                        <Search className="w-4 h-4 text-[#3F1F54] dark:text-[#E6C687]" />
                      </div>
                      <div>
                        <h4 className="text-xs font-black tracking-wider text-zinc-900 dark:text-[#E6C687] uppercase">Search by SKU Code</h4>
                        <p className="text-[9px] text-zinc-400 dark:text-zinc-500 font-medium">Enter exact SKU to instantly locate &amp; edit a registered jewellery item.</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400 pointer-events-none" />
                        <input
                          type="text"
                          placeholder="e.g. HRJ-RNG-0982"
                          value={skuSearch}
                          onChange={(e) => {
                            setSkuSearch(e.target.value);
                            setSkuSearchResult(null);
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              const q = skuSearch.trim().toLowerCase();
                              if (!q) return;
                              const found = products.find(p => p.sku?.toLowerCase() === q);
                              if (found) {
                                setEditingProduct(found);
                                setSkuSearchResult('found');
                              } else {
                                setSkuSearchResult('notfound');
                              }
                            }
                          }}
                          className="w-full h-10 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl pl-9 pr-4 text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:border-[#3F1F54] dark:focus:border-[#E6C687] focus:ring-1 focus:ring-[#3F1F54]/10 transition-all"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          const q = skuSearch.trim().toLowerCase();
                          if (!q) return;
                          const found = products.find(p => p.sku?.toLowerCase() === q);
                          if (found) {
                            setEditingProduct(found);
                            setSkuSearchResult('found');
                          } else {
                            setSkuSearchResult('notfound');
                          }
                        }}
                        className="h-10 px-5 bg-[#3F1F54] hover:bg-[#5a2e78] dark:bg-[#E6C687] dark:hover:bg-[#d4b275] dark:text-zinc-950 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer shrink-0"
                      >
                        Search
                      </button>
                      {skuSearch && (
                        <button
                          type="button"
                          onClick={() => { setSkuSearch(''); setSkuSearchResult(null); setEditingProduct(null); }}
                          className="h-10 w-10 flex items-center justify-center border border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all cursor-pointer shrink-0"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    {skuSearchResult === 'found' && (
                      <div className="mt-3 flex items-center gap-2 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-2 rounded-lg">
                        <span>âœ…</span>
                        <span>Product found! Form loaded below for editing. Scroll down to update details.</span>
                      </div>
                    )}
                    {skuSearchResult === 'notfound' && (
                      <div className="mt-3 flex items-center gap-2 text-[10px] font-bold text-red-600 dark:text-red-400 bg-red-500/10 border border-red-500/20 px-3 py-2 rounded-lg">
                        <span>âŒ</span>
                        <span>No product found with SKU &quot;{skuSearch}&quot;. Please check the code and try again.</span>
                      </div>
                    )}
                  </div>

                  {/* Form to add or edit signature products */}
                  <div className="bg-white dark:bg-[#15151A] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-8 shadow-xs">
                    <div className="border-b border-zinc-100 dark:border-zinc-850 pb-4 flex justify-between items-center">
                      <div>
                        <h3 className="text-base font-black tracking-wider text-zinc-900 dark:text-[#E6C687] uppercase">
                          {editingProduct ? 'Update Jewellery Details' : 'Register New Jewellery'}
                        </h3>
                        <p className="text-[10px] text-zinc-400 dark:text-zinc-500 font-medium">Add parameters, metal values, diamond scales and prices to catalog registry.</p>
                      </div>
                      {editingProduct && (
                        <button
                          type="button"
                          onClick={() => setEditingProduct(null)}
                          className="px-3 py-1 rounded-md border border-zinc-200 dark:border-zinc-800 text-[10px] font-bold text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all uppercase cursor-pointer"
                        >
                          Reset Add Mode
                        </button>
                      )}
                    </div>

                    {categories.length === 0 && (
                      <div className="p-4 bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-400 rounded-xl flex items-start gap-3 text-xs leading-relaxed">
                        <AlertTriangle className="w-5 h-5 shrink-0 text-amber-500 mt-0.5" />
                        <div className="space-y-1">
                          <p className="font-bold uppercase tracking-wider text-[10px]">âš ï¸ Mandatory Step Required</p>
                          <p>You must establish at least one Category catalog before creating signature items. Please head to the <button type="button" onClick={() => setActiveTab('inventory')} className="font-bold underline hover:text-amber-805 cursor-pointer">Add Categories</button> screen to create one.</p>
                        </div>
                      </div>
                    )}

                    <form onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct} className="space-y-8" onKeyDown={handleFormKeyDown}>

                      {/* Section: General Details */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-[#E6C687]"></span>
                          <h4 className="text-[10px] font-bold tracking-widest text-zinc-400 dark:text-zinc-500 uppercase">General Information</h4>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-6 gap-4">
                          <div className="space-y-1.5">
                            <label htmlFor="prod-name-form" className="text-[9px] uppercase tracking-wider text-zinc-400 font-bold block px-1">Jewellery Name</label>
                            <input
                              id="prod-name-form"
                              type="text"
                              required
                              placeholder="e.g. Royal Mayur Solitaire Ring"
                              value={editingProduct ? editingProduct.name : newProduct.name}
                              onChange={(e) => editingProduct ? setEditingProduct({ ...editingProduct, name: e.target.value }) : setNewProduct({ ...newProduct, name: e.target.value })}
                              className="w-full h-10 bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 text-xs text-zinc-905 dark:text-zinc-100 placeholder-zinc-450 focus:outline-none focus:border-zinc-900 dark:focus:border-zinc-200 focus:ring-1 focus:ring-zinc-900/5"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label htmlFor="prod-sku-form" className="text-[9px] uppercase tracking-wider text-zinc-400 font-bold block px-1">SKU Code</label>
                            <input
                              id="prod-sku-form"
                              type="text"
                              required
                              placeholder="e.g. HRJ-RNG-0982"
                              value={editingProduct ? editingProduct.sku : newProduct.sku}
                              onChange={(e) => editingProduct ? setEditingProduct({ ...editingProduct, sku: e.target.value }) : setNewProduct({ ...newProduct, sku: e.target.value })}
                              className="w-full h-10 bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 text-xs text-zinc-905 dark:text-zinc-100 placeholder-zinc-450 focus:outline-none focus:border-zinc-900 dark:focus:border-zinc-200 focus:ring-1 focus:ring-zinc-900/5"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label htmlFor="prod-category-form" className="text-[9px] uppercase tracking-wider text-zinc-400 font-bold block px-1">Category Portfolio</label>
                            <select
                              id="prod-category-form"
                              value={editingProduct ? editingProduct.category : newProduct.category}
                              onChange={(e) => editingProduct ? setEditingProduct({ ...editingProduct, category: e.target.value }) : setNewProduct({ ...newProduct, category: e.target.value })}
                              className="w-full h-10 bg-white dark:bg-[#09090B] border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 text-xs text-zinc-905 dark:text-zinc-100 focus:outline-none focus:border-zinc-900 dark:focus:border-zinc-200 cursor-pointer"
                            >
                              {categories.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                              ))}
                            </select>
                          </div>
                          <div className="space-y-1.5">
                            <label htmlFor="prod-categoryType-form" className="text-[9px] uppercase tracking-wider text-zinc-400 font-bold block px-1">Metal Type</label>
                            <select
                              id="prod-categoryType-form"
                              value={editingProduct ? (editingProduct.categoryType || 'Gold') : (newProduct.categoryType || 'Gold')}
                              onChange={(e) => editingProduct ? setEditingProduct({ ...editingProduct, categoryType: e.target.value }) : setNewProduct({ ...newProduct, categoryType: e.target.value })}
                              className="w-full h-10 bg-white dark:bg-[#09090B] border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 text-xs text-zinc-905 dark:text-zinc-100 focus:outline-none focus:border-zinc-900 dark:focus:border-zinc-200 cursor-pointer"
                            >
                              <option value="Gold">Gold</option>
                              <option value="925 Sterling Silver">925 Sterling Silver</option>
                              <option value="Normal Silver">Normal Silver</option>
                              <option value="999 Silver">999 Silver</option>
                            </select>
                          </div>
                          {/* Silver Weight â€” show only when 999 Silver is selected */}
                          {(() => {
                            const catType = editingProduct ? (editingProduct.categoryType || 'Gold') : (newProduct.categoryType || 'Gold');
                            if (catType !== '999 Silver') return null;
                            return (
                              <div className="space-y-1.5">
                                <label htmlFor="prod-silverWeight-form" className="text-[9px] uppercase tracking-wider text-zinc-400 font-bold block px-1">Silver Weight</label>
                                <select
                                  id="prod-silverWeight-form"
                                  value={editingProduct ? (editingProduct.silverWeight || '') : (newProduct.silverWeight || '')}
                                  onChange={(e) => editingProduct ? setEditingProduct({ ...editingProduct, silverWeight: e.target.value }) : setNewProduct({ ...newProduct, silverWeight: e.target.value })}
                                  className="w-full h-10 bg-white dark:bg-[#09090B] border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 text-xs text-zinc-905 dark:text-zinc-100 focus:outline-none focus:border-zinc-900 dark:focus:border-zinc-200 cursor-pointer"
                                >
                                  <option value="">â€” Select Weight â€”</option>
                                  <option value="500 gm">500 gm</option>
                                  <option value="1 Kg">1 Kg</option>
                                </select>
                              </div>
                            );
                          })()}
                          <div className="space-y-1.5">
                            <label htmlFor="prod-gender-form" className="text-[9px] uppercase tracking-wider text-zinc-400 font-bold block px-1">Gender</label>
                            <select
                              id="prod-gender-form"
                              value={editingProduct ? (editingProduct.gender || 'Unisex') : (newProduct.gender || 'Unisex')}
                              onChange={(e) => editingProduct ? setEditingProduct({ ...editingProduct, gender: e.target.value }) : setNewProduct({ ...newProduct, gender: e.target.value })}
                              className="w-full h-10 bg-white dark:bg-[#09090B] border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 text-xs text-zinc-905 dark:text-zinc-100 focus:outline-none focus:border-zinc-900 dark:focus:border-zinc-200 cursor-pointer"
                            >
                              <option value="Unisex">Unisex</option>
                              <option value="Women">Women</option>
                              <option value="Men">Men</option>
                              <option value="Kids">Kids</option>
                            </select>
                          </div>
                          <div className="space-y-1.5">
                            <label htmlFor="prod-occasion-form" className="text-[9px] uppercase tracking-wider text-zinc-400 font-bold block px-1">Occasion</label>
                            <select
                              id="prod-occasion-form"
                              value={editingProduct ? (editingProduct.occasion || 'Everyday Wear') : (newProduct.occasion || 'Everyday Wear')}
                              onChange={(e) => editingProduct ? setEditingProduct({ ...editingProduct, occasion: e.target.value }) : setNewProduct({ ...newProduct, occasion: e.target.value })}
                              className="w-full h-10 bg-white dark:bg-[#09090B] border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 text-xs text-zinc-905 dark:text-zinc-100 focus:outline-none focus:border-zinc-900 dark:focus:border-zinc-200 cursor-pointer"
                            >
                              <option value="Everyday Wear">Everyday Wear</option>
                              <option value="Festive">Festive</option>
                              <option value="Wedding">Wedding</option>
                              <option value="Engagement">Engagement</option>
                              <option value="Anniversary">Anniversary</option>
                              <option value="Gifting">Gifting</option>
                              <option value="Workwear">Workwear</option>
                              <option value="Romantic">Romantic</option>
                              <option value="Vacation">Vacation</option>
                              <option value="Special Occasion">Special Occasion</option>
                              <option value="Valentine">Valentine</option>
                            </select>
                          </div>
                        </div>
                        <div className="space-y-1.5">
                          <label htmlFor="prod-desc-form" className="text-[9px] uppercase tracking-wider text-zinc-400 font-bold block px-1">Jewellery Parameters & Details Description</label>
                          <textarea
                            id="prod-desc-form"
                            rows="2"
                            required
                            placeholder="Complete dimensions details, custom diamond metrics, hallmark stamps details..."
                            value={editingProduct ? editingProduct.desc : newProduct.desc}
                            onChange={(e) => editingProduct ? setEditingProduct({ ...editingProduct, desc: e.target.value }) : setNewProduct({ ...newProduct, desc: e.target.value })}
                            className="w-full bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-xs text-zinc-905 dark:text-zinc-100 placeholder-zinc-450 focus:outline-none focus:border-zinc-900 dark:focus:border-zinc-200 resize-none font-medium"
                          ></textarea>
                        </div>
                      </div>

                      {/* Section: Metal Specifications */}
                      <div className="space-y-4 pt-4 border-t border-zinc-100 dark:border-zinc-850">
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-[#E6C687]"></span>
                          <h4 className="text-[10px] font-bold tracking-widest text-zinc-400 dark:text-zinc-500 uppercase">Metal Specifications</h4>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                          <div className="space-y-1.5">
                            <label htmlFor="prod-carat-form" className="text-[9px] uppercase tracking-wider text-zinc-400 font-bold block px-1">Carat & Purity</label>
                            <select
                              id="prod-carat-form"
                              value={editingProduct ? editingProduct.carat : newProduct.carat}
                              onChange={(e) => {
                                const val = e.target.value;
                                if (editingProduct) {
                                  setEditingProduct({ ...editingProduct, carat: val, metalPurity: val });
                                } else {
                                  setNewProduct({ ...newProduct, carat: val, metalPurity: val });
                                }
                              }}
                              className="w-full h-10 bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 text-xs text-zinc-905 dark:text-zinc-100 focus:outline-none focus:border-zinc-900 dark:focus:border-zinc-200 cursor-pointer"
                            >
                              <option value="9K">9K</option>
                              <option value="14K">14K</option>
                              <option value="18K">18K</option>
                              <option value="20K">20K</option>
                              <option value="22K">22K</option>
                              <option value="24K">24K (Pure Gold)</option>
                              <option value="92.5">92.5 (Silver)</option>
                            </select>
                          </div>
                          <div className="space-y-1.5">
                            <label htmlFor="prod-netWeight-form" className="text-[9px] uppercase tracking-wider text-zinc-400 font-bold block px-1">Net Weight</label>
                            <input
                              id="prod-netWeight-form"
                              type="text"
                              placeholder="e.g. 1.687 g"
                              value={editingProduct ? (editingProduct.netWeight || '') : newProduct.netWeight}
                              onChange={(e) => editingProduct ? setEditingProduct({ ...editingProduct, netWeight: e.target.value }) : setNewProduct({ ...newProduct, netWeight: e.target.value })}
                              className="w-full h-10 bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 text-xs text-zinc-905 dark:text-zinc-100 placeholder-zinc-450 focus:outline-none focus:border-zinc-900 dark:focus:border-zinc-200"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label htmlFor="prod-grossWeight-form" className="text-[9px] uppercase tracking-wider text-zinc-400 font-bold block px-1">Gross Weight</label>
                            <input
                              id="prod-grossWeight-form"
                              type="text"
                              required
                              placeholder="e.g. 1.75 g"
                              value={editingProduct ? (editingProduct.grossWeight || '') : newProduct.grossWeight}
                              onChange={(e) => {
                                const val = e.target.value;
                                if (editingProduct) {
                                  setEditingProduct({ ...editingProduct, grossWeight: val, weight: val });
                                } else {
                                  setNewProduct({ ...newProduct, grossWeight: val, weight: val });
                                }
                              }}
                              className="w-full h-10 bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 text-xs text-zinc-905 dark:text-zinc-100 placeholder-zinc-450 focus:outline-none focus:border-zinc-900 dark:focus:border-zinc-200"
                            />
                            {/* Standard Coin Weights Quick Select Selector Option */}
                            {(() => {
                              const cat = editingProduct ? editingProduct.category : newProduct.category;
                              const isCoin = cat === 'gold-coins' || cat?.toLowerCase().includes('coin');
                              if (!isCoin) return null;
                              return (
                                <div className="space-y-1 mt-2 select-none">
                                  <span className="text-[8px] uppercase tracking-wider text-zinc-400 font-bold block px-1">Quick Select Coin Weight:</span>
                                  <div className="flex flex-wrap gap-1.5">
                                    {['0.5', '1', '2', '5', '8', '10', '20', '50'].map((w) => {
                                      const activeWeight = editingProduct ? editingProduct.grossWeight : newProduct.grossWeight;
                                      const isActive = activeWeight === w;
                                      return (
                                        <button
                                          key={w}
                                          type="button"
                                          onClick={() => {
                                            if (editingProduct) {
                                              setEditingProduct({ ...editingProduct, grossWeight: w, netWeight: w, weight: w });
                                            } else {
                                              setNewProduct({ ...newProduct, grossWeight: w, netWeight: w, weight: w });
                                            }
                                          }}
                                          className={`px-2.5 py-1 text-[10px] font-bold rounded-lg border transition-all cursor-pointer ${
                                            isActive
                                              ? 'bg-[#BCA057] border-[#BCA057] text-white font-extrabold shadow-sm'
                                              : 'border-zinc-200 dark:border-zinc-800 text-zinc-650 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-850 bg-white dark:bg-zinc-900'
                                          }`}
                                        >
                                          {w}g
                                        </button>
                                      );
                                    })}
                                  </div>
                                </div>
                              );
                            })()}
                          </div>
                          {/* Product Dimensions */}
                          <div className="space-y-1.5">
                            <label htmlFor="prod-dimensions-form" className="text-[9px] uppercase tracking-wider text-zinc-400 font-bold block px-1">Product Dimensions</label>
                            <input
                              id="prod-dimensions-form"
                              type="text"
                              placeholder="e.g. 12mm Ã— 8mm Ã— 4mm"
                              value={editingProduct ? (editingProduct.productDimensions || '') : (newProduct.productDimensions || '')}
                              onChange={(e) => editingProduct ? setEditingProduct({ ...editingProduct, productDimensions: e.target.value }) : setNewProduct({ ...newProduct, productDimensions: e.target.value })}
                              className="w-full h-10 bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 text-xs text-zinc-905 dark:text-zinc-100 placeholder-zinc-450 focus:outline-none focus:border-zinc-900 dark:focus:border-zinc-200"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label htmlFor="prod-metalColor-form" className="text-[9px] uppercase tracking-wider text-zinc-400 font-bold block px-1">Metal Type</label>
                            <select
                              id="prod-metalColor-form"
                              value={editingProduct ? (editingProduct.metalColor || 'Yellow Gold') : (newProduct.metalColor || 'Yellow Gold')}
                              onChange={(e) => editingProduct ? setEditingProduct({ ...editingProduct, metalColor: e.target.value }) : setNewProduct({ ...newProduct, metalColor: e.target.value })}
                              className="w-full h-10 bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 text-xs text-zinc-905 dark:text-zinc-100 focus:outline-none focus:border-zinc-900 dark:focus:border-zinc-200 cursor-pointer"
                            >
                              <option value="Yellow Gold">Yellow Gold</option>
                              <option value="Rose Gold">Rose Gold</option>
                              <option value="White Gold">White Gold</option>
                              <option value="Platinum Plated Silver">Platinum Plated Silver</option>
                              <option value="Rose Gold Plated Silver">Rose Gold Plated Silver</option>
                              <option value="Gold Plated Silver">Gold Plated Silver</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      {/* Section: Diamonds & Gemstones Grades */}
                      <div className="space-y-4 pt-4 border-t border-zinc-100 dark:border-zinc-850">
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-[#E6C687]"></span>
                          <h4 className="text-[10px] font-bold tracking-widest text-zinc-400 dark:text-zinc-500 uppercase">Diamonds & Stone Details</h4>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-6 gap-4">
                          <div className="space-y-1.5">
                            <label htmlFor="prod-diamondShape-form" className="text-[9px] uppercase tracking-wider text-zinc-400 font-bold block px-1">Diamond Shape</label>
                            <select
                              id="prod-diamondShape-form"
                              value={editingProduct ? (editingProduct.diamondShape || 'Round') : (newProduct.diamondShape || 'Round')}
                              onChange={(e) => editingProduct ? setEditingProduct({ ...editingProduct, diamondShape: e.target.value }) : setNewProduct({ ...newProduct, diamondShape: e.target.value })}
                              className="w-full h-10 bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 text-xs text-zinc-905 dark:text-zinc-100 focus:outline-none focus:border-zinc-900 dark:focus:border-zinc-200 cursor-pointer"
                            >
                              <option value="Round">Round</option>
                              <option value="Princess">Princess</option>
                              <option value="Cushion">Cushion</option>
                              <option value="Oval">Oval</option>
                              <option value="Emerald">Emerald</option>
                              <option value="Pear">Pear</option>
                              <option value="Marquise">Marquise</option>
                              <option value="Radiant">Radiant</option>
                              <option value="Asscher">Asscher</option>
                              <option value="Heart">Heart</option>
                            </select>
                          </div>
                          <div className="space-y-1.5">
                            <label htmlFor="prod-diamondWeight-form" className="text-[9px] uppercase tracking-wider text-zinc-400 font-bold block px-1">Diamond Weight</label>
                            <input
                              id="prod-diamondWeight-form"
                              type="text"
                              placeholder="e.g. 0.3380 Ct"
                              value={editingProduct ? (editingProduct.diamondWeight || '') : newProduct.diamondWeight}
                              onChange={(e) => editingProduct ? setEditingProduct({ ...editingProduct, diamondWeight: e.target.value }) : setNewProduct({ ...newProduct, diamondWeight: e.target.value })}
                              className="w-full h-10 bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 text-xs text-zinc-905 dark:text-zinc-100 placeholder-zinc-450 focus:outline-none focus:border-zinc-900 dark:focus:border-zinc-200"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label htmlFor="prod-diamondColor-form" className="text-[9px] uppercase tracking-wider text-zinc-400 font-bold block px-1">Color Grade</label>
                            <select
                              id="prod-diamondColor-form"
                              value={editingProduct ? (editingProduct.diamondColor || 'GH') : (newProduct.diamondColor || 'GH')}
                              onChange={(e) => editingProduct ? setEditingProduct({ ...editingProduct, diamondColor: e.target.value }) : setNewProduct({ ...newProduct, diamondColor: e.target.value })}
                              className="w-full h-10 bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 text-xs text-zinc-905 dark:text-zinc-100 focus:outline-none focus:border-zinc-900 dark:focus:border-zinc-200 cursor-pointer"
                            >
                              <option value="EF">EF</option>
                              <option value="GH">GH</option>
                              <option value="HI">HI</option>
                              <option value="IJ">IJ</option>
                              <option value="JK">JK</option>
                              <option value="KL">KL</option>
                              <option value="LM">LM</option>
                              <option value="NZ">NZ</option>
                              <option value="DF">DF</option>
                            </select>
                          </div>
                          <div className="space-y-1.5">
                            <label htmlFor="prod-diamondClarity-form" className="text-[9px] uppercase tracking-wider text-zinc-400 font-bold block px-1">Clarity Grade</label>
                            <select
                              id="prod-diamondClarity-form"
                              value={editingProduct ? (editingProduct.diamondClarity || 'VVS1') : (newProduct.diamondClarity || 'VVS1')}
                              onChange={(e) => editingProduct ? setEditingProduct({ ...editingProduct, diamondClarity: e.target.value }) : setNewProduct({ ...newProduct, diamondClarity: e.target.value })}
                              className="w-full h-10 bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 text-xs text-zinc-905 dark:text-zinc-100 focus:outline-none focus:border-zinc-900 dark:focus:border-zinc-200 cursor-pointer"
                            >
                              <option value="FL">FL</option>
                              <option value="IF">IF</option>
                              <option value="VVS1">VVS1</option>
                              <option value="VVS2">VVS2</option>
                              <option value="VS1">VS1</option>
                              <option value="VS2">VS2</option>
                              <option value="SI1">SI1</option>
                              <option value="SI2">SI2</option>
                              <option value="I1">I1</option>
                              <option value="I2">I2</option>
                              <option value="I3">I3</option>
                            </select>
                          </div>
                          <div className="space-y-1.5">
                            <label htmlFor="prod-diamondCut-form" className="text-[9px] uppercase tracking-wider text-zinc-400 font-bold block px-1">Cut Grade</label>
                            <select
                              id="prod-diamondCut-form"
                              value={editingProduct ? (editingProduct.diamondCut || 'Excellent') : (newProduct.diamondCut || 'Excellent')}
                              onChange={(e) => editingProduct ? setEditingProduct({ ...editingProduct, diamondCut: e.target.value }) : setNewProduct({ ...newProduct, diamondCut: e.target.value })}
                              className="w-full h-10 bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 text-xs text-zinc-905 dark:text-zinc-100 focus:outline-none focus:border-zinc-900 dark:focus:border-zinc-200 cursor-pointer"
                            >
                              <option value="Excellent">Excellent</option>
                              <option value="Very Good">Very Good</option>
                              <option value="Good">Good</option>
                              <option value="Fair">Fair</option>
                              <option value="Poor">Poor</option>
                            </select>
                          </div>
                          <div className="space-y-1.5">
                            <label htmlFor="prod-diamondQuantity-form" className="text-[9px] uppercase tracking-wider text-zinc-400 font-bold block px-1">Diamond Pcs</label>
                            <input
                              id="prod-diamondQuantity-form"
                              type="text"
                              placeholder="e.g. 1pcs"
                              value={editingProduct ? (editingProduct.diamondQuantity || '') : newProduct.diamondQuantity}
                              onChange={(e) => editingProduct ? setEditingProduct({ ...editingProduct, diamondQuantity: e.target.value }) : setNewProduct({ ...newProduct, diamondQuantity: e.target.value })}
                              className="w-full h-10 bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 text-xs text-zinc-905 dark:text-zinc-100 placeholder-zinc-450 focus:outline-none focus:border-zinc-900 dark:focus:border-zinc-200"
                            />
                          </div>
                        </div>

                        {/* Separate Carats fields */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                          <div className="space-y-1.5">
                            <label htmlFor="prod-diamondValue-form" className="text-[9px] uppercase tracking-wider text-zinc-400 font-bold block px-1">Diamond Value (â‚¹)</label>
                            <input
                              id="prod-diamondValue-form"
                              type="number"
                              placeholder="e.g. 15000"
                              value={editingProduct ? (editingProduct.diamondValue || '') : newProduct.diamondValue}
                              onChange={(e) => editingProduct ? setEditingProduct({ ...editingProduct, diamondValue: +e.target.value }) : setNewProduct({ ...newProduct, diamondValue: +e.target.value })}
                              className="w-full h-10 bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 text-xs text-zinc-905 dark:text-zinc-100 placeholder-zinc-450 focus:outline-none focus:border-zinc-900 dark:focus:border-zinc-200"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label htmlFor="prod-stoneCarat-form" className="text-[9px] uppercase tracking-wider text-zinc-400 font-bold block px-1">Stone weight</label>
                            <input
                              id="prod-stoneCarat-form"
                              type="text"
                              placeholder="e.g. 0.45 Ct"
                              value={editingProduct ? (editingProduct.stoneCarat || '') : newProduct.stoneCarat}
                              onChange={(e) => editingProduct ? setEditingProduct({ ...editingProduct, stoneCarat: e.target.value }) : setNewProduct({ ...newProduct, stoneCarat: e.target.value })}
                              className="w-full h-10 bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 text-xs text-zinc-905 dark:text-zinc-100 placeholder-zinc-450 focus:outline-none"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label htmlFor="prod-beadsCarat-form" className="text-[9px] uppercase tracking-wider text-zinc-400 font-bold block px-1">Beads weight</label>
                            <input
                              id="prod-beadsCarat-form"
                              type="text"
                              placeholder="e.g. 1.20 Ct"
                              value={editingProduct ? (editingProduct.beadsCarat || '') : newProduct.beadsCarat}
                              onChange={(e) => editingProduct ? setEditingProduct({ ...editingProduct, beadsCarat: e.target.value }) : setNewProduct({ ...newProduct, beadsCarat: e.target.value })}
                              className="w-full h-10 bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 text-xs text-zinc-905 dark:text-zinc-100 placeholder-zinc-450 focus:outline-none"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label htmlFor="prod-pearlsCarat-form" className="text-[9px] uppercase tracking-wider text-zinc-400 font-bold block px-1">Pearls weight</label>
                            <input
                              id="prod-pearlsCarat-form"
                              type="text"
                              placeholder="e.g. 0.85 Ct"
                              value={editingProduct ? (editingProduct.pearlsCarat || '') : newProduct.pearlsCarat}
                              onChange={(e) => editingProduct ? setEditingProduct({ ...editingProduct, pearlsCarat: e.target.value }) : setNewProduct({ ...newProduct, pearlsCarat: e.target.value })}
                              className="w-full h-10 bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 text-xs text-zinc-905 dark:text-zinc-100 placeholder-zinc-450 focus:outline-none"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label htmlFor="prod-gemstoneCarat-form" className="text-[9px] uppercase tracking-wider text-zinc-400 font-bold block px-1">Gemstone weight</label>
                            <input
                              id="prod-gemstoneCarat-form"
                              type="text"
                              placeholder="e.g. 2.15 Ct"
                              value={editingProduct ? (editingProduct.gemstoneCarat || '') : newProduct.gemstoneCarat}
                              onChange={(e) => editingProduct ? setEditingProduct({ ...editingProduct, gemstoneCarat: e.target.value }) : setNewProduct({ ...newProduct, gemstoneCarat: e.target.value })}
                              className="w-full h-10 bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 text-xs text-zinc-905 dark:text-zinc-100 placeholder-zinc-450 focus:outline-none"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label htmlFor="prod-pearlsValue-form" className="text-[9px] uppercase tracking-wider text-zinc-400 font-bold block px-1">Other Value (â‚¹)</label>
                            <input
                              id="prod-pearlsValue-form"
                              type="number"
                              placeholder="e.g. 8000"
                              value={editingProduct ? (editingProduct.pearlsValue || '') : newProduct.pearlsValue}
                              onChange={(e) => editingProduct ? setEditingProduct({ ...editingProduct, pearlsValue: +e.target.value }) : setNewProduct({ ...newProduct, pearlsValue: +e.target.value })}
                              className="w-full h-10 bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 text-xs text-zinc-905 dark:text-zinc-100 placeholder-zinc-450 focus:outline-none focus:border-zinc-900 dark:focus:border-zinc-200"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label htmlFor="prod-discountOffDiamond-form" className="text-[9px] uppercase tracking-wider text-zinc-400 font-bold block px-1">Discount Off Diamond (%)</label>
                            <div className="relative">
                              <input
                                id="prod-discountOffDiamond-form"
                                type="number"
                                min="0"
                                max="100"
                                placeholder="e.g. 10"
                                value={editingProduct ? (editingProduct.discountOffDiamond !== undefined ? editingProduct.discountOffDiamond : '') : (newProduct.discountOffDiamond !== undefined ? newProduct.discountOffDiamond : '')}
                                onChange={(e) => editingProduct ? setEditingProduct({ ...editingProduct, discountOffDiamond: e.target.value === '' ? '' : +e.target.value }) : setNewProduct({ ...newProduct, discountOffDiamond: e.target.value === '' ? '' : +e.target.value })}
                                className="w-full h-10 bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl pl-4 pr-16 text-xs text-zinc-905 dark:text-zinc-100 placeholder-zinc-450 focus:outline-none focus:border-zinc-900 dark:focus:border-zinc-200"
                              />
                              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[10px] text-zinc-450 dark:text-zinc-500 font-extrabold select-none pointer-events-none">% OFF</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Section: Pricing & Commercial details */}
                      <div className="space-y-4 pt-4 border-t border-zinc-100 dark:border-zinc-850">
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-[#E6C687]"></span>
                          <h4 className="text-[10px] font-bold tracking-widest text-zinc-400 dark:text-zinc-500 uppercase">Pricing & Commercials</h4>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
                          <div className="space-y-1.5">
                            <label htmlFor="prod-price-form" className="text-[9px] uppercase tracking-wider text-zinc-400 font-bold block px-1">Estimated Cost (INR)</label>
                            <input
                              id="prod-price-form"
                              type="number"
                              required
                              placeholder="e.g. 42000"
                              value={editingProduct ? (editingProduct.price ?? '') : (newProduct.price ?? '')}
                              onChange={(e) => {
                                const val = e.target.value;
                                if (editingProduct) {
                                  setEditingProduct({ ...editingProduct, price: val === '' ? '' : +val });
                                } else {
                                  setNewProduct({ ...newProduct, price: val === '' ? '' : +val });
                                }
                              }}
                              className="w-full h-10 bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 text-xs text-zinc-905 dark:text-zinc-100 placeholder-zinc-450 focus:outline-none focus:border-zinc-900 dark:focus:border-zinc-200"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label htmlFor="prod-hallmark-form" className="text-[9px] uppercase tracking-wider text-zinc-400 font-bold block px-1">Hallmark Stamp</label>
                             <select
                               id="prod-hallmark-form"
                               value={editingProduct ? editingProduct.hallmark : newProduct.hallmark}
                               onChange={(e) => editingProduct ? setEditingProduct({ ...editingProduct, hallmark: e.target.value }) : setNewProduct({ ...newProduct, hallmark: e.target.value })}
                               className="w-full h-10 bg-white dark:bg-[#09090B] border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 text-xs text-zinc-905 dark:text-zinc-100 focus:outline-none focus:border-zinc-900 dark:focus:border-zinc-200 cursor-pointer"
                             >
                               <option value="BIS 916 Government Certified">BIS 916 Government Certified</option>
                               <option value="IGI Diamond Certificate">IGI Diamond Certificate</option>
                             </select>
                          </div>
                          {/* Making Charge is shown only inside Price Breakdown â€” not editable here */}
                          <div className="space-y-1.5 col-span-1">
                            <label className="text-[9px] uppercase tracking-wider text-amber-500 dark:text-amber-400 font-bold block px-1">Making Charge</label>
                            <div className="h-10 bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/40 rounded-xl px-4 flex items-center text-[10px] text-amber-600 dark:text-amber-400 font-semibold">
                              Shown in Price Breakdown only
                            </div>
                          </div>
                          <div className="space-y-1.5">
                            <label htmlFor="prod-discount-form" className="text-[9px] uppercase tracking-wider text-zinc-400 font-bold block px-1">Discount Off Item (%)</label>
                            <div className="relative">
                              <input
                                id="prod-discount-form"
                                type="number"
                                min="0"
                                max="100"
                                placeholder="e.g. 20"
                                value={editingProduct ? (editingProduct.discountPercent !== undefined ? editingProduct.discountPercent : 20) : (newProduct.discountPercent !== undefined ? newProduct.discountPercent : 20)}
                                onChange={(e) => editingProduct ? setEditingProduct({ ...editingProduct, discountPercent: e.target.value === '' ? '' : +e.target.value }) : setNewProduct({ ...newProduct, discountPercent: e.target.value === '' ? '' : +e.target.value })}
                                className="w-full h-10 bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl pl-4 pr-16 text-xs text-zinc-905 dark:text-zinc-100 placeholder-zinc-450 focus:outline-none focus:border-zinc-900 dark:focus:border-zinc-200"
                              />
                              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[10px] text-zinc-450 dark:text-zinc-500 font-extrabold select-none pointer-events-none">% OFF</span>
                            </div>
                          </div>
                          <div className="space-y-1.5">
                            <label htmlFor="prod-discountOffMaking-form" className="text-[9px] uppercase tracking-wider text-zinc-400 font-bold block px-1">Discount Off Making charge (%)</label>
                            <div className="relative">
                              <input
                                id="prod-discountOffMaking-form"
                                type="number"
                                min="0"
                                max="100"
                                placeholder="e.g. 15"
                                value={editingProduct ? (editingProduct.discountOffMaking !== undefined ? editingProduct.discountOffMaking : '') : (newProduct.discountOffMaking !== undefined ? newProduct.discountOffMaking : '')}
                                onChange={(e) => editingProduct ? setEditingProduct({ ...editingProduct, discountOffMaking: e.target.value === '' ? '' : +e.target.value }) : setNewProduct({ ...newProduct, discountOffMaking: e.target.value === '' ? '' : +e.target.value })}
                                className="w-full h-10 bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl pl-4 pr-16 text-xs text-zinc-905 dark:text-zinc-100 placeholder-zinc-450 focus:outline-none focus:border-zinc-900 dark:focus:border-zinc-200"
                              />
                              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[10px] text-zinc-450 dark:text-zinc-500 font-extrabold select-none pointer-events-none">% OFF</span>
                            </div>
                          </div>
                          <div className="space-y-1.5">
                            <label htmlFor="prod-gst-form" className="text-[9px] uppercase tracking-wider text-zinc-400 font-bold block px-1">GST Rate (%)</label>
                            <div className="relative">
                              <input
                                id="prod-gst-form"
                                type="number"
                                min="0"
                                max="100"
                                step="0.5"
                                placeholder="e.g. 3"
                                value={editingProduct ? (editingProduct.gstPercent !== undefined ? editingProduct.gstPercent : 3) : (newProduct.gstPercent !== undefined ? newProduct.gstPercent : 3)}
                                onChange={(e) => editingProduct ? setEditingProduct({ ...editingProduct, gstPercent: e.target.value === '' ? 3 : +e.target.value }) : setNewProduct({ ...newProduct, gstPercent: e.target.value === '' ? 3 : +e.target.value })}
                                className="w-full h-10 bg-white dark:bg-zinc-900/50 border border-amber-200 dark:border-amber-800/40 rounded-xl pl-4 pr-10 text-xs text-zinc-905 dark:text-zinc-100 placeholder-zinc-450 focus:outline-none focus:border-amber-400 dark:focus:border-amber-500 focus:ring-1 focus:ring-amber-400/20"
                              />
                              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[10px] text-amber-500 dark:text-amber-400 font-extrabold select-none pointer-events-none">%</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Section: Size Customization Selector */}
                      {(() => {
                        const currentRingSizes = editingProduct ? (editingProduct.ringSizes || []) : (newProduct.ringSizes || []);
                        const currentBangleSizes = editingProduct ? (editingProduct.bangleSizes || []) : (newProduct.bangleSizes || []);
                        const currentChainSizes = editingProduct ? (editingProduct.chainSizes || []) : (newProduct.chainSizes || []);

                        const selectedType = currentRingSizes.length > 0 
                          ? 'rings' 
                          : (currentBangleSizes.length > 0 ? 'bangles' : (currentChainSizes.length > 0 ? 'chains' : 'none'));

                        return (
                          <div className="space-y-4 pt-4 border-t border-zinc-100 dark:border-zinc-850">
                            <div className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                              <h4 className="text-[10px] font-bold tracking-widest text-zinc-400 dark:text-zinc-500 uppercase">Size Selection Type</h4>
                            </div>
                            <div className="max-w-xs">
                              <select
                                id="admin-size-type"
                                value={selectedType}
                                onChange={(e) => {
                                  const type = e.target.value;
                                  if (type === 'rings') {
                                    const defaultRings = Array.from({ length: 34 - 6 + 1 }, (_, i) => { const num = 6 + i; return num < 10 ? `0${num}` : `${num}`; });
                                    if (editingProduct) {
                                      setEditingProduct({ ...editingProduct, ringSizes: defaultRings, bangleSizes: [], chainSizes: [] });
                                    } else {
                                      setNewProduct({ ...newProduct, ringSizes: defaultRings, bangleSizes: [], chainSizes: [] });
                                    }
                                  } else if (type === 'bangles') {
                                    const defaultBangles = ['2-4', '2-6'];
                                    if (editingProduct) {
                                      setEditingProduct({ ...editingProduct, ringSizes: [], bangleSizes: defaultBangles, chainSizes: [] });
                                    } else {
                                      setNewProduct({ ...newProduct, ringSizes: [], bangleSizes: defaultBangles, chainSizes: [] });
                                    }
                                  } else if (type === 'chains') {
                                    const defaultChains = ['16"', '18"', '20"'];
                                    if (editingProduct) {
                                      setEditingProduct({ ...editingProduct, ringSizes: [], bangleSizes: [], chainSizes: defaultChains });
                                    } else {
                                      setNewProduct({ ...newProduct, ringSizes: [], bangleSizes: [], chainSizes: defaultChains });
                                    }
                                  } else {
                                    if (editingProduct) {
                                      setEditingProduct({ ...editingProduct, ringSizes: [], bangleSizes: [], chainSizes: [] });
                                    } else {
                                      setNewProduct({ ...newProduct, ringSizes: [], bangleSizes: [], chainSizes: [] });
                                    }
                                  }
                                }}
                                className="w-full h-10 bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 text-xs text-zinc-905 dark:text-zinc-100 focus:outline-none focus:border-amber-400 dark:focus:border-amber-500 focus:ring-1 focus:ring-amber-400/20"
                              >
                                <option value="none">No Size Selection (Coins/Earrings/Pendant)</option>
                                <option value="rings">Ring Size List</option>
                                <option value="bangles">Bangle Size List</option>
                                <option value="chains">Chain/Necklace Size List</option>
                              </select>
                            </div>

                            {/* Section: Ring Sizes Option */}
                            {selectedType === 'rings' && (
                              <div className="space-y-4 pt-4 border-t border-zinc-100 dark:border-zinc-800/40">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-[#E6C687]"></span>
                                    <h4 className="text-[10px] font-bold tracking-widest text-zinc-400 dark:text-zinc-500 uppercase">Available Ring Sizes (IND)</h4>
                                  </div>
                                  <div className="flex gap-2">
                                    <button
                                      type="button"
                                      onClick={() => {
                                        const allSizes = Array.from({ length: 34 - 6 + 1 }, (_, i) => {
                                          const num = 6 + i;
                                          return num < 10 ? `0${num}` : `${num}`;
                                        });
                                        if (editingProduct) {
                                          setEditingProduct({ ...editingProduct, ringSizes: allSizes });
                                        } else {
                                          setNewProduct({ ...newProduct, ringSizes: allSizes });
                                        }
                                      }}
                                      className="px-2 py-1 text-[9px] font-bold text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 border border-zinc-200 dark:border-zinc-800 rounded-lg cursor-pointer"
                                    >
                                      Select All
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        if (editingProduct) {
                                          setEditingProduct({ ...editingProduct, ringSizes: [] });
                                        } else {
                                          setNewProduct({ ...newProduct, ringSizes: [] });
                                        }
                                      }}
                                      className="px-2 py-1 text-[9px] font-bold text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 border border-zinc-200 dark:border-zinc-800 rounded-lg cursor-pointer"
                                    >
                                      Clear All
                                    </button>
                                  </div>
                                </div>
                                <div className="grid grid-cols-7 sm:grid-cols-10 md:grid-cols-15 gap-2">
                                  {Array.from({ length: 34 - 6 + 1 }, (_, i) => {
                                    const num = 6 + i;
                                    const szStr = num < 10 ? `0${num}` : `${num}`;
                                    const isSelected = currentRingSizes.includes(szStr);

                                    return (
                                      <button
                                        key={szStr}
                                        type="button"
                                        onClick={() => {
                                          let updatedSizes = [];
                                          const defaultSizes = Array.from({ length: 34 - 6 + 1 }, (_, i) => {
                                            const num = 6 + i;
                                            return num < 10 ? `0${num}` : `${num}`;
                                          });
                                          const baseSizes = currentRingSizes.length > 0 ? currentRingSizes : defaultSizes;

                                          if (baseSizes.includes(szStr)) {
                                            updatedSizes = baseSizes.filter(s => s !== szStr);
                                          } else {
                                            updatedSizes = [...baseSizes, szStr].sort();
                                          }

                                          if (editingProduct) {
                                            setEditingProduct({ ...editingProduct, ringSizes: updatedSizes });
                                          } else {
                                            setNewProduct({ ...newProduct, ringSizes: updatedSizes });
                                          }
                                        }}
                                        className={`h-8 border flex items-center justify-center text-xs font-bold rounded-lg transition-all cursor-pointer ${
                                          isSelected
                                            ? 'bg-zinc-950 text-white border-zinc-950 dark:bg-zinc-100 dark:text-zinc-950 dark:border-zinc-100'
                                            : 'bg-transparent text-zinc-400 border-zinc-200 dark:border-zinc-800 dark:text-zinc-600 hover:border-zinc-400'
                                        }`}
                                      >
                                        {szStr}
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>
                            )}

                            {/* Section: Bangle Sizes Option */}
                            {selectedType === 'bangles' && (
                              <div className="space-y-4 pt-4 border-t border-zinc-100 dark:border-zinc-800/40">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-[#E6C687]"></span>
                                    <h4 className="text-[10px] font-bold tracking-widest text-zinc-400 dark:text-zinc-500 uppercase">Available Bangle Sizes</h4>
                                  </div>
                                  <div className="flex gap-2">
                                    <button
                                      type="button"
                                      onClick={() => {
                                        const BANGLE_SIZES = ['1-2','1-4','1-6','1-8','2-0','2-2','2-4','2-6','2-8','3-0','3-2','3-4'];
                                        if (editingProduct) {
                                          setEditingProduct({ ...editingProduct, bangleSizes: [...BANGLE_SIZES] });
                                        } else {
                                          setNewProduct({ ...newProduct, bangleSizes: [...BANGLE_SIZES] });
                                        }
                                      }}
                                      className="px-2 py-1 text-[9px] font-bold text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 border border-zinc-200 dark:border-zinc-800 rounded-lg cursor-pointer"
                                    >
                                      Select All
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        if (editingProduct) {
                                          setEditingProduct({ ...editingProduct, bangleSizes: [] });
                                        } else {
                                          setNewProduct({ ...newProduct, bangleSizes: [] });
                                        }
                                      }}
                                      className="px-2 py-1 text-[9px] font-bold text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 border border-zinc-200 dark:border-zinc-800 rounded-lg cursor-pointer"
                                    >
                                      Clear All
                                    </button>
                                  </div>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                  {['1-2','1-4','1-6','1-8','2-0','2-2','2-4','2-6','2-8','3-0','3-2','3-4'].map((sz) => {
                                    const isSelected = currentBangleSizes.includes(sz);
                                    return (
                                      <button
                                        key={sz}
                                        type="button"
                                        onClick={() => {
                                          let updated = [];
                                          if (currentBangleSizes.includes(sz)) {
                                            updated = currentBangleSizes.filter(s => s !== sz);
                                          } else {
                                            updated = [...currentBangleSizes, sz];
                                          }
                                          if (editingProduct) {
                                            setEditingProduct({ ...editingProduct, bangleSizes: updated });
                                          } else {
                                            setNewProduct({ ...newProduct, bangleSizes: updated });
                                          }
                                        }}
                                        className={`h-8 px-3 border flex items-center justify-center text-xs font-bold rounded-lg transition-all cursor-pointer ${
                                          isSelected
                                            ? 'bg-zinc-950 text-white border-zinc-950 dark:bg-zinc-100 dark:text-zinc-950 dark:border-zinc-100'
                                            : 'bg-transparent text-zinc-400 border-zinc-200 dark:border-zinc-800 dark:text-zinc-600 hover:border-zinc-400'
                                        }`}
                                      >
                                        {sz}
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>
                            )}

                            {/* Section: Chain Sizes Option */}
                            {selectedType === 'chains' && (
                              <div className="space-y-4 pt-4 border-t border-zinc-100 dark:border-zinc-800/40">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-[#E6C687]"></span>
                                    <h4 className="text-[10px] font-bold tracking-widest text-zinc-400 dark:text-zinc-500 uppercase">Available Chain Sizes</h4>
                                  </div>
                                  <div className="flex gap-2">
                                    <button
                                      type="button"
                                      onClick={() => {
                                        const CHAIN_SIZES = ['12"', '14"', '16"', '18"', '20"', '22"', '24"', '26"', '28"', '30"', '32"', '34"', '36"'];
                                        if (editingProduct) {
                                          setEditingProduct({ ...editingProduct, chainSizes: [...CHAIN_SIZES] });
                                        } else {
                                          setNewProduct({ ...newProduct, chainSizes: [...CHAIN_SIZES] });
                                        }
                                      }}
                                      className="px-2 py-1 text-[9px] font-bold text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 border border-zinc-200 dark:border-zinc-800 rounded-lg cursor-pointer"
                                    >
                                      Select All
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        if (editingProduct) {
                                          setEditingProduct({ ...editingProduct, chainSizes: [] });
                                        } else {
                                          setNewProduct({ ...newProduct, chainSizes: [] });
                                        }
                                      }}
                                      className="px-2 py-1 text-[9px] font-bold text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 border border-zinc-200 dark:border-zinc-800 rounded-lg cursor-pointer"
                                    >
                                      Clear All
                                    </button>
                                  </div>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                  {['12"', '14"', '16"', '18"', '20"', '22"', '24"', '26"', '28"', '30"', '32"', '34"', '36"'].map((sz) => {
                                    const isSelected = currentChainSizes.includes(sz);
                                    return (
                                      <button
                                        key={sz}
                                        type="button"
                                        onClick={() => {
                                          let updated = [];
                                          if (currentChainSizes.includes(sz)) {
                                            updated = currentChainSizes.filter(s => s !== sz);
                                          } else {
                                            updated = [...currentChainSizes, sz];
                                          }
                                          if (editingProduct) {
                                            setEditingProduct({ ...editingProduct, chainSizes: updated });
                                          } else {
                                            setNewProduct({ ...newProduct, chainSizes: updated });
                                          }
                                        }}
                                        className={`h-8 px-3 border flex items-center justify-center text-xs font-bold rounded-lg transition-all cursor-pointer ${
                                          isSelected
                                            ? 'bg-zinc-950 text-white border-zinc-950 dark:bg-zinc-100 dark:text-zinc-950 dark:border-zinc-100'
                                            : 'bg-transparent text-zinc-400 border-zinc-200 dark:border-zinc-800 dark:text-zinc-600 hover:border-zinc-400'
                                        }`}
                                      >
                                        {sz}
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })()}

                      {/* Section: Media Uploader Dropzone */}
                      <div className="space-y-4 pt-4 border-t border-zinc-100 dark:border-zinc-850">
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-[#E6C687]"></span>
                          <h4 className="text-[10px] font-bold tracking-widest text-zinc-400 dark:text-zinc-500 uppercase">Jewellery Assets / Gallery</h4>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                          {/* Main Cover Image Uploader Card */}
                          <div className="bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 p-5 rounded-xl space-y-4">
                            <div>
                              <span className="text-[10px] font-extrabold text-zinc-800 dark:text-zinc-300 block mb-1">Primary Cover Image</span>
                              <p className="text-[9px] text-zinc-400 dark:text-zinc-500 font-medium mb-3">Upload a clean webp/png catalog cover image.</p>
                              <input
                                id="prod-image-picker"
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleImageUpload(e, editingProduct ? 'edit' : 'new')}
                                className="text-xs text-zinc-500 font-semibold"
                              />
                              {imageUploadProgress && <p className="text-[9px] text-[#BCA057] mt-1.5 font-bold">{imageUploadProgress}</p>}
                            </div>
                            {(editingProduct ? editingProduct.img : newProduct.img) && (
                              <div className="relative w-20 h-24 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800">
                                <img
                                  src={editingProduct ? editingProduct.img : newProduct.img}
                                  alt="Cover preview"
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            )}
                          </div>

                          {/* Sub-gallery Uploader Card */}
                          <div className="bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 p-5 rounded-xl space-y-4">
                            <div>
                              <span className="text-[10px] font-extrabold text-zinc-800 dark:text-zinc-300 block mb-1">Sub Gallery Media</span>
                              <p className="text-[9px] text-zinc-400 dark:text-zinc-500 font-medium mb-3">Upload secondary angles images or showcasing videos.</p>
                              <input
                                type="file"
                                accept="image/*,video/*"
                                multiple
                                disabled={!(editingProduct ? editingProduct.img : newProduct.img)}
                                onChange={(e) => handleSubImagesUpload(e, editingProduct ? 'edit' : 'new')}
                                className="text-xs text-zinc-500 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                              />
                              {subImagesUploadProgress && <p className="text-[9px] text-[#BCA057] mt-1.5 font-bold">{subImagesUploadProgress}</p>}
                            </div>

                            {/* List of sub-images */}
                            {((editingProduct ? editingProduct.subImages : newProduct.subImages) || []).length > 0 && (
                              <div className="flex flex-wrap gap-2.5">
                                {((editingProduct ? editingProduct.subImages : newProduct.subImages) || []).map((subImg, idx) => (
                                  <div key={idx} className="relative group w-12 h-14 rounded overflow-hidden border border-zinc-200 dark:border-zinc-800">
                                    {isVideoUrl(subImg) ? (
                                      <div className="w-full h-full relative bg-black">
                                        <video src={subImg} className="w-full h-full object-cover" muted />
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                                          <span className="text-[9px]">ðŸŽ¥</span>
                                        </div>
                                      </div>
                                    ) : (
                                      <img src={subImg} alt="" className="w-full h-full object-cover" />
                                    )}
                                    <button
                                      type="button"
                                      onClick={() => handleRemoveSubImage(idx, editingProduct ? 'edit' : 'new')}
                                      className="absolute inset-0 bg-red-500/80 hover:bg-red-650 opacity-0 group-hover:opacity-100 text-white text-[9px] font-bold uppercase transition-opacity flex items-center justify-center cursor-pointer"
                                    >
                                      Delete
                                    </button>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Form submits actions */}
                      <div className="flex gap-3 pt-4 border-t border-zinc-100 dark:border-zinc-850">
                        <button
                          type="submit"
                          disabled={categories.length === 0 && !editingProduct}
                          className="h-10 px-8 bg-zinc-950 hover:bg-zinc-850 dark:bg-zinc-100 dark:hover:bg-zinc-200 text-white dark:text-zinc-950 font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-xs disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                        >
                          {editingProduct ? 'Save Jewellery Changes' : 'Publish Product to Catalog'}
                        </button>
                        {editingProduct && (
                          <button
                            type="button"
                            onClick={() => setEditingProduct(null)}
                            className="h-10 px-6 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-650 dark:text-zinc-350 font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all cursor-pointer"
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </form>
                  </div>

                  {/* Catalog master lists */}
                  <div className="bg-white dark:bg-[#15151A] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border-b border-zinc-100 dark:border-zinc-850 pb-4">
                      <div>
                        <h3 className="text-base font-black tracking-wider text-zinc-900 dark:text-[#E6C687] uppercase">Catalog inventory</h3>
                        <p className="text-[10px] text-zinc-400 dark:text-zinc-500 font-medium mt-0.5">Filter, search, edit, or remove published items from the global vault catalog.</p>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto items-center">
                        <select
                          value={productCategoryFilter}
                          onChange={(e) => setProductCategoryFilter(e.target.value)}
                          className="bg-white dark:bg-zinc-905 border border-zinc-200 dark:border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-zinc-650 dark:text-zinc-350 focus:outline-none cursor-pointer w-full sm:w-auto font-sans font-bold"
                        >
                          <option value="all">All Categories</option>
                          {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                          ))}
                        </select>
                        <input
                          type="text"
                          placeholder="Search SKU or name..."
                          value={productSearch}
                          onChange={(e) => setProductSearch(e.target.value)}
                          className="bg-white dark:bg-zinc-905 border border-zinc-200 dark:border-zinc-800 rounded-lg px-3.5 py-1.5 text-xs w-full sm:w-60 text-zinc-850 dark:text-zinc-150 placeholder-zinc-400 focus:outline-none"
                        />
                      </div>
                    </div>

                    {(() => {
                      const filtered = products
                        .filter(p => productCategoryFilter === 'all' || p.category === productCategoryFilter)
                        .filter(p => p.name?.toLowerCase().includes(productSearch.toLowerCase()) || p.sku?.toLowerCase().includes(productSearch.toLowerCase()));
                      return (
                        <>
                          {/* Select All and Delete Selected row */}
                          <div className="flex flex-wrap items-center justify-between gap-4 pt-1 pb-3 border-b border-zinc-100 dark:border-zinc-850">
                            <div className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                id="select-all-catalog"
                                checked={filtered.length > 0 && selectedCatalogIds.length === filtered.length}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setSelectedCatalogIds(filtered.map(p => p.id));
                                  } else {
                                    setSelectedCatalogIds([]);
                                  }
                                }}
                                className="rounded border-zinc-300 dark:border-zinc-700 text-zinc-950 focus:ring-0 focus:ring-offset-0 bg-transparent cursor-pointer w-4 h-4"
                              />
                              <label htmlFor="select-all-catalog" className="text-[10px] uppercase font-bold tracking-wider text-zinc-500 cursor-pointer select-none">
                                Select All ({filtered.length})
                              </label>
                            </div>
                            {selectedCatalogIds.length > 0 && (
                              <button
                                type="button"
                                onClick={handleDeleteSelectedCatalog}
                                className="bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 border border-red-500/20 px-3.5 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer"
                              >
                                ðŸ—‘ï¸ Delete Selected ({selectedCatalogIds.length})
                              </button>
                            )}
                          </div>

                          {filtered.length === 0 ? (
                            <div className="bg-zinc-50 dark:bg-zinc-900/10 border border-dashed border-zinc-200 dark:border-zinc-800 p-12 rounded-xl text-center">
                              <p className="text-xs text-zinc-400 dark:text-zinc-500 font-bold uppercase tracking-wider">No Jewellery Matches Found</p>
                            </div>
                          ) : (
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                              {filtered.map(prod => (
                                <div key={prod.id} className="group bg-white dark:bg-[#121216] border border-zinc-200 dark:border-zinc-850 rounded-xl overflow-hidden flex flex-col justify-between hover:border-zinc-400 dark:hover:border-zinc-700 transition-colors shadow-xs">
                                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-zinc-50 dark:bg-zinc-900/20 border-b border-zinc-100 dark:border-zinc-850">
                                    {/* Selection checkbox */}
                                    <div className="absolute top-2 left-2 z-10">
                                      <input
                                        type="checkbox"
                                        checked={selectedCatalogIds.includes(prod.id)}
                                        onChange={(e) => {
                                          if (e.target.checked) {
                                            setSelectedCatalogIds([...selectedCatalogIds, prod.id]);
                                          } else {
                                            setSelectedCatalogIds(selectedCatalogIds.filter(id => id !== prod.id));
                                          }
                                        }}
                                        className="rounded border-zinc-300 dark:border-zinc-750 text-zinc-950 focus:ring-0 focus:ring-offset-0 bg-white dark:bg-zinc-900 cursor-pointer w-4.5 h-4.5 shadow-sm"
                                      />
                                    </div>
                                    <img
                                      src={prod.img}
                                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                                      alt=""
                                    />
                                    {/* Carat/Purity badge */}
                                    <div className="absolute bottom-2 left-2">
                                      <span className="inline-block px-2 py-0.5 rounded-md bg-zinc-950/80 backdrop-blur-xs border border-zinc-800 text-[7.5px] font-black tracking-wider uppercase text-[#E6C687]">
                                        {prod.carat || 'Gold'}
                                      </span>
                                    </div>
                                  </div>

                                  <div className="p-4 space-y-2 text-xs flex-1 flex flex-col justify-between">
                                    <div className="space-y-1">
                                      <div className="flex items-start justify-between gap-1">
                                        <h4 className="font-bold text-zinc-900 dark:text-zinc-100 leading-tight block truncate" title={prod.name}>
                                          {prod.name}
                                        </h4>
                                      </div>

                                      <div className="flex items-center gap-1.5 flex-wrap">
                                        {(() => {
                                          const catObj = categories.find(c => c.id === prod.category);
                                          if (!catObj && !prod.category) return null;
                                          return (
                                            <span className="inline-block px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 text-[8px] font-bold uppercase tracking-wider leading-none">
                                              {catObj?.name || prod.category}
                                            </span>
                                          );
                                        })()}
                                        {prod.categoryType && (
                                          <span className="inline-block px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-[#BCA057] dark:text-[#E6C687] text-[8px] font-bold uppercase tracking-wider leading-none">
                                            {prod.categoryType}
                                          </span>
                                        )}
                                        {prod.gender && (
                                          <span className="inline-block px-1.5 py-0.5 rounded bg-blue-50 dark:bg-blue-950/30 text-blue-500 dark:text-blue-400 text-[8px] font-bold uppercase tracking-wider leading-none">
                                            {prod.gender}
                                          </span>
                                        )}
                                        {prod.occasion && (
                                          <span className="inline-block px-1.5 py-0.5 rounded bg-purple-50 dark:bg-purple-950/30 text-purple-500 dark:text-purple-400 text-[8px] font-bold uppercase tracking-wider leading-none">
                                            {prod.occasion}
                                          </span>
                                        )}
                                        <span className="text-[9px] font-mono text-zinc-400">{prod.sku}</span>
                                      </div>
                                    </div>

                                    <div className="space-y-2.5 pt-2 border-t border-zinc-100 dark:border-zinc-850">
                                      <div className="flex items-baseline justify-between">
                                        <span className="font-mono text-zinc-900 dark:text-[#E6C687] font-black text-sm">
                                          â‚¹{Number(prod.price || 0).toLocaleString('en-IN')}
                                        </span>
                                        <span className="text-[9px] text-zinc-400 font-semibold">{prod.weight || '0g'}</span>
                                      </div>

                                      <div className="flex justify-between items-center gap-2">
                                        <button
                                          onClick={() => { setEditingProduct(prod); window.scrollTo({ top: 120, behavior: 'smooth' }); }}
                                          className="flex-1 h-7 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-bold rounded-lg text-[10px] uppercase tracking-wider transition-colors cursor-pointer"
                                        >
                                          Edit
                                        </button>
                                        <button
                                          onClick={() => handleDeleteProduct(prod.id)}
                                          className="px-2.5 h-7 border border-red-200/50 hover:bg-red-500/10 text-red-500 font-bold rounded-lg text-[10px] uppercase transition-colors cursor-pointer"
                                        >
                                          Delete
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </>
                      );
                    })()}
                  </div>

                </div>
              )}

              {/* Tab: Categories Portfolio Management */}
              {activeTab === 'inventory' && (
                <div className="space-y-10">

                  {/* Categories setup */}
                  <div className="bg-white dark:bg-[#15151A] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
                    <div>
                      <h3 className="text-base font-black tracking-wider text-zinc-900 dark:text-[#E6C687] uppercase">
                        {editingCategory ? 'Update Category Details' : 'Register New Category'}
                      </h3>
                      <p className="text-[10px] text-zinc-400 dark:text-zinc-500 font-medium mt-0.5">Establish high-level collection buckets for products classification.</p>
                    </div>

                    <form onSubmit={editingCategory ? handleUpdateCategory : handleAddCategory} className="space-y-5" onKeyDown={handleFormKeyDown}>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
                        <div className="space-y-1.5">
                          <label className="text-[9px] uppercase tracking-wider text-zinc-400 font-bold block px-1">Category Title</label>
                          <input
                            type="text"
                            required
                            placeholder="Category Name (e.g. Solitaire Bands)"
                            value={newCategoryName}
                            onChange={(e) => setNewCategoryName(e.target.value)}
                            className="w-full h-10 bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 text-xs text-zinc-905 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:border-zinc-900 dark:focus:border-zinc-200"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[9px] uppercase tracking-wider text-zinc-400 font-bold block px-1">Image URL (Optional)</label>
                          <input
                            type="text"
                            placeholder="Category Image URL (Paste URL here)"
                            value={newCategoryImage}
                            onChange={(e) => setNewCategoryImage(e.target.value)}
                            className="w-full h-10 bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 text-xs text-zinc-905 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:border-zinc-900 dark:focus:border-zinc-200"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[9px] uppercase tracking-wider text-zinc-400 font-bold block px-1">Or Upload Asset File</label>
                          <div className="flex items-center gap-3">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleCategoryImageUpload}
                              className="text-xs text-zinc-550 cursor-pointer w-full file:mr-2 file:py-1 file:px-2.5 file:rounded-md file:border-0 file:text-[10px] file:font-extrabold file:uppercase file:bg-zinc-100 dark:file:bg-zinc-800 file:text-zinc-800 dark:file:text-zinc-200 hover:file:bg-zinc-200 transition-colors"
                            />
                          </div>
                        </div>
                      </div>

                      {categoryUploadProgress && (
                        <p className="text-[9px] text-[#BCA057] font-bold">{categoryUploadProgress}</p>
                      )}

                      {newCategoryImage && (
                        <div className="relative w-16 h-16 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center shadow-sm">
                          <img src={newCategoryImage} alt="Category preview" className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => setNewCategoryImage('')}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-[9px] font-bold cursor-pointer"
                          >
                            âœ•
                          </button>
                        </div>
                      )}

                      <div className="flex gap-3 pt-2">
                        <button
                          type="submit"
                          className="h-10 px-8 bg-zinc-950 hover:bg-zinc-850 dark:bg-zinc-100 dark:hover:bg-zinc-200 text-white dark:text-zinc-950 font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-xs cursor-pointer"
                        >
                          {editingCategory ? 'Save Category Changes' : 'Register Category'}
                        </button>
                        {editingCategory && (
                          <button
                            type="button"
                            onClick={() => {
                              setEditingCategory(null);
                              setNewCategoryName('');
                              setNewCategoryImage('');
                              setCategoryUploadProgress(null);
                            }}
                            className="h-10 px-6 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-650 dark:text-zinc-350 font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all cursor-pointer"
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </form>

                    <div className="border-t border-zinc-100 dark:border-zinc-850 pt-6">
                      <h4 className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 mb-4 uppercase tracking-widest">Active collections ({categories.length})</h4>
                      {categories.length === 0 ? (
                        <div className="bg-zinc-50 dark:bg-zinc-900/10 border border-dashed border-zinc-200 dark:border-zinc-800 p-8 rounded-xl text-center">
                          <p className="text-xs text-zinc-400 dark:text-zinc-500 font-bold uppercase tracking-wider">No Categories Found</p>
                        </div>
                      ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                          {categories.map(cat => (
                            <div key={cat.id} className="bg-white dark:bg-[#121216] border border-zinc-200 dark:border-zinc-850 p-4 rounded-xl flex items-center justify-between gap-3 shadow-xs hover:border-zinc-400 dark:hover:border-zinc-700 transition-colors">
                              <div className="flex items-center gap-3 min-w-0">
                                {cat.img ? (
                                  <img src={cat.img} alt={cat.name} className="w-10 h-10 rounded-lg object-cover bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-850 shrink-0" />
                                ) : (
                                  <div className="w-10 h-10 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-xs shrink-0">ðŸ’Ž</div>
                                )}
                                <span className="text-xs text-zinc-800 dark:text-zinc-200 font-bold truncate leading-tight">{cat.name}</span>
                              </div>
                              <div className="flex items-center gap-3 shrink-0">
                                <button
                                  onClick={() => {
                                    setEditingCategory(cat);
                                    setNewCategoryName(cat.name);
                                    setNewCategoryImage(cat.img || '');
                                    window.scrollTo({ top: 120, behavior: 'smooth' });
                                  }}
                                  className="text-[10px] text-zinc-950 dark:text-zinc-100 font-extrabold uppercase hover:underline cursor-pointer"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => handleDeleteCategory(cat.id)}
                                  className="text-red-500 hover:text-red-750 font-bold text-xs cursor-pointer p-1 rounded-md hover:bg-red-500/10 transition-colors"
                                  title="Delete"
                                >
                                  âœ•
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                </div>
              )}

              {/* Tab: Orders Management System */}
              {activeTab === 'orders' && (
                <div className="space-y-6">

                  {/* Toolbar */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-zinc-900 dark:bg-zinc-950 px-5 py-3.5 rounded-2xl text-white shadow-xl gap-3">
                    <div className="flex items-center gap-4">
                      <h2 className="text-sm font-black uppercase tracking-widest text-[#E6C687]">Order Desk</h2>
                      <div className="h-4 w-px bg-zinc-700" />
                      <select
                        value={orderStatusFilter}
                        onChange={(e) => setOrderStatusFilter(e.target.value)}
                        className="bg-zinc-800 border border-zinc-700 text-[10px] uppercase font-bold text-white rounded-lg px-2.5 py-1.5 focus:outline-none cursor-pointer"
                      >
                        <option value="all">All Statuses</option>
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Processing">Manufacturing</option>
                        <option value="Dispatched">Dispatched</option>
                        <option value="Completed">Delivered</option>
                      </select>
                    </div>
                    <input
                      type="text"
                      placeholder="Search order or patron..."
                      value={orderSearch}
                      onChange={(e) => setOrderSearch(e.target.value)}
                      className="bg-zinc-800 border border-zinc-700 rounded-lg px-3.5 py-1.5 text-xs w-56 text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500"
                    />
                  </div>

                  {/* Two-column layout */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

                    {/* Left: Catalog Orders */}
                    <div className="lg:col-span-7 space-y-3">
                      <div className="flex items-center justify-between px-1">
                        <div>
                          <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 tracking-tight">Catalog Orders</h3>
                          <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-0.5">Direct purchases from the signature collection</p>
                        </div>
                        <span className="inline-flex items-center gap-1 bg-[#3F1F54]/10 dark:bg-purple-400/10 text-[#3F1F54] dark:text-purple-300 text-[10px] font-bold px-2.5 py-1 rounded-full border border-[#3F1F54]/20 dark:border-purple-400/20">
                          {adminOrders.length} Orders
                        </span>
                      </div>
                      <div className="space-y-3 max-h-[72vh] overflow-y-auto pr-1 pb-2" style={{ scrollbarWidth: 'thin' }}>
                        {(() => {
                          const filteredOrders = adminOrders
                            .filter(o => orderStatusFilter === 'all' || o.orderStatus === orderStatusFilter)
                            .filter(o => o.customerDetails?.name?.toLowerCase().includes(orderSearch.toLowerCase()) || o.orderId?.toLowerCase().includes(orderSearch.toLowerCase()));

                          if (filteredOrders.length === 0) {
                            return (
                              <div className="bg-white dark:bg-[#1E1F29] border border-dashed border-gray-200 dark:border-gray-800 p-10 rounded-2xl text-center">
                                <div className="text-3xl mb-3">ðŸ“¦</div>
                                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">No orders match the current filter</p>
                                <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-1">Try adjusting the status or search query</p>
                              </div>
                            );
                          }

                          return filteredOrders.map(order => {
                            const statusConfig = {
                              Pending: { bg: 'bg-amber-500/10', text: 'text-amber-700 dark:text-amber-400', border: 'border-amber-500/20', dot: 'bg-amber-500' },
                              Confirmed: { bg: 'bg-blue-500/10', text: 'text-blue-700 dark:text-blue-400', border: 'border-blue-500/20', dot: 'bg-blue-500' },
                              Processing: { bg: 'bg-violet-500/10', text: 'text-violet-700 dark:text-violet-400', border: 'border-violet-500/20', dot: 'bg-violet-500' },
                              Dispatched: { bg: 'bg-cyan-500/10', text: 'text-cyan-700 dark:text-cyan-400', border: 'border-cyan-500/20', dot: 'bg-cyan-500' },
                              Completed: { bg: 'bg-emerald-500/10', text: 'text-emerald-700 dark:text-emerald-400', border: 'border-emerald-500/20', dot: 'bg-emerald-500' },
                            };
                            const sc = statusConfig[order.orderStatus] || statusConfig.Pending;

                            return (
                              <div key={order.id} className="bg-white dark:bg-[#1E1F29] border border-gray-200/70 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
                                {/* Header strip */}
                                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-800/80 bg-gray-50/60 dark:bg-gray-900/30">
                                  <div>
                                    <span className="text-[11px] font-mono font-bold text-[#3F1F54] dark:text-purple-300 tracking-wider">{order.orderId}</span>
                                    <span className="text-[9px] text-gray-400 dark:text-gray-500 block mt-0.5">{order.createdDate?.toDate().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <span className={`inline-flex items-center gap-1.5 text-[9px] font-bold px-2 py-1 rounded-full border ${sc.bg} ${sc.text} ${sc.border}`}>
                                      <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`}></span>
                                      {order.orderStatus}
                                    </span>
                                    <select
                                      value={order.orderStatus}
                                      onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                                      className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-2 py-1 text-[9px] font-bold text-gray-700 dark:text-gray-300 focus:outline-none cursor-pointer hover:border-[#3F1F54]/40 transition-colors"
                                    >
                                      <option value="Pending">Pending</option>
                                      <option value="Confirmed">Confirmed</option>
                                      <option value="Dispatched">Dispatched</option>
                                      <option value="Processing">Manufacturing</option>
                                      <option value="Completed">Delivered</option>
                                    </select>
                                  </div>
                                </div>

                                {/* Body */}
                                <div className="px-4 py-3 space-y-3">
                                  <div className="grid grid-cols-2 gap-3">
                                    <div className="bg-gray-50 dark:bg-gray-800/40 rounded-xl px-3 py-2">
                                      <span className="text-[8px] uppercase tracking-widest text-gray-400 font-bold block mb-0.5">Customer</span>
                                      <span className="text-[11px] font-semibold text-gray-800 dark:text-gray-100">{order.customerDetails?.name}</span>
                                      <span className="text-[9px] text-gray-400 block">{order.customerDetails?.phone}</span>
                                    </div>
                                    <div className="bg-gray-50 dark:bg-gray-800/40 rounded-xl px-3 py-2">
                                      <span className="text-[8px] uppercase tracking-widest text-gray-400 font-bold block mb-0.5">Payment</span>
                                      <span className="font-mono text-[10px] font-bold text-purple-600 dark:text-purple-400 block truncate">{order.customerDetails?.paymentId || 'COD'}</span>
                                    </div>
                                  </div>
                                  <div className="bg-gray-50 dark:bg-gray-800/40 rounded-xl px-3 py-2">
                                    <span className="text-[8px] uppercase tracking-widest text-gray-400 font-bold block mb-0.5">Delivery Address</span>
                                    <span className="text-[10px] text-gray-600 dark:text-gray-300 leading-relaxed">{order.customerDetails?.address}</span>
                                  </div>
                                  <div className="bg-gray-50 dark:bg-gray-800/40 rounded-xl px-3 py-2">
                                    <span className="text-[8px] uppercase tracking-widest text-gray-400 font-bold block mb-1">Items Ordered</span>
                                    <div className="flex flex-wrap gap-1.5">
                                      {order.productDetails?.map((p, i) => (
                                        <span key={i} className="inline-flex items-center bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-[9px] font-semibold text-gray-700 dark:text-gray-200 px-2 py-0.5 rounded-full">
                                          {p.name}<span className="ml-1 text-gray-400">Ã—{p.quantity}</span>
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                  <div className="flex items-center justify-between pt-1 flex-wrap gap-2">
                                    <span className="text-sm font-bold text-[#3F1F54] dark:text-[#E6C687] font-mono">â‚¹{order.amount?.toLocaleString('en-IN')}</span>
                                    <div className="flex items-center gap-1.5 flex-wrap">
                                      <button onClick={() => setSelectedInvoiceOrder(order)} className="inline-flex items-center gap-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 px-2.5 py-1.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-bold text-[9px] uppercase tracking-wider cursor-pointer">
                                        ðŸ“„ Invoice
                                      </button>
                                      <button onClick={() => sendWhatsAppNotification(order, 'confirmed')} className="inline-flex items-center gap-1 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400 px-2.5 py-1.5 rounded-lg transition-colors font-bold text-[9px] uppercase tracking-wider cursor-pointer">
                                        ðŸ’¬ Accept
                                      </button>
                                      <button onClick={() => sendWhatsAppNotification(order, 'dispatched')} className="inline-flex items-center gap-1 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 text-blue-700 dark:text-blue-400 px-2.5 py-1.5 rounded-lg transition-colors font-bold text-[9px] uppercase tracking-wider cursor-pointer">
                                        ðŸšš Dispatch
                                      </button>
                                      <button onClick={() => handleDeleteOrder(order.id)} className="inline-flex items-center gap-1 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-600 dark:text-red-400 px-2.5 py-1.5 rounded-lg transition-colors font-bold text-[9px] uppercase tracking-wider cursor-pointer">
                                        âœ• Delete
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          });
                        })()}
                      </div>
                    </div>

                    {/* Right: Lounge & Consults */}
                    <div className="lg:col-span-5 space-y-3">
                      <div className="flex items-center justify-between px-1">
                        <div>
                          <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 tracking-tight">Lounge & Consults</h3>
                          <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-0.5">Try-on bookings & custom design requests</p>
                        </div>
                        <span className="inline-flex items-center gap-1 bg-amber-500/10 text-amber-700 dark:text-amber-400 text-[10px] font-bold px-2.5 py-1 rounded-full border border-amber-500/20">
                          {adminConsults.length} Requests
                        </span>
                      </div>
                      <div className="space-y-3 max-h-[72vh] overflow-y-auto pr-1 pb-2" style={{ scrollbarWidth: 'thin' }}>
                        {adminConsults.length === 0 ? (
                          <div className="bg-white dark:bg-[#1E1F29] border border-dashed border-gray-200 dark:border-gray-800 p-10 rounded-2xl text-center">
                            <div className="text-3xl mb-3">ðŸ›‹ï¸</div>
                            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">No lounge requests yet</p>
                            <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-1">Bookings will appear here when submitted</p>
                          </div>
                        ) : (
                          adminConsults.map(con => {
                            const isCustom = !!con.jewelryType;
                            const cStatusConfig = {
                              Pending: { bg: 'bg-amber-500/10', text: 'text-amber-700 dark:text-amber-400', border: 'border-amber-500/20', dot: 'bg-amber-500' },
                              Confirmed: { bg: 'bg-blue-500/10', text: 'text-blue-700 dark:text-blue-400', border: 'border-blue-500/20', dot: 'bg-blue-500' },
                              Processing: { bg: 'bg-violet-500/10', text: 'text-violet-700 dark:text-violet-400', border: 'border-violet-500/20', dot: 'bg-violet-500' },
                              Completed: { bg: 'bg-emerald-500/10', text: 'text-emerald-700 dark:text-emerald-400', border: 'border-emerald-500/20', dot: 'bg-emerald-500' },
                            };
                            const cs = cStatusConfig[con.status] || cStatusConfig.Pending;

                            return (
                              <div key={con.id} className="bg-white dark:bg-[#1E1F29] border border-gray-200/70 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
                                {/* Header strip */}
                                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-800/80 bg-gray-50/60 dark:bg-gray-900/30">
                                  <div>
                                    <span className="text-[10px] font-bold text-gray-900 dark:text-gray-100">
                                      {isCustom ? 'âœï¸' : 'ðŸ›‹ï¸'} {con.requestType || (isCustom ? 'Custom Design Request' : 'Lounge Booking')}
                                    </span>
                                    <span className="text-[9px] text-gray-400 block mt-0.5">{con.createdDate?.toDate().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <span className={`inline-flex items-center gap-1.5 text-[9px] font-bold px-2 py-1 rounded-full border ${cs.bg} ${cs.text} ${cs.border}`}>
                                      <span className={`w-1.5 h-1.5 rounded-full ${cs.dot}`}></span>
                                      {con.status}
                                    </span>
                                    <select
                                      value={con.status}
                                      onChange={(e) => handleUpdateConsultStatus(con.id, e.target.value)}
                                      className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-2 py-1 text-[9px] font-bold text-gray-700 dark:text-gray-300 focus:outline-none cursor-pointer hover:border-amber-500/40 transition-colors"
                                    >
                                      <option value="Pending">Pending</option>
                                      <option value="Confirmed">Confirmed</option>
                                      <option value="Processing">Processing</option>
                                      <option value="Completed">Completed</option>
                                    </select>
                                  </div>
                                </div>

                                {/* Body */}
                                <div className="px-4 py-3 space-y-3">
                                  <div className="bg-gray-50 dark:bg-gray-800/40 rounded-xl px-3 py-2">
                                    <span className="text-[8px] uppercase tracking-widest text-gray-400 font-bold block mb-0.5">Client</span>
                                    <span className="text-[11px] font-semibold text-gray-800 dark:text-gray-100">{con.name}</span>
                                    <div className="flex flex-wrap gap-2 mt-0.5">
                                      {con.phone && <span className="text-[9px] text-gray-500">{con.phone}</span>}
                                      {con.email && <span className="text-[9px] text-gray-400">Â· {con.email}</span>}
                                    </div>
                                  </div>

                                  {(con.city || con.date) && (
                                    <div className="flex flex-wrap gap-1.5">
                                      {con.city && (
                                        <span className="inline-flex items-center gap-1 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-[9px] font-semibold text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full">
                                          ðŸ“ {con.city}
                                        </span>
                                      )}
                                      {con.date && (
                                        <span className="inline-flex items-center gap-1 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-[9px] font-semibold text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full">
                                          ðŸ—“ {con.date}{con.time ? ` at ${con.time}` : ''}
                                        </span>
                                      )}
                                    </div>
                                  )}

                                  {con.notes && (
                                    <div className="bg-gray-50 dark:bg-gray-800/40 rounded-xl px-3 py-2">
                                      <span className="text-[8px] uppercase tracking-widest text-gray-400 font-bold block mb-0.5">Notes</span>
                                      <span className="text-[10px] text-gray-600 dark:text-gray-300 leading-relaxed">{con.notes}</span>
                                    </div>
                                  )}

                                  {isCustom && (
                                    <div className="bg-[#3F1F54]/5 dark:bg-purple-400/5 border border-[#3F1F54]/10 dark:border-purple-400/10 rounded-xl px-3 py-2.5 space-y-2">
                                      <span className="text-[8px] uppercase tracking-widest text-[#3F1F54] dark:text-purple-400 font-bold">ðŸ’Ž Design Specs</span>
                                      <div className="flex flex-wrap gap-1.5">
                                        {con.jewelryType && <span className="bg-white dark:bg-gray-800 border border-[#3F1F54]/20 text-[9px] font-bold text-[#3F1F54] dark:text-purple-300 px-2 py-0.5 rounded-full">{con.jewelryType}</span>}
                                        {con.material && <span className="bg-white dark:bg-gray-800 border border-[#BCA057]/30 text-[9px] font-bold text-[#BCA057] dark:text-amber-400 px-2 py-0.5 rounded-full">{con.material}</span>}
                                        {con.budget && <span className="bg-white dark:bg-gray-800 border border-emerald-500/20 text-[9px] font-bold text-emerald-700 dark:text-emerald-400 px-2 py-0.5 rounded-full font-mono">{con.budget}</span>}
                                      </div>
                                      {con.description && <p className="text-[10px] text-gray-600 dark:text-gray-300 leading-relaxed">{con.description}</p>}
                                    </div>
                                  )}

                                  {(con.referenceImageUrl || con.fileData) && (
                                    <div className="space-y-1.5">
                                      <span className="text-[8px] uppercase tracking-widest text-[#BCA057] font-bold block">Reference Sketch</span>
                                      <div className="flex items-start gap-3">
                                        <div
                                          className="w-20 h-20 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-50 flex-shrink-0 cursor-pointer hover:shadow-md hover:border-[#3F1F54]/40 transition-all duration-200"
                                          onClick={() => window.open(con.referenceImageUrl || con.fileData, '_blank')}
                                        >
                                          <img
                                            src={con.referenceImageUrl || con.fileData}
                                            alt={con.fileName || "Design sketch"}
                                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                          />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                          <p className="text-[9px] text-gray-500 dark:text-gray-400 truncate">{con.fileName}</p>
                                          <button
                                            type="button"
                                            onClick={() => window.open(con.referenceImageUrl || con.fileData, '_blank')}
                                            className="mt-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-1"
                                          >
                                            ðŸ‘ï¸ View Full
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  )}

                                  <div className="pt-1 border-t border-gray-100 dark:border-gray-800/80">
                                    <button
                                      onClick={() => handleDeleteConsult(con.id)}
                                      className="inline-flex items-center gap-1 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-600 dark:text-red-400 px-3 py-1.5 rounded-lg transition-colors font-bold text-[9px] uppercase tracking-wider cursor-pointer"
                                    >
                                      âœ• Delete Request
                                    </button>
                                  </div>
                                </div>
                              </div>
                            );
                          })
                        )}
                      </div>
                    </div>

                  </div>
                </div>
              )}

              {/* Tab: Customer Management System CRM */}
              {activeTab === 'customers' && (
                <div className="space-y-6">

                  {/* Toolbar */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-zinc-900 dark:bg-zinc-950 px-5 py-3.5 rounded-2xl text-white shadow-xl gap-3">
                    <div className="flex items-center gap-4">
                      <h2 className="text-sm font-black uppercase tracking-widest text-[#E6C687]">CRM Directory</h2>
                      <div className="h-4 w-px bg-zinc-700" />
                      <select
                        value={crmSegment}
                        onChange={(e) => setCrmSegment(e.target.value)}
                        className="bg-zinc-800 border border-zinc-700 text-[10px] uppercase font-bold text-white rounded-lg px-2.5 py-1.5 focus:outline-none cursor-pointer"
                      >
                        <option value="all">All Customers</option>
                        <option value="VIP">VIP Patrons</option>
                        <option value="regular">Standard</option>
                      </select>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Search by name or phone..."
                        value={crmSearch}
                        onChange={(e) => setCrmSearch(e.target.value)}
                        className="bg-zinc-800 border border-zinc-700 rounded-lg px-3.5 py-1.5 text-xs w-52 text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500"
                      />
                      <button
                        onClick={() => handleExportCSV('customers')}
                        className="inline-flex items-center gap-1.5 bg-[#E6C687]/10 hover:bg-[#E6C687]/20 border border-[#E6C687]/30 text-[#E6C687] text-[9px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
                      >
                        â†“ Export CSV
                      </button>
                    </div>
                  </div>

                  {/* Summary KPI strip */}
                  {(() => {
                    const allClients = Array.from(new Set(adminConsults.map(c => c.phone)))
                      .map(phone => {
                        const list = adminConsults.filter(c => c.phone === phone);
                        const designIntent = list.some(c => c.jewelryType);
                        const spendFactor = designIntent ? 85000 : 25000;
                        return { segment: spendFactor > 50000 ? 'VIP' : 'Standard', totalSpend: spendFactor * list.length };
                      });
                    const vipCount = allClients.filter(c => c.segment === 'VIP').length;
                    const totalSpend = allClients.reduce((s, c) => s + c.totalSpend, 0);
                    return (
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {[
                          { label: 'Total Clients', value: allClients.length, icon: 'ðŸ‘¥', color: 'border-[#3F1F54]/20 dark:border-purple-400/20', accent: 'text-[#3F1F54] dark:text-purple-300' },
                          { label: 'VIP Patrons', value: vipCount, icon: 'â­', color: 'border-amber-500/20', accent: 'text-amber-700 dark:text-amber-400' },
                          { label: 'Standard', value: allClients.length - vipCount, icon: 'ðŸ›‹ï¸', color: 'border-blue-500/20', accent: 'text-blue-700 dark:text-blue-400' },
                          { label: 'Est. Total Spend', value: `â‚¹${(totalSpend / 1000).toFixed(0)}K`, icon: 'ðŸ’°', color: 'border-emerald-500/20', accent: 'text-emerald-700 dark:text-emerald-400' },
                        ].map((stat, i) => (
                          <div key={i} className={`bg-white dark:bg-[#1E1F29] border ${stat.color} rounded-2xl px-4 py-3 flex items-center gap-3 shadow-sm`}>
                            <span className="text-xl">{stat.icon}</span>
                            <div>
                              <span className={`text-lg font-black font-mono ${stat.accent}`}>{stat.value}</span>
                              <span className="text-[9px] uppercase tracking-widest text-gray-400 font-bold block">{stat.label}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    );
                  })()}

                  {/* Client cards grid */}
                  {(() => {
                    const filteredClients = Array.from(new Set(adminConsults.map(c => c.phone)))
                      .map(phone => {
                        const consultationsList = adminConsults.filter(c => c.phone === phone);
                        const representative = consultationsList[0];
                        const designIntent = consultationsList.some(c => c.jewelryType);
                        const spendFactor = designIntent ? 85000 : 25000;
                        const vipSegment = spendFactor > 50000 ? 'VIP' : 'Standard';
                        return {
                          name: representative.name,
                          phone: phone,
                          email: representative.email,
                          city: representative.city,
                          totalOrders: consultationsList.length,
                          totalSpend: spendFactor * consultationsList.length,
                          segment: vipSegment
                        };
                      })
                      .filter(client => crmSegment === 'all' || client.segment === crmSegment)
                      .filter(client => client.name?.toLowerCase().includes(crmSearch.toLowerCase()) || client.phone?.includes(crmSearch));

                    if (filteredClients.length === 0) {
                      return (
                        <div className="bg-white dark:bg-[#1E1F29] border border-dashed border-gray-200 dark:border-gray-800 p-12 rounded-2xl text-center">
                          <div className="text-4xl mb-3">ðŸ”</div>
                          <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">No clients match this filter</p>
                          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Try adjusting the segment or search query</p>
                        </div>
                      );
                    }

                    return (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredClients.map((client, idx) => {
                          const isVip = client.segment === 'VIP';
                          const initials = client.name?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || '?';
                          const avatarColors = [
                            ['bg-violet-100 dark:bg-violet-900/30', 'text-violet-700 dark:text-violet-300'],
                            ['bg-blue-100 dark:bg-blue-900/30', 'text-blue-700 dark:text-blue-300'],
                            ['bg-emerald-100 dark:bg-emerald-900/30', 'text-emerald-700 dark:text-emerald-300'],
                            ['bg-amber-100 dark:bg-amber-900/30', 'text-amber-700 dark:text-amber-300'],
                            ['bg-rose-100 dark:bg-rose-900/30', 'text-rose-700 dark:text-rose-300'],
                          ];
                          const [avatarBg, avatarText] = avatarColors[idx % avatarColors.length];

                          return (
                            <div
                              key={idx}
                              onClick={() => setSelectedClient(client)}
                              className="bg-white dark:bg-[#1E1F29] border border-gray-200/70 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:border-[#3F1F54]/40 dark:hover:border-purple-400/40 transition-all duration-200 cursor-pointer group"
                            >
                              {/* Card header â€” coloured accent strip */}
                              <div className={`h-1.5 w-full ${isVip ? 'bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500' : 'bg-gradient-to-r from-[#3F1F54] to-purple-400'}`} />

                              <div className="px-4 pt-4 pb-3 space-y-3">
                                {/* Avatar + name row */}
                                <div className="flex items-start justify-between">
                                  <div className="flex items-center gap-3">
                                    <div className={`w-11 h-11 ${avatarBg} ${avatarText} rounded-2xl flex items-center justify-center text-sm font-black shrink-0 shadow-sm`}>
                                      {initials}
                                    </div>
                                    <div>
                                      <h4 className="text-sm font-bold text-gray-900 dark:text-gray-100 leading-tight group-hover:text-[#3F1F54] dark:group-hover:text-[#E6C687] transition-colors">{client.name}</h4>
                                      <span className="text-[9px] text-gray-400 dark:text-gray-500 font-mono block mt-0.5">{client.phone}</span>
                                    </div>
                                  </div>
                                  {/* Segment badge */}
                                  {isVip ? (
                                    <span className="inline-flex items-center gap-1 bg-amber-400/15 border border-amber-400/30 text-amber-700 dark:text-amber-400 text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full">
                                      â­ VIP
                                    </span>
                                  ) : (
                                    <span className="inline-flex items-center gap-1 bg-[#3F1F54]/8 dark:bg-purple-400/10 border border-[#3F1F54]/15 dark:border-purple-400/20 text-[#3F1F54] dark:text-purple-400 text-[8px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full">
                                      Standard
                                    </span>
                                  )}
                                </div>

                                {/* Contact metadata tags */}
                                <div className="flex flex-wrap gap-1.5">
                                  {client.email && (
                                    <span className="inline-flex items-center gap-1 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-[9px] text-gray-600 dark:text-gray-300 font-medium px-2 py-0.5 rounded-full truncate max-w-[160px]">
                                      âœ‰ï¸ {client.email}
                                    </span>
                                  )}
                                  {client.city && (
                                    <span className="inline-flex items-center gap-1 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-[9px] text-gray-600 dark:text-gray-300 font-medium px-2 py-0.5 rounded-full">
                                      ðŸ“ {client.city}
                                    </span>
                                  )}
                                </div>

                                {/* KPI row */}
                                <div className="grid grid-cols-2 gap-2 pt-1 border-t border-gray-100 dark:border-gray-800/80">
                                  <div className="bg-gray-50 dark:bg-gray-800/40 rounded-xl px-3 py-2">
                                    <span className="text-[8px] uppercase tracking-widest text-gray-400 font-bold block mb-0.5">Bookings</span>
                                    <span className="text-sm font-black text-[#3F1F54] dark:text-purple-300 font-mono">{client.totalOrders}</span>
                                  </div>
                                  <div className="bg-emerald-50 dark:bg-emerald-900/10 rounded-xl px-3 py-2">
                                    <span className="text-[8px] uppercase tracking-widest text-gray-400 font-bold block mb-0.5">Est. Spend</span>
                                    <span className="text-sm font-black text-emerald-700 dark:text-emerald-400 font-mono">â‚¹{(client.totalSpend / 1000).toFixed(0)}K</span>
                                  </div>
                                </div>

                                {/* View profile CTA */}
                                <div className="flex items-center justify-end">
                                  <span className="text-[9px] font-bold text-gray-400 group-hover:text-[#3F1F54] dark:group-hover:text-[#E6C687] transition-colors flex items-center gap-1">
                                    View Profile â†’
                                  </span>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    );
                  })()}

                </div>
              )}



            </div>
          </main>

          {/* MOBILE FLOATING BOTTOM NAVIGATION BAR */}
          <div className="md:hidden fixed bottom-5 left-4 right-4 z-50 bg-[#14052F]/95 border border-white/10 rounded-2xl py-2 px-3 flex justify-around items-center shadow-2xl backdrop-blur-md select-none font-sans">
            {[
              { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
              { id: 'products', label: 'Jewellery', icon: Gem },
              { id: 'inventory', label: 'Categories', icon: Boxes },
              { id: 'orders', label: 'Orders', icon: ShoppingBag },
              { id: 'customers', label: 'CRM', icon: Users }
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="flex flex-col items-center gap-1 focus:outline-none transition-all cursor-pointer relative py-1.5 px-2 rounded-xl hover:bg-white/5 active:scale-90"
                >
                  <Icon className={`w-4.5 h-4.5 transition-transform ${isActive ? 'text-[#E6C687] scale-110' : 'text-white/50'}`} />
                  <span className={`text-[8.5px] font-bold tracking-wider ${isActive ? 'text-white font-extrabold' : 'text-white/40 font-medium'}`}>
                    {tab.label}
                  </span>
                  {isActive && (
                    <span className="absolute bottom-0 w-1.5 h-1.5 bg-[#E6C687] rounded-full shadow-[0_0_8px_#E6C687]"></span>
                  )}
                </button>
              );
            })}
          </div>

        </div>
      )}

      {/* BOTTOM BRANDING FOOTER */}
      <footer className="w-full text-center space-y-1.5 text-[9px] uppercase tracking-wider text-gray-400 font-bold border-t border-gray-100 dark:border-gray-850 py-6 absolute bottom-0 left-0 right-0 hidden">
        <p>Â© {new Date().getFullYear()} HR JEWELLERS & SONS. ALL RIGHTS RESERVED.</p>
        <p className="text-[8px] text-gray-300">Powered by HR Jewellers & Sons Admin Portal</p>
      </footer>

    </div>
  );
}
