#!/bin/bash

# Colores para mejor legibilidad
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}=========================================${NC}"
echo -e "${BLUE}   Iniciando AutoDiagnose AI            ${NC}"
echo -e "${BLUE}=========================================${NC}"

# Verificar si MongoDB está instalado
echo -e "${GREEN}Verificando MongoDB...${NC}"
if command -v mongod &> /dev/null; then
    echo -e "${GREEN}MongoDB está instalado.${NC}"
else
    echo -e "${RED}MongoDB no está instalado. Por favor, instálalo antes de continuar.${NC}"
    exit 1
fi

# Verificar si Node.js está instalado
echo -e "${GREEN}Verificando Node.js...${NC}"
if command -v node &> /dev/null; then
    NODE_VERSION=$(node -v)
    echo -e "${GREEN}Node.js $NODE_VERSION está instalado.${NC}"
else
    echo -e "${RED}Node.js no está instalado. Por favor, instálalo antes de continuar.${NC}"
    exit 1
fi

# Verificar si npm está instalado
echo -e "${GREEN}Verificando npm...${NC}"
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm -v)
    echo -e "${GREEN}npm $NPM_VERSION está instalado.${NC}"
else
    echo -e "${RED}npm no está instalado. Por favor, instálalo antes de continuar.${NC}"
    exit 1
fi

# Instalar dependencias del servidor
echo -e "${GREEN}Instalando dependencias del servidor...${NC}"
cd server
npm install

# Instalar dependencias del cliente
echo -e "${GREEN}Instalando dependencias del cliente...${NC}"
cd ../client
npm install

# Verificar archivos de entorno
echo -e "${GREEN}Verificando archivos de entorno...${NC}"

# Archivo .env del servidor
if [ ! -f "../server/.env" ]; then
    echo -e "${BLUE}Creando archivo .env para el servidor...${NC}"
    echo "PORT=5000
MONGODB_URI=mongodb://localhost:27017/autodiagnose
JWT_SECRET=tu_secreto_jwt_super_seguro
NODE_ENV=development" > "../server/.env"
    echo -e "${GREEN}Archivo .env del servidor creado.${NC}"
else
    echo -e "${GREEN}Archivo .env del servidor ya existe.${NC}"
fi

# Archivo .env del cliente
if [ ! -f ".env" ]; then
    echo -e "${BLUE}Creando archivo .env para el cliente...${NC}"
    echo "VITE_API_URL=http://localhost:5000/api" > ".env"
    echo -e "${GREEN}Archivo .env del cliente creado.${NC}"
else
    echo -e "${GREEN}Archivo .env del cliente ya existe.${NC}"
fi

# Iniciar servidor y cliente en terminales separadas
echo -e "${BLUE}=========================================${NC}"
echo -e "${BLUE}   Iniciando servidor y cliente          ${NC}"
echo -e "${BLUE}=========================================${NC}"

# En sistemas basados en Unix (Mac/Linux)
if [[ "$OSTYPE" == "darwin"* || "$OSTYPE" == "linux-gnu"* ]]; then
    echo -e "${GREEN}Iniciando servidor...${NC}"
    cd ../server
    gnome-terminal -- npm run dev &
    # Alternativa para Mac
    if [[ "$OSTYPE" == "darwin"* ]]; then
        open -a Terminal.app npm run dev
    fi
    
    echo -e "${GREEN}Iniciando cliente...${NC}"
    cd ../client
    gnome-terminal -- npm run dev &
    # Alternativa para Mac
    if [[ "$OSTYPE" == "darwin"* ]]; then
        open -a Terminal.app npm run dev
    fi
# En sistemas Windows
elif [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
    echo -e "${GREEN}Iniciando servidor...${NC}"
    cd ../server
    start cmd /k npm run dev
    
    echo -e "${GREEN}Iniciando cliente...${NC}"
    cd ../client
    start cmd /k npm run dev
else
    echo -e "${RED}Sistema operativo no reconocido.${NC}"
    echo -e "${RED}Por favor, inicia manualmente el servidor y el cliente:${NC}"
    echo -e "${BLUE}Servidor: cd server && npm run dev${NC}"
    echo -e "${BLUE}Cliente: cd client && npm run dev${NC}"
fi

echo -e "${BLUE}=========================================${NC}"
echo -e "${GREEN}AutoDiagnose AI iniciado correctamente${NC}"
echo -e "${GREEN}Servidor: http://localhost:5000${NC}"
echo -e "${GREEN}Cliente: http://localhost:5173${NC}"
echo -e "${BLUE}=========================================${NC}"
