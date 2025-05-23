import React, { useState } from 'react';
import { usePreferences } from '../contexts/PreferencesContext';
import { Moon, Sun, Zap, Sparkles, Music, Heart, Play } from 'lucide-react';

const ThemeSwitcher: React.FC = () => {
  const { preferences, updatePreferences } = usePreferences();
  const [previewTheme, setPreviewTheme] = useState<string | null>(null);

  const themes = [
    {
      id: 'cyberpunk',
      name: 'Cyberpunk',
      icon: <Zap className="w-5 h-5" />,
      gradient: 'from-violet-600 to-blue-500',
      glow: 'shadow-glow-violet',
      bgGradient: 'from-violet-900/20 to-blue-900/20',
      borderColor: 'border-violet-500/50',
      textColor: 'text-violet-400'
    },
    {
      id: 'shadow',
      name: 'Shadow',
      icon: <Moon className="w-5 h-5" />,
      gradient: 'from-gray-800 to-gray-900',
      glow: 'shadow-glow-blue',
      bgGradient: 'from-gray-900/20 to-slate-900/20',
      borderColor: 'border-blue-500/50',
      textColor: 'text-blue-400'
    },
    {
      id: 'light',
      name: 'Light',
      icon: <Sun className="w-5 h-5" />,
      gradient: 'from-gray-200 to-gray-300',
      glow: 'shadow-glow-red',
      bgGradient: 'from-gray-100/20 to-gray-200/20',
      borderColor: 'border-red-500/50',
      textColor: 'text-red-400'
    }
  ];

  const currentTheme = themes.find(t => t.id === (previewTheme || preferences?.theme)) || themes[0];

  return (
    <div className="relative group">
      <button
        className="p-2 rounded-lg bg-gray-800/50 border border-gray-700/50 hover:border-violet-500/50 transition-all duration-300"
        aria-label="Theme Switcher"
      >
        <Sparkles className="w-5 h-5 text-violet-400" />
      </button>

      {/* Dropdown Menu with Preview */}
      <div className="absolute right-0 mt-2 w-[600px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-right">
        <div className="bg-gray-800/90 backdrop-blur-md rounded-lg border border-gray-700/50 p-4 shadow-glow-violet">
          <div className="grid grid-cols-2 gap-4">
            {/* Theme Options */}
            <div className="space-y-2">
              {themes.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => {
                    setPreviewTheme(theme.id);
                    updatePreferences({ theme: theme.id as any });
                  }}
                  onMouseEnter={() => setPreviewTheme(theme.id)}
                  onMouseLeave={() => setPreviewTheme(null)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                    preferences?.theme === theme.id
                      ? 'bg-violet-500/20 border border-violet-500/50'
                      : 'hover:bg-gray-700/50 border border-transparent hover:border-violet-500/30'
                  }`}
                >
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${theme.gradient} ${theme.glow}`}>
                    {theme.icon}
                  </div>
                  <span className="text-white">{theme.name}</span>
                  {preferences?.theme === theme.id && (
                    <div className="ml-auto w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
                  )}
                </button>
              ))}
            </div>

            {/* Theme Preview */}
            <div className={`p-4 rounded-lg bg-gradient-to-br ${currentTheme.bgGradient} border ${currentTheme.borderColor} transition-all duration-300`}>
              <div className="space-y-4">
                {/* Preview Header */}
                <div className="flex items-center justify-between">
                  <h3 className={`text-lg font-bold ${currentTheme.textColor}`}>Theme Preview</h3>
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${currentTheme.gradient} ${currentTheme.glow}`}>
                    {currentTheme.icon}
                  </div>
                </div>

                {/* Preview Content */}
                <div className="space-y-3">
                  {/* Sample Card */}
                  <div className={`p-3 rounded-lg bg-gray-800/50 border ${currentTheme.borderColor} backdrop-blur-sm`}>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-violet-500 to-blue-500 flex items-center justify-center">
                        <Music className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-white font-medium">Sample Track</h4>
                        <p className="text-gray-400 text-sm">Artist Name</p>
                      </div>
                      <button className={`p-2 rounded-lg ${currentTheme.glow} bg-gradient-to-r ${currentTheme.gradient}`}>
                        <Play className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  </div>

                  {/* Sample Button */}
                  <button className={`w-full py-2 rounded-lg ${currentTheme.glow} bg-gradient-to-r ${currentTheme.gradient} text-white font-medium transition-all duration-300 hover:scale-105`}>
                    Sample Button
                  </button>

                  {/* Sample Stats */}
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Heart className={`w-4 h-4 ${currentTheme.textColor}`} />
                      <span className="text-gray-300">1.2K</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Play className={`w-4 h-4 ${currentTheme.textColor}`} />
                      <span className="text-gray-300">45.6K</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Glow Effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-blue-500/10 blur-xl -z-10" />
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-blue-500/5 to-purple-500/5 blur-2xl -z-20" />
        <div className="absolute inset-0 bg-gradient-to-tr from-violet-500/5 via-transparent to-blue-500/5 blur-3xl -z-30" />
      </div>

      {/* Active Theme Indicator */}
      {preferences?.theme && (
        <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-violet-400 animate-pulse" />
      )}
    </div>
  );
};

export default ThemeSwitcher; 