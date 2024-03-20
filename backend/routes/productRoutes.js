import express from 'express'
const router = express.Router()
import { protect } from '../middleware/authMiddleware.js';
// Importation de la nouvelle fonction de contrôleur
import { getProducts, getProductById, createProduct } from '../controllers/productController.js';

router.route('/').post( protect ,createProduct).get(getProducts);
router.route('/:id').get(getProductById);

// Exportation du routeur
export default router;