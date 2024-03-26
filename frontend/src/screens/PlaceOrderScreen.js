import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Message from '../components/Message.js';
import CheckoutSteps from '../components/CheckoutSteps.js';
import { Button, Row, Col, ListGroup, Image, Card, ListGroupItem } from 'react-bootstrap';
import { createOrder } from '../actions/orderActions.js';

const PlaceOrderScreen = () => {
    // Récupération des informations sur le panier depuis Redux
    const cart = useSelector(state => state.cart);
    // Calcul des totaux
    cart.itemsPrice = Number(cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)).toFixed(2);
    cart.shippingPrice = Number(cart.itemsPrice > 100 ? 0 : 15).toFixed(2);
    cart.taxPrice = Number((0.15 * cart.itemsPrice).toFixed(2)).toFixed(2);
    cart.totalPrice = Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice);
    // Dispatch pour l'action de création de commande
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Récupération du résultat de la création de commande depuis Redux
    const orderCreate = useSelector(state => state.orderCreate);
    const { order, success, error } = orderCreate;

    // Redirection vers l'écran de détail de commande une fois la commande créée avec succès
    useEffect(() => {
        if (success) {
            navigate(`/order/${order._id}`);
        }
    }, [navigate, success]);

    // Gestionnaire pour passer la commande
    const placeOrderHandler = (e) => {
        e.preventDefault();
        dispatch(createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice
        }));
    }

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
                            {/* Section du total des articles */}
                            <ListGroupItem>
                                <Row>
                                    <Col>Références : </Col>
                                    <Col>{cart.itemsPrice}€</Col>
                                </Row>
                            </ListGroupItem>
                            {/* Section des frais d'expédition */}
                            <ListGroupItem>
                                <Row>
                                    <Col>Expédition : </Col>
                                    <Col>{cart.shippingPrice}€</Col>
                                </Row>
                            </ListGroupItem>
                            {/* Section des taxes */}
                            <ListGroupItem>
                                <Row>
                                    <Col>Taxes : </Col>
                                    <Col>{cart.taxPrice}€</Col>
                                </Row>
                            </ListGroupItem>    
                            {/* Section du total TTC */}
                            <ListGroupItem>
                                <Row>
                                    <Col>Total TTC : </Col>
                                    <Col>{cart.totalPrice}€</Col>
                                </Row>
                            </ListGroupItem>    
                            {/* Affichage d'un message d'erreur s'il y en a */}
                            <ListGroupItem>
                                {error && <Message variant='danger'>{error}</Message>}
                            </ListGroupItem>                           
                            {/* Bouton pour procéder au paiement */}
                            <ListGroupItem>
                                <Button style={{ backgroundColor: 'red', borderColor: 'red' }} type="button" className='btn-block' disabled={cart.cartItems.length === 0} onClick={placeOrderHandler}>Proceder au paiement</Button>
                            </ListGroupItem>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
};
export default PlaceOrderScreen
