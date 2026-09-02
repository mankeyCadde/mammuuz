import React, { useState } from 'react';
import {
  Trash2,
  ArrowRight,
  ShieldCheck,
  Truck,
  Sparkles,
  ShoppingBag,
  Tag,
  ArrowLeft,
  Check
} from 'lucide-react';
import { CartItem, Product, ScreenType } from '../../types';
import { Breadcrumbs } from '../common/Breadcrumbs';

interface CartScreenProps {
  items: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onNavigate: (screen: ScreenType) => void;
  onProceedToCheckout: () => void;
  onSelectProduct: (product: Product) => void;
  onAddToast: (title: string, desc?: string, type?: 'success' | 'info' | 'error') => void;
}

export const CartScreen: React.FC<CartScreenProps> = ({
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onNavigate,
  onProceedToCheckout,
  onSelectProduct,
  onAddToast,
}) => {
  const [promoInput, setPromoInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [savedForLater, setSavedForLater] = useState<CartItem[]>([]);

  // Calculations
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const freeShippingThreshold = 250;
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const shippingFee = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 25;
  const discountAmount = (subtotal * discountPercent) / 100;
  const estimatedTax = (subtotal - discountAmount) * 0.0825; // 8.25%
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingFee + estimatedTax);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoInput.trim().toUpperCase();
    if (code === 'MAAMUUZ10') {
      setAppliedPromo('MAAMUUZ10');
      setDiscountPercent(10);
      onAddToast('Privilege Code Applied', '10% private patron discount applied to your order.');
      setPromoInput('');
    } else if (code === 'VIP20') {
      setAppliedPromo('VIP20');
      setDiscountPercent(20);
      onAddToast('VIP Code Applied', '20% collector circle discount applied.');
      setPromoInput('');
    } else {
      onAddToast('Invalid Code', 'Try "MAAMUUZ10" for 10% off your curated bag.', 'error');
    }
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
    setDiscountPercent(0);
    onAddToast('Promo Removed', 'Promotional discount removed.', 'info');
  };

  const handleSaveForLater = (item: CartItem) => {
    onRemoveItem(item.product.id);
    setSavedForLater([...savedForLater, item]);
    onAddToast('Saved for Later', `${item.product.name} moved to saved section.`);
  };

  const handleMoveBackToCart = (item: CartItem) => {
    setSavedForLater(savedForLater.filter((i) => i.product.id !== item.product.id));
    onUpdateQuantity(item.product.id, item.quantity);
    onAddToast('Moved to Cart', `${item.product.name} returned to your active bag.`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-10 pb-24">
      <Breadcrumbs
        items={[{ label: 'Shopping Bag' }]}
        onNavigate={onNavigate}
      />

      <div className="py-6 border-b border-[#c3c7c8]/30 mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#0060a9]">
            Order Review
          </span>
          <h1 className="font-['Hanken_Grotesk'] text-3xl sm:text-4xl font-extrabold text-[#181f21] mt-1">
            Your Shopping Bag ({items.reduce((s, i) => s + i.quantity, 0)})
          </h1>
        </div>

        {items.length > 0 && (
          <button
            type="button"
            onClick={onClearCart}
            className="text-xs text-[#747879] hover:text-red-600 font-medium underline self-start sm:self-auto cursor-pointer"
          >
            Clear Entire Bag
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#c3c7c8]/40 p-12 text-center max-w-lg mx-auto my-12 space-y-4">
          <div className="w-14 h-14 rounded-full bg-[#f1fbff] text-[#0060a9] flex items-center justify-center mx-auto">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <h3 className="font-['Hanken_Grotesk'] text-xl font-bold text-[#181f21]">
            Your shopping bag is empty
          </h3>
          <p className="text-xs text-[#747879] leading-relaxed">
            Begin exploring our Swiss chronographs, Tuscan leathers, and studio acoustics to assemble your order.
          </p>
          <button
            type="button"
            onClick={() => onNavigate('shop')}
            className="px-6 py-3 bg-[#181f21] hover:bg-[#0060a9] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-sm inline-flex items-center gap-2 cursor-pointer"
          >
            <span>Explore Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Cart Items List (7 Cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Free Shipping Progress Indicator */}
            <div className="p-4 bg-white rounded-xl border border-[#c3c7c8]/40">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-semibold text-[#181f21] flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#0060a9]" />
                  {amountToFreeShipping > 0
                    ? `Add $${amountToFreeShipping.toFixed(0)} more for Complimentary White-Glove Dispatch`
                    : 'Complimentary White-Glove Dispatch Unlocked!'}
                </span>
                <span className="font-bold text-[#0060a9]">
                  ${subtotal.toFixed(0)} / ${freeShippingThreshold}
                </span>
              </div>
              <div className="w-full bg-[#eaf5fa] h-2 rounded-full overflow-hidden">
                <div
                  className="bg-[#00b894] h-full transition-all duration-500 rounded-full"
                  style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
                />
              </div>
            </div>

            {/* Line items list */}
            <div className="bg-white rounded-2xl border border-[#c3c7c8]/40 divide-y divide-[#c3c7c8]/30 overflow-hidden shadow-xs">
              {items.map((item) => (
                <div key={item.product.id} className="p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-5">
                  {/* Thumbnail */}
                  <div
                    onClick={() => onSelectProduct(item.product)}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-[#f8fafc] overflow-hidden shrink-0 border border-[#c3c7c8]/30 cursor-pointer"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 space-y-1">
                    <span className="text-[11px] uppercase tracking-wider text-[#747879] font-medium">
                      {item.product.category}
                    </span>
                    <h3
                      onClick={() => onSelectProduct(item.product)}
                      className="font-['Hanken_Grotesk'] text-sm sm:text-base font-bold text-[#181f21] hover:text-[#0060a9] cursor-pointer"
                    >
                      {item.product.name}
                    </h3>
                    {item.selectedColor && (
                      <div className="flex items-center gap-1.5 text-xs text-[#747879]">
                        <span>Color finish:</span>
                        <span
                          className="w-2.5 h-2.5 rounded-full border border-black/20"
                          style={{ backgroundColor: item.selectedColor.hex }}
                        />
                        <span className="font-medium text-[#181f21]">{item.selectedColor.name}</span>
                      </div>
                    )}
                    <div className="text-xs font-semibold text-[#181f21] pt-1">
                      ${item.product.price} each
                    </div>
                  </div>

                  {/* Stepper & Total */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-4">
                    <div className="flex items-center border border-[#c3c7c8]/70 rounded-lg p-1 bg-white">
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(item.product.id, -1)}
                        className="w-7 h-7 flex items-center justify-center hover:bg-[#f1fbff] rounded font-bold text-xs cursor-pointer"
                      >
                        -
                      </button>
                      <span className="w-8 text-center text-xs font-bold">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(item.product.id, 1)}
                        className="w-7 h-7 flex items-center justify-center hover:bg-[#f1fbff] rounded font-bold text-xs cursor-pointer"
                      >
                        +
                      </button>
                    </div>

                    <div className="text-right">
                      <div className="font-['Hanken_Grotesk'] text-base font-extrabold text-[#181f21]">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </div>
                      <div className="flex items-center gap-3 pt-1 text-[11px] text-[#747879]">
                        <button
                          type="button"
                          onClick={() => handleSaveForLater(item)}
                          className="hover:text-[#0060a9] underline cursor-pointer"
                        >
                          Save for later
                        </button>
                        <button
                          type="button"
                          onClick={() => onRemoveItem(item.product.id)}
                          className="hover:text-red-600 underline cursor-pointer"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Saved for Later Section */}
            {savedForLater.length > 0 && (
              <div className="pt-6 space-y-4">
                <h3 className="font-['Hanken_Grotesk'] text-lg font-bold text-[#181f21]">
                  Saved for Later ({savedForLater.length})
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {savedForLater.map((sItem) => (
                    <div
                      key={sItem.product.id}
                      className="p-4 bg-white rounded-xl border border-[#c3c7c8]/40 flex items-center gap-4"
                    >
                      <img
                        src={sItem.product.image}
                        alt={sItem.product.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-['Hanken_Grotesk'] text-xs font-bold text-[#181f21] truncate">
                          {sItem.product.name}
                        </h4>
                        <div className="font-extrabold text-xs text-[#181f21] mt-0.5">${sItem.product.price}</div>
                        <button
                          type="button"
                          onClick={() => handleMoveBackToCart(sItem)}
                          className="text-[11px] font-semibold text-[#0060a9] hover:underline mt-1 cursor-pointer"
                        >
                          Move back to bag
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-2xl border border-[#c3c7c8]/50 p-6 shadow-sm space-y-5">
              <h2 className="font-['Hanken_Grotesk'] text-lg font-bold text-[#181f21] pb-3 border-b border-[#c3c7c8]/30">
                Order Financial Summary
              </h2>

              {/* Promo Code Form */}
              <div>
                <label className="text-xs font-semibold text-[#181f21] block mb-1.5">
                  Privilege or Patron Promo Code
                </label>
                {appliedPromo ? (
                  <div className="p-3 bg-[#eaf5fa] border border-[#0060a9]/30 rounded-xl flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 text-[#0060a9] font-bold">
                      <Tag className="w-4 h-4" />
                      <span>{appliedPromo} ({discountPercent}% OFF)</span>
                    </div>
                    <button
                      type="button"
                      onClick={handleRemovePromo}
                      className="text-xs text-red-600 hover:underline cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      placeholder="Try code: MAAMUUZ10"
                      className="flex-1 bg-[#F9FAFB] border border-[#c3c7c8] rounded-xl px-3 py-2 text-xs uppercase placeholder:normal-case focus:outline-none focus:border-[#0060a9]"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#181f21] hover:bg-[#0060a9] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
                    >
                      Apply
                    </button>
                  </form>
                )}
              </div>

              {/* Line items tally */}
              <div className="space-y-2.5 pt-2 text-xs text-[#434749]">
                <div className="flex items-center justify-between">
                  <span>Bag Subtotal</span>
                  <span className="font-semibold text-[#181f21]">${subtotal.toFixed(2)}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex items-center justify-between text-[#00b894] font-medium">
                    <span>Privilege Discount ({discountPercent}%)</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <span>White-Glove Express Shipping</span>
                  <span className="font-semibold text-[#181f21]">
                    {shippingFee === 0 ? <span className="text-[#00b894]">Complimentary</span> : `$${shippingFee.toFixed(2)}`}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span>Estimated Sales Tax (8.25%)</span>
                  <span className="font-semibold text-[#181f21]">${estimatedTax.toFixed(2)}</span>
                </div>
              </div>

              {/* Grand Total */}
              <div className="pt-4 border-t border-[#c3c7c8]/30 flex items-baseline justify-between">
                <div>
                  <span className="font-['Hanken_Grotesk'] text-base font-bold text-[#181f21]">Grand Total</span>
                  <span className="text-[10px] text-[#747879] block">Including insured delivery</span>
                </div>
                <div className="font-['Hanken_Grotesk'] text-2xl font-extrabold text-[#181f21]">
                  ${grandTotal.toFixed(2)}
                </div>
              </div>

              {/* Checkout Button */}
              <button
                type="button"
                onClick={onProceedToCheckout}
                className="w-full py-4 bg-[#0060a9] hover:bg-[#0984E3] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => onNavigate('shop')}
                className="w-full py-2.5 text-xs text-[#747879] hover:text-[#181f21] font-semibold text-center flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Continue Browsing Catalog</span>
              </button>
            </div>

            {/* Assurance Trust Badges */}
            <div className="p-4 bg-white rounded-xl border border-[#c3c7c8]/30 space-y-2 text-xs text-[#747879]">
              <div className="flex items-center gap-2 text-[#181f21] font-semibold">
                <ShieldCheck className="w-4 h-4 text-[#00b894]" />
                <span>256-Bit Encrypted Transaction</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                Transactions processed via secure PCI-DSS tokenization. We never store unmasked payment credentials.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
