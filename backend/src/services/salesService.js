const { salesModel } = require('../models');

const findAll = async () => {
    const result = await salesModel.findAll();
    return result;
  };

  const findById = async (id) => {
    const result = await salesModel.findById(id); 
    if (result.length === 0) return { message: 'Sale not found' };
    return result;
  };

  module.exports = {
    findAll,
    findById,
  };