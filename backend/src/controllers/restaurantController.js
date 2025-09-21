const Restaurant = require("../models/Restaurant");

// @desc    Create a new restaurant
// @route   POST /api/restaurants
exports.createRestaurant = async (req, res, next) => {
  try {
    const { name, address, cuisine } = req.body;

    const restaurant = await Restaurant.create({
      name,
      address,
      cuisine,
      owner: req.user._id,
    });

    res.status(201).json(restaurant);
  } catch (err) {
    next(err);
  }
};

// @desc    Get all restaurants
// @route   GET /api/restaurants
exports.getRestaurants = async (req, res, next) => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (err) {
    next(err);
  }
};

// @desc    Get restaurant by ID
// @route   GET /api/restaurants/:id
exports.getRestaurantById = async (req, res, next) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) return res.status(404).json({ message: "Restaurant not found" });

    res.json(restaurant);
  } catch (err) {
    next(err);
  }
};
