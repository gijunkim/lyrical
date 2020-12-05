const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const bcrypt = require('bcrypt');
const User = require('../models/user');

module.exports = () => {
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, async (username, password, done) => {
        try{
            const exUser = await User.findOne({ where : { email: username }});
            if(exUser){
                const result = await bcrypt.compare(password, exUser.password);
                if(result){
                    done(null, exUser);
                } else {
                    done(null, false);
                }
            } else{
                done(null, false);
            }
        } catch(err){
            console.log(err);
            done(err);
        }
    }));
};