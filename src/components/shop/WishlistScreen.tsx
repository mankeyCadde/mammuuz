import React from 'react';
import { Heart, ShoppingBag, Trash2, ArrowRight, Sparkles } from 'lucide-react';
import { Product, ScreenType } from '../../types';
import { Breadcrumbs } from '../common/Breadcrumbs';

interface WishlistScreenProps {
  wishlistItems: Product[];
  onRemoveFromWishlist: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onMoveAllToCart: () => void;
  onClearWishlist: () => void;
  onSelectProduct: (product: Product) => void;
  onNavigate: (screen: ScreenType) => void;
}

export const WishlistScreen: React.FC<WishlistScreenProps> = ({
  wishlistItems,
  onRemoveFromWishlist,
  onAddToCart,
  onMoveAllToCart,
  onClearWishlist,
  onSelectProduct,
  onNavigate,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-10 pb-24">
      <Breadcrumbs
        items={[{ label: 'Saved Wishlist' }]}
        onNavigate={onNavigate}
      />

      <div className="py-8 border-b border-[#c3c7c8]/30 flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#0060a9]">
            Personal Curation
          </span>
          <h1 className="font-['Hanken_Grotesk'] text-3xl sm:text-4xl font-extrabold text-[#181f21] mt-1">
            Saved Artifacts ({wishlistItems.length})
          </h1>
          <p className="text-xs sm:text-sm text-[#747879] mt-1 font-['Inter']">
            Your private registry of curated pieces reserved for future consideration.
          </p>
        </div>

        {wishlistItems.length > 0 && (
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClearWishlist}
              className="px-4 py-2 border border-[#c3c7c8] text-xs font-semibold text-[#747879] hover:text-rose-600 rounded-lg transition-colors cursor-pointer"
            >
              Clear All
            </button>
            <button
              type="button"
              onClick={onMoveAllToCart}
              className="px-4 py-2 bg-[#0060a9] hover:bg-[#0984E3] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Move All to Bag</span>
            </button>
          </div>
        )}
      </div>

      {wishlistItems.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#c3c7c8]/40 p-12 text-center max-w-lg mx-auto my-12 space-y-4">
          <div className="w-14 h-14 rounded-full bg-[#eaf5fa] text-[#0060a9] flex items-center justify-center mx-auto">
            <Heart className="w-6 h-6" />
          </div>
          <h3 className="font-['Hanken_Grotesk'] text-xl font-bold text-[#181f21]">
            Your wishlist is currently empty
          </h3>
          <p className="text-xs text-[#747879] leading-relaxed">
            As you explore our timepieces, acoustic drivers, and Tuscan leather accessories, save your favorites here for future inspection.
          </p>
          <button
            type="button"
            onClick={() => onNavigate('shop')}
            className="px-6 py-3 bg-[#181f21] hover:bg-[#0060a9] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-sm inline-flex items-center gap-2 cursor-pointer"
          >
            <span>Explore Curated Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlistItems.map((product) => (
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
                <button
                  type="button"
                  onClick={() => onRemoveFromWishlist(product)}
                  className="absolute top-3 right-3 p-2 bg-white/90 rounded-full text-[#747879] hover:text-rose-600 transition-colors shadow-xs cursor-pointer"
                  title="Remove from Wishlist"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <span className="text-[11px] text-[#747879] block mb-1">{product.category}</span>
                  <h3
                    onClick={() => onSelectProduct(product)}
                    className="font-['Hanken_Grotesk'] text-sm font-bold text-[#181f21] hover:text-[#0060a9] transition-colors cursor-pointer line-clamp-1"
                  >
                    {product.name}
                  </h3>
                  <div className="font-['Hanken_Grotesk'] text-base font-extrabold text-[#181f21] mt-1">
                    ${product.price}
                  </div>
                </div>

                <div className="pt-3 border-t border-[#c3c7c8]/30 flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      onAddToCart(product);
                      onRemoveFromWishlist(product);
                    }}
                    className="flex-1 py-2.5 bg-[#181f21] hover:bg-[#0060a9] text-white rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Move to Bag</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
