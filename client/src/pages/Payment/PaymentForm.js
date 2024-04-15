import React, { useState, useContext } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { ShopContext } from "../../context/shop-context";
import axios from "axios";
import './payment.css';

const CARD_OPTIONS = {
    iconStyle: "solid",
    style: {
        base: {
            iconColor: "#c4f0ff",
            color: "#fff",
            fontWeight: 500,
            fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
            fontSize: "16px",
            fontSmoothing: "antialiased",
            ":-webkit-autofill": { color: "#fce883" },
            "::placeholder": { color: "#87bbfd" }
        },
        invalid: {
            iconColor: "#ffc7ee",
            color: "#ffc7ee"
        }
    }
};

export default function PaymentForm() {
    const context = useContext(ShopContext);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
        });

        if (!error) {
            try {
                const { id } = paymentMethod;
                const response = await axios.post("http://localhost:8081/payment", {
                    amount: context.payAmount,
                    id
                });

                if (response.data.success) {
                    console.log("Successful payment");
                    setSuccess(true);
                }
            } catch (error) {
                console.error("Payment error:", error);
                setError("An error occurred during payment. Please try again.");
            }
        } else {
            console.error("Stripe error:", error);
            setError(error.message);
        }

        setLoading(false);
    };

    return (
        <>
            {!success ? (
                <form onSubmit={handleSubmit}>
                    <fieldset className="FormGroup">
                        <div className="FormRow">
                            <CardElement options={CARD_OPTIONS} />
                        </div>
                    </fieldset>
                    <button className="pay" disabled={!stripe || loading}>
                        {loading ? "Processing..." : "Pay"}
                    </button>
                    {error && <div className="error">{error}</div>}
                </form>
            ) : (
                <div>
                    <h2>Successful purchase</h2>
                </div>
            )}
        </>
    );
}
