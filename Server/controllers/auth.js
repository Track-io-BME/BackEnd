const {validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const user = require('../models/user');


exports.Signup = async (req, res, next) =>{
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

    await user.findOne({where: {email: email}})
        .then(retuser=>{
            if(retuser != null){
                console.log("már létezik");
                return null;
            }else{
                console.log("még nem létezik");
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
                    });
                return email;
            }   
        }).then(result=>{
            if(!result){ 
                res.status(400).json({message: 'User already exists', email: ''});
            }else{
                res.status(201).json({message: 'User created', email: email});
            }
            
        }).catch(err=>{
            if(!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        });
}


exports.login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    let loadedUser;
    user.findOne({where: { email: email }})
      .then(u => {
        if (!u) {
          const error = new Error('A user with this email could not be found.');
          error.statusCode = 401;
          throw error;
        }
        loadedUser = u;
        return bcrypt.compare(password, u.password);
      })
      .then(isEqual => {
        if (!isEqual) {
          const error = new Error('Wrong password!');
          error.statusCode = 401;
          throw error;
        }
        const token = jwt.sign(
          {
            email: loadedUser.email,
            userID: loadedUser.id.toString()
          },
          'secret',
          { expiresIn: '1h' }
        );
        res.status(200).json({"token": token, "email": loadedUser.email});
      })
      .catch(err => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
  };

