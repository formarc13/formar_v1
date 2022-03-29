const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin/adminIndexController');

/* GET - Index */
router.get('/', adminController.index);

/* ============= */
/* ABM PRODUCTOS */
/* ============= */
/* GET - Products list */
router.get('/productos', adminController.index);
/* GET - Products add */
router.get('/productos/nuevo', adminController.index);
/* POST - Products add */
router.post('/productos', adminController.index);
/* GET - Products edit */
router.get('/productos/:id/editar', adminController.index);
/* PUT - Products edit */
router.put('/productos', adminController.index);
/* DELETE - Products delete */
router.delete('/productos/:id/eliminar', adminController.index);


module.exports = router;