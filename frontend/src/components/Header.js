import React, { useState } from 'react'; // Importation des hooks useState pour gérer l'état local
import { useDispatch, useSelector } from 'react-redux'; // Importation des hooks useDispatch et useSelector pour interagir avec Redux
import { LinkContainer } from 'react-router-bootstrap'; // Importation de LinkContainer pour gérer les liens avec React Router Bootstrap
import { Navbar, Nav, Container, NavDropdown, FormControl, Form, InputGroup, Button } from 'react-bootstrap'; // Importation des composants de la barre de navigation et du formulaire de recherche depuis React Bootstrap
import { useNavigate } from 'react-router-dom'; // Importation du hook useNavigate pour la navigation programmatique
import { logout } from '../actions/userActions'; // Importation de l'action de déconnexion depuis les actions Redux

const Header = () => {
    const dispatch = useDispatch(); // Initialisation de useDispatch pour envoyer des actions Redux
    const navigate = useNavigate(); // Initialisation de useNavigate pour la navigation programmatique
    const [search, setSearch] = useState(''); // Initialisation de l'état local search avec useState

    const userLogin = useSelector((state) => state.userLogin); // Extraction des informations de connexion utilisateur depuis le store Redux
    const { userInfo } = userLogin; // Extraction des informations de l'utilisateur connecté

    // Fonction pour gérer le clic sur le bouton de déconnexion
    const logoutHandler = () => {
        dispatch(logout()); // Dispatch de l'action de déconnexion
    };

    // Fonction pour gérer les modifications dans le champ de recherche
    const handleSearchChange = (e) => {
        setSearch(e.target.value); // Mise à jour de l'état local search avec la valeur du champ de recherche
    };

    // Fonction pour gérer la soumission du formulaire de recherche
    const handleSearchSubmit = (e) => {
        e.preventDefault(); // Empêche le comportement par défaut du formulaire
        if(search.trim()) { // Vérifie si le champ de recherche n'est pas vide
            navigate(`/?search=${search}`); // Navigation vers la route de recherche avec le terme de recherche
        } else {
            navigate('/'); // Navigation vers la page d'accueil si le champ de recherche est vide
        }
    };

    // Rendu de la barre de navigation
    return (
        <header>
            {/* Barre de navigation avec React Bootstrap */}
            <Navbar bg='dark' variant='dark' collapseOnSelect>
                <Container>
                    {/* Logo de la boutique avec lien vers la page d'accueil */}
                    <LinkContainer to='/'>
                        <Navbar.Brand>Goodies for mangas</Navbar.Brand>
                    </LinkContainer>
                    {/* Formulaire de recherche */}
                    <Form inline onSubmit={handleSearchSubmit}>
                        <InputGroup>
                            <FormControl
                                type='text'
                                placeholder='Rechercher un manga...'
                                className='mr-sm-2'
                                onChange={handleSearchChange}
                                value={search}
                            />
                            <Button type="submit" style={{ backgroundColor: 'red', borderColor: 'red', color: 'white' }}>Rechercher</Button>
                        </InputGroup>
                    </Form>
                    {/* Bouton de menu déroulant pour les options utilisateur */}
                    <Navbar.Toggle aria-controls='basic-navbar-nav' />
                    <Navbar.Collapse id='basic-navbar-nav'>
                        {/* Liens de navigation */}
                        <Nav className='ml-auto'>
                            {/* Lien vers le panier */}
                            <LinkContainer to='/cart'>
                                <Nav.Link><i className='fas fa-shopping-cart'></i>Panier</Nav.Link>
                            </LinkContainer>
                            {/* Menu déroulant pour les options utilisateur */}
                            {userInfo ? (
                                <>
                                    {/* Menu pour grands écrans */}
                                    <NavDropdown title={userInfo.name} id='username' className="d-none d-lg-block">
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item>Profil</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/favorites'>
                                        <NavDropdown.Item>Favoris</NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={logoutHandler}>Déconnexion</NavDropdown.Item>
                                    </NavDropdown>
                                    
                                    {/* Menu intégré pour petits écrans */}
                                    <div className="d-lg-none">
                                    <LinkContainer to='/profile'>
                                        <Nav.Link>Profil</Nav.Link>
                                    </LinkContainer>
                                    <LinkContainer to='/favorites'>
                                        <Nav.Link>Favoris</Nav.Link>
                                    </LinkContainer>
                                    <Nav.Link onClick={logoutHandler}>Déconnexion</Nav.Link>
                                    </div>
                                </>
                                ) : (
                                // Lien vers la page de connexion si l'utilisateur n'est pas connecté
                                <LinkContainer to='/login'>
                                    <Nav.Link><i className='fas fa-user'></i>Connexion</Nav.Link>
                                </LinkContainer>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
}

export default Header;
