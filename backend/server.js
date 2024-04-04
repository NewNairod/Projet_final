import app from './App.js';
import colors from 'colors';

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, console.log(`server run on ${PORT}`.yellow.bold));

export default server;