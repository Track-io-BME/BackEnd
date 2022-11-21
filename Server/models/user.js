const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const user = sequelize.define('user', {
    id: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    firstname: Sequelize.DataTypes.STRING,
    lastname: Sequelize.DataTypes.STRING,
    password: Sequelize.DataTypes.STRING,
    email: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING
    },
    isAdmin: {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: false
    }
});

module.exports = user;