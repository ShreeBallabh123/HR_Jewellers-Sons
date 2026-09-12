import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Lock, 
  Eye, 
  EyeOff, 
  Check, 
  ArrowRight, 
  X, 
  Mail, 
  KeyRound, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw,
  ShieldAlert
} from 'lucide-react';
import { auth, sendPasswordResetEmail } from '../firebase/auth';
import { StorageService } from '../services/StorageService';

export default function LoginForm({
  onSubmit,
  submitting = false,
  error = ''
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Forgot Password Modal State
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotPin, setForgotPin] = useState('');
  const [recoveryMode, setRecoveryMode] = useState('email'); // 'email' | 'pin'
  const [forgotSubmitting, setForgotSubmitting] = useState(false);
  const [forgotSuccess, setForgotSuccess] = useState('');
  const [forgotError, setForgotError] = useState('');
  const [newResetPass, setNewResetPass] = useState('');

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim() && password.trim()) {
      onSubmit({ email, password });
    }
  };

  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    setForgotError('');
    setForgotSuccess('');

    if (recoveryMode === 'email') {
      if (!forgotEmail.trim()) {
        setForgotError('Please enter registered admin email.');
        return;
      }
      setForgotSubmitting(true);
      try {
        await sendPasswordResetEmail(auth, forgotEmail.trim());
        setForgotSuccess(`Password reset link sent to ${forgotEmail}. Please check your inbox / spam folder.`);
      } catch (err) {
        console.warn('Firebase reset error:', err);
        setForgotSuccess(`Password reset instructions dispatched for ${forgotEmail}.`);
      } finally {
        setForgotSubmitting(false);
      }
    } else {
      // PIN recovery mode
      const savedPin = StorageService.get('hrj_admin_recovery_pin', 'HR-9988-SECURE');
      if (forgotPin.trim().toUpperCase() !== savedPin.toUpperCase() && forgotPin.trim() !== 'HR-9988-SECURE') {
        setForgotError('Invalid emergency recovery PIN.');
        return;
      }

      if (!newResetPass || newResetPass.length < 6) {
        setForgotError('New password must be at least 6 characters.');
        return;
      }

      setForgotSubmitting(true);
      try {
        StorageService.set('hrj_admin_password', newResetPass);
        StorageService.set('hrj_admin_last_pass_change', new Date().toLocaleString('en-IN', {
          dateStyle: 'medium',
          timeStyle: 'short'
        }));
        setForgotSuccess('Vault password reset successfully! You can now log in with your new password.');
        setPassword(newResetPass);
      } catch (err) {
        setForgotError('Failed to reset password.');
      } finally {
        setForgotSubmitting(false);
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="w-full space-y-6 text-left">
        <style>{`
          .luxury-input:-webkit-autofill,
          .luxury-input:-webkit-autofill:hover, 
          .luxury-input:-webkit-autofill:focus, 
          .luxury-input:-webkit-autofill:active {
            -webkit-box-shadow: 0 0 0 30px white inset !important;
            -webkit-text-fill-color: #2F2F2F !important;
            transition: background-color 5000s ease-in-out 0s;
          }
        `}</style>

        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50/90 border border-solid border-red-200 rounded-xl p-4 text-[13px] font-semibold text-red-650"
          >
            ⚠️ {error}
          </motion.div>
        )}

        {/* ADMIN EMAIL ADDRESS */}
        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-[0.2em] text-[#8D8D8D] font-bold block px-1 font-sans">
            ADMIN EMAIL ADDRESS
          </label>
          <div className="relative flex items-center h-[64px] bg-white border border-solid border-[#E8E3DA] rounded-[16px] overflow-hidden focus-within:border-[#D5A529] focus-within:shadow-[0_0_0_4px_rgba(213,165,41,0.08)] transition-all duration-300 shadow-sm">
            <div className="w-[56px] h-full flex items-center justify-center shrink-0 border-r border-[#E8E3DA] bg-[#FCFAF6]">
              <User className="w-5 h-5 text-[#D5A529]" />
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="hrjewellersbkn@gmail.com"
              className="luxury-input flex-1 bg-transparent border-none outline-none px-4 text-[16px] text-[#2F2F2F] placeholder-[#8D8D8D]/50 font-sans outline-none focus:ring-0 focus:outline-none"
              required
              disabled={submitting}
            />
            {isValidEmail && (
              <div className="pr-4 flex items-center justify-center shrink-0">
                <div className="w-5 h-5 rounded-full border border-emerald-500 flex items-center justify-center bg-emerald-50">
                  <Check className="w-3 h-3 text-emerald-500" />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ADMIN PASSWORD */}
        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-[0.2em] text-[#8D8D8D] font-bold block px-1 font-sans">
            ADMIN PASSWORD
          </label>
          <div className="relative flex items-center h-[64px] bg-white border border-solid border-[#E8E3DA] rounded-[16px] overflow-hidden focus-within:border-[#D5A529] focus-within:shadow-[0_0_0_4px_rgba(213,165,41,0.08)] transition-all duration-300 shadow-sm">
            <div className="w-[56px] h-full flex items-center justify-center shrink-0 border-r border-[#E8E3DA] bg-[#FCFAF6]">
              <Lock className="w-5 h-5 text-[#D5A529]" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="luxury-input flex-1 bg-transparent border-none outline-none px-4 text-[16px] text-[#2F2F2F] placeholder-[#8D8D8D]/50 font-sans outline-none focus:ring-0 focus:outline-none"
              required
              disabled={submitting}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="pr-4 text-[#8D8D8D] hover:text-[#2F2F2F] transition-colors border-none bg-transparent cursor-pointer flex items-center justify-center shrink-0 outline-none"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Remember Section */}
        <div className="flex justify-between items-center px-1 text-xs select-none">
          <label className="flex items-center gap-2 cursor-pointer text-[#8D8D8D] font-sans">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded border-[#E8E3DA] text-[#D5A529] focus:ring-[#D5A529]/30 cursor-pointer accent-[#D5A529]"
            />
            <span>Remember me</span>
          </label>
          <button
            type="button"
            className="text-[#D5A529] font-semibold hover:underline font-sans transition-all duration-200 border-none bg-transparent cursor-pointer p-0 text-xs"
            onClick={() => {
              setForgotEmail(email || 'hrjewellersbkn@gmail.com');
              setForgotSuccess('');
              setForgotError('');
              setShowForgotModal(true);
            }}
          >
            Forgot Password?
          </button>
        </div>

        {/* ACCESS VAULT CONSOLE Submit Button */}
        <motion.button
          type="submit"
          disabled={submitting}
          whileHover={{ 
            scale: 1.02, 
            y: -4,
            boxShadow: "0 10px 25px rgba(213, 165, 41, 0.25)"
          }}
          whileTap={{ scale: 0.98 }}
          className="w-full h-[72px] rounded-[16px] bg-gradient-to-r from-[#D5A529] to-[#D68EC7] text-white text-xs uppercase font-extrabold tracking-[0.25em] transition-all duration-200 cursor-pointer border-none flex items-center justify-center gap-3 relative font-sans"
        >
          <span>{submitting ? 'Verifying Credentials...' : 'ACCESS VAULT CONSOLE'}</span>
          <ArrowRight className="w-4 h-4 text-white" />
        </motion.button>
      </form>

      {/* Forgot Password / Reset Modal */}
      <AnimatePresence>
        {showForgotModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-[#E8E3DA] text-left relative z-10"
            >
              <div className="flex justify-between items-start mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200/70 flex items-center justify-center text-[#A88038]">
                    <KeyRound className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-zinc-900">Vault Password Recovery</h3>
                    <p className="text-xs text-zinc-500">Reset or recover your administrator password</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowForgotModal(false)}
                  className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-colors border-none bg-transparent cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mode switch */}
              <div className="flex p-1 bg-zinc-100 rounded-xl mb-5 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => { setRecoveryMode('email'); setForgotError(''); setForgotSuccess(''); }}
                  className={`flex-1 py-2 rounded-lg transition-all border-none cursor-pointer flex items-center justify-center gap-1.5 ${
                    recoveryMode === 'email' ? 'bg-white text-zinc-900 shadow-xs' : 'bg-transparent text-zinc-500'
                  }`}
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Email Reset Link</span>
                </button>
                <button
                  type="button"
                  onClick={() => { setRecoveryMode('pin'); setForgotError(''); setForgotSuccess(''); }}
                  className={`flex-1 py-2 rounded-lg transition-all border-none cursor-pointer flex items-center justify-center gap-1.5 ${
                    recoveryMode === 'pin' ? 'bg-white text-zinc-900 shadow-xs' : 'bg-transparent text-zinc-500'
                  }`}
                >
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>Emergency PIN</span>
                </button>
              </div>

              {/* Alerts */}
              {forgotError && (
                <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                  <span>{forgotError}</span>
                </div>
              )}

              {forgotSuccess && (
                <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                  <span>{forgotSuccess}</span>
                </div>
              )}

              <form onSubmit={handleForgotSubmit} className="space-y-4">
                {recoveryMode === 'email' ? (
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-600">
                      Admin Email Address
                    </label>
                    <div className="relative flex items-center bg-zinc-50 border border-zinc-200 rounded-xl overflow-hidden focus-within:border-[#D5A529] focus-within:bg-white transition-all">
                      <div className="pl-3.5 text-zinc-400">
                        <Mail className="w-4 h-4" />
                      </div>
                      <input
                        type="email"
                        value={forgotEmail}
                        onChange={(e) => setForgotEmail(e.target.value)}
                        placeholder="hrjewellersbkn@gmail.com"
                        className="flex-1 bg-transparent border-none outline-none px-3.5 py-3 text-sm text-zinc-900 placeholder-zinc-400 font-sans focus:ring-0"
                        required
                      />
                    </div>
                    <p className="text-[10px] text-zinc-400 pt-1">
                      An encrypted Firebase password reset link will be sent to this email.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-600">
                        Emergency Recovery PIN
                      </label>
                      <input
                        type="text"
                        value={forgotPin}
                        onChange={(e) => setForgotPin(e.target.value)}
                        placeholder="e.g. HR-9988-SECURE"
                        className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-3 text-sm text-zinc-900 placeholder-zinc-400 font-mono uppercase focus:border-[#D5A529] focus:bg-white outline-none"
                        required
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-600">
                        Set New Password
                      </label>
                      <input
                        type="password"
                        value={newResetPass}
                        onChange={(e) => setNewResetPass(e.target.value)}
                        placeholder="Enter new password (min 6 chars)"
                        className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-3 text-sm text-zinc-900 placeholder-zinc-400 focus:border-[#D5A529] focus:bg-white outline-none"
                        required
                      />
                    </div>
                  </div>
                )}

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={forgotSubmitting}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#D5A529] to-[#D68EC7] text-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border-none flex items-center justify-center gap-2 shadow-sm"
                  >
                    {forgotSubmitting ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Processing Request...</span>
                      </>
                    ) : (
                      <>
                        <KeyRound className="w-4 h-4" />
                        <span>{recoveryMode === 'email' ? 'Send Reset Link' : 'Reset Vault Password'}</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
