const express = require("express");
const router = express.Router();
const {
  createRestaurant,
  getRestaurants,
  getRestaurantById,
} = require("../controllers/restaurantController");

const auth = require("../middlewares/auth");
const authorize = require("../middlewares/authorize");

// Only restaurant owners can create restaurants
router.post("/", auth, authorize("restaurant_owner", "admin"), createRestaurant);

// Public routes
router.get("/", getRestaurants);        // GET /api/restaurants
router.get("/:id", getRestaurantById);  // GET /api/restaurants/:id

module.exports = router;
