const {getUsers, writeUsers} = require('../data');

module.exports = {
    login: (req, res) => {
        res.render('login', {
            titulo: "Login"
        })
    }, 
    register: (req, res) => {
        res.render('register', {
            titulo: "Registro"
        })
    }, 
    processRegister: (req, res) => {
       //Registrar un usuario - Guardarlo en el JSON
       // Paso 1 - Crear un objeto User

        let lastId = 0;
        getUsers.forEach(user => {
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

        getUsers.push(newUser)

       // Paso 3 - Escribir el JSON de usuarios con el array actual

       writeUsers(getUsers)

       // Paso 4 - Devolver respuesta (redirección)

       res.redirect('/usuarios/login')
    }
}