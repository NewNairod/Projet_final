const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://localhost:5000', // Adresse du serveur distant
            changeOrigin: true, // Change l'origine de la requête pour éviter les problèmes CORS
        })
    );
};
