const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  text: {
    type:String,
    require: true
  },
  name: {
    type: String,
    require: true
  },
  avatar: {
    type: String
  },
  likes: [ // keep track of duplicate likes
  {
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
      }
    }
  ],
  comments: [
  {
    user: { //comments will have use
      type: Schema.Types.ObjectId,
      ref: 'users',
      },
    text: {
      type: String,
      required: true
    },
    avatar: {
      type: String
    },
    name: {
      type: String
    },
    date: {
      type: Date,
      default: Date.now
    }
  }
],
  date: {
   type: Date,
   default: Date.now
  }
});

module.exports = Post = mongoose.model('post', PostSchema)
