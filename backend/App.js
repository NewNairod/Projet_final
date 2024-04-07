import express from 'express'; // Importe Express, un framework pour construire des applications web avec Node.js
import dotenv from 'dotenv'; // Importe le module dotenv pour charger les variables d'environnement à partir d'un fichier .env
import colors from 'colors'; // Importe le module colors pour colorer les messages de console
import cors from 'cors'; // Importe le module CORS pour gérer les requêtes cross-origin
import { notFound, errorHandler } from './middleware/errorMiddleware.js'; // Importe les middlewares de gestion des erreurs personnalisés
import connectDb from './config/db.js'; // Importe la fonction de connexion à la base de données MongoDB
import productRoutes from './routes/productRoutes.js'; // Importe les routes liées aux produits
import userRoutes from './routes/userRoutes.js'; // Importe les routes liées aux utilisateurs
import orderRoutes from './routes/orderRoutes.js'; // Importe les routes liées aux commandes

dotenv.config(); // Charge les variables d'environnement à partir du fichier .env
connectDb(); // Connecte l'application à la base de données MongoDB

const app = express(); // Crée une instance d'application Express

app.use(express.json()); // Utilise le middleware express.json pour parser les corps de requête au format JSON

// Configuration de CORS avec des options
app.use(cors({
    origin: 'https://goodies-for-mangas.vercel.app', // Définit l'origine autorisée pour les requêtes cross-origin
    credentials: true, // Permet les cookies/certifications cross-origin
}));

// Définit une route pour la page d'accueil de l'API
app.get('/', (req, res) => {
    res.send('API is running'); // Répond avec un message indiquant que l'API fonctionne
});

// Utilise les routes définies pour les produits, les utilisateurs et les commandes
app.use('/api/products', productRoutes); // Associe les routes liées aux produits à l'URL /api/products
app.use('/api/users', userRoutes); // Associe les routes liées aux utilisateurs à l'URL /api/users
app.use('/api/orders', orderRoutes); // Associe les routes liées aux commandes à l'URL /api/orders

app.use(notFound); // Utilise le middleware de gestion des routes non trouvées
app.use(errorHandler); // Utilise le middleware de gestion des erreurs

export default app; // Exporte l'instance d'application pour être utilisée dans d'autres fichiers, comme server.js et les tests
