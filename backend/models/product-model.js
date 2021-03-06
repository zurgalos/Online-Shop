const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
    },
    price: {
      type: Number,
      trim: true,
      required: true,
      maxlength: 32,
    },
    category: {
      type: ObjectId,
      ref: "CategoryModel",
      required: true,
    },
    imagePath: { type: String, required: true },
  },
  { versionKey: false }
);

module.exports = mongoose.model("ProductModel", productSchema, "products");
