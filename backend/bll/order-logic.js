const { Order, Cart } = require("../models/cart-model");

async function getAllOrdersAmount() {
  try {
    const orders = await Order.find();
    return orders.length;
  } catch (error) {
    return 0;
  }
}
async function checkIfDeliveryDateIsAvailable(deliveryDate) {
  try {
    const orders = await Order.find({ dateOfDelivery: deliveryDate });
    if (orders.length > 3) {
      return false;
    }
    return true;
  } catch (error) {
    return false;
  }
}

async function addNewOrder(order) {
  try {
    const closeCart = await Cart.updateOne(
      { _id: order.cart },
      { $set: { isActive: false } }
    );
    if (closeCart.modifiedCount > 0) {
      await order.save();
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}

async function getOrderDetail(cartId) {
  try {
    const orderDetails = await Order.findOne({ cart: cartId }).populate(
      "client"
    );
    if (orderDetails) {
      return {
        firstName: orderDetails.client.firstName,
        lastName: orderDetails.client.lastName,
        totalPrice: orderDetails.totalPrice,
        city: orderDetails.city,
        street: orderDetails.street,
        createdAt: orderDetails.createdAt,
        dateOfDelivery: orderDetails.dateOfDelivery,
      };
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}

async function getLastOrder(clientId) {
  try {
    const orders = await Order.find({ client: clientId }).sort("-createdAt");
    if (orders) {
      return orders[0];
    }
    return null;
  } catch (error) {
    return null;
  }
}

module.exports = {
  getAllOrdersAmount,
  checkIfDeliveryDateIsAvailable,
  addNewOrder,
  getOrderDetail,
  getLastOrder,
};
