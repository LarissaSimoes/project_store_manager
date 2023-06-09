const { Router } = require('express');
const { salesController } = require('../controllers');
const saleValidation = require('../middlewares/saleValidation');

const router = Router();

router.get('/', salesController.findAll);

router.get('/:id', salesController.findById);

router.post(
'/', 
saleValidation,
salesController.createSale,
);

module.exports = router;
