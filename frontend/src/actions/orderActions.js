import axios from 'axios'
import { ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCESS } from '../constants/orderConstants.js'

export const createOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_CREATE_REQUEST,
        })
        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                authorization: userInfo.token
            }
        }
        const { data } = await axios.post(`/api/orders`, order, config)
        dispatch({
            type: ORDER_CREATE_SUCESS,
            payload: data
        })
        localStorage.setItem('order', JSON.stringify(createOrder))
    } catch (error) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: error.message && error.response.data.message ? error.response.data.message : error.message
        })
    }
}