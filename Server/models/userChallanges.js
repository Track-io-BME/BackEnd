const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const userChallanges = sequelize.define('userChallanges', {
    id: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
})

module.exports = userChallanges;