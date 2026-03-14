const express = require("express");
const router = express.Router();

const {
  orderCreated,
  orderCancelled,
  refundCreated,
} = require("../controllers/webhookController");

router.post("/order-created", orderCreated);
router.post("/order-cancelled", orderCancelled);
router.post("/refund-created", refundCreated);

module.exports = router;