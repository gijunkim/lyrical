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

exports.isEmailVerified = (req, res, next) => {
    try{
        if(req.isAuthenticated()){
            if(req.user.emailVerification){
                next();
            } else{
                const error = new Error();
                error.status = 397;
                error.code = 'email is not verified';
                return next(error);
            }
        }
    } catch(err){
        const error = new Error();
        error.status = 397;
        error.code = 'sudden error during email verification';
        console.error(err);
        return next(error);
    }

}
