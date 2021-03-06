const express   = require('express');
const UserModel = require('../models/user-model');
const router    = express.Router();
const PostModel = require('../models/posts-model');



router.post('/users/allies/:id', (req, res, next) => {
  console.log('hi');
  console.log(req.params.id);
  //Take the ally's id and find him in the database
  UserModel.findById( req.params.id, (err, allyFromDb) => {
      if (err) {
        console.log('mayuybbeee??');
        res.status(500).json({errorMessage: 'DB Error'});
          }
          console.log('b4');
          console.log(allyFromDb.allies);
          //Push req.user id into allies array
        allyFromDb.allies.push(req.user._id);
        console.log('afterrrr');
        console.log(allyFromDb.allies);

        allyFromDb.save((err) => {
          if(allyFromDb.errors) {
            res.status(400).json({
              errorMessage: 'ally validating error',
              validationErrors: allyFromDb.errors
            });
            return;
          }
        });

        if(err) {
          res.status(500).json({ errorMessage: 'ally save went wrong' });
          return;
        }


        req.user.allies.push(req.params.id);

        req.user.save((err) => {
          if(req.user.errors){
            res.status(400).json({
              errorMessage: 'my ally validating error',
              validationErrors: myAllyFromDb.erros
            });

            return;
          }

          if(err) {
            console.log("2nd save error", err);
            res.status(500).json({ errorMessage: 'my ally save went wrong' });
            return;
          }
          res.status(200).json(req.user);
        });
  });

        //Take the ally's id
        // req.params.id
        //put inside our ally's array
        // console.log('b5');
        // console.log(req.user.allies);
        // // req.user.allies.push(req.params.id);
        // console.log('after');
        // console.log(req.user.allies);

});//CLOSE "router.POST(/users/allies/:id)"



router.get('/my-allies', (req, res, next) => {
  if(!req.user){
    res.status(401).json({ errorMessage: 'User is not logged in' });
    return;
  }


  UserModel.find({ allies: req.user._id })
    .sort({ _id: -1})
    .exec((err, myAllyResults) => {
        if(err){
          res.status(500).json({ errorMessage: 'Something went wrong try again later'}
        );
        return;
        }
        res.status(200).json(myAllyResults);

  });//CLOSE "UserModel.find(...)"
});//CLOSE "router.GET('/my-allies')"

router.get('/users/:id', (req, res, next) => {
  UserModel.findById( req.params.id )
    .exec((err, allyFromDb) => {
      if (err) {
        console.log('mayuybbeee??');
        res.status(500).json({errorMessage: 'DB Error'});
        return;
        }
        res.status(200).json(allyFromDb);

    });
});


module.exports = router;
