import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Order, OrderCustomer, OrderStatus, ProductCategory, MetalFinish, FontStyleOption, ActivePage } from '../types';
import { INITIAL_PRODUCTS } from '../data/initialProducts';

interface StoreContextType {
  products: Product[];
  cart: CartItem[];
  orders: Order[];
  activePage: ActivePage;
  selectedProduct: Product | null;
  activeCategory: ProductCategory;
  searchQuery: string;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'newest' | 'rating';
  lastOrder: Order | null;
  discountCode: string;
  discountRate: number;
  
  // Navigation
  navigateTo: (page: ActivePage, productId?: string) => void;
  setActiveCategory: (cat: ProductCategory) => void;
  setSearchQuery: (query: string) => void;
  setSortBy: (sort: 'featured' | 'price-asc' | 'price-desc' | 'newest' | 'rating') => void;
  setSelectedProduct: (product: Product | null) => void;

  // Cart actions
  addToCart: (product: Product, options: {
    quantity: number;
    customName: string;
    selectedFinish: MetalFinish;
    selectedSize?: string;
    fontStyle?: FontStyleOption;
  }) => void;
  updateCartItemQuantity: (cartItemId: string, quantity: number) => void;
  updateCartItemCustomName: (cartItemId: string, newCustomName: string) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
  applyDiscount: (code: string) => { success: boolean; message: string };
  removeDiscount: () => void;

  // Checkout & Orders
  placeOrder: (customer: OrderCustomer, paymentMethod: 'cod' | 'card' | 'apple_pay') => Order;

  // Admin Actions
  adminAddProduct: (product: Omit<Product, 'id'>) => Product;
  adminUpdateProduct: (product: Product) => void;
  adminDeleteProduct: (productId: string) => void;
  adminUpdateOrderStatus: (orderId: string, status: OrderStatus, trackingNumber?: string) => void;
  resetToDefaults: () => void;

