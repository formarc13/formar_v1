const {users, writeUsers} = require('../data');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const db = require("../database/models");

module.exports = {
    login: (req, res) => {
        res.render('users/login', {
            titulo: "Login",
            css: "userForms.css",
            session: req.session
        })
    }, 
    processLogin: (req, res) => {
        let errors = validationResult(req);
        if(errors.isEmpty()){
            //Levantar sesión
            db.User.findOne({
                where: {
                    email: req.body.email
                }
            })
            .then((user) => {
                req.session.user = {
                    id: user.id,
                    name: user.name,
                    avatar: user.avatar,
                    email: user.email,
                    rol: user.rol_id
                }
    
                if(req.body.remember){
                    const TIME_IN_MILISECONDS = 60000;
                    res.cookie('formarCookie', req.session.user, {
                        expires: new Date(Date.now() + TIME_IN_MILISECONDS),
                        httpOnly: true,
                        secure: true
                    })
                }
    
                res.locals.user = req.session.user
    
                res.redirect('/')
            })
            .catch(error => console.log(error))
        }else{
            res.render('users/login', {
                titulo: "Login",
                css: "userForms.css",
                errors: errors.mapped(),
                session: req.session
            })
        }
    },
    register: (req, res) => {

        res.render('users/register', {
            titulo: "Registro",
            css: "userForms.css",
            session: req.session
        }) 
    }, 
    processRegister: (req, res) => {
        //Verificar si hubo errores en el form
        let errors = validationResult(req);
      
        //Si no hay errores, crea el usuario
        if(errors.isEmpty()){
            db.User.create({
                name: req.body.name,
                email: req.body.email,
                rol_id: 4,
                password: bcrypt.hashSync(req.body.password, 10),
                avatar: req.file ? req.file.filename : "default-image.png"
            })
            .then((user) => {
                res.redirect("/usuarios/login")
            })
            .catch(error => res.send(error))
        }else{
            //Código para mostrar errores
            res.render('users/register', {
                titulo: "Registro",
                css: "userForms.css",
                errors: errors.mapped(),
                session: req.session,
                old: req.body
            })
        }
    },
    profile: (req, res) => {

    },
    addressCreate: (req, res) => {

    },
    addressDestroy: (req, res) => {

    },
    logout: (req, res) => {
        req.session.destroy();

        if(req.cookies.formarCookie){
            res.cookie('formarCookie', "", { maxAge: -1 })
        }

        res.redirect('/')
    }
}