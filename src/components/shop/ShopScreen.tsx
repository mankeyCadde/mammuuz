import React, { useState, useMemo } from 'react';
import {
  Search,
  SlidersHorizontal,
  Grid,
  List,
  Star,
  Eye,
  Heart,
  ShoppingBag,
  X,
  RotateCcw,
  Check,
  ChevronDown
} from 'lucide-react';
import { Product, FilterState, ScreenType } from '../../types';
import { Breadcrumbs } from '../common/Breadcrumbs';

interface ShopScreenProps {
  products: Product[];
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onSelectProduct: (prod: Product) => void;
  onQuickView: (prod: Product) => void;
  onAddToCart: (prod: Product) => void;
  onToggleWishlist: (prod: Product) => void;
  wishlistIds: string[];
  onNavigate: (screen: ScreenType) => void;
}

export const ShopScreen: React.FC<ShopScreenProps> = ({
  products,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  onSelectProduct,
  onQuickView,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
  onNavigate,
}) => {
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(800);
  const [minRating, setMinRating] = useState<number>(0);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [onSaleOnly, setOnSaleOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating' | 'newest'>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'compact'>('grid');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 8;

  const categoriesList = [
    'All Artifacts',
    'Timepieces',
    'Audio & Acoustics',
    'Leather Goods',
    'Eyewear & Optics',
    'Fine Accessories',
    'Premium Living',
  ];

  // Filtering Logic
  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      // Category check
      if (selectedCategory && selectedCategory !== 'All Artifacts' && item.category !== selectedCategory) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = item.name.toLowerCase().includes(q);
        const matchCat = item.category.toLowerCase().includes(q);
        const matchDesc = item.description.toLowerCase().includes(q);
        if (!matchName && !matchCat && !matchDesc) return false;
      }
      // Price
      if (item.price < minPrice || item.price > maxPrice) {
        return false;
      }
      // Rating
      if (minRating > 0 && item.rating < minRating) {
        return false;
      }
      // In stock
      if (inStockOnly && !item.inStock) {
        return false;
      }
      // On sale
      if (onSaleOnly && !item.originalPrice) {
        return false;
      }
      return true;
    });
  }, [products, selectedCategory, searchQuery, minPrice, maxPrice, minRating, inStockOnly, onSaleOnly]);

  // Sorting Logic
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    if (sortBy === 'price-low') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'newest') {
      list.sort((a, b) => (b.newArrival ? 1 : 0) - (a.newArrival ? 1 : 0));
    } else {
      // Featured
      list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
    return list;
  }, [filteredProducts, sortBy]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(sortedProducts.length / itemsPerPage));
  const paginatedProducts = sortedProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleResetFilters = () => {
    onSelectCategory('All Artifacts');
    setMinPrice(0);
    setMaxPrice(800);
    setMinRating(0);
    setInStockOnly(false);
    setOnSaleOnly(false);
    onSearchChange('');
    setCurrentPage(1);
  };

  const hasActiveFilters =
    (selectedCategory && selectedCategory !== 'All Artifacts') ||
    minPrice > 0 ||
    maxPrice < 800 ||
    minRating > 0 ||
    inStockOnly ||
    onSaleOnly ||
    Boolean(searchQuery.trim());

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-10 pb-20">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: 'Shop Catalog', onClick: handleResetFilters },
          ...(selectedCategory && selectedCategory !== 'All Artifacts' ? [{ label: selectedCategory }] : []),
          ...(searchQuery ? [{ label: `Search: "${searchQuery}"` }] : []),
        ]}
        onNavigate={onNavigate}
      />

      {/* Catalog Title Header */}
      <div className="py-6 border-b border-[#c3c7c8]/30 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#0060a9]">
            The Curated Catalog
          </span>
          <h1 className="font-['Hanken_Grotesk'] text-3xl sm:text-4xl font-extrabold text-[#181f21] mt-1">
            {selectedCategory && selectedCategory !== 'All Artifacts' ? selectedCategory : 'All Catalog Artifacts'}
          </h1>
          <p className="text-xs sm:text-sm text-[#747879] mt-1 font-['Inter']">
            Displaying {sortedProducts.length} certified objects crafted with uncompromising precision.
          </p>
        </div>

        {/* Category quick tabs for desktop */}
        <div className="hidden lg:flex items-center gap-1.5 flex-wrap">
          {categoriesList.map((cat) => {
            const isActive = (selectedCategory || 'All Artifacts') === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  onSelectCategory(cat);
                  setCurrentPage(1);
                }}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#181f21] text-white shadow-xs font-semibold'
                    : 'bg-white border border-[#c3c7c8]/60 text-[#434749] hover:border-[#181f21]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Layout: Filters Sidebar + Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 pt-8">
        {/* DESKTOP FILTERS SIDEBAR */}
        <aside className="hidden lg:block space-y-6 pr-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#c3c7c8]/30">
            <h2 className="font-['Hanken_Grotesk'] text-sm font-bold uppercase tracking-wider text-[#181f21] flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-[#0060a9]" />
              <span>Filters</span>
            </h2>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="text-xs text-[#0060a9] hover:underline flex items-center gap-1 font-medium cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>

          {/* Category Filter */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#747879]">Category</h3>
            <div className="space-y-1">
              {categoriesList.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    onSelectCategory(cat);
                    setCurrentPage(1);
                  }}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-colors flex items-center justify-between ${
                    (selectedCategory || 'All Artifacts') === cat
                      ? 'bg-[#eaf5fa] text-[#0060a9] font-bold'
                      : 'text-[#434749] hover:bg-[#F9FAFB]'
                  }`}
                >
                  <span>{cat}</span>
                  {(selectedCategory || 'All Artifacts') === cat && <Check className="w-3 h-3 text-[#0060a9]" />}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="space-y-3 pt-4 border-t border-[#c3c7c8]/30">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#747879]">Price Range</h3>
              <span className="text-xs font-semibold text-[#181f21]">
                ${minPrice} — ${maxPrice}
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={800}
              step={20}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[#0060a9] cursor-pointer"
            />
            <div className="flex gap-2">
              <div className="flex-1 bg-white border border-[#c3c7c8]/60 rounded-lg px-2 py-1 text-xs text-[#747879]">
                Min: ${minPrice}
              </div>
              <div className="flex-1 bg-white border border-[#c3c7c8]/60 rounded-lg px-2 py-1 text-xs text-[#181f21] font-semibold">
                Max: ${maxPrice}
              </div>
            </div>
          </div>

          {/* Minimum Rating */}
          <div className="space-y-2 pt-4 border-t border-[#c3c7c8]/30">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#747879]">Minimum Rating</h3>
            <div className="space-y-1">
              {[4.5, 4.0, 3.5].map((rating) => (
                <button
                  key={rating}
                  type="button"
                  onClick={() => setMinRating(minRating === rating ? 0 : rating)}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-colors flex items-center justify-between ${
                    minRating === rating ? 'bg-[#eaf5fa] text-[#0060a9] font-bold' : 'text-[#434749] hover:bg-[#F9FAFB]'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-current" />
                    <span>{rating} Stars & Higher</span>
                  </div>
                  {minRating === rating && <Check className="w-3 h-3 text-[#0060a9]" />}
                </button>
              ))}
            </div>
          </div>

          {/* Availability & Offers */}
          <div className="space-y-2 pt-4 border-t border-[#c3c7c8]/30">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#747879]">Offers & Stock</h3>
            <label className="flex items-center gap-2 text-xs text-[#434749] cursor-pointer">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="rounded border-[#c3c7c8] text-[#0060a9] focus:ring-[#0060a9]"
              />
              <span>In Stock Only</span>
            </label>
            <label className="flex items-center gap-2 text-xs text-[#434749] cursor-pointer">
              <input
                type="checkbox"
                checked={onSaleOnly}
                onChange={(e) => setOnSaleOnly(e.target.checked)}
                className="rounded border-[#c3c7c8] text-[#0060a9] focus:ring-[#0060a9]"
              />
              <span>Promotional / Sale Items</span>
            </label>
          </div>
        </aside>

        {/* PRODUCTS CONTENT COLUMN */}
        <div className="lg:col-span-3 space-y-6">
          {/* Top Sort & Filter Bar */}
          <div className="bg-white p-3 rounded-xl border border-[#c3c7c8]/40 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {/* Mobile filter button */}
              <button
                type="button"
                onClick={() => setIsMobileFiltersOpen(true)}
                className="lg:hidden px-3 py-1.5 rounded-lg border border-[#c3c7c8] text-xs font-semibold text-[#181f21] flex items-center gap-2 hover:bg-[#f1fbff]"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Filters {hasActiveFilters && '• Active'}</span>
              </button>

              <span className="text-xs text-[#747879] font-['Inter']">
                Showing <strong className="text-[#181f21]">{paginatedProducts.length}</strong> of{' '}
                <strong className="text-[#181f21]">{sortedProducts.length}</strong>
              </span>
            </div>

            <div className="flex items-center gap-3">
              {/* Sort selector */}
              <div className="flex items-center gap-2 text-xs font-['Inter']">
                <span className="text-[#747879] hidden sm:inline">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-[#F9FAFB] border border-[#c3c7c8]/70 rounded-lg px-2.5 py-1.5 text-xs text-[#181f21] font-medium focus:outline-none focus:border-[#0060a9]"
                >
                  <option value="featured">Featured Curations</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">New Releases</option>
                </select>
              </div>

              {/* View mode toggle */}
              <div className="hidden sm:flex items-center bg-[#F9FAFB] border border-[#c3c7c8]/60 rounded-lg p-0.5">
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-white shadow-xs text-[#0060a9]' : 'text-[#747879]'}`}
                  title="Grid View"
                >
                  <Grid className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('compact')}
                  className={`p-1.5 rounded ${viewMode === 'compact' ? 'bg-white shadow-xs text-[#0060a9]' : 'text-[#747879]'}`}
                  title="Compact View"
                >
                  <List className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Active Filter Chips */}
          {hasActiveFilters && (
            <div className="flex items-center gap-2 flex-wrap text-xs">
              <span className="text-[#747879] text-[11px] uppercase font-bold">Active:</span>
              {selectedCategory && selectedCategory !== 'All Artifacts' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#eaf5fa] text-[#0060a9] font-medium">
                  {selectedCategory}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => onSelectCategory('All Artifacts')} />
                </span>
              )}
              {maxPrice < 800 && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#eaf5fa] text-[#0060a9] font-medium">
                  Under ${maxPrice}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setMaxPrice(800)} />
                </span>
              )}
              {minRating > 0 && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#eaf5fa] text-[#0060a9] font-medium">
                  {minRating}+ Stars
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setMinRating(0)} />
                </span>
              )}
              {searchQuery && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#eaf5fa] text-[#0060a9] font-medium">
                  "{searchQuery}"
                  <X className="w-3 h-3 cursor-pointer" onClick={() => onSearchChange('')} />
                </span>
              )}
              <button
                type="button"
                onClick={handleResetFilters}
                className="text-[11px] text-[#747879] hover:text-red-500 underline ml-2 cursor-pointer"
              >
                Clear all filters
              </button>
            </div>
          )}

          {/* Empty State */}
          {paginatedProducts.length === 0 ? (
            <div className="bg-white rounded-2xl border border-[#c3c7c8]/40 p-12 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-[#f1fbff] text-[#0060a9] flex items-center justify-center mx-auto">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="font-['Hanken_Grotesk'] text-lg font-bold text-[#181f21]">
                No matching artifacts found
              </h3>
              <p className="text-xs text-[#747879] max-w-md mx-auto">
                Try broadening your criteria or reset the filters to inspect the entire Maamuuz permanent collection.
              </p>
              <button
                type="button"
                onClick={handleResetFilters}
                className="px-5 py-2.5 bg-[#181f21] hover:bg-[#0060a9] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            /* Products Grid */
            <div
              className={`grid gap-6 ${
                viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'
              }`}
            >
              {paginatedProducts.map((product) => {
                const isWishlisted = wishlistIds.includes(product.id);

                if (viewMode === 'compact') {
                  return (
                    <div
                      key={product.id}
                      className="bg-white rounded-xl border border-[#c3c7c8]/40 p-4 flex flex-col sm:flex-row items-center gap-4 hover:border-[#0060a9] hover:shadow-md transition-all"
                    >
                      <div
                        className="w-24 h-24 rounded-lg bg-[#f8fafc] overflow-hidden shrink-0 cursor-pointer"
                        onClick={() => onSelectProduct(product)}
                      >
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                      </div>

                      <div className="flex-1 text-center sm:text-left">
                        <div className="text-[11px] text-[#747879]">{product.category}</div>
                        <h3
                          onClick={() => onSelectProduct(product)}
                          className="font-['Hanken_Grotesk'] text-sm font-bold text-[#181f21] hover:text-[#0060a9] cursor-pointer"
                        >
                          {product.name}
                        </h3>
                        <p className="text-xs text-[#747879] line-clamp-1 mt-1">{product.description}</p>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <span className="font-['Hanken_Grotesk'] text-base font-extrabold text-[#181f21]">
                            ${product.price}
                          </span>
                          {product.originalPrice && (
                            <span className="text-xs text-[#747879] line-through block">
                              ${product.originalPrice}
                            </span>
                          )}
                        </div>

                        <button
                          type="button"
                          onClick={() => onAddToCart(product)}
                          className="px-3 py-2 bg-[#181f21] hover:bg-[#0060a9] text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Add</span>
                        </button>
                      </div>
                    </div>
                  );
                }

                return (
                  <div
                    key={product.id}
                    className="group bg-white rounded-xl border border-[#c3c7c8]/50 overflow-hidden hover:border-[#0060a9] hover:shadow-lg transition-all flex flex-col"
                  >
                    <div className="relative aspect-square bg-[#f8fafc] overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                        onClick={() => onSelectProduct(product)}
                      />

                      {product.badge && (
                        <span
                          className={`absolute top-3 left-3 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded ${
                            product.badge.type === 'sale'
                              ? 'bg-rose-500 text-white'
                              : product.badge.type === 'gold'
                              ? 'bg-amber-500 text-white'
                              : 'bg-[#00b894] text-white'
                          }`}
                        >
                          {product.badge.text}
                        </span>
                      )}

                      <div className="absolute top-3 right-3 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          type="button"
                          onClick={() => onToggleWishlist(product)}
                          className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors shadow-xs ${
                            isWishlisted ? 'bg-rose-50 text-rose-500' : 'bg-white/90 text-[#181f21] hover:text-rose-500'
                          }`}
                          title="Wishlist"
                        >
                          <Heart className="w-4 h-4 fill-current" />
                        </button>
                        <button
                          type="button"
                          onClick={() => onQuickView(product)}
                          className="w-8 h-8 rounded-full bg-white/90 text-[#181f21] hover:text-[#0060a9] flex items-center justify-center shadow-xs"
                          title="Quick View"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Color swatches preview if available */}
                      {product.colors && product.colors.length > 0 && (
                        <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-white/85 backdrop-blur-xs px-2 py-1 rounded-full">
                          {product.colors.map((c, i) => (
                            <span
                              key={i}
                              className="w-2.5 h-2.5 rounded-full border border-black/10"
                              style={{ backgroundColor: c.hex }}
                              title={c.name}
                            />
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                      <div>
                        <div className="flex items-center justify-between text-[11px] text-[#747879] mb-1">
                          <span>{product.category}</span>
                          <div className="flex items-center gap-1 text-amber-500">
                            <Star className="w-3 h-3 fill-current" />
                            <span className="font-semibold text-[#181f21]">{product.rating}</span>
                            <span className="text-[#747879]">({product.reviewsCount})</span>
                          </div>
                        </div>

                        <h3
                          onClick={() => onSelectProduct(product)}
                          className="font-['Hanken_Grotesk'] text-sm font-bold text-[#181f21] hover:text-[#0060a9] transition-colors cursor-pointer line-clamp-1"
                        >
                          {product.name}
                        </h3>
                      </div>

                      <div className="pt-2 border-t border-[#c3c7c8]/30 flex items-center justify-between">
                        <div>
                          <span className="font-['Hanken_Grotesk'] text-base font-extrabold text-[#181f21]">
                            ${product.price}
                          </span>
                          {product.originalPrice && (
                            <span className="text-xs text-[#747879] line-through ml-1.5">
                              ${product.originalPrice}
                            </span>
                          )}
                        </div>

                        <button
                          type="button"
                          onClick={() => onAddToCart(product)}
                          className="p-2 bg-[#181f21] hover:bg-[#0060a9] text-white rounded-lg transition-colors cursor-pointer"
                          title="Add to Shopping Bag"
                        >
                          <ShoppingBag className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="pt-8 border-t border-[#c3c7c8]/30 flex items-center justify-center gap-2">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="px-3 py-1.5 rounded-lg border border-[#c3c7c8]/60 text-xs font-semibold text-[#181f21] hover:bg-[#F9FAFB] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                Previous
              </button>
              {[...Array(totalPages)].map((_, idx) => {
                const pageNum = idx + 1;
                return (
                  <button
                    key={pageNum}
                    type="button"
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-8 h-8 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                      currentPage === pageNum
                        ? 'bg-[#0060a9] text-white'
                        : 'bg-white border border-[#c3c7c8]/60 text-[#181f21] hover:bg-[#F9FAFB]'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              <button
                type="button"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                className="px-3 py-1.5 rounded-lg border border-[#c3c7c8]/60 text-xs font-semibold text-[#181f21] hover:bg-[#F9FAFB] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>

      {/* MOBILE FILTERS MODAL */}
      {isMobileFiltersOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex justify-end">
          <div className="w-full max-w-sm bg-white h-full p-6 overflow-y-auto flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#c3c7c8]/30">
                <h3 className="font-['Hanken_Grotesk'] text-base font-bold text-[#181f21]">Filter Catalog</h3>
                <button
                  type="button"
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="p-1 text-[#747879] hover:text-[#181f21]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Category */}
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#747879] mb-2">Category</p>
                <div className="grid grid-cols-2 gap-2">
                  {categoriesList.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => onSelectCategory(cat)}
                      className={`px-2.5 py-2 rounded-lg text-xs text-left transition-colors ${
                        (selectedCategory || 'All Artifacts') === cat
                          ? 'bg-[#0060a9] text-white font-bold'
                          : 'bg-[#F9FAFB] text-[#434749]'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile Max Price */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-bold uppercase tracking-wider text-[#747879]">Max Price</p>
                  <span className="text-xs font-bold">${maxPrice}</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={800}
                  step={20}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#0060a9]"
                />
              </div>

              {/* Mobile In Stock */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs text-[#181f21]">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="rounded text-[#0060a9]"
                  />
                  <span>In Stock Only</span>
                </label>
                <label className="flex items-center gap-2 text-xs text-[#181f21]">
                  <input
                    type="checkbox"
                    checked={onSaleOnly}
                    onChange={(e) => setOnSaleOnly(e.target.checked)}
                    className="rounded text-[#0060a9]"
                  />
                  <span>On Sale Only</span>
                </label>
              </div>
            </div>

            <div className="pt-6 border-t border-[#c3c7c8]/30 flex gap-3">
              <button
                type="button"
                onClick={handleResetFilters}
                className="flex-1 py-3 border border-[#c3c7c8] rounded-xl text-xs font-semibold text-[#181f21]"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={() => setIsMobileFiltersOpen(false)}
                className="flex-1 py-3 bg-[#0060a9] text-white rounded-xl text-xs font-semibold"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
