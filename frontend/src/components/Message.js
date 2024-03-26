import React from 'react';
import { Alert } from 'react-bootstrap';

// Composant Message qui affiche un message d'alerte avec une variante spécifiée
const Message = ({ variant, children }) => {
    return (
        <Alert variant={variant}> {/* Utilisation du composant Alert de react-bootstrap avec la variante spécifiée */}
            {children} {/* Affichage du contenu du message passé en tant que children */}
        </Alert>
    );
}

export default Message; // Exportation du composant Message par défaut

