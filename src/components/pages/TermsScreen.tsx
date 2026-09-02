import React from 'react';
import { FileText, ShieldAlert, Award } from 'lucide-react';
import { ScreenType } from '../../types';
import { Breadcrumbs } from '../common/Breadcrumbs';

interface TermsScreenProps {
  onNavigate: (screen: ScreenType) => void;
}

export const TermsScreen: React.FC<TermsScreenProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 md:px-10 pb-24 font-['Inter']">
      <Breadcrumbs items={[{ label: 'Terms & Conditions' }]} onNavigate={onNavigate} />

      <div className="py-8 border-b border-[#c3c7c8]/30 mb-8">
        <span className="text-xs font-bold uppercase tracking-widest text-[#0060a9]">
          Legal Framework
        </span>
        <h1 className="font-['Hanken_Grotesk'] text-3xl sm:text-4xl font-extrabold text-[#181f21] mt-1">
          Terms of Acquisition & Service
        </h1>
        <p className="text-xs sm:text-sm text-[#747879] mt-2">
          Effective Date: August 2026 • Governing Law: Canton of Zurich, Switzerland
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-[#c3c7c8]/40 p-6 sm:p-10 shadow-xs space-y-8 text-xs sm:text-sm text-[#434749] leading-relaxed">
        <section className="space-y-2">
          <h2 className="font-['Hanken_Grotesk'] text-lg font-bold text-[#181f21]">
            1. Preamble & Scope
          </h2>
          <p>
            These Terms govern all acquisitions made through the Maamuuz digital portal or directly through our global ateliers. By placing an order, patrons accept these terms in full without modification.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-['Hanken_Grotesk'] text-lg font-bold text-[#181f21]">
            2. Acquisition Order Acceptance & Pricing
          </h2>
          <p>
            All orders are subject to acceptance following our master inspection and fraud verification protocol. We reserve the right to limit quantities per collector or decline an order in cases of pricing errata or suspected unauthorized commercial resale.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-['Hanken_Grotesk'] text-lg font-bold text-[#181f21]">
            3. White-Glove Dispatch & Title Transfer
          </h2>
          <p>
            Risk of loss and title to ordered artifacts transfer to the patron upon physical handoff by our certified courier. All dispatches remain fully insured at our expense until proof of delivery signature is recorded.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-['Hanken_Grotesk'] text-lg font-bold text-[#181f21]">
            4. Warranty & Heirloom Care
          </h2>
          <p>
            Maamuuz warrants that every mechanical and material object delivered corresponds strictly to the specifications etched into its serial register and Certificate of Authenticity. Warranties do not cover damage resulting from accidents, unauthorized tampering, or modifications by non-certified technicians.
          </p>
        </section>
      </div>
    </div>
  );
};
