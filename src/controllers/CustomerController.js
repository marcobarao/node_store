const md5 = require("md5");

const Validator = require("../validators/fluent-validator");
const Repository = require("../repositories/customer.repository");
const emailService = require("../services/email.service");
const authService = require("../services/auth.service");

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
        password: md5(req.body.password + global.SALT_KEY),
        roles: ["user"]
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
  },
  async authenticate(req, res) {
    try {
      const customer = await Repository.authenticate({
        email: req.body.email,
        password: md5(req.body.password + global.SALT_KEY)
      });

      if (!customer) {
        return res.status(404).json({ message: "Usuário ou senha inválidos" });
      }

      const token = await authService.generateToken({
        id: customer._id,
        email: customer.email,
        name: customer.name,
        roles: customer.roles
      });

      return res.status(201).json({
        token,
        data: {
          email: customer.email,
          name: customer.name,
          roles: customer.roles
        }
      });
    } catch (e) {
      return res.status(400).json(e);
    }
  },
  async refreshToken(req, res) {
    try {
      const token =
        req.body.token || req.query.token || req.headers["x-access-token"];

      const data = await authService.decodeToken(token);

      const customer = await Repository.getById(data.id);

      if (!customer) {
        return res.status(401).json({ message: "Cliente não autorizado" });
      }

      const tokenData = await authService.generateToken({
        id: customer._id,
        email: customer.email,
        name: customer.name,
        roles: customer.roles
      });

      return res.status(201).json({
        tokenData,
        data: {
          email: customer.email,
          name: customer.name,
          roles: customer.roles
        }
      });
    } catch (e) {
      return res.status(400).json(e);
    }
  }
};
