const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin/adminController');
const adminProductsController = require('../controllers/admin/adminProductsController');
const adminProjectsController = require('../controllers/admin/adminProjectsController');
const adminCategoriesController = require('../controllers/admin/adminCategoriesController');
const uploadFile = require('../middlewares/uploadProductImage');
const productCreateValidator = require('../validations/productCreateValidator');
const userSessionCheck = require('../middlewares/userSessionCheck');
const adminCheck = require('../middlewares/adminCheck');
const projectValidator = require('../validations/projectValidator');

/* GET - Index */
router.get('/', userSessionCheck, adminCheck, adminController.index);

/* ============== */
/* CRUD PRODUCTOS */
/* ============== */
/* GET - Lista de productos */
router.get('/productos', /* userSessionCheck, adminCheck, */ adminProductsController.list);
/* GET - Agregar producto */
router.get('/productos/agregar', /* userSessionCheck, adminCheck, */ adminProductsController.productAdd);
/* POST - Crea un producto en la DB */
router.post('/productos', uploadFile.single('image'), productCreateValidator, adminProductsController.productCreate);
/* GET - Editar producto */
router.get('/productos/editar/:id', /* userSessionCheck, adminCheck, */ adminProductsController.productEdit);
/* PUT - Actualiza producto en la DB */
router.put('/productos/:id', adminProductsController.productUpdate);
/* DELETE - Elimina un producto */
router.delete('/productos/eliminar/:id', adminProductsController.productDelete);

/* ==================== */
/* CRUD EMPRENDIMIENTOS */
/* ==================== */
/* GET - Lista de emprendimientos */
router.get('/emprendimientos', /* userSessionCheck, adminCheck, */ adminProjectsController.list);
/* GET - Agregar emprendimiento */
router.get('/emprendimientos/agregar', /* userSessionCheck, adminCheck, */ adminProjectsController.projectAdd);
/* POST - Crea un emprendimiento en la DB */
router.post('/emprendimientos', projectValidator, adminProjectsController.projectCreate);
/* GET - Editar emprendimiento */
router.get('/emprendimientos/editar/:id', /* userSessionCheck, adminCheck, */ adminProjectsController.projectEdit);
/* PUT - Actualiza emprendimiento en la DB */
router.put('/emprendimientos/:id', projectValidator, adminProjectsController.projectUpdate);
/* DELETE - Elimina un emprendimiento */
router.delete('/emprendimientos/eliminar/:id', adminProjectsController.projectDelete);

/* =============== */
/* CRUD CATEGORIAS */
/* =============== */

router.get('/categorias'/* ,userSessionCheck, adminCheck */, adminCategoriesController.list);
/* GET - Agregar emprendimiento */
router.get('/categorias/agregar'/* ,userSessionCheck, adminCheck */, adminCategoriesController.categoryAdd);
/* POST - Crea un emprendimiento en la DB */
router.post('/categorias', adminCategoriesController.categoryCreate);
/* GET - Editar emprendimiento */
router.get('/categorias/editar/:id',/* userSessionCheck, adminCheck, */ adminCategoriesController.categoryEdit);
/* PUT - Actualiza emprendimiento en la DB */
router.put('/categorias/:id', adminCategoriesController.categoryUpdate);
/* DELETE - Elimina un emprendimiento */
router.delete('/categorias/eliminar/:id', adminCategoriesController.categoryDelete);

module.exports = router;