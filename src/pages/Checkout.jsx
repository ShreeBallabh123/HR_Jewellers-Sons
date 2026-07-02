import React, { useState } from 'react';
import { useCart } from '../hooks/useCart';
import { bookingApi } from '../api/booking.api';

export default function Checkout({ navigateTo, triggerAudio }) {
  const { cartItems, cartTotal, handleUpdateQuantity, handleRemoveFromCart, clearCart } = useCart();

  const [checkoutFlowStep, setCheckoutFlowStep] = useState(1);
  const [checkoutForm, setCheckoutForm] = useState({ method: 'card', name: '', phone: '', address: '' });
  const [deliveryType, setDeliveryType] = useState('home'); // 'home' or 'store'
  const [deliveryForm, setDeliveryForm] = useState({
    email: '',
    mobile: '',
    whatsapp: '',
    recipientName: '',
    pincode: '',
    apartment: '',
    street: '',
    locality: '',
    landmark: '',
    storeBranch: 'Main Showroom',
    storeCity: 'Bikaner'
  });

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [placedOrderId, setPlacedOrderId] = useState('');
  const [submittingOrder, setSubmittingOrder] = useState(false);

  const updateCartQuantity = (itemId, amount) => {
    const item = cartItems.find(i => i.id === itemId);
    if (item) {
      handleUpdateQuantity(itemId, item.quantity + amount);
    }
  };

  const removeFromCart = (itemId) => {
    handleRemoveFromCart(itemId);
  };

  const handleCartCheckoutSubmit = async () => {
    if (cartItems.length === 0) return;
    setSubmittingOrder(true);
    try {
      const orderPayload = {
        recipientName: deliveryForm.recipientName,
        email: deliveryForm.email,
        mobile: deliveryForm.mobile,
        whatsapp: deliveryForm.whatsapp || '',
        deliveryType,
        storeBranch: deliveryType === 'store' ? deliveryForm.storeBranch : '',
        storeCity: deliveryType === 'store' ? deliveryForm.storeCity : '',
        address: deliveryType === 'home' 
          ? `${deliveryForm.apartment}, ${deliveryForm.street}, ${deliveryForm.locality}, ${deliveryForm.landmark || ''}, PIN: ${deliveryForm.pincode}`
          : '',
        pincode: deliveryForm.pincode,
        paymentMethod: checkoutForm.method,
        items: cartItems.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          carat: item.carat || '',
          weight: item.weight || '',
          desc: item.desc || ''
        })),
        subtotal: cartTotal,
        gst: Math.round(cartTotal * 0.03),
        total: cartTotal + Math.round(cartTotal * 0.03),
        createdDate: new Date().toISOString()
      };

      const result = await bookingApi.createOrder(orderPayload);
      setPlacedOrderId(result.id);
      setOrderPlaced(true);
      clearCart();
    } catch (err) {
      console.error("Order submission failed:", err);
      alert("Failed to submit order. Please try again.");
    } finally {
      setSubmittingOrder(false);
    }
  };

  if (orderPlaced) {
    return (
      <div className="bg-[#FAF8F6] min-h-screen py-16 px-6 sm:px-12 flex items-center justify-center font-sans text-gray-800 text-left select-none">
        <div className="max-w-md w-full bg-white border border-gray-150 rounded-3xl p-8 text-center space-y-6 shadow-xl relative overflow-hidden">
          {/* Subtle gold line on top */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#B8893C] to-[#E6C687]"></div>
          
          <div className="w-16 h-16 bg-[#B8893C]/10 rounded-full flex items-center justify-center text-3xl mx-auto text-[#B8893C]">
            ✓
          </div>
          
          <div className="space-y-2">
            <h2 className="serif-luxury text-xl font-bold text-[#031838] tracking-wide uppercase">Order Placed Successfully</h2>
            <p className="text-xs text-gray-400">Thank you for choosing HR Jewellers &amp; Sons. Your order has been registered securely.</p>
          </div>

          <div className="bg-gray-50 rounded-2xl p-4 text-xs space-y-2 text-left border border-gray-100 font-medium">
            <div className="flex justify-between text-gray-500">
              <span>Order Reference ID</span>
              <span className="font-mono font-bold text-[#031838] select-all">{placedOrderId}</span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>Recipient Name</span>
              <span className="font-bold text-[#031838]">{deliveryForm.recipientName}</span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>Contact Mobile</span>
              <span className="font-bold text-[#031838]">{deliveryForm.mobile}</span>
            </div>
            <div className="flex justify-between text-gray-500 border-t border-gray-150 pt-2 mt-2">
              <span className="text-[#031838] font-bold">Total Amount</span>
              <span className="font-bold text-base text-[#B8893C]">₹ {(cartTotal + Math.round(cartTotal * 0.03)).toLocaleString('en-IN')}</span>
            </div>
          </div>

          <p className="text-[11px] text-gray-400 italic">Our store manager will contact you on WhatsApp/Mobile shortly to share receipt details and schedule delivery.</p>

          <button
            onClick={() => navigateTo('home')}
            className="w-full py-3.5 bg-gradient-to-r from-[#B8893C] to-[#E6C687] hover:brightness-110 text-white text-xs uppercase font-black tracking-widest rounded-xl transition-all shadow-md cursor-pointer border-none"
          >
            Continue to Showroom
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF8F6] min-h-screen pb-0 font-sans text-gray-800">
      {/* Checkout Header with Progress Bar */}
      <header className="w-full bg-white border-b border-gray-200 py-4 px-6 sm:px-12 flex flex-col sm:flex-row justify-between items-center gap-4">
        {/* Logo */}
        <div onClick={() => navigateTo('home')} className="flex items-center space-x-2 font-serif text-lg font-bold text-[#031838] tracking-widest cursor-pointer select-none">
          <span>HR JEWELLER &amp; SONS</span>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center space-x-4 text-xs font-semibold select-none">
          <div className="flex flex-col items-center">
            <span className={`${checkoutFlowStep === 1 ? 'text-[#031838]' : 'text-gray-400'}`}>Cart</span>
            <div className={`w-3.5 h-3.5 rounded-full border-2 mt-1 flex items-center justify-center ${checkoutFlowStep >= 1 ? 'border-[#006361] bg-[#006361]' : 'border-gray-300 bg-white'}`}>
              {checkoutFlowStep > 1 && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
            </div>
          </div>
          <div className="w-16 h-[2px]" style={{ backgroundColor: checkoutFlowStep > 1 ? '#006361' : '#E5E7EB' }} />
          <div className="flex flex-col items-center">
            <span className={`${checkoutFlowStep === 2 ? 'text-[#031838]' : 'text-gray-400'}`}>Delivery</span>
            <div className={`w-3.5 h-3.5 rounded-full border-2 mt-1 flex items-center justify-center ${checkoutFlowStep >= 2 ? 'border-[#006361] bg-[#006361]' : 'border-gray-300 bg-white'}`}>
              {checkoutFlowStep > 2 && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
            </div>
          </div>
          <div className="w-16 h-[2px]" style={{ backgroundColor: checkoutFlowStep > 2 ? '#006361' : '#E5E7EB' }} />
          <div className="flex flex-col items-center">
            <span className={`${checkoutFlowStep === 3 ? 'text-[#031838]' : 'text-gray-400'}`}>Payment</span>
            <div className={`w-3.5 h-3.5 rounded-full border-2 mt-1 flex items-center justify-center ${checkoutFlowStep >= 3 ? 'border-[#006361] bg-[#006361]' : 'border-gray-300 bg-white'}`}>
              {checkoutFlowStep > 3 && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
            </div>
          </div>
        </div>

        {/* Secure Badge */}
        <div className="flex items-center gap-1.5 text-xs text-gray-500 tracking-wide select-none">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-[#006361]">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <span className="font-bold text-[#006361]">100% SECURE</span>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 mt-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* ===== LEFT PANEL ===== */}
          <div className="lg:col-span-8 space-y-6">

            {/* ===== STEP 1: CART ===== */}
            {checkoutFlowStep === 1 && (
              <div className="animate-fade-in text-left">
                <h2 className="text-lg font-bold text-[#031838] mb-6">My Shopping Cart ({cartItems.reduce((a, c) => a + c.quantity, 0)} Item{cartItems.reduce((a, c) => a + c.quantity, 0) !== 1 ? 's' : ''})</h2>

                {cartItems.length === 0 ? (
                  <div className="bg-white border border-gray-100 rounded-2xl p-12 text-center">
                    <p className="text-gray-400 text-sm">Your cart is empty</p>
                    <button onClick={() => navigateTo('collections')} className="mt-4 px-6 py-2 bg-[#031838] text-white text-xs font-bold rounded-lg cursor-pointer">CONTINUE SHOPPING</button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cartItems.map(item => (
                      <div key={item.id} className="bg-white border border-gray-100 rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:gap-6 relative">
                        {/* Product Image */}
                        <div className="w-full sm:w-32 h-32 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0">
                          <img src={item.img || item.image} alt={item.name} className="w-full h-full object-contain" />
                        </div>

                        {/* Product Info */}
                        <div className="flex-1 space-y-2">
                          <h3 className="text-sm font-bold text-[#031838]">{item.name}</h3>
                          <p className="text-[10px] text-gray-400">Product Code: {item.id}</p>

                          <div className="flex flex-wrap gap-x-6 gap-y-1 text-[10px] text-gray-500 mt-2">
                            {item.carat && <span><strong className="text-gray-600">Metal:</strong> {item.carat}</span>}
                            {item.weight && <span><strong className="text-gray-600">Weight:</strong> {item.weight}</span>}
                          </div>

                          <div className="flex items-center gap-3 mt-3">
                            <span className="text-xs text-gray-500">Quantity</span>
                            <div className="flex items-center border border-gray-200 rounded-lg">
                              <button
                                onClick={() => updateCartQuantity(item.id, -1)}
                                className="w-7 h-7 text-gray-500 hover:text-gray-800 flex items-center justify-center cursor-pointer text-sm focus:outline-none"
                              >−</button>
                              <span className="px-2 text-xs font-bold text-gray-800">{item.quantity}</span>
                              <button
                                onClick={() => updateCartQuantity(item.id, 1)}
                                className="w-7 h-7 text-gray-500 hover:text-gray-800 flex items-center justify-center cursor-pointer text-sm focus:outline-none"
                              >+</button>
                            </div>
                          </div>

                          <div className="flex gap-4 mt-3 text-[10px] uppercase font-bold tracking-wider">
                            <button onClick={() => removeFromCart(item.id)} className="text-[#c0392b] hover:underline cursor-pointer bg-transparent border-none">REMOVE</button>
                          </div>
                        </div>

                        {/* Price */}
                        <div className="text-right flex-shrink-0">
                          <span className="text-base font-bold text-[#031838]">₹ {(item.price * item.quantity).toLocaleString('en-IN')}</span>
                        </div>
                      </div>
                    ))}

                    {/* Trust Badges under cart */}
                    <div className="bg-white border border-gray-100 rounded-2xl p-4 flex flex-wrap justify-center gap-6 text-[10px] text-gray-500 select-none">
                      <span className="flex items-center gap-1"><span className="text-green-500">✓</span> 30-Day Returnable</span>
                      <span className="flex items-center gap-1"><span className="text-green-500">✓</span> Eligible for Lifetime exchange &amp; Buy back</span>
                      <span className="flex items-center gap-1"><span className="text-green-500">✓</span> Free &amp; Insured Delivery</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ===== STEP 2: DELIVERY ===== */}
            {checkoutFlowStep === 2 && (
              <div className="animate-fade-in space-y-6 text-left">
                {/* Your Details Section */}
                <div className="bg-white border border-gray-100 rounded-2xl p-6 sm:p-8 space-y-5">
                  <div>
                    <h2 className="text-lg font-bold text-[#031838]">Your Details</h2>
                    <p className="text-xs text-gray-400 mt-1">Required to Save Cart and Send Order Updates</p>
                  </div>

                  {/* Email & Mobile */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="relative border border-gray-200 rounded-lg px-3 py-2.5 flex items-center gap-2">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4 text-gray-400 flex-shrink-0"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m2 7 10 6 10-6" /></svg>
                      <div className="flex-1">
                        <span className="text-[9px] uppercase tracking-wider text-gray-400 block">Email address</span>
                        <input type="email" required placeholder="your@email.com" value={deliveryForm.email} onChange={(e) => setDeliveryForm({ ...deliveryForm, email: e.target.value })} className="w-full bg-transparent border-none outline-none text-xs text-gray-800 font-semibold mt-0.5 focus:ring-0 focus:outline-none" />
                      </div>
                    </div>
                    <div className="relative border border-gray-200 rounded-lg px-3 py-2.5 flex items-center gap-2">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4 text-gray-400 flex-shrink-0"><rect x="5" y="2" width="14" height="20" rx="2" /><line x1="12" y1="18" x2="12" y2="18.01" /></svg>
                      <div className="flex-1">
                        <span className="text-[9px] uppercase tracking-wider text-gray-400 block">Mobile number</span>
                        <input type="tel" required placeholder="+91 XXXXX XXXXX" value={deliveryForm.mobile} onChange={(e) => setDeliveryForm({ ...deliveryForm, mobile: e.target.value })} className="w-full bg-transparent border-none outline-none text-xs text-gray-800 font-semibold mt-0.5 focus:ring-0 focus:outline-none" />
                      </div>
                    </div>
                  </div>

                  {/* WhatsApp */}
                  <p className="text-xs text-gray-400">Would you like to receive notifications on WhatsApp?</p>
                  <div className="relative border border-gray-200 rounded-lg px-3 py-2.5 flex items-center gap-2">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4 text-gray-400 flex-shrink-0"><rect x="5" y="2" width="14" height="20" rx="2" /><line x1="12" y1="18" x2="12" y2="18.01" /></svg>
                    <div className="flex-1">
                      <span className="text-[9px] uppercase tracking-wider text-gray-400 block">WhatsApp Number (Optional)</span>
                      <input type="tel" placeholder="+91" value={deliveryForm.whatsapp} onChange={(e) => setDeliveryForm({ ...deliveryForm, whatsapp: e.target.value })} className="w-full bg-transparent border-none outline-none text-xs text-gray-800 font-semibold mt-0.5 focus:ring-0 focus:outline-none" />
                    </div>
                  </div>
                </div>

                {/* Delivery Type */}
                <div className="bg-white border border-gray-100 rounded-2xl p-6 sm:p-8 space-y-4">
                  <div>
                    <h2 className="text-lg font-bold text-[#031838]">Delivery Type</h2>
                    <p className="text-xs text-gray-400 mt-1">Please choose preferred type of delivery.</p>
                  </div>

                  <label className={`flex items-center justify-between border rounded-xl px-4 py-3.5 cursor-pointer transition-all ${deliveryType === 'home' ? 'border-[#006361] bg-[#006361]/5' : 'border-gray-200 hover:border-gray-300'}`}>
                    <span className="text-xs font-semibold text-[#031838]">Home Delivery</span>
                    <input type="radio" name="deliveryType" value="home" checked={deliveryType === 'home'} onChange={() => setDeliveryType('home')} className="accent-[#006361]" />
                  </label>

                  <label className={`flex flex-col border rounded-xl px-4 py-3.5 cursor-pointer transition-all ${deliveryType === 'store' ? 'border-[#006361] bg-[#006361]/5' : 'border-gray-200 hover:border-gray-300'}`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xs font-semibold text-[#031838]">Pick up from store</span>
                        <p className="text-[10px] text-gray-400 mt-0.5">Buy now, pick up from our store at your convenience.</p>
                      </div>
                      <input type="radio" name="deliveryType" value="store" checked={deliveryType === 'store'} onChange={() => setDeliveryType('store')} className="accent-[#006361]" />
                    </div>

                    {/* Store Selection (shown when store is selected) */}
                    {deliveryType === 'store' && (
                      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-gray-100">
                        <div className="relative border border-gray-200 rounded-lg px-3 py-2">
                          <span className="text-[9px] uppercase tracking-wider text-gray-400 block">City</span>
                          <select value={deliveryForm.storeCity} onChange={(e) => setDeliveryForm({ ...deliveryForm, storeCity: e.target.value })} className="w-full bg-transparent border-none outline-none text-xs text-gray-800 font-semibold mt-0.5 focus:ring-0 cursor-pointer">
                            <option value="">—</option>
                            <option value="Bikaner">Bikaner</option>
                            <option value="Jaipur">Jaipur</option>
                            <option value="Jodhpur">Jodhpur</option>
                          </select>
                        </div>
                        <div className="relative border border-gray-200 rounded-lg px-3 py-2">
                          <span className="text-[9px] uppercase tracking-wider text-gray-400 block">Store</span>
                          <select value={deliveryForm.storeBranch} onChange={(e) => setDeliveryForm({ ...deliveryForm, storeBranch: e.target.value })} className="w-full bg-transparent border-none outline-none text-xs text-gray-800 font-semibold mt-0.5 focus:ring-0 cursor-pointer">
                            <option value="">—</option>
                            <option value="Tilak Nagar Flagship, Bikaner">Tilak Nagar Flagship, Bikaner</option>
                            <option value="Station Road, Bikaner">Station Road, Bikaner</option>
                          </select>
                        </div>
                        {deliveryForm.storeBranch && (
                          <div className="sm:col-span-2 relative border border-gray-200 rounded-lg px-3 py-2">
                            <span className="text-[9px] uppercase tracking-wider text-gray-400 block">Store Address</span>
                            <p className="text-xs text-gray-700 font-semibold mt-0.5">{deliveryForm.storeBranch}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </label>
                </div>

                {/* Delivery Details (Address Fields) */}
                <div className="bg-white border border-gray-100 rounded-2xl p-6 sm:p-8 space-y-4">
                  <div>
                    <h2 className="text-lg font-bold text-[#031838]">Delivery Details</h2>
                    <p className="text-xs text-gray-400 mt-1">We will deliver the order at the below address</p>
                  </div>

                  {/* Recipient Name */}
                  <div className="relative border border-gray-200 rounded-lg px-3 py-2.5 flex items-center gap-2">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4 text-gray-400 flex-shrink-0"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                    <input type="text" required placeholder="Recipient's Name" value={deliveryForm.recipientName} onChange={(e) => setDeliveryForm({ ...deliveryForm, recipientName: e.target.value })} className="w-full bg-transparent border-none outline-none text-xs text-gray-800 font-semibold focus:ring-0 focus:outline-none" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Recipient Mobile */}
                    <div className="relative border border-gray-200 rounded-lg px-3 py-2.5 flex items-center gap-2">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4 text-gray-400 flex-shrink-0"><rect x="5" y="2" width="14" height="20" rx="2" /><line x1="12" y1="18" x2="12" y2="18.01" /></svg>
                      <div className="flex-1">
                        <span className="text-[9px] uppercase tracking-wider text-gray-400 block">Recipient's mobile (optional)</span>
                        <input type="tel" placeholder="+91" value={deliveryForm.recipientMobile} onChange={(e) => setDeliveryForm({ ...deliveryForm, recipientMobile: e.target.value })} className="w-full bg-transparent border-none outline-none text-xs text-gray-800 font-semibold mt-0.5 focus:ring-0 focus:outline-none" />
                      </div>
                    </div>
                    {/* Pincode */}
                    <div className="relative border border-gray-200 rounded-lg px-3 py-2.5">
                      <span className="text-[9px] uppercase tracking-wider text-gray-400 block">Enter Valid Pincode</span>
                      <input type="text" required placeholder="e.g. 334001" maxLength="6" value={deliveryForm.pincode} onChange={(e) => setDeliveryForm({ ...deliveryForm, pincode: e.target.value })} className="w-full bg-transparent border-none outline-none text-xs text-gray-800 font-semibold mt-0.5 focus:ring-0 focus:outline-none" />
                    </div>
                  </div>

                  {deliveryType === 'home' && (
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="relative border border-gray-200 rounded-lg px-3 py-2.5">
                          <input type="text" required placeholder="Enter complete Apartment/House/Flat No." value={deliveryForm.apartment} onChange={(e) => setDeliveryForm({ ...deliveryForm, apartment: e.target.value })} className="w-full bg-transparent border-none outline-none text-xs text-gray-800 font-semibold focus:ring-0 focus:outline-none" />
                        </div>
                        <div className="relative border border-gray-200 rounded-lg px-3 py-2.5">
                          <input type="text" required placeholder="Enter complete Street/Colony/Area Name" value={deliveryForm.street} onChange={(e) => setDeliveryForm({ ...deliveryForm, street: e.target.value })} className="w-full bg-transparent border-none outline-none text-xs text-gray-800 font-semibold focus:ring-0 focus:outline-none" />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="relative border border-gray-200 rounded-lg px-3 py-2.5">
                          <input type="text" required placeholder="Enter complete Locality/Town Name" value={deliveryForm.locality} onChange={(e) => setDeliveryForm({ ...deliveryForm, locality: e.target.value })} className="w-full bg-transparent border-none outline-none text-xs text-gray-800 font-semibold focus:ring-0 focus:outline-none" />
                        </div>
                        <div className="relative border border-gray-200 rounded-lg px-3 py-2.5">
                          <input type="text" placeholder="Landmark (Optional)" value={deliveryForm.landmark} onChange={(e) => setDeliveryForm({ ...deliveryForm, landmark: e.target.value })} className="w-full bg-transparent border-none outline-none text-xs text-gray-800 font-semibold focus:ring-0 focus:outline-none" />
                        </div>
                      </div>
                    </>
                  )}

                  {/* GST Number */}
                  <div className="relative border border-gray-200 rounded-lg px-3 py-2.5">
                    <input type="text" placeholder="GST Number (Optional)" value={deliveryForm.gstNumber} onChange={(e) => setDeliveryForm({ ...deliveryForm, gstNumber: e.target.value })} className="w-full bg-transparent border-none outline-none text-xs text-gray-800 font-semibold focus:ring-0 focus:outline-none" />
                  </div>

                  {/* Billing same as shipping */}
                  <label className="flex items-center gap-2 text-xs text-gray-600 cursor-pointer select-none">
                    <input type="checkbox" checked={deliveryForm.billingIsSameAsShipping} onChange={(e) => setDeliveryForm({ ...deliveryForm, billingIsSameAsShipping: e.target.checked })} className="accent-[#006361] rounded focus:outline-none" />
                    <span>Billing address is <span className="text-[#006361] font-semibold">same as shipping address</span></span>
                  </label>
                </div>
              </div>
            )}

            {/* ===== STEP 3: PAYMENT ===== */}
            {checkoutFlowStep === 3 && (
              <div className="animate-fade-in text-left">
                <div className="bg-white border border-gray-100 rounded-2xl p-6 sm:p-8 space-y-6">
                  <h2 className="text-lg font-bold text-[#031838]">Choose a Payment Method</h2>

                  <div className="flex flex-col sm:flex-row gap-0">
                    {/* Vertical Tabs */}
                    <div className="flex flex-row sm:flex-col sm:min-w-[140px] border-b sm:border-b-0 sm:border-r border-gray-200 text-left">
                      {[
                        { id: 'card', name: 'Cards' },
                        { id: 'netbanking', name: 'Net Banking' },
                        { id: 'upi', name: 'UPI' },
                        { id: 'cod', name: 'Cash on Delivery' }
                      ].map(m => (
                        <button
                          key={m.id}
                          type="button"
                          onClick={() => setCheckoutForm({ ...checkoutForm, method: m.id })}
                          className={`text-left px-4 py-3 text-xs font-semibold transition-all cursor-pointer border-none bg-transparent ${checkoutForm.method === m.id ? 'text-[#031838] bg-white' : 'text-gray-400 hover:text-gray-600'}`}
                          style={{ borderLeft: checkoutForm.method === m.id ? '3px solid #E84F35' : '3px solid transparent' }}
                        >
                          {m.name}
                        </button>
                      ))}
                    </div>

                    {/* Right Content */}
                    <div className="flex-1 px-4 sm:px-8 py-4 sm:py-2 text-left">
                      <h3 className="text-sm font-bold text-[#031838] mb-3">
                        Pay with {checkoutForm.method === 'cod' ? 'Cash on Showroom Delivery' : 'Card, Net Banking or UPI'}
                      </h3>
                      <p className="text-xs text-gray-400 leading-relaxed mb-6">
                        {checkoutForm.method === 'cod'
                          ? 'Your order will be confirmed and you can pay at the showroom or upon delivery.'
                          : "You'll be securely redirected to enter your payment details and complete your purchase via WhatsApp confirmation."
                        }
                      </p>

                      <button
                        onClick={handleCartCheckoutSubmit}
                        className="w-full sm:w-auto px-16 py-3.5 rounded-lg bg-[#E84F35] hover:bg-[#d63d22] text-white text-xs uppercase font-black tracking-widest transition-all shadow-md cursor-pointer border-none font-bold"
                      >
                        PROCEED TO PAY
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ===== RIGHT PANEL: ORDER SUMMARY ===== */}
          <div className="lg:col-span-4 space-y-4 text-left">
            {/* Delivery Check (Step 2+) */}
            {checkoutFlowStep >= 2 && (
              <div className="bg-white border border-gray-100 rounded-2xl p-5 flex items-center justify-between">
                <span className="text-xs font-bold text-[#031838]">Delivery check</span>
                <span className="text-xs text-[#E84F35] font-semibold cursor-pointer">{deliveryForm.pincode || 'Enter pincode'}</span>
              </div>
            )}

            {/* Order Summary Card */}
            <div className="bg-white border border-gray-100 rounded-2xl p-5 space-y-4">
              <h3 className="text-sm font-bold text-[#031838] uppercase tracking-wider">Order Summary</h3>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)} Item{cartItems.reduce((a, c) => a + c.quantity, 0) !== 1 ? 's' : ''})</span>
                  <span className="font-bold text-[#031838]">₹ {cartTotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>GST</span>
                  <span className="font-bold text-[#031838]">₹ {Math.round(cartTotal * 0.03).toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-3 flex justify-between items-center">
                <span className="text-sm font-bold text-[#031838]">Total Payable</span>
                <span className="text-lg font-black text-[#031838]">₹ {(cartTotal + Math.round(cartTotal * 0.03)).toLocaleString('en-IN')}</span>
              </div>

              {/* Action Button */}
              {checkoutFlowStep === 1 && (
                <button
                  onClick={() => { if (cartItems.length > 0) setCheckoutFlowStep(2); }}
                  className="w-full py-3.5 rounded-lg bg-[#E84F35] hover:bg-[#d63d22] text-white text-xs uppercase font-black tracking-widest transition-all shadow-md cursor-pointer border-none font-bold"
                >
                  PLACE ORDER
                </button>
              )}
              {checkoutFlowStep === 2 && (
                <button
                  onClick={() => {
                    if (deliveryForm.email && deliveryForm.mobile && deliveryForm.recipientName && deliveryForm.pincode) {
                      setCheckoutForm({
                        ...checkoutForm,
                        name: deliveryForm.recipientName,
                        phone: deliveryForm.mobile,
                        address: deliveryType === 'store'
                          ? `Store Pickup: ${deliveryForm.storeBranch}`
                          : `${deliveryForm.apartment}, ${deliveryForm.street}, ${deliveryForm.locality}, ${deliveryForm.landmark || ''}, PIN: ${deliveryForm.pincode}`
                      });
                      setCheckoutFlowStep(3);
                    } else {
                      alert('Please fill in Email, Mobile, Recipient Name, and Pincode.');
                    }
                  }}
                  className="w-full py-3.5 rounded-lg bg-[#E84F35] hover:bg-[#d63d22] text-white text-xs uppercase font-black tracking-widest transition-all shadow-md cursor-pointer border-none font-bold"
                >
                  PROCEED TO PAYMENT
                </button>
              )}

              {/* Apply Voucher */}
              {checkoutFlowStep === 1 && (
                <p className="text-[11px] text-[#006361] font-semibold cursor-pointer">🏷️ Apply Voucher / Gift Card</p>
              )}

              <div className="border-t border-gray-100 pt-3">
                <p className="text-[11px] text-gray-400 leading-relaxed font-sans">
                  Any Questions?<br />
                  Please call us at <strong className="text-[#031838]">+91 97838 43978</strong> or <span className="text-[#006361] font-semibold cursor-pointer">Chat with us</span>
                </p>
              </div>
            </div>

            {/* Back Button */}
            {checkoutFlowStep > 1 && (
              <button
                onClick={() => setCheckoutFlowStep(checkoutFlowStep - 1)}
                className="w-full py-3 text-xs text-gray-500 font-bold uppercase tracking-widest border border-gray-200 rounded-xl hover:bg-gray-50 transition-all cursor-pointer focus:outline-none"
              >
                ← BACK
              </button>
            )}
          </div>

        </div>
      </div>

      {/* Trust Footer */}
      <div className="w-full bg-[#FAF8F6] border-t border-gray-200 pt-10 pb-6 px-6 sm:px-12 select-none">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#031838]">Bikaner's Heritage Store</span>
              <p className="text-[9px] text-gray-400 font-light">Established lineage since 1952</p>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#031838]">Trusted by Patrons</span>
              <p className="text-[9px] text-gray-400 font-light font-sans">Renowned for purity nationwide</p>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#031838]">Transparent Pricing</span>
              <p className="text-[9px] text-gray-400 font-light">Guaranteed weight &amp; value tracking</p>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#031838]">100% Certified Jewellery</span>
              <p className="text-[9px] text-gray-400 font-light">BIS Hallmarked</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-[10px] text-gray-400 font-bold uppercase tracking-wider font-sans select-none">
            <span className="bg-gray-200 text-gray-600 px-2 py-1 rounded text-[8px]">CASH</span>
            <span className="bg-[#1a1f71] text-white px-2 py-1 rounded text-[8px]">VISA</span>
            <span className="bg-[#eb001b] text-white px-2 py-1 rounded text-[8px]">MC</span>
            <span className="bg-[#006fcf] text-white px-2 py-1 rounded text-[8px]">AMEX</span>
            <span className="bg-[#097A44] text-white px-2 py-1 rounded text-[8px]">RuPay</span>
          </div>
        </div>
      </div>
    </div>
  );
}
