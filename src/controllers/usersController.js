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
}