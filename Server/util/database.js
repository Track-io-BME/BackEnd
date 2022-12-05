const Sequelize = require('sequelize');

const sequelize = new Sequelize('trackiodatabase', 'FogtiIstvan', 'Trackio2022passw#', {
  dialect: 'postgres',
  host: 'database-trackio.c8qfjnheu36d.us-east-1.rds.amazonaws.com'
});

//Datamodel: https://dbdiagram.io/d/63404344f0018a1c5fb9ee3a?fbclid=IwAR0N3yeppsDthx8y8e-3UjjEsRPE1Im0wL__Ra8z>
module.exports = sequelize;