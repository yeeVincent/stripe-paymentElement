const express = require("express");
const app = express();
const { resolve } = require("path");
// Replace if using a different env file or config
const env = require("dotenv").config({ path: "./.env" });
console.log(process.env.STATIC_DIR, "STATIC_DIR");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-08-01",
});

const goodsMap = {
  price_1NyET4KuMZn11UP4dw7XsSmb: {
    currency: "usd",
    amount: 200,
  },
  price_1NyESlKuMZn11UP4CrF59jB8: {
    currency: "usd",
    amount: 500,
  },
  price_1NyESUKuMZn11UP4UjfL0rga: {
    currency: "usd",
    amount: 1000,
  },
};

app.use(express.json());
app.use(express.static(process.env.STATIC_DIR));

app.get("/", (req, res) => {
  const path = resolve(process.env.STATIC_DIR + "/index.html");
  res.sendFile(path);
});

app.get("/config", (req, res) => {
  res.send({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  });
});

app.post("/create-payment-intent", async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create(
      goodsMap[req.body.price_id]
    );

    // Send publishable key and PaymentIntent details to client
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (e) {
    return res.status(400).send({
      error: {
        message: e.message,
      },
    });
  }
});

app.listen(5252, () =>
  console.log(`Node server listening at http://localhost:5252`)
);
