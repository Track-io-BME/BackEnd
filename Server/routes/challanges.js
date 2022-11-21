const express = require('express');
const router = express.Router();
const challangesCont = require('../controllers/challanges');

router.get('/walking/daily',challangesCont.WalkingDaily);
router.get('/walking/weekly', challangesCont.WalkingWeekly);
router.get('/running/daily', challangesCont.RunningDaily);
router.get('/running/weekly', challangesCont.RunningWeekly);
router.get('/cycling/daily', challangesCont.CyclingDaily);
router.get('/cycling/weekly', challangesCont.CyclingWeekly);

module.exports = router;