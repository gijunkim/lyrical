const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
    try{
        req.decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
        return next();
    } catch(err){
        if(err.name === 'TokenExpiredError'){ // 유효 기간 초과
            const error = new Error();
            error.status = 419;
            error.message = '토큰이 만료되었습니다.';
            error.type = 'token';
            return next(error);
        } 

        const error = new Error();
        error.status = 401;
        error.message = '유효하지 않은 토큰입니다.';
        error.type = 'token';
        return next(error);
    }
}

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
