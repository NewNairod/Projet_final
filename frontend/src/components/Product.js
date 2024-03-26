import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../actions/userActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart, faTimes as solidTimes } from '@fortawesome/free-solid-svg-icons';

const Product = ({ product }) => {
    // Obtention des informations sur l'utilisateur connecté et ses détails
    const { userInfo } = useSelector(state => state.userLogin);
    const { user } = useSelector(state => state.userDetails);

    // État pour gérer le basculement de favoris
    const [toggleFavoriteV, setToggleFavoriteV] = useState(false);
    const dispatch = useDispatch();

    // Détermination si le produit est dans les favoris en vérifiant si son ID est présent dans le tableau des favoris
    const isFavorite = user?.favorites?.some(favorite => favorite._id === product._id);
    
    // Fonction pour ajouter ou supprimer un produit des favoris
    const toggleFavorite = () => {
        setToggleFavoriteV(!toggleFavoriteV);
        if (isFavorite) {
            dispatch(removeFavorite(product._id));
        } else {
            dispatch(addFavorite(product._id));
        }
    };

    return (
        <Card className='my-3 p-3 rounded'>
            {/* Lien vers la page de détails du produit */}
            <Link to={`/product/${product._id}`}>
                <Card.Img src={product.image} variant='top' />
            </Link>

            <Card.Body>
                {/* Lien vers la page de détails du produit */}
                <Link to={`/product/${product._id}`}>
                    <Card.Title as='div'><strong>{product.name}</strong></Card.Title>
                </Link>

                {/* Affichage de la notation et du nombre d'avis */}
                <Card.Text as='div'>
                    <Rating value={product.rating} text={`${product.numReviews} avis`} />
                </Card.Text>
                {/* Affichage du prix */}
                <Card.Text as='h3'>{`${product.price} €`}</Card.Text>
                {/* Bouton pour ajouter ou supprimer des favoris */}
                {userInfo && (
                    <Button
                        variant={isFavorite ? "danger" : "outline-primary"}
                        onClick={toggleFavorite}
                        className="btn-favorite"
                    >
                        {!toggleFavoriteV ? (
                            <FontAwesomeIcon
                                icon={isFavorite ? solidTimes : solidHeart}
                                size="lg"
                            />
                        ) : (
                            <FontAwesomeIcon
                                icon={isFavorite ? solidHeart : solidTimes}
                                size="lg"
                            />
                        )}
                    </Button>
                )}
            </Card.Body>
        </Card>
    );
};

export default Product;