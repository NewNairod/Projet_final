import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'
import store from './store.js'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Crée un "root" ReactDOM pour monter l'application React dans le DOM
const root = ReactDOM.createRoot(document.getElementById('root'));

// Utilise le ReactDOM pour rendre l'application React
root.render(
  // Enveloppe le composant racine de l'application dans un Provider pour Redux
  <Provider store={store}>
    <App />
  </Provider>
);

// Fonction pour mesurer les performances de l'application et envoyer les résultats à un endpoint d'analyse
// reportWebVitals(console.log) envoie les résultats de performance à la console
// Cette fonction est appelée pour enregistrer les performances de l'application
reportWebVitals();
