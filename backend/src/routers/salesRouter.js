const { Router } = require('express');
const { salesController } = require('../controllers');

const router = Router();

router.get('/', salesController.findAll);

router.get('/:id', salesController.findById);

module.exports = router;
