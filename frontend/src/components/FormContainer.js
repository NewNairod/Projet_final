import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

// Le composant FormContainer accepte un seul enfant (children) qui sera rendu dans une mise en forme de formulaire.
const FormContainer = ({ children }) => {
    return (
        // Utilisation du composant Container de React Bootstrap pour délimiter la zone du formulaire.
        <Container>
            {/* Utilisation du composant Row pour créer une ligne horizontale à l'intérieur du Container. */}
            <Row className="justify-content-md-center">
                {/* Utilisation du composant Col pour créer une colonne pour le formulaire.
                    La colonne est centrée horizontalement sur les écrans de taille moyenne (md). */}
                <Col xs={12} md={6}>
                    {/* Le contenu du formulaire est rendu à l'intérieur de cette colonne. */}
                    {children}
                </Col>
            </Row>
        </Container>
    );
}

export default FormContainer;
