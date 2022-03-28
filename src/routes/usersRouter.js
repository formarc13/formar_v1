const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

/* Ruta login */
router.get('/login', usersController.login);
/* Ruta registro */
router.get('/registro', usersController.register)


module.exports = router;