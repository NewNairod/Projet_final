import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Button, Form, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import Loader from '../components/Loader';
import Message from '../components/Message';

const ProfileScreen = () => {
    // États pour stocker les données du formulaire
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // Récupération des données de l'utilisateur connecté depuis le state global
    const userDetails = useSelector((state) => state.userDetails);
    const { loading, error, user } = userDetails;
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
    const { success } = userUpdateProfile;

    // Effet pour charger les détails de l'utilisateur et mettre à jour les états du formulaire
    useEffect(() => {
        if (!userInfo) {
            // Redirection vers la page de connexion si l'utilisateur n'est pas connecté
            navigate('/login');
        } else {
            // Récupération des détails de l'utilisateur
            if (!user.name) {
                dispatch(getUserDetails('profile'));
            } else {
                // Mise à jour des états du formulaire avec les données de l'utilisateur
                setName(user.name);
                setEmail(user.email);
            }
        }
    }, [dispatch, navigate, userInfo, user]);
    
    // Fonction de soumission du formulaire
    const submitHandler = (e) => {
        e.preventDefault();
        // Vérification de la correspondance des mots de passe
        if (password !== confirmPassword) {
            setMessage('Les mots de passe ne correspondent pas.');
        } else {
            // Envoi des données de mise à jour du profil à l'action updateUserProfile
            dispatch(updateUserProfile({ id: user._id, name, email, password: password === '' ? null : password }));
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
            <Row className="justify-content-md-center w-100">
                <Col xs={12} md={8} lg={6}>
                    <Card className="p-3">
                        <Card.Body>
                            <h2 className="text-center mb-4">Profil Utilisateur</h2>
                            {/* Affichage des messages d'erreur, de succès et de chargement */}
                            {message && <Message variant='danger'>{message}</Message>}
                            {success && <Message variant='success'>Profil mis à jour avec succès</Message>}
                            {error && <Message variant='danger'>{error}</Message>}
                            {loading && <Loader />}
                            {/* Formulaire de mise à jour du profil */}
                            <Form onSubmit={submitHandler}>
                                {/* Champ de nom */}
                                <Form.Group controlId='name' className="mb-3">
                                    <Form.Label>Nom</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Entrez votre nom'
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </Form.Group>

                                {/* Champ d'email */}
                                <Form.Group controlId='email' className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type='email'
                                        placeholder='Entrez votre email'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </Form.Group>
                                {/* Champ de nouveau mot de passe */}
                                <Form.Group controlId='password' className="mb-3">
                                    <Form.Label>Nouveau mot de passe</Form.Label>
                                    <Form.Control
                                        type='password'
                                        placeholder='Entrez un nouveau mot de passe'
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </Form.Group>

                                {/* Champ de confirmation du nouveau mot de passe */}
                                <Form.Group controlId='confirmPassword' className="mb-3">
                                    <Form.Label>Confirmer le mot de passe</Form.Label>
                                    <Form.Control
                                        type='password'
                                        placeholder='Confirmez le nouveau mot de passe'
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </Form.Group>
                                {/* Bouton de soumission */}
                                <Button type="submit" variant="primary" className="w-100">Mettre à jour</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default ProfileScreen;
