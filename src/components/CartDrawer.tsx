import React, { useState } from 'react';
import { X, Trash2, ArrowRight, ShieldCheck, ShoppingBag, CheckCircle } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onNavigateToCart?: () => void;
  onNavigateToCheckout?: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onNavigateToCart,
  onNavigateToCheckout,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  if (!isOpen) return null;

  const rawSubtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountAmount = (rawSubtotal * discountPercent) / 100;
  const subtotal = rawSubtotal - discountAmount;
  const shippingThreshold = 250;
  const isFreeShipping = subtotal >= shippingThreshold || subtotal === 0;
  const progressToFreeShipping = Math.min(100, (subtotal / shippingThreshold) * 100);

  const applyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.toUpperCase() === 'MAAMUUZ10' || promoCode.toUpperCase() === 'PREMIUM') {
      setDiscountPercent(10);
      setPromoApplied(true);
    } else {
      alert('Try promo code: MAAMUUZ10 for 10% off your purchase!');
    }
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setOrderComplete(true);
      onClearCart();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs animate-fadeIn">
      <div 
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between border-l border-[#c3c7c8]/40 animate-slideLeft"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-6 border-b border-[#c3c7c8]/30 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#0060a9]" />
            <h2 className="font-['Hanken_Grotesk'] text-xl font-bold text-[#131d21]">
              Your Shopping Bag ({items.reduce((acc, curr) => acc + curr.quantity, 0)})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[#F9FAFB] text-[#747879] hover:text-[#131d21] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="px-6 py-3 bg-[#eaf5fa] border-b border-[#a2c9ff]/30 text-xs">
          {isFreeShipping ? (
            <div className="flex items-center gap-2 text-[#0060a9] font-medium">
              <span className="w-2 h-2 rounded-full bg-[#00b894]" />
              <span>Congratulations! Your order qualifies for Complimentary Express Dispatch.</span>
            </div>
          ) : (
            <div className="space-y-1">
              <div className="flex justify-between text-[#434749]">
                <span>Add ${(shippingThreshold - subtotal).toFixed(2)} more for Free Express Delivery</span>
                <span>{Math.round(progressToFreeShipping)}%</span>
              </div>
              <div className="w-full h-1.5 bg-white rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#0060a9] transition-all duration-300"
                  style={{ width: `${progressToFreeShipping}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Drawer Body - Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {orderComplete ? (
            <div className="text-center py-12 space-y-4">
              <CheckCircle className="w-14 h-14 text-[#00b894] mx-auto" />
              <h3 className="font-['Hanken_Grotesk'] text-2xl font-bold text-[#131d21]">
                Order Confirmed
              </h3>
              <p className="font-['Inter'] text-sm text-[#434749] max-w-xs mx-auto">
                Thank you for curating with Maamuuz. Your bespoke package will be dispatched within 24 hours.
              </p>
              <button
                onClick={() => {
                  setOrderComplete(false);
                  onClose();
                }}
                className="px-6 py-2.5 rounded-lg bg-[#0060a9] text-white text-xs font-semibold"
              >
                Continue Exploring
              </button>
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-16 space-y-4 text-[#747879]">
              <ShoppingBag className="w-12 h-12 mx-auto text-[#c3c7c8]" />
              <p className="font-['Hanken_Grotesk'] text-lg font-medium text-[#131d21]">
                Your shopping bag is empty
              </p>
              <p className="text-xs max-w-xs mx-auto">
                Explore our curated collection of Swiss timepieces, Italian leather, and acoustic masterworks.
              </p>
            </div>
          ) : (
            items.map(({ product, quantity }) => (
              <div
                key={product.id}
                className="flex items-center gap-4 p-3 bg-[#F9FAFB] rounded-xl border border-[#c3c7c8]/30"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-18 h-18 rounded-lg object-cover bg-white"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-['Inter'] text-sm font-semibold text-[#131d21] truncate">
                    {product.name}
                  </h4>
                  <p className="text-xs text-[#747879] mt-0.5">${product.price} each</p>

                  {/* Quantity adjustment */}
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center border border-[#c3c7c8] rounded bg-white text-xs">
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(product.id, -1)}
                        className="px-2 py-1 hover:bg-gray-100 font-bold"
                      >
                        -
                      </button>
                      <span className="px-2 py-1 font-semibold">{quantity}</span>
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(product.id, 1)}
                        className="px-2 py-1 hover:bg-gray-100 font-bold"
                      >
                        +
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => onRemoveItem(product.id)}
                      className="p-1 text-[#747879] hover:text-[#ea4335] transition-colors ml-auto"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer */}
        {!orderComplete && items.length > 0 && (
          <div className="p-6 border-t border-[#c3c7c8]/30 bg-white space-y-4">
            {/* Promo Code Form */}
            <form onSubmit={applyPromo} className="flex gap-2">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Promo code (e.g. MAAMUUZ10)"
                className="flex-1 px-3 py-2 text-xs border border-[#c3c7c8] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0060a9]"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#181f21] hover:bg-black text-white text-xs font-semibold rounded-lg transition-colors"
              >
                Apply
              </button>
            </form>

            {promoApplied && (
              <p className="text-xs text-[#00b894] font-medium">
                10% Preferred Collector Discount Applied!
              </p>
            )}

            {/* Price Calculations */}
            <div className="space-y-1.5 text-xs text-[#434749]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-[#131d21]">${rawSubtotal.toFixed(2)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-[#00b894]">
                  <span>Privilege Savings</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Estimated Express Shipping</span>
                <span>{isFreeShipping ? 'Complimentary' : '$25.00'}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-[#131d21] pt-2 border-t border-[#c3c7c8]/30">
                <span>Total</span>
                <span>${(subtotal + (isFreeShipping ? 0 : 25)).toFixed(2)}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              type="button"
              onClick={() => {
                onClose();
                if (onNavigateToCheckout) {
                  onNavigateToCheckout();
                }
              }}
              className="w-full bg-[#0060a9] hover:bg-[#004881] text-white font-['Inter'] text-sm font-semibold py-3.5 px-4 rounded-lg shadow-sm hover:shadow-[0px_10px_30px_rgba(45,52,54,0.12)] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Proceed to Secure Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {onNavigateToCart && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onNavigateToCart();
                }}
                className="w-full text-center py-1.5 text-xs text-[#747879] hover:text-[#0060a9] font-medium cursor-pointer"
              >
                View Detailed Shopping Bag Page →
              </button>
            )}

            <div className="flex items-center justify-center gap-2 text-[11px] text-[#747879]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#0060a9]" />
              <span>Encrypted with 256-bit SSL Banking Security</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
