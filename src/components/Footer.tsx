import React from 'react';
import { useStore } from '../context/StoreContext';
import { ShieldCheck, Truck, Sparkles, RefreshCw, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo, setActiveCategory } = useStore();

  return (
    <footer className="bg-zinc-950 border-t border-zinc-800 text-zinc-400 text-sm">
      {/* 4 Trust Pillars */}
      <div className="border-b border-zinc-800/80 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex items-start gap-4">
            <div className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-amber-400 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-zinc-100 text-sm">Laser-Cut Precision</h4>
              <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                Industrial fiber-laser cutting with 0.01mm tolerance for crisp, flawless edges.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-amber-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-zinc-100 text-sm">Anti-Tarnish Lifetime Warranty</h4>
              <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                Real 18K gold PVD vacuum plating designed for daily shower, gym, and sleep wear.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-amber-400 shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-zinc-100 text-sm">Tracked Express Delivery</h4>
              <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                Fast craft turnaround within 24-48 hours with end-to-end doorstep tracking.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-amber-400 shrink-0">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-zinc-100 text-sm">Bespoke Fit Guarantee</h4>
              <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                Free adjustments or remakes if your personalized piece arrives with any imperfection.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Brand Col */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center font-brand font-bold text-black text-sm">
                M
              </div>
              <span className="font-brand font-bold text-xl text-zinc-100 tracking-wider">
                METAL SMITHS
              </span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed max-w-sm mb-4">
              Modern atelier crafting personalized metal jewelry, bespoke couple stands, engraved cuff bracelets, and architectural laser wall art. Crafted with passion, worn with love.
            </p>
            <div className="flex items-center gap-2 text-xs text-zinc-500">
              <span>Studio: 144 Artisan Row</span>
              <span aria-hidden="true">·</span>
              <span>support@metalsmiths.store</span>
            </div>
          </div>

          {/* Collections */}
          <div>
            <h5 className="text-xs font-bold text-zinc-200 uppercase tracking-widest mb-3">
              Collections
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <button 
                  onClick={() => { setActiveCategory('Custom Jewelry'); navigateTo('products'); }}
                  className="hover:text-amber-300 transition-colors"
                >
                  Custom Jewelry
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveCategory('Name Lockets'); navigateTo('products'); }}
                  className="hover:text-amber-300 transition-colors"
                >
                  Name Lockets & Necklaces
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveCategory('Couple Stands'); navigateTo('products'); }}
                  className="hover:text-amber-300 transition-colors"
                >
                  Couple Infinity Stands
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveCategory('Bracelets'); navigateTo('products'); }}
                  className="hover:text-amber-300 transition-colors"
                >
                  Engraved Bar & Cuffs
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveCategory('Wall Art'); navigateTo('products'); }}
                  className="hover:text-amber-300 transition-colors"
                >
                  Architectural Wall Art
                </button>
              </li>
            </ul>
          </div>

          {/* Information & Assistance */}
          <div>
            <h5 className="text-xs font-bold text-zinc-200 uppercase tracking-widest mb-3">
              Customer Care
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => navigateTo('about')} className="hover:text-amber-300 transition-colors">
                  Our Metalcraft Heritage
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('contact')} className="hover:text-amber-300 transition-colors">
                  Contact Customer Concierge
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shipping')} className="hover:text-amber-300 transition-colors">
                  Shipping & Return Policy
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('privacy')} className="hover:text-amber-300 transition-colors">
                  Privacy & Data Protection
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('admin')} className="text-amber-400/90 hover:text-amber-300 transition-colors font-medium">
                  Artisan Admin Portal
                </button>
              </li>
            </ul>
          </div>

          {/* VIP Craft Newsletter */}
          <div>
            <h5 className="text-xs font-bold text-zinc-200 uppercase tracking-widest mb-3">
              Artisan Club
            </h5>
            <p className="text-xs text-zinc-400 mb-3 leading-relaxed">
              Receive exclusive member-only early previews of seasonal metal creations and a 15% welcome code.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter email address"
                className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-1.5 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-amber-500"
              />
              <button 
                type="button"
                className="bg-amber-500 hover:bg-amber-400 text-black px-3 py-1.5 rounded text-xs font-bold shrink-0 transition-colors"
                onClick={() => alert('Thank you for subscribing! Your VIP 15% discount code is METAL15.')}
              >
                Join
              </button>
            </div>
            <span className="text-[10px] text-zinc-500 mt-2 block">
              No spam. Unsubscribe anytime.
            </span>
          </div>
        </div>

        {/* Bottom Hairline & Legal Bar */}
        <div className="mt-12 pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div>
            © {new Date().getFullYear()} Metal Smiths Studio. All rights reserved. Handcrafted personalized metal art & jewelry.
          </div>
          <div className="flex items-center gap-6">
            <button onClick={() => navigateTo('privacy')} className="hover:text-zinc-400">Privacy Policy</button>
            <button onClick={() => navigateTo('shipping')} className="hover:text-zinc-400">Shipping Terms</button>
            <button onClick={() => navigateTo('contact')} className="hover:text-zinc-400">Help Center</button>
          </div>
        </div>
      </div>
    </footer>
  );
};
