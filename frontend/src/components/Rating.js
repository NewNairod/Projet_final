import React from 'react'; // Importation du module React
import PropTypes from 'prop-types'; // Importation du module PropTypes pour la validation des types des props
const Rating = ({ value, text, color }) => { // Définition du composant fonctionnel Rating avec destructuring des props
    return (
        <div className="rating"> {/* Début du conteneur pour les étoiles */}
            {/* Première étoile */}
            <span>
                <i
                    className={
                        value >= 1
                            ? 'fas fa-star' // Si la valeur est supérieure ou égale à 1, affiche une étoile pleine
                            : value >= 0.5
                                ? 'fas fa-star-half-alt' // Si la valeur est supérieure ou égale à 0.5, affiche une demi-étoile
                                : 'far fa-star' // Sinon, affiche une étoile vide
                    }
                    style={{ color }} // Définition de la couleur de l'étoile
                ></i>
            </span>
            {/* Deuxième étoile */}
            <span>
                <i
                    className={
                        value >= 2
                            ? 'fas fa-star'
                            : value >= 1.5
                                ? 'fas fa-star-half-alt'
                                : 'far fa-star'
                    }
                    style={{ color }}
                ></i>
            </span>
            {/* Troisième étoile */}
            <span>
                <i
                    className={
                        value >= 3
                            ? 'fas fa-star'
                            : value >= 2.5
                                ? 'fas fa-star-half-alt'
                                : 'far fa-star'
                    }
                    style={{ color }}
                ></i>
            </span>
            {/* Quatrième étoile */}
            <span>
                <i
                    className={
                        value >= 4
                            ? 'fas fa-star'
                            : value >= 3.5
                                ? 'fas fa-star-half-alt'
                                : 'far fa-star'
                    }
                    style={{ color }}
                ></i>
            </span>
            {/* Cinquième étoile */}
            <span>
                <i
                    className={
                        value >= 5
                            ? 'fas fa-star'
                            : value >= 4.5
                                ? 'fas fa-star-half-alt'
                                : 'far fa-star'
                    }
                    style={{ color }}
                ></i>
            </span>
            {/* Affichage du texte associé à l'évaluation si présent */}
            <span>{text && text}</span>
        </div> // Fin du conteneur pour les étoiles
    );
};
Rating.defaultProps = { // Définition des valeurs par défaut des props
    color: '#f8e825' // Couleur par défaut des étoiles
};
Rating.propTypes = { // Validation des types des props
    value: PropTypes.number.isRequired, // La valeur doit être un nombre et est requise
    text: PropTypes.string.isRequired, // Le texte doit être une chaîne de caractères et est requis
    color: PropTypes.string, // La couleur est une chaîne de caractères, mais n'est pas requise
};
export default Rating; // Exportation du composant Rating
