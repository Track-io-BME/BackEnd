const express = require('express');
const isAuth = require('../middleware/is-auth');
const challanges = require('../models/challanges');
const adminCont = require('../controllers/admin');

const router = express.Router();

router.post('/addnewchallange', adminCont.AddNewChallanges);

router.get('/challanges', adminCont.Challanges);

router.get('/challange', isAuth, adminCont.Challange);

module.exports = router;