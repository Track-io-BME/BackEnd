const express = require('express');
const challenges = require('../models/challenges');
const adminCont = require('../controllers/admin');

const router = express.Router();

router.post('/addnewchallenge', adminCont.AddNewChallenges);

router.get('/challenges', adminCont.Challenges);

router.get('/challenge', adminCont.Challenge);

router.post('/deletechallenge', adminCont.DeleteChallenge);

module.exports = router;