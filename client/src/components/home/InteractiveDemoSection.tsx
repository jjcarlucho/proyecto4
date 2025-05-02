import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Check, AlertTriangle, Car, Gauge, AlertCircle, BarChart2, Zap } from 'lucide-react';

const InteractiveDemoSection: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [selectedCar, setSelectedCar] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const carOptions = [
    { id: 'sedan', name: 'Sedan', image: '/images/sedan.png', description: 'Compact 4-door family car' },
    { id: 'suv', name: 'SUV', image: '/images/suv.png', description: 'Sport utility vehicle with ample space' },
    { id: 'truck', name: 'Truck', image: '/images/truck.png', description: 'Pickup truck for heavy duty needs' },
  ];

  const diagnosticResults = [
    { 
      id: 1, 
      system: 'Engine', 
      status: 'Warning', 
      icon: Gauge, 
      color: 'text-yellow-500', 
      bgColor: 'bg-yellow-100',
      message: 'Minor misfiring detected in cylinder 2. Recommendation: Check spark plugs.' 
    },
    { 
      id: 2, 
      system: 'Electrical', 
      status: 'Critical', 
      icon: Zap, 
      color: 'text-red-500', 
      bgColor: 'bg-red-100',
      message: 'Battery voltage below optimal level (11.8V). Recommendation: Test alternator and replace battery if needed.' 
    },
    { 
      id: 3, 
      system: 'Brakes', 
      status: 'Good', 
      icon: AlertCircle, 
      color: 'text-green-500', 
      bgColor: 'bg-green-100',
      message: 'Brake pads at 80% life. No action needed at this time.' 
    },
    { 
      id: 4, 
      system: 'Suspension', 
      status: 'Warning', 
      icon: AlertTriangle, 
      color: 'text-yellow-500', 
      bgColor: 'bg-yellow-100',
      message: 'Front right shock absorber showing signs of wear. Recommendation: Monitor and plan for replacement within 3-6 months.' 
    },
  ];

  const handleSelectCar = (carId: string) => {
    setSelectedCar(carId);
  };

  const handleStartDiagnostics = () => {
    setIsLoading(true);
    setCurrentStep(2);
    setIsAnimating(true);
    
    // Simulate the diagnostic process
    setTimeout(() => {
      setIsLoading(false);
      setShowResults(true);
      setCurrentStep(3);
    }, 4000);
  };

  const handleReset = () => {
    setCurrentStep(1);
    setSelectedCar(null);
    setShowResults(false);
    setIsAnimating(false);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.h2 
            className="text-3xl font-extrabold text-white sm:text-4xl" 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Experience AutoDiagnose AI
          </motion.h2>
          <motion.p 
            className="mt-4 text-lg text-gray-400 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Try our interactive demo to see how our AI-powered diagnostic system can identify problems in your vehicle with pinpoint accuracy.
          </motion.p>
        </div>

        <div className="mt-12 bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
          {/* Progress steps */}
          <div className="px-6 py-4 border-b border-gray-700">
            <div className="flex justify-between max-w-3xl mx-auto">
              <div className="flex flex-col items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 
                  ${currentStep === 1 ? 'border-blue-500 bg-blue-500 bg-opacity-20' : 
                    currentStep > 1 ? 'border-blue-500 bg-blue-500' : 'border-gray-600'}`}>
                  {currentStep > 1 ? (
                    <Check className="h-5 w-5 text-white" />
                  ) : (
                    <span className={`${currentStep === 1 ? 'text-blue-400' : 'text-gray-500'}`}>1</span>
                  )}
                </div>
                <span className={`mt-2 text-sm ${currentStep === 1 ? 'text-blue-400' : currentStep > 1 ? 'text-blue-500' : 'text-gray-500'}`}>
                  Vehicle Selection
                </span>
              </div>

              <div className={`flex-1 flex items-center mx-4`}>
                <div className={`h-0.5 w-full ${currentStep > 1 ? 'bg-blue-500' : 'bg-gray-600'}`}></div>
              </div>

              <div className="flex flex-col items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 
                  ${currentStep === 2 ? 'border-blue-500 bg-blue-500 bg-opacity-20' : 
                    currentStep > 2 ? 'border-blue-500 bg-blue-500' : 'border-gray-600'}`}>
                  {currentStep > 2 ? (
                    <Check className="h-5 w-5 text-white" />
                  ) : (
                    <span className={`${currentStep === 2 ? 'text-blue-400' : 'text-gray-500'}`}>2</span>
                  )}
                </div>
                <span className={`mt-2 text-sm ${currentStep === 2 ? 'text-blue-400' : currentStep > 2 ? 'text-blue-500' : 'text-gray-500'}`}>
                  Diagnostic Process
                </span>
              </div>

              <div className={`flex-1 flex items-center mx-4`}>
                <div className={`h-0.5 w-full ${currentStep > 2 ? 'bg-blue-500' : 'bg-gray-600'}`}></div>
              </div>

              <div className="flex flex-col items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 
                  ${currentStep === 3 ? 'border-blue-500 bg-blue-500 bg-opacity-20' : 'border-gray-600'}`}>
                  <span className={`${currentStep === 3 ? 'text-blue-400' : 'text-gray-500'}`}>3</span>
                </div>
                <span className={`mt-2 text-sm ${currentStep === 3 ? 'text-blue-400' : 'text-gray-500'}`}>
                  Results
                </span>
              </div>
            </div>
          </div>

          {/* Content area */}
          <div className="p-6 md:p-8">
            {currentStep === 1 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="max-w-3xl mx-auto"
              >
                <h3 className="text-xl font-medium text-white mb-6">Select your vehicle type</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {carOptions.map((car) => (
                    <motion.div
                      key={car.id}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ease-in-out
                        ${selectedCar === car.id ? 'border-blue-500 bg-blue-900 bg-opacity-20' : 'border-gray-700 hover:border-gray-500'}`}
                      onClick={() => handleSelectCar(car.id)}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex flex-col items-center text-center">
                        <div className="w-20 h-20 md:w-24 md:h-24 mb-3 flex items-center justify-center">
                          <Car className="w-16 h-16 text-gray-300" />
                        </div>
                        <h4 className="text-lg font-medium text-white">{car.name}</h4>
                        <p className="mt-1 text-sm text-gray-400">{car.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-8 flex justify-center">
                  <motion.button
                    className={`px-6 py-3 rounded-md font-medium ${
                      selectedCar ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                    } transition-colors duration-200`}
                    onClick={selectedCar ? handleStartDiagnostics : undefined}
                    disabled={!selectedCar}
                    whileHover={selectedCar ? { scale: 1.05 } : {}}
                    whileTap={selectedCar ? { scale: 0.95 } : {}}
                  >
                    Start Diagnostic
                  </motion.button>
                </div>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="max-w-3xl mx-auto text-center py-8"
              >
                <h3 className="text-xl font-medium text-white mb-8">Running comprehensive diagnostics...</h3>
                
                <div className="relative mx-auto w-full max-w-md h-8 bg-gray-700 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-blue-500"
                    initial={{ width: "0%" }}
                    animate={{ width: isLoading ? "100%" : "0%" }}
                    transition={{ duration: 4, ease: "easeInOut" }}
                  />
                </div>
                
                <div className="mt-12 grid grid-cols-2 gap-4 max-w-xl mx-auto">
                  <motion.div 
                    className="p-4 rounded-lg bg-gray-700 flex items-center"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <div className="w-10 h-10 rounded-full bg-blue-500 bg-opacity-20 flex items-center justify-center">
                      <Gauge className="h-5 w-5 text-blue-400" />
                    </div>
                    <div className="ml-3">
                      <div className="text-sm text-blue-300">Analyzing engine data</div>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="p-4 rounded-lg bg-gray-700 flex items-center"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                  >
                    <div className="w-10 h-10 rounded-full bg-blue-500 bg-opacity-20 flex items-center justify-center">
                      <Zap className="h-5 w-5 text-blue-400" />
                    </div>
                    <div className="ml-3">
                      <div className="text-sm text-blue-300">Checking electrical systems</div>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="p-4 rounded-lg bg-gray-700 flex items-center"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
                  >
                    <div className="w-10 h-10 rounded-full bg-blue-500 bg-opacity-20 flex items-center justify-center">
                      <AlertCircle className="h-5 w-5 text-blue-400" />
                    </div>
                    <div className="ml-3">
                      <div className="text-sm text-blue-300">Inspecting brake system</div>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="p-4 rounded-lg bg-gray-700 flex items-center"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.9 }}
                  >
                    <div className="w-10 h-10 rounded-full bg-blue-500 bg-opacity-20 flex items-center justify-center">
                      <BarChart2 className="h-5 w-5 text-blue-400" />
                    </div>
                    <div className="ml-3">
                      <div className="text-sm text-blue-300">Evaluating performance metrics</div>
                    </div>
                  </motion.div>
                </div>
                
                <div className="mt-8 text-gray-400 text-sm">
                  Our AI is analyzing 142 data points across all vehicle systems
                </div>
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="max-w-3xl mx-auto"
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-medium text-white">Diagnostic Results</h3>
                  <div className="text-sm text-gray-400">Vehicle Type: {carOptions.find(car => car.id === selectedCar)?.name}</div>
                </div>
                
                <div className="bg-gray-900 rounded-lg p-4 mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-white font-medium">Vehicle Health Score</div>
                    <div className="text-blue-400 font-medium">78/100</div>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3">
                    <motion.div 
                      className="h-3 rounded-full bg-gradient-to-r from-yellow-500 to-blue-500"
                      initial={{ width: "0%" }}
                      animate={{ width: "78%" }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                  </div>
                  <div className="mt-2 text-sm text-gray-400">
                    Your vehicle is in good condition with some minor issues that need attention.
                  </div>
                </div>
                
                <div className="space-y-4">
                  {diagnosticResults.map((result) => (
                    <motion.div 
                      key={result.id}
                      className={`p-4 rounded-lg bg-gray-900 border-l-4 ${
                        result.status === 'Critical' ? 'border-red-500' :
                        result.status === 'Warning' ? 'border-yellow-500' : 'border-green-500'
                      }`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: result.id * 0.2 }}
                    >
                      <div className="flex items-start">
                        <div className={`w-10 h-10 rounded-full ${result.bgColor} flex items-center justify-center flex-shrink-0`}>
                          <result.icon className={`h-5 w-5 ${result.color}`} />
                        </div>
                        <div className="ml-4 flex-1">
                          <div className="flex justify-between">
                            <h4 className="text-lg font-medium text-white">{result.system}</h4>
                            <span className={`
                              px-2.5 py-0.5 rounded-full text-xs font-medium
                              ${result.status === 'Critical' ? 'bg-red-100 text-red-800' :
                                result.status === 'Warning' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}
                            `}>
                              {result.status}
                            </span>
                          </div>
                          <p className="mt-1 text-gray-400">{result.message}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <div className="mt-8 flex justify-center space-x-4">
                  <motion.button
                    className="px-6 py-3 rounded-md font-medium bg-gray-700 text-white hover:bg-gray-600"
                    onClick={handleReset}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Try Another Vehicle
                  </motion.button>
                  <Link to="/register">
                    <motion.button
                      className="px-6 py-3 rounded-md font-medium bg-blue-600 text-white hover:bg-blue-700"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Get Full Access
                    </motion.button>
                  </Link>
                </div>
                
                <div className="mt-6 text-center text-sm text-gray-500">
                  This is a simulated demo. A real diagnostic would provide more in-depth analysis and recommendations.
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveDemoSection;