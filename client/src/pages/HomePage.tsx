import React, { useEffect } from 'react';
import Hero from '../components/home/Hero';
import Story from '../components/home/Story';
import Testimonials from '../components/home/Testimonials';
import Benefits from '../components/home/Benefits';
import CTA from '../components/home/CTA';

const HomePage: React.FC = () => {
  useEffect(() => {
    document.title = 'AutoDiagnose AI - AI-Powered Vehicle Diagnostics';
  }, []);

  return (
    <div>
      <Hero />
      <Story />
      <Testimonials />
      <Benefits />
      <CTA />
    </div>
  );
};

export default HomePage;