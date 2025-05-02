import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const EnhancedHero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="relative bg-gray-900 overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 bg-opacity-80">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/images/circuit-pattern.svg')] opacity-10"></div>
          
          {/* Animated particles */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-40"
                initial={{ 
                  x: Math.random() * 100 + "%", 
                  y: -20,
                  opacity: 0.1 + Math.random() * 0.3
                }}
                animate={{ 
                  y: "120%",
                  opacity: 0
                }}
                transition={{ 
                  duration: 10 + Math.random() * 20,
                  repeat: Infinity,
                  delay: Math.random() * 5
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="relative pt-10 pb-16 sm:pb-24">
        <main className="mt-16 sm:mt-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="lg:grid lg:grid-cols-12 lg:gap-8">
              <motion.div
                className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left"
                initial="hidden"
                animate={isVisible ? "visible" : "hidden"}
                variants={fadeIn}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h1>
                  <motion.span 
                    className="block text-sm font-semibold uppercase tracking-wide text-blue-400 sm:text-base lg:text-sm xl:text-base"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    Next-Generation Technology
                  </motion.span>
                  <motion.span 
                    className="mt-1 block text-4xl tracking-tight font-extrabold text-white sm:text-5xl xl:text-6xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.6 }}
                  >
                    <span className="block">AutoDiagnose AI</span>
                    <span className="block text-blue-300">Intelligence meets automotive care</span>
                  </motion.span>
                </h1>
                <motion.p 
                  className="mt-3 text-base text-gray-300 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  Advanced vehicle diagnostics powered by artificial intelligence. 
                  Detect problems before they become serious breakdowns and receive precise 
                  recommendations to keep your vehicle running at peak performance.
                </motion.p>
                <motion.div 
                  className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.0 }}
                >
                  <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                    <div className="rounded-md shadow">
                      <Link
                        to="/register"
                        className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10 transition-all duration-300 ease-in-out hover:scale-105"
                      >
                        Get Started
                      </Link>
                    </div>
                    <div className="mt-3 sm:mt-0 sm:ml-3">
                      <Link
                        to="/features"
                        className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 md:py-4 md:text-lg md:px-10 transition-all duration-300 ease-in-out hover:scale-105"
                      >
                        Explore Features
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
              <motion.div 
                className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <div className="relative mx-auto w-full rounded-lg shadow-xl overflow-hidden">
                  <div className="relative block w-full bg-gray-900 pt-4 pb-4 rounded-lg overflow-hidden">
                    {/* Mock diagnostic dashboard */}
                    <div className="px-4">
                      <div className="flex justify-between items-center mb-4">
                        <div className="text-white font-medium">Vehicle Status</div>
                        <div className="flex space-x-2">
                          <div className="h-3 w-3 rounded-full bg-red-500"></div>
                          <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                          <div className="h-3 w-3 rounded-full bg-green-500"></div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-2 mb-4">
                        <div className="bg-gray-800 rounded-md p-2 text-center">
                          <div className="text-xs text-gray-400">Engine</div>
                          <motion.div 
                            className="text-green-400 text-sm font-semibold"
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >Optimal</motion.div>
                        </div>
                        <div className="bg-gray-800 rounded-md p-2 text-center">
                          <div className="text-xs text-gray-400">Battery</div>
                          <motion.div 
                            className="text-yellow-400 text-sm font-semibold"
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                          >87%</motion.div>
                        </div>
                        <div className="bg-gray-800 rounded-md p-2 text-center">
                          <div className="text-xs text-gray-400">Oil</div>
                          <motion.div 
                            className="text-red-400 text-sm font-semibold"
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                          >Replace</motion.div>
                        </div>
                      </div>
                      
                      <div className="bg-gray-800 rounded-md p-3 mb-4">
                        <div className="text-xs text-gray-400 mb-1">Diagnostic Progress</div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <motion.div 
                            className="bg-blue-500 h-2 rounded-full" 
                            initial={{ width: "0%" }}
                            animate={{ width: "75%" }}
                            transition={{ duration: 2 }}
                          ></motion.div>
                        </div>
                      </div>
                      
                      <motion.div 
                        className="bg-blue-500 bg-opacity-10 border border-blue-500 rounded-md p-3 text-blue-300 text-sm"
                        animate={{ y: [0, -2, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <div className="font-medium mb-1">AI Assistant</div>
                        <div className="text-xs">Detected potential issue with oil pressure. Schedule maintenance within the next 500 miles.</div>
                      </motion.div>
                    </div>
                  </div>
                </div>
                
                {/* Decorative elements */}
                <motion.div 
                  className="absolute -top-12 -right-12 h-64 w-64 rounded-full bg-blue-500 bg-opacity-20 blur-xl"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{ duration: 6, repeat: Infinity }}
                ></motion.div>
                <motion.div 
                  className="absolute -bottom-12 -left-12 h-48 w-48 rounded-full bg-indigo-500 bg-opacity-20 blur-xl"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{ duration: 8, repeat: Infinity }}
                ></motion.div>
              </motion.div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EnhancedHero;