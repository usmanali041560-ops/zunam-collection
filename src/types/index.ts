export type ProductCategory = 
  | 'All'
  | 'Custom Jewelry'
  | 'Name Lockets'
  | 'Bracelets'
  | 'Wall Art'
  | 'Couple Stands'
  | 'Home Decor';

export type MetalFinish = '18K Gold' | 'Polished Silver' | 'Rose Gold' | 'Matte Black';

export type FontStyleOption = 'Signature Script' | 'Classical Serif' | 'Modern Minimal' | 'Artisan Gothic';

export interface Product {
  id: string;
  name: string;
  category: Exclude<ProductCategory, 'All'>;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  gallery: string[];
  description: string;
  features: string[];
  isCustomizable: boolean;
  defaultCustomPlaceholder: string;
  availableFinishes: MetalFinish[];
  availableSizes?: string[];
  stock: number;
  isNew?: boolean;
  isBestSeller?: boolean;
  previewType?: 'necklace' | 'couplestand' | 'bracelet' | 'wallart' | 'pendant';
}

export interface CartItem {
  cartItemId: string;
  productId: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  quantity: number;
  customName: string;
  selectedFinish: MetalFinish;
  selectedSize?: string;
  fontStyle?: FontStyleOption;
}

export interface OrderCustomer {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  notes?: string;
}

export type OrderStatus = 
  | 'Order Placed'
  | 'In Laser Crafting'
  | 'Quality Inspection'
  | 'Shipped'
  | 'Delivered';

export interface Order {
  orderId: string;
  date: string;
  customer: OrderCustomer;
  items: CartItem[];
  subtotal: number;
  shippingFee: number;
  discount: number;
  total: number;
  paymentMethod: 'cod' | 'card' | 'apple_pay';
  paymentStatus: 'Paid' | 'Pending (Cash on Delivery)';
  orderStatus: OrderStatus;
  trackingNumber?: string;
  estimatedDelivery: string;
}

export type ActivePage = 
  | 'home'
  | 'products'
  | 'product-detail'
  | 'cart'
  | 'checkout'
  | 'order-confirmation'
  | 'about'
  | 'contact'
  | 'privacy'
  | 'shipping'
  | 'admin';
