import React, { useState } from 'react';
import { Mail, Phone, MapPin, MessageSquare, Send, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    orderId: '',
    subject: 'Personalization Question',
    message: ''
  });

  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', orderId: '', subject: 'Personalization Question', message: '' });
    }, 2000);
  };

  const faqs = [
    {
      q: 'Can I change or correct my custom name after ordering?',
      a: 'Yes, if you contact us within 12 hours of placing your order. Because each piece is custom laser-cut individually, once the laser cycle commences we cannot alter the metal plate.'
    },
    {
      q: 'How long does laser engraving and dispatch take?',
      a: 'Custom laser crafting typically takes 24 to 48 business hours. Standard insured delivery arrives in 3-5 business days, while Priority Express arrives in 2-3 business days.'
    },
    {
      q: 'Will my 18K gold necklace tarnish in the shower or gym?',
      a: 'Never. We utilize industrial Physical Vapor Deposition (PVD) vacuum bonding with 316L surgical stainless steel. It is 100% resistant to water, sweat, shampoos, and perfumes and backed by our Lifetime Tarnish Guarantee.'
    },
    {
      q: 'Can you engrave custom languages or symbols like Arabic, Hebrew, or Greek?',
      a: 'Absolutely! Our precision CNC fiber lasers can engrave any Unicode characters, Arabic calligraphy, coordinates, or symbols.'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      <div className="text-center space-y-3">
        <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold block">
          Customer Concierge
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif-luxury text-zinc-100 font-medium">
          Contact Our Master Artisans
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 max-w-md mx-auto">
          Have a question about a bespoke engraving, custom sizing, or order delivery? We are here to assist.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
        
        {/* Contact Form */}
        <div className="md:col-span-7 p-6 sm:p-8 rounded-2xl bg-zinc-900/60 border border-zinc-800">
          <h2 className="text-base font-semibold text-zinc-100 mb-6 flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-amber-400" />
            <span>Send Workshop Message</span>
          </h2>

          {formSubmitted ? (
            <div className="p-6 rounded-xl bg-amber-500/10 border border-amber-500/30 text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-amber-400 mx-auto" />
              <h3 className="text-sm font-semibold text-zinc-100">Message Received!</h3>
              <p className="text-xs text-zinc-400">
                Our customer concierge responds to all inquiries within 2-4 hours during atelier hours.
              </p>
              <button
                onClick={() => setFormSubmitted(false)}
                className="text-xs text-amber-400 underline font-medium"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="text-zinc-400 block mb-1 font-medium">Your Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Rachel Adams"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-zinc-400 block mb-1 font-medium">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="rachel@example.com"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="text-zinc-400 block mb-1 font-medium">Order Number (if applicable)</label>
                  <input
                    type="text"
                    value={formData.orderId}
                    onChange={(e) => setFormData({ ...formData, orderId: e.target.value })}
                    placeholder="e.g. MS-2026-7841"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="text-zinc-400 block mb-1 font-medium">Inquiry Topic</label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-200 focus:outline-none focus:border-amber-400"
                >
                  <option value="Personalization Question">Personalization Question / Custom Name</option>
                  <option value="Order Tracking">Order Tracking & Shipping Status</option>
                  <option value="Material & Plating">Material, PVD Plating & Warranty</option>
                  <option value="Bespoke Request">Bulk Orders / Custom Architectural Decor</option>
                </select>
              </div>

              <div>
                <label className="text-zinc-400 block mb-1 font-medium">Message *</label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="How can our artisans assist you?"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-amber-400"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-md shadow-amber-500/20"
              >
                <Send className="w-4 h-4" />
                <span>Submit Inquiry</span>
              </button>
            </form>
          )}
        </div>

        {/* Studio Direct Info */}
        <div className="md:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-4">
            <h3 className="text-sm font-bold text-zinc-100 uppercase tracking-wider">
              Studio Details
            </h3>

            <div className="space-y-4 text-xs text-zinc-400">
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-zinc-200">Email Support</strong>
                  <span>support@metalsmiths.store</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-zinc-200">Phone & WhatsApp</strong>
                  <span>+1 (800) 842-6382 (Toll Free)</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-zinc-200">Artisan Studio Workbench</strong>
                  <span>144 Artisan Row, Suite 400, Industrial District</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick FAQ Box */}
          <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-4">
            <h3 className="text-sm font-bold text-zinc-100 uppercase tracking-wider">
              Frequently Asked Questions
            </h3>

            <div className="space-y-2">
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div key={idx} className="border border-zinc-800/80 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full p-3 text-left bg-zinc-950/60 hover:bg-zinc-950 flex items-center justify-between text-xs font-semibold text-zinc-200 transition-colors"
                    >
                      <span>{faq.q}</span>
                      {isOpen ? <ChevronUp className="w-3.5 h-3.5 text-amber-400" /> : <ChevronDown className="w-3.5 h-3.5 text-zinc-500" />}
                    </button>
                    {isOpen && (
                      <div className="p-3 bg-zinc-900/40 text-xs text-zinc-400 leading-relaxed border-t border-zinc-800/80">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
