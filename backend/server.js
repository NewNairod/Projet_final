import app from './App.js'; // Ajustez le chemin selon l'organisation de vos fichiers
import colors from 'colors';

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, console.log(`server run on http://localhost:${PORT}`.yellow.bold));

export default server;