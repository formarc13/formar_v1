const { products } = require('../data');

module.exports = {
    list: (req, res) => {
        res.render("products/products", {
            products,
            titulo:"Productos",
            css: "products.css"
        })
    },
    detail: (req, res) => {
     let productId = +req.params.id;
     let product = products.find(product => product.id === productId);
     res.render("products/productDetail", {
         css: "productDetail.css",
         titulo:"Detalle de producto",
         product
     })
    },
};