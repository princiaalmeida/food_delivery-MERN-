const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});

// Create a Payment Intent
exports.createPaymentIntent = async (amount, currency = "usd") => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Stripe expects cents
      currency,
    });
    return paymentIntent;
  } catch (error) {
    throw new Error("Stripe payment failed: " + error.message);
  }
};
