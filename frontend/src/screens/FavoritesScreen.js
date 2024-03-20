import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listFavorites } from '../actions/userActions';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useNavigate } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap'

const FavoritesScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const userDetails = useSelector((state) => state.userDetails);
    const { loading: loadingFavorites, error: errorFavorites, user } = userDetails;

    useEffect(() => {
        if (!userInfo) {
            navigate('/login');
        } else {
            dispatch(listFavorites());
        }
    }, [dispatch, navigate, userInfo]);

    return (
        <div>
            <h1>Mes Favoris</h1>
            {loadingFavorites ? <Loader /> : errorFavorites ? <Message variant='danger'>{errorFavorites}</Message> : (
                <Row>
                    {user.favorites.map(product => (
                        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                            <Product product={product} />
                        </Col>
                    ))}
                </Row>
            )}
        </div>
    );
};


export default FavoritesScreen;
