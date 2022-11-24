const express = require('express');
const router = express.Router();
const userWorkoutCont = require('../controllers/userworkout');


//    /userWorkout
router.get('/top3', userWorkoutCont.top3);
router.get('/lastweek', userWorkoutCont.LastWeek);
router.get('/lastmonth', userWorkoutCont.LastMonth);
router.get('/all', userWorkoutCont.All);
router.get('/:mapforHistory', );


module.exports = router;