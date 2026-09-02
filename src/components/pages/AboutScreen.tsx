import React from 'react';
import { ShieldCheck, Compass, Sparkles, Award, Globe, ArrowRight } from 'lucide-react';
import { ScreenType } from '../../types';
import { Breadcrumbs } from '../common/Breadcrumbs';

interface AboutScreenProps {
  onNavigate: (screen: ScreenType) => void;
}

export const AboutScreen: React.FC<AboutScreenProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-10 pb-24 font-['Inter']">
      <Breadcrumbs items={[{ label: 'Our Story & Philosophy' }]} onNavigate={onNavigate} />

      {/* Hero Presentation */}
      <div className="py-12 border-b border-[#c3c7c8]/30 max-w-3xl">
        <span className="text-xs font-bold uppercase tracking-widest text-[#0060a9]">
          The Maamuuz Ethos
        </span>
        <h1 className="font-['Hanken_Grotesk'] text-3xl sm:text-5xl font-extrabold text-[#181f21] mt-2 leading-tight">
          Where Swiss Precision Meets Architectural Purity.
        </h1>
        <p className="text-sm sm:text-base text-[#434749] mt-4 leading-relaxed">
          Founded on the principle that everyday utility objects should endure for generations, Maamuuz curates and manufactures artifacts devoid of disposable trend cycles.
        </p>
      </div>

      {/* Visual Showcase Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
        <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-gray-100 border border-[#c3c7c8]/30">
          <img
            src="https://images.unsplash.com/photo-1513094735237-8f2714d57c13?auto=format&fit=crop&q=80&w=1200"
            alt="Atelier craftsmanship"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-col justify-center space-y-6">
          <span className="text-xs font-bold uppercase tracking-wider text-[#0060a9]">
            Certified Provenance
          </span>
          <h2 className="font-['Hanken_Grotesk'] text-2xl sm:text-3xl font-extrabold text-[#181f21]">
            Uncompromising Material Sourcing
          </h2>
          <p className="text-xs sm:text-sm text-[#434749] leading-relaxed">
            Every material in our catalog is traced to its origin point. Our aerospace-grade titanium is cold-forged in small batches; our leathers are vegetable-tanned in traditional Florentine vats without harsh chromium compounds; our sapphire crystals are cut under micrometer tolerance.
          </p>
          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="p-4 bg-white rounded-xl border border-[#c3c7c8]/40">
              <span className="font-['Hanken_Grotesk'] text-2xl font-black text-[#0060a9]">100%</span>
              <p className="text-[11px] text-[#747879] mt-0.5">Recyclable packaging & carbon-neutral dispatch</p>
            </div>
            <div className="p-4 bg-white rounded-xl border border-[#c3c7c8]/40">
              <span className="font-['Hanken_Grotesk'] text-2xl font-black text-[#0060a9]">Lifetime</span>
              <p className="text-[11px] text-[#747879] mt-0.5">Atelier serviceability guarantee</p>
            </div>
          </div>
        </div>
      </div>

      {/* 3 Pillars */}
      <div className="my-16 space-y-8">
        <div className="text-center max-w-xl mx-auto">
          <h3 className="font-['Hanken_Grotesk'] text-2xl font-bold text-[#181f21]">
            Our Guiding Pillars
          </h3>
          <p className="text-xs text-[#747879] mt-1">
            Three principles govern every blueprint that leaves our design studios.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-2xl border border-[#c3c7c8]/40 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#eaf5fa] text-[#0060a9] flex items-center justify-center">
              <Compass className="w-5 h-5" />
            </div>
            <h4 className="font-['Hanken_Grotesk'] text-base font-bold text-[#181f21]">
              Architectural Minimalism
            </h4>
            <p className="text-xs text-[#434749] leading-relaxed">
              Form follows intentionality. We eliminate redundant ornamentation to amplify pure proportion, tactile texture, and mechanical harmony.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-[#c3c7c8]/40 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#eaf5fa] text-[#0060a9] flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <h4 className="font-['Hanken_Grotesk'] text-base font-bold text-[#181f21]">
              Heirloom Resilience
            </h4>
            <p className="text-xs text-[#434749] leading-relaxed">
              We engineer products intended to be inherited. We provide replacement gaskets, screws, and recalibration support throughout the artifact's lifespan.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-[#c3c7c8]/40 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#eaf5fa] text-[#0060a9] flex items-center justify-center">
              <Globe className="w-5 h-5" />
            </div>
            <h4 className="font-['Hanken_Grotesk'] text-base font-bold text-[#181f21]">
              Honest Stewardship
            </h4>
            <p className="text-xs text-[#434749] leading-relaxed">
              Fair remuneration for master artisans in Switzerland, Italy, and Japan. Zero compromise on humanitarian and ecological standards.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Box */}
      <div className="p-8 sm:p-12 bg-[#181f21] text-white rounded-3xl text-center space-y-4">
        <h3 className="font-['Hanken_Grotesk'] text-2xl sm:text-3xl font-extrabold">
          Experience the Catalog
        </h3>
        <p className="text-xs sm:text-sm text-[#9ba1a3] max-w-md mx-auto">
          Explore our limited inventory of chronographs, acoustic monitors, and fine leather goods.
        </p>
        <button
          type="button"
          onClick={() => onNavigate('shop')}
          className="px-8 py-3.5 bg-[#0060a9] hover:bg-[#0984E3] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md inline-flex items-center gap-2 cursor-pointer"
        >
          <span>Browse Active Releases</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
