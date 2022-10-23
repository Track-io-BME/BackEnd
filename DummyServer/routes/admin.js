const express = require('express');

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

router.post('/challanges', (req, res, next)=>{});

module.exports = router;