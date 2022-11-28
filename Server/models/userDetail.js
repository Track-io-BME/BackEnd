const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const userDetail = sequelize.define('userDetail', {
    id: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    firstName: Sequelize.DataTypes.STRING,
    lastName: Sequelize.DataTypes.STRING,
    height: Sequelize.DataTypes.INTEGER,
    sex: Sequelize.DataTypes.STRING,
    birthDate: Sequelize.DataTypes.DATE,
    goalSteps: Sequelize.DataTypes.INTEGER,
    goalWeight: Sequelize.DataTypes.INTEGER
});

module.exports = userDetail;