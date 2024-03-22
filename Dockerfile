FROM node:latest

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers package.json et package-lock.json à la racine du répertoire de travail
COPY package*.json ./

# Installer les dépendances
RUN npm install nodemon \ && npm install

# Copier le répertoire backend au complet dans le conteneur
COPY backend/ ./
COPY .env ./
# COPY docker-compose.yml ./
# Exposer le port sur lequel votre serveur est configuré pour écouter
EXPOSE 5000

# Définir la commande pour démarrer votre application
CMD ["npm", "start"]
