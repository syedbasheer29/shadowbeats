import React, { useState } from 'react';
import MusicPlayer from './MusicPlayer';
import { Play, ChevronDown } from 'lucide-react';

const HeroSection: React.FC = () => {
  const [showPlayer, setShowPlayer] = useState(false);

  return (
    <section className="relative min-h-screen pt-24 pb-16 flex flex-col justify-center overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black -z-10" />
      
      {/* Smoke effect */}
      <div className="absolute inset-0 bg-smoke-texture opacity-20 -z-10" />
      
      {/* Silhouette elements */}
      <div className="absolute -right-10 bottom-0 w-80 h-96 bg-silhouette-1 bg-contain bg-no-repeat bg-right-bottom opacity-20 -z-5 animate-float-slow" />
      <div className="absolute -left-10 bottom-0 w-72 h-80 bg-silhouette-2 bg-contain bg-no-repeat bg-left-bottom opacity-20 -z-5 animate-float-slow-reverse" />
      
      {/* Main content */}
      <div className="container mx-auto px-4 pt-10 flex flex-col items-center text-center">
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
          Immerse in the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-violet-500 to-red-500">Shadows</span>
        </h2>
        
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-10">
          Experience music like never before with our immersive streaming platform inspired by the world of Shadow Fight.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 mb-16">
          <button 
            onClick={() => setShowPlayer(!showPlayer)}
            className="px-8 py-3 bg-gradient-to-r from-violet-600 to-blue-500 rounded-full text-white font-medium flex items-center justify-center hover:shadow-glow-blue transition-all duration-300 group"
          >
            <Play size={20} className="mr-2 transform group-hover:scale-110 transition-transform" />
            {showPlayer ? 'Hide Player' : 'Start Listening'}
          </button>
          <button className="px-8 py-3 bg-transparent border border-gray-600 hover:border-violet-500 rounded-full text-white font-medium transition-all duration-300 hover:shadow-glow-violet">
            Explore Playlists
          </button>
        </div>
        
        {/* Featured music player */}
        {showPlayer && (
          <div className="w-full max-w-4xl animate-fade-in">
            <MusicPlayer />
          </div>
        )}
      </div>
      
      {/* Scroll down indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce-slow">
        <span className="text-gray-400 text-sm mb-2">Scroll Down</span>
        <ChevronDown size={24} className="text-violet-500" />
      </div>
    </section>
  );
};

export default HeroSection;