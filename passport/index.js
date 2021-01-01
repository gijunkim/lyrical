const passport = require('passport');
const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');
const google = require('./googleStrategy');

const User = require('../models/user');

module.exports = () => {
    /*
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    
    passport.deserializeUser(async (id, done) => {
        try{
            const exUser = await User.findOne({where: { id }});
            if(exUser){
                done(null, exUser);
            } else{
                const error = new Error();
                error.status = 396;
                error.code = "deserializeUser no user";
                done(error);
            }
        } catch(err){
            console.error(err);
            done(err);
        }
    });
    */

    local();
    kakao();
    google();
};