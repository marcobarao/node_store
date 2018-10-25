const mongoose = require("mongoose");
const Customer = mongoose.model("Customer");

module.exports = {
  async store(body) {
    return await Customer.create(body);
  }
};
