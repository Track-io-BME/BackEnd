const SportHistory = require('../models/sportHistory');
const Challanges = require('../models/challanges');
const UserChallanges = require('../models/userChallanges');
const { Op } = require("sequelize");


exports.top3 = (req, res, next)=>{
    
}

exports.RunningHistoryAll = (req, res, next)=>{
    historyLastxTime(req.user.id, "RUNNING")
        .then(retval => {
            console.log("arrived back");
            res.status(200).send(JSON.stringify(retval));
        });
}

exports.RunningHistoryLastWeek = (req, res, next)=>{
    historyLastxTime(req.user.id, "RUNNING", 7)
        .then(retval => {
            console.log("arrived back");
            res.status(200).send(JSON.stringify(retval));
        });
}

exports.RunningHistoryLastMonth = (req, res, next)=>{
    historyLastxTime(req.user.id, "RUNNING", 30)
        .then(retval => {
            console.log("arrived back");
            res.status(200).send(JSON.stringify(retval));
        });
}

exports.WalkingHistoryAll = (req, res, next)=>{
    historyLastxTime(req.user.id, "WALKING")
        .then(retval => {
            console.log("arrived back");
            res.status(200).send(JSON.stringify(retval));
        })
}

exports.WalkingHistoryLastWeek = async (req, res, next)=>{
    historyLastxTime(req.user.id, "WALKING", 7)
        .then(retval => {
            console.log("arrived back");
            res.status(200).send(JSON.stringify(retval));
        })
}

exports.WalkingHistoryLastMonth = (req, res, next)=>{
    historyLastxTime(req.user.id, "WALKING", 30)
        .then(retval => {
            console.log("arrived back");
            res.status(200).send(JSON.stringify(retval));
        });
}

exports.CyclingHistoryAll = (req, res, next)=>{
    historyLastxTime(req.user.id, "CYCLING")
        .then(retval => {
            console.log("arrived back");
            res.status(200).send(JSON.stringify(retval));
        });
}

exports.CyclingHistoryLastWeek = (req, res, next)=>{
    historyLastxTime(req.user.id, "CYCLING", 7)
        .then(retval => {
            console.log("arrived back");
            res.status(200).send(JSON.stringify(retval));
        });
}

exports.CyclingHistoryLastMonth = async (req, res, next)=>{
    historyLastxTime(req.user.id, "CYCLING", 30)
        .then(retval => {
            console.log("arrived back");
            res.status(200).send(JSON.stringify(retval));
        });
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

    SportHistory.create({
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

    const currentChallanges = await Challanges.findAll({where:{
        [Op.and]:{
            startDate: {
                [Op.lt]: Date.now()
            },
            endDate: {
                [Op.gt]: Date.now()
            }
        }
    }});

    console.log("currentchallanges: ");
    console.log(currentChallanges);

    var lastDaysDistance =  await historyLastxTime(req.user.id, sportType, 1)
                                .then(val => {
                                    console.log("length: " + val.length);
                                    if(val.length === 0) return null;
                                    console.log("val.length: " + val.length);
                                    var e = 0;
                                    for(let i of val){
                                        console.log("dist of curr training: " + i.distance);
                                        e += i.distance;
                                    }
                                    return e;
                                });
                            
    var lastWeeksDistance =  await historyLastxTime(req.user.id, sportType, 7)
                                .then(val => {
                                    console.log("length: " + val.length);
                                    if(val.length === 0) return null;
                                    console.log("val.length: " + val.length);
                                    var e = 0;
                                    for(let i of val){
                                        console.log("dist of curr training: " + i.distance);
                                        e += i.distance;
                                    }
                                    return e;
                                });

    //const completedChallanges = 
   

    res.send("OK");
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
