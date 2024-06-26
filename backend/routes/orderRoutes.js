// Importation du module express et création d'un routeur express
import express from 'express'
import { handlePaymentIntent } from '../controllers/stripeController.js';
const router = express.Router()

// Importation du middleware de protection pour vérifier l'authentification de l'utilisateur
import { protect } from '../middleware/authMiddleware.js'

// Importation des fonctions de contrôleur pour les commandes
import {
    addOrderItems
} from '../controllers/orderController.js'

// Définition de la route pour l'ajout d'éléments de commande
router.route('/').post(protect, addOrderItems)

router.post('/create-payment-intent', handlePaymentIntent);

// Exportation du routeur
export default router
