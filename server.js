require("dotenv").config();
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const app = express();
app.use(express.json());
app.use(cors()); // React Native ile iletişim için CORS açık olmalı

// Test endpoint
app.get("/", (req, res) => {
  res.send("Stripe Payment Server is Running 🚀");
});

// Payment Intent oluşturma
app.post("/create-payment-intent", async (req, res) => {
  try {
    const { email, currency, amount } = req.body;

    // Stripe PaymentIntent oluşturma
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      payment_method_types: ["card"], // Sadece kart ile ödeme kabul edilecek
      receipt_email: email, // Kullanıcıya ödeme maili göndermek için
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Payment Intent Error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Sunucuyu belirlenen portta çalıştır
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
