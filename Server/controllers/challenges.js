const challenges = require('../models/challenges');
const userChallenges = require('../models/userChallenges');

exports.WalkingDaily = (req, res, next)=>{
    
}

exports.WalkingWeekly = (req, res, next)=>{
    
}

exports.RunningDaily = (req, res, next)=>{
    
}

exports.RunningWeekly = (req, res, next)=>{
    
}

exports.CyclingDaily = (req, res, next)=>{
    
}

exports.CyclingWeekly = (req, res, next)=>{
    
}

exports.getActiveChallenges = async (req, res, next)=>{
    challenges.findAll({
        attributes: ['id', 'distance', 'sportType', 'startDate', 'duration'],
        where: {
            isActive: true
        }
    }).then(v => {
        res.send(JSON.stringify(v));
    });
}

exports.getCompletedChallenges = async (req, res, next)=>{
    const userID = req.user.id;

    userChallenges.findAll({
        include: challenges,
        where: {
            userId: userID
        }
    }).then(v => {
        res.send(JSON.stringify(v));
    });

}