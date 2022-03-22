const { getProducts } = require('../data')

module.exports = {
    index: (req, res) => {
        res.render('index', {
           titulo: "Homepage",
           products_title: "Productos",
           productos: getProducts
        })
    },
    contact: (req, res) => res.send("CONTACTO")
} 

