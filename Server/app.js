const bodyParser = require('body-parser');
const express = require('express');
const http = require('http');
//const fs = require('fs');
const bcrypt = require('bcrypt');
const {body} = require('express-validator');

const adminRoutes = require('./routes/admin');
const challengeRoutes = require('./routes/challenges');
const userdetRoutes = require('./routes/userdetails');
const userworkRoutes = require('./routes/userworkout');
const authRoutes = require('./routes/auth');
const isAuth = require('./middleware/is-auth');
const sequelize = require('./util/database');
const user = require('./models/user');
const dailyHistory = require('./models/dailyHistory');
const challenges = require('./models/challenges');
const sportHistory = require('./models/sportHistory');
const sportHistoryMap = require('./models/sportHistoryMap');
const userChallenges = require('./models/userChallenges');
const userDetail = require('./models/userDetail');
const userWeight = require('./models/userWeight');

const app = express();
//const options = {
//  key: fs.readFileSync('key.pem'),
//  cert: fs.readFileSync('cert.pem')
//}
app.use(bodyParser.json());
app.use('/', (req, res, next)=>{
  console.log("incoming request");
  next();
});

app.use('/test/dates', async (req,res,next)=>{
  //var date = new Date(req.body.DATE)
  //const val = await sportHistory.findAll({where: {id: 0}});
  //console.log(val.length);
  //date.setHours(0);
  //date.setMinutes(0);
  //date.setSeconds(0);
  //console.log("function: ")
  console.log(Date.now());
  //q().then(v => { res.send("length: " + v.length); });
  //date.setMilliseconds(0);
  //var date1 = new Date(date.getTime() + 24 * 3600000);
  //var date2 = new Date(date.getTime() - 1);
  //console.log(date.toString());
  //console.log(Date.now());
  //console.log(date1.toString());
  //console.log(date2.toString());
  //res.send("OK");
});

function q(){
  return challenges.findAll();
}


app.use(authRoutes);
app.use('/userDetails', isAuth, userdetRoutes);
app.use('/userWorkout', isAuth, userworkRoutes);
app.use('/challenges', isAuth, challengeRoutes);
app.use('/admin', adminRoutes);

app.use((error, req, res, next)=>{
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({message: message, data: data});
});

user.hasMany(dailyHistory);
dailyHistory.belongsTo(user);
user.hasMany(sportHistory);
sportHistory.belongsTo(user);
sportHistory.hasOne(sportHistoryMap);
sportHistoryMap.belongsTo(sportHistory);
user.hasMany(userChallenges);
userChallenges.belongsTo(user);
challenges.hasOne(userChallenges);
userChallenges.belongsTo(challenges);
user.hasOne(userDetail);
userDetail.belongsTo(user);
userDetail.hasOne(userWeight);
userWeight.belongsTo(userDetail);

//

sequelize
  .sync()
  .then(result =>{
    console.log(result);
  })
  .catch(err => {
    console.log(err);
  });

http.createServer(app).listen(3000);
