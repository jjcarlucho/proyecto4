import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useToast } from '../ui/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { db } from '@/config/firebase';
import { addDoc, collection } from 'firebase/firestore';

interface DiagnosticFormData {
  vehicleMake: string;
  vehicleModel: string;
  vehicleYear: string;
  mileage: string;
  symptoms: string;
  checkEngineLight: 'on' | 'off' | 'flashing';
  additionalNotes: string;
}

const initialFormData: DiagnosticFormData = {
  vehicleMake: '',
  vehicleModel: '',
  vehicleYear: '',
  mileage: '',
  symptoms: '',
  checkEngineLight: 'off',
  additionalNotes: '',
};

export function DiagnosticForm() {
  const [formData, setFormData] = useState<DiagnosticFormData>(initialFormData);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      checkEngineLight: value as 'on' | 'off' | 'flashing'
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      // Add diagnostic request to Firestore
      const docRef = await addDoc(collection(db, 'diagnostics'), {
        ...formData,
        userId: user.uid,
        status: 'pending',
        createdAt: new Date().toISOString(),
      });

      toast({
        title: 'Diagnostic Request Submitted',
        description: 'We will analyze your vehicle data and provide results shortly.',
      });

      // Reset form
      setFormData(initialFormData);

      // Redirect to diagnostic details page
      window.location.href = `/diagnostics/${docRef.id}`;
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to submit diagnostic request. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Vehicle Diagnostic Request</CardTitle>
        <CardDescription>
          Enter your vehicle information and symptoms for AI-powered diagnostics
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="vehicleMake">Vehicle Make</Label>
              <Input
                id="vehicleMake"
                name="vehicleMake"
                value={formData.vehicleMake}
                onChange={handleChange}
                required
                placeholder="e.g., Toyota"
              />
            </div>

            <div>
              <Label htmlFor="vehicleModel">Vehicle Model</Label>
              <Input
                id="vehicleModel"
                name="vehicleModel"
                value={formData.vehicleModel}
                onChange={handleChange}
                required
                placeholder="e.g., Camry"
              />
            </div>

            <div>
              <Label htmlFor="vehicleYear">Year</Label>
              <Input
                id="vehicleYear"
                name="vehicleYear"
                type="number"
                min="1900"
                max={new Date().getFullYear() + 1}
                value={formData.vehicleYear}
                onChange={handleChange}
                required
                placeholder="e.g., 2020"
              />
            </div>

            <div>
              <Label htmlFor="mileage">Mileage</Label>
              <Input
                id="mileage"
                name="mileage"
                type="number"
                min="0"
                value={formData.mileage}
                onChange={handleChange}
                required
                placeholder="e.g., 50000"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="symptoms">Main Symptoms</Label>
            <Textarea
              id="symptoms"
              name="symptoms"
              value={formData.symptoms}
              onChange={handleChange}
              required
              placeholder="Describe the main issues you're experiencing with your vehicle..."
              className="h-24"
            />
          </div>

          <div>
            <Label>Check Engine Light Status</Label>
            <Select
              value={formData.checkEngineLight}
              onValueChange={handleSelectChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="off">Off</SelectItem>
                <SelectItem value="on">On</SelectItem>
                <SelectItem value="flashing">Flashing</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="additionalNotes">Additional Notes</Label>
            <Textarea
              id="additionalNotes"
              name="additionalNotes"
              value={formData.additionalNotes}
              onChange={handleChange}
              placeholder="Any additional information that might be helpful..."
              className="h-24"
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit Diagnostic Request'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
} 