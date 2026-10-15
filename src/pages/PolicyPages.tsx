import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ShieldCheck, Truck, RotateCcw, Lock, ArrowLeft } from 'lucide-react';

interface PolicyProps {
  initialTab?: 'privacy' | 'shipping';
}

export const PolicyPages: React.FC<PolicyProps> = ({ initialTab = 'shipping' }) => {
  const [tab, setTab] = useState<'privacy' | 'shipping'>(initialTab);
  const { navigateTo } = useStore();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Back button */}
      <div>
        <button
          onClick={() => navigateTo('home')}
          className="text-xs text-zinc-400 hover:text-amber-400 transition-colors inline-flex items-center gap-1.5 font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Storefront</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-zinc-800 gap-4">
        <button
          onClick={() => setTab('shipping')}
          className={`pb-3 text-sm font-semibold transition-all border-b-2 flex items-center gap-2 ${
            tab === 'shipping'
              ? 'border-amber-400 text-amber-300'
              : 'border-transparent text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <Truck className="w-4 h-4" />
          <span>Shipping & Return Policy</span>
        </button>
        <button
          onClick={() => setTab('privacy')}
          className={`pb-3 text-sm font-semibold transition-all border-b-2 flex items-center gap-2 ${
            tab === 'privacy'
              ? 'border-amber-400 text-amber-300'
              : 'border-transparent text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <Lock className="w-4 h-4" />
          <span>Privacy & Data Protection</span>
        </button>
      </div>

      {/* Content: Shipping & Return Policy */}
      {tab === 'shipping' && (
        <div className="space-y-6 text-xs sm:text-sm text-zinc-300 leading-relaxed">
          <div className="p-6 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-4">
            <h2 className="text-base font-bold text-zinc-100 flex items-center gap-2">
              <Truck className="w-4 h-4 text-amber-400" />
              <span>Laser Crafting & Delivery Timelines</span>
            </h2>
            <p>
              Each item at Metal Smiths is uniquely personalized with your custom name, initials, or coordinates. Because our artisans execute individual CNC fiber-laser cutting, hand-beveled edges, and ultrasonic cleaning for every piece:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-zinc-400">
              <li>
                <strong className="text-zinc-200">Crafting & Engraving Lead Time:</strong> 24 to 48 business hours from order placement.
              </li>
              <li>
                <strong className="text-zinc-200">Standard Insured Delivery:</strong> 3 to 5 business days ($4.99 or FREE for orders over $75).
              </li>
              <li>
                <strong className="text-zinc-200">Priority Courier Express:</strong> 2 to 3 business days ($9.99).
              </li>
              <li>
                <strong className="text-zinc-200">Real-Time Tracking:</strong> A live carrier tracking code is emailed automatically once your parcel is scanned by our dispatch courier.
              </li>
            </ul>
          </div>

          <div className="p-6 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-4">
            <h2 className="text-base font-bold text-zinc-100 flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-amber-400" />
              <span>Returns on Personalized Custom Creations</span>
            </h2>
            <p>
              Because personalized items are carved specifically with individual names and custom text, they cannot be returned for resale. However, we stand 100% behind our craftsmanship:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-zinc-400">
              <li>
                <strong className="text-zinc-200">Typographical / Artisan Error:</strong> If we engrave a misspelling that deviates from your entered text, we will manufacture and express-ship a corrected replacement free of charge immediately.
              </li>
              <li>
                <strong className="text-zinc-200">Damaged in Transit:</strong> If your piece arrives scratched, bent, or damaged, notify us with a photograph within 7 days and we will remake it.
              </li>
              <li>
                <strong className="text-zinc-200">Lifetime Anti-Tarnish Warranty:</strong> If your piece ever discolors, rusts, or green-tarnishes under normal lifestyle conditions, we will re-plate or remake it free of charge.
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* Content: Privacy Policy */}
      {tab === 'privacy' && (
        <div className="space-y-6 text-xs sm:text-sm text-zinc-300 leading-relaxed">
          <div className="p-6 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-4">
            <h2 className="text-base font-bold text-zinc-100 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Personal Data & Custom Name Confidentiality</span>
            </h2>
            <p>
              At Metal Smiths, we treat your custom text and personal identifiers with utmost confidentiality:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-zinc-400">
              <li>
                <strong className="text-zinc-200">Private Custom Engravings:</strong> Custom names, private wedding dates, GPS coordinates, and anniversary inscriptions entered by customers are transmitted securely to our CNC laser cutters and never shared with or sold to third parties.
              </li>
              <li>
                <strong className="text-zinc-200">Encrypted Payments:</strong> Credit card transactions are processed through encrypted 256-bit SSL connections. We never store raw CVV codes or payment passwords on our servers.
              </li>
              <li>
                <strong className="text-zinc-200">Cash on Delivery (COD) Privacy:</strong> When you choose COD, customer contact numbers and delivery addresses are utilized strictly by the courier partner for delivery scheduling.
              </li>
              <li>
                <strong className="text-zinc-200">Data Deletion:</strong> You may request full removal of your order history and contact record at any time by emailing privacy@metalsmiths.store.
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
