import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../hooks/useCart';
import { useWishlist } from '../hooks/useWishlist';
import { bookingApi } from '../api/booking.api';
import { StorageService } from '../services/StorageService';

export default function CustomerAccountModal({
  isOpen,
  onClose,
  triggerAudio,
  navigateTo,
  initialTab = 'orders' // 'orders', 'track', 'profile'
}) {
  const { handleAddToCart, setCartOpen } = useCart();
  const [activeTab, setActiveTab] = useState(initialTab);
  
  // Stored customer profile
  const [customerProfile, setCustomerProfile] = useState(() => {
    return StorageService.get('hrj_customer_profile', {
      name: '',
      mobile: '',
      email: '',
      city: '',
      address: '',
      pincode: ''
    });
  });

  const [isEditingProfile, setIsEditingProfile] = useState(!customerProfile.mobile);
  const [profileForm, setProfileForm] = useState(customerProfile);
  const [savedSuccessMsg, setSavedSuccessMsg] = useState('');

  // Orders from Firestore & local placed orders
  const [allOrders, setAllOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);

  // Tracking query state
  const [trackingQuery, setTrackingQuery] = useState('');
  const [selectedTrackOrder, setSelectedTrackOrder] = useState(null);
  const [trackError, setTrackError] = useState('');

  // Subscribe to live orders
  useEffect(() => {
    if (!isOpen) return;
    setOrdersLoading(true);
    const unsubscribe = bookingApi.subscribeToOrders(
      (ordersList) => {
        setAllOrders(ordersList || []);
        setOrdersLoading(false);
      },
      (err) => {
        console.error("Failed to load customer orders:", err);
        setOrdersLoading(false);
      }
    );
    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, [isOpen]);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  // Filter orders for the current customer
  const customerOrders = useMemo(() => {
    const localPlacedIds = StorageService.get('hrj_my_order_ids', []);
    const phone = (customerProfile.mobile || '').trim().replace(/\D/g, '');
    const email = (customerProfile.email || '').trim().toLowerCase();

    return allOrders.filter(order => {
      const orderPhone = String(order.mobile || order.recipientMobile || '').replace(/\D/g, '');
      const orderEmail = String(order.email || '').toLowerCase().trim();
      const isLocal = localPlacedIds.includes(order.id);
      const isPhoneMatch = phone && orderPhone && (orderPhone.endsWith(phone) || phone.endsWith(orderPhone));
      const isEmailMatch = email && orderEmail && orderEmail === email;
      return isLocal || isPhoneMatch || isEmailMatch;
    });
  }, [allOrders, customerProfile]);

  // Handle Save Customer Profile
  const handleSaveProfile = (e) => {
    e.preventDefault();
    if (!profileForm.name || !profileForm.mobile) {
      alert("Please provide at least your Name and Mobile Number");
      return;
    }
    StorageService.set('hrj_customer_profile', profileForm);
    setCustomerProfile(profileForm);
    setIsEditingProfile(false);
    setSavedSuccessMsg("✓ Account profile saved successfully!");
    triggerAudio?.('click');
    setTimeout(() => setSavedSuccessMsg(''), 3500);
  };

  // Reorder: 1-click buy again
  const handleReorder = (order) => {
    triggerAudio?.('shimmer');
    if (!order.items || order.items.length === 0) return;
    order.items.forEach(item => {
      handleAddToCart?.(item, item.quantity || 1);
    });
    onClose();
    if (setCartOpen) setCartOpen(true);
  };

  // Track an order
  const handleTrackSubmit = (e) => {
    e?.preventDefault();
    setTrackError('');
    setSelectedTrackOrder(null);
    const q = trackingQuery.trim().toLowerCase();
    if (!q) {
      setTrackError('Please enter an Order ID or 10-digit Mobile number');
      return;
    }

    const cleanQ = q.replace('#', '').replace(/\s+/g, '');
    const found = allOrders.find(o => {
      const orderId = String(o.id || '').toLowerCase();
      const phone = String(o.mobile || o.recipientMobile || '').replace(/\D/g, '');
      return orderId.includes(cleanQ) || (phone && phone.includes(cleanQ));
    });

    if (found) {
      setSelectedTrackOrder(found);
      triggerAudio?.('click');
    } else {
      setTrackError(`No order found matching "${trackingQuery}". Please check the ID or phone number.`);
    }
  };

  // Helper for tracking steps
  const getTrackingSteps = (status) => {
    const s = String(status || 'pending').toLowerCase();
    const isCancelled = s === 'cancelled';
    
    let activeIndex = 0;
    if (s === 'processing' || s === 'confirmed') activeIndex = 1;
    if (s === 'crafting' || s === 'hallmarking') activeIndex = 2;
    if (s === 'shipped' || s === 'dispatched') activeIndex = 3;
    if (s === 'delivered') activeIndex = 4;

    const steps = [
      { title: 'Order Placed', desc: 'Securely received & registered', icon: '📝' },
      { title: 'Showroom Confirmed', desc: 'Verified by boutique manager', icon: '✓' },
      { title: 'Artisan Crafting & BIS 916', desc: 'Laser hallmark certification check', icon: '💎' },
      { title: 'Dispatched in Secure Transit', desc: 'Insured transit / ready for pickup', icon: '🚚' },
      { title: 'Delivered', desc: 'Safely handed over to customer', icon: '🎁' }
    ];

    return { steps, activeIndex, isCancelled };
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999999] flex items-center justify-center p-3 sm:p-5 bg-black/70 backdrop-blur-md overflow-y-auto select-none">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="relative w-full max-w-2xl bg-white dark:bg-[#12071B] border border-solid border-[#C8A646]/30 rounded-3xl shadow-2xl overflow-hidden text-left my-auto flex flex-col max-h-[90vh]"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-solid border-zinc-100 dark:border-white/10 bg-[#FAF8F5] dark:bg-[#1A0B26] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#C8A646] to-[#E6C687] flex items-center justify-center text-white text-lg shadow-sm">
              👤
            </div>
            <div>
              <span className="serif-luxury text-base font-bold tracking-wider text-[#1A1A1A] dark:text-white uppercase block">
                Customer Lounge &amp; Orders
              </span>
              <span className="text-[10px] text-[#C8A646] font-bold tracking-widest uppercase">
                {customerProfile.name ? `Welcome, ${customerProfile.name}` : 'HR Jewellers & Sons Client'}
              </span>
            </div>
          </div>

          <button
            onClick={() => { triggerAudio?.('click'); onClose(); }}
            className="w-9 h-9 rounded-full bg-zinc-200/60 dark:bg-white/10 hover:bg-zinc-300 dark:hover:bg-white/20 text-zinc-700 dark:text-white flex items-center justify-center border-none cursor-pointer transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-solid border-zinc-100 dark:border-white/10 bg-white dark:bg-[#12071B] px-6 shrink-0">
          <button
            onClick={() => { triggerAudio?.('click'); setActiveTab('orders'); }}
            className={`py-3.5 px-3 border-b-2 font-sans text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer bg-transparent border-none transition-all ${
              activeTab === 'orders'
                ? 'border-[#C8A646] text-[#C8A646]'
                : 'border-transparent text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200'
            }`}
          >
            <span>📦</span>
            <span>My Orders ({customerOrders.length})</span>
          </button>

          <button
            onClick={() => { triggerAudio?.('click'); setActiveTab('track'); }}
            className={`py-3.5 px-3 border-b-2 font-sans text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer bg-transparent border-none transition-all ${
              activeTab === 'track'
                ? 'border-[#C8A646] text-[#C8A646]'
                : 'border-transparent text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200'
            }`}
          >
            <span>🚚</span>
            <span>Live Order Tracking</span>
          </button>

          <button
            onClick={() => { triggerAudio?.('click'); setActiveTab('profile'); }}
            className={`py-3.5 px-3 border-b-2 font-sans text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer bg-transparent border-none transition-all ml-auto ${
              activeTab === 'profile'
                ? 'border-[#C8A646] text-[#C8A646]'
                : 'border-transparent text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200'
            }`}
          >
            <span>⚙️</span>
            <span>Shopping Profile</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-left">
          
          {/* ══════════════════════════════════════════════════════════════
              TAB 1: MY ORDERS & ORDER HISTORY ("Apne order dekh ske")
              ══════════════════════════════════════════════════════════════ */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
                    Your Order History
                  </h4>
                  <p className="text-[11px] text-zinc-500 font-medium">
                    View past orders, track dispatch status, and reorder with 1-click.
                  </p>
                </div>
                {customerOrders.length > 0 && (
                  <span className="text-[10px] font-extrabold text-[#C8A646] bg-[#C8A646]/10 px-2.5 py-1 rounded-full border border-solid border-[#C8A646]/20">
                    {customerOrders.length} {customerOrders.length === 1 ? 'Order' : 'Orders'} Recorded
                  </span>
                )}
              </div>

              {ordersLoading ? (
                <div className="py-12 text-center space-y-3">
                  <div className="w-8 h-8 border-2 border-[#C8A646] border-t-transparent rounded-full animate-spin mx-auto" />
                  <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Loading order history...</p>
                </div>
              ) : customerOrders.length === 0 ? (
                <div className="py-12 text-center space-y-4 bg-zinc-50 dark:bg-white/5 rounded-3xl p-6 border border-dashed border-zinc-200 dark:border-white/10">
                  <div className="text-4xl">🛍️</div>
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-zinc-800 dark:text-zinc-200">No Orders Found Yet</p>
                    <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                      Orders placed with your phone number ({customerProfile.mobile || 'account'}) will appear here automatically.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      onClose();
                      navigateTo?.('collections');
                    }}
                    className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#C8A646] to-[#E6C687] text-white text-xs font-extrabold uppercase tracking-wider shadow-md hover:brightness-105 cursor-pointer border-none"
                  >
                    Browse Collections
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {customerOrders.map((order) => {
                    const statusColors = {
                      pending: 'bg-amber-50 text-amber-700 border-amber-200',
                      processing: 'bg-blue-50 text-blue-700 border-blue-200',
                      confirmed: 'bg-blue-50 text-blue-700 border-blue-200',
                      shipped: 'bg-purple-50 text-purple-700 border-purple-200',
                      delivered: 'bg-emerald-50 text-emerald-700 border-emerald-200',
                      cancelled: 'bg-rose-50 text-rose-700 border-rose-200'
                    };
                    const statusKey = String(order.orderStatus || 'pending').toLowerCase();
                    const badgeStyle = statusColors[statusKey] || 'bg-zinc-100 text-zinc-700 border-zinc-200';

                    return (
                      <div
                        key={order.id}
                        className="bg-white dark:bg-[#1A0B26] border border-solid border-zinc-200 dark:border-white/10 rounded-2xl p-4 sm:p-5 space-y-4 shadow-sm hover:shadow-md transition-all"
                      >
                        {/* Order Top Bar */}
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-solid border-zinc-100 dark:border-white/10 pb-3">
                          <div className="space-y-0.5">
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-xs font-extrabold text-zinc-900 dark:text-white">
                                #{order.id?.slice(0, 8).toUpperCase()}
                              </span>
                              <span className={`text-[9px] font-extrabold uppercase px-2.5 py-0.5 rounded-full border ${badgeStyle}`}>
                                {order.orderStatus || 'Pending'}
                              </span>
                            </div>
                            <span className="text-[10px] text-zinc-400 font-medium">
                              Placed on {new Date(order.createdDate || order.date || Date.now()).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                            </span>
                          </div>

                          <div className="text-right">
                            <span className="text-[10px] uppercase tracking-wider text-zinc-400 font-bold block">Total Amount</span>
                            <span className="font-mono text-sm font-black text-[#C8A646]">
                              ₹{Number(order.total || order.totalAmount || 0).toLocaleString('en-IN')}
                            </span>
                          </div>
                        </div>

                        {/* Items Preview */}
                        <div className="space-y-2">
                          {(order.items || []).map((item, i) => (
                            <div key={i} className="flex items-center justify-between gap-3 text-xs">
                              <div className="flex items-center gap-2.5 min-w-0">
                                {item.img && (
                                  <img
                                    src={item.img}
                                    alt={item.name}
                                    className="w-10 h-10 rounded-lg object-contain bg-zinc-50 dark:bg-white/5 border border-zinc-200 dark:border-white/10 shrink-0"
                                  />
                                )}
                                <div className="min-w-0">
                                  <span className="font-bold text-zinc-800 dark:text-zinc-200 block truncate">
                                    {item.name}
                                  </span>
                                  <span className="text-[10px] text-zinc-400 font-medium">
                                    Qty: {item.quantity || 1} • {item.carat || '22K'} {item.weight ? `(${item.weight})` : ''}
                                  </span>
                                </div>
                              </div>
                              <span className="font-mono font-bold text-zinc-700 dark:text-zinc-300 shrink-0">
                                ₹{Number((item.price || 0) * (item.quantity || 1)).toLocaleString('en-IN')}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Order Action Buttons: Reorder & Track */}
                        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-solid border-zinc-100 dark:border-white/10">
                          <span className="text-[10px] text-zinc-400 font-medium">
                            {order.deliveryType === 'store' ? '🏬 Showroom Pickup' : `📍 Deliver to ${order.pincode || 'Address'}`}
                          </span>

                          <div className="flex items-center gap-2">
                            {/* Track Order Button */}
                            <button
                              onClick={() => {
                                setTrackingQuery(order.id);
                                setSelectedTrackOrder(order);
                                setActiveTab('track');
                                triggerAudio?.('click');
                              }}
                              className="px-3.5 py-1.5 rounded-xl border border-solid border-[#C8A646]/30 text-[#C8A646] hover:bg-[#C8A646]/10 text-[11px] font-bold uppercase tracking-wider cursor-pointer bg-transparent transition-colors"
                            >
                              🚚 Track
                            </button>

                            {/* 1-Click Reorder Button ("Again order kr ske") */}
                            <button
                              onClick={() => handleReorder(order)}
                              className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-[#C8A646] to-[#E6C687] text-white text-[11px] font-extrabold uppercase tracking-wider shadow-xs hover:brightness-105 cursor-pointer border-none transition-all flex items-center gap-1.5"
                            >
                              <span>🔁</span> Buy Again
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* ══════════════════════════════════════════════════════════════
              TAB 2: LIVE ORDER TRACKING ("Track kr ske")
              ══════════════════════════════════════════════════════════════ */}
          {activeTab === 'track' && (
            <div className="space-y-6">
              <div className="space-y-1">
                <h4 className="text-xs font-black uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
                  Track Your Boutique Order
                </h4>
                <p className="text-[11px] text-zinc-500 font-medium">
                  Enter your Order ID (e.g. LWXDMSJL) or 10-digit registered mobile number.
                </p>
              </div>

              {/* Search Bar */}
              <form onSubmit={handleTrackSubmit} className="flex gap-2">
                <input
                  type="text"
                  value={trackingQuery}
                  onChange={(e) => setTrackingQuery(e.target.value)}
                  placeholder="Enter Order ID or Mobile number..."
                  className="flex-1 h-11 px-4 rounded-xl bg-zinc-50 dark:bg-white/5 border border-solid border-zinc-200 dark:border-white/15 text-sm font-medium text-zinc-900 dark:text-white focus:outline-none focus:border-[#C8A646]"
                />
                <button
                  type="submit"
                  className="px-6 h-11 rounded-xl bg-gradient-to-r from-[#C8A646] to-[#E6C687] text-white text-xs font-extrabold uppercase tracking-wider shadow-sm hover:brightness-105 cursor-pointer border-none shrink-0"
                >
                  Track Now
                </button>
              </form>

              {trackError && (
                <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/40 text-rose-600 dark:text-rose-400 text-xs font-bold">
                  {trackError}
                </div>
              )}

              {/* Active Tracked Order View */}
              {selectedTrackOrder && (() => {
                const { steps, activeIndex, isCancelled } = getTrackingSteps(selectedTrackOrder.orderStatus);

                return (
                  <div className="bg-zinc-50 dark:bg-white/5 border border-solid border-[#C8A646]/30 rounded-3xl p-5 sm:p-6 space-y-6 shadow-sm animate-fade-in">
                    {/* Header */}
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-solid border-zinc-200 dark:border-white/10 pb-4">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-[#C8A646] tracking-widest block">
                          Tracking Details
                        </span>
                        <h4 className="text-sm font-black text-zinc-900 dark:text-white">
                          Order #{selectedTrackOrder.id?.slice(0, 8).toUpperCase()}
                        </h4>
                      </div>

                      <div className="text-right">
                        <span className="text-[9px] uppercase font-bold text-zinc-400 block">Estimated Status</span>
                        <span className="text-xs font-extrabold uppercase text-[#C8A646]">
                          {selectedTrackOrder.orderStatus || 'Processing'}
                        </span>
                      </div>
                    </div>

                    {/* Stepper Timeline */}
                    {isCancelled ? (
                      <div className="p-4 rounded-2xl bg-rose-50 text-rose-700 font-bold text-xs text-center border border-rose-200">
                        ⚠️ This order was cancelled. If you have questions, please contact our support at +91 97838 43978.
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {steps.map((step, idx) => {
                          const isDone = idx <= activeIndex;
                          const isCurrent = idx === activeIndex;

                          return (
                            <div key={idx} className="flex items-start gap-3.5 relative">
                              {/* Connector line */}
                              {idx < steps.length - 1 && (
                                <div
                                  className={`absolute left-4 top-8 w-0.5 h-8 transition-colors ${
                                    idx < activeIndex ? 'bg-[#C8A646]' : 'bg-zinc-200 dark:bg-white/10'
                                  }`}
                                />
                              )}

                              {/* Dot Icon */}
                              <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-all ${
                                  isDone
                                    ? 'bg-[#C8A646] text-white shadow-md'
                                    : 'bg-zinc-200 dark:bg-white/10 text-zinc-400'
                                } ${isCurrent ? 'ring-4 ring-[#C8A646]/20 scale-110' : ''}`}
                              >
                                {step.icon}
                              </div>

                              {/* Text */}
                              <div className="pt-0.5">
                                <h5 className={`text-xs font-bold ${isDone ? 'text-zinc-900 dark:text-white' : 'text-zinc-400'}`}>
                                  {step.title}
                                  {isCurrent && (
                                    <span className="ml-2 text-[9px] font-extrabold uppercase tracking-widest text-[#C8A646] bg-[#C8A646]/10 px-2 py-0.5 rounded-full">
                                      Current Step
                                    </span>
                                  )}
                                </h5>
                                <p className="text-[10px] text-zinc-400 mt-0.5 font-medium">
                                  {step.desc}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Items & Delivery Info */}
                    <div className="bg-white dark:bg-[#12071B] rounded-2xl p-4 border border-solid border-zinc-200 dark:border-white/10 space-y-3 text-xs">
                      <div className="flex justify-between border-b border-solid border-zinc-100 dark:border-white/5 pb-2">
                        <span className="text-zinc-400 font-medium">Recipient:</span>
                        <span className="font-bold text-zinc-800 dark:text-zinc-200">{selectedTrackOrder.recipientName || 'Valued Client'}</span>
                      </div>
                      <div className="flex justify-between border-b border-solid border-zinc-100 dark:border-white/5 pb-2">
                        <span className="text-zinc-400 font-medium">Delivery Type:</span>
                        <span className="font-bold text-zinc-800 dark:text-zinc-200 capitalize">{selectedTrackOrder.deliveryType || 'Home Delivery'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-400 font-medium">Order Total:</span>
                        <span className="font-mono font-extrabold text-[#C8A646]">
                          ₹{Number(selectedTrackOrder.total || selectedTrackOrder.totalAmount || 0).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* ══════════════════════════════════════════════════════════════
              TAB 3: CUSTOMER SHOPPING PROFILE ("Create Customer Account")
              ══════════════════════════════════════════════════════════════ */}
          {activeTab === 'profile' && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
                    Shopping Profile &amp; Preferences
                  </h4>
                  <p className="text-[11px] text-zinc-500 font-medium">
                    Save your shipping address and contact details for rapid 1-click checkout and instant order tracking.
                  </p>
                </div>
                {!isEditingProfile && (
                  <button
                    onClick={() => setIsEditingProfile(true)}
                    className="text-xs font-bold text-[#C8A646] hover:underline cursor-pointer bg-transparent border-none"
                  >
                    Edit Profile ✏️
                  </button>
                )}
              </div>

              {savedSuccessMsg && (
                <div className="p-3.5 rounded-xl bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                  {savedSuccessMsg}
                </div>
              )}

              {isEditingProfile ? (
                <form onSubmit={handleSaveProfile} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={profileForm.name}
                        onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                        placeholder="e.g. Taruna Soni"
                        className="w-full h-10 px-3.5 rounded-xl bg-zinc-50 dark:bg-white/5 border border-zinc-200 dark:border-white/15 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-[#C8A646]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">Mobile Number *</label>
                      <input
                        type="tel"
                        required
                        value={profileForm.mobile}
                        onChange={(e) => setProfileForm({ ...profileForm, mobile: e.target.value })}
                        placeholder="e.g. 9783843978"
                        className="w-full h-10 px-3.5 rounded-xl bg-zinc-50 dark:bg-white/5 border border-zinc-200 dark:border-white/15 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-[#C8A646]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">Email Address</label>
                      <input
                        type="email"
                        value={profileForm.email}
                        onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                        placeholder="e.g. yourname@gmail.com"
                        className="w-full h-10 px-3.5 rounded-xl bg-zinc-50 dark:bg-white/5 border border-zinc-200 dark:border-white/15 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-[#C8A646]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">City / Town</label>
                      <input
                        type="text"
                        value={profileForm.city}
                        onChange={(e) => setProfileForm({ ...profileForm, city: e.target.value })}
                        placeholder="e.g. Bikaner, Jaipur, Delhi"
                        className="w-full h-10 px-3.5 rounded-xl bg-zinc-50 dark:bg-white/5 border border-zinc-200 dark:border-white/15 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-[#C8A646]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">Delivery Street / House Address</label>
                    <textarea
                      rows="2"
                      value={profileForm.address}
                      onChange={(e) => setProfileForm({ ...profileForm, address: e.target.value })}
                      placeholder="e.g. 4-D-37, Near Murti Circle, J.N.V. Colony"
                      className="w-full p-3 rounded-xl bg-zinc-50 dark:bg-white/5 border border-zinc-200 dark:border-white/15 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-[#C8A646]"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-2">
                    {customerProfile.mobile && (
                      <button
                        type="button"
                        onClick={() => { setProfileForm(customerProfile); setIsEditingProfile(false); }}
                        className="px-4 py-2 text-xs font-bold text-zinc-500 hover:text-zinc-800 cursor-pointer bg-transparent border-none"
                      >
                        Cancel
                      </button>
                    )}
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#C8A646] to-[#E6C687] text-white text-xs font-extrabold uppercase tracking-wider shadow-sm hover:brightness-105 cursor-pointer border-none"
                    >
                      Save Account Profile
                    </button>
                  </div>
                </form>
              ) : (
                <div className="bg-zinc-50 dark:bg-white/5 border border-solid border-zinc-200 dark:border-white/10 rounded-2xl p-5 space-y-3.5 text-xs">
                  <div className="flex items-center justify-between border-b border-solid border-zinc-200/60 dark:border-white/5 pb-2.5">
                    <span className="text-zinc-400 font-medium">Customer Name:</span>
                    <span className="font-bold text-zinc-900 dark:text-white">{customerProfile.name || '—'}</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-solid border-zinc-200/60 dark:border-white/5 pb-2.5">
                    <span className="text-zinc-400 font-medium">Mobile Phone:</span>
                    <span className="font-mono font-bold text-zinc-900 dark:text-white">{customerProfile.mobile || '—'}</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-solid border-zinc-200/60 dark:border-white/5 pb-2.5">
                    <span className="text-zinc-400 font-medium">Email Address:</span>
                    <span className="font-bold text-zinc-900 dark:text-white">{customerProfile.email || '—'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-400 font-medium">Default Delivery City:</span>
                    <span className="font-bold text-zinc-900 dark:text-white">{customerProfile.city || 'Bikaner, Rajasthan'}</span>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-[#FAF8F5] dark:bg-[#1A0B26] border-t border-solid border-zinc-100 dark:border-white/10 flex items-center justify-between text-xs shrink-0">
          <span className="text-[10px] text-zinc-400 font-medium">
            💎 HR Jewellers &amp; Sons • Established 1996
          </span>
          <button
            onClick={() => { triggerAudio?.('click'); onClose(); }}
            className="px-5 py-1.5 rounded-full bg-zinc-200 dark:bg-white/10 hover:bg-zinc-300 dark:hover:bg-white/20 text-zinc-700 dark:text-white font-bold text-[11px] uppercase tracking-wider border-none cursor-pointer transition-colors"
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
}
