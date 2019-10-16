const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load profile
const Profile = require('../../models/Profile');

const User = require('../../models/User');

// @route       GET to api/profile/test
// @description Test profile route
// @access      Public
router.get('/test', (req, res) => res.json({msg: "Profile Works"}));

// @route       GET to api/profile
// @description get current users profile
// @access      Private
router.get('/', passport.authenticate('jwt', { session: false}), (req, res) => {
  const errors = {};
  Profile.findOne({ user: req.user.id })
  .then(profile => {
    if(!profile){
      errors.noprofile = 'There is no profile for this user'
      return res.status(404).json(errors)
    }
    res.json(profile)
  })
  .catch(err => res.status(404).json(err));
  }
);


// @route       POST to api/profile
// @description Create user profile
// @access      Private
router.post('/', passport.authenticate('jwt', { session: false}), (req, res) => {
  // Get fields
  const profileFields = {};
  profileFields.user = req.user.id;
  if(req.body.handle) profilesFields.handle = req.body.handle;
  if(req.body.company) profilesFields.company = req.body.company;
  if(req.body.website) profilesFields.website = req.body.website;
  if(req.body.location) profilesFields.location = req.body.location;
  if(req.body.bio) profilesFields.bio = req.body.bio;
  if(req.body.status) profilesFields.status = req.body.status;
  if(req.body.githubusername) profilesFields.githubusername = req.body.githubusername;
  // Skills - Split into array
  if(typeof req.body.skills !== 'undefined') {
    profileFields.skills = req.body.skills.split(',');
  }

  // Social
  profileFields.social = {};

  if(req.body.youtube) profilesFields.social.youtube = req.body.youtube;
  if(req.body.twitter) profilesFields.social.twitter = req.body.twitter;
  if(req.body.facebook) profilesFields.social.facebook = req.body.facebook;
  if(req.body.linkedin) profilesFields.social.linkedin = req.body.linkedin;
  if(req.body.instagram) profilesFields.instagram.linkedin = req.body.instagram;

  Profile.findOne({ user: req.user.id })
  .then(profile => {
    if(profile){ //update if profile exists
      Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true })
      .then(profile => res.json(profile))
    } else {
      //Create
    }
  })
  }
);

module.exports = router;
