const Validator = require("../validators/fluent-validator");
const Repository = require("../repositories/customer.repository");

function validBody(body, res) {
  let validator = new Validator();
  validator.hasMinLen(
    body.name,
    3,
    "O Nome deve conter pelo menos 3 caracteres"
  );
  validator.isEmail(body.email, "E-mail inválido");
  validator.hasMinLen(
    body.password,
    6,
    "A Senha deve conter pelo menos 6 caracteres"
  );

  if (!validator.isValid()) {
    return res
      .status(400)
      .json(validator.getErrors())
      .end();
  }
}

module.exports = {
  async store(req, res) {
    validBody(req.body, res);
    try {
      const customer = await Repository.store(req.body);
      return res.status(201).json(customer);
    } catch (e) {
      return res.status(400).json(e);
    }
  }
};
