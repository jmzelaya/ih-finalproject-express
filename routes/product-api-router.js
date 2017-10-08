const express       = require ('express');
const ProductModel  = require('../models/product.model');
const router        = express.Router();


router.post('/supplies', (req, res, next) => {
  if(!req.user){
    res.status(401).json({ errorMessage: 'User not logged in' });
  }

  const theSupply = new ProductModel({
    productName         : req.body.productName,
    productDescription  : req.body.productDescription,
    productValue        : req.body.productValue,
    tag                 : req.body.productTag

  });

  req.user.supplies.push(theSupply._id);

  theSupply.save((err) => {
    if(theSupply.errors) {
       res.status(400).json({
         errorMessage: 'Error validating supply',
         validationErrors: theSupply.errors
       });
       return;
    }

    if(err){
       console.log('ERROR POSTING THE SUPPLY', err);
       res.status(500).json({ errorMessage: 'Something went wrong try again later'});
    }


    res.status(200).json(theSupply);
    console.log('Succesfully posted!');

  });//CLOSE thePost.SAVE(...)

});//CLOSE "router.POST('/supplies')"

router.get('/supplies', (req, res, next) => {

});//CLOSE "router.GET('/supplies')"

router.get('/my-supplies', (req, res, next) => {

});//CLOSE "router.GET('/my-supplies')"

router.delete('/supplies/:supplyId', (req, res, next) => {

});//CLOSE "router.DELETE('/supplies/:supplyId')"


module.exports = router;
