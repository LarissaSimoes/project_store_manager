const { Router } = require('express');
const { productsController } = require('../controllers');
const { productNameValidation } = require('../middlewares/productNameValidation');

const router = Router();

router.get('/', productsController.findAll);

router.get('/:id', productsController.findById);

router.post('/', productNameValidation, productsController.createProduct);

module.exports = router;