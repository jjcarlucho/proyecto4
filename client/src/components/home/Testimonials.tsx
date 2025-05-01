import React from 'react';

const testimonials = [
  {
    content: "AutoDiagnose ha sido una herramienta indispensable para mi taller. Nos ha permitido diagnosticar problemas de manera rápida y precisa, ahorrando tiempo y recursos.",
    author: {
      name: "Carlos Rodríguez",
      role: "Propietario de Taller Mecánico",
      imageUrl: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
    },
  },
  {
    content: "Como propietaria de un auto antiguo, siempre me preocupaba no saber qué estaba fallando. Con AutoDiagnose puedo identificar problemas antes de que empeoren, ¡ha sido un salvavidas!",
    author: {
      name: "María González",
      role: "Conductor Particular",
      imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
    },
  },
  {
    content: "Manejo una flota de vehículos para mi empresa y AutoDiagnose nos ha ayudado a reducir los costos de mantenimiento en un 30%. La anticipación de problemas es clave en nuestro negocio.",
    author: {
      name: "Javier Méndez",
      role: "Gerente de Logística",
      imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
    },
  },
];

const Testimonials: React.FC = () => {
  return (
    <section className="bg-gray-50 py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Lo que nuestros clientes dicen
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            Descubre cómo AutoDiagnose ha transformado la manera en que personas y empresas cuidan sus vehículos.
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="rounded-lg bg-white p-6 shadow-md transition-all duration-300 hover:shadow-lg"
            >
              <div className="relative">
                <svg
                  className="absolute -top-2 -left-2 h-8 w-8 text-blue-500 transform -rotate-12"
                  fill="currentColor"
                  viewBox="0 0 32 32"
                  aria-hidden="true"
                >
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>
                <p className="relative mt-4 text-gray-600">
                  {testimonial.content}
                </p>
              </div>
              <div className="mt-6 flex items-center">
                <div className="flex-shrink-0">
                  <img
                    className="h-10 w-10 rounded-full object-cover"
                    src={testimonial.author.imageUrl}
                    alt={testimonial.author.name}
                  />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">{testimonial.author.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.author.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;