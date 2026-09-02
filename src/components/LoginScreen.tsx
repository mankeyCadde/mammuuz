import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowRight, CheckCircle2 } from 'lucide-react';
import { ScreenType, UserAccount } from '../types';

interface LoginScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onLoginSuccess: (user: Partial<UserAccount>) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onNavigate, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    
    if (!email || !password) {
      setErrorMessage('Please fill in both your email and password.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // Derive display name from email or default to user
      const namePart = email.split('@')[0];
      const capitalized = namePart ? namePart.charAt(0).toUpperCase() + namePart.slice(1) : 'Member';
      onLoginSuccess({
        email,
        name: capitalized,
        isLoggedIn: true,
        memberTier: 'Premium',
      });
      onNavigate('marketplace');
    }, 600);
  };

  const handleSocialLogin = (provider: 'Google' | 'Facebook') => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess({
        email: provider === 'Google' ? 'duuliye807@gmail.com' : 'duuliye.fb@maamuuz.com',
        name: 'Duuliye',
        isLoggedIn: true,
        memberTier: 'VIP',
      });
      onNavigate('marketplace');
    }, 500);
  };

  const fillDemoCredentials = () => {
    setEmail('duuliye807@gmail.com');
    setPassword('Maamuuz2026!Pass');
    setErrorMessage('');
  };

  return (
    <div className="w-full flex-grow flex items-center justify-center p-4 md:p-10">
      <div 
        id="login-card"
        className="w-full max-w-md bg-white rounded-xl shadow-[0px_10px_30px_rgba(45,52,54,0.08)] p-8 md:p-10 border border-[#c3c7c8]/30 transition-all duration-300"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <button 
            type="button"
            onClick={() => onNavigate('marketplace')} 
            className="inline-block mb-2 text-[#181f21] font-['Hanken_Grotesk'] text-2xl md:text-3xl font-bold tracking-tight hover:opacity-85 transition-opacity"
            id="brand-logo-btn"
          >
            Maamuuz
          </button>
          <h1 className="font-['Hanken_Grotesk'] text-2xl font-semibold text-[#131d21] mb-1">
            Welcome Back
          </h1>
          <p className="font-['Inter'] text-[15px] text-[#434749]">
            Please sign in to your premium account.
          </p>
        </div>

        {errorMessage && (
          <div className="mb-5 p-3 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg">
            {errorMessage}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Input */}
          <div>
            <label className="block font-['Inter'] text-xs font-semibold text-[#131d21] mb-1.5" htmlFor="email">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#747879]">
                <Mail className="w-5 h-5" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full pl-10 pr-4 py-3 bg-[#F9FAFB] border border-[#c3c7c8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0060a9] focus:border-[#0060a9] transition-colors font-['Inter'] text-[15px] text-[#131d21] placeholder-[#747879]"
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="block font-['Inter'] text-xs font-semibold text-[#131d21]" htmlFor="password">
                Password
              </label>
              <button
                type="button"
                onClick={() => onNavigate('forgot_password')}
                className="font-['Inter'] text-xs font-medium text-[#0060a9] hover:text-[#004881] transition-colors"
                id="forgot-password-link"
              >
                Forgot Password?
              </button>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#747879]">
                <Lock className="w-5 h-5" />
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="w-full pl-10 pr-11 py-3 bg-[#F9FAFB] border border-[#c3c7c8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0060a9] focus:border-[#0060a9] transition-colors font-['Inter'] text-[15px] text-[#131d21] placeholder-[#747879]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#747879] hover:text-[#131d21] transition-colors"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                id="toggle-password-btn"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Remember Me */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center">
              <input
                id="remember_me"
                name="remember_me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-[#0060a9] border-[#c3c7c8] rounded focus:ring-[#0060a9] cursor-pointer accent-[#0060a9]"
              />
              <label htmlFor="remember_me" className="ml-2 block font-['Inter'] text-sm text-[#434749] cursor-pointer select-none">
                Remember me for 30 days
              </label>
            </div>
            <button
              type="button"
              onClick={fillDemoCredentials}
              className="text-xs text-[#747879] hover:text-[#0060a9] underline transition-colors"
            >
              Fill Demo
            </button>
          </div>

          {/* Sign In Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              id="sign-in-submit-btn"
              className="w-full bg-[#0060a9] hover:bg-[#004881] text-white font-['Inter'] text-sm font-semibold py-3.5 px-4 rounded-lg shadow-sm hover:shadow-[0px_10px_30px_rgba(45,52,54,0.12)] transition-all duration-300 ease-in-out flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>

        {/* Divider */}
        <div className="mt-8 mb-5 relative">
          <div aria-hidden="true" className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#c3c7c8]/50" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="px-3 bg-white font-['Inter'] text-[#434749]">
              Or sign in with
            </span>
          </div>
        </div>

        {/* Social Login */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <button
            type="button"
            onClick={() => handleSocialLogin('Google')}
            id="google-signin-btn"
            className="flex items-center justify-center px-4 py-2.5 border border-[#c3c7c8] rounded-lg hover:bg-[#e4f0f4]/50 transition-colors font-['Inter'] text-sm font-semibold text-[#131d21] gap-2.5 cursor-pointer bg-white"
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
            onClick={() => handleSocialLogin('Facebook')}
            id="facebook-signin-btn"
            className="flex items-center justify-center px-4 py-2.5 border border-[#c3c7c8] rounded-lg hover:bg-[#e4f0f4]/50 transition-colors font-['Inter'] text-sm font-semibold text-[#131d21] gap-2.5 cursor-pointer bg-white"
          >
            <svg className="h-4.5 w-4.5 text-[#1877F2] shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            <span>Facebook</span>
          </button>
        </div>

        {/* Registration Link */}
        <p className="text-center font-['Inter'] text-sm text-[#434749]">
          Don't have an account?{' '}
          <button
            type="button"
            onClick={() => onNavigate('register')}
            className="text-[#0060a9] font-['Inter'] font-semibold hover:text-[#004881] transition-colors cursor-pointer"
            id="register-link-btn"
          >
            Register here
          </button>
        </p>
      </div>
    </div>
  );
};
