const {projects, writeProjects} = require('../../data');
const { validationResult } = require('express-validator');
const db = require('../../database/models');

module.exports = {
    /* Envia la vista de listado de emprendimientos */
    list: (req, res) => {
      db.Project.findAll()
      .then(projects => {
        res.render('admin/projects/listProjects', {
            titulo: "Emprendimientos",
            emprendimientos: projects
        })
      } )
    },
    /* Envia la vista de formulario de creación de emprendimiento */
    projectAdd: (req, res) => {
      res.render('admin/projects/addProject', { titulo: "Agregar emprendimiento"})
    },
    /* Recibe los datos del form de creación y guarda el emprendimiento en la DB */
    projectCreate: (req, res) => {
     let errors = validationResult(req);

     if(errors.isEmpty()){
        db.Project.create({
          ...req.body,
          user_id: 4 /* req.session.user.id */
        })
        .then(() => {
          res.redirect('/admin/emprendimientos')
        })
        .catch(error => console.log(error))
     }else{
       res.render('admin/projects/addProject', { 
         titulo: "Agregar emprendimiento",
         errors: errors.mapped(),
         old: req.body
        })
     }
    },
    /* Envia la vista de form de edición de emprendimiento */
    projectEdit: (req, res) => {
      let projectId = +req.params.id;

      db.Project.findByPk(projectId)
      .then(emprendimiento => {
        res.render('admin/projects/editProject', {
          titulo: "Editar emprendimiento",
          emprendimiento
        })
      })
      .catch(error => console.log(error))
    },
    /* Recibe los datos actualizados del form de edición */
    projectUpdate: (req, res) => {
      let errors = validationResult(req);

      if(errors.isEmpty()){
 
      }else{
        
      }
    },
    /* Recibe la info del emprendimiento a eliminar */
    projectDelete: (req, res) => {
        let projectId = +req.params.id;

        projects.forEach(emprendimiento => {
            if(emprendimiento.id === projectId){
                let projectToDeleteIndex = projects.indexOf(emprendimiento);
                projects.splice(projectToDeleteIndex, 1)
            }
        })
       
        writeProjects(projects);
       
        res.redirect('/admin/emprendimientos')
    },
    /* Recibe los datos del emprendimiento a buscar */
    projectSearch: (req, res) => {

    },
}