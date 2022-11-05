const Sequelize = require('sequelize');

const sequelize = new Sequelize('db-trackio-server', 'FogtiIstvan', 'Trackio2022passw#', {
  dialect: 'mssql',
  host: 'trackio-db-server.database.windows.net'
});

module.exports = sequelize;