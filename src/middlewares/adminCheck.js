const adminCheck = (req, res, next) => {
    if(req.session.user.rol === "ADMIN"){
        next()
    }else{
        res.send("No tienes permisos para ingresar")
    }
}

module.exports = adminCheck;