import React from 'react';
import { Nav, NavItem, NavLink } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
// CheckoutSteps est un composant fonctionnel qui affiche les étapes du processus de commande.
// Il prend quatre props booléennes: step1, step2, step3 et step4 pour indiquer quelles étapes sont complétées.
const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
    return (
        // Utilisation de la composante Nav de react-bootstrap pour afficher les étapes de la caisse sous forme de navigation horizontale
        <Nav>
            {/* Étape 1: Connexion */}
            <NavItem>
                {/* Si step1 est vrai, afficher un lien vers la page de connexion, sinon, afficher un lien désactivé */}
                {step1 ? (
                    <LinkContainer to='/login'>
                        <NavLink>Connexion</NavLink>
                    </LinkContainer>
                ) : (
                    <NavLink disabled>Connexion</NavLink>
                )}
            </NavItem>
            {/* Étape 2: Expédition */}
            <NavItem>
                {/* Si step2 est vrai, afficher un lien vers la page d'expédition, sinon, afficher un lien désactivé */}
                {step2 ? (
                    <LinkContainer to='/shipping'>
                        <NavLink>Expédition</NavLink>
                    </LinkContainer>
                ) : (
                    <NavLink disabled>Expédition</NavLink>
                )}
            </NavItem>
            {/* Étape 3: Paiement */}
            <NavItem>
                {/* Si step3 est vrai, afficher un lien vers la page de paiement, sinon, afficher un lien désactivé */}
                {step3 ? (
                    <LinkContainer to='/payment'>
                        <NavLink>Paiement</NavLink>
                    </LinkContainer>
                ) : (
                    <NavLink disabled>Paiement</NavLink>
                )}
            </NavItem>
            {/* Étape 4: Commander */}
            <NavItem>
                {/* Si step4 est vrai, afficher un lien vers la page de commande, sinon, afficher un lien désactivé */}
                {step4 ? (
                    <LinkContainer to='/placeorder'>
                        <NavLink>Commander</NavLink>
                    </LinkContainer>
                ) : (
                    <NavLink disabled>Commander</NavLink>
                )}
            </NavItem>
        </Nav>
    );
}

export default CheckoutSteps;
