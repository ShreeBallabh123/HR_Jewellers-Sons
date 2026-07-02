import React from 'react';

export default function Skeleton({
  variant = 'card',
  className = ''
}) {
  if (variant === 'text') {
    return (
      <div className={`animate-pulse space-y-2 ${className}`}>
        <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-3/4" />
        <div className="h-3 bg-zinc-200 dark:bg-zinc-800 rounded w-1/2" />
      </div>
    );
  }

  // Card Skeleton placeholder
  return (
    <div className={`animate-pulse border border-solid border-slate-100 rounded-3xl p-4 bg-white space-y-4 ${className}`}>
      <div className="aspect-square bg-zinc-100 dark:bg-zinc-800 rounded-2xl w-full" />
      <div className="space-y-2">
        <div className="h-3 bg-zinc-200 dark:bg-zinc-800 rounded w-1/3" />
        <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-3/4" />
        <div className="h-3 bg-zinc-200 dark:bg-zinc-800 rounded w-5/6" />
      </div>
      <div className="pt-3 border-t border-solid border-slate-50 flex justify-between items-center">
        <div className="space-y-1">
          <div className="h-2 bg-zinc-250 dark:bg-zinc-800 rounded w-10" />
          <div className="h-4 bg-zinc-250 dark:bg-zinc-800 rounded w-16" />
        </div>
        <div className="h-6 bg-zinc-200 dark:bg-zinc-800 rounded-full w-12" />
      </div>
    </div>
  );
}
