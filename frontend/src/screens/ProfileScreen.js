import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Row, Col, Card, Form, Button, FormLabel, FormControl } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { getUserDetails, updateUserProfile } from '../actions/userActions'

const ProfileScreen = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userDetails = useSelector((state) => state.userDetails)
    const { loading, error, user } = userDetails

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
    const { success } = userUpdateProfile

    useEffect(() => {
        if (!userInfo) {
            navigate('/login')
        } else {
            if (!user || !user.name) {
                dispatch(getUserDetails('profile'))
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [dispatch, navigate, userInfo, user])

    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage('Les mots de passe ne correspondent pas')
        } else {
            dispatch(updateUserProfile({ id: user._id, name, email, password }))
        }
    }

    return (
        <Row className="justify-content-md-center">
            <Col xs={12} md={6}>
                <Card className='my-3 p-3 rounded'>
                    <Card.Header as="h2" className="text-center">Profil Utilisateur</Card.Header>
                    <Card.Body>
                        {message && <Message variant='danger'>{message}</Message>}
                        {success && <Message variant='success'>Profil mis à jour avec succès</Message>}
                        {error && <Message variant='danger'>{error}</Message>}
                        {loading && <Loader />}
                        <Form onSubmit={submitHandler}>
                            <Form.Group controlId='name' className='mb-3'>
                                <FormLabel>Nom</FormLabel>
                                <FormControl
                                    type='text'
                                    placeholder='Entrez votre nom'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group controlId='email' className='mb-3'>
                                <FormLabel>Adresse Email</FormLabel>
                                <FormControl
                                    type='email'
                                    placeholder='Entrez votre adresse E-mail'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group controlId='password' className='mb-3'>
                                <FormLabel>Mot de passe</FormLabel>
                                <FormControl
                                    type='password'
                                    placeholder='Entrez un nouveau mot de passe'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group controlId='confirmPassword' className='mb-3'>
                                <FormLabel>Confirmation du mot de passe</FormLabel>
                                <FormControl
                                    type='password'
                                    placeholder='Confirmez votre mot de passe'
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </Form.Group>
                            <Button type="submit" variant="primary" className='w-100'>Mise à jour</Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    )
}

export default ProfileScreen
