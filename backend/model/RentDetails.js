const mongoose = require("mongoose")

const RentDetails = new mongoose.Schema({
    amount:{
        type:Number , 
    } ,
    dateOfPayment:{
        type:Date
    } ,



})

module.exports = mongoose.model("RentDetails" ,RentDetails )