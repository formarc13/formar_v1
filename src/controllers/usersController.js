const { users, writeUsers } = require("../data");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const db = require("../database/models");

module.exports = {
  login: (req, res) => {
    res.render("users/login", {
      titulo: "Login",
      css: "userForms.css",
      session: req.session,
    });
  },
  processLogin: (req, res) => {
    let errors = validationResult(req);
    if (errors.isEmpty()) {
      //Levantar sesión
      db.User.findOne({ where: { email: req.body.email } })
        .then((user) => {
          req.session.user = {
            id: user.id,
            name: user.name,
            avatar: user.avatar,
            email: user.email,
            rol: user.rol,
          };

          if (req.body.remember) {
            const TIME_IN_MILISECONDS = 60000;
            res.cookie("formarCookie", req.session.user, {
              expires: new Date(Date.now() + TIME_IN_MILISECONDS),
              httpOnly: true,
              secure: true,
            });
          }

          res.locals.user = req.session.user;

          res.redirect("/");
        })
        .catch((error) => res.send(error));
    } else {
      res.render("users/login", {
        titulo: "Login",
        css: "userForms.css",
        errors: errors.mapped(),
        session: req.session,
      });
    }
  },
  register: (req, res) => {
    res.render("users/register", {
      titulo: "Registro",
      css: "userForms.css",
      session: req.session,
    });
  },
  processRegister: (req, res) => {
    //Verificar si hubo errores en el form
    let errors = validationResult(req);

    //Si no hay errores, crea el usuario
    if (errors.isEmpty()) {
      db.User.create({
        name: req.body.name,
        email: req.body.email,
        rol_id: 4,
        password: bcrypt.hashSync(req.body.password, 10),
        avatar: req.file ? req.file.filename : "default-image.png",
      })
        .then((user) => {
          res.redirect("/usuarios/login");
        })
        .catch((error) => res.send(error));
    } else {
      //Código para mostrar errores
      res.render("users/register", {
        titulo: "Registro",
        css: "userForms.css",
        errors: errors.mapped(),
        old: req.body,
        session: req.session,
      });
    }
  },
  profile: (req, res) => {
    db.User.findOne({
      where: {
        id: req.session.user.id,
      },
      include: [{ association: "addresses" }],
    })
      .then((user) => {
        res.render("users/userProfile", {
          session: req.session,
          user,
          titulo: req.session.user.name,
          css: "userProfile.css"
        });
      })
      .catch((error) => res.send(error));
  },
  addressCreate: (req, res) => {
    db.Address.create({
      ...req.body,
      user_id: req.session.user.id,
    })
    .then(() => {
      res.redirect("/usuarios/perfil")
    })
    .catch((error) => res.send(error));

  },
  addressUpdate: (req, res) => {
    db.Address.update({
      ...req.body,
      user_id: req.session.user.id,
    },{
      where: {
        id: req.session.user.id,
      }
    })
    .then((result) => {
      if(result){
        res.redirect("/usuarios/perfil")
      }else{
        res.send("Hubo un error")
      }
    })
    .catch((error) => res.send(error));
  },
  addressDestroy: (req, res) => {
    db.Address.destroy({
      where: {
        id: req.params.id,
      }
    })
    .then((result) => {
      if(result){
        res.redirect("/usuarios/perfil")
      }else{
        res.send("Hubo un error")
      }
    })
    .catch((error) => res.send(error));
  },
  logout: (req, res) => {
    req.session.destroy();

    if (req.cookies.formarCookie) {
      res.cookie("formarCookie", "", { maxAge: -1 });
    }

    res.redirect("/");
  },
};
