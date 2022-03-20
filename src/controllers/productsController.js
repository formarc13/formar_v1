const { getProducts } = require('../data');


module.exports = {
    getAll: (req, res) => {
        res.set({'content-type':'text/plain;charset=utf-8'})
        getProducts.forEach((element) => {
            res.write(
            `*****************
${element.name}
${element.price}
${element.description}
${element.discount}
`)
        })
        res.end()
    },
    getOne: (req, res) => {
        res.set({'content-type':'text/plain;charset=utf-8'})
        
        let idProducto = +req.params.id;
        
        let product = getProducts.find((product) => product.id === idProducto)
        res.write("Detalle de producto\n")
        res.write(`Nombre: ${product.name}\n`)
        res.write(`Precio: ${product.price}\n`)
        res.write(`Descripción: ${product.description}\n`)
        res.write(`Descuento: ${product.discount}\n`)
        res.end()
    }
};