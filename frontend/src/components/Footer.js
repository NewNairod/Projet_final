import React, { useEffect } from 'react'; // Importe React et useEffect depuis la bibliothèque React
import { Container, Row, Col } from 'react-bootstrap'; // Importe les composants Container, Row et Col depuis react-bootstrap pour la mise en page
const Footer = () => { // Définit un composant fonctionnel Footer
    useEffect(() => { // Utilise le hook useEffect pour exécuter une action lors du montage du composant
        const script = document.createElement("script"); // Crée un élément script dans le document
        script.innerHTML = ` // Définit le contenu HTML du script
            window.axeptioSettings = { // Définit les paramètres de configuration pour Axeptio
                clientId: "65c38c5a1cf099702c0c3cf9", // Identifiant client Axeptio
                cookiesVersion: "test-fr-EU", // Version des cookies pour Axeptio
            };
            (function(d, s) { // Fonction anonyme pour insérer le script Axeptio dans le document
                var t = d.getElementsByTagName(s)[0], e = d.createElement(s); // Crée un élément script
                e.async = true; e.src = "//static.axept.io/sdk.js"; // Définit les attributs src et async de l'élément script
                t.parentNode.insertBefore(e, t); // Insère le script avant le premier élément script dans le document
            })(document, "script"); // Appelle la fonction anonyme avec les paramètres document et "script"
        `;
        document.body.appendChild(script); // Ajoute le script au corps du document
        return () => { // Nettoie le script lors du démontage du composant
            document.body.removeChild(script); // Supprime le script du corps du document
        };
    }, []); // Effectue l'action de nettoyage une seule fois après le montage du composant
    
    return ( // Retourne le JSX représentant le contenu du composant
        <footer> {/* Élément footer pour le pied de page */}
            <Container> {/*Conteneur pour regrouper les éléments du pied de page*/}
                <Row> {/* Ligne Bootstrap pour organiser les colonnes du pied de page */}
                    <Col className='text-center py-3'>Copyright &copy; Goodies for mangas</Col> 
                     <Col className='text-center '> {/* Colonne Bootstrap pour les informations de contact */}
                        <div className="text-right"> {/*Div pour aligner le texte à droite */}
                            <p>Nous contacter :</p> {/* Paragraphe pour les informations de contact*/}
                            <p>Mail : exemple@gmail.com</p> {/* Paragraphe pour l'adresse e-mail*/}
                            <p>Téléphone : 06.XX.XX.XX.XX</p> {/* Paragraphe pour le numéro de téléphone*/}
                            <p>Disponible tous les jours de 9h à 20h</p> {/* Paragraphe pour les horaires de disponibilité*/}
                        </div> {/* Ferme la div pour aligner le texte à droite*/}
                    </Col> {/* Ferme la colonne Bootstrap pour les informations de contact*/}
                </Row> {/* Ferme la ligne Bootstrap*/}
            </Container> {/* Ferme le conteneur Bootstrap*/}
        </footer> // Ferme l'élément footer
    );
}
export default Footer; // Exporte le composant Footer pour une utilisation ailleurs dans l'application
