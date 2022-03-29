var express = require('express');
var router = express.Router();
const sequelize = require("./dbconfig.js");
const User = require("./models/user");
const Course = require("./models/course");
const {addCourse} = require('./courseService.js');

//get all courses
router.get('/courses', (req,res) =>{
    return Course.findAll().then( courses => 
        {
            console.log(courses);
            res.status(200).json(courses);
        }
    );

});
//get list of courses for user
router.get('/courses/user/', async (req,res) =>{
    const student_id = req.params.student_id;
    let coursesRet = [];
    let status = false;
    console.log("herew");
    try {
        await User.findAll({
            include: 'courses'
        }).then(courses => {
            console.log(courses);
            if (courses === []){
                console.log("false");
                status= false;
            }
            else{
                console.log("true");
                status= true;
                coursesRet = courses
            }
        })
    }catch(e){
        console.log(e.message);
    }
    if (status == true){
        return res.status(200).json(coursesRet);
    }
    else{
        console.log("incorrect login info")
        return res.status(404).json({ msg: "Incorrect login info " });
        // stop further execution in this callback
    }
});

//add user to specific course
router.get('/user/register', (req,res) =>{
    const course_id = req.query.course_id;
    const user_id = req.query.user_id;
    console.log(course_id);
    addCourse(course_id, user_id);
    res.status(200).send();
});


router.post('/user/login', async (req,res) =>{
    const username = req.body.username;
    const password = req.body.password;
    let role = "";
    let status = false;
    try {
        await User.findOne({
            where:{
                username: username,
                password: password
            }
        }).then(user => {
            console.log(user);
            if (!user){
                console.log("false");
                status= false;
            }
            else{
                console.log("true");
                status= true;
                role = user.role_name;

            }
        })
    }catch(e){
        console.log(e.message);
    }
    if (status == true){
        return res.status(200).json({msg: "Login successfull!", role: role});
    }
    else{
        console.log("incorrect login info")
        return res.status(404).json({ msg: "Incorrect login info " });
        // stop further execution in this callback
    }
});


router.post('/user/create', async (req,res) =>{
    let status = false;
    try {
    const bob = await User.create({
        first_name: req.body.first_name,
        last_name:  req.body.last_name ,
        email:  req.body.email,
        student_id:  req.body.student_id,
        username:  req.body.username,  
        password:  req.body.password,
        role_name:  req.body.role_name}
        ).then(user => {
            console.log(user);
            if (!user){
                console.log("false");
                status= false;
            }
            else{
                console.log("true");
                status= true;
            }
        })
    console.log(JSON.stringify(bob));
    }catch(e){
        console.log(e.message);
    }

    if (status == true){
        return res.status(200).json({msg: "Registration successfull!"});
    }
    else{
        console.log("incorrect info")
        return res.status(404).json({ msg: "Incorrect Registration info " });
        // stop further execution in this callback
    }
});

router.post('/course/create', async (req,res) =>{
      let status = false;
      try {
      const bob = await Course.create({
        term_month_year: req.body.term_month_year
        ,
        course_num:req.body.course_num
        ,
        course_name: req.body.course_name
        ,
        instructor_assigned_name: req.body.instructor_assigned_name
        }
          ).then(course => {
              console.log(course);
              if (!course){
                  console.log("false");
                  status= false;
              }
              else{
                  console.log("true");
                  status= true;
              }
          })
      }catch(e){
          console.log(e.message);
      }
  
      if (status == true){
          return res.status(200).json({msg: "Course created successfull!"});
      }
      else{
          console.log("incorrect info")
          return res.status(404).json({ msg: "Incorrect Course info " });
          // stop further execution in this callback
      }
});

module.exports = router