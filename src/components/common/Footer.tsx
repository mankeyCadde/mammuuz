import React, { useState } from 'react';
import { ScreenType } from '../../types';
import { ShieldCheck, Truck, RefreshCw, Mail, ArrowRight, Award, Lock } from 'lucide-react';

interface FooterProps {
  onNavigate: (screen: ScreenType) => void;
  onCategorySelect?: (category: string) => void;
  onAddToast: (title: string, desc?: string, type?: 'success' | 'info' | 'error') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onCategorySelect, onAddToast }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      onAddToast('Invalid Email', 'Please enter a valid email address.', 'error');
      return;
    }
    setIsSubscribed(true);
    onAddToast('Subscribed to Gazette', 'You will receive private previews and curated digests.');
    setNewsletterEmail('');
  };

  return (
    <footer className="bg-[#181f21] text-white pt-16 pb-12 border-t border-[#333d40]">
      {/* Brand Value Pillars */}
      <div className="max-w-7xl mx-auto px-4 md:px-10 pb-12 border-b border-white/10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#00b894] shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-['Hanken_Grotesk'] text-sm font-bold text-white tracking-wide">
                Authenticity Guaranteed
              </h3>
              <p className="text-xs text-[#9ba1a3] mt-1 font-['Inter'] leading-relaxed">
                Direct atelier sourcing with verified certificate of provenance on every piece.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#00b894] shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-['Hanken_Grotesk'] text-sm font-bold text-white tracking-wide">
                White-Glove Express
              </h3>
              <p className="text-xs text-[#9ba1a3] mt-1 font-['Inter'] leading-relaxed">
                Complimentary insured priority courier dispatch on all orders over $250.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#00b894] shrink-0">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-['Hanken_Grotesk'] text-sm font-bold text-white tracking-wide">
                30-Day Privilege Return
              </h3>
              <p className="text-xs text-[#9ba1a3] mt-1 font-['Inter'] leading-relaxed">
                Uncompromising peace of mind with prepaid doorstep collection and full refunds.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#00b894] shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-['Hanken_Grotesk'] text-sm font-bold text-white tracking-wide">
                Bank-Grade Encryption
              </h3>
              <p className="text-xs text-[#9ba1a3] mt-1 font-['Inter'] leading-relaxed">
                256-bit SSL encrypted checkout with biometric tokenization and fraud guard.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Newsletter */}
      <div className="max-w-7xl mx-auto px-4 md:px-10 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-['Hanken_Grotesk'] text-2xl font-bold tracking-tight text-white">
                Maamuuz
              </span>
              <span className="text-[10px] uppercase tracking-widest text-[#00b894] font-bold px-1.5 py-0.5 rounded bg-white/5 border border-[#00b894]/30">
                Maison
              </span>
            </div>
            <p className="text-sm text-[#9ba1a3] font-['Inter'] leading-relaxed max-w-sm">
              Maamuuz curates timeless industrial design, horology, Tuscan leatherwork, and acoustic instruments for discerning individuals worldwide.
            </p>

            {/* Newsletter Form */}
            <div className="pt-2">
              <h4 className="font-['Hanken_Grotesk'] text-xs font-semibold uppercase tracking-wider text-white mb-2">
                Join the Private Gazette
              </h4>
              {isSubscribed ? (
                <div className="p-3 bg-[#00b894]/10 border border-[#00b894]/30 rounded-lg text-xs text-[#00b894] flex items-center gap-2 font-['Inter']">
                  <Award className="w-4 h-4" />
                  <span>Welcome to the Maamuuz Private Circle. Check your inbox shortly.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <div className="relative flex-1">
                    <Mail className="w-4 h-4 text-[#747879] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="email"
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="w-full bg-white/5 border border-white/15 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-[#747879] focus:outline-none focus:border-[#0060a9] focus:ring-1 focus:ring-[#0060a9]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#0060a9] hover:bg-[#0984E3] text-white text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Subscribe</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Shop Column */}
          <div className="space-y-3">
            <h4 className="font-['Hanken_Grotesk'] text-xs font-semibold uppercase tracking-wider text-white">
              Curated Collections
            </h4>
            <ul className="space-y-2 text-xs font-['Inter'] text-[#9ba1a3]">
              <li>
                <button
                  onClick={() => {
                    if (onCategorySelect) onCategorySelect('Timepieces');
                    onNavigate('shop');
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Timepieces & Watches
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    if (onCategorySelect) onCategorySelect('Audio & Acoustics');
                    onNavigate('shop');
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Audio & Acoustics
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    if (onCategorySelect) onCategorySelect('Leather Goods');
                    onNavigate('shop');
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Tuscan Leather Goods
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    if (onCategorySelect) onCategorySelect('Eyewear & Optics');
                    onNavigate('shop');
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Titanium Eyewear
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    if (onCategorySelect) onCategorySelect('Fine Accessories');
                    onNavigate('shop');
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Fine Daily Accessories
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('categories')}
                  className="hover:text-[#00b894] transition-colors font-medium cursor-pointer"
                >
                  Browse All Categories →
                </button>
              </li>
            </ul>
          </div>

          {/* Client Concierge & Support */}
          <div className="space-y-3">
            <h4 className="font-['Hanken_Grotesk'] text-xs font-semibold uppercase tracking-wider text-white">
              Customer Care
            </h4>
            <ul className="space-y-2 text-xs font-['Inter'] text-[#9ba1a3]">
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors cursor-pointer">
                  Private Concierge & Inquiries
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shipping_returns')} className="hover:text-white transition-colors cursor-pointer">
                  Dispatch & White-Glove Shipping
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shipping_returns')} className="hover:text-white transition-colors cursor-pointer">
                  30-Day Returns & Exchanges
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('faq')} className="hover:text-white transition-colors cursor-pointer">
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('account')} className="hover:text-white transition-colors cursor-pointer">
                  Track Existing Order
                </button>
              </li>
            </ul>
          </div>

          {/* Maison & Heritage */}
          <div className="space-y-3">
            <h4 className="font-['Hanken_Grotesk'] text-xs font-semibold uppercase tracking-wider text-white">
              The Maison
            </h4>
            <ul className="space-y-2 text-xs font-['Inter'] text-[#9ba1a3]">
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors cursor-pointer">
                  Heritage & Philosophy
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('privacy')} className="hover:text-white transition-colors cursor-pointer">
                  Privacy & Data Governance
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('terms')} className="hover:text-white transition-colors cursor-pointer">
                  Terms & Commercial Conditions
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('not_found')} className="hover:text-white transition-colors cursor-pointer">
                  404 Inspection Test
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('error_state')} className="hover:text-white transition-colors cursor-pointer">
                  System Error Handling Test
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Copyright, Payment Badges & Locale */}
      <div className="max-w-7xl mx-auto px-4 md:px-10 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#747879] font-['Inter']">
        <p>© 2026 Maamuuz Commerce Ltd. Handcrafted for refined lifestyle.</p>
        <div className="flex items-center gap-3">
          <span className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[10px] text-white/80 font-mono">
            VISA
          </span>
          <span className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[10px] text-white/80 font-mono">
            MASTERCARD
          </span>
          <span className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[10px] text-white/80 font-mono">
            AMEX
          </span>
          <span className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[10px] text-white/80 font-mono">
            APPLE PAY
          </span>
        </div>
      </div>
    </footer>
  );
};
