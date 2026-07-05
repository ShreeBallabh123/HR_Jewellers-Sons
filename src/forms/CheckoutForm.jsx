import React from 'react';

export default function CheckoutForm({
  deliveryForm,
  setDeliveryForm,
  deliveryType,
  setDeliveryType
}) {
  return (
    <div className="space-y-6 text-[#4A126D] font-sans">
      {/* Step 2 Form - Contact Details */}
      <div className="bg-white border border-solid border-gray-150 rounded-2xl p-6 sm:p-8 space-y-5">
        <div>
          <h2 className="text-lg font-bold text-[#031838]">Your Details</h2>
          <p className="text-xs text-gray-400 mt-1">Required to Save Cart and Send Order Updates</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="relative border border-solid border-gray-200 rounded-lg px-3 py-2.5 flex items-center gap-2">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4 text-gray-400 flex-shrink-0">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m2 7 10 6 10-6" />
            </svg>
            <div className="flex-1">
              <span className="text-[9px] uppercase tracking-wider text-gray-400 block text-left">Email address</span>
              <input 
                type="email" 
                required 
                placeholder="your@email.com" 
                value={deliveryForm.email} 
                onChange={(e) => setDeliveryForm({ ...deliveryForm, email: e.target.value })} 
                className="w-full bg-transparent border-none outline-none text-xs text-gray-800 font-semibold mt-0.5 focus:ring-0 focus:outline-none" 
              />
            </div>
          </div>

          <div className="relative border border-solid border-gray-200 rounded-lg px-3 py-2.5 flex items-center gap-2">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4 text-gray-400 flex-shrink-0">
              <rect x="5" y="2" width="14" height="20" rx="2" />
              <line x1="12" y1="18" x2="12" y2="18.01" />
            </svg>
            <div className="flex-1">
              <span className="text-[9px] uppercase tracking-wider text-gray-400 block text-left">Mobile number</span>
              <input 
                type="tel" 
                required 
                placeholder="+91 XXXXX XXXXX" 
                value={deliveryForm.mobile} 
                onChange={(e) => setDeliveryForm({ ...deliveryForm, mobile: e.target.value })} 
                className="w-full bg-transparent border-none outline-none text-xs text-gray-800 font-semibold mt-0.5 focus:ring-0 focus:outline-none" 
              />
            </div>
          </div>
        </div>

        <div className="relative border border-solid border-gray-200 rounded-lg px-3 py-2.5 flex items-center gap-2">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4 text-gray-400 flex-shrink-0">
            <rect x="5" y="2" width="14" height="20" rx="2" />
            <line x1="12" y1="18" x2="12" y2="18.01" />
          </svg>
          <div className="flex-1">
            <span className="text-[9px] uppercase tracking-wider text-gray-400 block text-left">WhatsApp Number (Optional)</span>
            <input 
              type="tel" 
              placeholder="+91" 
              value={deliveryForm.whatsapp} 
              onChange={(e) => setDeliveryForm({ ...deliveryForm, whatsapp: e.target.value })} 
              className="w-full bg-transparent border-none outline-none text-xs text-gray-800 font-semibold mt-0.5 focus:ring-0 focus:outline-none" 
            />
          </div>
        </div>
      </div>

      {/* Delivery Mode Selection */}
      <div className="bg-white border border-solid border-gray-150 rounded-2xl p-6 sm:p-8 space-y-4">
        <div>
          <h2 className="text-lg font-bold text-[#031838]">Delivery Type</h2>
          <p className="text-xs text-gray-400 mt-1">Please choose preferred type of delivery.</p>
        </div>

        <label className={`flex items-center justify-between border border-solid rounded-xl px-4 py-3.5 cursor-pointer transition-all ${deliveryType === 'home' ? 'border-[#006361] bg-[#006361]/5' : 'border-gray-200 hover:border-gray-300'}`}>
          <span className="text-xs font-semibold text-[#031838]">Home Delivery</span>
          <input 
            type="radio" 
            name="deliveryType" 
            value="home" 
            checked={deliveryType === 'home'} 
            onChange={() => setDeliveryType('home')} 
            className="accent-[#006361]" 
          />
        </label>

        <label className={`flex flex-col border border-solid rounded-xl px-4 py-3.5 cursor-pointer transition-all ${deliveryType === 'store' ? 'border-[#006361] bg-[#006361]/5' : 'border-gray-200 hover:border-gray-300'}`}>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-[#031838]">Pick up from store</span>
              <p className="text-[10px] text-gray-400 mt-0.5">Buy now, pick up from our store at your convenience.</p>
            </div>
            <input 
              type="radio" 
              name="deliveryType" 
              value="store" 
              checked={deliveryType === 'store'} 
              onChange={() => setDeliveryType('store')} 
              className="accent-[#006361]" 
            />
          </div>

          {deliveryType === 'store' && (
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-solid border-gray-100">
              <div className="relative border border-solid border-gray-200 rounded-lg px-3 py-2 text-left">
                <span className="text-[9px] uppercase tracking-wider text-gray-400 block">City</span>
                <select 
                  value={deliveryForm.storeCity} 
                  onChange={(e) => setDeliveryForm({ ...deliveryForm, storeCity: e.target.value })} 
                  className="w-full bg-transparent border-none outline-none text-xs text-gray-800 font-semibold mt-0.5 focus:ring-0 cursor-pointer"
                >
                  <option value="">—</option>
                  <option value="Bikaner">Bikaner</option>
                  <option value="Jaipur">Jaipur</option>
                  <option value="Jodhpur">Jodhpur</option>
                </select>
              </div>
              <div className="relative border border-solid border-gray-200 rounded-lg px-3 py-2 text-left">
                <span className="text-[9px] uppercase tracking-wider text-gray-400 block">Store</span>
                <select 
                  value={deliveryForm.storeBranch} 
                  onChange={(e) => setDeliveryForm({ ...deliveryForm, storeBranch: e.target.value })} 
                  className="w-full bg-transparent border-none outline-none text-xs text-gray-800 font-semibold mt-0.5 focus:ring-0 cursor-pointer"
                >
                  <option value="">—</option>
                  <option value="Tilak Nagar Branch, Bikaner">Tilak Nagar Branch, Bikaner</option>
                  <option value="JNV Branch, Bikaner">JNV Branch, Bikaner</option>
                </select>
              </div>
              {deliveryForm.storeBranch && (
                <div className="sm:col-span-2 relative border border-solid border-gray-200 rounded-lg px-3 py-2 text-left">
                  <span className="text-[9px] uppercase tracking-wider text-gray-400 block">Store Address</span>
                  <p className="text-xs text-gray-750 font-semibold mt-0.5">{deliveryForm.storeBranch}</p>
                </div>
              )}
            </div>
          )}
        </label>
      </div>

      {/* Recipient Details & Addresses */}
      <div className="bg-white border border-solid border-gray-150 rounded-2xl p-6 sm:p-8 space-y-4">
        <div>
          <h2 className="text-lg font-bold text-[#031838]">Delivery Details</h2>
          <p className="text-xs text-gray-400 mt-1">We will deliver the order at the below address</p>
        </div>

        <div className="relative border border-solid border-gray-200 rounded-lg px-3 py-2.5 flex items-center gap-2">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4 text-gray-400 flex-shrink-0">
            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          <input 
            type="text" 
            required 
            placeholder="Recipient's Name" 
            value={deliveryForm.recipientName} 
            onChange={(e) => setDeliveryForm({ ...deliveryForm, recipientName: e.target.value })} 
            className="w-full bg-transparent border-none outline-none text-xs text-gray-800 font-semibold focus:ring-0 focus:outline-none" 
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="relative border border-solid border-gray-200 rounded-lg px-3 py-2.5 flex items-center gap-2">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4 text-gray-400 flex-shrink-0">
              <rect x="5" y="2" width="14" height="20" rx="2" />
              <line x1="12" y1="18" x2="12" y2="18.01" />
            </svg>
            <div className="flex-1">
              <span className="text-[9px] uppercase tracking-wider text-gray-400 block text-left">Recipient's mobile (optional)</span>
              <input 
                type="tel" 
                placeholder="+91" 
                value={deliveryForm.recipientMobile} 
                onChange={(e) => setDeliveryForm({ ...deliveryForm, recipientMobile: e.target.value })} 
                className="w-full bg-transparent border-none outline-none text-xs text-gray-800 font-semibold mt-0.5 focus:ring-0 focus:outline-none" 
              />
            </div>
          </div>
          <div className="relative border border-solid border-gray-200 rounded-lg px-3 py-2.5 text-left">
            <span className="text-[9px] uppercase tracking-wider text-gray-400 block">Enter Valid Pincode</span>
            <input 
              type="text" 
              required 
              placeholder="e.g. 334001" 
              maxLength="6" 
              value={deliveryForm.pincode} 
              onChange={(e) => setDeliveryForm({ ...deliveryForm, pincode: e.target.value })} 
              className="w-full bg-transparent border-none outline-none text-xs text-gray-800 font-semibold mt-0.5 focus:ring-0 focus:outline-none" 
            />
          </div>
        </div>

        {deliveryType === 'home' && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="relative border border-solid border-gray-200 rounded-lg px-3 py-2.5">
                <input 
                  type="text" 
                  required 
                  placeholder="Enter complete Apartment/House/Flat No." 
                  value={deliveryForm.apartment} 
                  onChange={(e) => setDeliveryForm({ ...deliveryForm, apartment: e.target.value })} 
                  className="w-full bg-transparent border-none outline-none text-xs text-gray-800 font-semibold focus:ring-0 focus:outline-none" 
                />
              </div>
              <div className="relative border border-solid border-gray-200 rounded-lg px-3 py-2.5">
                <input 
                  type="text" 
                  required 
                  placeholder="Enter Street / Sector / Colony Name" 
                  value={deliveryForm.street} 
                  onChange={(e) => setDeliveryForm({ ...deliveryForm, street: e.target.value })} 
                  className="w-full bg-transparent border-none outline-none text-xs text-gray-800 font-semibold focus:ring-0 focus:outline-none" 
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="relative border border-solid border-gray-200 rounded-lg px-3 py-2.5">
                <input 
                  type="text" 
                  placeholder="Landmark (Optional)" 
                  value={deliveryForm.landmark} 
                  onChange={(e) => setDeliveryForm({ ...deliveryForm, landmark: e.target.value })} 
                  className="w-full bg-transparent border-none outline-none text-xs text-gray-800 font-semibold focus:ring-0 focus:outline-none" 
                />
              </div>
              <div className="relative border border-solid border-gray-200 rounded-lg px-3 py-2.5">
                <input 
                  type="text" 
                  required 
                  placeholder="Town / City" 
                  value={deliveryForm.city} 
                  onChange={(e) => setDeliveryForm({ ...deliveryForm, city: e.target.value })} 
                  className="w-full bg-transparent border-none outline-none text-xs text-gray-800 font-semibold focus:ring-0 focus:outline-none" 
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
