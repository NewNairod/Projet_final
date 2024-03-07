import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Form, Button, FormControl} from 'react-bootstrap';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listProducts } from '../actions/productActions';
import { useLocation } from 'react-router-dom';

const HomeScreen = () => {
    const [category, setCategory] = useState('');
    const [type, setType] = useState('');
    const location = useLocation();
    const keyword = new URLSearchParams(location.search).get('search');
    const dispatch = useDispatch();

    const productList = useSelector((state) => state.productList);
    const { loading, error, products } = productList;

    useEffect(() => {
        dispatch(listProducts());
    }, [dispatch]);

    useEffect(() => {
        dispatch(listProducts(keyword));
    }, [dispatch, keyword]);

    let filteredProducts = products;

    if (Array.isArray(products)) {
        if (category) {
            filteredProducts = filteredProducts.filter((product) => product.category === category);
        }
        if (type) {
            filteredProducts = filteredProducts.filter((product) => product.type === type);
        }
    }

    return (
        <>
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
                                {/* Other categories */}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='filterType'>
                            <Form.Label>Type de Produit</Form.Label>
                            <Form.Control as='select' value={type} onChange={(e) => setType(e.target.value)}>
                                <option value=''>Tous</option>
                                <option value='Shonen'>Shonen</option>
                                <option value='Seinen'>Seinen</option>
                                {/* Other types */}
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Col>
                <Col md={9}>
                    <h1>Les derniers produits</h1>
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
            </Row>
        </>
    );
};

export default HomeScreen;
