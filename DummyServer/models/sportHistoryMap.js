const Sequelize = require('sequelize');
const sequelize = require('../util/database');

sportHistoryMap = sequelize.define('sportHistoryMap', {
    id: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    map: Sequelize.DataTypes.STRING
});

module.exports = sportHistoryMap;