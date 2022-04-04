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
      res.render('admin/projects/addProject', { titulo: "Agregar emprendimiento"})
    },
    /* Recibe los datos del form de creación y guarda el emprendimiento en la DB */
    projectCreate: (req, res) => {
      let lastId = 0;
      getProjects.forEach(emprendimiento => {
        if(emprendimiento.id > lastId){
          lastId = emprendimiento.id
        }
      });

      let newProject = {
        ...req.body,
        id: lastId + 1,
        members: []
      };

      getProjects.push(newProject);

      writeProjects(getProjects);

      res.redirect('/admin/emprendimientos');
    },
    /* Envia la vista de form de edición de emprendimiento */
    projectEdit: (req, res) => {
      let projectId = +req.params.id;

      let emprendimiento = getProjects.find(emprendimiento => emprendimiento.id === projectId)

      res.render('admin/projects/editProject', {
        titulo: "Editar emprendimiento",
        emprendimiento
      })
    },
    /* Recibe los datos actualizados del form de edición */
    projectUpdate: (req, res) => {
      let projectId = +req.params.id;
      
      getProjects.forEach(emprendimiento => {
        if(emprendimiento.id === projectId){
          emprendimiento.name = req.body.name
          emprendimiento.address = req.body.address
          emprendimiento.phone = req.body.phone
          emprendimiento.description = req.body.description
          emprendimiento.categoryId = req.body.categoryId
        }
      });

      writeProjects(getProjects);

      res.redirect('/admin/emprendimientos');
    },
    /* Recibe la info del emprendimiento a eliminar */
    projectDelete: (req, res) => {
        let projectId = +req.params.id;

        getProjects.forEach(emprendimiento => {
            if(emprendimiento.id === projectId){
                let projectToDeleteIndex = getProjects.indexOf(emprendimiento);
                getProjects.splice(projectToDeleteIndex, 1)
            }
        })
       
        writeProjects(getProjects);
       
        res.redirect('/admin/emprendimientos')
    },
    /* Recibe los datos del emprendimiento a buscar */
    projectSearch: (req, res) => {

    },
}