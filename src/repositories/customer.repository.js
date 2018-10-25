const mongoose = require("mongoose");
const Customer = mongoose.model("Customer");

module.exports = {
  async authenticate(data) {
    return await Customer.findOne({
      email: data.email,
      password: data.password
    });
  },
  async store(body) {
    return await Customer.create(body);
  }
};
