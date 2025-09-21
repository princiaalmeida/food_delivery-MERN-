// Load environment variables at the very top
require("dotenv").config();

// Import database connection and Express app
const connectDB = require("./config/db");
const app = require("./app");

// Connect to MongoDB
connectDB()
  .then(() => console.log("✅ Database connected successfully"))
  .catch((err) => {
    console.error("❌ Database connection failed:", err.message);
    process.exit(1); // Exit process if DB connection fails
  });

// Start the Express server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `🚀 Server running in ${process.env.NODE_ENV || "development"} mode on port ${PORT}`
  );
});
