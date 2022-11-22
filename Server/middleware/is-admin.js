const Users = require('../models/user');

module.exports = async (req, res, next)=>{
    try {
        if(req.user.isAdmin === false){
            const err = new Error('Admin account not found');
            err.statusCode = 401;
            throw err;
        }
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
          }
          next(error);
    }
    

    next();
}