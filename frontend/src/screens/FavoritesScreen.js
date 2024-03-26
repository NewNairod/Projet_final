import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listFavorites } from '../actions/userActions'; // Importation de l'action pour récupérer la liste des favoris
import Product from '../components/Product'; // Importation du composant Product pour afficher chaque produit favori
import Loader from '../components/Loader'; // Importation du composant Loader pour afficher pendant le chargement
import Message from '../components/Message'; // Importation du composant Message pour afficher les erreurs
import { useNavigate } from 'react-router-dom'; // Importation de useNavigate pour la navigation
import { Row, Col } from 'react-bootstrap'; // Importation des composants de grille de Bootstrap

const FavoritesScreen = () => {
    const dispatch = useDispatch(); // Obtention de la fonction dispatch pour envoyer des actions Redux
    const navigate = useNavigate(); // Obtention de la fonction navigate pour la navigation
    const userLogin = useSelector((state) => state.userLogin); // Extraction des informations de connexion de l'utilisateur depuis le store Redux
    const { userInfo } = userLogin; // Extraction des données d'utilisateur connecté
    const userDetails = useSelector((state) => state.userDetails); // Extraction des détails de l'utilisateur depuis le store Redux
    const { loading: loadingFavorites, error: errorFavorites, user } = userDetails; // Extraction des états de chargement, d'erreur et des données utilisateur

    useEffect(() => {
        if (!userInfo) { // Vérification si l'utilisateur est connecté
            navigate('/login'); // Redirection vers la page de connexion si l'utilisateur n'est pas connecté
        } else {
            dispatch(listFavorites()); // Dispatch de l'action pour récupérer la liste des favoris
        }
    }, [dispatch, navigate, userInfo]); // Déclenchement de l'effet lorsqu'il y a des changements dans ces dépendances

    return (
        <div>
            {/* Titre de la page des favoris */}
            <h1>Mes Favoris</h1> 
            {loadingFavorites ? <Loader /> : errorFavorites ? <Message variant='danger'>{errorFavorites}</Message> : ( // Affichage d'un loader pendant le chargement, ou d'un message d'erreur en cas d'erreur, sinon affichage des favoris
                <Row>
                    {user.favorites.map(product => ( // Boucle sur les produits favoris de l'utilisateur
                    // Grille de colonnes Bootstrap pour afficher chaque produit
                        <Col key={product._id} sm={12} md={6} lg={4} xl={3}> 
                        {/* Affichage du composant Product pour chaque produit favori */}
                            <Product product={product} /> 
                        </Col>
                    ))}
                </Row>
            )}
        </div>
    );
};
export default FavoritesScreen;
