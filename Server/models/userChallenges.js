const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const userChallenges = sequelize.define('userChallenges', {
    id: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
})

module.exports = userChallenges;