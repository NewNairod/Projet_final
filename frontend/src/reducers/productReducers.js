import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL } from '../constants/productConstants.js'

// Reducer pour gérer la liste des produits
export const productListReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        // Gestion de la demande de liste de produits
        case PRODUCT_LIST_REQUEST:
            return { loading: true, products: [] }
        // Gestion du succès de la récupération de la liste de produits
        case PRODUCT_LIST_SUCCESS:
            return { loading: false, products: action.payload }
        // Gestion de l'échec de la récupération de la liste de produits
        case PRODUCT_LIST_FAIL:
            return { loading: false, error: action.payload }
        // Retour par défaut : retourner l'état actuel si aucune action correspondante n'est trouvée
        default:
            return state
    }
}

// Reducer pour gérer les détails d'un produit spécifique
export const productDetailsReducer = (state = { product: { reviews: [] } }, action) => {
    switch (action.type) {
        // Gestion de la demande de détails d'un produit
        case PRODUCT_DETAILS_REQUEST:
            return { loading: true, ...state }
        // Gestion du succès de la récupération des détails d'un produit
        case PRODUCT_DETAILS_SUCCESS:
            return { loading: false, product: action.payload }
        // Gestion de l'échec de la récupération des détails d'un produit
        case PRODUCT_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        // Retour par défaut : retourner l'état actuel si aucune action correspondante n'est trouvée
        default:
            return state
    }
}
