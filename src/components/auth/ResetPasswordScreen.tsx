import React, { useState } from 'react';
import { Lock, Eye, EyeOff, CheckCircle2, ArrowRight } from 'lucide-react';
import { ScreenType } from '../../types';

interface ResetPasswordScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onAddToast: (title: string, desc?: string, type?: 'success' | 'info' | 'error') => void;
}

export const ResetPasswordScreen: React.FC<ResetPasswordScreenProps> = ({
  onNavigate,
  onAddToast,
}) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const hasLength = newPassword.length >= 8;
  const hasNumber = /\d/.test(newPassword);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);
  const matches = newPassword && newPassword === confirmPassword;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasLength || !hasNumber || !matches) {
      onAddToast('Requirement Not Met', 'Please check all password criteria.', 'error');
      return;
    }

    setIsSuccess(true);
    onAddToast('Password Updated', 'Your security credentials have been updated.');
  };

  return (
    <div className="w-full flex-grow flex items-center justify-center p-4 md:p-10">
      <div className="w-full max-w-md bg-white rounded-xl shadow-[0px_10px_30px_rgba(45,52,54,0.08)] p-8 md:p-10 border border-[#c3c7c8]/30">
        <div className="text-center mb-7">
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="inline-block mb-2 text-[#181f21] font-['Hanken_Grotesk'] text-2xl md:text-3xl font-bold tracking-tight hover:opacity-85 transition-opacity cursor-pointer"
          >
            Maamuuz
          </button>
          <h1 className="font-['Hanken_Grotesk'] text-2xl font-semibold text-[#131d21] mb-1">
            {isSuccess ? 'Password Changed' : 'Set New Password'}
          </h1>
          <p className="font-['Inter'] text-xs text-[#434749]">
            {isSuccess
              ? 'Your security key has been updated. Please sign in with your new password.'
              : 'Create a resilient password to protect your collector account.'}
          </p>
        </div>

        {isSuccess ? (
          <div className="space-y-4 text-center">
            <div className="w-12 h-12 bg-[#00b894]/10 text-[#00b894] rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <p className="text-xs text-[#747879]">
              Your account has been refreshed. All active tokens have been regenerated for security.
            </p>
            <button
              type="button"
              onClick={() => onNavigate('login')}
              className="w-full bg-[#0060a9] hover:bg-[#004881] text-white font-['Inter'] text-sm font-semibold py-3 px-4 rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Sign In with New Password</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-['Inter'] text-xs font-semibold text-[#131d21] mb-1.5">
                New Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#747879]">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="At least 8 characters"
                  className="w-full pl-10 pr-10 py-2.5 bg-[#F9FAFB] border border-[#c3c7c8] rounded-lg text-xs font-['Inter'] focus:outline-none focus:border-[#0060a9]"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#747879] hover:text-[#181f21]"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block font-['Inter'] text-xs font-semibold text-[#131d21] mb-1.5">
                Confirm New Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#747879]">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repeat new password"
                  className="w-full pl-10 pr-4 py-2.5 bg-[#F9FAFB] border border-[#c3c7c8] rounded-lg text-xs font-['Inter'] focus:outline-none focus:border-[#0060a9]"
                  required
                />
              </div>
            </div>

            {/* Checklist */}
            <div className="p-3 bg-[#F9FAFB] rounded-lg border border-[#c3c7c8]/30 space-y-1 text-[11px]">
              <div className={`flex items-center gap-1.5 ${hasLength ? 'text-[#00b894]' : 'text-[#747879]'}`}>
                <span>{hasLength ? '✓' : '○'}</span>
                <span>Minimum 8 characters</span>
              </div>
              <div className={`flex items-center gap-1.5 ${hasNumber ? 'text-[#00b894]' : 'text-[#747879]'}`}>
                <span>{hasNumber ? '✓' : '○'}</span>
                <span>Includes at least one numeric digit</span>
              </div>
              <div className={`flex items-center gap-1.5 ${matches ? 'text-[#00b894]' : 'text-[#747879]'}`}>
                <span>{matches ? '✓' : '○'}</span>
                <span>Passwords match</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#0060a9] hover:bg-[#004881] text-white font-['Inter'] text-sm font-semibold py-3 px-4 rounded-lg shadow-sm transition-colors cursor-pointer"
            >
              Update Password
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
