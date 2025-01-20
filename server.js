const express = require("express");
const bodyParser = require("body-parser");
const stripe = require("stripe")(
  "sk_test_51NOMvzJzZzpXlpJ7WmWOWotv5bq9wXQKJcTFZ060Gf4Z5oKxGtHPJRG9R4WDaXnq2sVkgg5GkleQJFCPVJzBuJoR00v32Rzpc2"
); // Stripe secret anahtarınızı buraya koyun
const app = express();

app.use(bodyParser.json());

// Google Pay ödeme işleme rotası
app.post("/create-payment-intent", async (req, res) => {
  try {
    // Ödeme miktarını ve para birimini istemciden alın
    const { amount, currency } = req.body;

    // PaymentIntent oluşturun
    const paymentIntent = await stripe.paymentIntents.create({
      amount, // Ödeme miktarı (cent cinsinden, örn. 10 TL için 1000 gönderilir)
      currency, // Para birimi (örn. 'usd', 'eur', 'try')
      payment_method_types: ["card"], // Kartla ödeme
    });

    res.send({
      clientSecret: paymentIntent.client_secret, // İstemciye client_secret gönderin
    });
  } catch (error) {
    console.error("Error creating PaymentIntent:", error);
    res.status(500).send({ error: error.message });
  }
});

// Sunucuyu başlat
app.listen(4242, () =>
  console.log("Server is running on http://localhost:4242")
);
