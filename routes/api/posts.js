const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport')

//Bring in Post model
const Post = require('../../models/Post')

//Bring in Profile model
const Profile = require('../../models/Profile')


//Bring in Validation
const validatePostInput = require('../../validation/post')

// @route       GET to api/posts/test make sure the fetch requests are working correctly
// @description Test post route
// @access      Public
router.get('/test', (req, res) => res.json({msg: "Posts Works"}));


// @route       GET api/posts
// @description Get post
// @access      Public anyone can see posts
router.get('/', (req, res) => {
  Post.find()
  .sort({ date: -1 }) //Sorting by date
  .then(posts => res.json(posts))
  .catch(err =>  res.status(404));
});

// @route       GET api/posts/:id
// @description Get post by id
// @access      Public anyone get get by id
router.get('/:id', (req, res) => {
  Post.findById(req.params.id)
  .then(post => res.json(post))
  .catch(err => res.status(404).json({ nopostfound: "No post found with that ID"}))
})

// @route       POST to api/posts
// @description Create post
// @access      Private -> only users can create new post
router.post('/', passport.authenticate('jwt', { session: false}), (req, res) => {
  const { errors, isValid } = validatePostInput(req.body);

  //Check Validation
  if(!isValid) {
    //if any errors
    return res.status(400).json(errors)
  }
  const newPost = new Post({
    text: req.body.text,
    name: req.body.name,
    avatar: req.body.avatar,
    user: req.user.id
  });

  newPost.save().then(post => res.json(post));
});

// @route DELETE api/posts/:id
// @desc DELETE post
// @access Private --> only OWNDERS of the post can delete it
router.delete('/:id', passport.authenticate('jwt', { session: false}), (req, res) => {
  Profile.findOne({ user: req.user.id})
  .then(profile => {
    Post.findById(req.params.id)
    .then(post => {
      //Check if post belongs to owner
      if(post.user.toString() !== req.user.id) {
        return res.status(401).json({ notauthorized: "User not authorized" });
      }
      // if it passes
      post.remove().then(() => res.json({ success: true }));
    })
    .catch(err => res.status(404).json({ postnotfound: "No Post Found"}));
  })
})

// @route POST api/posts/like/:id
// @desc like post
// @access Private
router.post('/like/:id', passport.authenticate('jwt', { session: false}), (req, res) => {
  Profile.findOne({ user: req.user.id})
  .then(profile => {
    Post.findById(req.params.id)
    .then(post => {
      //Check if user has already liked the post by checking if id exists
      if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
        return res.status(400).json({ alreadyliked: "User already liked this post" })
      }
      // If user didnt like, add user ID to likes array
      post.likes.unshift({ user: req.user.id });

      post.save().then(post => res.json(post))
    })
    .catch(err => res.status(404).json({ postnotfound: "No Post Found"}));
  })
})

// @route POST api/posts/unlike/:id
// @desc unlike post
// @access Private
router.post('/unlike/:id', passport.authenticate('jwt', { session: false}), (req, res) => {
  Profile.findOne({ user: req.user.id})
  .then(profile => {
    Post.findById(req.params.id)
    .then(post => {
      //Check if user has already liked the post by checking if id exists
      if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
        return res.status(400).json({ notliked: "You have not liked this post yet" })
      }

      //get remove at Index
      const removeIndex = post.likes.map(item => item.user.toString().indexOf(req.user.id))

      //splice from array
      post.likes.splice(removeIndex, 1);

      post.save().then(post => res.json(post)) //save
    })
    .catch(err => res.status(404).json({ postnotfound: "No Post Found"}));
  })
});

// @route POST api/posts/comment/:id
// @desc add comment to post
// @access Private
router.post('/comment/:id', passport.authenticate('jwt' , {session: false}), (req, res) => {
  const { errors, isValid } = validatePostInput(req.body);

  //Check Validation
  if(!isValid) {
    //if any errors
    return res.status(400).json(errors)
  }
  Post.findById(req.params.id)
  .then(post => {
    const newComment = {
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
    }

    //add to comments array
    post.comments.unshift(newComment);

    //save
    post.save().then(post => res.json(post));
  })
  .catch(err => res.status(400).json({ postnotfound: 'No Post Found' }));
});

// @route DELETE api/posts/comment/:id/:comemnt_id
// @desc delete comment from post
// @access Private
router.delete('/comment/:id/:comment_id', passport.authenticate('jwt' , {session: false}), (req, res) => {

  Post.findById(req.params.id)
  .then(post => {
    // check if comment exists
    if(post.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0) {
      return res.status(404).json({ commentnotfound: 'Comment does not exist'});
    }
    //Get remove index
    const removeIndex = post.comments.map( item => item._id.toString().indexOf(req.params.comment_id));

    //Splice it our of array
    post.comments.splice(removeIndex, 1);

    post.save().then(post => res.json(post))
  })
  .catch(err => res.status(400).json({ postnotfound: 'No Post Found' }));
})


module.exports = router;
