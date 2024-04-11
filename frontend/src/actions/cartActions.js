import axios from 'axios'
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIPPING_ADDRESS, CART_SAVE_PAYMENT_METHOD } from '../constants/cartConstants.js'

// Action pour ajouter un article au panier
export const addToCart = (id, qty) => async (dispatch, getState) => {
    // Effectuer une requête GET pour obtenir les détails du produit
    const { data } = await axios.get(`https://projet-final-backend.vercel.app/api/products/${id}`)
    // Dispatch de l'action CART_ADD_ITEM avec les détails du produit et la quantité
    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            qty
        }
    })
    // Mettre à jour le panier dans le stockage local du navigateur
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

// Action pour supprimer un article du panier
export const removeFromCart = (id) => (dispatch, getState) => {
    // Dispatch de l'action CART_REMOVE_ITEM avec l'ID de l'article à supprimer
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id
    })
    // Mettre à jour le panier dans le stockage local du navigateur
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

// Action pour enregistrer l'adresse de livraison sélectionnée
export const saveShippingAddress = (data) => (dispatch) => {
    // Dispatch de l'action CART_SAVE_SHIPPING_ADDRESS avec les données de l'adresse de livraison
    dispatch({
        type: CART_SAVE_SHIPPING_ADDRESS,
        payload: data
    })
    // Mettre à jour les données de l'adresse de livraison dans le stockage local du navigateur
    localStorage.setItem('shippingAddress', JSON.stringify(data))
}

// Action pour enregistrer la méthode de paiement sélectionnée
export const savePaymentMethod = (data) => (dispatch) => {
    // Dispatch de l'action CART_SAVE_PAYMENT_METHOD avec les données de la méthode de paiement
    dispatch({
        type: CART_SAVE_PAYMENT_METHOD,
        payload: data
    })
    // Mettre à jour les données de la méthode de paiement dans le stockage local du navigateur
    localStorage.setItem('paymentMethod', JSON.stringify(data))
}
