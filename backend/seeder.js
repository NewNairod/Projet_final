// Importation des modules nécessaires
import dotenv from 'dotenv'
import colors from 'colors'
import users from './data/users.js'
import products from './data/products.js'
import User from './models/userModel.js'
import Product from './models/productModel.js'
import Order from './models/orderModel.js'
import connectDb from './config/db.js'

// Configuration des variables d'environnement à partir du fichier .env
dotenv.config()

// Connexion à la base de données MongoDB
connectDb()

// Fonction asynchrone pour importer des données dans la base de données
const importData = async () => {
    try {
        // Suppression de toutes les commandes, produits et utilisateurs existants dans la base de données
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

        // Insertion des utilisateurs définis dans le fichier users.js dans la base de données
        const createdUsers = await User.insertMany(users)

        // Récupération de l'ID de l'utilisateur administrateur
        const adminUser = createdUsers[0]._id

        // Modification des produits pour associer chaque produit à l'utilisateur administrateur
        const sampleProducts = products.map(product => {
            return { ...product, user: adminUser }
        })

        // Insertion des produits modifiés dans la base de données
        await Product.insertMany(sampleProducts)

        // Affichage d'un message indiquant que les données ont été importées avec succès
        console.log('Data imported ! '.green.inverse)
        // Sortie du processus Node.js
        process.exit();

    } catch (error) {
        // Affichage d'une erreur en cas d'échec de l'importation des données
        console.log(`import error ${error}`.red.inverse)
        // Sortie du processus Node.js avec un code d'erreur
        process.exit(1);
    }
}

// Fonction asynchrone pour supprimer toutes les données de la base de données
const destroyData = async () => {
    try {
        // Suppression de toutes les commandes, produits et utilisateurs existants dans la base de données
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

        // Affichage d'un message indiquant que les données ont été supprimées avec succès
        console.log('Data destroyed ! '.green.inverse)
        // Sortie du processus Node.js
        process.exit();

    } catch (error) {
        // Affichage d'une erreur en cas d'échec de la suppression des données
        console.log(`destroyed error ${error}`.red.inverse)
        // Sortie du processus Node.js avec un code d'erreur
        process.exit(1);
    }
}

// Vérification de l'argument passé en ligne de commande
if (process.argv[2] === '-d') {
    // Si l'argument est '-d', appel de la fonction pour supprimer les données
    destroyData()
} else {
    // Sinon, appel de la fonction pour importer les données
    importData()
}
