import React from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import { ProductCategory } from '../types';
import { Sparkles, ArrowRight, ShieldCheck, Flame, SlidersHorizontal, Search, CheckCircle2 } from 'lucide-react';

export const HomePage: React.FC = () => {
  const { 
    products, 
    navigateTo, 
    activeCategory, 
    setActiveCategory, 
    searchQuery, 
    setSearchQuery,
    sortBy,
    setSortBy
  } = useStore();

  const categories: ProductCategory[] = [
    'All',
    'Custom Jewelry',
    'Name Lockets',
    'Bracelets',
    'Wall Art',
    'Couple Stands',
    'Home Decor'
  ];

  // Filter products for the showcase
  const filteredProducts = products.filter(product => {
    const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
    return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
  });

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* 1. Hero Section: Storefront Focal Anchor */}
      <section className="relative overflow-hidden border-b border-zinc-800/80 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold tracking-wide uppercase">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>The Personalized Metalcraft Atelier</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif-luxury font-medium tracking-tight text-zinc-100 leading-[1.1] text-balance">
                Turn Precious Names into <span className="gold-gradient-text italic font-serif">Timeless Metal</span> Masterpieces.
              </h1>

              <p className="text-base sm:text-lg text-zinc-400 max-w-xl leading-relaxed">
                Discover bespoke 18K gold nameplate necklaces, personalized infinity couple stands, engraved coordinate cuffs, and architectural laser wall art. Handcrafted to order with lifetime anti-tarnish protection.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => { setActiveCategory('All'); navigateTo('products'); }}
                  className="px-6 py-3.5 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-zinc-950 font-bold text-sm rounded-lg transition-all shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 flex items-center gap-2 shrink-0 group"
                >
                  <span>Explore Custom Catalog</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => navigateTo('product-detail', 'ms-02')}
                  className="px-5 py-3.5 bg-zinc-900/80 hover:bg-zinc-800 text-zinc-200 border border-zinc-700/80 hover:border-amber-400/50 font-medium text-sm rounded-lg transition-all shrink-0 flex items-center gap-2"
                >
                  <span>Customize Couple Stand</span>
                  <Sparkles className="w-4 h-4 text-amber-400" />
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 border-t border-zinc-800/80 grid grid-cols-3 gap-4 text-zinc-400 text-xs">
                <div>
                  <strong className="block text-zinc-200 text-sm font-semibold tabular-nums">18K Real Gold</strong>
                  <span>PVD Vacuum Coating</span>
                </div>
                <div>
                  <strong className="block text-zinc-200 text-sm font-semibold tabular-nums">0.01mm Laser</strong>
                  <span>Fiber Precision Cut</span>
                </div>
                <div>
                  <strong className="block text-zinc-200 text-sm font-semibold tabular-nums">100% Anti-Fade</strong>
                  <span>Lifetime Guarantee</span>
                </div>
              </div>
            </div>

            {/* Right Hero Visual Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 shadow-2xl group">
                <img
                  src="/src/assets/images/hero_metalsmiths_craft_1792039762447.jpg"
                  alt="Metalsmiths Handcrafted Personalized Jewelry"
                  className="w-full h-full object-cover object-center aspect-[4/3] group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Visual Glass Overlay Badge */}
                <div className="absolute bottom-4 inset-x-4 p-4 rounded-xl bg-zinc-950/85 backdrop-blur-md border border-zinc-800/80 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-amber-400 font-semibold block">
                      Live Studio Crafting
                    </span>
                    <h3 className="text-sm font-semibold text-zinc-100">
                      Bespoke Laser Cut & Engraved To Order
                    </h3>
                  </div>
                  <button
                    onClick={() => navigateTo('products')}
                    className="p-2 bg-amber-500 hover:bg-amber-400 text-black rounded-lg transition-colors"
                    aria-label="View collection"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Three-Step Personalization Flow */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold block mb-2">
            The Bespoke Experience
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif-luxury text-zinc-100 font-medium">
            How Your Custom Metal Piece is Created
          </h2>
          <p className="text-sm text-zinc-400 mt-2">
            From digital real-time lettering to our master laser workbench in 3 simple steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-xl bg-zinc-900/40 border border-zinc-800/80 hover:border-amber-500/30 transition-all flex flex-col justify-between">
            <div>
              <span className="font-serif-luxury text-3xl font-bold text-amber-400/80 block mb-3">01.</span>
              <h3 className="text-base font-semibold text-zinc-100 mb-2">
                Type Your Name & Choose Finish
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Enter your desired name, anniversary date, or secret coordinates. Preview your custom font in 18K Gold, Silver, Rose Gold, or Matte Black in real time.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-zinc-800/60 flex items-center gap-2 text-xs text-amber-400/90 font-medium">
              <CheckCircle2 className="w-4 h-4" />
              <span>Live interactive preview</span>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-zinc-900/40 border border-zinc-800/80 hover:border-amber-500/30 transition-all flex flex-col justify-between">
            <div>
              <span className="font-serif-luxury text-3xl font-bold text-amber-400/80 block mb-3">02.</span>
              <h3 className="text-base font-semibold text-zinc-100 mb-2">
                Precision Laser Cut & Hand Buff
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Our artisans carve your design using ultra-focused industrial fiber lasers, followed by meticulous hand-beveling and multi-stage mirror polishing.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-zinc-800/60 flex items-center gap-2 text-xs text-amber-400/90 font-medium">
              <CheckCircle2 className="w-4 h-4" />
              <span>Hypoallergenic 316L surgical steel</span>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-zinc-900/40 border border-zinc-800/80 hover:border-amber-500/30 transition-all flex flex-col justify-between">
            <div>
              <span className="font-serif-luxury text-3xl font-bold text-amber-400/80 block mb-3">03.</span>
              <h3 className="text-base font-semibold text-zinc-100 mb-2">
                Luxury Velvet Box & Doorstep Delivery
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Carefully cushioned inside our signature debossed black and gold keepsake box, complete with anti-tarnish authenticity card and polishing cloth.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-zinc-800/60 flex items-center gap-2 text-xs text-amber-400/90 font-medium">
              <CheckCircle2 className="w-4 h-4" />
              <span>Ready for gifting or personal keep</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Main Product Showcase & Interactive Filter Controls */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 pb-6 border-b border-zinc-800">
          <div>
            <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold block mb-1">
              Curated Catalog
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif-luxury text-zinc-100 font-medium">
              Personalized Metal Creations
            </h2>
            <p className="text-xs text-zinc-400 mt-1">
              Showing {filteredProducts.length} items ready for bespoke laser engraving
            </p>
          </div>

          {/* Controls: Search, Category, Sort */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Search Input */}
            <div className="relative min-w-[200px] sm:min-w-[240px]">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search name or style..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs rounded-lg px-3 py-1.5 focus:outline-none focus:border-amber-500 cursor-pointer"
            >
              <option value="featured">Sort: Featured & Bestsellers</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Customer Rating</option>
              <option value="newest">Newest Additions</option>
            </select>
          </div>
        </div>

        {/* Category Filter Buttons (Functional segmented buttons) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? 'bg-amber-500 text-black font-semibold shadow-md shadow-amber-500/20'
                  : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-zinc-800 hover:border-zinc-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-zinc-900/30 rounded-xl border border-zinc-800">
            <p className="text-zinc-400 text-sm">No metal craft found matching your search.</p>
            <button
              onClick={() => { setActiveCategory('All'); setSearchQuery(''); }}
              className="mt-3 text-xs text-amber-400 hover:underline font-medium"
            >
              Reset filters and view all items
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* View All Button */}
        <div className="mt-12 text-center">
          <button
            onClick={() => { setActiveCategory('All'); navigateTo('products'); }}
            className="px-8 py-3 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 hover:border-amber-400/50 text-zinc-200 font-semibold text-sm rounded-lg transition-all inline-flex items-center gap-2"
          >
            <span>View Complete Store Catalog</span>
            <ArrowRight className="w-4 h-4 text-amber-400" />
          </button>
        </div>
      </section>

      {/* 4. Craftsmanship Story Spotlight */}
      <section className="bg-zinc-950 border-t border-b border-zinc-800/80 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-5">
              <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold block">
                The Metal Smiths Standard
              </span>
              <h2 className="text-3xl font-serif-luxury text-zinc-100 font-medium leading-snug">
                Why Standard Plating Fails & How Our PVD Vacuum Method Lasts Decades
              </h2>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Conventional fashion jewelry uses cheap brass coated with a microscopic layer of electroplated gold that turns skin green and tarnishes within weeks of contact with water or perfume.
              </p>
              <p className="text-sm text-zinc-400 leading-relaxed">
                At Metal Smiths, every piece begins with medical-grade 316L stainless steel that is vaporized with pure titanium and 18-karat real gold in a high-temperature vacuum chamber (Physical Vapor Deposition). The result is an atomic molecular bond that is impervious to sweat, perfume, ocean water, and daily wear.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2 text-xs">
                <div className="p-3 rounded-lg bg-zinc-900/60 border border-zinc-800">
                  <div className="font-semibold text-amber-300 mb-1">100% Water & Gym Proof</div>
                  <span className="text-zinc-500">Wear in the shower, pool, or during workouts without removing.</span>
                </div>
                <div className="p-3 rounded-lg bg-zinc-900/60 border border-zinc-800">
                  <div className="font-semibold text-amber-300 mb-1">Hypoallergenic & Nickel-Free</div>
                  <span className="text-zinc-500">Zero skin irritation, itching, or green marks guaranteed.</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => navigateTo('about')}
                  className="text-xs text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1.5"
                >
                  <span>Read our full workshop story</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900">
              <img
                src="/src/assets/images/product_personalized_bracelet_1792039764042.jpg"
                alt="Precision Laser Engraved Coordinates Bracelet"
                className="w-full h-full object-cover object-center aspect-[4/3]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 5. Customer Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold block mb-1">
            Real Customer Words
          </span>
          <h2 className="text-2xl font-serif-luxury text-zinc-100 font-medium">
            Over 10,000 Cherished Gifts Delivered
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl bg-zinc-900/60 border border-zinc-800/80 flex flex-col justify-between">
            <p className="text-xs text-zinc-300 italic leading-relaxed mb-4">
              "I ordered the Infinity Couple Stand with my husband’s and my name for our 5th wedding anniversary. Seeing our names laser-cut in real metal brought tears to his eyes. The weight and finish feel so luxurious!"
            </p>
            <div className="pt-4 border-t border-zinc-800/60 text-xs">
              <span className="font-semibold text-zinc-200 block">Claire & Marcus D.</span>
              <span className="text-zinc-500">Verified Buyer · Austin, TX</span>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-zinc-900/60 border border-zinc-800/80 flex flex-col justify-between">
            <p className="text-xs text-zinc-300 italic leading-relaxed mb-4">
              "The live name preview on the website looked exactly like what arrived in the velvet box. I have worn my gold script necklace in the shower every single day for 6 months and it is as mirror-bright as day one."
            </p>
            <div className="pt-4 border-t border-zinc-800/60 text-xs">
              <span className="font-semibold text-zinc-200 block">Sophia Hernandez</span>
              <span className="text-zinc-500">Verified Buyer · London, UK</span>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-zinc-900/60 border border-zinc-800/80 flex flex-col justify-between">
            <p className="text-xs text-zinc-300 italic leading-relaxed mb-4">
              "We ordered the custom calligraphy laser wall plaque for our new dining room. The standoff hardware casts the most dramatic shadows when the evening sun hits it. True gallery-grade metalwork."
            </p>
            <div className="pt-4 border-t border-zinc-800/60 text-xs">
              <span className="font-semibold text-zinc-200 block">Tariq Al-Mansoor</span>
              <span className="text-zinc-500">Verified Buyer · Toronto, Canada</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
