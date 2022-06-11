//const {categories, writeCategories} = require('../../data');
const db = require("../../database/models");

module.exports = {
  /* Envia la vista de listado de las categorias */
  list: (req, res) => {
    db.Category.findAll()
      .then((categorias) => {
        res.render("admin/categories/listCategories", {
          titulo: "Categorías",
          categorias,
        });
      })
      .catch((error) => res.send(error));
  },
  /* Envia la vista de formulario de creación de categorias */
  categoryAdd: (req, res) => {
    res.render("admin/categories/addCategory", { titulo: "Agregar categoría" });
  },
  /* Recibe los datos del form de creación y guarda el categorias en la DB */
  categoryCreate: (req, res) => {
    db.Category.create({
      name: req.body.name,
    })
      .then((result) => {
        res.redirect("/admin/categorias");
      })
      .catch((error) => res.send(error));
  },
  /* Envia la vista de form de edición de categorias */
  categoryEdit: (req, res) => {
    let categoryId = +req.params.id;

    db.Category.findByPk(categoryId)
      .then((categoria) => {
        res.render("admin/categories/editCategory", {
          titulo: "Editar categoria",
          categoria,
        });
      })
      .catch((error) => res.send(error));
  },
  /* Recibe los datos actualizados del form de edición */
  categoryUpdate: (req, res) => {
    let categoryId = +req.params.id;

    db.Category.update(
      {
        name: req.body.name,
      },
      {
        where: {
          id: categoryId,
        },
      }
    )
      .then((result) => {
        if (result) {
          res.redirect("/admin/categorias");
        } else {
          res.send("Ups ocurrio un error");
        }
      })
      .catch((error) => res.send(error));
  },
  /* Recibe la info de la categoria a eliminar */
  categoryDelete: (req, res) => {
    let categoryId = +req.params.id;

    db.Category.destroy({
      where: {
        id: categoryId,
      },
    })
      .then((result) => {
        if (result) {
          res.redirect("/admin/categorias");
        } else {
          res.send("Ups algo rompí");
        }
      })
      .catch((error) => res.send(error));
  },
  /* Recibe los datos de la categoria a buscar */
  categorySearch: (req, res) => {},
};
