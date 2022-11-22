const SportHistory = require('../models/sportHistory');
const Challanges = require('../models/challanges');
const UserChallanges = require('../models/userChallanges');
const { Op } = require("sequelize");


exports.top3 = (req, res, next)=>{
    
}

exports.RunningHistoryAll = (req, res, next)=>{
    const retval = historyLastxTime(req.userId, "RUNNING");
    res.status(200).send(JSON.stringify(retval));
}

exports.RunningHistoryLastWeek = (req, res, next)=>{
    const retval = historyLastxTime(req.userId, "RUNNING", 7);
    res.status(200).send(JSON.stringify(retval));
}

exports.RunningHistoryLastMonth = (req, res, next)=>{
    const retval = historyLastxTime(req.userId, "RUNNING", 30);
    res.status(200).send(JSON.stringify(retval));
}

exports.WalkingHistoryAll = (req, res, next)=>{
    const retval = historyLastxTime(req.userId, "WALKING");
    res.status(200).send(JSON.stringify(retval));
}

exports.WalkingHistoryLastWeek = (req, res, next)=>{
    const retval = historyLastxTime(req.userId, "WALKING", 7);
    res.status(200).send(JSON.stringify(retval));
}

exports.WalkingHistoryLastMonth = (req, res, next)=>{
    const retval = historyLastxTime(req.userId, "WALKING", 30);
    res.status(200).send(JSON.stringify(retval));
}

exports.CyclingHistoryAll = (req, res, next)=>{
    const retval = historyLastxTime(req.userId, "CYCLING");
    res.status(200).send(JSON.stringify(retval));
}

exports.CyclingHistoryLastWeek = (req, res, next)=>{
    const retval = historyLastxTime(req.userId, "CYCLING", 7);
    res.status(200).send(JSON.stringify(retval));
}

exports.CyclingHistoryLastMonth = async (req, res, next)=>{
    const retval = historyLastxTime(req.userId, "CYCLING", 30);
    res.status(200).send(JSON.stringify(retval));
}

exports.finishtraining = async (req, res, next)=>{
    const date = new Date(req.body.date);
    const totalDuration = req.body.totalDuration
    const steps = req.body.steps;
    const distance = req.body.distance;
    const averageSpeed = req.body.averageSpeed;
    const calories = req.body.calories;
    const elevation = req.body.elevation;
    const sportType = req.body.sportType;

    SportHistory.create({
        date: date,
        totalDuration: totalDuration,
        steps: steps,
        distance: distance,
        averageSpeed: averageSpeed,
        calories: calories,
        elevation: elevation,
        sportType: sportType,
        userId: req.userId
    })

    const resultsLastWeek = historyLastxTime(req.userId, sportType, 7);
    const resultsLastDay = historyLastxTime(req.userId, sportType, 1);

    var distanceLastDay;
    var distanceLastWeek;

    if(resultsLastWeek != null){
            resultsLastWeek.forEach(element => {
            distanceLastWeek += element.distance;
        });
    }

    if(resultsLastDay != null){
        resultsLastDay.forEach(element => {
            distanceLastDay += element.distance;
        });
    }
    
    const completedChallanges = [];
    if(distanceLastDay || distanceLastWeek){
        const probablechallanges = await Challanges.findAll({
            where: {
                [Op.and]: {
                    startDate: {
                        [Op.lt]: Date.now()
                    },
                    endDate: {
                        [Op.gt]: Date.now()
                    }
                }
            }
        })

        probablechallanges.forEach(element => {
            if(element.duration === "WEEKLY" && resultsLastWeek != null){
                if(element.distance <= distanceLastWeek){
                    completedChallanges.push({
                        id: element.id,
                        sportType: element.sportType,
                        startDate: element.startDate.getTime(),
                        duration: element.duration,
                        distance: element.distance
                    })
                }
            }else{
                if(element.distance <= distanceLastDay && resultsLastDay != null){
                    completedChallanges.push({
                        id: element.id,
                        sportType: element.sportType,
                        startDate: element.startDate.getTime(),
                        duration: element.duration,
                        distance: element.distance
                    })
                }
            }
        });
    }
    

    

    completedChallanges.forEach(element => {
        UserChallanges.create({
            userId: req.user.id,
            challangeId: element.id
        })
    });

    res.status(200).send(JSON.stringify(completedChallanges));
}

async function historyLastxTime(id, sportsCategory, time = null) {
    if(time !== null){
        var gtTime = new Date();
        gtTime.setDate(gtTime.getDate() - time);
        const retval = await SportHistory.findAll({
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
        const retval = await SportHistory.findAll({
            attributes: ['date', 'totalduration', 'steps', 'distance', 'averageSpeed', 'calories', 'elevation', 'SportType'],
            where : {
                userId: id,
                sportType: {
                    [Op.eq]: sportsCategory
                }
            }
        });
    }


    return retval;
}