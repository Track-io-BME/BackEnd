const express = require('express');
const router = express.Router();
const challengesCont = require('../controllers/challenges');

// '/challenges'

router.get('/getActiveChallenges', challengesCont.getActiveChallenges);
router.get('/getCompletedChallenges', challengesCont.getCompletedChallenges);

module.exports = router;