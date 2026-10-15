import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Product, Order, OrderStatus, ProductCategory, MetalFinish } from '../types';
import { 
  Package, 
  ShoppingBag, 
  DollarSign, 
  Plus, 
  Trash2, 
  Edit, 
  Check, 
  X, 
  Sparkles, 
  Clock, 
  Search, 
  RefreshCw, 
  AlertTriangle,
  ArrowLeft
} from 'lucide-react';

export const AdminPage: React.FC = () => {
  const { 
    products, 
    orders, 
    adminAddProduct, 
    adminUpdateProduct, 
    adminDeleteProduct, 
    adminUpdateOrderStatus, 
    resetToDefaults, 
    navigateTo 
  } = useStore();

  const [activeTab, setActiveTab] = useState<'products' | 'orders' | 'analytics'>('orders');
  
  // Search state
  const [orderSearch, setOrderSearch] = useState('');
  const [productSearch, setProductSearch] = useState('');

  // Edit product modal state
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);

  // New product form state
  const [newProd, setNewProd] = useState<Omit<Product, 'id'>>({
    name: '',
    category: 'Custom Jewelry',
    price: 55,
    originalPrice: 75,
    rating: 5.0,
    reviewsCount: 1,
    image: '/src/assets/images/hero_metalsmiths_craft_1792039762447.jpg',
    gallery: ['/src/assets/images/hero_metalsmiths_craft_1792039762447.jpg'],
    description: 'Custom handcrafted laser-forged metal piece with 18k real gold PVD vacuum coating.',
    features: ['18K Real Gold PVD Coating', 'Waterproof & anti-tarnish guarantee', 'Surgical 316L steel core'],
    isCustomizable: true,
    defaultCustomPlaceholder: 'Custom Name',
    availableFinishes: ['18K Gold', 'Polished Silver', 'Rose Gold', 'Matte Black'],
    stock: 25,
    isNew: true,
    isBestSeller: false,
    previewType: 'necklace'
  });

  // Calculate Metrics
  const totalRevenue = orders.reduce((acc, o) => acc + o.total, 0);
  const totalOrdersCount = orders.length;
  const pendingLaserQueue = orders.filter(o => o.orderStatus === 'Order Placed' || o.orderStatus === 'In Laser Crafting').length;
  const lowStockCount = products.filter(p => p.stock < 15).length;

  const filteredOrders = orders.filter(o => 
    o.orderId.toLowerCase().includes(orderSearch.toLowerCase()) ||
    o.customer.fullName.toLowerCase().includes(orderSearch.toLowerCase()) ||
    o.items.some(i => i.customName?.toLowerCase().includes(orderSearch.toLowerCase()))
  );

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
    p.category.toLowerCase().includes(productSearch.toLowerCase())
  );

  const handleSaveEditProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    adminUpdateProduct(editingProduct);
    setEditingProduct(null);
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProd.name.trim()) return;
    adminAddProduct(newProd);
    setIsAddingProduct(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
        <div>
          <button
            onClick={() => navigateTo('home')}
            className="text-xs text-zinc-400 hover:text-amber-400 transition-colors inline-flex items-center gap-1.5 font-medium mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Customer Storefront</span>
          </button>
          <h1 className="text-2xl sm:text-3xl font-serif-luxury text-zinc-100 font-medium flex items-center gap-2">
            <span>Artisan Studio & Order Control Panel</span>
            <span className="text-xs bg-amber-500/20 text-amber-300 font-sans px-2.5 py-0.5 rounded border border-amber-500/30 font-semibold">
              Admin Portal
            </span>
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Manage live orders, verify custom laser engravings, edit catalog prices, and track workshop inventory.
          </p>
        </div>

        <button
          onClick={resetToDefaults}
          className="text-xs text-zinc-400 hover:text-red-400 border border-zinc-800 hover:border-red-500/40 rounded-lg px-3 py-2 flex items-center gap-1.5 self-start sm:self-auto transition-colors"
          title="Reset products to default state"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reset Demo Catalog</span>
        </button>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-xl bg-zinc-900/60 border border-zinc-800 flex items-center justify-between">
          <div>
            <span className="text-xs text-zinc-400 uppercase tracking-wider block">Total Sales</span>
            <span className="text-2xl font-bold text-amber-300 tabular-nums">${totalRevenue.toFixed(2)}</span>
          </div>
          <div className="p-3 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <DollarSign className="w-5 h-5" />
          </div>
        </div>

        <div className="p-5 rounded-xl bg-zinc-900/60 border border-zinc-800 flex items-center justify-between">
          <div>
            <span className="text-xs text-zinc-400 uppercase tracking-wider block">Total Orders</span>
            <span className="text-2xl font-bold text-zinc-100 tabular-nums">{totalOrdersCount}</span>
          </div>
          <div className="p-3 rounded-lg bg-zinc-800 text-zinc-200">
            <ShoppingBag className="w-5 h-5" />
          </div>
        </div>

        <div className="p-5 rounded-xl bg-zinc-900/60 border border-zinc-800 flex items-center justify-between">
          <div>
            <span className="text-xs text-zinc-400 uppercase tracking-wider block">Laser Queue</span>
            <span className="text-2xl font-bold text-amber-400 tabular-nums">{pendingLaserQueue} pending</span>
          </div>
          <div className="p-3 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Sparkles className="w-5 h-5" />
          </div>
        </div>

        <div className="p-5 rounded-xl bg-zinc-900/60 border border-zinc-800 flex items-center justify-between">
          <div>
            <span className="text-xs text-zinc-400 uppercase tracking-wider block">Active Products</span>
            <span className="text-2xl font-bold text-zinc-100 tabular-nums">{products.length} catalog items</span>
          </div>
          <div className="p-3 rounded-lg bg-zinc-800 text-zinc-200">
            <Package className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-zinc-800 gap-4">
        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-3 text-sm font-semibold transition-all border-b-2 flex items-center gap-2 ${
            activeTab === 'orders'
              ? 'border-amber-400 text-amber-300'
              : 'border-transparent text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Customer Orders & Laser Manifest ({orders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('products')}
          className={`pb-3 text-sm font-semibold transition-all border-b-2 flex items-center gap-2 ${
            activeTab === 'products'
              ? 'border-amber-400 text-amber-300'
              : 'border-transparent text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Products & Inventory ({products.length})</span>
        </button>
      </div>

      {/* TAB 1: ORDERS MANAGEMENT */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by order ID, customer name, or custom engraved text..."
                value={orderSearch}
                onChange={(e) => setOrderSearch(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-9 pr-3 py-2 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-500"
              />
            </div>
            <div className="text-xs text-zinc-400">
              Showing <span className="font-semibold text-zinc-200">{filteredOrders.length}</span> orders
            </div>
          </div>

          {filteredOrders.length === 0 ? (
            <div className="p-12 text-center bg-zinc-900/30 rounded-xl border border-zinc-800 text-zinc-400 text-xs">
              No orders found matching the filter.
            </div>
          ) : (
            <div className="space-y-4">
              {filteredOrders.map((order) => (
                <div key={order.orderId} className="p-6 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-4">
                  {/* Order Top Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800 pb-3 text-xs">
                    <div className="flex items-center gap-3">
                      <span className="font-mono font-bold text-amber-300 text-sm">{order.orderId}</span>
                      <span className="text-zinc-500">·</span>
                      <span className="text-zinc-400">{order.date}</span>
                      <span className="text-zinc-500">·</span>
                      <span className="font-semibold text-zinc-200">{order.customer.fullName}</span>
                      <span className="text-zinc-500">({order.customer.city}, {order.customer.country})</span>
                    </div>

                    {/* Order Status Selector */}
                    <div className="flex items-center gap-2">
                      <span className="text-zinc-400">Status:</span>
                      <select
                        value={order.orderStatus}
                        onChange={(e) => adminUpdateOrderStatus(order.orderId, e.target.value as OrderStatus)}
                        className="bg-zinc-950 border border-zinc-700 text-amber-300 text-xs font-semibold rounded px-2.5 py-1 focus:outline-none focus:border-amber-400"
                      >
                        <option value="Order Placed">Order Placed</option>
                        <option value="In Laser Crafting">In Laser Crafting</option>
                        <option value="Quality Inspection">Quality Inspection</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </div>
                  </div>

                  {/* Items Manifest & CUSTOM NAMES */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <div className="lg:col-span-8 space-y-3">
                      <span className="text-[11px] uppercase tracking-wider text-zinc-500 font-semibold block">
                        Custom Inscribed Pieces to Laser Engrave:
                      </span>
                      {order.items.map((item, idx) => (
                        <div key={idx} className="p-3 rounded-lg bg-zinc-950/80 border border-zinc-800/80 flex items-start gap-3 text-xs">
                          <img src={item.image} alt={item.name} className="w-12 h-12 rounded object-cover border border-zinc-800 shrink-0" />
                          <div className="flex-1">
                            <span className="font-semibold text-zinc-100 block">{item.name}</span>
                            <div className="text-[11px] text-zinc-400 mt-0.5">
                              <span>Finish: <strong className="text-zinc-300">{item.selectedFinish}</strong></span>
                              {item.selectedSize && <span> · Size: <strong className="text-zinc-300">{item.selectedSize}</strong></span>}
                              <span> · Qty: {item.quantity}</span>
                            </div>

                            {item.customName ? (
                              <div className="mt-1.5 p-2 rounded bg-amber-500/10 border border-amber-500/30 inline-flex items-center gap-2 text-amber-300">
                                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                                <span>Laser Engraving Text: <strong className="text-white font-mono text-xs">"{item.customName}"</strong></span>
                              </div>
                            ) : (
                              <span className="text-[11px] text-zinc-500 italic block mt-1">Non-customized piece</span>
                            )}
                          </div>
                          <span className="font-bold text-zinc-200 tabular-nums">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Customer & Shipping Summary */}
                    <div className="lg:col-span-4 p-4 rounded-lg bg-zinc-950/50 border border-zinc-800/60 text-xs space-y-2">
                      <span className="text-[11px] uppercase tracking-wider text-zinc-400 font-semibold block">
                        Customer & Fulfillment
                      </span>
                      <p className="text-zinc-300"><strong>Recipient:</strong> {order.customer.fullName}</p>
                      <p className="text-zinc-400"><strong>Phone:</strong> {order.customer.phone}</p>
                      <p className="text-zinc-400"><strong>Address:</strong> {order.customer.address}, {order.customer.city} {order.customer.postalCode}</p>
                      <p className="text-zinc-400"><strong>Payment:</strong> {order.paymentStatus}</p>
                      <div className="pt-2 border-t border-zinc-800/80 flex justify-between font-bold text-zinc-200">
                        <span>Total Paid:</span>
                        <span className="text-amber-400 tabular-nums">${order.total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: PRODUCTS CATALOG MANAGER */}
      {activeTab === 'products' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search products by title or category..."
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-9 pr-3 py-2 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-500"
              />
            </div>

            <button
              onClick={() => setIsAddingProduct(true)}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 shadow-md shadow-amber-500/20 self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Metal Piece</span>
            </button>
          </div>

          {/* Product Add Modal */}
          {isAddingProduct && (
            <div className="p-6 rounded-xl bg-zinc-900 border border-amber-500/50 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <h3 className="text-sm font-bold text-zinc-100 flex items-center gap-2">
                  <Plus className="w-4 h-4 text-amber-400" />
                  <span>Add New Product to Catalog</span>
                </h3>
                <button onClick={() => setIsAddingProduct(false)} className="text-zinc-400 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleCreateProduct} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="sm:col-span-2">
                  <label className="text-zinc-400 block mb-1">Product Title *</label>
                  <input
                    type="text"
                    required
                    value={newProd.name}
                    onChange={(e) => setNewProd({ ...newProd, name: e.target.value })}
                    placeholder="e.g. Personalized Dual-Layer Metal Family Monogram"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-zinc-100 focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="text-zinc-400 block mb-1">Category</label>
                  <select
                    value={newProd.category}
                    onChange={(e) => setNewProd({ ...newProd, category: e.target.value as any })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-zinc-200"
                  >
                    <option value="Custom Jewelry">Custom Jewelry</option>
                    <option value="Name Lockets">Name Lockets</option>
                    <option value="Bracelets">Bracelets</option>
                    <option value="Wall Art">Wall Art</option>
                    <option value="Couple Stands">Couple Stands</option>
                    <option value="Home Decor">Home Decor</option>
                  </select>
                </div>

                <div>
                  <label className="text-zinc-400 block mb-1">Sale Price ($)</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={newProd.price}
                    onChange={(e) => setNewProd({ ...newProd, price: Number(e.target.value) })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-zinc-100"
                  />
                </div>

                <div>
                  <label className="text-zinc-400 block mb-1">Original Price ($)</label>
                  <input
                    type="number"
                    min="1"
                    value={newProd.originalPrice || ''}
                    onChange={(e) => setNewProd({ ...newProd, originalPrice: Number(e.target.value) })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-zinc-100"
                  />
                </div>

                <div>
                  <label className="text-zinc-400 block mb-1">Available Stock Units</label>
                  <input
                    type="number"
                    min="0"
                    value={newProd.stock}
                    onChange={(e) => setNewProd({ ...newProd, stock: Number(e.target.value) })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-zinc-100"
                  />
                </div>

                <div className="sm:col-span-2 flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="isCustomizableNew"
                    checked={newProd.isCustomizable}
                    onChange={(e) => setNewProd({ ...newProd, isCustomizable: e.target.checked })}
                    className="rounded text-amber-500 focus:ring-amber-400"
                  />
                  <label htmlFor="isCustomizableNew" className="text-zinc-200 font-medium cursor-pointer">
                    Enable "Enter Your Custom Name" Laser Engraving Field
                  </label>
                </div>

                <div className="sm:col-span-2 flex justify-end gap-3 pt-3 border-t border-zinc-800">
                  <button
                    type="button"
                    onClick={() => setIsAddingProduct(false)}
                    className="px-4 py-2 bg-zinc-800 text-zinc-300 rounded hover:bg-zinc-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded"
                  >
                    Publish to Storefront
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Product Edit Modal */}
          {editingProduct && (
            <div className="p-6 rounded-xl bg-zinc-900 border border-amber-500/50 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <h3 className="text-sm font-bold text-zinc-100 flex items-center gap-2">
                  <Edit className="w-4 h-4 text-amber-400" />
                  <span>Edit Product: {editingProduct.name}</span>
                </h3>
                <button onClick={() => setEditingProduct(null)} className="text-zinc-400 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSaveEditProduct} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="sm:col-span-2">
                  <label className="text-zinc-400 block mb-1">Product Title</label>
                  <input
                    type="text"
                    required
                    value={editingProduct.name}
                    onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-zinc-100"
                  />
                </div>

                <div>
                  <label className="text-zinc-400 block mb-1">Price ($)</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={editingProduct.price}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-zinc-100"
                  />
                </div>

                <div>
                  <label className="text-zinc-400 block mb-1">Original Price ($)</label>
                  <input
                    type="number"
                    min="1"
                    value={editingProduct.originalPrice || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, originalPrice: Number(e.target.value) })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-zinc-100"
                  />
                </div>

                <div>
                  <label className="text-zinc-400 block mb-1">Stock Level</label>
                  <input
                    type="number"
                    min="0"
                    value={editingProduct.stock}
                    onChange={(e) => setEditingProduct({ ...editingProduct, stock: Number(e.target.value) })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-zinc-100"
                  />
                </div>

                <div className="flex items-center gap-2 pt-4">
                  <input
                    type="checkbox"
                    id="isCustomizableEdit"
                    checked={editingProduct.isCustomizable}
                    onChange={(e) => setEditingProduct({ ...editingProduct, isCustomizable: e.target.checked })}
                    className="rounded text-amber-500 focus:ring-amber-400"
                  />
                  <label htmlFor="isCustomizableEdit" className="text-zinc-200 font-medium cursor-pointer">
                    Custom Name Field Active
                  </label>
                </div>

                <div className="sm:col-span-2 flex justify-end gap-3 pt-3 border-t border-zinc-800">
                  <button
                    type="button"
                    onClick={() => setEditingProduct(null)}
                    className="px-4 py-2 bg-zinc-800 text-zinc-300 rounded hover:bg-zinc-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Product Items Table */}
          <div className="rounded-xl border border-zinc-800 overflow-hidden bg-zinc-900/60">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-zinc-950 text-zinc-400 uppercase tracking-wider text-[11px] border-b border-zinc-800">
                  <tr>
                    <th className="p-4">Product</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Price</th>
                    <th className="p-4">Stock</th>
                    <th className="p-4">Customizable</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/80">
                  {filteredProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-zinc-900/90 transition-colors">
                      <td className="p-4 flex items-center gap-3">
                        <img src={p.image} alt={p.name} className="w-10 h-10 rounded object-cover border border-zinc-800 shrink-0" />
                        <div>
                          <span className="font-semibold text-zinc-100 block">{p.name}</span>
                          <span className="text-[10px] text-zinc-500">{p.id}</span>
                        </div>
                      </td>
                      <td className="p-4 text-zinc-300">{p.category}</td>
                      <td className="p-4 font-bold text-zinc-100 tabular-nums">
                        ${p.price}
                        {p.originalPrice && (
                          <span className="text-zinc-500 text-[10px] line-through ml-1 tabular-nums">${p.originalPrice}</span>
                        )}
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-0.5 rounded text-[11px] font-semibold tabular-nums ${
                          p.stock < 15 ? 'bg-red-500/20 text-red-300' : 'bg-emerald-500/20 text-emerald-300'
                        }`}>
                          {p.stock} units
                        </span>
                      </td>
                      <td className="p-4">
                        {p.isCustomizable ? (
                          <span className="text-amber-400 flex items-center gap-1 font-medium">
                            <Sparkles className="w-3 h-3" />
                            Yes
                          </span>
                        ) : (
                          <span className="text-zinc-500">Standard</span>
                        )}
                      </td>
                      <td className="p-4 text-right space-x-2">
                        <button
                          onClick={() => setEditingProduct(p)}
                          className="px-2.5 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Are you sure you want to delete ${p.name}?`)) {
                              adminDeleteProduct(p.id);
                            }
                          }}
                          className="px-2.5 py-1 bg-red-950/60 hover:bg-red-900 text-red-300 rounded border border-red-500/30 transition-colors"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
