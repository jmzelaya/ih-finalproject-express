const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const PostModel = require('../models/posts-model');
const ProductModel = require('../models/product.model');



const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, 'Please input your first name']
    },

    lastName: {
      type: String,
      required: [true, 'Please input your last name']
    },

    email: {
      type: String,
      requied: [true, 'Please input your email']
    },

    encryptedPassword: {
      type: String,
      required: [true, 'Please input your password']
    },

    allies: [{
      type: Schema.Types.ObjectId,
      ref: 'User',
      }],

    posts: [],

    daysSurvived: { type: Number },

    daysMissing: { type: Number },

    supplies: [ProductModel.schema]

  },

  {
    timestamps: true
  }
);

const Usermodel = mongoose.model('User', userSchema);

module.exports = Usermodel;
