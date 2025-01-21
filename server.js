const express = require("express");
const bodyParser = require("body-parser");
const stripe = require("stripe")(
  "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"
); // Stripe secret anahtarınızı buraya koyun
const app = express();

app.use(bodyParser.json());

// Google Pay ödeme işleme rotası
app.post("/create-payment-intent", async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1000, // Ödeme miktarı (cent cinsinden)
      currency: "usd",
      payment_method_types: ["card"], // veya ["card", "google_pay"]
    });

    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error(error);
    res.status(500).send("PaymentIntent creation failed");
  }
});

// Sunucuyu başlat
app.listen(4242, () =>
  console.log("Server is running on http://localhost:4242")
);
