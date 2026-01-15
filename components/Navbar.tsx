import React, { useState } from 'react';
import { NAV_ITEMS } from '../constants';

interface NavbarProps {
  onCategorySelect: (category: string | null) => void;
  activeCategory: string | null;
}

const Navbar: React.FC<NavbarProps> = ({ onCategorySelect, activeCategory }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (category: string | null) => {
    onCategorySelect(category);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <div 
            className="flex-shrink-0 cursor-pointer flex items-center gap-1 group" 
            onClick={() => handleNavClick(null)}
          >
             <span className="logo-font text-4xl font-extrabold text-gray-900 transform group-hover:-rotate-3 transition-transform">Nerd</span>
             <span className="logo-font text-4xl font-extrabold text-[#be80ff] transform group-hover:rotate-3 transition-transform">AI</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.category || null)}
                className={`text-sm font-bold uppercase tracking-wider transition-colors duration-200 
                  ${(item.category === activeCategory) || (!item.category && !activeCategory)
                    ? 'text-[#be80ff] border-b-2 border-[#be80ff]' 
                    : 'text-gray-600 hover:text-[#be80ff]'}`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="hidden md:flex items-center space-x-4">
             <button className="text-gray-400 hover:text-gray-600">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
               </svg>
             </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.category || null)}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[#be80ff] hover:bg-gray-50"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;