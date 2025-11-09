import validator from "validator"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

import userModel from "../Model/userModel.js";


const createToken=(id)=>{
 return jwt.sign({id},process.env.JWT_SECRET)
}
//rout for userlogin
const loginUser=async(req,res)=>{
    try {
        const {email,password}=req.body;
        const user=await userModel.findOne({email});
        if (!user) {
            return res.json({seccess:false,message:"user doesn't exist"})
        }
        const isMach=await bcrypt.compare(password,user.password)
        if (isMach) {
            const token=createToken(user._id)
            res.json({success:true,token})
        } else {
            res.json({success:false,message:'invalid cridentials'})
        }
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }

}

//rout for user Register
const userRegister=async(req,res)=>{
    try {
        
        const{name,email,password}=req.body;

        //cheking user allready exist or not
        const exists=await userModel.findOne({email})
        if(exists){
            return res.json({seccess:false,message:"user allready exist"})
        }

        //validating email format & stron password
        if (!validator.isEmail(email)) {
            return res.json({seccess:false,message:"please enter a valid email"})
        }
        if (password.length<8) {
            return res.json({seccess:false,message:"please enter strong password"})
        }

        //hashing password
        const salt=await bcrypt.genSalt(10)
        const hasshedPassword=await bcrypt.hash(password,salt)
        const newUser=new userModel({
            name,
            email,
            password:hasshedPassword
        })

        const user=newUser.save()

        const token=createToken(user._id)
        res.json({success:true,token})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }

}
//route for admin login
const adminLogin=async(req,res)=>{
    try {
        const{email,password}=req.body
        if (email===process.env.ADMINEMAIL && password===process.env.ADMINPASSWORD) {
            const token=jwt.sign(email+password,process.env.JWT_SECRET)
            res.json({success:true,token})
            
        } else {
            res.json({success:false,message:"invalid credential"})
        }
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

export {loginUser,userRegister,adminLogin};