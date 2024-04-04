import axios from 'axios';
import {
    // Importation des constantes d'action depuis le fichier userConstants.js
    USER_DETAILS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_ADD_FAVORITE_REQUEST,
    USER_ADD_FAVORITE_SUCCESS,
    USER_ADD_FAVORITE_FAIL,
    USER_REMOVE_FAVORITE_REQUEST,
    USER_REMOVE_FAVORITE_SUCCESS,
    USER_REMOVE_FAVORITE_FAIL,
    USER_LIST_FAVORITES_REQUEST,
    USER_LIST_FAVORITES_SUCCESS,
    USER_LIST_FAVORITES_FAIL
} from '../constants/userConstants.js';

// Action pour la connexion de l'utilisateur
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: USER_LOGIN_REQUEST }); // Déclenchement de la requête de connexion

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        // Requête POST à l'API pour la connexion avec les informations d'identification
        const { data } = await axios.post(`/api/users/login`, { email, password }, config);

        // Dispatch de l'action de succès de connexion avec les données utilisateur
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        });

        // Stockage des informations utilisateur dans le stockage local
        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        // Dispatch de l'action d'échec de connexion avec un message d'erreur
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.message && error.response.data.message ? error.response.data.message : error.message
        });
    }
};

// Action pour la déconnexion de l'utilisateur
export const logout = () => async (dispatch) => {
    // Suppression des informations utilisateur du stockage local
    localStorage.removeItem('userInfo');
    // Dispatch de l'action de déconnexion
    dispatch({
        type: USER_LOGOUT
    });
};

// Action pour l'inscription d'un nouvel utilisateur
export const register = (name, email, password) => async (dispatch) => {
    try {
        dispatch({ type: USER_REGISTER_REQUEST }); // Déclenchement de la requête d'inscription

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        // Requête POST à l'API pour l'inscription avec les informations de l'utilisateur
        const { data } = await axios.post(`/api/users`, { name, email, password }, config);

        // Dispatch de l'action de succès d'inscription avec les données utilisateur
        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        });

        // Pas de connexion automatique après l'inscription
        // localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        // Dispatch de l'action d'échec d'inscription avec un message d'erreur
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.message && error.response.data.message ? error.response.data.message : error.message
        });
    }
};

// Action pour récupérer les détails de l'utilisateur
export const getUserDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_DETAILS_REQUEST
        });

        const { userLogin: { userInfo } } = getState();

        // Vérifiez si userInfo et userInfo.token existent avant de continuer
        if (!userInfo || !userInfo.token) {
            throw new Error('Token non disponible');
        }

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userInfo.token}`, // Inclure 'Bearer ' avant le token
            },
        };

        // Requête GET à l'API pour récupérer les détails de l'utilisateur avec son ID
        const { data } = await axios.get(`/api/users/${id}`, config);

        // Dispatch de l'action de succès avec les détails de l'utilisateur
        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data
        });
    } catch (error) {
        // Dispatch de l'action d'échec avec un message d'erreur
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};

// Action pour mettre à jour le profil de l'utilisateur
export const updateUserProfile = (user) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_UPDATE_PROFILE_REQUEST
        });

        const { userLogin: { userInfo } } = getState();

        // Vérifie si les informations de connexion de l'utilisateur sont disponibles
        if (!userInfo || !userInfo.token) {
            throw new Error('Token non disponible');
        }

        // Configuration de l'en-tête de la requête avec le token d'authentification de l'utilisateur
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userInfo.token}`,
            },
        };

        // Envoie une requête HTTP PUT pour mettre à jour le profil de l'utilisateur avec les nouvelles informations
        const { data } = await axios.put(`/api/users/profile`, user, config);

        // Si la requête réussit, dispatche l'action USER_UPDATE_PROFILE_SUCCESS avec les données utilisateur mises à jour
        dispatch({
            type: USER_UPDATE_PROFILE_SUCCESS,
            payload: data
        });
    } catch (error) {
        // En cas d'erreur, dispatche l'action USER_UPDATE_PROFILE_FAIL avec le message d'erreur
        dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};

// Action pour ajouter un produit aux favoris de l'utilisateur
export const addFavorite = (productId) => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_ADD_FAVORITE_REQUEST }); // Déclenche la requête de l'ajout de favori

        // Récupère les informations de connexion de l'utilisateur depuis le state
        const { userLogin: { userInfo } } = getState();
        
        // Configuration de l'en-tête de la requête avec le token d'authentification de l'utilisateur
        const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };

        // Envoie une requête HTTP PUT pour ajouter le produit aux favoris avec l'identifiant du produit
        // eslint-disable-next-line
        const response = await axios.put(`/api/users/favorites/add`, { productId }, config);

        // Si la requête réussit, dispatche l'action USER_ADD_FAVORITE_SUCCESS avec l'identifiant du produit ajouté
        dispatch({ type: USER_ADD_FAVORITE_SUCCESS, payload: productId });
    } catch (error) {
        // En cas d'erreur, dispatche l'action USER_ADD_FAVORITE_FAIL avec le message d'erreur
        dispatch({
            type: USER_ADD_FAVORITE_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
};

// Action pour supprimer un produit des favoris de l'utilisateur
export const removeFavorite = (productId) => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_REMOVE_FAVORITE_REQUEST }); // Déclenche la requête de suppression de favori

        // Récupère les informations de connexion de l'utilisateur depuis le state
        const { userLogin: { userInfo } } = getState();
        
        // Configuration de l'en-tête de la requête avec le token d'authentification de l'utilisateur
        const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };

        // Envoie une requête HTTP PUT pour supprimer le produit des favoris avec l'identifiant du produit
        await axios.put(`/api/users/favorites/remove`, { productId }, config);

        // Si la requête réussit, dispatche l'action USER_REMOVE_FAVORITE_SUCCESS avec l'identifiant du produit supprimé
        dispatch({ type: USER_REMOVE_FAVORITE_SUCCESS, payload: productId });
    } catch (error) {
        // En cas d'erreur, dispatche l'action USER_REMOVE_FAVORITE_FAIL avec le message d'erreur
        dispatch({
            type: USER_REMOVE_FAVORITE_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
};

// Action pour récupérer la liste des favoris de l'utilisateur
export const listFavorites = () => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_LIST_FAVORITES_REQUEST }); // Déclenche la requête de récupération des favoris

        // Récupère les informations de connexion de l'utilisateur depuis le state
        const { userLogin: { userInfo } } = getState();
        
        // Configuration de l'en-tête de la requête avec le token d'authentification de l'utilisateur
        const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };

        // Envoie une requête HTTP GET pour récupérer la liste des favoris de l'utilisateur
        const { data } = await axios.get('/api/users/favorites', config);

        // Si la requête réussit, dispatche l'action USER_LIST_FAVORITES_SUCCESS avec les données des favoris
        dispatch({
            type: USER_LIST_FAVORITES_SUCCESS,
            payload: data
        });
    } catch (error) {
        // En cas d'erreur, dispatche l'action USER_LIST_FAVORITES_FAIL avec le message d'erreur
        dispatch({
            type: USER_LIST_FAVORITES_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
};