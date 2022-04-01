const User = require("./models/user");
const Course = require("./models/course");

function addCourse(courseId, userId) {
    return Course.findByPk(courseId)
      .then((course) => {
        if (!course) {
          console.log("course not found!");
          return null;
        }
        return User.findByPk(userId).then((user) => {
          if (!user) {
            console.log("user not found!");
            return null;
          }
          course.addUser(user);
          console.log(`>> added user id=${user.id} to course id=${course.id}`);
          return User;
        });
      })
      .catch((err) => {
        console.log(">> Error while adding user to course: ", err);
      });
  };



  function addProfessor(courseId, profId) {
    return Course.findByPk(courseId)
      .then((course) => {
        if (!course) {
          console.log("course not found!");
          return null;
        }
        return User.findByPk(profId).then((user) => {
          if (!user) {
            console.log("user not found!");
            return null;
          }
          course.addUser(user);
          console.log(`>> added user id=${profId.id} to course id=${course.id}`);
          return User;
        });
      })
      .catch((err) => {
        console.log(">> Error while adding user to course: ", err);
      });
  };



module.exports = {addCourse, addProfessor};