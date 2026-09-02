import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { CATEGORIES_DATA } from '../../data/products';
import { ScreenType } from '../../types';
import { Breadcrumbs } from '../common/Breadcrumbs';

interface CategoriesScreenProps {
  onSelectCategory: (cat: string) => void;
  onNavigate: (screen: ScreenType) => void;
}

export const CategoriesScreen: React.FC<CategoriesScreenProps> = ({
  onSelectCategory,
  onNavigate,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-10 pb-20">
      <Breadcrumbs
        items={[{ label: 'Categories' }]}
        onNavigate={onNavigate}
      />

      <div className="py-8 border-b border-[#c3c7c8]/30 mb-10">
        <span className="text-xs font-bold uppercase tracking-wider text-[#0060a9]">
          Taxonomy of Craft
        </span>
        <h1 className="font-['Hanken_Grotesk'] text-3xl sm:text-4xl font-extrabold text-[#181f21] mt-1">
          Explore Curated Categories
        </h1>
        <p className="text-xs sm:text-sm text-[#747879] mt-2 font-['Inter'] max-w-xl">
          Six distinct disciplines united by architectural geometry, certified material provenance, and lifetime serviceability.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {CATEGORIES_DATA.map((cat) => (
          <div
            key={cat.name}
            onClick={() => {
              onSelectCategory(cat.name);
              onNavigate('shop');
            }}
            className="group bg-white rounded-2xl border border-[#c3c7c8]/50 overflow-hidden hover:border-[#0060a9] hover:shadow-xl transition-all cursor-pointer flex flex-col"
          >
            {/* Image Banner */}
            <div className="aspect-[16/10] bg-[#f8fafc] overflow-hidden relative">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md">
                  {cat.count} Masterpieces
                </span>
                <span className="w-8 h-8 rounded-full bg-white text-[#181f21] flex items-center justify-center shadow-md group-hover:bg-[#0060a9] group-hover:text-white transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <h3 className="font-['Hanken_Grotesk'] text-xl font-bold text-[#181f21] group-hover:text-[#0060a9] transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-[#747879] font-['Inter'] mt-1.5 leading-relaxed">
                  {cat.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#c3c7c8]/30 flex items-center text-xs font-semibold text-[#0060a9] group-hover:translate-x-1 transition-transform">
                <span>Inspect Collection</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
