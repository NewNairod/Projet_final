import React from 'react';
import { Spinner } from 'react-bootstrap';

// Fonction de composant Loader qui affiche une icône de chargement
function Loader() {
    return (
        // Spinner de React Bootstrap pour afficher l'animation de chargement
        <Spinner
            animation='border' // Animation de type bordure (rotation)
            role='status' // Indique le rôle du spinner pour l'accessibilité
            style={{ // Style inline pour définir la taille, la position et la couleur du spinner
                width: '100px', // Largeur du spinner
                height: '100px', // Hauteur du spinner
                margin: 'auto', // Centre le spinner horizontalement dans son conteneur
                display: 'block', // Affiche le spinner en tant que bloc
                color: 'black' // Couleur du spinner
            }}
        >
            {/* Texte d'accessibilité pour les lecteurs d'écran */}
            <span className="sr-only">Loading ... </span>
        </Spinner>
    );
}

export default Loader; // Exportation du composant Loader par défaut

