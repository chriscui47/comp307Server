const Sequelize = require("sequelize");

const sequelize = require("../dbconfig.js");

const Registration = sequelize.define("registration", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  hours:{
    type: Sequelize.INTEGER,
    allowNull: true,
  }
});

module.exports =  Registration;