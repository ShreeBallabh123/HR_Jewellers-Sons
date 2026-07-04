import React, { useState } from 'react';
import { db } from '../../firebase';
import { bookingApi } from '../../api/booking.api';
import { 
  Trash2, 
  Eye, 
  Calendar, 
  Clock, 
  ShoppingBag, 
  BadgeIndianRupee,
  Gem 
} from 'lucide-react';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';

const safeFormatDateTime = (dt) => {
  if (!dt) return '';
  try {
    if (typeof dt.toDate === 'function') {
      return dt.toDate().toLocaleString('en-IN');
    }
    if (dt.seconds !== undefined) {
      return new Date(dt.seconds * 1000).toLocaleString('en-IN');
    }
    const d = new Date(dt);
    if (!isNaN(d.getTime())) {
      return d.toLocaleString('en-IN');
    }
  } catch (e) {
    console.error(e);
  }
  return '';
};

export default function AdminOrders({
  orders = [],
  consultations = [],
  savingsEnrollments = [],
  setAdminNotification
}) {
  const [activeSubTab, setActiveSubTab] = useState('orders'); // 'orders', 'consultations', 'schemes'
  const [orderSearch, setOrderSearch] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState('all');

  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);

  // Update order status callback
  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      await bookingApi.updateOrderStatus(orderId, newStatus);
      setAdminNotification({ message: `Order status set to: ${newStatus}`, type: 'success' });
    } catch (err) {
      console.error(err);
      setAdminNotification({ message: 'Failed to update order status.', type: 'error' });
    }
  };

  // Delete an order
  const handleDeleteOrder = async (orderId) => {
    if (window.confirm("Are you sure you want to remove this order registration?")) {
      try {
        await deleteDoc(doc(db, 'orders', orderId));
        setAdminNotification({ message: 'Order removed.', type: 'success' });
      } catch (err) {
        console.error(err);
        setAdminNotification({ message: 'Failed to remove order.', type: 'error' });
      }
    }
  };

  // Delete a consultation
  const handleDeleteConsultation = async (id) => {
    if (window.confirm("Are you sure you want to cancel this consultation booking?")) {
      try {
        await deleteDoc(doc(db, 'consultations', id));
        setAdminNotification({ message: 'Consultation booking deleted.', type: 'success' });
      } catch (err) {
        console.error(err);
        setAdminNotification({ message: 'Failed to delete consultation.', type: 'error' });
      }
    }
  };

  // Delete a scheme enrollment
  const handleDeleteScheme = async (id) => {
    if (window.confirm("Delete this scheme enrollment record?")) {
      try {
        await deleteDoc(doc(db, 'savings_enrollments', id));
        setAdminNotification({ message: 'Scheme record deleted.', type: 'success' });
      } catch (err) {
        console.error(err);
        setAdminNotification({ message: 'Failed to delete scheme.', type: 'error' });
      }
    }
  };

  // Filters for checkout orders
  const filteredOrders = orders
    .filter(o => orderStatusFilter === 'all' || o.orderStatus === orderStatusFilter)
    .filter(o => 
      o.recipientName?.toLowerCase().includes(orderSearch.toLowerCase()) || 
      o.mobile?.includes(orderSearch) ||
      o.id?.includes(orderSearch)
    );

  return (
    <div className="w-full max-w-full overflow-x-hidden text-[#1A1A1A] dark:text-zinc-100 font-sans text-left space-y-4">
      
      {/* Sub Tabs Controls — scrollable horizontally, doesn't expand parent */}
      <div className="-mx-3 sm:mx-0">
        <div className="flex border-b border-solid border-zinc-200 dark:border-zinc-800 gap-4 sm:gap-6 select-none font-bold uppercase tracking-wider text-[10px] sm:text-[11px] mb-4 overflow-x-auto whitespace-nowrap px-3 sm:px-0 scrollbar-none">
          {[
            { id: 'orders', label: 'Bespoke Orders', icon: ShoppingBag },
            { id: 'consultations', label: 'Video Consultations', icon: Calendar },
            { id: 'custom_designs', label: 'Custom Designs', icon: Gem },
            { id: 'schemes', label: 'Savings Scheme (11+1)', icon: BadgeIndianRupee }
          ].map(sub => {
            const Icon = sub.icon;
            const isActive = activeSubTab === sub.id;
            return (
              <button
                key={sub.id}
                onClick={() => setActiveSubTab(sub.id)}
                className={`py-3 border-b-2 border-solid flex items-center gap-1.5 cursor-pointer bg-transparent border-none shrink-0 ${
                  isActive
                    ? 'border-[#C8A646] text-[#C8A646] font-extrabold'
                    : 'border-transparent text-zinc-400 hover:text-zinc-650 dark:hover:text-zinc-300'
                }`}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span>{sub.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* RENDER ACTIVE SUB TAB */}
      
      {activeSubTab === 'orders' && (
        <div className="bg-white dark:bg-[#15151A] border border-solid border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 sm:p-8 space-y-5 shadow-xs w-full overflow-hidden">
          {/* Header Search Filter */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 border-b border-solid border-zinc-100 dark:border-zinc-850 pb-4">
            <div>
              <h3 className="text-base font-black tracking-wider text-zinc-900 dark:text-[#E6C687] uppercase">Secure Orders Ledger</h3>
              <p className="text-[10px] text-zinc-400 dark:text-zinc-500 font-medium mt-0.5">Manage customer deliveries, track dispatch updates and mark status changes.</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <select
                value={orderStatusFilter}
                onChange={(e) => setOrderStatusFilter(e.target.value)}
                className="bg-white dark:bg-zinc-905 border border-solid border-zinc-200 dark:border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-650 dark:text-zinc-350 focus:outline-none cursor-pointer w-full font-sans font-bold"
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <input
                type="text"
                placeholder="Search Buyer or ID..."
                value={orderSearch}
                onChange={(e) => setOrderSearch(e.target.value)}
                className="bg-white dark:bg-zinc-905 border border-solid border-zinc-200 dark:border-zinc-800 rounded-lg px-3.5 py-2 text-xs w-full text-zinc-850 dark:text-zinc-150 placeholder-zinc-450 focus:outline-none font-semibold"
              />
            </div>
          </div>

          {/* MOBILE CARD VIEW (< md) */}
          <div className="block md:hidden space-y-3">
            {filteredOrders.length === 0 ? (
              <p className="py-10 text-center text-zinc-450 uppercase tracking-wider font-bold text-xs">No registered orders found</p>
            ) : (
              filteredOrders.map(order => (
                <div key={order.id} className="bg-zinc-50 dark:bg-zinc-900/50 border border-solid border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 space-y-3">
                  {/* Top row: name + status badge */}
                  <div className="flex justify-between items-start gap-2">
                    <div className="min-w-0">
                      <span className="font-bold text-zinc-900 dark:text-zinc-100 block text-sm truncate">{order.recipientName || 'Anonymous Buyer'}</span>
                      <span className="text-[10px] text-zinc-450 font-mono block">{order.mobile}</span>
                    </div>
                    <select
                      value={order.orderStatus || 'pending'}
                      onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                      className={`shrink-0 bg-white dark:bg-zinc-900 border border-solid border-zinc-200 dark:border-zinc-800 rounded-lg px-2 py-1 text-[9px] font-extrabold uppercase tracking-wider cursor-pointer focus:outline-none ${
                        order.orderStatus === 'delivered'
                          ? 'text-emerald-600'
                          : order.orderStatus === 'pending'
                          ? 'text-amber-500'
                          : 'text-zinc-500'
                      }`}
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>

                  {/* Meta row */}
                  <div className="grid grid-cols-2 gap-2 text-[10px]">
                    <div>
                      <span className="text-zinc-400 font-bold uppercase tracking-wider block">Amount</span>
                      <span className="font-bold text-zinc-850 dark:text-zinc-200 font-sans">₹{(order.total || order.totalAmount || 0).toLocaleString('en-IN')}</span>
                    </div>
                    <div>
                      <span className="text-zinc-400 font-bold uppercase tracking-wider block">Delivery</span>
                      <span className="font-semibold capitalize text-zinc-600 dark:text-zinc-400">{order.deliveryType || 'Home'}</span>
                    </div>
                    <div>
                      <span className="text-zinc-400 font-bold uppercase tracking-wider block">Order ID</span>
                      <span className="font-mono text-zinc-400">{order.id?.slice(0, 10)}…</span>
                    </div>
                    <div className="min-w-0 overflow-hidden">
                      <span className="text-zinc-400 font-bold uppercase tracking-wider block">Date</span>
                      <span className="text-zinc-500 block truncate">{safeFormatDateTime(order.createdDate || order.date)}</span>
                    </div>
                  </div>

                  {/* Items */}
                  {order.items?.length > 0 && (
                    <div className="text-[10px] text-zinc-500 truncate border-t border-solid border-zinc-100 dark:border-zinc-800 pt-2">
                      {order.items.map(i => `${i.name} ×${i.quantity}`).join(', ')}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-2 pt-1">
                    <button
                      onClick={() => setSelectedOrderDetails(order)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-650 dark:text-zinc-350 cursor-pointer border-none text-[10px] font-bold uppercase tracking-wider"
                    >
                      <Eye className="w-3.5 h-3.5" /> View Details
                    </button>
                    <button
                      onClick={() => handleDeleteOrder(order.id)}
                      className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 cursor-pointer border-none text-[10px] font-bold uppercase tracking-wider"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* DESKTOP TABLE VIEW (≥ md) */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-solid border-zinc-100 dark:border-zinc-800 text-[10px] uppercase font-bold tracking-wider text-zinc-400">
                  <th className="py-2.5">Date</th>
                  <th className="py-2.5">Order ID</th>
                  <th className="py-2.5">Recipient Details</th>
                  <th className="py-2.5">Items</th>
                  <th className="py-2.5">Total Amount</th>
                  <th className="py-2.5">Delivery Mode</th>
                  <th className="py-2.5 text-center">Status</th>
                  <th className="py-2.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-solid divide-zinc-100 dark:divide-zinc-850">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="py-12 text-center text-zinc-450 uppercase tracking-wider font-bold">No registered orders found</td>
                  </tr>
                ) : (
                  filteredOrders.map(order => (
                    <tr key={order.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30">
                      <td className="py-3.5 whitespace-nowrap text-zinc-400 font-mono text-[10px]">
                        {safeFormatDateTime(order.createdDate || order.date)}
                      </td>
                      <td className="py-3.5 font-mono text-[10px] text-zinc-400">
                        {order.id?.slice(0, 8)}...
                      </td>
                      <td className="py-3.5">
                        <span className="font-bold text-zinc-900 dark:text-zinc-100 block">{order.recipientName || 'Anonymous Buyer'}</span>
                        <span className="text-[10px] text-zinc-450 block">{order.mobile}</span>
                      </td>
                      <td className="py-3.5 text-zinc-500 max-w-[150px] truncate" title={order.items?.map(i => `${i.name} x${i.quantity}`).join(', ')}>
                        {order.items?.map(i => `${i.name} x${i.quantity}`).join(', ')}
                      </td>
                      <td className="py-3.5 font-bold font-sans text-zinc-850 dark:text-zinc-200">
                        ₹{(order.total || order.totalAmount || 0).toLocaleString('en-IN')}
                      </td>
                      <td className="py-3.5 capitalize font-semibold">
                        {order.deliveryType || 'home'}
                      </td>
                      <td className="py-3.5 text-center">
                        <select
                          value={order.orderStatus || 'pending'}
                          onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                          className={`bg-white dark:bg-zinc-900 border border-solid border-zinc-200 dark:border-zinc-800 rounded px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-wider cursor-pointer focus:outline-none ${
                            order.orderStatus === 'delivered'
                              ? 'text-emerald-600'
                              : order.orderStatus === 'pending'
                              ? 'text-amber-500'
                              : 'text-zinc-500'
                          }`}
                        >
                          <option value="pending">Pending</option>
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="py-3.5 text-right space-x-2">
                        <button
                          onClick={() => setSelectedOrderDetails(order)}
                          className="p-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-650 dark:text-zinc-350 cursor-pointer border-none"
                          title="View order address details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteOrder(order.id)}
                          className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-650 dark:text-red-400 cursor-pointer border-none"
                          title="Delete order"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeSubTab === 'consultations' && (
        <div className="bg-white dark:bg-[#15151A] border border-solid border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 sm:p-8 space-y-5 shadow-xs w-full overflow-hidden">
          <div className="border-b border-solid border-zinc-100 dark:border-zinc-850 pb-4">
            <h3 className="text-base font-black tracking-wider text-zinc-900 dark:text-[#E6C687] uppercase">Showroom lounge bookings</h3>
            <p className="text-[10px] text-zinc-400 dark:text-zinc-500 font-medium mt-0.5">Track video consultations slots and appointment requests.</p>
          </div>

          {/* MOBILE CARDS */}
          <div className="block md:hidden space-y-3">
            {(() => {
              const onlyConsults = consultations.filter(c => c.type !== 'custom_design');
              if (onlyConsults.length === 0) return <p className="py-10 text-center text-zinc-450 uppercase tracking-wider font-bold text-xs">No consultations booked</p>;
              return onlyConsults.map(c => (
                <div key={c.id} className="bg-zinc-50 dark:bg-zinc-900/50 border border-solid border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 space-y-3">
                  <div className="flex justify-between items-start gap-2">
                    <div className="min-w-0">
                      <span className="font-bold text-zinc-900 dark:text-zinc-100 block text-sm">{c.name}</span>
                      <span className="text-[10px] text-zinc-450 font-mono block">{c.phone}</span>
                    </div>
                    <span className="shrink-0 px-2 py-1 rounded-lg bg-[#C8A646]/10 text-[#C8A646] text-[9px] font-extrabold uppercase tracking-wider">
                      {c.preferredType || 'Gold Jewellery'}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[10px]">
                    <div>
                      <span className="text-zinc-400 font-bold uppercase tracking-wider block">Date</span>
                      <span className="text-zinc-600 dark:text-zinc-400">{c.date || safeFormatDateTime(c.createdDate)}</span>
                    </div>
                    <div>
                      <span className="text-zinc-400 font-bold uppercase tracking-wider block">Time Slot</span>
                      <span className="text-zinc-600 dark:text-zinc-400">{c.timeSlot || 'Anytime'}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteConsultation(c.id)}
                    className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 cursor-pointer border-none text-[10px] font-bold uppercase tracking-wider"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Delete Booking
                  </button>
                </div>
              ));
            })()}
          </div>

          {/* DESKTOP TABLE */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-solid border-zinc-100 dark:border-zinc-800 text-[10px] uppercase font-bold tracking-wider text-zinc-400">
                  <th className="py-2.5">Request date</th>
                  <th className="py-2.5">Visitor</th>
                  <th className="py-2.5">Contact</th>
                  <th className="py-2.5">Collection Preference</th>
                  <th className="py-2.5">Preferred Slot</th>
                  <th className="py-2.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-solid divide-zinc-100 dark:divide-zinc-850">
                {(() => {
                  const onlyConsults = consultations.filter(c => c.type !== 'custom_design');
                  if (onlyConsults.length === 0) {
                    return (
                      <tr>
                        <td colSpan="6" className="py-12 text-center text-zinc-450 uppercase tracking-wider font-bold">No consultations booked</td>
                      </tr>
                    );
                  }
                  return onlyConsults.map(c => (
                    <tr key={c.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30">
                      <td className="py-3.5 whitespace-nowrap text-zinc-450 font-mono text-[10px]">
                        {c.date || safeFormatDateTime(c.createdDate)}
                      </td>
                      <td className="py-3.5 font-bold text-zinc-900 dark:text-zinc-100">{c.name}</td>
                      <td className="py-3.5 font-mono">{c.phone}</td>
                      <td className="py-3.5 font-bold text-gold uppercase text-[9px] tracking-wider">{c.preferredType || 'Gold Jewellery'}</td>
                      <td className="py-3.5 text-zinc-500" title={c.timeSlot}>
                        {c.timeSlot || 'Anytime'}
                      </td>
                      <td className="py-3.5 text-right">
                        <button
                          onClick={() => handleDeleteConsultation(c.id)}
                          className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-650 dark:text-red-400 cursor-pointer border-none"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ));
                })()}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeSubTab === 'custom_designs' && (
        <div className="bg-white dark:bg-[#15151A] border border-solid border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 sm:p-8 space-y-5 shadow-xs w-full overflow-hidden">
          <div className="border-b border-solid border-zinc-100 dark:border-zinc-850 pb-4">
            <h3 className="text-base font-black tracking-wider text-zinc-900 dark:text-[#E6C687] uppercase">Custom Design Requests</h3>
            <p className="text-[10px] text-zinc-400 dark:text-zinc-500 font-medium mt-0.5">Track bespoke jewellery sketches and custom style curation submissions.</p>
          </div>

          {/* MOBILE CARDS */}
          <div className="block md:hidden space-y-3">
            {(() => {
              const onlyCustomDesigns = consultations.filter(c => c.type === 'custom_design');
              if (onlyCustomDesigns.length === 0) return <p className="py-10 text-center text-zinc-450 uppercase tracking-wider font-bold text-xs">No custom designs requested</p>;
              return onlyCustomDesigns.map(c => (
                <div key={c.id} className="bg-zinc-50 dark:bg-zinc-900/50 border border-solid border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 space-y-3">
                  <div className="flex justify-between items-start gap-2">
                    <div className="min-w-0">
                      <span className="font-bold text-zinc-900 dark:text-zinc-100 block text-sm">{c.name}</span>
                      <span className="text-[10px] text-zinc-450 font-mono block">{c.phone}</span>
                    </div>
                    <span className="text-[9px] text-zinc-400 font-mono shrink-0">{safeFormatDateTime(c.createdDate)}</span>
                  </div>
                  {c.description && (
                    <p className="text-[10px] text-zinc-500 leading-relaxed border-t border-solid border-zinc-100 dark:border-zinc-800 pt-2">{c.description}</p>
                  )}
                  {c.imageUrl && (
                    <a href={c.imageUrl} target="_blank" rel="noopener noreferrer" className="block text-[10px] font-bold text-[#C8A646] hover:underline">
                      🖼 View Sketch / Image
                    </a>
                  )}
                  <button
                    onClick={() => handleDeleteConsultation(c.id)}
                    className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 cursor-pointer border-none text-[10px] font-bold uppercase tracking-wider"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Delete Request
                  </button>
                </div>
              ));
            })()}
          </div>

          {/* DESKTOP TABLE */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-solid border-zinc-100 dark:border-zinc-800 text-[10px] uppercase font-bold tracking-wider text-zinc-400">
                  <th className="py-2.5">Request date</th>
                  <th className="py-2.5">Visitor</th>
                  <th className="py-2.5">Contact</th>
                  <th className="py-2.5">Bespoke Details</th>
                  <th className="py-2.5">Image / Sketch Reference</th>
                  <th className="py-2.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-solid divide-zinc-100 dark:divide-zinc-850">
                {(() => {
                  const onlyCustomDesigns = consultations.filter(c => c.type === 'custom_design');
                  if (onlyCustomDesigns.length === 0) {
                    return (
                      <tr>
                        <td colSpan="6" className="py-12 text-center text-zinc-455 uppercase tracking-wider font-bold">No custom designs requested</td>
                      </tr>
                    );
                  }
                  return onlyCustomDesigns.map(c => (
                    <tr key={c.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30">
                      <td className="py-3.5 whitespace-nowrap text-zinc-450 font-mono text-[10px]">
                        {safeFormatDateTime(c.createdDate)}
                      </td>
                      <td className="py-3.5 font-bold text-zinc-900 dark:text-zinc-100">{c.name}</td>
                      <td className="py-3.5 font-mono">{c.phone}</td>
                      <td className="py-3.5 text-zinc-500 max-w-xs truncate" title={c.description}>
                        {c.description || '-'}
                      </td>
                      <td className="py-3.5">
                        {c.imageUrl ? (
                          <a href={c.imageUrl} target="_blank" rel="noopener noreferrer" className="text-[#C8A646] font-bold hover:underline block max-w-[150px] truncate">
                            View image sketch
                          </a>
                        ) : (
                          <span className="text-zinc-400">-</span>
                        )}
                      </td>
                      <td className="py-3.5 text-right">
                        <button
                          onClick={() => handleDeleteConsultation(c.id)}
                          className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-650 dark:text-red-400 cursor-pointer border-none"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ));
                })()}
              </tbody>
            </table>
          </div>
        </div>
      )}


      {activeSubTab === 'schemes' && (
        <div className="bg-white dark:bg-[#15151A] border border-solid border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 sm:p-8 space-y-5 shadow-xs w-full overflow-hidden">
          <div className="border-b border-solid border-zinc-100 dark:border-zinc-850 pb-4">
            <h3 className="text-base font-black tracking-wider text-zinc-900 dark:text-[#E6C687] uppercase">Gold scheme enrollments</h3>
            <p className="text-[10px] text-zinc-400 dark:text-zinc-500 font-medium mt-0.5">Gold Mine 11+1 Installments scheme enrollee directory list.</p>
          </div>

          {/* MOBILE CARDS */}
          <div className="block md:hidden space-y-3">
            {savingsEnrollments.length === 0 ? (
              <p className="py-10 text-center text-zinc-450 uppercase tracking-wider font-bold text-xs">No members enrolled</p>
            ) : (
              savingsEnrollments.map(s => (
                <div key={s.id} className="bg-zinc-50 dark:bg-zinc-900/50 border border-solid border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 space-y-3">
                  <div className="flex justify-between items-start gap-2">
                    <div className="min-w-0">
                      <span className="font-bold text-zinc-900 dark:text-zinc-100 block text-sm">{s.fullName}</span>
                      <span className="text-[10px] text-zinc-450 font-mono block">{s.mobileNumber}</span>
                    </div>
                    <span className="shrink-0 px-2 py-1 rounded-lg bg-amber-50 text-amber-600 text-[9px] font-extrabold uppercase tracking-wider border border-solid border-amber-200">11+1 Scheme</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[10px]">
                    <div>
                      <span className="text-zinc-400 font-bold uppercase tracking-wider block">Monthly Amount</span>
                      <span className="font-bold text-zinc-850 dark:text-zinc-200 font-sans">₹{(s.monthlyInstallment || 0).toLocaleString('en-IN')}</span>
                    </div>
                    <div>
                      <span className="text-zinc-400 font-bold uppercase tracking-wider block">Nominee</span>
                      <span className="text-zinc-600 dark:text-zinc-400">{s.nomineeName || '—'}</span>
                    </div>
                    {s.emailAddress && (
                      <div className="col-span-2">
                        <span className="text-zinc-400 font-bold uppercase tracking-wider block">Email</span>
                        <span className="text-zinc-600 dark:text-zinc-400 truncate block">{s.emailAddress}</span>
                      </div>
                    )}
                    <div className="col-span-2">
                      <span className="text-zinc-400 font-bold uppercase tracking-wider block">Enrolled On</span>
                      <span className="text-zinc-600 dark:text-zinc-400">{safeFormatDateTime(s.createdDate)}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteScheme(s.id)}
                    className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 cursor-pointer border-none text-[10px] font-bold uppercase tracking-wider"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Remove Enrollment
                  </button>
                </div>
              ))
            )}
          </div>

          {/* DESKTOP TABLE */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-solid border-zinc-100 dark:border-zinc-800 text-[10px] uppercase font-bold tracking-wider text-zinc-400">
                  <th className="py-2.5">Enroll date</th>
                  <th className="py-2.5">Member</th>
                  <th className="py-2.5">Contact details</th>
                  <th className="py-2.5">Nominee</th>
                  <th className="py-2.5">Installment Amount</th>
                  <th className="py-2.5">Term period</th>
                  <th className="py-2.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-solid divide-zinc-100 dark:divide-zinc-850">
                {savingsEnrollments.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="py-12 text-center text-zinc-455 uppercase tracking-wider font-bold">No members enrolled</td>
                  </tr>
                ) : (
                  savingsEnrollments.map(s => (
                    <tr key={s.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30">
                      <td className="py-3.5 whitespace-nowrap text-zinc-400 font-mono text-[10px]">
                        {safeFormatDateTime(s.createdDate)}
                      </td>
                      <td className="py-3.5 font-bold text-zinc-900 dark:text-zinc-100">
                        {s.fullName}
                      </td>
                      <td className="py-3.5">
                        <span className="block font-bold">{s.mobileNumber}</span>
                        <span className="text-[9.5px] text-zinc-400 block">{s.emailAddress}</span>
                      </td>
                      <td className="py-3.5">{s.nomineeName || '-'}</td>
                      <td className="py-3.5 font-bold text-zinc-850 dark:text-zinc-200 font-sans">
                        ₹{(s.monthlyInstallment || 0).toLocaleString('en-IN')}
                      </td>
                      <td className="py-3.5">11+1 Months</td>
                      <td className="py-3.5 text-right">
                        <button
                          onClick={() => handleDeleteScheme(s.id)}
                          className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-650 dark:text-red-400 cursor-pointer border-none"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* DETAIL MODAL OVERLAYS FOR ORDER ADDRESS */}
      {selectedOrderDetails && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-md" onClick={() => setSelectedOrderDetails(null)}></div>
          <div className="relative bg-white dark:bg-zinc-950 border border-solid border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 w-full max-w-xl text-left select-none text-[#4A126D] dark:text-zinc-100 z-50">
            <h3 className="serif-luxury text-lg font-bold border-b border-solid border-zinc-100 dark:border-zinc-850 pb-3 mb-4 uppercase">
              Secure Delivery Details
            </h3>
            
            <div className="space-y-4 text-xs font-semibold">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-zinc-400 block">Recipient</span>
                  <span className="text-sm font-bold text-zinc-850 dark:text-zinc-205">{selectedOrderDetails.recipientName}</span>
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-zinc-400 block">Contact mobile</span>
                  <span className="text-sm font-bold text-zinc-850 dark:text-zinc-205">{selectedOrderDetails.recipientMobile || selectedOrderDetails.mobile}</span>
                </div>
              </div>

              {selectedOrderDetails.deliveryType === 'store' ? (
                <div className="bg-zinc-50 dark:bg-zinc-900/60 p-4 rounded-xl border border-solid border-zinc-200 dark:border-zinc-800">
                  <span className="text-[9px] uppercase tracking-wider text-[#C8A646] font-bold block mb-1">Pick up showroom selected</span>
                  <p className="font-bold text-zinc-800 dark:text-zinc-200">{selectedOrderDetails.storeBranch}</p>
                  <p className="text-[10px] text-zinc-400 mt-1">Location: {selectedOrderDetails.storeCity}</p>
                </div>
              ) : (
                <div className="space-y-3.5">
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-zinc-400 block">Delivery Address</span>
                    <p className="text-zinc-800 dark:text-zinc-200 mt-1 leading-relaxed">
                      Flat/Colony: {selectedOrderDetails.apartment}, {selectedOrderDetails.street}<br />
                      Landmark: {selectedOrderDetails.landmark || 'none'}<br />
                      City: {selectedOrderDetails.city} - {selectedOrderDetails.pincode}
                    </p>
                  </div>
                </div>
              )}

              {/* Items checklist detail */}
              <div>
                <span className="text-[9px] uppercase tracking-wider text-zinc-400 block mb-2">Order Items summary</span>
                <div className="space-y-2 border-t border-solid border-zinc-100 dark:border-zinc-850 pt-2.5 max-h-36 overflow-y-auto pr-1">
                  {selectedOrderDetails.items?.map((it, idx) => (
                    <div key={idx} className="flex justify-between items-center text-[11px]">
                      <span>{it.name} <strong className="text-zinc-400">x{it.quantity}</strong></span>
                      <span className="font-bold font-sans">₹{(it.price * it.quantity).toLocaleString('en-IN')}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedOrderDetails(null)}
                className="px-5 py-2.5 rounded-xl bg-zinc-950 hover:bg-zinc-850 dark:bg-zinc-100 dark:hover:bg-zinc-200 text-white dark:text-zinc-955 text-[10px] uppercase font-bold tracking-widest cursor-pointer border-none font-bold text-center"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
