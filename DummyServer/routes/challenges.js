const express = require('express');
const router = express.Router();

router.get('/walking/daily', (req, res, next)=>{
    res.sendFile(path.join(__dirname, '../', 'dummies', 'challanges', 'chwalkdaily.json'));
});
router.get('/walking/weekly', (req, res, next)=>{
    res.sendFile(path.join(__dirname, '../', 'dummies', 'challanges', 'chwalkweek.json'));
});
router.get('/running/daily', (req, res, next)=>{
    res.sendFile(path.join(__dirname, '../', 'dummies', 'challanges', 'chrundaily.json'));
});
router.get('/running/weekly', (req, res, next)=>{
    res.sendFile(path.join(__dirname, '../', 'dummies', 'challanges', 'chrunweek.json'));
});
router.get('/cycling/daily', (req, res, next)=>{
    res.sendFile(path.join(__dirname, '../', 'dummies', 'challanges', 'chcycledaily.json'));
});
router.get('/cycling/weekly', (req, res, next)=>{
    res.sendFile(path.join(__dirname, '../', 'dummies', 'challanges', 'chcycleweek.json'));
});

module.exports = router;