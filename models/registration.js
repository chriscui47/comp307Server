const Sequelize = require("sequelize");

const sequelize = require("../dbconfig.js");
//define the entity for registration

const Registration = sequelize.define("registration", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  isStudent: {
    type: Sequelize.BOOLEAN,
    allowNull: true,
  },
  hours:{
    type: Sequelize.INTEGER,
    allowNull: true,
  }
});

module.exports =  Registration;