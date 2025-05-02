import React, { useEffect } from 'react';
import { ROICalculator } from '../components/calculators/ROICalculator';

const ROICalculatorPage: React.FC = () => {
  useEffect(() => {
    document.title = 'ROI Calculator - AutoDiagnose AI';
  }, []);

  return (
    <div className="pt-16 pb-20">
      <div className="bg-blue-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
              ROI Calculator
            </h1>
            <p className="mt-5 max-w-xl mx-auto text-xl text-blue-100">
              Discover how much you can save with AutoDiagnose AI for your automotive business.
            </p>
          </div>
        </div>
      </div>

      <ROICalculator />

      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Testimonials</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Trusted by Auto Professionals Worldwide
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              See what other businesses achieved after implementing AutoDiagnose AI.
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
              <div className="relative">
                <div className="bg-white p-6 rounded-lg shadow">
                  <div className="flex items-center mb-4">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                      JM
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">John Martinez</h3>
                      <p className="text-sm text-gray-500">Fleet Manager, Express Logistics</p>
                    </div>
                  </div>
                  <blockquote className="text-gray-600">
                    "Within six months of implementing AutoDiagnose AI, we reduced our breakdown-related downtime by 37% and cut our overall maintenance costs by over $45,000. The ROI calculator was spot-on with its predictions."
                  </blockquote>
                </div>
              </div>

              <div className="relative">
                <div className="bg-white p-6 rounded-lg shadow">
                  <div className="flex items-center mb-4">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                      SC
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">Sarah Chen</h3>
                      <p className="text-sm text-gray-500">Owner, Premier Auto Repair</p>
                    </div>
                  </div>
                  <blockquote className="text-gray-600">
                    "AutoDiagnose AI has transformed our shop. Diagnosis accuracy improved by 68%, customer complaints dropped by 42%, and we've seen a 31% increase in customer retention. The return has far exceeded our initial investment."
                  </blockquote>
                </div>
              </div>

              <div className="relative">
                <div className="bg-white p-6 rounded-lg shadow">
                  <div className="flex items-center mb-4">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                      DR
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">David Rodriguez</h3>
                      <p className="text-sm text-gray-500">Chief Mechanic, City Motors</p>
                    </div>
                  </div>
                  <blockquote className="text-gray-600">
                    "The accuracy of diagnostics with AutoDiagnose AI is astounding. We're saving hours on complex problems, catching issues earlier, and dramatically increasing our throughput. The ROI calculator accurately predicted we'd break even in 2.3 months."
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ROICalculatorPage;