// Footer.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from './Footer'; 
import '@testing-library/jest-dom';


// Suite de tests pour le composant Footer
describe('Footer Component', () => {
  // Test pour s'assurer que le Footer est bien rendu avec le texte de copyright
  test('renders the copyright text', () => {
    render(<Footer />);
    expect(screen.getByText(/goodies for mangas/i)).toBeInTheDocument();
  });

  // Test pour vérifier que les informations de contact sont affichées
  test('renders the contact information', () => {
    render(<Footer />);
    expect(screen.getByText(/nous contacter/i)).toBeInTheDocument();
    expect(screen.getByText(/mail : exemple@gmail.com/i)).toBeInTheDocument();
    expect(screen.getByText(/téléphone : 06\.XX\.XX\.XX\.XX/i)).toBeInTheDocument();
    expect(screen.getByText(/disponible tous les jours de 9h à 20h/i)).toBeInTheDocument();
  });
});
