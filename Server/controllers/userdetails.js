const userDetail = require("../models/userDetail");
const userWeight = require("../models/userWeight");


exports.All = (req, res, next)=>{
    const userID = req.user.id;

    userDetail.findOne({
        where: {
            userId: userID
        }
    }).then(ud => {
        const retval = {
            "id": ud.id,
            "height": ud.height,
            "sex": ud.sex,
            "birthDate": ud.birthDate.getTime(),
            "goalSteps": ud.goalSteps,
            "goalWeight": ud.goalWeight
        }
        res.send(retval);
    })
}

exports.GoalsGet = (req, res, next)=>{
    userDetail.findOne({
        where: {
            userId: req.user.id
        }
    }).then(ud => {
        res.send(JSON.stringify({
            goalSteps: ud.goalSteps,
            goalWeight: ud.goalWeight
        }));
    });
}

exports.GoalsPut = (req, res, next)=>{
    userDetail.update(
        {
            goalSteps: req.body.stepgoal,
            goalWeight: req.body.weightgoal
        },
        {
            where: {
                userId: req.user.id
            }
        }).then(updatedRow =>{
            res.send(JSON.stringify({
                goalSteps: req.body.stepgoal,
                goalWeight: req.body.weightgoal
            }));
        });
}

exports.WeightGet = (req, res, next)=>{
    userDetail.findOne({
        where: {
            userId: req.user.id
        }
    }).then(ud => {
        userWeight.findAll({
            where: {
                userDetailId: ud.id
            }
        }).then(uw => {
            const retval = [];
            for(let i of uw){
                retval.push({
                    weight: i.weight,
                    date: i.date.getTime()
                })
            }
            res.send(JSON.stringify(retval));
        });
    });
}

exports.WeightPost = (req, res, next)=>{
    userDetail.findOne({
        where: {
            userId: req.user.id
        }
    }).then(ud => {
        userWeight.create({
            weight: req.body.weight,
            date: new Date(req.body.date),
            userDetailId: ud.id
        }).then(createdElement => {
            res.send(JSON.stringify({
                id: createdElement.id,
                newWeight: createdElement.weight,
                date: createdElement.date.getTime()
            }));
        });
    });
}

exports.BirthDate = (req, res, next)=>{
    userDetail.findOne({
        where: {
            userId: req.user.id
        }
    }).then(ud => {
        res.send(JSON.stringify({ birthDate: ud.birthDate.getTime()}));
    });
}