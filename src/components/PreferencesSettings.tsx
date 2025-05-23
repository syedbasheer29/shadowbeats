import React from 'react';
import { usePreferences } from '../contexts/PreferencesContext';
import { Settings, Palette, Zap, Sparkles, Power } from 'lucide-react';

const PreferencesSettings: React.FC = () => {
  const { preferences, updatePreferences, loading } = usePreferences();

  if (loading || !preferences) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse text-violet-400">Loading preferences...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-gradient-to-b from-shadow-black via-gray-900 to-shadow-black">
      {/* Cyber grid background */}
      <div className="fixed inset-0 bg-cyber-grid opacity-10 pointer-events-none" />
      
      <div className="max-w-2xl mx-auto relative z-10">
        <div className="bg-gray-800/30 backdrop-blur-md rounded-xl border border-gray-700/50 p-8 shadow-glow-violet">
          <div className="flex items-center gap-3 mb-8">
            <Settings className="text-violet-400" size={24} />
            <h2 className="text-2xl font-bold text-white">Preferences</h2>
          </div>

          <div className="space-y-8">
            {/* Theme Selection */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Palette className="text-violet-400" size={20} />
                <h3 className="text-lg font-semibold text-white">Theme</h3>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {(['cyberpunk', 'shadow', 'light'] as const).map((theme) => (
                  <button
                    key={theme}
                    onClick={() => updatePreferences({ theme })}
                    className={`p-4 rounded-lg border transition-all duration-300 ${
                      preferences.theme === theme
                        ? 'border-violet-500 bg-violet-500/20 shadow-glow-violet'
                        : 'border-gray-700 hover:border-violet-500/50'
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-white capitalize mb-2">{theme}</div>
                      <div className={`h-2 rounded-full ${
                        theme === 'cyberpunk' ? 'bg-gradient-to-r from-violet-500 to-blue-500' :
                        theme === 'shadow' ? 'bg-gradient-to-r from-gray-700 to-gray-900' :
                        'bg-gradient-to-r from-gray-200 to-gray-400'
                      }`} />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Glow Intensity */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Sparkles className="text-violet-400" size={20} />
                <h3 className="text-lg font-semibold text-white">Glow Intensity</h3>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {(['low', 'medium', 'high'] as const).map((intensity) => (
                  <button
                    key={intensity}
                    onClick={() => updatePreferences({ glowIntensity: intensity })}
                    className={`p-4 rounded-lg border transition-all duration-300 ${
                      preferences.glowIntensity === intensity
                        ? 'border-violet-500 bg-violet-500/20 shadow-glow-violet'
                        : 'border-gray-700 hover:border-violet-500/50'
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-white capitalize mb-2">{intensity}</div>
                      <div className={`h-2 rounded-full ${
                        intensity === 'low' ? 'bg-violet-500/30' :
                        intensity === 'medium' ? 'bg-violet-500/60' :
                        'bg-violet-500'
                      }`} />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Accent Color */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Zap className="text-violet-400" size={20} />
                <h3 className="text-lg font-semibold text-white">Accent Color</h3>
              </div>
              <div className="grid grid-cols-4 gap-4">
                {['violet', 'blue', 'red', 'green'].map((color) => (
                  <button
                    key={color}
                    onClick={() => updatePreferences({ accentColor: color })}
                    className={`p-4 rounded-lg border transition-all duration-300 ${
                      preferences.accentColor === color
                        ? 'border-violet-500 bg-violet-500/20 shadow-glow-violet'
                        : 'border-gray-700 hover:border-violet-500/50'
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-white capitalize mb-2">{color}</div>
                      <div className={`h-2 rounded-full bg-${color}-500`} />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Animations Toggle */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Power className="text-violet-400" size={20} />
                <h3 className="text-lg font-semibold text-white">Animations</h3>
              </div>
              <button
                onClick={() => updatePreferences({ animationsEnabled: !preferences.animationsEnabled })}
                className={`w-full p-4 rounded-lg border transition-all duration-300 ${
                  preferences.animationsEnabled
                    ? 'border-violet-500 bg-violet-500/20 shadow-glow-violet'
                    : 'border-gray-700 hover:border-violet-500/50'
                }`}
              >
                <div className="text-center">
                  <div className="text-white">
                    {preferences.animationsEnabled ? 'Enabled' : 'Disabled'}
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreferencesSettings; 