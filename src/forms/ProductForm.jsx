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
  handleRemoveImage,
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

  const FloatingInput = ({
    id,
    label,
    type = 'text',
    field,
    required = false,
    min,
    max,
    step,
    suffix,
    onChange,
    placeholder,
    className = ""
  }) => {
    const value = getVal(field);
    const handleChange = onChange || ((e) => {
      const val = e.target.value;
      updateField(field, type === 'number' ? (val === '' ? '' : +val) : val);
    });

    return (
      <div className={`flex flex-col gap-1.5 text-left ${className}`}>
        <label
          htmlFor={id}
          className="text-[10px] font-bold tracking-wider text-zinc-400 dark:text-zinc-500 uppercase"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <div className="relative">
          <input
            id={id}
            type={type}
            min={min}
            max={max}
            step={step}
            placeholder={placeholder || `Enter ${label}`}
            value={value}
            onChange={handleChange}
            className={`w-full h-10 bg-white dark:bg-zinc-905 border border-solid border-zinc-200 dark:border-zinc-800 rounded-xl px-4 ${suffix ? 'pr-16' : ''} text-xs text-zinc-950 dark:text-zinc-100 placeholder-zinc-300 dark:placeholder-zinc-600 focus:outline-none focus:border-[#B8893C] dark:focus:border-[#E6C687] focus:ring-1 focus:ring-[#B8893C]/20 font-semibold`}
            required={required}
          />
          {suffix && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-zinc-450 dark:text-zinc-500 font-extrabold select-none pointer-events-none">
              {suffix}
            </span>
          )}
        </div>
      </div>
    );
  };

  const FloatingSelect = ({
    id,
    label,
    field,
    required = false,
    onChange,
    children,
    className = ""
  }) => {
    const value = getVal(field);
    const handleChange = onChange || ((e) => updateField(field, e.target.value));

    return (
      <div className={`flex flex-col gap-1.5 text-left ${className}`}>
        <label
          htmlFor={id}
          className="text-[10px] font-bold tracking-wider text-zinc-400 dark:text-zinc-500 uppercase"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <select
          id={id}
          value={value}
          onChange={handleChange}
          className="w-full h-10 bg-white dark:bg-[#09090B] border border-solid border-zinc-200 dark:border-zinc-800 rounded-xl px-4 text-xs text-zinc-950 dark:text-zinc-100 focus:outline-none focus:border-[#B8893C] dark:focus:border-[#E6C687] cursor-pointer font-semibold"
          required={required}
        >
          {children}
        </select>
      </div>
    );
  };

  const FloatingTextarea = ({
    id,
    label,
    field,
    required = false,
    rows = "2",
    placeholder
  }) => {
    const value = getVal(field);
    return (
      <div className="flex flex-col gap-1.5 text-left">
        <label
          htmlFor={id}
          className="text-[10px] font-bold tracking-wider text-zinc-400 dark:text-zinc-500 uppercase"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <textarea
          id={id}
          rows={rows}
          placeholder={placeholder || `Enter ${label}`}
          value={value}
          onChange={(e) => updateField(field, e.target.value)}
          className="w-full bg-white dark:bg-zinc-905 border border-solid border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-xs text-zinc-950 dark:text-zinc-100 placeholder-zinc-300 dark:placeholder-zinc-600 focus:outline-none focus:border-[#B8893C] dark:focus:border-[#E6C687] resize-none font-semibold"
          required={required}
        ></textarea>
      </div>
    );
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
            <FloatingInput
              id="prod-name-form"
              label="Jewellery Name"
              field="name"
              required
              className="col-span-2"
            />
            <FloatingInput
              id="prod-sku-form"
              label="SKU Code"
              field="sku"
              required
            />
             <FloatingSelect
              id="prod-category-form"
              label="Category Portfolio"
              field="category"
              required
            >
              <option value="">Select Category Portfolio</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </FloatingSelect>
            <FloatingSelect
              id="prod-categoryType-form"
              label="Metal Type"
              field="categoryType"
              required
            >
              <option value="">Select Metal Type</option>
              <option value="Gold">Gold</option>
              <option value="925 Sterling Silver">925 Sterling Silver</option>
              <option value="Normal Silver">Normal Silver</option>
              <option value="999 Silver">999 Silver</option>
            </FloatingSelect>
            {/* Silver Weight — show only when 999 Silver is selected */}
            {getVal('categoryType') === '999 Silver' && (
              <FloatingSelect
                id="prod-silverWeight-form"
                label="Silver Weight"
                field="silverWeight"
              >
                <option value="">Select Silver Weight</option>
                <option value="500 gm">500 gm</option>
                <option value="1 Kg">1 Kg</option>
              </FloatingSelect>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FloatingSelect
              id="prod-gender-form"
              label="Gender"
              field="gender"
            >
              <option value="">Select Gender</option>
              <option value="Unisex">Unisex</option>
              <option value="Women">Women</option>
              <option value="Men">Men</option>
              <option value="Kids">Kids</option>
            </FloatingSelect>
            <FloatingSelect
              id="prod-occasion-form"
              label="Occasion"
              field="occasion"
            >
              <option value="">Select Occasion</option>
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
            </FloatingSelect>
          </div>

          <FloatingTextarea
            id="prod-desc-form"
            label="Jewellery Parameters & Details Description"
            field="desc"
            required
          />
        </div>

        {/* Section: Metal Specifications */}
        <div className="space-y-4 pt-4 border-t border-solid border-zinc-100 dark:border-zinc-850 text-left">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-[#E6C687]"></span>
            <h4 className="text-[10px] font-bold tracking-widest text-zinc-400 dark:text-zinc-500 uppercase">Metal Specifications</h4>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <FloatingSelect
              id="prod-carat-form"
              label="Carat & Purity"
              field="carat"
              onChange={(e) => {
                const val = e.target.value;
                if (editingProduct) {
                  setEditingProduct({ ...editingProduct, carat: val, metalPurity: val });
                } else {
                  setNewProduct({ ...newProduct, carat: val, metalPurity: val });
                }
              }}
            >
              <option value="">Select Carat & Purity</option>
              <option value="9K">9K</option>
              <option value="14K">14K</option>
              <option value="18K">18K</option>
              <option value="20K">20K</option>
              <option value="22K">22K</option>
              <option value="24K">24K (Pure Gold)</option>
              <option value="92.5">92.5 (Silver)</option>
            </FloatingSelect>

            <FloatingInput
              id="prod-netWeight-form"
              label="Net Weight"
              field="netWeight"
            />

            <div className="relative">
              <FloatingInput
                id="prod-grossWeight-form"
                label="Gross Weight"
                field="grossWeight"
                onChange={(e) => {
                  const val = e.target.value;
                  if (editingProduct) {
                    setEditingProduct({ ...editingProduct, grossWeight: val, weight: val });
                  } else {
                    setNewProduct({ ...newProduct, grossWeight: val, weight: val });
                  }
                }}
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

            <FloatingInput
              id="prod-dimensions-form"
              label="Product Dimensions"
              field="productDimensions"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FloatingSelect
              id="prod-metalColor-form"
              label="Metal Color/Finishing"
              field="metalColor"
            >
              <option value="">Select Metal Color/Finishing</option>
              <option value="Yellow Gold">Yellow Gold</option>
              <option value="Rose Gold">Rose Gold</option>
              <option value="White Gold">White Gold</option>
              <option value="Platinum Plated Silver">Platinum Plated Silver</option>
              <option value="Rose Gold Plated Silver">Rose Gold Plated Silver</option>
              <option value="Gold Plated Silver">Gold Plated Silver</option>
            </FloatingSelect>
          </div>
        </div>

        {/* Section: Diamonds & Gemstones Details */}
        <div className="space-y-4 pt-4 border-t border-solid border-zinc-100 dark:border-zinc-850 text-left">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-[#E6C687]"></span>
            <h4 className="text-[10px] font-bold tracking-widest text-zinc-400 dark:text-zinc-500 uppercase">Diamonds &amp; Stone Details</h4>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-6 gap-4">
            <FloatingSelect
              id="prod-diamondShape-form"
              label="Diamond Shape"
              field="diamondShape"
            >
              <option value="">Select Diamond Shape</option>
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
            </FloatingSelect>

            <FloatingInput
              id="prod-diamondWeight-form"
              label="Diamond Weight"
              field="diamondWeight"
            />

            <FloatingSelect
              id="prod-diamondColor-form"
              label="Color Grade"
              field="diamondColor"
            >
              <option value="">Select Color Grade</option>
              <option value="EF">EF</option>
              <option value="GH">GH</option>
              <option value="HI">HI</option>
              <option value="IJ">IJ</option>
              <option value="JK">JK</option>
              <option value="KL">KL</option>
              <option value="LM">LM</option>
              <option value="NZ">NZ</option>
              <option value="DF">DF</option>
            </FloatingSelect>

            <FloatingSelect
              id="prod-diamondClarity-form"
              label="Clarity Grade"
              field="diamondClarity"
            >
              <option value="">Select Clarity Grade</option>
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
            </FloatingSelect>

            <FloatingSelect
              id="prod-diamondCut-form"
              label="Cut Grade"
              field="diamondCut"
            >
              <option value="">Select Cut Grade</option>
              <option value="Excellent">Excellent</option>
              <option value="Very Good">Very Good</option>
              <option value="Good">Good</option>
              <option value="Fair">Fair</option>
              <option value="Poor">Poor</option>
            </FloatingSelect>

            <FloatingInput
              id="prod-diamondQuantity-form"
              label="Diamond Pcs"
              field="diamondQuantity"
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <FloatingInput
              id="prod-diamondValue-form"
              label="Diamond Value"
              field="diamondValue"
              type="number"
            />

            <FloatingInput
              id="prod-stoneCarat-form"
              label="Stone weight"
              field="stoneCarat"
            />

            <FloatingInput
              id="prod-beadsCarat-form"
              label="Beads weight"
              field="beadsCarat"
            />

            <FloatingInput
              id="prod-pearlsCarat-form"
              label="Pearls weight"
              field="pearlsCarat"
            />

            <FloatingInput
              id="prod-gemstoneCarat-form"
              label="Gemstone weight"
              field="gemstoneCarat"
            />

            <FloatingInput
              id="prod-polki-form"
              label="Polki weight"
              field="polki"
            />

            <FloatingInput
              id="prod-polkiValue-form"
              label="Polki Value"
              field="polkiValue"
              type="number"
            />

            <FloatingInput
              id="prod-pearlsValue-form"
              label="Other Value"
              field="pearlsValue"
              type="number"
            />

            <FloatingInput
              id="prod-discountOffDiamond-form"
              label="Discount Off Diamond"
              field="discountOffDiamond"
              type="number"
              min="0"
              max="100"
              suffix="% OFF"
              className="col-span-2"
            />
          </div>
        </div>

        {/* Section: Pricing & Commercial details */}
        <div className="space-y-4 pt-4 border-t border-solid border-zinc-100 dark:border-zinc-850 text-left">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-[#E6C687]"></span>
            <h4 className="text-[10px] font-bold tracking-widest text-zinc-400 dark:text-zinc-500 uppercase">Pricing &amp; Commercials</h4>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <FloatingSelect
              id="prod-calc-mode"
              label="Price Mode"
              field="priceCalculationMode"
              onChange={(e) => updateField('priceCalculationMode', e.target.value)}
            >
              <option value="manual">Manual (Fixed Price)</option>
              <option value="dynamic">Dynamic (Auto Recalculate)</option>
            </FloatingSelect>

            {getVal('priceCalculationMode', 'manual') === 'manual' ? (
              <FloatingInput
                id="prod-price-form"
                label="Fixed Selling Price (INR)"
                field="price"
                type="number"
                required={getVal('priceCalculationMode', 'manual') === 'manual'}
              />
            ) : (
              <>
                <FloatingSelect
                  id="prod-purity-form"
                  label="Gold Purity"
                  field="goldPurity"
                  onChange={(e) => {
                    updateField('goldPurity', e.target.value);
                    updateField('carat', e.target.value);
                  }}
                >
                  <option value="24K">24K (Pure Gold)</option>
                  <option value="22K">22K (Standard)</option>
                  <option value="18K">18K (Premium)</option>
                  <option value="14K">14K (Economy)</option>
                </FloatingSelect>

                <FloatingInput
                  id="prod-gold-weight-form"
                  label="Gold Weight (grams)"
                  field="goldWeight"
                  type="number"
                  step="0.001"
                  onChange={(e) => {
                    updateField('goldWeight', e.target.value === '' ? '' : +e.target.value);
                    updateField('netWeight', e.target.value === '' ? '' : +e.target.value);
                  }}
                  required={getVal('priceCalculationMode', 'manual') === 'dynamic'}
                />
              </>
            )}

            <FloatingSelect
              id="prod-hallmark-form"
              label="Hallmark Stamp"
              field="hallmark"
            >
              <option value="BIS 916 Government Certified">BIS 916 Government Certified</option>
              <option value="IGI Diamond Certificate">IGI Diamond Certificate</option>
            </FloatingSelect>
          </div>

          {getVal('priceCalculationMode', 'manual') === 'dynamic' && (
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 pt-2">
              <FloatingSelect
                id="prod-making-charge-type"
                label="Making Charge Type"
                field="makingChargeType"
                onChange={(e) => updateField('makingChargeType', e.target.value)}
              >
                <option value="percentage">Percentage (%)</option>
                <option value="fixed">Fixed Price (₹)</option>
              </FloatingSelect>

              <FloatingInput
                id="prod-making-charge-value"
                label={`Making Charge ${getVal('makingChargeType', 'percentage') === 'percentage' ? '(%)' : '(₹)'}`}
                field="makingChargeValue"
                type="number"
                onChange={(e) => {
                  updateField('makingChargeValue', e.target.value === '' ? '' : +e.target.value);
                  updateField('makingCharges', e.target.value === '' ? '' : +e.target.value);
                }}
              />

              <FloatingInput
                id="prod-stone-price"
                label="Stone/Diamond Price"
                field="stonePrice"
                type="number"
                onChange={(e) => {
                  updateField('stonePrice', e.target.value === '' ? '' : +e.target.value);
                  updateField('diamondValue', e.target.value === '' ? '' : +e.target.value);
                }}
              />

              <FloatingInput
                id="prod-other-charges"
                label="Other Charges"
                field="otherCharges"
                type="number"
                onChange={(e) => {
                  updateField('otherCharges', e.target.value === '' ? '' : +e.target.value);
                  updateField('pearlsValue', e.target.value === '' ? '' : +e.target.value);
                }}
              />

              <FloatingInput
                id="prod-discount-form"
                label="Discount Off Item"
                field="discountPercent"
                type="number"
                min="0"
                max="100"
                suffix="% OFF"
              />
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <FloatingInput
              id="prod-discountOffMaking-form"
              label="Discount Off Making charge"
              field="discountOffMaking"
              type="number"
              min="0"
              max="100"
              suffix="% OFF"
            />

            <FloatingInput
              id="prod-gst-form"
              label="GST Rate"
              field="gstPercent"
              type="number"
              min="0"
              max="100"
              step="0.5"
              suffix="%"
              onChange={(e) => updateField('gstPercent', e.target.value === '' ? 3 : +e.target.value)}
            />

            <FloatingInput
              id="prod-badge-form"
              label="Product Badge"
              field="badge"
            />

            <FloatingSelect
              id="prod-stock-form"
              label="Stock Status"
              field="stockStatus"
            >
              <option value="">Select Stock Status</option>
              <option value="In Stock">In Stock (Available immediately)</option>
              <option value="Out of Stock">Out of Stock (Request Booking Only)</option>
              <option value="Preorder">Preorder (Making charges adjustments)</option>
            </FloatingSelect>
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
                <div className="relative group w-20 h-24 rounded-lg overflow-hidden border border-solid border-zinc-200 dark:border-zinc-800">
                  <img
                    src={getVal('img')}
                    alt="Cover preview"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(editingProduct ? 'edit' : 'new')}
                    className="absolute inset-0 bg-red-500/80 hover:bg-red-650 opacity-0 group-hover:opacity-100 text-white text-[9px] font-bold uppercase transition-opacity flex items-center justify-center cursor-pointer border-none"
                  >
                    Delete
                  </button>
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
                  onChange={(e) => handleSubImagesUpload(e, editingProduct ? 'edit' : 'new')}
                  className="text-xs text-zinc-500 font-semibold"
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
