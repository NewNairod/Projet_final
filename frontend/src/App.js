import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Footer from './components/Footer'; // Import du composant Footer
import Header from './components/Header'; // Import du composant Header
import HomeScreen from './screens/HomeScreen'; // Import du composant HomeScreen
import ProductScreen from './screens/ProductScreen'; // Import du composant ProductScreen
import CartScreen from './screens/CartScreen'; // Import du composant CartScreen
import LoginScreen from './screens/LoginScreen'; // Import du composant LoginScreen
import RegisterScreen from './screens/RegisterScreen'; // Import du composant RegisterScreen
import ProfileScreen from './screens/ProfileScreen'; // Import du composant ProfileScreen
import ShippingScreen from './screens/ShippingScreen'; // Import du composant ShippingScreen
import PaymentScreen from './screens/PaymentScreen'; // Import du composant PaymentScreen
import PlaceOrderScreen from './screens/PlaceOrderScreen'; // Import du composant PlaceOrderScreen
import FavoritesScreen from './screens/FavoritesScreen'; // Import du composant FavoritesScreen

const App = () => {
  return (
    <Router>
      <Header /> {/* Affichage du composant Header */}
      <main className='py-3'>
        <Container>
          <Routes> {/* Utilisation de la balise Routes pour définir les routes */}
            {/* Définition des différentes routes de l'application avec les composants associés */}
            <Route path='/payment' element={<PaymentScreen />} />
            <Route path='/placeorder' element={<PlaceOrderScreen />} />
            <Route path='/shipping' element={<ShippingScreen />} />
            <Route path='/profile' element={<ProfileScreen />} />
            <Route path='/register' element={<RegisterScreen />} />
            <Route path='/login' element={<LoginScreen />} />
            <Route path='/product/:id' element={<ProductScreen />} />
            <Route path='/cart/:id?' element={<CartScreen />} />
            <Route path='/' element={<HomeScreen />} exact /> {/* Route par défaut pour la page d'accueil */}
            <Route path='/favorites' element={<FavoritesScreen />} />
          </Routes>
        </Container>
      </main>
      <Footer /> {/* Affichage du composant Footer */}
    </Router>
  );
}
export default App;