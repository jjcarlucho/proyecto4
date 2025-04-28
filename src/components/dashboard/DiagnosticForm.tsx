import React, { useState } from 'react';
import { Search, AlertTriangle, ChevronDown } from 'lucide-react';

interface Vehicle {
  make: string;
  model: string;
  year: number;
}

interface FormData {
  vehicle: Vehicle;
  vin: string;
  symptoms: string[];
  notes: string;
}

const popularCarMakes = [
  'Toyota', 'Honda', 'Ford', 'Chevrolet', 'Nissan', 
  'BMW', 'Mercedes-Benz', 'Audi', 'Hyundai', 'Kia'
];

const commonSymptoms = [
  'Check Engine Light On', 
  'Engine Stalling', 
  'Engine Misfire',
  'Poor Fuel Economy',
  'Rough Idle',
  'Difficulty Starting',
  'Strange Noises',
  'Overheating',
  'Battery Not Charging',
  'Power Loss',
  'Transmission Slipping',
  'Brake Issues',
  'Steering Problems',
  'Abnormal Vibration'
];

const DiagnosticForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    vehicle: { make: '', model: '', year: new Date().getFullYear() },
    vin: '',
    symptoms: [],
    notes: ''
  });
  
  const [symSearch, setSymSearch] = useState('');
  const [showSymDropdown, setShowSymDropdown] = useState(false);
  
  const filteredSymptoms = commonSymptoms.filter(symptom => 
    symptom.toLowerCase().includes(symSearch.toLowerCase())
  );
  
  const addSymptom = (symptom: string) => {
    if (!formData.symptoms.includes(symptom)) {
      setFormData({
        ...formData,
        symptoms: [...formData.symptoms, symptom]
      });
    }
    setSymSearch('');
    setShowSymDropdown(false);
  };
  
  const removeSymptom = (symptom: string) => {
    setFormData({
      ...formData,
      symptoms: formData.symptoms.filter(s => s !== symptom)
    });
  };
  
  const handleVehicleChange = (field: keyof Vehicle, value: string | number) => {
    setFormData({
      ...formData,
      vehicle: {
        ...formData.vehicle,
        [field]: value
      }
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Processing form would go here
    console.log('Form submitted with data:', formData);
    alert('Diagnostic started! Processing data...');
  };
  
  const years = Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i);
  
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="font-heading text-2xl font-bold mb-6 text-gray-800">
        New Diagnostic
      </h2>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <label htmlFor="make" className="block text-sm font-medium text-gray-700 mb-1">
              Make*
            </label>
            <div className="relative">
              <select
                id="make"
                value={formData.vehicle.make}
                onChange={(e) => handleVehicleChange('make', e.target.value)}
                className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-primary-800 focus:border-primary-800"
                required
              >
                <option value="">Select Make</option>
                {popularCarMakes.map((make) => (
                  <option key={make} value={make}>
                    {make}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
            </div>
          </div>
          
          <div>
            <label htmlFor="model" className="block text-sm font-medium text-gray-700 mb-1">
              Model*
            </label>
            <input
              type="text"
              id="model"
              value={formData.vehicle.model}
              onChange={(e) => handleVehicleChange('model', e.target.value)}
              className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-primary-800 focus:border-primary-800"
              placeholder="Enter Model"
              required
            />
          </div>
          
          <div>
            <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">
              Year*
            </label>
            <div className="relative">
              <select
                id="year"
                value={formData.vehicle.year}
                onChange={(e) => handleVehicleChange('year', parseInt(e.target.value))}
                className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-primary-800 focus:border-primary-800"
                required
              >
                <option value="">Select Year</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <label htmlFor="vin" className="block text-sm font-medium text-gray-700 mb-1">
            VIN (Optional)
          </label>
          <input
            type="text"
            id="vin"
            value={formData.vin}
            onChange={(e) => setFormData({ ...formData, vin: e.target.value })}
            className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-primary-800 focus:border-primary-800"
            placeholder="Enter VIN for more accurate results"
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="symptoms" className="block text-sm font-medium text-gray-700 mb-1">
            Symptoms*
          </label>
          <div className="relative">
            <div className="flex items-center border border-gray-300 rounded-lg">
              <div className="pl-3 text-gray-400">
                <Search size={18} />
              </div>
              <input
                type="text"
                id="symptoms"
                value={symSearch}
                onChange={(e) => {
                  setSymSearch(e.target.value);
                  setShowSymDropdown(true);
                }}
                onFocus={() => setShowSymDropdown(true)}
                className="w-full py-3 px-2 border-0 focus:ring-0 rounded-lg"
                placeholder="Search for symptoms"
              />
            </div>
            
            {showSymDropdown && symSearch && (
              <div className="absolute z-10 mt-1 w-full bg-white rounded-lg shadow-lg border border-gray-200 max-h-60 overflow-auto">
                {filteredSymptoms.length > 0 ? (
                  filteredSymptoms.map((symptom) => (
                    <div
                      key={symptom}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => addSymptom(symptom)}
                    >
                      {symptom}
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-2 text-gray-500">No symptoms found</div>
                )}
              </div>
            )}
          </div>
          
          <div className="mt-3 flex flex-wrap gap-2">
            {formData.symptoms.map((symptom) => (
              <div
                key={symptom}
                className="bg-blue-100 text-primary-800 px-3 py-1 rounded-full flex items-center gap-1"
              >
                <span>{symptom}</span>
                <button
                  type="button"
                  onClick={() => removeSymptom(symptom)}
                  className="text-primary-800 hover:text-primary-600 font-bold"
                >
                  &times;
                </button>
              </div>
            ))}
            
            {formData.symptoms.length === 0 && (
              <div className="text-gray-500 italic flex items-center gap-2">
                <AlertTriangle size={16} />
                <span>Please add at least one symptom</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="mb-8">
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
            Additional Notes
          </label>
          <textarea
            id="notes"
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-primary-800 focus:border-primary-800 h-32"
            placeholder="Enter any additional information about the vehicle or issue"
          ></textarea>
        </div>
        
        <div className="flex justify-end">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={formData.symptoms.length === 0}
          >
            Start Diagnostic
          </button>
        </div>
      </form>
    </div>
  );
};

export default DiagnosticForm;