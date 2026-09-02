import React from 'react';
import { Search, ShoppingBag, User, Heart, LogIn, SlidersHorizontal, ShieldCheck } from 'lucide-react';
import { ScreenType, UserAccount } from '../types';

interface NavbarProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  user: UserAccount;
  cartCount: number;
  onOpenCart: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentScreen,
  onNavigate,
  user,
  cartCount,
  onOpenCart,
  searchQuery,
  onSearchChange,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#c3c7c8]/30 shadow-[0px_4px_20px_rgba(45,52,54,0.05)] transition-all">
      {/* Top Banner */}
      <div className="bg-[#181f21] text-white px-4 py-1.5 text-xs text-center font-['Inter'] flex items-center justify-center gap-2">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#00b894] animate-pulse"></span>
        <span>Maamuuz Private Reserve — Complimentary worldwide express dispatch on orders over $250</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-10 h-20 flex items-center justify-between gap-4">
        {/* Left: Brand Logo */}
        <div className="flex items-center gap-6">
          <button
            type="button"
            onClick={() => onNavigate('marketplace')}
            className="flex items-center gap-2 group text-left cursor-pointer"
          >
            <span className="font-['Hanken_Grotesk'] text-2xl md:text-3xl font-bold tracking-tight text-[#181f21] group-hover:text-[#0060a9] transition-colors">
              Maamuuz
            </span>
            <span className="text-[10px] uppercase tracking-widest text-[#0060a9] font-bold px-1.5 py-0.5 rounded bg-[#eaf5fa] border border-[#a2c9ff]/40">
              Commerce
            </span>
          </button>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-['Inter'] font-medium text-[#434749]">
            <button
              onClick={() => onNavigate('marketplace')}
              className={`hover:text-[#181f21] transition-colors ${currentScreen === 'marketplace' ? 'text-[#0060a9] font-semibold' : ''}`}
            >
              Curated Catalog
            </button>
            <button
              onClick={() => onNavigate('marketplace')}
              className="hover:text-[#181f21] transition-colors"
            >
              Timepieces
            </button>
            <button
              onClick={() => onNavigate('marketplace')}
              className="hover:text-[#181f21] transition-colors"
            >
              Audio & Acoustics
            </button>
            <button
              onClick={() => onNavigate('marketplace')}
              className="hover:text-[#181f21] transition-colors"
            >
              Leather Goods
            </button>
          </nav>
        </div>

        {/* Center: Pill-shaped Expanded Search Bar */}
        <div className="flex-1 max-w-md hidden md:block">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#747879]">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                onSearchChange(e.target.value);
                if (currentScreen !== 'marketplace') onNavigate('marketplace');
              }}
              placeholder="Search timepieces, Italian leather, acoustics..."
              className="w-full pl-11 pr-4 py-2.5 bg-[#F9FAFB] border border-[#c3c7c8]/80 rounded-full focus:outline-none focus:ring-2 focus:ring-[#0060a9] focus:border-[#0060a9] font-['Inter'] text-sm text-[#131d21] placeholder-[#747879] transition-all"
            />
          </div>
        </div>

        {/* Right: Screen Switcher & Utility Icons */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Quick Screen Switcher Pill dropdown / buttons */}
          <div className="hidden sm:flex items-center bg-[#f1fbff] p-1 rounded-lg border border-[#c3c7c8]/40 text-xs font-['Inter']">
            <button
              onClick={() => onNavigate('login')}
              className={`px-2.5 py-1 rounded-md transition-all ${
                currentScreen === 'login'
                  ? 'bg-[#0060a9] text-white font-semibold shadow-xs'
                  : 'text-[#434749] hover:text-[#181f21]'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => onNavigate('register')}
              className={`px-2.5 py-1 rounded-md transition-all ${
                currentScreen === 'register'
                  ? 'bg-[#0060a9] text-white font-semibold shadow-xs'
                  : 'text-[#434749] hover:text-[#181f21]'
              }`}
            >
              Register
            </button>
            <button
              onClick={() => onNavigate('marketplace')}
              className={`px-2.5 py-1 rounded-md transition-all ${
                currentScreen === 'marketplace'
                  ? 'bg-[#0060a9] text-white font-semibold shadow-xs'
                  : 'text-[#434749] hover:text-[#181f21]'
              }`}
            >
              Shop
            </button>
          </div>

          {/* User Account Button */}
          {user.isLoggedIn ? (
            <button
              type="button"
              onClick={() => onNavigate('account')}
              className={`flex items-center gap-2 p-2 md:px-3 md:py-2 rounded-lg border transition-all ${
                currentScreen === 'account'
                  ? 'bg-[#eaf5fa] border-[#0060a9] text-[#0060a9]'
                  : 'border-[#c3c7c8]/60 hover:bg-[#F9FAFB] text-[#131d21]'
              }`}
              title="Account profile"
            >
              <div className="w-6 h-6 rounded-full bg-[#0060a9] text-white text-xs font-bold flex items-center justify-center">
                {user.name.charAt(0)}
              </div>
              <span className="hidden md:inline font-['Inter'] text-xs font-semibold">
                {user.name}
              </span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => onNavigate('login')}
              className={`p-2.5 rounded-lg border border-[#c3c7c8]/60 hover:bg-[#F9FAFB] text-[#131d21] transition-all flex items-center gap-1.5 text-xs font-semibold ${
                currentScreen === 'login' ? 'text-[#0060a9] border-[#0060a9] bg-[#eaf5fa]' : ''
              }`}
              title="Sign in"
            >
              <User className="w-4 h-4" />
              <span className="hidden md:inline">Sign In</span>
            </button>
          )}

          {/* Cart Icon with badge */}
          <button
            type="button"
            onClick={onOpenCart}
            id="open-cart-btn"
            className="relative p-2.5 rounded-lg bg-white border border-[#c3c7c8]/70 hover:border-[#0060a9] hover:bg-[#F9FAFB] text-[#131d21] transition-all cursor-pointer"
            aria-label="Open Shopping Bag"
          >
            <ShoppingBag className="w-5 h-5 text-[#181f21]" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 min-w-5 h-5 bg-[#0060a9] text-white text-[11px] font-bold rounded-full flex items-center justify-center px-1 shadow-sm">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="md:hidden px-4 pb-3">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#747879]">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              onSearchChange(e.target.value);
              if (currentScreen !== 'marketplace') onNavigate('marketplace');
            }}
            placeholder="Search items..."
            className="w-full pl-9 pr-3 py-2 bg-[#F9FAFB] border border-[#c3c7c8] rounded-full text-xs"
          />
        </div>
      </div>
    </header>
  );
};
