const { check } = require('express-validator');

let validateProject = [
    check("name")
        .notEmpty().withMessage("El nombre es requerido"),
    check("address")
        .notEmpty().withMessage("Campo requerido"),
    check("phone")
        .notEmpty().withMessage("Campo requerido"),
    check("description")
        .notEmpty().withMessage("Campo requerido") 
]

module.exports = validateProject;