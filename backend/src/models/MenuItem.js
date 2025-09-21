const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
    imageUrl: { type: String }, // optional food image
  },
  { timestamps: true }
);

module.exports = mongoose.model("MenuItem", menuItemSchema);
