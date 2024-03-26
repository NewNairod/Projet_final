import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Form, Button, Modal } from 'react-bootstrap';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listProducts } from '../actions/productActions';
import { useLocation } from 'react-router-dom';
import ProductForm from '../components/ProductForm.js';

const HomeScreen = () => {
    const [category, setCategory] = useState(''); // State pour la catégorie sélectionnée
    const [type, setType] = useState(''); // State pour le type sélectionné
    const [showModal, setShowModal] = useState(false); // State pour contrôler l'ouverture et la fermeture du modal
    const location = useLocation(); // Hook pour obtenir l'objet location
    const keyword = new URLSearchParams(location.search).get('search'); // Obtention du mot-clé de recherche de l'URL
    const dispatch = useDispatch(); // Obtention de la fonction dispatch pour envoyer des actions Redux
    const userLogin = useSelector((state) => state.userLogin); // Extraction des informations de connexion de l'utilisateur depuis le store Redux
    const { userInfo } = userLogin; // Extraction des données d'utilisateur connecté
    const productList = useSelector((state) => state.productList); // Extraction de la liste des produits depuis le store Redux
    const { loading, error, products } = productList; // Extraction des états de chargement, d'erreur et des produits

    useEffect(() => {
        if (keyword) {
            dispatch(listProducts(keyword)); // Dispatch de l'action pour récupérer les produits avec le mot-clé de recherche
        } else {
            dispatch(listProducts()); // Dispatch de l'action pour récupérer tous les produits
        }
    }, [dispatch, keyword]); // Déclenchement de l'effet lorsqu'il y a des changements dans ces dépendances

    const filteredProducts = useMemo(() => { // Utilisation de useMemo pour éviter le recalcul de filteredProducts à chaque rendu
        let result = products;
        if (Array.isArray(result)) {
            if (category) {
                result = result.filter((product) => product.category === category); // Filtrage des produits par catégorie
            }
            if (type) {
                result = result.filter((product) => product.type === type); // Filtrage des produits par type
            }
        }
        return result;
    }, [products, category, type]); // Déclenchement du recalcul si products, category ou type changent

    const handleOpenModal = () => { // Fonction pour ouvrir le modal
        setShowModal(true);
    };

    const handleCloseModal = () => { // Fonction pour fermer le modal
        setShowModal(false);
    };

    return (
        <Row>
            <Col md={3} className="filter-sidebar">
                <h2>Filtres</h2>
                <Form>
                    <Form.Group controlId='filterCategory'>
                        <Form.Label>Catégorie</Form.Label>
                        <Form.Control as='select' value={category} onChange={(e) => setCategory(e.target.value)}>
                            <option value=''>Tous</option>
                            <option value='Mangas'>Mangas</option>
                            <option value='Figurines'>Figurines</option>
                            {/* Autres catégories */}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='filterType'>
                        <Form.Label>Type de Produit</Form.Label>
                        <Form.Control as='select' value={type} onChange={(e) => setType(e.target.value)}>
                            <option value=''>Tous</option>
                            <option value='Shonen'>Shonen</option>
                            <option value='Seinen'>Seinen</option>
                            {/* Autres types */}
                        </Form.Control>
                    </Form.Group>
                </Form>
            </Col>
            <Col md={9}>
                <h1> <strong> Produits </strong> </h1> 
                {userInfo && userInfo.isAdmin && (
                    <Button className='addButton' variant='primary' onClick={handleOpenModal}>Ajouter un produit</Button>
                )}
                {loading ? (
                    <Loader />
                ) : error ? (
                    <Message variant='danger'>{error}</Message>
                ) : (
                    <Row>
                        {filteredProducts && filteredProducts.map((product) => (
                            <Col key={product._id} sm={12} md={6} lg={4}>
                                <Product product={product} />
                            </Col>
                        ))}
                    </Row>
                )}
            </Col>
            {/* Modal pour ajouter un produit */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Ajouter un produit</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* Intégration de ProductForm dans le modal */}
                    <ProductForm />
                </Modal.Body>
                <Modal.Footer>
                    <Button className='redButton' variant="secondary" onClick={handleCloseModal}>Fermer</Button>
                </Modal.Footer>
            </Modal>
        </Row>
    );
};

export default HomeScreen;
