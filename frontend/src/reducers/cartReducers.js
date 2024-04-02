import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING_ADDRESS, CART_RESET } from '../constants/cartConstants.js'
// Définition du reducer cartReducer
export const cartReducer = (state = { cartItems: [], shippingAddress: {} }, action) => {
    switch (action.type) {
        // Gestion de l'ajout d'un article au panier
        case CART_ADD_ITEM:
            const item = action.payload
            // Vérifier si l'article existe déjà dans le panier
            const existItem = state.cartItems.find(x => x.product === item.product)
            if (existItem) {
                // Mettre à jour la quantité de l'article si déjà présent dans le panier
                return {
                    ...state,
                    cartItems: state.cartItems.map(x => x.product === existItem.product ? item : x)
                }
            } else {
                // Ajouter l'article au panier s'il n'existe pas déjà
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }
        // Gestion de la suppression d'un article du panier
        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter((x) => x.product !== action.payload)
            }
        // Gestion de l'enregistrement de l'adresse de livraison
        case CART_SAVE_SHIPPING_ADDRESS:
            return {
                ...state,
                shippingAddress: action.payload
            }
        // Gestion de l'enregistrement du mode de paiement
        case CART_SAVE_PAYMENT_METHOD:
            return {
                ...state,
                paymentMethod: action.payload
            }

        case CART_RESET:
            return {
                ...state,
                cartItems: [],
                shippingAddress: {},
                paymentMethod: null,
                itemsPrice: 0,
                shippingPrice: 0,
                taxPrice: 0,
                totalPrice: 0
            };
        default: // Retour par défaut : retourner l'état actuel si aucune action correspondante n'est trouvée
            return state;
    }
}