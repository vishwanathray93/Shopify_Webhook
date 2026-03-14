const axios = require("axios");
const refundTemplate = require("../templates/refundTemplate");

exports.sendRefundEmail = async (refund) => {

  try {

    const orderId = refund.order_id;

    // fetch order from Shopify
    const response = await axios.get(
      `https://${process.env.SHOPIFY_STORE}/admin/api/2024-01/orders/${orderId}.json`,
      {
        headers: {
          "X-Shopify-Access-Token": process.env.SHOPIFY_ACCESS_TOKEN,
          "Content-Type": "application/json"
        }
      }
    );

    const order = response.data.order;

    const html = refundTemplate({
      ...refund,
      order
    });

    await transporter.sendMail({
      from: `"Store" <${process.env.SMTP_USER}>`,
      to: order.email,
      subject: `Refund Processed for Order #${order.name}`,
      html
    });

    console.log("Refund email sent to:", order.email);

  } catch (error) {

    console.error("Refund email error:", error.response?.data || error.message);

  }

};