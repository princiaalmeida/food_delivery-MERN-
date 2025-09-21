const express = require("express");
const app = express();
const errorHandler = require("./middlewares/errorHandler");


// Body parser
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/restaurants", require("./routes/restaurantRoutes"));
app.use("/api/menus", require("./routes/menuRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));

// Error handler (last middleware)
app.use(errorHandler);

module.exports = app;
