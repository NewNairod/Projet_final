import request from 'supertest';
import app from './App.js'; // Ajustez le chemin d'accès
import { response } from 'express';

describe('API server', () => {
    let token; // Déclaration d'une variable pour stocker le token reçu après l'authentification

    // Teste la route racine '/' pour s'assurer qu'elle répond avec un statut 200 (OK)
    it('responds to / with status 200', async () => {
      const response = await request(app).get('/');
      expect(response.statusCode).toBe(200);
    });
  
    // Teste la route '/api/products' pour vérifier qu'elle renvoie un statut 200 et un contenu de type JSON
    it('responds to /api/products with JSON', async () => {
      const response = await request(app).get('/api/products');
      expect(response.statusCode).toBe(200);
      expect(response.headers['content-type']).toEqual(expect.stringContaining("json"));
      expect(response.body).toBeInstanceOf(Array); // Si vous attendez un tableau de produits
    });
  
    // Teste une route inexistante pour s'assurer qu'elle renvoie un statut 404 (Not Found)
    it('responds to an unknown route with 404 status', async () => {
      const response = await request(app).get('/path/does/not/exist');
      expect(response.statusCode).toBe(404);
    });
  
    // Teste la route de connexion '/api/users/login' avec des données d'authentification
    it('authenticates user and responds with a token', async () => {
      const response = await request(app)
        .post('/api/users/login')
        .send({
          email: 'oral@gmail.com',
          password: 'test' // Assurez-vous que ce sont des identifiants valides pour un utilisateur existant
        });
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('token');
      token = response.body.token; // Stockez le token pour l'utiliser dans les tests suivants
    });
  
    it('creates a new product and responds with the newly created product without unwanted fields', async () => {
        // Assurez-vous que le token a été obtenu dans le test précédent
        if (!token) {
          throw new Error("Authentication token is not set.");
        }
    
        const newProduct = {
          name: 'Test Product',
          price: 19.99,
          description: 'un produit test',
          image: '../frontend/public/images/onepiecetome1.jpg',
          category: 'mangas',
          type: 'shonen',
          countInStock: '32'
        };
    
        const response = await request(app)
          .post('/api/products')
          .set('Authorization', `Bearer ${token}`) // Incluez le token dans l'en-tête de la requête
          .send(newProduct);
        expect(response.statusCode).toBe(201); // En supposant que votre API renvoie 201 pour une création réussie
        expect(response.body).toHaveProperty('_id');
        expect(response.body.name).toBe(newProduct.name);
    });

    // Teste la récupération d'un produit spécifique par son ID via la route GET '/api/products/:id'.
    it('retrieves a specific product by ID', async () => {
            const productId = '65e3b7e7266bcb27bd45fa9c'; 
            const response = await request(app).get(`/api/products/${productId}`);
            expect(response.statusCode).toBe(200);
            expect(response.body).toHaveProperty('_id', productId);
    });

});
