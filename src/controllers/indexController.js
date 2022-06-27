const { products } = require('../data')
const db = require("../database/models")
module.exports = {
    index: (req, res) => {
    db.Product.findAll({
        include: [{model: db.ProductImage, as: "productImages"}]
    })
    .then((products) => {
        res.send(products)
        /* res.render('index', {
           titulo: "Homepage",
           products_title: "Productos",
           products,
           css: "home.css",
           session: req.session
        }) */
    }).catch((error) => console.log(error))
    },
    contact: (req, res) => res.send("CONTACTO")
} 

