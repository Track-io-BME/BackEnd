const challenges = require('../models/challenges');
const userChallenges = require('../models/userChallenges');
const { Op } = require("sequelize");


exports.getActiveChallenges = async (req, res, next)=>{
    challenges.findAll({
        attributes: ['id', 'distance', 'sportType', 'startDate', 'duration'],
        where: {
            [Op.and]:{
                startDate: {
                    [Op.lt]: Date.now()
                },
                endDate: {
                    [Op.gt]: Date.now()
                },
                isActive: true,
            }
        }
    }).then(i => {
        console.log("hello active");
        const retval = [];
        for(let item of i){
            retval.push({
                id: item.id,
                distance: item.distance,
                sportType: item.sportType,
                startDate: item.startDate.getTime(),
                duration: item.duration
            });
        }
        res.send(JSON.stringify(retval));
    }).catch(error => {
        if (!error.statusCode) {
            error.statusCode = 500;
          }
          next(error);
    });
}

exports.getCompletedChallenges = async (req, res, next)=>{
    const userID = req.user.id;

    userChallenges.findAll({
        where: {
            userId: userID
        }
    }).then(async i => {
        const retval = [];
        for(let item of i){
            const temp = await challenges.findByPk(item.challengeId);
            retval.push({
                id: temp.id,
                distance: temp.distance,
                sportType: temp.sportType,
                startDate: temp.startDate.getTime(),
                duration: temp.duration
            }); 
        }
        res.send(JSON.stringify(retval));
    }).catch(error => {
        if (!error.statusCode) {
            error.statusCode = 500;
          }
          next(error);
    });

}