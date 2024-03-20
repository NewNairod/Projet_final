import axios from 'axios'
import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_SUCCESS, PRODUCT_CREATE_FAIL } from '../constants/productConstants.js'

export const listProducts = (keyword = '') => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST });

        
        const { data } = await axios.get(`/api/products?name=${keyword}`);

        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};

export const listProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({
            type: PRODUCT_DETAILS_REQUEST
        })

        
        const { data } = await axios.get(`/api/products/${id}`)

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.message && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const createProduct = (productData) => async (dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_CREATE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.post(`/api/products`, productData, config);

        dispatch({
            type: PRODUCT_CREATE_SUCCESS,
            payload: data,
        });
        window.location.reload();

    } catch (error) {
        dispatch({
            type: PRODUCT_CREATE_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        });
    }
};
