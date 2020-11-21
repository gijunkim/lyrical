const passport = require('passport');
const local = require('./localStrategy');

const User = require('../models/user');

module.exports = () => {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    
    passport.deserializeUser(async (id, done) => {
        try{
            const exUser = await User.findOne({where: { id }});
            if(exUser){
                done(null, exUser);
            } else{
                done(err);
            }
        } catch(err){
            console.error(err);
            done(err);
        }
    });
    

    local();
};