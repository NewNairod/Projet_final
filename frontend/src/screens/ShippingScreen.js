import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FormContainer from '../components/FormContainer.js';
import CheckoutSteps from '../components/CheckoutSteps.js';
import { Form, Button, FormLabel, FormControl } from 'react-bootstrap';
import { saveShippingAddress } from '../actions/cartActions.js';

const ShippingScreen = () => {
    // Récupération des données d'expédition du panier depuis le state Redux
    const cart = useSelector(state => state.cart);
    const { shippingAddress } = cart;

    // Initialisation des champs du formulaire avec les données d'expédition du panier
    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
    const [country, setCountry] = useState(shippingAddress.country);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Fonction de gestion de la soumission du formulaire
    const submitHandler = (e) => {
        e.preventDefault();
        // Dispatch de l'action pour sauvegarder les informations d'expédition
        dispatch(saveShippingAddress({ address, city, postalCode, country }));
        // Navigation vers l'étape suivante du processus de commande (page de paiement)
        navigate(`/payment`);
    };

    return (
        <FormContainer>
            {/* Composant pour afficher les étapes du processus de commande */}
            <CheckoutSteps step1 step2 />
            <h1>Expédition</h1>
            {/* Formulaire pour saisir les informations d'expédition */}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='address'>
                    <FormLabel>Adresse</FormLabel>
                    <FormControl
                        type='text'
                        placeholder='Saisir votre adresse'
                        value={address}
                        required
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId='city'>
                    <FormLabel>Ville</FormLabel>
                    <FormControl
                        type='text'
                        placeholder='Saisir votre ville'
                        value={city}
                        required
                        onChange={(e) => setCity(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId='postalCode'>
                    <FormLabel>Code postal</FormLabel>
                    <FormControl
                        type='text'
                        placeholder='Saisir votre code postal'
                        value={postalCode}
                        required
                        onChange={(e) => setPostalCode(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId='country'>
                    <FormLabel>Pays</FormLabel>
                    <FormControl
                        type='text'
                        placeholder='Saisir votre pays'
                        value={country}
                        required
                        onChange={(e) => setCountry(e.target.value)}
                    />
                    <br></br>
                </Form.Group>
                {/* Bouton pour soumettre le formulaire */}
                <Button style={{ backgroundColor: 'red', borderColor: 'red' }} type="submit" variant="primary">Continuer</Button>
            </Form>
        </FormContainer>
    );
}

export default ShippingScreen;
