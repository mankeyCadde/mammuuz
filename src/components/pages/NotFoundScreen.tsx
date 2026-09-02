import React from 'react';
import { Compass, ArrowRight, ArrowLeft } from 'lucide-react';
import { ScreenType } from '../../types';

interface NotFoundScreenProps {
  onNavigate: (screen: ScreenType) => void;
}

export const NotFoundScreen: React.FC<NotFoundScreenProps> = ({ onNavigate }) => {
  return (
    <div className="w-full flex-grow flex items-center justify-center p-6 py-20 font-['Inter']">
      <div className="max-w-md text-center space-y-4 bg-white p-8 sm:p-10 rounded-2xl border border-[#c3c7c8]/40 shadow-xs">
        <div className="w-16 h-16 bg-[#eaf5fa] text-[#0060a9] rounded-2xl flex items-center justify-center mx-auto">
          <Compass className="w-8 h-8 animate-spin-slow" />
        </div>

        <span className="text-xs uppercase font-bold tracking-widest text-[#0060a9]">
          Error 404 • Destination Uncharted
        </span>

        <h1 className="font-['Hanken_Grotesk'] text-2xl sm:text-3xl font-extrabold text-[#181f21]">
          Artifact Record Not Located
        </h1>

        <p className="text-xs sm:text-sm text-[#747879] leading-relaxed">
          The curated artifact or archive archive you requested may have retired from circulation or been relocated within the vault.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="w-full sm:w-auto px-5 py-2.5 bg-[#181f21] hover:bg-[#0060a9] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-xs cursor-pointer"
          >
            Return to Homepage
          </button>
          <button
            type="button"
            onClick={() => onNavigate('shop')}
            className="w-full sm:w-auto px-5 py-2.5 bg-[#F9FAFB] hover:bg-gray-100 text-[#181f21] border border-[#c3c7c8] text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer"
          >
            Explore Catalog
          </button>
        </div>
      </div>
    </div>
  );
};
