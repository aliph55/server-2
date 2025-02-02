import express from "express";
import cors from "cors";
import Stripe from "stripe";

const stripe = new Stripe(
  "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",
  {
    apiVersion: "2023-10-16",
  }
);

const app = express();
app.use(cors());
app.use(express.json());

app.post("/create-payment-intent", async (req, res) => {
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
