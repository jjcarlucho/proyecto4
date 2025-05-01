import React from 'react';
import { 
  Shield, 
  ClipboardList, 
  AlertTriangle, 
  Bell, 
  BarChart2, 
  Smartphone 
} from 'lucide-react';

const features = [
  {
    name: 'Diagnóstico Automático',
    description: 'Diagnóstico completo de tu vehículo con tecnología de inteligencia artificial que detecta problemas con precisión.',
    icon: ClipboardList,
  },
  {
    name: 'Alertas Preventivas',
    description: 'Recibe alertas tempranas sobre posibles problemas antes de que se conviertan en averías graves.',
    icon: AlertTriangle,
  },
  {
    name: 'Notificaciones en tiempo real',
    description: 'Mantente informado sobre el estado de tu vehículo con notificaciones instantáneas en tu dispositivo.',
    icon: Bell,
  },
  {
    name: 'Mantenimiento Predictivo',
    description: 'Recomendaciones personalizadas para mantenimiento basadas en el historial y uso de tu vehículo.',
    icon: Shield,
  },
  {
    name: 'Estadísticas y Análisis',
    description: 'Visualiza tendencias, costos y rendimiento de tu vehículo con gráficos detallados.',
    icon: BarChart2,
  },
  {
    name: 'Acceso Móvil',
    description: 'Accede a toda la información de tu vehículo desde cualquier dispositivo, en cualquier momento.',
    icon: Smartphone,
  },
];

const Features: React.FC = () => {
  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Características</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Diagnóstico inteligente para tu vehículo
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            AutoDiagnose AI combina tecnología de punta con inteligencia artificial para ofrecerte el mejor servicio de diagnóstico automático.
          </p>
        </div>

        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            {features.map((feature) => (
              <div key={feature.name} className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{feature.name}</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default Features;