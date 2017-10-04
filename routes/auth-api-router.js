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


              theUser.encryptedPassword = undefined;
              res.status(200).json( theUser );

          });//CLOSE "theUser.save(...)"

       }
     );//CLOSE "UserModel.findOne(...)"

});//CLOSE "router.POST(...)"


module.exports = router;
