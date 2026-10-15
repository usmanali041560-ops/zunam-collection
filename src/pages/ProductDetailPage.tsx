import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { LivePersonalizationPreview } from '../components/LivePersonalizationPreview';
import { MetalFinish, FontStyleOption } from '../types';
import { 
  Star, 
  ShieldCheck, 
  Truck, 
  Sparkles, 
  ShoppingBag, 
  ArrowLeft, 
  Check, 
  AlertCircle,
  HelpCircle,
  Layers,
  Heart
} from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const { selectedProduct, addToCart, navigateTo, products } = useStore();

  // Fallback product if none selected
  const product = selectedProduct || products[0];

  // Gallery state
  const [selectedImage, setSelectedImage] = useState(product?.image || '');
  
  // Customization state
  const [customName, setCustomName] = useState(product?.defaultCustomPlaceholder || '');
  const [nameError, setNameError] = useState('');
  const [selectedFinish, setSelectedFinish] = useState<MetalFinish>(product?.availableFinishes?.[0] || '18K Gold');
  const [selectedSize, setSelectedSize] = useState<string>(product?.availableSizes?.[0] || '');
  const [selectedFont, setSelectedFont] = useState<FontStyleOption>('Signature Script');
  const [quantity, setQuantity] = useState(1);
  const [showAddedModal, setShowAddedModal] = useState(false);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-zinc-400">Product not found.</p>
        <button
          onClick={() => navigateTo('products')}
          className="mt-4 px-4 py-2 bg-amber-500 text-black font-semibold rounded-lg text-xs"
        >
          Return to Catalog
        </button>
      </div>
    );
  }

  // Handle Add to Cart with validation
  const handleAddToCart = () => {
    if (product.isCustomizable) {
      if (!customName.trim()) {
        setNameError('Please enter your custom name or word for personalization.');
        return;
      }
      if (customName.trim().length > 25) {
        setNameError('Name exceeds 25 characters. Please enter a shorter name or message.');
        return;
      }
    }

    setNameError('');
    addToCart(product, {
      quantity,
      customName: product.isCustomizable ? customName.trim() : '',
      selectedFinish,
      selectedSize: selectedSize || undefined,
      fontStyle: product.isCustomizable ? selectedFont : undefined,
    });

    setShowAddedModal(true);
    setTimeout(() => {
      setShowAddedModal(false);
    }, 4500);
  };

  const discountPercent = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Back button */}
      <div className="mb-6">
        <button
          onClick={() => navigateTo('products')}
          className="text-xs text-zinc-400 hover:text-amber-400 transition-colors inline-flex items-center gap-1.5 font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Products</span>
        </button>
      </div>

      {/* Main 2-Column Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        
        {/* Left Column: Gallery & Interactive Live Preview (Sticky) */}
        <div className="lg:col-span-6 space-y-6">
          {/* Main Large Image Container */}
          <div className="rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-950 aspect-[4/3] relative shadow-2xl">
            <img
              src={selectedImage || product.image}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
            {discountPercent && (
              <div className="absolute top-4 left-4 bg-red-900/90 border border-red-500/50 text-red-200 text-xs font-bold px-2.5 py-1 rounded backdrop-blur-sm shadow-md">
                Save {discountPercent}% Special Offer
              </div>
            )}
          </div>

          {/* Thumbnail Strip */}
          {product.gallery && product.gallery.length > 1 && (
            <div className="flex items-center gap-3">
              {product.gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-20 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                    (selectedImage || product.image) === img
                      ? 'border-amber-400 scale-105 shadow-md'
                      : 'border-zinc-800 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Angle ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Interactive Live Metal Personalization Mockup */}
          {product.isCustomizable && (
            <div className="pt-2">
              <LivePersonalizationPreview
                customName={customName}
                defaultPlaceholder={product.defaultCustomPlaceholder}
                previewType={product.previewType || 'necklace'}
                selectedFinish={selectedFinish}
                selectedFont={selectedFont}
                onFontChange={setSelectedFont}
                onFinishChange={setSelectedFinish}
                availableFinishes={product.availableFinishes}
                interactiveControls={true}
              />
            </div>
          )}
        </div>

        {/* Right Column: Contiguous Purchase Module */}
        <div className="lg:col-span-6 space-y-6">
          {/* Title & Category */}
          <div>
            <div className="flex items-center gap-2 text-xs text-zinc-400 font-medium uppercase tracking-wider mb-2">
              <span className="text-amber-400">{product.category}</span>
              <span aria-hidden="true" className="text-zinc-600">·</span>
              <span className="text-zinc-400">SKU: {product.id.toUpperCase()}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-serif-luxury font-medium text-zinc-100 leading-tight">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mt-3">
              <div className="flex items-center text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current text-amber-400" />
                ))}
              </div>
              <span className="text-xs font-semibold text-zinc-200 tabular-nums">
                {product.rating} / 5.0
              </span>
              <span className="text-xs text-zinc-500 tabular-nums">
                ({product.reviewsCount} verified artisan reviews)
              </span>
            </div>
          </div>

          {/* Price Block */}
          <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 flex items-center justify-between">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-zinc-100 tabular-nums">
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-zinc-500 line-through tabular-nums">
                  ${product.originalPrice}
                </span>
              )}
            </div>

            <div className="text-right">
              <span className="text-xs font-semibold text-emerald-400 block">
                In Stock & Ready for Laser Cut
              </span>
              <span className="text-[11px] text-zinc-500">
                Orders dispatch in 24-48 hours
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
            {product.description}
          </p>

          {/* CUSTOM NAME INPUT (Section 3 Requirement) */}
          {product.isCustomizable ? (
            <div className="p-5 rounded-xl bg-zinc-950 border border-amber-500/40 shadow-[0_0_20px_rgba(212,175,55,0.08)] space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Enter Your Custom Name *</span>
                </label>
                <span className="text-[11px] text-zinc-500 tabular-nums">
                  {customName.length}/25 characters
                </span>
              </div>

              <div className="relative">
                <input
                  type="text"
                  maxLength={25}
                  value={customName}
                  onChange={(e) => {
                    setCustomName(e.target.value);
                    if (nameError) setNameError('');
                  }}
                  placeholder={`e.g. ${product.defaultCustomPlaceholder || 'Your Name / Initials'}`}
                  className={`w-full bg-zinc-900 border rounded-lg px-4 py-3 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none transition-colors ${
                    nameError ? 'border-red-500' : 'border-zinc-700 focus:border-amber-400'
                  }`}
                />
              </div>

              {nameError && (
                <p className="text-xs text-red-400 flex items-center gap-1.5 font-medium">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{nameError}</span>
                </p>
              )}

              <p className="text-[11px] text-zinc-500 leading-normal">
                Type the exact name, initials, or anniversary date you wish laser engraved. The live preview on the left updates instantly as you type!
              </p>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800 text-xs text-zinc-400">
              This ready-to-ship piece is delivered without personalized laser engraving.
            </div>
          )}

          {/* Metal Finish Selector */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-zinc-300 block mb-2">
              Select Metal Finish: <span className="text-amber-400 font-bold">{selectedFinish}</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {product.availableFinishes.map((finish) => {
                const isSelected = selectedFinish === finish;
                return (
                  <button
                    key={finish}
                    type="button"
                    onClick={() => setSelectedFinish(finish)}
                    className={`px-3 py-2.5 rounded-lg border text-xs font-medium flex items-center justify-center gap-2 transition-all ${
                      isSelected
                        ? 'bg-amber-400/15 border-amber-400 text-amber-200 font-semibold shadow-sm'
                        : 'bg-zinc-900/80 border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700'
                    }`}
                  >
                    <span className={`w-3 h-3 rounded-full border border-black/50 ${
                      finish === '18K Gold' ? 'bg-amber-400' :
                      finish === 'Polished Silver' ? 'bg-slate-200' :
                      finish === 'Rose Gold' ? 'bg-rose-300' : 'bg-zinc-900'
                    }`} />
                    <span>{finish}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Size / Length Selector */}
          {product.availableSizes && product.availableSizes.length > 0 && (
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-300 block mb-2">
                Chain Length / Dimensions:
              </label>
              <div className="flex flex-wrap gap-2">
                {product.availableSizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`px-3 py-1.5 rounded-lg border text-xs transition-all ${
                      selectedSize === size
                        ? 'bg-amber-500 text-black font-bold border-amber-400 shadow-sm'
                        : 'bg-zinc-900/80 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity & Add to Cart Controls */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            {/* Quantity Stepper */}
            <div className="flex items-center border border-zinc-700 rounded-lg bg-zinc-900 h-12 px-2 shrink-0 justify-between sm:w-32">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 rounded flex items-center justify-center text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors text-base font-bold"
              >
                -
              </button>
              <span className="text-sm font-semibold text-zinc-100 tabular-nums">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 rounded flex items-center justify-center text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors text-base font-bold"
              >
                +
              </button>
            </div>

            {/* Add to Cart CTA */}
            <button
              type="button"
              onClick={handleAddToCart}
              className="flex-1 h-12 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-black font-bold text-sm rounded-lg transition-all shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add to Shopping Bag — ${(product.price * quantity).toFixed(2)}</span>
            </button>
          </div>

          {/* Added to Bag Toast Notification */}
          {showAddedModal && (
            <div className="p-4 rounded-xl bg-amber-500/15 border border-amber-500/50 flex items-center justify-between animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="flex items-center gap-2.5 text-xs text-amber-200 font-medium">
                <Check className="w-4 h-4 text-amber-400 shrink-0" />
                <span>
                  <strong>"{product.isCustomizable ? customName : product.name}"</strong> added to your shopping bag!
                </span>
              </div>
              <button
                onClick={() => navigateTo('cart')}
                className="px-3 py-1 bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold rounded shadow-sm transition-colors shrink-0"
              >
                View Bag & Checkout
              </button>
            </div>
          )}

          {/* Features Checklist */}
          <div className="pt-6 border-t border-zinc-800/80 space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              Artisan Specifications:
            </h4>
            <ul className="space-y-1.5 text-xs text-zinc-300">
              {product.features.map((feat, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Guarantees Box */}
          <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
            <div className="p-3 rounded-lg bg-zinc-900/60 border border-zinc-800 flex items-center gap-2.5 text-zinc-300">
              <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <span className="font-semibold block text-zinc-100">Anti-Tarnish Guarantee</span>
                <span className="text-[11px] text-zinc-500">Won't turn skin green</span>
              </div>
            </div>
            <div className="p-3 rounded-lg bg-zinc-900/60 border border-zinc-800 flex items-center gap-2.5 text-zinc-300">
              <Truck className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <span className="font-semibold block text-zinc-100">Tracked Delivery</span>
                <span className="text-[11px] text-zinc-500">Free over $75</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
