'use client';

import React, { useState, useMemo } from 'react';
import { useShop } from '@/context/ShopContext';
import { PRODUCTS, CATEGORIES } from '@/data/shopData';
import { ProductCard } from './ProductCard';
import {
  Search,
  X,
  Zap,
  SlidersHorizontal,
  Star,
  Check,
  RotateCcw,
  Sparkles,
} from 'lucide-react';

export const SearchScreen: React.FC = () => {
  const { searchQuery, setSearchQuery } = useShop();

  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');
  const [fastDeliveryOnly, setFastDeliveryOnly] = useState<boolean>(false);
  const [minRating, setMinRating] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(10000);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [showFilters, setShowFilters] = useState<boolean>(false);

  // Search suggestions
  const popularKeywords = [
    'Nano Urea',
    'Cotton Seed',
    'Maize',
    'Sprayer',
    'Drip Kit',
    'Bayer',
    'Neem Oil',
    'Mustard Oil',
    'Cattle Feed',
    'Tarpaulin',
    'Tomato',
    'Atta',
  ];

  // Filtered Products computation
  const searchResults = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // 1. Text Search matching name, brand, category, agriculturalUse, tags, subcategory
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesBrand = product.brand.toLowerCase().includes(q);
        const matchesCategory = product.category.toLowerCase().includes(q);
        const matchesSubcat = product.subcategory?.toLowerCase().includes(q) || false;
        const matchesAgriUse = product.agriculturalUse.toLowerCase().includes(q);
        const matchesTags = product.tags.some((t) => t.toLowerCase().includes(q));

        if (!matchesName && !matchesBrand && !matchesCategory && !matchesSubcat && !matchesAgriUse && !matchesTags) {
          return false;
        }
      }

      // 2. Category Filter
      if (selectedCategoryFilter !== 'all' && product.category !== selectedCategoryFilter) {
        return false;
      }

      // 3. Fast Delivery Filter
      if (fastDeliveryOnly && !product.isFastDelivery) {
        return false;
      }

      // 4. Rating Filter
      if (minRating > 0 && product.rating < minRating) {
        return false;
      }

      // 5. Price Filter
      if (product.price > maxPrice) {
        return false;
      }

      // 6. In Stock Filter
      if (inStockOnly && !product.inStock) {
        return false;
      }

      return true;
    });
  }, [searchQuery, selectedCategoryFilter, fastDeliveryOnly, minRating, maxPrice, inStockOnly]);

  const resetFilters = () => {
    setSelectedCategoryFilter('all');
    setFastDeliveryOnly(false);
    setMinRating(0);
    setMaxPrice(10000);
    setInStockOnly(false);
  };

  const hasActiveFilters =
    selectedCategoryFilter !== 'all' ||
    fastDeliveryOnly ||
    minRating > 0 ||
    maxPrice < 10000 ||
    inStockOnly;

  return (
    <div className="space-y-6 pb-12">
      {/* Search Header Bar */}
      <div className="bg-white p-4 sm:p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <div className="relative flex items-center">
          <Search className="w-5 h-5 text-emerald-700 absolute left-4 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by product name, brand, crop, agricultural use, or keywords..."
            className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-600 focus:bg-white rounded-2xl py-3.5 pl-12 pr-12 text-sm sm:text-base outline-none transition-all placeholder:text-slate-400"
            autoFocus
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 p-1.5 rounded-full hover:bg-slate-200 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Popular Keyword Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
          <span className="font-bold text-slate-400 shrink-0">Popular:</span>
          {popularKeywords.map((word, idx) => (
            <button
              key={idx}
              onClick={() => setSearchQuery(word)}
              className={`px-3 py-1 rounded-full font-medium transition-all shrink-0 ${
                searchQuery.toLowerCase() === word.toLowerCase()
                  ? 'bg-emerald-700 text-white'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {word}
            </button>
          ))}
        </div>

        {/* Quick Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100">
          <div className="flex flex-wrap items-center gap-2">
            {/* Fast Delivery Toggle */}
            <button
              onClick={() => setFastDeliveryOnly(!fastDeliveryOnly)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                fastDeliveryOnly
                  ? 'bg-amber-400 text-emerald-950 border-amber-500 shadow-xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Zap className={`w-3.5 h-3.5 ${fastDeliveryOnly ? 'fill-current' : 'text-amber-500'}`} />
              <span>⚡ Fast Delivery Only</span>
            </button>

            {/* Category Dropdown */}
            <select
              value={selectedCategoryFilter}
              onChange={(e) => setSelectedCategoryFilter(e.target.value)}
              className="bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-700 outline-none hover:bg-slate-50 cursor-pointer"
            >
              <option value="all">All Categories</option>
              {CATEGORIES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>

            {/* Advanced Filters Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                showFilters || hasActiveFilters
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters {hasActiveFilters && '•'}</span>
            </button>

            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="flex items-center gap-1 text-xs text-rose-600 font-bold hover:underline ml-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>

          <div className="text-xs font-bold text-slate-500">
            Found <span className="text-emerald-700 font-black">{searchResults.length}</span> products
          </div>
        </div>

        {/* Collapsible Advanced Filters Panel */}
        {showFilters && (
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-4 pt-4 animate-in fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Price Filter */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Max Price: ₹{maxPrice.toLocaleString('en-IN')}
                </label>
                <input
                  type="range"
                  min="200"
                  max="10000"
                  step="100"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>₹200</span>
                  <span>₹10,000+</span>
                </div>
              </div>

              {/* Rating Filter */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Minimum Rating:
                </label>
                <div className="flex items-center gap-1.5">
                  {[0, 4.0, 4.5, 4.8].map((stars) => (
                    <button
                      key={stars}
                      onClick={() => setMinRating(stars)}
                      className={`text-xs px-2.5 py-1 rounded-lg font-bold border transition-all ${
                        minRating === stars
                          ? 'bg-amber-400 text-emerald-950 border-amber-500'
                          : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {stars === 0 ? 'Any' : `${stars}+ ★`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Stock Filter */}
              <div className="flex items-center">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="w-4 h-4 rounded text-emerald-600 accent-emerald-600"
                  />
                  <span>Show In-Stock Products Only</span>
                </label>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Results Grid */}
      {searchResults.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {searchResults.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 space-y-4">
          <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto text-2xl">
            🔍
          </div>
          <div className="space-y-1">
            <h3 className="font-bold text-lg text-slate-800">No matching products found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              We couldn&apos;t find anything matching &quot;{searchQuery}&quot;. Check the spelling or try searching for another crop, fertilizer, or tool.
            </p>
          </div>
          <button
            onClick={() => {
              setSearchQuery('');
              resetFilters();
            }}
            className="text-xs font-bold bg-emerald-700 text-white px-4 py-2 rounded-xl hover:bg-emerald-800 transition-colors"
          >
            Clear Search & Filters
          </button>
        </div>
      )}
    </div>
  );
};
