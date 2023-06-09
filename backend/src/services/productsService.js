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

const createProduct = async (name) => {
    const newProductId = await productsModel.createProduct(name); 
    const newProduct = await productsModel.findById(newProductId);
    return newProduct;
  };

const updateProduct = async (id, name) => {
    const updatedProduct = await productsModel.updateProduct(id, name);
    return updatedProduct;
}; 

  module.exports = {
    findAll,
    findById,
    createProduct,
    updateProduct,
  };