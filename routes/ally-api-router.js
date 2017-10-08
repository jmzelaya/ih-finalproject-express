const express = require('express');
const UserModel = require('../models/user-model');
const router = express.Router();

console.log('in ally router');

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
        allyFromDb.set({
          allies: [req.user._id]
        });

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

        UserModel.findById( req.user.id, (err, myAllyFromDb) =>{
            if(err){
              res.status(500).json({ errorMessage: 'Ally database error' });
            }
              req.user.allies.push(req.params.id);

              myAllyFromDb.set({
                allies: [req.params.id]
              });

              myAllyFromDb.save((err) => {
                if(myAllyFromDb.errors){
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
                res.status(200).json(myAllyFromDb);
              });

        });

  });

        //Take the ally's id
        // req.params.id
        //put inside our ally's array
        console.log('b5');
        console.log(req.user.allies);
        // req.user.allies.push(req.params.id);
        console.log('after');
        console.log(req.user.allies);

});











module.exports = router;
