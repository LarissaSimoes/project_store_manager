const { productsModel } = require('../models');

const findAll = async () => {
    const result = await productsModel.findAll();
    return result;
  };
  
  const findById = async (id) => {
    const result = await productsModel.findById(id); 
    if (!result) return { message: 'Product not found' };
    return result;
  };

  module.exports = {
    findAll,
    findById,
  };