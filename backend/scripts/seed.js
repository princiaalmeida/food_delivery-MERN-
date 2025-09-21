const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connectDB = require("../src/config/db");
const User = require("../src/models/User");
const Restaurant = require("../src/models/Restaurant");
const MenuItem = require("../src/models/MenuItem");

const seed = async () => {
  try {
    await connectDB();

    // Clear old data
    await User.deleteMany();
    await Restaurant.deleteMany();
    await MenuItem.deleteMany();

    // Create users
    const admin = await User.create({
      name: "Admin User",
      email: "admin@example.com",
      password: "123456",
      role: "admin",
    });

    const owner = await User.create({
      name: "Restaurant Owner",
      email: "owner@example.com",
      password: "123456",
      role: "restaurant_owner",
    });

    const customer = await User.create({
      name: "John Doe",
      email: "customer@example.com",
      password: "123456",
      role: "customer",
    });

    // Create restaurant
    const restaurant = await Restaurant.create({
      name: "Pizza Palace",
      address: "123 Main St",
      cuisine: "Italian",
      owner: owner._id,
    });

    // Create menu items
    await MenuItem.insertMany([
      { name: "Margherita Pizza", description: "Classic cheese pizza", price: 9.99, restaurant: restaurant._id },
      { name: "Pepperoni Pizza", description: "Pepperoni & cheese", price: 11.99, restaurant: restaurant._id },
    ]);

    console.log("✅ Seed data created!");
    process.exit();
  } catch (error) {
    console.error("❌ Seed error:", error);
    process.exit(1);
  }
};

seed();
