const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.processPayment = async (req, res) => {
  try {
    const myPayment = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: req.body.currency,
      description: req.body.description, 
      receipt_email: req.body.email, 
      payment_method_types: ["card"],
      metadata: {
        company: "SHOPPY",
      },
    });
  
    res.status(200).json({ success: true, client_secret: myPayment.client_secret });
  } catch (error) {
    res.status(500).json({
      error
    })
  }
};

exports.sendStripeApiKey = async (req, res) => {
  res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
};