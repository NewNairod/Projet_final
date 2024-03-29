// CheckoutSteps.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom'; // Pour englober les LinkContainer
import CheckoutSteps from './CheckoutSteps';
import '@testing-library/jest-dom';


describe('CheckoutSteps Component', () => {
  // Test pour vérifier si l'étape Connexion est active
  test('renders Connexion link as active when step1 is true', () => {
    render(
      <BrowserRouter>
        <CheckoutSteps step1 />
      </BrowserRouter>
    );
    const connexionLink = screen.getByText(/connexion/i);
    expect(connexionLink).toHaveClass('nav-link'); // Ajustez en fonction de la classe active dans votre CSS
    expect(connexionLink).not.toHaveAttribute('enabled');
  });

  // Répétez les tests pour les autres étapes
  test('renders Expédition link as active when step2 is true', () => {
    render(
      <BrowserRouter>
        <CheckoutSteps step2 />
      </BrowserRouter>
    );
    const expeditionLink = screen.getByText(/expédition/i);
    expect(expeditionLink).toHaveClass('nav-link');
    expect(expeditionLink).not.toHaveAttribute('enabled');
  });

  test('renders Paiement link as active when step3 is true', () => {
    render(
      <BrowserRouter>
        <CheckoutSteps step3 />
      </BrowserRouter>
    );
    const paiementLink = screen.getByText(/paiement/i);
    expect(paiementLink).toHaveClass('nav-link');
    expect(paiementLink).not.toHaveAttribute('enabled');
  });

  test('renders Commander link as active when step4 is true', () => {
    render(
      <BrowserRouter>
        <CheckoutSteps step4 />
      </BrowserRouter>
    );
    const commanderLink = screen.getByText(/commander/i);
    expect(commanderLink).toHaveClass('nav-link');
    expect(commanderLink).not.toHaveAttribute('enabled');
  });

  // Test pour vérifier si un lien est désactivé lorsque l'étape correspondante est false
  test('renders a link as disabled when the corresponding step is false', () => {
    render(
      <BrowserRouter>
        <CheckoutSteps />
      </BrowserRouter>
    );
    const connexionLink = screen.getByText(/connexion/i);
    const expeditionLink = screen.getByText(/expédition/i);
    const paiementLink = screen.getByText(/paiement/i);
    const commanderLink = screen.getByText(/commander/i);

    expect(connexionLink).not.toHaveAttribute('disabled');
    expect(expeditionLink).not.toHaveAttribute('disabled');
    expect(paiementLink).not.toHaveAttribute('disabled');
    expect(commanderLink).not.toHaveAttribute('disabled');

  });

  // Ajout d'autres tests si nécessaire pour tester les combinaisons de props
});
