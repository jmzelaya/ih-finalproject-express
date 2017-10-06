const express = require('express');
const UserModel = require('../models/user-model');
const router = expresss.Router();



router.post('/users/:id/allies', (req, res, user) => {
  if(!req.user){
      res.status(401).json({ errorMessage: 'You must log in to add an ally' });
  }

  const theUser = new UserModel({
    allies: req.user._id
  });

  theUser.save((err) => {
    if(theUser.errors) {
      res.status(400).json({
        errorMessage: 'Ally validation failed',
        validationErrors: theUser.errors
      });
      return;
    }
  });

});









module.exports = router;
