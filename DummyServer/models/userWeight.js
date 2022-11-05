const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const userWeight = sequelize.define('userWeight', {
    id: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    date: Sequelize.DataTypes.DATEONLY,
    weight: Sequelize.DataTypes.INTEGER
});

module.exports = userWeight;