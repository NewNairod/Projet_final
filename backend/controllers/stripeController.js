// Importez la bibliothèque Stripe et initialisez-la avec votre clé secrète de Stripe
import Stripe from 'stripe';
import dotenv from 'dotenv';

// Charge les variables d'environnement à partir du fichier .env
dotenv.config();

// Créez une instance de Stripe en utilisant votre clé secrète stockée dans les variables d'environnement
const stripe = new Stripe(process.env.STRIPE_SECRET);

// Définit un gestionnaire asynchrone pour créer une intention de paiement
export const handlePaymentIntent = async (req, res) => {
  try {
    // Récupère le montant de la requête, qui doit être passé dans le corps de la requête
    const { amount } = req.body;

    // Crée une nouvelle intention de paiement en utilisant l'API Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount, // Le montant de l'intention de paiement
      currency: 'eur', // La devise, ici en euros
    });

    // Envoie le secret client comme réponse, qui sera utilisé par le frontend pour finaliser le paiement
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    // Gère les erreurs éventuelles en renvoyant un statut d'erreur 400 et le message d'erreur
    res.status(400).send({ error: error.message });
  }
};
