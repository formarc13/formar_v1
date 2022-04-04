const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin/adminController');
const adminProductsController = require('../controllers/admin/adminProductsController');
const adminProjectsController = require('../controllers/admin/adminProjectsController');

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
/* GET - Editar producto */
router.get('/productos/editar/:id', adminProductsController.productEdit);
/* PUT - Actualiza producto en la DB */
router.put('/productos/:id', adminProductsController.productUpdate);
/* DELETE - Elimina un producto */
router.delete('/productos/eliminar/:id', adminProductsController.productDelete);

/* ==================== */
/* CRUD EMPRENDIMIENTOS */
/* ==================== */
/* GET - Lista de emprendimientos */
router.get('/emprendimientos', adminProjectsController.list);
/* GET - Agregar emprendimiento */
router.get('/emprendimientos/agregar', adminProjectsController.projectAdd);
/* POST - Crea un emprendimiento en la DB */
router.post('/emprendimientos', adminProjectsController.projectCreate);
/* GET - Editar emprendimiento */
router.get('/emprendimientos/editar/:id', adminProjectsController.projectEdit);
/* PUT - Actualiza emprendimiento en la DB */
router.put('/emprendimientos/:id', adminProjectsController.projectUpdate);
/* DELETE - Elimina un emprendimiento */
router.delete('/emprendimientos/eliminar/:id', adminProjectsController.projectDelete);

/* =============== */
/* CRUD CATEGORIAS */
/* =============== */
/* 
    1- Crear rutas del CRUD
    2- Crear controlador con métodos del CRUD y de vistas de formularios
    3- Renderizar vista de lista de categorias
    4- Renderizar vista de form de creacion
    5- Escribir método de creación de categoría
    6- Renderizar vista de form de edición
    7- Escribir método de actualización de categoría
    8- Escribir método de eliminación de categoría
*/

module.exports = router;