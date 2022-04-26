const userSessionCheck = (req, res, next) => {
    if(req.session.user){
        next()
    }else{
        res.redirect('/usuarios/login')
    }
}

module.exports = userSessionCheck;