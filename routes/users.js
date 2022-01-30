var mongoose  = require('mongoose');
const validator = require('validator');

mongoose.connect('mongodb://localhost/inter')

var userSchema = mongoose.Schema({
  id: String,
  name: String,
  email: {
    type : String,
    require : true,
    unique : true, 
    validate(value){
      if(!validator.isEmail(value)){
        throw new Error("invalid email")
        // alert("Email Invalid")
      }
    }
  },
  phone: String,
  tasks : [{
    type  : String,
  }]
})



module.exports = mongoose.model('user', userSchema)
