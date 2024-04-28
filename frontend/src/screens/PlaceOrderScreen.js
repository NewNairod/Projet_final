import React, { useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Message from '../components/Message.js';
import CheckoutSteps from '../components/CheckoutSteps.js';
import { Row, Col, ListGroup, Image, Card, ListGroupItem, Button } from 'react-bootstrap';
import { createOrder } from '../actions/orderActions.js';
import { CART_RESET } from '../constants/cartConstants';
import { ORDER_RESET } from '../constants/orderConstants';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from '../components/PaymentForm.js';

// clé publique Stripe
const stripePromise = loadStripe("pk_test_51P0Biz09lkoxsuabcxDZ9P1TB6EchTrt98PVQiarCAKYNS5TND05ttt3zvFmyI0NYsjbQBGZKPuRt3JAFXHB4bKG00lrOwWyxk");

const PlaceOrderScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showPaymentForm, setShowPaymentForm] = useState(false); // nouvel état pour afficher le formulaire
    // Sélectionnez les données nécessaires à partir de l'état Redux
    const cart = useSelector(state => state.cart);
    const { cartItems} = cart;

    const orderCreate = useSelector(state => state.orderCreate);
    const { order, success } = orderCreate;
    // const userInfo = useSelector(state => state.userLogin.userInfo);

// Calculer les totaux localement sans modifier l'état global de Redux
const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
const shippingPrice = itemsPrice > 100 ? 0 : 10; // frais d'expédition fictifs
const taxPrice = 0.15 * itemsPrice; // taxe fictive
const totalPrice = itemsPrice + shippingPrice + taxPrice;


    // Réinitialiser l'état local et Redux lorsqu'on quitte la page
    useEffect(() => {
        if (success) {
            navigate(`/order/${order._id}`);
        }
        return () => {
            dispatch({ type: ORDER_RESET });
            dispatch({ type: CART_RESET });
        };
    }, [dispatch, navigate, order, success]);

    const placeOrderHandlerAndShowForm = () => {
        dispatch(createOrder({
          orderItems: cart.cartItems,
          shippingAddress: cart.shippingAddress,
          paymentMethod: cart.paymentMethod,
          itemsPrice: itemsPrice.toFixed(2),
          shippingPrice: shippingPrice.toFixed(2),
          taxPrice: taxPrice.toFixed(2),
          totalPrice: totalPrice.toFixed(2),
        }))
      setShowPaymentForm(true); // Afficher le formulaire de paiement
    };
    

    return (
        <>
            {/* Étapes de paiement affichées */}
            <CheckoutSteps step1 step2 step3 />
            {/* Section de l'écran */}
            <Row>
                {/* Colonne pour afficher les détails de l'expédition et de la méthode de paiement */}
                <Col md={8}>
                    <ListGroup variant="flush">
                        {/* Section d'expédition */}
                        <ListGroupItem>
                            <h2>Expédition</h2>
                            <p>
                                {/* Affichage de l'adresse d'expédition */}
                                <strong>Adresse : </strong>
                                {cart.shippingAddress.address}, {' '}{cart.shippingAddress.city}{' '}
                                {cart.shippingAddress.postalCode}, {' '}
                                {cart.shippingAddress.country}
                            </p>
                        </ListGroupItem>
                        {/* Section de la méthode de paiement */}
                        <ListGroupItem>
                            <h2>Méthode de paiement</h2>
                            <strong>Méthode : </strong>
                            {cart.paymentMethod}
                        </ListGroupItem>
                        {/* Section du récapitulatif de la commande */}
                        <ListGroupItem>
                            <h2>Rappel de votre commande</h2>
                            {/* Vérification si le panier est vide */}
                            {cart.cartItems.length === 0 ? (
                                // Affichage d'un message si le panier est vide
                                <Message>Votre panier est vide</Message>
                            ) : (
                                // Affichage des articles du panier
                                <ListGroup variant='flush'>
                                    {cart.cartItems.map((item, index) => (
                                        <ListGroupItem key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    {/* Affichage de l'image de l'article */}
                                                    <Image src={item.image} alt={item.name} fluid rounded />
                                                </Col>
                                                <Col>
                                                    {/* Lien vers la page du produit */}
                                                    <Link to={`/product/${item.product}`}>
                                                        {item.name}
                                                    </Link>
                                                </Col>
                                                <Col md={4}>
                                                    {/* Affichage de la quantité, du prix unitaire et du prix total de l'article */}
                                                    {item.qty} x {item.price}€ = {item.qty * item.price}€
                                                </Col>
                                            </Row>
                                        </ListGroupItem>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroupItem>
                    </ListGroup>
                </Col>
               {/* Colonne pour afficher la synthèse de la commande */}
            <Col md={4}>
                <Card>
                    <ListGroup variant="flush">
                        <ListGroupItem>
                            <h2>Synthèse de la commande</h2>
                        </ListGroupItem>
                        <ListGroupItem>
                            <Row>
                                <Col>Références :</Col>
                                <Col>{itemsPrice.toFixed(2)}€</Col>
                            </Row>
                        </ListGroupItem>
                        <ListGroupItem>
                            <Row>
                                <Col>Expédition :</Col>
                                <Col>{shippingPrice.toFixed(2)}€</Col>
                            </Row>
                        </ListGroupItem>
                        <ListGroupItem>
                            <Row>
                                <Col>Taxes :</Col>
                                <Col>{taxPrice.toFixed(2)}€</Col>
                            </Row>
                        </ListGroupItem>
                        <ListGroupItem>
                            <Row>
                                <Col>Total TTC :</Col>
                                <Col>{totalPrice.toFixed(2)}€</Col>
                            </Row>
                        </ListGroupItem>
                        {/* Bouton pour déclencher le paiement */}
                        <ListGroupItem>
                        {!showPaymentForm && (
                            <Button
                                type="button"
                                className="redButton"
                                disabled={cartItems.length === 0}
                                onClick={placeOrderHandlerAndShowForm}
                            >
                                Passer la commande
                            </Button>
                        )}
                        </ListGroupItem>
                        <ListGroupItem>
                        {showPaymentForm && (
                            <Elements stripe={stripePromise}>
                                <PaymentForm totalPrice={totalPrice} navigate={navigate}/>
                            </Elements>
                        )}
                        </ListGroupItem>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
};
export default PlaceOrderScreen