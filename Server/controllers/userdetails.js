const userDetail = require("../models/userDetail");
const userWeight = require("../models/userWeight");


exports.All = (req, res, next)=>{
    const userID = req.user.id;

    userDetail.findOne({
        where: {
            userId: userID
        }
    }).then(ud => {
        var gsteps; var gweight;
        if(ud.goalSteps === null){
            gsteps = 0;
        }else{
            gsteps = ud.goalSteps;
        }
        if(ud.goalWeight === null){
            gweight = 0;
        }else{
            gweight = ud.goalWeight;
        }
        const retval = {
            "id": ud.id,
            "firstName": ud.firstName,
            "lastName": ud.lastName,
            "height": ud.height,
            "sex": ud.sex,
            "birthDate": ud.birthDate.getTime(),
            "goalSteps": gsteps,
            "goalWeight": gweight
        }
        res.send(retval);
    }).catch(error => {
        if (!error.statusCode) {
            error.statusCode = 500;
          }
          next(error);
    });
}

exports.GoalsGet = (req, res, next)=>{
    userDetail.findOne({
        where: {
            userId: req.user.id
        }
    }).then(ud => {
        var gsteps; var gweight;
        if(ud.goalSteps === null){
            gsteps = 0;
        }else{
            gsteps = ud.goalSteps;
        }
        if(ud.goalWeight === null){
            gweight = 0;
        }else{
            gweight = ud.goalWeight;
        }
        res.send(JSON.stringify({
            goalSteps: gsteps,
            goalWeight: gweight
        }));
    }).catch(error => {
        if (!error.statusCode) {
            error.statusCode = 500;
          }
          next(error);
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
        }).catch(error => {
            if (!error.statusCode) {
                error.statusCode = 500;
              }
              next(error);
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
                    id: i.id,
                    weight: i.weight,
                    date: i.date.getTime()
                })
            }
            res.send(JSON.stringify(retval));
        }).catch(error => {
            if (!error.statusCode) {
                error.statusCode = 500;
              }
              next(error);
        });
    }).catch(error => {
        if (!error.statusCode) {
            error.statusCode = 500;
          }
          next(error);
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
                weight: createdElement.weight,
                date: createdElement.date.getTime()
            }));
        }).catch(error => {
            if (!error.statusCode) {
                error.statusCode = 500;
              }
              next(error);
        });
    }).catch(error => {
        if (!error.statusCode) {
            error.statusCode = 500;
          }
          next(error);
    });
}

exports.BirthDate = (req, res, next)=>{
    userDetail.findOne({
        where: {
            userId: req.user.id
        }
    }).then(ud => {
        res.send(JSON.stringify({ birthDate: ud.birthDate.getTime()}));
    }).catch(error => {
        if (!error.statusCode) {
            error.statusCode = 500;
          }
          next(error);
    });
}

exports.setHeight = (req, res, next) => {
    userDetail.update(
        {
            height: req.body.height
        },
        {
            where: {
                userId: req.user.id
            }
        }
    ).then(updatedRow => {
        res.send(JSON.stringify({
            height: req.body.height   
        }));
    });
}