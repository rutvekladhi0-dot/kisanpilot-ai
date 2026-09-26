'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Order, Address, DeliveryType, Coupon } from '@/types/shop';
import { PRODUCTS, COUPONS } from '@/data/shopData';

interface UserProfile {
  name: string;
  phone: string;
  email: string;
  farmName: string;
  village: string;
  district: string;
  state: string;
  pincode: string;
  kccLinked: boolean;
  securityPinSet: boolean;
  biometricEnabled: boolean;
  twoFactorEnabled: boolean;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'order' | 'offer' | 'alert' | 'loan';
}

interface ShopContextType {
  // Navigation & Screens
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedCategory: string | null;
  setSelectedCategory: (cat: string | null) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (prod: Product | null) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isNotificationsOpen: boolean;
  setIsNotificationsOpen: (open: boolean) => void;

  // Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, deliveryType?: DeliveryType) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  cartDeliveryFee: number;
  cartDiscount: number;
  cartTotal: number;
  globalDeliveryMode: DeliveryType;
  setGlobalDeliveryMode: (mode: DeliveryType) => void;

  // Coupon
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Orders
  orders: Order[];
  placeOrder: (
    paymentMethod: Order['paymentMethod'],
    deliveryType: DeliveryType,
    address: Address,
    phone: string
  ) => Order;

  // User & Address
  userProfile: UserProfile;
  updateUserProfile: (profile: Partial<UserProfile>) => void;
  addresses: Address[];
  selectedAddress: Address;
  setSelectedAddress: (address: Address) => void;
  addAddress: (address: Omit<Address, 'id'>) => void;

  // Notifications
  notifications: NotificationItem[];
  markNotificationsAsRead: () => void;
  unreadNotificationsCount: number;

  // Recently Viewed
  recentlyViewed: Product[];
  addToRecentlyViewed: (product: Product) => void;
}

const DEFAULT_PROFILE: UserProfile = {
  name: 'Ramesh Patel',
  phone: '+91 98765 43210',
  email: 'ramesh.patel.farmer@gmail.com',
  farmName: 'Shri Ram Krishi Farm',
  village: 'Pimpalgaon Baswant',
  district: 'Nashik',
  state: 'Maharashtra',
  pincode: '422209',
  kccLinked: true,
  securityPinSet: true,
  biometricEnabled: true,
  twoFactorEnabled: true,
};

const DEFAULT_ADDRESSES: Address[] = [
  {
    id: 'addr-1',
    name: 'Ramesh Patel (Farm House)',
    phone: '+91 98765 43210',
    line1: 'Survey No. 42/3, Near Canal Road',
    line2: 'Post Pimpalgaon Baswant',
    city: 'Nashik',
    state: 'Maharashtra',
    pincode: '422209',
    type: 'Farm / Khet',
    isDefault: true,
  },
  {
    id: 'addr-2',
    name: 'Ramesh Patel (Village Home)',
    phone: '+91 98765 43210',
    line1: 'House No. 18, Gandhi Chowk',
    line2: 'Opposite Gram Panchayat Office',
    city: 'Nashik',
    state: 'Maharashtra',
    pincode: '422209',
    type: 'Home',
    isDefault: false,
  },
];

