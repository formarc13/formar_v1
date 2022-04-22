const {users, writeUsers} = require('../data');
const { validationResult } = require('express-validator');

module.exports = {
    login: (req, res) => {
        res.render('users/login', {
            titulo: "Login",
            css: "userForms.css"
        })
    }, 
    processLogin: (req, res) => {
        let errors = validationResult(req);
        if(errors.isEmpty()){
            //Levantar sesión
            res.redirect('/');
        }else{
            res.render('users/login', {
                titulo: "Login",
                css: "userForms.css",
                errors: errors.mapped()
            })
        }
    },
    register: (req, res) => {
        res.render('users/register', {
            titulo: "Registro",
            css: "userForms.css"
        })
    }, 
    processRegister: (req, res) => {
        //Verificar si hubo errores en el form
        let errors = validationResult(req);
      
        //Si no hay errores, crea el usuario
        if(errors.isEmpty()){
            //Código para crear usuario

            //Registrar un usuario - Guardarlo en el JSON
            // Paso 1 - Crear un objeto User

            let lastId = 0;
            users.forEach(user => {
                if(user.id > lastId){
                    lastId = user.id
                }
            });

            let newUser = {
                id: lastId + 1,
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                avatar: req.file ? req.file.filename : "default-image.png"
            }

            // Paso 2 - Guardar el nuevo usuario en el array de usuarios

            users.push(newUser)

            // Paso 3 - Escribir el JSON de usuarios con el array actual

            writeUsers(users)

            // Paso 4 - Devolver respuesta (redirección)

            res.redirect('/usuarios/login')

        }else{
            //Código para mostrar errores
            res.render('users/register', {
                titulo: "Registro",
                css: "userForms.css",
                errors: errors.mapped()
            })
        }
    }
}