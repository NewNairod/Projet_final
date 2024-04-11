import React, { useState } from 'react';
import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js';

const PaymentForm = ({ totalPrice, navigate }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isPaymentProcessing, setPaymentProcessing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setPaymentProcessing(true); // Début du traitement

    if (!stripe || !elements) {
      console.log("Stripe n'est pas chargé");
      setPaymentProcessing(false); // Arrêt du traitement
      return;
    }

    try {
      const response = await fetch('https://projet-final-backend.vercel.app/api/orders/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: Math.round(totalPrice * 100) }), // Le montant est attendu en centimes pour Stripe
      });
      
      const data = await response.json();

      if (data.error || !data.clientSecret) {
        console.error("Erreur lors de la récupération du clientSecret", data.error);
        setPaymentProcessing(false); // Arrêt du traitement
        return;
      }
      
      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: { 
          card: elements.getElement(CardNumberElement),
          billing_details: {
          },
        },
      });

      if (result.error) {
        console.error(result.error.message);
        setPaymentProcessing(false); // Arrêt du traitement
      } else {
        if (result.paymentIntent.status === 'succeeded') {
          navigate('/payment-success');
        }
      }
    } catch (error) {
      console.error("Erreur lors de la soumission", error);
      setPaymentProcessing(false); // Arrêt du traitement
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="cardNumber" style={{ fontWeight: 'bold' }} >Numéro de carte</label>
        <CardNumberElement id="cardNumber" />
      </div>
      <div>
        <label htmlFor="cardExpiry" style={{ fontWeight: 'bold' }} >Date d'expiration</label>
        <CardExpiryElement id="cardExpiry" />
      </div>
      <div>
        <label htmlFor="cardCvc" style={{ fontWeight: 'bold' }} >CVC</label>
        <CardCvcElement id="cardCvc" />
      </div>
      <button type="submit" disabled={!stripe || isPaymentProcessing}>
        {isPaymentProcessing ? 'Traitement...' : `Payer ${totalPrice.toFixed(2)}€`}
      </button>
    </form>
  );
};

export default PaymentForm;
