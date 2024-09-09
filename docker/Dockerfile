# Usa una imagen de Node.js como base
FROM node:18

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de dependencias
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código
COPY . .

# Copia los certificados SSL
COPY ./certificates /app/certificates

# Construye la aplicación
RUN npm run build

# Expone el puerto 3000 para la aplicación NestJS
EXPOSE 3000

# Comando para ejecutar la aplicación en modo producción
CMD ["npm", "run", "start:prod"]
