import express from "express";
import cors from "cors";
import Stripe from "stripe";

const stripe = new Stripe(
  "pk_test_51NOMvzJzZzpXlpJ7zWvEGa1PkvTXklcmftbzcgsVRXLoTobAHrraQFzfsgR03BHJIqHI4NPHFX6aguRewstvzdn200mMfh226C",
  {
    apiVersion: "2023-10-16",
  }
);

const app = express();
app.use(cors());
app.use(express.json());

app.post("/create-payment-intent", async (req, res) => {
  const { amount, currency, paymentMethodType, metadata } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1000, // 10 USD (cent cinsinden)
      currency: "usd",
      payment_method_types: ["card"],
      metadata,
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Stripe Error:", error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(4242, () => console.log("Server running on port 4242"));
