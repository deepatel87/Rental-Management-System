const mongoose = require('mongoose')



const RoomDetails = new mongoose.Schema({

    tenant:{
        type:mongoose.Schema.Types.ObjectId ,
        ref:"Tenant"
    } , 
   
    numberOfPeople:{
        type:Number , 
    } ,

    rentHistory:[{
        type:mongoose.Schema.Types.ObjectId ,
        ref:"RentDetails" ,
        default:[]
    }] ,

    image:{
        type:String 

    } ,
    details:{
        type:String ,

    } ,
    additionalDetails:{
        type:String ,

    } ,
    rent:{
        type:String ,

    } , 
    type:{
        type:String ,

    } ,
 
    address:{
        type:String , 
    } , 
    isAvailable:{
        type:String ,
        enum:["Available" , "Not Available"] ,
        default:"Not Available" ,

    }

        
    
})
module.exports = mongoose.model("RoomDetails" ,RoomDetails )