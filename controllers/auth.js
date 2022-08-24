import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import auth from "../models/auth.js"
import dotenv from 'dotenv';
dotenv.config()
const SECRET = process.env.SECRET;

export const login = async(req, res) =>{
  const {email,password} = req.body;

  try {
    const Email = email.toLowerCase();
    const checkUser = await auth.findOne({email:Email});
    const isPasswordCorrect = await bcrypt.compare(password, checkUser.password);

    if(!checkUser || !isPasswordCorrect) {
      return res.status(404).json({message: 'User with these credentials does not exist'});
    }

    const token = jwt.sign({id:checkUser._id}, SECRET, { expiresIn: "1h" });
    return res.status(200).json({result : checkUser,token:token });

  } catch (error) {
    console.log(error);
  }
}

export const signup = async (req, res) => {

  const {fullName,email,password,dob,gender} = req.body;
  try {
    const Email = email.toLowerCase();
    const checkUser = await auth.findOne({email:Email});
    if(checkUser){
      return res.status(400).json({message : "user already exists."});
    }
    
    const hashPassword = await bcrypt.hash(password,12);
    var curr = new Date().getFullYear();
    var old = parseInt(dob.substr(6,10));
    const age = curr - old;
    
    const result = await auth.create({email:Email,fullName,age,password:hashPassword,dob,gender});
    const token = jwt.sign({email : result.Email, id:result._id}, SECRET, { expiresIn: "1h" });
    return res.status(200).json({result,token});

  } catch (error) {
    console.log(error);
  }
}