import axios from 'axios'; // Importation du module axios pour effectuer des requêtes HTTP
import { ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCESS } from '../constants/orderConstants.js'; // Importation des constantes associées à la création de commandes

// Action Redux pour créer une nouvelle commande
export const createOrder = (order) => async (dispatch, getState) => {
    try {
        // Dispatch de l'action de demande pour indiquer le début de la requête
        dispatch({
            type: ORDER_CREATE_REQUEST,
        });

        // Extraction du jeton d'authentification de l'utilisateur depuis l'état global Redux
        const { userLogin: { userInfo } } = getState();

        // Configuration de la requête avec l'en-tête d'authentification
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: userInfo.token, // Utilisation du jeton d'authentification dans l'en-tête
            },
        };

        // Envoi de la requête POST pour créer la commande avec l'objet de la commande et la configuration
        const { data } = await axios.post(`projet-final-backend.vercel.app/api/orders`, order, config);

        // Dispatch de l'action de succès avec les données de la nouvelle commande comme payload
        dispatch({
            type: ORDER_CREATE_SUCESS,
            payload: data,
        });

        // Stockage des données de la commande créée dans le localStorage
        localStorage.setItem('order', JSON.stringify(data));
    } catch (error) {
        // En cas d'erreur lors de la requête, dispatch de l'action de faille avec un message d'erreur approprié
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: error.message && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};
