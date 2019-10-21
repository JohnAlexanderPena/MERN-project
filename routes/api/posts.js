const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport')

// const Post = require('../../models/Post')

// @route       GET to api/posts/test
// @description Test post route
// @access      Public
router.get('/test', (req, res) => res.json({msg: "Posts Works"}));

// @route       POST to api/posts
// @description Create post
// @access      Private -> only users can create new post
router.post('/', passport.authenticate('jwt', { session: false}), (req, res) => {
  const newPost = new Post({
    text: req.body.text,
    name: req.body.name,
    avatar: req.body.name
  });
});
//
//
module.exports = router;
