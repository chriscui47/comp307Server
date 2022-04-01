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

  function removeCourseFromUser(courseId, userId) {
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
          course.removeUser(user);
          console.log(`>> added user id=${user.id} to course id=${course.id}`);
          return User;
        });
      })
      .catch((err) => {
        console.log(">> Error while adding user to course: ", err);
      });
  };






module.exports = {addCourse, removeCourseFromUser};