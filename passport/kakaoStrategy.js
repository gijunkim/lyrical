const passport = require('passport');
const KakaoStrategy = require('passport-kakao').Strategy;

const User = require('../models/user');

module.exports = () => {
    passport.use(new KakaoStrategy({
        clientID: process.env.KAKAO_CLIENT_ID,
        callbackURL: '/auth/kakao/callback'
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            const exUser = await User.findOne({
                where: {snsID: profile.id, provider: 'kakao'},
            });
            if(exUser){
                done(null, exUser);
            } else {
                // emailVerification 전략 수정
                // kakao면 생성?
                const newUser = await User.create({
                    email: profile._json && profile._json.kakao_account.email,
                    emailVerification: true,
                    nickname: profile.displayName,
                    name: profile.username,
                    snsID: profile.id,
                    provider: 'kakao'
                });
                
                done(null, newUser);
            }
        } catch(err){
            console.error(err);
            done(err);
        }
    }));
};