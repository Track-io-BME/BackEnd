const express = require('express');
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
    var type = req.body.type; // 0: walk, 1: run, 2: cycle
    var startdate = req.body.startdate;
    
    challanges.create({
      distance: distance,
      category: type,
      startdate: startdate,
      duration: duration
    });

    res.status(200);
});

router.get('/challanges', (req, res, next)=>{
    res.contentType('application/json');
    const resval = challanges.findAll();
    console.log(resval);
    //res.send(JSON.stringify(resval));
});

module.exports = router;