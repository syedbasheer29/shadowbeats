import React, { useState } from 'react';
import { Plus, Heart, Share2, MoreVertical, X, Search, Music } from 'lucide-react';

interface Playlist {
  id: string;
  name: string;
  description: string;
  cover: string;
  songs: number;
  isPublic: boolean;
  isFavorite: boolean;
  createdAt: string;
}

const Playlists: React.FC = () => {
  const [activeTab, setActiveTab] = useState('my-playlists');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Sample data - replace with actual data from your backend
  const playlists: Playlist[] = [
    {
      id: '1',
      name: 'Cyberpunk Vibes',
      description: 'The best of synthwave and cyberpunk',
      cover: 'https://images.pexels.com/photos/1034662/pexels-photo-1034662.jpeg',
      songs: 24,
      isPublic: true,
      isFavorite: true,
      createdAt: '2024-03-15'
    },
    // Add more sample playlists...
  ];

  const tabs = [
    { id: 'my-playlists', label: 'My Playlists' },
    { id: 'shared', label: 'Shared Playlists' },
    { id: 'favorites', label: 'Favorites' }
  ];

  return (
    <div className="pt-20 px-4 min-h-screen bg-gradient-to-b from-shadow-black via-gray-900 to-shadow-black">
      {/* Cyber grid background */}
      <div className="fixed inset-0 bg-cyber-grid opacity-10 pointer-events-none" />
      
      <div className="container mx-auto relative z-10">
        {/* Header with cyberpunk styling */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-blue-500">Playlists</span>
          </h1>
          <p className="text-gray-400 text-lg">Create and manage your music collections</p>
        </div>

        {/* Search and Create */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <div className="relative w-full md:w-96">
            <input
              type="text"
              placeholder="Search playlists..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 pl-10 rounded-lg bg-gray-800/50 border border-gray-700/50 text-white placeholder-gray-400 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/50 transition-all duration-300"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="w-full md:w-auto px-6 py-2 rounded-lg bg-gradient-to-r from-violet-600 to-blue-500 text-white hover:from-violet-700 hover:to-blue-600 transition-all duration-300 flex items-center justify-center gap-2 shadow-glow-violet"
          >
            <Plus size={20} />
            Create New Playlist
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-gray-700/50">
          {tabs.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`px-4 py-2 text-lg font-medium transition-all duration-300 relative ${
                activeTab === id
                  ? 'text-violet-400'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {label}
              {activeTab === id && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-violet-500 to-blue-500" />
              )}
            </button>
          ))}
        </div>

        {/* Playlist Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {playlists.map(playlist => (
            <div
              key={playlist.id}
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
                    src={playlist.cover}
                    alt={playlist.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-white font-semibold group-hover:text-violet-400 transition-colors">
                    {playlist.name}
                  </h3>
                  <button className="p-1 rounded-full hover:bg-gray-700/50 transition-colors">
                    <MoreVertical size={18} className="text-gray-400" />
                  </button>
                </div>
                <p className="text-gray-400 text-sm mb-3">{playlist.description}</p>
                
                {/* Stats and Actions */}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 flex items-center gap-1">
                    <Music size={16} />
                    {playlist.songs} songs
                  </span>
                  <div className="flex items-center gap-2">
                    <button className="p-1 rounded-full hover:bg-gray-700/50 transition-colors">
                      <Heart
                        size={18}
                        className={`${playlist.isFavorite ? 'text-red-500 fill-red-500' : 'text-gray-400'}`}
                      />
                    </button>
                    <button className="p-1 rounded-full hover:bg-gray-700/50 transition-colors">
                      <Share2 size={18} className="text-gray-400" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create Playlist Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-800/90 rounded-xl p-6 w-full max-w-md border border-gray-700/50 relative">
            <button
              onClick={() => setShowCreateModal(false)}
              className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-700/50 transition-colors"
            >
              <X size={20} className="text-gray-400" />
            </button>
            
            <h2 className="text-2xl font-bold text-white mb-6">Create New Playlist</h2>
            
            <form className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-2">Playlist Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-lg bg-gray-700/50 border border-gray-600/50 text-white placeholder-gray-400 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/50 transition-all duration-300"
                  placeholder="Enter playlist name"
                />
              </div>
              
              <div>
                <label className="block text-gray-300 mb-2">Description</label>
                <textarea
                  className="w-full px-4 py-2 rounded-lg bg-gray-700/50 border border-gray-600/50 text-white placeholder-gray-400 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/50 transition-all duration-300"
                  placeholder="Add a description"
                  rows={3}
                />
              </div>
              
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="public"
                  className="rounded bg-gray-700/50 border-gray-600/50 text-violet-500 focus:ring-violet-500/50"
                />
                <label htmlFor="public" className="text-gray-300">Make playlist public</label>
              </div>
              
              <button
                type="submit"
                className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-violet-600 to-blue-500 text-white hover:from-violet-700 hover:to-blue-600 transition-all duration-300 shadow-glow-violet"
              >
                Create Playlist
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Playlists; 