import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import Message from '../components/Message.js'
import FormContainer from '../components/FormContainer.js'
import { Row, Col, Form, Button, FormLabel, FormControl, Card} from 'react-bootstrap'
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

    return (
        <FormContainer>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Connexion</h2>
                    {error && <Message variant='danger'>{error}</Message>}
                    {loading && <Loader />}
                    <Form onSubmit={submitHandler}>
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
                        <Button type="submit" variant="primary" className="w-100">Connectez-vous</Button>
                    </Form>
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

export default LoginScreen
