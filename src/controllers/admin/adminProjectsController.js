const { validationResult } = require('express-validator');
const db = require('../../database/models');
const fs = require('fs');
const path = require('path');

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
          user_id: 4 
        })
        .then((project) => {
            let arrayImages = req.files.map(image => {
             return {
               imageName: image.filename,
               project_id: project.id
             } 
            })

            db.ProjectImage.bulkCreate(arrayImages)
            .then(() => res.redirect('/admin/emprendimientos'))
            .catch(error => console.log(error))
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
        db.Project.update({
          ...req.body,
          user_id: 4 /* req.session.user.id */
        },{
          where: {
            id: req.params.id,
          }
        })
        .then(() => {
          if(req.files !== undefined){
            //1 - Preguntar si está subiendo imagenes
            if(req.files.length > 0){
              //2 - Traer imágenes del project
              //2 - a. obtener todas las imágenes del proyecto
              db.ProjectImage.findAll({
                where: {
                  project_id: req.params.id,
                }
              })
              .then((images) => {
                //2 - b. hacer un array con los nombres de las imagenes.
                let imageNames = images.map(image => image.imageName);
                //3 - Eliminar imagenes del servidor
                imageNames.forEach(image => {
                  if(fs.existsSync(path.join(__dirname, `../../../public/images/projects/${image}`))){
                    fs.unlinkSync(path.join(__dirname, `../../../public/images/projects/${image}`))
                  }else{
                    console.log("-- No se encontró el archivo");
                  }
                });
                //4 - Eliminar las imágenes de la tabla
                db.ProjectImage.destroy({
                  where: {
                    project_id: req.params.id,
                  }
                })
                .then(() => {
                  //5 - Cargar nuevas imágenes
                  let arrayImages = req.files.map(image => {
                    return {
                      imageName: image.filename,
                      project_id: req.params.id
                    } 
                   })
       
                   db.ProjectImage.bulkCreate(arrayImages)
                   .then(() => res.redirect('/admin/emprendimientos'))
                   .catch(error => console.log(error))
                })
                .catch(error => console.log(error))
              })
              .catch(error => console.log(error))
            }else{
              res.redirect('/admin/emprendimientos')
            }
          }
        })
        .catch(error => console.log(error))
      }else{
        let projectId = +req.params.id;

        
        db.Project.findByPk(projectId)
        .then(emprendimiento => {
          res.render('admin/projects/editProject', {
            titulo: "Editar emprendimiento",
            emprendimiento,
            errors: errors.mapped(),
            old: req.body
          })
        })
        .catch(error => console.log(error))
      }
    },
    /* Recibe la info del emprendimiento a eliminar */
    projectDelete: (req, res) => {
      let projectId = +req.params.id;

      db.ProjectImage.findAll({
        where: {
          project_id: projectId,
        }
      })
      .then((images) => {
        let imageNames = images.map(image => image.imageName);

        imageNames.forEach(image => {
          if(fs.existsSync(path.join(__dirname, `../../../public/images/projects/${image}`))){
            fs.unlinkSync(path.join(__dirname, `../../../public/images/projects/${image}`))
          }else{
            console.log("-- No se encontró el archivo");
          }
        });

        db.ProjectImage.destroy({
          where: {
            project_id: projectId,
          }
        })
        .then(() => {
          //Eliminar los productos
          db.Product.destroy({
            where: {
              project_id: projectId,
            }
          })
          .then(() => {
            db.Project.destroy({
              where: {
                id: projectId
              }
            })
            .then(() => res.redirect('/admin/emprendimientos'))
            .catch((error) => console.log(error))
          })
          .catch((error) => console.log(error))
        })
      })
      .catch((error) => console.log(error))
    },
    /* Recibe los datos del emprendimiento a buscar */
    projectSearch: (req, res) => {

    },
}