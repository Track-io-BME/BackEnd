const express = require('express');
const router = express.Router();
const challengesCont = require('../controllers/challenges');

router.get('/walking/daily',challengesCont.WalkingDaily);
router.get('/walking/weekly', challengesCont.WalkingWeekly);
router.get('/running/daily', challengesCont.RunningDaily);
router.get('/running/weekly', challengesCont.RunningWeekly);
router.get('/cycling/daily', challengesCont.CyclingDaily);
router.get('/cycling/weekly', challengesCont.CyclingWeekly);

router.get('/getActiveChallenges', challengesCont.getActiveChallenges);
router.get('/getCompletedChallenges', challengesCont.getCompletedChallenges);

module.exports = router;