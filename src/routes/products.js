const express = require('express');
const router = express.Router();
const userProductsController = require('../controllers/userProductsController');

/* Ruta para listar productos */
router.get('/', userProductsController.list);
/* Ruta parametrizada de detalle de producto */
router.get('/detalle/:id', userProductsController.detail)


module.exports = router;