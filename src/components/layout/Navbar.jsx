import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut, Settings, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-secondary border-b border-tertiary sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-accent to-success rounded-lg flex items-center justify-center">
              <span className="font-bold text-primary text-sm">TP</span>
            </div>
            <span className="text-xl font-bold text-accent hidden sm:inline">Trading Platform</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {user ? (
              <>
                <Link to="/dashboard" className="text-neutral hover:text-accent transition-colors">
                  Dashboard
                </Link>
                <Link to="/markets" className="text-neutral hover:text-accent transition-colors">
                  Markets
                </Link>
                <Link to="/portfolio" className="text-neutral hover:text-accent transition-colors">
                  Portfolio
                </Link>
              </>
            ) : null}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-tertiary transition-colors"
                >
                  <User className="w-5 h-5" />
                  <span className="text-sm hidden sm:inline text-neutral">{user.fullName}</span>
                </button>

                {profileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-secondary border border-tertiary rounded-lg shadow-xl">
                    <Link
                      to="/settings"
                      className="flex items-center gap-2 px-4 py-2 hover:bg-tertiary transition-colors text-neutral"
                      onClick={() => setProfileMenuOpen(false)}
                    >
                      <Settings className="w-4 h-4" />
                      Settings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2 hover:bg-tertiary transition-colors text-danger border-t border-tertiary"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-neutral hover:text-accent transition-colors hidden sm:block"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-accent text-primary rounded-lg hover:bg-opacity-90 transition-colors text-sm font-semibold"
                >
                  Register
                </Link>
              </>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-neutral hover:text-accent transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-tertiary">
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="block px-4 py-2 text-neutral hover:text-accent transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  to="/markets"
                  className="block px-4 py-2 text-neutral hover:text-accent transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Markets
                </Link>
                <Link
                  to="/portfolio"
                  className="block px-4 py-2 text-neutral hover:text-accent transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Portfolio
                </Link>
                <Link
                  to="/settings"
                  className="block px-4 py-2 text-neutral hover:text-accent transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Settings
                </Link>
              </>
            ) : (
              <Link
                to="/login"
                className="block px-4 py-2 text-neutral hover:text-accent transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
