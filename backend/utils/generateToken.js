// Importation du module jsonwebtoken pour la gestion des JWT
import jwt from 'jsonwebtoken'

// Définition de la fonction generateToken prenant comme argument l'ID de l'utilisateur
const generateToken = (id) => {
    // Utilisation de la méthode sign de jsonwebtoken pour générer un jeton JWT
    return jwt.sign(
        // Le payload du jeton contient l'ID de l'utilisateur
        { id }, 
        // La clé secrète utilisée pour signer le jeton est récupérée à partir de la variable d'environnement JWT_SECRET
        process.env.JWT_SECRET, 
        {
            // Définition de la durée de validité du jeton (30 jours)
            expiresIn: '30d',
        }
    )
}

// Exportation de la fonction generateToken
export default generateToken
