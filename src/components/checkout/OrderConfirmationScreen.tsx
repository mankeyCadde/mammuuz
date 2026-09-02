import React from 'react';
import {
  CheckCircle2,
  Package,
  Truck,
  MapPin,
  Calendar,
  ArrowRight,
  Download,
  Clock,
  Printer
} from 'lucide-react';
import { Order, ScreenType } from '../../types';

interface OrderConfirmationScreenProps {
  order: Order;
  onNavigate: (screen: ScreenType) => void;
  onViewOrderDetails: (order: Order) => void;
}

export const OrderConfirmationScreen: React.FC<OrderConfirmationScreenProps> = ({
  order,
  onNavigate,
  onViewOrderDetails,
}) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-10 py-12 pb-24 font-['Inter']">
      {/* Top Banner with Confirmation */}
      <div className="text-center space-y-3 pb-8 border-b border-[#c3c7c8]/30">
        <div className="w-16 h-16 bg-[#00b894]/10 text-[#00b894] rounded-full flex items-center justify-center mx-auto shadow-xs">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <span className="text-xs uppercase font-bold tracking-widest text-[#0060a9]">
          Transaction Authorized & Verified
        </span>

        <h1 className="font-['Hanken_Grotesk'] text-3xl sm:text-4xl font-extrabold text-[#181f21]">
          Thank you for your acquisition.
        </h1>

        <p className="text-xs sm:text-sm text-[#747879] max-w-md mx-auto leading-relaxed">
          Order <strong className="text-[#181f21]">{order.id}</strong> has been received by our European master atelier and scheduled for white-glove inspection.
        </p>

        <div className="pt-2 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={handlePrint}
            className="px-3.5 py-1.5 rounded-lg border border-[#c3c7c8] text-xs font-semibold text-[#181f21] hover:bg-[#F9FAFB] flex items-center gap-1.5 cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Receipt</span>
          </button>
        </div>
      </div>

      {/* Shipment Tracker Card */}
      <div className="my-8 p-6 bg-white rounded-2xl border border-[#c3c7c8]/40 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#c3c7c8]/30 text-xs">
          <div>
            <span className="text-[#747879]">Estimated Delivery:</span>
            <div className="font-['Hanken_Grotesk'] text-base font-bold text-[#181f21] flex items-center gap-2 mt-0.5">
              <Calendar className="w-4 h-4 text-[#0060a9]" />
              <span>{order.estimatedDelivery}</span>
            </div>
          </div>

          <div>
            <span className="text-[#747879]">Tracking Waybill:</span>
            <div className="font-mono text-xs font-bold text-[#0060a9] mt-0.5">
              {order.trackingNumber}
            </div>
          </div>
        </div>

        {/* Progress steps */}
        <div className="pt-2">
          <div className="grid grid-cols-4 gap-2 text-center text-[11px]">
            <div className="space-y-1">
              <div className="w-6 h-6 rounded-full bg-[#00b894] text-white flex items-center justify-center mx-auto text-[10px] font-bold">
                ✓
              </div>
              <span className="font-bold text-[#181f21] block">Placed</span>
            </div>
            <div className="space-y-1">
              <div className="w-6 h-6 rounded-full bg-[#0060a9] text-white flex items-center justify-center mx-auto text-[10px] font-bold animate-pulse">
                •
              </div>
              <span className="font-bold text-[#0060a9] block">Quality Inspection</span>
            </div>
            <div className="space-y-1 opacity-50">
              <div className="w-6 h-6 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center mx-auto text-[10px]">
                3
              </div>
              <span className="text-[#747879] block">In Transit</span>
            </div>
            <div className="space-y-1 opacity-50">
              <div className="w-6 h-6 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center mx-auto text-[10px]">
                4
              </div>
              <span className="text-[#747879] block">Delivered</span>
            </div>
          </div>
        </div>
      </div>

      {/* Order Details & Summary Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
        {/* Destination & Payment */}
        <div className="p-6 bg-white rounded-2xl border border-[#c3c7c8]/40 space-y-4">
          <h3 className="font-['Hanken_Grotesk'] text-sm font-bold uppercase tracking-wider text-[#181f21] pb-2 border-b border-[#c3c7c8]/30">
            Delivery Destination
          </h3>
          <div className="text-xs text-[#434749] space-y-1">
            <p className="font-bold text-[#181f21]">{order.shippingAddress.fullName}</p>
            <p>{order.shippingAddress.addressLine1}</p>
            {order.shippingAddress.addressLine2 && <p>{order.shippingAddress.addressLine2}</p>}
            <p>
              {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}
            </p>
            <p>{order.shippingAddress.country}</p>
            <p className="pt-1 text-[#747879]">Tel: {order.shippingAddress.phone}</p>
          </div>

          <div className="pt-3 border-t border-[#c3c7c8]/30">
            <h4 className="font-['Hanken_Grotesk'] text-xs font-bold text-[#181f21] mb-1">
              Method of Payment
            </h4>
            <p className="text-xs text-[#747879]">{order.paymentMethod}</p>
          </div>
        </div>

        {/* Financial Recap */}
        <div className="p-6 bg-white rounded-2xl border border-[#c3c7c8]/40 space-y-3 text-xs text-[#747879]">
          <h3 className="font-['Hanken_Grotesk'] text-sm font-bold uppercase tracking-wider text-[#181f21] pb-2 border-b border-[#c3c7c8]/30">
            Financial Ledger
          </h3>
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span className="font-semibold text-[#181f21]">${order.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>White-Glove Express</span>
            <span className="font-semibold text-[#181f21]">
              {order.shippingFee === 0 ? <span className="text-[#00b894]">Complimentary</span> : `$${order.shippingFee.toFixed(2)}`}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Estimated Sales Tax</span>
            <span className="font-semibold text-[#181f21]">${order.tax.toFixed(2)}</span>
          </div>
          <div className="pt-3 border-t border-[#c3c7c8]/30 flex justify-between items-baseline">
            <span className="font-bold text-sm text-[#181f21]">Total Paid</span>
            <span className="font-['Hanken_Grotesk'] text-xl font-extrabold text-[#181f21]">
              ${order.total.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Items Breakdown */}
      <div className="bg-white rounded-2xl border border-[#c3c7c8]/40 overflow-hidden shadow-xs mb-10">
        <div className="p-4 bg-[#F9FAFB] border-b border-[#c3c7c8]/30 font-['Hanken_Grotesk'] text-xs font-bold uppercase tracking-wider text-[#181f21]">
          Acquired Objects
        </div>
        <div className="divide-y divide-[#c3c7c8]/30">
          {order.items.map((item) => (
            <div key={item.product.id} className="p-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-14 h-14 rounded-lg object-cover border border-[#c3c7c8]/30"
                />
                <div>
                  <h4 className="font-['Hanken_Grotesk'] text-xs sm:text-sm font-bold text-[#181f21]">
                    {item.product.name}
                  </h4>
                  <p className="text-[11px] text-[#747879]">
                    Quantity: {item.quantity} {item.selectedColor ? `• Finish: ${item.selectedColor.name}` : ''}
                  </p>
                </div>
              </div>

              <div className="font-['Hanken_Grotesk'] text-sm font-bold text-[#181f21]">
                ${(item.product.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => onViewOrderDetails(order)}
          className="w-full sm:w-auto px-6 py-3 bg-[#0060a9] hover:bg-[#0984E3] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-sm cursor-pointer"
        >
          Inspect Order Details in Account
        </button>

        <button
          type="button"
          onClick={() => onNavigate('shop')}
          className="w-full sm:w-auto px-6 py-3 bg-[#181f21] hover:bg-[#434749] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Continue Exploring Catalog</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
