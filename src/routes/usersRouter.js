const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const uploadFile = require('../middlewares/uploadAvatar');


/* GET - Renderiza vista login */
router.get('/login', usersController.login);
/* GET - Renderiza vista registro */
router.get('/registro', usersController.register);
/* POST - Crea un nnuevo usuario */
router.post('/registro', uploadFile.single('avatar'),usersController.processRegister)

module.exports = router;