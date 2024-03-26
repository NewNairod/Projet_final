import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

// getProducts : Récupère tous les produits ou filtre selon un mot-clé
const getProducts = asyncHandler(async (req, res) => {
    // Récupère le mot-clé de la requête, s'il existe
    const keyword = req.query.name
        ? {
            name: {
                $regex: req.query.name,
                $options: 'i',  // i pour case insensitive
            },
        }
        : {};
    // Utilise le mot-clé pour filtrer les produits, ou récupère tous les produits si aucun mot-clé n'est fourni
    const products = await Product.find({ ...keyword });
    // Envoie la liste des produits au format JSON
    res.json(products);
});

// getProductById : Récupère un produit spécifique par son ID
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        res.json(product);
    } else {
        res.status(404);
        throw new Error('Produit non existant');
    }
});

// createProduct : Crée un nouveau produit
const createProduct = asyncHandler(async (req, res) => {
    const { name, description, price, image, category, type, countInStock } = req.body;
    if (!req.user) {
        return res.status(401).json({ message: "Utilisateur non authentifié." });
    }
    const product = new Product({
        name,
        description,
        price,
        image,
        category,
        type,
        countInStock,
        user: req.user?._id,
    });

    try {
        const createdProduct = await product.save();
        console.log('Produit créé avec succès:', createdProduct);
        res.status(201).json(createdProduct);
    } catch (error) {
        console.error('Erreur lors de la création du produit:', error);
        res.status(500).json({ message: 'Échec de la création du produit: ' + error.message });
    }
});
export { getProducts, getProductById, createProduct };

