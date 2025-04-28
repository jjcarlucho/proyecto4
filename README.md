# AutoDiagnose - Sistema de Diagnóstico Automotriz

Sistema de diagnóstico automotriz basado en IA que ayuda a talleres mecánicos a diagnosticar problemas vehiculares de manera eficiente.

## Tecnologías Utilizadas

### Frontend
- React + TypeScript
- Vite
- Redux Toolkit
- TailwindCSS + shadcn/ui
- Jest + React Testing Library

### Backend
- Node.js + Express
- TypeScript
- MongoDB + Mongoose
- JWT + bcrypt
- OpenAI API
- Stripe

## Estructura del Proyecto

```
project/
├── client/                    # Frontend React
│   ├── src/
│   │   ├── components/       # Componentes reutilizables
│   │   ├── pages/           # Páginas completas
│   │   ├── features/        # Redux slices
│   │   ├── hooks/           # Custom hooks
│   │   ├── services/        # API calls
│   │   ├── utils/           # Utilidades
│   │   ├── types/           # TypeScript types
│   │   └── layouts/         # Layouts principales
│   └── public/
├── server/                   # Backend Node.js
│   ├── src/
│   │   ├── controllers/     # Controladores
│   │   ├── models/         # Modelos MongoDB
│   │   ├── routes/         # Rutas API
│   │   ├── middleware/     # Middleware
│   │   ├── services/       # Lógica de negocio
│   │   ├── utils/          # Utilidades
│   │   └── config/         # Configuración
└── shared/                  # Código compartido
```

## Requisitos Previos

- Node.js >= 18
- MongoDB
- Cuenta de OpenAI
- Cuenta de Stripe

## Configuración

1. Clonar el repositorio:
```bash
git clone https://github.com/tu-usuario/autodiagnose.git
cd autodiagnose
```

2. Instalar dependencias:
```bash
# Instalar dependencias del frontend
cd client
npm install

# Instalar dependencias del backend
cd ../server
npm install
```

3. Configurar variables de entorno:
- Copiar `.env.example` a `.env` en la carpeta server
- Copiar `.env.example` a `.env` en la carpeta client
- Actualizar las variables con tus credenciales

4. Iniciar el desarrollo:
```bash
# Iniciar el servidor
cd server
npm run dev

# Iniciar el cliente (en otra terminal)
cd client
npm run dev
```

## Despliegue

- Frontend: Vercel
- Backend: Railway
- Base de datos: MongoDB Atlas

## Licencia

MIT 