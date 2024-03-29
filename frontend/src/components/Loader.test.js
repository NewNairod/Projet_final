// Importation des outils nécessaires pour le test
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Loader from './Loader'; // Assurez-vous que le chemin d'importation est correct

// Test pour vérifier que le composant Loader affiche correctement le spinner
test('displays a loading spinner', () => {
    // Rendre le composant Loader
    render(<Loader />);
    
    // Vérifier que le Spinner est présent dans le document
    expect(screen.getByRole('status')).toBeInTheDocument();
    
    // Vérifier que le texte d'accessibilité est présent
    expect(screen.getByText(/loading .../i)).toBeInTheDocument();
    
    // Vous pouvez également vérifier le style appliqué au Spinner si nécessaire
    const spinner = screen.getByRole('status');
    expect(spinner).toHaveStyle({
        width: '100px',
        height: '100px',
        margin: 'auto',
        display: 'block',
        color: 'black'
    });
});
