const { salesModel } = require('../models');
const schema = require('../validations/validations');

const findAll = async () => {
    const result = await salesModel.findAll();
    return result;
  };

  const findById = async (id) => {
    const result = await salesModel.findById(id); 
    if (result.length === 0) return { message: 'Sale not found' };
    return result;
  };

  const createSale = async (product) => {
    const error = schema.validateSale(product);
    if (error.message) return error;
  
    const saleId = await salesModel.createSaleId();
  
    const saleResult = await product.reduce(async (prevPromise, p) => {
      const prevResults = await prevPromise;
      const result = await salesModel.createSale(saleId, p.productId, p.quantity);
      return [...prevResults, result];
    }, Promise.resolve([]));
  
    const object = {
      id: saleId,
      itemsSold: saleResult,
    };
  
    return object;
  };
  
  module.exports = {
    findAll,
    findById,
    createSale,
  };