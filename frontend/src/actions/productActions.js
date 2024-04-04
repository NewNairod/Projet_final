import axios from 'axios'; // Importation du module axios pour effectuer des requêtes HTTP
import { 
    PRODUCT_LIST_REQUEST, 
    PRODUCT_LIST_SUCCESS, 
    PRODUCT_LIST_FAIL, 
    PRODUCT_DETAILS_REQUEST, 
    PRODUCT_DETAILS_SUCCESS, 
    PRODUCT_DETAILS_FAIL, 
    PRODUCT_CREATE_REQUEST, 
    PRODUCT_CREATE_SUCCESS, 
    PRODUCT_CREATE_FAIL 
} from '../constants/productConstants.js'; // Importation des constantes associées aux actions sur les produits

// Action Redux pour lister les produits
export const listProducts = (keyword = '') => async (dispatch) => {
    try {
        // Dispatch de l'action de demande pour indiquer le début de la requête
        dispatch({ type: PRODUCT_LIST_REQUEST });

        // Envoi de la requête GET pour récupérer la liste des produits avec un éventuel mot-clé de recherche
        const { data } = await axios.get(`/api/products?name=${keyword}`);

        // Dispatch de l'action de succès avec les données des produits comme payload
        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data,
        });
    } catch (error) {
        // En cas d'erreur lors de la requête, dispatch de l'action de faille avec un message d'erreur approprié
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};

// Action Redux pour récupérer les détails d'un produit spécifique
export const listProductDetails = (id) => async (dispatch) => {
    try {
        // Dispatch de l'action de demande pour indiquer le début de la requête
        dispatch({ type: PRODUCT_DETAILS_REQUEST });

        // Envoi de la requête GET pour récupérer les détails du produit avec l'identifiant spécifié
        const { data } = await axios.get(`/api/products/${id}`);

        // Dispatch de l'action de succès avec les données du produit comme payload
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        // En cas d'erreur lors de la requête, dispatch de l'action de faille avec un message d'erreur approprié
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.message && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};

// Action Redux pour créer un nouveau produit
export const createProduct = (productData) => async (dispatch, getState) => {
    try {
        // Dispatch de l'action de demande pour indiquer le début de la requête
        dispatch({ type: PRODUCT_CREATE_REQUEST });

        // Extraction des informations de l'utilisateur connecté depuis l'état global Redux
        const { userLogin: { userInfo } } = getState();

        // Configuration de la requête avec l'en-tête d'authentification
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`, // Utilisation du jeton d'authentification dans l'en-tête
            },
        };

        // Envoi de la requête POST pour créer un nouveau produit avec les données du produit et la configuration
        const { data } = await axios.post(`/api/products`, productData, config);

        // Dispatch de l'action de succès avec les données du nouveau produit comme payload
        dispatch({
            type: PRODUCT_CREATE_SUCCESS,
            payload: data,
        });

        // Rechargement de la page pour refléter les modifications après la création du produit
        window.location.reload();
    } catch (error) {
        // En cas d'erreur lors de la requête, dispatch de l'action de faille avec un message d'erreur approprié
        dispatch({
            type: PRODUCT_CREATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};
