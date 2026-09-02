import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { ScreenType } from '../../types';

export interface BreadcrumbItem {
  label: string;
  screen?: ScreenType;
  onClick?: () => void;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  onNavigate: (screen: ScreenType) => void;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, onNavigate }) => {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center text-xs font-['Inter'] text-[#747879] py-3">
      <button
        onClick={() => onNavigate('home')}
        className="flex items-center gap-1 hover:text-[#181f21] transition-colors cursor-pointer"
      >
        <Home className="w-3.5 h-3.5" />
        <span>Home</span>
      </button>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={index}>
            <ChevronRight className="w-3 h-3 mx-2 text-[#c3c7c8]" />
            {isLast || (!item.screen && !item.onClick) ? (
              <span className="font-semibold text-[#181f21] truncate max-w-[200px] sm:max-w-none">
                {item.label}
              </span>
            ) : (
              <button
                onClick={() => {
                  if (item.onClick) item.onClick();
                  else if (item.screen) onNavigate(item.screen);
                }}
                className="hover:text-[#0060a9] transition-colors cursor-pointer"
              >
                {item.label}
              </button>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
