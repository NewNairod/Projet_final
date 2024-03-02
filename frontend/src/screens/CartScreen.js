import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams, useNavigate, useSearchParams } from 'react-router-dom'
import Message from '../components/Message.js'
import { Row, Col, ListGroup, Form, Button, Card, Image } from 'react-bootstrap'
import { addToCart, removeFromCart } from '../actions/cartActions.js'

const CartScreen = () => {

    const { id } = useParams()
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const qty = searchParams.get('qty')

    console.log(` product id ${id} et qty ${qty}`)

    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const { cartItems } = cart;

    useEffect(() => {
        if (id) {
            dispatch(addToCart(id, qty))
        }
    }, [dispatch, id, qty])

    const removeFromCartHandler = (id) => {
        console.log(`remove ref ${id} from cart`);
        dispatch(removeFromCart(id))

    }

    const checkoutHandler = () => {
        console.log(`click button paiement`)
        navigate(`/login?redirect=/shipping`);
    }

    return (
        <Row>
            <Col>
                <h1>Panier</h1>
                {cartItems.lenght === 0 ? (
                    <Message>
                        Votre panier est vide <Link to='/'>Retourner à l'accueil</Link>
                    </Message>
                ) : (
                    <ListGroup variant='flush'>
                        {cartItems.map(item => (
                            <ListGroup.Item key={item.product}>
                                <Row>
                                    <Col md={2}>
                                        <Image src={item.image} alt={item.name} fluid rounded />
                                    </Col>
                                    <Col md={3}>
                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                    </Col>
                                    <Col md={2}>{item.price} €</Col>
                                    <Col md={2}>
                                        <Form.Control as='select' value={item.qty} onChange={(e) => {
                                            dispatch(addToCart(item.product, Number(e.target.value)))
                                        }}>
                                            {
                                                [...Array(item.countInStock).keys()].map(x => (
                                                    <option key={x + 1} value={x + 1}>{x + 1}</option>
                                                ))
                                            }
                                        </Form.Control>
                                    </Col>
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
            <Col md={4}>
                <Card>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Sous Total ({cartItems.reduce((acc, item) => acc + Number(item.qty), 0)})</h2>
                            {cartItems.reduce((acc, item) => acc + Number(item.qty) * Number(item.price), 0).toFixed(0)} €
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button type="button" className="btn-block" disabled={cartItems.lenght === 0} onClick={checkoutHandler}>
                                Proceder au paiement
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    )
}

export default CartScreen
