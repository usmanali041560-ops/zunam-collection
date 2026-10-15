import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { OrderCustomer } from '../types';
import { 
  ShieldCheck, 
  CreditCard, 
  Banknote, 
  CheckCircle2, 
  ArrowLeft, 
  Sparkles, 
  Lock, 
  AlertCircle,
  Truck
} from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const { 
    cart, 
    cartSubtotal, 
    cartDiscountAmount, 
    cartShippingFee, 
    cartGrandTotal, 
    placeOrder, 
    navigateTo 
  } = useStore();

  // Form State
  const [formData, setFormData] = useState<OrderCustomer>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'United States',
    notes: ''
  });

  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'card' | 'apple_pay'>('cod');
  
  // Card details state for card payment
  const [cardDetails, setCardDetails] = useState({
    number: '',
    exp: '',
    cvc: '',
    nameOnCard: ''
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-serif-luxury text-zinc-100">No items to checkout</h2>
        <p className="text-xs text-zinc-400">Your shopping bag is empty. Please select a product first.</p>
        <button
          onClick={() => navigateTo('products')}
          className="px-5 py-2.5 bg-amber-500 text-black text-xs font-semibold rounded-lg"
        >
          Return to Catalog
        </button>
      </div>
    );
  }

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full name is required';
    if (!formData.email.trim() || !formData.email.includes('@')) errs.email = 'Valid email is required';
    if (!formData.phone.trim() || formData.phone.length < 7) errs.phone = 'Valid phone number is required';
    if (!formData.address.trim()) errs.address = 'Street address is required';
    if (!formData.city.trim()) errs.city = 'City is required';
    if (!formData.postalCode.trim()) errs.postalCode = 'Postal / ZIP code is required';

    if (paymentMethod === 'card') {
      if (!cardDetails.number.trim() || cardDetails.number.replace(/\s/g, '').length < 15) {
        errs.cardNumber = 'Valid 16-digit card number required';
      }
      if (!cardDetails.exp.trim() || !cardDetails.exp.includes('/')) {
        errs.cardExp = 'Expiry (MM/YY) required';
      }
      if (!cardDetails.cvc.trim() || cardDetails.cvc.length < 3) {
        errs.cardCvc = '3 or 4-digit CVC required';
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      placeOrder(formData, paymentMethod);
      setIsSubmitting(false);
      navigateTo('order-confirmation');
    }, 800);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Back button */}
      <div>
        <button
          onClick={() => navigateTo('cart')}
          className="text-xs text-zinc-400 hover:text-amber-400 transition-colors inline-flex items-center gap-1.5 font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Shopping Bag</span>
        </button>
      </div>

      <div className="border-b border-zinc-800 pb-6">
        <h1 className="text-2xl sm:text-3xl font-serif-luxury text-zinc-100 font-medium">
          Secure Artisan Checkout
        </h1>
        <p className="text-xs text-zinc-400 mt-1">
          Complete your delivery and payment details to schedule precision laser engraving.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column: Customer & Shipping Details + Payment Choice */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Section 1: Customer Info */}
          <div className="p-6 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-200 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 text-xs flex items-center justify-center font-bold">1</span>
              <span>Customer & Shipping Information</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-zinc-400 block mb-1 font-medium">Full Name *</label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. Jessica Miller"
                  className={`w-full bg-zinc-950 border rounded-lg px-3 py-2 text-xs text-zinc-100 placeholder-zinc-600 focus:outline-none ${
                    errors.fullName ? 'border-red-500' : 'border-zinc-800 focus:border-amber-500'
                  }`}
                />
                {errors.fullName && <p className="text-[11px] text-red-400 mt-1">{errors.fullName}</p>}
              </div>

              <div>
                <label className="text-xs text-zinc-400 block mb-1 font-medium">Email Address (for order tracking) *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="jessica@example.com"
                  className={`w-full bg-zinc-950 border rounded-lg px-3 py-2 text-xs text-zinc-100 placeholder-zinc-600 focus:outline-none ${
                    errors.email ? 'border-red-500' : 'border-zinc-800 focus:border-amber-500'
                  }`}
                />
                {errors.email && <p className="text-[11px] text-red-400 mt-1">{errors.email}</p>}
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs text-zinc-400 block mb-1 font-medium">Phone Number (courier SMS updates) *</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+1 (555) 019-2834"
                  className={`w-full bg-zinc-950 border rounded-lg px-3 py-2 text-xs text-zinc-100 placeholder-zinc-600 focus:outline-none ${
                    errors.phone ? 'border-red-500' : 'border-zinc-800 focus:border-amber-500'
                  }`}
                />
                {errors.phone && <p className="text-[11px] text-red-400 mt-1">{errors.phone}</p>}
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs text-zinc-400 block mb-1 font-medium">Street Address *</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Apartment, suite, unit, building, floor, etc."
                  className={`w-full bg-zinc-950 border rounded-lg px-3 py-2 text-xs text-zinc-100 placeholder-zinc-600 focus:outline-none ${
                    errors.address ? 'border-red-500' : 'border-zinc-800 focus:border-amber-500'
                  }`}
                />
                {errors.address && <p className="text-[11px] text-red-400 mt-1">{errors.address}</p>}
              </div>

              <div>
                <label className="text-xs text-zinc-400 block mb-1 font-medium">City *</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="e.g. Portland"
                  className={`w-full bg-zinc-950 border rounded-lg px-3 py-2 text-xs text-zinc-100 placeholder-zinc-600 focus:outline-none ${
                    errors.city ? 'border-red-500' : 'border-zinc-800 focus:border-amber-500'
                  }`}
                />
                {errors.city && <p className="text-[11px] text-red-400 mt-1">{errors.city}</p>}
              </div>

              <div>
                <label className="text-xs text-zinc-400 block mb-1 font-medium">Postal / ZIP Code *</label>
                <input
                  type="text"
                  value={formData.postalCode}
                  onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                  placeholder="97201"
                  className={`w-full bg-zinc-950 border rounded-lg px-3 py-2 text-xs text-zinc-100 placeholder-zinc-600 focus:outline-none ${
                    errors.postalCode ? 'border-red-500' : 'border-zinc-800 focus:border-amber-500'
                  }`}
                />
                {errors.postalCode && <p className="text-[11px] text-red-400 mt-1">{errors.postalCode}</p>}
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs text-zinc-400 block mb-1 font-medium">Country</label>
                <select
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-amber-500"
                >
                  <option value="United States">United States</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Canada">Canada</option>
                  <option value="Australia">Australia</option>
                  <option value="United Arab Emirates">United Arab Emirates</option>
                  <option value="Saudi Arabia">Saudi Arabia</option>
                  <option value="Pakistan">Pakistan</option>
                  <option value="Germany">Germany</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs text-zinc-400 block mb-1 font-medium">Special Workshop Notes (Optional)</label>
                <textarea
                  rows={2}
                  value={formData.notes || ''}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="e.g. Please include a gift message: 'Happy 5th Anniversary!'"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Payment Method */}
          <div className="p-6 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-200 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 text-xs flex items-center justify-center font-bold">2</span>
              <span>Payment Option</span>
            </h2>

            <div className="space-y-3">
              {/* Option A: Cash on Delivery (COD) */}
              <label 
                className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                  paymentMethod === 'cod' 
                    ? 'border-amber-500 bg-amber-500/10 shadow-sm' 
                    : 'border-zinc-800 bg-zinc-950/60 hover:border-zinc-700'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={paymentMethod === 'cod'}
                  onChange={() => setPaymentMethod('cod')}
                  className="mt-1 text-amber-500 focus:ring-amber-400"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-zinc-100 flex items-center gap-1.5">
                      <Banknote className="w-4 h-4 text-amber-400" />
                      Cash on Delivery (COD) / Pay Upon Delivery
                    </span>
                    <span className="text-[10px] uppercase font-semibold text-amber-400 bg-amber-400/20 px-2 py-0.5 rounded">
                      Zero Risk
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-400 mt-1 leading-relaxed">
                    Pay with cash or local card when the courier delivers your personalized gift box to your doorstep. No advance card entry required.
                  </p>
                </div>
              </label>

              {/* Option B: Credit / Debit Card */}
              <label 
                className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                  paymentMethod === 'card' 
                    ? 'border-amber-500 bg-amber-500/10 shadow-sm' 
                    : 'border-zinc-800 bg-zinc-950/60 hover:border-zinc-700'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={paymentMethod === 'card'}
                  onChange={() => setPaymentMethod('card')}
                  className="mt-1 text-amber-500 focus:ring-amber-400"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-zinc-100 flex items-center gap-1.5">
                      <CreditCard className="w-4 h-4 text-amber-400" />
                      Credit / Debit Card (Visa, MasterCard, Amex)
                    </span>
                    <span className="text-[10px] text-zinc-500 font-mono">256-Bit SSL</span>
                  </div>
                  <p className="text-[11px] text-zinc-400 mt-1">
                    Instant secure card payment with zero extra transaction fees.
                  </p>

                  {/* Expandable Card Form */}
                  {paymentMethod === 'card' && (
                    <div className="mt-4 pt-4 border-t border-zinc-800 space-y-3 cursor-default" onClick={(e) => e.stopPropagation()}>
                      <div>
                        <label className="text-[11px] text-zinc-400 block mb-1">Cardholder Name</label>
                        <input
                          type="text"
                          placeholder="Name as it appears on card"
                          value={cardDetails.nameOnCard}
                          onChange={(e) => setCardDetails({ ...cardDetails, nameOnCard: e.target.value })}
                          className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-1.5 text-xs text-zinc-100 focus:outline-none focus:border-amber-400"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] text-zinc-400 block mb-1">Card Number</label>
                        <input
                          type="text"
                          placeholder="4532 •••• •••• 8821"
                          maxLength={19}
                          value={cardDetails.number}
                          onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                          className={`w-full bg-zinc-900 border rounded px-3 py-1.5 text-xs text-zinc-100 focus:outline-none ${
                            errors.cardNumber ? 'border-red-500' : 'border-zinc-800 focus:border-amber-400'
                          }`}
                        />
                        {errors.cardNumber && <p className="text-[10px] text-red-400 mt-0.5">{errors.cardNumber}</p>}
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[11px] text-zinc-400 block mb-1">Expiry (MM/YY)</label>
                          <input
                            type="text"
                            placeholder="08/28"
                            maxLength={5}
                            value={cardDetails.exp}
                            onChange={(e) => setCardDetails({ ...cardDetails, exp: e.target.value })}
                            className={`w-full bg-zinc-900 border rounded px-3 py-1.5 text-xs text-zinc-100 focus:outline-none ${
                              errors.cardExp ? 'border-red-500' : 'border-zinc-800 focus:border-amber-400'
                            }`}
                          />
                          {errors.cardExp && <p className="text-[10px] text-red-400 mt-0.5">{errors.cardExp}</p>}
                        </div>
                        <div>
                          <label className="text-[11px] text-zinc-400 block mb-1">CVC Code</label>
                          <input
                            type="text"
                            placeholder="382"
                            maxLength={4}
                            value={cardDetails.cvc}
                            onChange={(e) => setCardDetails({ ...cardDetails, cvc: e.target.value })}
                            className={`w-full bg-zinc-900 border rounded px-3 py-1.5 text-xs text-zinc-100 focus:outline-none ${
                              errors.cardCvc ? 'border-red-500' : 'border-zinc-800 focus:border-amber-400'
                            }`}
                          />
                          {errors.cardCvc && <p className="text-[10px] text-red-400 mt-0.5">{errors.cardCvc}</p>}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </label>

              {/* Option C: Apple Pay / 1-Click Pay */}
              <label 
                className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                  paymentMethod === 'apple_pay' 
                    ? 'border-amber-500 bg-amber-500/10 shadow-sm' 
                    : 'border-zinc-800 bg-zinc-950/60 hover:border-zinc-700'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={paymentMethod === 'apple_pay'}
                  onChange={() => setPaymentMethod('apple_pay')}
                  className="mt-1 text-amber-500 focus:ring-amber-400"
                />
                <div>
                  <span className="text-xs font-bold text-zinc-100">
                    Apple Pay / Digital Wallet Express
                  </span>
                  <p className="text-[11px] text-zinc-400 mt-1">
                    Instant biometrics authorization on supported devices.
                  </p>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Right Column: Order Review with Personalized Names Highlight */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-5">
            <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-200 border-b border-zinc-800 pb-3">
              Order Review ({cart.length} unique pieces)
            </h2>

            {/* List of personalized items */}
            <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.cartItemId} className="flex gap-3 py-2 border-b border-zinc-800/60 text-xs">
                  <div className="w-14 h-14 rounded-md overflow-hidden bg-zinc-950 border border-zinc-800 shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-zinc-100 leading-tight">{item.name}</h4>
                    <div className="text-[11px] text-zinc-400 mt-0.5">
                      <span>{item.selectedFinish}</span>
                      {item.selectedSize && <span> · {item.selectedSize}</span>}
                      <span> · Qty: {item.quantity}</span>
                    </div>

                    {item.customName && (
                      <div className="mt-1 flex items-center gap-1.5 text-amber-300 font-medium text-[11px]">
                        <Sparkles className="w-3 h-3 text-amber-400" />
                        <span>Laser Engraved: <strong>"{item.customName}"</strong></span>
                      </div>
                    )}
                  </div>
                  <div className="text-right font-semibold text-zinc-200 tabular-nums">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            {/* Calculation Totals */}
            <div className="space-y-2.5 text-xs text-zinc-400 pt-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-zinc-200 font-semibold tabular-nums">${cartSubtotal.toFixed(2)}</span>
              </div>
              {cartDiscountAmount > 0 && (
                <div className="flex justify-between text-amber-300">
                  <span>VIP Promo Discount</span>
                  <span className="font-semibold tabular-nums">-${cartDiscountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Doorstep Insured Delivery</span>
                {cartShippingFee === 0 ? (
                  <span className="text-emerald-400 font-semibold">FREE</span>
                ) : (
                  <span className="text-zinc-200 tabular-nums">${cartShippingFee.toFixed(2)}</span>
                )}
              </div>
              <div className="pt-3 border-t border-zinc-800 flex justify-between items-baseline text-sm">
                <span className="font-bold text-zinc-100">Total Due</span>
                <span className="text-2xl font-bold text-amber-300 tabular-nums">
                  ${cartGrandTotal.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-black font-bold text-sm rounded-lg transition-all shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Locking Laser Queue & Generating Order...</span>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>
                    {paymentMethod === 'cod' 
                      ? `Confirm Cash on Delivery Order — $${cartGrandTotal.toFixed(2)}` 
                      : `Place Order & Pay $${cartGrandTotal.toFixed(2)}`}
                  </span>
                </>
              )}
            </button>

            <div className="text-[11px] text-zinc-500 text-center space-y-1">
              <p>By placing this order, you authorize Metal Smiths to laser engrave the specified names onto your jewelry/decor.</p>
            </div>
          </div>
        </div>

      </form>
    </div>
  );
};
