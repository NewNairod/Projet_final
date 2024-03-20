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
    const [category, setCategory] = useState('');
    const [type, setType] = useState('');
    const [showModal, setShowModal] = useState(false); // State pour contrôler l'ouverture et la fermeture du modal
    const location = useLocation();
    const keyword = new URLSearchParams(location.search).get('search');
    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const productList = useSelector((state) => state.productList);
    const { loading, error, products } = productList;

    useEffect(() => {
        if (keyword) {
            dispatch(listProducts(keyword));
        } else {
            dispatch(listProducts());
        }
    }, [dispatch, keyword]);

    const filteredProducts = useMemo(() => {
        let result = products;
        if (Array.isArray(result)) {
            if (category) {
                result = result.filter((product) => product.category === category);
            }
            if (type) {
                result = result.filter((product) => product.type === type);
            }
        }
        return result;
    }, [products, category, type]);
    

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
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
                    {/* Vous pouvez ajouter un bouton Enregistrer ici s'il est nécessaire */}
                </Modal.Footer>
            </Modal>
        </Row>
    );
};

export default HomeScreen;
