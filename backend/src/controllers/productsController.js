const { productsService } = require('../services');

const findAll = async (_req, res) => {
    const result = await productsService.findAll();
    res.status(200).json(result);
    };
  
  const findById = async (req, res) => {
    const { id } = req.params;
    const result = await productsService.findById(id);
  
    if (result.message) {
      return res.status(404).json(result);
    }
    res.status(200).json(result);
  };

  module.exports = {
    findAll,
    findById,
  };