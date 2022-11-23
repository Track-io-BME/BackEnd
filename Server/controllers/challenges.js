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
    });
}

exports.getCompletedChallenges = async (req, res, next)=>{
    const userID = req.user.id;

    userChallenges.findAll({
        include: challenges,
        where: {
            userId: userID
        }
    }).then(i => {
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
    });

}