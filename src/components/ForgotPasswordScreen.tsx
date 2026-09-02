import React, { useState } from 'react';
import { Mail, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { ScreenType } from '../types';

interface ForgotPasswordScreenProps {
  onNavigate: (screen: ScreenType) => void;
}

export const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 600);
  };

  return (
    <div className="w-full flex-grow flex items-center justify-center p-4 md:p-10">
      <div 
        id="forgot-password-card"
        className="w-full max-w-md bg-white rounded-xl shadow-[0px_10px_30px_rgba(45,52,54,0.08)] p-8 md:p-10 border border-[#c3c7c8]/30 transition-all duration-300"
      >
        {/* Header */}
        <div className="text-center mb-7">
          <button 
            type="button"
            onClick={() => onNavigate('marketplace')} 
            className="inline-block mb-2 text-[#181f21] font-['Hanken_Grotesk'] text-2xl md:text-3xl font-bold tracking-tight hover:opacity-85 transition-opacity"
          >
            Maamuuz
          </button>
          <h1 className="font-['Hanken_Grotesk'] text-2xl font-semibold text-[#131d21] mb-1">
            {isSubmitted ? 'Check Your Inbox' : 'Reset Password'}
          </h1>
          <p className="font-['Inter'] text-[15px] text-[#434749]">
            {isSubmitted
              ? `We have dispatched security instructions to ${email}`
              : 'Enter your registered email and we will send you secure recovery instructions.'}
          </p>
        </div>

        {isSubmitted ? (
          <div className="space-y-6">
            <div className="p-4 bg-[#eaf5fa] border border-[#a2c9ff]/40 rounded-xl flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 text-[#0060a9] shrink-0 mt-0.5" />
              <div className="text-xs text-[#131d21] space-y-1">
                <p className="font-semibold text-sm">Recovery Email Dispatched</p>
                <p className="text-[#434749]">
                  Please verify your spam folder if the link does not arrive within two minutes. The reset link is valid for 30 minutes.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <button
                type="button"
                onClick={() => onNavigate('login')}
                className="w-full bg-[#0060a9] hover:bg-[#004881] text-white font-['Inter'] text-sm font-semibold py-3 px-4 rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Return to Sign In</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsSubmitted(false);
                  setEmail('');
                }}
                className="w-full text-center text-xs text-[#747879] hover:text-[#0060a9] font-medium py-1"
              >
                Send to a different email address
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-['Inter'] text-xs font-semibold text-[#131d21] mb-1.5" htmlFor="reset-email">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#747879]">
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  id="reset-email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your registered email"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-[#F9FAFB] border border-[#c3c7c8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0060a9] focus:border-[#0060a9] transition-colors font-['Inter'] text-[15px] text-[#131d21] placeholder-[#747879]"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#0060a9] hover:bg-[#004881] text-white font-['Inter'] text-sm font-semibold py-3.5 px-4 rounded-lg shadow-sm hover:shadow-[0px_10px_30px_rgba(45,52,54,0.12)] transition-all duration-300 ease-in-out flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Send Reset Instructions</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

            <div className="pt-3 text-center">
              <button
                type="button"
                onClick={() => onNavigate('login')}
                className="inline-flex items-center gap-1.5 text-sm text-[#434749] hover:text-[#0060a9] font-medium transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Sign In</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
