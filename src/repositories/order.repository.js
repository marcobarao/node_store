const mongoose = require("mongoose");
const Order = mongoose.model("Order");

module.exports = {
  async index() {
    return await Order.find({}, "number status customer items")
      .populate("customer", "name")
      .populate("items.product", "title");
  },
  async store(body) {
    return await Order.create(body);
  }
};
