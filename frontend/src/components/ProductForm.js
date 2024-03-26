import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import { createProduct } from '../actions/productActions';

const FormProduct = () => {
    // États locaux pour stocker les données du formulaire
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [category, setCategory] = useState('');
    const [type, setType] = useState('');
    const [countInStock, setCountInStock] = useState(0);
    const dispatch = useDispatch();
    // Fonction de soumission du formulaire
    const submitHandler = (e) => {
        e.preventDefault();
        // Création de l'objet productData à partir des états locaux
        const productData = {
            name,
            description,
            price,
            image,
            category,
            type,
            countInStock,
        };

        // Dispatch l'action pour créer un nouveau produit avec productData
        dispatch(createProduct(productData));

        // Réinitialise les champs après la soumission du formulaire
        setName('');
        setDescription('');
        setPrice(0);
        setImage('');
        setCategory('');
        setType('');
        setCountInStock(0);
    };
    
    return (
        <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
                <Form.Label>Nom</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Entrez le nom du produit'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Form.Group controlId='description'>
                <Form.Label>Description</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Entrez la description du produit'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Form.Group controlId='price'>
                <Form.Label>Prix</Form.Label>
                <Form.Control
                    type='number'
                    placeholder='Entrez le prix du produit'
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Form.Group controlId='image'>
                <Form.Label>Image</Form.Label>
                <Form.Control
                    type='text'
                    placeholder="Entrez l'URL de l'image du produit"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Form.Group controlId='category'>
                <Form.Label>Catégorie</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Entrez la catégorie du produit'
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Form.Group controlId='type'>
                <Form.Label>Type</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Entrez le type du produit'
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Form.Group controlId='countInStock'>
                <Form.Label>Quantité en stock</Form.Label>
                <Form.Control
                    type='number'
                    placeholder='Entrez la quantité en stock'
                    value={countInStock}
                    onChange={(e) => setCountInStock(e.target.value)}
                ></Form.Control>
            </Form.Group>

            {/* Bouton pour soumettre le formulaire */}
            <Button className='redButton' type='submit' variant='primary'>
                Ajouter
            </Button>
        </Form>
    );
};

export default FormProduct;
