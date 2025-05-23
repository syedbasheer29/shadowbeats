import React, { useState } from 'react';
import { User, Settings, LogOut, Moon, Sun, Music, Clock, Heart, Edit2, Save, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../config/firebase';
import { useAuth } from '../contexts/AuthContext';

interface UserStats {
  totalPlays: number;
  favoriteSongs: number;
  playlists: number;
  listeningTime: string;
}

interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  bio: string;
  theme: 'dark' | 'light' | 'cyberpunk';
  stats: UserStats;
}

const Profile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();
  const { userProfile } = useAuth();
  
  // Sample data - replace with actual data from Firebase
  const [profile, setProfile] = useState<UserProfile>({
    id: '1',
    name: 'Cyber User',
    email: 'user@example.com',
    avatar: 'https://images.pexels.com/photos/1034662/pexels-photo-1034662.jpeg',
    bio: 'Music enthusiast and cyberpunk lover',
    theme: 'cyberpunk',
    stats: {
      totalPlays: 1234,
      favoriteSongs: 56,
      playlists: 12,
      listeningTime: '42h 15m'
    }
  });

  const themes = [
    { id: 'dark', label: 'Dark', icon: Moon },
    { id: 'light', label: 'Light', icon: Sun },
    { id: 'cyberpunk', label: 'Cyberpunk', icon: Music }
  ];

  const handleThemeChange = (theme: 'dark' | 'light' | 'cyberpunk') => {
    setProfile(prev => ({ ...prev, theme }));
    // Add theme switching logic here
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
    setShowLogoutModal(false);
  };

  return (
    <div className="pt-20 px-4 min-h-screen bg-gradient-to-b from-shadow-black via-gray-900 to-shadow-black">
      {/* Cyber grid background */}
      <div className="fixed inset-0 bg-cyber-grid opacity-10 pointer-events-none" />
      
      <div className="container mx-auto relative z-10">
        {/* Header with cyberpunk styling */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-blue-500">Profile</span>
          </h1>
          <p className="text-gray-400 text-lg">Manage your account and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800/30 backdrop-blur-md rounded-xl border border-gray-700/50 p-6">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-violet-500/50">
                      <img
                        src={profile.avatar}
                        alt={profile.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-violet-500 flex items-center justify-center border-2 border-gray-800">
                      <Edit2 size={16} className="text-white" />
                    </div>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">{profile.name}</h2>
                    <p className="text-gray-400">{profile.email}</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="px-4 py-2 rounded-lg bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 transition-colors flex items-center gap-2"
                >
                  {isEditing ? (
                    <>
                      <X size={18} />
                      Cancel
                    </>
                  ) : (
                    <>
                      <Edit2 size={18} />
                      Edit Profile
                    </>
                  )}
                </button>
              </div>

              {isEditing ? (
                <form className="space-y-4">
                  <div>
                    <label className="block text-gray-300 mb-2">Bio</label>
                    <textarea
                      value={profile.bio}
                      onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                      className="w-full px-4 py-2 rounded-lg bg-gray-700/50 border border-gray-600/50 text-white placeholder-gray-400 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/50 transition-all duration-300"
                      rows={3}
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-lg bg-gradient-to-r from-violet-600 to-blue-500 text-white hover:from-violet-700 hover:to-blue-600 transition-all duration-300 flex items-center gap-2 shadow-glow-violet"
                  >
                    <Save size={18} />
                    Save Changes
                  </button>
                </form>
              ) : (
                <p className="text-gray-400">{profile.bio}</p>
              )}
            </div>
          </div>

          {/* Stats Card */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800/30 backdrop-blur-md rounded-xl border border-gray-700/50 p-6">
              <h3 className="text-xl font-bold text-white mb-6">Listening Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-gray-700/30">
                  <div className="flex items-center gap-3">
                    <Music size={20} className="text-violet-400" />
                    <span className="text-gray-300">Total Plays</span>
                  </div>
                  <span className="text-white font-semibold">{profile.stats.totalPlays}</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-gray-700/30">
                  <div className="flex items-center gap-3">
                    <Heart size={20} className="text-red-400" />
                    <span className="text-gray-300">Favorite Songs</span>
                  </div>
                  <span className="text-white font-semibold">{profile.stats.favoriteSongs}</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-gray-700/30">
                  <div className="flex items-center gap-3">
                    <Clock size={20} className="text-blue-400" />
                    <span className="text-gray-300">Listening Time</span>
                  </div>
                  <span className="text-white font-semibold">{profile.stats.listeningTime}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Theme Settings */}
          <div className="lg:col-span-3">
            <div className="bg-gray-800/30 backdrop-blur-md rounded-xl border border-gray-700/50 p-6">
              <h3 className="text-xl font-bold text-white mb-6">Theme Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {themes.map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => handleThemeChange(id as 'dark' | 'light' | 'cyberpunk')}
                    className={`p-4 rounded-lg border transition-all duration-300 flex items-center gap-3 ${
                      profile.theme === id
                        ? 'border-violet-500 bg-violet-500/20 text-violet-400'
                        : 'border-gray-700/50 bg-gray-700/30 text-gray-300 hover:bg-gray-700/50'
                    }`}
                  >
                    <Icon size={20} />
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Logout Button */}
          <div className="lg:col-span-3">
            <button
              onClick={() => setShowLogoutModal(true)}
              className="w-full px-6 py-3 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-all duration-300 flex items-center justify-center gap-2 border border-red-500/30"
            >
              <LogOut size={20} />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-800/90 rounded-xl p-6 w-full max-w-md border border-gray-700/50 relative">
            <button
              onClick={() => setShowLogoutModal(false)}
              className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-700/50 transition-colors"
            >
              <X size={20} className="text-gray-400" />
            </button>
            
            <h2 className="text-2xl font-bold text-white mb-4">Logout</h2>
            <p className="text-gray-400 mb-6">Are you sure you want to logout?</p>
            
            <div className="flex gap-4">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 px-6 py-3 rounded-lg bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 transition-all duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 px-6 py-3 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-all duration-300 border border-red-500/30"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile; 