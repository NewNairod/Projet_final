import axios from 'axios';
import {
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

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        })
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post(`/api/users/login`, { email, password }, config)
        console.dir(`data after login ${JSON.stringify(data)}`)
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })
        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.message && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const logout = () => async (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({
        type: USER_LOGOUT
    })
}

export const register = (name, email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_REGISTER_REQUEST
        });

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        // Envoi de la demande d'enregistrement à l'API
        const { data } = await axios.post(`/api/users`, { name, email, password }, config);

        console.dir(`data after registration ${JSON.stringify(data)}`);

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        });

        // Suppression des lignes qui connectent l'utilisateur automatiquement après l'inscription
        // dispatch({
        //     type: USER_LOGIN_SUCCESS,
        //     payload: data
        // });

        // localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.message && error.response.data.message ? error.response.data.message : error.message
        });
    }
};


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

        const { data } = await axios.get(`/api/users/${id}`, config);

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};




export const updateUserProfile = (user) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_UPDATE_PROFILE_REQUEST
        });

        const { userLogin: { userInfo } } = getState();

        if (!userInfo || !userInfo.token) {
            throw new Error('Token non disponible');
        }

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.put(`/api/users/profile`, user, config);

        dispatch({
            type: USER_UPDATE_PROFILE_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};


export const addFavorite = (productId) => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_ADD_FAVORITE_REQUEST });

        const { userLogin: { userInfo } } = getState();
        const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };

        const response = await axios.put(`/api/users/favorites/add`, { productId }, config);

        dispatch({ type: USER_ADD_FAVORITE_SUCCESS, payload: productId });
    } catch (error) {
        dispatch({
            type: USER_ADD_FAVORITE_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
};

export const removeFavorite = (productId) => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_REMOVE_FAVORITE_REQUEST });

        const { userLogin: { userInfo } } = getState();
        const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };

        await axios.put(`/api/users/favorites/remove`, { productId }, config);

        dispatch({ type: USER_REMOVE_FAVORITE_SUCCESS, payload: productId });
    } catch (error) {
        dispatch({
            type: USER_REMOVE_FAVORITE_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
};


export const listFavorites = () => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_LIST_FAVORITES_REQUEST });
        const { userLogin: { userInfo } } = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        const { data } = await axios.get('/api/users/favorites', config);
        dispatch({
            type: USER_LIST_FAVORITES_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: USER_LIST_FAVORITES_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
};