const { onRequest } = require("firebase-functions/v2/https");
const Stripe = require("stripe");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

exports.createCheckoutSession = onRequest({ cors: true }, async (req, res) => {
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
    console.error("Stripe checkout error:", error);
    res.status(500).json({ error: error.message });
  }
});
