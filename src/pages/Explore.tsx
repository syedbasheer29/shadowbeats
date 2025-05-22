import React, { useState } from 'react';
import { Music, Heart, Clock, TrendingUp, Filter, ChevronDown, Play } from 'lucide-react';

interface Song {
  id: string;
  title: string;
  artist: string;
  genre: string;
  mood: string;
  cover: string;
  plays: number;
  likes: number;
  releaseDate: string;
}

const Explore: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('genres');
  const [activeFilter, setActiveFilter] = useState('popular');
  const [showFilters, setShowFilters] = useState(false);

  // Sample data - replace with actual data from your backend
  const songs: Song[] = [
    {
      id: '1',
      title: 'Neon Dreams',
      artist: 'Cyber Beats',
      genre: 'Electronic',
      mood: 'Energetic',
      cover: 'https://images.pexels.com/photos/1034662/pexels-photo-1034662.jpeg',
      plays: 1500,
      likes: 320,
      releaseDate: '2024-03-15'
    },
    // Add more sample songs...
  ];

  const categories = [
    { id: 'genres', label: 'Genres', icon: Music },
    { id: 'moods', label: 'Moods', icon: Heart },
    { id: 'trending', label: 'Trending', icon: TrendingUp },
    { id: 'themed', label: 'Themed', icon: Clock }
  ];

  const filters = [
    { id: 'popular', label: 'Most Popular' },
    { id: 'newest', label: 'Newest First' },
    { id: 'liked', label: 'Most Liked' }
  ];

  const genres = ['Rock', 'Electronic', 'Hip Hop', 'Lo-fi', 'Chill', 'Ambient'];
  const moods = ['Energetic', 'Relaxed', 'Focused', 'Melancholic', 'Uplifting'];

  return (
    <div className="pt-20 px-4 min-h-screen bg-gradient-to-b from-shadow-black via-gray-900 to-shadow-black">
      {/* Cyber grid background */}
      <div className="fixed inset-0 bg-cyber-grid opacity-10 pointer-events-none" />
      
      <div className="container mx-auto relative z-10">
        {/* Header with cyberpunk styling */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-blue-500">Music</span>
          </h1>
          <p className="text-gray-400 text-lg">Discover your next favorite track</p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {categories.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveCategory(id)}
              className={`px-6 py-3 rounded-full flex items-center gap-2 transition-all duration-300 ${
                activeCategory === id
                  ? 'bg-gradient-to-r from-violet-600 to-blue-500 text-white shadow-glow-violet'
                  : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
              }`}
            >
              <Icon size={20} />
              {label}
            </button>
          ))}
        </div>

        {/* Filters */}
        <div className="mb-8 flex justify-between items-center">
          <div className="flex gap-4">
            {filters.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => setActiveFilter(id)}
                className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                  activeFilter === id
                    ? 'bg-violet-500/20 text-violet-400 border border-violet-500/30'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 transition-all duration-300"
          >
            <Filter size={20} />
            Filters
            <ChevronDown size={16} className={`transform transition-transform duration-300 ${showFilters ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Filter options */}
        {showFilters && (
          <div className="mb-8 p-6 rounded-xl bg-gray-800/30 backdrop-blur-md border border-gray-700/50 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-white font-semibold mb-4">Genres</h3>
                <div className="flex flex-wrap gap-2">
                  {genres.map(genre => (
                    <button
                      key={genre}
                      className="px-3 py-1 rounded-full bg-gray-700/50 text-gray-300 hover:bg-violet-500/20 hover:text-violet-400 transition-all duration-300"
                    >
                      {genre}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-4">Moods</h3>
                <div className="flex flex-wrap gap-2">
                  {moods.map(mood => (
                    <button
                      key={mood}
                      className="px-3 py-1 rounded-full bg-gray-700/50 text-gray-300 hover:bg-violet-500/20 hover:text-violet-400 transition-all duration-300"
                    >
                      {mood}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Song Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {songs.map(song => (
            <div
              key={song.id}
              className="group relative bg-gray-800/30 backdrop-blur-md rounded-xl overflow-hidden border border-gray-700/50 hover:border-violet-500/30 transition-all duration-500"
            >
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Cyber grid overlay */}
              <div className="absolute inset-0 bg-cyber-grid opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
              
              {/* Content */}
              <div className="relative p-4">
                <div className="aspect-square rounded-lg overflow-hidden mb-4 transform group-hover:scale-105 transition-transform duration-500">
                  <img
                    src={song.cover}
                    alt={song.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-white font-semibold mb-1 group-hover:text-violet-400 transition-colors">
                  {song.title}
                </h3>
                <p className="text-gray-400 text-sm mb-3">{song.artist}</p>
                
                {/* Stats */}
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <TrendingUp size={16} />
                    {song.plays}
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart size={16} />
                    {song.likes}
                  </span>
                </div>
              </div>

              {/* Play button overlay */}
              <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110">
                <Play size={18} className="text-white" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Explore; 