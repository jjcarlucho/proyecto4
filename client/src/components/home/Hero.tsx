import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Play } from 'lucide-react';

const Hero: React.FC = () => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  
  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observerRef.current?.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    const animatedElements = document.querySelectorAll('.animate-fade-in');
    animatedElements.forEach(el => {
      observerRef.current?.observe(el);
    });
    
    return () => {
      if (observerRef.current) {
        animatedElements.forEach(el => {
          observerRef.current?.unobserve(el);
        });
      }
    };
  }, []);

  return (
    <section className="pt-28 pb-16 md:pt-36 md:pb-24 bg-gradient-to-br from-blue-50 to-blue-100 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-primary-400 filter blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-64 h-64 rounded-full bg-secondary-400 filter blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-12 animate-fade-in">
          <h1 className="heading-xl text-gray-900 mb-6">
            See how <span className="text-primary-800">AutoDiagnose AI</span> is transforming the automotive repair industry and why repair shop owners are adopting it faster than ever!
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8">
            AI-powered diagnostic platform that diagnoses vehicle issues <span className="font-bold text-primary-800">3x faster</span> with an impressive <span className="font-bold text-primary-800">97% accuracy rate</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/demo" className="btn btn-primary text-lg">
              Start Your 30-Day Trial
            </Link>
            <Link to="/features" className="btn btn-outline text-lg">
              Explore Features
            </Link>
          </div>
        </div>
        
        <div className="mt-16 max-w-5xl mx-auto animate-fade-in" style={{transitionDelay: '200ms'}}>
          <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl border-8 border-white">
            <div className="absolute inset-0 bg-gray-900/50 flex items-center justify-center group cursor-pointer hover:bg-gray-900/40 transition-colors">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform">
                <Play className="h-8 w-8 text-primary-800 ml-1" />
              </div>
            </div>
            <img 
              src="https://images.pexels.com/photos/3806249/pexels-photo-3806249.jpeg" 
              alt="Auto mechanic using diagnostic technology" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="mt-6 text-center">
            <h3 className="font-heading font-semibold text-xl text-gray-800">"I just closed up the shop for today..."</h3>
            <p className="text-gray-600">See how John's auto repair shop increased efficiency by 32%</p>
          </div>
        </div>
        
        <div className="mt-20 py-6 px-6 md:px-10 bg-white rounded-xl shadow-lg animate-fade-in" style={{transitionDelay: '300ms'}}>
          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            <div className="text-center">
              <p className="text-4xl font-bold text-primary-800">1,500+</p>
              <p className="text-gray-600">Repair Shops</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-primary-800">3x</p>
              <p className="text-gray-600">Faster Diagnosis</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-primary-800">97%</p>
              <p className="text-gray-600">Accuracy Rate</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-primary-800">500K+</p>
              <p className="text-gray-600">Repair Cases</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-primary-800">$4.50</p>
              <p className="text-gray-600">ROI per $1</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;