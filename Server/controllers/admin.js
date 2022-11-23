const challenges = require('../models/challenges');

exports.Challenges = async (req, res, next) =>{
    res.contentType('application/json');
    const resval = await challenges.findAll({
      attributes: ['id', 'distance', 'sportType', 'startDate', 'duration'],
    })
    
    const retarr = [];
    resval.forEach(element => {
      retarr.push({
        id: element.id,
        distance: element.distance,
        startDate: element.startDate.getTime(),
        sportType: element.sportType,
        duration: element.duration
      })
    });
    //console.log(JSON.stringify(resval));
    res.send(JSON.stringify(retarr));
}

exports.Challenge = async (req, res, next) =>{
    res.contentType('application/json');
    const resval = await challenges.findAll({
    attributes: ['id', 'distance', 'sportType', 'startDate', 'duration'],
    where: {
      id: 46
    }
  });

  //console.log(JSON.stringify(resval));
  //res.send(JSON.stringify(resval));
  res.json({
    "id": 46,
    "distance": 1000,
    "sportType": 0,
    "startdate": "2022-11-11",
    "duration": 2013212
  })
}

exports.AddNewChallenges = async (req, res, next) =>{
    var distance = req.body.distance;
    var duration = req.body.duration;
    var sportType = req.body.sportType; // 0: walk, 1: run, 2: cycle
    var startDate = new Date(req.body.startDate);
    startDate.setHours(0);
    startDate.setMinutes(0);
    startDate.setSeconds(0);
    startDate.setMilliseconds(0);

    var ENDDATE;
    if(duration === "DAILY"){
      ENDDATE = new Date(startDate.getTime() + 24 * 3600000);
    } else{
      ENDDATE = new Date(startDate.getTime() + 7 * 24 * 3600000);
    }
    
    const newch = await challenges.create({
      distance: distance,
      sportType: sportType,
      startDate: startDate,
      endDate: ENDDATE,
      duration: duration
    });


    res.status(200).send(JSON.stringify({
      id: newch.id,
      distance: newch.distance,
      sportType: newch.sportType,
      startDate: newch.startDate.getTime(),
      duration: newch.duration
    }));
}

exports.DeleteChallenge = async (req, res, next) => {
  const deleteID = req.body.id;

  challenges.findOne({attributes: ['id', 'distance', 'sportType', 'startDate', 'duration']})
  .then(val => {
    challenges.destroy({where: { id : deleteID }})
      .then(num => {
        res.send(JSON.stringify({
          id: val.id,
          distance: val.distance,
          sportType: val.sportType,
          startDate: val.startDate.getTime(),
          duration: val.duration
        }));
      });
  })
    
}
