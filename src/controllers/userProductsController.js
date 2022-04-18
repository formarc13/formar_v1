const { products } = require('../data');

module.exports = {
    list: (req, res) => {
        res.render("products/products", {
            products
        })
    },
    detail: (req, res) => {
     
    },
};