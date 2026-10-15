import React from 'react';
import { useStore } from '../context/StoreContext';
import { 
  CheckCircle2, 
  Sparkles, 
  Truck, 
  Printer, 
  ArrowRight, 
  ShieldCheck, 
  Calendar, 
  Clock, 
  MapPin, 
  Package
} from 'lucide-react';

export const OrderConfirmationPage: React.FC = () => {
  const { lastOrder, navigateTo } = useStore();

  if (!lastOrder) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-serif-luxury text-zinc-100">No recent order found</h2>
        <p className="text-xs text-zinc-400">Browse our catalog to order your personalized metal piece.</p>
        <button
          onClick={() => navigateTo('products')}
          className="px-5 py-2.5 bg-amber-500 text-black text-xs font-semibold rounded-lg"
        >
          Browse Products
        </button>
      </div>
    );
  }

  const steps = [
    { title: 'Order Placed', desc: 'Personalization queued', done: true },
    { title: 'Laser Engraving', desc: '0.01mm fiber laser cut', done: true },
    { title: 'Plating & Polish', desc: '18K gold hand-buff', done: false },
    { title: 'Courier Dispatch', desc: 'Doorstep tracking', done: false },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Top Banner: Success Badge */}
      <div className="text-center space-y-3">
        <div className="w-16 h-16 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-400 flex items-center justify-center mx-auto shadow-xl shadow-amber-500/10">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold block">
          Order Successfully Confirmed
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif-luxury text-zinc-100 font-medium">
          Thank you, {lastOrder.customer.fullName}!
        </h1>
        <p className="text-xs text-zinc-400 max-w-md mx-auto">
          Your bespoke order has been transferred to our workshop master crafts-bench. A confirmation and tracking link have been dispatched to <strong className="text-zinc-200">{lastOrder.customer.email}</strong>.
        </p>
      </div>

      {/* Order Highlights Strip */}
      <div className="p-6 rounded-xl bg-zinc-900/60 border border-zinc-800 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
        <div>
          <span className="text-zinc-500 block uppercase text-[10px] tracking-wider">Order Number</span>
          <span className="font-mono font-bold text-amber-300 text-sm">{lastOrder.orderId}</span>
        </div>
        <div>
          <span className="text-zinc-500 block uppercase text-[10px] tracking-wider">Payment Method</span>
          <span className="font-semibold text-zinc-200 uppercase">{lastOrder.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Card (Paid)'}</span>
        </div>
        <div>
          <span className="text-zinc-500 block uppercase text-[10px] tracking-wider">Estimated Delivery</span>
          <span className="font-semibold text-zinc-200">{lastOrder.estimatedDelivery}</span>
        </div>
        <div>
          <span className="text-zinc-500 block uppercase text-[10px] tracking-wider">Tracking Reference</span>
          <span className="font-mono text-zinc-300">{lastOrder.trackingNumber}</span>
        </div>
      </div>

      {/* Production Stepper */}
      <div className="p-6 rounded-xl bg-zinc-900/40 border border-zinc-800/80 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-300 flex items-center gap-2">
          <Clock className="w-4 h-4 text-amber-400" />
          <span>Laser Crafting & Fulfillment Pipeline</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 pt-2">
          {steps.map((st, i) => (
            <div key={i} className="flex sm:flex-col items-center sm:items-start gap-3 sm:gap-2 p-3 rounded-lg bg-zinc-950/60 border border-zinc-800/60">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                st.done ? 'bg-amber-500 text-black' : 'bg-zinc-800 text-zinc-500'
              }`}>
                {st.done ? '✓' : i + 1}
              </div>
              <div>
                <span className={`text-xs font-semibold block ${st.done ? 'text-amber-300' : 'text-zinc-400'}`}>
                  {st.title}
                </span>
                <span className="text-[10px] text-zinc-500">{st.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Order Receipt and Items */}
      <div className="p-6 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-6">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
          <h2 className="text-base font-semibold text-zinc-100 flex items-center gap-2">
            <Package className="w-5 h-5 text-amber-400" />
            <span>Personalized Craft Manifest</span>
          </h2>
          <button
            onClick={() => window.print()}
            className="text-xs text-zinc-400 hover:text-amber-300 flex items-center gap-1.5 transition-colors font-medium print:hidden"
          >
            <Printer className="w-4 h-4" />
            <span>Print Receipt</span>
          </button>
        </div>

        {/* Itemized List */}
        <div className="space-y-4">
          {lastOrder.items.map((item, idx) => (
            <div key={idx} className="flex gap-4 py-3 border-b border-zinc-800/60 text-xs">
              <div className="w-16 h-16 rounded-lg overflow-hidden bg-zinc-950 border border-zinc-800 shrink-0">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 space-y-1">
                <h4 className="font-semibold text-zinc-100 text-sm">{item.name}</h4>
                <div className="text-zinc-400 text-xs flex gap-2">
                  <span>Finish: <strong className="text-zinc-300">{item.selectedFinish}</strong></span>
                  {item.selectedSize && <span>· Size: <strong className="text-zinc-300">{item.selectedSize}</strong></span>}
                  <span>· Qty: <strong className="text-zinc-300">{item.quantity}</strong></span>
                </div>

                {item.customName && (
                  <div className="p-2 rounded bg-zinc-950/80 border border-amber-500/20 inline-flex items-center gap-1.5 text-amber-300 font-semibold text-xs mt-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Personalized Inscription: "{item.customName}"</span>
                  </div>
                )}
              </div>
              <div className="text-right font-bold text-zinc-100 tabular-nums text-sm">
                ${(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        {/* Cost Summary */}
        <div className="space-y-2 text-xs text-zinc-400 pt-2 border-t border-zinc-800/80">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span className="text-zinc-200 tabular-nums">${lastOrder.subtotal.toFixed(2)}</span>
          </div>
          {lastOrder.discount > 0 && (
            <div className="flex justify-between text-amber-300">
              <span>VIP Discount</span>
              <span className="tabular-nums">-${lastOrder.discount.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span>Delivery</span>
            <span>{lastOrder.shippingFee === 0 ? 'FREE' : `$${lastOrder.shippingFee.toFixed(2)}`}</span>
          </div>
          <div className="flex justify-between pt-2 border-t border-zinc-800 text-sm font-bold text-zinc-100">
            <span>Total Amount</span>
            <span className="text-lg text-amber-300 tabular-nums">${lastOrder.total.toFixed(2)}</span>
          </div>
        </div>

        {/* Shipping Address info */}
        <div className="pt-4 border-t border-zinc-800 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <span className="text-zinc-500 uppercase tracking-wider text-[10px] block mb-1">
              Dispatch Destination
            </span>
            <p className="text-zinc-200 font-medium">{lastOrder.customer.fullName}</p>
            <p className="text-zinc-400">{lastOrder.customer.address}</p>
            <p className="text-zinc-400">{lastOrder.customer.city}, {lastOrder.customer.postalCode}</p>
            <p className="text-zinc-400">{lastOrder.customer.country}</p>
          </div>

          <div>
            <span className="text-zinc-500 uppercase tracking-wider text-[10px] block mb-1">
              Recipient Contact
            </span>
            <p className="text-zinc-400">Phone: <span className="text-zinc-200">{lastOrder.customer.phone}</span></p>
            <p className="text-zinc-400">Email: <span className="text-zinc-200">{lastOrder.customer.email}</span></p>
            {lastOrder.customer.notes && (
              <p className="text-zinc-400 mt-2 italic bg-zinc-950 p-2 rounded">
                Note: "{lastOrder.customer.notes}"
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Action CTA */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
        <button
          onClick={() => navigateTo('products')}
          className="px-8 py-3.5 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-black font-bold text-sm rounded-lg transition-all shadow-lg shadow-amber-500/20 flex items-center gap-2"
        >
          <span>Continue Shopping</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <button
          onClick={() => navigateTo('home')}
          className="px-6 py-3.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-sm font-semibold rounded-lg border border-zinc-700 transition-colors"
        >
          Return to Storefront
        </button>
      </div>

    </div>
  );
};
