const jwt = require('jsonwebtoken');
const Users = require('../models/user');

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
            decodedToken = jwt.verify(token, '5fcf63007a349507a39efd7690d4a07120bf118e559faf6c0dca463b08fc4735b833935f7a8bfd1f88f156d30bc48edfe48edfec5a1146a8eac0acedaa7c73ed7ea685');
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

