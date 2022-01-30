var express = require('express');
const passport = require('passport');
// const { route } = require('../app');
var router = express.Router();
var userModel = require('./users')
var taskModel = require('./task')
var localStorage = require('passport-local')
var {v4:uuidv4} = require('uuid');
const { uuid } = require("uuidv4");
const exportUser = require("./UserExcel");

// const phoneNumber = 7354108663  

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/de", exportUser);

router.post('/register', function(req, res){
  userModel.create({
    id: uuidv4(),
    name:req.body.name,
    email:req.body.email,
    number:req.body.number
  })
  .then(function(createduser){
    userModel.find()
    .then(function(alluser){
      res.render('profile', {alluser})
    })
  })
})

router.post('/submittask', function(req, res){
  taskModel.create({
    user: req.body.haa,
    taskname: req.body.taskname,
    tasktype : req.body.type
  })
  .then(function(ct){
    userModel.findOne({name : ct.user})
    .then(function(val){
      val.tasks.push(ct.taskname)
      val.save()
      .then(dets => {
        res.send(dets);
      })
    })
  })
})







module.exports = router;
