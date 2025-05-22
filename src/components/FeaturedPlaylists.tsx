import React from 'react';
import { Play } from 'lucide-react';

interface PlaylistCardProps {
  title: string;
  description: string;
  imageUrl: string;
  type: 'violet' | 'blue' | 'red';
}

const PlaylistCard: React.FC<PlaylistCardProps> = ({ title, description, imageUrl, type }) => {
  const gradients = {
    violet: 'from-violet-900/80 to-violet-700/20',
    blue: 'from-blue-900/80 to-blue-700/20',
    red: 'from-red-900/80 to-red-700/20'
  };
  
  const glows = {
    violet: 'group-hover:shadow-glow-violet',
    blue: 'group-hover:shadow-glow-blue',
    red: 'group-hover:shadow-glow-red'
  };
  
  return (
    <div className="relative overflow-hidden rounded-lg aspect-square group cursor-pointer transition-all duration-500">
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center transform group-hover:scale-110 transition-transform duration-700" 
        style={{ backgroundImage: `url('${imageUrl}')` }}
      />
      
      {/* Gradient overlay */}
      <div className={`absolute inset-0 bg-gradient-to-t ${gradients[type]} opacity-80`} />
      
      {/* Content */}
      <div className="absolute inset-0 p-5 flex flex-col justify-end">
        <h3 className="text-white text-xl font-bold mb-1">{title}</h3>
        <p className="text-gray-300 text-sm">{description}</p>
      </div>
      
      {/* Play button */}
      <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <Play size={18} className="text-white fill-white" />
      </div>
      
      {/* Glowing border on hover */}
      <div className={`absolute inset-0 border border-transparent group-hover:border-${type}-500/50 rounded-lg transition-all duration-500 ${glows[type]}`} />
    </div>
  );
};

const FeaturedPlaylists: React.FC = () => {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Featured Playlists</h2>
        <p className="text-gray-400 mb-10">Curated collections to match your combat style</p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          <PlaylistCard 
            title="Shadow Tactics" 
            description="Fight music for intense battles" 
            imageUrl="https://images.pexels.com/photos/2426085/pexels-photo-2426085.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            type="violet"
          />
          <PlaylistCard 
            title="Neon Streets" 
            description="Urban electronic vibes" 
            imageUrl="https://images.pexels.com/photos/1034662/pexels-photo-1034662.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            type="blue"
          />
          <PlaylistCard 
            title="Dark Meditation" 
            description="Focus your inner energy" 
            imageUrl="https://images.pexels.com/photos/1809616/pexels-photo-1809616.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            type="red"
          />
          <PlaylistCard 
            title="Combat Ready" 
            description="Prepare for your next match" 
            imageUrl="https://images.pexels.com/photos/1374295/pexels-photo-1374295.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            type="violet"
          />
          <PlaylistCard 
            title="Mystic Temple" 
            description="Ancient sounds and rituals" 
            imageUrl="https://images.pexels.com/photos/1547813/pexels-photo-1547813.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            type="blue"
          />
          <PlaylistCard 
            title="Future Warriors" 
            description="Next gen beats and synths" 
            imageUrl="https://images.pexels.com/photos/1694900/pexels-photo-1694900.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            type="red"
          />
          <PlaylistCard 
            title="Shadow Lounge" 
            description="Relaxing after combat" 
            imageUrl="https://images.pexels.com/photos/7502684/pexels-photo-7502684.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            type="blue"
          />
          <PlaylistCard 
            title="Energy Boost" 
            description="Power up your training" 
            imageUrl="https://images.pexels.com/photos/2418664/pexels-photo-2418664.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            type="violet"
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturedPlaylists;