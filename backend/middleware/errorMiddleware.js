// Middleware pour gérer les routes non trouvées
// Ce middleware intercepte les requêtes vers des routes qui n'existent pas dans l'application
const notFound = (req, res, next) => {
    // Crée une nouvelle instance d'Error avec un message personnalisé incluant l'URL demandée
    const error = new Error(`Not Found - ${req.originalUrl}`)
    res.status(404) // Définit le statut de la réponse HTTP à 404
    next(error) // Passe l'erreur au prochain middleware de gestion d'erreurs
}

// Ce middleware est appelé quand une erreur est passée à `next()` dans n'importe quel middleware ou routeur
const errorHandler = (err, req, res, next) => {
    // Détermine le code de statut de la réponse. S'il est à 200 (par défaut), le change en 500
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode
    res.status(statusCode) // Applique le code de statut à la réponse
    res.json({
        message: err.message, // Inclut le message de l'erreur dans la réponse
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    })
}

export { notFound, errorHandler }
