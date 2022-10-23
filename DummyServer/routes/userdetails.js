const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/all', (req, res, next)=>{
    res.sendFile(path.join(__dirname, '../', 'dummies', 'alluserdet.json'));
});
router.get('/goals', (req, res, next)=>{
    res.redirect('/userdetails/all');
});
router.put('/goals', (req, res, next)=>{
    res.status(200).send("OK");
});
router.post('/setGender', (req, res, next)=>{
    res.send("OK");
});
router.get('/weight', (req, res, next)=>{
    res.sendFile(path.join(__dirname, '../', 'dummies', 'userweight.json'));
});
router.post('/weight', (req, res, next)=>{
    res.send("OK");
});
router.post('/weightGoal', (req, res, next)=>{
    res.send("OK");
});
router.get('/weightGoal', (req, res, next)=>{
    res.redirect('/userdetails/all');
});
router.get('/birthDate', (req, res, next)=>{
    res.redirect('/userdetails/all');
});
router.get('/:dailyActivity', (req, res, next)=>{});

module.exports = router;