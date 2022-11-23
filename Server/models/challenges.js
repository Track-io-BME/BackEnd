const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const challenges = sequelize.define('challenges', {
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
    duration: Sequelize.DataTypes.STRING,
    isActive: {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: true
    }
});

module.exports = challenges;