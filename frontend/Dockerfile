# Étape de construction
FROM node:latest as build-stage
WORKDIR /app
COPY package*.json ./
COPY default.conf ./
RUN npm install
COPY . .
RUN npm run build

# Étape de production
FROM nginx as production-stage
COPY --from=build-stage /app/build /usr/share/nginx/html
COPY --from=build-stage /app/default.conf /etc/nginx/conf.d/
# Supprimez le fichier de configuration par défaut et ajoutez le vôtre
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
