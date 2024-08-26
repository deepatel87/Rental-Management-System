const mongoose = require('mongoose')


const UserSchema = new mongoose.Schema({
    fullName:{
        type:String , 
    }, 
    password:{
        type:String , 
    } ,
    email:{
        type:String , 
    } ,
    contactNumber:{
        type:String , 
    } ,
    aadhar:{
        type:String ,

    }
     ,image:{
        type:String ,
        
    }
    , 
    roomDetails:{
        type:mongoose.Schema.Types.ObjectId 
    }
    
    
   
    
})

module.exports = mongoose.model("User" ,UserSchema )