module.exports = {
    getAll: (req, res) => res.send("Listado de productos"),
    getOne: (req, res) => {
        let idProducto = req.params.id;
        let colorProducto = req.params.color || "Sin especificar";
        res.send(`Detalle de producto: ${idProducto} Color: ${colorProducto} `)
    }
};