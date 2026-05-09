import express from "express";
import cors from "cors";
import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.use(cors());
app.use(express.json());

app.post("/create-checkout-session", async (req, res) => {
  try {
    const { finalTotal, origin } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",

      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "StyleMarket Order",
            },
            unit_amount: Math.round(Number(finalTotal) * 100),
          },
          quantity: 1,
        },
      ],

      success_url: `${origin}/html/checkout-success.html`,
      cancel_url: `${origin}/html/cart.html`,
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: error.message,
    });
  }
});

app.listen(4242, () => {
  console.log("Stripe server running on http://localhost:4242");
});
