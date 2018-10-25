const mongoose = require("mongoose");

const Product = mongoose.model("Product");
const Validator = require("../validators/fluent-validator");
const Repository = require("../repositories/product.repository");

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
      const products = await Repository.index();
      return res.status(200).json(products);
    } catch (e) {
      return res.status(404).json(e);
    }
  },
  async show(req, res) {
    try {
      const product = await Repository.show(req.params.slug);
      return res.status(200).json(product);
    } catch (e) {
      return res.status(404).json(e);
    }
  },
  async showById(req, res) {
    try {
      const product = await Repository.showById(req.params.id);
      return res.status(200).json(product);
    } catch (e) {
      return res.status(404).json(e);
    }
  },
  async showByTags(req, res) {
    try {
      const products = await Repository.showByTags(req.params.tags.split(","));
      return res.status(200).json(products);
    } catch (e) {
      return res.status(404).json(e);
    }
  },
  async store(req, res) {
    validBody(req.body, res);
    try {
      const product = await Repository.store(req.body);
      return res.status(201).json(product);
    } catch (e) {
      return res.status(400).json(e);
    }
  },
  async update(req, res) {
    try {
      const product = await Repository.update(req.params.id, req.body);
      return res.status(200).json(product);
    } catch (e) {
      return res.status(400).json(e);
    }
  },
  async destroy(req, res) {
    try {
      await Repository.destroy(req.params.id);
      return res.status(204).send();
    } catch (e) {
      return res.status(400).json(e);
    }
  }
};
