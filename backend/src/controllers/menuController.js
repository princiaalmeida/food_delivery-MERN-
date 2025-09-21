const MenuItem = require("../models/MenuItem");

// Get menu items by restaurant ID
exports.getMenuByRestaurant = async (req, res) => {
  try {
    const restaurantId = req.params.restaurantId;
    const menuItems = await MenuItem.find({ restaurant: restaurantId });
    res.json(menuItems);
  } catch (err) {
    console.error("Error fetching menu items:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Add menu item (protected)
exports.addMenuItem = async (req, res) => {
  try {
    const { name, description, price, imageUrl } = req.body;
    const restaurantId = req.params.restaurantId;

    const menuItem = new MenuItem({
      name,
      description,
      price,
      imageUrl,
      restaurant: restaurantId,
    });

    await menuItem.save();
    res.status(201).json(menuItem);
  } catch (err) {
    console.error("Error adding menu item:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};
