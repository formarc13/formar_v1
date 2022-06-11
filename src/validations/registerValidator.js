const { check, body } = require('express-validator');
<<<<<<< HEAD
const res = require('express/lib/response');
const db = require('../database/models')
=======
const db = require("../database/models");
>>>>>>> development

let validateRegister = [
    check("name")
        .notEmpty().withMessage('El nombre es requerido').bail()
        .isLength({ min:2 }).withMessage('Ingrese un nombre válido'),
    check("email")
        .notEmpty().withMessage("El email es requerido").bail()
        .isEmail().withMessage("Ingrese un email válido"),
    body("email").custom((value)=>{
        return db.User.findOne({
            where: {
<<<<<<< HEAD
                email: value
            }
        }).then((user) => {
            if(user){
                return Promise.reject('Email ya registrado')
=======
                email: value,
            }
        })
        .then((user) => {
            if(user){
                return Promise.reject("Email ya registrado")
>>>>>>> development
            }
        })
    }),
    check("password")
        .notEmpty().withMessage("Ingrese una contraseña")
        .isLength({min: 8}).withMessage("La contraseña debe tener por lo menos 8 caracteres"), 
    check("password2")
        .notEmpty().withMessage("Reingrese su contraseña"),

    body("password2").custom((value, { req }) => {
        if(value !== req.body.password){
            return false;
        }
        return true;
    }).withMessage("Las contraseñas no coinciden"),

    check("terms")
        .isString("on").withMessage("Debes aceptar los términos y condiciones")
];

module.exports = validateRegister;