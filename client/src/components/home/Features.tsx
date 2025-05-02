import React from 'react';
import { 
  Shield, 
  ClipboardList, 
  AlertTriangle, 
  Bell, 
  BarChart2, 
  Smartphone 
} from 'lucide-react';

const features = [
  {
    name: 'Automatic Diagnostics',
    description: 'Complete vehicle diagnostics with artificial intelligence technology that accurately detects problems.',
    icon: ClipboardList,
  },
  {
    name: 'Preventive Alerts',
    description: 'Receive early warnings about potential problems before they turn into serious breakdowns.',
    icon: AlertTriangle,
  },
  {
    name: 'Real-Time Notifications',
    description: 'Stay informed about your vehicle status with instant notifications on your device.',
    icon: Bell,
  },
  {
    name: 'Predictive Maintenance',
    description: 'Personalized maintenance recommendations based on your vehicle history and usage.',
    icon: Shield,
  },
  {
    name: 'Statistics and Analysis',
    description: 'Visualize trends, costs, and performance of your vehicle with detailed graphs.',
    icon: BarChart2,
  },
  {
    name: 'Mobile Access',
    description: 'Access all your vehicle information from any device, anytime.',
    icon: Smartphone,
  },
];

const Features: React.FC = () => {
  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Features</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Intelligent Diagnostics for Your Vehicle
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            AutoDiagnose AI combines cutting-edge technology with artificial intelligence to offer you the best automatic diagnostic service.
          </p>
        </div>

        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            {features.map((feature) => (
              <div key={feature.name} className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{feature.name}</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default Features;