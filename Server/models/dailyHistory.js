const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const dailyHistory = sequelize.define('dailyHistory', {
    id: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    date: Sequelize.DataTypes.DATEONLY,
    steps: Sequelize.DataTypes.INTEGER,
    distance: Sequelize.DataTypes.FLOAT,
    calories: Sequelize.DataTypes.INTEGER
});

module.exports = dailyHistory;