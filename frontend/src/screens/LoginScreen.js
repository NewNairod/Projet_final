import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import Message from '../components/Message.js';
import FormContainer from '../components/FormContainer.js';
import { Row, Col, Form, Button, FormLabel, FormControl, Card} from 'react-bootstrap';
import { login } from '../actions/userActions.js';
import Loader from '../components/Loader.js';

const LoginScreen = () => {
    // State pour gérer les valeurs des champs email et mot de passe
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Dispatch pour lancer les actions Redux, navigate pour la redirection
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Récupération des informations sur la connexion de l'utilisateur depuis Redux
    const userLogin = useSelector(state => state.userLogin);
    const { loading, error, userInfo } = userLogin;

    // Gestion des paramètres de recherche de l'URL pour la redirection
    const [searchParams] = useSearchParams();
    const redirect = searchParams.get('redirect') ? searchParams.get('redirect') : '/';

    // Redirection après la connexion en fonction de l'état de connexion de l'utilisateur
    useEffect(() => {
        if (userInfo) {
            navigate(`${redirect}`);
        } else {
            navigate(`/login`);
        }
    }, [userInfo, navigate]);

    // Fonction pour soumettre le formulaire de connexion
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password));
    }

    return (
        <FormContainer>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Connexion</h2>
                    {/* Affichage du message d'erreur s'il y a une erreur */}
                    {error && <Message variant='danger'>{error}</Message>}
                    {/* Affichage du loader pendant la soumission du formulaire */}
                    {loading && <Loader />}
                    {/* Formulaire de connexion */}
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='email' className="mb-3">
                            <Form.Label>Adresse Email</Form.Label>
                            <Form.Control
                                type='email'
                                placeholder='Saisir votre adresse E-mail'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId='password' className="mb-3">
                            <Form.Label>Mot de passe</Form.Label>
                            <Form.Control
                                type='password'
                                placeholder='Saisir votre mot de passe'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} />
                        </Form.Group>
                        {/* Bouton pour soumettre le formulaire */}
                        <Button type="submit" variant="primary" className="w-100">Connectez-vous</Button>
                    </Form>
                    {/* Lien pour rediriger vers la page d'inscription */}
                    <Row className="py-3">
                        <Col className="text-center">
                            Nouvel utilisateur ? 
                            <Link to={redirect ? `/register?redirect=${redirect}` : `/register`}> Inscrivez-vous</Link>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </FormContainer>
    )
}
export default LoginScreen;
