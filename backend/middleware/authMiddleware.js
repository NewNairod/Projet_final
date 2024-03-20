import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'

// Middleware pour protéger les routes
const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Extrait le token du header
            token = req.headers.authorization.split(' ')[1];

            // Décode le token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Trouve l'utilisateur correspondant à l'ID dans le token décodé
            const user = await User.findById(decoded.id).select('-password');

            if (!user) {
                return res.status(404).json({ message: "Utilisateur non trouvé avec ce token" });
            }

            // Attribue l'utilisateur à la requête et passe au middleware suivant
            req.user = user;
            next();
        } catch (error) {
            // Log pour débogage en cas d'erreur de vérification du token
            console.error('Erreur lors de la vérification du token:', error);
            return res.status(401).json({ message: `Non autorisé, échec du token avec l'erreur: ${error.message}` });
        }
    } else {
        return res.status(401).json({ message: 'Non autorisé, aucun token fourni' });
    }
});

export { protect };
