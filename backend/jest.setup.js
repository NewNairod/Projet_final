// Importe la bibliothèque jest-dom pour des utilitaires de test supplémentaires
import '@testing-library/jest-dom';

// Définit globalement l'objet TextEncoder en utilisant le module 'util' de Node.js
global.TextEncoder = require('util').TextEncoder;

// Définit globalement l'objet TextDecoder en utilisant le module 'util' de Node.js
global.TextDecoder = require('util').TextDecoder;
