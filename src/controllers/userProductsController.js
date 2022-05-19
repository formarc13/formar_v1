const { products } = require('../data');

module.exports = {
    list: (req, res) => {
        res.render("products/products", {
            products,
            titulo:"Productos",
            css: "products.css",
            session: req.session
        })
    },
    detail: (req, res) => {
     let productId = +req.params.id;
     let producto = products.find(product => product.id === productId);
     res.render("products/productDetail", {
         css: "productDetail.css",
         titulo:"Detalle de producto",
         producto,
         session: req.session
     })
    },
};