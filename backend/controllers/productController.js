import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

// getProducts : Récupère tous les produits de la base de données
const getProducts = asyncHandler(async (req, res) => {
    // Utilisation de Product.find({}) pour récupérer tous les produits sans filtre
    const products = await Product.find({})
    // Envoie la liste des produits au format JSON.
    res.json(products)
})

// getProductById : Récupère un produit spécifique par son ID
const getProductById = asyncHandler(async (req, res) => {
    // Recherche d'un produit par son ID avec Product.findById(), en utilisant l'ID passé dans l'URL
    const product = await Product.findById(req.params.id)
    if (product) {
        res.json(product);
    } else {
        // Si aucun produit n'est trouvé avec cet ID, renvoie un statut 404 (Not Found) avec un message d'erreur
        res.status(404);
        throw new Error('Produit non existant')
    }
})

export {
    getProducts,
    getProductById
}
