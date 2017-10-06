const express = require('express');
const PostModel = require('../models/posts-model');
const router = express.Router();


router.post('/posts', (req, res, next) => {
  if(!req.user){
    res.status(401).json({ errorMessage: 'User not logged in' });
  }

  const thePost = new PostModel({
    textContent: req.body.postText,
    author: req.user._id
  });

});




module.exports = router;
