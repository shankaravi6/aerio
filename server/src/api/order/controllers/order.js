"use strict";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
// import Stripe from 'stripe';
// const stripe = new Stripe('sk_test_51OPpYOSF01MmEgFzAZEgwHqPvMqevyujmyBp1M8JQk7pcDhJJg7QJh0aJyVv1hWRNU6pNDWuSRZzZPXiKAY00Rh100Wl6GwdLC');

/**
 * order controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  async create(ctx) {
    const { products, userName, email } = ctx.request.body;
    try {
      // retrieve item information
      const lineItems = await Promise.all(
        products.map(async (product) => {
          const item = await strapi
            .service("api::item.item")
            .findOne(product.id);

          return {
            price_data: {
              currency: "usd",
              product_data: {
                name: item.name,
              },
              unit_amount: item.price * 100,
            },
            quantity: product.count,
          };
        })
      );

      // create a stripe session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        customer_email: email,
        mode: "payment",
        success_url: "https://aerio-app.netlify.app/checkout/success",
        cancel_url: "https://aerio-app.netlify.app/",
        line_items: lineItems,
      });

      // create the item
      await strapi
        .service("api::order.order")
        .create({ data: { userName, products, stripeSessionId: session.id } });

      // return the session id
      return { id: session.id };
    } catch (error) {
      ctx.response.status = 500;
      return { error: { message: "There was a problem creating the charge" } };
    }
  },
}));
