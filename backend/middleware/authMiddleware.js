import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'

// Middleware pour protéger les routes
const protect = asyncHandler(async (req, res, next) => {
    let token // Initialise une variable pour stocker le token JWT

    // Essaie de récupérer et de vérifier le token JWT de l'en-tête d'autorisation
    try {
        // Vérifie si l'en-tête d'autorisation contient un token
        if (req.headers.authorization) {
            token = req.headers.authorization // Stocke le token de l'en-tête d'autorisation
            // Décode le token pour récupérer l'ID de l'utilisateur
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            // Recherche l'utilisateur correspondant dans la base de données, sans inclure le mot de passe dans la réponse
            try {
                const user = await User.findById(decoded.id).select('-password')
                // Si l'utilisateur est trouvé, attache l'utilisateur à l'objet de requête et passe au middleware suivant
                if (user) {
                    req.user = user
                    next()
                } else {
                    // Si aucun utilisateur n'est trouvé avec ce token, renvoie une erreur 404
                    res.status(404).json({ message: "Not Found User with this token" })
                }
            } catch (error) {
                // Gère les erreurs lors de la recherche de l'utilisateur dans la base de données
                res.status(401).json({ message: `Not authorized, token failed with error => ${error.message}` })
            }
        }
    } catch (error) {
        // Gère les erreurs liées à la vérification du token JWT
        res.status(401).json({ message: `Not authorized, token failed with error => ${error.message}` })
    }
    // Si aucun token n'est fourni, renvoie une erreur 401
    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' })
    }
})

export { protect }
