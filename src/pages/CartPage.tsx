import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  Trash2, 
  ShoppingBag, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  Edit3, 
  Check, 
  Tag, 
  ShieldCheck, 
  Truck 
} from 'lucide-react';

export const CartPage: React.FC = () => {
  const { 
    cart, 
    updateCartItemQuantity, 
    updateCartItemCustomName,
    removeFromCart, 
    clearCart,
    navigateTo, 
    cartSubtotal, 
    cartDiscountAmount, 
    cartShippingFee, 
    cartGrandTotal,
    discountCode,
    discountRate,
    applyDiscount,
    removeDiscount
  } = useStore();

  const [couponInput, setCouponInput] = useState('');
  const [couponFeedback, setCouponFeedback] = useState<{ success: boolean; message: string } | null>(null);
  
  // Custom name editing state
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [editNameValue, setEditNameValue] = useState('');

  const freeShippingThreshold = 75;
  const amountNeededForFreeShipping = Math.max(0, +(freeShippingThreshold - cartSubtotal).toFixed(2));
  const shippingProgress = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput) return;
    const res = applyDiscount(couponInput);
    setCouponFeedback(res);
  };

  const handleStartEditName = (itemId: string, currentName: string) => {
    setEditingItemId(itemId);
    setEditNameValue(currentName);
  };

  const handleSaveEditName = (itemId: string) => {
    if (!editNameValue.trim()) return;
    updateCartItemCustomName(itemId, editNameValue.trim());
    setEditingItemId(null);
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto text-zinc-500">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-serif-luxury text-zinc-100 font-medium">
            Your Shopping Bag is Empty
          </h2>
          <p className="text-xs text-zinc-400 max-w-sm mx-auto">
            You haven't customized any metal crafts yet. Explore our handcrafted collection to engrave a one-of-a-kind keepsake.
          </p>
        </div>
        <button
          onClick={() => navigateTo('products')}
          className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-black font-semibold text-xs rounded-lg transition-colors inline-flex items-center gap-2 shadow-lg shadow-amber-500/20"
        >
          <span>Browse Personalized Pieces</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif-luxury text-zinc-100 font-medium">
            Your Bespoke Shopping Bag
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Review your custom engraved names and metal finishes prior to secure laser crafting.
          </p>
        </div>

        <button
          onClick={() => navigateTo('products')}
          className="text-xs text-zinc-400 hover:text-amber-400 transition-colors inline-flex items-center gap-1.5 self-start sm:self-auto"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Continue Customizing</span>
        </button>
      </div>

      {/* Free Shipping Tier Banner */}
      <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-zinc-300 font-medium flex items-center gap-1.5">
            <Truck className="w-4 h-4 text-amber-400" />
            {amountNeededForFreeShipping === 0 ? (
              <span className="text-emerald-400 font-semibold">
                You've unlocked FREE Insured Express Delivery!
              </span>
            ) : (
              <span>
                Add <strong className="text-amber-300">${amountNeededForFreeShipping}</strong> more to unlock <strong>FREE Tracked Delivery</strong>
              </span>
            )}
          </span>
          <span className="text-zinc-500 tabular-nums">{shippingProgress}%</span>
        </div>
        <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
          <div 
            className="bg-gradient-to-r from-amber-500 to-amber-300 h-full rounded-full transition-all duration-500" 
            style={{ width: `${shippingProgress}%` }}
          />
        </div>
      </div>

      {/* Main Grid: Items (Left) vs Summary (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* Left Column: Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          {cart.map((item) => (
            <div 
              key={item.cartItemId}
              className="p-5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 hover:border-zinc-700 transition-all flex flex-col sm:flex-row gap-5"
            >
              {/* Thumbnail */}
              <div className="w-full sm:w-28 sm:h-28 aspect-square sm:aspect-auto rounded-lg overflow-hidden bg-zinc-950 shrink-0 border border-zinc-800">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover object-center"
                />
              </div>

              {/* Details */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-sm sm:text-base font-semibold text-zinc-100 leading-snug">
                      {item.name}
                    </h3>
                    <button
                      onClick={() => removeFromCart(item.cartItemId)}
                      aria-label="Remove item"
                      className="text-zinc-500 hover:text-red-400 p-1 transition-colors"
                      title="Remove from bag"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Options: Finish & Size */}
                  <div className="flex flex-wrap items-center gap-2 mt-1.5 text-xs text-zinc-400">
                    <span className="text-zinc-300 font-medium">{item.selectedFinish}</span>
                    {item.selectedSize && (
                      <>
                        <span aria-hidden="true" className="text-zinc-600">·</span>
                        <span>{item.selectedSize}</span>
                      </>
                    )}
                    {item.fontStyle && (
                      <>
                        <span aria-hidden="true" className="text-zinc-600">·</span>
                        <span>{item.fontStyle}</span>
                      </>
                    )}
                  </div>

                  {/* CUSTOM NAME DISPLAY & INLINE EDITING */}
                  {item.customName ? (
                    <div className="mt-3 p-3 rounded-lg bg-zinc-950/90 border border-amber-500/30 flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] uppercase tracking-wider text-amber-400 font-semibold flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5" />
                          Custom Laser Engraved Text:
                        </span>
                        {editingItemId !== item.cartItemId && (
                          <button
                            onClick={() => handleStartEditName(item.cartItemId, item.customName)}
                            className="text-[11px] text-zinc-400 hover:text-amber-300 flex items-center gap-1 transition-colors"
                          >
                            <Edit3 className="w-3 h-3" />
                            <span>Edit Name</span>
                          </button>
                        )}
                      </div>

                      {editingItemId === item.cartItemId ? (
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            maxLength={25}
                            value={editNameValue}
                            onChange={(e) => setEditNameValue(e.target.value)}
                            className="flex-1 bg-zinc-900 border border-amber-400 rounded px-2.5 py-1 text-xs text-zinc-100 focus:outline-none"
                            autoFocus
                          />
                          <button
                            onClick={() => handleSaveEditName(item.cartItemId)}
                            className="px-2.5 py-1 bg-amber-500 text-black text-xs font-bold rounded flex items-center gap-1"
                          >
                            <Check className="w-3 h-3" />
                            Save
                          </button>
                          <button
                            onClick={() => setEditingItemId(null)}
                            className="px-2 py-1 text-xs text-zinc-400 hover:text-zinc-200"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <span className="font-brand text-sm sm:text-base font-bold gold-gradient-text tracking-wider">
                          "{item.customName}"
                        </span>
                      )}
                    </div>
                  ) : null}
                </div>

                {/* Bottom Row: Quantity & Line Price */}
                <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between">
                  {/* Stepper */}
                  <div className="flex items-center border border-zinc-700 rounded-md bg-zinc-950 h-8 px-1">
                    <button
                      onClick={() => updateCartItemQuantity(item.cartItemId, item.quantity - 1)}
                      className="w-6 h-6 rounded flex items-center justify-center text-zinc-400 hover:text-white transition-colors text-xs font-bold"
                    >
                      -
                    </button>
                    <span className="w-8 text-center text-xs font-semibold text-zinc-200 tabular-nums">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateCartItemQuantity(item.cartItemId, item.quantity + 1)}
                      className="w-6 h-6 rounded flex items-center justify-center text-zinc-400 hover:text-white transition-colors text-xs font-bold"
                    >
                      +
                    </button>
                  </div>

                  {/* Price */}
                  <div className="text-right">
                    <span className="text-sm sm:text-base font-bold text-zinc-100 tabular-nums">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                    {item.quantity > 1 && (
                      <span className="block text-[11px] text-zinc-500 tabular-nums">
                        (${item.price} each)
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="flex justify-between items-center pt-2">
            <button
              onClick={clearCart}
              className="text-xs text-zinc-500 hover:text-red-400 transition-colors"
            >
              Clear shopping bag
            </button>
          </div>
        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-5">
            <h2 className="text-base font-semibold text-zinc-100 border-b border-zinc-800 pb-3">
              Order Summary
            </h2>

            {/* Calculations Breakdown */}
            <div className="space-y-3 text-xs text-zinc-400">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="text-zinc-200 font-semibold tabular-nums">${cartSubtotal.toFixed(2)}</span>
              </div>

              {cartDiscountAmount > 0 && (
                <div className="flex justify-between text-amber-300">
                  <span className="flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5" />
                    Promo Discount ({discountCode})
                  </span>
                  <span className="font-semibold tabular-nums">-${cartDiscountAmount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Insured Doorstep Delivery</span>
                {cartShippingFee === 0 ? (
                  <span className="text-emerald-400 font-semibold">FREE</span>
                ) : (
                  <span className="text-zinc-200 tabular-nums">${cartShippingFee.toFixed(2)}</span>
                )}
              </div>

              <div className="pt-3 border-t border-zinc-800 flex justify-between items-baseline text-sm">
                <span className="font-bold text-zinc-100">Estimated Total</span>
                <div className="text-right">
                  <span className="text-xl font-bold text-amber-300 tabular-nums">
                    ${cartGrandTotal.toFixed(2)}
                  </span>
                  <span className="block text-[10px] text-zinc-500">Includes all taxes & laser engraving</span>
                </div>
              </div>
            </div>

            {/* Promo Code Form */}
            <div className="pt-4 border-t border-zinc-800">
              {discountRate > 0 ? (
                <div className="flex items-center justify-between p-2 rounded bg-amber-500/10 border border-amber-500/30 text-xs text-amber-300">
                  <span>Code <strong>{discountCode}</strong> applied</span>
                  <button onClick={removeDiscount} className="text-zinc-400 hover:text-zinc-200 underline text-[11px]">
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="space-y-2">
                  <label className="text-xs text-zinc-400 block font-medium">
                    Have a VIP Promo Code?
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. METAL15 or GOLD10"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-1.5 text-xs text-zinc-200 uppercase placeholder-zinc-600 focus:outline-none focus:border-amber-500"
                    />
                    <button
                      type="submit"
                      className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold rounded shrink-0 transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                  {couponFeedback && (
                    <p className={`text-[11px] ${couponFeedback.success ? 'text-emerald-400' : 'text-red-400'}`}>
                      {couponFeedback.message}
                    </p>
                  )}
                </form>
              )}
            </div>

            {/* Proceed to Checkout CTA */}
            <button
              onClick={() => navigateTo('checkout')}
              className="w-full py-3.5 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-black font-bold text-sm rounded-lg transition-all shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 flex items-center justify-center gap-2"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Trust Assurances */}
            <div className="space-y-2 pt-2 text-[11px] text-zinc-500">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-500/70 shrink-0" />
                <span>Encrypted 256-bit checkout & customer data privacy</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-500/70 shrink-0" />
                <span>Complimentary luxury velvet gift box included</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