  // Calculated values
  cartItemCount: number;
  cartSubtotal: number;
  cartDiscountAmount: number;
  cartShippingFee: number;
  cartGrandTotal: number;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const PRODUCTS_STORAGE_KEY = 'metalsmiths_products_v2';
const CART_STORAGE_KEY = 'metalsmiths_cart_v2';
const ORDERS_STORAGE_KEY = 'metalsmiths_orders_v2';

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load products
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(PRODUCTS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // fallback
    }
    return INITIAL_PRODUCTS;
  });

  // Load cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [];
  });

  // Load orders
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [
      {
        orderId: 'MS-2026-7841',
        date: '2026-10-12',
        customer: {
          fullName: 'Jessica Miller',
          email: 'jessica.m@example.com',
          phone: '+1 (555) 234-5678',
          address: '742 Evergreen Terrace',
          city: 'Portland',
          postalCode: '97201',
          country: 'United States'
        },
        items: [
          {
            cartItemId: 'sample-1',
            productId: 'ms-01',
            name: 'Bespoke 18K Gold Signature Name Necklace',
            price: 58,
            originalPrice: 85,
            image: '/src/assets/images/product_custom_name_necklace_1792039762287.jpg',
            quantity: 1,
            customName: 'Jessica',
            selectedFinish: '18K Gold',
            selectedSize: '16 inch',
            fontStyle: 'Signature Script'
          }
        ],
        subtotal: 58,
        shippingFee: 4.99,
        discount: 0,
        total: 62.99,
        paymentMethod: 'card',
        paymentStatus: 'Paid',
        orderStatus: 'In Laser Crafting',
        trackingNumber: 'MS-FEDEX-99210',
        estimatedDelivery: 'Oct 19, 2026'
      }
    ];
  });

  // UI state
  const [activePage, setActivePage] = useState<ActivePage>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeCategory, setActiveCategory] = useState<ProductCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'newest' | 'rating'>('featured');
  const [lastOrder, setLastOrder] = useState<Order | null>(null);

  // Discount state
  const [discountCode, setDiscountCode] = useState('');
  const [discountRate, setDiscountRate] = useState(0); // e.g. 0.1 for 10%

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
    } catch {
      // ignore
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch {
      // ignore
    }
  }, [orders]);

  // Navigation handler
  const navigateTo = (page: ActivePage, productId?: string) => {
    if (productId) {
      const prod = products.find(p => p.id === productId);
      if (prod) {
        setSelectedProduct(prod);
      }
    }
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Add to cart
  const addToCart = (product: Product, options: {
    quantity: number;
    customName: string;
    selectedFinish: MetalFinish;
    selectedSize?: string;
    fontStyle?: FontStyleOption;
  }) => {
    // Generate unique composite key so different custom names or finishes remain separate items
    const normalizedName = options.customName.trim();
    const itemKey = `${product.id}-${options.selectedFinish}-${options.selectedSize || 'default'}-${normalizedName}-${options.fontStyle || 'default'}`;

    setCart(prevCart => {
      const existingIndex = prevCart.findIndex(item => item.cartItemId === itemKey);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += options.quantity;
        return updated;
      }

      const newItem: CartItem = {
        cartItemId: itemKey,
        productId: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image,
        quantity: options.quantity,
        customName: normalizedName,
        selectedFinish: options.selectedFinish,
        selectedSize: options.selectedSize,
        fontStyle: options.fontStyle
      };

      return [...prevCart, newItem];
    });
  };

  // Update item quantity
  const updateCartItemQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart(prev => prev.map(item => item.cartItemId === cartItemId ? { ...item, quantity } : item));
  };

  // Update custom name directly in cart
  const updateCartItemCustomName = (cartItemId: string, newCustomName: string) => {
    const trimmed = newCustomName.trim();
    setCart(prev => prev.map(item => {
      if (item.cartItemId === cartItemId) {
        const newKey = `${item.productId}-${item.selectedFinish}-${item.selectedSize || 'default'}-${trimmed}-${item.fontStyle || 'default'}`;
        return {
          ...item,
          cartItemId: newKey,
          customName: trimmed
        };
      }
      return item;
    }));
  };

  // Remove from cart
  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(item => item.cartItemId !== cartItemId));
  };

  // Clear cart
  const clearCart = () => {
    setCart([]);
  };

  // Apply discount code
  const applyDiscount = (code: string) => {
    const trimmed = code.trim().toUpperCase();
    if (trimmed === 'METAL15') {
      setDiscountCode('METAL15');
      setDiscountRate(0.15);
      return { success: true, message: 'VIP code applied: 15% discount activated!' };
    }
    if (trimmed === 'GOLD10' || trimmed === 'WELCOME10') {
      setDiscountCode(trimmed);
      setDiscountRate(0.10);
      return { success: true, message: 'Welcome voucher applied: 10% discount activated!' };
    }
    return { success: false, message: 'Invalid promo code. Try METAL15 or GOLD10' };
  };

  const removeDiscount = () => {
    setDiscountCode('');
    setDiscountRate(0);
  };

  // Calculations
  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const cartDiscountAmount = +(cartSubtotal * discountRate).toFixed(2);
  const cartShippingFee = cartSubtotal >= 75 || cartSubtotal === 0 ? 0 : 4.99;
  const cartGrandTotal = +(cartSubtotal - cartDiscountAmount + cartShippingFee).toFixed(2);

  // Place order
  const placeOrder = (customer: OrderCustomer, paymentMethod: 'cod' | 'card' | 'apple_pay'): Order => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderId = `MS-2026-${randomSuffix}`;
    const today = new Date().toISOString().split('T')[0];
    
    // Estimated delivery in 5-7 business days
    const estDate = new Date();
    estDate.setDate(estDate.getDate() + 7);
    const estDeliveryStr = estDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    const newOrder: Order = {
      orderId,
      date: today,
      customer,
      items: [...cart],
      subtotal: cartSubtotal,
      shippingFee: cartShippingFee,
      discount: cartDiscountAmount,
      total: cartGrandTotal,
      paymentMethod,
      paymentStatus: paymentMethod === 'cod' ? 'Pending (Cash on Delivery)' : 'Paid',
      orderStatus: 'Order Placed',
      trackingNumber: `TRK-${orderId}`,
      estimatedDelivery: estDeliveryStr
    };

    setOrders(prev => [newOrder, ...prev]);
    setLastOrder(newOrder);
    clearCart();
    removeDiscount();
    return newOrder;
  };

  // Admin Actions
  const adminAddProduct = (newProdData: Omit<Product, 'id'>): Product => {
    const id = `ms-${Date.now().toString(36)}`;
    const newProduct: Product = {
      ...newProdData,
      id
    };
    setProducts(prev => [newProduct, ...prev]);
    return newProduct;
  };

  const adminUpdateProduct = (updated: Product) => {
    setProducts(prev => prev.map(p => p.id === updated.id ? updated : p));
    if (selectedProduct?.id === updated.id) {
      setSelectedProduct(updated);
    }
  };

  const adminDeleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    if (selectedProduct?.id === id) {
      setSelectedProduct(null);
    }
  };

  const adminUpdateOrderStatus = (orderId: string, status: OrderStatus, trackingNumber?: string) => {
    setOrders(prev => prev.map(o => {
      if (o.orderId === orderId) {
        return {
          ...o,
          orderStatus: status,
          trackingNumber: trackingNumber || o.trackingNumber
        };
      }
      return o;
    }));
    if (lastOrder?.orderId === orderId) {
      setLastOrder(prev => prev ? { ...prev, orderStatus: status, trackingNumber: trackingNumber || prev.trackingNumber } : null);
    }
  };

  const resetToDefaults = () => {
    setProducts(INITIAL_PRODUCTS);
    localStorage.removeItem(PRODUCTS_STORAGE_KEY);
  };

  return (
    <StoreContext.Provider value={{
      products,
      cart,
      orders,
      activePage,
      selectedProduct,
      activeCategory,
      searchQuery,
      sortBy,
      lastOrder,
      discountCode,
      discountRate,
      navigateTo,
      setActiveCategory,
      setSearchQuery,
      setSortBy,
      setSelectedProduct,
      addToCart,
      updateCartItemQuantity,
      updateCartItemCustomName,
      removeFromCart,
      clearCart,
      applyDiscount,
      removeDiscount,
      placeOrder,
      adminAddProduct,
      adminUpdateProduct,
      adminDeleteProduct,
      adminUpdateOrderStatus,
      resetToDefaults,
      cartItemCount,
      cartSubtotal,
      cartDiscountAmount,
      cartShippingFee,
      cartGrandTotal
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
