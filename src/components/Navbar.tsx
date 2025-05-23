import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, Music, Home, Compass, ListMusic } from 'lucide-react';
import ThemeSwitcher from './ThemeSwitcher';
import { useAuth } from '../contexts/AuthContext';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentUser, userProfile, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-white">
            Shadow<span className="text-violet-500">Beats</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-300 hover:text-white transition-colors">
              Home
            </Link>
            <Link to="/explore" className="text-gray-300 hover:text-white transition-colors">
              Explore
            </Link>
            <Link to="/playlists" className="text-gray-300 hover:text-white transition-colors">
              Playlists
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <Link to="/profile" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
                  <div className="w-8 h-8 rounded-full bg-violet-500 flex items-center justify-center">
                    <User size={16} className="text-white" />
                  </div>
                  <span className="text-gray-300">{userProfile?.displayName || 'User'}</span>
                </Link>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 bg-violet-500 text-white rounded-full hover:bg-violet-600 transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Theme Switcher */}
          <div className="ml-4">
            <ThemeSwitcher />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-300 hover:text-white"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            <Link
              to="/"
              className="block text-gray-300 hover:text-white transition-colors"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link
              to="/explore"
              className="block text-gray-300 hover:text-white transition-colors"
              onClick={toggleMenu}
            >
              Explore
            </Link>
            <Link
              to="/playlists"
              className="block text-gray-300 hover:text-white transition-colors"
              onClick={toggleMenu}
            >
              Playlists
            </Link>
            {isAuthenticated ? (
              <Link
                to="/profile"
                className="flex items-center space-x-3 pt-4"
                onClick={toggleMenu}
              >
                <div className="w-8 h-8 rounded-full bg-violet-500 flex items-center justify-center">
                  <User size={16} className="text-white" />
                </div>
                <span className="text-gray-300">{userProfile?.displayName || 'User'}</span>
              </Link>
            ) : (
              <div className="flex flex-col space-y-2 pt-4">
                <Link
                  to="/login"
                  className="block text-gray-300 hover:text-white transition-colors"
                  onClick={toggleMenu}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="block text-gray-300 hover:text-white transition-colors"
                  onClick={toggleMenu}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 