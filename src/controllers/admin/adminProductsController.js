const { getProducts, writeProducts } = require('../../data');

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
        /* 1 - Crear el objeto producto */
        let lastId = 0;
        getProducts.forEach(product => {
            if(product.id > lastId){
                lastId = product.id;
            }
        });

        let newProduct = {
            ...req.body, 
            id: lastId + 1,
            image: "desayuno.jpg",
            stock: req.body.stock ? true : false
        }
        
        /* let newProduct = {
            id: lastId + 1,
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            categoryId: req.body.categoryId,
            projectId: req.body.projectId,
            discount: req.body.discount,
            image: "desayuno.jpg",
            stock: req.body.stock ? true : false
        } */

        // Paso 2 - Guardar el nuevo producto en el array de usuarios

        getProducts.push(newProduct)

       // Paso 3 - Escribir el JSON de productos con el array actual

       writeProducts(getProducts)

       // Paso 4 - Devolver respuesta (redirección)

       res.redirect('/admin/productos')
    },
    /* Envia la vista de form de edición de producto */
    productEdit: (req, res) => {
        /* 1 - Obtener el id del producto */
        let idProducto = +req.params.id;
        /* 2 - Buscar el producto a editar */
        let producto = getProducts.find(producto => producto.id === idProducto)
        /* 3 - Mostrar el producto en la vista */
        res.render('admin/products/editProduct', {
            titulo: "Edición",
            producto
        })
    },
    /* Recibe los datos actualizados del form de edición */
    productUpdate: (req, res) => {
        /* 1 - Obtener el id del producto */
        let idProducto = +req.params.id;
        /* 2 - Buscar el producto a editar y modificar el producto */
        getProducts.forEach(producto => {
            if(producto.id === idProducto){
                producto.name = req.body.name
                producto.price = req.body.price
                producto.discount = req.body.discount
                producto.categoryId = req.body.categoryId
                producto.projectId = req.body.projectId
                producto.stock = req.body.stock ? true : false
                producto.description = req.body.description
            }
        })

        /* 3 - Guardar los cambios */
        writeProducts(getProducts);

        /* 4 - Respuesta */
        res.redirect('/admin/productos');
    },
    /* Recibe la info del producto a eliminar */
    productDelete: (req, res) => {

    },
    /* Recibe los datos del producto a buscar */
    productSearch: (req, res) => {

    },
}
