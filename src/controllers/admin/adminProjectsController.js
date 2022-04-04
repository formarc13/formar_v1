const {getProjects, writeProjects} = require('../../data');

module.exports = {
    /* Envia la vista de listado de emprendimientos */
    list: (req, res) => {
      res.render('admin/projects/listProjects', {
          titulo: "Emprendimientos",
          emprendimientos: getProjects
      })
    },
    /* Envia la vista de formulario de creación de emprendimiento */
    projectAdd: (req, res) => {
      
    },
    /* Recibe los datos del form de creación y guarda el emprendimiento en la DB */
    projectCreate: (req, res) => {
      
    },
    /* Envia la vista de form de edición de emprendimiento */
    projectEdit: (req, res) => {
     
    },
    /* Recibe los datos actualizados del form de edición */
    projectUpdate: (req, res) => {
      
    },
    /* Recibe la info del emprendimiento a eliminar */
    projectDelete: (req, res) => {
      
    },
    /* Recibe los datos del emprendimiento a buscar */
    projectSearch: (req, res) => {

    },
}