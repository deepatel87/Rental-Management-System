const mongoose = require("mongoose")

const  Request = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId ,
        ref:"User"
    } ,
    houseId:{
        type:mongoose.Schema.Types.ObjectId ,
        ref:"RoomDetails"
    }
})

module.exports = mongoose.model("Request" ,Request )