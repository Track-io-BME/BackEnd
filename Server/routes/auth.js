const express = require('express');
const {body} = require('express-validator')
const authCont = require('../controllers/auth')

const router = express.Router();

// 'none'

router.put('/signup', [
    body('email').isEmail().withMessage("Please enter a vald email."), 
    body('password').trim().isLength({min: 5}),
    body('firstname').trim().not().isEmpty(),
    body('lastname').trim().not().isEmpty()
], authCont.Signup);

router.post('/login', authCont.login);

module.exports = router;
