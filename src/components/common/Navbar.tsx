import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  ShoppingBag,
  User,
  Heart,
  Menu,
  X,
  ChevronDown,
  LogOut,
  Package,
  MapPin,
  Settings,
  Shield,
  Clock,
  ArrowRight
} from 'lucide-react';
import { ScreenType, UserAccount } from '../../types';

interface NavbarProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  onCategorySelect?: (category: string) => void;
  user: UserAccount;
  cartCount: number;
  cartTotal: number;
  wishlistCount: number;
  onOpenCart: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onSignOut: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentScreen,
  onNavigate,
  onCategorySelect,
  user,
  cartCount,
  cartTotal,
  wishlistCount,
  onOpenCart,
  searchQuery,
  onSearchChange,
  onSignOut,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isSearchOpenMobile, setIsSearchOpenMobile] = useState(false);
  const [isAnnouncementVisible, setIsAnnouncementVisible] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onNavigate('shop');
      setIsSearchOpenMobile(false);
    }
  };

  const navLinks: { label: string; screen: ScreenType }[] = [
    { label: 'Home', screen: 'home' },
    { label: 'Shop Catalog', screen: 'shop' },
    { label: 'Categories', screen: 'categories' },
    { label: 'About', screen: 'about' },
    { label: 'Contact', screen: 'contact' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#c3c7c8]/30 shadow-[0px_4px_20px_rgba(45,52,54,0.05)] transition-all">
      {/* Top Announcement Bar */}
      {isAnnouncementVisible && (
        <div className="bg-[#181f21] text-white px-4 py-1.5 text-xs text-center font-['Inter'] flex items-center justify-between">
          <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#00b894] animate-pulse"></span>
            <span className="text-[11px] sm:text-xs tracking-wide">
              <strong>Maamuuz Maison</strong> — Complimentary global express shipping & luxury packaging on orders over $250
            </span>
          </div>
          <button
            onClick={() => setIsAnnouncementVisible(false)}
            className="text-white/60 hover:text-white text-xs p-1"
            title="Dismiss announcement"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 md:px-10 h-20 flex items-center justify-between gap-4">
        {/* Left: Mobile Menu Toggle & Brand Logo */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-[#181f21] hover:bg-[#f1fbff] rounded-lg transition-colors cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2.5 group cursor-pointer text-left"
          >
            <div className="w-8 h-8 rounded-lg bg-[#181f21] text-white flex items-center justify-center font-['Hanken_Grotesk'] font-bold text-lg shadow-sm group-hover:bg-[#0060a9] transition-colors">
              M
            </div>
            <div>
              <span className="font-['Hanken_Grotesk'] text-2xl font-bold tracking-tight text-[#181f21] group-hover:text-[#0060a9] transition-colors">
                Maamuuz
              </span>
              <span className="hidden sm:inline-block ml-2 text-[10px] uppercase tracking-widest text-[#0060a9] font-bold px-1.5 py-0.5 rounded bg-[#eaf5fa] border border-[#a2c9ff]/40">
                Maison
              </span>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-6 ml-4 text-sm font-['Inter'] font-medium text-[#434749]">
            {navLinks.map((link) => (
              <button
                key={link.screen}
                onClick={() => onNavigate(link.screen)}
                className={`transition-colors py-1 relative cursor-pointer ${
                  currentScreen === link.screen
                    ? 'text-[#0060a9] font-semibold'
                    : 'hover:text-[#181f21]'
                }`}
              >
                {link.label}
                {currentScreen === link.screen && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0060a9] rounded-full" />
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Center: Search Bar */}
        <div className="flex-1 max-w-md hidden md:block">
          <form onSubmit={handleSearchSubmit} className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#747879]">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                onSearchChange(e.target.value);
              }}
              placeholder="Search timepieces, leather goods, acoustic drivers..."
              className="w-full pl-11 pr-10 py-2.5 bg-[#F9FAFB] border border-[#c3c7c8]/80 rounded-full focus:outline-none focus:ring-2 focus:ring-[#0060a9] focus:border-[#0060a9] font-['Inter'] text-sm text-[#131d21] placeholder-[#747879] transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#747879] hover:text-[#131d21]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </form>
        </div>

        {/* Right Actions: Wishlist, Account Dropdown, Cart Bag */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Mobile Search Toggle */}
          <button
            type="button"
            onClick={() => setIsSearchOpenMobile(!isSearchOpenMobile)}
            className="md:hidden p-2 rounded-lg text-[#181f21] hover:bg-[#f1fbff] transition-colors"
            title="Search"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Wishlist Link */}
          <button
            type="button"
            onClick={() => onNavigate('wishlist')}
            className={`relative p-2.5 rounded-lg border transition-all cursor-pointer ${
              currentScreen === 'wishlist'
                ? 'bg-[#eaf5fa] border-[#0060a9] text-[#0060a9]'
                : 'border-[#c3c7c8]/60 hover:bg-[#F9FAFB] text-[#131d21]'
            }`}
            title="View Saved Wishlist"
          >
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 min-w-5 h-5 bg-[#00b894] text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1 shadow-xs">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* User Profile / Auth State */}
          <div className="relative" ref={dropdownRef}>
            {user.isLoggedIn ? (
              <div>
                <button
                  type="button"
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className={`flex items-center gap-2 p-1.5 sm:px-3 sm:py-2 rounded-lg border transition-all cursor-pointer ${
                    currentScreen === 'account'
                      ? 'bg-[#eaf5fa] border-[#0060a9] text-[#0060a9]'
                      : 'border-[#c3c7c8]/60 hover:bg-[#F9FAFB] text-[#131d21]'
                  }`}
                >
                  <div className="w-7 h-7 rounded-full bg-[#0060a9] text-white text-xs font-bold flex items-center justify-center shrink-0">
                    {user.name ? user.name.charAt(0) : 'U'}
                  </div>
                  <div className="hidden lg:flex flex-col text-left">
                    <span className="font-['Inter'] text-xs font-semibold leading-tight text-[#181f21]">
                      {user.name}
                    </span>
                    <span className="text-[10px] text-[#0060a9] font-medium leading-none">
                      {user.memberTier} Member
                    </span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-[#747879] hidden sm:block" />
                </button>

                {/* Dropdown Menu */}
                {isUserDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-[#c3c7c8]/40 py-2 z-50 font-['Inter'] animate-in fade-in slide-in-from-top-2">
                    <div className="px-4 py-2 border-b border-[#c3c7c8]/20">
                      <p className="text-xs font-semibold text-[#181f21]">{user.name}</p>
                      <p className="text-[11px] text-[#747879] truncate">{user.email}</p>
                    </div>

                    <div className="py-1 text-xs text-[#434749]">
                      <button
                        onClick={() => {
                          onNavigate('account');
                          setIsUserDropdownOpen(false);
                        }}
                        className="w-full px-4 py-2 text-left hover:bg-[#f1fbff] hover:text-[#0060a9] flex items-center gap-2.5 transition-colors cursor-pointer"
                      >
                        <User className="w-4 h-4 text-[#747879]" />
                        <span>Account Dashboard</span>
                      </button>

                      <button
                        onClick={() => {
                          onNavigate('account');
                          setIsUserDropdownOpen(false);
                        }}
                        className="w-full px-4 py-2 text-left hover:bg-[#f1fbff] hover:text-[#0060a9] flex items-center gap-2.5 transition-colors cursor-pointer"
                      >
                        <Package className="w-4 h-4 text-[#747879]" />
                        <span>My Orders</span>
                      </button>

                      <button
                        onClick={() => {
                          onNavigate('wishlist');
                          setIsUserDropdownOpen(false);
                        }}
                        className="w-full px-4 py-2 text-left hover:bg-[#f1fbff] hover:text-[#0060a9] flex items-center gap-2.5 transition-colors cursor-pointer"
                      >
                        <Heart className="w-4 h-4 text-[#747879]" />
                        <span>Saved Wishlist</span>
                      </button>
                    </div>

                    <div className="pt-1 border-t border-[#c3c7c8]/20">
                      <button
                        onClick={() => {
                          onSignOut();
                          setIsUserDropdownOpen(false);
                        }}
                        className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 text-xs flex items-center gap-2.5 transition-colors cursor-pointer"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => onNavigate('login')}
                  className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                    currentScreen === 'login'
                      ? 'bg-[#0060a9] text-white font-semibold'
                      : 'text-[#181f21] hover:bg-[#f1fbff]'
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('register')}
                  className="hidden sm:inline-block px-3 py-2 rounded-lg text-xs font-semibold bg-[#181f21] text-white hover:bg-[#0060a9] transition-colors cursor-pointer"
                >
                  Register
                </button>
              </div>
            )}
          </div>

          {/* Cart Icon with Counter and Price Indicator */}
          <button
            type="button"
            onClick={onOpenCart}
            id="open-cart-bag-btn"
            className="relative p-2.5 rounded-lg bg-white border border-[#c3c7c8]/70 hover:border-[#0060a9] hover:bg-[#F9FAFB] text-[#181f21] transition-all cursor-pointer flex items-center gap-2"
            aria-label="Open Shopping Bag"
          >
            <ShoppingBag className="w-5 h-5 text-[#181f21]" />
            {cartCount > 0 ? (
              <>
                <span className="absolute -top-1.5 -right-1.5 min-w-5 h-5 bg-[#0060a9] text-white text-[11px] font-bold rounded-full flex items-center justify-center px-1 shadow-sm">
                  {cartCount}
                </span>
                <span className="hidden xl:inline text-xs font-semibold text-[#181f21]">
                  ${cartTotal.toFixed(0)}
                </span>
              </>
            ) : null}
          </button>
        </div>
      </div>

      {/* Mobile Search Bar Dropdown */}
      {isSearchOpenMobile && (
        <div className="md:hidden px-4 pb-3 border-t border-[#c3c7c8]/30 pt-3 bg-white">
          <form onSubmit={handleSearchSubmit} className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#747879]">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search timepieces, leather, acoustics..."
              className="w-full pl-9 pr-3 py-2 bg-[#F9FAFB] border border-[#c3c7c8] rounded-full text-xs font-['Inter']"
              autoFocus
            />
          </form>
        </div>
      )}

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-20 z-50 bg-black/40 backdrop-blur-xs flex">
          <div className="w-4/5 max-w-sm bg-white h-full shadow-2xl flex flex-col p-6 overflow-y-auto animate-in slide-in-from-left duration-200">
            {/* User header if logged in */}
            {user.isLoggedIn ? (
              <div className="pb-4 mb-4 border-b border-[#c3c7c8]/30 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#0060a9] text-white font-bold flex items-center justify-center">
                  {user.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-[#181f21]">{user.name}</h4>
                  <p className="text-xs text-[#747879]">{user.email}</p>
                </div>
              </div>
            ) : (
              <div className="pb-4 mb-4 border-b border-[#c3c7c8]/30 flex gap-2">
                <button
                  onClick={() => {
                    onNavigate('login');
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex-1 py-2 rounded-lg bg-[#0060a9] text-white text-xs font-semibold text-center"
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    onNavigate('register');
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex-1 py-2 rounded-lg border border-[#181f21] text-[#181f21] text-xs font-semibold text-center"
                >
                  Register
                </button>
              </div>
            )}

            {/* Navigation Links */}
            <div className="space-y-1">
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#747879] px-2 py-1">
                Navigation
              </p>
              {navLinks.map((link) => (
                <button
                  key={link.screen}
                  onClick={() => {
                    onNavigate(link.screen);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    currentScreen === link.screen
                      ? 'bg-[#eaf5fa] text-[#0060a9] font-semibold'
                      : 'text-[#181f21] hover:bg-[#f1fbff]'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Direct Categories shortcuts */}
            <div className="mt-6 pt-4 border-t border-[#c3c7c8]/30 space-y-1">
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#747879] px-2 py-1">
                Popular Collections
              </p>
              {['Timepieces', 'Audio & Acoustics', 'Leather Goods', 'Eyewear & Optics'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    if (onCategorySelect) onCategorySelect(cat);
                    onNavigate('shop');
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 text-xs text-[#434749] hover:text-[#0060a9] flex items-center justify-between"
                >
                  <span>{cat}</span>
                  <ArrowRight className="w-3 h-3 text-[#c3c7c8]" />
                </button>
              ))}
            </div>

            {/* Account & Support links */}
            <div className="mt-auto pt-6 border-t border-[#c3c7c8]/30 space-y-2">
              <button
                onClick={() => {
                  onNavigate('account');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 text-xs text-[#181f21] font-medium flex items-center gap-2"
              >
                <User className="w-4 h-4 text-[#747879]" />
                <span>My Account & Orders</span>
              </button>
              <button
                onClick={() => {
                  onNavigate('wishlist');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 text-xs text-[#181f21] font-medium flex items-center gap-2"
              >
                <Heart className="w-4 h-4 text-[#747879]" />
                <span>Saved Wishlist ({wishlistCount})</span>
              </button>
              <button
                onClick={() => {
                  onNavigate('cart');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 text-xs text-[#181f21] font-medium flex items-center gap-2"
              >
                <ShoppingBag className="w-4 h-4 text-[#747879]" />
                <span>Shopping Bag ({cartCount})</span>
              </button>
            </div>
          </div>
          <div className="flex-1" onClick={() => setIsMobileMenuOpen(false)}></div>
        </div>
      )}
    </header>
  );
};
