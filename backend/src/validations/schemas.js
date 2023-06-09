const Joi = require('joi');

const productSchema = Joi.object({
  productId: Joi.number().min(1).required(),
  quantity: Joi.number().min(1).required(),
});

const saleSchema = Joi.array().items(productSchema);

const quantitySchema = Joi.object({
  quantity: Joi.number().min(1).required(),
});

module.exports = {
  productSchema,
  saleSchema,
  quantitySchema,
};