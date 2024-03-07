import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import Message from '../components/Message.js'
import FormContainer from '../components/FormContainer.js'
import { Row, Col, Form, Button, FormLabel, FormControl, Card } from 'react-bootstrap'
import { register } from '../actions/userActions.js'
import Loader from '../components/Loader.js'

const RegisterScreen = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)


    const dispatch = useDispatch()

    const userRegister = useSelector(state => state.userRegister)
    const { loading, error, userInfo } = userRegister

    const [searchParams] = useSearchParams()
    const redirect = searchParams.get('redirect') ? searchParams.get('redirect') : '/'

    const navigate = useNavigate()

    //const [searchParams] = useSearchParams()
    //const redirect = searchParams.get('redirect') ? searchParams.get('redirect') : '/'


    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
    }, [userInfo, navigate, redirect])

    const submitHandler = (e) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            setMessage('Le mot de passe doit être identique')
        } else if (name === "" || email === "" || password === "") {
            setMessage('name, email and password not be empty')
        } else {
            dispatch(register(name, email, password))
        }
    }

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
                            <Form.Label>Nom</Form.Label>
                            <Form.Control
                                type='name'
                                placeholder='Saisir votre nom'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId='email' className="mb-3">
                            <Form.Label>Adresse Email</Form.Label>
                            <Form.Control
                                type='email'
                                placeholder='Saisir votre adresse E-mail'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId='password' className="mb-3">
                            <Form.Label>Mot de passe</Form.Label>
                            <Form.Control
                                type='password'
                                placeholder='Saisir votre mot de passe'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId='confirmPassword' className="mb-3">
                            <Form.Label>Confirmation mot de passe</Form.Label>
                            <Form.Control
                                type='password'
                                placeholder='Confirmez votre mot de passe'
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </Form.Group>
                        <Button type="submit" variant="primary" className="w-100">Inscription</Button>
                    </Form>
                    <Row className="py-3">
                        <Col className="text-center">
                            Vous avez déjà un compte ? 
                            <Link to={redirect ? `/login?redirect=${redirect}` : `/login`}> Connectez-vous</Link>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </FormContainer>
    )
}

export default RegisterScreen
