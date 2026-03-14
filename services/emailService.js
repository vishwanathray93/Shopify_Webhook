const nodemailer = require("nodemailer");

const orderTemplate = require("../templates/orderCreatedTemplate");
const cancelTemplate = require("../templates/orderCancelledTemplate");
const refundTemplate = require("../templates/refundTemplate");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

exports.sendOrderCreatedEmail = async (order, recommended) => {

  const html = orderTemplate(order, recommended);

  await transporter.sendMail({
    from: `"Store" <${process.env.SMTP_USER}>`,
    to: order.email,
    subject: `Order Confirmation #${order.id}`,
    html,
  });
};

exports.sendOrderCancelledEmail = async (order) => {

  const html = cancelTemplate(order);

  await transporter.sendMail({
    from: `"Store" <${process.env.SMTP_USER}>`,
    to: order.email,
    subject: `Order Cancelled #${order.id}`,
    html,
  });
};

exports.sendRefundEmail = async (refund) => {

  const html = refundTemplate(refund);

  await transporter.sendMail({
    from: `"Store" <${process.env.SMTP_USER}>`,
    to: refund.order.email,
    subject: `Refund Processed`,
    html,
  });
};