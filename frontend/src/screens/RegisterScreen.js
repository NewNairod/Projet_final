import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Message from '../components/Message.js'; // Import du composant Message pour afficher les messages d'erreur
import FormContainer from '../components/FormContainer.js'; // Import du composant FormContainer pour structurer le formulaire
import { Row, Col, Form, Button, FormLabel, FormControl, Card } from 'react-bootstrap'; // Import des composants Bootstrap
import { register } from '../actions/userActions.js'; // Import de l'action register pour l'inscription de l'utilisateur
import Loader from '../components/Loader.js'; // Import du composant Loader pour afficher le chargement

const RegisterScreen = () => {
    // Déclaration des états pour les champs du formulaire et le message d'erreur
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);

    const dispatch = useDispatch(); // Initialisation du dispatcher Redux
    const navigate = useNavigate(); // Initialisation de la fonction de navigation
    // Récupération des données d'inscription depuis le state global
    const userRegister = useSelector(state => state.userRegister);
    const { loading, error, userInfo } = userRegister;

    // Effet pour rediriger l'utilisateur vers la page de connexion une fois inscrit
    useEffect(() => {
        if (userInfo) {
            navigate('/login');
        }
    }, [userInfo, navigate]);

    // Fonction de soumission du formulaire d'inscription
    const submitHandler = (e) => {
        e.preventDefault();

        // Vérification de la correspondance des mots de passe et de la saisie des champs
        if (password !== confirmPassword) {
            setMessage('Le mot de passe doit être identique.');
        } else if (!name || !email || !password) {
            setMessage('Veuillez remplir tous les champs.');
        } else {
            // Envoi des données d'inscription à l'action register
            dispatch(register(name, email, password));
        }
    };

    return (
        <FormContainer>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Inscription</h2>
                    {message && <Message variant='danger'>{message}</Message>} {/* Affichage du message d'erreur */}
                    {error && <Message variant='danger'>{error}</Message>} {/* Affichage de l'erreur provenant de Redux */}
                    {loading && <Loader />} {/* Affichage du chargement */}
                    <Form onSubmit={submitHandler}>
                        {/* Champ Nom */}
                        <Form.Group controlId='name' className="mb-3">
                            <FormLabel>Nom</FormLabel>
                            <FormControl
                                type='text'
                                placeholder='Saisir votre nom'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Form.Group>

                        {/* Champ Email */}
                        <Form.Group controlId='email' className="mb-3">
                            <FormLabel>Email</FormLabel>
                            <FormControl
                                type='email'
                                placeholder='Saisir votre email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>

                        {/* Champ Mot de passe */}
                        <Form.Group controlId='password' className="mb-3">
                            <FormLabel>Mot de passe</FormLabel>
                            <FormControl
                                type='password'
                                placeholder='Saisir votre mot de passe'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>

                        {/* Champ Confirmer le mot de passe */}
                        <Form.Group controlId='confirmPassword' className="mb-3">
                            <FormLabel>Confirmer le mot de passe</FormLabel>
                            <FormControl
                                type='password'
                                placeholder='Confirmer votre mot de passe'
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </Form.Group>

                        {/* Bouton d'inscription */}
                        <Button type='submit' variant='primary' className='w-100'>
                            Inscription
                        </Button>
                    </Form>

                    {/* Lien vers la page de connexion */}
                    <Row className='py-3'>
                        <Col className='text-center'>
                            Vous avez déjà un compte ?{' '}
                            <Link to='/login'>Connectez-vous</Link>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </FormContainer>
    );
};

export default RegisterScreen;
