import { ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCESS, ORDER_RESET } from '../constants/orderConstants.js'

// Définition du reducer orderCreateReducer
export const orderCreateReducer = (state = {}, action) => {
    switch (action.type) {
        // Gestion de la requête de création d'une commande
        case ORDER_CREATE_REQUEST:
            return {
                loading: true
            }
        // Gestion de la création réussie d'une commande
        case ORDER_CREATE_SUCESS:
            return {
                loading: false,
                success: true,
                order: action.payload
            }
        // Gestion de l'échec de la création d'une commande
        case ORDER_CREATE_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case ORDER_RESET:
            return {}; // Remet l'état de la commande à son état initial
        // Retour par défaut : retourner l'état actuel si aucune action correspondante n'est trouvée
        default:
            return state;
    }
}
