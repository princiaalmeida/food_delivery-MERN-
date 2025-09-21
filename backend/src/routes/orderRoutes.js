const express = require("express");
const router = express.Router();
const {
  placeOrder,
  updateOrderStatus,
  getOrder,
} = require("../controllers/orderController");

const auth = require("../middlewares/auth");
const authorize = require("../middlewares/authorize");

// Place new order (customer)
router.post("/", auth, authorize("customer"), placeOrder);

// Get single order (customer or restaurant owner or admin)
router.get("/:id", auth, getOrder);

// Update order status (restaurant owner or admin)
router.put(
  "/:id/status",
  auth,
  authorize("restaurant_owner", "admin"),
  updateOrderStatus
);

module.exports = router;
