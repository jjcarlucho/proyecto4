import React, { useEffect } from 'react';
import Hero from '../components/home/Hero';
import Story from '../components/home/Story';
import Testimonials from '../components/home/Testimonials';
import Features from '../components/home/Features';
import CTA from '../components/home/CTA';

const HomePage: React.FC = () => {
  useEffect(() => {
    document.title = 'AutoDiagnose AI - IA para Diagnóstico de Vehículos';
  }, []);

  return (
    <div>
      <Hero />
      <Story />
      <Features />
      <Testimonials />
      <CTA />
    </div>
  );
};

export default HomePage;