module.exports = {
  async index(req, res) {},
  async show(req, res) {},
  async store(req, res) {
    return res.status(201).json(req.body);
  },
  async update(req, res) {
    const id = req.params.id;
    return res.status(200).json({ id, item: req.body });
  },
  async destroy(req, res) {
    return res.status(204).send();
  }
};
