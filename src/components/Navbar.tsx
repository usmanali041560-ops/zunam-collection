import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCategory } from '../types';
import { ShoppingBag, Search, Menu, X, ShieldCheck, Sparkles, SlidersHorizontal } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    activePage, 
    navigateTo, 
    cartItemCount, 
    activeCategory, 
    setActiveCategory,
    searchQuery,
    setSearchQuery 
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const categories: ProductCategory[] = [
    'All',
    'Custom Jewelry',
    'Name Lockets',
    'Bracelets',
    'Wall Art',
    'Couple Stands',
    'Home Decor'
  ];

  const handleCategoryClick = (cat: ProductCategory) => {
    setActiveCategory(cat);
    navigateTo('products');
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0c0d0e]/95 backdrop-blur-md border-b border-zinc-800/80">
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-zinc-900 via-amber-950/40 to-zinc-900 text-xs text-amber-200/90 py-1.5 px-4 text-center border-b border-amber-500/20 flex items-center justify-center gap-3">
        <span className="flex items-center gap-1.5 font-medium tracking-wider uppercase text-[11px]">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          Complimentary Luxury Gift Box & Anti-Tarnish Guarantee with every order
        </span>
        <span className="hidden sm:inline text-zinc-600">|</span>
        <span className="hidden sm:inline text-zinc-400">
          Use code <strong className="text-amber-300 font-semibold">METAL15</strong> for 15% off
        </span>
      </div>

      {/* Main Top Bar: 3 Zones Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <button 
            onClick={() => navigateTo('home')}
            className="text-left group flex items-center gap-2.5 focus:outline-none"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-400 via-amber-600 to-amber-700 p-0.5 flex items-center justify-center shadow-lg shadow-amber-900/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-zinc-950 rounded-[7px] flex items-center justify-center">
                <span className="font-brand font-bold text-lg text-amber-400 tracking-wider">M</span>
              </div>
            </div>
            <div>
              <span className="font-brand text-2xl font-bold tracking-widest text-zinc-100 group-hover:text-amber-300 transition-colors block leading-tight">
                METAL SMITHS
              </span>
              <span className="text-[10px] uppercase tracking-[0.25em] text-zinc-400 font-medium block">
                Bespoke Metalcraft
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: Navigation Links (Single-line, 4-5 links) */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-zinc-300">
          <button
            onClick={() => navigateTo('home')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-amber-300 ${activePage === 'home' ? 'text-amber-400 font-semibold' : ''}`}
          >
            Home
          </button>
          <button
            onClick={() => { setActiveCategory('All'); navigateTo('products'); }}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-amber-300 ${activePage === 'products' ? 'text-amber-400 font-semibold' : ''}`}
          >
            All Products
          </button>
          <button
            onClick={() => { setActiveCategory('Custom Jewelry'); navigateTo('products'); }}
            className="whitespace-nowrap shrink-0 transition-colors hover:text-amber-300"
          >
            Custom Jewelry
          </button>
          <button
            onClick={() => { setActiveCategory('Couple Stands'); navigateTo('products'); }}
            className="whitespace-nowrap shrink-0 transition-colors hover:text-amber-300"
          >
            Couple Stands
          </button>
          <button
            onClick={() => navigateTo('about')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-amber-300 ${activePage === 'about' ? 'text-amber-400 font-semibold' : ''}`}
          >
            Our Craft
          </button>
          <button
            onClick={() => navigateTo('contact')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-amber-300 ${activePage === 'contact' ? 'text-amber-400 font-semibold' : ''}`}
          >
            Contact
          </button>
        </nav>

        {/* Zone 3: Actions (Search, Admin Portal, Cart) */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Search Trigger */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            aria-label="Search products"
            className="p-2.5 text-zinc-400 hover:text-amber-300 hover:bg-zinc-800/60 rounded-lg transition-colors"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Admin Management Button */}
          <button
            onClick={() => navigateTo('admin')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activePage === 'admin'
                ? 'bg-amber-400/10 text-amber-300 border-amber-500/50'
                : 'bg-zinc-900 text-zinc-300 border-zinc-700/60 hover:border-amber-500/40 hover:text-amber-200'
            }`}
            title="Open Admin Store & Orders Portal"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Admin Studio</span>
          </button>

          {/* Shopping Cart Button */}
          <button
            onClick={() => navigateTo('cart')}
            aria-label="View shopping bag"
            className="relative p-2.5 text-zinc-100 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-amber-500/40 rounded-lg transition-all flex items-center gap-2"
          >
            <ShoppingBag className="w-5 h-5 text-amber-400" />
            {cartItemCount > 0 && (
              <span className="bg-gradient-to-r from-amber-500 to-amber-600 text-black text-[11px] font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center leading-none">
                {cartItemCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            className="lg:hidden p-2.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800/60 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Expandable Search Input */}
      {searchOpen && (
        <div className="bg-zinc-900/95 border-t border-b border-zinc-800 px-4 py-3 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="max-w-3xl mx-auto flex items-center gap-3">
            <Search className="w-5 h-5 text-amber-400 shrink-0" />
            <input
              type="text"
              placeholder="Search personalized necklaces, couple stands, wall art, bracelets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  navigateTo('products');
                  setSearchOpen(false);
                }
              }}
              autoFocus
              className="w-full bg-transparent border-none text-zinc-100 placeholder-zinc-500 focus:outline-none text-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs text-zinc-400 hover:text-zinc-200"
              >
                Clear
              </button>
            )}
            <button
              onClick={() => {
                navigateTo('products');
                setSearchOpen(false);
              }}
              className="px-4 py-1.5 bg-amber-500 hover:bg-amber-400 text-black font-semibold text-xs rounded-md transition-colors shrink-0"
            >
              Search
            </button>
          </div>
        </div>
      )}

      {/* Category Pills Strip */}
      <div className="bg-zinc-950/80 border-t border-zinc-900 px-4 py-2 overflow-x-auto scrollbar-none">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs">
          <span className="text-zinc-500 font-medium uppercase tracking-wider text-[11px] mr-2 shrink-0">
            Collections:
          </span>
          {categories.map((cat) => {
            const isActive = activeCategory === cat && activePage === 'products';
            return (
              <button
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                className={`px-3 py-1.5 rounded-md whitespace-nowrap transition-all font-medium ${
                  isActive
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[110px] bg-zinc-950/98 border-b border-zinc-800 p-6 shadow-2xl backdrop-blur-xl z-50">
          <div className="flex flex-col gap-4 text-base font-medium">
            <button
              onClick={() => { navigateTo('home'); setMobileMenuOpen(false); }}
              className="text-left py-2 text-zinc-200 hover:text-amber-400 border-b border-zinc-800/60"
            >
              Home
            </button>
            <button
              onClick={() => { setActiveCategory('All'); navigateTo('products'); setMobileMenuOpen(false); }}
              className="text-left py-2 text-zinc-200 hover:text-amber-400 border-b border-zinc-800/60"
            >
              All Products
            </button>
            <div className="py-2 border-b border-zinc-800/60">
              <span className="text-xs uppercase text-zinc-500 tracking-wider block mb-2">Shop by Category</span>
              <div className="grid grid-cols-2 gap-2 text-sm text-zinc-300">
                {categories.filter(c => c !== 'All').map(cat => (
                  <button
                    key={cat}
                    onClick={() => handleCategoryClick(cat)}
                    className="text-left py-1 text-zinc-400 hover:text-amber-300"
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            <button
              onClick={() => { navigateTo('about'); setMobileMenuOpen(false); }}
              className="text-left py-2 text-zinc-200 hover:text-amber-400 border-b border-zinc-800/60"
            >
              Artisan Craftsmanship & Story
            </button>
            <button
              onClick={() => { navigateTo('contact'); setMobileMenuOpen(false); }}
              className="text-left py-2 text-zinc-200 hover:text-amber-400 border-b border-zinc-800/60"
            >
              Contact Support
            </button>
            <button
              onClick={() => { navigateTo('shipping'); setMobileMenuOpen(false); }}
              className="text-left py-2 text-zinc-200 hover:text-amber-400 border-b border-zinc-800/60"
            >
              Shipping & Returns
            </button>
            <button
              onClick={() => { navigateTo('admin'); setMobileMenuOpen(false); }}
              className="text-left py-2 text-amber-300 hover:text-amber-200 flex items-center gap-2"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Store Admin & Inventory Management
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
