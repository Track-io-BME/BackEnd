const challanges = require('../models/challanges');

exports.Challanges = async (req, res, next) =>{
    res.contentType('application/json');
    const resval = await challanges.findAll({
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

exports.Challange = async (req, res, next) =>{
    res.contentType('application/json');
    const resval = await challanges.findAll({
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

exports.AddNewChallanges = async (req, res, next) =>{
    var distance = req.body.distance;
    var duration = req.body.duration;
    var sportType = req.body.sportType; // 0: walk, 1: run, 2: cycle
    var startdate = new Date(req.body.startdate);
    startdate.setHours(0);
    startdate.setMinutes(0);
    startdate.setSeconds(0);
    startdate.setMilliseconds(0);

    var ENDDATE;
    if(duration === "DAILY"){
      ENDDATE = new Date(startdate.getTime() + 24 * 3600000);
    } else{
      ENDDATE = new Date(startdate.getTime() + 7 * 24 * 3600000);
    }
    
    challanges.create({
      distance: distance,
      sportType: sportType,
      startDate: startdate,
      endDate: ENDDATE,
      duration: duration
    });

    res.status(200).send();
}