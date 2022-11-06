const {validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const user = require('../models/user');


exports.Signup = (req, res, next) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const error = new Error('Validation failed.')
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }
    const email = req.body.email
    const firstname = req.body.firstname
    const lastname = req.body.lastname
    const gender = req.body.gender
    const weight = req.body.weight
    const height = req.body.height
    const dateofbirth = req.body.dateofbirth
    const password = req.body.password

    user.findOne({where: {email: email}})
        .then(retuser=>{
            if(retuser){
                res.status(400).send("felhasznalo mar letezik")
            }

            bcrypt.hash(password ,12).then(hashedpassw=>{
                user.create({
                    email: email,
                    firstname: firstname,
                    lastname: lastname,
                    gender: gender,
                    height: height,
                    weight: weight,
                    dateofbirth: dateofbirth,
                    password: hashedpassw,
                });
            return user.findOne({where: {email: email}});    
            }).then(result=>{
                res.status(201).json({message: 'User created', userId: result.id});
            }).catch(err=>{
                if(!err.statusCode){
                    err.statusCode = 500;
                }
                next(err);
            });

        });
}




exports.login = (req, res, next) =>{
    const email = req.body.email;
    const password = req.body.password;
    user.findOne({where: {email: email}})
        .then(u =>{
            if(!u){
                const error = new Error('No such user found.');
                error.statusCode = 401;
                throw error;
            }
            if(!bcrypt.compare(password, u.password)){
                const error = new Error('No such user found.');
                            error.statusCode = 401;
                            throw error;
            }
            const token = jwt.sign({email: u.email, userID: u.id.toString()}, 'secret', {expiresIn: '1h'});
            return token;
        }).then(token =>{
            res.status(200).send({"token": token, "username": email});
        }).catch(e =>{
            if(!e.statusCode){
                e.statusCode = 501;
            }
            next(e);
        })
            
}

