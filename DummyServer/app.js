const bodyParser = require('body-parser')
const express = require('express')
const https = require('https')
const fs = require('fs')
const bcrypt = require('bcrypt')
const {body} = require('express-validator/check')

const adminRoutes = require('./routes/admin')
const challangeRoutes = require('./routes/challenges')
const userdetRoutes = require('./routes/userdetails')
const userworkRoutes = require('./routes/userworkout')
const authRoutes = require('./controllers/auth')
const isAuth = require('./middleware/is-auth')

const users = []
const app = express()
const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
}



app.use('/', (req, res, next)=>{
  console.log("incoming request")
  next()
})

app.post('/', bodyParser.urlencoded({extended: false}))


app.use(authRoutes)
app.use('/userdetails', isAuth, userdetRoutes)
app.use('/userWorkout', isAuth, userworkRoutes)
app.use('/challanges', isAuth , challangeRoutes)
app.use('/admin', isAuth, adminRoutes)

app.use((error, req, res, next)=>{
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({message: message, data: data});
})

https.createServer(options, app).listen(443)