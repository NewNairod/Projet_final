import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import User from '../models/userModel.js'

// Authentifie un utilisateur et renvoie un token JWT si les identifiants sont valides
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body // Extrait email et mot de passe de la requête
    console.log(`email = ${email} password = ${password}`);
    const user = await User.findOne({ email }) // Cherche un utilisateur par email
    console.log(`utilisateur trouvé = ${JSON.stringify(user)}`);
    // Vérifie si l'utilisateur existe et si le mot de passe correspond
    if (user && (await user.matchPassword(password))) {
        // Si authentification réussie, renvoie les infos de l'utilisateur avec un token
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        // Si échec d'authentification, renvoie une erreur 401
        res.status(401)
        throw new Error(`Mauvais email ou mot de passe`)
    }
})
// Récupère le profil de l'utilisateur connecté
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id) // Trouve l'utilisateur par son ID

    if (user) {
        // Si l'utilisateur est trouvé, renvoie ses informations
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })
    } else {
        // Si l'utilisateur n'est pas trouvé, renvoie une erreur 404
        res.status(404)
        throw new Error(`Utilisateur non trouvé`)
    }
})

// Crée un nouvel utilisateur
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body // Extrait les informations nécessaires de la requête

    const userExists = await User.findOne({ email }) // Vérifie si un utilisateur avec cet email existe déjà

    if (userExists) {
        // Si l'utilisateur existe déjà, renvoie une erreur 400
        res.status(400)
        throw new Error('Utilisateur déjà existant')
    } else {
        // Si l'utilisateur n'existe pas, crée un nouvel utilisateur
        const user = await User.create({
            name,
            email,
            password
        })

        if (user) {
            // Si la création est réussie, renvoie les informations de l'utilisateur
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
            })
        } else {
            // Si échec de la création, renvoie une erreur 400
            res.status(400)
            throw new Error(`Données utilisateur inexistante`)
        }
    }
})

// Met à jour le profil de l'utilisateur
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id) // Trouve l'utilisateur par son ID

    if (user) {
        // Met à jour les informations de l'utilisateur selon la requête
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        if (req.body.password) {
            user.password = req.body.password
        }

        // Sauvegarde les modifications
        const updatedUser = await user.save()

        // Renvoie les informations de l'utilisateur mis à jour avec un nouveau token
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id)
        })
    } else {
        // Si l'utilisateur n'est pas trouvé, renvoie une erreur 404
        res.status(404)
        throw new Error(`Utilisateur non trouvé`)
    }
})

export { authUser, getUserProfile, registerUser, updateUserProfile }
