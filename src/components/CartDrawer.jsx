import React, { useEffect } from 'react';
import { useCart } from '../hooks/useCart';

export default function CartDrawer({ isOpen, onClose, navigateTo }) {
  const { 
    cartItems, 
    handleUpdateQuantity, 
    handleRemoveFromCart, 
    cartTotal,
    cartItemCount 
  } = useCart();

  // Prevent scroll on body when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex justify-end font-sans">
      {/* Dark Blur Overlay */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300 animate-fade-in"
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-md h-full bg-white text-[#1A1A1A] shadow-2xl flex flex-col z-10 animate-slide-left select-none">
        {/* Subtle gold line on top */}
        <div className="h-1 bg-gradient-to-r from-[#B8893C] to-[#E6C687] w-full"></div>

        {/* Drawer Header */}
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-[#FAF9F7]">
          <div className="flex items-baseline space-x-2">
            <h2 className="serif-luxury text-lg font-bold text-[#031838] tracking-wide uppercase">Shopping Bag</h2>
            <span className="text-xs text-[#B8893C] font-semibold font-sans">({cartItemCount} item{cartItemCount !== 1 ? 's' : ''})</span>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-gray-200 hover:border-[#B8893C] flex items-center justify-center text-gray-500 hover:text-[#B8893C] transition-colors focus:outline-none cursor-pointer text-sm font-bold bg-white"
          >
            ✕
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
              <span className="text-4xl text-[#B8893C]/40">💍</span>
              <p className="text-sm font-medium text-gray-400 font-sans">Your Shopping Bag is empty</p>
              <button 
                onClick={() => { onClose(); navigateTo('collections'); }}
                className="px-6 py-2.5 bg-[#031838] hover:bg-[#0c2447] text-white text-xs font-bold rounded-lg tracking-widest uppercase cursor-pointer border-none shadow-sm transition-all"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-white border border-gray-100 rounded-xl p-4 flex gap-4 relative hover:shadow-xs transition-shadow">
                  {/* Thumbnail */}
                  <div className="w-20 h-20 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center border border-gray-100">
                    <img 
                      src={item.img || item.image} 
                      alt={item.name} 
                      className="w-full h-full object-contain mix-blend-multiply" 
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0 space-y-1.5 text-left">
                    <h4 className="text-xs font-bold text-[#031838] line-clamp-2 pr-4">{item.name}</h4>
                    {item.carat && (
                      <p className="text-[10px] text-gray-400 font-medium">
                        {item.carat}
                      </p>
                    )}
                    {item.desc && item.desc.includes('Engraved:') && (
                      <p className="text-[10px] text-[#B8893C] font-semibold italic">
                        {item.desc}
                      </p>
                    )}

                    <div className="flex items-center justify-between pt-1">
                      {/* Quantity select */}
                      <div className="flex items-center border border-gray-200 rounded-md">
                        <button
                          onClick={() => handleUpdateQuantity(item.id, -1)}
                          className="w-6 h-6 text-gray-500 hover:text-gray-800 flex items-center justify-center cursor-pointer text-xs focus:outline-none bg-transparent border-none"
                        >
                          −
                        </button>
                        <span className="px-1.5 text-[11px] font-bold text-gray-800 font-sans">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleUpdateQuantity(item.id, 1)}
                          className="w-6 h-6 text-gray-500 hover:text-gray-800 flex items-center justify-center cursor-pointer text-xs focus:outline-none bg-transparent border-none"
                        >
                          +
                        </button>
                      </div>

                      {/* Total item price */}
                      <span className="text-xs font-bold text-[#031838] font-sans">
                        ₹ {(item.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  {/* Quick Remove Button */}
                  <button 
                    onClick={() => handleRemoveFromCart(item.id)}
                    className="absolute top-2.5 right-2.5 text-gray-400 hover:text-[#c0392b] transition-colors focus:outline-none border-none bg-transparent cursor-pointer p-1"
                    title="Remove item"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        {cartItems.length > 0 && (
          <div className="bg-[#FAF9F7] border-t border-gray-150 p-6 space-y-4">
            <div className="space-y-2.5 text-xs text-left">
              <div className="flex justify-between text-gray-500 font-medium">
                <span>Subtotal ({cartItemCount} item{cartItemCount !== 1 ? 's' : ''})</span>
                <span className="font-bold text-[#031838] font-sans">₹ {cartTotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-gray-500 font-medium">
                <span>GST (3%)</span>
                <span className="font-bold text-[#031838] font-sans">₹ {Math.round(cartTotal * 0.03).toLocaleString('en-IN')}</span>
              </div>
              <div className="border-t border-gray-200 pt-3 flex justify-between items-center">
                <span className="text-sm font-bold text-[#031838]">Total Payable</span>
                <span className="text-base font-black text-[#031838] font-sans">₹ {(cartTotal + Math.round(cartTotal * 0.03)).toLocaleString('en-IN')}</span>
              </div>
            </div>

            <button
              onClick={() => {
                onClose();
                navigateTo('checkout');
              }}
              className="w-full h-12 bg-gradient-to-r from-[#B8893C] via-[#D5A75C] to-[#B8893C] hover:brightness-110 text-white font-bold text-xs uppercase tracking-[0.2em] rounded-lg shadow-md transition-all duration-300 active:scale-99 flex items-center justify-center cursor-pointer border-none font-semibold font-sans mt-2"
            >
              CONFIRM BAG CHECKOUT
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
