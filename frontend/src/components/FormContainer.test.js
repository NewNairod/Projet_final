import React from 'react';
import { render, screen } from '@testing-library/react';
import FormContainer from './FormContainer'; // Ajustez le chemin d'import selon votre structure de dossier
import '@testing-library/jest-dom';

describe('FormContainer Component', () => {
  test('renders children content', () => {
    // Rendre le FormContainer avec un paragraphe comme enfant pour le test
    render(
      <FormContainer>
        <p>Test Content</p>
      </FormContainer>
    );
    // Vérifier si le contenu enfant est présent dans le document
    expect(screen.getByText(/test content/i)).toBeInTheDocument();
  });

  test('is centered using Bootstrap classes', () => {
    const { container } = render(
      <FormContainer>
        <p>Test Centering</p>
      </FormContainer>
    );
    
    // Vérifier que le conteneur principal a la classe 'container'
    expect(container.firstChild).toHaveClass('container');
    
    // Vérifier que l'élément 'row' a la classe correcte pour le centrage
    const row = container.querySelector('.row');
    expect(row).toHaveClass('justify-content-md-center');
    
    // Vérifier que l'élément 'col' existe et possède des classes pour la grille Bootstrap
    const col = row.querySelector('div'); // Supposant que <Col> se rend en tant que <div>
    expect(col).toBeTruthy(); // S'assure que l'élément 'col' est trouvé
  
  });
  
});
