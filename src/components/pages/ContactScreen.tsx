import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, MessageSquare } from 'lucide-react';
import { ScreenType } from '../../types';
import { Breadcrumbs } from '../common/Breadcrumbs';

interface ContactScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onAddToast: (title: string, desc?: string, type?: 'success' | 'info' | 'error') => void;
}

export const ContactScreen: React.FC<ContactScreenProps> = ({ onNavigate, onAddToast }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Order & Dispatch Inquiry');
  const [orderId, setOrderId] = useState('');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      onAddToast('Incomplete Form', 'Please complete all required fields.', 'error');
      return;
    }
    setIsSent(true);
    onAddToast('Message Dispatched', 'Our private concierge will respond within 4 business hours.');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-10 pb-24 font-['Inter']">
      <Breadcrumbs items={[{ label: 'Client Concierge & Inquiries' }]} onNavigate={onNavigate} />

      <div className="py-8 border-b border-[#c3c7c8]/30 mb-10">
        <span className="text-xs font-bold uppercase tracking-widest text-[#0060a9]">
          Client Advisory
        </span>
        <h1 className="font-['Hanken_Grotesk'] text-3xl sm:text-4xl font-extrabold text-[#181f21] mt-1">
          Connect with the Concierge
        </h1>
        <p className="text-xs sm:text-sm text-[#747879] mt-2 max-w-xl">
          Whether inquiring about a bespoke timepiece commission, tracking an international dispatch, or requesting atelier care, our dedicated team is at your disposal.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Contact Form (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-[#c3c7c8]/40 p-6 sm:p-8 shadow-xs">
          {isSent ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-14 h-14 bg-[#00b894]/10 text-[#00b894] rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="font-['Hanken_Grotesk'] text-xl font-bold text-[#181f21]">
                Inquiry Logged into Concierge Queue
              </h3>
              <p className="text-xs text-[#747879] max-w-md mx-auto leading-relaxed">
                Thank you, {name}. A dedicated patron advisor has received your request and will communicate via <strong>{email}</strong> shortly.
              </p>
              <button
                type="button"
                onClick={() => {
                  setIsSent(false);
                  setMessage('');
                }}
                className="px-5 py-2.5 bg-[#181f21] hover:bg-[#0060a9] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
              >
                Submit Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="font-['Hanken_Grotesk'] text-lg font-bold text-[#181f21] mb-2">
                Send a Written Transmission
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#181f21] mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Adrian Sterling"
                    className="w-full bg-[#F9FAFB] border border-[#c3c7c8] rounded-xl px-3.5 py-2.5 text-xs text-[#181f21] focus:outline-none focus:border-[#0060a9]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#181f21] mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@domain.com"
                    className="w-full bg-[#F9FAFB] border border-[#c3c7c8] rounded-xl px-3.5 py-2.5 text-xs text-[#181f21] focus:outline-none focus:border-[#0060a9]"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#181f21] mb-1">
                    Inquiry Classification
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-[#F9FAFB] border border-[#c3c7c8] rounded-xl px-3.5 py-2.5 text-xs text-[#181f21] focus:outline-none focus:border-[#0060a9]"
                  >
                    <option value="Order & Dispatch Inquiry">Order & Dispatch Inquiry</option>
                    <option value="Bespoke Commission">Bespoke Commission</option>
                    <option value="Warranty & Refurbishment">Warranty & Refurbishment</option>
                    <option value="Private Collector Advisory">Private Collector Advisory</option>
                    <option value="Press & Archival Media">Press & Archival Media</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#181f21] mb-1">
                    Order Number (Optional)
                  </label>
                  <input
                    type="text"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    placeholder="e.g. MMZ-98421"
                    className="w-full bg-[#F9FAFB] border border-[#c3c7c8] rounded-xl px-3.5 py-2.5 text-xs text-[#181f21] focus:outline-none focus:border-[#0060a9]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#181f21] mb-1">
                  Message Details *
                </label>
                <textarea
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your inquiry with as much detail as necessary..."
                  className="w-full bg-[#F9FAFB] border border-[#c3c7c8] rounded-xl px-3.5 py-2.5 text-xs text-[#181f21] focus:outline-none focus:border-[#0060a9]"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3 bg-[#0060a9] hover:bg-[#0984E3] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Transmit Inquiry</span>
              </button>
            </form>
          )}
        </div>

        {/* Global Ateliers & Phone (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl border border-[#c3c7c8]/40 p-6 shadow-xs space-y-4">
            <h3 className="font-['Hanken_Grotesk'] text-base font-bold text-[#181f21] flex items-center gap-2 pb-2 border-b border-[#c3c7c8]/30">
              <Phone className="w-4 h-4 text-[#0060a9]" />
              <span>Direct Telephony</span>
            </h3>
            <div className="space-y-3 text-xs">
              <div>
                <span className="text-[#747879] block">Europe & Global Concierge:</span>
                <strong className="text-[#181f21] text-sm">+41 44 210 98 00</strong>
                <p className="text-[11px] text-[#747879]">Mon–Fri 08:00–18:00 CET</p>
              </div>
              <div>
                <span className="text-[#747879] block">North America Advisory:</span>
                <strong className="text-[#181f21] text-sm">+1 (800) 555-MAAMUUZ</strong>
                <p className="text-[11px] text-[#747879]">Mon–Fri 09:00–17:00 EST</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-[#c3c7c8]/40 p-6 shadow-xs space-y-4">
            <h3 className="font-['Hanken_Grotesk'] text-base font-bold text-[#181f21] flex items-center gap-2 pb-2 border-b border-[#c3c7c8]/30">
              <MapPin className="w-4 h-4 text-[#0060a9]" />
              <span>Atelier Addresses</span>
            </h3>
            <div className="space-y-3 text-xs text-[#434749]">
              <div>
                <strong className="text-[#181f21] block">Zurich Atelier & Archive:</strong>
                <p className="text-[#747879]">Bahnhofstrasse 42, 8001 Zürich, Switzerland</p>
              </div>
              <div>
                <strong className="text-[#181f21] block">Florence Leather Vault:</strong>
                <p className="text-[#747879]">Via de' Tornabuoni 18, 50123 Firenze, Italy</p>
              </div>
              <div>
                <strong className="text-[#181f21] block">San Francisco Design Lab:</strong>
                <p className="text-[#747879]">500 Jackson Street, San Francisco, CA 94133</p>
              </div>
            </div>
          </div>

          <div className="p-5 bg-[#eaf5fa] rounded-2xl border border-[#0060a9]/20 text-xs text-[#181f21] flex items-center gap-3">
            <Clock className="w-5 h-5 text-[#0060a9] shrink-0" />
            <p className="text-[11px] leading-relaxed">
              Standard client response commitment: All electronic transmissions answered in under four operating hours.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
