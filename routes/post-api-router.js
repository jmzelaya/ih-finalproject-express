const express = require('express');
const PostModel = require('../models/posts-model');
const router = express.Router();


router.post('/posts', (req, res, next) => {
  if(!req.user){
    res.status(401).json({ errorMessage: 'User not logged in' });
  }

  const thePost = new PostModel({
    textContent: req.body.textContent,
    author: req.user._id
  });

  console.log("text content -->", req.body.postText);
  console.log("auther -->", req.user._id);


  thePost.save((err) => {
    if(thePost.errors) {
       res.status(400).json({
         errorMessage: 'Error validating post',
         validationErrors: thePost.errors
       });
       return;
    }

    if(err){
       console.log('ERROR POSTING THE POST', err);
       res.status(500).json({ errorMessage: 'Something went wrong try again later'});
    }

    res.status(200).json(thePost);
    console.log('Succesfully posted!');

  });
});




module.exports = router;
