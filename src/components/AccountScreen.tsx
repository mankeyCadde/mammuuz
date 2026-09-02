import React, { useState } from 'react';
import {
  User,
  Package,
  Shield,
  Heart,
  LogOut,
  ArrowRight,
  CheckCircle2,
  Clock,
  MapPin,
  CreditCard,
  Bell,
  Settings,
  Plus,
  Trash2,
  ExternalLink,
  ChevronRight,
  ShieldAlert,
  Edit2
} from 'lucide-react';
import { UserAccount, ScreenType, Order, Address, PaymentCard, AccountTab } from '../types';
import { Breadcrumbs } from './common/Breadcrumbs';

interface AccountScreenProps {
  user: UserAccount;
  orders: Order[];
  onNavigate: (screen: ScreenType) => void;
  onSignOut: () => void;
  onUpdateProfile: (updated: Partial<UserAccount>) => void;
  onAddToast: (title: string, desc?: string, type?: 'success' | 'info' | 'error') => void;
  initialTab?: AccountTab;
  selectedOrder?: Order | null;
  onSelectOrder?: (order: Order | null) => void;
}

export const AccountScreen: React.FC<AccountScreenProps> = ({
  user,
  orders,
  onNavigate,
  onSignOut,
  onUpdateProfile,
  onAddToast,
  initialTab = 'dashboard',
  selectedOrder: propSelectedOrder,
  onSelectOrder,
}) => {
  const [activeTab, setActiveTab] = useState<AccountTab>(initialTab);
  const [viewingOrder, setViewingOrder] = useState<Order | null>(propSelectedOrder || null);

  // Profile Edit State
  const [editName, setEditName] = useState(user.name);
  const [editEmail, setEditEmail] = useState(user.email);
  const [editPhone, setEditPhone] = useState(user.phone);

  // Address Modal / Form state
  const [addresses, setAddresses] = useState<Address[]>(user.addresses);
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [newAddrTitle, setNewAddrTitle] = useState('');
  const [newAddrLine1, setNewAddrLine1] = useState('');
  const [newAddrCity, setNewAddrCity] = useState('');
  const [newAddrState, setNewAddrState] = useState('');
  const [newAddrZip, setNewAddrZip] = useState('');

  // Payment Cards state
  const [paymentCards, setPaymentCards] = useState<PaymentCard[]>(user.paymentMethods);
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [newCardNumber, setNewCardNumber] = useState('');
  const [newCardHolder, setNewCardHolder] = useState('');
  const [newCardExp, setNewCardExp] = useState('');

  // Notifications state
  const [notifications, setNotifications] = useState(user.notifications);

  // Status filter for Orders tab
  const [orderStatusFilter, setOrderStatusFilter] = useState<'All' | 'Processing' | 'Shipped' | 'Delivered'>('All');

  const filteredOrders = orders.filter((o) => {
    if (orderStatusFilter === 'All') return true;
    return o.status === orderStatusFilter;
  });

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({
      name: editName,
      email: editEmail,
      phone: editPhone,
    });
    onAddToast('Profile Saved', 'Your personal account credentials were updated.');
  };

  const handleCreateAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddrLine1 || !newAddrCity) return;
    const newAddr: Address = {
      id: `addr-${Date.now()}`,
      title: newAddrTitle || 'Vault Address',
      fullName: editName,
      addressLine1: newAddrLine1,
      city: newAddrCity,
      state: newAddrState || 'CA',
      postalCode: newAddrZip || '94107',
      country: 'United States',
      phone: editPhone,
      isDefaultShipping: false,
      isDefaultBilling: false,
    };
    const updated = [...addresses, newAddr];
    setAddresses(updated);
    onUpdateProfile({ addresses: updated });
    setIsAddingAddress(false);
    setNewAddrTitle('');
    setNewAddrLine1('');
    setNewAddrCity('');
    onAddToast('Address Stored', 'New delivery address added to your profile.');
  };

  const handleDeleteAddress = (id: string) => {
    const updated = addresses.filter((a) => a.id !== id);
    setAddresses(updated);
    onUpdateProfile({ addresses: updated });
    onAddToast('Address Removed', 'Delivery address was deleted.', 'info');
  };

  const handleAddCard = (e: React.FormEvent) => {
    e.preventDefault();
    const last4 = newCardNumber.slice(-4) || '1234';
    const newCard: PaymentCard = {
      id: `pm-${Date.now()}`,
      cardType: 'visa',
      last4,
      expMonth: newCardExp.split('/')[0] || '12',
      expYear: newCardExp.split('/')[1] || '28',
      holderName: (newCardHolder || editName).toUpperCase(),
      isDefault: false,
    };
    const updated = [...paymentCards, newCard];
    setPaymentCards(updated);
    onUpdateProfile({ paymentMethods: updated });
    setIsAddingCard(false);
    setNewCardNumber('');
    setNewCardHolder('');
    setNewCardExp('');
    onAddToast('Payment Method Stored', `Card ending in ${last4} authorized.`);
  };

  const handleDeleteCard = (id: string) => {
    const updated = paymentCards.filter((c) => c.id !== id);
    setPaymentCards(updated);
    onUpdateProfile({ paymentMethods: updated });
    onAddToast('Card Removed', 'Card removed from wallet.', 'info');
  };

  const handleMarkAllNotificationsRead = () => {
    const updated = notifications.map((n) => ({ ...n, unread: false }));
    setNotifications(updated);
    onUpdateProfile({ notifications: updated });
    onAddToast('Notifications Read', 'All notifications marked as reviewed.');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-10 pb-24 font-['Inter']">
      <Breadcrumbs
        items={[
          { label: 'My Account', onClick: () => { setActiveTab('dashboard'); setViewingOrder(null); } },
          ...(viewingOrder ? [{ label: `Order ${viewingOrder.id}` }] : [{ label: activeTab.toUpperCase() }]),
        ]}
        onNavigate={onNavigate}
      />

      {/* Account Hero Card */}
      <div className="bg-[#181f21] text-white rounded-2xl p-6 sm:p-8 md:p-10 shadow-lg my-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#0060a9] to-[#00b894] flex items-center justify-center text-white text-2xl font-bold font-['Hanken_Grotesk'] shadow-md shrink-0">
            {user.name ? user.name.charAt(0) : 'M'}
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="font-['Hanken_Grotesk'] text-2xl sm:text-3xl font-bold text-white">
                {user.name || 'Patron'}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#00b894] text-white">
                {user.memberTier} Circle
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#9ba1a3]">
              {user.email} • Patron since {user.joinedDate}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 self-end md:self-auto">
          <button
            type="button"
            onClick={() => onNavigate('shop')}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/20 transition-all cursor-pointer"
          >
            Catalog
          </button>
          <button
            type="button"
            onClick={onSignOut}
            className="px-4 py-2 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-300 text-xs font-semibold border border-red-500/30 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Layout: Sub-navigation Sidebar + Content Pane */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Navigation Tabs (3 Cols) */}
        <aside className="lg:col-span-3 space-y-2">
          <div className="bg-white rounded-2xl border border-[#c3c7c8]/40 p-2 shadow-xs space-y-1">
            {[
              { id: 'dashboard', label: 'Dashboard Overview', icon: User },
              { id: 'orders', label: `My Orders (${orders.length})`, icon: Package },
              { id: 'profile', label: 'Profile Information', icon: Edit2 },
              { id: 'addresses', label: `Saved Addresses (${addresses.length})`, icon: MapPin },
              { id: 'payment_methods', label: 'Payment Methods', icon: CreditCard },
              {
                id: 'notifications',
                label: `Notifications ${notifications.filter((n) => n.unread).length ? `(${notifications.filter((n) => n.unread).length})` : ''}`,
                icon: Bell,
              },
              { id: 'settings', label: 'Security & Preferences', icon: Settings },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id && !viewingOrder;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    setActiveTab(tab.id as AccountTab);
                    setViewingOrder(null);
                  }}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer text-left ${
                    isActive
                      ? 'bg-[#0060a9] text-white shadow-xs'
                      : 'text-[#434749] hover:bg-[#f1fbff] hover:text-[#181f21]'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="truncate">{tab.label}</span>
                </button>
              );
            })}
          </div>

          <div className="p-4 bg-[#eaf5fa] rounded-2xl border border-[#0060a9]/20 text-xs space-y-2">
            <span className="font-bold text-[#0060a9] flex items-center gap-1.5">
              <Shield className="w-4 h-4" />
              <span>Concierge Hotline</span>
            </span>
            <p className="text-[11px] text-[#434749] leading-relaxed">
              Direct telephone line reserved exclusively for {user.memberTier} members: +1 (800) 555-MMZ-CARE
            </p>
          </div>
        </aside>

        {/* Right Content View (9 Cols) */}
        <div className="lg:col-span-9">
          {/* 1. ORDER DETAIL VIEW (If clicked) */}
          {viewingOrder ? (
            <div className="bg-white rounded-2xl border border-[#c3c7c8]/40 p-6 sm:p-8 shadow-xs space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#c3c7c8]/30">
                <div>
                  <button
                    onClick={() => setViewingOrder(null)}
                    className="text-xs text-[#0060a9] hover:underline font-semibold flex items-center gap-1 mb-1 cursor-pointer"
                  >
                    ← Return to Orders List
                  </button>
                  <h2 className="font-['Hanken_Grotesk'] text-xl font-bold text-[#181f21]">
                    Order #{viewingOrder.id}
                  </h2>
                  <p className="text-xs text-[#747879]">Authorized on {viewingOrder.date}</p>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    viewingOrder.status === 'Delivered'
                      ? 'bg-[#00b894]/15 text-[#00b894]'
                      : 'bg-[#0060a9]/15 text-[#0060a9]'
                  }`}
                >
                  {viewingOrder.status}
                </span>
              </div>

              {/* Courier tracking box */}
              <div className="p-4 bg-[#F9FAFB] rounded-xl border border-[#c3c7c8]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div>
                  <span className="text-[#747879]">Courier Consignment:</span>
                  <div className="font-mono font-bold text-[#181f21]">{viewingOrder.trackingNumber}</div>
                  <div className="text-[11px] text-[#00b894] mt-0.5">{viewingOrder.deliveryMethod}</div>
                </div>
                <button
                  type="button"
                  onClick={() => onAddToast('Tracking Dispatch', `Tracking package ${viewingOrder.trackingNumber}`)}
                  className="px-3.5 py-1.5 bg-[#181f21] text-white text-xs font-semibold rounded-lg hover:bg-[#0060a9] transition-colors self-start sm:self-auto cursor-pointer"
                >
                  Live Courier Tracking
                </button>
              </div>

              {/* Items List */}
              <div className="divide-y divide-[#c3c7c8]/30 border border-[#c3c7c8]/30 rounded-xl overflow-hidden">
                {viewingOrder.items.map((item) => (
                  <div key={item.product.id} className="p-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-14 h-14 rounded-lg object-cover border border-[#c3c7c8]/30"
                      />
                      <div>
                        <h4 className="font-['Hanken_Grotesk'] text-sm font-bold text-[#181f21]">
                          {item.product.name}
                        </h4>
                        <p className="text-xs text-[#747879]">
                          Quantity: {item.quantity} {item.selectedColor ? `• ${item.selectedColor.name}` : ''}
                        </p>
                      </div>
                    </div>
                    <div className="font-['Hanken_Grotesk'] text-sm font-bold text-[#181f21]">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Pricing breakdown */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-[#c3c7c8]/30 text-xs">
                <div>
                  <h4 className="font-bold text-[#181f21] mb-1">Shipping Destination</h4>
                  <p className="text-[#434749]">{viewingOrder.shippingAddress.fullName}</p>
                  <p className="text-[#747879]">{viewingOrder.shippingAddress.addressLine1}</p>
                  <p className="text-[#747879]">
                    {viewingOrder.shippingAddress.city}, {viewingOrder.shippingAddress.state} {viewingOrder.shippingAddress.postalCode}
                  </p>
                </div>
                <div className="space-y-1.5 text-right sm:text-right">
                  <div className="flex justify-between">
                    <span className="text-[#747879]">Subtotal:</span>
                    <span className="font-semibold">${viewingOrder.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#747879]">Shipping Fee:</span>
                    <span className="font-semibold">${viewingOrder.shippingFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#747879]">Taxes:</span>
                    <span className="font-semibold">${viewingOrder.tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-sm text-[#181f21] pt-1 border-t border-[#c3c7c8]/30">
                    <span>Total:</span>
                    <span>${viewingOrder.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          {/* 2. DASHBOARD TAB */}
          {!viewingOrder && activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Stat Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white rounded-2xl border border-[#c3c7c8]/40 p-5 shadow-xs">
                  <span className="text-xs text-[#747879] font-medium">Total Orders</span>
                  <div className="font-['Hanken_Grotesk'] text-2xl font-bold text-[#181f21] mt-1">
                    {orders.length}
                  </div>
                  <span className="text-[11px] text-[#00b894] font-medium mt-1 block">Active member</span>
                </div>

                <div className="bg-white rounded-2xl border border-[#c3c7c8]/40 p-5 shadow-xs">
                  <span className="text-xs text-[#747879] font-medium">Saved Addresses</span>
                  <div className="font-['Hanken_Grotesk'] text-2xl font-bold text-[#181f21] mt-1">
                    {addresses.length}
                  </div>
                  <span className="text-[11px] text-[#0060a9] font-medium mt-1 block">Verified vaults</span>
                </div>

                <div className="bg-white rounded-2xl border border-[#c3c7c8]/40 p-5 shadow-xs">
                  <span className="text-xs text-[#747879] font-medium">VIP Tier Status</span>
                  <div className="font-['Hanken_Grotesk'] text-2xl font-bold text-[#0060a9] mt-1">
                    {user.memberTier}
                  </div>
                  <span className="text-[11px] text-[#747879] mt-1 block">Lifetime complimentary shipping</span>
                </div>
              </div>

              {/* Recent Orders Overview */}
              <div className="bg-white rounded-2xl border border-[#c3c7c8]/40 p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#c3c7c8]/30">
                  <h3 className="font-['Hanken_Grotesk'] text-base font-bold text-[#181f21] flex items-center gap-2">
                    <Package className="w-5 h-5 text-[#0060a9]" />
                    <span>Recent Acquisitions</span>
                  </h3>
                  <button
                    type="button"
                    onClick={() => setActiveTab('orders')}
                    className="text-xs text-[#0060a9] hover:underline font-semibold cursor-pointer"
                  >
                    View All Orders →
                  </button>
                </div>

                {orders.length === 0 ? (
                  <p className="text-xs text-[#747879] py-4">No past orders registered yet.</p>
                ) : (
                  <div className="space-y-3">
                    {orders.slice(0, 2).map((order) => (
                      <div
                        key={order.id}
                        onClick={() => setViewingOrder(order)}
                        className="p-4 rounded-xl border border-[#c3c7c8]/30 bg-[#F9FAFB] hover:border-[#0060a9] transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-[#181f21]">Order #{order.id}</span>
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#00b894]/15 text-[#00b894]">
                              {order.status}
                            </span>
                          </div>
                          <p className="text-[#747879] mt-1">
                            {order.items.length} item(s) • Total ${order.total.toFixed(2)} • {order.date}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 text-[#0060a9] font-semibold">
                          <span>Inspect</span>
                          <ChevronRight className="w-4 h-4" />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 3. ORDERS TAB */}
          {!viewingOrder && activeTab === 'orders' && (
            <div className="bg-white rounded-2xl border border-[#c3c7c8]/40 p-6 shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#c3c7c8]/30">
                <div>
                  <h2 className="font-['Hanken_Grotesk'] text-xl font-bold text-[#181f21]">
                    My Acquisition History
                  </h2>
                  <p className="text-xs text-[#747879] mt-0.5">
                    Track dispatches, review past acquisitions, and print tax receipts.
                  </p>
                </div>

                <div className="flex items-center gap-1.5 bg-[#F9FAFB] p-1 rounded-xl border border-[#c3c7c8]/50 text-xs">
                  {['All', 'Processing', 'Shipped', 'Delivered'].map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setOrderStatusFilter(st as any)}
                      className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                        orderStatusFilter === st
                          ? 'bg-[#0060a9] text-white font-bold'
                          : 'text-[#434749] hover:text-[#181f21]'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {filteredOrders.length === 0 ? (
                <div className="py-12 text-center text-xs text-[#747879] space-y-2">
                  <Package className="w-8 h-8 mx-auto text-[#c3c7c8]" />
                  <p>No orders found matching filter "{orderStatusFilter}".</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredOrders.map((order) => (
                    <div
                      key={order.id}
                      className="p-5 rounded-xl border border-[#c3c7c8]/40 bg-white hover:border-[#0060a9] hover:shadow-xs transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-['Hanken_Grotesk'] font-bold text-sm text-[#181f21]">
                            Order #{order.id}
                          </span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#00b894]/15 text-[#00b894]">
                            {order.status}
                          </span>
                        </div>
                        <p className="text-xs text-[#747879]">
                          Dispatched on {order.date} • {order.items.length} unique artifact(s)
                        </p>
                        <div className="flex items-center gap-2 pt-2">
                          {order.items.slice(0, 3).map((it) => (
                            <img
                              key={it.product.id}
                              src={it.product.image}
                              alt={it.product.name}
                              className="w-10 h-10 rounded-lg object-cover border border-[#c3c7c8]/30"
                              title={it.product.name}
                            />
                          ))}
                        </div>
                      </div>

                      <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 pt-2 sm:pt-0">
                        <div className="font-['Hanken_Grotesk'] text-base font-extrabold text-[#181f21]">
                          ${order.total.toFixed(2)}
                        </div>
                        <button
                          type="button"
                          onClick={() => setViewingOrder(order)}
                          className="px-4 py-2 bg-[#181f21] hover:bg-[#0060a9] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 4. PROFILE TAB */}
          {!viewingOrder && activeTab === 'profile' && (
            <div className="bg-white rounded-2xl border border-[#c3c7c8]/40 p-6 sm:p-8 shadow-xs space-y-6">
              <div className="pb-4 border-b border-[#c3c7c8]/30">
                <h2 className="font-['Hanken_Grotesk'] text-xl font-bold text-[#181f21]">
                  Personal Profile Information
                </h2>
                <p className="text-xs text-[#747879] mt-0.5">
                  Manage your verified patron identity and contact records.
                </p>
              </div>

              <form onSubmit={handleSaveProfile} className="space-y-4 max-w-lg">
                <div>
                  <label className="block text-xs font-semibold text-[#181f21] mb-1">Legal Full Name</label>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full bg-[#F9FAFB] border border-[#c3c7c8] rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#0060a9]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#181f21] mb-1">Email Address</label>
                  <input
                    type="email"
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                    className="w-full bg-[#F9FAFB] border border-[#c3c7c8] rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#0060a9]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#181f21] mb-1">Telephone Contact</label>
                  <input
                    type="tel"
                    value={editPhone}
                    onChange={(e) => setEditPhone(e.target.value)}
                    className="w-full bg-[#F9FAFB] border border-[#c3c7c8] rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#0060a9]"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#0060a9] hover:bg-[#0984E3] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
                >
                  Save Profile Changes
                </button>
              </form>
            </div>
          )}

          {/* 5. SAVED ADDRESSES TAB */}
          {!viewingOrder && activeTab === 'addresses' && (
            <div className="bg-white rounded-2xl border border-[#c3c7c8]/40 p-6 sm:p-8 shadow-xs space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#c3c7c8]/30">
                <div>
                  <h2 className="font-['Hanken_Grotesk'] text-xl font-bold text-[#181f21]">
                    Registered Delivery Vaults
                  </h2>
                  <p className="text-xs text-[#747879] mt-0.5">
                    Addresses stored with biometric security for one-touch express dispatch.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAddingAddress(!isAddingAddress)}
                  className="px-3.5 py-2 bg-[#181f21] hover:bg-[#0060a9] text-white text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Address</span>
                </button>
              </div>

              {isAddingAddress && (
                <form onSubmit={handleCreateAddress} className="p-4 bg-[#F9FAFB] rounded-xl border border-[#c3c7c8]/40 space-y-3">
                  <h4 className="font-['Hanken_Grotesk'] text-xs font-bold uppercase tracking-wider text-[#181f21]">
                    New Delivery Address
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Address Title (e.g. Summer Atelier)"
                      value={newAddrTitle}
                      onChange={(e) => setNewAddrTitle(e.target.value)}
                      className="bg-white border border-[#c3c7c8] rounded-lg px-3 py-2 text-xs"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Street Address"
                      value={newAddrLine1}
                      onChange={(e) => setNewAddrLine1(e.target.value)}
                      className="bg-white border border-[#c3c7c8] rounded-lg px-3 py-2 text-xs"
                      required
                    />
                    <input
                      type="text"
                      placeholder="City"
                      value={newAddrCity}
                      onChange={(e) => setNewAddrCity(e.target.value)}
                      className="bg-white border border-[#c3c7c8] rounded-lg px-3 py-2 text-xs"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Postal Code"
                      value={newAddrZip}
                      onChange={(e) => setNewAddrZip(e.target.value)}
                      className="bg-white border border-[#c3c7c8] rounded-lg px-3 py-2 text-xs"
                    />
                  </div>
                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsAddingAddress(false)}
                      className="px-3 py-1.5 text-xs text-[#747879]"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 bg-[#0060a9] text-white rounded-lg text-xs font-bold"
                    >
                      Save Address
                    </button>
                  </div>
                </form>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {addresses.map((addr) => (
                  <div
                    key={addr.id}
                    className="p-5 rounded-xl border border-[#c3c7c8]/40 bg-white space-y-2 relative"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-['Hanken_Grotesk'] text-sm font-bold text-[#181f21]">
                        {addr.title}
                      </span>
                      {addr.isDefaultShipping && (
                        <span className="text-[10px] bg-[#0060a9]/10 text-[#0060a9] font-bold px-2 py-0.5 rounded">
                          Default Shipping
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#434749]">{addr.fullName}</p>
                    <p className="text-xs text-[#747879]">{addr.addressLine1}</p>
                    <p className="text-xs text-[#747879]">
                      {addr.city}, {addr.state} {addr.postalCode}, {addr.country}
                    </p>

                    <div className="pt-3 border-t border-[#c3c7c8]/30 flex justify-end">
                      <button
                        type="button"
                        onClick={() => handleDeleteAddress(addr.id)}
                        className="text-xs text-red-600 hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 6. PAYMENT METHODS TAB */}
          {!viewingOrder && activeTab === 'payment_methods' && (
            <div className="bg-white rounded-2xl border border-[#c3c7c8]/40 p-6 sm:p-8 shadow-xs space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#c3c7c8]/30">
                <div>
                  <h2 className="font-['Hanken_Grotesk'] text-xl font-bold text-[#181f21]">
                    Payment Methods & Cards
                  </h2>
                  <p className="text-xs text-[#747879] mt-0.5">
                    PCI-DSS compliant encrypted tokens.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAddingCard(!isAddingCard)}
                  className="px-3.5 py-2 bg-[#181f21] hover:bg-[#0060a9] text-white text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add New Card</span>
                </button>
              </div>

              {isAddingCard && (
                <form onSubmit={handleAddCard} className="p-4 bg-[#F9FAFB] rounded-xl border border-[#c3c7c8]/40 space-y-3">
                  <h4 className="font-['Hanken_Grotesk'] text-xs font-bold uppercase tracking-wider text-[#181f21]">
                    Register Payment Card
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Cardholder Name"
                      value={newCardHolder}
                      onChange={(e) => setNewCardHolder(e.target.value)}
                      className="bg-white border border-[#c3c7c8] rounded-lg px-3 py-2 text-xs"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Card Number (16 Digits)"
                      value={newCardNumber}
                      onChange={(e) => setNewCardNumber(e.target.value)}
                      className="bg-white border border-[#c3c7c8] rounded-lg px-3 py-2 text-xs font-mono"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Expiry (MM/YY)"
                      value={newCardExp}
                      onChange={(e) => setNewCardExp(e.target.value)}
                      className="bg-white border border-[#c3c7c8] rounded-lg px-3 py-2 text-xs"
                      required
                    />
                  </div>
                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsAddingCard(false)}
                      className="px-3 py-1.5 text-xs text-[#747879]"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 bg-[#0060a9] text-white rounded-lg text-xs font-bold"
                    >
                      Authorize Card
                    </button>
                  </div>
                </form>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {paymentCards.map((card) => (
                  <div
                    key={card.id}
                    className="p-5 rounded-2xl bg-gradient-to-tr from-[#181f21] to-[#2b3538] text-white shadow-md space-y-4 relative"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs uppercase font-bold tracking-wider text-[#00b894]">
                        {card.cardType.toUpperCase()}
                      </span>
                      {card.isDefault && (
                        <span className="text-[10px] bg-white/20 text-white font-bold px-2 py-0.5 rounded">
                          Default
                        </span>
                      )}
                    </div>
                    <div className="font-mono text-base tracking-widest pt-2">
                      •••• •••• •••• {card.last4}
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-[#c1c8ca]">
                      <span>{card.holderName}</span>
                      <span>Expires {card.expMonth}/{card.expYear}</span>
                    </div>

                    <div className="pt-2 border-t border-white/10 flex justify-end">
                      <button
                        type="button"
                        onClick={() => handleDeleteCard(card.id)}
                        className="text-[11px] text-red-400 hover:text-red-300 flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 7. NOTIFICATIONS TAB */}
          {!viewingOrder && activeTab === 'notifications' && (
            <div className="bg-white rounded-2xl border border-[#c3c7c8]/40 p-6 sm:p-8 shadow-xs space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#c3c7c8]/30">
                <div>
                  <h2 className="font-['Hanken_Grotesk'] text-xl font-bold text-[#181f21]">
                    Collector Alerts & Notifications
                  </h2>
                  <p className="text-xs text-[#747879] mt-0.5">
                    Order dispatches, private capsule previews, and security telemetry.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleMarkAllNotificationsRead}
                  className="text-xs text-[#0060a9] hover:underline font-semibold cursor-pointer"
                >
                  Mark all as read
                </button>
              </div>

              <div className="space-y-3">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`p-4 rounded-xl border transition-all flex items-start gap-3.5 ${
                      n.unread ? 'bg-[#eaf5fa] border-[#0060a9]/30' : 'bg-[#F9FAFB] border-[#c3c7c8]/30'
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                        n.type === 'order'
                          ? 'bg-[#00b894]/15 text-[#00b894]'
                          : n.type === 'promo'
                          ? 'bg-amber-500/15 text-amber-600'
                          : 'bg-[#0060a9]/15 text-[#0060a9]'
                      }`}
                    >
                      <Bell className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-['Hanken_Grotesk'] text-xs font-bold text-[#181f21]">
                          {n.title}
                        </h4>
                        <span className="text-[10px] text-[#747879]">{n.date}</span>
                      </div>
                      <p className="text-xs text-[#434749] leading-relaxed">{n.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 8. SETTINGS & PREFERENCES TAB */}
          {!viewingOrder && activeTab === 'settings' && (
            <div className="bg-white rounded-2xl border border-[#c3c7c8]/40 p-6 sm:p-8 shadow-xs space-y-6">
              <div className="pb-4 border-b border-[#c3c7c8]/30">
                <h2 className="font-['Hanken_Grotesk'] text-xl font-bold text-[#181f21]">
                  Security & Collector Preferences
                </h2>
                <p className="text-xs text-[#747879] mt-0.5">
                  Two-factor authentication, communication preferences, and security logs.
                </p>
              </div>

              <div className="space-y-6 max-w-lg">
                {/* 2FA */}
                <div className="flex items-center justify-between p-4 bg-[#F9FAFB] rounded-xl border border-[#c3c7c8]/30">
                  <div className="space-y-0.5">
                    <h4 className="font-semibold text-xs text-[#181f21]">Two-Factor Authentication (2FA)</h4>
                    <p className="text-[11px] text-[#747879]">Require hardware key or SMS token at sign in.</p>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-[#00b894]/15 text-[#00b894] font-bold text-[10px]">
                    ENABLED
                  </span>
                </div>

                {/* Email gazette */}
                <div className="flex items-center justify-between p-4 bg-[#F9FAFB] rounded-xl border border-[#c3c7c8]/30">
                  <div className="space-y-0.5">
                    <h4 className="font-semibold text-xs text-[#181f21]">Maamuuz Private Gazette</h4>
                    <p className="text-[11px] text-[#747879]">Receive early invitations to limited editions.</p>
                  </div>
                  <input
                    type="checkbox"
                    defaultChecked
                    className="rounded text-[#0060a9]"
                    onChange={() => onAddToast('Preferences Updated', 'Gazette settings saved.')}
                  />
                </div>

                {/* Password reset link */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => onNavigate('reset_password')}
                    className="text-xs text-[#0060a9] font-bold hover:underline cursor-pointer"
                  >
                    Change Account Password →
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
