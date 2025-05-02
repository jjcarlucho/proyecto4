import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { db } from '@/config/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, AlertTriangle, CheckCircle2, Clock } from 'lucide-react';

interface DiagnosticDetail {
  id: string;
  vehicleMake: string;
  vehicleModel: string;
  vehicleYear: string;
  mileage: string;
  symptoms: string;
  checkEngineLight: 'on' | 'off' | 'flashing';
  additionalNotes: string;
  status: 'pending' | 'completed' | 'in_progress';
  createdAt: string;
  results?: {
    summary: string;
    possibleCauses: string[];
    recommendations: string[];
    estimatedCost: {
      min: number;
      max: number;
    };
    urgency: 'low' | 'medium' | 'high';
    additionalTests?: string[];
  };
}

export default function DiagnosticDetailPage() {
  const [diagnostic, setDiagnostic] = useState<DiagnosticDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDiagnostic = async () => {
      if (!user || !id) return;

      try {
        const docRef = doc(db, 'diagnostics', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setDiagnostic({
            id: docSnap.id,
            ...docSnap.data(),
          } as DiagnosticDetail);
        }
      } catch (error) {
        console.error('Error fetching diagnostic:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDiagnostic();
  }, [id, user]);

  const getStatusIcon = (status: DiagnosticDetail['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-6 w-6 text-green-500" />;
      case 'in_progress':
        return <Clock className="h-6 w-6 text-blue-500" />;
      default:
        return <AlertTriangle className="h-6 w-6 text-yellow-500" />;
    }
  };

  const getStatusColor = (status: DiagnosticDetail['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high':
        return 'text-red-600';
      case 'medium':
        return 'text-yellow-600';
      default:
        return 'text-green-600';
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto py-10">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (!diagnostic) {
    return (
      <div className="container mx-auto py-10">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Diagnostic not found</h2>
          <p className="mt-2 text-gray-600">
            The diagnostic you're looking for doesn't exist or you don't have permission to view it.
          </p>
          <Button onClick={() => navigate('/diagnostics')} className="mt-4">
            Back to Diagnostics
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <Button
        variant="outline"
        className="mb-6"
        onClick={() => navigate('/diagnostics')}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Diagnostics
      </Button>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl">
                  {diagnostic.vehicleMake} {diagnostic.vehicleModel} {diagnostic.vehicleYear}
                </CardTitle>
                <CardDescription>
                  Submitted on {new Date(diagnostic.createdAt).toLocaleDateString()}
                </CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                {getStatusIcon(diagnostic.status)}
                <Badge className={getStatusColor(diagnostic.status)}>
                  {diagnostic.status.replace('_', ' ').toUpperCase()}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              <div>
                <h3 className="font-semibold mb-2">Vehicle Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Mileage</p>
                    <p>{diagnostic.mileage} miles</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Check Engine Light</p>
                    <p className="capitalize">{diagnostic.checkEngineLight}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Reported Symptoms</h3>
                <p className="text-gray-700">{diagnostic.symptoms}</p>
              </div>

              {diagnostic.additionalNotes && (
                <div>
                  <h3 className="font-semibold mb-2">Additional Notes</h3>
                  <p className="text-gray-700">{diagnostic.additionalNotes}</p>
                </div>
              )}

              {diagnostic.results && (
                <>
                  <div className="border-t pt-6">
                    <h3 className="text-xl font-semibold mb-4">Diagnostic Results</h3>
                    
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-medium mb-2">Summary</h4>
                        <p className="text-gray-700">{diagnostic.results.summary}</p>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">Possible Causes</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          {diagnostic.results.possibleCauses.map((cause, index) => (
                            <li key={index} className="text-gray-700">{cause}</li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">Recommendations</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          {diagnostic.results.recommendations.map((rec, index) => (
                            <li key={index} className="text-gray-700">{rec}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium mb-2">Estimated Cost</h4>
                          <p className="text-gray-700">
                            ${diagnostic.results.estimatedCost.min} - ${diagnostic.results.estimatedCost.max}
                          </p>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">Urgency</h4>
                          <p className={`font-medium capitalize ${getUrgencyColor(diagnostic.results.urgency)}`}>
                            {diagnostic.results.urgency}
                          </p>
                        </div>
                      </div>

                      {diagnostic.results.additionalTests && (
                        <div>
                          <h4 className="font-medium mb-2">Recommended Additional Tests</h4>
                          <ul className="list-disc pl-5 space-y-1">
                            {diagnostic.results.additionalTests.map((test, index) => (
                              <li key={index} className="text-gray-700">{test}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-end space-x-4">
                    <Button variant="outline">Download Report</Button>
                    <Button>Schedule Repair</Button>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 