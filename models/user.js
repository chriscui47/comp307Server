const Sequelize = require("sequelize");
const sequelize = require("../dbconfig.js");

const User = sequelize.define("user", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },

  first_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  last_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  student_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },

  username: {
    type: Sequelize.STRING,
    allowNull: false,
  },  
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  role_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = User;