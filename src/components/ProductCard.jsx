import React from 'react';
import { Heart } from 'lucide-react';
import { useRates } from '../hooks/useRates';

export default function ProductCard({
  product,
  isWishlisted = false,
  onWishlistToggle,
  onAddToCart,
  onClick
}) {
  const { calculatePrice, formatPrice } = useRates();

  const prices = calculatePrice(product);
  const displayPrice = prices.total;

  return (
    <div
      onClick={onClick}
      className="group relative flex flex-col justify-between p-4 rounded-3xl bg-white border border-solid border-slate-100 hover:border-gold/30 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_15px_40px_rgba(200,166,70,0.08)] transition-all duration-500 cursor-pointer overflow-hidden text-[#4A126D]"
    >
      {/* Visual Image Section */}
      <div className="relative aspect-square rounded-2xl bg-zinc-55 flex items-center justify-center p-4 overflow-hidden">
        <img
          src={product.img}
          alt={product.name}
          loading="lazy"
          className="max-w-full max-h-full object-contain transition-transform duration-700 group-hover:scale-105"
        />

        {/* Floating Badges */}
        {product.badge && (
          <span className="absolute top-3 left-3 px-2 py-0.5 text-[7px] font-sans font-bold tracking-widest text-[#4A126D] bg-gold rounded uppercase shadow-sm">
            {product.badge}
          </span>
        )}

        {/* Wishlist Heart Toggler */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (typeof onWishlistToggle === 'function') {
              onWishlistToggle({
                id: product.id,
                name: product.name,
                price: displayPrice,
                img: product.img,
                weight: product.weight,
                carat: product.carat
              });
            }
          }}
          className={`absolute top-3 right-3 p-2.5 rounded-full border border-solid transition-all duration-300 cursor-pointer ${
            isWishlisted
              ? 'bg-[#DDA0DD] border-[#DDA0DD] text-white scale-110'
              : 'border-slate-100 bg-white/80 hover:bg-white text-zinc-400 hover:text-red-500 shadow-sm'
          }`}
          title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
        >
          <Heart className="w-3.5 h-3.5" fill={isWishlisted ? "currentColor" : "none"} />
        </button>
      </div>

      {/* Info details */}
      <div className="mt-4 flex-grow flex flex-col justify-between text-left">
        <div>
          <span className="text-[8px] font-sans font-bold uppercase tracking-widest text-zinc-400">
            {product.metal?.toUpperCase() || 'GOLD'} • {product.carat || '22K'}
          </span>
          <h4 className="serif-luxury text-sm font-bold tracking-wide mt-1 line-clamp-1">
            {product.name}
          </h4>
          <p className="text-[10px] text-zinc-500 font-light mt-1.5 line-clamp-2 leading-relaxed">
            {product.desc || product.description}
          </p>
        </div>

        <div>
          {/* Price Tag info */}
          <div className="mt-3 flex items-center justify-between border-t border-solid border-slate-50 pt-3">
            <div className="flex flex-col">
              <span className="text-[7.5px] uppercase font-sans tracking-wider text-zinc-400 font-bold leading-none">Price estimate</span>
              <span className="font-sans text-[13px] font-extrabold text-[#1A1A1A] mt-1">
                {formatPrice(displayPrice)}
              </span>
            </div>
            {product.weight && (
              <span className="text-[9px] font-sans font-bold text-gold border border-solid border-gold/25 px-2 py-0.5 rounded-full bg-gold/5 shrink-0">
                {product.weight}
              </span>
            )}
          </div>

          {/* Quick Bag action */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (typeof onAddToCart === 'function') {
                onAddToCart({
                  id: product.id,
                  name: product.name,
                  price: displayPrice,
                  img: product.img,
                  weight: product.weight,
                  carat: product.carat
                });
              }
            }}
            className="w-full mt-4 py-2.5 rounded-xl bg-gradient-to-r from-gold to-[#DDA0DD] hover:from-[#DDA0DD] hover:to-gold text-[#4A126D] text-[9px] uppercase font-bold tracking-widest transition-all transform hover:-translate-y-0.5 hover:shadow-md cursor-pointer border-none font-bold text-center"
          >
            Add to Bag
          </button>
        </div>
      </div>
    </div>
  );
}
