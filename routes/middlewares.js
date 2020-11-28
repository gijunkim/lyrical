exports.isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()){
        next();
    } else{
        const error = new Error();
        error.status = 398;
        error.code = 'not LoggedIn';
        return next(error);
    }
}

exports.isNotLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()){
        next();
    } else{
        const error = new Error();
        error.status = 397;
        error.code = 'Already LoggedIn';
        return next(error);
    }
}
