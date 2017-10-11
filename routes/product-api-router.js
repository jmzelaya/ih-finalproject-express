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
    tag                 : req.body.productTag,
    owner               : req.user._id

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
    ProductModel.find()
    .sort({ timestamps: -1 })
    .exec((err, recentSupplies) => {
      if(err) {
        console.log('error finding supplies');
        res.status(500).json({ errorMessage: 'There was an issue finding supplies'});
        return;
      }
      console.log('recentSupplies -->');
      res.status(200).json(recentSupplies);
    });//CLOSE PostModel.find(...)
});//CLOSE "router.GET(...)"

router.get('/my-supplies', (req, res, next) => {
  ProductModel.find({ owner: req.user._id })
    .sort({ _id: -1})
    .exec((err, mySupplyResults) => {
        if(err){
          res.status(500).json({ errorMessage: 'Something went wrong try again later'}
        );
        return;
        }
        res.status(200).json(mySupplyResults);

  });//CLOSE "ProductModel.find(...)"
});//CLOSE "router.GET('/my-supplies')"

router.delete(('/supplies/:supplyId'), (req, res, next) => {
  if(!req.user){
      res.status(401).json({ errorMessage: 'User is not logged in'});
      return;
  }

  ProductModel.findById(
    req.params.supplyId,

    (err, supplyFromDb) => {
      if(err) {
        res.status(500).json({ errorMessage: 'Supply details went wrong' }
      );

      return;

      }

      if(supplyFromDb.owner.toString() !== req.user._id.toString()){

         res.status(403).json({ errorMessage: 'You may only delete supplies that belong to you.' });
         return;
    }

    ProductModel.findByIdAndRemove(
      req.params.supplyId,
      (err, supplyFromDb) => {
        if(err) {
          console.log('Delete post FAILED', err);
          res.status(500).json({ errorMessage: 'The was an error deleting your supply'});
          return;
        }

        res.status(200).json({'Supply was successfully deleted': supplyFromDb});
      }
    );//CLOSE "PostModel.findByIdAndRemove(...)"
  });//CLOSE "PostModel.findById(...)"
});//CLOSE "router.DELETE(/posts

router.get('/supplies/:supplyId', (req, res, next) => {
  ProductModel.findById(
    req.params.supplyId,
    (err, supplyFromDb) => {
      if(err) {
        res.status(500).json({errorMessage: 'Something went wrong try again later.'});
      }
      res.status(200).json(supplyFromDb);
    }
  );
});

module.exports = router;
