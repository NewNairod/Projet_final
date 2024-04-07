import express from 'express';
import User from '../models/userModel.js'; // Importation du modèle User
import { protect } from '../middleware/authMiddleware.js';
import {authUser, getUserProfile, registerUser, updateUserProfile} from '../controllers/userController.js';

const router = express.Router(); // Importe les fonctions de contrôleur pour gérer l'authentification, la création de profil et la mise à jour de profil utilisateur
// Définit les routes et les méthodes associées
router.route('/').post(registerUser); // Route pour l'inscription d'un nouvel utilisateur
router.route('/login').post(authUser); // Route pour l'authentification de l'utilisateur
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile); // Routes pour afficher et mettre à jour le profil de l'utilisateur
// Route pour ajouter un produit aux favoris de l'utilisateur
router.put('/favorites/add', protect, async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user && !user.favorites.includes(req.body.productId)) {
        user.favorites.push(req.body.productId);
        await user.save();
        res.json({ message: 'Produit ajouté aux favoris' });
    } else {
        res.status(404).send('Utilisateur non trouvé ou produit déjà en favoris');
    }
});
// Route pour retirer un produit des favoris de l'utilisateur
router.put('/favorites/remove', protect, async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user && user.favorites.includes(req.body.productId)) {
        user.favorites.pull(req.body.productId);
        await user.save();
        res.json({ message: 'Produit retiré des favoris' });
    } else {
        res.status(404).send('Utilisateur non trouvé ou produit non en favoris');
    }
});
// Route pour afficher les favoris de l'utilisateur
router.get('/favorites', protect, async (req, res) => {
    const user = await User.findById(req.user._id).populate('favorites');
    if (user) {
        res.json(user.favorites);
    } else {
        res.status(404).send('Utilisateur non trouvé');
    }
});
export default router;
