const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'https://final-seven.vercel.app', // Adresse du serveur distant
            changeOrigin: true, // Change l'origine de la requête pour éviter les problèmes CORS
        })
    );
};
