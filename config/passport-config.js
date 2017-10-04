const passport        = require('passport');
const LocalStrategy   = require('passport-local').Strategy;
const bcrypt          = require('bcrypt');

const UserModel       = require('../models/user-model');


passport.serializeUser((userFromDb, done) => {
  done(null, userFromDb._id);
});//CLOSE "passport.serializeUser(...)"


passport.deserializeUser((idFromSession, done) =>{
  UserModel.findById(
    idFromSession,
    (err, userFromDb) => {
        if(err) {
          done(err);
          return;
        }

        done(null, userFromDb);
    }
  );//CLOSE "UserModel.findById(...)"
});//CLOSE "passport.deserializeUser(...)"
