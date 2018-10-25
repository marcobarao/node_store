const md5 = require("md5");

const Validator = require("../validators/fluent-validator");
const Repository = require("../repositories/customer.repository");
const emailService = require("../services/email.service");

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
      const customer = await Repository.store({
        name: req.body.name,
        email: req.body.email,
        password: md5(req.body.password + global.SALT_KEY)
      });

      emailService.send(
        req.body.email,
        "Bem vindo a Node Store",
        global.EMAIL_TMPL.replace("{0}", req.body.name)
      );

      return res.status(201).json(customer);
    } catch (e) {
      return res.status(400).json(e);
    }
  }
};
