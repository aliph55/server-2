require("dotenv").config();
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "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"
);

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
    console.log("📥 Gelen İstek Body:", req.body); // Log ekledik 🚀
    const { amount, currency, email } = req.body;

    if (!amount || !currency || !email) {
      return res.status(400).json({ error: "Eksik parametreler!" });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      receipt_email: email,
      payment_method_types: ["card"],
    });

    console.log("✅ Payment Intent Created:", paymentIntent);
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("🔥 Hata:", error);
    res.status(500).json({ error: error.message }); // JSON formatında hata döndür
  }
});

// Sunucuyu belirlenen portta çalıştır
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
