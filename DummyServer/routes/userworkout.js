const express = require('express');
const router = express.Router();

router.get('/top3', (req, res, next)=>{});
router.get('/runningHistory/lastweek', (req, res, next)=>{
    res.sendFile(path.join(__dirname, '../', 'dummies', 'runhist.json'));
});
router.get('/runningHistory/lastmonth', (req, res, next)=>{
    res.sendFile(path.join(__dirname, '../', 'dummies', 'runhist.json'));
});
router.get('/walkingHistory/all', (req, res, next)=>{
    res.sendFile(path.join(__dirname, '../', 'dummies', 'runhist.json'));
});
router.get('/walkingHistory/lastweek', (req, res, next)=>{
    res.sendFile(path.join(__dirname, '../', 'dummies', 'walkhist.json'));
});
router.get('/walkingHistory/lastmonth', (req, res, next)=>{
    res.sendFile(path.join(__dirname, '../', 'dummies', 'walkhist.json'));
});
router.get('/walkingHistory/all', (req, res, next)=>{
    res.sendFile(path.join(__dirname, '../', 'dummies', 'walkhist.json'));
});
router.get('/cyclingHistory/lastweek', (req, res, next)=>{
    res.sendFile(path.join(__dirname, '../', 'dummies', 'cyclehist.json'));
});
router.get('/cyclingHistory/lastmonth', (req, res, next)=>{
    res.sendFile(path.join(__dirname, '../', 'dummies', 'cyclehist.json'));
});
router.get('/cyclingHistory/all', (req, res, next)=>{
    res.sendFile(path.join(__dirname, '../', 'dummies', 'cyclehist.json'));
});
router.post('/finishtraining', (req, res, next)=>{
    res.send("OK");
});
router.get('/:mapforHistory', (req, res, next)=>{});


module.exports = router;