const Sequelize = require("sequelize");

const sequelize = require("../dbconfig.js");

const Course = sequelize.define("course", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  term_month_year: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  course_num:{
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  course_name:{
    type: Sequelize.STRING,
    allowNull: true,
  },
  instructor_assigned_name:{
    type: Sequelize.STRING,
    allowNull: true,
  },
});

module.exports =  Course;