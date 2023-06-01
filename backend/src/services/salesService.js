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

  const createSales = async (salesData) => {
    const teste = {
      id: await salesModel.createSales(salesData),
      itemsSold: salesData,
    };
    // console.log(teste);
    return teste;
  };

  module.exports = {
    findAll,
    findById,
    createSales,
  };