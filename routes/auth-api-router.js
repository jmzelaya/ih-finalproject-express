const express     = require('express');
const bcrypt      = require('bcrypt');
const passport    = require('passport');

const UserModel   = require('../models/user-model');

const router = express.Router();



router.post('/process-signup', (req, res, next) => {

  if(!req.body.signupFirstName   ||
     !req.body.signupLastName    ||
     !req.body.signupEmail       ||
     !req.body.signupPassword) {
       res.status(400).json({ errorMessage: 'We need you to fill in all fields'}
     );

     return;
     }

     UserModel.findOne(
       {email: req.body.signupEmail},
       (err, userFromDb) => {
          if (err) {
              console.log('Error finding user', err);
              res.status(500).json({ errorMessage: 'Error finding email' });
              return;
          }

          if (userFromDb) {
              res.status(400).json({ errorMessage: 'A user with that email already exists'});
              return;
          }

          const salt = bcrypt.genSaltSync(10);
          const hashPass = bcrypt.hashSync(req.body.signupPassword, salt);

          const theUser = new UserModel({
            firstName: req.body.signupFirstName,
            lastName: req.body.signupLastName,
            email: req.body.signupEmail,
            encryptedPassword: hashPass
          });

          theUser.save((err) => {
              if(err) {
                 console.log('User save error');
                 res.status(500).json({ errorMessage: 'Error saving user. Please try again'});
                 return;
              }

              req.login(theUser, (err) => {
                if (err) {
                  res.status(500).json({ errorMessage: 'error logging in'});
                  return;
                }
                theUser.encryptedPassword = undefined;
                res.status(200).json( theUser );
                console.log("User successfully signed up");
              });


          });//CLOSE "theUser.save(...)"

       }
     );//CLOSE "UserModel.findOne(...)"

});//CLOSE "router.POST('process-signup')"


router.post('/process-login', (req, res, next) => {
  const myCustomAuth =
    passport.authenticate('local', (err, theUser, extraInfo) => {
      if(err) {
        res.status(500).json({ errorMessage: 'Login failed' });
        return;
      }

      if(!theUser) {
        res.status(400).json({ errorMessage: 'extraInfo.message'});
        return;
      }

      req.login(theUser, (err) => {
        if(err) {
          res.status(500).json({ errorMessage: 'Login failed, please try again' });
          return;
        }

        theUser.encryptedPassword = undefined;
        res.status(200).json( theUser );
        console.log('User successfully logged in 👍');
      });
    });//CLOSE "passport.authenticate('local')"

    myCustomAuth(req, res, next);

});//CLOSE "router.POST(''process-login)"

router.get('/checklogin', (req, res, next) => {
  let amILoggedIn = false;
console.log(req.user);
  if (req.user){

      req.user.encryptedPassword = undefined;
      amILoggedIn = true;
  }

  res.status(200).json(
    {
      isLoggedIn: amILoggedIn,
      userInfo: req.user
    }
  );
});//CLOSE "router.GET('checklogin')"


router.delete('/logout', (req, res, next) => {
    req.logout();
    res.status(200).json({ successMessage: 'Logged out successfully' });
    console.log('logged out!');
});//CLOSE "router.delete('logout')"


router.get('/users', (req, res, next) => {
  UserModel.find()
  .sort({createdAt: -1})
  .exec((err, recentUsers) => {
    if(err){
      res.status(500).json({ errorMessage: 'DB error' });
    }

    res.status(200).json(recentUsers);
  });
});

router.get('/users/:userId', (req, res, next) => {
  UserModel.findById(
    req.params.userId,
  (err, userFromDb) => {
    if(err) {
      res.status(500).json({ errorMessage: 'db error'});
    }
    res.status(200).json(userFromDb);
    }
  );
});


module.exports = router;
