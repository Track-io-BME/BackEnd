const jwt = require('jsonwebtoken');
const Users = require('../models/user');
require('dotenv').config()


module.exports = async (req, res, next)=>{
    const authHeader = req.get('Authorization');
    let decodedToken;
    
    try {
        if(!authHeader){
            const err = new Error('Not authenticated');
            err.statusCode = 401;
            throw err;
        }
        const token = authHeader.split(' ')[1];
        
        try{
            decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        }catch(err){
            err.statusCode = 500;
            throw err;
        }
        if(!decodedToken){
            const error = new Error('Not authenticated');
            error.statusCode = 401;
            throw error;
        }

        const id = decodedToken.userID;
    
        req.user = await Users.findOne({
            where:{
                id: id
            }
        })
        console.log("Authenticated");
        next();
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
    
}

