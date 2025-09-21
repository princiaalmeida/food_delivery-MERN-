// routes/menuRoutes.js
const express = require("express");
const { getMenuByRestaurant, addMenuItem } = require("../controllers/menuController");

const router = express.Router();

// GET /api/menu/:restaurantId
router.get("/:restaurantId", getMenuByRestaurant);

// POST /api/menu/:restaurantId
router.post("/:restaurantId", addMenuItem);

module.exports = router;
