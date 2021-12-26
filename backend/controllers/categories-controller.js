const express = require("express");
const categoryLogic = require("../bll/category-logic");
const authMiddleware = require("../middleware/auth-middleware");

const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
  try {
    const categories = await categoryLogic.getAllCategories();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: "server error" });
  }
});

module.exports = router;
