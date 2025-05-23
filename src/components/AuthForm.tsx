import React, { useState } from 'react';
import { signIn, signUp } from '../config/firebase';
import { Music, Mail, Lock, User as UserIcon, AlertCircle } from 'lucide-react';

const AuthForm: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (isLogin) {
        await signIn(email, password);
      } else {
        await signUp(email, password, displayName);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-b from-shadow-black via-gray-900 to-shadow-black">
      {/* Cyber grid background */}
      <div className="fixed inset-0 bg-cyber-grid opacity-10 pointer-events-none" />
      
      {/* Enhanced glow effects */}
      <div className="fixed inset-0 bg-gradient-to-br from-violet-500/5 via-blue-500/5 to-purple-500/5 blur-3xl" />
      <div className="fixed inset-0 bg-gradient-to-tr from-violet-500/5 via-transparent to-blue-500/5 blur-2xl" />
      <div className="fixed inset-0 bg-gradient-to-tl from-purple-500/5 via-transparent to-violet-500/5 blur-xl" />
      
      <div className="w-full max-w-md relative z-10">
        {/* Main container with enhanced glow */}
        <div className="relative">
          {/* Glow effects */}
          <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 to-blue-500 rounded-xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt" />
          <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-600 to-blue-500 rounded-xl blur opacity-20 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse" />
          
          <div className="relative bg-gray-800/30 backdrop-blur-md rounded-xl border border-gray-700/50 p-8 shadow-glow-violet">
            {/* Header with cyberpunk styling */}
            <div className="text-center mb-8">
              <div className="inline-block p-2 rounded-lg bg-gradient-to-r from-violet-600 to-blue-500 mb-4 shadow-glow-violet">
                <Music className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">
                {isLogin ? 'Welcome Back' : 'Create Account'}
              </h2>
              <p className="text-gray-400">
                {isLogin ? 'Sign in to continue' : 'Join the cyberpunk music revolution'}
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 rounded-lg bg-red-500/20 border border-red-500/30 text-red-400 flex items-center gap-2 shadow-glow-red">
                <AlertCircle size={20} />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div className="group">
                  <label className="block text-gray-300 mb-2">Display Name</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      className="w-full px-4 py-3 pl-11 rounded-lg bg-gray-700/50 border border-gray-600/50 text-white placeholder-gray-400 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/50 transition-all duration-300 group-hover:border-violet-500/30"
                      placeholder="Enter your name"
                      required
                    />
                    <UserIcon className="absolute left-3 top-3.5 text-gray-400 group-hover:text-violet-400 transition-colors" size={20} />
                  </div>
                </div>
              )}

              <div className="group">
                <label className="block text-gray-300 mb-2">Email</label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 pl-11 rounded-lg bg-gray-700/50 border border-gray-600/50 text-white placeholder-gray-400 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/50 transition-all duration-300 group-hover:border-violet-500/30"
                    placeholder="Enter your email"
                    required
                  />
                  <Mail className="absolute left-3 top-3.5 text-gray-400 group-hover:text-violet-400 transition-colors" size={20} />
                </div>
              </div>

              <div className="group">
                <label className="block text-gray-300 mb-2">Password</label>
                <div className="relative">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 pl-11 rounded-lg bg-gray-700/50 border border-gray-600/50 text-white placeholder-gray-400 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/50 transition-all duration-300 group-hover:border-violet-500/30"
                    placeholder="Enter your password"
                    required
                  />
                  <Lock className="absolute left-3 top-3.5 text-gray-400 group-hover:text-violet-400 transition-colors" size={20} />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-violet-600 to-blue-500 text-white hover:from-violet-700 hover:to-blue-600 transition-all duration-300 flex items-center justify-center gap-2 shadow-glow-violet disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
              >
                {/* Button glow effects */}
                <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute inset-0 bg-gradient-to-r from-violet-600/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity blur-sm" />
                
                <Music size={20} className="relative z-10" />
                <span className="relative z-10">
                  {loading ? 'Loading...' : isLogin ? 'Sign In' : 'Sign Up'}
                </span>
              </button>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-violet-400 hover:text-violet-300 transition-colors relative group"
              >
                <span className="relative z-10">
                  {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Sign In'}
                </span>
                <div className="absolute inset-0 bg-violet-500/10 rounded opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm; 