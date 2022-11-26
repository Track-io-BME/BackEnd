const bodyParser = require('body-parser');
const express = require('express');
const http = require('http');

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

app.use(bodyParser.json());

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

sequelize
  .sync()
  .then(result =>{
    console.log(result);
  })
  .catch(err => {
    console.log(err);
  });

http.createServer(app).listen(3000);
