const mongoose = require("mongoose");

const Product = mongoose.model("Product");
const Validator = require("../validators/fluent-validator");

function validBody(body, res) {
  let validator = new Validator();
  validator.hasMinLen(
    body.title,
    3,
    "O título deve conter pelo menos 3 caracteres"
  );
  validator.hasMinLen(
    body.slug,
    3,
    "O slug deve conter pelo menos 3 caracteres"
  );
  validator.hasMinLen(
    body.description,
    3,
    "A descrição deve conter pelo menos 3 caracteres"
  );
  validator.hasMinValue(body.price, 0, "O preço deve ser pelo menos R$ 0,01");
  validator.hasMinLen(
    body.tags,
    1,
    "O produto precisa de ao menos uma categória"
  );

  if (!validator.isValid()) {
    return res
      .status(400)
      .json(validator.getErrors())
      .end();
  }
}

module.exports = {
  async index(req, res) {
    try {
      const products = await Product.find({ active: true }, "title price slug");
      return res.status(200).json(products);
    } catch (e) {
      return res.status(404).json(e);
    }
  },
  async show(req, res) {
    const slug = req.params.slug;
    try {
      const product = await Product.findOne(
        { slug, active: true },
        "title description price tags slug"
      );
      return res.status(200).json(product);
    } catch (e) {
      return res.status(404).json(e);
    }
  },
  async showById(req, res) {
    const id = req.params.id;
    try {
      const product = await Product.findById(id);
      return res.status(200).json(product);
    } catch (e) {
      return res.status(404).json(e);
    }
  },
  async showByTags(req, res) {
    const tags = req.params.tags.split(",");
    try {
      const products = await Product.find(
        {
          tags: { $all: tags },
          active: true
        },
        "title price slug"
      );
      return res.status(200).json(products);
    } catch (e) {
      return res.status(404).json(e);
    }
  },
  async store(req, res) {
    validBody(req.body, res);
    try {
      const product = await Product.create(req.body);
      return res.status(201).json(product);
    } catch (e) {
      return res.status(400).json(e);
    }
  },
  async update(req, res) {
    const id = req.params.id;
    try {
      const product = await Product.findByIdAndUpdate(id, req.body, {
        new: true
      });
      return res.status(200).json(product);
    } catch (e) {
      return res.status(400).json(e);
    }
  },
  async destroy(req, res) {
    const id = req.params.id;
    try {
      await Product.findByIdAndRemove(id);
      return res.status(204).send();
    } catch (e) {
      return res.status(400).json(e);
    }
  }
};
