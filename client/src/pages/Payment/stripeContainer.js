import React from 'react';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './PaymentForm';

const publicKey = "pk_test_51P3L11RwU7phCr0yIkHdg5Inv2qMXWVnACHug89t5OoksKktGI4Ygbu0pWE51juxgqfpFREbq97pPRlENEtVJZjQ00TwYwTacq";
const stripeTestPromise = loadStripe(publicKey);

export default function StripeContainer() {
    return (
        <Elements stripe={stripeTestPromise}>
            <PaymentForm />
        </Elements>
    );
}
