const express   = require('express');
const PostModel = require('../models/posts-model');
const UserModel = require('../models/user-model');
const router    = express.Router();


router.post('/posts', (req, res, next) => {
  if(!req.user){
    res.status(401).json({ errorMessage: 'User not logged in' });
  }

  const thePost = new PostModel({
    textContent: req.body.textContent,
    author: req.user._id,
  });

  console.log('mooooo');
  // req.user.posts.push(thePost._id);
  console.log("text content -->",req.user.posts);

  console.log("author -->", req.user._id);


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

  });//CLOSE thePost.SAVE(...)
});//CLOSE "router.POST(...)"

//This router gets ALL of the posts vvv
router.get('/posts', (req, res, next) => {
    PostModel.find()
    .sort({ timestamps: -1 })
    .exec((err, recentPosts) => {
      if(err) {
        console.log('error finding posts');
        res.status(500).json({ errorMessage: 'There was an issue finding posts'});
        return;
      }
      console.log('recentPosts -->');
      res.status(200).json(recentPosts);
    });//CLOSE PostModel.find(...)
});//CLOSE "router.GET(...)"


router.get('/myposts', (req, res, next) => {
  if(!req.user){
    res.status(401).json({ errorMessage: 'User is not logged in' });
    return;
  }

  PostModel.find({ author: req.user._id })
    .sort({ _id: -1})
    .exec((err, myPostResults) => {
          if(err){
             res.status(500).json({ errorMessage: 'Something went wrong retrieving your posts'}
           );
           return;
          }
          res.status(200).json(myPostResults);
    });//CLOSE "PostModel.find(...)"
});//CLOSE "router.GET('/myposts')"

router.delete(('/posts/:postId'), (req, res, next) => {
  if(!req.user){
      res.status(401).json({ errorMessage: 'User is not logged in'});
      return;
  }

  PostModel.findById(
    req.params.postId,

    (err, postFromDb) => {
      if(err) {
        res.status(500).json({ errorMessage: 'Post details went wrong' }
      );

      return;

      }

      if(postFromDb.author.toString() !== req.user._id.toString()){

         res.status(403).json({ errorMessage: 'You may only delete posts that belong to you.' });
         return;
    }

    PostModel.findByIdAndRemove(
      req.params.postId,
      (err, postFromDb) => {
        if(err) {
          console.log('Delete post FAILED', err);
          res.status(500).json({ errorMessage: 'The was an error deleting your post'});
          return;
        }

        res.status(200).json({'Post was successfully deleted': postFromDb});
      }
    );//CLOSE "PostModel.findByIdAndRemove(...)"
  });//CLOSE "PostModel.findById(...)"
});//CLOSE "router.DELETE(/posts/:postId)"


router.get('/posts/ally', (req, res, next) => {
  PostModel.find({author: allies})
    .sort({ _id: -1})
    .exec((err, myAllyPostResults) => {
        if(err){
          res.status(500).json({ errorMessage: 'Something went wrong try again later'}
        );
        return;
        }
        res.status(myAllyPostResults);
    });
});




module.exports = router;
