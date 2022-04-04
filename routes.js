var express = require('express');
var router = express.Router();
const sequelize = require("./dbconfig.js");
const User = require("./models/user");
const Course = require("./models/course");
const Comment = require("./models/comment");
const {addCourse, removeCourseFromUser} = require('./courseService.js');
// Student, TA, Prof, Administrator, SysOp


function isRole(role, offset){    
    let roleString = role.split(' ').join('') 
    // Student, TA, Prof, Administrator, SysOp
    if (roleString[offset] == '1'){
        console.log("is tru")
        return true;
    }
    else{
        console.log("is false")
        return false;
    }
}

//get list of courses
router.get('/courses', async (req,res) =>{
    let coursesRet = [];
    let status = false;
    console.log("herew");
    try {
        await Course.findAll({
            include: ['users', 'professor']
        }).then(courses => {
            console.log(courses);
            if (courses === []){
                status= false;
            }
            else{
                status= true;
                coursesRet = courses;
                /*
                coursesRet.forEach((element, index) => {
                    console.log(index);
                    const result = element.users.filter( user => isRole(user.role_name, 1));
                    coursesRet[index].users = ["dsfffffff"];
                }); */
            }
        })
    }catch(e){
        console.log(e.message);
    }
    if (status == true){
        return res.status(200).json(coursesRet);
    }
    else{
        return res.status(404).json({ msg: "couldnt get " });
        // stop further execution in this callback
    }
});

//get all users
router.get('/user', (req,res) =>{
    return User.findAll(
    ).then( users => 
        {
            res.status(200).json(users);
        }
    );

});

//get all users by role
router.get('/user/role', (req,res) =>{
    const role = req.query.role;
   // Student, TA, Prof, Administrator, SysOp
    let offset =0;
    switch (role.toLowerCase()){
        case 'student':
            offset =0;
            break;
        case 'ta':
            offset =1;
            break;
        case 'prof':
            offset =2;
            break;
        case 'administrator':
            offset =3;
            break;
        case 'sysop':
            offset =4;
            break;
        default:
            return res.status(404).json({msg: "invalid role was sent"});
    }
    console.log(offset);
    return User.findAll(
    ).then( users => 
        {
            let tas = users.filter(user => isRole(user.role_name,offset))
            res.status(200).json(tas);
        }
    );
});


//get list of users for specific course
router.get('/user/courses/', async (req,res) =>{
    const id = req.query.id;
    let coursesRet = [];
    let status = false;
    console.log("herew");
    try {
        await Course.findAll({
            include: 'users',
            where: {
                id: id
            }
        }).then(users => {
            console.log(users);
            if (users === []){
                console.log("false");
                status= false;
            }
            else{
                console.log("true");
                status= true;
                coursesRet = users[0]["users"];
            }
        })
    }catch(e){
        console.log(e.message);
    }
    if (status == true){
        return res.status(200).json(coursesRet);
    }
    else{
        console.log("incorrect info")
        return res.status(404).json({ msg: "Incorrect info " });
        // stop further execution in this callback
    }
});


//get list of comments for specific TA in a course
router.get('/course/user/comment', async (req,res) =>{
    let commentsRet = [];
    let status = false;
    console.log("herew");
    try {
        await Comment.findAll({
            where: {
                course_id: req.query.course_id,
                user_id: req.query.user_id,
            }
        }).then(comments => {
            if (comments === []){
                console.log("false");
                status= false;
            }
            else{
                console.log("true");
                status= true;
                commentsRet = comments;
            }
        })
    }catch(e){
        console.log(e.message);
    }
    if (status == true){
        return res.status(200).json(commentsRet);
    }
    else{
        console.log("incorrect info")
        return res.status(404).json({ msg: "Incorrect info " });
        // stop further execution in this callback
    }
});

//get list of courses for user
router.get('/courses/user/', async (req,res) =>{
    const student_id = req.query.student_id;
    console.log(student_id);
    let coursesRet = [];
    let status = false;
    console.log("herew");
    try {
        await User.findAll({
            include: 'courses',
            where: {
                student_id: student_id
            }
        }).then(courses => {
            console.log(courses);
            if (courses === []){
                console.log("false");
                status= false;
            }
            else{
                console.log("true");
                status= true;
                coursesRet = courses[0]["courses"];
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


//get list


//add user to specific course
router.post('/user/register', (req,res) =>{
    const course_id = req.body.course_id;
    const user_id = req.body.user_id;
    console.log(user_id);
    addCourse(course_id, user_id);
    res.status(200).send();
});

//add user to specific course
router.post('/user/unregister', (req,res) =>{
    const course_id = req.body.course_id;
    const user_id = req.body.user_id;
    console.log(user_id);
    removeCourseFromUser(course_id, user_id);
    res.status(200).send();
});


//attempt to login
router.post('/user/login', async (req,res) =>{
    const username = req.body.username;
    const password = req.body.password;
    let role = "";
    let status = false;
    let student_id = 0;
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
                student_id = user.student_id;
            }
        })
    }catch(e){
        console.log(e.message);
    }
    if (status == true){
        return res.status(200).json({student_id: student_id, role: role});
    }
    else{
        console.log("incorrect login info")
        return res.status(404).json({ msg: "Incorrect login info " });
        // stop further execution in this callback
    }
});

//create user
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
        role_name:  req.body.role_name
    }
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

//create a course
router.post('/course/create', async (req,res) =>{
      let status = false;
      let fk_professor = req.body.fk_professor;
      console.log(req.body.fk_professor);
      var courseTemp;
      try {
      const bob = await Course.create({
        term_month_year: req.body.term_month_year
        ,
        course_num:req.body.course_num
        ,
        course_name: req.body.course_name
        }
          ).then(course => {
              console.log(course);
              if (!course){
                  console.log("false");
                  status= false;
              }
              else{
                  console.log("true");
                  courseTemp = course;
                  return User.findByPk(fk_professor)
              }
          })
          .then(prof => {
            courseTemp.setProfessor(prof);
            status = true;
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

//create a comment
router.post('/comment/create', async (req,res) =>{
    let status = false;
    var commentTemp;
    try {
    const bob = await Comment.create({
      comment: req.body.comment,
      user_id: req.body.user_id,
      course_id: req.body.course_id
      }
        ).then(comment => {
            console.log(comment);
            if (!comment){
                console.log("false");
                status= false;
            }
            else{
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
//delete a user
router.delete('/user/delete', async (req, res, next) => {
    let user = await User.findOne({where: {student_id: req.query.student_id}}).catch(e => {
       console.log(e.message)
    })
    if (!user){
        return res.status(404).json("User not found");
    }
    user.destroy();
    return res.status(200).json("User deleted successfully");
  });



module.exports = router