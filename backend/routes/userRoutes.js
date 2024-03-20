import express from 'express';
import User from '../models/userModel.js'; // Importation du modèle User
import { protect } from '../middleware/authMiddleware.js';
import {
    authUser, getUserProfile, registerUser, updateUserProfile
} from '../controllers/userController.js';

const router = express.Router();

router.route('/').post(registerUser);
router.route('/login').post(authUser);
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);

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

router.get('/favorites', protect, async (req, res) => {
    const user = await User.findById(req.user._id).populate('favorites');
    if (user) {
        res.json(user.favorites);
    } else {
        res.status(404).send('Utilisateur non trouvé');
    }
});

export default router;
