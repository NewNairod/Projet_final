// Importation des modules nécessaires
import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import { notFound, errorHandler } from './middleware/errorMiddleware.js' // Importation de middleware personnalisé pour la gestion des erreurs
import connectDb from './config/db.js' // Importation du module pour la connexion à la base de données

// Importation des routes définies dans des fichiers séparés
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'

// Configuration des variables d'environnement à partir du fichier .env
dotenv.config()

// Connexion à la base de données MongoDB
connectDb();

// Création d'une instance de l'application Express
const app = express()

// Utilisation de JSON comme format de données pour les requêtes HTTP
app.use(express.json())

// Route de base pour vérifier le bon fonctionnement de l'API
app.get('/', (req, res) => {
    res.send('API is running');
})

app.use((req, res, next) => {
    next();
  });

// Utilisation des routes définies pour les produits, les utilisateurs et les commandes
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)

// Middleware pour gérer les erreurs 404 (Not Found)
app.use(notFound)

// Middleware pour gérer les erreurs
app.use(errorHandler)

// Définition du port sur lequel le serveur écoute les requêtes, en utilisant une valeur par défaut de 5000
const PORT = process.env.PORT || 5000

// Démarrage du serveur Express et écoute des requêtes sur le port spécifié
app.listen(PORT, console.log(`server run on http://localhost:${PORT}`.yellow.bold))
