# Imagen base
FROM node:22

# Carpeta de trabajo
WORKDIR /usr/src/app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código
COPY . .

# Build de producción
RUN npm run build

# Servir con un servidor estático ligero (serve)
RUN npm install -g serve

# Exponer puerto de frontend
EXPOSE 5174

# Comando para servir los archivos
CMD ["serve", "-s", "dist", "-l", "5174"]
