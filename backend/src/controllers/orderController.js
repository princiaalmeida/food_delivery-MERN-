const Order = require("../models/Order");
const MenuItem = require("../models/MenuItem");
const { createPaymentIntent } = require("../services/paymentService");

// @desc    Place new order
// @route   POST /api/orders
exports.placeOrder = async (req, res, next) => {
  try {
    const { restaurantId, items, deliveryAddress } = req.body;

    // Fetch menu items
    const menuItems = await MenuItem.find({ _id: { $in: items.map(i => i.menuItemId) } });
    if (!menuItems.length) return res.status(400).json({ message: "Invalid menu items" });

    // Calculate total
    let total = 0;
    const orderItems = items.map(i => {
      const menuItem = menuItems.find(m => m._id.toString() === i.menuItemId);
      total += menuItem.price * i.qty;
      return { ...i, name: menuItem.name, price: menuItem.price };
    });

    // Create order
    const order = await Order.create({
      customer: req.user._id,
      restaurant: restaurantId,
      items: orderItems,
      total,
      deliveryAddress,
    });

    // Create payment intent (Stripe)
    const paymentIntent = await createPaymentIntent(total);

    res.status(201).json({ order, clientSecret: paymentIntent.client_secret });
  } catch (err) {
    next(err);
  }
};

// @desc    Update order status
// @route   PUT /api/orders/:id/status
exports.updateOrderStatus = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = req.body.status || order.status;
    await order.save();

    res.json(order);
  } catch (err) {
    next(err);
  }
};

// @desc    Get order details
// @route   GET /api/orders/:id
exports.getOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("restaurant")
      .populate("items.menuItemId");
    if (!order) return res.status(404).json({ message: "Order not found" });

    res.json(order);
  } catch (err) {
    next(err);
  }
};
