// Importe le gestionnaire asynchrone et le modèle de commande
import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'
// Ajoute des éléments à une commande et création d'une nouvelle commande avec les informations.
const addOrderItems = asyncHandler(async (req, res) => {
    // Destructuration pour extraire les données nécessaires.
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    } = req.body
    // Vérifie si la commande contient des articles
    if (orderItems && orderItems.length === 0) {
        // Si aucun article n'est présent, renvoie une erreur 400 (Bad Request)
        res.status(400)
        throw new Error('No order items')
    } else {
        try {
            // Crée un objet commande avec les informations reçues et l'identifiant de l'utilisateur
            const order = new Order({
                orderItems,
                user: req.user._id,
                shippingAddress,
                paymentMethod,
                itemsPrice,
                taxPrice,
                shippingPrice,
                totalPrice
            })            
            const createdOrder = await order.save()// Enregistre la commande dans MongoDB
            // Renvoie la commande créée avec un statut 201 (Created)
            res.status(201).json(createdOrder)
        } catch (error) {
            // En cas d'erreur lors de la création, renvoie une erreur 500 (Internal Server Error)
            res.status(500)
            throw new Error(`error lors de la creation de la commande ${error.message}`)
        }
    }
})
export { addOrderItems }
