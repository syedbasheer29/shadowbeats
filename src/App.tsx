import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Explore from './pages/Explore';
import Playlists from './pages/Playlists';
import AuthForm from './components/AuthForm';
import Profile from './pages/Profile';
import BackgroundEffects from './components/BackgroundEffects';
import { AuthProvider } from './contexts/AuthContext';
import { PreferencesProvider } from './contexts/PreferencesContext';

function App() {
  return (
    <AuthProvider>
      <PreferencesProvider>
        <Router>
          <div className="bg-shadow-black min-h-screen text-white relative overflow-hidden">
            <BackgroundEffects />
            <div className="relative z-10">
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/playlists" element={<Playlists />} />
                <Route path="/login" element={<AuthForm />} />
                <Route path="/signup" element={<AuthForm />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </div>
          </div>
        </Router>
      </PreferencesProvider>
    </AuthProvider>
  );
}

export default App;