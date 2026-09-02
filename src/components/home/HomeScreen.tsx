import React from 'react';
import {
  ArrowRight,
  ShieldCheck,
  Star,
  Sparkles,
  Award,
  ChevronRight,
  Eye,
  Heart,
  ShoppingBag,
  SlidersHorizontal
} from 'lucide-react';
import { Product, ScreenType } from '../../types';
import { CATEGORIES_DATA } from '../../data/products';

interface HomeScreenProps {
  products: Product[];
  onNavigate: (screen: ScreenType) => void;
  onSelectCategory: (cat: string) => void;
  onSelectProduct: (prod: Product) => void;
  onQuickView: (prod: Product) => void;
  onAddToCart: (prod: Product) => void;
  onToggleWishlist: (prod: Product) => void;
  wishlistIds: string[];
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  products,
  onNavigate,
  onSelectCategory,
  onSelectProduct,
  onQuickView,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
}) => {
  const bestSellers = products.filter((p) => p.bestSeller || p.featured).slice(0, 4);
  const newArrivals = products.filter((p) => p.newArrival || p.badge?.text === 'New' || p.badge?.text === 'Limited').slice(0, 4);

  return (
    <div className="space-y-16 md:space-y-24 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#eaf5fa] via-[#f1fbff] to-transparent pt-8 md:pt-16 pb-16 md:pb-24 border-b border-[#c3c7c8]/30">
        <div className="max-w-7xl mx-auto px-4 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#c3c7c8]/60 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#0060a9]" />
                <span className="text-xs font-semibold text-[#181f21] tracking-wide">
                  New 2026 Horology & Leather Collection
                </span>
              </div>

              <h1 className="font-['Hanken_Grotesk'] text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#181f21] leading-[1.1]">
                Objects of Enduring <span className="text-[#0060a9]">Integrity.</span>
              </h1>

              <p className="text-base sm:text-lg text-[#434749] font-['Inter'] leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Precision mechanical chronographs, full-grain Tuscan leatherwork, and studio-grade acoustic instruments engineered to outlive fleeting trends.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => onNavigate('shop')}
                  className="w-full sm:w-auto px-7 py-3.5 bg-[#181f21] hover:bg-[#0060a9] text-white text-sm font-semibold rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer group"
                >
                  <span>Explore Catalog</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate('categories')}
                  className="w-full sm:w-auto px-7 py-3.5 bg-white hover:bg-[#f1fbff] text-[#181f21] border border-[#c3c7c8]/80 text-sm font-semibold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <span>Discover Categories</span>
                  <ChevronRight className="w-4 h-4 text-[#747879]" />
                </button>
              </div>

              {/* Trust Badges */}
              <div className="pt-6 border-t border-[#c3c7c8]/40 grid grid-cols-3 gap-4 text-left max-w-lg mx-auto lg:mx-0">
                <div>
                  <div className="font-['Hanken_Grotesk'] text-xl font-bold text-[#181f21]">100%</div>
                  <div className="text-xs text-[#747879] mt-0.5">Atelier Provenance</div>
                </div>
                <div>
                  <div className="font-['Hanken_Grotesk'] text-xl font-bold text-[#181f21]">30-Day</div>
                  <div className="text-xs text-[#747879] mt-0.5">Complimentary Return</div>
                </div>
                <div>
                  <div className="font-['Hanken_Grotesk'] text-xl font-bold text-[#181f21]">4.9 / 5.0</div>
                  <div className="text-xs text-[#747879] mt-0.5">Collector Rating</div>
                </div>
              </div>
            </div>

            {/* Right Hero Image Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Visual Frame */}
                <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border border-white/60 relative bg-white group">
                  <img
                    src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=85"
                    alt="Maamuuz Chronograph Minimalist Noir"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                  {/* Floating Product Tag */}
                  <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/95 backdrop-blur-md rounded-xl border border-white/40 shadow-lg flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider font-bold text-[#0060a9]">
                        Featured Masterpiece
                      </span>
                      <h4 className="font-['Hanken_Grotesk'] text-sm font-bold text-[#181f21]">
                        Chronograph Minimalist Noir
                      </h4>
                      <p className="text-xs font-semibold text-[#181f21] mt-0.5">
                        $380 <span className="text-xs font-normal text-[#747879] line-through ml-1">$460</span>
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => onSelectProduct(products[0])}
                      className="px-3.5 py-2 bg-[#181f21] hover:bg-[#0060a9] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                    >
                      Inspect
                    </button>
                  </div>
                </div>

                {/* Decorative floating badge */}
                <div className="absolute -top-4 -left-4 bg-white rounded-xl shadow-lg border border-[#c3c7c8]/40 p-3 hidden sm:flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#00b894]/10 text-[#00b894] flex items-center justify-center font-bold">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#181f21]">Swiss Movement</p>
                    <p className="text-[10px] text-[#747879]">Certified Precision</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CATEGORIES GRID */}
      <section className="max-w-7xl mx-auto px-4 md:px-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#0060a9]">
              Curated Taxonomy
            </span>
            <h2 className="font-['Hanken_Grotesk'] text-2xl sm:text-3xl font-extrabold text-[#181f21] mt-1">
              Shop by Category
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('categories')}
            className="text-xs font-semibold text-[#0060a9] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>View All Categories</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {CATEGORIES_DATA.map((cat) => (
            <button
              key={cat.name}
              type="button"
              onClick={() => {
                onSelectCategory(cat.name);
                onNavigate('shop');
              }}
              className="group relative rounded-xl overflow-hidden bg-white border border-[#c3c7c8]/40 hover:border-[#0060a9] hover:shadow-md transition-all p-3 text-center cursor-pointer"
            >
              <div className="aspect-square rounded-lg overflow-hidden bg-[#f1fbff] mb-3 relative">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <h3 className="font-['Hanken_Grotesk'] text-xs font-bold text-[#181f21] group-hover:text-[#0060a9] transition-colors line-clamp-1">
                {cat.name}
              </h3>
              <p className="text-[11px] text-[#747879] mt-0.5">{cat.count} Artifacts</p>
            </button>
          ))}
        </div>
      </section>

      {/* 3. BESTSELLERS / CURATED MASTERPIECES */}
      <section className="max-w-7xl mx-auto px-4 md:px-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#0060a9]">
              Patron Favorites
            </span>
            <h2 className="font-['Hanken_Grotesk'] text-2xl sm:text-3xl font-extrabold text-[#181f21] mt-1">
              Bestselling Masterpieces
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('shop')}
            className="text-xs font-semibold text-[#181f21] hover:text-[#0060a9] flex items-center gap-1 cursor-pointer"
          >
            <span>Browse Full Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((product) => {
            const isWishlisted = wishlistIds.includes(product.id);
            return (
              <div
                key={product.id}
                className="group bg-white rounded-xl border border-[#c3c7c8]/50 overflow-hidden hover:border-[#0060a9] hover:shadow-lg transition-all flex flex-col"
              >
                {/* Image Container */}
                <div className="relative aspect-square bg-[#f8fafc] overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                    onClick={() => onSelectProduct(product)}
                  />

                  {/* Badge */}
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

                  {/* Quick Action Overlay */}
                  <div className="absolute top-3 right-3 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      type="button"
                      onClick={() => onToggleWishlist(product)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors shadow-xs ${
                        isWishlisted
                          ? 'bg-rose-50 text-rose-500'
                          : 'bg-white/90 text-[#181f21] hover:text-rose-500'
                      }`}
                      title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
                    >
                      <Heart className="w-4 h-4 fill-current" />
                    </button>

                    <button
                      type="button"
                      onClick={() => onQuickView(product)}
                      className="w-8 h-8 rounded-full bg-white/90 text-[#181f21] hover:text-[#0060a9] flex items-center justify-center transition-colors shadow-xs"
                      title="Quick View"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Details */}
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
      </section>

      {/* 4. EDITORIAL ATELIER SPLIT BANNER */}
      <section className="max-w-7xl mx-auto px-4 md:px-10">
        <div className="bg-[#181f21] text-white rounded-2xl overflow-hidden shadow-xl grid grid-cols-1 lg:grid-cols-2">
          <div className="p-8 sm:p-12 lg:p-16 flex flex-col justify-center space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#00b894]">
              The Atelier Philosophy
            </span>
            <h2 className="font-['Hanken_Grotesk'] text-3xl sm:text-4xl font-extrabold leading-tight">
              Quiet Luxury, Tested Against Time.
            </h2>
            <p className="text-sm sm:text-base text-[#9ba1a3] font-['Inter'] leading-relaxed">
              We reject seasonal disposability. Every product in the Maamuuz collection undergoes extensive stress-testing: hand-buffed 316L stainless steel, natural organic tanning bark, and hand-finished acoustical soundboards.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-xs text-white/90">
                <div className="w-5 h-5 rounded-full bg-[#00b894]/20 text-[#00b894] flex items-center justify-center font-bold">
                  ✓
                </div>
                <span>Certified vegetable-tanned Italian leather that develops richer patina</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-white/90">
                <div className="w-5 h-5 rounded-full bg-[#00b894]/20 text-[#00b894] flex items-center justify-center font-bold">
                  ✓
                </div>
                <span>Swiss and Japanese mechanical movements with lifetime serviceability</span>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="button"
                onClick={() => onNavigate('about')}
                className="px-6 py-3 bg-[#0060a9] hover:bg-[#0984E3] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Read Our Heritage</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="relative min-h-[300px] lg:min-h-full">
            <img
              src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1200&q=80"
              alt="Maamuuz Atelier Craftsmanship"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* 5. NEW ARRIVALS */}
      <section className="max-w-7xl mx-auto px-4 md:px-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#0060a9]">
              Latest Releases
            </span>
            <h2 className="font-['Hanken_Grotesk'] text-2xl sm:text-3xl font-extrabold text-[#181f21] mt-1">
              New In Store
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('shop')}
            className="text-xs font-semibold text-[#0060a9] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>View All</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newArrivals.map((product) => {
            const isWishlisted = wishlistIds.includes(product.id);
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
                  <div className="absolute top-3 right-3 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      type="button"
                      onClick={() => onToggleWishlist(product)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors shadow-xs ${
                        isWishlisted ? 'bg-rose-50 text-rose-500' : 'bg-white/90 text-[#181f21]'
                      }`}
                    >
                      <Heart className="w-4 h-4 fill-current" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onQuickView(product)}
                      className="w-8 h-8 rounded-full bg-white/90 text-[#181f21] hover:text-[#0060a9] flex items-center justify-center shadow-xs"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <span className="text-[11px] text-[#747879] block mb-1">{product.category}</span>
                    <h3
                      onClick={() => onSelectProduct(product)}
                      className="font-['Hanken_Grotesk'] text-sm font-bold text-[#181f21] hover:text-[#0060a9] cursor-pointer line-clamp-1"
                    >
                      {product.name}
                    </h3>
                  </div>

                  <div className="pt-2 border-t border-[#c3c7c8]/30 flex items-center justify-between">
                    <span className="font-['Hanken_Grotesk'] text-base font-extrabold text-[#181f21]">
                      ${product.price}
                    </span>
                    <button
                      type="button"
                      onClick={() => onAddToCart(product)}
                      className="p-2 bg-[#181f21] hover:bg-[#0060a9] text-white rounded-lg transition-colors cursor-pointer"
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. COLLECTOR REVIEWS */}
      <section className="max-w-7xl mx-auto px-4 md:px-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#0060a9]">
            Patron Testimonials
          </span>
          <h2 className="font-['Hanken_Grotesk'] text-2xl sm:text-3xl font-extrabold text-[#181f21] mt-1">
            Words from our Collectors
          </h2>
          <p className="text-xs sm:text-sm text-[#747879] mt-2 font-['Inter']">
            Over 2,400 verified reviews across 38 countries with 4.9 average satisfaction.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-[#c3c7c8]/40 shadow-xs flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex text-amber-500 gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-xs sm:text-sm font-['Inter'] text-[#434749] italic leading-relaxed">
                “The Chronograph Noir arrived in custom wooden presentation casing. The weight on the wrist is authoritative without causing fatigue.”
              </p>
            </div>
            <div className="pt-4 border-t border-[#c3c7c8]/30 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#181f21] text-white text-xs font-bold flex items-center justify-center">
                JV
              </div>
              <div>
                <p className="font-['Hanken_Grotesk'] text-xs font-bold text-[#181f21]">Julian Vance</p>
                <p className="text-[10px] text-[#00b894] font-medium">Verified Horology Collector</p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#c3c7c8]/40 shadow-xs flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex text-amber-500 gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-xs sm:text-sm font-['Inter'] text-[#434749] italic leading-relaxed">
                “The Tuscan folio smells like genuine traditional bark-tanned leather. Fits my MacBook Pro and documents with zero bulk.”
              </p>
            </div>
            <div className="pt-4 border-t border-[#c3c7c8]/30 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#0060a9] text-white text-xs font-bold flex items-center justify-center">
                MC
              </div>
              <div>
                <p className="font-['Hanken_Grotesk'] text-xs font-bold text-[#181f21]">Marcus Chen</p>
                <p className="text-[10px] text-[#00b894] font-medium">Verified Architect & Patron</p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#c3c7c8]/40 shadow-xs flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex text-amber-500 gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-xs sm:text-sm font-['Inter'] text-[#434749] italic leading-relaxed">
                “White-glove courier delivery was flawless. The attention to detail in packaging and product manuals is rare in modern commerce.”
              </p>
            </div>
            <div className="pt-4 border-t border-[#c3c7c8]/30 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#181f21] text-white text-xs font-bold flex items-center justify-center">
                ER
              </div>
              <div>
                <p className="font-['Hanken_Grotesk'] text-xs font-bold text-[#181f21]">Elena Rostova</p>
                <p className="text-[10px] text-[#00b894] font-medium">Verified VIP Member</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
