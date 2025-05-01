# AutoDiagnose AI

![AutoDiagnose AI Logo](https://via.placeholder.com/150x50?text=AutoDiagnose+AI)

Aplicación web para diagnóstico automático de vehículos desarrollada con el stack MERN (MongoDB, Express, React, Node.js).

## Características

- Autenticación de usuarios (registro, inicio de sesión)
- Panel de administración
- Diagnóstico automático de vehículos
- Gestión de múltiples vehículos
- Historial de diagnósticos
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
git clone https://github.com/jonathancarlucho/autodiagnose.git
cd autodiagnose
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
   - Crear archivo `.env` en la carpeta del cliente con:
   ```
   VITE_API_URL=http://localhost:5001/api
   ```
   - Crear archivo `.env` en la carpeta del servidor con:
   ```
   PORT=5001
   MONGODB_URI=mongodb://localhost:27017/autodiagnose
   JWT_SECRET=tu_secreto_jwt_super_seguro
   NODE_ENV=development
   ```

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
autodiagnose/
├── client/                 # Frontend React
│   ├── src/
│   │   ├── components/     # Componentes React
│   │   ├── pages/          # Páginas de la aplicación
│   │   ├── store/          # Estado global (Redux)
│   │   ├── hooks/          # Hooks personalizados
│   │   ├── lib/            # Utilidades
│   │   └── types/          # Tipos TypeScript
│   └── ...
├── server/                 # Backend Node.js
│   ├── src/
│   │   ├── controllers/    # Controladores
│   │   ├── models/         # Modelos MongoDB
│   │   ├── routes/         # Rutas API
│   │   ├── middleware/     # Middleware
│   │   └── config/         # Configuración
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
- `npm run build`: Compila TypeScript a JavaScript

## API Endpoints

### Autenticación
- POST /api/auth/register - Registrar nuevo usuario
- POST /api/auth/login - Iniciar sesión

### Usuarios
- GET /api/users/profile - Obtener perfil del usuario
- PUT /api/users/profile - Actualizar perfil del usuario

### Vehículos
- GET /api/vehicles - Obtener todos los vehículos del usuario
- GET /api/vehicles/:id - Obtener un vehículo por ID
- POST /api/vehicles - Crear un nuevo vehículo
- PUT /api/vehicles/:id - Actualizar un vehículo
- DELETE /api/vehicles/:id - Eliminar un vehículo

### Diagnósticos
- GET /api/diagnostics - Obtener todos los diagnósticos del usuario
- GET /api/diagnostics/:id - Obtener un diagnóstico por ID
- POST /api/diagnostics/start - Iniciar un nuevo diagnóstico
- GET /api/diagnostics/vehicle/:vehicleId - Obtener diagnósticos de un vehículo

## Flujo de Trabajo Recomendado

1. Registrarse como usuario
2. Iniciar sesión
3. Agregar uno o más vehículos 
4. Iniciar un diagnóstico para un vehículo
5. Ver los resultados del diagnóstico y las recomendaciones
6. Consultar el historial de diagnósticos

## Capturas de Pantalla

(Próximamente)

## Despliegue

### Cliente (Frontend)
El frontend puede ser desplegado en servicios como:
- Vercel
- Netlify
- GitHub Pages

### Servidor (Backend)
El backend puede ser desplegado en servicios como:
- Heroku
- DigitalOcean
- AWS EC2
- Render

## Licencia

Este proyecto está bajo la Licencia MIT.

## Autor

Jonathan Carlucho

## Contribución

1. Fork el proyecto
2. Crea tu rama de características (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request
