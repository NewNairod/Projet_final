// Importe le module mongoose pour travailler avec MongoDB
import mongoose from 'mongoose'

// Définit le schéma de données pour une commande
const orderSchema = mongoose.Schema({
    // Référence à l'utilisateur qui a passé la commande
    user: { type: mongoose.Schema.Types.ObjectId, require: true, ref: 'User' },
    // Tableau contenant les articles commandés
    orderItems: [
        {
            name: { type: String, require: true }, // Nom de l'article
            qty: { type: Number, require: true }, // Quantité commandée
            image: { type: String, require: true }, // Image de l'article
            price: { type: Number, require: true }, // Prix de l'article
            product: { type: mongoose.Schema.Types.ObjectId, require: true, ref: 'Product' } // Référence au produit commandé
        }
    ],
    // Adresse de livraison pour la commande
    shippingAddress: {
        address: { type: String, require: true },
        city: { type: String, require: true },
        postalCode: { type: String, require: true },
        country: { type: String, require: true }
    },
    // Méthode de paiement choisie pour la commande
    paymentMethod: { type: String, require: true },
    // Résultat du paiement (par exemple, de PayPal ou d'une autre passerelle de paiement)
    paymentResult: {
        id: { type: String },
        status: { type: String },
        update_time: { type: String },
        email_address: { type: String }
    },
    // Prix des taxes appliquées à la commande
    taxPrice: { type: Number, require: true, default: 0.0 },
    // Prix de la livraison
    shippingPrice: { type: Number, require: true, default: 0 },
    // Prix total de la commande
    totalPrice: { type: Number, require: true, default: 0 },
    // Indique si la commande a été payée
    isPaid: { type: Boolean, require: true, default: false },
    // Date de paiement de la commande
    paidAt: { type: Date },
    // Indique si la commande a été livrée
    isDelivered: { type: Boolean, require: true, default: false },
    // Date de livraison de la commande
    deliveredAt: { type: Date }
}, { timestamps: true }) // Option pour ajouter automatiquement les champs createdAt et updatedAt

// Crée un modèle 'Order' en utilisant le schéma défini ci-dessus
const Order = mongoose.model('Order', orderSchema)

export default Order;
