import React from 'react';
import HeroSection from '../components/HeroSection';
import FeaturedPlaylists from '../components/FeaturedPlaylists';
import CallToAction from '../components/CallToAction';

const Home: React.FC = () => {
  return (
    <div>
      <HeroSection />
      <FeaturedPlaylists />
      <CallToAction />
    </div>
  );
};

export default Home; 