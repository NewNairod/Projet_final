// Importez les hooks et composants nécessaires depuis React, React-Redux, React-Router et React-Bootstrap
import React, { useState } from 'react'; 
import { useDispatch, useSelector } from 'react-redux'; 
import { LinkContainer } from 'react-router-bootstrap'; 
import { Navbar, Nav, Container, NavDropdown, FormControl, Form, InputGroup, Button } from 'react-bootstrap'; 
import { useNavigate } from 'react-router-dom'; 
import { logout } from '../actions/userActions'; 

const Header = () => {
    const dispatch = useDispatch(); 
    const navigate = useNavigate(); 
    const [search, setSearch] = useState(''); 

    // Accès aux informations de l'utilisateur depuis l'état global
    const userLogin = useSelector((state) => state.userLogin); 
    const { userInfo } = userLogin; 

    // Gère la déconnexion de l'utilisateur
    const logoutHandler = () => {
        dispatch(logout()); 
    };

    // Mise à jour de l'état local lors de la saisie dans le champ de recherche
    const handleSearchChange = (e) => {
        setSearch(e.target.value); 
    };

    // Soumission de la recherche et navigation vers la page de résultats
    const handleSearchSubmit = (e) => {
        e.preventDefault(); 
        if (search.trim()) {
            navigate(`/?search=${search}`);
        } else {
            navigate('/');
        }
    };

    return (
        <header>
            <Navbar bg='dark' variant='dark' collapseOnSelect>
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand>Goodies for Mangas</Navbar.Brand>
                    </LinkContainer>
                    <Form inline onSubmit={handleSearchSubmit}>
                        <InputGroup>
                            <FormControl
                                type='text'
                                placeholder='Rechercher un manga...'
                                className='mr-sm-2'
                                onChange={handleSearchChange}
                                value={search}
                            />
                            <Button type="submit" variant='outline-success'>Rechercher</Button>
                        </InputGroup>
                    </Form>
                    <Navbar.Toggle aria-controls='basic-navbar-nav' />
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav className='ml-auto'>
                            <LinkContainer to='/cart'>
                                <Nav.Link><i className='fas fa-shopping-cart'></i> Panier</Nav.Link>
                            </LinkContainer>
                            {userInfo ? (
                                <NavDropdown title={userInfo.name} id='username'>
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item>Profil</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/favorites'>
                                        <NavDropdown.Item>Favoris</NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={logoutHandler}>Déconnexion</NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <LinkContainer to='/login'>
                                    <Nav.Link><i className='fas fa-user'></i> Connexion</Nav.Link>
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
