var mongoose  = require('mongoose');


var taskSchema = mongoose.Schema({
  user: String,
  taskname: String,
  tasktype: String,
})



module.exports = mongoose.model('task', taskSchema)
