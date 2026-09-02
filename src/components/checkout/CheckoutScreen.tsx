import React, { useState } from 'react';
import {
  ShieldCheck,
  Truck,
  CreditCard,
  Lock,
  ArrowRight,
  ArrowLeft,
  Check,
  User,
  MapPin,
  Clock,
  Sparkles
} from 'lucide-react';
import { CartItem, Address, Order, UserAccount, ScreenType } from '../../types';
import { Breadcrumbs } from '../common/Breadcrumbs';

interface CheckoutScreenProps {
  items: CartItem[];
  user: UserAccount;
  onPlaceOrder: (order: Order) => void;
  onNavigate: (screen: ScreenType) => void;
  onAddToast: (title: string, desc?: string, type?: 'success' | 'info' | 'error') => void;
}

export const CheckoutScreen: React.FC<CheckoutScreenProps> = ({
  items,
  user,
  onPlaceOrder,
  onNavigate,
  onAddToast,
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Step 1: Shipping Address state
  const defaultAddr = user.addresses[0] || {
    id: 'addr-new',
    title: 'Home',
    fullName: user.name || 'Adrian Sterling',
    addressLine1: '742 Evergreen Terrace, Penthouse B',
    addressLine2: '',
    city: 'San Francisco',
    state: 'CA',
    postalCode: '94107',
    country: 'United States',
    phone: '+1 (555) 234-8921',
    isDefaultShipping: true,
    isDefaultBilling: true,
  };

  const [address, setAddress] = useState<Address>(defaultAddr);
  const [email, setEmail] = useState<string>(user.email || 'adrian.sterling@example.com');

  // Step 2: Shipping Option
  const [shippingOption, setShippingOption] = useState<'standard' | 'express'>('express');

  // Step 3: Payment
  const [paymentType, setPaymentType] = useState<'card' | 'apple' | 'wire'>('card');
  const [cardNumber, setCardNumber] = useState('4892 •••• •••• 1042');
  const [cardHolder, setCardHolder] = useState(user.name || 'ADRIAN STERLING');
  const [cardExpiry, setCardExpiry] = useState('08/28');
  const [cardCvv, setCardCvv] = useState('849');
  const [isProcessing, setIsProcessing] = useState(false);

  // Financial calculations
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shippingFee = shippingOption === 'express' ? 0 : 15;
  const tax = subtotal * 0.0825;
  const grandTotal = subtotal + shippingFee + tax;

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      if (!address.fullName || !address.addressLine1 || !address.city || !address.postalCode) {
        onAddToast('Missing Information', 'Please complete all required address fields.', 'error');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    }
  };

  const handleFinalizeOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const newOrder: Order = {
        id: `MMZ-${Math.floor(10000 + Math.random() * 90000)}`,
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        items: [...items],
        shippingAddress: address,
        paymentMethod: paymentType === 'card' ? `Visa ending in ${cardNumber.slice(-4)}` : 'Digital Apple Pay',
        deliveryMethod:
          shippingOption === 'express'
            ? 'White-Glove Express (1–2 business days)'
            : 'Standard Insured Dispatch (3–5 business days)',
        subtotal,
        shippingFee,
        discount: 0,
        tax,
        total: grandTotal,
        status: 'Processing',
        trackingNumber: `DHL-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`,
        estimatedDelivery: shippingOption === 'express' ? 'In 2 business days' : 'In 4–5 business days',
      };

      setIsProcessing(false);
      onPlaceOrder(newOrder);
      onAddToast('Order Confirmed', `Order ${newOrder.id} successfully authorized.`);
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-10 pb-24">
      <Breadcrumbs
        items={[
          { label: 'Shopping Bag', screen: 'cart' },
          { label: 'Secure Checkout' },
        ]}
        onNavigate={onNavigate}
      />

      {/* Checkout Step Header */}
      <div className="py-6 border-b border-[#c3c7c8]/30 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#0060a9]">
              Encrypted Checkout
            </span>
            <h1 className="font-['Hanken_Grotesk'] text-2xl sm:text-3xl font-extrabold text-[#181f21] mt-1">
              Finalize Your Order
            </h1>
          </div>

          {/* Stepper Indicator */}
          <div className="flex items-center gap-2 text-xs font-['Inter']">
            <div
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-semibold ${
                step >= 1 ? 'bg-[#0060a9] text-white' : 'bg-gray-100 text-[#747879]'
              }`}
            >
              <span>1. Shipping</span>
            </div>
            <span className="text-[#c3c7c8]">/</span>
            <div
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-semibold ${
                step >= 2 ? 'bg-[#0060a9] text-white' : 'bg-gray-100 text-[#747879]'
              }`}
            >
              <span>2. Delivery</span>
            </div>
            <span className="text-[#c3c7c8]">/</span>
            <div
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-semibold ${
                step >= 3 ? 'bg-[#0060a9] text-white' : 'bg-gray-100 text-[#747879]'
              }`}
            >
              <span>3. Payment</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Interactive Steps (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* STEP 1: SHIPPING ADDRESS */}
          {step === 1 && (
            <form onSubmit={handleNextStep} className="bg-white rounded-2xl border border-[#c3c7c8]/40 p-6 sm:p-8 space-y-6 shadow-xs">
              <div className="flex items-center justify-between pb-4 border-b border-[#c3c7c8]/30">
                <h2 className="font-['Hanken_Grotesk'] text-lg font-bold text-[#181f21] flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#0060a9]" />
                  <span>1. Contact & Delivery Destination</span>
                </h2>
                <span className="text-xs text-[#0060a9] font-semibold">Step 1 of 3</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-[#181f21] mb-1">
                    Notification Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#F9FAFB] border border-[#c3c7c8] rounded-xl px-3.5 py-2.5 text-xs text-[#181f21] focus:outline-none focus:border-[#0060a9]"
                    required
                  />
                  <span className="text-[11px] text-[#747879] mt-0.5 block">
                    Your dispatch tracker and tax invoice will be transmitted to this inbox.
                  </span>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-[#181f21] mb-1">
                    Recipient Full Legal Name
                  </label>
                  <input
                    type="text"
                    value={address.fullName}
                    onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                    className="w-full bg-[#F9FAFB] border border-[#c3c7c8] rounded-xl px-3.5 py-2.5 text-xs text-[#181f21] focus:outline-none focus:border-[#0060a9]"
                    required
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-[#181f21] mb-1">
                    Street Address & Suite / Apt
                  </label>
                  <input
                    type="text"
                    value={address.addressLine1}
                    onChange={(e) => setAddress({ ...address, addressLine1: e.target.value })}
                    placeholder="e.g. 742 Evergreen Terrace, Penthouse B"
                    className="w-full bg-[#F9FAFB] border border-[#c3c7c8] rounded-xl px-3.5 py-2.5 text-xs text-[#181f21] focus:outline-none focus:border-[#0060a9]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#181f21] mb-1">City</label>
                  <input
                    type="text"
                    value={address.city}
                    onChange={(e) => setAddress({ ...address, city: e.target.value })}
                    className="w-full bg-[#F9FAFB] border border-[#c3c7c8] rounded-xl px-3.5 py-2.5 text-xs text-[#181f21] focus:outline-none focus:border-[#0060a9]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#181f21] mb-1">State / Province</label>
                  <input
                    type="text"
                    value={address.state}
                    onChange={(e) => setAddress({ ...address, state: e.target.value })}
                    className="w-full bg-[#F9FAFB] border border-[#c3c7c8] rounded-xl px-3.5 py-2.5 text-xs text-[#181f21] focus:outline-none focus:border-[#0060a9]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#181f21] mb-1">Postal Code</label>
                  <input
                    type="text"
                    value={address.postalCode}
                    onChange={(e) => setAddress({ ...address, postalCode: e.target.value })}
                    className="w-full bg-[#F9FAFB] border border-[#c3c7c8] rounded-xl px-3.5 py-2.5 text-xs text-[#181f21] focus:outline-none focus:border-[#0060a9]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#181f21] mb-1">Telephone Contact</label>
                  <input
                    type="tel"
                    value={address.phone}
                    onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                    className="w-full bg-[#F9FAFB] border border-[#c3c7c8] rounded-xl px-3.5 py-2.5 text-xs text-[#181f21] focus:outline-none focus:border-[#0060a9]"
                    required
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#0060a9] hover:bg-[#0984E3] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Continue to Delivery Tier</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: DELIVERY METHOD */}
          {step === 2 && (
            <div className="bg-white rounded-2xl border border-[#c3c7c8]/40 p-6 sm:p-8 space-y-6 shadow-xs">
              <div className="flex items-center justify-between pb-4 border-b border-[#c3c7c8]/30">
                <h2 className="font-['Hanken_Grotesk'] text-lg font-bold text-[#181f21] flex items-center gap-2">
                  <Truck className="w-5 h-5 text-[#0060a9]" />
                  <span>2. Delivery Speed & Handling</span>
                </h2>
                <span className="text-xs text-[#0060a9] font-semibold">Step 2 of 3</span>
              </div>

              <div className="space-y-4">
                <div
                  onClick={() => setShippingOption('express')}
                  className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                    shippingOption === 'express'
                      ? 'border-[#0060a9] bg-[#eaf5fa]'
                      : 'border-[#c3c7c8]/50 hover:bg-[#F9FAFB]'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-['Hanken_Grotesk'] text-sm font-bold text-[#181f21]">
                        White-Glove Express Courier (DHL Priority)
                      </span>
                      <span className="text-[10px] uppercase font-bold bg-[#00b894] text-white px-2 py-0.5 rounded">
                        Complimentary
                      </span>
                    </div>
                    <p className="text-xs text-[#747879]">
                      Insured door-to-door delivery within 1–2 business days. Requires adult signature.
                    </p>
                  </div>
                  <div className="text-right font-['Hanken_Grotesk'] font-bold text-sm text-[#00b894]">FREE</div>
                </div>

                <div
                  onClick={() => setShippingOption('standard')}
                  className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                    shippingOption === 'standard'
                      ? 'border-[#0060a9] bg-[#eaf5fa]'
                      : 'border-[#c3c7c8]/50 hover:bg-[#F9FAFB]'
                  }`}
                >
                  <div className="space-y-1">
                    <span className="font-['Hanken_Grotesk'] text-sm font-bold text-[#181f21]">
                      Standard Insured Ground Transport
                    </span>
                    <p className="text-xs text-[#747879]">
                      Secure ground shipping within 3–5 business days.
                    </p>
                  </div>
                  <div className="text-right font-['Hanken_Grotesk'] font-bold text-sm text-[#181f21]">$15.00</div>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-[#c3c7c8]/30">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2.5 text-xs font-semibold text-[#747879] hover:text-[#181f21] flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Address</span>
                </button>

                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-6 py-3 bg-[#0060a9] hover:bg-[#0984E3] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Continue to Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: PAYMENT & CONFIRMATION */}
          {step === 3 && (
            <div className="bg-white rounded-2xl border border-[#c3c7c8]/40 p-6 sm:p-8 space-y-6 shadow-xs">
              <div className="flex items-center justify-between pb-4 border-b border-[#c3c7c8]/30">
                <h2 className="font-['Hanken_Grotesk'] text-lg font-bold text-[#181f21] flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-[#0060a9]" />
                  <span>3. Certified Payment Settlement</span>
                </h2>
                <span className="text-xs text-[#0060a9] font-semibold">Step 3 of 3</span>
              </div>

              {/* Payment selector tabs */}
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentType('card')}
                  className={`p-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                    paymentType === 'card'
                      ? 'border-[#0060a9] bg-[#eaf5fa] text-[#0060a9]'
                      : 'border-[#c3c7c8]/60 text-[#747879] hover:bg-[#F9FAFB]'
                  }`}
                >
                  <CreditCard className="w-5 h-5" />
                  <span>Credit Card</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentType('apple')}
                  className={`p-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                    paymentType === 'apple'
                      ? 'border-[#0060a9] bg-[#eaf5fa] text-[#0060a9]'
                      : 'border-[#c3c7c8]/60 text-[#747879] hover:bg-[#F9FAFB]'
                  }`}
                >
                  <span className="font-bold text-sm"> Pay</span>
                  <span>Apple Pay</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentType('wire')}
                  className={`p-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                    paymentType === 'wire'
                      ? 'border-[#0060a9] bg-[#eaf5fa] text-[#0060a9]'
                      : 'border-[#c3c7c8]/60 text-[#747879] hover:bg-[#F9FAFB]'
                  }`}
                >
                  <Lock className="w-5 h-5" />
                  <span>Bank Wire</span>
                </button>
              </div>

              {paymentType === 'card' ? (
                <div className="space-y-4 pt-2">
                  <div>
                    <label className="block text-xs font-semibold text-[#181f21] mb-1">
                      Cardholder Full Name
                    </label>
                    <input
                      type="text"
                      value={cardHolder}
                      onChange={(e) => setCardHolder(e.target.value)}
                      className="w-full bg-[#F9FAFB] border border-[#c3c7c8] rounded-xl px-3.5 py-2 text-xs"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#181f21] mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full bg-[#F9FAFB] border border-[#c3c7c8] rounded-xl px-3.5 py-2 text-xs font-mono"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#181f21] mb-1">
                        Expiry Date (MM/YY)
                      </label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full bg-[#F9FAFB] border border-[#c3c7c8] rounded-xl px-3.5 py-2 text-xs font-mono"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#181f21] mb-1">
                        Security CVV
                      </label>
                      <input
                        type="password"
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        maxLength={4}
                        className="w-full bg-[#F9FAFB] border border-[#c3c7c8] rounded-xl px-3.5 py-2 text-xs font-mono"
                        required
                      />
                    </div>
                  </div>
                </div>
              ) : paymentType === 'apple' ? (
                <div className="p-6 bg-[#F9FAFB] rounded-xl border border-[#c3c7c8]/40 text-center space-y-2">
                  <div className="text-2xl font-bold"> Pay</div>
                  <p className="text-xs text-[#747879]">
                    Click Place Order below to authenticate seamlessly with Face ID / Touch ID.
                  </p>
                </div>
              ) : (
                <div className="p-6 bg-[#F9FAFB] rounded-xl border border-[#c3c7c8]/40 space-y-2 text-xs text-[#747879]">
                  <p className="font-semibold text-[#181f21]">Private Concierge Escrow Instructions:</p>
                  <p>
                    For orders exceeding $1,000, wire transfer invoices are routed directly through our European Swiss custody banking partner.
                  </p>
                </div>
              )}

              <div className="pt-4 flex items-center justify-between border-t border-[#c3c7c8]/30">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-4 py-2.5 text-xs font-semibold text-[#747879] hover:text-[#181f21] flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Delivery</span>
                </button>

                <button
                  type="button"
                  disabled={isProcessing}
                  onClick={handleFinalizeOrder}
                  className="px-8 py-3.5 bg-[#0060a9] hover:bg-[#0984E3] disabled:bg-gray-400 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer"
                >
                  {isProcessing ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      <span>Authorizing...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>Authorize ${grandTotal.toFixed(2)}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Sticky Order Summary (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl border border-[#c3c7c8]/50 p-6 shadow-sm space-y-4">
            <h3 className="font-['Hanken_Grotesk'] text-base font-bold text-[#181f21] pb-3 border-b border-[#c3c7c8]/30">
              Selected Artifacts ({items.reduce((s, i) => s + i.quantity, 0)})
            </h3>

            {/* Items mini list */}
            <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
              {items.map((item) => (
                <div key={item.product.id} className="flex items-center gap-3 text-xs">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-12 h-12 rounded-lg object-cover border border-[#c3c7c8]/30 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-[#181f21] truncate">{item.product.name}</h4>
                    <p className="text-[11px] text-[#747879]">
                      Qty: {item.quantity} {item.selectedColor ? `• ${item.selectedColor.name}` : ''}
                    </p>
                  </div>
                  <div className="font-bold text-[#181f21] shrink-0">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            {/* Pricing breakdown */}
            <div className="space-y-2 pt-4 border-t border-[#c3c7c8]/30 text-xs text-[#747879]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-[#181f21]">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-semibold text-[#181f21]">
                  {shippingFee === 0 ? <span className="text-[#00b894]">Complimentary</span> : `$${shippingFee.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Tax (8.25%)</span>
                <span className="font-semibold text-[#181f21]">${tax.toFixed(2)}</span>
              </div>
              <div className="pt-3 border-t border-[#c3c7c8]/30 flex justify-between items-baseline">
                <span className="font-bold text-sm text-[#181f21]">Total Due</span>
                <span className="font-['Hanken_Grotesk'] text-xl font-extrabold text-[#181f21]">
                  ${grandTotal.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-[#eaf5fa] rounded-xl border border-[#0060a9]/20 text-xs text-[#181f21] space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-[#0060a9]">
              <ShieldCheck className="w-4 h-4" />
              <span>Maamuuz Private Reserve Guarantee</span>
            </div>
            <p className="text-[11px] text-[#434749] leading-relaxed">
              Every item is dispatched with our certified seal of authenticity and 30-day door-to-door complimentary returns.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