const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-1001',
    orderNumber: 'KP-2026-9812',
    date: '24 Sep 2026, 11:30 AM',
    items: [
      {
        product: PRODUCTS[0], // Mahyco Cotton
        quantity: 2,
        selectedDelivery: 'fast',
      },
      {
        product: PRODUCTS[3], // IFFCO Nano Urea
        quantity: 2,
        selectedDelivery: 'fast',
      },
    ],
    subtotal: 2130,
    discount: 100,
    deliveryFee: 49,
    deliveryType: 'fast',
    total: 2079,
    status: 'Delivered',
    paymentMethod: 'UPI',
    paymentStatus: 'Paid',
    address: DEFAULT_ADDRESSES[0],
    estimatedDelivery: 'Delivered on 24 Sep 2026 (Delivered in 85 mins)',
    trackingSteps: [
      { status: 'Order Placed & Confirmed', timestamp: '24 Sep, 11:30 AM', completed: true },
      { status: 'Packed at Nashik Agri Hub', timestamp: '24 Sep, 11:45 AM', completed: true },
      { status: 'Out with Kisan Delivery Partner', timestamp: '24 Sep, 12:10 PM', completed: true },
      { status: 'Delivered to Farm Survey 42/3', timestamp: '24 Sep, 12:55 PM', completed: true },
    ],
  },
];

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: '⚡ Fast Delivery Guarantee',
    message: 'Express 90-minute delivery is now live for all seeds and crop protection orders in Nashik district!',
    time: '15 mins ago',
    read: false,
    type: 'alert',
  },
  {
    id: 'notif-2',
    title: '🌾 Rabi Special Subsidy 15% OFF',
    message: 'Use coupon code HARVEST15 to get instant 15% discount on bulk seeds & fertilizer.',
    time: '2 hours ago',
    read: false,
    type: 'offer',
  },
  {
    id: 'notif-3',
    title: '💳 KCC Loan Pre-approved',
    message: 'Your Kisan Credit Card renewal of up to ₹3,00,000 at 4% interest is ready for digital disbursement.',
    time: '1 day ago',
    read: true,
    type: 'loan',
  },
];

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [globalDeliveryMode, setGlobalDeliveryMode] = useState<DeliveryType>('fast');

  // Cart State with localStorage persistence
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('kisan_cart');
        return saved ? JSON.parse(saved) : [];
      } catch {
        return [];
      }
    }
    return [];
  });

  // Wishlist State
  const [wishlist, setWishlist] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('kisan_wishlist');
        return saved ? JSON.parse(saved) : ['prod-seed-1', 'prod-fert-1'];
      } catch {
        return ['prod-seed-1', 'prod-fert-1'];
      }
    }
    return ['prod-seed-1', 'prod-fert-1'];
  });

  // Orders State
  const [orders, setOrders] = useState<Order[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('kisan_orders');
        return saved ? JSON.parse(saved) : INITIAL_ORDERS;
      } catch {
        return INITIAL_ORDERS;
      }
    }
    return INITIAL_ORDERS;
  });

  // User Profile
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('kisan_profile');
        return saved ? JSON.parse(saved) : DEFAULT_PROFILE;
      } catch {
        return DEFAULT_PROFILE;
      }
    }
    return DEFAULT_PROFILE;
  });

  // Addresses
  const [addresses, setAddresses] = useState<Address[]>(DEFAULT_ADDRESSES);
  const [selectedAddress, setSelectedAddress] = useState<Address>(DEFAULT_ADDRESSES[0]);

  // Coupon
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);

  // Notifications
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  // Recently Viewed
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);

  // Sync to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('kisan_cart', JSON.stringify(cart));
    }
  }, [cart]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('kisan_wishlist', JSON.stringify(wishlist));
    }
  }, [wishlist]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('kisan_orders', JSON.stringify(orders));
    }
  }, [orders]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('kisan_profile', JSON.stringify(userProfile));
    }
  }, [userProfile]);

  // Cart operations
  const addToCart = (product: Product, quantity = 1, deliveryType: DeliveryType = globalDeliveryMode) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        updated[existingIndex].selectedDelivery = deliveryType;
        return updated;
      }
      return [...prev, { product, quantity, selectedDelivery: deliveryType }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const cartSubtotal = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  // Delivery fee:
  // Fast delivery: ₹49 (Free if subtotal > ₹999)
  // Normal delivery: ₹25 (Free if subtotal > ₹499)
  const isAnyFast = cart.some((item) => item.selectedDelivery === 'fast') || globalDeliveryMode === 'fast';
  const cartDeliveryFee = cart.length === 0
    ? 0
    : isAnyFast
    ? cartSubtotal >= 999
      ? 0
      : 49
    : cartSubtotal >= 499
    ? 0
    : 25;

  let calculatedDiscount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountAmount) {
      calculatedDiscount = appliedCoupon.discountAmount;
    } else if (appliedCoupon.discountPercent) {
      calculatedDiscount = Math.round((cartSubtotal * appliedCoupon.discountPercent) / 100);
    }
  }
  const cartDiscount = calculatedDiscount;
  const cartTotal = Math.max(0, cartSubtotal + cartDeliveryFee - cartDiscount);

  // Coupon handling
  const applyCoupon = (code: string) => {
    const coupon = COUPONS.find((c) => c.code.toUpperCase() === code.trim().toUpperCase());
    if (!coupon) {
      return { success: false, message: 'Invalid coupon code.' };
    }
    if (cartSubtotal < coupon.minOrder) {
      return {
        success: false,
        message: `Coupon requires minimum order value of ₹${coupon.minOrder}.`,
      };
    }
    setAppliedCoupon(coupon);
    return { success: true, message: `Coupon ${coupon.code} applied successfully!` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  // Wishlist
  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Orders
  const placeOrder = (
    paymentMethod: Order['paymentMethod'],
    deliveryType: DeliveryType,
    address: Address,
    phone: string
  ): Order => {
    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: `KP-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      items: [...cart],
      subtotal: cartSubtotal,
      discount: cartDiscount,
      deliveryFee: cartDeliveryFee,
      deliveryType,
      total: cartTotal,
      status: 'Placed',
      paymentMethod,
      paymentStatus: paymentMethod === 'Cash on Delivery' ? 'Pending' : 'Paid',
      address,
      estimatedDelivery:
        deliveryType === 'fast'
          ? 'Today within 90 - 120 Minutes'
          : 'Tomorrow by 4:00 PM',
      trackingSteps: [
        { status: 'Order Placed Successfully', timestamp: 'Just now', completed: true },
        { status: 'Sent to Nearest Agri Warehouse', timestamp: 'Pending', completed: false },
        { status: 'Out for Farm Delivery', timestamp: 'Pending', completed: false },
        { status: 'Delivered', timestamp: 'Pending', completed: false },
      ],
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();

    // Add notification
    const orderNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: `📦 Order ${newOrder.orderNumber} Confirmed!`,
      message: `Your order for ₹${newOrder.total} is placed with ${deliveryType === 'fast' ? '⚡ Fast Express Delivery' : 'Standard Delivery'}.`,
      time: 'Just now',
      read: false,
      type: 'order',
    };
    setNotifications((prev) => [orderNotif, ...prev]);

    return newOrder;
  };

  // User Profile
  const updateUserProfile = (profile: Partial<UserProfile>) => {
    setUserProfile((prev) => ({ ...prev, ...profile }));
  };

  // Address
  const addAddress = (address: Omit<Address, 'id'>) => {
    const newAddr: Address = {
      ...address,
      id: `addr-${Date.now()}`,
    };
    setAddresses((prev) => [...prev, newAddr]);
    if (address.isDefault) {
      setSelectedAddress(newAddr);
    }
  };

  // Notifications
  const markNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };
  const unreadNotificationsCount = notifications.filter((n) => !n.read).length;

  // Recently Viewed
  const addToRecentlyViewed = (product: Product) => {
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((p) => p.id !== product.id);
      return [product, ...filtered].slice(0, 8);
    });
  };

  return (
    <ShopContext.Provider
      value={{
        activeTab,
        setActiveTab,
        selectedCategory,
        setSelectedCategory,
        selectedProduct,
        setSelectedProduct,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isNotificationsOpen,
        setIsNotificationsOpen,
        searchQuery,
        setSearchQuery,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        cartDeliveryFee,
        cartDiscount,
        cartTotal,
        globalDeliveryMode,
        setGlobalDeliveryMode,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        wishlist,
        toggleWishlist,
        isInWishlist,
        orders,
        placeOrder,
        userProfile,
        updateUserProfile,
        addresses,
        selectedAddress,
        setSelectedAddress,
        addAddress,
        notifications,
        markNotificationsAsRead,
        unreadNotificationsCount,
        recentlyViewed,
        addToRecentlyViewed,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
