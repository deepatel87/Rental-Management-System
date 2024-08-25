const User = require("../model/User") ;
const OTP = require("../model/Otp") ;
const otpGenerator=require("otp-generator") ;
const bcrypt= require("bcrypt")
const jwt = require("jsonwebtoken") ;
const mailSender = require("../utils/mailSender");
require("dotenv").config()

 
exports.sendOTP=async(req, res)=>{
    try {
        const {email }= req.body ;

        const checkUserPresent = await User.findOne({email:email}) ;

    if(checkUserPresent){
        return res.status(401).json({
            success:false,
            message:"User Already Exists"
        })
    }
    var otp = otpGenerator.generate(6 , {
        upperCaseAlphabets:false ,
        lowerCaseAlphabets:false ,
        specialChars:false
    }
    )
    console.log("OTP generated : " , otp)


    let existing_otp = await OTP.findOne({otp:otp});
    while(existing_otp){
        otp = otpGenerator.generate(6 , {
            upperCaseAlphabets:false ,
            lowerCaseAlphabets:false ,
            specialChars:false
        }
        )
        existing_otp = await OTP.findOne({otp:otp});
     }
 
     const otpPayload={email , otp} ;
     const otpBody = await OTP.create(otpPayload)
     console.log(otpBody)

     return res.status(200).json({
        success:true ,
        message:"OTP has been sent successfully" ,
        otp ,
     })
        
    } catch (error) {
        console.log(error) 
        return res.status(500).json({
            success:false ,
            message:"Error While Sending Otp"
        })
        
    }
    
}
 
exports.signUp = async(req , res)=>{

    try {
        const {fullName , email   ,contactNumber , otp}=req.body ;
        console.log(email)

        if(!fullName || !email || !otp || !contactNumber ){
            return res.status(403).json({
                success:false ,
                message:"All fields are required"
            })
        }
    
      
    
        const existingUser = await  User.findOne({email})
        if(existingUser){
            return res.status(400).json({
                success:false ,
                message:"User is already registered"
            })
        }
        console.log("reached here" , email)
    
        const recentOtp = await OTP.findOne({email}).sort({createdAt:-1}).limit(1) ;
        console.log(recentOtp)
        if(!recentOtp){
            return res.status(400).json({
                success:false ,
                message:"OTP Not Found"
            })
        } else if(otp!==recentOtp.otp){
            console.log(recentOtp.otp)
            console.log(otp)
            return res.status(400).json({
                success:false ,
                message:"OTP doesn't match"
            })
        }
        const password = fullName.split(" ")[0]+ Math.floor(Math.random()*(999-100+1)+100);
        console.log(password)


        const hashedPassword = await  bcrypt.hash(password ,10) ;

        const user = await User.create({
            fullName ,
            password ,
            email ,
            contactNumber , 
            password:hashedPassword ,
            addhar1:"url" ,
            aadhar2:"url"



        })
       
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            success:true ,
            message:"Error while signing Up"
        })

        
    }
   


}

exports.login = async(req  , res)=>{
    try{
     const {email , password} = req.body ;
     console.log(email , password)
     if(!email || !password){
        return res.status(403).json({
            success:false ,
            message:"Credentials Needed"
        })

     }
     const existingUser = await User.findOne({email}) ;
     console.log(existingUser)
     if(!existingUser){
        return res.status(403).json({
            success:false ,
            message:"User Doesn't exist"
        })
     }

     if(await bcrypt.compare(password , existingUser.password)){
        const payload = {
            email:existingUser.email ,
            id:existingUser._id ,
            accountType:existingUser.accountType
        }
        const token = jwt.sign(payload , process.env.JWT_SECRET , {
            expiresIn:"2h"

        })
        console.log("token" + token) 

        existingUser.token = token ;
        existingUser.password = undefined ;
        const options= {
            expires:new Date(Date.now() + 3*24*60*60*1000) ,
            httpOnly:true
        }
        res.cookie("cookie" , token , options).status(200).json({
            success:true ,
            token ,
            existingUser ,
            message:"Logged In Successfully"
        })
        
     } else{
        return res.status(400).json({
            success:false ,
            message:"Password is Invalid"
        })
     }

    }catch(err){
        console.log(err)
        return res.status(400).json({
            success:false ,
            message:"Couldn't Login"
        })
    }
}

