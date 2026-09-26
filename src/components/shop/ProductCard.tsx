'use client';

import React from 'react';
import { Product } from '@/types/shop';
import { useShop } from '@/context/ShopContext';
import { Star, Zap, Plus, Minus, Heart, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    cart,
    addToCart,
    updateQuantity,
    setSelectedProduct,
    wishlist,
    toggleWishlist,
    addToRecentlyViewed,
    globalDeliveryMode,
  } = useShop();

  const cartItem = cart.find((item) => item.product.id === product.id);
  const isWishlisted = wishlist.includes(product.id);

  const handleCardClick = () => {
    addToRecentlyViewed(product);
    setSelectedProduct(product);
  };

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1, globalDeliveryMode);
  };

  const handleIncrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (cartItem) {
      updateQuantity(product.id, cartItem.quantity + 1);
    }
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (cartItem) {
      updateQuantity(product.id, cartItem.quantity - 1);
    }
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div
      onClick={handleCardClick}
      className="group bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-emerald-300 transition-all duration-300 overflow-hidden flex flex-col justify-between cursor-pointer relative"
    >
      {/* Top Badges: Discount & Fast Delivery */}
      <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1.5 items-start">
        {product.discountPercent > 0 && (
          <span className="bg-red-500 text-white text-[11px] font-black px-2 py-0.5 rounded-lg shadow-sm">
            {product.discountPercent}% OFF
          </span>
        )}
        {product.isFastDelivery && (
          <span className="bg-amber-400 text-emerald-950 text-[10px] font-extrabold px-2 py-0.5 rounded-lg flex items-center gap-1 shadow-sm">
            <Zap className="w-2.5 h-2.5 fill-current" />
            {product.fastDeliveryTime.replace('⚡ ', '')}
          </span>
        )}
      </div>

      {/* Wishlist Heart Button */}
      <button
        onClick={handleWishlist}
        className={`absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
          isWishlisted
            ? 'bg-rose-50 text-rose-500 shadow-sm'
            : 'bg-white/80 backdrop-blur-xs text-slate-400 hover:text-rose-500 hover:bg-white shadow-xs'
        }`}
        title="Save to Wishlist"
      >
        <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current text-rose-500' : ''}`} />
      </button>

      {/* Product Image */}
      <div className="relative w-full h-44 sm:h-48 bg-slate-50 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Card Content */}
      <div className="p-3.5 sm:p-4 flex flex-col flex-1 justify-between gap-2.5">
        <div>
          {/* Brand & Rating */}
          <div className="flex items-center justify-between gap-1 text-xs mb-1">
            <span className="font-semibold text-emerald-700 uppercase tracking-wider text-[11px] truncate">
              {product.brand}
            </span>
            <div className="flex items-center gap-1 bg-amber-50 text-amber-800 px-1.5 py-0.5 rounded-md text-[11px] font-bold shrink-0">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
              <span className="text-slate-400 font-normal">({product.reviewCount})</span>
            </div>
          </div>

          {/* Product Title */}
          <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-snug line-clamp-2 group-hover:text-emerald-800 transition-colors">
            {product.name}
          </h3>

          {/* Unit / Pack info */}
          <p className="text-xs text-slate-500 mt-1 font-medium">
            Pack: <span className="text-slate-700">{product.unit}</span>
          </p>
        </div>

        {/* Pricing & Add to Cart */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg sm:text-xl font-black text-slate-900">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-xs text-slate-400 line-through">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>
            <p className="text-[10px] text-emerald-600 font-semibold">
              {product.isFastDelivery ? '⚡ Fast Delivery Available' : 'Standard Delivery'}
            </p>
          </div>

          {/* Add to Cart / Quantity Controller */}
          <div className="shrink-0">
            {cartItem ? (
              <div
                onClick={(e) => e.stopPropagation()}
                className="flex items-center bg-emerald-700 text-white rounded-xl overflow-hidden shadow-sm"
              >
                <button
                  onClick={handleDecrement}
                  className="w-7 h-8 flex items-center justify-center hover:bg-emerald-800 transition-colors active:scale-95"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-2 text-xs font-black min-w-[20px] text-center">
                  {cartItem.quantity}
                </span>
                <button
                  onClick={handleIncrement}
                  className="w-7 h-8 flex items-center justify-center hover:bg-emerald-800 transition-colors active:scale-95"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={handleAdd}
                className="flex items-center gap-1 bg-emerald-50 text-emerald-800 hover:bg-emerald-700 hover:text-white border border-emerald-300 hover:border-emerald-700 px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 active:scale-95 shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
