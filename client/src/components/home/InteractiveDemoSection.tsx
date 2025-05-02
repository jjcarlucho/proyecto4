import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

const InteractiveDemoSection: React.FC = () => {
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Try Our Demo</h2>
          <p className="mt-4 text-lg text-gray-600">
            Experience how our AI diagnoses vehicle issues
          </p>
        </div>

        <div className="mt-12 max-w-lg mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="make">Vehicle Make</Label>
              <Input
                id="make"
                name="make"
                type="text"
                value={formData.make}
                onChange={handleChange}
                placeholder="e.g., Toyota"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="model">Vehicle Model</Label>
              <Input
                id="model"
                name="model"
                type="text"
                value={formData.model}
                onChange={handleChange}
                placeholder="e.g., Camry"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="year">Year</Label>
              <Input
                id="year"
                name="year"
                type="text"
                value={formData.year}
                onChange={handleChange}
                placeholder="e.g., 2020"
                className="mt-1"
              />
            </div>

            <Button type="submit" className="w-full">
              Start Demo Diagnosis
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default InteractiveDemoSection;