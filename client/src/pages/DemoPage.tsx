import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const DemoPage: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [shopName, setShopName] = useState('');
  const [shopSize, setShopSize] = useState('');
  const [submitted, setSubmitted] = useState(false);
  
  useEffect(() => {
    document.title = 'Request Demo - AutoDiagnose AI';
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted with:', { firstName, lastName, email, phone, shopName, shopSize });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen pt-24 flex items-center">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-md text-center">
            <div className="mb-6 flex justify-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
            </div>
            <h2 className="font-heading text-2xl font-bold mb-4 text-gray-900">
              Thank You for Your Interest!
            </h2>
            <p className="text-gray-600 mb-8">
              We've received your request for a demo of AutoDiagnose AI. One of our team members will contact you within 24 hours to schedule your personalized demonstration.
            </p>
            <div className="bg-gray-50 p-4 rounded-lg mb-8">
              <h3 className="font-medium text-gray-800 mb-2">What to Expect Next:</h3>
              <ol className="text-left text-gray-600 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="font-bold min-w-[20px]">1.</span>
                  <span>Email confirmation (check your inbox)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold min-w-[20px]">2.</span>
                  <span>Call from our account executive</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold min-w-[20px]">3.</span>
                  <span>Scheduled live demonstration</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold min-w-[20px]">4.</span>
                  <span>Q&A session and next steps</span>
                </li>
              </ol>
            </div>
            <div className="flex flex-col gap-4">
              <Link to="/" className="btn btn-primary">
                Return to Home
              </Link>
              <Link to="/features" className="text-primary-800 hover:text-primary-700 font-medium">
                Explore More Features
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <span className="inline-block px-4 py-2 bg-blue-100 text-primary-800 rounded-full font-medium text-sm mb-4">Free Demo</span>
              <h1 className="heading-lg text-gray-900 mb-6">
                Experience the Power of AutoDiagnose AI
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Schedule a personalized demo to see how our AI-powered diagnostic platform can transform your repair shop operations.
              </p>
              
              <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                <h3 className="font-heading font-bold text-xl mb-4 text-gray-800">
                  What You'll See in the Demo:
                </h3>
                <ul className="space-y-3">
                  {[
                    'Live vehicle diagnostic process',
                    'Repair recommendation engine',
                    'Customer reporting features',
                    'ROI calculator for your shop',
                    'Integration with your existing tools',
                    'Admin dashboard and analytics'
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-heading font-bold text-xl mb-4 text-gray-800">
                  What Our Customers Say
                </h3>
                <blockquote className="border-l-4 border-primary-800 pl-4 mb-4">
                  <p className="text-gray-700 italic">
                    "The demo alone showed us how much time we could save. Within a week of implementing AutoDiagnose AI, we saw a 28% increase in diagnostic accuracy."
                  </p>
                  <footer className="text-gray-600 mt-2">- Michael Reynolds, Owner of Reynolds Auto Repair</footer>
                </blockquote>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="font-heading text-2xl font-bold mb-6 text-gray-800">
                Request Your Free Demo
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                      First Name*
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-primary-800 focus:border-primary-800"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name*
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-primary-800 focus:border-primary-800"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Business Email*
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-primary-800 focus:border-primary-800"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number*
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-primary-800 focus:border-primary-800"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="shopName" className="block text-sm font-medium text-gray-700 mb-1">
                    Shop Name*
                  </label>
                  <input
                    type="text"
                    id="shopName"
                    value={shopName}
                    onChange={(e) => setShopName(e.target.value)}
                    className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-primary-800 focus:border-primary-800"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="shopSize" className="block text-sm font-medium text-gray-700 mb-1">
                    Shop Size*
                  </label>
                  <select
                    id="shopSize"
                    value={shopSize}
                    onChange={(e) => setShopSize(e.target.value)}
                    className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-primary-800 focus:border-primary-800"
                    required
                  >
                    <option value="">Select shop size</option>
                    <option value="1-3">1-3 technicians</option>
                    <option value="4-10">4-10 technicians</option>
                    <option value="11-20">11-20 technicians</option>
                    <option value="21+">21+ technicians</option>
                  </select>
                </div>
                
                <div className="pt-4">
                  <button
                    type="submit"
                    className="btn btn-primary w-full"
                  >
                    Schedule My Demo
                  </button>
                  <p className="text-sm text-gray-500 mt-3 text-center">
                    By submitting this form, you agree to our{' '}
                    <Link to="/terms" className="text-primary-800 hover:underline">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link to="/privacy" className="text-primary-800 hover:underline">
                      Privacy Policy
                    </Link>
                    .
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoPage;