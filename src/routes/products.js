const express = require('express');
const router = express.Router();
const userProductsController = require('../controllers/userProductsController');

/* Ruta para listar productos */
router.get('/', userProductsController.getAll);
/* Ruta parametrizada de detalle de producto */
router.get('/detalle/:id', userProductsController.getOne)


module.exports = router;