const express = require("express");
const { orderValidator } = require("../validators/order");
const { runValidation } = require("../validators");
const { Order } = require("../models/cart-model");
const authMiddleware = require("../middleware/auth-middleware");
const ordersLogic = require("../bll/order-logic");

const router = express.Router();

router.get("/orders-amount", async (req, res) => {
  try {
    const totalProductsAmount = await ordersLogic.getAllOrdersAmount();
    return res.status(200).json(totalProductsAmount);
  } catch (error) {
    res.status(500).json({ error: "server error" });
  }
});

router.post(
  "/add-order",
  authMiddleware,
  orderValidator,
  runValidation,
  async (req, res) => {
    try {
      const order = new Order({
        client: req.user._id,
        cart: req.body.cart,
        totalPrice: req.body.totalPrice,
        city: req.body.city,
        street: req.body.street,
        dateOfDelivery: req.body.dateOfDelivery,
        creditCardLastDigits: req.body.creditCardLastDigits,
      });
      const createdOrder = await ordersLogic.addNewOrder(order);
      return res.status(201).json(createdOrder);
    } catch (error) {
      res.status(500).json({ error: "server error" });
    }
  }
);
router.post(
  "/check-if-deliveryDate-available",
  authMiddleware,
  async (req, res) => {
    try {
      const dateOfDelivery = req.body.dateOfDelivery;
      const isDeliveryDateAvailable =
        await ordersLogic.checkIfDeliveryDateIsAvailable(dateOfDelivery);
      return res.status(200).json(isDeliveryDateAvailable);
    } catch (error) {
      res.status(500).json({ error: "server error" });
    }
  }
);

router.get("/get-receipt/:cartId", authMiddleware, async (req, res) => {
  try {
    const detailsNeededForReceipt = await ordersLogic.getOrderDetail(
      req.params.cartId
    );
    if (!detailsNeededForReceipt) {
      return res.status(404).json({ error: "couldn't find an order" });
    }

    res.status(200).json(detailsNeededForReceipt);
  } catch (error) {
    res.status(500).json({ error: "server error" });
  }
});
router.get("/get-last-order", authMiddleware, async (req, res) => {
  try {
    const order = await ordersLogic.getLastOrder(req.user._id);
    if (!order) {
      return res.status(200).json(null);
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: "server error" });
  }
});

module.exports = router;
