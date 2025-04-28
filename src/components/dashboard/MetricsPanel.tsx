import React from 'react';
import { Clock, CheckCircle, TrendingUp, Users } from 'lucide-react';

interface Metric {
  icon: React.ReactNode;
  name: string;
  value: string;
  trend: string;
  trendDirection: 'up' | 'down' | 'neutral';
}

const metrics: Metric[] = [
  {
    icon: <Clock className="w-6 h-6 text-primary-800" />,
    name: "Diagnostic Time Saved",
    value: "124 hours",
    trend: "+12% from last month",
    trendDirection: 'up'
  },
  {
    icon: <CheckCircle className="w-6 h-6 text-green-600" />,
    name: "Successful Diagnoses",
    value: "247",
    trend: "+8% from last month",
    trendDirection: 'up'
  },
  {
    icon: <TrendingUp className="w-6 h-6 text-secondary-500" />,
    name: "Estimated ROI",
    value: "$4,320",
    trend: "Based on time savings",
    trendDirection: 'neutral'
  },
  {
    icon: <Users className="w-6 h-6 text-primary-800" />,
    name: "Customer Satisfaction",
    value: "4.8/5",
    trend: "Based on 152 reviews",
    trendDirection: 'neutral'
  }
];

const MetricsPanel: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => (
        <div key={index} className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-4 mb-3">
            <div className="bg-gray-100 p-3 rounded-lg">
              {metric.icon}
            </div>
            <h3 className="font-medium text-gray-500">{metric.name}</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-2">{metric.value}</p>
          <p className={`text-sm ${
            metric.trendDirection === 'up' 
              ? 'text-green-600' 
              : metric.trendDirection === 'down'
                ? 'text-red-600'
                : 'text-gray-500'
          }`}>
            {metric.trend}
          </p>
        </div>
      ))}
    </div>
  );
};

export default MetricsPanel;