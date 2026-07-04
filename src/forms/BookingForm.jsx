import React, { useState } from 'react';
import { useBooking } from '../hooks/useBooking';
import { ImageUploadService } from '../services/ImageUploadService';

export default function BookingForm({
  type = 'consultation', // 'consultation' or 'custom_design'
  onSuccess
}) {
  const { submitting, errors, bookConsultation } = useBooking();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    timeSlot: '',
    description: '',
    preferredType: 'Gold Jewellery',
    categoryType: 'Rings',
    budget: ''
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState('');
  const [uploadStatusMessage, setUploadStatusMessage] = useState('');
  const [formSuccess, setFormSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setUploadProgress(true);
      setUploadStatusMessage('Uploading image sketch to secure storage...');
      setUploadedUrl('');

      try {
        const uploadResult = await ImageUploadService.uploadImage(file);
        setUploadedUrl(uploadResult.url);
        setUploadStatusMessage('✓ Image uploaded successfully!');
      } catch (err) {
        console.error("Image upload failed:", err);
        setUploadStatusMessage('❌ Image upload failed. Please try again.');
      } finally {
        setUploadProgress(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (uploadProgress) return;

    const payload = {
      ...formData,
      type,
      imageUrl: uploadedUrl,
      createdDate: new Date().toISOString()
    };

    const isSuccess = await bookConsultation(payload);

    if (isSuccess) {
      setFormSuccess(true);
      setFormData({
        name: '',
        phone: '',
        date: '',
        timeSlot: '',
        description: '',
        preferredType: 'Gold Jewellery',
        categoryType: 'Rings',
        budget: ''
      });
      setSelectedFile(null);
      setUploadedUrl('');
      setUploadStatusMessage('');
    }
  };

  if (formSuccess) {
    return (
      <div className="text-center py-6">
        <span className="text-4xl block mb-3">✨</span>
        <h4 className="serif-luxury text-lg font-bold text-gold">Request Submitted Successfully</h4>
        <p className="text-xs text-zinc-500 mt-2">Our showroom representatives will reach out to you via WhatsApp shortly.</p>
        <button
          onClick={() => setFormSuccess(false)}
          className="mt-6 px-5 py-2 bg-gradient-to-r from-gold to-[#DDA0DD] text-navy text-[10px] uppercase font-bold tracking-widest rounded-lg border-none"
        >
          Book Another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-left text-xs font-semibold text-[#4A126D]">
      {errors.global && (
        <p className="text-red-500 text-[10px] font-bold text-center bg-red-50 p-2.5 rounded-xl">
          {errors.global}
        </p>
      )}

      {/* Full Name */}
      <div className="space-y-1">
        <label className="text-[10px] uppercase tracking-wider text-zinc-400 font-bold">Full Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="e.g. Anil Soni"
          className="w-full h-11 px-4 rounded-xl border border-solid border-slate-100 focus:border-gold focus:outline-none"
          required
        />
        {errors.name && <p className="text-red-500 text-[9px] font-bold">{errors.name}</p>}
      </div>

      {/* WhatsApp Number */}
      <div className="space-y-1">
        <label className="text-[10px] uppercase tracking-wider text-zinc-400 font-bold">WhatsApp Contact</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          placeholder="e.g. +91 97838 43978"
          className="w-full h-11 px-4 rounded-xl border border-solid border-slate-100 focus:border-gold focus:outline-none"
          required
        />
        {errors.phone && <p className="text-red-500 text-[9px] font-bold">{errors.phone}</p>}
      </div>

      {type === 'consultation' ? (
        <>
          {/* Preferred Date */}
          <div className="space-y-1">
            <label className="text-[10px] uppercase tracking-wider text-zinc-400 font-bold">Preferred Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              className="w-full h-11 px-4 rounded-xl border border-solid border-slate-100 focus:border-gold focus:outline-none"
              required
            />
            {errors.date && <p className="text-red-500 text-[9px] font-bold">{errors.date}</p>}
          </div>

          {/* Time Slot */}
          <div className="space-y-1">
            <label className="text-[10px] uppercase tracking-wider text-zinc-400 font-bold">Time Slot</label>
            <select
              name="timeSlot"
              value={formData.timeSlot}
              onChange={handleInputChange}
              className="w-full h-11 px-4 rounded-xl border border-solid border-slate-100 focus:border-gold focus:outline-none bg-white"
              required
            >
              <option value="">Select a preferred hour slot</option>
              <option value="11:00 AM - 12:30 PM">11:00 AM - 12:30 PM</option>
              <option value="01:00 PM - 03:00 PM">01:00 PM - 03:00 PM</option>
              <option value="04:00 PM - 06:00 PM">04:00 PM - 06:00 PM</option>
              <option value="06:30 PM - 08:30 PM">06:30 PM - 08:30 PM</option>
            </select>
            {errors.timeSlot && <p className="text-red-500 text-[9px] font-bold">{errors.timeSlot}</p>}
          </div>

          {/* Preferred Categories */}
          <div className="space-y-1">
            <label className="text-[10px] uppercase tracking-wider text-zinc-400 font-bold">Preferred Collection Type</label>
            <select
              name="preferredType"
              value={formData.preferredType}
              onChange={handleInputChange}
              className="w-full h-11 px-4 rounded-xl border border-solid border-slate-100 focus:border-gold focus:outline-none bg-white"
            >
              <option value="Gold Jewellery">Gold Jewellery</option>
              <option value="Diamond Suite">Diamond Suite</option>
              <option value="Polki / Kundan">Polki / Kundan</option>
              <option value="Investment Bullion">Investment Bullion</option>
            </select>
          </div>
        </>
      ) : (
        <>
          {/* Category Type */}
          <div className="space-y-1">
            <label className="text-[10px] uppercase tracking-wider text-zinc-400 font-bold">Category Type</label>
            <select
              name="categoryType"
              value={formData.categoryType}
              onChange={handleInputChange}
              className="w-full h-11 px-4 rounded-xl border border-solid border-slate-100 focus:border-gold focus:outline-none bg-white"
              required
            >
              <option value="Rings">Rings 💍</option>
              <option value="Earrings">Earrings ✨</option>
              <option value="Necklaces">Necklaces 📿</option>
              <option value="Bangles">Bangles 🔮</option>
              <option value="Bracelets">Bracelets 🌟</option>
              <option value="Mangalsutras">Mangalsutras ❤️</option>
              <option value="Coins">Gold/Silver Coins 🪙</option>
              <option value="Other">Other Custom Ornaments</option>
            </select>
          </div>

          {/* Budget */}
          <div className="space-y-1">
            <label className="text-[10px] uppercase tracking-wider text-zinc-400 font-bold">Target Budget</label>
            <input
              type="text"
              name="budget"
              value={formData.budget}
              onChange={handleInputChange}
              placeholder="e.g. ₹50,000 or 1.5 Lakhs"
              className="w-full h-11 px-4 rounded-xl border border-solid border-slate-100 focus:border-gold focus:outline-none"
              required
            />
          </div>

          {/* Design Description */}
          <div className="space-y-1">
            <label className="text-[10px] uppercase tracking-wider text-zinc-400 font-bold">Bespoke Ornaments Details</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="3"
              placeholder="Describe details: rings size, gold weight preferences, gemstone colorings..."
              className="w-full p-4 rounded-xl border border-solid border-slate-100 focus:border-gold focus:outline-none resize-none font-sans"
              required
            />
          </div>

          {/* Reference sketch file upload */}
          <div className="space-y-1">
            <label className="text-[10px] uppercase tracking-wider text-zinc-400 font-bold">Design sketch or reference image</label>
            <div className="relative border-2 border-dashed border-zinc-200 hover:border-gold rounded-xl p-4 text-center cursor-pointer transition-all">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <span className="text-lg block mb-1">🖼️</span>
              <span className="text-[10px] text-zinc-400 block">
                {selectedFile ? selectedFile.name : 'Choose image file or drag here'}
              </span>
            </div>
            {uploadStatusMessage && (
              <p className={`text-[10px] font-bold mt-1.5 ${
                uploadStatusMessage.startsWith('✓')
                  ? 'text-emerald-600'
                  : uploadStatusMessage.startsWith('❌')
                  ? 'text-red-500'
                  : 'text-amber-500 animate-pulse'
              }`}>
                {uploadStatusMessage}
              </p>
            )}
          </div>
        </>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={submitting || uploadProgress}
        className="w-full py-3.5 bg-gradient-to-r from-gold to-[#DDA0DD] text-navy text-xs uppercase font-bold tracking-widest rounded-xl transition-all transform hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-50 cursor-pointer border-none text-white font-bold"
      >
        {submitting || uploadProgress ? 'Submitting secure request...' : 'Book secure suite consultation'}
      </button>
    </form>
  );
}
