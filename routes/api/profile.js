const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load Validation
const validateProfileInput = require('../../validation/profile')
// Load profile
const Profile = require('../../models/Profile');

const User = require('../../models/User');

router.get('/test', (req, res) => res.json({msg: "Profile Works"}));

// @route       GET to api/profile
// @description get current users profile
// @access      Private
router.get('/', passport.authenticate('jwt', { session: false}), (req, res) => {
  const errors = {};

  Profile.findOne({ user: req.user.id })
  .populate('user', ['name', 'avatar'])
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

// @route       GET api/profile/all
// @description Get all profiles
// @access      Public

router.get('/all', (req,res) => {
  const errors = {};

  Profile.find()
  .populate('user', ['name', 'avatar'])
  .then(profiles => {
    if(!profiles) { //if no profiles are found
      errors.noprofile = 'There are no profiles'; // add error into error object
      return res.status(404).json(errors)
    }
    res.json(profiles) // shoe all profiles
  })
  .catch(err => res.status(404).json({ profile: 'There are no profiles'})
    );
})


// @route       GET api/profile/handle/:handle
// @description Get profile by handle
// @access      Public

router.get('/handle/:handle', (req, res) => {
  const errors = {};

  Profile.findOne({ handle: req.params.handle })
  .populate('user', ['name', 'avatar'])
  .then(profile => {
    if(!profile) {
      errors.noprofile = 'There is no profile for this user';
      res.status(404).json(errors)
    }

    res.json(profile)
  })
  .catch(err => res.status(404).json(err));
});

// @route       GET api/profile/user/:user_id
// @description Get profile by user ID
// @access      Public

router.get('/user/:user_id', (req, res) => {
  const errors = {};

  Profile.findOne({ handle: req.params.user_id })
  .populate('user', ['name', 'avatar'])
  .then(profile => {
    if(!profile) {
      errors.noprofile = 'There is no profile for this user';
      res.status(404).json(errors)
    }

    res.json(profile)
  })
  .catch(err => res.status(404).json(err));
});




// @route       POST to api/profile
// @description Create user profile
// @access      Private
router.post('/', passport.authenticate('jwt', { session: false}), (req, res) => {

  const { errors, isValid } = validateProfileInput(req.body); //destructuring
  // Check validation
  if(!isValid) {
    // Return any errors with 400 status
    return res.status(400).json(errors)
  }
  // Get fields
  const profileFields = {};
  // FIll the profile fields
  profileFields.user = req.user.id;
  if(req.body.handle) profileFields.handle = req.body.handle.toLowerCase();
  if(req.body.company) profileFields.company = req.body.company;
  if(req.body.website) profileFields.website = req.body.website;
  if(req.body.location) profileFields.location = req.body.location;
  if(req.body.bio) profileFields.bio = req.body.bio;
  if(req.body.status) profileFields.status = req.body.status;
  if(req.body.githubusername) profileFields.githubusername = req.body.githubusername;
  // Skills - Split into array
  if(typeof req.body.skills !== 'undefined') {
    profileFields.skills = req.body.skills.split(',');
  }

  if(typeof req.body.workouts !== 'undefined') {
    profileFields.workouts = req.body.workouts.split(',');
  }

  // Social
  profileFields.social = {};

  // FIll the profile fields for social
  if(req.body.youtube) profileFields.social.youtube = req.body.youtube;
  if(req.body.twitter) profileFields.social.twitter = req.body.twitter;
  if(req.body.facebook) profileFields.social.facebook = req.body.facebook;
  if(req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
  if(req.body.instagram) profileFields.social.instagram = req.body.instagram;

  Profile.findOne({ user: req.user.id }) // Search for user by login ID
  .then(profile => {
    if(profile){ //update if profile exists
      Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true },
      // { useFindAndModify: false}
      ).then(profile => res.json(profile))
    } else {
      //Create

      //Check if handle exists
      Profile.findOne({ handle: profileFields.handle.toLowerCase() }).then(profile => {
        if(profile) {
        errors.handle = 'That handle already exists';
        res.status(400).json(errors);
         }


      // Save Profile if handle doesn't already exist
      new Profile(profileFields).save().then(profile => res.json(profile));
      });
    }
  })
  }
);

module.exports = router;
