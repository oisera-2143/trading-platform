import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, BarChart3, Wallet, TrendingUp, Settings, HelpCircle, X } from 'lucide-react';

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const [expandedMenus, setExpandedMenus] = useState({});

  const isActive = (path) => location.pathname === path;

  const toggleMenu = (menu) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  const menuItems = [
    {
      label: 'Dashboard',
      path: '/dashboard',
      icon: BarChart3,
    },
    {
      label: 'Markets',
      path: '/markets',
      icon: TrendingUp,
    },
    {
      label: 'Portfolio',
      path: '/portfolio',
      icon: Wallet,
    },
    {
      label: 'Settings',
      path: '/settings',
      icon: Settings,
    },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:relative w-64 h-screen bg-secondary border-r border-tertiary flex flex-col z-40 transition-transform md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="p-6 border-b border-tertiary flex items-center justify-between">
          <h2 className="text-xl font-bold text-accent">Menu</h2>
          <button
            onClick={onClose}
            className="md:hidden text-neutral hover:text-accent transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  active
                    ? 'bg-accent bg-opacity-20 text-accent border-l-2 border-accent'
                    : 'text-neutral hover:bg-tertiary'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-tertiary space-y-2">
          <button className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-neutral hover:bg-tertiary transition-colors">
            <HelpCircle className="w-5 h-5" />
            <span className="font-medium">Help & Support</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
