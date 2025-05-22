import React from 'react';
import { Music, Twitter, Instagram, Facebook, Youtube, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black/80 border-t border-gray-800 pt-16 pb-8 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Logo and description */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center mb-4">
              <Music className="h-6 w-6 text-violet-500 mr-2" />
              <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-violet-500 to-red-500">
                SHADOW<span className="font-light">BEATS</span>
              </h2>
            </div>
            <p className="text-gray-400 mb-4">
              The ultimate music streaming platform inspired by Shadow Fight. Immerse yourself in the perfect soundtrack for your battles.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-violet-500 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-violet-500 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-violet-500 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-violet-500 transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Press</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">News</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Community</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Partners</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Developers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Apps</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">GDPR</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Licenses</a></li>
            </ul>
          </div>
        </div>
        
        {/* Newsletter */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h3 className="text-white font-semibold mb-2">Subscribe to our newsletter</h3>
              <p className="text-gray-400">Get the latest updates and exclusive offers</p>
            </div>
            <div className="flex w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 bg-gray-900 border border-gray-700 rounded-l-md focus:outline-none focus:border-violet-500 text-white w-full md:w-auto"
              />
              <button className="bg-gradient-to-r from-violet-600 to-blue-500 text-white px-4 py-2 rounded-r-md hover:from-violet-700 hover:to-blue-600 transition-all">
                <Mail size={20} />
              </button>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} ShadowBeats. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;