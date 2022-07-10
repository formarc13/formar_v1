const { validationResult } = require("express-validator")
const db = require("../../database/models")

module.exports = {
    cart: (req, res) => {
        /* Obtener la orden */
        db.Cart.findOne({
            where: {
                userId: req.query.userId,
            },
            include: [{association: "items"}]
        })
        .then(cart => {
            res.send(cart)
            res.status(200).json({
                cart
            })
        })
        .catch(error => {
            console.log(error)
        })
    },
    cartCreate: (req, res) => {

    },
    cartUpdate: (req, res) => {

    },
    cartDestroy: (req, res) => {

    },
}