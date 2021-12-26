const Product = require("../models/product-model");

function addNewProduct(product) {
  return product.save();
}

async function getAllProductsAmount() {
  try {
    const products = await Product.find();
    return products.length;
  } catch (error) {
    return 0;
  }
}

async function updateProduct(product) {
  try {
    const result = await Product.updateOne({ _id: product._id }, product);
    if (result.modifiedCount > 0) {
      return { message: "Product Updated Successfully" };
    } else {
      return { error: "Product Update Failed!" };
    }
  } catch (error) {
    return { error: "Product Update Failed" };
  }
}

async function getProductsByCategory(categoryId) {
  try {
    const products = await Product.find({ category: categoryId });
    return products;
  } catch (error) {
    return { error };
  }
}
async function getProductsForHomePage() {
  try {
    const drinks = await Product.find({
      category: "6194ea91711fe98239c04d34",
    }).limit(3);
    const snacks = await Product.find({
      category: "6194eab4711fe98239c04d49",
    }).limit(3);
    const vegetablesAndFruits = await Product.find({
      category: "6194eb33711fe98239c04d76",
    }).limit(3);
    const meatAndFish = await Product.find({
      category: "6194eb5d711fe98239c04d96",
    }).limit(3);
    const products = {
      drinks,
      snacks,
      vegetablesAndFruits,
      meatAndFish,
    };
    return products;
  } catch (error) {
    return { error };
  }
}

module.exports = {
  addNewProduct,
  getAllProductsAmount,
  updateProduct,
  getProductsByCategory,
  getProductsForHomePage,
};
