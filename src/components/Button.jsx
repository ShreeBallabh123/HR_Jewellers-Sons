import React from 'react';

export default function Button({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  className = '',
  disabled = false,
  ...props
}) {
  const baseStyle = "px-6 py-3 text-xs uppercase font-bold tracking-widest rounded-xl transition-all duration-300 transform active:scale-95 cursor-pointer text-center";
  
  const variants = {
    primary: "bg-gradient-to-r from-gold to-[#DDA0DD] hover:from-[#DDA0DD] hover:to-gold text-navy shadow-md hover:shadow-xl hover:-translate-y-0.5 text-white border-none font-bold",
    secondary: "border border-solid border-gold/50 hover:border-gold text-navy bg-gold/5 hover:-translate-y-0.5 hover:shadow-lg",
    danger: "bg-red-650 hover:bg-red-700 text-white shadow-md border-none font-bold",
    minimal: "border border-solid border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-900 font-bold hover:bg-zinc-50 dark:hover:bg-zinc-800"
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${variants[variant]} ${disabled ? 'opacity-50 pointer-events-none scale-100' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
