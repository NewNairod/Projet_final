# Étape de construction
FROM node:latest as build-stage

# Définit le répertoire de travail dans le conteneur
WORKDIR /app

# Copie les fichiers package.json et package-lock.json dans le répertoire de travail
COPY package*.json ./

# Copie le fichier de configuration par défaut
COPY default.conf ./

# Installe les dépendances du projet
RUN npm install

# Copie tous les fichiers du projet dans le répertoire de travail
COPY . .

# Exécute la commande de build du projet
RUN npm run build

# Étape de production
FROM nginx as production-stage

# Copie les fichiers générés lors de l'étape de construction dans le répertoire de travail du serveur Nginx
COPY --from=build-stage /app/build /usr/share/nginx/html

# Copie le fichier de configuration personnalisé dans le répertoire de configuration de Nginx
COPY --from=build-stage /app/default.conf /etc/nginx/conf.d/

# Expose le port 80 pour que le serveur Nginx puisse recevoir des requêtes HTTP
EXPOSE 80

# Démarre le serveur Nginx en mode non démon
CMD ["nginx", "-g", "daemon off;"]