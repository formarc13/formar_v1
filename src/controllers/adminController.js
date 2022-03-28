module.exports = {
    index: (req, res) => {
        res.render('admin/adminIndex', {
            titulo: "Login"
        })
    }
}