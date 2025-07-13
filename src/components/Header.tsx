import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

const Header: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: '🏠 Dashboard' },
    { path: '/teams', label: '🧑‍🤝‍🧑 Team Management' },
    { path: '/rooms', label: '🛏️ Room Manager' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center space-x-3">
          <Link to="/" className="flex items-center space-x-2 transition-transform duration-200 hover:scale-105">
            <span className="text-3xl font-bold text-blue-800">🏨</span> {/* Changed icon and color */}
            <span className="text-2xl font-extrabold text-gray-800 tracking-tight">Prince De Galles, Paris</span> {/* Increased font size, weight, and tracking */}
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "text-base font-semibold transition-colors hover:text-blue-700", // Larger font, bolder, new hover color
                location.pathname === item.path
                  ? "text-blue-700 border-b-2 border-blue-700 pb-1"
                  : "text-gray-600"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile navigation - simplified for now */}
        <nav className="flex md:hidden items-center space-x-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "text-sm font-medium transition-colors hover:text-blue-700",
                location.pathname === item.path
                  ? "text-blue-700"
                  : "text-muted-foreground"
              )}
            >
              {item.label.split(' ')[0]} {/* Show only emoji on mobile */}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header; 