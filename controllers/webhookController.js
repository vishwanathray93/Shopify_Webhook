const emailService = require("../services/emailService");
const recommendation = require("../utils/productRecommendation");

exports.orderCreated = async (req, res) => {

  try {

    // Shopify webhook payload comes as raw buffer
    const order = JSON.parse(req.body.toString());

    console.log("Order received:", order.id);

    if (!order.line_items || order.line_items.length === 0) {
      console.log("No products found in order");
      return res.status(200).send("No products in order");
    }

    const products = order.line_items;

    const recommended = await recommendation.getRecommendedProducts(products);

    await emailService.sendOrderCreatedEmail(order, recommended);

    res.status(200).send("Order email sent");

  } catch (err) {
    console.error("Order webhook error:", err);
    res.status(500).send("Error processing order webhook");
  }

};



exports.orderCancelled = async (req, res) => {

  try {

    const order = JSON.parse(req.body.toString());

    console.log("Order cancelled:", order.id);

    await emailService.sendOrderCancelledEmail(order);

    res.status(200).send("Cancel email sent");

  } catch (err) {
    console.error("Cancel webhook error:", err);
    res.status(500).send("Error processing cancel webhook");
  }

};



exports.refundCreated = async (req, res) => {

  try {

    const refund = JSON.parse(req.body.toString());

    console.log("Refund created:", refund.id);

    await emailService.sendRefundEmail(refund);

    res.status(200).send("Refund email sent");

  } catch (err) {
    console.error("Refund webhook error:", err);
    res.status(500).send("Error processing refund webhook");
  }

};