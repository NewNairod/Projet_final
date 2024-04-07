import app from './App.js'; // Importe l'application Express depuis le fichier App.js
import colors from 'colors'; // Importe le module colors pour colorer les messages de console

const PORT = process.env.PORT || 5000; // Définit le port sur lequel le serveur va écouter, en utilisant le port spécifié dans les variables d'environnement ou le port 5000 par défaut

const server = app.listen(PORT); // Démarre le serveur en écoutant sur le port spécifié

export default server; // Exporte l'instance du serveur pour être utilisée dans d'autres fichiers, si nécessaire
