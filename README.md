# AutoDiagnose

Aplicación web para diagnóstico automático de vehículos desarrollada con el stack MERN (MongoDB, Express, React, Node.js).

## Características

- Autenticación de usuarios
- Panel de administración
- Diagnóstico automático de vehículos
- Reportes detallados
- Interfaz moderna y responsive

## Tecnologías Utilizadas

### Frontend
- React 18
- TypeScript
- Redux Toolkit
- shadcn/ui
- Tailwind CSS
- Vite
- React Router DOM
- Axios
- React Hook Form

### Backend
- Node.js
- Express
- MongoDB
- JWT
- bcrypt

## Requisitos Previos

- Node.js >= 18
- MongoDB
- npm o yarn

## Instalación

1. Clonar el repositorio:
```bash
git clone https://github.com/jjcarlucho/proyecto4.git
cd proyecto4
```

2. Instalar dependencias del cliente:
```bash
cd client
npm install
```

3. Instalar dependencias del servidor:
```bash
cd ../server
npm install
```

4. Configurar variables de entorno:
   - Crear archivo `.env` en la carpeta del cliente
   - Crear archivo `.env` en la carpeta del servidor

5. Iniciar el servidor de desarrollo:

Cliente:
```bash
cd client
npm run dev
```

Servidor:
```bash
cd server
npm run dev
```

## Estructura del Proyecto

```
proyecto4/
├── client/                 # Frontend React
│   ├── src/
│   │   ├── components/    # Componentes React
│   │   ├── pages/        # Páginas de la aplicación
│   │   ├── store/        # Estado global (Redux)
│   │   ├── styles/       # Estilos globales
│   │   └── utils/        # Utilidades
│   └── ...
├── server/                # Backend Node.js
│   ├── src/
│   │   ├── controllers/  # Controladores
│   │   ├── models/       # Modelos MongoDB
│   │   ├── routes/       # Rutas API
│   │   └── middleware/   # Middleware
│   └── ...
└── README.md
```

## Scripts Disponibles

### Cliente

- `npm run dev`: Inicia el servidor de desarrollo
- `npm run build`: Construye la aplicación para producción
- `npm run preview`: Vista previa de la build de producción
- `npm run test`: Ejecuta los tests

### Servidor

- `npm run dev`: Inicia el servidor en modo desarrollo
- `npm run start`: Inicia el servidor en modo producción
- `npm run test`: Ejecuta los tests

## Variables de Entorno

### Cliente (.env)
```
VITE_API_URL=http://localhost:5000/api
```

### Servidor (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/autodiagnose
JWT_SECRET=your_jwt_secret
NODE_ENV=development
```

## API Endpoints

### Autenticación
- POST /api/auth/register
- POST /api/auth/login
- POST /api/auth/logout

### Usuarios
- GET /api/users/profile
- PUT /api/users/profile
- PUT /api/users/change-password

## Contribución

1. Fork el proyecto
2. Crea tu rama de características (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Autor

Jonathan Carlucho

## Licencia

Este proyecto está bajo la Licencia MIT. 