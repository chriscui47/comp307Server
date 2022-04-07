const Sequelize = require("sequelize");

const sequelize = require("../dbconfig.js");

const Comment = sequelize.define("comment", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  comment: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  rating: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  isPerformance: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  
});

module.exports =  Comment;