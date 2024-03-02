import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import Message from '../components/Message.js'
import FormContainer from '../components/FormContainer.js'
import { Row, Col, Form, Button, FormLabel, FormControl } from 'react-bootstrap'
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

    return <FormContainer>
        <h1>Sign Up</h1>
        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
                <FormLabel>Nom</FormLabel>
                <FormControl
                    type='name'
                    placeholder='Saisir votre nom'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                >

                </FormControl>
            </Form.Group>
            <Form.Group controlId='email'>
                <FormLabel>Adresse Email</FormLabel>
                <FormControl
                    type='email'
                    placeholder='Saisir votre adresse E-mail'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                >

                </FormControl>
            </Form.Group>
            <Form.Group controlId='password'>
                <FormLabel>Password</FormLabel>
                <FormControl
                    type='password'
                    placeholder='Saisir votre mot de passe'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                >

                </FormControl>
            </Form.Group>

            <Form.Group controlId='confirmPassword'>
                <FormLabel>Confirmation mot de passe</FormLabel>
                <FormControl
                    type='password'
                    placeholder='Confirmez votre mot de passe'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                >

                </FormControl>
            </Form.Group>
            <Button type="submit" variant="primary">Inscription</Button>
        </Form>
        <Row className="py-3">
            <Col>Vous avez déjà un compte ? <Link to={redirect ? `/login?redirect=${redirect}` : `/login`}>Connectez-vous</Link> </Col>
        </Row>
    </FormContainer>
}

export default RegisterScreen
