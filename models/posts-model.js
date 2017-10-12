const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//PLAN ON NESTING COMMENTS TO POSTS//
const postSchema = new Schema(
   {
     textContent: {
       type: String,
       required: [true, 'You cannot submit an empty post']
     },

     author: {
       type: Schema.Types.ObjectId,
       ref: 'User',
       required: true
     },

     image: {
       type:String
     },

     comments: [
         {
             commentText: {
               type: String,
               required: [true, 'You cannot leave this field empty.']
             },

             commentAuthor: {
               type: Schema.Types.ObjectId,
               ref: 'User',
               required: true
             }
         }
     ]

   },

   {
     timestamps: true
   }

);


const PostModel = mongoose.model('Post', postSchema);

module.exports = PostModel;
