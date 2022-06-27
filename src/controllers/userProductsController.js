const { products } = require('../data');
const db = require('../database/models');
const ProductImage = require('../database/models/ProductImage');

module.exports = {
    list: (req, res) => {
        db.Product.findAll()
            .then((products) => {
                res.render("products/products", {
                    products,
                    titulo:"Productos",
                    css: "products.css",
                    session: req.session
                })
            }).catch((error) => console.log(error))
    },
    detail: (req, res) => {
     let productId = +req.params.id;
     db.Product.findOne({
         where: {
            id: productId
         }, 
         include: [{model: db.ProductImage, as: "productImages"}]
     }).then((producto) => {
         res.render("products/productDetail", {
             css: "productDetail.css",
             titulo:"Detalle de producto",
             producto,
             session: req.session
         })
     }).catch((error) => console.log(error))
    },
};