import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, AlertTriangle, X } from 'lucide-react';

export default function Toast({
  message,
  type = 'success',
  onClose
}) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className={`fixed bottom-6 right-6 z-[9999] max-w-sm w-full p-4 rounded-2xl border border-solid flex items-center gap-3.5 shadow-2xl backdrop-blur-md ${
            type === 'error'
              ? 'bg-red-50/95 dark:bg-red-950/90 border-red-200 dark:border-red-900/50 text-red-800 dark:text-red-200'
              : 'bg-white/95 dark:bg-zinc-900/95 border-[#E6C687]/30 text-zinc-900 dark:text-zinc-100'
          }`}
        >
          <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 shadow-sm ${
            type === 'error'
              ? 'bg-red-100 dark:bg-red-900/50 text-red-650 dark:text-red-400'
              : 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400'
          }`}>
            {type === 'error' ? (
              <AlertTriangle className="w-5 h-5" />
            ) : (
              <Check className="w-5 h-5" />
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <p className="font-bold text-[10px] uppercase tracking-widest opacity-60 mb-0.5 text-left">
              {type === 'error' ? 'System Warning' : 'System Success'}
            </p>
            <p className="text-xs font-semibold leading-snug break-words text-left">{message}</p>
          </div>

          {onClose && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 text-zinc-400 hover:text-zinc-700 transition-colors cursor-pointer shrink-0 border-none bg-transparent"
              aria-label="Close notification"
            >
              <X className="w-4.5 h-4.5" />
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
