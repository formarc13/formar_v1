const { validationResult } = require('express-validator');
const db = require("../../database/models")

module.exports = {
    /* Envia la vista de listado de productos */
    list: (req, res) => {
        db.Product.findAll()
        .then((products)=> {
            res.render('admin/products/listProducts', {
                titulo: "Listado de productos",
                productos: products
            })
        })
        .catch(error => console.log(error))
    },
    /* Envia la vista de formulario de creación de producto */
    productAdd: (req, res) => {
        let projectsPromise = db.Project.findAll();
        let categoriesPromise = db.Category.findAll();

        Promise.all([projectsPromise, categoriesPromise])
        .then(([projects, categories]) => {
            res.render('admin/products/addProduct', {
                titulo: "Agregar producto",
                projects,
                categories  
            })
        } )
    },
    /* Recibe los datos del form de creación y guarda el producto en la DB */
    productCreate: (req, res) => {
        let errors = validationResult(req);
        if(errors.isEmpty()){
            /* 1 - Crear el objeto producto */
            db.Product.create({
                ...req.body,
                stock: req.body.stock ? 1 : 0
            })
            .then((product) => {
                let arrayImages = req.files.map(image => {
                    return {
                      imageName: image.filename,
                      productId: product.id
                    } 
                   })
       
                   db.ProductImage.bulkCreate(arrayImages)
                   .then(() => res.redirect('/admin/productos'))
                   .catch(error => console.log(error))
            })
        }else{
            let projectsPromise = db.Project.findAll();
            let categoriesPromise = db.Category.findAll();
    
            Promise.all([projectsPromise, categoriesPromise])
            .then(([projects, categories]) => {
                res.render('admin/products/addProduct', {
                    titulo: "Agregar producto",
                    projects,
                    categories,
                    errors: errors.mapped(),
                    old: req.body 
                })
            } )
        }
    },
    /* Envia la vista de form de edición de producto */
    productEdit: (req, res) => {
        let idProducto = +req.params.id;
        let productPromise = db.Product.findByPk(idProducto)
        let projectsPromise = db.Project.findAll();
        let categoriesPromise = db.Category.findAll();

        Promise.all([productPromise, projectsPromise, categoriesPromise])
        .then(([producto, projects, categories]) => {
          res.render('admin/products/editProduct', {
            titulo: "Edición",
            producto,
            projects, 
            categories
          })
        })
        .catch(error => console.log(error))
    },
    /* Recibe los datos actualizados del form de edición */
    productUpdate: (req, res) => {
        let errors = validationResult(req);

      if(errors.isEmpty()){
        db.Product.update({
          ...req.body,
          stock: req.body.stock ? 1 : 0
        },{
          where: {
            id: req.params.id,
          }
        })
        .then(() => {
          if(req.files !== undefined){
            //1 - Preguntar si está subiendo imagenes
            if(req.files.length > 0){
              //2 - Traer imágenes del project
              //2 - a. obtener todas las imágenes del proyecto
              db.ProductImage.findAll({
                where: {
                  productId: req.params.id,
                }
              })
              .then((images) => {
                //2 - b. hacer un array con los nombres de las imagenes.
                let imageNames = images.map(image => image.imageName);
                //3 - Eliminar imagenes del servidor
                imageNames.forEach(image => {
                  if(fs.existsSync(path.join(__dirname, `../../../public/images/products/${image}`))){
                    fs.unlinkSync(path.join(__dirname, `../../../public/images/products/${image}`))
                  }else{
                    console.log("-- No se encontró el archivo");
                  }
                });
                //4 - Eliminar las imágenes de la tabla
                db.ProductImage.destroy({
                  where: {
                    productId: req.params.id,
                  }
                })
                .then(() => {
                  //5 - Cargar nuevas imágenes
                  let arrayImages = req.files.map(image => {
                    return {
                      imageName: image.filename,
                      producId: req.params.id
                    } 
                   })
       
                   db.ProductImage.bulkCreate(arrayImages)
                   .then(() => res.redirect('/admin/productos'))
                   .catch(error => console.log(error))
                })
                .catch(error => console.log(error))
              })
              .catch(error => console.log(error))
            }else{
              res.redirect('/admin/productos')
            }
          }
        })
        .catch(error => console.log(error))
      }else{
        let idProducto = +req.params.id;
        let productPromise = db.Product.findByPk(idProducto)
        let projectsPromise = db.Project.findAll();
        let categoriesPromise = db.Category.findAll();

        Promise.all([productPromise, projectsPromise, categoriesPromise])
        .then(([producto, projects, categories]) => {
          res.render('admin/products/editProduct', {
            titulo: "Edición",
            producto,
            projects, 
            categories,
            errors: errors.mapped(),
            old: req.body
          })
        })
        .catch(error => console.log(error))
      }
    },
    /* Recibe la info del producto a eliminar */
    productDelete: (req, res) => {
        /* 1 - Obtener el id del producto a eliminar */
        let idProducto = +req.params.id;
        /* 2 - Buscar el producto dentro del array y eliminarlo */
        products.forEach(producto => {
            if(producto.id === idProducto){
                //Obtener la ubicación (índice) del producto a eliminar
                let productToDeleteIndex = products.indexOf(producto);
                //Elimino el producto del array
                products.splice(productToDeleteIndex, 1)
            }
        })
        /* 3 - Sobreescribir el json */
        writeProducts(products);
        /* 4 - Enviar respuesta  */
        res.redirect('/admin/productos')
    },
    /* Recibe los datos del producto a buscar */
    productSearch: (req, res) => {

    },
}
