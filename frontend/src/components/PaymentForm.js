import React from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

const PaymentForm = ({ totalPrice, navigate }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      console.log("Stripe n'est pas chargé");
      return;
    }

    try {
      const response = await fetch('/api/orders/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: Math.round(totalPrice * 100) }), // Le montant est attendu en centimes pour Stripe
      });
      
      const data = await response.json();

      if (data.error || !data.clientSecret) {
        console.error("Erreur lors de la récupération du clientSecret", data.error);
        return;
      }
      
      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: { card: elements.getElement(CardElement) },
      });

      if (result.error) {
        console.error(result.error.message);
      } else {
        if (result.paymentIntent.status === 'succeeded') {
          navigate('/payment-success');
        }
      }
    } catch (error) {
      console.error("Erreur lors de la soumission", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Payer {totalPrice.toFixed(2)}€
      </button>
    </form>
  );
};

export default PaymentForm;