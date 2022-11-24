const SportHistory = require('../models/sportHistory');
const Challenges = require('../models/challenges');
const UserChallenges = require('../models/userChallenges');
const { Op } = require("sequelize");

exports.top3 = (req, res, next)=>{
    const userID = req.user.id;

    SportHistory.findAll({
        limit: 3,
        order: [['createdAt', 'DESC']],
        where: {
            userId: userID
        }
    }).then(tops=>{ 
        const rets = [];
        for(let i of tops){
            rets.push({
                id: i.id,
                date: i.date.getTime(),
                totalduration: i.totalduration,
                steps: i.steps,
                distance: i.distance,
                averageSpeed: i.averageSpeed,
                calories: i.calories,
                elevation: i.elevation,
                sportType: i.sportType
            })
        }
        res.send(JSON.stringify(rets));
    });
}

exports.LastWeek = (req, res, next) => {
    var gtTime = new Date();
    const res = [];
    gtTime.setDate(gtTime.getDate() - 7);
    SportHistory.findAll({
        where: {
            [Op.and]:
            {
                date: {
                    [Op.gte]: gtTime
                },
                userId: req.user.id
            }
            
        }
    }).then(v => {
        for(let i of v){
            res.push(
                {
                    id: i.id,
                    date: i.date.getTime(),
                    totalduration: i.totalduration,
                    steps: i.steps,
                    distance: i.distance,
                    averageSpeed: i.averageSpeed,
                    calories: i.calories,
                    elevation: i.elevation,
                    sportType: i.sportType
                }
            )
        }
    });

    res.send(JSON.stringify(res));
}

exports.LastMonth = (req, res, next) => {
    var gtTime = new Date();
    const res = [];
    gtTime.setDate(gtTime.getDate() - 30);
    SportHistory.findAll({
        where: {
            [Op.and]:
            {
                date: {
                    [Op.gte]: gtTime
                },
                userId: req.user.id
            }
            
        }
    }).then(v => {
        for(let i of v){
            res.push(
                {
                    id: i.id,
                    date: i.date.getTime(),
                    totalduration: i.totalduration,
                    steps: i.steps,
                    distance: i.distance,
                    averageSpeed: i.averageSpeed,
                    calories: i.calories,
                    elevation: i.elevation,
                    sportType: i.sportType
                }
            )
        }
    });

    res.send(JSON.stringify(res));
}

exports.All = (req, res, next) => {
    var gtTime = new Date();
    const res = [];
    gtTime.setDate(gtTime.getDate() - 7);
    SportHistory.findAll({
        where: {
            userId: req.user.id
        }
    }).then(v => {
        for(let i of v){
            res.push(
                {
                    id: i.id,
                    date: i.date.getTime(),
                    totalduration: i.totalduration,
                    steps: i.steps,
                    distance: i.distance,
                    averageSpeed: i.averageSpeed,
                    calories: i.calories,
                    elevation: i.elevation,
                    sportType: i.sportType
                }
            )
        }
    });

    res.send(JSON.stringify(res));
}

exports.finishtraining = async (req, res, next)=>{
    const date = new Date(req.body.date);
    const totalDuration = req.body.totalduration
    const steps = req.body.steps;
    const distance = req.body.distance;
    const averageSpeed = req.body.averageSpeed;
    const calories = req.body.calories;
    const elevation = req.body.elevation;
    const sportType = req.body.sportType;

    const retval = await SportHistory.create({
        date: date,
        totalduration: totalDuration,
        steps: steps,
        distance: distance,
        averageSpeed: averageSpeed,
        calories: calories,
        elevation: elevation,
        sportType: sportType,
        userId: req.user.id
    })

    const currentChallenges = await Challenges.findAll({where:{
        [Op.and]:{
            startDate: {
                [Op.lt]: Date.now()
            },
            endDate: {
                [Op.gt]: Date.now()
            },
            isActive: true,
            sportType: sportType
        }
    }});

    console.log("currentchallenges: ");
    console.log(currentChallenges);

    var lastDaysDistance =  await historyLastxTime(req.user.id, sportType, 1)
                                .then(val => {
                                    if(val.length === 0) return null;
                                    var e = 0;
                                    for(let i of val){
                                        e += i.distance;
                                    }
                                    return e;
    });
                            
    var lastWeeksDistance =  await historyLastxTime(req.user.id, sportType, 7)
                                .then(val => {
                                    if(val.length === 0) return null;
                                    var e = 0;
                                    for(let i of val){
                                        e += i.distance;
                                    }
                                    return e;
    });

    console.log("lastweeksDistance: " + lastWeeksDistance);
    console.log("lastDaysDistance: " + lastDaysDistance);
    console.log("curr challenges ("+ currentChallenges.length +"): ");
    console.log(currentChallenges);
    const completedChallenges = [];                   
    for(let i of currentChallenges){
        if(i.duration === "WEEKLY"){
            if(lastWeeksDistance >= i.distance){
                completedChallenges.push(i);
            }
        }else{
            if(lastDaysDistance >= i.distance){
                completedChallenges.push(i);
            }
        }
    }
    
    console.log("completed challenges: ");
    console.log(completedChallenges.length);
    for(i of completedChallenges){
        const [retval, created] = await UserChallenges.findOrCreate({where: {
            userId: req.user.id,
            challengeId: i.id
        }});
    }

    res.send(JSON.stringify({
        id: retval.id,
        date: retval.date.getTime(),
        totalduration: retval.totalduration,
        steps: retval.steps,
        distance: retval.distance,
        averageSpeed: retval.averageSpeed,
        calories: retval.calories,
        elevation: retval.elevation,
        sportType: retval.sportType
    }));
}

function historyLastxTime(id, sportsCategory, time = null) {
    console.log("func beginning");
    if(time !== null){
        console.log("func in time is not null");
        var gtTime = new Date();
        gtTime.setDate(gtTime.getDate() - time);
        return SportHistory.findAll({
            attributes: ['date', 'totalduration', 'steps', 'distance', 'averageSpeed', 'calories', 'elevation', 'SportType'],
            where : {
                userId: id,
                date: {
                    [Op.gte]: time
                },
                sportType: {
                    [Op.eq]: sportsCategory
                }
            }
        });
    }else{
        return SportHistory.findAll({
            attributes: ['date', 'totalduration', 'steps', 'distance', 'averageSpeed', 'calories', 'elevation', 'SportType'],
            where : {
                userId: id,
                sportType: {
                    [Op.eq]: sportsCategory
                }
            }
        });
    }
}
