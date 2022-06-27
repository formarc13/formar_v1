const adminCheck = (req, res, next) => {
    if(req.session.user.rol == "5"){
        next()
    }else{
        res.send("No tienes permisos para ingresar")
    }
}

module.exports = adminCheck;