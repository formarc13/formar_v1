const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const uploadFile = require('../middlewares/uploadAvatar');
const registerValidator = require('../validations/registerValidator');
const loginValidator = require('../validations/loginValidator');
const userInSessionCheck = require('../middlewares/userInSessionCheck');
const userSessionCheck = require("../middlewares/userSessionCheck");
const profileValidator = require("../validations/profileValidator");

/* GET - Renderiza vista login */
router.get('/login', userInSessionCheck, usersController.login);
/* POST - Loguea al usuario */
router.post('/login', loginValidator, usersController.processLogin);
/* GET - Renderiza vista registro */
router.get('/registro', userInSessionCheck, usersController.register);
/* POST - Crea un nnuevo usuario */
router.post('/registro', uploadFile.single('avatar'), registerValidator, usersController.processRegister)
/* GET - Perfil de usuario */
router.get('/perfil', userSessionCheck, usersController.profile);
/* PUT - Edita datos de usuario */
router.put('/perfil', profileValidator ,usersController.profileUpdate)
/* POST - Creación de dirección */
router.post('/direcciones', usersController.addressCreate);
/* DELETE - Eliminación de dirección */
router.delete('/direcciones/:id', usersController.addressDestroy);
/* GET - Logout */
router.get('/logout', usersController.logout);

module.exports = router;