const { check, body } = require('express-validator');
/* 
    CAMPOS A VALIDAR
    "name": string,
    "price": number,
    "categoryId": number,
    "projectId": number,
    "stock": boolean,
*/
let validateProduct = [
    check("name")
        .notEmpty().withMessage("El nombre es requerido").bail()
        .isAlphanumeric().withMessage("Ingresa un nombre válido")
        .isLength({min: 5}).withMessage("El nombre debe tener al menos 5 caracteres"),
    check("price")
        .notEmpty().withMessage("Ingresa un precio").bail()
        .isNumeric().withMessage("Sólo números"),
    check("categoryId")
        .notEmpty().withMessage("Selecciona una categoría"),
    check("projectId")
        .notEmpty().withMessage("Selecciona un emprendimiento"),
    body("discount").custom(value => {
        if(value >= 0 && value <= 100){
            return true;
        }
        return false;
    }).withMessage("El descuento tiene que tener un valor entre 0 y 100")        
]

module.exports = validateProduct;