import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import FormContainer from '../components/FormContainer.js'
import CheckoutSteps from '../components/CheckoutSteps.js'
import { Form, Button, FormLabel, FormControl, FormGroup, FormCheck, Col } from 'react-bootstrap'
import { savePaymentMethod } from '../actions/cartActions.js'

const PaymentScreen = () => {

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    const navigate = useNavigate()

    if (!shippingAddress) {
        console.log(`shipping address doesn't exist`)
        navigate(`/shipping`)
    }

    const [paymentMethod, setPaymentMethod] = useState('PayPal')


    const dispatch = useDispatch()


    const submitHandler = (e) => {
        e.preventDefault()
        //console.log(`form info before dispatch => address ${address} city ${city} postal code ${postalCode} country ${country}`)
        dispatch(savePaymentMethod(paymentMethod))
        navigate(`/placeorder`)
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3 />
            <h1>Mode de paiement</h1>
            <Form onSubmit={submitHandler}>
                <FormGroup>
                    <FormLabel as='legend'>Selectioner votre methode de paiement : </FormLabel>
                    <Col>
                        <FormCheck
                            type='radio'
                            label='PayPal ou Carte bancaire'
                            id='PayPal' name='paymentMethod'
                            value='PayPal'
                            checked
                            onChange={(e) => setPaymentMethod(e.target.value)}>
                        </FormCheck>
                        {/* <FormCheck
                            type='radio'
                            label='Stripe - Carte bancaire'
                            id='Stripe' name='paymentMethod'
                            value='Stripe'
                            checked
                            onChange={(e) => setPaymentMethod(e.target.value)}>

                        </FormCheck> */}
                    </Col>
                </FormGroup>
                <Button type="submit" variant="primary">Proceder au paiement</Button>
            </Form>
        </FormContainer>
    )
}

export default PaymentScreen
