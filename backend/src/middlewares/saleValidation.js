const { productsModel } = require('../models');

module.exports = async (req, res, next) => {
    const products = await productsModel.findAll();
    const productsIds = products.map((p) => p.id);
    const { body: productsRequestBody } = req;
    const missingProductId = productsRequestBody
    .findIndex((p) => !Object.keys(p).includes('productId'));
    if (missingProductId !== -1) {
      return res.status(400).json({ message: '"productId" is required' });
    }
    const missingQuantity = productsRequestBody
    .findIndex((p) => !Object.keys(p).includes('quantity'));
    if (missingQuantity !== -1) {
      return res.status(400).json({ message: '"quantity" is required' });
    }
    const productsNotFound = productsRequestBody
    .filter((p) => p.productId > 0 && p.quantity > 0 && !productsIds.includes(p.productId));
    if (productsNotFound.length > 0) {
      return res.status(404).json({ message: 'Product not found' });
} return next();
  };