const mongoose = require("mongoose");
const Product = mongoose.model("Product");

module.exports = {
  async index() {
    return await Product.find({ active: true }, "title price slug");
  },
  async show(slug) {
    return await Product.findOne(
      { slug, active: true },
      "title description price tags slug"
    );
  },
  async showById(id) {
    return await Product.findById(id);
  },
  async showByTags(tags) {
    return await Product.find(
      {
        tags: { $all: tags },
        active: true
      },
      "title price slug"
    );
  },
  async store(body) {
    return await Product.create(body);
  },
  update(id, body) {
    return Product.findByIdAndUpdate(id, body, {
      new: true
    });
  },
  async destroy(id) {
    return await Product.findByIdAndRemove(id);
  }
};
