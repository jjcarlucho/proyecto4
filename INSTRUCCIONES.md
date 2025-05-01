# Instrucciones para Ejecutar AutoDiagnose AI

## Introducción

Este documento proporciona instrucciones detalladas para configurar y ejecutar la aplicación AutoDiagnose AI en tu entorno local. La aplicación consta de dos partes principales:

1. **Backend (Server)**: API REST desarrollada con Node.js, Express y MongoDB.
2. **Frontend (Client)**: Interfaz de usuario desarrollada con React, TypeScript y Tailwind CSS.

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (versión 18 o superior)
- **npm** (generalmente se instala con Node.js)
- **MongoDB** (instalado y ejecutándose en tu sistema)

## Pasos para la Instalación

### 1. Configuración Inicial

1. Descomprime el archivo del proyecto o clónalo desde el repositorio.
2. Abre una terminal en la carpeta raíz del proyecto (`project-4`).

### 2. Configuración del Backend (Server)

1. Navega a la carpeta del servidor:
   ```bash
   cd server
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Crea un archivo `.env` en la carpeta `server` con el siguiente contenido:
   ```
   PORT=5001
   MONGODB_URI=mongodb://localhost:27017/autodiagnose
   JWT_SECRET=tu_secreto_jwt_super_seguro
   NODE_ENV=development
   ```

4. Inicia el servidor:
   ```bash
   npm run dev
   ```
   El servidor debería estar ejecutándose en `http://localhost:5001`.

### 3. Configuración del Frontend (Client)

1. Abre una nueva terminal y navega a la carpeta del cliente:
   ```bash
   cd client
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Crea un archivo `.env` en la carpeta `client` con el siguiente contenido:
   ```
   VITE_API_URL=http://localhost:5000/api
   ```

4. Inicia el cliente:
   ```bash
   npm run dev
   ```
   La aplicación debería estar disponible en `http://localhost:5173`.

### 4. Uso del Script de Inicio Automático

Para mayor comodidad, hemos creado un script que automatiza el proceso de instalación e inicio de la aplicación:

1. Abre una terminal en la carpeta raíz del proyecto (`project-4`).
2. Haz el script ejecutable (solo sistemas Unix/Mac):
   ```bash
   chmod +x start.sh
   ```
3. Ejecuta el script:
   ```bash
   ./start.sh
   ```
   El script verificará los requisitos, instalará las dependencias y iniciará tanto el servidor como el cliente.

## Acceso a la Aplicación

Una vez que tanto el servidor como el cliente estén ejecutándose:

1. Abre tu navegador web y accede a `http://localhost:5173`
2. Crea una nueva cuenta a través de la página de registro
3. Inicia sesión con tus credenciales
4. ¡Comienza a usar AutoDiagnose AI!

## Recorrido por la Aplicación

1. **Página de Inicio**: Información general sobre AutoDiagnose AI
2. **Registro/Login**: Crea una cuenta o inicia sesión
3. **Dashboard**: Panel principal con resumen de actividad
4. **Vehículos**: Gestiona los vehículos registrados
   - Agrega un nuevo vehículo
   - Edita o elimina vehículos existentes
5. **Diagnósticos**: Realiza y consulta diagnósticos
   - Inicia un nuevo diagnóstico seleccionando un vehículo
   - Consulta el historial de diagnósticos
   - Visualiza detalles y recomendaciones

## Solución de Problemas Comunes

### El servidor no se inicia

- Verifica que MongoDB esté instalado y ejecutándose
- Comprueba que el puerto 5000 esté disponible
- Revisa los logs para identificar posibles errores

### El cliente no se conecta al servidor

- Asegúrate de que el servidor esté ejecutándose
- Verifica que el archivo `.env` del cliente tenga la URL correcta
- Comprueba la consola del navegador para errores

### Errores de Dependencias

Si encuentras errores relacionados con dependencias faltantes:

```bash
npm install --force
```

## Contacto y Soporte

Si necesitas ayuda adicional, contacta a:

- Email: soporte@autodiagnose.com
- Teléfono: +1 555 123 4567

---

¡Gracias por usar AutoDiagnose AI! Esperamos que disfrutes de la aplicación.
