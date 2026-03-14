require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const webhookRoutes = require("./routes/webhookRoutes");

const app = express();

/**
 * Shopify webhooks require the raw body for HMAC verification.
 * If you verify later, you’ll already have the raw body available.
 */
app.use("/webhooks", bodyParser.raw({ type: "application/json" }), webhookRoutes);

/** Normal JSON parsing for other routes */
app.use(bodyParser.json());

/** Simple health check */
app.get("/", (req, res) => {
  res.send("Shopify Webhook Email App Running 🚀");
});

/**
 * STEP 1: Start OAuth installation
 * Shopify should redirect here first.
 */
app.get("/auth", (req, res) => {
  const shop = req.query.shop;

  if (!shop) {
    return res.status(400).send("Missing shop parameter");
  }

  const redirectUri = `${process.env.HOST}/auth/callback`;

  const installUrl =
    `https://${shop}/admin/oauth/authorize` +
    `?client_id=${process.env.SHOPIFY_API_KEY}` +
    `&scope=read_orders,read_products,read_customers,read_collections` +
    `&redirect_uri=${redirectUri}`;

  console.log("Redirecting to Shopify install URL:", installUrl);

  res.redirect(installUrl);
});

/**
 * STEP 2: OAuth callback
 * Shopify sends the temporary code here
 */
app.get("/auth/callback", async (req, res) => {
  const { shop, code } = req.query;

  try {
    const response = await axios.post(
      `https://${shop}/admin/oauth/access_token`,
      {
        client_id: process.env.SHOPIFY_API_KEY,
        client_secret: process.env.SHOPIFY_API_SECRET,
        code,
      }
    );

    const accessToken = response.data.access_token;

    console.log("SHOPIFY ACCESS TOKEN:", accessToken);

    res.send("App installed successfully ✅");

  } catch (error) {
    console.error("OAuth Error:", error.response?.data || error.message);
    res.status(500).send("Error installing app");
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});