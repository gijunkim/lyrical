exports.isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()){
        next();
    } else{
        const message = encodeURIComponent('로그인이 필요한 서비스 입니다.');
        res.redirect(`/login?message=${message}`);
    }
}

exports.isNotLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()){
        next();
    } else{
        const message = encodeURIComponent('로그인한 상태 입니다.');
        res.redirect(`/?error=${message}`);
    }
}
