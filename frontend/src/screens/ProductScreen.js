import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import { listProductDetails } from '../actions/productActions'
import Message from '../components/Message'
import Loader from '../components/Loader'

const ProductScreen = () => {

    // Récupération de l'ID du produit depuis les paramètres d'URL
    const { id } = useParams();

    // Initialisation du state pour la quantité du produit à ajouter au panier
    const [qty, setQty] = useState(1);

    // Initialisation des hooks Redux
    const dispatch = useDispatch();
    const productDetails = useSelector(state => state.productDetails);
    const { loading, error, product } = productDetails;

    // Hook pour la navigation
    const navigate = useNavigate();

    // Chargement des détails du produit au montage du composant
    useEffect(() => {
        dispatch(listProductDetails(id));
    }, [dispatch, id]);

    // Gestion de l'ajout au panier
    const addToCartHandler = () => {
        navigate(`/cart/${id}?qty=${qty}`);
    }

    return (
        <>
            {/* Bouton de retour à la page d'accueil */}
            <Link className='btn btn-light my-3' to='/'>
                Retour
            </Link>

            {/* Affichage d'un loader pendant le chargement */}
            {loading ? (
                <Loader />
            ) : error ? (
                // Affichage d'un message d'erreur s'il y a une erreur de chargement
                <Message variant='danger'>{error}</Message>
            ) : (
                // Affichage des détails du produit
                <Row>
                    <Col md={6}>
                        {/* Affichage de l'image principale du produit */}
                        <Image src={product.image} alt={product.name} fluid />
                    </Col>
                    <Col md={3}>
                        {/* Affichage des détails du produit */}
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h3><strong>{product.name}</strong></h3>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <strong>Editeur : </strong>{product.brand}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                {/* Affichage de la note moyenne du produit */}
                                <Rating value={product.rating} text={`${product.numReviews} avis`} />
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <strong>Prix : </strong> {product.price} €
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <strong>Description : </strong> <br></br> {product.description}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <strong>Autres images : </strong> <br></br> {product.images && product.images.length > 0 && (
                                    // Affichage des autres images du produit, s'il y en a
                                    <Row className="mt-3">
                                        {product.images.map((image, index) => (
                                            <Col key={index}>
                                                <Image src={image} alt={`Image ${index + 1}`} fluid />
                                            </Col>
                                        ))}
                                    </Row>
                                )}
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col md={3}>
                        {/* Affichage des détails du produit */}
                        <Card>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    {/* Affichage du prix du produit */}
                                    <Row>
                                        <Col>Prix : </Col>
                                        <Col><strong>{product.price} € </strong></Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    {/* Affichage du statut de disponibilité du produit */}
                                    <Row>
                                        <Col>Status : </Col>
                                        <Col>{product.countInStock > 0 ? 'En stock' : 'Hors stock'}</Col>
                                    </Row>
                                </ListGroup.Item>
                                {product.countInStock > 0 && (
                                    <ListGroup.Item>
                                        {/* Sélection de la quantité à ajouter au panier */}
                                        <Row>
                                            <Col>Quantité</Col>
                                            <Col>
                                                <Form.Control as='select' value={qty} onChange={(e) => {
                                                    setQty(e.target.value);
                                                }}>
                                                    {
                                                        [...Array(product.countInStock).keys()].map(x => (
                                                            <option key={x + 1} value={x + 1}>{x + 1}</option>
                                                        ))
                                                    }
                                                </Form.Control>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                )}
                                <ListGroup.Item>
                                    {/* Bouton pour ajouter le produit au panier */}
                                    <Button
                                        onClick={addToCartHandler}
                                        className='btn-block'
                                        type='button'
                                        style={{ backgroundColor: 'red', borderColor: 'red' }}
                                        disabled={product.countInStock === 0}>
                                        Ajoutez au panier
                                    </Button>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            )}
        </>
    );
}

export default ProductScreen;