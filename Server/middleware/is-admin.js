const Users = require('../models/user');

module.exports = async (req, res, next)=>{
    
    if(req.user.isAdmin === false){
        const err = new Error('Admin account not found');
        err.statusCode = 401;
        throw err;
    }

    next();
}