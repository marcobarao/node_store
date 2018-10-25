const guid = require("guid");

const Repository = require("../repositories/order.repository");

module.exports = {
  async index(req, res) {
    try {
      const orders = await Repository.index();
      return res.status(200).json(orders);
    } catch (e) {
      return res.status(404).json(e);
    }
  },
  async store(req, res) {
    const data = {
      customer: req.body.customer,
      number: guid.raw().substring(0, 6),
      items: req.body.items
    };
    try {
      const order = await Repository.store(data);
      return res.status(201).json(order);
    } catch (e) {
      return res.status(400).json(e);
    }
  }
};
