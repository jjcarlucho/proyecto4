import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Clock, 
  CheckCircle, 
  Database, 
  PhoneCall, 
  BarChart2, 
  Car, 
  MonitorSmartphone,
  Sliders,
  Cpu,
  FileText,
  Users,
  ShieldCheck
} from 'lucide-react';

const FeaturesPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Features - AutoDiagnose AI';
  }, []);

  const features = [
    {
      icon: <Cpu className="w-10 h-10 text-primary-800" />,
      title: "AI-Powered Diagnostics",
      description: "Our advanced AI algorithms analyze vehicle data and symptoms to provide accurate diagnostic recommendations in minutes."
    },
    {
      icon: <Clock className="w-10 h-10 text-primary-800" />,
      title: "3x Faster Results",
      description: "Complete diagnostics in just 45 minutes instead of hours, dramatically reducing vehicle turnaround time."
    },
    {
      icon: <CheckCircle className="w-10 h-10 text-primary-800" />,
      title: "97% Accuracy Rate",
      description: "Our system consistently delivers highly accurate diagnoses, minimizing warranty claims and improving customer satisfaction."
    },
    {
      icon: <Database className="w-10 h-10 text-primary-800" />,
      title: "Extensive Vehicle Database",
      description: "Access data from over 500,000 repair cases across 60+ vehicle brands for comprehensive diagnostic coverage."
    },
    {
      icon: <FileText className="w-10 h-10 text-primary-800" />,
      title: "Detailed Repair Reports",
      description: "Generate professional customer-ready reports with repair recommendations, estimated costs, and time requirements."
    },
    {
      icon: <MonitorSmartphone className="w-10 h-10 text-primary-800" />,
      title: "Multi-Device Support",
      description: "Access the platform from any device - desktop, tablet, or smartphone - for flexibility in your workflow."
    },
    {
      icon: <Sliders className="w-10 h-10 text-primary-800" />,
      title: "OBD-II Integration",
      description: "Seamlessly connect with OBD-II scan tools to import vehicle data directly into our diagnostic system."
    },
    {
      icon: <BarChart2 className="w-10 h-10 text-primary-800" />,
      title: "Performance Analytics",
      description: "Track your shop's efficiency, diagnostic accuracy, and customer satisfaction with detailed dashboards."
    },
    {
      icon: <Users className="w-10 h-10 text-primary-800" />,
      title: "Multi-User Access",
      description: "Allow your entire team to collaborate on diagnostics with role-based permissions and activity tracking."
    },
    {
      icon: <Car className="w-10 h-10 text-primary-800" />,
      title: "Comprehensive Coverage",
      description: "Support for domestic and imported vehicles across multiple years, including the latest models."
    },
    {
      icon: <PhoneCall className="w-10 h-10 text-primary-800" />,
      title: "24/7 Expert Support",
      description: "Get assistance from our ASE-certified technicians whenever you need it, ensuring you're never stuck on a diagnosis."
    },
    {
      icon: <ShieldCheck className="w-10 h-10 text-primary-800" />,
      title: "Secure Data Handling",
      description: "Industry-leading security protocols ensure your customer and vehicle data remains protected and private."
    }
  ];

  return (
    <div className="pt-24">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block px-4 py-2 bg-blue-100 text-primary-800 rounded-full font-medium text-sm mb-4">Features</span>
          <h1 className="heading-xl text-gray-900 mb-6">
            Advanced AI Diagnostic Tools for Modern Auto Repair Shops
          </h1>
          <p className="text-xl text-gray-600">
            Discover how our comprehensive suite of features will transform your repair shop operations, increase accuracy, and boost customer satisfaction.
          </p>
        </div>
        
        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md p-8 transition-transform hover:-translate-y-1 hover:shadow-lg">
              <div className="mb-6">{feature.icon}</div>
              <h3 className="font-heading font-bold text-xl mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
        
        {/* How It Works */}
        <div className="max-w-5xl mx-auto mt-24">
          <div className="text-center mb-16">
            <h2 className="heading-lg text-gray-900 mb-4">How AutoDiagnose AI Works</h2>
            <p className="text-xl text-gray-600">
              Our streamlined process makes vehicle diagnostics faster and more accurate than ever before.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-md p-8 text-center relative">
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-primary-800 flex items-center justify-center text-white text-xl font-bold">
                1
              </div>
              <h3 className="font-heading font-bold text-xl mb-4 mt-6">Input Vehicle Data</h3>
              <p className="text-gray-600">
                Enter vehicle details, symptoms, and connect your OBD-II scanner to gather diagnostic codes.
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-8 text-center relative">
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-primary-800 flex items-center justify-center text-white text-xl font-bold">
                2
              </div>
              <h3 className="font-heading font-bold text-xl mb-4 mt-6">AI Analysis</h3>
              <p className="text-gray-600">
                Our AI processes the data, comparing it with our database of 500,000+ repair cases to identify likely issues.
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-8 text-center relative">
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-primary-800 flex items-center justify-center text-white text-xl font-bold">
                3
              </div>
              <h3 className="font-heading font-bold text-xl mb-4 mt-6">Repair Recommendations</h3>
              <p className="text-gray-600">
                Receive prioritized repair suggestions with step-by-step guides, parts needed, and cost estimates.
              </p>
            </div>
          </div>
        </div>
        
        {/* CTA */}
        <div className="max-w-4xl mx-auto mt-24 bg-primary-50 rounded-xl p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-2/3">
              <h3 className="font-heading font-bold text-2xl mb-4 text-gray-900">
                Ready to transform your diagnostic process?
              </h3>
              <p className="text-gray-700 mb-6">
                Join over 1,500 repair shops already using AutoDiagnose AI to increase accuracy, save time, and boost customer satisfaction.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/demo" className="btn btn-primary">
                  Start Your Free Trial
                </Link>
                <Link to="/contact" className="btn btn-outline">
                  Schedule a Demo
                </Link>
              </div>
            </div>
            <div className="md:w-1/3 flex justify-center">
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <h4 className="font-bold text-4xl text-primary-800 mb-2">30 Days</h4>
                <p className="text-gray-600">Free Trial</p>
                <p className="text-sm text-gray-500 mt-2">No credit card required</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesPage;