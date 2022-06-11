const { check, body } = require('express-validator');

let validateProject = [
    check("name")
        .notEmpty().withMessage("El nombre es requerido"),
    check("address")
        .notEmpty().withMessage("Campo requerido"),
    check("phone")
        .notEmpty().withMessage("Campo requerido"),
    check("description")
        .notEmpty().withMessage("Campo requerido"),       
    body("images").custom((value, {req}) => {
        if(!(req.files.length > 0)){
            return Promise.reject("Campo requerido")
        }
        return true;
    })     
]

module.exports = validateProject;