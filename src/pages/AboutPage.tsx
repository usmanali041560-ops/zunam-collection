import React from 'react';
import { useStore } from '../context/StoreContext';
import { Sparkles, ShieldCheck, Award, Flame, ArrowRight } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { navigateTo } = useStore();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Hero */}
      <div className="text-center space-y-4">
        <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold block">
          Our Heritage & Philosophy
        </span>
        <h1 className="text-4xl sm:text-5xl font-serif-luxury text-zinc-100 font-medium leading-tight">
          Where Industrial Precision Meets Sentimental Artistry
        </h1>
        <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          Metal Smiths was founded on a simple conviction: the jewelry and decorative artifacts that bear the names of people you love should never be fragile, plated with cheap alloy, or made to discard.
        </p>
      </div>

      {/* Visual Showcase */}
      <div className="rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-950 aspect-[16/9] relative shadow-2xl">
        <img
          src="/src/assets/images/hero_metalsmiths_craft_1792039762447.jpg"
          alt="Metal Smiths Workshop Studio"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-8">
          <p className="text-xs sm:text-sm text-zinc-200 max-w-lg italic font-serif">
            "Every cut of our fiber lasers is governed by mathematical precision down to ten microns, while every surface is polished by human hand."
          </p>
        </div>
      </div>

      {/* The 3 Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-6 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-3">
          <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center">
            <Flame className="w-5 h-5" />
          </div>
          <h3 className="text-base font-semibold text-zinc-100">PVD Vacuum Molecular Fusion</h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Unlike cheap wet-bath dipping, we bond genuine 18-karat gold onto surgical steel in high-vacuum chambers. The bond never chips, peels, or fades when exposed to moisture.
          </p>
        </div>

        <div className="p-6 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-3">
          <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="text-base font-semibold text-zinc-100">Hypoallergenic 316L Core</h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            We reject lead, nickel, and green-corroding brass. Medical-grade 316L stainless steel ensures your skin stays comfortable even with 24/7 continuous wear.
          </p>
        </div>

        <div className="p-6 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-3">
          <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-base font-semibold text-zinc-100">Lifetime Tarnish Guarantee</h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            If your piece ever tarnishes or loses its mirror gold shine under normal conditions, we will re-plate or remake it free of charge for the rest of your life.
          </p>
        </div>
      </div>

      {/* Workshop Callout */}
      <div className="p-8 rounded-2xl bg-gradient-to-r from-zinc-900 via-zinc-950 to-zinc-900 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-lg font-bold text-zinc-100">Ready to create your one-of-a-kind keepsake?</h3>
          <p className="text-xs text-zinc-400 mt-1">
            Explore our curated catalog of custom name necklaces, couple stands, and wall decor.
          </p>
        </div>
        <button
          onClick={() => navigateTo('products')}
          className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-black font-semibold text-xs rounded-lg transition-colors flex items-center gap-2 shrink-0 shadow-lg shadow-amber-500/20"
        >
          <span>Shop the Catalog</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
