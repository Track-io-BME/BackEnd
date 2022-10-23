const {validationResult} = require('express-validator/check')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

const users = [];

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
    ID = Date.now().toString()

    bcrypt.hash(password ,12).then(hashedpassw=>{
        users.push({
            email: email,
            firstname: firstname,
            lastname: lastname,
            gender: gender,
            height: height,
            weight: weight,
            dateofbirth: dateofbirth,
            password: hashedpassw,
            ID: ID
        });
        return users;
    }).then(result=>{
        res.status(201).json({message: 'User created', userId: ID});
    }).catch(err=>{
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    });


    exports.login = (req, res, next) =>{
        const email = req.body.email;
        const password = req.body.password;
        let loadedUser;

        users.findOne({email: email})
            .then(user=>{
                if(!user){
                    const error = new Error('No such user found.');
                    error.statusCode = 401;
                    throw error;
                }
                loadedUser = user;
                return bcrypt.compare(password, user.password);
            })
            .then(isEqual=>{
                if(!isEqual){
                    const error = new Error('Wrong password');
                    error.statusCode = 401;
                    throw error;
                }
                const token = jwt.sign({email: loadedUser.email, userId: loadedUser.ID.toString()}, 'secret', {expiresIn: '1h'});
                res.status(200).json({token: token, userId: loadedUser.ID.toString()});
            }).catch(err=>{
                if(!err.statusCode){
                    err.statusCode = 500;
                }
                next(err);
            })
    }
}