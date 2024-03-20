import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../actions/userActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart, faTimes as solidTimes } from '@fortawesome/free-solid-svg-icons';

const Product = ({ product }) => {
    const { userInfo } = useSelector(state => state.userLogin);
    const { user } = useSelector(state => state.userDetails);
    const dispatch = useDispatch();

    // Détermination si le produit est dans les favoris en vérifiant si son ID est présent dans le tableau des favoris
    const isFavorite = user?.favorites?.some(favorite => favorite._id === product._id);

    // Fonction pour ajouter ou supprimer un produit des favoris
    const toggleFavorite = () => {
        if (isFavorite) {
            dispatch(removeFavorite(product._id));
        } else {
            dispatch(addFavorite(product._id));
        }
    };

    return (
        <Card className='my-3 p-3 rounded'>
            <Link to={`/product/${product._id}`}>
                <Card.Img src={product.image} variant='top' />
            </Link>

            <Card.Body>
                <Link to={`/product/${product._id}`}>
                    <Card.Title as='div'><strong>{product.name}</strong></Card.Title>
                </Link>

                <Card.Text as='div'>
                    <Rating value={product.rating} text={`${product.numReviews} avis`} />
                </Card.Text>
                <Card.Text as='h3'>{`${product.price} €`}</Card.Text>
                {userInfo && (
                    <Button 
                        variant={isFavorite ? 'danger' : 'outline-primary'} 
                        onClick={toggleFavorite} 
                        className="btn-favorite"
                    >
                        <FontAwesomeIcon icon={isFavorite ? solidTimes : solidHeart} size="lg" />
                    </Button>
                )}
            </Card.Body>
        </Card>
    );
};

export default Product;
