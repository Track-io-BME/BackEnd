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
    category: Sequelize.DataTypes.INTEGER, // 0: walk, 1: run, 2: cycle
    startDate: Sequelize.DataTypes.DATEONLY,
    duration: Sequelize.DataTypes.STRING
});

module.exports = challanges;