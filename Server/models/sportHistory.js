const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const sportHistory = sequelize.define('sportHistory', {
    id: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    date: Sequelize.DataTypes.DATE,
    totalduration: Sequelize.DataTypes.INTEGER,
    distance: Sequelize.DataTypes.FLOAT,
    averageSpeed: Sequelize.DataTypes.FLOAT,
    calories: Sequelize.DataTypes.INTEGER,
    sportType: Sequelize.DataTypes.STRING // WALKING, RUNNING, CYCLING
});

//insert into sportHistories
//values(GETDATE(), '2ó20p', 2031, 223.5, 41.3, 3245, 34, 0, GETDATE(), GETDATE(), 1)

module.exports = sportHistory;