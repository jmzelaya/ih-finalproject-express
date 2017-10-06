const express = require('express');
const UserModel = require('../models/user-model');
const router = expresss.Router();



router.post('/users/:id/allies', (req, res, user) => {
  if(!req.user){
      res.status(401).json({ errorMessage: 'You must log in to add an ally' });
  }

  req.user.allies.push(theAlly._id);
  theAlly.save((err) => {
    if(theAlly.errors){
      res.status(400).json({
        errorMessage: 'Validating allies failed',
        validationErrors: theAlly.errors
      });
      return;
    }

    if(err) {
      res.status(500).json({ errorMessage: 'New ally went wrong' });
    }

    UserModel.findById(
      req.params.allyId,
      (err, allyFromDb) => {
        if(err) {
          res.status(500).json({errorMessage: 'Phone details went wrong 💩'});

        }

        UserModel.findById(


        );
      }
    );
  });

});


router.get('/user/:id/allies', (req, res, next) => {

});



router.get('/user/:id/allies/:id', (req, res, next) => {

});






//
// UserModel.findById(
//   req.params.allyId,
//
//   (err, allyFromDb) => {
//     if(err) {
//       res.status(500).json({errorMessage: 'allies went wrong??'});
//     }
//     return;
//   }
// );
// const theUser = new UserModel({
//   allies: req.user._id
// });
//
// theUser.save((err) => {
//   if(theUser.errors) {
//     res.status(400).json({
//       errorMessage: 'Ally validation failed',
//       validationErrors: theUser.errors
//     });
//     return;
//   }
// });



module.exports = router;
