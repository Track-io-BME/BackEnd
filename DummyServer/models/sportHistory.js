const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const sportHistory = sequelize.define('sportHistory', {
    id: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    date: Sequelize.DataTypes.DATEONLY,
    totalduration: Sequelize.DataTypes.STRING,
    steps: Sequelize.DataTypes.INTEGER,
    distance: Sequelize.DataTypes.FLOAT,
    averageSpeed: Sequelize.DataTypes.FLOAT,
    calories: Sequelize.DataTypes.INTEGER,
    elevation: Sequelize.DataTypes.FLOAT,
    category: Sequelize.DataTypes.INTEGER // 0: walk, 1: run, 2: cycle
});

module.exports = sportHistory;