const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;


const productSchema = new Schema (
  {
    productName: {
      type: String,
      required: [true, 'Your product needs a name']
    },

    productDescription: {
      type: String,
      required: [true, 'You must include a description']
    },

    productValue:{
      type: String,
      required: [true, 'You must input a trade value']
    },

    supplyImage: {
      type:String
    },

    owner: {
      type: Schema.Types.ObjectId
    }

  },

  {
    timestamps: true
  }


);


const ProductModel = mongoose.model('Product', productSchema);


module.exports = ProductModel;
