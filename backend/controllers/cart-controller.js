const express = require("express");
const { Cart } = require("../models/cart-model");
const cartLogic = require("../bll/cart-logic");
const authMiddleware = require("../middleware/auth-middleware");
const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
  try {
    const cart = new Cart({ cartItems: [], client: req.user._id });

    const newCart = await cartLogic.opeNewCart(cart);

    res.json(newCart);
  } catch (error) {
    res.status(500).json({ error: "server error" });
  }
});
router.patch("/update-cart", authMiddleware, async (req, res) => {
  try {
    const cart = new Cart({
      _id: req.body._id,
      cartItems: req.body.cartItems,
    });

    const updatedCartResult = await cartLogic.updateCart(cart);
    res.json(updatedCartResult);
  } catch (error) {
    res.status(500).json({ error: "server error" });
  }
});
router.get("/get-cart", authMiddleware, async (req, res) => {
  try {
    const cart = await cartLogic.getActiveCart(req.user._id);

    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: "server error" });
  }
});

module.exports = router;
