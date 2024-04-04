import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import cors from 'cors';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDb from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

dotenv.config();
connectDb();

const app = express();
app.use(express.json());

// Configurez CORS avec des options, remplacez '*' par votre domaine front-end en production
app.use(cors({
    origin: 'https://projet-final-frontend.vercel.app/', // Pour des raisons de sécurité, remplacez '*' par l'URL de votre front-end
    credentials: true, // Permet les cookies/certifications cross-origin
  }));

app.get('/', (req, res) => {
    res.send('API is running');
});

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

app.use(notFound);
app.use(errorHandler);

export default app; // Exporter l'instance d'app pour utilisation dans le fichier server.js et les tests