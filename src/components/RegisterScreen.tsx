import React, { useState } from 'react';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { ScreenType, UserAccount } from '../types';

interface RegisterScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onRegisterSuccess: (user: Partial<UserAccount>) => void;
}

export const RegisterScreen: React.FC<RegisterScreenProps> = ({ onNavigate, onRegisterSuccess }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!fullName || !email || !password) {
      setErrorMessage('Please complete all required fields.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    if (!agreeTerms) {
      setErrorMessage('Please accept the Terms of Service to continue.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onRegisterSuccess({
        name: fullName,
        email,
        isLoggedIn: true,
        memberTier: 'Premium',
      });
      onNavigate('marketplace');
    }, 600);
  };

  const handleSocialRegister = (provider: 'Google' | 'Facebook') => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onRegisterSuccess({
        name: 'Duuliye',
        email: provider === 'Google' ? 'duuliye807@gmail.com' : 'duuliye.fb@maamuuz.com',
        isLoggedIn: true,
        memberTier: 'Premium',
      });
      onNavigate('marketplace');
    }, 500);
  };

  return (
    <div className="w-full flex-grow flex items-center justify-center p-4 md:p-10">
      <div 
        id="register-card"
        className="w-full max-w-md bg-white rounded-xl shadow-[0px_10px_30px_rgba(45,52,54,0.08)] p-8 md:p-10 border border-[#c3c7c8]/30 transition-all duration-300"
      >
        {/* Header */}
        <div className="text-center mb-6">
          <button 
            type="button"
            onClick={() => onNavigate('marketplace')} 
            className="inline-block mb-2 text-[#181f21] font-['Hanken_Grotesk'] text-2xl md:text-3xl font-bold tracking-tight hover:opacity-85 transition-opacity"
            id="brand-logo-register-btn"
          >
            Maamuuz
          </button>
          <h1 className="font-['Hanken_Grotesk'] text-2xl font-semibold text-[#131d21] mb-1">
            Create Account
          </h1>
          <p className="font-['Inter'] text-[15px] text-[#434749]">
            Join our exclusive premium marketplace.
          </p>
        </div>

        {errorMessage && (
          <div className="mb-4 p-3 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5">
          {/* Full Name */}
          <div>
            <label className="block font-['Inter'] text-xs font-semibold text-[#131d21] mb-1" htmlFor="register-name">
              Full Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#747879]">
                <User className="w-4.5 h-4.5" />
              </div>
              <input
                id="register-name"
                name="name"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Duuliye Ahmed"
                required
                className="w-full pl-10 pr-4 py-2.5 bg-[#F9FAFB] border border-[#c3c7c8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0060a9] focus:border-[#0060a9] transition-colors font-['Inter'] text-[14px] text-[#131d21] placeholder-[#747879]"
              />
            </div>
          </div>

          {/* Email Address */}
          <div>
            <label className="block font-['Inter'] text-xs font-semibold text-[#131d21] mb-1" htmlFor="register-email">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#747879]">
                <Mail className="w-4.5 h-4.5" />
              </div>
              <input
                id="register-email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                required
                className="w-full pl-10 pr-4 py-2.5 bg-[#F9FAFB] border border-[#c3c7c8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0060a9] focus:border-[#0060a9] transition-colors font-['Inter'] text-[14px] text-[#131d21] placeholder-[#747879]"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block font-['Inter'] text-xs font-semibold text-[#131d21] mb-1" htmlFor="register-password">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#747879]">
                <Lock className="w-4.5 h-4.5" />
              </div>
              <input
                id="register-password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a strong password"
                required
                className="w-full pl-10 pr-10 py-2.5 bg-[#F9FAFB] border border-[#c3c7c8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0060a9] focus:border-[#0060a9] transition-colors font-['Inter'] text-[14px] text-[#131d21] placeholder-[#747879]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#747879] hover:text-[#131d21]"
              >
                {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block font-['Inter'] text-xs font-semibold text-[#131d21] mb-1" htmlFor="register-confirm-password">
              Confirm Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#747879]">
                <Lock className="w-4.5 h-4.5" />
              </div>
              <input
                id="register-confirm-password"
                name="confirmPassword"
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter password"
                required
                className="w-full pl-10 pr-4 py-2.5 bg-[#F9FAFB] border border-[#c3c7c8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0060a9] focus:border-[#0060a9] transition-colors font-['Inter'] text-[14px] text-[#131d21] placeholder-[#747879]"
              />
            </div>
          </div>

          {/* Terms Agreement */}
          <div className="flex items-start pt-1">
            <input
              id="agree-terms"
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="h-4 w-4 mt-0.5 text-[#0060a9] border-[#c3c7c8] rounded focus:ring-[#0060a9] cursor-pointer accent-[#0060a9]"
            />
            <label htmlFor="agree-terms" className="ml-2 block font-['Inter'] text-xs text-[#434749] leading-relaxed cursor-pointer select-none">
              I agree to the Maamuuz{' '}
              <span className="text-[#0060a9] underline">Terms of Service</span> and{' '}
              <span className="text-[#0060a9] underline">Privacy Policy</span>.
            </label>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#0060a9] hover:bg-[#004881] text-white font-['Inter'] text-sm font-semibold py-3 px-4 rounded-lg shadow-sm hover:shadow-[0px_10px_30px_rgba(45,52,54,0.12)] transition-all duration-300 ease-in-out flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>

        {/* Divider */}
        <div className="mt-6 mb-4 relative">
          <div aria-hidden="true" className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#c3c7c8]/50" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="px-3 bg-white font-['Inter'] text-[#434749]">
              Or register with
            </span>
          </div>
        </div>

        {/* Social Register */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <button
            type="button"
            onClick={() => handleSocialRegister('Google')}
            className="flex items-center justify-center px-4 py-2 border border-[#c3c7c8] rounded-lg hover:bg-[#e4f0f4]/50 transition-colors font-['Inter'] text-sm font-semibold text-[#131d21] gap-2.5 cursor-pointer bg-white"
          >
            <svg className="h-4.5 w-4.5 shrink-0" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            <span>Google</span>
          </button>

          <button
            type="button"
            onClick={() => handleSocialRegister('Facebook')}
            className="flex items-center justify-center px-4 py-2 border border-[#c3c7c8] rounded-lg hover:bg-[#e4f0f4]/50 transition-colors font-['Inter'] text-sm font-semibold text-[#131d21] gap-2.5 cursor-pointer bg-white"
          >
            <svg className="h-4.5 w-4.5 text-[#1877F2] shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            <span>Facebook</span>
          </button>
        </div>

        {/* Back to Login */}
        <p className="text-center font-['Inter'] text-sm text-[#434749]">
          Already have an account?{' '}
          <button
            type="button"
            onClick={() => onNavigate('login')}
            className="text-[#0060a9] font-['Inter'] font-semibold hover:text-[#004881] transition-colors cursor-pointer"
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
};
