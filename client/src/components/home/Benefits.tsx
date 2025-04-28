import React, { useEffect, useRef } from 'react';
import { Clock, CheckCircle, Database, PhoneCall, DollarSign, TrendingUp, Car } from 'lucide-react';

interface Benefit {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const benefits: Benefit[] = [
  {
    icon: <Clock className="w-12 h-12 text-primary-800" />,
    title: "3x Faster Diagnostics",
    description: "Complete diagnostics in 45 minutes instead of hours, reducing vehicle turnaround time."
  },
  {
    icon: <CheckCircle className="w-12 h-12 text-primary-800" />,
    title: "97% Accuracy Rate",
    description: "AI-verified diagnoses reduce warranty claims and increase customer satisfaction."
  },
  {
    icon: <Database className="w-12 h-12 text-primary-800" />,
    title: "500,000+ Repair Cases",
    description: "Leverage our extensive database of repair cases for comprehensive diagnostics."
  },
  {
    icon: <PhoneCall className="w-12 h-12 text-primary-800" />,
    title: "24/7 ASE-Certified Support",
    description: "Get expert assistance whenever you need it from our certified technicians."
  },
  {
    icon: <DollarSign className="w-12 h-12 text-primary-800" />,
    title: "$4.50 ROI for Every $1",
    description: "See a significant return on investment through improved efficiency and accuracy."
  },
  {
    icon: <TrendingUp className="w-12 h-12 text-primary-800" />,
    title: "32% Average Revenue Increase",
    description: "Our clients report substantial growth in revenue after implementing our solution."
  },
  {
    icon: <Car className="w-12 h-12 text-primary-800" />,
    title: "Support for 60+ Vehicle Brands",
    description: "Comprehensive coverage for domestic and imported vehicles across multiple years."
  }
];

const Benefits: React.FC = () => {
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
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <h2 className="heading-lg text-gray-900 mb-4">Why Choose AutoDiagnose AI?</h2>
          <p className="text-xl text-gray-600">
            Our platform offers unique advantages that transform how repair shops operate, boosting efficiency and profitability.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl shadow-md p-8 animate-fade-in"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="mb-6">{benefit.icon}</div>
              <h3 className="font-heading font-bold text-xl mb-3">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;