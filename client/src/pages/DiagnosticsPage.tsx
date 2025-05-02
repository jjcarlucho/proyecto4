import { useState, useEffect } from 'react';
import { DiagnosticForm } from '../components/diagnostics/DiagnosticForm';
import { useAuth } from '@/hooks/useAuth';
import { db } from '@/config/firebase';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface Diagnostic {
  id: string;
  vehicleMake: string;
  vehicleModel: string;
  vehicleYear: string;
  status: 'pending' | 'completed' | 'in_progress';
  createdAt: string;
}

export default function DiagnosticsPage() {
  const [diagnostics, setDiagnostics] = useState<Diagnostic[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDiagnostics = async () => {
      if (!user) return;

      try {
        const q = query(
          collection(db, 'diagnostics'),
          where('userId', '==', user.uid),
          orderBy('createdAt', 'desc')
        );

        const querySnapshot = await getDocs(q);
        const diagnosticsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as Diagnostic[];

        setDiagnostics(diagnosticsData);
      } catch (error) {
        console.error('Error fetching diagnostics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDiagnostics();
  }, [user]);

  const getStatusColor = (status: Diagnostic['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <div className="container mx-auto py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-3xl font-bold mb-6">New Diagnostic</h2>
          <DiagnosticForm />
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-6">Diagnostic History</h2>
          {loading ? (
            <div className="text-center py-8">Loading...</div>
          ) : diagnostics.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <p className="text-gray-500">No diagnostic history found.</p>
                <p className="text-gray-500 mt-2">
                  Submit a new diagnostic request to get started.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {diagnostics.map((diagnostic) => (
                <Card key={diagnostic.id} className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => navigate(`/diagnostics/${diagnostic.id}`)}>
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">
                          {diagnostic.vehicleMake} {diagnostic.vehicleModel} {diagnostic.vehicleYear}
                        </CardTitle>
                        <CardDescription>
                          {new Date(diagnostic.createdAt).toLocaleDateString()}
                        </CardDescription>
                      </div>
                      <Badge className={getStatusColor(diagnostic.status)}>
                        {diagnostic.status.replace('_', ' ').toUpperCase()}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full">
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 