const Sequelize = require("sequelize");


var sequelize= new Sequelize('TAManagement', 'cinneman', 'Hello123', {
    host: 'tamanagement.database.windows.net',
    dialect: 'mssql',
    
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    dialectOptions: {
        encrypt: true
      }
    });
module.exports = sequelize;