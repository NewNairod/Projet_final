import {
    // Importation des constantes d'action
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


// Reducer pour gérer la connexion de l'utilisateur
export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return { loading: true }
        case USER_LOGIN_SUCCESS:
            return { loading: false, userInfo: action.payload }
        case USER_LOGIN_FAIL:
            return { loading: false, error: action.payload }
        case USER_LOGOUT:
            return {} // Efface les informations de l'utilisateur lors de la déconnexion
        default:
            return state
    }
}

// Reducer pour gérer l'inscription de l'utilisateur
export const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return { ...state, loading: true }
        case USER_REGISTER_SUCCESS:
            return { loading: false, userInfo: action.payload }
        case USER_REGISTER_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

// Reducer pour gérer les détails de l'utilisateur
export const userDetailsReducer = (state = { user: { favorites: [] } }, action) => {
    switch (action.type) {
        case USER_DETAILS_REQUEST:
            return { ...state, loading: true };
        case USER_DETAILS_SUCCESS:
            return { loading: false, user: action.payload };
        case USER_DETAILS_FAIL:
            return { loading: false, error: action.payload };
        // Reducers pour gérer l'ajout et la suppression des favoris de l'utilisateur
        case USER_ADD_FAVORITE_REQUEST:
            return { ...state, updatingFavorites: true };
        case USER_ADD_FAVORITE_SUCCESS:
            // Manipulation de l'état pour simuler l'ajout d'un favori
            return {
                ...state, 
                updatingFavorites: false,
                user: { 
                    ...state.user,
                    favorites: [...state.user.favorites, { _id: action.payload }]
                }
            };
        case USER_ADD_FAVORITE_FAIL:
            return { ...state, updatingFavorites: false, error: action.payload };
        case USER_REMOVE_FAVORITE_REQUEST:
            return { ...state, updatingFavorites: true };
        case USER_REMOVE_FAVORITE_SUCCESS:
            // Manipulation de l'état pour supprimer un favori
            return {
                ...state, 
                updatingFavorites: false,
                user: {
                    ...state.user, 
                    favorites: state.user.favorites.filter(id => id !== action.payload)
                }
            };
        case USER_REMOVE_FAVORITE_FAIL:
            return { ...state, updatingFavorites: false, error: action.payload };
        // Reducers pour gérer la récupération de la liste des favoris de l'utilisateur
        case USER_LIST_FAVORITES_REQUEST:
            return { ...state, loadingFavorites: true };
        case USER_LIST_FAVORITES_SUCCESS:
            return {
                ...state,
                user: {
                    ...state.user,
                    favorites: action.payload
                }
            };
        case USER_LIST_FAVORITES_FAIL:
            return { ...state, loadingFavorites: false, errorFavorites: action.payload };
        default:
            return state;
    }
}

// Reducer pour gérer la mise à jour du profil utilisateur
export const userUpdateProfileReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_UPDATE_PROFILE_REQUEST:
            return { loading: true }
        case USER_UPDATE_PROFILE_SUCCESS:
            return { loading: false, success: true, userInfo: action.payload }
        case USER_UPDATE_PROFILE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}