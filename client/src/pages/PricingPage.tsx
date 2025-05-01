import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';

const tiers = [
  {
    name: 'Básico',
    price: '9.99',
    description: 'Todo lo que necesitas para mantener tu vehículo en buen estado.',
    features: [
      'Diagnóstico básico de vehículos',
      'Alertas de mantenimiento',
      'Registro de 1 vehículo',
      'Historial de diagnósticos',
      'Soporte por email',
    ],
    cta: 'Comenzar gratis',
    mostPopular: false,
  },
  {
    name: 'Premium',
    price: '19.99',
    description: 'Para conductores que quieren el mejor cuidado para sus vehículos.',
    features: [
      'Diagnóstico avanzado de vehículos',
      'Alertas en tiempo real',
      'Registro de hasta 3 vehículos',
      'Historial detallado',
      'Recomendaciones personalizadas',
      'Soporte prioritario',
    ],
    cta: 'Comenzar gratis',
    mostPopular: true,
  },
  {
    name: 'Empresarial',
    price: '49.99',
    description: 'Para flotas de vehículos y negocios.',
    features: [
      'Diagnóstico para flotas',
      'Registro ilimitado de vehículos',
      'Panel de administración',
      'Reportes avanzados',
      'API de integración',
      'Soporte técnico 24/7',
    ],
    cta: 'Contactar ventas',
    mostPopular: false,
  },
];

const PricingPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Precios - AutoDiagnose AI';
  }, []);

  return (
    <div className="pt-16 pb-20">
      <div className="bg-blue-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
              Planes y Precios
            </h1>
            <p className="mt-5 max-w-xl mx-auto text-xl text-blue-100">
              Elige el plan que mejor se adapte a tus necesidades y comienza a cuidar tu vehículo hoy mismo.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-base font-semibold leading-7 text-blue-600">Precios</h2>
            <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Planes para todos los conductores
            </p>
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600">
            Todos nuestros planes incluyen una prueba gratuita de 14 días. Sin compromisos, puedes cancelar en cualquier momento.
          </p>
          <div className="mt-16 grid grid-cols-1 gap-y-8 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-8 lg:grid-cols-3 lg:gap-x-8">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`rounded-3xl p-8 ring-1 ${
                  tier.mostPopular
                    ? 'ring-2 ring-blue-600 shadow-xl'
                    : 'ring-gray-200'
                } ${tier.mostPopular ? 'shadow-blue-900/10' : ''}`}
              >
                {tier.mostPopular && (
                  <div className="mb-6">
                    <span className="inline-flex rounded-full bg-blue-600/10 px-3 py-1 text-sm font-semibold leading-6 text-blue-600 ring-1 ring-inset ring-blue-600/10">
                      Más popular
                    </span>
                  </div>
                )}
                <div className="flex items-baseline gap-x-1">
                  <span className="text-4xl font-bold tracking-tight text-gray-900">
                    ${tier.price}
                  </span>
                  <span className="text-sm font-semibold leading-6 text-gray-600">
                    /mes
                  </span>
                </div>
                <h3 className="mt-3 text-2xl font-bold tracking-tight text-gray-900">
                  {tier.name}
                </h3>
                <p className="mt-2 text-base leading-7 text-gray-600">
                  {tier.description}
                </p>
                <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-600">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <Check className="h-6 w-5 flex-none text-blue-600" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  to={tier.name === 'Empresarial' ? '/contacto' : '/register'}
                  className={`mt-8 block w-full rounded-md py-3 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 
                    ${
                      tier.mostPopular
                        ? 'bg-blue-600 text-white shadow hover:bg-blue-500 focus-visible:outline-blue-600'
                        : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                    }`}
                >
                  {tier.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Preguntas frecuentes
            </h2>
          </div>
          <div className="mt-12 space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-gray-900">¿Cómo funciona la prueba gratuita?</h3>
              <p className="mt-2 text-base text-gray-500">
                Todos nuestros planes incluyen una prueba gratuita de 14 días. No necesitas proporcionar información de pago para comenzar. Puedes cancelar en cualquier momento antes de que finalice la prueba.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-gray-900">¿Puedo cambiar de plan?</h3>
              <p className="mt-2 text-base text-gray-500">
                Sí, puedes actualizar o cambiar tu plan en cualquier momento. Los cambios se aplican inmediatamente y ajustamos el costo de forma proporcional.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-gray-900">¿Qué métodos de pago aceptan?</h3>
              <p className="mt-2 text-base text-gray-500">
                Aceptamos todas las tarjetas de crédito principales (Visa, Mastercard, American Express), PayPal y transferencias bancarias para planes empresariales.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;