import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import FormContainer from '../components/FormContainer.js'
import CheckoutSteps from '../components/CheckoutSteps.js'
import { Form, Button, FormLabel, FormControl } from 'react-bootstrap'
import { saveShippingAddress } from '../actions/cartActions.js'

const ShippingScreen = () => {

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const submitHandler = (e) => {
        e.preventDefault()
        //console.log(`form info before dispatch => address ${address} city ${city} postal code ${postalCode} country ${country}`)
        dispatch(saveShippingAddress({ address, city, postalCode, country }))
        navigate(`/payment`)
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 />
            <h1>Expédition</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='address'>
                    <FormLabel>Address</FormLabel>
                    <FormControl
                        type='text'
                        placeholder='Saisir votre address'
                        value={address}
                        required
                        onChange={(e) => setAddress(e.target.value)}
                    >

                    </FormControl>
                </Form.Group>
                <Form.Group controlId='city'>
                    <FormLabel>City</FormLabel>
                    <FormControl
                        type='text'
                        placeholder='Saisir votre ville'
                        value={city}
                        required
                        onChange={(e) => setCity(e.target.value)}
                    >

                    </FormControl>
                </Form.Group>
                <Form.Group controlId='postalCode'>
                    <FormLabel>Postal Code</FormLabel>
                    <FormControl
                        type='text'
                        placeholder='Saisir votre code postal'
                        value={postalCode}
                        required
                        onChange={(e) => setPostalCode(e.target.value)}
                    >

                    </FormControl>
                </Form.Group>
                <Form.Group controlId='country'>
                    <FormLabel>Country</FormLabel>
                    <FormControl
                        type='text'
                        placeholder='Saisir votre pays'
                        value={country}
                        required
                        onChange={(e) => setCountry(e.target.value)}
                    >

                    </FormControl>
                </Form.Group>
                <Button type="submit" variant="primary">Continer</Button>
            </Form>
        </FormContainer>
    )
}

export default ShippingScreen
