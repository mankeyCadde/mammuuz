import React, { useState } from 'react';
import { X, Star, ShoppingBag, ShieldCheck, Truck, RefreshCw, Check } from 'lucide-react';
import { Product } from '../types';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onViewFullDetails?: (product: Product) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onViewFullDetails,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-3xl bg-white rounded-2xl shadow-[0px_14px_36px_rgba(45,52,54,0.18)] border border-[#c3c7c8]/40 overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/90 text-[#131d21] hover:bg-[#F9FAFB] shadow-xs cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Image */}
        <div className="w-full md:w-1/2 bg-[#F9FAFB] relative aspect-square md:aspect-auto">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          {product.badge && (
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase bg-[#00b894] text-white">
                {product.badge.text}
              </span>
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
          <div className="space-y-4">
            <div>
              <span className="text-xs uppercase tracking-wider font-semibold text-[#0060a9]">
                {product.category}
              </span>
              <h2 className="font-['Hanken_Grotesk'] text-2xl font-bold text-[#131d21] mt-1">
                {product.name}
              </h2>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center text-[#FBBC05]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-xs text-[#747879] font-medium">
                  {product.rating} ({product.reviewsCount} verified reviews)
                </span>
              </div>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="font-['Hanken_Grotesk'] text-3xl font-bold text-[#131d21]">
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-[#747879] line-through">
                  ${product.originalPrice}
                </span>
              )}
              <span className="text-xs font-semibold text-[#00b894] bg-[#00b894]/10 px-2 py-0.5 rounded">
                In Stock & Ready to Dispatch
              </span>
            </div>

            <p className="font-['Inter'] text-sm text-[#434749] leading-relaxed">
              {product.description}
            </p>

            {/* Specifications */}
            <div className="space-y-2 pt-2 border-t border-[#c3c7c8]/30">
              <p className="text-xs font-semibold text-[#131d21] uppercase tracking-wider">
                Crafted Specifications
              </p>
              <ul className="space-y-1 text-xs text-[#434749]">
                {product.specs.map((spec, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0060a9]" />
                    {spec}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-6 border-t border-[#c3c7c8]/30 space-y-4">
            <div className="flex items-center gap-4">
              {/* Quantity selector */}
              <div className="flex items-center border border-[#c3c7c8] rounded-lg">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-sm font-semibold text-[#131d21] hover:bg-[#F9FAFB]"
                >
                  -
                </button>
                <span className="px-3 py-2 text-sm font-semibold text-[#131d21] min-w-8 text-center">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 text-sm font-semibold text-[#131d21] hover:bg-[#F9FAFB]"
                >
                  +
                </button>
              </div>

              {/* Add to Bag Button */}
              <button
                type="button"
                onClick={handleAdd}
                className="flex-1 bg-[#0060a9] hover:bg-[#004881] text-white font-['Inter'] text-sm font-semibold py-3 px-6 rounded-lg shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4 text-white" />
                    <span>Added to Bag</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Bag — ${(product.price * quantity).toLocaleString()}</span>
                  </>
                )}
              </button>
            </div>

            {onViewFullDetails && (
              <button
                type="button"
                onClick={() => {
                  onViewFullDetails(product);
                  onClose();
                }}
                className="w-full text-center py-2 text-xs font-semibold text-[#0060a9] hover:underline cursor-pointer"
              >
                Inspect Complete Artifact Blueprint & Reviews →
              </button>
            )}

            {/* Micro guarantees */}
            <div className="grid grid-cols-3 gap-2 text-[11px] text-[#747879] text-center pt-1">
              <div className="flex items-center justify-center gap-1">
                <Truck className="w-3.5 h-3.5" />
                <span>Express Courier</span>
              </div>
              <div className="flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Authentic Guarantee</span>
              </div>
              <div className="flex items-center justify-center gap-1">
                <RefreshCw className="w-3.5 h-3.5" />
                <span>30-Day Privilege</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
