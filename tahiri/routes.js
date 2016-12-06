module.exports = function(app){

  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    next();
  });

  var users = require('./controllers/users');
  app.get('/users', users.findAll);
  app.get('/userInfo/:id', users.findById); //done
  app.post('/newUser', users.newUser); //add new user
  app.post('/reply', users.reply); //reply message
  app.post('/getId', users.getId); //get student or tutor id

  var courses = require('./controllers/courses');
  app.get('/allcourses', courses.findAll);   //all courses - done
  app.get('/studentCourses/:id', courses.findByStudent); //courses by student done - courses page

  var groups = require('./controllers/groups');
  app.get('/allgroups', groups.findAll);   //all groups - done
  app.get('/studentGroups/:id', groups.findById);   //groups by student done - groups page
  app.get('/groupMessages/:id', groups.findMessages); //group messages - done
  app.post('/messageGroup', groups.sendMessage); //send group message
  app.post('/leave', groups.leave); //remove group - done
  app.post('/createGroup', groups.createGroup); //add new group - done
  app.post('/joinGroup', groups.joinGroup); //join new group - done

  var students = require('./controllers/students');
  //app.get('/allstudents', students.findAll);   //all students
  app.get('/studentMessages/:id', students.findMessages); //direct messages of a student done - inbox
  app.get('/countdown/:id', students.findCountdown); //get countdown of student done - home page
  app.get('/studentInfo/:id', students.findInfoById); //get student info by user id - done
  app.put('/newCountdown', students.newCountdown); //set new countdown - done
  app.post('/messageTutor', students.sendMessage); //send message to tutor

  var tutors = require('./controllers/tutors');
  //app.get('/alltutors', tutors.findAll);  //all tutors
  app.get('/tutorCourses/:id', tutors.findCourses);  //courses by tutors - done
  app.get('/tutorMessages/:id', tutors.findMessages);  //direct messages of a tutor - done
  app.get('/tutorInfo/:id', tutors.findInfo); //find tutor info - done
  app.post('/availability', tutors.availability); //change availability of course - done
  app.post('/remove', tutors.remove); //remove course - done
  app.post('/newCourses', tutors.newCourses); //add new courses - done

}
