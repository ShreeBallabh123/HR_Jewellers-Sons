import React from 'react';
import { AlertTriangle } from 'lucide-react';

const isVideoUrl = (url) => {
  if (!url) return false;
  return url.includes('.mp4') || url.includes('.webm') || url.includes('/video/upload/');
};

export default function ProductForm({
  editingProduct,
  setEditingProduct,
  newProduct,
  setNewProduct,
  categories = [],
  onSubmit,
  handleImageUpload,
  imageUploadProgress,
  handleSubImagesUpload,
  subImagesUploadProgress,
  handleRemoveSubImage,
  handleFormKeyDown
}) {
  const getVal = (field, defaultVal = '') => {
    if (editingProduct) {
      return editingProduct[field] !== undefined ? editingProduct[field] : defaultVal;
    }
    return newProduct[field] !== undefined ? newProduct[field] : defaultVal;
  };

  const updateField = (field, val) => {
    if (editingProduct) {
      setEditingProduct({ ...editingProduct, [field]: val });
    } else {
      setNewProduct({ ...newProduct, [field]: val });
    }
  };

  return (
    <div className="bg-white dark:bg-[#15151A] border border-solid border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4 border-b border-solid border-zinc-100 dark:border-zinc-850 pb-4">
        <div>
          <h3 className="text-base font-black tracking-wider text-zinc-900 dark:text-[#E6C687] uppercase">
            {editingProduct ? 'Update Jewellery Details' : 'Register New Jewellery'}
          </h3>
          <p className="text-[10px] text-zinc-400 dark:text-zinc-500 font-medium">Add parameters, metal values, diamond scales and prices to catalog registry.</p>
        </div>
        {editingProduct && (
          <button
            type="button"
            onClick={() => setEditingProduct(null)}
            className="px-3 py-1 rounded-md border border-solid border-zinc-200 dark:border-zinc-800 text-[10px] font-bold text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all uppercase cursor-pointer bg-transparent"
          >
            Reset Add Mode
          </button>
        )}
      </div>

      {categories.length === 0 && (
        <div className="p-4 bg-amber-500/10 border border-solid border-amber-500/20 text-amber-700 dark:text-amber-400 rounded-xl flex items-start gap-3 text-xs leading-relaxed">
          <AlertTriangle className="w-5 h-5 shrink-0 text-amber-500 mt-0.5" />
          <div className="space-y-1 text-left">
            <p className="font-bold uppercase tracking-wider text-[10px]">Mandatory Step Required</p>
            <p>You must establish at least one Category catalog before creating signature items. Please create one in the Category tab.</p>
          </div>
        </div>
      )}

      <form onSubmit={onSubmit} className="space-y-8" onKeyDown={handleFormKeyDown}>

        {/* Section: General Details */}
        <div className="space-y-4 text-left">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-[#E6C687]"></span>
            <h4 className="text-[10px] font-bold tracking-widest text-zinc-400 dark:text-zinc-500 uppercase">General Information</h4>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-6 gap-4">
            <div className="space-y-1.5 col-span-2">
              <label htmlFor="prod-name-form" className="text-[9px] uppercase tracking-wider text-zinc-400 font-bold block px-1">Jewellery Name</label>
              <input
                id="prod-name-form"
                type="text"
                placeholder="e.g. Royal Mayur Solitaire Ring"
                value={getVal('name')}
                onChange={(e) => updateField('name', e.target.value)}
                className="w-full h-10 bg-white dark:bg-zinc-905 border border-solid border-zinc-200 dark:border-zinc-800 rounded-xl px-4 text-xs text-zinc-905 dark:text-zinc-100 placeholder-zinc-450 focus:outline-none focus:border-zinc-900 dark:focus:border-zinc-200 focus:ring-1 focus:ring-zinc-900/5 font-semibold"
                required
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="prod-sku-form" className="text-[9px] uppercase tracking-wider text-zinc-400 font-bold block px-1">SKU Code</label>
              <input
                id="prod-sku-form"
                type="text"
                placeholder="e.g. HRJ-RNG-0982"
                value={getVal('sku')}
                onChange={(e) => updateField('sku', e.target.value)}
                className="w-full h-10 bg-white dark:bg-zinc-905 border border-solid border-zinc-200 dark:border-zinc-800 rounded-xl px-4 text-xs text-zinc-905 dark:text-zinc-100 placeholder-zinc-450 focus:outline-none focus:border-zinc-900 dark:focus:border-zinc-200 focus:ring-1 focus:ring-zinc-900/5 font-semibold"
                required
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="prod-category-form" className="text-[9px] uppercase tracking-wider text-zinc-400 font-bold block px-1">Category Portfolio</label>
              <select
                id="prod-category-form"
                value={getVal('category')}
                onChange={(e) => updateField('category', e.target.value)}
                className="w-full h-10 bg-white dark:bg-[#09090B] border border-solid border-zinc-200 dark:border-zinc-800 rounded-xl px-4 text-xs text-zinc-950 dark:text-zinc-100 focus:outline-none focus:border-zinc-900 dark:focus:border-zinc-200 cursor-pointer font-semibold"
                required
              >
                <option value="">Select Category</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
            <div className="space-y-1.5">
              <label htmlFor="prod-categoryType-form" className="text-[9px] uppercase tracking-wider text-zinc-400 font-bold block px-1">Metal Type</label>
              <select
                id="prod-categoryType-form"
                value={getVal('categoryType', 'Gold')}
                onChange={(e) => updateField('categoryType', e.target.value)}
                className="w-full h-10 bg-white dark:bg-[#09090B] border border-solid border-zinc-200 dark:border-zinc-800 rounded-xl px-4 text-xs text-zinc-950 dark:text-zinc-100 focus:outline-none focus:border-zinc-900 dark:focus:border-zinc-200 cursor-pointer font-semibold"
              >
                <option value="Gold">Gold</option>
                <option value="925 Sterling Silver">925 Sterling Silver</option>
                <option value="Normal Silver">Normal Silver</option>
                <option value="999 Silver">999 Silver</option>
              </select>
            </div>
            {/* Silver Weight — show only when 999 Silver is selected */}
            {getVal('categoryType') === '999 Silver' && (
              <div className="space-y-1.5">
                <label htmlFor="prod-silverWeight-form" className="text-[9px] uppercase tracking-wider text-zinc-400 font-bold block px-1">Silver Weight</label>
                <select
                  id="prod-silverWeight-form"
                  value={getVal('silverWeight')}
                  onChange={(e) => updateField('silverWeight', e.target.value)}
                  className="w-full h-10 bg-white dark:bg-[#09090B] border border-solid border-zinc-200 dark:border-zinc-800 rounded-xl px-4 text-xs text-zinc-950 dark:text-zinc-100 focus:outline-none focus:border-zinc-900 dark:focus:border-zinc-200 cursor-pointer font-semibold"
                >
                  <option value="">- Select Weight -</option>
                  <option value="500 gm">500 gm</option>
                  <option value="1 Kg">1 Kg</option>
                </select>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="prod-gender-form" className="text-[9px] uppercase tracking-wider text-zinc-400 font-bold block px-1">Gender</label>
              <select
                id="prod-gender-form"
                value={getVal('gender', 'Unisex')}
                onChange={(e) => updateField('gender', e.target.value)}
                className="w-full h-10 bg-white dark:bg-[#09090B] border border-solid border-zinc-200 dark:border-zinc-800 rounded-xl px-4 text-xs text-zinc-950 dark:text-zinc-100 focus:outline-none focus:border-zinc-900 dark:focus:border-zinc-200 cursor-pointer font-semibold"
              >
                <option value="Unisex">Unisex</option>
                <option value="Women">Women</option>
                <option value="Men">Men</option>
                <option value="Kids">Kids</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label htmlFor="prod-occasion-form" className="text-[9px] uppercase tracking-wider text-zinc-400 font-bold block px-1">Occasion</label>
              <select
                id="prod-occasion-form"
                value={getVal('occasion', 'Everyday Wear')}
                onChange={(e) => updateField('occasion', e.target.value)}
                className="w-full h-10 bg-white dark:bg-[#09090B] border border-solid border-zinc-200 dark:border-zinc-800 rounded-xl px-4 text-xs text-zinc-950 dark:text-zinc-100 focus:outline-none focus:border-zinc-900 dark:focus:border-zinc-200 cursor-pointer font-semibold"
              >
                <option value="Everyday Wear">Everyday Wear</option>
                <option value="Festive">Festive</option>
                <option value="Wedding">Wedding</option>
                <option value="Engagement">Engagement</option>
                <option value="Anniversary">Anniversary</option>
                <option value="Gifting">Gifting</option>
                <option value="Workwear">Workwear</option>
                <option value="Romantic">Romantic</option>
                <option value="Vacation">Vacation</option>
                <option value="Special Occasion">Special Occasion</option>
                <option value="Valentine">Valentine</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="prod-desc-form" className="text-[9px] uppercase tracking-wider text-zinc-400 font-bold block px-1">Jewellery Parameters &amp; Details Description</label>
            <textarea
              id="prod-desc-form"
              rows="2"
              placeholder="Complete dimensions details, custom diamond metrics, hallmark stamps details..."
              value={getVal('desc')}
              onChange={(e) => updateField('desc', e.target.value)}
              className="w-full bg-white dark:bg-zinc-905 border border-solid border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-xs text-zinc-905 dark:text-zinc-100 placeholder-zinc-450 focus:outline-none focus:border-zinc-900 dark:focus:border-zinc-200 resize-none font-semibold"
              required
            ></textarea>
          </div>
        </div>

        {/* Section: Metal Specifications */}
        <div className="space-y-4 pt-4 border-t border-solid border-zinc-100 dark:border-zinc-850 text-left">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-[#E6C687]"></span>
            <h4 className="text-[10px] font-bold tracking-widest text-zinc-400 dark:text-zinc-500 uppercase">Metal Specifications</h4>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="prod-carat-form" className="text-[9px] uppercase tracking-wider text-zinc-400 font-bold block px-1">Carat &amp; Purity</label>
              <select
                id="prod-carat-form"
                value={getVal('carat')}
                onChange={(e) => {
                  const val = e.target.value;
                  if (editingProduct) {
                    setEditingProduct({ ...editingProduct, carat: val, metalPurity: val });
                  } else {
                    setNewProduct({ ...newProduct, carat: val, metalPurity: val });
                  }
                }}
                className="w-full h-10 bg-white dark:bg-[#09090B] border border-solid border-zinc-200 dark:border-zinc-800 rounded-xl px-4 text-xs text-zinc-950 dark:text-zinc-100 focus:outline-none focus:border-zinc-900 dark:focus:border-zinc-200 cursor-pointer font-semibold"
              >
                <option value="9K">9K</option>
                <option value="14K">14K</option>
                <option value="18K">18K</option>
                <option value="20K">20K</option>
                <option value="22K">22K</option>
                <option value="24K">24K (Pure Gold)</option>
                <option value="92.5">92.5 (Silver)</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label htmlFor="prod-netWeight-form" className="text-[9px] uppercase tracking-wider text-zinc-400 font-bold block px-1">Net Weight</label>
              <input
                id="prod-netWeight-form"
                type="text"
                placeholder="e.g. 1.687 g"
                value={getVal('netWeight')}
                onChange={(e) => updateField('netWeight', e.target.value)}
                className="w-full h-10 bg-white dark:bg-zinc-905 border border-solid border-zinc-200 dark:border-zinc-800 rounded-xl px-4 text-xs text-zinc-905 dark:text-zinc-100 placeholder-zinc-450 focus:outline-none focus:border-zinc-900 dark:focus:border-zinc-200 font-semibold"
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="prod-grossWeight-form" className="text-[9px] uppercase tracking-wider text-zinc-400 font-bold block px-1">Gross Weight</label>
              <input
                id="prod-grossWeight-form"
                type="text"
                placeholder="e.g. 1.75 g"
                value={getVal('grossWeight')}
                onChange={(e) => {
                  const val = e.target.value;
                  if (editingProduct) {
                    setEditingProduct({ ...editingProduct, grossWeight: val, weight: val });
                  } else {
                    setNewProduct({ ...newProduct, grossWeight: val, weight: val });
                  }
                }}
                className="w-full h-10 bg-white dark:bg-zinc-905 border border-solid border-zinc-200 dark:border-zinc-800 rounded-xl px-4 text-xs text-zinc-905 dark:text-zinc-100 placeholder-zinc-450 focus:outline-none focus:border-zinc-900 dark:focus:border-zinc-200 font-semibold"
              />
              {/* Standard Coin Weights Selectors */}
              {(getVal('category') === 'gold-coins' || getVal('category')?.toLowerCase().includes('coin')) && (
                <div className="space-y-1 mt-2 select-none">
                  <span className="text-[8px] uppercase tracking-wider text-zinc-400 font-bold block px-1">Quick Select Coin Weight:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {['0.5', '1', '2', '5', '8', '10', '20', '50'].map((w) => {
                      const activeWeight = getVal('grossWeight');
                      const isActive = activeWeight === w;
                      return (
                        <button
                          key={w}
                          type="button"
                          onClick={() => {
                            if (editingProduct) {
                              setEditingProduct({ ...editingProduct, grossWeight: w, netWeight: w, weight: w });
                            } else {
                              setNewProduct({ ...newProduct, grossWeight: w, netWeight: w, weight: w });
                            }
                          }}
                          className={`px-2.5 py-1 text-[10px] font-bold rounded-lg border border-solid transition-all cursor-pointer ${
                            isActive
                              ? 'bg-[#BCA057] border-[#BCA057] text-white font-extrabold shadow-sm'
                              : 'border-zinc-200 dark:border-zinc-800 text-zinc-650 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-850 bg-white dark:bg-zinc-900'
                          }`}
                        >
                          {w}g
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
            <div className="space-y-1.5">
              <label htmlFor="prod-dimensions-form" className="text-[9px] uppercase tracking-wider text-zinc-400 font-bold block px-1">Product Dimensions</label>
              <input
                id="prod-dimensions-form"
                type="text"
                placeholder="e.g. 12mm - 8mm - 4mm"
                value={getVal('productDimensions')}
                onChange={(e) => updateField('productDimensions', e.target.value)}
                className="w-full h-10 bg-white dark:bg-zinc-905 border border-solid border-zinc-200 dark:border-zinc-800 rounded-xl px-4 text-xs text-zinc-905 dark:text-zinc-100 placeholder-zinc-450 focus:outline-none focus:border-zinc-900 dark:focus:border-zinc-200 font-semibold"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="prod-metalColor-form" className="text-[9px] uppercase tracking-wider text-zinc-400 font-bold block px-1">Metal Color/Finishing</label>
              <select
                id="prod-metalColor-form"
                value={getVal('metalColor', 'Yellow Gold')}
                onChange={(e) => updateField('metalColor', e.target.value)}
                className="w-full h-10 bg-white dark:bg-[#09090B] border border-solid border-zinc-200 dark:border-zinc-800 rounded-xl px-3 text-xs text-zinc-950 dark:text-zinc-100 focus:outline-none focus:border-zinc-900 dark:focus:border-zinc-200 cursor-pointer font-semibold"
              >
                <option value="Yellow Gold">Yellow Gold</option>
                <option value="Rose Gold">Rose Gold</option>
                <option value="White Gold">White Gold</option>
                <option value="Platinum Plated Silver">Platinum Plated Silver</option>
                <option value="Rose Gold Plated Silver">Rose Gold Plated Silver</option>
                <option value="Gold Plated Silver">Gold Plated Silver</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section: Diamonds & Gemstones Details */}
        <div className="space-y-4 pt-4 border-t border-solid border-zinc-100 dark:border-zinc-850 text-left">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-[#E6C687]"></span>
            <h4 className="text-[10px] font-bold tracking-widest text-zinc-400 dark:text-zinc-500 uppercase">Diamonds &amp; Stone Details</h4>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-6 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="prod-diamondShape-form" className="text-[9px] uppercase tracking-wider text-zinc-400 font-bold block px-1">Diamond Shape</label>
              <select
                id="prod-diamondShape-form"
                value={getVal('diamondShape', 'Round')}
                onChange={(e) => updateField('diamondShape', e.target.value)}
                className="w-full h-10 bg-white dark:bg-[#09090B] border border-solid border-zinc-200 dark:border-zinc-800 rounded-xl px-3 text-xs text-zinc-950 dark:text-zinc-100 focus:outline-none focus:border-zinc-900 dark:focus:border-zinc-200 cursor-pointer font-semibold"
              >
                <option value="Round">Round</option>
                <option value="Princess">Princess</option>
                <option value="Cushion">Cushion</option>
                <option value="Oval">Oval</option>
                <option value="Emerald">Emerald</option>
                <option value="Pear">Pear</option>
                <option value="Marquise">Marquise</option>
                <option value="Radiant">Radiant</option>
                <option value="Asscher">Asscher</option>
                <option value="Heart">Heart</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label htmlFor="prod-diamondWeight-form" className="text-[9px] uppercase tracking-wider text-zinc-400 font-bold block px-1">Diamond Weight</label>
              <input
                id="prod-diamondWeight-form"
                type="text"
                placeholder="e.g. 0.33 Ct"
                value={getVal('diamondWeight')}
                onChange={(e) => updateField('diamondWeight', e.target.value)}
                className="w-full h-10 bg-white dark:bg-zinc-905 border border-solid border-zinc-200 dark:border-zinc-800 rounded-xl px-4 text-xs text-zinc-905 dark:text-zinc-100 placeholder-zinc-450 focus:outline-none focus:border-zinc-900 dark:focus:border-zinc-200 font-semibold"
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="prod-diamondColor-form" className="text-[9px] uppercase tracking-wider text-zinc-400 font-bold block px-1">Color Grade</label>
              <select
                id="prod-diamondColor-form"
                value={getVal('diamondColor', 'GH')}
                onChange={(e) => updateField('diamondColor', e.target.value)}
                className="w-full h-10 bg-white dark:bg-[#09090B] border border-solid border-zinc-200 dark:border-zinc-800 rounded-xl px-3 text-xs text-zinc-950 dark:text-zinc-100 focus:outline-none focus:border-zinc-900 dark:focus:border-zinc-200 cursor-pointer font-semibold"
              >
                <option value="EF">EF</option>
                <option value="GH">GH</option>
                <option value="HI">HI</option>
                <option value="IJ">IJ</option>
                <option value="JK">JK</option>
                <option value="KL">KL</option>
                <option value="LM">LM</option>
                <option value="NZ">NZ</option>
                <option value="DF">DF</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label htmlFor="prod-diamondClarity-form" className="text-[9px] uppercase tracking-wider text-zinc-400 font-bold block px-1">Clarity Grade</label>
              <select
                id="prod-diamondClarity-form"
                value={getVal('diamondClarity', 'VVS1')}
                onChange={(e) => updateField('diamondClarity', e.target.value)}
                className="w-full h-10 bg-white dark:bg-[#09090B] border border-solid border-zinc-200 dark:border-zinc-800 rounded-xl px-3 text-xs text-zinc-950 dark:text-zinc-100 focus:outline-none focus:border-zinc-900 dark:focus:border-zinc-200 cursor-pointer font-semibold"
              >
                <option value="FL">FL</option>
                <option value="IF">IF</option>
                <option value="VVS1">VVS1</option>
                <option value="VVS2">VVS2</option>
                <option value="VS1">VS1</option>
                <option value="VS2">VS2</option>
                <option value="SI1">SI1</option>
                <option value="SI2">SI2</option>
                <option value="I1">I1</option>
                <option value="I2">I2</option>
                <option value="I3">I3</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label htmlFor="prod-diamondCut-form" className="text-[9px] uppercase tracking-wider text-zinc-400 font-bold block px-1">Cut Grade</label>
              <select
                id="prod-diamondCut-form"
                value={getVal('diamondCut', 'Excellent')}
                onChange={(e) => updateField('diamondCut', e.target.value)}
                className="w-full h-10 bg-white dark:bg-[#09090B] border border-solid border-zinc-200 dark:border-zinc-800 rounded-xl px-3 text-xs text-zinc-950 dark:text-zinc-100 focus:outline-none focus:border-zinc-900 dark:focus:border-zinc-200 cursor-pointer font-semibold"
              >
                <option value="Excellent">Excellent</option>
                <option value="Very Good">Very Good</option>
                <option value="Good">Good</option>
                <option value="Fair">Fair</option>
                <option value="Poor">Poor</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label htmlFor="prod-diamondQuantity-form" className="text-[9px] uppercase tracking-wider text-zinc-400 font-bold block px-1">Diamond Pcs</label>
              <input
                id="prod-diamondQuantity-form"
                type="text"
                placeholder="e.g. 1pcs"
                value={getVal('diamondQuantity')}
                onChange={(e) => updateField('diamondQuantity', e.target.value)}
                className="w-full h-10 bg-white dark:bg-zinc-905 border border-solid border-zinc-200 dark:border-zinc-800 rounded-xl px-4 text-xs text-zinc-905 dark:text-zinc-100 placeholder-zinc-450 focus:outline-none focus:border-zinc-900 dark:focus:border-zinc-200 font-semibold"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="prod-diamondValue-form" className="text-[9px] uppercase tracking-wider text-zinc-400 font-bold block px-1">Diamond Value (₹)</label>
              <input
                id="prod-diamondValue-form"
                type="number"
                placeholder="e.g. 15000"
                value={getVal('diamondValue')}
                onChange={(e) => updateField('diamondValue', e.target.value === '' ? '' : +e.target.value)}
                className="w-full h-10 bg-white dark:bg-zinc-905 border border-solid border-zinc-200 dark:border-zinc-800 rounded-xl px-4 text-xs text-zinc-905 dark:text-zinc-100 placeholder-zinc-450 focus:outline-none focus:border-zinc-900 dark:focus:border-zinc-200 font-semibold"
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="prod-stoneCarat-form" className="text-[9px] uppercase tracking-wider text-zinc-400 font-bold block px-1">Stone weight</label>
              <input
                id="prod-stoneCarat-form"
                type="text"
                placeholder="e.g. 0.45 Ct"
                value={getVal('stoneCarat')}
                onChange={(e) => updateField('stoneCarat', e.target.value)}
                className="w-full h-10 bg-white dark:bg-zinc-905 border border-solid border-zinc-200 dark:border-zinc-800 rounded-xl px-4 text-xs text-zinc-905 dark:text-zinc-100 placeholder-zinc-450 focus:outline-none font-semibold"
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="prod-beadsCarat-form" className="text-[9px] uppercase tracking-wider text-zinc-400 font-bold block px-1">Beads weight</label>
              <input
                id="prod-beadsCarat-form"
                type="text"
                placeholder="e.g. 1.20 Ct"
                value={getVal('beadsCarat')}
                onChange={(e) => updateField('beadsCarat', e.target.value)}
                className="w-full h-10 bg-white dark:bg-zinc-905 border border-solid border-zinc-200 dark:border-zinc-800 rounded-xl px-4 text-xs text-zinc-905 dark:text-zinc-100 placeholder-zinc-450 focus:outline-none font-semibold"
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="prod-pearlsCarat-form" className="text-[9px] uppercase tracking-wider text-zinc-400 font-bold block px-1">Pearls weight</label>
              <input
                id="prod-pearlsCarat-form"
                type="text"
                placeholder="e.g. 0.85 Ct"
                value={getVal('pearlsCarat')}
                onChange={(e) => updateField('pearlsCarat', e.target.value)}
                className="w-full h-10 bg-white dark:bg-zinc-905 border border-solid border-zinc-200 dark:border-zinc-800 rounded-xl px-4 text-xs text-zinc-905 dark:text-zinc-100 placeholder-zinc-450 focus:outline-none font-semibold"
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="prod-gemstoneCarat-form" className="text-[9px] uppercase tracking-wider text-zinc-400 font-bold block px-1">Gemstone weight</label>
              <input
                id="prod-gemstoneCarat-form"
                type="text"
                placeholder="e.g. 2.15 Ct"
                value={getVal('gemstoneCarat')}
                onChange={(e) => updateField('gemstoneCarat', e.target.value)}
                className="w-full h-10 bg-white dark:bg-zinc-905 border border-solid border-zinc-200 dark:border-zinc-800 rounded-xl px-4 text-xs text-zinc-905 dark:text-zinc-100 placeholder-zinc-450 focus:outline-none font-semibold"
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="prod-polki-form" className="text-[9px] uppercase tracking-wider text-zinc-400 font-bold block px-1">Polki weight</label>
              <input
                id="prod-polki-form"
                type="text"
                placeholder="e.g. 1.25 Ct"
                value={getVal('polki')}
                onChange={(e) => updateField('polki', e.target.value)}
                className="w-full h-10 bg-white dark:bg-zinc-905 border border-solid border-zinc-200 dark:border-zinc-800 rounded-xl px-4 text-xs text-zinc-905 dark:text-zinc-100 placeholder-zinc-450 focus:outline-none font-semibold"
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="prod-polkiValue-form" className="text-[9px] uppercase tracking-wider text-zinc-400 font-bold block px-1">Polki Value (₹)</label>
              <input
                id="prod-polkiValue-form"
                type="number"
                placeholder="e.g. 12000"
                value={getVal('polkiValue')}
                onChange={(e) => updateField('polkiValue', e.target.value === '' ? '' : +e.target.value)}
                className="w-full h-10 bg-white dark:bg-zinc-905 border border-solid border-zinc-200 dark:border-zinc-800 rounded-xl px-4 text-xs text-zinc-905 dark:text-zinc-100 placeholder-zinc-450 focus:outline-none focus:border-zinc-900 dark:focus:border-zinc-200 font-semibold"
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="prod-pearlsValue-form" className="text-[9px] uppercase tracking-wider text-zinc-400 font-bold block px-1">Other Value (₹)</label>
              <input
                id="prod-pearlsValue-form"
                type="number"
                placeholder="e.g. 8000"
                value={getVal('pearlsValue')}
                onChange={(e) => updateField('pearlsValue', e.target.value === '' ? '' : +e.target.value)}
                className="w-full h-10 bg-white dark:bg-zinc-905 border border-solid border-zinc-200 dark:border-zinc-800 rounded-xl px-4 text-xs text-zinc-905 dark:text-zinc-100 placeholder-zinc-450 focus:outline-none focus:border-zinc-900 dark:focus:border-zinc-200 font-semibold"
              />
            </div>
            <div className="space-y-1.5 col-span-2">
              <label htmlFor="prod-discountOffDiamond-form" className="text-[9px] uppercase tracking-wider text-zinc-400 font-bold block px-1">Discount Off Diamond (%)</label>
              <div className="relative">
                <input
                  id="prod-discountOffDiamond-form"
                  type="number"
                  min="0"
                  max="100"
                  placeholder="e.g. 10"
                  value={getVal('discountOffDiamond')}
                  onChange={(e) => updateField('discountOffDiamond', e.target.value === '' ? '' : +e.target.value)}
                  className="w-full h-10 bg-white dark:bg-zinc-905 border border-solid border-zinc-200 dark:border-zinc-800 rounded-xl pl-4 pr-16 text-xs text-zinc-905 dark:text-zinc-100 placeholder-zinc-450 focus:outline-none focus:border-zinc-900 dark:focus:border-zinc-200 font-semibold"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[10px] text-zinc-450 dark:text-zinc-500 font-extrabold select-none pointer-events-none">% OFF</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section: Pricing & Commercial details */}
        <div className="space-y-4 pt-4 border-t border-solid border-zinc-100 dark:border-zinc-850 text-left">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-[#E6C687]"></span>
            <h4 className="text-[10px] font-bold tracking-widest text-zinc-400 dark:text-zinc-500 uppercase">Pricing &amp; Commercials</h4>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="prod-calc-mode" className="text-[9px] uppercase tracking-wider text-zinc-400 font-bold block px-1">Price Mode</label>
              <select
                id="prod-calc-mode"
                value={getVal('priceCalculationMode', 'manual')}
                onChange={(e) => updateField('priceCalculationMode', e.target.value)}
                className="w-full h-10 bg-white dark:bg-[#09090B] border border-solid border-zinc-200 dark:border-zinc-800 rounded-xl px-4 text-xs text-zinc-950 dark:text-zinc-100 focus:outline-none focus:border-zinc-900 dark:focus:border-zinc-200 cursor-pointer font-semibold"
              >
                <option value="manual">Manual (Fixed Price)</option>
                <option value="dynamic">Dynamic (Auto Recalculate)</option>
              </select>
            </div>

            {getVal('priceCalculationMode', 'manual') === 'manual' ? (
              <div className="space-y-1.5">
                <label htmlFor="prod-price-form" className="text-[9px] uppercase tracking-wider text-zinc-400 font-bold block px-1">Fixed Selling Price (INR)</label>
                <input
                  id="prod-price-form"
                  type="number"
                  placeholder="e.g. 42000"
                  value={getVal('price')}
                  onChange={(e) => updateField('price', e.target.value === '' ? '' : +e.target.value)}
                  className="w-full h-10 bg-white dark:bg-zinc-905 border border-solid border-zinc-200 dark:border-zinc-800 rounded-xl px-4 text-xs text-zinc-905 dark:text-zinc-100 placeholder-zinc-450 focus:outline-none focus:border-zinc-900 dark:focus:border-zinc-200 font-semibold"
                  required={getVal('priceCalculationMode', 'manual') === 'manual'}
                />
              </div>
            ) : (
              <>
                <div className="space-y-1.5">
                  <label htmlFor="prod-purity-form" className="text-[9px] uppercase tracking-wider text-zinc-400 font-bold block px-1">Gold Purity</label>
                  <select
                    id="prod-purity-form"
                    value={getVal('goldPurity', getVal('carat', '22K'))}
                    onChange={(e) => {
                      updateField('goldPurity', e.target.value);
                      updateField('carat', e.target.value);
                    }}
                    className="w-full h-10 bg-white dark:bg-[#09090B] border border-solid border-zinc-200 dark:border-zinc-800 rounded-xl px-4 text-xs text-zinc-950 dark:text-zinc-100 focus:outline-none focus:border-zinc-900 dark:focus:border-zinc-200 cursor-pointer font-semibold"
                  >
                    <option value="24K">24K (Pure Gold)</option>
                    <option value="22K">22K (Standard)</option>
                    <option value="18K">18K (Premium)</option>
                    <option value="14K">14K (Economy)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="prod-gold-weight-form" className="text-[9px] uppercase tracking-wider text-zinc-400 font-bold block px-1">Gold Weight (grams)</label>
                  <input
                    id="prod-gold-weight-form"
                    type="number"
                    step="0.001"
                    placeholder="e.g. 8.45"
                    value={getVal('goldWeight', getVal('netWeight', ''))}
                    onChange={(e) => {
                      updateField('goldWeight', e.target.value === '' ? '' : +e.target.value);
                      updateField('netWeight', e.target.value === '' ? '' : +e.target.value);
                    }}
                    className="w-full h-10 bg-white dark:bg-zinc-905 border border-solid border-zinc-200 dark:border-zinc-800 rounded-xl px-4 text-xs text-zinc-905 dark:text-zinc-100 placeholder-zinc-450 focus:outline-none focus:border-zinc-900 dark:focus:border-zinc-200 font-semibold"
                    required={getVal('priceCalculationMode', 'manual') === 'dynamic'}
                  />
                </div>
              </>
            )}

            <div className="space-y-1.5">
              <label htmlFor="prod-hallmark-form" className="text-[9px] uppercase tracking-wider text-zinc-400 font-bold block px-1">Hallmark Stamp</label>
              <select
                id="prod-hallmark-form"
                value={getVal('hallmark', 'BIS 916 Government Certified')}
                onChange={(e) => updateField('hallmark', e.target.value)}
                className="w-full h-10 bg-white dark:bg-[#09090B] border border-solid border-zinc-200 dark:border-zinc-800 rounded-xl px-4 text-xs text-zinc-950 dark:text-zinc-100 focus:outline-none focus:border-zinc-900 dark:focus:border-zinc-200 cursor-pointer font-semibold"
              >
                <option value="BIS 916 Government Certified">BIS 916 Government Certified</option>
                <option value="IGI Diamond Certificate">IGI Diamond Certificate</option>
              </select>
            </div>
          </div>

          {getVal('priceCalculationMode', 'manual') === 'dynamic' && (
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 pt-2">
              <div className="space-y-1.5">
                <label htmlFor="prod-making-charge-type" className="text-[9px] uppercase tracking-wider text-zinc-400 font-bold block px-1">Making Charge Type</label>
                <select
                  id="prod-making-charge-type"
                  value={getVal('makingChargeType', 'percentage')}
                  onChange={(e) => updateField('makingChargeType', e.target.value)}
                  className="w-full h-10 bg-white dark:bg-[#09090B] border border-solid border-zinc-200 dark:border-zinc-800 rounded-xl px-4 text-xs text-zinc-950 dark:text-zinc-100 focus:outline-none focus:border-zinc-900 dark:focus:border-zinc-200 cursor-pointer font-semibold"
                >
                  <option value="percentage">Percentage (%)</option>
                  <option value="fixed">Fixed Price (₹)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="prod-making-charge-value" className="text-[9px] uppercase tracking-wider text-zinc-400 font-bold block px-1">
                  Making Charge {getVal('makingChargeType', 'percentage') === 'percentage' ? '(%)' : '(₹)'}
                </label>
                <input
                  id="prod-making-charge-value"
                  type="number"
                  placeholder={getVal('makingChargeType', 'percentage') === 'percentage' ? 'e.g. 12' : 'e.g. 1500'}
                  value={getVal('makingChargeValue', getVal('makingCharges', ''))}
                  onChange={(e) => {
                    updateField('makingChargeValue', e.target.value === '' ? '' : +e.target.value);
                    updateField('makingCharges', e.target.value === '' ? '' : +e.target.value);
                  }}
                  className="w-full h-10 bg-white dark:bg-zinc-905 border border-solid border-zinc-200 dark:border-zinc-800 rounded-xl px-4 text-xs text-zinc-905 dark:text-zinc-100 placeholder-zinc-450 focus:outline-none focus:border-zinc-900 dark:focus:border-zinc-200 font-semibold"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="prod-stone-price" className="text-[9px] uppercase tracking-wider text-zinc-400 font-bold block px-1">Stone/Diamond Price (₹)</label>
                <input
                  id="prod-stone-price"
                  type="number"
                  placeholder="e.g. 8500"
                  value={getVal('stonePrice', getVal('diamondValue', ''))}
                  onChange={(e) => {
                    updateField('stonePrice', e.target.value === '' ? '' : +e.target.value);
                    updateField('diamondValue', e.target.value === '' ? '' : +e.target.value);
                  }}
                  className="w-full h-10 bg-white dark:bg-zinc-905 border border-solid border-zinc-200 dark:border-zinc-800 rounded-xl px-4 text-xs text-zinc-905 dark:text-zinc-100 placeholder-zinc-450 focus:outline-none focus:border-zinc-900 dark:focus:border-zinc-200 font-semibold"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="prod-other-charges" className="text-[9px] uppercase tracking-wider text-zinc-400 font-bold block px-1">Other Charges (₹)</label>
                <input
                  id="prod-other-charges"
                  type="number"
                  placeholder="e.g. 450"
                  value={getVal('otherCharges', getVal('pearlsValue', ''))}
                  onChange={(e) => {
                    updateField('otherCharges', e.target.value === '' ? '' : +e.target.value);
                    updateField('pearlsValue', e.target.value === '' ? '' : +e.target.value);
                  }}
                  className="w-full h-10 bg-white dark:bg-zinc-905 border border-solid border-zinc-200 dark:border-zinc-800 rounded-xl px-4 text-xs text-zinc-905 dark:text-zinc-100 placeholder-zinc-450 focus:outline-none focus:border-zinc-900 dark:focus:border-zinc-200 font-semibold"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="prod-discount-form" className="text-[9px] uppercase tracking-wider text-zinc-400 font-bold block px-1">Discount Off Item (%)</label>
                <div className="relative">
                  <input
                    id="prod-discount-form"
                    type="number"
                    min="0"
                    max="100"
                    placeholder="e.g. 20"
                    value={getVal('discountPercent', 20)}
                    onChange={(e) => updateField('discountPercent', e.target.value === '' ? '' : +e.target.value)}
                    className="w-full h-10 bg-white dark:bg-zinc-905 border border-solid border-zinc-200 dark:border-zinc-800 rounded-xl pl-4 pr-16 text-xs text-zinc-905 dark:text-zinc-100 placeholder-zinc-450 focus:outline-none focus:border-zinc-900 dark:focus:border-zinc-200 font-semibold"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[10px] text-zinc-450 dark:text-zinc-500 font-extrabold select-none pointer-events-none">% OFF</span>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="prod-discountOffMaking-form" className="text-[9px] uppercase tracking-wider text-zinc-400 font-bold block px-1">Discount Off Making charge (%)</label>
              <div className="relative">
                <input
                  id="prod-discountOffMaking-form"
                  type="number"
                  min="0"
                  max="100"
                  placeholder="e.g. 15"
                  value={getVal('discountOffMaking')}
                  onChange={(e) => updateField('discountOffMaking', e.target.value === '' ? '' : +e.target.value)}
                  className="w-full h-10 bg-white dark:bg-zinc-905 border border-solid border-zinc-200 dark:border-zinc-800 rounded-xl pl-4 pr-16 text-xs text-zinc-905 dark:text-zinc-100 placeholder-zinc-450 focus:outline-none focus:border-zinc-900 dark:focus:border-zinc-200 font-semibold"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[10px] text-zinc-450 dark:text-zinc-500 font-extrabold select-none pointer-events-none">% OFF</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="prod-gst-form" className="text-[9px] uppercase tracking-wider text-zinc-400 font-bold block px-1">GST Rate (%)</label>
              <div className="relative">
                <input
                  id="prod-gst-form"
                  type="number"
                  min="0"
                  max="100"
                  step="0.5"
                  placeholder="e.g. 3"
                  value={getVal('gstPercent', 3)}
                  onChange={(e) => updateField('gstPercent', e.target.value === '' ? 3 : +e.target.value)}
                  className="w-full h-10 bg-white dark:bg-zinc-905 border border-solid border-amber-200 dark:border-amber-800/40 rounded-xl pl-4 pr-10 text-xs text-zinc-905 dark:text-zinc-100 placeholder-zinc-450 focus:outline-none focus:border-amber-400 dark:focus:border-amber-500 focus:ring-1 focus:ring-amber-400/20 font-semibold"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[10px] text-amber-500 dark:text-amber-400 font-extrabold select-none pointer-events-none">%</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="prod-badge-form" className="text-[9px] uppercase tracking-wider text-zinc-400 font-bold block px-1">Product Badge (e.g. Trending)</label>
              <input
                id="prod-badge-form"
                type="text"
                placeholder="e.g. Best Seller"
                value={getVal('badge')}
                onChange={(e) => updateField('badge', e.target.value)}
                className="w-full h-10 bg-white dark:bg-zinc-905 border border-solid border-zinc-200 dark:border-zinc-800 rounded-xl px-4 text-xs text-zinc-905 dark:text-zinc-100 placeholder-zinc-450 focus:outline-none focus:border-zinc-900 dark:focus:border-zinc-200 font-semibold"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="prod-stock-form" className="text-[9px] uppercase tracking-wider text-zinc-400 font-bold block px-1">Stock Status</label>
              <select
                id="prod-stock-form"
                value={getVal('stockStatus', 'In Stock')}
                onChange={(e) => updateField('stockStatus', e.target.value)}
                className="w-full h-10 bg-white dark:bg-[#09090B] border border-solid border-zinc-200 dark:border-zinc-800 rounded-xl px-4 text-xs text-zinc-950 dark:text-zinc-100 focus:outline-none focus:border-zinc-900 dark:focus:border-zinc-200 cursor-pointer font-semibold"
              >
                <option value="In Stock">In Stock (Available immediately)</option>
                <option value="Out of Stock">Out of Stock (Request Booking Only)</option>
                <option value="Preorder">Preorder (Making charges adjustments)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section: Size Customization Selector */}
        {(() => {
          const currentRingSizes = getVal('ringSizes', []);
          const currentBangleSizes = getVal('bangleSizes', []);
          const currentChainSizes = getVal('chainSizes', []);

          const selectedType = currentRingSizes.length > 0 
            ? 'rings' 
            : (currentBangleSizes.length > 0 ? 'bangles' : (currentChainSizes.length > 0 ? 'chains' : 'none'));

          return (
            <div className="space-y-4 pt-4 border-t border-solid border-zinc-100 dark:border-zinc-850 text-left">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                <h4 className="text-[10px] font-bold tracking-widest text-zinc-400 dark:text-zinc-500 uppercase">Size Selection Type</h4>
              </div>
              <div className="max-w-xs">
                <select
                  id="admin-size-type"
                  value={selectedType}
                  onChange={(e) => {
                    const type = e.target.value;
                    if (type === 'rings') {
                      const defaultRings = Array.from({ length: 34 - 6 + 1 }, (_, i) => { const num = 6 + i; return num < 10 ? `0${num}` : `${num}`; });
                      if (editingProduct) {
                        setEditingProduct({ ...editingProduct, ringSizes: defaultRings, bangleSizes: [], chainSizes: [] });
                      } else {
                        setNewProduct({ ...newProduct, ringSizes: defaultRings, bangleSizes: [], chainSizes: [] });
                      }
                    } else if (type === 'bangles') {
                      const defaultBangles = ['2-4', '2-6'];
                      if (editingProduct) {
                        setEditingProduct({ ...editingProduct, ringSizes: [], bangleSizes: defaultBangles, chainSizes: [] });
                      } else {
                        setNewProduct({ ...newProduct, ringSizes: [], bangleSizes: defaultBangles, chainSizes: [] });
                      }
                    } else if (type === 'chains') {
                      const defaultChains = ['16"', '18"', '20"'];
                      if (editingProduct) {
                        setEditingProduct({ ...editingProduct, ringSizes: [], bangleSizes: [], chainSizes: defaultChains });
                      } else {
                        setNewProduct({ ...newProduct, ringSizes: [], bangleSizes: [], chainSizes: defaultChains });
                      }
                    } else {
                      if (editingProduct) {
                        setEditingProduct({ ...editingProduct, ringSizes: [], bangleSizes: [], chainSizes: [] });
                      } else {
                        setNewProduct({ ...newProduct, ringSizes: [], bangleSizes: [], chainSizes: [] });
                      }
                    }
                  }}
                  className="w-full h-10 bg-white dark:bg-zinc-905 border border-solid border-zinc-200 dark:border-zinc-800 rounded-xl px-4 text-xs text-[#1A1A1A] focus:outline-none focus:border-amber-400 dark:focus:border-amber-500 focus:ring-1 focus:ring-amber-400/20 font-semibold cursor-pointer"
                >
                  <option value="none">No Size Selection (Coins/Earrings/Pendant)</option>
                  <option value="rings">Ring Size List</option>
                  <option value="bangles">Bangle Size List</option>
                  <option value="chains">Chain/Necklace Size List</option>
                </select>
              </div>

              {/* Section: Ring Sizes Option */}
              {selectedType === 'rings' && (
                <div className="space-y-4 pt-4 border-t border-solid border-zinc-100 dark:border-zinc-800/40">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-[#E6C687]"></span>
                      <h4 className="text-[10px] font-bold tracking-widest text-zinc-400 dark:text-zinc-500 uppercase">Available Ring Sizes (IND)</h4>
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          const allSizes = Array.from({ length: 34 - 6 + 1 }, (_, i) => {
                            const num = 6 + i;
                            return num < 10 ? `0${num}` : `${num}`;
                          });
                          if (editingProduct) {
                            setEditingProduct({ ...editingProduct, ringSizes: allSizes });
                          } else {
                            setNewProduct({ ...newProduct, ringSizes: allSizes });
                          }
                        }}
                        className="px-2 py-1 text-[9px] font-bold text-zinc-500 dark:text-zinc-450 hover:text-zinc-805 dark:hover:text-zinc-200 border border-solid border-zinc-200 dark:border-zinc-800 rounded-lg cursor-pointer bg-transparent"
                      >
                        Select All
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (editingProduct) {
                            setEditingProduct({ ...editingProduct, ringSizes: [] });
                          } else {
                            setNewProduct({ ...newProduct, ringSizes: [] });
                          }
                        }}
                        className="px-2 py-1 text-[9px] font-bold text-zinc-500 dark:text-zinc-455 hover:text-zinc-805 dark:hover:text-zinc-200 border border-solid border-zinc-200 dark:border-zinc-800 rounded-lg cursor-pointer bg-transparent"
                      >
                        Clear All
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-7 sm:grid-cols-10 md:grid-cols-15 gap-2">
                    {Array.from({ length: 34 - 6 + 1 }, (_, i) => {
                      const num = 6 + i;
                      const szStr = num < 10 ? `0${num}` : `${num}`;
                      const isSelected = currentRingSizes.includes(szStr);

                      return (
                        <button
                          key={szStr}
                          type="button"
                          onClick={() => {
                            let updatedSizes = [];
                            const defaultSizes = Array.from({ length: 34 - 6 + 1 }, (_, i) => {
                              const num = 6 + i;
                              return num < 10 ? `0${num}` : `${num}`;
                            });
                            const baseSizes = currentRingSizes.length > 0 ? currentRingSizes : defaultSizes;

                            if (baseSizes.includes(szStr)) {
                              updatedSizes = baseSizes.filter(s => s !== szStr);
                            } else {
                              updatedSizes = [...baseSizes, szStr].sort();
                            }

                            if (editingProduct) {
                              setEditingProduct({ ...editingProduct, ringSizes: updatedSizes });
                            } else {
                              setNewProduct({ ...newProduct, ringSizes: updatedSizes });
                            }
                          }}
                          className={`h-8 border border-solid flex items-center justify-center text-xs font-bold rounded-lg transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-zinc-950 text-white border-zinc-950 dark:bg-zinc-100 dark:text-zinc-955 dark:border-zinc-100 font-extrabold'
                              : 'bg-transparent text-zinc-400 border-zinc-200 dark:border-zinc-800 dark:text-zinc-600 hover:border-zinc-450'
                          }`}
                        >
                          {szStr}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Section: Bangle Sizes Option */}
              {selectedType === 'bangles' && (
                <div className="space-y-4 pt-4 border-t border-solid border-zinc-100 dark:border-zinc-800/40">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-[#E6C687]"></span>
                      <h4 className="text-[10px] font-bold tracking-widest text-zinc-400 dark:text-zinc-500 uppercase">Available Bangle Sizes</h4>
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          const BANGLE_SIZES = ['1-2','1-4','1-6','1-8','2-0','2-2','2-4','2-6','2-8','3-0','3-2','3-4'];
                          if (editingProduct) {
                            setEditingProduct({ ...editingProduct, bangleSizes: [...BANGLE_SIZES] });
                          } else {
                            setNewProduct({ ...newProduct, bangleSizes: [...BANGLE_SIZES] });
                          }
                        }}
                        className="px-2 py-1 text-[9px] font-bold text-zinc-500 dark:text-zinc-450 hover:text-zinc-805 dark:hover:text-zinc-200 border border-solid border-zinc-200 dark:border-zinc-800 rounded-lg cursor-pointer bg-transparent"
                      >
                        Select All
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (editingProduct) {
                            setEditingProduct({ ...editingProduct, bangleSizes: [] });
                          } else {
                            setNewProduct({ ...newProduct, bangleSizes: [] });
                          }
                        }}
                        className="px-2 py-1 text-[9px] font-bold text-zinc-500 dark:text-zinc-455 hover:text-zinc-805 dark:hover:text-zinc-200 border border-solid border-zinc-200 dark:border-zinc-800 rounded-lg cursor-pointer bg-transparent"
                      >
                        Clear All
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {['1-2','1-4','1-6','1-8','2-0','2-2','2-4','2-6','2-8','3-0','3-2','3-4'].map((sz) => {
                      const isSelected = currentBangleSizes.includes(sz);
                      return (
                        <button
                          key={sz}
                          type="button"
                          onClick={() => {
                            let updated = [];
                            if (currentBangleSizes.includes(sz)) {
                              updated = currentBangleSizes.filter(s => s !== sz);
                            } else {
                              updated = [...currentBangleSizes, sz];
                            }
                            if (editingProduct) {
                              setEditingProduct({ ...editingProduct, bangleSizes: updated });
                            } else {
                              setNewProduct({ ...newProduct, bangleSizes: updated });
                            }
                          }}
                          className={`h-8 px-3 border border-solid flex items-center justify-center text-xs font-bold rounded-lg transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-zinc-955 text-white border-zinc-955 dark:bg-zinc-100 dark:text-zinc-950 dark:border-zinc-100 font-extrabold'
                              : 'bg-transparent text-zinc-400 border-zinc-200 dark:border-zinc-800 dark:text-zinc-600 hover:border-zinc-450'
                          }`}
                        >
                          {sz}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Section: Chain Sizes Option */}
              {selectedType === 'chains' && (
                <div className="space-y-4 pt-4 border-t border-solid border-zinc-100 dark:border-zinc-800/40">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-[#E6C687]"></span>
                      <h4 className="text-[10px] font-bold tracking-widest text-zinc-400 dark:text-zinc-500 uppercase">Available Chain Sizes</h4>
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          const CHAIN_SIZES = ['12"', '14"', '16"', '18"', '20"', '22"', '24"', '26"', '28"', '30"', '32"', '34"', '36"'];
                          if (editingProduct) {
                            setEditingProduct({ ...editingProduct, chainSizes: [...CHAIN_SIZES] });
                          } else {
                            setNewProduct({ ...newProduct, chainSizes: [...CHAIN_SIZES] });
                          }
                        }}
                        className="px-2 py-1 text-[9px] font-bold text-zinc-500 dark:text-zinc-450 hover:text-zinc-805 dark:hover:text-zinc-200 border border-solid border-zinc-200 dark:border-zinc-800 rounded-lg cursor-pointer bg-transparent"
                      >
                        Select All
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (editingProduct) {
                            setEditingProduct({ ...editingProduct, chainSizes: [] });
                          } else {
                            setNewProduct({ ...newProduct, chainSizes: [] });
                          }
                        }}
                        className="px-2 py-1 text-[9px] font-bold text-zinc-500 dark:text-zinc-455 hover:text-zinc-805 dark:hover:text-zinc-200 border border-solid border-zinc-200 dark:border-zinc-800 rounded-lg cursor-pointer bg-transparent"
                      >
                        Clear All
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {['12"', '14"', '16"', '18"', '20"', '22"', '24"', '26"', '28"', '30"', '32"', '34"', '36"'].map((sz) => {
                      const isSelected = currentChainSizes.includes(sz);
                      return (
                        <button
                          key={sz}
                          type="button"
                          onClick={() => {
                            let updated = [];
                            if (currentChainSizes.includes(sz)) {
                              updated = currentChainSizes.filter(s => s !== sz);
                            } else {
                              updated = [...currentChainSizes, sz];
                            }
                            if (editingProduct) {
                              setEditingProduct({ ...editingProduct, chainSizes: updated });
                            } else {
                              setNewProduct({ ...newProduct, chainSizes: updated });
                            }
                          }}
                          className={`h-8 px-3 border border-solid flex items-center justify-center text-xs font-bold rounded-lg transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-zinc-950 text-white border-zinc-955 dark:bg-zinc-105 dark:text-zinc-950 dark:border-zinc-100 font-extrabold'
                              : 'bg-transparent text-zinc-400 border-zinc-200 dark:border-zinc-800 dark:text-zinc-600 hover:border-zinc-450'
                          }`}
                        >
                          {sz}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })()}

        {/* Section: Media Assets / Gallery */}
        <div className="space-y-4 pt-4 border-t border-solid border-zinc-100 dark:border-zinc-850 text-left">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-[#E6C687]"></span>
            <h4 className="text-[10px] font-bold tracking-widest text-zinc-400 dark:text-zinc-500 uppercase">Jewellery Assets / Gallery</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Main Cover Image Uploader Card */}
            <div className="bg-zinc-50 dark:bg-zinc-900/40 border border-solid border-zinc-200 dark:border-zinc-800 p-5 rounded-xl space-y-4">
              <div>
                <span className="text-[10px] font-extrabold text-zinc-800 dark:text-zinc-300 block mb-1">Primary Cover Image</span>
                <p className="text-[9px] text-zinc-400 dark:text-zinc-500 font-medium mb-3">Upload a clean webp/png catalog cover image.</p>
                <input
                  id="prod-image-picker"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, editingProduct ? 'edit' : 'new')}
                  className="text-xs text-zinc-500 font-semibold"
                />
                {imageUploadProgress && <p className="text-[9px] text-[#BCA057] mt-1.5 font-bold">{imageUploadProgress}</p>}
              </div>
              {getVal('img') && (
                <div className="relative w-20 h-24 rounded-lg overflow-hidden border border-solid border-zinc-200 dark:border-zinc-800">
                  <img
                    src={getVal('img')}
                    alt="Cover preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>

            {/* Sub-gallery Uploader Card */}
            <div className="bg-zinc-50 dark:bg-zinc-900/40 border border-solid border-zinc-200 dark:border-zinc-800 p-5 rounded-xl space-y-4">
              <div>
                <span className="text-[10px] font-extrabold text-zinc-800 dark:text-zinc-300 block mb-1">Sub Gallery Media</span>
                <p className="text-[9px] text-zinc-400 dark:text-zinc-500 font-medium mb-3">Upload secondary angles images or showcasing videos.</p>
                <input
                  type="file"
                  accept="image/*,video/*"
                  multiple
                  disabled={!getVal('img')}
                  onChange={(e) => handleSubImagesUpload(e, editingProduct ? 'edit' : 'new')}
                  className="text-xs text-zinc-500 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                />
                {subImagesUploadProgress && <p className="text-[9px] text-[#BCA057] mt-1.5 font-bold">{subImagesUploadProgress}</p>}
              </div>

              {/* List of sub-images */}
              {(getVal('subImages', [])).length > 0 && (
                <div className="flex flex-wrap gap-2.5">
                  {(getVal('subImages', [])).map((subImg, idx) => (
                    <div key={idx} className="relative group w-12 h-14 rounded overflow-hidden border border-solid border-zinc-200 dark:border-zinc-805">
                      {isVideoUrl(subImg) ? (
                        <div className="w-full h-full relative bg-black">
                          <video src={subImg} className="w-full h-full object-cover" muted />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                            <span className="text-[9px]"></span>
                          </div>
                        </div>
                      ) : (
                        <img src={subImg} alt="" className="w-full h-full object-cover" />
                      )}
                      <button
                        type="button"
                        onClick={() => handleRemoveSubImage(idx, editingProduct ? 'edit' : 'new')}
                        className="absolute inset-0 bg-red-500/80 hover:bg-red-650 opacity-0 group-hover:opacity-100 text-white text-[9px] font-bold uppercase transition-opacity flex items-center justify-center cursor-pointer border-none"
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Form submits actions */}
        <div className="flex gap-3 pt-4 border-t border-solid border-zinc-100 dark:border-zinc-850 text-left">
          <button
            type="submit"
            disabled={categories.length === 0 && !editingProduct}
            className="h-10 px-8 bg-zinc-950 hover:bg-zinc-850 dark:bg-zinc-100 dark:hover:bg-zinc-200 text-white dark:text-zinc-950 font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-xs disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer border-none font-bold text-center"
          >
            {editingProduct ? 'Save Jewellery Changes' : 'Publish Product to Catalog'}
          </button>
          {editingProduct && (
            <button
              type="button"
              onClick={() => setEditingProduct(null)}
              className="h-10 px-6 border border-solid border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-650 dark:text-zinc-350 font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all cursor-pointer"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
