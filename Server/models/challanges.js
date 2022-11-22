const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const challanges = sequelize.define('challanges', {
    id: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    distance: Sequelize.DataTypes.FLOAT,
    sportType: Sequelize.DataTypes.STRING, // 0: walk, 1: run, 2: cycle
    startDate: Sequelize.DataTypes.DATE,
    endDate: Sequelize.DataTypes.DATE,
    duration: Sequelize.DataTypes.STRING
});

module.exports = challanges;