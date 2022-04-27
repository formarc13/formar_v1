const cookieSession = (req, res, next) => {
    if(req.cookies.formarCookie){
        req.session.user = req.cookies.formarCookie;
        res.locals.user = req.session.user;
    }
    next()
}

module.exports = cookieSession;