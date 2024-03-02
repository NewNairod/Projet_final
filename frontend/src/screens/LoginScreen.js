import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import Message from '../components/Message.js'
import FormContainer from '../components/FormContainer.js'
import { Row, Col, Form, Button, FormLabel, FormControl } from 'react-bootstrap'
import { login } from '../actions/userActions.js'
import Loader from '../components/Loader.js'

const LoginScreen = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userLogin = useSelector(state => state.userLogin)
    const { loading, error, userInfo } = userLogin

    const [searchParams] = useSearchParams()
    const redirect = searchParams.get('redirect') ? searchParams.get('redirect') : '/'


    useEffect(() => {
        if (userInfo) {
            console.log(`userInfo in useEffect ok redirect => ${redirect}`)
            navigate(`${redirect}`)
        } else {
            navigate(`/login`)
        }
    }, [userInfo, navigate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }

    return <FormContainer>
        <h1>Connexion</h1>
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
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
                <FormLabel>Mot de passe</FormLabel>
                <FormControl
                    type='password'
                    placeholder='Saisir votre mot de passe'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                >

                </FormControl>
            </Form.Group>
            <Button type="submit" variant="primary">Connectez-vous</Button>
        </Form>
        <Row className="py-3">
            <Col>Nouvel utilisateur ? <Link to={redirect ? `/register?redirect=${redirect}` : `/register`}>Inscrivez-vous</Link> </Col>
        </Row>
    </FormContainer>
}

export default LoginScreen
