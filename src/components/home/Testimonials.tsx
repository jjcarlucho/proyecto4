import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface Testimonial {
  id: number;
  quote: string;
  name: string;
  position: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    quote: "This platform is revolutionary! It saved us time and reduced errors, making it the best investment for our shop. We've seen a 28% increase in customer satisfaction since implementing AutoDiagnose AI.",
    name: "John Davis",
    position: "Repair Shop Owner",
    image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg"
  },
  {
    id: 2,
    quote: "It boosted our customer's trust and satisfaction levels. We've never looked back. The diagnostic accuracy is truly impressive, and we're closing repairs 40% faster than before.",
    name: "Mia Thompson",
    position: "Automotive Technician",
    image: "https://images.pexels.com/photos/3772510/pexels-photo-3772510.jpeg"
  },
  {
    id: 3,
    quote: "Finally, a solution that fits our budget and needs, offering easy integration and fast results. Our warranty claims have dropped by 65% since we started using AutoDiagnose AI.",
    name: "Alex Martinez",
    position: "Auto Repair Professional",
    image: "https://images.pexels.com/photos/8391552/pexels-photo-8391552.jpeg"
  }
];

const Testimonials: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const observerRef = useRef<IntersectionObserver | null>(null);
  
  const handlePrev = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };
  
  const handleNext = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 6000);
    
    return () => clearInterval(interval);
  }, []);
  
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
    <section className="py-20 bg-primary-800 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="heading-lg text-center mb-16 animate-fade-in">What Our Users Say</h2>
          
          <div className="relative">
            <div className="animate-fade-in" style={{transitionDelay: '200ms'}}>
              {testimonials.map((testimonial, index) => (
                <div 
                  key={testimonial.id}
                  className={`transition-opacity duration-500 absolute inset-0 ${
                    index === activeIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  }`}
                >
                  <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="md:w-1/3">
                      <div className="relative">
                        <div className="rounded-full overflow-hidden aspect-square border-4 border-secondary-500 shadow-xl">
                          <img 
                            src={testimonial.image} 
                            alt={testimonial.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="absolute -top-4 -left-4 bg-secondary-500 rounded-full p-3">
                          <Quote className="w-6 h-6 text-white" />
                        </div>
                      </div>
                    </div>
                    <div className="md:w-2/3 text-center md:text-left">
                      <p className="text-xl leading-relaxed mb-6">
                        "{testimonial.quote}"
                      </p>
                      <div>
                        <h4 className="font-heading font-bold text-xl">{testimonial.name}</h4>
                        <p className="text-blue-200">{testimonial.position}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Static container to maintain height */}
            <div className="invisible">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-1/3">
                  <div className="rounded-full overflow-hidden aspect-square">
                    <div className="w-full h-full"></div>
                  </div>
                </div>
                <div className="md:w-2/3">
                  <p className="text-xl leading-relaxed mb-6">
                    {testimonials[0].quote}
                  </p>
                  <div>
                    <h4 className="font-heading font-bold text-xl">{testimonials[0].name}</h4>
                    <p>{testimonials[0].position}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Controls */}
            <div className="flex justify-center mt-8 gap-4">
              <button 
                onClick={handlePrev}
                className="p-2 rounded-full bg-blue-700 hover:bg-blue-600 transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <div className="flex gap-2 items-center">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === activeIndex ? 'bg-secondary-500 scale-125' : 'bg-blue-600'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
              <button 
                onClick={handleNext}
                className="p-2 rounded-full bg-blue-700 hover:bg-blue-600 transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;