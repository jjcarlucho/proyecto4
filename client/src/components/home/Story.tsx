import React, { useEffect, useRef } from 'react';

const Story: React.FC = () => {
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
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="heading-lg text-center text-gray-900 mb-12 animate-fade-in">The Real Challenge for Auto Repair Shops</h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="animate-fade-in" style={{transitionDelay: '100ms'}}>
              <div className="bg-gray-100 p-8 rounded-xl relative">
                <div className="absolute top-0 right-0 w-20 h-20 bg-primary-800 rounded-bl-xl rounded-tr-xl flex items-center justify-center">
                  <span className="text-white font-bold text-2xl">01</span>
                </div>
                <h3 className="font-heading font-bold text-xl mb-4 pr-16">The Problem</h3>
                <p className="text-gray-700 leading-relaxed">
                  Picture this: a repair shop owner frustrated with slow diagnostic processes and inaccurate results, leading to high warranty return rates and dissatisfied customers. It's disheartening to witness businesses struggle because of outdated methods and limited vehicle data.
                </p>
              </div>
            </div>
            
            <div className="animate-fade-in" style={{transitionDelay: '200ms'}}>
              <div className="bg-gray-100 p-8 rounded-xl relative">
                <div className="absolute top-0 right-0 w-20 h-20 bg-secondary-500 rounded-bl-xl rounded-tr-xl flex items-center justify-center">
                  <span className="text-white font-bold text-2xl">02</span>
                </div>
                <h3 className="font-heading font-bold text-xl mb-4 pr-16">The Reality</h3>
                <p className="text-gray-700 leading-relaxed">
                  "My team and I used to struggle with manual diagnostics. Sometimes the day ended with frustrations over errors and misdiagnoses—which often led to disputes with customers and even warranty claims." – Mike Johnson, Shop Owner
                </p>
              </div>
            </div>
            
            <div className="animate-fade-in" style={{transitionDelay: '300ms'}}>
              <div className="bg-primary-50 p-8 rounded-xl relative">
                <div className="absolute top-0 right-0 w-20 h-20 bg-primary-800 rounded-bl-xl rounded-tr-xl flex items-center justify-center">
                  <span className="text-white font-bold text-2xl">03</span>
                </div>
                <h3 className="font-heading font-bold text-xl mb-4 pr-16">The Solution</h3>
                <p className="text-gray-700 leading-relaxed">
                  The breakthrough came when AutoDiagnose AI was introduced to workshops like yours. It quickly became the cornerstone for forward-thinking repair shops, providing instant customer reports, repair estimates, and a seamless diagnostic experience.
                </p>
              </div>
            </div>
            
            <div className="animate-fade-in" style={{transitionDelay: '400ms'}}>
              <div className="bg-secondary-50 p-8 rounded-xl relative">
                <div className="absolute top-0 right-0 w-20 h-20 bg-secondary-500 rounded-bl-xl rounded-tr-xl flex items-center justify-center">
                  <span className="text-white font-bold text-2xl">04</span>
                </div>
                <h3 className="font-heading font-bold text-xl mb-4 pr-16">The Outcome</h3>
                <p className="text-gray-700 leading-relaxed">
                  With AutoDiagnose AI, repair shops are now experiencing 3x faster diagnostics with 97% accuracy. Customers are happier, revenue has increased by an average of 32%, and shop owners can finally focus on growing their business instead of troubleshooting diagnostic issues.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Story;