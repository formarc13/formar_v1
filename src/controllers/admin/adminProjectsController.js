const {projects, writeProjects} = require('../../data');

module.exports = {
    /* Envia la vista de listado de emprendimientos */
    list: (req, res) => {
      res.render('admin/projects/listProjects', {
          titulo: "Emprendimientos",
          emprendimientos: projects
      })
    },
    /* Envia la vista de formulario de creación de emprendimiento */
    projectAdd: (req, res) => {
      res.render('admin/projects/addProject', { titulo: "Agregar emprendimiento"})
    },
    /* Recibe los datos del form de creación y guarda el emprendimiento en la DB */
    projectCreate: (req, res) => {
      let lastId = 0;
      projects.forEach(emprendimiento => {
        if(emprendimiento.id > lastId){
          lastId = emprendimiento.id
        }
      });

      let newProject = {
        ...req.body,
        id: lastId + 1,
        members: []
      };

      projects.push(newProject);

      writeProjects(projects);

      res.redirect('/admin/emprendimientos');
    },
    /* Envia la vista de form de edición de emprendimiento */
    projectEdit: (req, res) => {
      let projectId = +req.params.id;

      let emprendimiento = projects.find(emprendimiento => emprendimiento.id === projectId)

      res.render('admin/projects/editProject', {
        titulo: "Editar emprendimiento",
        emprendimiento
      })
    },
    /* Recibe los datos actualizados del form de edición */
    projectUpdate: (req, res) => {
      let projectId = +req.params.id;
      
      projects.forEach(emprendimiento => {
        if(emprendimiento.id === projectId){
          emprendimiento.name = req.body.name
          emprendimiento.address = req.body.address
          emprendimiento.phone = req.body.phone
          emprendimiento.description = req.body.description
          emprendimiento.categoryId = req.body.categoryId
        }
      });

      writeProjects(projects);

      res.redirect('/admin/emprendimientos');
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