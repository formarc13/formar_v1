const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin/adminController');
const adminProductsController = require('../controllers/admin/adminProductsController');

/* GET - Index */
router.get('/', adminController.index);

/* ============== */
/* CRUD PRODUCTOS */
/* ============== */
/* GET - Lista de productos */
router.get('/productos', adminProductsController.list);
/* GET - Agregar producto */
router.get('/productos/agregar', adminProductsController.productAdd);
/* POST - Crea un producto en la DB */
router.post('/productos', adminProductsController.productCreate);

module.exports = router;