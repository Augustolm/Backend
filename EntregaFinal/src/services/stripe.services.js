import Stripe from "stripe";
export default class PaymentService {
  constructor() {
    this.initializeStripe();
  }

  async initializeStripe() {
    while (!process.env.APP_SECRET_PAYMENT) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    this.stripe = new Stripe(process.env.APP_SECRET_PAYMENT);
  }

  async createPaymentIntent(amount) {
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount,
      currency: "usd",
      payment_method_types: ["card"],
      metadata: { integration_check: "accept_a_payment" },
    });
    return paymentIntent;
  }

  async createSession(products, email, success_url, cancel_url) {
    try {
      const session = await this.stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: products.map((product) => ({
          price_data: {
            currency: "usd",
            product_data: {
              name: product.title,
            },
            unit_amount: product.price * 100,
          },
          quantity: 1,
        })),
        mode: "payment",
        customer_email: email,
        success_url: success_url,
        cancel_url: cancel_url,
      });

      console.log("session", session);
      return session;
    } catch (error) {
      console.log("Error al crear la sesión de pago", error);
    }
  }

  async confirmPaymentIntent(paymentIntentId) {
    const paymentIntent = await this.stripe.paymentIntents.confirm(
      paymentIntentId
    );
    return paymentIntent;
  }
}
