import React, { useState, useMemo } from 'react';
import { Plus, Star, ArrowRight, Sparkles, Filter, Check, Heart } from 'lucide-react';
import { Product } from '../types';
import { LUXURY_PRODUCTS } from '../data/products';

interface MarketplaceScreenProps {
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  searchQuery: string;
}

export const MarketplaceScreen: React.FC<MarketplaceScreenProps> = ({
  onSelectProduct,
  onAddToCart,
  searchQuery,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  const categories = ['All', 'Timepieces', 'Audio', 'Leather Goods', 'Eyewear', 'Accessories'];

  const toggleFavorite = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setFavorites(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredProducts = useMemo(() => {
    return LUXURY_PRODUCTS.filter(item => {
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const matchesSearch = searchQuery.trim() === '' || 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // featured default order
    });
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-10 py-8 space-y-10">
      {/* Editorial Hero Banner with 24px radius (Large per design specs) */}
      <section 
        id="hero-banner"
        className="relative overflow-hidden rounded-[24px] bg-[#181f21] text-white p-8 md:p-14 shadow-card-subtle flex flex-col md:flex-row items-center justify-between gap-8"
      >
        <div className="relative z-10 max-w-xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold text-[#00b894] border border-white/10">
            <Sparkles className="w-3.5 h-3.5" />
            <span>2026 Curated Capsule Collection</span>
          </div>
          <h1 className="font-['Hanken_Grotesk'] text-3xl md:text-5xl font-bold tracking-tight text-white leading-tight">
            Quiet Luxury, Engineered Precision.
          </h1>
          <p className="font-['Inter'] text-[#c1c8ca] text-base md:text-lg leading-relaxed">
            Experience handcrafted artisanal chronographs, Italian vegetable-tanned leather, and acoustic reference instruments made for those who demand uncompromised craft.
          </p>
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => setSelectedCategory('Timepieces')}
              className="px-6 py-3 rounded-xl bg-[#0060a9] hover:bg-[#0984E3] text-white font-['Inter'] text-sm font-semibold transition-all duration-300 shadow-sm flex items-center gap-2 cursor-pointer"
            >
              <span>Explore Timepieces</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory('Leather Goods')}
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-['Inter'] text-sm font-semibold border border-white/20 transition-all cursor-pointer"
            >
              Tuscan Leather
            </button>
          </div>
        </div>

        <div className="relative z-10 w-full md:w-80 shrink-0 aspect-[4/3] rounded-2xl overflow-hidden border border-white/15 shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=1000&auto=format&fit=crop"
            alt="Maamuuz Featured Timepiece"
            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4">
            <div className="text-white">
              <span className="text-[11px] font-mono tracking-widest uppercase text-[#00b894]">Curator's Choice</span>
              <p className="font-['Hanken_Grotesk'] font-bold text-sm">Chronograph Minimalist Noir — $380</p>
            </div>
          </div>
        </div>

        {/* Subtle decorative background gradient */}
        <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-[#0060a9]/20 rounded-full blur-3xl pointer-events-none" />
      </section>

      {/* Filter and Search Bar Row */}
      <section className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#c3c7c8]/40 pb-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full font-['Inter'] text-xs md:text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#181f21] text-white shadow-xs'
                    : 'bg-white text-[#434749] border border-[#c3c7c8]/50 hover:bg-[#F9FAFB]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort selection */}
          <div className="flex items-center gap-3 self-end md:self-auto text-xs font-['Inter']">
            <span className="text-[#747879] flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" />
              Sort by:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white border border-[#c3c7c8]/70 rounded-lg px-3 py-1.5 font-medium text-[#131d21] focus:outline-none focus:ring-1 focus:ring-[#0060a9]"
            >
              <option value="featured">Curated & Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Results count */}
        <div className="flex justify-between items-center text-xs text-[#747879] font-['Inter']">
          <span>Showing {filteredProducts.length} premium essentials</span>
          {searchQuery && (
            <span>Search results for "{searchQuery}"</span>
          )}
        </div>
      </section>

      {/* Product Cards Grid: Per Design Specs */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            onClick={() => onSelectProduct(product)}
            className="group relative bg-white rounded-xl border border-[#c3c7c8]/30 shadow-[0px_4px_20px_rgba(45,52,54,0.05)] hover:shadow-[0px_10px_30px_rgba(45,52,54,0.08)] transition-all duration-300 flex flex-col overflow-hidden cursor-pointer"
          >
            {/* Full-width image at top with 12px radius */}
            <div className="relative w-full aspect-[4/3] bg-[#F9FAFB] overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                loading="lazy"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
              />

              {/* Badges: Pill-shaped. 'New' uses Tertiary (#00B894); 'Sale' uses soft coral/red; 'Exclusive' */}
              {product.badge && (
                <div className="absolute top-3 left-3 z-10">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-['Inter'] font-semibold tracking-wide uppercase ${
                      product.badge.type === 'tertiary'
                        ? 'bg-[#00b894] text-white shadow-xs'
                        : product.badge.type === 'sale'
                        ? 'bg-[#ea4335] text-white shadow-xs'
                        : 'bg-[#181f21] text-white shadow-xs'
                    }`}
                  >
                    {product.badge.text}
                  </span>
                </div>
              )}

              {/* Favorite Wishlist Icon */}
              <button
                type="button"
                onClick={(e) => toggleFavorite(e, product.id)}
                className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/85 hover:bg-white text-[#131d21] shadow-sm backdrop-blur-xs transition-colors"
                title="Save to wishlist"
              >
                <Heart
                  className={`w-4 h-4 transition-colors ${
                    favorites[product.id] ? 'fill-[#ea4335] text-[#ea4335]' : 'text-[#747879]'
                  }`}
                />
              </button>

              {/* Quick Add floating button appears on hover in bottom right of image container using secondary color (#0984E3) */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onAddToCart(product);
                }}
                className="absolute bottom-3 right-3 z-10 p-3 rounded-full bg-[#0060a9] hover:bg-[#0984E3] text-white shadow-md transform translate-y-2 opacity-90 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center cursor-pointer"
                title="Quick Add to Bag"
              >
                <Plus className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>

            {/* Content: Body-md for product title, Headline-md for price */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div className="space-y-1.5">
                <span className="text-[11px] uppercase tracking-wider font-semibold text-[#747879] font-['Inter']">
                  {product.category}
                </span>
                <h3 className="font-['Inter'] text-[16px] font-medium text-[#131d21] line-clamp-1 group-hover:text-[#0060a9] transition-colors">
                  {product.name}
                </h3>
              </div>

              <div className="pt-4 flex items-baseline justify-between border-t border-[#c3c7c8]/20 mt-3">
                {/* Headline-md for price */}
                <div className="flex items-baseline gap-2">
                  <span className="font-['Hanken_Grotesk'] text-2xl font-semibold text-[#131d21]">
                    ${product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xs text-[#747879] line-through font-['Inter']">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 text-xs text-[#747879] font-['Inter']">
                  <Star className="w-3.5 h-3.5 fill-[#FBBC05] text-[#FBBC05]" />
                  <span className="font-semibold text-[#131d21]">{product.rating}</span>
                  <span className="text-[11px]">({product.reviewsCount})</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-16 bg-white rounded-xl border border-[#c3c7c8]/40 p-8 space-y-4">
          <p className="font-['Hanken_Grotesk'] text-xl font-semibold text-[#131d21]">
            No luxury items matching your criteria
          </p>
          <p className="text-sm text-[#747879]">
            Try adjusting your search terms or selecting another category.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('All');
            }}
            className="px-5 py-2.5 rounded-lg bg-[#0060a9] text-white font-medium text-xs cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Brand Trust Feature Grid */}
      <section className="bg-white rounded-xl border border-[#c3c7c8]/30 p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
        <div className="space-y-1">
          <h4 className="font-['Hanken_Grotesk'] font-semibold text-[#131d21] text-base">
            Handcrafted Provenance
          </h4>
          <p className="font-['Inter'] text-xs text-[#434749]">
            Direct artisanal partnerships across Florence, Geneva, and Osaka.
          </p>
        </div>
        <div className="space-y-1">
          <h4 className="font-['Hanken_Grotesk'] font-semibold text-[#131d21] text-base">
            Lifetime Authenticity
          </h4>
          <p className="font-['Inter'] text-xs text-[#434749]">
            Each piece includes serialized certificate and cryptographic provenance record.
          </p>
        </div>
        <div className="space-y-1">
          <h4 className="font-['Hanken_Grotesk'] font-semibold text-[#131d21] text-base">
            White-Glove Delivery
          </h4>
          <p className="font-['Inter'] text-xs text-[#434749]">
            Insured premium packaging with 30-day complimentary exchange privileges.
          </p>
        </div>
      </section>
    </div>
  );
};
