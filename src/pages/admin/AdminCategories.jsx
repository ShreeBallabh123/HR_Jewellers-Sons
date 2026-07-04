import React, { useState } from 'react';
import { db } from '../../firebase';
import { productsApi } from '../../api/products.api';
import { ImageUploadService } from '../../services/ImageUploadService';
import { Trash2 } from 'lucide-react';
import { doc, deleteDoc } from 'firebase/firestore';

export default function AdminCategories({
  categories = [],
  setAdminNotification
}) {
  const [newCatName, setNewCatName] = useState('');
  const [newCatId, setNewCatId] = useState('');
  const [newCatDesc, setNewCatDesc] = useState('');
  const [newCatImg, setNewCatImg] = useState('');

  const [catImageUploadProgress, setCatImageUploadProgress] = useState('');

  // Category banner image upload
  const handleCatImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setCatImageUploadProgress('Uploading Category Image...');
    try {
      const res = await ImageUploadService.uploadImage(file);
      setNewCatImg(res.url);
      setCatImageUploadProgress('Uploaded!');
    } catch (err) {
      console.error(err);
      setCatImageUploadProgress('Upload failed.');
    }
  };

  // Save new category
  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!newCatName.trim() || !newCatId.trim()) return;

    try {
      await productsApi.createCategory({
        id: newCatId.trim(),
        name: newCatName.trim(),
        desc: newCatDesc.trim(),
        img: newCatImg.trim(),
        createdDate: new Date().toISOString()
      });
      setNewCatName('');
      setNewCatId('');
      setNewCatDesc('');
      setNewCatImg('');
      setCatImageUploadProgress('');
      setAdminNotification({ message: 'Category established successfully!', type: 'success' });
    } catch (err) {
      console.error(err);
      setAdminNotification({ message: 'Failed to create category.', type: 'error' });
    }
  };

  // Delete category
  const handleDeleteCategory = async (catDocId) => {
    if (window.confirm("Remove this Category tab from published lists?")) {
      try {
        await deleteDoc(doc(db, 'categories', catDocId));
        setAdminNotification({ message: 'Category removed.', type: 'success' });
      } catch (err) {
        console.error(err);
        setAdminNotification({ message: 'Failed to remove category.', type: 'error' });
      }
    }
  };

  return (
    <div className="space-y-6 text-[#1A1A1A] dark:text-zinc-100 font-sans text-left w-full overflow-x-hidden">
      
      {/* Category Creation Form */}
      <div className="bg-white dark:bg-[#15151A] border border-solid border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
        <div>
          <h3 className="text-base font-black tracking-wider text-zinc-900 dark:text-[#E6C687] uppercase">Create Catalog Portfolio</h3>
          <p className="text-[10px] text-zinc-400 dark:text-zinc-550 font-semibold">Establish new categories layout tabs, describe collections themes, and configure banner assets.</p>
        </div>

        <form onSubmit={handleAddCategory} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div className="space-y-1.5">
              <label htmlFor="cat-name" className="text-[9px] uppercase tracking-wider text-zinc-450 font-bold block px-1">Category Name</label>
              <input
                id="cat-name"
                type="text"
                required
                placeholder="e.g. Royal Solitaires"
                value={newCatName}
                onChange={(e) => {
                  setNewCatName(e.target.value);
                  // Auto-generate target slug ID from name
                  setNewCatId(e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''));
                }}
                className="w-full h-10 bg-white dark:bg-zinc-905 border border-solid border-zinc-200 dark:border-zinc-800 rounded-xl px-4 text-xs focus:outline-none focus:border-zinc-900 dark:focus:border-zinc-200 font-semibold"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="cat-id" className="text-[9px] uppercase tracking-wider text-zinc-455 font-bold block px-1">Category Code/Slug</label>
              <input
                id="cat-id"
                type="text"
                required
                placeholder="e.g. royal-solitaires"
                value={newCatId}
                onChange={(e) => setNewCatId(e.target.value)}
                className="w-full h-10 bg-white dark:bg-zinc-905 border border-solid border-zinc-200 dark:border-zinc-800 rounded-xl px-4 text-xs focus:outline-none focus:border-zinc-900 dark:focus:border-zinc-200 font-mono font-bold"
              />
            </div>

          </div>

          <div className="space-y-1.5">
            <label htmlFor="cat-desc" className="text-[9px] uppercase tracking-wider text-zinc-455 font-bold block px-1">Portfolio Description</label>
            <textarea
              id="cat-desc"
              rows="2"
              placeholder="e.g. Exquisite handcrafted rings featuring signature single diamonds settings."
              value={newCatDesc}
              onChange={(e) => setNewCatDesc(e.target.value)}
              className="w-full p-4 bg-white dark:bg-zinc-905 border border-solid border-zinc-200 dark:border-zinc-800 rounded-xl text-xs focus:outline-none resize-none font-semibold"
            />
          </div>

          {/* Banner image upload */}
          <div className="bg-zinc-50 dark:bg-zinc-900/50 p-4 border border-solid border-zinc-200 dark:border-zinc-800 rounded-xl space-y-4 max-w-md">
            <div>
              <span className="text-[10px] font-extrabold text-zinc-800 dark:text-zinc-300 block mb-1">Category Showcase banner</span>
              <p className="text-[9px] text-zinc-400 dark:text-zinc-550 font-medium mb-3">Upload a clean catalog portfolio visual banner.</p>
              <input
                type="file"
                accept="image/*"
                onChange={handleCatImageUpload}
                className="text-xs text-zinc-500 font-semibold"
              />
              {catImageUploadProgress && <p className="text-[9px] text-[#BCA057] mt-1 font-bold">{catImageUploadProgress}</p>}
            </div>
            {newCatImg && (
              <div className="relative w-28 h-16 rounded overflow-hidden border border-solid border-zinc-200 dark:border-zinc-800">
                <img src={newCatImg} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>

          <button
            type="submit"
            className="px-6 py-2.5 bg-zinc-950 hover:bg-zinc-850 dark:bg-zinc-100 dark:hover:bg-zinc-200 text-white dark:text-zinc-955 text-xs uppercase font-bold tracking-widest rounded-xl transition-all shadow-xs border-none cursor-pointer"
          >
            Establish Category
          </button>
        </form>
      </div>

      {/* Categories directory */}
      <div className="bg-white dark:bg-[#15151A] border border-solid border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xs">
        <div className="border-b border-solid border-zinc-100 dark:border-zinc-850 pb-4">
          <h3 className="text-base font-black tracking-wider text-zinc-900 dark:text-[#E6C687] uppercase">Category Directory</h3>
          <p className="text-[10px] text-zinc-400 dark:text-zinc-500 font-medium mt-0.5">Catalog structure tabs displayed on showroom storefront lists.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {categories.length === 0 ? (
            <p className="text-xs text-zinc-455 py-8 text-center sm:col-span-3">No categories catalog created</p>
          ) : (
            categories.map(cat => (
              <div key={cat.id} className="relative group bg-zinc-50 dark:bg-[#121216] border border-solid border-zinc-200 dark:border-zinc-850 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-zinc-400 dark:hover:border-zinc-700 transition-colors shadow-xs">
                
                {/* Visual */}
                <div className="aspect-[2/1] w-full bg-zinc-150 dark:bg-zinc-900 relative overflow-hidden border-b border-solid border-zinc-200 dark:border-zinc-850">
                  {cat.img ? (
                    <img src={cat.img} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[10px] font-mono text-zinc-400">no banner asset</div>
                  )}
                  <div className="absolute top-2 right-2">
                    <button
                      onClick={() => handleDeleteCategory(cat.docId || cat.id)}
                      className="p-1.5 rounded-lg bg-red-500/80 hover:bg-red-650 text-white cursor-pointer border-none"
                      title="Remove Category"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="p-4 space-y-1.5 text-xs">
                  <h4 className="font-extrabold text-zinc-900 dark:text-zinc-100 uppercase tracking-wide">
                    {cat.name}
                  </h4>
                  <span className="font-mono text-[9px] text-[#BCA057] block">ID: {cat.id}</span>
                  <p className="text-[10px] text-zinc-505 dark:text-zinc-450 leading-relaxed font-semibold">
                    {cat.desc || 'No collection summary provided.'}
                  </p>
                </div>

              </div>
            ))
          )}
        </div>
      </div>

    </div>
  );
}
