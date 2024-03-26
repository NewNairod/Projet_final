// Importe la fonction configureStore de Redux Toolkit pour configurer le store Redux
import { configureStore } from '@reduxjs/toolkit';
// Importe les reducers pour les produits, le panier, et les utilisateurs
import { productDetailsReducer, productListReducer } from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';
import { userDetailsReducer, userLoginReducer, userRegisterReducer, userUpdateProfileReducer } from './reducers/userReducers';
import { orderCreateReducer } from './reducers/orderReducer';

// Récupère les données du panier, de l'utilisateur, de l'adresse de livraison et de la méthode de paiement depuis le localStorage
const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];
const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;
const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {};
const paymentMethodFromStorage = localStorage.getItem('paymentMethod') ? JSON.parse(localStorage.getItem('paymentMethod')) : {};

// Définit l'état initial du store avec les données récupérées du localStorage
const preloadedState = {
    cart: {
        cartItems: cartItemsFromStorage,
        shippingAddress: shippingAddressFromStorage,
        paymentMethod: paymentMethodFromStorage,
    },
    userLogin: { userInfo: userInfoFromStorage },
    userDetails: { user: { favorites: [] }, loadingFavorites: false, errorFavorites: null },
};

// Configure le store avec les reducers spécifiés et l'état initial préchargé
export const store = configureStore({
    reducer: {
        productList: productListReducer, // Gère l'état de la liste des produits
        productDetails: productDetailsReducer, // Gère l'état des détails d'un produit
        cart: cartReducer, // Gère l'état du panier
        userLogin: userLoginReducer, // Gère l'état de la connexion de l'utilisateur
        userRegister: userRegisterReducer, // Gère l'état de l'enregistrement de l'utilisateur
        userDetails: userDetailsReducer, // Gère l'état des détails de l'utilisateur
        userUpdateProfile: userUpdateProfileReducer, // Gère l'état de la mise à jour du profil de l'utilisateur
        orderCreate: orderCreateReducer, // Gère l'état de la création d'une commande
    },
    preloadedState, // Charge l'état initial
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(), // Utilise le middleware par défaut de Redux Toolkit
});

// Exporte le store configuré
export default store;