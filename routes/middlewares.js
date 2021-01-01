const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.verifyToken = async (req, res, next) => {
    try{
        req.decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
        req.user = await User.findOne({ where: {id : req.decoded.id}});
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

exports.notVerifyToken = (req, res, next) => {
    try{
        req.decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);

        const error = new Error();
        error.status = 419;
        error.message = '이미 로그인 되어 있는 사용자 입니다.';
        error.type = 'token';

        return next(error);
    } catch(err){
        return next();
    }
}


exports.isEmailVerified = (req, res, next) => {
    try{
        if(req.user.emailVerification){
            next();
        } else{
            const error = new Error();
            error.status = 401;
            error.message = '이메일 인증 후 이용할 수 있는 서비스 입니다.';
            error.type = 'email';
            return next(error);
        }
    } catch(err){
        const error = new Error();
        error.status = 500;
        error.message = '이메일 인증확인 과정에서 오류가 발생하였습니다.';
        console.error(err);
        return next(error);
    }

}
