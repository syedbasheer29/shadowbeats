import React from 'react';
import { Sparkles, Headphones, Zap } from 'lucide-react';

const CallToAction: React.FC = () => {
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-violet-950/20 to-black -z-10" />
      
      {/* Animated particles */}
      <div className="absolute inset-0 particles-container -z-5" />
      
      <div className="container mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
          Ready to Experience the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-violet-500 to-red-500">Future of Music</span>?
        </h2>
        
        <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-10">
          Join thousands of warriors who have already stepped into the shadows. 
          Unlimited music, personalized playlists, and immersive audio experiences await.
        </p>
        
        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-gray-800 hover:border-violet-500/30 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-full bg-violet-500/20 flex items-center justify-center mx-auto mb-4 group-hover:shadow-glow-violet transition-all duration-300">
              <Sparkles size={24} className="text-violet-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Immersive Audio</h3>
            <p className="text-gray-400">Experience spatial audio that puts you right in the center of the action.</p>
          </div>
          
          <div className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-gray-800 hover:border-blue-500/30 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-4 group-hover:shadow-glow-blue transition-all duration-300">
              <Headphones size={24} className="text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Combat Playlists</h3>
            <p className="text-gray-400">Custom curated playlists that match your fighting style and energy.</p>
          </div>
          
          <div className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-gray-800 hover:border-red-500/30 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-4 group-hover:shadow-glow-red transition-all duration-300">
              <Zap size={24} className="text-red-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Energy Sync</h3>
            <p className="text-gray-400">Music that adapts to your energy levels and fighting intensity.</p>
          </div>
        </div>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-3 bg-gradient-to-r from-violet-600 to-blue-500 rounded-full text-white font-medium hover:shadow-glow-blue transition-all duration-300">
            Get Started Free
          </button>
          <button className="px-8 py-3 bg-transparent border border-gray-600 hover:border-violet-500 rounded-full text-white font-medium transition-all duration-300 hover:shadow-glow-violet">
            View Membership Plans
          </button>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;