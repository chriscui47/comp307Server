var express = require('express');
var router = express.Router();
const sequelize = require("./dbconfig.js");
const User = require("./models/user");
const Course = require("./models/course");
const {addCourse} = require('./courseService.js');


router.get('/courses', (req,res) =>{
    return User.findAll().then ( regs => console.log(regs));

});

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
            }
        })
    }catch(e){
        console.log(e.message);
    }
    if (status == true){
        return res.status(200).json({msg: "Login successfull!"});
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

router.post('/course/create', (req,res) =>{
      const bob = Course.create({
      term_month_year: req.body.term_month_year
      ,
      course_num:req.body.course_num
      ,
      course_name: req.body.course_name
      ,
      instructor_assigned_name: req.body.instructor_assigned_name
      });
      console.log(JSON.stringify(bob));
      res.status(200).send();

});

module.exports = router