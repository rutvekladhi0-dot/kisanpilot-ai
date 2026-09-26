'use client';

import React, { useState } from 'react';
import { useShop } from '@/context/ShopContext';
import { CATEGORIES, PRODUCTS } from '@/data/shopData';
import { ProductCard } from './ProductCard';
import {
  Grid,
  ArrowLeft,
  Zap,
  Filter,
  SlidersHorizontal,
  ChevronRight,
} from 'lucide-react';

export const CategoriesScreen: React.FC = () => {
  const { selectedCategory, setSelectedCategory, globalDeliveryMode } = useShop();

  const [activeTypeFilter, setActiveTypeFilter] = useState<'all' | 'agri' | 'daily'>('all');
  const [activeSubcategory, setActiveSubcategory] = useState<string | null>(null);
  const [fastOnly, setFastOnly] = useState<boolean>(false);

  // Current category object if selected
  const currentCatObj = CATEGORIES.find((c) => c.id === selectedCategory);

  // Subcategories available in the selected category
  const categoryProducts = selectedCategory
    ? PRODUCTS.filter((p) => p.category === selectedCategory)
    : [];

  const subcategories = Array.from(
    new Set(categoryProducts.map((p) => p.subcategory).filter(Boolean))
  ) as string[];

  // Filter products by subcategory and fast delivery if active
  const filteredProducts = categoryProducts.filter((product) => {
    if (activeSubcategory && product.subcategory !== activeSubcategory) return false;
    if (fastOnly && !product.isFastDelivery) return false;
    return true;
  });

  // Filter categories for the main view
  const displayedCategories = CATEGORIES.filter((cat) => {
    if (activeTypeFilter === 'agri') return cat.isAgri;
    if (activeTypeFilter === 'daily') return !cat.isAgri;
    return true;
  });

  return (
    <div className="space-y-6 pb-12">
      {selectedCategory && currentCatObj ? (
        /* DETAIL CATEGORY VIEW: Category products with subcategory pills */
        <div className="space-y-6">
          {/* Breadcrumb / Back Bar */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setSelectedCategory(null);
                setActiveSubcategory(null);
              }}
              className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-emerald-800 hover:text-emerald-950 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>All Categories</span>
            </button>
            <ChevronRight className="w-4 h-4 text-slate-300" />
            <span className="text-xs sm:text-sm font-bold text-slate-700">
              {currentCatObj.name}
            </span>
          </div>

          {/* Category Banner */}
          <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-green-800 text-white rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-lg">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
              <div>
                <span className="inline-block bg-white/20 text-[10px] font-black uppercase px-2 py-0.5 rounded-md mb-2 tracking-wider">
                  {currentCatObj.isAgri ? 'Agricultural Input' : 'Everyday Essential'}
                </span>
                <h1 className="text-2xl sm:text-3xl font-black flex items-center gap-2.5">
                  <span>{currentCatObj.icon}</span>
                  <span>{currentCatObj.name}</span>
                </h1>
                <p className="text-xs sm:text-sm text-emerald-100 mt-1 max-w-xl">
                  {currentCatObj.description}
                </p>
              </div>

              {/* Fast Delivery Quick Toggle for this category */}
              <button
                onClick={() => setFastOnly(!fastOnly)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-bold text-xs sm:text-sm transition-all border shrink-0 ${
                  fastOnly
                    ? 'bg-amber-400 text-emerald-950 border-amber-500 shadow-md'
                    : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                }`}
              >
                <Zap className={`w-4 h-4 ${fastOnly ? 'fill-current' : ''}`} />
                <span>⚡ 90 Mins Delivery Only</span>
              </button>
            </div>
          </div>

          {/* Subcategory Filter Pills */}
          {subcategories.length > 0 && (
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              <span className="text-xs font-bold text-slate-500 shrink-0">Subcategory:</span>
              <button
                onClick={() => setActiveSubcategory(null)}
                className={`text-xs px-3.5 py-1.5 rounded-xl font-bold transition-all shrink-0 ${
                  activeSubcategory === null
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                All ({categoryProducts.length})
              </button>
              {subcategories.map((subcat) => (
                <button
                  key={subcat}
                  onClick={() => setActiveSubcategory(subcat)}
                  className={`text-xs px-3.5 py-1.5 rounded-xl font-bold transition-all shrink-0 ${
                    activeSubcategory === subcat
                      ? 'bg-emerald-700 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {subcat}
                </button>
              ))}
            </div>
          )}

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 space-y-3">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto text-2xl">
                🌱
              </div>
              <h3 className="font-bold text-lg text-slate-800">No products found with these filters</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Try switching off the Fast Delivery filter or selecting a different subcategory.
              </p>
              <button
                onClick={() => {
                  setFastOnly(false);
                  setActiveSubcategory(null);
                }}
                className="text-xs font-bold text-emerald-700 underline"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      ) : (
        /* MAIN CATEGORIES VIEW: All 12 categories with type tabs */
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
                <span>Browse All Categories</span>
                <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2.5 py-0.5 rounded-full">
                  {CATEGORIES.length} Categories
                </span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Everything for your farm and daily household essentials under one roof
              </p>
            </div>

            {/* Type Filter Tabs: All / Agricultural / Daily Essentials */}
            <div className="flex items-center bg-slate-100 p-1 rounded-2xl border border-slate-200 self-start sm:self-auto">
              {[
                { id: 'all', label: 'All Categories' },
                { id: 'agri', label: '🌾 Agricultural Only' },
                { id: 'daily', label: '🛒 Daily Essentials' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTypeFilter(tab.id as any)}
                  className={`text-xs font-bold px-3 py-1.5 rounded-xl transition-all ${
                    activeTypeFilter === tab.id
                      ? 'bg-white text-emerald-900 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {displayedCategories.map((cat) => (
              <div
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className="group bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-xl hover:border-emerald-400 transition-all cursor-pointer flex flex-col justify-between"
              >
                {/* Image Cover */}
                <div className="relative h-36 sm:h-40 w-full overflow-hidden bg-slate-100">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-[10px] font-black uppercase text-emerald-950 px-2 py-0.5 rounded-lg shadow-sm">
                    {cat.isAgri ? '🌾 Agri' : '🛒 Essentials'}
                  </span>

                  <span className="absolute bottom-3 left-3 text-2xl drop-shadow-md">
                    {cat.icon}
                  </span>

                  <span className="absolute bottom-3 right-3 text-xs font-bold text-white bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-md">
                    {cat.count}+ Products
                  </span>
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col justify-between flex-1 gap-2">
                  <div>
                    <h3 className="font-bold text-base text-slate-900 group-hover:text-emerald-800 transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                      {cat.description}
                    </p>
                  </div>

                  <div className="pt-2 flex items-center justify-between text-xs font-bold text-emerald-700 group-hover:text-emerald-800">
                    <span>Explore Products</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
