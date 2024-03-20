import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import { listProductDetails } from '../actions/productActions'
import Message from '../components/Message'
import Loader from '../components/Loader'

const ProductScreen = () => {

    const navigate = useNavigate();
    const { id } = useParams();
    const [qty, setQty] = useState(1)
    const dispatch = useDispatch()
    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails;

    useEffect(() => {
        dispatch(listProductDetails(id))
    }, [dispatch, id])

    const addToCartHandler = () => {
        navigate(`/cart/${id}?qty=${qty}`);
        //history.push()
    }

    return (
        <>
            <Link className='btn btn-light my-3' to='/'>
                Retour
            </Link>
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                <Row>
                    <Col md={6}>
                        <Image src={product.image} alt={product.name} fluid />
                        </Col>
                        <Col md={3}>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <h3><strong>{product.name}</strong></h3>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <strong>Editeur : </strong>{product.brand}
                                </ListGroup.Item>
                                <ListGroup.Item>
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
                            <Card>
                                <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Prix : </Col>
                                    <Col><strong>{product.price} € </strong></Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Status : </Col>
                                    <Col>{product.countInStock > 0 ? 'En stock' : 'Hors stock'}</Col>
                                </Row>
                            </ListGroup.Item>
                            {product.countInStock > 0 && (
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Quantité</Col>
                                        <Col>
                                            <Form.Control as='select' value={qty} onChange={(e) => {
                                                setQty(e.target.value)
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
