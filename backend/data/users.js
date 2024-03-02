import bcrypt from 'bcrypt'

// Crée un tableau contenant des données initiales pour les utilisateurs
const users = [
    {
        // Crée un compte administrateur avec des privilèges complets
        name: 'admin',
        email: 'admin@example.com', // Adresse email de l'administrateur
        password: bcrypt.hashSync('283758', 10), // Hache le mot de passe '283758' pour sécuriser le stockage
        isAdmin: true, // Marque l'utilisateur comme administrateur
    },
    {
        // Crée un compte utilisateur standard nommé Dorian Libotte
        name: 'Dorian Libotte',
        email: 'dorian@example.com',
        password: bcrypt.hashSync('274316', 10), // Hache le mot de passe '274316'
        // isAdmin est par défaut à false ou non spécifié pour un utilisateur standard
    }
]


export default users;
