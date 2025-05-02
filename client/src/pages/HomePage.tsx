import React, { useEffect } from 'react';
import EnhancedHero from '../components/home/EnhancedHero';
import Story from '../components/home/Story';
import Testimonials from '../components/home/Testimonials';
import Features from '../components/home/Features';
import CTA from '../components/home/CTA';
import InteractiveDemoSection from '../components/home/InteractiveDemoSection';

const HomePage: React.FC = () => {
  useEffect(() => {
    document.title = 'AutoDiagnose AI - Advanced Vehicle Diagnostics with AI';
  }, []);

  return (
    <div>
      <EnhancedHero />
      <Story />
      <Features />
      <InteractiveDemoSection />
      <Testimonials />
      <CTA />
    </div>
  );
};

export default HomePage;