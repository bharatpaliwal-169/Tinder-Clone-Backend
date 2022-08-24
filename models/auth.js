import mongoose from 'mongoose';
const authSchema = mongoose.Schema({
  fullName : {type: 'string',required: true},
  email : {type: 'string',required: true},
  password : {type: 'string',required: true},
  dob : {type: 'string',required: true},
  age : {type: Number,default: 0},
  gender : {type: 'string',required: true},
  id : {type: 'string'}
})
var userAuth = mongoose.model('userAuth',authSchema);
export default userAuth;