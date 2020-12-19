exports.isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()){
        next();
    } else{
        const error = new Error();
        error.status = 401;
        error.message = '로그인 후 이용할 수 있는 서비스 입니다.';
        error.type = 'login';
        return next(error);
    }
}

exports.isNotLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()){
        next();
    } else{
        const error = new Error();
        error.status = 401;
        error.message = '로그인 상태에서 이용할 수 없는 서비스 입니다.';
        error.type = 'logout';
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
                error.status = 401;
                error.message = '이메일 인증 후 이용할 수 있는 서비스 입니다.';
                error.type = 'email';
                return next(error);
            }
        }
    } catch(err){
        const error = new Error();
        error.status = 500;
        error.message = '이메일 인증확인 과정에서 오류가 발생하였습니다.';
        console.error(err);
        return next(error);
    }

}
