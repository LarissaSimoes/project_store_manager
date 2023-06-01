const { Router } = require('express');
const { salesController } = require('../controllers');

const router = Router();

router.get('/', salesController.findAll);

router.get('/:id', salesController.findById);

router.post('/', salesController.createSales);

module.exports = router;
