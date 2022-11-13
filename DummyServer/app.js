const bodyParser = require('body-parser');
const express = require('express');
const http = require('http');
//const fs = require('fs');
const bcrypt = require('bcrypt');
const {body} = require('express-validator');

const adminRoutes = require('./routes/admin');
const challangeRoutes = require('./routes/challenges');
const userdetRoutes = require('./routes/userdetails');
const userworkRoutes = require('./routes/userworkout');
const authRoutes = require('./routes/auth');
const isAuth = require('./middleware/is-auth');
const sequelize = require('./util/database');
const user = require('./models/user');
const dailyHistory = require('./models/dailyHistory');
const challanges = require('./models/challanges');
const sportHistory = require('./models/sportHistory');
const sportHistoryMap = require('./models/sportHistoryMap');
const userChallanges = require('./models/userChallanges');
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


app.use(authRoutes);
app.use('/userdetails', isAuth, userdetRoutes);
app.use('/userWorkout', isAuth, userworkRoutes);
app.use('/challanges', isAuth , challangeRoutes);
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
user.hasMany(userChallanges);
userChallanges.belongsTo(user);
challanges.hasOne(userChallanges);
userChallanges.belongsTo(challanges);
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
