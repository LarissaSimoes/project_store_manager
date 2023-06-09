const { saleSchema, quantitySchema } = require('./schemas');

const validateSale = (product) => {
  const { error } = saleSchema.validate(product);
  return {
    message: error ? error.message.replace(/\[\d\]./, '') : null,
  };
};

const validateQuantity = (quantity) => {
  const { error } = quantitySchema.validate({ quantity });
  if (error) return { message: error.message };

  return { message: null };
};

module.exports = {
  validateSale,
  validateQuantity,
};