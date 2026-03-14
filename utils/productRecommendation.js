const axios = require("axios");

exports.getRecommendedProducts = async (products) => {

  try {

    if (!products || products.length === 0) {
      console.log("No products in order for recommendation");
      return [];
    }

    const purchasedProductId = products[0].product_id;

    const url = `https://${process.env.SHOPIFY_STORE}/admin/api/2024-01/products.json?limit=10`;

    const res = await axios.get(url, {
      headers: {
        "X-Shopify-Access-Token": process.env.SHOPIFY_ACCESS_TOKEN,
        "Content-Type": "application/json"
      }
    });

    let recommended = res.data.products;

    // remove the purchased product from recommendations
    recommended = recommended.filter(p => p.id !== purchasedProductId);

    // return top 4 products
    return recommended.slice(0, 4);

  } catch (error) {

    console.error("Recommendation error:", error.response?.data || error.message);
    return [];

  }

};