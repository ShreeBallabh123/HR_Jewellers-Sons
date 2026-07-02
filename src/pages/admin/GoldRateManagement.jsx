import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TrendingUp, Save, Zap, RefreshCw,
  Clock, User, CheckCircle2, AlertCircle,
  ChevronDown, ChevronUp, Info
} from 'lucide-react';
import { goldRateService } from '../../services/goldRateService';
import { deriveRates, formatINR } from '../../utils/pricing';

// ─── Small reusable input card ───────────────────────────────────────────────
function RateInputCard({ id, label, sublabel, value, onChange, unit = '₹ / 10g', accentColor = 'amber', badge, disabled }) {
  const accent = {
    amber:    { ring: 'focus:border-amber-400 focus:ring-amber-400/20', dot: 'bg-amber-400', text: 'text-amber-600' },
    yellow:   { ring: 'focus:border-yellow-400 focus:ring-yellow-400/20', dot: 'bg-yellow-400', text: 'text-yellow-600' },
    orange:   { ring: 'focus:border-orange-400 focus:ring-orange-400/20', dot: 'bg-orange-400', text: 'text-orange-500' },
    blue:     { ring: 'focus:border-blue-400 focus:ring-blue-400/20', dot: 'bg-blue-400', text: 'text-blue-500' },
    purple:   { ring: 'focus:border-purple-400 focus:ring-purple-400/20', dot: 'bg-purple-400', text: 'text-purple-500' },
  }[accentColor] || {};

  return (
    <div className={`bg-white dark:bg-zinc-900/60 border border-solid border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 space-y-3 relative overflow-hidden transition-all ${disabled ? 'opacity-60' : 'hover:border-zinc-300 dark:hover:border-zinc-700'}`}>
      {/* Accent dot */}
      <span className={`absolute top-0 left-0 right-0 h-0.5 ${accent.dot} opacity-60`} />

      <div className="flex items-center justify-between">
        <div>
          <label htmlFor={id} className="text-[10px] font-extrabold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 block">
            {label}
          </label>
          {sublabel && <p className="text-[9px] text-zinc-400 dark:text-zinc-500 mt-0.5 font-medium">{sublabel}</p>}
        </div>
        {badge && (
          <span className={`text-[8px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded-full ${accent.text} bg-current/10 border border-current/20`}>
            {badge}
          </span>
        )}
      </div>

      <div className="relative">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-black text-zinc-400 pointer-events-none select-none">₹</span>
        <input
          id={id}
          type="number"
          min="0"
          step="1"
          disabled={disabled}
          value={value}
          onChange={(e) => onChange(e.target.value === '' ? '' : Number(e.target.value))}
          className={`w-full h-12 bg-zinc-50 dark:bg-zinc-900 border border-solid border-zinc-200 dark:border-zinc-800 rounded-xl pl-8 pr-20 text-sm font-black text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 ${accent.ring} transition-all disabled:cursor-not-allowed`}
        />
        <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[9px] font-bold text-zinc-400 pointer-events-none select-none whitespace-nowrap">
          {unit}
        </span>
      </div>

      {value > 0 && (
        <p className={`text-[10px] font-bold ${accent.text}`}>
          ≈ {formatINR(Math.round(value / 10))} / gram
        </p>
      )}
    </div>
  );
}

