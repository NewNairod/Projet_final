import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useNavigate, useSearchParams } from 'react-router-dom';
import Message from '../components/Message.js';
import { Row, Col, ListGroup, Form, Button, Card, Image } from 'react-bootstrap';
import { addToCart, removeFromCart } from '../actions/cartActions.js';

const CartScreen = () => {
    const { id } = useParams(); // Obtient les paramètres de l'URL, tels que l'identifiant du produit
    const navigate = useNavigate(); // Permet de naviguer vers d'autres pages
    const [searchParams] = useSearchParams(); // Obtient les paramètres de recherche de l'URL
    const qty = searchParams.get('qty'); // Obtient la quantité de produit à partir des paramètres de recherche
    const dispatch = useDispatch(); // Crée une fonction de rappel dispatch pour envoyer des actions Redux
    const cart = useSelector(state => state.cart); // Sélectionne les données du panier depuis le store Redux
    const { cartItems } = cart; // Extrayez les éléments du panier du store

    useEffect(() => {
        // Effectue une action lorsque l'identifiant du produit et/ou la quantité changent
        if (id) {
            dispatch(addToCart(id, qty)); // Ajoute le produit au panier avec la quantité spécifiée
        }
    }, [dispatch, id, qty]); // Dépendances de l'effet : dispatch, id et qty
    const numberOfItems = cartItems.reduce((acc, item) => acc + Number(item.qty), 0);
    const totalPrice = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2);

        const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id)); // Dispatch l'action de suppression d'un article du panier
    }

    const checkoutHandler = () => {
        navigate(`/login?redirect=/shipping`); // Redirige vers la page de connexion avec redirection vers l'écran de livraison
    }

       return (
        // Contenu JSX de l'écran du panier
        <Row>
            {/* Colonne pour afficher les articles du panier */}
            <Col md={8}>
                {/* En-tête de la page */}
                <h1>Panier</h1>
                {/* Affichage d'un message si le panier est vide */}
                {cartItems.length === 0 ? (
                    <Message>
                        Votre panier est vide <Link to='/'>Retourner à l'accueil</Link>
                    </Message>
                ) : (
                    // Affichage de la liste des articles du panier
                    <ListGroup variant='flush'>
                        {cartItems.map(item => (
                            <ListGroup.Item key={item.product}>
                                <Row>
                                    {/* Colonne pour afficher l'image du produit */}
                                    <Col md={2}>
                                        <Image src={item.image} alt={item.name} fluid rounded />
                                    </Col>
                                    {/* Colonne pour afficher le nom du produit avec un lien vers sa page */}
                                    <Col md={3}>
                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                    </Col>
                                    {/* Colonne pour afficher le prix du produit */}
                                    <Col md={2}>{item.price} €</Col>
                                    {/* Colonne pour sélectionner la quantité du produit */}
                                    <Col md={2}>
                                        <Form.Control as='select' value={item.qty} onChange={(e) => {
                                            dispatch(addToCart(item.product, Number(e.target.value))); // Met à jour la quantité du produit dans le panier
                                        }}>
                                            {/* Options pour sélectionner différentes quantités */}
                                            {[...Array(item.countInStock).keys()].map(x => (
                                                <option key={x + 1} value={x + 1}>{x + 1}</option>
                                            ))}
                                        </Form.Control>
                                    </Col>
                                    {/* Colonne pour supprimer le produit du panier */}
                                    <Col md={2}>
                                        <Col md={2}>
                                            <Button type="button" variant="light" onClick={() => { removeFromCartHandler(item.product) }}>
                                                <i className="fas fa-trash"></i>
                                            </Button>
                                        </Col>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
            </Col>
            {/* Colonne pour afficher le récapitulatif du panier et les options de paiement */}
            <Col md={4}>
                <Card>
                    <ListGroup variant="flush">
                        {/* Récapitulatif du panier */}
                        <ListGroup.Item>
                            <h2><strong>Sous-total ({numberOfItems} {numberOfItems > 1 ? 'articles' : 'article'})</strong></h2>
                            <strong>Total TTC : </strong> {totalPrice} €
                        </ListGroup.Item>
                        {/* Options de paiement */}
                        <ListGroup.Item>
                            <div className="d-grid">
                                <Button type="button" className="btn-block" style={{ backgroundColor: 'red', borderColor: 'red' }} disabled={cartItems.length === 0} onClick={checkoutHandler}>
                                    Commander
                                </Button>
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <div className="d-grid">
                                <Button type="button" variant="light" onClick={() => navigate('/')}>
                                    Continuer vos achats
                                </Button>
                            </div>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    );
}
export default CartScreen;
