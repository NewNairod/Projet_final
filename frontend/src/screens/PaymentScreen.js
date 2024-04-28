import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FormContainer from '../components/FormContainer.js';
import CheckoutSteps from '../components/CheckoutSteps.js';
import { Form, Button, FormLabel, FormGroup, FormCheck, Col } from 'react-bootstrap';
import { savePaymentMethod } from '../actions/cartActions.js';

const PaymentScreen = () => {
    // Récupération des informations sur le panier depuis Redux
    const cart = useSelector(state => state.cart);
    const { shippingAddress } = cart;

    // Utilisation de navigate pour la redirection
    const navigate = useNavigate();

    // Si aucune adresse de livraison n'est définie, redirige vers l'écran de livraison
    if (!shippingAddress) {
        console.log(`shipping address doesn't exist`);
        navigate(`/shipping`);
    }

    // State pour stocker la méthode de paiement sélectionnée
    const [paymentMethod, setPaymentMethod] = useState('Stripe');

    // Dispatch pour lancer l'action Redux
    const dispatch = useDispatch();

    // Fonction pour soumettre le formulaire de paiement
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        navigate(`/placeorder`);
    }

    return (
        <FormContainer>
            {/* Composant pour afficher les étapes de paiement */}
            <CheckoutSteps step1 step2 step3 />
            <h1>Mode de paiement</h1>
            <Form onSubmit={submitHandler}>
                <FormGroup>
                    <FormLabel as='legend'>Sélectionnez votre méthode de paiement : </FormLabel>
                    <Col>
                        {/* Cases à cocher pour les options de paiement */}
                        <FormCheck
                            type='radio'
                            label='Stripe ou Carte bancaire'
                            id='Stripe' name='paymentMethod'
                            value='Stripe'
                            checked
                            onChange={(e) => setPaymentMethod(e.target.value)}>
                        </FormCheck>
                        {/* Ajoutez d'autres options de paiement si nécessaire */}
                    </Col>
                </FormGroup>
                <br></br>
                {/* Bouton pour soumettre le formulaire */}
                <Button style={{ backgroundColor: 'red', borderColor: 'red' }} type="submit" variant="primary">Procéder au paiement</Button>
            </Form>
        </FormContainer>
    )
}

export default PaymentScreen;
