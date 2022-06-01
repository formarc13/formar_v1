//const {categories, writeCategories} = require('../../data');
const db = require("../../database/models");

module.exports = {
    /* Envia la vista de listado de las categorias */
    list: (req, res) => {
      db.Category.findAll()
      .then((categorias) => {
        res.render('admin/categories/listCategories', {
            titulo: "Categorías",
            categorias
        })
      })
      .catch((error) => res.send(error))
    },
    /* Envia la vista de formulario de creación de categorias */
    categoryAdd: (req, res) => {
      res.render('admin/categories/addCategory', { titulo: "Agregar categoría"})
    },
    /* Recibe los datos del form de creación y guarda el categorias en la DB */
    categoryCreate: (req, res) => {
      db.Category.create({
        name: req.body.name
      }).then((result) => {
        res.redirect("/admin/categorias")
      })
    },
    /* Envia la vista de form de edición de categorias */
    categoryEdit: (req, res) => {
      let categoryId = +req.params.id;

      let categoria = categories.find(emprendimiento => emprendimiento.id === categoryId)

      res.render('admin/categories/editCategory', {
        titulo: "Editar categoria",
        categoria
      })
    },
    /* Recibe los datos actualizados del form de edición */
    categoryUpdate: (req, res) => {
      let categoryId = +req.params.id;
      
      categories.forEach(categoria => {
        if(categoria.id === categoryId){
          categoria.name = req.body.name
        }
      });

      writeCategories(categories);

      res.redirect('/admin/categorias');
    },
    /* Recibe la info de la categoria a eliminar */
    categoryDelete: (req, res) => {
        let categoryId = +req.params.id;

        categories.forEach(categoria => {
            if(categoria.id === categoryId){
                let categoryToDeleteIndex = categories.indexOf(categoria);
                categories.splice(categoryToDeleteIndex, 1)
            }
        })
       
        writeCategories(categories);
       
        res.redirect('/admin/categorias')
    },
    /* Recibe los datos de la categoria a buscar */
    categorySearch: (req, res) => {

    },
}