const express = require('express');
const path = require('path');
const router = express.Router();
const userDetailsCont = require('../controllers/userdetails');

router.get('/all', userDetailsCont.All);
router.get('/goals',userDetailsCont.GoalsGet);
router.put('/goals', userDetailsCont.GoalsPut);
router.post('/setGender', userDetailsCont.SetGender);
router.get('/weight', userDetailsCont.WeightGet);
router.post('/weight', userDetailsCont.WeightPost);
router.post('/weightGoal', userDetailsCont.WeightGoalPost);
router.get('/weightGoal', userDetailsCont.WeightGoalGet);
router.get('/birthDate', userDetailsCont.BirthDate);
router.get('/:dailyActivity', );

module.exports = router;