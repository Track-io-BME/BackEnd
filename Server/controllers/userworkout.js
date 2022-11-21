const SportHistory = require('../models/sportHistory');
const Challanges = require('../models/challanges');
const UserChallanges = require('../models/userChallanges');
const { Op } = require("sequelize");


exports.top3 = (req, res, next)=>{
    
}

exports.RunningHistoryAll = (req, res, next)=>{
    const retval = historyLastxTime(req.user.id, "RUNNING");
    res.status(200).send(JSON.stringify(retval));
}

exports.RunningHistoryLastWeek = (req, res, next)=>{
    const retval = historyLastxTime(req.user.id, "RUNNING", 8);
    res.status(200).send(JSON.stringify(retval));
}

exports.RunningHistoryLastMonth = (req, res, next)=>{
    const retval = historyLastxTime(req.user.id, "RUNNING", 31);
    res.status(200).send(JSON.stringify(retval));
}

exports.WalkingHistoryAll = (req, res, next)=>{
    const retval = historyLastxTime(req.user.id, "WALKING");
    res.status(200).send(JSON.stringify(retval));
}

exports.WalkingHistoryLastWeek = (req, res, next)=>{
    const retval = historyLastxTime(req.user.id, "WALKING", 8);
    res.status(200).send(JSON.stringify(retval));
}

exports.WalkingHistoryLastMonth = (req, res, next)=>{
    const retval = historyLastxTime(req.user.id, "WALKING", 31);
    res.status(200).send(JSON.stringify(retval));
}

exports.CyclingHistoryAll = (req, res, next)=>{
    const retval = historyLastxTime(req.user.id, "CYCLING");
    res.status(200).send(JSON.stringify(retval));
}

exports.CyclingHistoryLastWeek = (req, res, next)=>{
    const retval = historyLastxTime(req.user.id, "CYCLING", 8);
    res.status(200).send(JSON.stringify(retval));
}

exports.CyclingHistoryLastMonth = async (req, res, next)=>{
    const retval = historyLastxTime(req.user.id, "CYCLING", 31);
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

    //TODOO

    req.user
        .createsportHistory({
            date: date,
            totalDuration: totalDuration,
            steps: steps,
            distance: distance,
            averageSpeed: averageSpeed,
            calories: calories,
            elevation: elevation,
            sportType: sportType
        })

    res.status(200).send();
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
                    [Op.gt]: time
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