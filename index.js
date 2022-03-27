var express = require('express');
const { Sequelize, Model, DataTypes } = require('@sequelize/core');
const sequelize = require("./dbconfig.js");
const bodyParser = require('body-parser');
var api = require('./routes.js');
const cors = require('cors');


var app = express();

/** Parse the body of the request */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.options('*', cors());

app.get('/', function (req, res) {
  res.send('Hello World!');
});
app.use('/api', api);
  

/** Rules of our API */
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Content-Type, application/json');

    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }

    return next();
});


const User = require("./models/user");
const Course = require("./models/course");
Course.belongsToMany(User, {
    through: "user_course",
    as: "users",
    foreignKey: "course_id",
  });

  User.belongsToMany(Course, {
    through: "user_course",
    as: "courses",
    foreignKey: "user_id",
  });


sequelize.sync().then( result => {
}).catch(error => {
    console.log(error);
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));