// ─── Metadata info row ───────────────────────────────────────────────────────
function MetaRow({ icon: Icon, label, value, highlight }) {
  return (
    <div className="flex items-center gap-3 py-2.5 border-b border-solid border-zinc-100 dark:border-zinc-850 last:border-b-0">
      <div className="w-7 h-7 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center shrink-0">
        <Icon className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400" />
      </div>
      <span className="text-[10px] uppercase tracking-wider font-bold text-zinc-400 dark:text-zinc-500 flex-1">{label}</span>
      <span className={`text-xs font-bold ${highlight ? 'text-emerald-600 dark:text-emerald-400' : 'text-zinc-700 dark:text-zinc-300'}`}>
        {value || '—'}
      </span>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────
export default function GoldRateManagement({ setAdminNotification, adminUser }) {
  const [savedRates, setSavedRates]   = useState(null);
  const [draftRates, setDraftRates]   = useState({
    goldRate24k: '', goldRate22k: '', goldRate18k: '',
    silverRate: '', platinumRate: '',
  });
  const [loading, setLoading]           = useState(true);
  const [saving, setSaving]             = useState(false);
  const [publishing, setPublishing]     = useState(false);
  const [autoDerive, setAutoDerive]     = useState(true);
  const [showConfirm, setShowConfirm]   = useState(false);
  const [showOptional, setShowOptional] = useState(false);

  // Load current rates on mount
  useEffect(() => {
    goldRateService.subscribeToRates(
      (data) => {
        setSavedRates(data);
        setDraftRates({
          goldRate24k: data.goldRate24k  || '',
          goldRate22k: data.goldRate22k  || '',
          goldRate18k: data.goldRate18k  || '',
          silverRate:  data.silverRate   || '',
          platinumRate: data.platinumRate || '',
        });
        setLoading(false);
      },
      (err) => {
        console.error(err);
        setLoading(false);
        setAdminNotification({ message: 'Failed to load gold rates.', type: 'error' });
      }
    );
  }, []);

  // Auto-derive 22K and 18K from 24K when autoDerive is enabled
  const handle24kChange = (val) => {
    const update = { ...draftRates, goldRate24k: val };
    if (autoDerive && val > 0) {
      const d = deriveRates(val);
      update.goldRate22k = d.goldRate22k;
      update.goldRate18k = d.goldRate18k;
    }
    setDraftRates(update);
  };

  const handleSave = async () => {
    if (!draftRates.goldRate24k) {
      setAdminNotification({ message: 'Please enter the 24K Gold Rate.', type: 'error' });
      return;
    }
    setSaving(true);
    try {
      await goldRateService.saveRates(draftRates, adminUser?.email || 'admin');
      setAdminNotification({ message: 'Gold rates saved as draft.', type: 'success' });
    } catch (err) {
      console.error(err);
      setAdminNotification({ message: 'Failed to save rates.', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const handlePublish = async () => {
    setShowConfirm(false);
    if (!draftRates.goldRate24k) {
      setAdminNotification({ message: 'Please enter the 24K Gold Rate before publishing.', type: 'error' });
      return;
    }
    setPublishing(true);
    try {
      await goldRateService.publishRates(draftRates, adminUser?.email || 'admin');
      setAdminNotification({ message: '✓ Gold rates published live! All product prices updated.', type: 'success' });
    } catch (err) {
      console.error(err);
      setAdminNotification({ message: 'Failed to publish rates.', type: 'error' });
    } finally {
      setPublishing(false);
    }
  };

  const formatDate = (iso) => {
    if (!iso) return null;
    try {
      return new Date(iso).toLocaleString('en-IN', {
        day: '2-digit', month: 'short', year: 'numeric',
        hour: '2-digit', minute: '2-digit'
      });
    } catch { return iso; }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 rounded-full border-2 border-[#C8A646] border-t-transparent animate-spin" />
          <p className="text-xs text-zinc-400 font-bold uppercase tracking-widest">Loading Rate Engine...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 text-[#1A1A1A] dark:text-zinc-100 font-sans text-left">

      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-400 to-[#C8A646] flex items-center justify-center shadow-sm">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-lg font-black tracking-wide text-zinc-900 dark:text-zinc-100 uppercase">Gold Rate Management</h2>
          </div>
          <p className="text-[10px] text-zinc-400 dark:text-zinc-500 font-medium pl-10">
            Set today's live gold rates. All dynamic products recalculate instantly.
          </p>
        </div>

        {/* Live badge */}
        {savedRates?.isPublished && (
          <span className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 dark:bg-emerald-950/30 border border-solid border-emerald-200 dark:border-emerald-800 rounded-full text-[9px] font-extrabold text-emerald-700 dark:text-emerald-400 uppercase tracking-widest shrink-0">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
            Live — Rates Published
          </span>
        )}
      </div>

      {/* ── Info banner ── */}
      <div className="bg-amber-50 dark:bg-amber-950/20 border border-solid border-amber-200 dark:border-amber-800/40 rounded-xl p-4 flex items-start gap-3">
        <Info className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <p className="text-[10px] font-extrabold uppercase tracking-wider text-amber-700 dark:text-amber-400">How Dynamic Pricing Works</p>
          <p className="text-[11px] text-amber-600 dark:text-amber-500 font-medium leading-relaxed">
            Enter today's 24K rate. 22K and 18K are auto-derived. Click <strong>Save</strong> to store a draft, then <strong>Publish Rates</strong> to push live prices to all customers instantly — no manual product edits needed.
          </p>
        </div>
      </div>

      {/* ── Main Grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left: Rate Inputs (2/3 width) */}
        <div className="lg:col-span-2 space-y-6">

          {/* Core Gold Rates */}
          <div className="bg-white dark:bg-[#15151A] border border-solid border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="flex items-center justify-between border-b border-solid border-zinc-100 dark:border-zinc-850 pb-4">
              <div>
                <h3 className="text-sm font-black tracking-wider text-zinc-900 dark:text-[#E6C687] uppercase">Gold Rates</h3>
                <p className="text-[10px] text-zinc-400 dark:text-zinc-500 font-medium mt-0.5">Enter ₹ per 10 grams (as quoted by bullion market)</p>
              </div>
              {/* Auto-derive toggle */}
              <label className="flex items-center gap-2 cursor-pointer select-none shrink-0">
                <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-400">Auto-derive 22K/18K</span>
                <div
                  onClick={() => setAutoDerive(!autoDerive)}
                  className={`w-9 h-5 rounded-full transition-colors duration-200 relative cursor-pointer border border-solid ${autoDerive ? 'bg-[#C8A646] border-[#C8A646]' : 'bg-zinc-200 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700'}`}
                >
                  <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all duration-200 ${autoDerive ? 'left-4' : 'left-0.5'}`} />
                </div>
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <RateInputCard
                id="rate-24k"
                label="24K Gold Rate"
                sublabel="Pure gold — MCX/IBJA rate"
                badge="PRIMARY"
                value={draftRates.goldRate24k}
                onChange={handle24kChange}
                accentColor="amber"
              />
              <RateInputCard
                id="rate-22k"
                label="22K Gold Rate"
                sublabel={autoDerive ? 'Auto-derived from 24K' : 'Enter manually'}
                badge="22K"
                value={draftRates.goldRate22k}
                onChange={(v) => setDraftRates({ ...draftRates, goldRate22k: v })}
                accentColor="yellow"
                disabled={autoDerive}
              />
              <RateInputCard
                id="rate-18k"
                label="18K Gold Rate"
                sublabel={autoDerive ? 'Auto-derived from 24K' : 'Enter manually'}
                badge="18K"
                value={draftRates.goldRate18k}
                onChange={(v) => setDraftRates({ ...draftRates, goldRate18k: v })}
                accentColor="orange"
                disabled={autoDerive}
              />
            </div>
          </div>

          {/* Optional Rates (Silver/Platinum) */}
          <div className="bg-white dark:bg-[#15151A] border border-solid border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xs overflow-hidden">
            <button
              type="button"
              onClick={() => setShowOptional(!showOptional)}
              className="w-full flex items-center justify-between px-6 py-4 text-left cursor-pointer bg-transparent border-none hover:bg-zinc-50 dark:hover:bg-zinc-900/40 transition-colors"
            >
              <div>
                <h3 className="text-sm font-black tracking-wider text-zinc-900 dark:text-[#E6C687] uppercase">Optional Rates</h3>
                <p className="text-[10px] text-zinc-400 dark:text-zinc-500 font-medium mt-0.5">Silver & Platinum — for future-ready pricing</p>
              </div>
              {showOptional ? <ChevronUp className="w-4 h-4 text-zinc-400" /> : <ChevronDown className="w-4 h-4 text-zinc-400" />}
            </button>

            <AnimatePresence>
              {showOptional && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-solid border-zinc-100 dark:border-zinc-850 pt-6">
                    <RateInputCard
                      id="rate-silver"
                      label="Silver Rate"
                      sublabel="₹ per kilogram"
                      value={draftRates.silverRate}
                      onChange={(v) => setDraftRates({ ...draftRates, silverRate: v })}
                      unit="₹ / kg"
                      accentColor="blue"
                    />
                    <RateInputCard
                      id="rate-platinum"
                      label="Platinum Rate"
                      sublabel="₹ per gram"
                      value={draftRates.platinumRate}
                      onChange={(v) => setDraftRates({ ...draftRates, platinumRate: v })}
                      unit="₹ / gram"
                      accentColor="purple"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={handleSave}
              disabled={saving || publishing}
              className="flex items-center justify-center gap-2 px-6 py-3 border border-solid border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 rounded-xl text-xs font-extrabold uppercase tracking-widest transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-xs"
            >
              {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              {saving ? 'Saving...' : 'Save Draft'}
            </button>

            <button
              type="button"
              onClick={() => setShowConfirm(true)}
              disabled={saving || publishing || !draftRates.goldRate24k}
              className="flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-[#C8A646] to-[#E6C687] hover:brightness-105 text-white rounded-xl text-xs font-extrabold uppercase tracking-widest transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-md"
            >
              {publishing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
              {publishing ? 'Publishing...' : 'Publish Rates Live'}
            </button>
          </div>
        </div>

        {/* Right: Status Panel (1/3 width) */}
        <div className="space-y-4">

          {/* Live Preview Card */}
          <div className="bg-gradient-to-br from-[#1a1208] to-[#2d1f06] border border-solid border-[#C8A646]/30 rounded-2xl p-6 space-y-5 shadow-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAiIHN0cm9rZT0iI0M4QTY0NiIgc3Ryb2tlLW9wYWNpdHk9IjAuMDUiIGZpbGw9Im5vbmUiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-60" />
            <div className="relative space-y-4">
              <p className="text-[9px] uppercase tracking-[0.3em] text-[#C8A646]/70 font-bold">Live Rate Preview</p>
              {[
                { label: '24K Gold', value: draftRates.goldRate24k, unit: '/10g' },
                { label: '22K Gold', value: draftRates.goldRate22k, unit: '/10g' },
                { label: '18K Gold', value: draftRates.goldRate18k, unit: '/10g' },
              ].map(({ label, value, unit }) => (
                <div key={label} className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-[#C8A646]/70 uppercase tracking-wider">{label}</span>
                  <div className="text-right">
                    <span className="text-base font-black text-[#E6C687]">
                      {value ? `₹${Number(value).toLocaleString('en-IN')}` : '—'}
                    </span>
                    <span className="text-[8px] text-[#C8A646]/50 ml-1">{unit}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Metadata Card */}
          <div className="bg-white dark:bg-[#15151A] border border-solid border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 space-y-1 shadow-xs">
            <p className="text-[9px] uppercase tracking-widest font-extrabold text-zinc-400 dark:text-zinc-500 mb-3">Rate Metadata</p>
            <MetaRow icon={Clock}       label="Last Saved"    value={formatDate(savedRates?.lastUpdated)} />
            <MetaRow icon={User}        label="Updated By"    value={savedRates?.updatedBy} />
            <MetaRow icon={CheckCircle2} label="Published At" value={formatDate(savedRates?.publishedAt)} highlight={!!savedRates?.publishedAt} />
            <MetaRow
              icon={AlertCircle}
              label="Status"
              value={savedRates?.isPublished ? 'LIVE ✓' : 'Draft (Not Published)'}
              highlight={savedRates?.isPublished}
            />
          </div>
        </div>
      </div>

      {/* ── Publish Confirmation Dialog ── */}
      <AnimatePresence>
        {showConfirm && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setShowConfirm(false)}
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="relative bg-white dark:bg-zinc-950 border border-solid border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 w-full max-w-md text-left space-y-6 shadow-2xl z-10"
            >
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-amber-100 dark:bg-amber-950/40 flex items-center justify-center shrink-0">
                  <Zap className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-zinc-900 dark:text-zinc-100 uppercase tracking-wide">Publish Rate Changes?</h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">
                    This will push new gold rates live immediately. All products set to <strong>Dynamic</strong> pricing will update their displayed prices instantly for all customers.
                  </p>
                </div>
              </div>

              {/* Rate summary */}
              <div className="bg-zinc-50 dark:bg-zinc-900 border border-solid border-zinc-200 dark:border-zinc-800 rounded-xl p-4 space-y-2">
                {[
                  { label: '24K', value: draftRates.goldRate24k },
                  { label: '22K', value: draftRates.goldRate22k },
                  { label: '18K', value: draftRates.goldRate18k },
                ].map(({ label, value }) => value ? (
                  <div key={label} className="flex justify-between text-xs">
                    <span className="text-zinc-500 font-medium">{label} Gold</span>
                    <span className="font-black text-zinc-900 dark:text-zinc-100">₹{Number(value).toLocaleString('en-IN')}<span className="text-[9px] text-zinc-400 font-medium ml-1">/10g</span></span>
                  </div>
                ) : null)}
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowConfirm(false)}
                  className="flex-1 py-2.5 border border-solid border-zinc-200 dark:border-zinc-800 rounded-xl text-xs font-bold text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all cursor-pointer bg-transparent"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handlePublish}
                  className="flex-1 py-2.5 bg-gradient-to-r from-[#C8A646] to-[#E6C687] text-white rounded-xl text-xs font-extrabold uppercase tracking-widest hover:brightness-105 transition-all cursor-pointer border-none shadow-md flex items-center justify-center gap-2"
                >
                  <Zap className="w-3.5 h-3.5" />
                  Publish Now
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
