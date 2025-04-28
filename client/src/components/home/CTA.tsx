import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const CTA: React.FC = () => {
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
    <section className="py-20 bg-gradient-to-r from-primary-800 to-primary-900 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="heading-lg mb-6 animate-fade-in">Why Wait? Transform Your Shop Today</h2>
          <p className="text-xl mb-10 text-blue-100 animate-fade-in" style={{transitionDelay: '100ms'}}>
            Join over 1,500 repair shops that have already revolutionized their diagnostic process and improved their bottom line with AutoDiagnose AI.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in" style={{transitionDelay: '200ms'}}>
            <Link to="/demo" className="btn bg-secondary-500 hover:bg-secondary-400 text-white text-lg group">
              <span className="flex items-center">
                Start Your 30-Day Trial
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            <div className="text-blue-200">
              No credit card required
            </div>
          </div>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in" style={{transitionDelay: '300ms'}}>
            <div className="bg-blue-800 bg-opacity-50 p-6 rounded-lg">
              <h3 className="font-heading font-bold text-xl mb-3">100% Satisfaction</h3>
              <p className="text-blue-100">
                Try risk-free with our 30-day money-back guarantee. No questions asked.
              </p>
            </div>
            <div className="bg-blue-800 bg-opacity-50 p-6 rounded-lg">
              <h3 className="font-heading font-bold text-xl mb-3">5-Minute Setup</h3>
              <p className="text-blue-100">
                Quick onboarding process gets you diagnosing vehicles in minutes, not days.
              </p>
            </div>
            <div className="bg-blue-800 bg-opacity-50 p-6 rounded-lg">
              <h3 className="font-heading font-bold text-xl mb-3">Dedicated Support</h3>
              <p className="text-blue-100">
                Our ASE-certified team is available 24/7 to help with implementation and questions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;