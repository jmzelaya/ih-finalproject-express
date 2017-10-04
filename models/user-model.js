const mongoose = require('mongoose');

const Schema = mongoose.Schema;



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
    }
  },

  {
    timestamps: true
  }
);

const Usermodel = mongoose.model('User', userSchema);

module.exports = Usermodel;
