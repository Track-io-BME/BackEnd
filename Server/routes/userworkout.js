const express = require('express');
const router = express.Router();
const userWorkoutCont = require('../controllers/userworkout');

router.get('/top3', userWorkoutCont.top3);
router.get('/runningHistory/lastweek', userWorkoutCont.RunningHistoryLastWeek);
router.get('/runningHistory/lastmonth', userWorkoutCont.RunningHistoryLastMonth);
router.get('/runningHistory/all', userWorkoutCont.WalkingHistoryAll);
router.get('/walkingHistory/lastweek',userWorkoutCont.CyclingHistoryLastWeek);
router.get('/walkingHistory/lastmonth', userWorkoutCont.WalkingHistoryLastMonth);
router.get('/walkingHistory/all', userWorkoutCont.WalkingHistoryAll);
router.get('/cyclingHistory/lastweek', userWorkoutCont.CyclingHistoryLastWeek);
router.get('/cyclingHistory/lastmonth', userWorkoutCont.CyclingHistoryLastMonth);
router.get('/cyclingHistory/all', userWorkoutCont.CyclingHistoryAll);
router.post('/finishtraining', userWorkoutCont.finishtraining);
router.get('/:mapforHistory', );


module.exports = router;