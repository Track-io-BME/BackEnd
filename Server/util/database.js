const Sequelize = require('sequelize');

const sequelize = new Sequelize('db-trackio-server', 'FogtiIstvan', 'Trackio2022passw#', {
  dialect: 'mssql',
  host: 'trackio-db-server.database.windows.net'
});

//Datamodel: https://dbdiagram.io/d/63404344f0018a1c5fb9ee3a?fbclid=IwAR0N3yeppsDthx8y8e-3UjjEsRPE1Im0wL__Ra8zyOZv8Gc5ufaYvbAmbt4

module.exports = sequelize;