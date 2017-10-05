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

//==============================================================================
//                      ****LOCAL STRATEGY****
//==============================================================================


passport.use(
  new LocalStrategy(
    {
      usernameField: 'loginUsername',
      passwordField: 'loginPassword'
    },

    (sentUsername, sentPassword, done) => {
      UserModel.findOne(
        { email: sentUsername },

        (err, userFromDb) => {
            if (err) {
                done(err);
                return;
            }

            if (userFromDb === null) {
                //"false" tells Passport that the login failed
                done(null, false, { message: 'Your email is incorrect.' });
                return;
            }

            const isPasswordGood =
              bcrypt.compareSync(sentPassword, userFromDb.encryptedPassword);

            if (!isPasswordGood) {
                done(null,false, { message: 'Bad password 🤢 '});
                return;

            }
            // if we get here, log in was successful
            // make "userFromDb" the logged in user
            done(null, userFromDb);
      }
    );//UserModel.findOne(...)
   }
  )//CLOSE "new LocalStrategy(...)"
);//CLOSE "passport.use(...)"
