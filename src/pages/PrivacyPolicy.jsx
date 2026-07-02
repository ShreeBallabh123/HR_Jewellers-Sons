import React from 'react';

export default function PrivacyPolicy({ navigateTo, triggerAudio }) {
  const policySections = [
    {
      num: '01',
      title: 'Information We Collect',
      content: 'HR Jewellers & Sons collects personal information you voluntarily provide when registering for our Gold Saving Scheme, booking showroom appointments, or contacting us. This includes your name, phone number, email address, Aadhaar details (for scheme enrollment), and city/location.',
    },
    {
      num: '02',
      title: 'How We Use Your Information',
      content: 'We use your information to process Gold Mine & Gold Reserve scheme enrollments, send order confirmations and updates via WhatsApp, manage GRP savings ledgers, personalize your jewellery recommendations, and book showroom consultations. We do not sell, trade, or rent your personal information to third parties.',
    },
    {
      num: '03',
      title: 'Data Security',
      content: 'Your data is stored securely on Firebase encrypted servers. We employ industry-standard SSL encryption for all data transmission. Access to customer data is restricted to authorized HR Jewellers & Sons personnel only.',
    },
    {
      num: '04',
      title: 'Cookies & Analytics',
      content: 'Our website uses cookies to enhance your browsing experience, remember your preferences, and analyze site traffic. You can control cookie settings through your browser. Disabling cookies may affect some website features.',
    },
    {
      num: '05',
      title: 'WhatsApp Communications',
      content: 'By providing your phone number, you consent to receive order updates, savings scheme notifications, and promotional messages via WhatsApp. You may opt out at any time by messaging "STOP" to our WhatsApp number.',
    },
    {
      num: '06',
      title: 'Your Rights',
      content: 'You have the right to access, update, or delete your personal information held by us. To exercise these rights, contact us at hrjewellersbkn@gmail.com or call +91 97838 43978. We will respond to all requests within 7 business days.',
    },
    {
      num: '07',
      title: 'Third-Party Links',
      content: 'Our website may contain links to third-party websites (such as HR Jewellers & Sons). We are not responsible for the privacy practices of these sites and encourage you to review their privacy policies.',
    }
  ];

  return (
    <div className="transition-colors duration-500 min-h-screen pb-8 bg-[#FCFAFF] text-[#4A126D]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-12 space-y-10 animate-slide-up text-left">
        {/* Header */}
        <div className="space-y-3 text-center">
          <div className="inline-flex items-center space-x-2 bg-[#F3EEF5] border border-purple-200 px-4 py-1.5 rounded-full mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4A126D] animate-pulse"></span>
            <span className="text-[9px] uppercase tracking-[0.25em] text-[#4A126D] font-bold">
              HR JEWELLERS &amp; SONS
            </span>
          </div>
          <h1 className="serif-luxury text-4xl sm:text-5xl font-semibold text-[#4A126D] leading-tight">
            Privacy Policy
          </h1>
          <p className="text-xs text-gray-500 max-w-md mx-auto leading-relaxed">
            Effective Date: June 2, 2026. We are committed to protecting your personal information and your right to privacy.
          </p>
          <div className="w-12 h-[1px] bg-[#DDA0DD] mx-auto mt-2"></div>
        </div>

        {/* Policy Sections */}
        <div className="space-y-6">
          {policySections.map((sec) => (
            <section key={sec.num} className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 shadow-sm hover:border-[#DDA0DD]/20 transition-all duration-300">
              <div className="flex items-center space-x-3 mb-4">
                <span className="text-[10px] bg-[#F3EEF5] border border-purple-200 px-2.5 py-1 rounded-full text-[#4A126D] font-bold tracking-wider">
                  SECTION {sec.num}
                </span>
              </div>
              <h3 className="serif-luxury text-lg text-[#4A126D] font-bold mb-3">
                {sec.title}
              </h3>
              <p className="text-xs font-light text-gray-600 leading-relaxed font-sans">
                {sec.content}
              </p>
            </section>
          ))}
        </div>

        {/* Back CTA Button */}
        <div className="text-center pt-8 pb-4">
          <button
            onClick={() => {
              if (triggerAudio) triggerAudio('click');
              navigateTo('home');
            }}
            className="inline-flex items-center space-x-2 bg-[#4A126D] hover:bg-[#2C133C] text-white font-bold text-xs uppercase tracking-widest px-8 py-4 rounded-xl transition-all shadow-md transform hover:-translate-y-0.5 hover:shadow-lg duration-300 cursor-pointer"
          >
            <span>←</span> <span>Back to Home</span>
          </button>
        </div>
      </div>
    </div>
  );
}
