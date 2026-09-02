import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Search, HelpCircle, ArrowRight } from 'lucide-react';
import { ScreenType } from '../../types';
import { Breadcrumbs } from '../common/Breadcrumbs';

interface FaqScreenProps {
  onNavigate: (screen: ScreenType) => void;
}

interface FaqItem {
  q: string;
  a: string;
  category: string;
}

const FAQS_LIST: FaqItem[] = [
  {
    category: 'Orders & Shipping',
    q: 'What shipping options does Maamuuz provide?',
    a: 'Every order is dispatched via insured DHL Express or FedEx Priority courier in tamper-evident presentation packaging. Complimentary white-glove shipping is extended on all orders over $250.',
  },
  {
    category: 'Orders & Shipping',
    q: 'How can I monitor the physical location of my order?',
    a: 'Upon dispatch from our Swiss or Italian atelier, you receive an automated notification with an active tracking waybill number. You can also view live delivery progress directly inside your Maamuuz Account Dashboard under My Orders.',
  },
  {
    category: 'Orders & Shipping',
    q: 'Are duties and taxes included for international dispatches?',
    a: 'Yes. All prices displayed include preliminary customs clearances for North America, the European Union, the United Kingdom, and the UAE. No unexpected import levies are collected at your doorstep.',
  },
  {
    category: 'Authenticity & Craft',
    q: 'How is authenticity guaranteed for Maamuuz artifacts?',
    a: 'Every physical item incorporates an individual serial number etched during fabrication and is accompanied by an embossed Certificate of Authenticity signed by the master artisan who inspected the piece.',
  },
  {
    category: 'Authenticity & Craft',
    q: 'Where are Maamuuz products manufactured?',
    a: 'Our mechanical timepieces and chronographs are assembled in the Jura region of Switzerland; our full-grain leather bags and cases are handcrafted in Florence, Italy; our acoustic monitors and drivers are engineered in Kanagawa, Japan.',
  },
  {
    category: 'Returns & Exchanges',
    q: 'What is the return window policy?',
    a: 'We offer an unconditional 30-day trial period from the date of package receipt. If an artifact does not meet your expectations, we arrange a complimentary door-to-door courier collection with zero deduction from your refund.',
  },
  {
    category: 'Returns & Exchanges',
    q: 'How are refunds processed?',
    a: 'Once the returned item is inspected at our European intake facility (usually within 48 hours of arrival), the full purchase amount is restored directly to your original payment method.',
  },
  {
    category: 'Warranties & Care',
    q: 'What warranty is included with my acquisition?',
    a: 'All mechanical timepieces carry a 5-year international warranty covering movement calibration and water-resistance seals. Leather goods and titanium electronics carry a 3-year heirloom repair guarantee.',
  },
  {
    category: 'Warranties & Care',
    q: 'Can I send an item in for periodic refurbishment?',
    a: 'Yes. Our European Atelier Concierge offers full refurbishment, ultrasonic case cleansing, mechanical movement lubrication, and leather nourishment for the lifespan of your possession.',
  },
];

export const FaqScreen: React.FC<FaqScreenProps> = ({ onNavigate }) => {
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState('All');
  const [expandedIndices, setExpandedIndices] = useState<number[]>([0, 1]);

  const categories = ['All', 'Orders & Shipping', 'Authenticity & Craft', 'Returns & Exchanges', 'Warranties & Care'];

  const filteredFaqs = FAQS_LIST.filter((item) => {
    const matchesCat = selectedCat === 'All' || item.category === selectedCat;
    const matchesSearch =
      item.q.toLowerCase().includes(search.toLowerCase()) ||
      item.a.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const toggleExpand = (idx: number) => {
    if (expandedIndices.includes(idx)) {
      setExpandedIndices(expandedIndices.filter((i) => i !== idx));
    } else {
      setExpandedIndices([...expandedIndices, idx]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-10 pb-24 font-['Inter']">
      <Breadcrumbs items={[{ label: 'Frequently Asked Questions' }]} onNavigate={onNavigate} />

      <div className="py-8 border-b border-[#c3c7c8]/30 mb-8 text-center sm:text-left">
        <span className="text-xs font-bold uppercase tracking-widest text-[#0060a9]">
          Client Reference Knowledge Base
        </span>
        <h1 className="font-['Hanken_Grotesk'] text-3xl sm:text-4xl font-extrabold text-[#181f21] mt-1">
          Frequently Asked Inquiries
        </h1>
        <p className="text-xs sm:text-sm text-[#747879] mt-2 max-w-xl">
          Detailed protocols regarding orders, courier logistics, certified authenticity, and heirloom warranty services.
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#747879]">
          <Search className="w-4 h-4" />
        </div>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search questions (e.g. warranty, shipping, return window)..."
          className="w-full pl-10 pr-4 py-3 bg-white border border-[#c3c7c8] rounded-xl text-xs text-[#181f21] focus:outline-none focus:border-[#0060a9] shadow-xs"
        />
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCat(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              selectedCat === cat
                ? 'bg-[#0060a9] text-white shadow-xs'
                : 'bg-white border border-[#c3c7c8]/60 text-[#434749] hover:bg-[#f1fbff]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* FAQs List */}
      <div className="space-y-3">
        {filteredFaqs.length === 0 ? (
          <div className="p-8 text-center text-xs text-[#747879] bg-white rounded-xl border border-[#c3c7c8]/30">
            No inquiries match your search terms. Please contact our client concierge directly.
          </div>
        ) : (
          filteredFaqs.map((faq, idx) => {
            const isExpanded = expandedIndices.includes(idx);
            return (
              <div
                key={idx}
                className="bg-white rounded-xl border border-[#c3c7c8]/40 overflow-hidden shadow-xs transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggleExpand(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-[#F9FAFB] transition-colors cursor-pointer"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold text-[#0060a9]">
                      {faq.category}
                    </span>
                    <h3 className="font-['Hanken_Grotesk'] text-sm sm:text-base font-bold text-[#181f21]">
                      {faq.q}
                    </h3>
                  </div>
                  <div className="w-7 h-7 rounded-full bg-[#f1fbff] text-[#0060a9] flex items-center justify-center shrink-0">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#434749] leading-relaxed border-t border-[#c3c7c8]/20 bg-[#F9FAFB]/50">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Still Need Assistance Banner */}
      <div className="mt-12 p-8 bg-[#eaf5fa] rounded-2xl border border-[#0060a9]/30 text-center space-y-3">
        <h3 className="font-['Hanken_Grotesk'] text-lg font-bold text-[#181f21]">
          Have a bespoke or unlisted question?
        </h3>
        <p className="text-xs text-[#434749] max-w-md mx-auto">
          Our client advisory concierge is available around the clock to assist with individual inquiries.
        </p>
        <button
          type="button"
          onClick={() => onNavigate('contact')}
          className="px-6 py-2.5 bg-[#0060a9] hover:bg-[#0984E3] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-sm inline-flex items-center gap-2 cursor-pointer"
        >
          <span>Contact Concierge Desk</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
