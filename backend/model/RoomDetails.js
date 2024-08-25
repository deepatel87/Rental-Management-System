const mongoose = require('mongoose')



const RoomDetails = new mongoose.Schema({

    tenant:{
        type:mongoose.Schema.Types.ObjectId ,
        ref:"User"
    } , 
    roomNo:{
        type:String 
    } ,
    buildingName:{
        type:String
    } ,
    area:{
        type:String ,
    } , 
    numberOfPeople:{
        type:Number , 
    } ,

    rentHistory:[{
        type:mongoose.Schema.Types.ObjectId ,
        ref:"RentDetails"
    }

        
    ]
})
module.exports = mongoose.model("RoomDetails" ,RoomDetails )