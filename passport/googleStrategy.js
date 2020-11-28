const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const User = require('../models/user');

module.exports = () => {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback'
    }, async (accessToken, refreshToken, profile, done) => {
        console.log(profile);
        try {
            const exUser = await User.findOne({
                where: {snsID: profile.id, provider: 'google'},
            });
            if(exUser){
                done(null, exUser);
            } else {
                // emailVerification 전략 수정
                // google, nickname 에러
                const newUser = await User.create({
                    email: profile._json && profile._json.email,
                    emailVerification:  profile._json && profile._json.email_verified,
                    nickname: profile.displayName,
                    name: profile._json.name,
                    snsID: profile.id,
                    provider: 'google'
                });
                
                done(null, newUser);
            }
        } catch(err){
            console.error(err);
            done(err);
        }
    }));
};