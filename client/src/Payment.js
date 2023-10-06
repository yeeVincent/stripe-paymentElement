import { useEffect, useState } from "react";

import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { useLocation } from "react-router-dom";
function Payment() {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const price_id = queryParams.get("price_id");
  const appearance = {
    theme: "stripe", // 设置主题为stripe
    variables: {
      fontSizeBase: "14px",
      spacingUnit: "4px",
    },
    rules: {
      ".TabIcon": {},
    },
  };
  const options = {
    mode: "payment", // 付款模式，分为payment和subscription, setup三种
    amount: 1099, // 付款金额，单位为分
    currency: "usd", // 付款货币
    appearance, // 自定义样式
    locale: "en", // 语言
    paymentMethodTypes: ["card"], // 支持的支付方式
  };

  useEffect(() => {
    fetch("/config").then(async (r) => {
      const { publishableKey } = await r.json();
      setStripePromise(loadStripe(publishableKey));
    });
  }, []);

  useEffect(() => {
    fetch("/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ price_id }),
    }).then(async (result) => {
      const { clientSecret } = await result.json();
      setClientSecret(clientSecret);
    });
  }, [price_id]);

  return (
    <>
      <h1>React Stripe and the Payment Element</h1>
      {clientSecret && stripePromise && (
        <Elements
          stripe={stripePromise}
          options={options}>
          <CheckoutForm clientSecret={clientSecret} />
        </Elements>
      )}
    </>
  );
}

export default Payment;
