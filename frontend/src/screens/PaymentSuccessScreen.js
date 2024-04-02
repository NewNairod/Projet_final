import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { CART_RESET } from '../constants/cartConstants';
import { Container, Row, Col, Button } from 'react-bootstrap';

// Composant pour l'écran de succès de paiement
const PaymentSuccessScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const continueShoppingHandler = () => {
        // Dispatch l'action pour réinitialiser le panier
        dispatch({ type: CART_RESET });
        // Redirection vers la page d'accueil
        navigate('/');
      };
    
    return (
        <Container className="payment-success-container">
        <Row className="justify-content-md-center">
          <Col md={6} className="text-center">
            {/* Icône de succès, vous pouvez utiliser une image ou une icône de votre choix */}
            <i className="fas fa-check-circle success-icon"></i>
            <h2>Paiement réussi</h2>
            <p>Merci pour votre paiement !</p>
            {/* Bouton pour retourner à la page d'accueil ou à la boutique */}
            <Button variant="primary" onClick={continueShoppingHandler}>
              Continuer vos achats
            </Button>
          </Col>
        </Row>
      </Container>
    );
};

export default PaymentSuccessScreen;
