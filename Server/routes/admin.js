const express = require('express');
const adminCont = require('../controllers/admin');
const authCont = require('../controllers/auth');
const isAdmin = require('../middleware/is-admin');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.post('/addnewchallenge', isAuth, isAdmin, adminCont.AddNewChallenges);

router.get('/challenges', isAuth, isAdmin, adminCont.Challenges);

router.get('/challenge', isAuth, isAdmin, adminCont.Challenge);

router.post('/deletechallenge', isAuth, isAdmin, adminCont.DeleteChallenge);

router.post('/login', adminCont.adminLogin, authCont.login);

module.exports = router;