import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Message from '../components/Message.js'
import { Row, Col, Button, Form, FormLabel, FormControl } from 'react-bootstrap'
import { getUserDetails, updateUserProfile } from '../actions/userActions.js'
import Loader from '../components/Loader.js'

const ProfileScreen = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)


    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const { loading, error, user } = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success } = userUpdateProfile

    const navigate = useNavigate()

    useEffect(() => {
        if (!userInfo) {
            navigate(`/login`)
        } else {
            if (!user.name) {
                console.log(`user name not exist ${user}`)
                dispatch(getUserDetails('profile'))
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [dispatch, userInfo, navigate, user])

    const submitHandler = (e) => {

        e.preventDefault()

        if (password !== confirmPassword) {
            setMessage('Le mot de passe doit être identique')
        } else {
            dispatch(updateUserProfile({ id: user._id, name, email, password }))
        }
    }

    return <Row>
        <Col md={3}>
            <h1>User profile</h1>
            {message && <Message variant='danger'>{message}</Message>}
            {success && <Message variant='success'>Profile Updated success</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                    <FormLabel>Name</FormLabel>
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
                    <FormLabel>Mot de passe</FormLabel>
                    <FormControl
                        type='password'
                        placeholder='Saisir votre mot de passe'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    >

                    </FormControl>
                </Form.Group>

                <Form.Group controlId='confirmPassword'>
                    <FormLabel>Confirmation du mot de passe</FormLabel>
                    <FormControl
                        type='password'
                        placeholder='Confirmez votre mot de passe'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    >

                    </FormControl>
                </Form.Group>
                <Button type="submit" variant="primary">Mise à Jour</Button>
            </Form>
        </Col>
        <Col md={9}>

        </Col>
    </Row>
}

export default ProfileScreen