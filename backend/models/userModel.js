// Importation des modules mongoose et bcrypt
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

// Définition du schéma de l'utilisateur avec mongoose
const userSchema = mongoose.Schema({
    // Champ pour le nom de l'utilisateur
    name: { type: String, require: true },
    // Champ pour l'email de l'utilisateur
    email: { type: String, require: true },
    // Champ pour le mot de passe de l'utilisateur
    password: { type: String, require: true },
    // Champ pour déterminer si l'utilisateur est un administrateur
    isAdmin: { type: Boolean, require: true, default: false },
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
}, { timestamps: true }) // Ajout de timestamps pour enregistrer la date de création et de modification

// Méthode pour vérifier si le mot de passe correspond à celui enregistré dans la base de données
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

// Middleware exécuté avant d'enregistrer un nouvel utilisateur
userSchema.pre('save', async function (next) {
    // Vérification si le mot de passe a été modifié
    if (!this.isModified('password')) {
        next() // Si non modifié, passer au prochain middleware
    }

    // Génération du sel pour le hachage du mot de passe
    const salt = await bcrypt.genSalt(10)
    // Hachage du mot de passe avec le sel généré
    this.password = await bcrypt.hash(this.password, salt)
})

// Création du modèle User avec le schéma défini
const User = mongoose.model('User', userSchema)
// Exportation du modèle User
export default User;
