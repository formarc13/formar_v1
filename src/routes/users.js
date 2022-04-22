const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const uploadFile = require('../middlewares/uploadAvatar');
const registerValidator = require('../validations/registerValidator');
const loginValidator = require('../validations/loginValidator');


/* GET - Renderiza vista login */
router.get('/login', usersController.login);
/* POST - Loguea al usuario */
router.post('/login', loginValidator, usersController.processLogin);
/* GET - Renderiza vista registro */
router.get('/registro', usersController.register);
/* POST - Crea un nnuevo usuario */
router.post('/registro', uploadFile.single('avatar'), registerValidator, usersController.processRegister)

module.exports = router;