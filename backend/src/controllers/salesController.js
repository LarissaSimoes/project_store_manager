const { salesService } = require('../services');

const findAll = async (_req, res) => {
    const result = await salesService.findAll();
    res.status(200).json(result);
    };

  const findById = async (req, res) => {
    const { id } = req.params;
    const result = await salesService.findById(id);

    if (result.message) {
      return res.status(404).json(result);
    }
    res.status(200).json(result);
  };

  const createSale = async (req, res) => {
    const product = req.body;
    const result = await salesService.createSale(product);
    if (result.message) return res.status(422).json(result);
    res.status(201).json(result);
  };

  module.exports = {
    findAll,
    findById,
    createSale,
  };