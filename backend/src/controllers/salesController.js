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

  const createSales = async (req, res) => {
    const sale = req.body;
    const result = await salesService.createSales(sale);
    console.log(result);
    res.status(201).json(result);
  };

  module.exports = {
    findAll,
    findById,
    createSales,
  };