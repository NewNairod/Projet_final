import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Message from '../components/Message.js';
import FormContainer from '../components/FormContainer.js';
import { Row, Col, Form, Button, FormLabel, FormControl, Card } from 'react-bootstrap';
import { register } from '../actions/userActions.js';
import Loader from '../components/Loader.js';

const RegisterScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userRegister = useSelector(state => state.userRegister);
    const { loading, error, userInfo } = userRegister;

    useEffect(() => {
        if (userInfo) {
            navigate('/login');
        }
    }, [userInfo, navigate]);

    const submitHandler = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setMessage('Le mot de passe doit être identique.');
        } else if (!name || !email || !password) {
            setMessage('Veuillez remplir tous les champs.');
        } else {
            dispatch(register(name, email, password));
        }
    };

    return (
        <FormContainer>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Inscription</h2>
                    {message && <Message variant='danger'>{message}</Message>}
                    {error && <Message variant='danger'>{error}</Message>}
                    {loading && <Loader />}
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='name' className="mb-3">
                            <FormLabel>Nom</FormLabel>
                            <FormControl
                                type='text'
                                placeholder='Saisir votre nom'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId='email' className="mb-3">
                            <FormLabel>Email</FormLabel>
                            <FormControl
                                type='email'
                                placeholder='Saisir votre email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId='password' className="mb-3">
                            <FormLabel>Mot de passe</FormLabel>
                            <FormControl
                                type='password'
                                placeholder='Saisir votre mot de passe'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId='confirmPassword' className="mb-3">
                            <FormLabel>Confirmer le mot de passe</FormLabel>
                            <FormControl
                                type='password'
                                placeholder='Confirmer votre mot de passe'
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </Form.Group>

                        <Button type='submit' variant='primary' className='w-100'>
                            Inscription
                        </Button>
                    </Form>

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
