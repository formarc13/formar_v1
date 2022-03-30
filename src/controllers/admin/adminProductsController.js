const { getProducts } = require('../../data');

module.exports = {
    /* Envia la vista de listado de productos */
    list: (req, res) => {
        res.render('admin/products/listProducts', {
            titulo: "Listado de productos",
            productos: getProducts
        })
    },
    /* Envia la vista de formulario de creación de producto */
    productAdd: (req, res) => {
        res.render('admin/products/addProduct', {
            titulo: "Agregar producto"
        })
    },
    /* Recibe los datos del form de creación y guarda el producto en la DB */
    productCreate: (req, res) => {

    },
    /* Envia la vista de form de edición de producto */
    productEdit: (req, res) => {

    },
    /* Recibe los datos actualizados del form de edición */
    productUpdate: (req, res) => {

    },
    /* Recibe la info del producto a eliminar */
    productDelete: (req, res) => {

    },
    /* Recibe los datos del producto a buscar */
    productSearch: (req, res) => {

    },
}