const { products } = require('../data')

module.exports = {
    index: (req, res) => {
        
        res.render('index', {
           titulo: "Homepage",
           products_title: "Productos",
           products,
           css: "home.css",
           session: req.session
        })
    },
    contact: (req, res) => res.send("CONTACTO")
} 

