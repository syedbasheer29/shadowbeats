import React, { useState, useEffect } from 'react';
import { Music, Search, User, Menu, X } from 'lucide-react';
import { Link } from './ui/Link';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-black/80 backdrop-blur-md py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <Music className="h-8 w-8 text-violet-500 mr-2 filter drop-shadow-glow-violet" />
          <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-violet-500 to-red-500 tracking-wider">
            SHADOW<span className="font-light">BEATS</span>
          </h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="#" active>Home</Link>
          <Link href="#">Explore</Link>
          <Link href="#">Playlists</Link>
          <Link href="#">Login</Link>
          <button className="bg-gradient-to-r from-violet-600 to-blue-500 text-white px-5 py-2 rounded-full hover:shadow-glow-blue transition-all duration-300">
            Sign Up
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white hover:text-violet-400 transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div 
        className={`absolute top-full left-0 right-0 bg-black/90 backdrop-blur-lg transform transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
          <Link href="#" active>Home</Link>
          <Link href="#">Explore</Link>
          <Link href="#">Playlists</Link>
          <Link href="#">Login</Link>
          <button className="bg-gradient-to-r from-violet-600 to-blue-500 text-white px-5 py-2 rounded-full hover:shadow-glow-blue transition-all w-full">
            Sign Up
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;