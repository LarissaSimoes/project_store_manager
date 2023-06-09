const { Router } = require('express');
const { productsController } = require('../controllers');
const { productNameValidation } = require('../middlewares/productNameValidation');
const productIdValidation = require('../middlewares/productIdValidation');

const router = Router();

router.get('/', productsController.findAll);

router.get('/:id', productsController.findById);

router.post('/', productNameValidation, productsController.createProduct);

router.put('/:id', productNameValidation, productIdValidation, productsController.updateProduct);

module.exports = router;