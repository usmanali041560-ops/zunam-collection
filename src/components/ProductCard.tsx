import React from 'react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';
import { Star, Sparkles, ArrowRight, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { navigateTo } = useStore();

  const discountPercent = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <div 
      onClick={() => navigateTo('product-detail', product.id)}
      className="group cursor-pointer rounded-xl bg-zinc-900/60 border border-zinc-800/80 hover:border-amber-500/50 hover:bg-zinc-900 transition-all duration-300 flex flex-col overflow-hidden hover:shadow-[0_10px_30px_-10px_rgba(212,175,55,0.2)]"
    >
      {/* Product Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-950 flex items-center justify-center">
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            // Fallback for resilient visual presentation
            (e.target as HTMLElement).style.display = 'none';
          }}
        />

        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
          {product.isBestSeller && (
            <span className="bg-amber-500 text-black text-[10px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded shadow-sm">
              Bestseller
            </span>
          )}
          {product.isNew && (
            <span className="bg-zinc-800/90 text-zinc-100 border border-zinc-700 text-[10px] font-medium tracking-wider uppercase px-2 py-0.5 rounded">
              New Craft
            </span>
          )}
        </div>

        {discountPercent && (
          <div className="absolute top-3 right-3 bg-red-950/80 border border-red-500/40 text-red-300 text-[11px] font-bold px-2 py-0.5 rounded backdrop-blur-sm z-10">
            Save {discountPercent}%
          </div>
        )}

        {/* Hover Quick View Ribbon */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex items-center justify-between text-xs text-amber-300 font-medium">
          <span>{product.isCustomizable ? 'Personalize with Custom Name' : 'View Specifications'}</span>
          <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
        <div>
          {/* Category & Customization Tag (Unboxed clean text) */}
          <div className="flex items-center gap-2 text-xs text-zinc-400 mb-1.5 font-medium">
            <span className="uppercase tracking-wider text-[11px] text-amber-400/90">{product.category}</span>
            <span aria-hidden="true" className="text-zinc-600">·</span>
            {product.isCustomizable ? (
              <span className="text-zinc-400 flex items-center gap-1 text-[11px]">
                <Sparkles className="w-3 h-3 text-amber-400" />
                Custom Engraved
              </span>
            ) : (
              <span className="text-zinc-500 text-[11px]">Ready to Ship</span>
            )}
          </div>

          {/* Product Name */}
          <h3 className="text-base font-semibold text-zinc-100 group-hover:text-amber-300 transition-colors line-clamp-2 leading-snug">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mt-2">
            <div className="flex items-center text-amber-400">
              <Star className="w-3.5 h-3.5 fill-current" />
            </div>
            <span className="text-xs font-semibold text-zinc-200 tabular-nums">{product.rating}</span>
            <span className="text-xs text-zinc-500 tabular-nums">({product.reviewsCount})</span>
          </div>
        </div>

        {/* Price & Action Button */}
        <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-zinc-100 tabular-nums">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-zinc-500 line-through tabular-nums">
                ${product.originalPrice}
              </span>
            )}
          </div>

          <button 
            type="button"
            className="px-3.5 py-1.5 bg-zinc-800 hover:bg-amber-500 hover:text-black text-zinc-200 text-xs font-semibold rounded-lg transition-colors border border-zinc-700/60 hover:border-amber-400 shrink-0 flex items-center gap-1.5"
            onClick={(e) => {
              e.stopPropagation();
              navigateTo('product-detail', product.id);
            }}
          >
            <span>{product.isCustomizable ? 'Personalize' : 'Select'}</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
