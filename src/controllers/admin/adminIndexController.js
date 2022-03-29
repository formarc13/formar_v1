const res = require('express/lib/response');
const {getProducts} = require('../../data');

module.exports = {
    index: () => {
        res.render('adminIndex', {
            titulo: "ADMIN"
        })
    }
}