import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Features from '../components/home/Features';

const FeaturesPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Features - AutoDiagnose AI';
  }, []);

  return (
    <div className="pt-16 pb-20">
      <div className="bg-blue-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
              Features
            </h1>
            <p className="mt-5 max-w-xl mx-auto text-xl text-blue-100">
              Discover all the advanced tools that AutoDiagnose AI offers to keep your vehicle in optimal condition.
            </p>
          </div>
        </div>
      </div>

      <Features />

      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Cutting-edge Technology
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Our diagnostic system uses advanced artificial intelligence to accurately identify problems.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-gray-50 overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900">AI Algorithms</h3>
                <p className="mt-2 text-base text-gray-500">
                  We use machine learning models trained with millions of data points for precise diagnostics.
                </p>
              </div>
            </div>

            <div className="bg-gray-50 overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900">Extensive Database</h3>
                <p className="mt-2 text-base text-gray-500">
                  Our database includes technical information for thousands of vehicle models from all manufacturers.
                </p>
              </div>
            </div>

            <div className="bg-gray-50 overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900">Constant Updates</h3>
                <p className="mt-2 text-base text-gray-500">
                  Our system is continuously updated with the latest data to improve its accuracy.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <Link
              to="/register"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesPage;