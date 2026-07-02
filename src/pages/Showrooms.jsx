import React from 'react';

export default function Showrooms({
  categories,
  loungeSuccess,
  consultationPassCode,
  consultationForm,
  setConsultationForm,
  handleLoungeBookingSubmit
}) {
  return (
    <div className="transition-colors duration-500 min-h-screen pb-8 bg-[#FCFAFF] text-[#4A126D]">
      <div className="max-w-4xl mx-auto px-6 pt-12 space-y-12 animate-slide-up text-center">

        {/* Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center space-x-2 bg-[#F3EEF5] border border-purple-200 px-4 py-1.5 rounded-full mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4A126D] animate-pulse"></span>
            <span className="text-[9px] uppercase tracking-[0.25em] text-[#4A126D] font-bold">
              FLAGSHIP FITTING LOUNGE
            </span>
          </div>
          <h1 className="serif-luxury text-4xl sm:text-5xl font-semibold text-[#4A126D] leading-tight">
            Private Showroom Suite Appointments
          </h1>
          <div className="w-12 h-[1px] bg-[#DDA0DD] mx-auto mt-2"></div>
        </div>

        {/* Split contact forms */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch text-left">

          {/* Showroom metadata */}
          <div className="bg-white border border-gray-100 rounded-3xl p-8 space-y-6 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="serif-luxury text-xl text-[#4A126D] font-bold mb-4">Flagship Bikaner Showroom</h3>
              <div className="space-y-4 text-xs font-light text-gray-600 leading-relaxed">
                <p>📍 <strong>Showroom Address:</strong> 4-D-37, Near Murti Circle, J.N.V. Colony, Bikaner, Rajasthan (334001)</p>
                <p>📞 <strong>Direct Showroom Phone:</strong> +91 97838 43978</p>
                <p>✉️ <strong>Electronic Support:</strong> notifications@hrjewellers.com</p>
                <p>⏰ <strong>Visiting Hours:</strong> Monday - Sunday (11:00 AM - 08:30 PM)</p>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-6 space-y-2 text-xs font-bold text-gray-800">
              <p>✓ Secured private lounge suite key</p>
              <p>✓ Personal master goldsmith adviser</p>
              <p>✓ In-hand preview of complete catalog</p>
            </div>
          </div>

          {/* Consultation Booking form */}
          <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm space-y-4">
            <h3 className="serif-luxury text-lg text-[#4A126D] font-bold">Book Advisory Fitting Suite</h3>

            {loungeSuccess ? (
              <div className="bg-[#006361]/10 border border-[#006361]/20 p-6 rounded-2xl text-center space-y-4 animate-fade-in">
                <h4 className="serif-luxury text-xl font-bold text-[#006361]">Appointment Suite Confirmed!</h4>
                <p className="text-xs text-gray-600">Your private booking pass <strong>{consultationPassCode}</strong> has been logged and sent to our showroom masters.</p>
                <div className="bg-white border border-gray-100 rounded-xl p-3 inline-block font-mono text-sm text-[#006361] font-bold">
                  {consultationPassCode}
                </div>
              </div>
            ) : (
              <form onSubmit={handleLoungeBookingSubmit} className="space-y-4">
                <div>
                  <label htmlFor="lounge-name" className="text-[9px] uppercase tracking-wider text-[#4A126D]/75 font-bold block mb-1">Patron Name</label>
                  <input
                    id="lounge-name"
                    type="text"
                    required
                    placeholder="e.g. Suryaveer Singh"
                    value={consultationForm.name}
                    onChange={(e) => setConsultationForm({ ...consultationForm, name: e.target.value })}
                    className="w-full bg-[#FBF9FF] border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#4A126D] focus:ring-1 focus:ring-[#4A126D]/20 transition-all"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="lounge-phone" className="text-[9px] uppercase tracking-wider text-[#4A126D]/75 font-bold block mb-1">WhatsApp Phone</label>
                    <input
                      id="lounge-phone"
                      type="tel"
                      required
                      placeholder="e.g. 9783843978"
                      value={consultationForm.phone}
                      onChange={(e) => setConsultationForm({ ...consultationForm, phone: e.target.value })}
                      className="w-full bg-[#FBF9FF] border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#4A126D] focus:ring-1 focus:ring-[#4A126D]/20 transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="lounge-date" className="text-[9px] uppercase tracking-wider text-[#4A126D]/75 font-bold block mb-1">Select Date</label>
                    <input
                      id="lounge-date"
                      type="date"
                      required
                      value={consultationForm.date}
                      onChange={(e) => setConsultationForm({ ...consultationForm, date: e.target.value })}
                      className="w-full bg-[#FBF9FF] border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-800 focus:outline-none focus:border-[#4A126D] focus:ring-1 focus:ring-[#4A126D]/20 transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="lounge-type" className="text-[9px] uppercase tracking-wider text-[#4A126D]/75 font-bold block mb-1">Select Category of Interest</label>
                  <select
                    id="lounge-type"
                    value={consultationForm.type}
                    onChange={(e) => setConsultationForm({ ...consultationForm, type: e.target.value })}
                    className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-800 focus:outline-none focus:border-[#4A126D] focus:ring-1 focus:ring-[#4A126D]/20 transition-all cursor-pointer"
                  >
                    <option value="Solitaire Festival Consultation">Solitaire Festival Consultation</option>
                    <option value="Custom Design Consultation">Custom Design Consultation</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.name}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#4A126D] hover:bg-[#2C133C] text-white font-bold text-xs uppercase tracking-widest py-3.5 rounded-xl transition-all shadow-md cursor-pointer"
                >
                  Authenticate Lounge Access
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
