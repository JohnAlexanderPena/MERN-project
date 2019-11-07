const mongoose = require('mongoose');
const scheme = mongoose.Schema;

//Create Schema
const PostSchema = new Schema({
  user: {
    type: Schema,
    ref: 'users',
  },
  text: {
  type:String,
  require: true
  },
  name: {
    type: String
  },
  avatar: {
    type: String
  },
  likes: [ // keep track of duplicate likes
    user: {
      type: Schema,
      ref: 'users',
    }
  ],
  comments: [
    {
      user: { //comments will have use
        type: Schema,
        ref: 'users',
      },
      text: {
        type: String,
        required: true
      },
      avatar: {
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

moddule.exports = Post = mongoose.model("post", PostSchema)
