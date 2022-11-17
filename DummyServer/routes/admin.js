const express = require('express');
const isAuth = require('../middleware/is-auth');
const challanges = require('../models/challanges');

const router = express.Router();

router.post('/login', (req, res, next)=>{
    var name = req.body.name;
  var passw = req.body.passw

  if(name === "admin" && passw === "adminpassw"){
    res.status(200).send("OK");
  }else{
    res.status(400).send("Authentication failed");
  }
});

router.post('/addnewchallange', (req, res, next)=>{
    var distance = req.body.distance;
    var duration = req.body.duration;
    var sportType = req.body.sportType; // 0: walk, 1: run, 2: cycle
    var startdate = req.body.startdate;
    
    challanges.create({
      distance: distance,
      sportType: sportType,
      startdate: new Date(startdate),
      duration: duration
    });

    res.status(200).send();
});

router.get('/challanges', async (req, res, next)=>{
    res.contentType('application/json');
    const resval = await challanges.findAll({
      attributes: ['id', 'distance', 'sportType', 'startDate', 'duration'],
    });

    //console.log(JSON.stringify(resval));
    res.send(JSON.stringify(resval));
});

router.get('/challange',isAuth, async (req, res, next)=>{
  res.contentType('application/json');
  const resval = await challanges.findAll({
    attributes: ['id', 'distance', 'sportType', 'startDate', 'duration'],
    where: {
      id: 46
    }
  });

  //console.log(JSON.stringify(resval));
  res.send(JSON.stringify(resval));
  res.json({
    "id": 46,
    "distance": 1000,
    "sportType": 0,
    "startdate": "2022-11-11",
    "duration": 2013212
  })
});

module.exports = router;