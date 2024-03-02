import React from 'react'
import { Nav, NavItem, NavLink } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
    return (
        <Nav>
            <NavItem>
                {step1 ? (
                    <LinkContainer to='/login'>
                        <NavLink>Connexion</NavLink>
                    </LinkContainer>
                ) : (
                    <NavLink disabled>Connexion</NavLink>
                )}
            </NavItem>
            <NavItem>
                {step2 ? (
                    <LinkContainer to='/shipping'>
                        <NavLink>Expédition</NavLink>
                    </LinkContainer>
                ) : (
                    <NavLink disabled>Expédition</NavLink>
                )}
            </NavItem>
            <NavItem>
                {step3 ? (
                    <LinkContainer to='/payment'>
                        <NavLink>Paiement</NavLink>
                    </LinkContainer>
                ) : (
                    <NavLink disabled>Paiement</NavLink>
                )}
            </NavItem>
            <NavItem>
                {step4 ? (
                    <LinkContainer to='/placeorder'>
                        <NavLink>Commander</NavLink>
                    </LinkContainer>
                ) : (
                    <NavLink disabled>Commander</NavLink>
                )}
            </NavItem>
        </Nav>
    )
}

export default CheckoutSteps
