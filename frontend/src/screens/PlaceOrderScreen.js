import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Message from '../components/Message.js'
import CheckoutSteps from '../components/CheckoutSteps.js'
import { Button, Row, Col, ListGroup, Image, Card, ListGroupItem } from 'react-bootstrap'
import { createOrder } from '../actions/orderActions.js'

const PlaceOrderScreen = () => {

    const cart = useSelector(state => state.cart)

    //total synthèse 
    cart.itemsPrice = Number(cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)).toFixed(2)
    cart.shippingPrice = Number(cart.itemsPrice > 100 ? 0 : 15).toFixed(2)
    cart.taxPrice = Number((0.15 * cart.itemsPrice).toFixed(2)).toFixed(2)
    cart.totalPrice = Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const orderCreate = useSelector(state => state.orderCreate)
    const { order, success, error } = orderCreate

    useEffect(() => {

        if (success) {
            navigate(`/order/${order._id}`)
        }

    }, [navigate, success])

    const placeOrderHandler = (e) => {
        e.preventDefault()
        //console.log(`paiement handler`);
        dispatch(createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice
        }))

    }

    return (
        <>
            <CheckoutSteps step1 step2 step3 />
            <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroupItem>
                            <h2>Expédition</h2>
                            <p>
                                <strong>Adresse : </strong>
                                {cart.shippingAddress.address}, {' '}{cart.shippingAddress.city}{' '}
                                {cart.shippingAddress.postalCode}, {' '}
                                {cart.shippingAddress.country}
                            </p>
                        </ListGroupItem>
                        <ListGroupItem>
                            <h2>Methode de paiement</h2>
                            <strong>Methode : </strong>
                            {cart.paymentMethod}
                        </ListGroupItem>
                        <ListGroupItem>
                            <h2>Rappel de votre commande</h2>

                            {cart.cartItems.length === 0 ?
                                <Message>Votre panier est vide</Message> : (
                                    <ListGroup variant='flush'>
                                        {cart.cartItems.map((item, index) => (
                                            <ListGroupItem key={index}>
                                                <Row>
                                                    <Col md={1}>
                                                        <Image src={item.image} alt={item.name} fluid rounded />
                                                    </Col>
                                                    <Col>
                                                        <Link to={`/product/${item.product}`}>
                                                            {item.name}
                                                        </Link>
                                                    </Col>
                                                    <Col md={4}>
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
                <Col md={4}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroupItem>
                                <h2>Synthèse de la commande</h2>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Références : </Col>
                                    <Col>{cart.itemsPrice}€</Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Expédition : </Col>
                                    <Col>{cart.shippingPrice}€</Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Taxes : </Col>
                                    <Col>{cart.taxPrice}€</Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Total : </Col>
                                    <Col>{cart.totalPrice}€</Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                {error && <Message variant='danger'>{error}</Message>}
                            </ListGroupItem>
                            <ListGroupItem>
                                <Button type="button" className='btn-block' disabled={cart.cartItems.length === 0} onClick={placeOrderHandler}>Proceder au paiement</Button>
                            </ListGroupItem>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>

        </>
    )
}

export default PlaceOrderScreen
