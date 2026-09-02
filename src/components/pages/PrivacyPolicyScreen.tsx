import React from 'react';
import { ShieldCheck, Lock, Eye, FileText } from 'lucide-react';
import { ScreenType } from '../../types';
import { Breadcrumbs } from '../common/Breadcrumbs';

interface PrivacyPolicyScreenProps {
  onNavigate: (screen: ScreenType) => void;
}

export const PrivacyPolicyScreen: React.FC<PrivacyPolicyScreenProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 md:px-10 pb-24 font-['Inter']">
      <Breadcrumbs items={[{ label: 'Privacy & Data Governance' }]} onNavigate={onNavigate} />

      <div className="py-8 border-b border-[#c3c7c8]/30 mb-8">
        <span className="text-xs font-bold uppercase tracking-widest text-[#0060a9]">
          Legal & Compliance
        </span>
        <h1 className="font-['Hanken_Grotesk'] text-3xl sm:text-4xl font-extrabold text-[#181f21] mt-1">
          Client Privacy Charter
        </h1>
        <p className="text-xs sm:text-sm text-[#747879] mt-2">
          Effective Date: August 2026 • Revised for Global GDPR, CCPA, and Swiss FADP Standards
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-[#c3c7c8]/40 p-6 sm:p-10 shadow-xs space-y-8 text-xs sm:text-sm text-[#434749] leading-relaxed">
        <section className="space-y-2">
          <h2 className="font-['Hanken_Grotesk'] text-lg font-bold text-[#181f21]">
            1. Commitment to Patron Anonymity
          </h2>
          <p>
            At Maamuuz, we treat patron confidentiality with the same meticulous engineering applied to our timepieces. We never sell, monetize, or broker personal acquisition histories or contact records to advertising networks or external brokers.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-['Hanken_Grotesk'] text-lg font-bold text-[#181f21]">
            2. Information We Process
          </h2>
          <p>We process only the strictly necessary data to fulfill acquisitions and adhere to fiscal transparency laws:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Identity records (legal name, contact phone, electronic mail address)</li>
            <li>Delivery addresses (physical domicile or corporate reception destinations)</li>
            <li>Encrypted payment tokens via PCI-DSS Level 1 compliant processors (Stripe, Apple Pay)</li>
            <li>Telemetry data related to device security and fraud deterrence algorithms</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="font-['Hanken_Grotesk'] text-lg font-bold text-[#181f21]">
            3. Financial Security & Encryption
          </h2>
          <p>
            Your payment card credentials are never rendered, stored, or visible on Maamuuz production servers. All transaction handshakes occur through end-to-end 256-bit TLS encryption directly with international banking networks.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-['Hanken_Grotesk'] text-lg font-bold text-[#181f21]">
            4. Your Data Rights & Erasure
          </h2>
          <p>
            Under GDPR, Swiss FADP, and CCPA jurisdictions, you hold the unconditional right to request an export of your full account ledger or demand the permanent cryptographic purge of your customer profile. Simply transmit an inquiry to <code>privacy@maamuuz.com</code>.
          </p>
        </section>
      </div>
    </div>
  );
};
