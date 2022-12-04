const express = require('express');
const path = require('path');
const router = express.Router();
const userDetailsCont = require('../controllers/userdetails');

//userDetails
router.get('/all', userDetailsCont.All);
router.get('/goals',userDetailsCont.GoalsGet);
router.put('/goals', userDetailsCont.GoalsPut);
router.get('/weight', userDetailsCont.WeightGet);
router.post('/weight', userDetailsCont.WeightPost);
router.get('/birthDate', userDetailsCont.BirthDate);
router.post('/setHeight', userDetailsCont.setHeight);

module.exports = router;