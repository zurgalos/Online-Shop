const Category = require("../models/category-model");

function getAllCategories() {
  return Category.find().exec();
}

module.exports = {
  getAllCategories,
};
