// Importe le module mongoose pour interagir avec MongoDB
import mongoose from 'mongoose'

// Fonction asynchrone pour connecter l'application à la base de données MongoDB
const connectDb = async () => {
    try {
        // Tente de se connecter à la base de données MongoDB en utilisant l'URI fourni dans les variables d'environnement
        const conn = await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
        // Si la connexion réussit, affiche le nom de l'hôte de la base de données dans la console.
        console.log(`MongoDB Connected : ${conn.connection.host}`.cyan.underline)
    } catch (error) {
        // affichage de l'erreur dans la console
        console.error(`Error : ${error.message}`.red.underline.bold)
        // Arrête le processus en cas d'erreur de connexion
        process.exit(1)
    }
}

export default connectDb
